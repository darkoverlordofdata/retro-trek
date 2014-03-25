#+--------------------------------------------------------------------+
#| rte.chrome.coffee
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
# Rte Concerns - chrome app
#

do ->

  #
  # We don't care about persistence...
  #
  _localStorage = {}

  Object.defineProperty @, 'localStorage',
    get : -> return _localStorage
    set : (newValue) ->
    enumerable : true
    configurable : true

