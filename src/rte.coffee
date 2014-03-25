#+--------------------------------------------------------------------+
#| rte.browser.coffee
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
# Rte Concerns - browser
#
MODE_REPL       = 0     # Console REPL mode
MODE_RUN        = 1     # Console RUN mode



module.exports = rte = if window?


  Console: class Console

    #
    # load the jQuery plugin
    #
    require './katra.console'

    #
    # katra.console config:
    #
    autofocus: true
    prompt: '>'
    promptAlt: '?'
    history: true
    title: ''

    mode: MODE_REPL
    element: ''
    console: null
    buffer: null
    vars: null

    #
    # initialize a console
    #
    # @param  [String]  element DOM root element
    # @param  [String]  prompt  string to print
    # @return none
    #
    constructor: (@element = '.console', @prompt = '>') ->
      @clear()

    #
    # callback to validate the input
    #
    # @param  [String]  line  the line that was entered
    # @return true if input is valid
    #
    commandValidate: ($line) ->
      if $line is "" then false else true

    #
    # input from console
    #
    # @param  [String]  prompt  text to print
    # @param  [Array] vars  list of variables to input
    # @return true to trigger wait for io
    #
    input: ($prompt, $vars) ->
      @print $prompt if $prompt?
      @buffer = []
      @vars = $vars
      true

    #
    # pause the input listener?
    #
    # @param  [Boolean]  set  value to set pause
    # @return [Void]
    #
    pause: ($set) ->
      return

    setPrompt: ($prompt) ->
      @console.setPrompt $prompt

    setMode: ($mode) ->
      @mode = $mode

    debug: ($text) ->
      @console.debug $text

    #
    # hilite output
    #
    # @param  [String]  text  text to print
    # @return none
    #
    hilite: ($text) ->
      @console.hilite $text

    #
    # print to console
    #
    # @param  [String]  text  text to print
    # @return none
    #
    print: ($text) ->
      @console.print $text

    #
    # print with newline to console
    #
    # @param  [String]  text  text to print
    # @return none
    #
    println: ($text) ->
      @console.println $text

    #
    # create a new console, erasing the previuos
    #
    # @return none
    #
    clear: ->
      @console = $(@element).console(@)
      @console.clear()



  FileSystem: class FileSystem

    $root = '/'
    #
    # Implements the same syntax as ajax
    #
    _get = ($name, $next) ->
      if localStorage[$name]?
        $next localStorage[$name]
      else
        $next ''
    #
    # Set the window title to show the filename
    #
    _set_title = ($filename) ->

      $name = $filename.split('/').pop()

      if /\[.*\]$/.test document.title
        document.title.replace(/\[(.*)\]$/, $name)
      else
        document.title += " - [#{$name}]"


    setRoot: ($path) ->
      $root = $path

    #
    # read from file
    #
    # @param  [Integer] version version of basic
    # @param  [String]  filename
    # @param  [Function]  next  callback
    # @return [Void]
    #
    readFile: ($filename, $next) ->

      if localStorage[$filename]?
        _get $filename, ($data) ->
          _set_title $filename
          $next null, String($data);

      else
        $.get $root+$filename+'.bas', ($data) ->
          _set_title $filename
          $next null, String($data);


    #
    # write to file
    #
    # @param  [String]  filename
    # @param  [String]  data
    # @param  [Function]  next  callback
    # @return [Void]
    #
    writeFile: ($filename, $data, $next) ->
      localStorage[$filename] = $data
      $next null

    #
    # delete file
    #
    # @param  [String]  filename
    # @param  [Function]  next  callback
    # @return [Void]
    #
    deleteFile: ($filename, $next) ->
      delete localStorage[$filename]
      $next null

    #
    # read dir
    #
    # @param  [Integer]  dir  CATALOG | GROUP | LIBRARY
    # @param  [Function]  next  callback
    # @return [Void]
    #
    readDir: ($dir, $next) ->

      $next ($name+'.bas' for $name, $path of _data[$dir]).concat(
        if $dir is 'CATALOG'
          ($name.split('/').pop()+'.bas' for $name, $value of localStorage)
        else
          [])

    _data =
      ATARI:
        SRTRK   : 'bas/atari/SRTRK.bas'
        WUMPUS  : 'bas/atari/WUMPUS.bas'
      GWBASIC:
        eliza   : 'bas/gwbasic/eliza.bas'
        romulan : 'bas/gwbasic/romulan.bas'
      GROUP:
        TREK0   : 'bas/hp2k/group/TREK0.bas'
        TREK1   : 'bas/hp2k/group/TREK1.bas'
        TREK2   : 'bas/hp2k/group/TREK2.bas'
        TREK3   : 'bas/hp2k/group/TREK3.bas'
        TREK4   : 'bas/hp2k/group/TREK4.bas'
        TREK73  : 'bas/hp2k/group/TREK73.bas'
      LIBRARY:
        TRADER  : 'bas/hp2k/system/TRADER.bas'
        TRADES  : 'bas/hp2k/system/TRADES.bas'
      TEST:
        data    : 'bas/hp2k/test/data.bas'
        def     : 'bas/hp2k/test/def.bas'
        dim     : 'bas/hp2k/test/dim.bas'
        for     : 'bas/hp2k/test/for.bas'
        gosub   : 'bas/hp2k/test/gosub.bas'
        if      : 'bas/hp2k/test/if.bas'
        input   : 'bas/hp2k/test/input.bas'
        let     : 'bas/hp2k/test/let.bas'
        numbers : 'bas/hp2k/test/numbers.bas'
        print   : 'bas/hp2k/test/print.bas'
        test    : 'bas/hp2k/test/test.bas'
        unary   : 'bas/hp2k/test/unary.bas'
      CATALOG:
        OREGON  : 'bas/hp2k/OREGON.bas'
        STRTR1  : 'bas/hp2k/STRTR1.bas'
        STTR1   : 'bas/hp2k/STTR1.bas'

else

  Console: class Console

    colors = require('colors')

    #
    # @property [Array<String>] buffer  Input buffer
    #
    buffer: null
    #
    # @property [Array<String>] vars  names of variables to input
    #
    vars: null
    #
    # @property [Boolean] paused  true when input listener is paused
    #
    paused: false
    #
    # @property [String] prompt  REPL prompt
    #
    prompt: ''
    #
    # @property [String] altPrompt  RUN prompt
    #
    altPrompt: '?'

    #
    # Start listening for input
    #
    # @param  [String]  prompt  the repl prompt
    # @return [Void]
    #
    constructor: (@prompt = 'katra> ') ->

      stdin = process.openStdin()
      process.stdout.write @prompt
      stdin.addListener "data", @listener

    #
    # the input listener
    #
    # @param  [Object]  data  the buffer that was entered
    # @return [Void]
    #
    listener: ($data) =>
      @commandHandle $data.toString()
      if @mode is MODE_REPL
        process.stdout.write @prompt unless @paused
      else
        process.stdout.write @altPrompt


    setPrompt: ($prompt) ->
      return

    #
    # pause the input listener?
    #
    # @param  [Boolean]  set  value to set pause
    # @return [Void]
    #
    pause: ($set) =>

      #
      # No change? Do nothing
      #
      return if @paused is $set

      #
      # toggle the input listener
      #
      if (@paused = $set)
        process.stdin.removeListener "data", @listener
      else
        process.stdin.addListener "data", @listener
        if @mode is MODE_REPL
          process.stdout.write @prompt
        else
          process.stdout.write @altPrompt

    #
    # input from console
    #
    # @param  [String]  prompt  text to print
    # @param  [Array] vars  list of variables to input
    # @return true to trigger wait for io
    #
    input: ($prompt, $vars) ->
      @pause false if @paused
      @print $prompt if $prompt?
      @buffer = []
      @vars = $vars
      true

    #
    # debug/tron output
    #
    # @param  [String]  text  text to print
    # @return none
    #
    debug: ($text) ->
      process.stdout.write $text.blue+'\n'

    #
    # hilite output
    #
    # @param  [String]  text  text to print
    # @return none
    #
    hilite: ($text) ->
      process.stdout.write $text.yellow+'\n'

    #
    # print to console
    #
    # @param  [String]  text  text to print
    # @return none
    #
    print: ($text = '') ->
      process.stdout.write $text

    #
    # print with newline to console
    #
    # @param  [String]  text  text to print
    # @return none
    #
    println: ($text= '') ->
      process.stdout.write $text+'\n'

    #
    # create a new console, erasing the previuos
    #
    # @return none
    #
    clear: ->



  #
  # File System
  #
  FileSystem: class FileSystem

    fs = require('fs')
    path = require('path')
    $root = __dirname[0..__dirname.lastIndexOf('/')]

    setRoot: ($path) ->
      $root = $path

    #
    # read from file
    #
    # @param  [Integer] version version of basic
    # @param  [String]  filename
    # @param  [Function]  next  callback
    # @return [Void]
    #
    readFile: ($filename, $next) ->

      fs.readFile path.join($root, $filename)+'.bas', ($err, $data) ->
        if $err? then $next $err
        else $next null, String($data)


    #
    # write to file
    #
    # @param  [String]  filename
    # @param  [String]  data
    # @param  [Function]  next  callback
    # @return [Void]
    #
    writeFile: ($filename, $data, $next) ->
      fs.writeFile path.join($root, $filename)+'.bas', "#{$filename}\n\n#{$data}", $next

    #
    # delete file
    #
    # @param  [String]  filename
    # @param  [Function]  next  callback
    # @return [Void]
    #
    deleteFile: ($filename, $next) ->
      fs.unlink path.join($root, $filename)+'.bas', $next

    #
    # read dir
    #
    # @param  [Integer]  dir  CATALOG | GROUP | LIBRARY
    # @param  [Function]  next  callback
    # @return [Void]
    #
    readDir: ($dir, $next) ->

      fs.readdir $root+_data[$dir], ($err, $files) ->
        if $err? then $next []
        else $next ($name for $name in $files when /.*\.bas$/.test $name)


    _data =
      ATARI   : 'bas/atari/'
      GWBASIC : 'bas/gwbasic/'
      GROUP   : 'bas/hp2k/group/'
      LIBRARY : 'bas/hp2k/system/'
      TEST    : 'bas/hp2k/test/'
      CATALOG : 'bas/hp2k/'

