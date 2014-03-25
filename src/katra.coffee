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

util = require("./util")
rte = require('./rte')

V_HP2000    = 0       # circa 1973 - StarTrek
V_ATARI     = 1       # circa 1976 - Hunt the Wumpus
V_GWBASIC   = 2       # circa 1979 - Eliza

GOSUB       = 1       # Stack frame identifier: Gosub..Return
FOR         = 2       # Stack frame identifier: For..Next

PHASE_SCAN  = 0       # Processed during scan
PHASE_EXEC  = 1       # Executable statements

MODE_REPL   = 0       # Console REPL mode
MODE_RUN    = 1       # Console RUN mode

_con        = null    # console object
_fs         = null    # file system object

arrays      = {}      # arrays storage
benchmarks  = {}      # benchmarks
common      = []      # common storage variables
data        = []      # data statements
trace       = false   # trace on/off
dp          = 0       # data pointer
eop         = false   # end of program flag
functions   = {}      # user defined functions
gw          = false   # use GW-Basic style strings
name        = ''      # workspace name
offset      = 0       # option base offset for DIM
pc          = 0       # instruction counter
prog        = []      # executing code
raw         = {}      # raw code as entered
stack       = []      # execution stack
strings     = {}      # strings storage
text        = ''      # source text
type        = 0       # HP2000 | ATARI | GW
title       = ''      # console welcome message
variables   = {}      # non-scalar variables storage
xrf         = {}      # line number in raw[]

#
# Implement the abstract Console class
# by overriding the handler methods
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
    eop = true
    con.print '^C'
    con.setPrompt false
    run()

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
          @buffer.push if isNaN($item) then String($item).toUpperCase() else Number($item)

        if @buffer.length < @vars.length
          @continuedPrompt = true
          return
        else
          for $name, $ix in @vars
            if /\$$/.test($name)
              strings[$name] = @buffer[$ix]
            else
              variables[$name] = @buffer[$ix]

          @continuedPrompt = false
          run()
          return true

    #
    # Interacive (REPL)
    #
      when MODE_REPL

        $line = if /\n$/.test($line) then $line else "#{$line}\n"
        parse $line

#
# Late binding to the environment
#
do ->
  Object.defineProperties @,
    con: get: -> if not _con? then _con = new Console(title) else _con
    fs:  get: -> if not _fs? then _fs = new rte.FileSystem() else _fs



#
# Initialize the program memory
#
# @param  [Bool]  all if true, then clear code data also
# @return none
#
initialize = ($all) ->
  arrays  = {}
  common  = []
  data  = []
  dp   = 0
  eop  = false
  functions   = {}
  benchmarks  = {}
  offset  = 0
  pc   = 0
  raw  = {} if $all
  stack  = []
  strings  = {}
  variables  = {}
  xrf  = {}


#
# Value Of
#
# @param  [Mixed] the object to value
# @return [Mixed] value
#
valueOf = ($value) ->
  if $value.eval? then $value.eval()
  else $value

#
# Qualify the filename
#
# @param  [String]  name  the raw file name
# @param  [String]  version  basic: V_ATARI | V_GWBASIC | V_HP2000
# @return [String] the qualified file name
#
qualifyFilename = ($name, $version = V_HP2000) ->
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
# Save the source code
#
# @param  [String]  version  basic: V_ATARI | V_GWBASIC | V_HP2000
# @param  [String]  name  the file path/name
# @param  [String]  code  the raw source code text
# @return [Void]
#
save = ($version, $name, $data, $next) ->
  $name = if $name[0] is '"' then $name[1...-1] else $name
  con.pause true
  fs.writeFile qualifyFilename($name, $version), $data, () ->
    $next?()
    con.pause false
  true


#
# Load a program from storage
#
# @return true
#
load = ($version, $name, $init=true, $next) ->
  $name = if $name[0] is '"' then $name[1...-1] else $name
  initialize $init
  con.pause true
  fs.readFile qualifyFilename($name, $version), ($err, $data) ->
    if $err? then con.println $err
    else
      $data = util.clean($data).split('\n')   # Get lines of text
      $data.shift() if isNaN($data[0][0]) # Skip header
      $data.shift() if $data[0] is ""     # Skip blank line
      name = if /^[A-Za-z]/.test($name) then $name else $name[1..]
      type = $version
      gw = if type is V_GWBASIC then true else false
      text = $data.join('\n')
      $next?(text)
      parse text
    con.pause false
  true

#
# Load & execute a program from storage
#
# @return true
#
execute = ($version, $name, $init=true) ->
  initialize $init
  con.pause true
  fs.readFile qualifyFilename($name, $version), ($err, $data) ->
    if $err? then con.println $err
    else
      $data = util.clean($data).split('\n')   # Get lines of text
      $data.shift() if isNaN($data[0][0]) # Skip header
      $data.shift() if $data[0] is ""     # Skip blank line
      name = if /^[A-Za-z]/.test($name) then $name else $name[1..]
      type = $version
      gw = if type is V_GWBASIC then true else false
      text = $data.join('\n')
      parse text
      start()
      run()
    con.pause false
  true
#
# Start running
#
# @return none
#
start = () ->

  #
  # Load the raw code into the program buffer
  #
  prog = []
  for $lineno, $statement of raw
    while $lineno.length<4
      $lineno = '0'+$lineno
    prog.push [$lineno, $statement]
  prog.sort()

  #
  # Initialize and create lineno cross reference
  #
  initialize false
  for [$lineno, $statement] in prog
    if $statement.code.type is PHASE_SCAN
      $statement.code.eval()
    xrf[parseInt($lineno, 10)] = pc++

  pc = 0

#
# Run a started program
#
# @return none
#
run = () ->

  $wait = false
  con.setMode MODE_RUN

  try
    until eop or $wait

      [$lineno, $statement] = prog[pc++]
      $code = $statement.code

      if $statement.code.type is PHASE_EXEC
        con.debug $lineno+' '+$code.toString() if trace
        $wait = $code.eval()
      con.setPrompt $wait
      eop = true if pc >= prog.length

  catch $e
    con.println $e
    $wait = false

  unless $wait
    con.setMode MODE_REPL
    con.println 'DONE'


#
# Chain the next program overlay
#
# @param [String] code  the next program
# @return none
#
chain = ($code) ->
  $save = Array(common.length)
  #
  # save common values
  #
  for $var, $ix in common
    switch $var.type
      when 0 then $save[$ix] = strings[$var.name]
      when 1 then $save[$ix] = variables[$var.name]
      when 2 then $save[$ix] = arrays[$var.name]

  initialize true
  parse $code
  start()

  #
  # restore common from saved values
  #
  for $var, $ix in common
    switch $var.type
      when 0 then strings[$var.name] = $save[$ix]
      when 1 then variables[$var.name] = $save[$ix]
      when 2 then arrays[$var.name] = $save[$ix]

  run()


#
# Parse
#
# @param  [String] code basic code to parse
# @return true if successful, else false
#
parse = ($code) ->

  kc = require('./kc')
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
      $code[$index] = $line = fixupIf($line)

    #
    #   Insert missing semicolons in PRINT statements
    #
    if /^\d*\s*PRINT/i.test $line
      $code[$index] = $line = fixupPrint($line)

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
    con.debug String($e)

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
fixupIf = ($line) ->

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
fixupPrint = ($line) ->

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
dim = ($init, $dim1, $dim2) ->

  $a = []
  switch arguments.length
    when 2
      for $i in [offset...$dim1+1]
        $a[$i] = $init
    when 3
      for $i in [offset...$dim1+1]
        $a[$i] = []
        for $j in [offset...$dim2+1]
          $a[$i][$j] = $init
  return $a


#
# Construct a printf style format string from an IMAGE
#
# @param  [Array] image
# @return [Array] the printf style format string
#
format = ($image = []) ->

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
          $out += Array($count+1).join(format($image))
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
# Set a benchmark
#
# Mark the time at name
#
# @param  [String]  name  name of the marker
# @return [Void]
#
benchmark = ($name) ->
  benchmarks[$name] = new Date()


#
# Elapsed Time
#
# Returns the time elapsed between two markers
#
# @param  [String]  point1   a particular marked point
# @param  [String]  point2   a particular marked point
# @return [Integer]
#
elapsedTime = ($point1, $point2) ->

  return 0 if not benchmarks[$point1]?

  benchmarks[$point2] = new Date() if not benchmarks[$point2]?
  benchmarks[$point2] - benchmarks[$point1]

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
# The Katra Public API
#
module.exports = katra =

  #
  # main entry point
  #
  # @param  [Array<String>] args
  # @return [Void]
  #
  main: ($args) ->
    title = $args.title ? title
    switch $args.basic
      when 'atari'    then execute V_ATARI,   $args.program
      when 'gwbasic'  then execute V_GWBASIC, $args.program
      when 'hp2k'     then execute V_HP2000,  $args.program
      else  con.setMode MODE_REPL

  #
  # Set the file system root
  #
  # @param  [String]  root  the path to root the file system at
  # @return [Void]
  #
  setRoot: ($root) ->
    fs.setRoot $root

  #
  # Get the raw program text
  #
  # @return [String] the program text
  #
  getText: () ->
    text

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
      load V_HP2000, $0.split('-')[1], false

    #
    # Load an atari basic program from file storage
    #
    # @param [String] file  program filename
    # @return none
    #
    atari: ($0, $next) ->
      load V_ATARI, $0, true, $next

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

      fs.readDir $dir, ($files) ->
        $col = 0
        con.hilite "\n#{$dir}\n#{Array($nc+1).join($hdr)}"

        for $file in $files
          $file = $file.split('.')[0]
          $file += " " while $file.length < $cw
          con.print $file
          con.println() if ($col++) % $nc is $nc-1
        con.print "\n#{con.prompt}" unless window?


    #
    # Clears the console display
    #
    # @return none
    #
    cls: () ->
      con.clear()


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
        if raw[$lineno]? then delete raw[$lineno]

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
      execute V_HP2000, $0.split('-')[1]

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
      load V_HP2000, $0.split('-')[1], true, $next

    #
    # Load a gwbasic program from file storage
    #
    # @param [String] file  program filename
    # @return none
    #
    gwbasic: ($0, $next) ->
      load V_GWBASIC, $0, true, $next

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

      for $lineno, $statement of raw
        while $lineno.length<5
          $lineno = '0'+$lineno
        $lines.push [$lineno, $statement]

      $lines.sort()
      for [$lineno, $statement] in $lines
        $lineno = parseInt($statement.lineno, 10)
        $code = $statement.code
        if $start?
          if $lineno >= parseInt($start, 10) and $lineno <= parseInt($end, 10)
            con.println $lineno+' '+$code
        else
          con.println $lineno+' '+ $code

    #
    # Name the program in local storage
    #
    # @param [String] file  program filename
    # @return none
    #
    name: ($0) ->
      name = $0.split('-')[1]

    #
    # Delete a program from local storage
    #
    # @param [String] file  program filename
    # @return none
    #
    purge: ($0) ->
      fs.deleteFile qualifyFilename($0.split('-')[1], type), ($err) ->
        if $err? then con.println $err


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
      con.println "Renumber Not Implemented"

    #
    # Run the program
    #
    # @param [String] lineno to start at
    # @return none
    #
    run: ($0) ->
      if Object.keys(raw).length>0
        start()
        run()

    #
    # Save the program
    #
    # @return none
    #
    save: () ->

      return con.println "Name not set" if name is ''

      $lines = []
      $text = ''

      for $lineno, $statement of raw
        $lines.push [$lineno, $statement.code]

      $lines.sort()
      for [$lineno, $code] in $lines
        $text += $lineno+' '+$code+'\n'

      save type, name, $text[0...-1], ($err) ->
        if $err? then con.println $err


    #
    # Scratch memory
    #
    scr: () ->
      initialize true

    #
    # Tron|Troff
    #
    troff: () -> trace = false
    tron: () -> trace = true


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
          raw[$lineno] =
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
          @dims = util.flatten($dims)
          @dim1 = @dims[0]
          @dim2 = @dims[1]
        else @is_array = false

      #
      # Set the variable value
      #
      let: ($value) ->
        if @is_string

          if gw
            if @dim2?
              $dim1 = @dim1.eval()
              $dim2 = @dim2.eval()
              strings[@name][$dim1][$dim2] = $value

            else if @dim1?
              $dim1 = @dim1.eval()
              strings[@name][$dim1] = $value

            else
              strings[@name] = $value

          else
            if @dim2?

              $start = @dim1.eval()-1
              $end = @dim2.eval()
              if $end < $start
                throw 'Invalid String index: '+@toString()
              $len = $end-$start
              $value = $value.substr(0,$len)
              $value = util.pad($value, $len)

              $str = strings[@name]
              strings[@name] = $str.substr(0,$start)+$value+$str.substr($end)

            else if @dim1?
              $start = @dim1.eval()-1
              $str = strings[@name]
              strings[@name] = $str.substr(0,$start)+$value+$str.substr($start+$value.length)

            else
              $len = strings[@name].length
              if $value.length < $len
                $value += Array($len-$value.length+1).join(' ')
              strings[@name] = $value

        else if @dim2?
          $dim1 = @dim1.eval()
          $dim2 = @dim2.eval()
          arrays[@name][$dim1][$dim2] = $value

        else if @dim1?
          $dim1 = @dim1.eval()
          arrays[@name][$dim1] = $value

        else
          variables[@name] = $value

      #
      # Get the variable value
      #
      eval: () ->

        if @is_string
          if gw
            if @dim2?
              $dim1 = @dim1.eval()
              $dim2 = @dim2.eval()
              strings[@name]?[$dim1]?[$dim2] ? ''

            else if @dim1?
              $dim1 = @dim1.eval()
              strings[@name]?[$dim1] ? ''

            else
              strings[@name] ? ''

          else
            if @dim2?

              $start = @dim1.eval()-1
              $end = @dim2.eval()
              if $end < $start
                throw 'Invalid String index: '+@toString()
              strings[@name]?.slice($start, $end) ? ''

            else if @dim1?
              $start = @dim1.eval()-1
              strings[@name]?.slice($start) ? ''

            else
              strings[@name] ? ''

        else if @dim2?
          $dim1 = @dim1.eval()
          $dim2 = @dim2.eval()
          arrays[@name]?[$dim1]?[$dim2] ? 0

        else if @dim1?
          $dim1 = @dim1.eval()
          arrays[@name]?[$dim1] ? 0

        else
          variables[@name] ? 0

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
        offset = @base
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
        con.pause true
        fs.readFile @program, ($err, $data) ->
          if $err?
            con.println $err
          else
            type = $data.type
            name = $data.name
            gw = if type is V_GWBASIC then true else false
            chain $data.data
          con.pause false
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
        @vars = util.flatten($vars)
      eval: ->
        for $var in @vars
          if /\$$/.test($var.name)

            if gw
              if $var.dims.length is 0
                strings[$var.name] = ''
              else
                strings[$var.name] = dim('', $var.dims...)

            else
              strings[$var.name] = Array($var.dims[0]+1).join(' ')
              common.push
                type: 0
                name: $var.name
          else

            if $var.dims.length is 0
              variables[$var.name] = 0
              common.push
                type: 1
                name: $var.name
            else
              arrays[$var.name] = dim(0, $var.dims...)
              common.push
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
        @data = util.flatten($data)
      eval: ->
        if data is null then data = []
        data = data.concat @data
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

        functions[@name] = ($par) =>

          $tmp = variables[@par]   # variable goes out of scope,
          variables[@par] = $par   # occluded by the local param
          $ret = @body.eval() # while we execute the function body
          variables[@par] = $tmp   # variable returns to scope
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
        @vars = util.flatten($vars)
      eval: ->
        for $var in @vars
          if /\$$/.test($var.name)

            if gw
              if $var.dims.length is 0
                strings[$var.name] = ''
              else
                strings[$var.name] = dim('', $var.dims...)

            else
              strings[$var.name] = Array($var.dims[0]+1).join(' ')

          else

            if $var.dims.length is 0
              variables[$var.name] = 0
            else
              arrays[$var.name] = dim(0, $var.dims...)

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
        eop = true
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
        con.input '', [@var]
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
        variables[@var] = valueOf(@start)
        stack.push {
          id:		FOR
          pc:		pc
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
        @of = util.flatten($of)
      eval: ->
        if @of.length>0
          $index = valueOf(@lineno)-1
          if @of[$index]?
            pc = xrf[@of[$index]]

        else
          pc = xrf[parseInt(@lineno, 10)]
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
        @of = util.flatten($of)
      eval: ->
        stack.push {
          id:		GOSUB
          pc:		pc
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
            pc = xrf[parseInt(@then, 10)]
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
        @source = util.flatten($format)
        @format = format(@source)
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
        @vars = util.flatten($vars)
      eval: ->
        con.input(@prompt, @vars)
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
        for $var in util.flatten($vars)
          if 'string' is typeof $var
            @vars.push new Var($var)
          else
            @vars.push $var

      eval: ->
        $value = valueOf(@value)
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

        if arrays[@var]?
          $i = arrays[@var].length
          $j = arrays[@var][offset].length
          arrays[@var] = dim($value, $i, $j)
        else
          arrays[@var] = dim($value, 10)
        return false

    #
    # Mat Read var1, var2, ... varN
    #
    MatRead: class MatRead extends Keyword
      constructor: ($vars) ->
        @vars = util.flatten($vars)
      eval: ->
        for $var in @vars
          if dp < data.length
            $var.let data[dp++].value
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
        $frame = stack[stack.length-1]
        if $frame.id isnt FOR
          throw "Next without for"

        $name = @var.name
        if $frame.name isnt $name
          throw "Mismatched For/Next #{$name}"

        $step = valueOf($frame.step)
        $counter = @var.eval() + $step
        @var.let $counter

        if $step < 0
          if $counter < valueOf($frame.end)
            stack.pop()
          else
            pc = $frame.pc
        else
          if $counter > valueOf($frame.end)
            stack.pop()
          else
            pc = $frame.pc
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
        @items = util.flatten([$items])
      eval: ->
        $str = ''
        for $item in @items
          $str += if isNaN($val = valueOf($item)) then $val else ' '+$val

        if $item in [Semic, Comma]
          con.print $str
        else
          con.println $str
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
        @items = util.flatten($items)
      eval: ->

        $i = xrf[@lineno]
        [$lineno, $statement] =  prog[$i]
        $args = []
        for $item in @items
          $args.push valueOf($item)

        if $item in [Semic, Comma]
          con.print util.sprintf($statement.code.format, $args)
        else
          con.println util.sprintf($statement.code.format, $args)
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
        @vars = util.flatten($vars)
      eval: ->
        for $var in @vars
          if dp < data.length
            $var.let data[dp++].value
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
        dp = 0
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
        $frame = stack.pop()
        while $frame.id isnt GOSUB
          $frame = stack.pop()
        pc = $frame.pc
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
        eop = true
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
      eval: -> Math.max(valueOf(@left), valueOf(@right))
      toString: -> "#{@left} MAX #{@right}"

    Min: class Min extends Operator
      eval: -> Math.min(valueOf(@left), valueOf(@right))
      toString: -> "#{@left} MIN #{@right}"
    #
    # +
    #
    Add: class Add extends Operator
      eval: -> valueOf(@left) + valueOf(@right)
      toString: -> "#{@left} + #{@right}"
    #
    # -
    #
    Sub: class Sub extends Operator
      eval: -> valueOf(@left) - valueOf(@right)
      toString: -> "#{@left} - #{@right}"
    #
    # *
    #
    Mul: class Mul extends Operator
      eval: -> valueOf(@left) * valueOf(@right)
      toString: -> "#{@left} * #{@right}"
    #
    # /
    #
    Div: class Div extends Operator
      eval: -> valueOf(@left) / valueOf(@right)
      toString: -> "#{@left} / #{@right}"
    #
    # ^
    #
    Pow: class Pow extends Operator
      eval: -> Math.pow(valueOf(@left), valueOf(@right))
      toString: -> "#{@left} ^ #{@right}"
    #
    # OR
    #
    OR: class OR extends Operator
      eval: -> valueOf(@left) or valueOf(@right)
      toString: -> "#{@left} OR #{@right}"
    #
    # AND
    #
    AND: class AND extends Operator
      eval: -> valueOf(@left) and valueOf(@right)
      toString: -> "#{@left} AND #{@right}"
    #
    # NOT
    #
    NOT: class NOT extends Operator
      eval: -> not valueOf(@left)
      toString: -> "NOT #{@left}"
    #
    # <
    #
    LT: class LT extends Operator
      eval: -> valueOf(@left) < valueOf(@right)
      toString: -> "#{@left} < #{@right}"
    #
    # >
    #
    GT: class GT extends Operator
      eval: -> valueOf(@left) > valueOf(@right)
      toString: -> "#{@left} > #{@right}"
    #
    # <=
    #
    LE: class LE extends Operator
      eval: -> valueOf(@left) <= valueOf(@right)
      toString: -> "#{@left} <= #{@right}"
    #
    # >=
    #
    GE: class GE extends Operator
      eval: -> valueOf(@left) >= valueOf(@right)
      toString: -> "#{@left} >= #{@right}"
    #
    # ==
    #
    EQ: class EQ extends Operator
      eval: -> if valueOf(@left) is valueOf(@right) then true else false
      toString: -> "#{@left} = #{@right}"
    #
    # !=
    #
    NE: class NE extends Operator
      eval: -> if valueOf(@left) isnt valueOf(@right) then true else false
      toString: -> "#{@left} <> #{@right}"




    #
    # User Defined Functions
    #
    FN: class FN
      constructor: (@name, @parm) ->
      eval:     -> functions[@name](valueOf(@parm))
      toString: -> "#{@name}(#{@parm})"

    #
    # Basic Builtin Functions
    #
    ABS: class ABS extends BuiltIn
      eval: -> Math.abs(valueOf(@$0))
    ATN: class ATN extends BuiltIn
      eval: -> Math.atan(valueOf(@$0))
    COS: class COS extends BuiltIn
      eval: -> Math.cos(valueOf(@$0))
    EXP: class EXP extends BuiltIn
      eval: -> Math.exp(valueOf(@$0))
    INT: class INT extends BuiltIn
      eval: -> Math.floor(valueOf(@$0))
    LEN: class LEN extends BuiltIn
      eval: -> valueOf(@$0).length
    LIN: class LIN extends BuiltIn
      eval: -> Array(Math.abs(valueOf(@$0))+1).join('\n')
    LOG: class LOG extends BuiltIn
      eval: -> Math.log(valueOf(@$0))
    RND: class RND extends BuiltIn
      eval: -> Math.random()
    SGN: class SGN extends BuiltIn
      eval: ->
        $0 = valueOf(@$0)
        if $0 < 0 then -1 else if $0 > 0 then 1 else 0
    SIN: class SIN extends BuiltIn
      eval: -> Math.sin(valueOf(@$0))
    SPA: class SPA extends BuiltIn
      eval: -> Array(valueOf(@$0)).join(" ")
    SQR: class SQR extends BuiltIn
      eval: -> Math.sqrt(valueOf(@$0))
    TAB: class TAB extends BuiltIn
      eval: -> Array(Math.floor(valueOf(@$0))).join(" ")
    TAN: class TAN extends BuiltIn
      eval: -> Math.tan(valueOf(@$0))
    TIM: class TIM extends BuiltIn
      eval: ->
        if valueOf(@$0) is 0 then (new Date()).getMinutes() else (new Date()).getSeconds()

    LCASE: class LCASE extends BuiltIn
      eval: -> valueOf(@$0).toLowerCase()
      toString: -> "LCASE(#{@$0}, #{@$1}, #{@$2})"
    LEFT: class LEFT extends BuiltIn
      eval: -> valueOf(@$0).substr(0, valueOf(@$1)-1)
      toString: -> "LEFT(#{@$0}, #{@$1}, #{@$2})"
    MID: class MID extends BuiltIn
      eval: -> valueOf(@$0).substring(valueOf(@$1), valueOf(@$2))
      toString: -> "MID(#{@$0}, #{@$1}, #{@$2})"
    RIGHT: class RIGHT extends BuiltIn
      eval: -> valueOf(@$0).substr(valueOf(@$1)-1)
      toString: -> "RIGHT(#{@$0}, #{@$1}, #{@$2})"
    SUBSTR: class SUBSTR extends BuiltIn
      eval: -> valueOf(@$0).substr(valueOf(@$1)-1, valueOf(@$2))
      toString: -> "SUBSTR(#{@$0}, #{@$1}, #{@$2})"
    UCASE: class UCASE extends BuiltIn
      eval: -> valueOf(@$0).toUpperCase()
      toString: -> "UCASE(#{@$0}, #{@$1}, #{@$2})"


