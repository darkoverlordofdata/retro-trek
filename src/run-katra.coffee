#+--------------------------------------------------------------------+
#| run-katra.coffee
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
# Run katra in the browser
#    <iframe src="run.html?root=&basic=hp2k&program=STTR1" width="820" height="600"></iframe>

$ ->
  katra = require('./katra')
  args = undefined # query args
  # parse the query args 
  parseQuery = ->
    if d16a?
      d16a.args
    else
      result = {}
      pairs = window.location.search.substring(1).split("&")
      for i of pairs
        if pairs[i].length > 0
          pair = pairs[i].split("=")
          result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])

      result

  
  # resize the console to match the window 
  setSize = ->
    $("div.console div.jquery-console-inner").offset
      top: 0
      left: 0

    $("div.console div.jquery-console-inner").width $(this).width() - 12
    $("div.console div.jquery-console-inner").height $(this).height() - 12

  
  # wait until you're done to trigger the end event 
  $(window).resize ->
    clearTimeout @resizeTO  if @resizeTO
    @resizeTO = setTimeout(->
      $(this).trigger "resizeEnd"
    , 500)

  
  # bind the end event 
  $(window).bind "resizeEnd", setSize
  
  # load & run the basic program 
  args = parseQuery()
  console.log args

  katra.setRoot args.root ? "/katra/"
  if Object.keys(args).length is 0
    args = title: "Katra BASIC"
    document.title = args.title
  katra.main args
  setSize()

