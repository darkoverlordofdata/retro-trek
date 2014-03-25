#+--------------------------------------------------------------------+
#| katra.coffee
#+--------------------------------------------------------------------+
#| Copyright DarkOverlordOfData (c) 2013
#+--------------------------------------------------------------------+
#|
#| This file is a part of Katra
#|
#| Katra is free software; you can copy, modify, and distribute
#| it under the terms of the MIT License
#|
#+--------------------------------------------------------------------+
#
# The Katra AST Framework
#

rte = if window? then window.rte else require("./rte.node")

V_HP2000        = 0       # circa 1973 - StarTrek
V_ATARI         = 1       # circa 1976 - Hunt the Wumpus
V_GWBASIC       = 2       # circa 1979 - Eliza

GOSUB           = 1       # Stack frame identifier: Gosub..Return
FOR             = 2       # Stack frame identifier: For..Next

PHASE_SCAN      = 0       # Processed during scan
PHASE_EXEC      = 1       # Executable statements

MODE_REPL       = 0       # Console REPL mode
MODE_RUN        = 1       # Console RUN mode

PRINTF = ///    # Printf style format parser
  (\%)          # pct - % escape
  ([-])?        # flag left justify
  ([+ ])?       # flag sign
  ([0])?        # flag padding
  (\d*)?        # field width
  (\.\d*)?      # decimal precision
  ([\%ds])      # output specifier
  ///g

__con = null    # console object
__fs  = null    # file system object
_ary  = {}      # arrays storage
_com  = []      # common storage variables
_dat  = []      # data statements
_dbg  = false   # trace on/off
_dp   = 0       # data pointer
_eop  = false   # end of program flag
_fn   = {}      # user defined functions
_gw   = false   # use GW-Basic style strings
_mrk  = {}      # benchmarks
_nam  = ''      # workspace name
_ofs  = 0       # option base offset for DIM
_pc   = 0       # instruction counter
_prg  = []      # executing code
_raw  = {}      # raw code as entered
_stk  = []      # execution stack
_str  = {}      # strings storage
_txt  = ''      # source text
_var  = {}      # non-scalar variables storage
_ver  = 0       # HP2000 | ATARI | GW
_wel  = ''      # console welcome message
_xrf  = {}      # line number in _raw[]


#
# Initialize the program memory
#
# @param  [Bool]  all if true, then clear code data also
# @return none
#
_init = ($all) ->
  _ary  = {}
  _com  = []
  _dat  = []
  _dp   = 0
  _eop  = false
  _fn   = {}
  _mrk  = {}
  _ofs  = 0
  _pc   = 0
  _raw  = {} if $all
  _stk  = []
  _str  = {}
  _var  = {}
  _xrf  = {}


#
# Eval
#
# @param  [Mixed] the object to eval
# @return [Mixed] value
#
_eval = ($value) ->
  if $value.eval? then $value.eval()
  else $value

#
# Qualify the filename
#
# @param  [String]  name  the raw file name
# @param  [String]  version  basic: V_ATARI | V_GWBASIC | V_HP2000
# @return [String] the qualified file name
#
_qualify = ($name, $version = V_HP2000) ->
  switch $version
    when V_ATARI    then 'bas/atari/'+$name
    when V_GWBASIC  then 'bas/gwbasic/'+$name
    when V_HP2000
      switch $name[0]
        when "*"    then 'bas/hp2k/group/'+$name[1..]
        when "$"    then 'bas/hp2k/system/'+$name[1..]
        when "#"    then 'bas/hp2k/test/'+$name[1..]
        else 'bas/hp2k/'+$name


#
# Clean up the raw source code
#
# @param  [String]  code  the raw source code
# @return [Array<String>]
#
_clean = ($code) ->

  $code = $code[1..] if $code.charCodeAt(0) is 0xfeff # Skip BOM
  $code = ($code + '\n')    # make sure there is an ending LF
  .replace(/\r/g,  '\n')    # replace CR's with LF's
  .replace(/\n+/g, '\n')    # remove duplicate LF's

#
# Save the source code
#
# @param  [String]  version  basic: V_ATARI | V_GWBASIC | V_HP2000
# @param  [String]  name  the file path/name
# @param  [String]  code  the raw source code text
# @return [Void]
#
_save = ($version, $name, $data, $next) ->
  $name = if $name[0] is '"' then $name[1...-1] else $name
  _con.pause true
  _fs.writeFile _qualify($name, $version), $data, () ->
    $next?()
    _con.pause false
  true


#
# Load a program from storage
#
# @return true
#
_load = ($version, $name, $init=true, $next) ->
  $name = if $name[0] is '"' then $name[1...-1] else $name
  _init $init
  _con.pause true
  _fs.readFile _qualify($name, $version), ($err, $data) ->
    if $err? then _con.println $err
    else
      $data = _clean($data).split('\n')   # Get lines of text
      $data.shift() if isNaN($data[0][0]) # Skip header
      $data.shift() if $data[0] is ""     # Skip blank line
      _nam = if /^[A-Za-z]/.test($name) then $name else $name[1..]
      _ver = $version
      _gw = if _ver is V_GWBASIC then true else false
      _txt = $data.join('\n')
      $next?(_txt)
      _parse _txt
    _con.pause false
  true

#
# Load & execute a program from storage
#
# @return true
#
_exec = ($version, $name, $init=true) ->
  _init $init
  _con.pause true
  _fs.readFile _qualify($name, $version), ($err, $data) ->
    if $err? then _con.println $err
    else
      $data = _clean($data).split('\n')   # Get lines of text
      $data.shift() if isNaN($data[0][0]) # Skip header
      $data.shift() if $data[0] is ""     # Skip blank line
      _nam = if /^[A-Za-z]/.test($name) then $name else $name[1..]
      _ver = $version
      _gw = if _ver is V_GWBASIC then true else false
      _txt = $data.join('\n')
      _parse _txt
      _start()
      _run()
    _con.pause false
  true
#
# Start running
#
# @return none
#
_start = () ->

  #
  # Load the raw code into the program buffer
  #
  _prg = []
  for $lineno, $statement of _raw
    while $lineno.length<4
      $lineno = '0'+$lineno
    _prg.push [$lineno, $statement]
  _prg.sort()

  #
  # Initialize and create lineno cross reference
  #
  _init false
  for [$lineno, $statement] in _prg
    if $statement.code.type is PHASE_SCAN
      $statement.code.eval()
    _xrf[parseInt($lineno, 10)] = _pc++

  _pc = 0

#
# Run a started program
#
# @return none
#
_run = () ->

  $wait = false
  _con.setMode MODE_RUN

  try
    until _eop or $wait

      [$lineno, $statement] = _prg[_pc++]
      $code = $statement.code

      if $statement.code.type is PHASE_EXEC
        _con.debug $lineno+' '+$code.toString() if _dbg
        $wait = $code.eval()
      _con.setPrompt $wait
      _eop = true if _pc >= _prg.length

  catch $e
    _con.println $e
    $wait = false

  unless $wait
    _con.setMode MODE_REPL
    _con.println 'DONE'


#
# Chain the next program overlay
#
# @param [String] code  the next program
# @return none
#
_chain = ($code) ->
  $save = Array(_com.length)
  #
  # save common values
  #
  for $var, $ix in _com
    switch $var.type
      when 0 then $save[$ix] = _str[$var.name]
      when 1 then $save[$ix] = _var[$var.name]
      when 2 then $save[$ix] = _ary[$var.name]

  _init true
  _parse $code
  _start()

  #
  # restore common from saved values
  #
  for $var, $ix in _com
    switch $var.type
      when 0 then _str[$var.name] = $save[$ix]
      when 1 then _var[$var.name] = $save[$ix]
      when 2 then _ary[$var.name] = $save[$ix]

  _run()


#
# Parse
#
# @param  [String] code basic code to parse
# @return true if successful, else false
#
_parse = ($code) ->

  kc = if window? then window.kc else require("./kc")

  $code = $code.split('\n')
  #
  # BASIC is a square peg,
  # BNF is a round hole.
  # To make it fit, sand the edges:
  #
  for $line, $index in $code

    #
    #   Replace IF ...= with IF ...==
    #
    if /^\d*\s*IF/i.test $line
      $code[$index] = $line = _fixup_if($line)

    #
    #   Insert missing semicolons in PRINT statements
    #
    if /^\d*\s*PRINT/i.test $line
      $code[$index] = $line = _fixup_print($line)

    #
    #   Remove trailing comments (GWBASIC) ...
    #
    if /\'(?=[^"]*(?:"[^"]*"[^"]*)*$)/.test $line
      $code[$index] = $line = $line.replace(/(\'.*(?=[^"]*(?:"[^"]*"[^"]*)*$))/g, "")

    #
    #   Change exponent operator ** to ^
    #
    if /\*\*(?=[^"]*(?:"[^"]*"[^"]*)*$)/.test $line
      $code[$index] = $line = $line.replace(/(\*\*(?=[^"]*(?:"[^"]*"[^"]*)*$))/g, "^")

  try
    kc.parse $code.join('\n')
  catch $e
    _con.debug String($e)

  return true

#
# Fix If
#
# Fixup Conditionals
#
# = to ==
# # to <>
#
# @param  [String] line line of basic code
# @retun [String] the cleansed string
#
_fixup_if = ($line) ->

  $line = $line.split(/THEN/i)

  $line[0] = $line[0]
  .replace(/\=/g,     '==')
  .replace(/\<\=\=/g, '<=')
  .replace(/\>\=\=/g, '>=')
  .replace(/\#/g,     '<>')   # ATARI Basic

  $line.join(" THEN ")

#
# Fix Print
#
# Add missing ;'s to print lists
#
# @param  [String] line line of basic code
# @retun [String] the cleansed string
#
_fixup_print = ($line) ->

  SEP = ';:,' # print list separators

  $is_string = false
  $match = ($chunk for $chunk in $line.match(/[^"]*(?!\\"[^"]*\")/g) when $chunk isnt '')
  #
  # Chunks alternate unquoted / quoted
  #
  for $chunk, $index in $match

    $sep = if /^\d*\s*PRINT\s*$/i.test($chunk) or $index is $match.length-1 then '' else ';'

    if $is_string
      #
      # put the quotes back
      #
      $match[$index] = $chunk = '"'+$chunk+'"'
      #
      # if the next chunk doesn't start with a separator
      # then add one to this chunk
      #
      if SEP.indexOf($match[$index+1]?[0] ? '') is -1
        $match[$index] = $chunk+$sep

    else
      #
      # if this chunk doesn't end with a separator
      # then add one
      #
      if SEP.indexOf($chunk.substr(-1)) is -1
        $match[$index] = $chunk+$sep

    $is_string = not $is_string

  $match.join('')

#
# allocate an array
#
# @param  [Mixed] init  value to initialize each cell
# @param  [Number]  dim1  size of the 1st dimension
# @param  [Number]  dim2  size of the 2nd dimension
# @return [Array] the new array
#
_dim = ($init, $dim1, $dim2) ->

  $a = []
  switch arguments.length
    when 2
      for $i in [_ofs...$dim1+1]
        $a[$i] = $init
    when 3
      for $i in [_ofs...$dim1+1]
        $a[$i] = []
        for $j in [_ofs...$dim2+1]
          $a[$i][$j] = $init
  return $a

#
# flatten a nested list
#
# @param  [Array] list  nested list
# @return [Array] the flattened list
#
_flatten = ($list) ->

  return [] unless $list?

  $a = []
  for $item in $list
    if Array.isArray($item)
      $a = $a.concat _flatten($item)
    else
      $a.push $item
  return $a


#
# printf style output
#
# @param  [String] fmt  printf style format string
# @param  [Array] list  list of args
# @return [String] the formatted output
#
_sprintf = ($fmt, $list) ->

  $count = 0
  #
  # format each print spec/value pair
  #
  _foreach = ($match, $pct, $just, $sign, $pad=' ', $width, $prec, $spec, $ofset, $string) ->

    $value = String($list[$count++])
    switch $spec
      #
      # %% = Escaped %
      #
      when '%'
        '%'
      #
      # String format
      #
      when 's'
        if $width?
          $width = parseInt($width, 10)
          if $value.length < $width
            if $just? # left
              return Array($width-$value.length+1).join($pad) + $value
            else      # right
              return $value + Array($width-$value.length+1).join($pad)
        $value
      #
      # Number format
      #
      when 'd'
        if $width?
          $width = parseInt($width, 10)
          if $value.length < $width
            if $just? # left
              return $value + Array($width-$value.length+1).join($pad)
            else      # right
              return Array($width-$value.length+1).join($pad) + $value
        $value


  $fmt.replace(PRINTF, _foreach)

#
# Construct a printf style format string from an IMAGE
#
# @param  [Array] image
# @return [Array] the printf style format string
#
_format = ($image = []) ->

  $out = ''
  $count = 1

  while $image.length > 0
    $head = $image.shift()
    if isNaN($head)
      switch $head
        when ','
          $count = 1
        when 'D'
          $out +=  if $count > 1 then '%'+ $count + 'd' else '%d'
          $count = 1
        when 'A'
          $out +=  if $count > 1 then '%'+ $count + 's' else '%s'
          $count = 1
        when 'X'
          $out += Array($count+1).join(' ')
          $count = 1
        when '('
          $out += Array($count+1).join(_format($image))
          $count = 1
        when ')'
          return $out
        else
          $out += $head[1...-1]
          $count = 1

    else
      $count = $head

  return $out

#
# Pad string to length
#
# @param  [String] value
# @param  [Integer] len
# @param  [String] pad char
# @return [String] the padded string
#
_pad = ($value, $len, $pad = ' ') ->

  $right = not isNaN($value)  # right justify numerics
  $value = String($value)     # ensure that we work with a string
  if $right
    if $value.length < $len
      Array($len-$value.length+1, $pad) + $value
    else
      $value.substr(0, $len)

  else
    if $value.length < $len
      $value + Array($len-$value.length+1, $pad)
    else
      $value.substr(0, $len)


#
# Set a benchmark
#
# Mark the time at name
#
# @param  [String]  name  name of the marker
# @return [Void]
#
_mark = ($name) ->
  _mrk[$name] = new Date()


#
# Elapsed Time
#
# Returns the time elapsed between two markers
#
# @param  [String]  point1   a particular marked point
# @param  [String]  point2   a particular marked point
# @return [Integer]
#
_elapsed_time = ($point1, $point2) ->

  return 0 if not _mrk[$point1]?

  _mrk[$point2] = new Date() if not _mrk[$point2]?
  _mrk[$point2] - _mrk[$point1]

#
# ZER
#
Zer =
  eval: -> 0
  toString: -> 'ZER'

#
# CON
#
Con =
  eval: -> 1
  toString: -> 'CON'

Semic =
  eval: -> ''
  toString: -> ';'

Comma =
  eval: -> '    '
  toString: -> ','

#
# Abstract Operator class
#
class Operator

  #
  # Set Operator properties
  #
  # @param  [String]  left part to the left of the operator
  # @param  [String]  right part to the right of the operator
  # @return [Void]
  #
  constructor: (@left, @right) ->


#
# Abstract Built-In function class
#
class BuiltIn

  #
  # Set expression properties
  #
  # @param  [String]  $0  1st param
  # @param  [String]  $1  optional 2nd param
  # @param  [String]  $2  optional 3rd param
  # @return [Void]
  #
  constructor: (@$0, @$1, @$2) ->
  toString: -> "#{@constructor.name.toUpperCase()}(#{@$0})"

#
# Abstract Keyword class
#
class Keyword
  type: PHASE_EXEC
  eval: -> false

#
# Implement the abstract Console class
# by overriding the handler method
#
class Console extends rte.Console

  #
  # @property [Integer] mode - repl or program execution?
  #
  mode: MODE_REPL
  exec: true

  constructor: ($title) ->
    @title = $title
    super()
  #
  # callback to handle interrupt
  #
  # @return none
  #
  cancelHandle: () ->
    _eop = true
    _con.print '^C'
    _con.setPrompt false
    _run()

  #
  # callback to handle the input
  #
  # @param  [String]  line  the line that was wntered
  # @return none
  #
  commandHandle: ($line) =>
    switch @mode

      #
      # Input statement
      #
      when MODE_RUN

        for $item in $line.trim().split(",")
          @buffer.push if isNaN($item) then String($item) else Number($item)

        if @buffer.length < @vars.length
          @continuedPrompt = true
          return
        else
          for $name, $ix in @vars
            if /\$$/.test($name)
              _str[$name] = @buffer[$ix]
            else
              _var[$name] = @buffer[$ix]

          @continuedPrompt = false
          _run()
          return true

      #
      # Interacive (REPL)
      #
      when MODE_REPL

        $line = if /\n$/.test($line) then $line else "#{$line}\n"
        _parse $line

#
# Late binding to the environment
#
do ->
  Object.defineProperties @,
    _con: get: -> if not __con? then __con = new Console(_wel) else __con
    _fs:  get: -> if not __fs? then __fs = new rte.FileSystem() else __fs


#
# The Katra Public API
#
katra =

  #
  # main entry point
  #
  # @param  [Array<String>] args
  # @return [Void]
  #
  main: ($args) ->
    _wel = $args.title ? _wel
    switch $args.basic
      when 'atari'    then _exec V_ATARI,   $args.program
      when 'gwbasic'  then _exec V_GWBASIC, $args.program
      when 'hp2k'     then _exec V_HP2000,  $args.program
      else  _con.setMode MODE_REPL

  #
  # Set the file system root
  #
  # @param  [String]  root  the path to root the file system at
  # @return [Void]
  #
  setRoot: ($root) ->
    _fs.setRoot $root

  #
  # Get the raw program text
  #
  # @return [String] the program text
  #
  getText: () ->
    _txt

  #
  # Command
  #
  # Basic commands for manipulating the code
  # Commands cannot occur in a program.
  #
  command:


    #
    # Load a program from file storage and append to current
    #
    # @param [String] file  program filename
    # @return none
    #
    append: ($0) ->
      _load V_HP2000, $0.split('-')[1], false

    #
    # Load an atari basic program from file storage
    #
    # @param [String] file  program filename
    # @return none
    #
    atari: ($0, $next) ->
      _load V_ATARI, $0, true, $next

    #
    # Display the folder contents
    #
    # @param [String] folder to list
    # @return none
    #
    cat: ($dir) ->

      $nc = 4   # Number of columns in display
      $cw = 20  # Column width
      $hdr = 'name                '

      _fs.readDir $dir, ($files) ->
        $col = 0
        _con.hilite "\n#{$dir}\n#{Array($nc+1).join($hdr)}"

        for $file in $files
          $file = $file.split('.')[0]
          $file += " " while $file.length < $cw
          _con.print $file
          _con.println() if ($col++) % $nc is $nc-1
        _con.print "\n#{_con.prompt}" unless window?


    #
    # Clears the console display
    #
    # @return none
    #
    cls: () ->
      _con.clear()


    #
    # Delete line(s)
    #
    # @param [Number] start starting line number
    # @param [Number] end ending line number
    # @return none
    #
    del: ($0) ->

      [$start, $end] = $0.split('-')[1].split(',')
      $end = $start unless $end

      for $lineno in [$start...$end]
        if _raw[$lineno]? then delete _raw[$lineno]

    #
    # Dir
    #
    # list gwbasic folder
    #
    # @param [Number] start starting line number
    # @param [Number] end ending line number
    # @return none
    #
    dir: ($0) ->
      return

    #
    # Load a program from file storage and run
    #
    # @param [String] file  program filename
    # @return none
    #
    exec: ($0) ->
      _exec V_HP2000, $0.split('-')[1]

    #
    # Files
    #
    # list atari folder
    #
    # @param [Number] start starting line number
    # @param [Number] end ending line number
    # @return none
    #
    files: ($0) ->
      return

    #
    # Load a program from file storage
    #
    # @param [String] file  program filename
    # @return none
    #
    get: ($0, $next) ->
      _load V_HP2000, $0.split('-')[1], true, $next

    #
    # Load a gwbasic program from file storage
    #
    # @param [String] file  program filename
    # @return none
    #
    gwbasic: ($0, $next) ->
      _load V_GWBASIC, $0, true, $next

    #
    # List line(s)
    #
    # @param [Number] start starting line number
    # @param [Number] end ending line number
    # @return none
    #
    list: ($0) ->

      $1 = $0.split('-')[1]
      [$start, $end] = $1.split(',') if $1?
      if $start?
        $end = $end ? $start
        $start = parseInt($start, 10)
        $end = parseInt($end, 10)
      else
        $start = 1
        $end = 9999

      $lines = []

      for $lineno, $statement of _raw
        while $lineno.length<5
          $lineno = '0'+$lineno
        $lines.push [$lineno, $statement]

      $lines.sort()
      for [$lineno, $statement] in $lines
        $lineno = parseInt($statement.lineno, 10)
        $code = $statement.code
        if $start?
          if $lineno >= parseInt($start, 10) and $lineno <= parseInt($end, 10)
            _con.println $lineno+' '+$code
        else
          _con.println $lineno+' '+ $code

    #
    # Name the program in local storage
    #
    # @param [String] file  program filename
    # @return none
    #
    name: ($0) ->
      _nam = $0.split('-')[1]

    #
    # Delete a program from local storage
    #
    # @param [String] file  program filename
    # @return none
    #
    purge: ($0) ->
      _fs.deleteFile _qualify($0.split('-')[1], _ver), ($err) ->
        if $err? then _con.println $err


    #
    # Exit Katra
    #
    quit: () ->
      process?.exit()

    #
    # Renumber line(s)
    #
    # @param [Number] start starting line number
    # @param [Number] end ending line number
    # @return none
    #
    renum: ($0) ->
      _con.println "Renumber Not Implemented"

    #
    # Run the program
    #
    # @param [String] lineno to start at
    # @return none
    #
    run: ($0) ->
      if Object.keys(_raw).length>0
        _start()
        _run()

    #
    # Save the program
    #
    # @return none
    #
    save: () ->

      return _con.println "Name not set" if _nam is ''

      $lines = []
      $text = ''

      for $lineno, $statement of _raw
        $lines.push [$lineno, $statement.code]

      $lines.sort()
      for [$lineno, $code] in $lines
        $text += $lineno+' '+$code+'\n'

      _save _ver, _nam, $text[0...-1], ($err) ->
        if $err? then _con.println $err


    #
    # Scratch memory
    #
    scr: () ->
      _init true

    #
    # Tron|Troff
    #
    troff: () -> _dbg = false
    tron: () -> _dbg = true


  #
  # Ast Nodes
  #
  # Basic keyword definitions
  #
  keyword:

    #
    # Predefined constants:
    #
    Zer: Zer
    Con: Con
    Semic: Semic
    Comma: Comma

    #
    # A single Basic statement
    #
    Statement: class Statement

      #
      # Set statement properties
      #
      # @param [Number] lineno  the statement label
      # @param [Object] code  the executable part
      # @return none
      #
      constructor: ($code, $lineno) ->

        if $lineno?
          _raw[$lineno] =
            lineno: $lineno
            code: $code
        else
          $code?.eval?()



    #
    # Constant
    #
    Const: class Const

      #
      # Create a new Constant
      #
      # @param  value
      #
      constructor: (@value) ->
        @is_string = if 'string' is typeof @value then true else false
        if @is_string
          if @value.charAt(0) is '"'
            @value = @value[1..-2]

      #
      # Get the constant value
      #
      value: -> @value

      #
      # Get the constant value
      #
      eval: -> @value

      #
      # @return the string representaion
      #
      toString: ->
        if @is_string then "\"#{@value}\"" else "#{@value}"

    #
    # Variable
    #
    Var: class Var

      #
      # Create a new Variable reference
      #
      # @param  name  the variable name
      # @param  delim array delimiter (optional)
      # @param  dims  array imdex (optional)
      #
      constructor: (@name, $delim, $dims) ->
        @is_string = /\$$/.test(@name)
        if $delim?
          @is_array = true
          @dims = _flatten($dims)
          @dim1 = @dims[0]
          @dim2 = @dims[1]
        else @is_array = false

      #
      # Set the variable value
      #
      let: ($value) ->
        if @is_string

          if _gw
            if @dim2?
              $dim1 = @dim1.eval()
              $dim2 = @dim2.eval()
              _str[@name][$dim1][$dim2] = $value

            else if @dim1?
              $dim1 = @dim1.eval()
              _str[@name][$dim1] = $value

            else
              _str[@name] = $value

          else
            if @dim2?

              $start = @dim1.eval()-1
              $end = @dim2.eval()
              if $end < $start
                throw 'Invalid String index: '+@toString()
              $len = $end-$start
              $value = $value.substr(0,$len)
              $value = _pad($value, $len)

              $str = _str[@name]
              _str[@name] = $str.substr(0,$start)+$value+$str.substr($end)

            else if @dim1?
              $start = @dim1.eval()-1
              $str = _str[@name]
              _str[@name] = $str.substr(0,$start)+$value+$str.substr($start+$value.length)

            else
              $len = _str[@name].length
              if $value.length < $len
                $value += Array($len-$value.length+1).join(' ')
              _str[@name] = $value

        else if @dim2?
          $dim1 = @dim1.eval()
          $dim2 = @dim2.eval()
          _ary[@name][$dim1][$dim2] = $value

        else if @dim1?
          $dim1 = @dim1.eval()
          _ary[@name][$dim1] = $value

        else
          _var[@name] = $value

      #
      # Get the variable value
      #
      eval: () ->

        if @is_string
          if _gw
            if @dim2?
              $dim1 = @dim1.eval()
              $dim2 = @dim2.eval()
              _str[@name]?[$dim1]?[$dim2] ? ''

            else if @dim1?
              $dim1 = @dim1.eval()
              _str[@name]?[$dim1] ? ''

            else
              _str[@name] ? ''

          else
            if @dim2?

              $start = @dim1.eval()-1
              $end = @dim2.eval()
              if $end < $start
                throw 'Invalid String index: '+@toString()
              _str[@name]?.slice($start, $end) ? ''

            else if @dim1?
              $start = @dim1.eval()-1
              _str[@name]?.slice($start) ? ''

            else
              _str[@name] ? ''

        else if @dim2?
          $dim1 = @dim1.eval()
          $dim2 = @dim2.eval()
          _ary[@name]?[$dim1]?[$dim2] ? 0

        else if @dim1?
          $dim1 = @dim1.eval()
          _ary[@name]?[$dim1] ? 0

        else
          _var[@name] ? 0

      #
      # @return the string representaion
      #
      toString: ->
        if @is_array
          "#{@name}[#{@dims.join(',')}]"
        else @name

    #
    # Basic Command Keywords:
    #

    #
    # Base n
    #
    Base: class Base extends Keyword

      #
      # Set the option base
      #
      # @param  base  index offset 0 or 1
      #
      constructor: (@base) ->

      #
      # Execute
      #
      eval: ->
        _ofs = @base
        return false

      #
      # @return the string representaion
      #
      toString: ->
        "BASE #{@base}"

    #
    # Chain "filename"
    #
    Chain: class Chain extends Keyword
      constructor: (@program) ->
      eval: ->
        _con.pause true
        _fs.readFile @program, ($err, $data) ->
          if $err?
            _con.println $err
          else
            _ver = $data.type
            _nam = $data.name
            _gw = if _ver is V_GWBASIC then true else false
            _chain $data.data
          _con.pause false
      #
      # @return the string representaion
      #
      toString: ->
        "CHAIN \"#{@program}\""

    #
    # Com A(1)
    # Com A(1,1)
    # Com A$(1)
    #
    Com: class Com extends Keyword
      type: PHASE_SCAN # Execute during scan phase
      constructor: ($vars) ->
        @vars = _flatten($vars)
      eval: ->
        for $var in @vars
          if /\$$/.test($var.name)

            if _gw
              if $var.dims.length is 0
                _str[$var.name] = ''
              else
                _str[$var.name] = _dim('', $var.dims...)

            else
              _str[$var.name] = Array($var.dims[0]+1).join(' ')
              _com.push
                type: 0
                name: $var.name
          else

            if $var.dims.length is 0
              _var[$var.name] = 0
              _com.push
                type: 1
                name: $var.name
            else
              _ary[$var.name] = _dim(0, $var.dims...)
              _com.push
                type: 2
                name: $var.name

        return false


      #
      # @return the string representaion
      #
      toString: ->
        "COM #{@vars.join(', ')}"


  #
    # Data v1, v2, ... vN
    #
    Data: class Data extends Keyword
      type: PHASE_SCAN # Execute during scan phase
      constructor: ($data) ->
        @data = _flatten($data)
      eval: ->
        if _dat is null then _dat = []
        _dat = _dat.concat @data
        return false
      #
      # @return the string representaion
      #
      toString: ->
        "DATA #{@data.join(', ')}"

    #
    # Def FNA(P) = X
    #
    Def: class Def extends Keyword
      type: PHASE_SCAN # Execute during scan phase
      constructor: (@name, @par, @body) ->
      eval: ->

        _fn[@name] = ($par) =>

          $tmp = _var[@par]   # variable goes out of scope,
          _var[@par] = $par   # occluded by the local param
          $ret = @body.eval() # while we execute the function body
          _var[@par] = $tmp   # variable returns to scope
          $ret

        return false
      #
      # @return the string representaion
      #
      toString: ->
        "DEF #{@name}(#{@par}) = #{@body}"

    #
    # Dim A(1)
    # Dim A(1,1)
    # Dim A$(1)
    #
    Dim: class Dim extends Keyword
      type: PHASE_SCAN # Execute during scan phase
      constructor: ($vars) ->
        @vars = _flatten($vars)
      eval: ->
        for $var in @vars
          if /\$$/.test($var.name)

            if _gw
              if $var.dims.length is 0
                _str[$var.name] = ''
              else
                _str[$var.name] = _dim('', $var.dims...)

            else
              _str[$var.name] = Array($var.dims[0]+1).join(' ')

          else

            if $var.dims.length is 0
              _var[$var.name] = 0
            else
              _ary[$var.name] = _dim(0, $var.dims...)

        return false
      #
      # @return the string representaion
      #
      toString: ->
        "DIM #{@vars.join(', ')}"

    #
    # End
    #
    End: class End extends Keyword
      eval: ->
        _eop = true
        return false
      #
      # @return the string representaion
      #
      toString: ->
        "END"

    #
    # Enter
    #
    Enter: class Enter extends Keyword
      constructor: (@port, @time, @status, @var) ->
        unless @var?
          [@port, @time, @status, @var] = [null, @port, @time, @status]

      eval: ->
        _con.input '', [@var]
        return true

      #
      # @return the string representaion
      #
      toString: ->
        "ENTER #{@port}, #{@time}, #{@status}, #{@var}"

    #
    # For VAR = start To end
    # For VAR = start To end Step n
    #
    For: class For extends Keyword
      constructor: (@var, @start, @end, @step=new Const(1)) ->
      eval: ->
        _var[@var] = _eval(@start)
        _stk.push {
          id:		FOR
          pc:		_pc
          name: @var
          end:	@end
          step:	@step
        }
        return false
      #
      # @return the string representaion
      #
      toString: ->
        if @step is 1
          "FOR #{@var} = #{@start} TO #{@end}"
        else
          "FOR #{@var} = #{@start} TO #{@end} STEP #{@step}"

    #
    # Goto line
    # Goto expression Of line1, line2, ...
    #
    Goto: class Goto extends Keyword
      constructor: (@lineno, $of) ->
        @of = _flatten($of)
      eval: ->
        if @of.length>0
          $index = _eval(@lineno)-1
          if @of[$index]?
            _pc = _xrf[@of[$index]]

        else
          _pc = _xrf[parseInt(@lineno, 10)]
        return false

      #
      # @return the string representaion
      #
      toString: ->
        if @of.length>0?
          "GOTO #{@lineno} OF #{@of.join(',')}"
        else
          "GOTO #{@lineno}"

    #
    # Gosub line
    #
    Gosub: class Gosub extends Goto
      constructor: (@lineno, $of) ->
        @of = _flatten($of)
      eval: ->
        _stk.push {
          id:		GOSUB
          pc:		_pc
        }
        super()

      #
      # @return the string representaion
      #
      toString: ->
        if @of.length>0?
          "GOSUB #{@lineno} OF #{@of.join(',')}"
        else
          "GOSUB #{@lineno}"

    #
    # If <Cond> Then line
    #
    If: class If extends Keyword
      constructor: (@cond, @then) ->
      eval: ->
        if @cond.eval()
          if @then.eval?
            @then.eval()
          else
            _pc = _xrf[parseInt(@then, 10)]
        return false

      #
      # @return the string representaion
      #
      toString: ->
        "IF #{@cond} THEN #{@then}"

    #
    # Image
    #
    Image: class Image extends Keyword
      constructor: ($format = []) ->
        @source = _flatten($format)
        @format = _format(@source)
      eval: ->
        return false

      #
      # @return the string representaion
      #
      toString: ->
        "IMAGE #{@source.join('')}"

    #
    # Input var1, var2, ... varN
    # Input "Prompt", var1, var2, ... varN
    #
    Input: class Input extends Keyword
      constructor: ($vars, @prompt) ->
        @vars = _flatten($vars)
      eval: ->
        _con.input(@prompt, @vars)
        return true

      #
      # @return the string representaion
      #
      toString: ->
        if @prompt?
          "INPUT #{@prompt}, #{@vars.join(',')}"
        else
          "INPUT #{@vars.join(',')}"

    #
    # Let VAR= <VAR= > value
    #
    Let: class Let extends Keyword
      constructor: ($vars, @value) ->
        @vars = []
        for $var in _flatten($vars)
          if 'string' is typeof $var
            @vars.push new Var($var)
          else
            @vars.push $var

      eval: ->
        $value = _eval(@value)
        for $var in @vars
          $var.let $value
        return false

      #
      # @return the string representaion
      #
      toString: ->
        $s = ''
        for $var in @vars
          $s += $var + ' = '
        "LET #{$s}#{@value}"

    #
    # Mat VAR = value
    #
    Mat: class Mat extends Keyword
      constructor: (@var, @value) ->
      eval: ->
        $value = @value.eval()

        if _ary[@var]?
          $i = _ary[@var].length
          $j = _ary[@var][_ofs].length
          _ary[@var] = _dim($value, $i, $j)
        else
          _ary[@var] = _dim($value, 10)
        return false

    #
    # Mat Read var1, var2, ... varN
    #
    MatRead: class MatRead extends Keyword
      constructor: ($vars) ->
        @vars = _flatten($vars)
      eval: ->
        for $var in @vars
          if _dp < _dat.length
            $var.let _dat[_dp++].value
          else
            $var.let undefined

        return false
      #
      # @return the string representaion
      #
      toString: ->
        "MAT READ #{@vars.join(',')}"

    #
    # Next VAR
    #
    Next: class Next extends Keyword
      constructor: (@var) ->
      eval: ->
        $frame = _stk[_stk.length-1]
        if $frame.id isnt FOR
          throw "Next without for"

        $name = @var.name
        if $frame.name isnt $name
          throw "Mismatched For/Next #{$name}"

        $step = _eval($frame.step)
        $counter = @var.eval() + $step
        @var.let $counter

        if $step < 0
          if $counter < _eval($frame.end)
            _stk.pop()
          else
            _pc = $frame.pc
        else
          if $counter > _eval($frame.end)
            _stk.pop()
          else
            _pc = $frame.pc
        return false
      #
      # @return the string representaion
      #
      toString: ->
        "NEXT #{@var}"

    #
    # Print item1, item2, ... itemN
    #
    Print: class Print extends Keyword
      constructor: ($items...) ->
        @items = _flatten([$items])
      eval: ->
        $str = ''
        for $item in @items
          $str += if isNaN($val = _eval($item)) then $val else ' '+$val

        if $item in [Semic, Comma]
          _con.print $str
        else
          _con.println $str
        return false
      #
      # @return the string representaion
      #
      toString: ->
        $str = ''
        for $item in @items
          $str += $item.toString()
        "PRINT #{$str}"

    #
    # Print Using line;item1, item2, ... itemN
    #
    Using: class Using extends Keyword
      constructor: (@lineno, $items...) ->
        @items = _flatten($items)
      eval: ->

        $i = _xrf[@lineno]
        [$lineno, $statement] =  _prg[$i]
        $args = []
        for $item in @items
          $args.push _eval($item)

        if $item in [Semic, Comma]
          _con.print _sprintf($statement.code.format, $args)
        else
          _con.println _sprintf($statement.code.format, $args)
        return false
      #
      # @return the string representaion
      #
      toString: ->
        if @items.length is 0
          "PRINT USING #{@lineno}"
        else
          $str = ''
          for $item in @items
            $str += $item.toString()+','
          $str = $str[0...-1]
          "PRINT USING #{@lineno};#{$str}"

    #
    # Randomize
    #
    Randomize: class Randomize extends Keyword
      constructor: ->
      eval: ->
        return false
      #
      # @return the string representaion
      #
      toString: ->
        "RANDOMIZE"

    #
    # Read var1, var2, ... varN
    #
    Read: class Read extends Keyword
      constructor: ($vars) ->
        @vars = _flatten($vars)
      eval: ->
        for $var in @vars
          if _dp < _dat.length
            $var.let _dat[_dp++].value
          else
            $var.let undefined

        return false
      #
      # @return the string representaion
      #
      toString: ->
        "READ #{@vars.join(',')}"

    #
    # Restore
    #
    Restore: class Restore extends Keyword
      constructor: (@lineno) ->
      eval: ->
        _dp = 0
        return false
      #
      # @return the string representaion
      #
      toString: ->
        if @lineno? then "RESTORE #{@lineno}" else "RESTORE"
    #
    # Return
    #
    Return: class Return extends Keyword
      constructor: ->
      eval: ->
        $frame = _stk.pop()
        while $frame.id isnt GOSUB
          $frame = _stk.pop()
        _pc = $frame.pc
        return false
      #
      # @return the string representaion
      #
      toString: ->
        "RETURN"

    #
    # Rem ...
    #
    Rem: class Rem extends Keyword
      constructor: ($text) ->
        @text = $text.replace(/^REM/i, '')
      eval: -> return false
      #
      # @return the string representaion
      #
      toString: ->
        "REM#{@text}"

    #
    # Stop
    #
    Stop: class Stop extends Keyword
      constructor: ->
      eval: ->
        _eop = true
        return false
      #
      # @return the string representaion
      #
      toString: ->
        "STOP"

    #
    # Basic Operators:
    # used by BNF grammars
    #

    Max: class Max extends Operator
      eval: -> Math.max(_eval(@left), _eval(@right))
      toString: -> "#{@left} MAX #{@right}"

    Min: class Min extends Operator
      eval: -> Math.min(_eval(@left), _eval(@right))
      toString: -> "#{@left} MIN #{@right}"
    #
    # +
    #
    Add: class Add extends Operator
      eval: -> _eval(@left) + _eval(@right)
      toString: -> "#{@left} + #{@right}"
    #
    # -
    #
    Sub: class Sub extends Operator
      eval: -> _eval(@left) - _eval(@right)
      toString: -> "#{@left} - #{@right}"
    #
    # *
    #
    Mul: class Mul extends Operator
      eval: -> _eval(@left) * _eval(@right)
      toString: -> "#{@left} * #{@right}"
    #
    # /
    #
    Div: class Div extends Operator
      eval: -> _eval(@left) / _eval(@right)
      toString: -> "#{@left} / #{@right}"
    #
    # ^
    #
    Pow: class Pow extends Operator
      eval: -> Math.pow(_eval(@left), _eval(@right))
      toString: -> "#{@left} ^ #{@right}"
    #
    # OR
    #
    OR: class OR extends Operator
      eval: -> _eval(@left) or _eval(@right)
      toString: -> "#{@left} OR #{@right}"
    #
    # AND
    #
    AND: class AND extends Operator
      eval: -> _eval(@left) and _eval(@right)
      toString: -> "#{@left} AND #{@right}"
    #
    # NOT
    #
    NOT: class NOT extends Operator
      eval: -> not _eval(@left)
      toString: -> "NOT #{@left}"
    #
    # <
    #
    LT: class LT extends Operator
      eval: -> _eval(@left) < _eval(@right)
      toString: -> "#{@left} < #{@right}"
    #
    # >
    #
    GT: class GT extends Operator
      eval: -> _eval(@left) > _eval(@right)
      toString: -> "#{@left} > #{@right}"
    #
    # <=
    #
    LE: class LE extends Operator
      eval: -> _eval(@left) <= _eval(@right)
      toString: -> "#{@left} <= #{@right}"
    #
    # >=
    #
    GE: class GE extends Operator
      eval: -> _eval(@left) >= _eval(@right)
      toString: -> "#{@left} >= #{@right}"
    #
    # ==
    #
    EQ: class EQ extends Operator
      eval: -> if _eval(@left) is _eval(@right) then true else false
      toString: -> "#{@left} = #{@right}"
    #
    # !=
    #
    NE: class NE extends Operator
      eval: -> if _eval(@left) isnt _eval(@right) then true else false
      toString: -> "#{@left} <> #{@right}"




    #
    # User Defined Functions
    #
    FN: class FN
      constructor: (@name, @parm) ->
      eval:     -> _fn[@name](_eval(@parm))
      toString: -> "#{@name}(#{@parm})"

    #
    # Basic Builtin Functions
    #
    ABS: class ABS extends BuiltIn
      eval: -> Math.abs(_eval(@$0))
    ATN: class ATN extends BuiltIn
      eval: -> Math.atan(_eval(@$0))
    COS: class COS extends BuiltIn
      eval: -> Math.cos(_eval(@$0))
    EXP: class EXP extends BuiltIn
      eval: -> Math.exp(_eval(@$0))
    INT: class INT extends BuiltIn
      eval: -> Math.floor(_eval(@$0))
    LEN: class LEN extends BuiltIn
      eval: -> _eval(@$0).length
    LIN: class LIN extends BuiltIn
      eval: -> Array(Math.abs(_eval(@$0))+1).join('\n')
    LOG: class LOG extends BuiltIn
      eval: -> Math.log(_eval(@$0))
    RND: class RND extends BuiltIn
      eval: -> Math.random()
    SGN: class SGN extends BuiltIn
      eval: ->
        $0 = _eval(@$0)
        if $0 < 0 then -1 else if $0 > 0 then 1 else 0
    SIN: class SIN extends BuiltIn
      eval: -> Math.sin(_eval(@$0))
    SPA: class SPA extends BuiltIn
      eval: -> Array(_eval(@$0)).join(" ")
    SQR: class SQR extends BuiltIn
      eval: -> Math.sqrt(_eval(@$0))
    TAB: class TAB extends BuiltIn
      eval: -> Array(Math.floor(_eval(@$0))).join(" ")
    TAN: class TAN extends BuiltIn
      eval: -> Math.tan(_eval(@$0))
    TIM: class TIM extends BuiltIn
      eval: ->
        if _eval(@$0) is 0 then (new Date()).getMinutes() else (new Date()).getSeconds()

    LCASE: class LCASE extends BuiltIn
      eval: -> _eval(@$0).toLowerCase()
      toString: -> "LCASE(#{@$0}, #{@$1}, #{@$2})"
    LEFT: class LEFT extends BuiltIn
      eval: -> _eval(@$0).substr(0, _eval(@$1)-1)
      toString: -> "LEFT(#{@$0}, #{@$1}, #{@$2})"
    MID: class MID extends BuiltIn
      eval: -> _eval(@$0).substring(_eval(@$1), _eval(@$2))
      toString: -> "MID(#{@$0}, #{@$1}, #{@$2})"
    RIGHT: class RIGHT extends BuiltIn
      eval: -> _eval(@$0).substr(_eval(@$1)-1)
      toString: -> "RIGHT(#{@$0}, #{@$1}, #{@$2})"
    SUBSTR: class SUBSTR extends BuiltIn
      eval: -> _eval(@$0).substr(_eval(@$1)-1, _eval(@$2))
      toString: -> "SUBSTR(#{@$0}, #{@$1}, #{@$2})"
    UCASE: class UCASE extends BuiltIn
      eval: -> _eval(@$0).toUpperCase()
      toString: -> "UCASE(#{@$0}, #{@$1}, #{@$2})"


if window? then window.katra = katra else module.exports = katra
