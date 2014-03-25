/*
#+--------------------------------------------------------------------+
# kc.y
#+--------------------------------------------------------------------+
# Copyright DarkOverlordOfData (c) 2013
#+--------------------------------------------------------------------+
#
# This file is a part of Katra
#
# Katra is free software; you can copy, modify, and distribute
# it under the terms of the MIT License
#
#+--------------------------------------------------------------------+
#
#   Katra JISON Grammar
#
#       Maps grammar rules to the runtime ast
#
#
#   To use:
#
#       <script type='text/javascript' src='/js/rte.browser.js'></script>
#       <script type='text/javascript' src='/js/kc.bnf.js'></script>
#
*/
%{

    katra = require('./katra');
    command = katra.command;
    keyword = katra.keyword;
%}


%left OR
%left AND
%left '=' EQ NE '<' '>' LE GE
%left NOT
%left MAX MIN
%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%left ','
%left ';'
%left ':'

%start Program
%%
/*
#+--------------------------------------------------------------------+
#     Rule                                  Action
#+--------------------------------------------------------------------+
#
#   Program structure
#
*/
Program
    : Command NEWLINE EOF       -> new keyword.Statement($1)
    | Lines EOF
    ;


Lines
    : Lines Line NEWLINE
    | Line NEWLINE
    | NEWLINE
    ;

Line
    : Statement                     -> new keyword.Statement($1)
    | INTEGER Statement             -> new keyword.Statement($2, $1)
    ;

/*
#
#   Commands - only available using REPL
#
#   force a return value TRUE.
#
*/
Command
    : ATARI STRING                      { command.atari($2); return true;}
    | CLS                               { command.cls(); return true;}
    | GWBASIC STRING                    { command.gwbasic($2); return true;}
    | TRON                              { command.tron(); return true;}
    | TROFF                             { command.troff(); return true;}

    | APPEND                            { command.append($1); return true;}
    | CATALOG                           { command.cat('CATALOG'); return true;}
    | DELETE                            { command.del($1); return true;}
    | DIR                               { command.cat('GWBASIC'); return true;}
    | EXECUTE                           { command.exec($1); return true;}
    | FILES                             { command.cat('ATARI'); return true;}
    | GET                               { command.get($1); return true;}
    | GROUP                             { command.cat('GROUP'); return true;}
    | INTEGER                           { command.del("del-"+$1); return true;}
    | LIBRARY                           { command.cat('LIBRARY'); return true;}
    | LIST                              { command.list($1); return true;}
    | NAME                              { command.name($1); return true;}
    | PURGE                             { command.purge($1); return true;}
    | RENUMBER                          { command.renum($1); return true;}
    | QUIT                              { command.quit(); return true;}
    | RUN                               { command.run($1); return true;}
    | SAVE                              { command.save(); return true;}
    | SCRATCH                           { command.scr(); return true;}
    | TEST                              { command.cat('TEST'); return true;}
    ;

/*
#
#   Each statement in a program
#
*/
Statement
    : BASE '(' INTEGER ')'              -> new keyword.Base($3)
    | CHAIN STRING                      -> new keyword.Chain($2)
    | COM DimList                       -> new keyword.Com($2)
    | DATA ConstantList                 -> new keyword.Data($2)
    | DEF FND '(' VAR ')' '=' Expression
                                        -> new keyword.Def($2, $4, $7)
    | DIM DimList                       -> new keyword.Dim($2)
    | END                               -> new keyword.End()
    | ENTER PORT ',' VAR ',' VAR ',' VAR
                                        -> new keyword.Enter($2, $4, $6, $8)
    | ENTER VAR ',' VAR ',' VAR         -> new keyword.Enter($2, $4, $6)
    | FOR VAR '=' Expression TO Expression STEP Expression
                                        -> new keyword.For($2, $4, $6, $8)
    | FOR VAR '=' Expression TO Expression
                                        -> new keyword.For($2, $4, $6)
    | GO TO INTEGER                     -> new keyword.Goto($3)
    | GOTO INTEGER                      -> new keyword.Goto($2)
    | GOTO Expression OF IntegerList    -> new keyword.Goto($2, $4)
    | GOSUB INTEGER                     -> new keyword.Gosub($2)
    | GOSUB Expression OF IntegerList   -> new keyword.Gosub($2, $4)
    | IF Expression GOTO INTEGER        -> new keyword.If($2, $4)
    | IF Expression THEN INTEGER        -> new keyword.If($2, $4)
    | IF Expression THEN Statement      -> new keyword.If($2, $4)
    | IMAGE ImageList                   -> new keyword.Image($2)
    | INPUT VarList                     -> new keyword.Input($2)
    | INPUT STRING ',' VarList          -> new keyword.Input($4, $2)
    | LET LetList Expression            -> new keyword.Let($2, $3)
    | LetList Expression                -> new keyword.Let($1, $2)
    | MAT READ VarList                  -> new keyword.MatRead($3)
    | MAT VAR '=' ZER                   -> new keyword.Mat(new keyword.Var($2), keyword.Zer)
    | MAT VAR '=' CON                   -> new keyword.Mat(new keyword.Var($2), keyword.Con)
    | NEXT VAR                          -> new keyword.Next(new keyword.Var($2))
    | PRINT PrintList PrintSep          -> new keyword.Print($2, $3)
    | PRINT PrintList                   -> new keyword.Print($2)
    | PRINT                             -> new keyword.Print(new keyword.Const(''))
    | PRINT USING INTEGER ';' VarList   -> new keyword.Using($3, $5)
    | PRINT USING INTEGER               -> new keyword.Using($3)
    | RANDOMIZE                         -> new keyword.Randomize()
    | READ VarList                      -> new keyword.Read($2)
    | RESTORE                           -> new keyword.Restore()
    | RESTORE INTEGER                   -> new keyword.Restore($2)
    | RETURN                            -> new keyword.Return()
    | REM                               -> new keyword.Rem($1)
    | STOP                              -> new keyword.Stop()
    ;

/*
#
#   Expressions
#
*/
Expression
    : Expression OR  Expression             -> new keyword.OR($1, $3)
    | Expression AND Expression             -> new keyword.AND($1, $3)
    | NOT Expression                        -> new keyword.NOT($2)
    | Expression EQ  Expression             -> new keyword.EQ($1, $3)
    | Expression NE  Expression             -> new keyword.NE($1, $3)
    | Expression '>' Expression             -> new keyword.GT($1, $3)
    | Expression GE  Expression             -> new keyword.GE($1, $3)
    | Expression '<' Expression             -> new keyword.LT($1, $3)
    | Expression LE  Expression             -> new keyword.LE($1, $3)
    | Expression MAX Expression             -> new keyword.Max($1, $3)
    | Expression MIN Expression             -> new keyword.Min($1, $3)
    | Expression '+' Expression             -> new keyword.Add($1, $3)
    | Expression '-' Expression             -> new keyword.Sub($1, $3)
    | Expression '*' Expression             -> new keyword.Mul($1, $3)
    | Expression '/' Expression             -> new keyword.Div($1, $3)
    | Expression '^' Expression             -> new keyword.Pow($1, $3)
    | '-' Expression %prec UMINUS           -> -$2
    | '(' Expression ')'                    -> $2
    | VAR                                   -> new keyword.Var($1)
    | VAR '[' ExpressionList ']'            -> new keyword.Var($1, $2, $3)
    | VAR '(' ExpressionList ')'            -> new keyword.Var($1, $2, $3)
    | FND '(' Expression ')'                -> new keyword.FN($1, $3)
    | ABS '(' Expression ')'                -> new keyword.ABS($3)
    | ATN '(' Expression ')'                -> new keyword.ATN($3)
    | COS '(' Expression ')'                -> new keyword.COS($3)
    | EXP '(' Expression ')'                -> new keyword.EXP($3)
    | INT '(' Expression ')'                -> new keyword.INT($3)
    | LEN '(' Expression ')'                -> new keyword.LEN($3)
    | LIN '(' Expression ')'                -> new keyword.LIN($3)
    | LOG '(' Expression ')'                -> new keyword.LOG($3)
    | RND '(' Expression ')'                -> new keyword.RND($3)
    | SGN '(' Expression ')'                -> new keyword.SGN($3)
    | SIN '(' Expression ')'                -> new keyword.SIN($3)
    | SPA '(' Expression ')'                -> new keyword.SPA($3)
    | SQR '(' Expression ')'                -> new keyword.SQR($3)
    | TAB '(' Expression ')'                -> new keyword.TAB($3)
    | TAN '(' Expression ')'                -> new keyword.TAN($3)
    | TIM '(' Expression ')'                -> new keyword.TIM($3)

    | LCASE '(' Expression ')'              -> new keyword.LCASE($3)
    | LEFT '(' Expression ',' Expression ')'
                                            -> new keyword.LEFT($3, $5)
    | MID '(' Expression ',' Expression ',' Expression ')'
                                            -> new keyword.MID($3, $5, $7)
    | RIGHT '(' Expression ',' Expression ')'
                                            -> new keyword.RIGHT($3, $5)
    | SUBSTR '(' Expression ',' Expression ',' Expression ')'
                                            -> new keyword.SUBSTR($3, $5, $7)
    | UCASE '(' Expression ')'              -> new keyword.UCASE($3)
    | Constant                              -> $1
    ;

Constant
    : INTEGER                                   -> new keyword.Const(parseInt($1, 10))
    | STRING                                    -> new keyword.Const($1)
    | NUMBER                                    -> new keyword.Const(Number($1))
    ;

/*
#
#   Dim arrays
#
*/
DimList
    : Dim                                       -> [$1]
    | DimList ',' Dim                           -> [$1, $3]
    ;

Dim
    : VAR                                       -> new keyword.Var($1)
    | VAR '[' IntegerList ']'                   -> new keyword.Var($1, $2, $3)
    | VAR '(' IntegerList ')'                   -> new keyword.Var($1, $2, $3)
    ;

/*
#
#   Simple lists
#
*/
LetList
    : VAR '='                                   -> [$1]
    | VAR '[' ExpressionList ']' '='            -> [new keyword.Var($1, $2, $3)]
    | VAR '(' ExpressionList ')' '='            -> [new keyword.Var($1, $2, $3)]
    | LetList VAR '='                           -> [$1, $2]
    | LetList VAR '[' ExpressionList ']' '='    -> [$1, new keyword.Var($2, $3, $4)]
    | LetList VAR '(' ExpressionList ')' '='    -> [$1, new keyword.Var($2, $3, $4)]
    ;

ConstantList
    : Constant                                  -> [$1]
    | ConstantList ',' Constant                 -> [$1, $3]
    ;

IntegerList
    : INTEGER                                   -> [parseInt($1, 10)]
    | IntegerList ',' INTEGER                   -> [$1, parseInt($3, 10)]
    ;

ExpressionList
    : Expression                                -> [$1]
    | ExpressionList ',' Expression             -> [$1, $3]
    ;

VarList
    : VarItem                                   -> [$1]
    | VarList ',' VarItem                       -> [$1, $3]
    ;

VarItem
    : VAR                                       -> new keyword.Var($1)
    | VAR '[' ExpressionList ']'                -> new keyword.Var($1, $2, $3)
    | VAR '(' ExpressionList ')'                -> new keyword.Var($1, $2, $3)
    ;

PrintList
    : Expression                                -> [$1]
    | PrintList PrintSep Expression             -> [$1, $2, $3]
    ;

PrintSep
    : ';'                                       -> keyword.Semic
    | ','                                       -> keyword.Comma
    ;

/*
#
#   Image lists
#
*/
ImageList
    : ImageItem                                 -> [$1]
    | ImageList ',' ImageItem                   -> [$1, $2, $3]
    ;

ImageItem
    : STRING                                    -> $1
    | ImageMask                                 -> $1
    ;

ImageMask
    : ImageMaskItem                             -> [$1]
    | INTEGER '(' ImageList ')'                 -> [parseInt($1, 10), $2, $3, $4]
    ;

ImageMaskItem
    : VAR                                       -> [$1]
    | INTEGER VAR                               -> [parseInt($1, 10), $2]
    ;


