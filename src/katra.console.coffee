#+--------------------------------------------------------------------+
#| katra.console.coffee
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
# jQuery console plugin
#

do ($ = jQuery, window, document) ->


  #
  # Console Plugin
  #
  # @param  [Object]  options hash
  # @return [Object]  the plugin
  #
  $::console = ($options = {}) ->

    $.data(@, 'console') ? $.data(@, 'console', new Console(@, $options))


  class Console

    KEY_BS      = 8     # Backspace
    KEY_TAB     = 9     # Tab
    KEY_CR      = 13    # Enter
    KEY_ESC     = 27    # Escape
    KEY_UP      = 38    # Up Arrow
    KEY_DOWN    = 40    # Down Arrow
    KEY_C       = 67    # Ctrl/C
    KEY_R       = 82    # Ctrl/R

    colors = require('colors')
    fix = ($text) -> $text.replace(/\ /g, "&nbsp;").replace(/\n/g, "<br />")

    histpos     : 0     # current place in the history list
    history     : null  # the history list
    input       : null  # the kb element
    output      : null  # the output element
    prompt      : null  # the prompt element
    mode        : 0     # prompt mode
    options     : null
    default     :
      autofocus : true  # autofocus the console
      history   : true  # allow history (up/down keys)
      title     : ''    # inital message to display
      prompt    : '>'   # standard prompt
      promptAlt : '?'   # alternate prompt
      commandHandle: -> # callback to handle kb input
      cancelHandle: ->  # ctrl/c interrupt

    #
    # Create a new console
    #
    # @param  [Object]  DOM Node
    # @param  [Object]  options hash
    # @return [Void]
    #
    constructor: ($container, $options) ->

      @history = []
      @options = $.extend(@default, $options)
      #
      # render the ui
      #

      $container.html """
          <span class="output"></span>
          <span class="prompt"></span><input class="input"></input>
        """
      @output = $container.find('.output')
      @prompt = $container.find('.prompt')
      @input = $container.find('.input')
      @input.focus() if @options.autofocus
      @prompt.text @options.prompt
      #
      # pass the focus to input
      #
      $(window).on 'click', ($e) =>
        @input.focus()

      #
      # check for interrupt
      #
      $(document.body).on 'keydown', ($e) =>
        if $e.keyCode is KEY_ESC 
          $e.stopPropagation()
          $e.preventDefault()

      #
      # kb onclick
      #
      @input.on 'click', ($e) =>
        $e.target.value = $e.target.value # Sets cursor to end of input.

      #
      # history (up/down)
      #
      @input.on 'keyup', ($e) =>

        return unless @options.history
        $input = $e.target
        $temp = 0

        if @history.length
          if $e.keyCode is KEY_UP or $e.keyCode is KEY_DOWN
            if @history[@histpos]
              @history[@histpos] = $input.value
            else
              $temp = @input.value

          if $e.keyCode is KEY_UP
            @histpos--
            if @histpos < 0
              @histpos = 0

          else if $e.keyCode is KEY_DOWN
            @histpos++
            if @histpos > @history.length
              @histpos = @history.length

          if $e.keyCode is KEY_UP or $e.keyCode is KEY_DOWN
            $input.value = if @history[@histpos] then @history[@histpos] else $temp
            $input.value = $input.value # Sets cursor to end of input.



      #
      # ctrl/key
      #
      @input.on 'keydown', ($e) =>

        if ($e.ctrlKey or $e.metaKey)
          switch $e.keyCode

            when KEY_C  # CTRL/C - break
              @options.cancelHandle()
              $e.preventDefault()
              $e.stopPropagation()

            when KEY_R  # CTRL/R - reset
              @clear()
              $e.preventDefault()
              $e.stopPropagation()

      #
      # Enter
      #
      @input.on 'keydown', ($e) =>

        $input = $e.target

        switch $e.keyCode

          when KEY_BS
            return if not $input.value

          when KEY_TAB
            $e.preventDefault

          when KEY_CR

            if $input.value
              @history[@history.length] = $input.value #text()
              @histpos = @history.length

            # Duplicate current input and append to output section.
            $prompt = if @mode then @options.promptAlt else @options.prompt
            @output.append "#{$prompt}#{$input.value}<br />"
            $input.scrollIntoView()

            if ($input.value and $input.value.trim())
              @options.commandHandle $input.value
            $input.value = '' # Clear/setup line for next input.


    #
    # Clear the console
    #
    # @return [Void]
    #
    clear: () ->
      @output.html ''
      @println @options.title if @options.title

    #
    # Sets the console prompt:
    #
    #   true  - use alternate prompt
    #   false - use standard prompt
    #
    # @param  [Boolean]  prompt selector
    # @return [Void]
    #
    setPrompt: ($prompt=false) ->
      @prompt.text if $prompt then @options.promptAlt else @options.prompt
      @mode = $prompt

    #
    # Print string to output
    #
    # @param  [String]  html string
    # @return [Void]
    #
    print: ($text='') ->
      @output.append fix($text)
      @input.get(0).scrollIntoView()

    #
    # Print string to output with new line
    #
    # @param  [String]  html string
    # @return [Void]
    #
    println: ($text='') ->
      @output.append fix("#{$text}\n")
      @input.get(0).scrollIntoView()

    #
    # Print debug string to output with new line
    #
    # @param  [String]  html string
    # @return [Void]
    #
    debug: ($text) ->
      @output.append fix("#{$text}\n").blue
      @input.get(0).scrollIntoView()

    #
    # Print highlighted string to output with new line
    #
    # @param  [String]  html string
    # @return [Void]
    #
    hilite: ($text) ->
      @output.append fix("#{$text}\n").yellow
      @input.get(0).scrollIntoView()
