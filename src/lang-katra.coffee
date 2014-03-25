#+--------------------------------------------------------------------+
#| lang-basic.coffee
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

# Based on code Contributed by peter dot kofler at code minus cop dot org

#
#  @fileoverview
#  Registers a language handler for Basic.
# 
#  To use, include prettify.js and this file in your HTML page.
#  Then put your code in an HTML tag like
#       <pre class="prettyprint lang-basic">(my BASIC code)</pre>
# 
#  @author peter dot kofler at code minus cop dot org
# 

PR.registerLangHandler(
  PR.createSimpleLexer(
    [ # shortcutStylePatterns
      # "single-line-string"
      [
        PR.PR_STRING
        /^(?:"(?:[^\\"\r\n]|\\.)*(?:"|$))/
        null
        '"'
      ]
      # Whitespace
      [
        PR.PR_PLAIN
        /^\s+/
        null
        ' \r\n\t\xA0'
      ]
    ],
    [ # fallthroughStylePatterns
      # A line comment that starts with REM
      [
        PR.PR_COMMENT
        /^REM[^\r\n]*/
        null
      ]
      [
        PR.PR_KEYWORD
        ///
          ^\b(?:
          ABS|
          ATN|
          COS|
          EXP|
          INT|
          LEN|
          LIN|
          LOG|
          RND|
          SGN|
          SIN|
          SPA|
          SQR|
          TAB|
          TAN|
          TIM|
          LCASE|
          LEFT|
          MID|
          RIGHT|
          SUBSTR|
          UCASE|
          ZER|
          CONS|
          AND|
          BASE|
          CHAIN|
          CLS|
          COM|
          DATA|
          DEF|
          FN[A-Z]|
          DIM|
          END|
          ENTER|
          FOR|
          GOSUB|
          GOTO|
          IF|
          IMAGE|
          INPUT|
          LET|
          MAT|
          NEXT|
          NOT|
          ON|
          OR|
          PRINT|
          RANDOMIZE|
          READ|
          RESTORE|
          RETURN|
          STEP|
          STOP|
          THEN|
          TO|
          USING)\b
        ///i
        null
      ]
      [
        PR.PR_PLAIN
        /^[A-Z][A-Z0-9]?(?:\$|%)?/i
        null
      ]
      # Literals .0, 0, 0.0 0E13
      [
        PR.PR_LITERAL
        /^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?/i
        null
        '0123456789'
      ]
      [
        PR.PR_PUNCTUATION
        /^.[^\s\w\.$%"]*/
        null
      ]
      # [PR.PR_PUNCTUATION,   /^[-,:;!<>=\+^\/\*]+/]
    ]),
  ['katra'])
