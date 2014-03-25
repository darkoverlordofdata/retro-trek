#+--------------------------------------------------------------------+
#| rte.node.coffee
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
# Rte Concerns - node.js
#
colors = require('colors')

module.exports =

  Console: class Console

    MODE_REPL       = 0       # Console REPL mode
    MODE_RUN        = 1       # Console RUN mode

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
