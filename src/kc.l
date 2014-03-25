/*
#+--------------------------------------------------------------------+
# kc.l
#+--------------------------------------------------------------------+
# Copyright DarkOverlordOfData (c) 2013
#+--------------------------------------------------------------------+
#
# This file is a part of Katrac
#
# Katrac is free software; you can copy, modify, and distribute
# it under the terms of the MIT License
#
#+--------------------------------------------------------------------+
#
#   Katrac JISON Lexer
#
#       Maps patterns to tokens
#
*/

/*
#   Define some RegExp patterns
#
*/
Char                [.\n]
Digit               [0-9]
Letter              [A-Za-z]
AlphaNum            [A-Za-z0-9]

Identifier          {Letter}{AlphaNum}?
Var                 {Identifier}[$%]?
Integer             {Digit}+
/*
Number              {Digit}*"."{Digit}+
*/
Number              {Digit}*"."{Digit}+([eE][-+]?[0-9]+)?
String              \"[^"]*\"
Filename            [\$\*\@\!\#]?[A-Za-z][A-Za-z0-9]+
FuncID              [Ff][Nn]{Letter}
List                [0-9,]+
LineNo              [\-]{Digit}+
Lines               [\-]{List}
Port                [\#]{Letter}
CLS                 [Cc][Ll][Ss]
TRON                [Tt][Rr][Oo][Nn]
TROFF               [Tt][Rr][Oo][Ff][Ff]

/* Command Tokens */
APP                 [Aa][Pp][Pp][Ee]?[Nn]?[Dd]?[\-]{Filename}
ATA                 [Aa][Tt][Aa][Rr][Ii]
CAT                 [Cc][Aa][Tt][Aa]?[Ll]?[Oo]?[Gg]?
CSA                 [Cc][Ss][Aa][Vv]?[Ee]?
DEL                 [Dd][Ee][Ll][Ee]?[Tt]?[Ee]?{Lines}?
DIR                 [Dd][Ii][Rr]
EXE                 [Ee][Xx][Ee][Cc]?[Uu]?[Tt]?[Ee]?[\-]{Filename}
FIL                 [Ff][Ii][Ll][Ee][Ss]
GET                 [Gg][Ee][Tt][\-]{Filename}
GRO                 [Gg][Rr][Oo][Uu]?[Pp]?
GWB                 [Gg][Ww][Bb]?[Aa]?[Ss]?[Ii]?[Cc]?
LIB                 [Ll][Ii][Bb][Rr]?[Aa]?[Rr]?[Yy]?
LIS                 [Ll][Ii][Ss][Tt]?{Lines}?
NAM                 [Nn][Aa][Mm][Ee]?[\-]{Filename}
PUR                 [Pp][Uu][Rr][Gg]?[Ee]?[\-]{Filename}
REN                 [Rr][Ee][Nn][Uu]?[Mm]?[Bb]?[Ee]?[Rr]?{Lines}?
RUN                 [Rr][Uu][Nn]{LineNo}?
SAV                 [Ss][Aa][Vv][Ee]?
SCR                 [Ss][Cc][Rr][Aa]?[Tt]?[Cc]?[Hh]?
TES                 [Tt][Ee][Ss][Tt]?




/* Keyword Tokens */
ABS                 [Aa][Bb][Ss]
AND                 [Aa][Nn][Dd]
ATN                 [Aa][Tt][Nn]
BASE                [Bb][Aa][Ss][Ee]
CHAIN               [Cc][Hh][Aa][Ii][Nn]
COM                 [Cc][Oo][Mm]
CON                 [Cc][Oo][Nn]
COS                 [Cc][Oo][Ss]
DATA                [Dd][Aa][Tt][Aa]
DEF                 [Dd][Ee][Ff]
DIM                 [Dd][Ii][Mm]
END                 [Ee][Nn][Dd]
ENTER               [Ee][Nn][Tt][Ee][Rr]
EXP                 [Ee][Xx][Pp]
FILES               [Ff][Ii][Ll][Ee][Ss]
FOR                 [Ff][Oo][Rr]
GOSUB               [Gg][Oo][Ss][Uu][Bb]
GOTO                [Gg][Oo][Tt][Oo]
GO                  [Gg][Oo]
IF                  [Ii][Ff]
IMAGE               [Ii][Mm][Aa][Gg][Ee]
INPUT               [Ii][Nn][Pp][Uu][Tt]
INT                 [Ii][Nn][Tt]
LIN                 [Ll][Ii][Nn]
LET                 [Ll][Ee][Tt]
LOG                 [Ll][Oo][Gg]
MAT                 [Mm][Aa][Tt]
NEXT                [Nn][Ee][Xx][Tt]
MAX                 [Mm][Aa][Xx]
MIN                 [Mm][Ii][Nn]
NEXT                [Nn][Ee][Xx][Tt]
NOT                 [Nn][Oo][Tt]
OF                  [Oo][Ff]
OR                  [Oo][Rr]
PRINT               [Pp][Rr][Ii][Nn][Tt]
QUIT                [Qq][Uu][Ii][Tt]
RANDOMIZE           [Rr][Aa][Nn][Dd][Oo][Mm][Ii][Zz][Ee]
REM                 [Rr][Ee][Mm]
READ                [Rr][Ee][Aa][Dd]
RESTORE             [Rr][Ee][Ss][Tt][Oo][Rr][Ee]
RETURN              [Rr][Ee][Tt][Uu][Rr][Nn]
SGN                 [Ss][Gg][Nn]
SIN                 [Ss][Ii][Nn]
SQR                 [Ss][Qq][Rr]
STEP                [Ss][Tt][Ee][Pp]
STOP                [Ss][Tt][Oo][Pp]
TAB                 [Tt][Aa][Bb]
TAN                 [Tt][Aa][Nn]
TIM                 [Tt][Ii][Mm]
THEN                [Tt][Hh][Ee][Nn]
TO                  [Tt][Oo]
RND                 [Rr][Nn][Dd]
USING               [Uu][Ss][Ii][Nn][Gg]
ZER                 [Zz][Ee][Rr]


LCASE               [Ll][Cc][Aa][Ss][Ee][\$]
LEFT                [Ll][Ee][Ff][Tt][\$]
LEN                 [Ll][Ee][Nn]
MID                 [Mm][Ii][Dd][\$]
RIGHT               [Rr][Ii][Gg][Hh][Tt][\$]
SUBSTR              [Ss][Uu][Bb][Ss][Tt][Rr]
UCASE               [Uu][Cc][Aa][Ss][Ee][\$]


%%
/*
#+--------------------------------------------------------------------+
# Match                 Token
#+--------------------------------------------------------------------+
#
#   Delimeters & Operators
#
*/
\n                      return 'NEWLINE';
[\t ]+                  /* skip whitespace */;
"*"                     return '*';
"/"                     return '/';
"-"                     return '-';
"+"                     return '+';
"^"                     return '^';
"=="                    return 'EQ';
"="                     return '=';
"<>"                    return 'NE';
"<="                    return 'LE';
">="                    return 'GE';
"<"                     return '<';
">"                     return '>';
{MAX}                   return 'MAX';
{MIN}                   return 'MIN';
{AND}                   return 'AND';
{OR}                    return 'OR';
{NOT}                   return 'NOT';
"("                     return '(';
")"                     return ')';
"["                     return '[';
"]"                     return ']';
","                     return ',';
":"                     return ':';
";"                     return ';';

/*
#
#   Commands
#
*/
{TRON}                  return 'TRON';
{TROFF}                 return 'TROFF';

{APP}                   return 'APPEND';
{ATA}                   return 'ATARI';
{CAT}                   return 'CATALOG';
{DEL}                   return 'DELETE';
{DIR}                   return 'DIR';
{EXE}                   return 'EXECUTE';
{FIL}                   return 'FILES';
{GET}                   return 'GET';
{GRO}                   return 'GROUP';
{GWB}                   return 'GWBASIC';
{LIB}                   return 'LIBRARY';
{LIS}                   return 'LIST';
{NAM}                   return 'NAME'
{PUR}                   return 'PURGE';
{REN}                   return 'RENUMBER';
{RUN}                   return 'RUN';
{SAV}                   return 'SAVE';
{SCR}                   return 'SCRATCH';
{TES}                   return 'TEST';

/*
#
#   Basic Keywords
#
*/
{ABS}                   return 'ABS';
{ATN}                   return 'ATN';
{COS}                   return 'COS';
{EXP}                   return 'EXP';
{INT}                   return 'INT';
{LEN}                   return 'LEN';
{LIN}                   return 'LIN';
{LOG}                   return 'LOG';
{RND}                   return 'RND';
{SGN}                   return 'SGN';
{SIN}                   return 'SIN';
{SQR}                   return 'SQR';
{TAB}                   return 'TAB';
{TAN}                   return 'TAN';
{TIM}                   return 'TIM';

{LCASE}                 return 'LCASE';
{LEFT}                  return 'LEFT';
{MID}                   return 'MID';
{RIGHT}                 return 'RIGHT';
{SUBSTR}                return 'SUBSTR';
{UCASE}                 return 'UCASE';

{CLS}                   return 'CLS';
{CHAIN}                 return 'CHAIN';
{CON}                   return 'CON';
{COM}                   return 'COM';
{BASE}                  return 'BASE';
{DATA}                  return 'DATA';
{DEF}                   return 'DEF';
{DIM}                   return 'DIM';
{END}                   return 'END';
{ENTER}                 return 'ENTER';
{FOR}                   return 'FOR';
{GOSUB}                 return 'GOSUB';
{GOTO}                  return 'GOTO';
{GO}                    return 'GO';
{IF}                    return 'IF';
{IMAGE}                 return 'IMAGE';
{INPUT}                 return 'INPUT';
{LET}                   return 'LET';
{MAT}                   return 'MAT'
{NEXT}                  return 'NEXT';
{OFF}                   return 'OFF';
{OF}                    return 'OF';
{ON}                    return 'ON';
{PRINT}                 return 'PRINT';
{QUIT}                  return 'QUIT';
{RANDOMIZE}             return 'RANDOMIZE';
{REM}.*                 return 'REM';
{READ}                  return 'READ';
{RESTORE}               return 'RESTORE';
{RETURN}                return 'RETURN'
{STEP}                  return 'STEP';
{STOP}                  return 'STOP';
{THEN}                  return 'THEN';
{TO}                    return 'TO';
{USING}                 return 'USING';
{ZER}                   return 'ZER';

/*
#
#   Identifiers
#
#       - these must be at end of the list
#
*/
{Number}                return 'NUMBER';
{Integer}               return 'INTEGER';
{String}                return 'STRING';
{FuncID}                return 'FND';
{Var}                   return 'VAR';
{Port}                  return 'PORT';

/*
#
#   That's All, Folks!
#
*/
<<EOF>>                 return 'EOF';
.                       return 'INVALID';
