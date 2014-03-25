#+--------------------------------------------------------------------+
#| Cakefile
#+--------------------------------------------------------------------+
#| Copyright DarkOverlordOfData (c) 2014
#+--------------------------------------------------------------------+
#|
#| This file is a part of Frodo
#|
#| Frodo is free software; you can copy, modify, and distribute
#| it under the terms of the MIT License
#|
#+--------------------------------------------------------------------+
#
# cake utils
#
fs = require 'fs'
util = require 'util'
{exec} = require 'child_process'
{nfcall} = require 'q'


#
# Build app.js
#
#
task 'build:src', 'Build the coffee app', ->

  if not fs.existsSync('tmp/') then fs.mkdirSync('tmp')
  if not fs.existsSync('app/') then fs.mkdirSync('app')
  if not fs.existsSync('app/js/') then fs.mkdirSync('app/js')

  #
  # Build the application
  #
  start = new Date().getTime()
  nfcall exec, 'coffee -o tmp -c -b src'

  .then ->
      nfcall exec, 'browserify --debug tmp/rte.chrome.js > app/js/rte.chrome.js'

  .then ->
      nfcall exec, 'browserify --debug tmp/run-katra.js > app/js/app.js'

  .then ->
      nfcall exec, 'browserify --debug tmp/run-katra.js | uglifyjs > app/js/app.min.js'

  .fail ($err) ->
    util.error $err

  .done ($args) ->
    util.log $text for $text in $args when not /\s*/.test $text
    util.log "Compiled in #{new Date().getTime() - start} ms"


#
# Build kc.js
#
#
task 'build:parser', 'Build the parser using BNF template', ->

  if not fs.existsSync('tmp/') then fs.mkdirSync('tmp')
  #
  # Generate the parser
  #
  start = new Date().getTime()

  nfcall exec, 'jison src/kc.y src/kc.l --outfile tmp/kc.js'

  .fail ($err) ->
      util.error $err

  .done ($args) ->
      util.log $text for $text in $args when not /\s*/.test $text
      util.log "Compiled in #{new Date().getTime() - start} ms"

