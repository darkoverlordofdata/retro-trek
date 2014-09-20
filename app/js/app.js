(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
colors.js

Copyright (c) 2010

Marak Squires
Alexis Sellier (cloudhead)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var isHeadless = false;

if (typeof module !== 'undefined') {
  isHeadless = true;
}

if (!isHeadless) {
  var exports = {};
  var module = {};
  var colors = exports;
  exports.mode = "browser";
} else {
  exports.mode = "console";
}

//
// Prototypes the string object to have additional method calls that add terminal colors
//
var addProperty = function (color, func) {
  exports[color] = function (str) {
    return func.apply(str);
  };
  String.prototype.__defineGetter__(color, func);
};

function stylize(str, style) {

  var styles;

  if (exports.mode === 'console') {
    styles = {
      //styles
      'bold'      : ['\x1B[1m',  '\x1B[22m'],
      'italic'    : ['\x1B[3m',  '\x1B[23m'],
      'underline' : ['\x1B[4m',  '\x1B[24m'],
      'inverse'   : ['\x1B[7m',  '\x1B[27m'],
      'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
      //text colors
      //grayscale
      'white'     : ['\x1B[37m', '\x1B[39m'],
      'grey'      : ['\x1B[90m', '\x1B[39m'],
      'black'     : ['\x1B[30m', '\x1B[39m'],
      //colors
      'blue'      : ['\x1B[34m', '\x1B[39m'],
      'cyan'      : ['\x1B[36m', '\x1B[39m'],
      'green'     : ['\x1B[32m', '\x1B[39m'],
      'magenta'   : ['\x1B[35m', '\x1B[39m'],
      'red'       : ['\x1B[31m', '\x1B[39m'],
      'yellow'    : ['\x1B[33m', '\x1B[39m'],
      //background colors
      //grayscale
      'whiteBG'     : ['\x1B[47m', '\x1B[49m'],
      'greyBG'      : ['\x1B[49;5;8m', '\x1B[49m'],
      'blackBG'     : ['\x1B[40m', '\x1B[49m'],
      //colors
      'blueBG'      : ['\x1B[44m', '\x1B[49m'],
      'cyanBG'      : ['\x1B[46m', '\x1B[49m'],
      'greenBG'     : ['\x1B[42m', '\x1B[49m'],
      'magentaBG'   : ['\x1B[45m', '\x1B[49m'],
      'redBG'       : ['\x1B[41m', '\x1B[49m'],
      'yellowBG'    : ['\x1B[43m', '\x1B[49m']
    };
  } else if (exports.mode === 'browser') {
    styles = {
      //styles
      'bold'      : ['<b>',  '</b>'],
      'italic'    : ['<i>',  '</i>'],
      'underline' : ['<u>',  '</u>'],
      'inverse'   : ['<span style="background-color:black;color:white;">',  '</span>'],
      'strikethrough' : ['<del>',  '</del>'],
      //text colors
      //grayscale
      'white'     : ['<span style="color:white;">',   '</span>'],
      'grey'      : ['<span style="color:gray;">',    '</span>'],
      'black'     : ['<span style="color:black;">',   '</span>'],
      //colors
      'blue'      : ['<span style="color:blue;">',    '</span>'],
      'cyan'      : ['<span style="color:cyan;">',    '</span>'],
      'green'     : ['<span style="color:green;">',   '</span>'],
      'magenta'   : ['<span style="color:magenta;">', '</span>'],
      'red'       : ['<span style="color:red;">',     '</span>'],
      'yellow'    : ['<span style="color:yellow;">',  '</span>'],
      //background colors
      //grayscale
      'whiteBG'     : ['<span style="background-color:white;">',   '</span>'],
      'greyBG'      : ['<span style="background-color:gray;">',    '</span>'],
      'blackBG'     : ['<span style="background-color:black;">',   '</span>'],
      //colors
      'blueBG'      : ['<span style="background-color:blue;">',    '</span>'],
      'cyanBG'      : ['<span style="background-color:cyan;">',    '</span>'],
      'greenBG'     : ['<span style="background-color:green;">',   '</span>'],
      'magentaBG'   : ['<span style="background-color:magenta;">', '</span>'],
      'redBG'       : ['<span style="background-color:red;">',     '</span>'],
      'yellowBG'    : ['<span style="background-color:yellow;">',  '</span>']
    };
  } else if (exports.mode === 'none') {
    return str + '';
  } else {
    console.log('unsupported mode, try "browser", "console" or "none"');
  }
  return styles[style][0] + str + styles[style][1];
}

function applyTheme(theme) {

  //
  // Remark: This is a list of methods that exist
  // on String that you should not overwrite.
  //
  var stringPrototypeBlacklist = [
    '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'charAt', 'constructor',
    'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf', 'charCodeAt',
    'indexOf', 'lastIndexof', 'length', 'localeCompare', 'match', 'replace', 'search', 'slice', 'split', 'substring',
    'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'
  ];

  Object.keys(theme).forEach(function (prop) {
    if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
      console.log('warn: '.red + ('String.prototype' + prop).magenta + ' is probably something you don\'t want to override. Ignoring style name');
    }
    else {
      if (typeof(theme[prop]) === 'string') {
        addProperty(prop, function () {
          return exports[theme[prop]](this);
        });
      }
      else {
        addProperty(prop, function () {
          var ret = this;
          for (var t = 0; t < theme[prop].length; t++) {
            ret = exports[theme[prop][t]](ret);
          }
          return ret;
        });
      }
    }
  });
}


//
// Iterate through all default styles and colors
//
var x = ['bold', 'underline', 'strikethrough', 'italic', 'inverse', 'grey', 'black', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta', 'greyBG', 'blackBG', 'yellowBG', 'redBG', 'greenBG', 'blueBG', 'whiteBG', 'cyanBG', 'magentaBG'];
x.forEach(function (style) {

  // __defineGetter__ at the least works in more browsers
  // http://robertnyman.com/javascript/javascript-getters-setters.html
  // Object.defineProperty only works in Chrome
  addProperty(style, function () {
    return stylize(this, style);
  });
});

function sequencer(map) {
  return function () {
    if (!isHeadless) {
      return this.replace(/( )/, '$1');
    }
    var exploded = this.split(""), i = 0;
    exploded = exploded.map(map);
    return exploded.join("");
  };
}

var rainbowMap = (function () {
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
  return function (letter, i, exploded) {
    if (letter === " ") {
      return letter;
    } else {
      return stylize(letter, rainbowColors[i++ % rainbowColors.length]);
    }
  };
})();

exports.themes = {};

exports.addSequencer = function (name, map) {
  addProperty(name, sequencer(map));
};

exports.addSequencer('rainbow', rainbowMap);
exports.addSequencer('zebra', function (letter, i, exploded) {
  return i % 2 === 0 ? letter : letter.inverse;
});

exports.setTheme = function (theme) {
  if (typeof theme === 'string') {
    try {
      exports.themes[theme] = require(theme);
      applyTheme(exports.themes[theme]);
      return exports.themes[theme];
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    applyTheme(theme);
  }
};


addProperty('stripColors', function () {
  return ("" + this).replace(/\x1B\[\d+m/g, '');
});

// please no
function zalgo(text, options) {
  var soul = {
    "up" : [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚'
    ],
    "down" : [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣'
    ],
    "mid" : [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉'
    ]
  },
  all = [].concat(soul.up, soul.down, soul.mid),
  zalgo = {};

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function is_char(character) {
    var bool = false;
    all.filter(function (i) {
      bool = (i === character);
    });
    return bool;
  }

  function heComes(text, options) {
    var result = '', counts, l;
    options = options || {};
    options["up"] = options["up"] || true;
    options["mid"] = options["mid"] || true;
    options["down"] = options["down"] || true;
    options["size"] = options["size"] || "maxi";
    text = text.split('');
    for (l in text) {
      if (is_char(l)) {
        continue;
      }
      result = result + text[l];
      counts = {"up" : 0, "down" : 0, "mid" : 0};
      switch (options.size) {
      case 'mini':
        counts.up = randomNumber(8);
        counts.min = randomNumber(2);
        counts.down = randomNumber(8);
        break;
      case 'maxi':
        counts.up = randomNumber(16) + 3;
        counts.min = randomNumber(4) + 1;
        counts.down = randomNumber(64) + 3;
        break;
      default:
        counts.up = randomNumber(8) + 1;
        counts.mid = randomNumber(6) / 2;
        counts.down = randomNumber(8) + 1;
        break;
      }

      var arr = ["up", "mid", "down"];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0 ; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  return heComes(text);
}


// don't summon zalgo
addProperty('zalgo', function () {
  return zalgo(this);
});

},{}],2:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function($, window, document) {
  var Console;
  $.prototype.console = function($options) {
    var _ref;
    if ($options == null) {
      $options = {};
    }
    return (_ref = $.data(this, 'console')) != null ? _ref : $.data(this, 'console', new Console(this, $options));
  };
  return Console = (function() {
    var KEY_BS, KEY_C, KEY_CR, KEY_DOWN, KEY_ESC, KEY_R, KEY_TAB, KEY_UP, colors, fix;

    KEY_BS = 8;

    KEY_TAB = 9;

    KEY_CR = 13;

    KEY_ESC = 27;

    KEY_UP = 38;

    KEY_DOWN = 40;

    KEY_C = 67;

    KEY_R = 82;

    colors = require('colors');

    fix = function($text) {
      return $text.replace(/\ /g, "&nbsp;").replace(/\n/g, "<br />");
    };

    Console.prototype.histpos = 0;

    Console.prototype.history = null;

    Console.prototype.input = null;

    Console.prototype.output = null;

    Console.prototype.prompt = null;

    Console.prototype.mode = 0;

    Console.prototype.options = null;

    Console.prototype["default"] = {
      autofocus: true,
      history: true,
      title: '',
      prompt: '>',
      promptAlt: '?',
      commandHandle: function() {},
      cancelHandle: function() {}
    };

    function Console($container, $options) {
      this.history = [];
      this.options = $.extend(this["default"], $options);
      $container.html("<span class=\"output\"></span>\n<span class=\"prompt\"></span><input class=\"input\"></input>");
      this.output = $container.find('.output');
      this.prompt = $container.find('.prompt');
      this.input = $container.find('.input');
      if (this.options.autofocus) {
        this.input.focus();
      }
      this.prompt.text(this.options.prompt);
      $(window).on('click', (function(_this) {
        return function($e) {
          return _this.input.focus();
        };
      })(this));
      $(document.body).on('keydown', (function(_this) {
        return function($e) {
          if ($e.keyCode === KEY_ESC) {
            $e.stopPropagation();
            return $e.preventDefault();
          }
        };
      })(this));
      this.input.on('click', (function(_this) {
        return function($e) {
          return $e.target.value = $e.target.value;
        };
      })(this));
      this.input.on('keyup', (function(_this) {
        return function($e) {
          var $input, $temp;
          if (!_this.options.history) {
            return;
          }
          $input = $e.target;
          $temp = 0;
          if (_this.history.length) {
            if ($e.keyCode === KEY_UP || $e.keyCode === KEY_DOWN) {
              if (_this.history[_this.histpos]) {
                _this.history[_this.histpos] = $input.value;
              } else {
                $temp = _this.input.value;
              }
            }
            if ($e.keyCode === KEY_UP) {
              _this.histpos--;
              if (_this.histpos < 0) {
                _this.histpos = 0;
              }
            } else if ($e.keyCode === KEY_DOWN) {
              _this.histpos++;
              if (_this.histpos > _this.history.length) {
                _this.histpos = _this.history.length;
              }
            }
            if ($e.keyCode === KEY_UP || $e.keyCode === KEY_DOWN) {
              $input.value = _this.history[_this.histpos] ? _this.history[_this.histpos] : $temp;
              return $input.value = $input.value;
            }
          }
        };
      })(this));
      this.input.on('keydown', (function(_this) {
        return function($e) {
          if ($e.ctrlKey || $e.metaKey) {
            switch ($e.keyCode) {
              case KEY_C:
                _this.options.cancelHandle();
                $e.preventDefault();
                return $e.stopPropagation();
              case KEY_R:
                _this.clear();
                $e.preventDefault();
                return $e.stopPropagation();
            }
          }
        };
      })(this));
      this.input.on('keydown', (function(_this) {
        return function($e) {
          var $input, $prompt;
          $input = $e.target;
          switch ($e.keyCode) {
            case KEY_BS:
              if (!$input.value) {

              }
              break;
            case KEY_TAB:
              return $e.preventDefault;
            case KEY_CR:
              if ($input.value) {
                _this.history[_this.history.length] = $input.value;
                _this.histpos = _this.history.length;
              }
              $prompt = _this.mode ? _this.options.promptAlt : _this.options.prompt;
              _this.output.append("" + $prompt + $input.value + "<br />");
              $input.scrollIntoView();
              if ($input.value && $input.value.trim()) {
                _this.options.commandHandle($input.value);
              }
              return $input.value = '';
          }
        };
      })(this));
    }

    Console.prototype.clear = function() {
      this.output.html('');
      if (this.options.title) {
        return this.println(this.options.title);
      }
    };

    Console.prototype.setPrompt = function($prompt) {
      if ($prompt == null) {
        $prompt = false;
      }
      this.prompt.text($prompt ? this.options.promptAlt : this.options.prompt);
      return this.mode = $prompt;
    };

    Console.prototype.print = function($text) {
      if ($text == null) {
        $text = '';
      }
      this.output.append(fix($text));
      return this.input.get(0).scrollIntoView();
    };

    Console.prototype.println = function($text) {
      if ($text == null) {
        $text = '';
      }
      this.output.append(fix("" + $text + "\n"));
      return this.input.get(0).scrollIntoView();
    };

    Console.prototype.debug = function($text) {
      this.output.append(fix("" + $text + "\n").blue);
      return this.input.get(0).scrollIntoView();
    };

    Console.prototype.hilite = function($text) {
      this.output.append(fix("" + $text + "\n").yellow);
      return this.input.get(0).scrollIntoView();
    };

    return Console;

  })();
})(jQuery, window, document);

},{"colors":1}],3:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
var ABS, AND, ATN, Add, Base, BuiltIn, COS, Chain, Com, Comma, Con, Console, Const, Data, Def, Dim, Div, EQ, EXP, End, Enter, FN, FOR, For, GE, GOSUB, GT, Gosub, Goto, INT, If, Image, Input, Keyword, LCASE, LE, LEFT, LEN, LIN, LOG, LT, Let, MID, MODE_REPL, MODE_RUN, Mat, MatRead, Max, Min, Mul, NE, NOT, Next, OR, Operator, PHASE_EXEC, PHASE_SCAN, Pow, Print, RIGHT, RND, Randomize, Read, Rem, Restore, Return, SGN, SIN, SPA, SQR, SUBSTR, Semic, Statement, Stop, Sub, TAB, TAN, TIM, UCASE, Using, V_ATARI, V_GWBASIC, V_HP2000, Var, Zer, arrays, benchmark, benchmarks, chain, common, data, dim, dp, elapsedTime, eop, execute, fixupIf, fixupPrint, format, functions, gw, initialize, katra, load, name, offset, parse, pc, prog, qualifyFilename, raw, rte, run, save, stack, start, strings, text, title, trace, type, util, valueOf, variables, xrf, _con, _fs,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

util = require("./util");

rte = require('./rte');

V_HP2000 = 0;

V_ATARI = 1;

V_GWBASIC = 2;

GOSUB = 1;

FOR = 2;

PHASE_SCAN = 0;

PHASE_EXEC = 1;

MODE_REPL = 0;

MODE_RUN = 1;

_con = null;

_fs = null;

arrays = {};

benchmarks = {};

common = [];

data = [];

trace = false;

dp = 0;

eop = false;

functions = {};

gw = false;

name = '';

offset = 0;

pc = 0;

prog = [];

raw = {};

stack = [];

strings = {};

text = '';

type = 0;

title = '';

variables = {};

xrf = {};

Console = (function(_super) {
  __extends(Console, _super);

  Console.prototype.mode = MODE_REPL;

  Console.prototype.exec = true;

  function Console($title) {
    this.commandHandle = __bind(this.commandHandle, this);
    this.title = $title;
    Console.__super__.constructor.call(this);
  }

  Console.prototype.cancelHandle = function() {
    eop = true;
    con.print('^C');
    con.setPrompt(false);
    return run();
  };

  Console.prototype.commandHandle = function($line) {
    var $item, $ix, $name, _i, _j, _len, _len1, _ref, _ref1;
    switch (this.mode) {
      case MODE_RUN:
        _ref = $line.trim().split(",");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $item = _ref[_i];
          this.buffer.push(isNaN($item) ? String($item).toUpperCase() : Number($item));
        }
        if (this.buffer.length < this.vars.length) {
          this.continuedPrompt = true;
        } else {
          _ref1 = this.vars;
          for ($ix = _j = 0, _len1 = _ref1.length; _j < _len1; $ix = ++_j) {
            $name = _ref1[$ix];
            if (/\$$/.test($name)) {
              strings[$name] = this.buffer[$ix];
            } else {
              variables[$name] = this.buffer[$ix];
            }
          }
          this.continuedPrompt = false;
          run();
          return true;
        }
        break;
      case MODE_REPL:
        $line = /\n$/.test($line) ? $line : "" + $line + "\n";
        return parse($line);
    }
  };

  return Console;

})(rte.Console);

(function() {
  return Object.defineProperties(this, {
    con: {
      get: function() {
        if (_con == null) {
          return _con = new Console(title);
        } else {
          return _con;
        }
      }
    },
    fs: {
      get: function() {
        if (_fs == null) {
          return _fs = new rte.FileSystem();
        } else {
          return _fs;
        }
      }
    }
  });
})();

initialize = function($all) {
  arrays = {};
  common = [];
  data = [];
  dp = 0;
  eop = false;
  functions = {};
  benchmarks = {};
  offset = 0;
  pc = 0;
  if ($all) {
    raw = {};
  }
  stack = [];
  strings = {};
  variables = {};
  return xrf = {};
};

valueOf = function($value) {
  if ($value["eval"] != null) {
    return $value["eval"]();
  } else {
    return $value;
  }
};

qualifyFilename = function($name, $version) {
  if ($version == null) {
    $version = V_HP2000;
  }
  switch ($version) {
    case V_ATARI:
      return 'bas/atari/' + $name;
    case V_GWBASIC:
      return 'bas/gwbasic/' + $name;
    case V_HP2000:
      switch ($name[0]) {
        case "*":
          return 'bas/hp2k/group/' + $name.slice(1);
        case "$":
          return 'bas/hp2k/system/' + $name.slice(1);
        case "#":
          return 'bas/hp2k/test/' + $name.slice(1);
        default:
          return 'bas/hp2k/' + $name;
      }
  }
};

save = function($version, $name, $data, $next) {
  $name = $name[0] === '"' ? $name.slice(1, -1) : $name;
  con.pause(true);
  fs.writeFile(qualifyFilename($name, $version), $data, function() {
    if (typeof $next === "function") {
      $next();
    }
    return con.pause(false);
  });
  return true;
};

load = function($version, $name, $init, $next) {
  if ($init == null) {
    $init = true;
  }
  $name = $name[0] === '"' ? $name.slice(1, -1) : $name;
  initialize($init);
  con.pause(true);
  fs.readFile(qualifyFilename($name, $version), function($err, $data) {
    if ($err != null) {
      con.println($err);
    } else {
      $data = util.clean($data).split('\n');
      if (isNaN($data[0][0])) {
        $data.shift();
      }
      if ($data[0] === "") {
        $data.shift();
      }
      name = /^[A-Za-z]/.test($name) ? $name : $name.slice(1);
      type = $version;
      gw = type === V_GWBASIC ? true : false;
      text = $data.join('\n');
      if (typeof $next === "function") {
        $next(text);
      }
      parse(text);
    }
    return con.pause(false);
  });
  return true;
};

execute = function($version, $name, $init) {
  if ($init == null) {
    $init = true;
  }
  initialize($init);
  con.pause(true);
  fs.readFile(qualifyFilename($name, $version), function($err, $data) {
    if ($err != null) {
      con.println($err);
    } else {
      $data = util.clean($data).split('\n');
      if (isNaN($data[0][0])) {
        $data.shift();
      }
      if ($data[0] === "") {
        $data.shift();
      }
      name = /^[A-Za-z]/.test($name) ? $name : $name.slice(1);
      type = $version;
      gw = type === V_GWBASIC ? true : false;
      text = $data.join('\n');
      parse(text);
      start();
      run();
    }
    return con.pause(false);
  });
  return true;
};

start = function() {
  var $lineno, $statement, _i, _len, _ref;
  prog = [];
  for ($lineno in raw) {
    $statement = raw[$lineno];
    while ($lineno.length < 4) {
      $lineno = '0' + $lineno;
    }
    prog.push([$lineno, $statement]);
  }
  prog.sort();
  initialize(false);
  for (_i = 0, _len = prog.length; _i < _len; _i++) {
    _ref = prog[_i], $lineno = _ref[0], $statement = _ref[1];
    if ($statement.code.type === PHASE_SCAN) {
      $statement.code["eval"]();
    }
    xrf[parseInt($lineno, 10)] = pc++;
  }
  return pc = 0;
};

run = function() {
  var $code, $e, $lineno, $statement, $wait, _ref;
  $wait = false;
  con.setMode(MODE_RUN);
  try {
    while (!(eop || $wait)) {
      _ref = prog[pc++], $lineno = _ref[0], $statement = _ref[1];
      $code = $statement.code;
      if ($statement.code.type === PHASE_EXEC) {
        if (trace) {
          con.debug($lineno + ' ' + $code.toString());
        }
        $wait = $code["eval"]();
      }
      con.setPrompt($wait);
      if (pc >= prog.length) {
        eop = true;
      }
    }
  } catch (_error) {
    $e = _error;
    con.println($e);
    $wait = false;
  }
  if (!$wait) {
    con.setMode(MODE_REPL);
    return con.println('DONE');
  }
};

chain = function($code) {
  var $ix, $save, $var, _i, _j, _len, _len1;
  $save = Array(common.length);
  for ($ix = _i = 0, _len = common.length; _i < _len; $ix = ++_i) {
    $var = common[$ix];
    switch ($var.type) {
      case 0:
        $save[$ix] = strings[$var.name];
        break;
      case 1:
        $save[$ix] = variables[$var.name];
        break;
      case 2:
        $save[$ix] = arrays[$var.name];
    }
  }
  initialize(true);
  parse($code);
  start();
  for ($ix = _j = 0, _len1 = common.length; _j < _len1; $ix = ++_j) {
    $var = common[$ix];
    switch ($var.type) {
      case 0:
        strings[$var.name] = $save[$ix];
        break;
      case 1:
        variables[$var.name] = $save[$ix];
        break;
      case 2:
        arrays[$var.name] = $save[$ix];
    }
  }
  return run();
};

parse = function($code) {
  var $e, $index, $line, kc, _i, _len;
  kc = require('./kc');
  $code = $code.split('\n');
  for ($index = _i = 0, _len = $code.length; _i < _len; $index = ++_i) {
    $line = $code[$index];
    if (/^\d*\s*IF/i.test($line)) {
      $code[$index] = $line = fixupIf($line);
    }
    if (/^\d*\s*PRINT/i.test($line)) {
      $code[$index] = $line = fixupPrint($line);
    }
    if (/\'(?=[^"]*(?:"[^"]*"[^"]*)*$)/.test($line)) {
      $code[$index] = $line = $line.replace(/(\'.*(?=[^"]*(?:"[^"]*"[^"]*)*$))/g, "");
    }
    if (/\*\*(?=[^"]*(?:"[^"]*"[^"]*)*$)/.test($line)) {
      $code[$index] = $line = $line.replace(/(\*\*(?=[^"]*(?:"[^"]*"[^"]*)*$))/g, "^");
    }
  }
  try {
    kc.parse($code.join('\n'));
  } catch (_error) {
    $e = _error;
    con.debug(String($e));
  }
  return true;
};

fixupIf = function($line) {
  $line = $line.split(/THEN/i);
  $line[0] = $line[0].replace(/\=/g, '==').replace(/\<\=\=/g, '<=').replace(/\>\=\=/g, '>=').replace(/\#/g, '<>');
  return $line.join(" THEN ");
};

fixupPrint = function($line) {
  var $chunk, $index, $is_string, $match, $sep, SEP, _i, _len, _ref, _ref1;
  SEP = ';:,';
  $is_string = false;
  $match = (function() {
    var _i, _len, _ref, _results;
    _ref = $line.match(/[^"]*(?!\\"[^"]*\")/g);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      $chunk = _ref[_i];
      if ($chunk !== '') {
        _results.push($chunk);
      }
    }
    return _results;
  })();
  for ($index = _i = 0, _len = $match.length; _i < _len; $index = ++_i) {
    $chunk = $match[$index];
    $sep = /^\d*\s*PRINT\s*$/i.test($chunk) || $index === $match.length - 1 ? '' : ';';
    if ($is_string) {
      $match[$index] = $chunk = '"' + $chunk + '"';
      if (SEP.indexOf((_ref = (_ref1 = $match[$index + 1]) != null ? _ref1[0] : void 0) != null ? _ref : '') === -1) {
        $match[$index] = $chunk + $sep;
      }
    } else {
      if (SEP.indexOf($chunk.substr(-1)) === -1) {
        $match[$index] = $chunk + $sep;
      }
    }
    $is_string = !$is_string;
  }
  return $match.join('');
};

dim = function($init, $dim1, $dim2) {
  var $a, $i, $j, _i, _j, _k, _ref, _ref1, _ref2;
  $a = [];
  switch (arguments.length) {
    case 2:
      for ($i = _i = offset, _ref = $dim1 + 1; offset <= _ref ? _i < _ref : _i > _ref; $i = offset <= _ref ? ++_i : --_i) {
        $a[$i] = $init;
      }
      break;
    case 3:
      for ($i = _j = offset, _ref1 = $dim1 + 1; offset <= _ref1 ? _j < _ref1 : _j > _ref1; $i = offset <= _ref1 ? ++_j : --_j) {
        $a[$i] = [];
        for ($j = _k = offset, _ref2 = $dim2 + 1; offset <= _ref2 ? _k < _ref2 : _k > _ref2; $j = offset <= _ref2 ? ++_k : --_k) {
          $a[$i][$j] = $init;
        }
      }
  }
  return $a;
};

format = function($image) {
  var $count, $head, $out;
  if ($image == null) {
    $image = [];
  }
  $out = '';
  $count = 1;
  while ($image.length > 0) {
    $head = $image.shift();
    if (isNaN($head)) {
      switch ($head) {
        case ',':
          $count = 1;
          break;
        case 'D':
          $out += $count > 1 ? '%' + $count + 'd' : '%d';
          $count = 1;
          break;
        case 'A':
          $out += $count > 1 ? '%' + $count + 's' : '%s';
          $count = 1;
          break;
        case 'X':
          $out += Array($count + 1).join(' ');
          $count = 1;
          break;
        case '(':
          $out += Array($count + 1).join(format($image));
          $count = 1;
          break;
        case ')':
          return $out;
        default:
          $out += $head.slice(1, -1);
          $count = 1;
      }
    } else {
      $count = $head;
    }
  }
  return $out;
};

benchmark = function($name) {
  return benchmarks[$name] = new Date();
};

elapsedTime = function($point1, $point2) {
  if (benchmarks[$point1] == null) {
    return 0;
  }
  if (benchmarks[$point2] == null) {
    benchmarks[$point2] = new Date();
  }
  return benchmarks[$point2] - benchmarks[$point1];
};

Zer = {
  "eval": function() {
    return 0;
  },
  toString: function() {
    return 'ZER';
  }
};

Con = {
  "eval": function() {
    return 1;
  },
  toString: function() {
    return 'CON';
  }
};

Semic = {
  "eval": function() {
    return '';
  },
  toString: function() {
    return ';';
  }
};

Comma = {
  "eval": function() {
    return '    ';
  },
  toString: function() {
    return ',';
  }
};

Operator = (function() {
  function Operator(left, right) {
    this.left = left;
    this.right = right;
  }

  return Operator;

})();

BuiltIn = (function() {
  function BuiltIn($0, $1, $2) {
    this.$0 = $0;
    this.$1 = $1;
    this.$2 = $2;
  }

  BuiltIn.prototype.toString = function() {
    return "" + (this.constructor.name.toUpperCase()) + "(" + this.$0 + ")";
  };

  return BuiltIn;

})();

Keyword = (function() {
  function Keyword() {}

  Keyword.prototype.type = PHASE_EXEC;

  Keyword.prototype["eval"] = function() {
    return false;
  };

  return Keyword;

})();

module.exports = katra = {
  main: function($args) {
    var _ref;
    title = (_ref = $args.title) != null ? _ref : title;
    switch ($args.basic) {
      case 'atari':
        return execute(V_ATARI, $args.program);
      case 'gwbasic':
        return execute(V_GWBASIC, $args.program);
      case 'hp2k':
        return execute(V_HP2000, $args.program);
      default:
        return con.setMode(MODE_REPL);
    }
  },
  setRoot: function($root) {
    return fs.setRoot($root);
  },
  getText: function() {
    return text;
  },
  command: {
    append: function($0) {
      return load(V_HP2000, $0.split('-')[1], false);
    },
    atari: function($0, $next) {
      return load(V_ATARI, $0, true, $next);
    },
    cat: function($dir) {
      var $cw, $hdr, $nc;
      $nc = 4;
      $cw = 20;
      $hdr = 'name                ';
      return fs.readDir($dir, function($files) {
        var $col, $file, _i, _len;
        $col = 0;
        con.hilite("\n" + $dir + "\n" + (Array($nc + 1).join($hdr)));
        for (_i = 0, _len = $files.length; _i < _len; _i++) {
          $file = $files[_i];
          $file = $file.split('.')[0];
          while ($file.length < $cw) {
            $file += " ";
          }
          con.print($file);
          if (($col++) % $nc === $nc - 1) {
            con.println();
          }
        }
        if (typeof window === "undefined" || window === null) {
          return con.print("\n" + con.prompt);
        }
      });
    },
    cls: function() {
      return con.clear();
    },
    del: function($0) {
      var $end, $lineno, $start, _i, _ref, _results;
      _ref = $0.split('-')[1].split(','), $start = _ref[0], $end = _ref[1];
      if (!$end) {
        $end = $start;
      }
      _results = [];
      for ($lineno = _i = $start; $start <= $end ? _i < $end : _i > $end; $lineno = $start <= $end ? ++_i : --_i) {
        if (raw[$lineno] != null) {
          _results.push(delete raw[$lineno]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    dir: function($0) {},
    exec: function($0) {
      return execute(V_HP2000, $0.split('-')[1]);
    },
    files: function($0) {},
    get: function($0, $next) {
      return load(V_HP2000, $0.split('-')[1], true, $next);
    },
    gwbasic: function($0, $next) {
      return load(V_GWBASIC, $0, true, $next);
    },
    list: function($0) {
      var $1, $code, $end, $lineno, $lines, $start, $statement, _i, _len, _ref, _ref1, _results;
      $1 = $0.split('-')[1];
      if ($1 != null) {
        _ref = $1.split(','), $start = _ref[0], $end = _ref[1];
      }
      if ($start != null) {
        $end = $end != null ? $end : $start;
        $start = parseInt($start, 10);
        $end = parseInt($end, 10);
      } else {
        $start = 1;
        $end = 9999;
      }
      $lines = [];
      for ($lineno in raw) {
        $statement = raw[$lineno];
        while ($lineno.length < 5) {
          $lineno = '0' + $lineno;
        }
        $lines.push([$lineno, $statement]);
      }
      $lines.sort();
      _results = [];
      for (_i = 0, _len = $lines.length; _i < _len; _i++) {
        _ref1 = $lines[_i], $lineno = _ref1[0], $statement = _ref1[1];
        $lineno = parseInt($statement.lineno, 10);
        $code = $statement.code;
        if ($start != null) {
          if ($lineno >= parseInt($start, 10) && $lineno <= parseInt($end, 10)) {
            _results.push(con.println($lineno + ' ' + $code));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(con.println($lineno + ' ' + $code));
        }
      }
      return _results;
    },
    name: function($0) {
      return name = $0.split('-')[1];
    },
    purge: function($0) {
      return fs.deleteFile(qualifyFilename($0.split('-')[1], type), function($err) {
        if ($err != null) {
          return con.println($err);
        }
      });
    },
    quit: function() {
      return typeof process !== "undefined" && process !== null ? process.exit() : void 0;
    },
    renum: function($0) {
      return con.println("Renumber Not Implemented");
    },
    run: function($0) {
      if (Object.keys(raw).length > 0) {
        start();
        return run();
      }
    },
    save: function() {
      var $code, $lineno, $lines, $statement, $text, _i, _len, _ref;
      if (name === '') {
        return con.println("Name not set");
      }
      $lines = [];
      $text = '';
      for ($lineno in raw) {
        $statement = raw[$lineno];
        $lines.push([$lineno, $statement.code]);
      }
      $lines.sort();
      for (_i = 0, _len = $lines.length; _i < _len; _i++) {
        _ref = $lines[_i], $lineno = _ref[0], $code = _ref[1];
        $text += $lineno + ' ' + $code + '\n';
      }
      return save(type, name, $text.slice(0, -1), function($err) {
        if ($err != null) {
          return con.println($err);
        }
      });
    },
    scr: function() {
      return initialize(true);
    },
    troff: function() {
      return trace = false;
    },
    tron: function() {
      return trace = true;
    }
  },
  keyword: {
    Zer: Zer,
    Con: Con,
    Semic: Semic,
    Comma: Comma,
    Statement: Statement = (function() {
      function Statement($code, $lineno) {
        if ($lineno != null) {
          raw[$lineno] = {
            lineno: $lineno,
            code: $code
          };
        } else {
          if ($code != null) {
            if (typeof $code["eval"] === "function") {
              $code["eval"]();
            }
          }
        }
      }

      return Statement;

    })(),
    Const: Const = (function() {
      function Const(value) {
        this.value = value;
        this.is_string = 'string' === typeof this.value ? true : false;
        if (this.is_string) {
          if (this.value.charAt(0) === '"') {
            this.value = this.value.slice(1, -1);
          }
        }
      }

      Const.prototype.value = function() {
        return this.value;
      };

      Const.prototype["eval"] = function() {
        return this.value;
      };

      Const.prototype.toString = function() {
        if (this.is_string) {
          return "\"" + this.value + "\"";
        } else {
          return "" + this.value;
        }
      };

      return Const;

    })(),
    Var: Var = (function() {
      function Var(name, $delim, $dims) {
        this.name = name;
        this.is_string = /\$$/.test(this.name);
        if ($delim != null) {
          this.is_array = true;
          this.dims = util.flatten($dims);
          this.dim1 = this.dims[0];
          this.dim2 = this.dims[1];
        } else {
          this.is_array = false;
        }
      }

      Var.prototype["let"] = function($value) {
        var $dim1, $dim2, $end, $len, $start, $str;
        if (this.is_string) {
          if (gw) {
            if (this.dim2 != null) {
              $dim1 = this.dim1["eval"]();
              $dim2 = this.dim2["eval"]();
              return strings[this.name][$dim1][$dim2] = $value;
            } else if (this.dim1 != null) {
              $dim1 = this.dim1["eval"]();
              return strings[this.name][$dim1] = $value;
            } else {
              return strings[this.name] = $value;
            }
          } else {
            if (this.dim2 != null) {
              $start = this.dim1["eval"]() - 1;
              $end = this.dim2["eval"]();
              if ($end < $start) {
                throw 'Invalid String index: ' + this.toString();
              }
              $len = $end - $start;
              $value = $value.substr(0, $len);
              $value = util.pad($value, $len);
              $str = strings[this.name];
              return strings[this.name] = $str.substr(0, $start) + $value + $str.substr($end);
            } else if (this.dim1 != null) {
              $start = this.dim1["eval"]() - 1;
              $str = strings[this.name];
              return strings[this.name] = $str.substr(0, $start) + $value + $str.substr($start + $value.length);
            } else {
              $len = strings[this.name].length;
              if ($value.length < $len) {
                $value += Array($len - $value.length + 1).join(' ');
              }
              return strings[this.name] = $value;
            }
          }
        } else if (this.dim2 != null) {
          $dim1 = this.dim1["eval"]();
          $dim2 = this.dim2["eval"]();
          return arrays[this.name][$dim1][$dim2] = $value;
        } else if (this.dim1 != null) {
          $dim1 = this.dim1["eval"]();
          return arrays[this.name][$dim1] = $value;
        } else {
          return variables[this.name] = $value;
        }
      };

      Var.prototype["eval"] = function() {
        var $dim1, $dim2, $end, $start, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
        if (this.is_string) {
          if (gw) {
            if (this.dim2 != null) {
              $dim1 = this.dim1["eval"]();
              $dim2 = this.dim2["eval"]();
              return (_ref = (_ref1 = strings[this.name]) != null ? (_ref2 = _ref1[$dim1]) != null ? _ref2[$dim2] : void 0 : void 0) != null ? _ref : '';
            } else if (this.dim1 != null) {
              $dim1 = this.dim1["eval"]();
              return (_ref3 = (_ref4 = strings[this.name]) != null ? _ref4[$dim1] : void 0) != null ? _ref3 : '';
            } else {
              return (_ref5 = strings[this.name]) != null ? _ref5 : '';
            }
          } else {
            if (this.dim2 != null) {
              $start = this.dim1["eval"]() - 1;
              $end = this.dim2["eval"]();
              if ($end < $start) {
                throw 'Invalid String index: ' + this.toString();
              }
              return (_ref6 = (_ref7 = strings[this.name]) != null ? _ref7.slice($start, $end) : void 0) != null ? _ref6 : '';
            } else if (this.dim1 != null) {
              $start = this.dim1["eval"]() - 1;
              return (_ref8 = (_ref9 = strings[this.name]) != null ? _ref9.slice($start) : void 0) != null ? _ref8 : '';
            } else {
              return (_ref10 = strings[this.name]) != null ? _ref10 : '';
            }
          }
        } else if (this.dim2 != null) {
          $dim1 = this.dim1["eval"]();
          $dim2 = this.dim2["eval"]();
          return (_ref11 = (_ref12 = arrays[this.name]) != null ? (_ref13 = _ref12[$dim1]) != null ? _ref13[$dim2] : void 0 : void 0) != null ? _ref11 : 0;
        } else if (this.dim1 != null) {
          $dim1 = this.dim1["eval"]();
          return (_ref14 = (_ref15 = arrays[this.name]) != null ? _ref15[$dim1] : void 0) != null ? _ref14 : 0;
        } else {
          return (_ref16 = variables[this.name]) != null ? _ref16 : 0;
        }
      };

      Var.prototype.toString = function() {
        if (this.is_array) {
          return "" + this.name + "[" + (this.dims.join(',')) + "]";
        } else {
          return this.name;
        }
      };

      return Var;

    })(),
    Base: Base = (function(_super) {
      __extends(Base, _super);

      function Base(base) {
        this.base = base;
      }

      Base.prototype["eval"] = function() {
        offset = this.base;
        return false;
      };

      Base.prototype.toString = function() {
        return "BASE " + this.base;
      };

      return Base;

    })(Keyword),
    Chain: Chain = (function(_super) {
      __extends(Chain, _super);

      function Chain(program) {
        this.program = program;
      }

      Chain.prototype["eval"] = function() {
        con.pause(true);
        return fs.readFile(this.program, function($err, $data) {
          if ($err != null) {
            con.println($err);
          } else {
            type = $data.type;
            name = $data.name;
            gw = type === V_GWBASIC ? true : false;
            chain($data.data);
          }
          return con.pause(false);
        });
      };

      Chain.prototype.toString = function() {
        return "CHAIN \"" + this.program + "\"";
      };

      return Chain;

    })(Keyword),
    Com: Com = (function(_super) {
      __extends(Com, _super);

      Com.prototype.type = PHASE_SCAN;

      function Com($vars) {
        this.vars = util.flatten($vars);
      }

      Com.prototype["eval"] = function() {
        var $var, _i, _len, _ref;
        _ref = this.vars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $var = _ref[_i];
          if (/\$$/.test($var.name)) {
            if (gw) {
              if ($var.dims.length === 0) {
                strings[$var.name] = '';
              } else {
                strings[$var.name] = dim.apply(null, [''].concat(__slice.call($var.dims)));
              }
            } else {
              strings[$var.name] = Array($var.dims[0] + 1).join(' ');
              common.push({
                type: 0,
                name: $var.name
              });
            }
          } else {
            if ($var.dims.length === 0) {
              variables[$var.name] = 0;
              common.push({
                type: 1,
                name: $var.name
              });
            } else {
              arrays[$var.name] = dim.apply(null, [0].concat(__slice.call($var.dims)));
              common.push({
                type: 2,
                name: $var.name
              });
            }
          }
        }
        return false;
      };

      Com.prototype.toString = function() {
        return "COM " + (this.vars.join(', '));
      };

      return Com;

    })(Keyword),
    Data: Data = (function(_super) {
      __extends(Data, _super);

      Data.prototype.type = PHASE_SCAN;

      function Data($data) {
        this.data = util.flatten($data);
      }

      Data.prototype["eval"] = function() {
        if (data === null) {
          data = [];
        }
        data = data.concat(this.data);
        return false;
      };

      Data.prototype.toString = function() {
        return "DATA " + (this.data.join(', '));
      };

      return Data;

    })(Keyword),
    Def: Def = (function(_super) {
      __extends(Def, _super);

      Def.prototype.type = PHASE_SCAN;

      function Def(name, par, body) {
        this.name = name;
        this.par = par;
        this.body = body;
      }

      Def.prototype["eval"] = function() {
        functions[this.name] = (function(_this) {
          return function($par) {
            var $ret, $tmp;
            $tmp = variables[_this.par];
            variables[_this.par] = $par;
            $ret = _this.body["eval"]();
            variables[_this.par] = $tmp;
            return $ret;
          };
        })(this);
        return false;
      };

      Def.prototype.toString = function() {
        return "DEF " + this.name + "(" + this.par + ") = " + this.body;
      };

      return Def;

    })(Keyword),
    Dim: Dim = (function(_super) {
      __extends(Dim, _super);

      Dim.prototype.type = PHASE_SCAN;

      function Dim($vars) {
        this.vars = util.flatten($vars);
      }

      Dim.prototype["eval"] = function() {
        var $var, _i, _len, _ref;
        _ref = this.vars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $var = _ref[_i];
          if (/\$$/.test($var.name)) {
            if (gw) {
              if ($var.dims.length === 0) {
                strings[$var.name] = '';
              } else {
                strings[$var.name] = dim.apply(null, [''].concat(__slice.call($var.dims)));
              }
            } else {
              strings[$var.name] = Array($var.dims[0] + 1).join(' ');
            }
          } else {
            if ($var.dims.length === 0) {
              variables[$var.name] = 0;
            } else {
              arrays[$var.name] = dim.apply(null, [0].concat(__slice.call($var.dims)));
            }
          }
        }
        return false;
      };

      Dim.prototype.toString = function() {
        return "DIM " + (this.vars.join(', '));
      };

      return Dim;

    })(Keyword),
    End: End = (function(_super) {
      __extends(End, _super);

      function End() {
        return End.__super__.constructor.apply(this, arguments);
      }

      End.prototype["eval"] = function() {
        eop = true;
        return false;
      };

      End.prototype.toString = function() {
        return "END";
      };

      return End;

    })(Keyword),
    Enter: Enter = (function(_super) {
      __extends(Enter, _super);

      function Enter(port, time, status, _var) {
        var _ref;
        this.port = port;
        this.time = time;
        this.status = status;
        this["var"] = _var;
        if (this["var"] == null) {
          _ref = [null, this.port, this.time, this.status], this.port = _ref[0], this.time = _ref[1], this.status = _ref[2], this["var"] = _ref[3];
        }
      }

      Enter.prototype["eval"] = function() {
        con.input('', [this["var"]]);
        return true;
      };

      Enter.prototype.toString = function() {
        return "ENTER " + this.port + ", " + this.time + ", " + this.status + ", " + this["var"];
      };

      return Enter;

    })(Keyword),
    For: For = (function(_super) {
      __extends(For, _super);

      function For(_var, start, end, step) {
        this["var"] = _var;
        this.start = start;
        this.end = end;
        this.step = step != null ? step : new Const(1);
      }

      For.prototype["eval"] = function() {
        variables[this["var"]] = valueOf(this.start);
        stack.push({
          id: FOR,
          pc: pc,
          name: this["var"],
          end: this.end,
          step: this.step
        });
        return false;
      };

      For.prototype.toString = function() {
        if (this.step === 1) {
          return "FOR " + this["var"] + " = " + this.start + " TO " + this.end;
        } else {
          return "FOR " + this["var"] + " = " + this.start + " TO " + this.end + " STEP " + this.step;
        }
      };

      return For;

    })(Keyword),
    Goto: Goto = (function(_super) {
      __extends(Goto, _super);

      function Goto(lineno, $of) {
        this.lineno = lineno;
        this.of = util.flatten($of);
      }

      Goto.prototype["eval"] = function() {
        var $index;
        if (this.of.length > 0) {
          $index = valueOf(this.lineno) - 1;
          if (this.of[$index] != null) {
            pc = xrf[this.of[$index]];
          }
        } else {
          pc = xrf[parseInt(this.lineno, 10)];
        }
        return false;
      };

      Goto.prototype.toString = function() {
        if (this.of.length > (0 != null)) {
          return "GOTO " + this.lineno + " OF " + (this.of.join(','));
        } else {
          return "GOTO " + this.lineno;
        }
      };

      return Goto;

    })(Keyword),
    Gosub: Gosub = (function(_super) {
      __extends(Gosub, _super);

      function Gosub(lineno, $of) {
        this.lineno = lineno;
        this.of = util.flatten($of);
      }

      Gosub.prototype["eval"] = function() {
        stack.push({
          id: GOSUB,
          pc: pc
        });
        return Gosub.__super__["eval"].call(this);
      };

      Gosub.prototype.toString = function() {
        if (this.of.length > (0 != null)) {
          return "GOSUB " + this.lineno + " OF " + (this.of.join(','));
        } else {
          return "GOSUB " + this.lineno;
        }
      };

      return Gosub;

    })(Goto),
    If: If = (function(_super) {
      __extends(If, _super);

      function If(cond, then) {
        this.cond = cond;
        this.then = then;
      }

      If.prototype["eval"] = function() {
        if (this.cond["eval"]()) {
          if (this.then["eval"] != null) {
            this.then["eval"]();
          } else {
            pc = xrf[parseInt(this.then, 10)];
          }
        }
        return false;
      };

      If.prototype.toString = function() {
        return "IF " + this.cond + " THEN " + this.then;
      };

      return If;

    })(Keyword),
    Image: Image = (function(_super) {
      __extends(Image, _super);

      function Image($format) {
        if ($format == null) {
          $format = [];
        }
        this.source = util.flatten($format);
        this.format = format(this.source);
      }

      Image.prototype["eval"] = function() {
        return false;
      };

      Image.prototype.toString = function() {
        return "IMAGE " + (this.source.join(''));
      };

      return Image;

    })(Keyword),
    Input: Input = (function(_super) {
      __extends(Input, _super);

      function Input($vars, prompt) {
        this.prompt = prompt;
        this.vars = util.flatten($vars);
      }

      Input.prototype["eval"] = function() {
        con.input(this.prompt, this.vars);
        return true;
      };

      Input.prototype.toString = function() {
        if (this.prompt != null) {
          return "INPUT " + this.prompt + ", " + (this.vars.join(','));
        } else {
          return "INPUT " + (this.vars.join(','));
        }
      };

      return Input;

    })(Keyword),
    Let: Let = (function(_super) {
      __extends(Let, _super);

      function Let($vars, value) {
        var $var, _i, _len, _ref;
        this.value = value;
        this.vars = [];
        _ref = util.flatten($vars);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $var = _ref[_i];
          if ('string' === typeof $var) {
            this.vars.push(new Var($var));
          } else {
            this.vars.push($var);
          }
        }
      }

      Let.prototype["eval"] = function() {
        var $value, $var, _i, _len, _ref;
        $value = valueOf(this.value);
        _ref = this.vars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $var = _ref[_i];
          $var["let"]($value);
        }
        return false;
      };

      Let.prototype.toString = function() {
        var $s, $var, _i, _len, _ref;
        $s = '';
        _ref = this.vars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $var = _ref[_i];
          $s += $var + ' = ';
        }
        return "LET " + $s + this.value;
      };

      return Let;

    })(Keyword),
    Mat: Mat = (function(_super) {
      __extends(Mat, _super);

      function Mat(_var, value) {
        this["var"] = _var;
        this.value = value;
      }

      Mat.prototype["eval"] = function() {
        var $i, $j, $value;
        $value = this.value["eval"]();
        if (arrays[this["var"]] != null) {
          $i = arrays[this["var"]].length;
          $j = arrays[this["var"]][offset].length;
          arrays[this["var"]] = dim($value, $i, $j);
        } else {
          arrays[this["var"]] = dim($value, 10);
        }
        return false;
      };

      return Mat;

    })(Keyword),
    MatRead: MatRead = (function(_super) {
      __extends(MatRead, _super);

      function MatRead($vars) {
        this.vars = util.flatten($vars);
      }

      MatRead.prototype["eval"] = function() {
        var $var, _i, _len, _ref;
        _ref = this.vars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $var = _ref[_i];
          if (dp < data.length) {
            $var["let"](data[dp++].value);
          } else {
            $var["let"](void 0);
          }
        }
        return false;
      };

      MatRead.prototype.toString = function() {
        return "MAT READ " + (this.vars.join(','));
      };

      return MatRead;

    })(Keyword),
    Next: Next = (function(_super) {
      __extends(Next, _super);

      function Next(_var) {
        this["var"] = _var;
      }

      Next.prototype["eval"] = function() {
        var $counter, $frame, $name, $step;
        $frame = stack[stack.length - 1];
        if ($frame.id !== FOR) {
          throw "Next without for";
        }
        $name = this["var"].name;
        if ($frame.name !== $name) {
          throw "Mismatched For/Next " + $name;
        }
        $step = valueOf($frame.step);
        $counter = this["var"]["eval"]() + $step;
        this["var"]["let"]($counter);
        if ($step < 0) {
          if ($counter < valueOf($frame.end)) {
            stack.pop();
          } else {
            pc = $frame.pc;
          }
        } else {
          if ($counter > valueOf($frame.end)) {
            stack.pop();
          } else {
            pc = $frame.pc;
          }
        }
        return false;
      };

      Next.prototype.toString = function() {
        return "NEXT " + this["var"];
      };

      return Next;

    })(Keyword),
    Print: Print = (function(_super) {
      __extends(Print, _super);

      function Print() {
        var $items;
        $items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        this.items = util.flatten([$items]);
      }

      Print.prototype["eval"] = function() {
        var $item, $str, $val, _i, _len, _ref;
        $str = '';
        _ref = this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $item = _ref[_i];
          $str += isNaN($val = valueOf($item)) ? $val : ' ' + $val;
        }
        if ($item === Semic || $item === Comma) {
          con.print($str);
        } else {
          con.println($str);
        }
        return false;
      };

      Print.prototype.toString = function() {
        var $item, $str, _i, _len, _ref;
        $str = '';
        _ref = this.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $item = _ref[_i];
          $str += $item.toString();
        }
        return "PRINT " + $str;
      };

      return Print;

    })(Keyword),
    Using: Using = (function(_super) {
      __extends(Using, _super);

      function Using() {
        var $items, lineno;
        lineno = arguments[0], $items = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        this.lineno = lineno;
        this.items = util.flatten($items);
      }

      Using.prototype["eval"] = function() {
        var $args, $i, $item, $lineno, $statement, _i, _len, _ref, _ref1;
        $i = xrf[this.lineno];
        _ref = prog[$i], $lineno = _ref[0], $statement = _ref[1];
        $args = [];
        _ref1 = this.items;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          $item = _ref1[_i];
          $args.push(valueOf($item));
        }
        if ($item === Semic || $item === Comma) {
          con.print(util.sprintf($statement.code.format, $args));
        } else {
          con.println(util.sprintf($statement.code.format, $args));
        }
        return false;
      };

      Using.prototype.toString = function() {
        var $item, $str, _i, _len, _ref;
        if (this.items.length === 0) {
          return "PRINT USING " + this.lineno;
        } else {
          $str = '';
          _ref = this.items;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            $item = _ref[_i];
            $str += $item.toString() + ',';
          }
          $str = $str.slice(0, -1);
          return "PRINT USING " + this.lineno + ";" + $str;
        }
      };

      return Using;

    })(Keyword),
    Randomize: Randomize = (function(_super) {
      __extends(Randomize, _super);

      function Randomize() {}

      Randomize.prototype["eval"] = function() {
        return false;
      };

      Randomize.prototype.toString = function() {
        return "RANDOMIZE";
      };

      return Randomize;

    })(Keyword),
    Read: Read = (function(_super) {
      __extends(Read, _super);

      function Read($vars) {
        this.vars = util.flatten($vars);
      }

      Read.prototype["eval"] = function() {
        var $var, _i, _len, _ref;
        _ref = this.vars;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $var = _ref[_i];
          if (dp < data.length) {
            $var["let"](data[dp++].value);
          } else {
            $var["let"](void 0);
          }
        }
        return false;
      };

      Read.prototype.toString = function() {
        return "READ " + (this.vars.join(','));
      };

      return Read;

    })(Keyword),
    Restore: Restore = (function(_super) {
      __extends(Restore, _super);

      function Restore(lineno) {
        this.lineno = lineno;
      }

      Restore.prototype["eval"] = function() {
        dp = 0;
        return false;
      };

      Restore.prototype.toString = function() {
        if (this.lineno != null) {
          return "RESTORE " + this.lineno;
        } else {
          return "RESTORE";
        }
      };

      return Restore;

    })(Keyword),
    Return: Return = (function(_super) {
      __extends(Return, _super);

      function Return() {}

      Return.prototype["eval"] = function() {
        var $frame;
        $frame = stack.pop();
        while ($frame.id !== GOSUB) {
          $frame = stack.pop();
        }
        pc = $frame.pc;
        return false;
      };

      Return.prototype.toString = function() {
        return "RETURN";
      };

      return Return;

    })(Keyword),
    Rem: Rem = (function(_super) {
      __extends(Rem, _super);

      function Rem($text) {
        this.text = $text.replace(/^REM/i, '');
      }

      Rem.prototype["eval"] = function() {
        return false;
      };

      Rem.prototype.toString = function() {
        return "REM" + this.text;
      };

      return Rem;

    })(Keyword),
    Stop: Stop = (function(_super) {
      __extends(Stop, _super);

      function Stop() {}

      Stop.prototype["eval"] = function() {
        eop = true;
        return false;
      };

      Stop.prototype.toString = function() {
        return "STOP";
      };

      return Stop;

    })(Keyword),
    Max: Max = (function(_super) {
      __extends(Max, _super);

      function Max() {
        return Max.__super__.constructor.apply(this, arguments);
      }

      Max.prototype["eval"] = function() {
        return Math.max(valueOf(this.left), valueOf(this.right));
      };

      Max.prototype.toString = function() {
        return "" + this.left + " MAX " + this.right;
      };

      return Max;

    })(Operator),
    Min: Min = (function(_super) {
      __extends(Min, _super);

      function Min() {
        return Min.__super__.constructor.apply(this, arguments);
      }

      Min.prototype["eval"] = function() {
        return Math.min(valueOf(this.left), valueOf(this.right));
      };

      Min.prototype.toString = function() {
        return "" + this.left + " MIN " + this.right;
      };

      return Min;

    })(Operator),
    Add: Add = (function(_super) {
      __extends(Add, _super);

      function Add() {
        return Add.__super__.constructor.apply(this, arguments);
      }

      Add.prototype["eval"] = function() {
        return valueOf(this.left) + valueOf(this.right);
      };

      Add.prototype.toString = function() {
        return "" + this.left + " + " + this.right;
      };

      return Add;

    })(Operator),
    Sub: Sub = (function(_super) {
      __extends(Sub, _super);

      function Sub() {
        return Sub.__super__.constructor.apply(this, arguments);
      }

      Sub.prototype["eval"] = function() {
        return valueOf(this.left) - valueOf(this.right);
      };

      Sub.prototype.toString = function() {
        return "" + this.left + " - " + this.right;
      };

      return Sub;

    })(Operator),
    Mul: Mul = (function(_super) {
      __extends(Mul, _super);

      function Mul() {
        return Mul.__super__.constructor.apply(this, arguments);
      }

      Mul.prototype["eval"] = function() {
        return valueOf(this.left) * valueOf(this.right);
      };

      Mul.prototype.toString = function() {
        return "" + this.left + " * " + this.right;
      };

      return Mul;

    })(Operator),
    Div: Div = (function(_super) {
      __extends(Div, _super);

      function Div() {
        return Div.__super__.constructor.apply(this, arguments);
      }

      Div.prototype["eval"] = function() {
        return valueOf(this.left) / valueOf(this.right);
      };

      Div.prototype.toString = function() {
        return "" + this.left + " / " + this.right;
      };

      return Div;

    })(Operator),
    Pow: Pow = (function(_super) {
      __extends(Pow, _super);

      function Pow() {
        return Pow.__super__.constructor.apply(this, arguments);
      }

      Pow.prototype["eval"] = function() {
        return Math.pow(valueOf(this.left), valueOf(this.right));
      };

      Pow.prototype.toString = function() {
        return "" + this.left + " ^ " + this.right;
      };

      return Pow;

    })(Operator),
    OR: OR = (function(_super) {
      __extends(OR, _super);

      function OR() {
        return OR.__super__.constructor.apply(this, arguments);
      }

      OR.prototype["eval"] = function() {
        return valueOf(this.left) || valueOf(this.right);
      };

      OR.prototype.toString = function() {
        return "" + this.left + " OR " + this.right;
      };

      return OR;

    })(Operator),
    AND: AND = (function(_super) {
      __extends(AND, _super);

      function AND() {
        return AND.__super__.constructor.apply(this, arguments);
      }

      AND.prototype["eval"] = function() {
        return valueOf(this.left) && valueOf(this.right);
      };

      AND.prototype.toString = function() {
        return "" + this.left + " AND " + this.right;
      };

      return AND;

    })(Operator),
    NOT: NOT = (function(_super) {
      __extends(NOT, _super);

      function NOT() {
        return NOT.__super__.constructor.apply(this, arguments);
      }

      NOT.prototype["eval"] = function() {
        return !valueOf(this.left);
      };

      NOT.prototype.toString = function() {
        return "NOT " + this.left;
      };

      return NOT;

    })(Operator),
    LT: LT = (function(_super) {
      __extends(LT, _super);

      function LT() {
        return LT.__super__.constructor.apply(this, arguments);
      }

      LT.prototype["eval"] = function() {
        return valueOf(this.left) < valueOf(this.right);
      };

      LT.prototype.toString = function() {
        return "" + this.left + " < " + this.right;
      };

      return LT;

    })(Operator),
    GT: GT = (function(_super) {
      __extends(GT, _super);

      function GT() {
        return GT.__super__.constructor.apply(this, arguments);
      }

      GT.prototype["eval"] = function() {
        return valueOf(this.left) > valueOf(this.right);
      };

      GT.prototype.toString = function() {
        return "" + this.left + " > " + this.right;
      };

      return GT;

    })(Operator),
    LE: LE = (function(_super) {
      __extends(LE, _super);

      function LE() {
        return LE.__super__.constructor.apply(this, arguments);
      }

      LE.prototype["eval"] = function() {
        return valueOf(this.left) <= valueOf(this.right);
      };

      LE.prototype.toString = function() {
        return "" + this.left + " <= " + this.right;
      };

      return LE;

    })(Operator),
    GE: GE = (function(_super) {
      __extends(GE, _super);

      function GE() {
        return GE.__super__.constructor.apply(this, arguments);
      }

      GE.prototype["eval"] = function() {
        return valueOf(this.left) >= valueOf(this.right);
      };

      GE.prototype.toString = function() {
        return "" + this.left + " >= " + this.right;
      };

      return GE;

    })(Operator),
    EQ: EQ = (function(_super) {
      __extends(EQ, _super);

      function EQ() {
        return EQ.__super__.constructor.apply(this, arguments);
      }

      EQ.prototype["eval"] = function() {
        if (valueOf(this.left) === valueOf(this.right)) {
          return true;
        } else {
          return false;
        }
      };

      EQ.prototype.toString = function() {
        return "" + this.left + " = " + this.right;
      };

      return EQ;

    })(Operator),
    NE: NE = (function(_super) {
      __extends(NE, _super);

      function NE() {
        return NE.__super__.constructor.apply(this, arguments);
      }

      NE.prototype["eval"] = function() {
        if (valueOf(this.left) !== valueOf(this.right)) {
          return true;
        } else {
          return false;
        }
      };

      NE.prototype.toString = function() {
        return "" + this.left + " <> " + this.right;
      };

      return NE;

    })(Operator),
    FN: FN = (function() {
      function FN(name, parm) {
        this.name = name;
        this.parm = parm;
      }

      FN.prototype["eval"] = function() {
        return functions[this.name](valueOf(this.parm));
      };

      FN.prototype.toString = function() {
        return "" + this.name + "(" + this.parm + ")";
      };

      return FN;

    })(),
    ABS: ABS = (function(_super) {
      __extends(ABS, _super);

      function ABS() {
        return ABS.__super__.constructor.apply(this, arguments);
      }

      ABS.prototype["eval"] = function() {
        return Math.abs(valueOf(this.$0));
      };

      return ABS;

    })(BuiltIn),
    ATN: ATN = (function(_super) {
      __extends(ATN, _super);

      function ATN() {
        return ATN.__super__.constructor.apply(this, arguments);
      }

      ATN.prototype["eval"] = function() {
        return Math.atan(valueOf(this.$0));
      };

      return ATN;

    })(BuiltIn),
    COS: COS = (function(_super) {
      __extends(COS, _super);

      function COS() {
        return COS.__super__.constructor.apply(this, arguments);
      }

      COS.prototype["eval"] = function() {
        return Math.cos(valueOf(this.$0));
      };

      return COS;

    })(BuiltIn),
    EXP: EXP = (function(_super) {
      __extends(EXP, _super);

      function EXP() {
        return EXP.__super__.constructor.apply(this, arguments);
      }

      EXP.prototype["eval"] = function() {
        return Math.exp(valueOf(this.$0));
      };

      return EXP;

    })(BuiltIn),
    INT: INT = (function(_super) {
      __extends(INT, _super);

      function INT() {
        return INT.__super__.constructor.apply(this, arguments);
      }

      INT.prototype["eval"] = function() {
        return Math.floor(valueOf(this.$0));
      };

      return INT;

    })(BuiltIn),
    LEN: LEN = (function(_super) {
      __extends(LEN, _super);

      function LEN() {
        return LEN.__super__.constructor.apply(this, arguments);
      }

      LEN.prototype["eval"] = function() {
        return valueOf(this.$0).length;
      };

      return LEN;

    })(BuiltIn),
    LIN: LIN = (function(_super) {
      __extends(LIN, _super);

      function LIN() {
        return LIN.__super__.constructor.apply(this, arguments);
      }

      LIN.prototype["eval"] = function() {
        return Array(Math.abs(valueOf(this.$0)) + 1).join('\n');
      };

      return LIN;

    })(BuiltIn),
    LOG: LOG = (function(_super) {
      __extends(LOG, _super);

      function LOG() {
        return LOG.__super__.constructor.apply(this, arguments);
      }

      LOG.prototype["eval"] = function() {
        return Math.log(valueOf(this.$0));
      };

      return LOG;

    })(BuiltIn),
    RND: RND = (function(_super) {
      __extends(RND, _super);

      function RND() {
        return RND.__super__.constructor.apply(this, arguments);
      }

      RND.prototype["eval"] = function() {
        return Math.random();
      };

      return RND;

    })(BuiltIn),
    SGN: SGN = (function(_super) {
      __extends(SGN, _super);

      function SGN() {
        return SGN.__super__.constructor.apply(this, arguments);
      }

      SGN.prototype["eval"] = function() {
        var $0;
        $0 = valueOf(this.$0);
        if ($0 < 0) {
          return -1;
        } else if ($0 > 0) {
          return 1;
        } else {
          return 0;
        }
      };

      return SGN;

    })(BuiltIn),
    SIN: SIN = (function(_super) {
      __extends(SIN, _super);

      function SIN() {
        return SIN.__super__.constructor.apply(this, arguments);
      }

      SIN.prototype["eval"] = function() {
        return Math.sin(valueOf(this.$0));
      };

      return SIN;

    })(BuiltIn),
    SPA: SPA = (function(_super) {
      __extends(SPA, _super);

      function SPA() {
        return SPA.__super__.constructor.apply(this, arguments);
      }

      SPA.prototype["eval"] = function() {
        return Array(valueOf(this.$0)).join(" ");
      };

      return SPA;

    })(BuiltIn),
    SQR: SQR = (function(_super) {
      __extends(SQR, _super);

      function SQR() {
        return SQR.__super__.constructor.apply(this, arguments);
      }

      SQR.prototype["eval"] = function() {
        return Math.sqrt(valueOf(this.$0));
      };

      return SQR;

    })(BuiltIn),
    TAB: TAB = (function(_super) {
      __extends(TAB, _super);

      function TAB() {
        return TAB.__super__.constructor.apply(this, arguments);
      }

      TAB.prototype["eval"] = function() {
        return Array(Math.floor(valueOf(this.$0))).join(" ");
      };

      return TAB;

    })(BuiltIn),
    TAN: TAN = (function(_super) {
      __extends(TAN, _super);

      function TAN() {
        return TAN.__super__.constructor.apply(this, arguments);
      }

      TAN.prototype["eval"] = function() {
        return Math.tan(valueOf(this.$0));
      };

      return TAN;

    })(BuiltIn),
    TIM: TIM = (function(_super) {
      __extends(TIM, _super);

      function TIM() {
        return TIM.__super__.constructor.apply(this, arguments);
      }

      TIM.prototype["eval"] = function() {
        if (valueOf(this.$0) === 0) {
          return (new Date()).getMinutes();
        } else {
          return (new Date()).getSeconds();
        }
      };

      return TIM;

    })(BuiltIn),
    LCASE: LCASE = (function(_super) {
      __extends(LCASE, _super);

      function LCASE() {
        return LCASE.__super__.constructor.apply(this, arguments);
      }

      LCASE.prototype["eval"] = function() {
        return valueOf(this.$0).toLowerCase();
      };

      LCASE.prototype.toString = function() {
        return "LCASE(" + this.$0 + ", " + this.$1 + ", " + this.$2 + ")";
      };

      return LCASE;

    })(BuiltIn),
    LEFT: LEFT = (function(_super) {
      __extends(LEFT, _super);

      function LEFT() {
        return LEFT.__super__.constructor.apply(this, arguments);
      }

      LEFT.prototype["eval"] = function() {
        return valueOf(this.$0).substr(0, valueOf(this.$1) - 1);
      };

      LEFT.prototype.toString = function() {
        return "LEFT(" + this.$0 + ", " + this.$1 + ", " + this.$2 + ")";
      };

      return LEFT;

    })(BuiltIn),
    MID: MID = (function(_super) {
      __extends(MID, _super);

      function MID() {
        return MID.__super__.constructor.apply(this, arguments);
      }

      MID.prototype["eval"] = function() {
        return valueOf(this.$0).substring(valueOf(this.$1), valueOf(this.$2));
      };

      MID.prototype.toString = function() {
        return "MID(" + this.$0 + ", " + this.$1 + ", " + this.$2 + ")";
      };

      return MID;

    })(BuiltIn),
    RIGHT: RIGHT = (function(_super) {
      __extends(RIGHT, _super);

      function RIGHT() {
        return RIGHT.__super__.constructor.apply(this, arguments);
      }

      RIGHT.prototype["eval"] = function() {
        return valueOf(this.$0).substr(valueOf(this.$1) - 1);
      };

      RIGHT.prototype.toString = function() {
        return "RIGHT(" + this.$0 + ", " + this.$1 + ", " + this.$2 + ")";
      };

      return RIGHT;

    })(BuiltIn),
    SUBSTR: SUBSTR = (function(_super) {
      __extends(SUBSTR, _super);

      function SUBSTR() {
        return SUBSTR.__super__.constructor.apply(this, arguments);
      }

      SUBSTR.prototype["eval"] = function() {
        return valueOf(this.$0).substr(valueOf(this.$1) - 1, valueOf(this.$2));
      };

      SUBSTR.prototype.toString = function() {
        return "SUBSTR(" + this.$0 + ", " + this.$1 + ", " + this.$2 + ")";
      };

      return SUBSTR;

    })(BuiltIn),
    UCASE: UCASE = (function(_super) {
      __extends(UCASE, _super);

      function UCASE() {
        return UCASE.__super__.constructor.apply(this, arguments);
      }

      UCASE.prototype["eval"] = function() {
        return valueOf(this.$0).toUpperCase();
      };

      UCASE.prototype.toString = function() {
        return "UCASE(" + this.$0 + ", " + this.$1 + ", " + this.$2 + ")";
      };

      return UCASE;

    })(BuiltIn)
  }
};

}).call(this,require('_process'))
},{"./kc":4,"./rte":5,"./util":7,"_process":10}],4:[function(require,module,exports){
(function (process){
/* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,31],$V1=[1,32],$V2=[1,33],$V3=[1,34],$V4=[1,35],$V5=[1,57],$V6=[1,36],$V7=[1,37],$V8=[1,38],$V9=[1,39],$Va=[1,40],$Vb=[1,41],$Vc=[1,42],$Vd=[1,43],$Ve=[1,44],$Vf=[1,45],$Vg=[1,46],$Vh=[1,48],$Vi=[1,52],$Vj=[1,49],$Vk=[1,50],$Vl=[1,51],$Vm=[1,53],$Vn=[1,54],$Vo=[1,55],$Vp=[1,56],$Vq=[6,10,35,38,39,41,43,45,48,49,50,53,56,57,60,61,63,65,67,69,70,73,74,79,80,81,82,83],$Vr=[1,70],$Vs=[1,73],$Vt=[1,74],$Vu=[1,75],$Vv=[1,86],$Vw=[1,88],$Vx=[1,87],$Vy=[1,84],$Vz=[1,85],$VA=[1,89],$VB=[1,90],$VC=[1,91],$VD=[1,92],$VE=[1,93],$VF=[1,94],$VG=[1,95],$VH=[1,96],$VI=[1,97],$VJ=[1,98],$VK=[1,99],$VL=[1,100],$VM=[1,101],$VN=[1,102],$VO=[1,103],$VP=[1,104],$VQ=[1,105],$VR=[1,106],$VS=[1,107],$VT=[1,108],$VU=[1,109],$VV=[1,110],$VW=[1,120],$VX=[1,117],$VY=[1,121],$VZ=[1,125],$V_=[1,128],$V$=[1,143],$V01=[5,52],$V11=[5,37,52,54,55,57,58,62,78,84,85,87,88,89,90,91,92,93,94,95,96,97,98,99,102],$V21=[2,117],$V31=[58,84,85,87,88,89,90,91,92,93,94,95,96,97,98,99],$V41=[1,153],$V51=[1,154],$V61=[1,155],$V71=[1,156],$V81=[1,157],$V91=[1,158],$Va1=[1,159],$Vb1=[1,160],$Vc1=[1,161],$Vd1=[1,162],$Ve1=[1,163],$Vf1=[1,164],$Vg1=[1,165],$Vh1=[1,166],$Vi1=[1,167],$Vj1=[2,90],$Vk1=[1,199],$Vl1=[5,37,52],$Vm1=[1,202],$Vn1=[5,84,85,87,88,89,90,91,92,93,94,95,96,97,98,99],$Vo1=[5,52,78],$Vp1=[10,12,36,44,45,86,96,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,126],$Vq1=[1,222],$Vr1=[5,37,52,54,55,57,58,62,78,84,85,87,88,89,90,91,92,102],$Vs1=[5,10,12,36,44,45,86,96,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,126],$Vt1=[1,288],$Vu1=[37,52,102],$Vv1=[1,291],$Vw1=[5,37,52,102],$Vx1=[5,37,52,54,55,57,58,62,78,84,85,87,88,89,90,91,92,93,94,102],$Vy1=[5,37,52,54,55,57,58,62,78,84,85,87,88,89,90,91,92,93,94,95,96,102],$Vz1=[5,37,52,54,55,57,58,62,78,84,85,87,88,89,90,91,92,93,94,95,96,97,98,102],$VA1=[2,91],$VB1=[2,92];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"Command":4,"NEWLINE":5,"EOF":6,"Lines":7,"Line":8,"Statement":9,"INTEGER":10,"ATARI":11,"STRING":12,"CLS":13,"GWBASIC":14,"TRON":15,"TROFF":16,"APPEND":17,"CATALOG":18,"DELETE":19,"DIR":20,"EXECUTE":21,"FILES":22,"GET":23,"GROUP":24,"LIBRARY":25,"LIST":26,"NAME":27,"PURGE":28,"RENUMBER":29,"QUIT":30,"RUN":31,"SAVE":32,"SCRATCH":33,"TEST":34,"BASE":35,"(":36,")":37,"CHAIN":38,"COM":39,"DimList":40,"DATA":41,"ConstantList":42,"DEF":43,"FND":44,"VAR":45,"=":46,"Expression":47,"DIM":48,"END":49,"ENTER":50,"PORT":51,",":52,"FOR":53,"TO":54,"STEP":55,"GO":56,"GOTO":57,"OF":58,"IntegerList":59,"GOSUB":60,"IF":61,"THEN":62,"IMAGE":63,"ImageList":64,"INPUT":65,"VarList":66,"LET":67,"LetList":68,"MAT":69,"READ":70,"ZER":71,"CON":72,"NEXT":73,"PRINT":74,"PrintList":75,"PrintSep":76,"USING":77,";":78,"RANDOMIZE":79,"RESTORE":80,"RETURN":81,"REM":82,"STOP":83,"OR":84,"AND":85,"NOT":86,"EQ":87,"NE":88,">":89,"GE":90,"<":91,"LE":92,"MAX":93,"MIN":94,"+":95,"-":96,"*":97,"/":98,"^":99,"[":100,"ExpressionList":101,"]":102,"ABS":103,"ATN":104,"COS":105,"EXP":106,"INT":107,"LEN":108,"LIN":109,"LOG":110,"RND":111,"SGN":112,"SIN":113,"SPA":114,"SQR":115,"TAB":116,"TAN":117,"TIM":118,"LCASE":119,"LEFT":120,"MID":121,"RIGHT":122,"SUBSTR":123,"UCASE":124,"Constant":125,"NUMBER":126,"Dim":127,"VarItem":128,"ImageItem":129,"ImageMask":130,"ImageMaskItem":131,"$accept":0,"$end":1},
terminals_: {2:"error",5:"NEWLINE",6:"EOF",10:"INTEGER",11:"ATARI",12:"STRING",13:"CLS",14:"GWBASIC",15:"TRON",16:"TROFF",17:"APPEND",18:"CATALOG",19:"DELETE",20:"DIR",21:"EXECUTE",22:"FILES",23:"GET",24:"GROUP",25:"LIBRARY",26:"LIST",27:"NAME",28:"PURGE",29:"RENUMBER",30:"QUIT",31:"RUN",32:"SAVE",33:"SCRATCH",34:"TEST",35:"BASE",36:"(",37:")",38:"CHAIN",39:"COM",41:"DATA",43:"DEF",44:"FND",45:"VAR",46:"=",48:"DIM",49:"END",50:"ENTER",51:"PORT",52:",",53:"FOR",54:"TO",55:"STEP",56:"GO",57:"GOTO",58:"OF",60:"GOSUB",61:"IF",62:"THEN",63:"IMAGE",65:"INPUT",67:"LET",69:"MAT",70:"READ",71:"ZER",72:"CON",73:"NEXT",74:"PRINT",77:"USING",78:";",79:"RANDOMIZE",80:"RESTORE",81:"RETURN",82:"REM",83:"STOP",84:"OR",85:"AND",86:"NOT",87:"EQ",88:"NE",89:">",90:"GE",91:"<",92:"LE",93:"MAX",94:"MIN",95:"+",96:"-",97:"*",98:"/",99:"^",100:"[",102:"]",103:"ABS",104:"ATN",105:"COS",106:"EXP",107:"INT",108:"LEN",109:"LIN",110:"LOG",111:"RND",112:"SGN",113:"SIN",114:"SPA",115:"SQR",116:"TAB",117:"TAN",118:"TIM",119:"LCASE",120:"LEFT",121:"MID",122:"RIGHT",123:"SUBSTR",124:"UCASE",126:"NUMBER"},
productions_: [0,[3,3],[3,2],[7,3],[7,2],[7,1],[8,1],[8,2],[4,2],[4,1],[4,2],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[9,4],[9,2],[9,2],[9,2],[9,7],[9,2],[9,1],[9,8],[9,6],[9,8],[9,6],[9,3],[9,2],[9,4],[9,2],[9,4],[9,4],[9,4],[9,4],[9,2],[9,2],[9,4],[9,3],[9,2],[9,3],[9,4],[9,4],[9,2],[9,3],[9,2],[9,1],[9,5],[9,3],[9,1],[9,2],[9,1],[9,2],[9,1],[9,1],[9,1],[47,3],[47,3],[47,2],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,2],[47,3],[47,1],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,6],[47,8],[47,6],[47,8],[47,4],[47,1],[125,1],[125,1],[125,1],[40,1],[40,3],[127,1],[127,4],[127,4],[68,2],[68,5],[68,5],[68,3],[68,6],[68,6],[42,1],[42,3],[59,1],[59,3],[101,1],[101,3],[66,1],[66,3],[128,1],[128,4],[128,4],[75,1],[75,3],[76,1],[76,1],[64,1],[64,3],[129,1],[129,1],[130,1],[130,4],[131,1],[131,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
this.$ = new keyword.Statement($$[$0-2]);
break;
case 6:
this.$ = new keyword.Statement($$[$0]);
break;
case 7:
this.$ = new keyword.Statement($$[$0], $$[$0-1]);
break;
case 8:
 command.atari($$[$0]); return true;
break;
case 9:
 command.cls(); return true;
break;
case 10:
 command.gwbasic($$[$0]); return true;
break;
case 11:
 command.tron(); return true;
break;
case 12:
 command.troff(); return true;
break;
case 13:
 command.append($$[$0]); return true;
break;
case 14:
 command.cat('CATALOG'); return true;
break;
case 15:
 command.del($$[$0]); return true;
break;
case 16:
 command.cat('GWBASIC'); return true;
break;
case 17:
 command.exec($$[$0]); return true;
break;
case 18:
 command.cat('ATARI'); return true;
break;
case 19:
 command.get($$[$0]); return true;
break;
case 20:
 command.cat('GROUP'); return true;
break;
case 21:
 command.del("del-"+$$[$0]); return true;
break;
case 22:
 command.cat('LIBRARY'); return true;
break;
case 23:
 command.list($$[$0]); return true;
break;
case 24:
 command.name($$[$0]); return true;
break;
case 25:
 command.purge($$[$0]); return true;
break;
case 26:
 command.renum($$[$0]); return true;
break;
case 27:
 command.quit(); return true;
break;
case 28:
 command.run($$[$0]); return true;
break;
case 29:
 command.save(); return true;
break;
case 30:
 command.scr(); return true;
break;
case 31:
 command.cat('TEST'); return true;
break;
case 32:
this.$ = new keyword.Base($$[$0-1]);
break;
case 33:
this.$ = new keyword.Chain($$[$0]);
break;
case 34:
this.$ = new keyword.Com($$[$0]);
break;
case 35:
this.$ = new keyword.Data($$[$0]);
break;
case 36:
this.$ = new keyword.Def($$[$0-5], $$[$0-3], $$[$0]);
break;
case 37:
this.$ = new keyword.Dim($$[$0]);
break;
case 38:
this.$ = new keyword.End();
break;
case 39:
this.$ = new keyword.Enter($$[$0-6], $$[$0-4], $$[$0-2], $$[$0]);
break;
case 40:
this.$ = new keyword.Enter($$[$0-4], $$[$0-2], $$[$0]);
break;
case 41:
this.$ = new keyword.For($$[$0-6], $$[$0-4], $$[$0-2], $$[$0]);
break;
case 42:
this.$ = new keyword.For($$[$0-4], $$[$0-2], $$[$0]);
break;
case 43: case 44:
this.$ = new keyword.Goto($$[$0]);
break;
case 45:
this.$ = new keyword.Goto($$[$0-2], $$[$0]);
break;
case 46:
this.$ = new keyword.Gosub($$[$0]);
break;
case 47:
this.$ = new keyword.Gosub($$[$0-2], $$[$0]);
break;
case 48: case 49: case 50:
this.$ = new keyword.If($$[$0-2], $$[$0]);
break;
case 51:
this.$ = new keyword.Image($$[$0]);
break;
case 52:
this.$ = new keyword.Input($$[$0]);
break;
case 53:
this.$ = new keyword.Input($$[$0], $$[$0-2]);
break;
case 54: case 55:
this.$ = new keyword.Let($$[$0-1], $$[$0]);
break;
case 56:
this.$ = new keyword.MatRead($$[$0]);
break;
case 57:
this.$ = new keyword.Mat(new keyword.Var($$[$0-2]), keyword.Zer);
break;
case 58:
this.$ = new keyword.Mat(new keyword.Var($$[$0-2]), keyword.Con);
break;
case 59:
this.$ = new keyword.Next(new keyword.Var($$[$0]));
break;
case 60:
this.$ = new keyword.Print($$[$0-1], $$[$0]);
break;
case 61:
this.$ = new keyword.Print($$[$0]);
break;
case 62:
this.$ = new keyword.Print(new keyword.Const(''));
break;
case 63:
this.$ = new keyword.Using($$[$0-2], $$[$0]);
break;
case 64:
this.$ = new keyword.Using($$[$0]);
break;
case 65:
this.$ = new keyword.Randomize();
break;
case 66:
this.$ = new keyword.Read($$[$0]);
break;
case 67:
this.$ = new keyword.Restore();
break;
case 68:
this.$ = new keyword.Restore($$[$0]);
break;
case 69:
this.$ = new keyword.Return();
break;
case 70:
this.$ = new keyword.Rem($$[$0]);
break;
case 71:
this.$ = new keyword.Stop();
break;
case 72:
this.$ = new keyword.OR($$[$0-2], $$[$0]);
break;
case 73:
this.$ = new keyword.AND($$[$0-2], $$[$0]);
break;
case 74:
this.$ = new keyword.NOT($$[$0]);
break;
case 75:
this.$ = new keyword.EQ($$[$0-2], $$[$0]);
break;
case 76:
this.$ = new keyword.NE($$[$0-2], $$[$0]);
break;
case 77:
this.$ = new keyword.GT($$[$0-2], $$[$0]);
break;
case 78:
this.$ = new keyword.GE($$[$0-2], $$[$0]);
break;
case 79:
this.$ = new keyword.LT($$[$0-2], $$[$0]);
break;
case 80:
this.$ = new keyword.LE($$[$0-2], $$[$0]);
break;
case 81:
this.$ = new keyword.Max($$[$0-2], $$[$0]);
break;
case 82:
this.$ = new keyword.Min($$[$0-2], $$[$0]);
break;
case 83:
this.$ = new keyword.Add($$[$0-2], $$[$0]);
break;
case 84:
this.$ = new keyword.Sub($$[$0-2], $$[$0]);
break;
case 85:
this.$ = new keyword.Mul($$[$0-2], $$[$0]);
break;
case 86:
this.$ = new keyword.Div($$[$0-2], $$[$0]);
break;
case 87:
this.$ = new keyword.Pow($$[$0-2], $$[$0]);
break;
case 88:
this.$ = -$$[$0];
break;
case 89:
this.$ = $$[$0-1];
break;
case 90: case 122: case 139:
this.$ = new keyword.Var($$[$0]);
break;
case 91: case 92: case 123: case 124: case 140: case 141:
this.$ = new keyword.Var($$[$0-3], $$[$0-2], $$[$0-1]);
break;
case 93:
this.$ = new keyword.FN($$[$0-3], $$[$0-1]);
break;
case 94:
this.$ = new keyword.ABS($$[$0-1]);
break;
case 95:
this.$ = new keyword.ATN($$[$0-1]);
break;
case 96:
this.$ = new keyword.COS($$[$0-1]);
break;
case 97:
this.$ = new keyword.EXP($$[$0-1]);
break;
case 98:
this.$ = new keyword.INT($$[$0-1]);
break;
case 99:
this.$ = new keyword.LEN($$[$0-1]);
break;
case 100:
this.$ = new keyword.LIN($$[$0-1]);
break;
case 101:
this.$ = new keyword.LOG($$[$0-1]);
break;
case 102:
this.$ = new keyword.RND($$[$0-1]);
break;
case 103:
this.$ = new keyword.SGN($$[$0-1]);
break;
case 104:
this.$ = new keyword.SIN($$[$0-1]);
break;
case 105:
this.$ = new keyword.SPA($$[$0-1]);
break;
case 106:
this.$ = new keyword.SQR($$[$0-1]);
break;
case 107:
this.$ = new keyword.TAB($$[$0-1]);
break;
case 108:
this.$ = new keyword.TAN($$[$0-1]);
break;
case 109:
this.$ = new keyword.TIM($$[$0-1]);
break;
case 110:
this.$ = new keyword.LCASE($$[$0-1]);
break;
case 111:
this.$ = new keyword.LEFT($$[$0-3], $$[$0-1]);
break;
case 112:
this.$ = new keyword.MID($$[$0-5], $$[$0-3], $$[$0-1]);
break;
case 113:
this.$ = new keyword.RIGHT($$[$0-3], $$[$0-1]);
break;
case 114:
this.$ = new keyword.SUBSTR($$[$0-5], $$[$0-3], $$[$0-1]);
break;
case 115:
this.$ = new keyword.UCASE($$[$0-1]);
break;
case 116: case 148: case 149:
this.$ = $$[$0];
break;
case 117:
this.$ = new keyword.Const(parseInt($$[$0], 10));
break;
case 118:
this.$ = new keyword.Const($$[$0]);
break;
case 119:
this.$ = new keyword.Const(Number($$[$0]));
break;
case 120: case 131: case 135: case 137: case 142: case 146: case 150: case 152:
this.$ = [$$[$0]];
break;
case 121: case 132: case 136: case 138:
this.$ = [$$[$0-2], $$[$0]];
break;
case 125:
this.$ = [$$[$0-1]];
break;
case 126: case 127:
this.$ = [new keyword.Var($$[$0-4], $$[$0-3], $$[$0-2])];
break;
case 128:
this.$ = [$$[$0-2], $$[$0-1]];
break;
case 129: case 130:
this.$ = [$$[$0-5], new keyword.Var($$[$0-4], $$[$0-3], $$[$0-2])];
break;
case 133:
this.$ = [parseInt($$[$0], 10)];
break;
case 134:
this.$ = [$$[$0-2], parseInt($$[$0], 10)];
break;
case 143: case 147:
this.$ = [$$[$0-2], $$[$0-1], $$[$0]];
break;
case 144:
this.$ = keyword.Semic;
break;
case 145:
this.$ = keyword.Comma;
break;
case 151:
this.$ = [parseInt($$[$0-3], 10), $$[$0-2], $$[$0-1], $$[$0]];
break;
case 153:
this.$ = [parseInt($$[$0-1], 10), $$[$0]];
break;
}
},
table: [{3:1,4:2,5:[1,29],7:3,8:28,9:30,10:[1,17],11:[1,4],13:[1,5],14:[1,6],15:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],21:[1,13],22:[1,14],23:[1,15],24:[1,16],25:[1,18],26:[1,19],27:[1,20],28:[1,21],29:[1,22],30:[1,23],31:[1,24],32:[1,25],33:[1,26],34:[1,27],35:$V0,38:$V1,39:$V2,41:$V3,43:$V4,45:$V5,48:$V6,49:$V7,50:$V8,53:$V9,56:$Va,57:$Vb,60:$Vc,61:$Vd,63:$Ve,65:$Vf,67:$Vg,68:47,69:$Vh,70:$Vi,73:$Vj,74:$Vk,79:$Vl,80:$Vm,81:$Vn,82:$Vo,83:$Vp},{1:[3]},{5:[1,58]},{6:[1,59],8:60,9:30,10:[1,61],35:$V0,38:$V1,39:$V2,41:$V3,43:$V4,45:$V5,48:$V6,49:$V7,50:$V8,53:$V9,56:$Va,57:$Vb,60:$Vc,61:$Vd,63:$Ve,65:$Vf,67:$Vg,68:47,69:$Vh,70:$Vi,73:$Vj,74:$Vk,79:$Vl,80:$Vm,81:$Vn,82:$Vo,83:$Vp},{12:[1,62]},{5:[2,9]},{12:[1,63]},{5:[2,11]},{5:[2,12]},{5:[2,13]},{5:[2,14]},{5:[2,15]},{5:[2,16]},{5:[2,17]},{5:[2,18]},{5:[2,19]},{5:[2,20]},{5:[2,21],9:64,35:$V0,38:$V1,39:$V2,41:$V3,43:$V4,45:$V5,48:$V6,49:$V7,50:$V8,53:$V9,56:$Va,57:$Vb,60:$Vc,61:$Vd,63:$Ve,65:$Vf,67:$Vg,68:47,69:$Vh,70:$Vi,73:$Vj,74:$Vk,79:$Vl,80:$Vm,81:$Vn,82:$Vo,83:$Vp},{5:[2,22]},{5:[2,23]},{5:[2,24]},{5:[2,25]},{5:[2,26]},{5:[2,27]},{5:[2,28]},{5:[2,29]},{5:[2,30]},{5:[2,31]},{5:[1,65]},o($Vq,[2,5]),{5:[2,6]},{36:[1,66]},{12:[1,67]},{40:68,45:$Vr,127:69},{10:$Vs,12:$Vt,42:71,125:72,126:$Vu},{44:[1,76]},{40:77,45:$Vr,127:69},{5:[2,38]},{45:[1,79],51:[1,78]},{45:[1,80]},{54:[1,81]},{10:[1,82],12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:83,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:[1,112],12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:113,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:114,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$VW,12:$VX,45:$VY,64:115,129:116,130:118,131:119},{12:[1,123],45:$VZ,66:122,128:124},{45:$V5,68:126},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$V_,47:127,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{45:[1,130],70:[1,129]},{45:[1,131]},{5:[2,62],10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:134,75:132,77:[1,133],86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{5:[2,65]},{45:$VZ,66:135,128:124},{5:[2,67],10:[1,136]},{5:[2,69]},{5:[2,70]},{5:[2,71]},{36:[1,139],46:[1,137],100:[1,138]},{6:[1,140]},{1:[2,2]},{5:[1,141]},{9:64,35:$V0,38:$V1,39:$V2,41:$V3,43:$V4,45:$V5,48:$V6,49:$V7,50:$V8,53:$V9,56:$Va,57:$Vb,60:$Vc,61:$Vd,63:$Ve,65:$Vf,67:$Vg,68:47,69:$Vh,70:$Vi,73:$Vj,74:$Vk,79:$Vl,80:$Vm,81:$Vn,82:$Vo,83:$Vp},{5:[2,8]},{5:[2,10]},{5:[2,7]},o($Vq,[2,4]),{10:[1,142]},{5:[2,33]},{5:[2,34],52:$V$},o($V01,[2,120]),o($V01,[2,122],{36:[1,145],100:[1,144]}),{5:[2,35],52:[1,146]},o($V01,[2,131]),o($V11,$V21),o($V11,[2,118]),o($V11,[2,119]),{36:[1,147]},{5:[2,37],52:$V$},{52:[1,148]},{52:[1,149]},{46:[1,150]},{10:[1,151]},o($V31,$V21,{5:[2,44]}),{58:[1,152],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:168,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:169,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:170,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},o($V11,$Vj1,{36:[1,172],100:[1,171]}),{36:[1,173]},{36:[1,174]},{36:[1,175]},{36:[1,176]},{36:[1,177]},{36:[1,178]},{36:[1,179]},{36:[1,180]},{36:[1,181]},{36:[1,182]},{36:[1,183]},{36:[1,184]},{36:[1,185]},{36:[1,186]},{36:[1,187]},{36:[1,188]},{36:[1,189]},{36:[1,190]},{36:[1,191]},{36:[1,192]},{36:[1,193]},{36:[1,194]},{36:[1,195]},o($V11,[2,116]),o($V31,$V21,{5:[2,46]}),{58:[1,196],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{57:[1,197],62:[1,198],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{5:[2,51],52:$Vk1},o($Vl1,[2,146]),o($Vl1,[2,148]),o($Vl1,[2,149]),o($Vl1,[2,150]),{36:[1,200],45:[1,201]},o($Vl1,[2,152]),{5:[2,52],52:$Vm1},{52:[1,203]},o($V01,[2,137]),o($V01,[2,139],{36:[1,205],100:[1,204]}),{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$V_,47:206,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{5:[2,55],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},o($Vn1,$Vj1,{36:[1,209],46:[1,207],100:[1,208]}),{45:$VZ,66:210,128:124},{46:[1,211]},{5:[2,59]},{5:[2,61],52:[1,214],76:212,78:[1,213]},{10:[1,215]},o($Vo1,[2,142],{84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),{5:[2,66],52:$Vm1},{5:[2,68]},o($Vp1,[2,125]),{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:217,86:$Vy,96:$Vz,101:216,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:217,86:$Vy,96:$Vz,101:218,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{1:[2,1]},o($Vq,[2,3]),{37:[1,219]},{45:$Vr,127:220},{10:$Vq1,59:221},{10:$Vq1,59:223},{10:$Vs,12:$Vt,125:224,126:$Vu},{45:[1,225]},{45:[1,226]},{45:[1,227]},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:228,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{5:[2,43]},{10:$Vq1,59:229},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:230,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:231,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:232,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:233,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:234,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:235,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:236,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:237,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:238,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:239,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:240,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:241,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:242,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:243,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:244,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},o($Vr1,[2,74],{93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($V11,[2,88]),{37:[1,245],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:217,86:$Vy,96:$Vz,101:246,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:217,86:$Vy,96:$Vz,101:247,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:248,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:249,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:250,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:251,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:252,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:253,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:254,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:255,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:256,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:257,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:258,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:259,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:260,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:261,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:262,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:263,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:264,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:265,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:266,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:267,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:268,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:269,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:270,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vq1,59:271},{10:[1,272]},{9:274,10:[1,273],35:$V0,38:$V1,39:$V2,41:$V3,43:$V4,45:$V5,48:$V6,49:$V7,50:$V8,53:$V9,56:$Va,57:$Vb,60:$Vc,61:$Vd,63:$Ve,65:$Vf,67:$Vg,68:47,69:$Vh,70:$Vi,73:$Vj,74:$Vk,79:$Vl,80:$Vm,81:$Vn,82:$Vo,83:$Vp},{10:$VW,12:$VX,45:$VY,129:275,130:118,131:119},{10:$VW,12:$VX,45:$VY,64:276,129:116,130:118,131:119},o($Vl1,[2,153]),{45:$VZ,128:277},{45:$VZ,66:278,128:124},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:217,86:$Vy,96:$Vz,101:279,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:217,86:$Vy,96:$Vz,101:280,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{5:[2,54],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},o($Vp1,[2,128]),{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:217,86:$Vy,96:$Vz,101:281,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:217,86:$Vy,96:$Vz,101:282,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{5:[2,56],52:$Vm1},{71:[1,283],72:[1,284]},{5:[2,60],10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:285,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},o($Vs1,[2,144]),o($Vs1,[2,145]),{5:[2,64],78:[1,286]},{52:$Vt1,102:[1,287]},o($Vu1,[2,135],{84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),{37:[1,289],52:$Vt1},{5:[2,32]},o($V01,[2,121]),{52:$Vv1,102:[1,290]},o($Vw1,[2,133]),{37:[1,292],52:$Vv1},o($V01,[2,132]),{37:[1,293]},{52:[1,294]},{52:[1,295]},{54:[1,296],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{5:[2,45],52:$Vv1},o([5,37,52,54,55,57,58,62,78,84,102],[2,72],{85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o([5,37,52,54,55,57,58,62,78,84,85,102],[2,73],{87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vr1,[2,75],{93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vr1,[2,76],{93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vr1,[2,77],{93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vr1,[2,78],{93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vr1,[2,79],{93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vr1,[2,80],{93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vx1,[2,81],{95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vx1,[2,82],{95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vy1,[2,83],{97:$Vg1,98:$Vh1,99:$Vi1}),o($Vy1,[2,84],{97:$Vg1,98:$Vh1,99:$Vi1}),o($Vz1,[2,85],{99:$Vi1}),o($Vz1,[2,86],{99:$Vi1}),o($V11,[2,87]),o($V11,[2,89]),{52:$Vt1,102:[1,297]},{37:[1,298],52:$Vt1},{37:[1,299],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,300],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,301],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,302],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,303],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,304],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,305],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,306],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,307],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,308],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,309],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,310],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,311],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,312],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,313],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,314],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,315],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,316],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{52:[1,317],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{52:[1,318],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{52:[1,319],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{52:[1,320],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,321],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{5:[2,47],52:$Vv1},{5:[2,48]},{5:[2,49]},{5:[2,50]},o($Vl1,[2,147]),{37:[1,322],52:$Vk1},o($V01,[2,138]),{5:[2,53],52:$Vm1},{52:$Vt1,102:[1,323]},{37:[1,324],52:$Vt1},{52:$Vt1,102:[1,325]},{37:[1,326],52:$Vt1},{5:[2,57]},{5:[2,58]},o($Vo1,[2,143],{84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),{45:$VZ,66:327,128:124},{46:[1,328]},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:329,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{46:[1,330]},o($V01,[2,123]),{10:[1,331]},o($V01,[2,124]),{46:[1,332]},{45:[1,333]},{45:[1,334]},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:335,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},o($V11,$VA1),o($V11,$VB1),o($V11,[2,93]),o($V11,[2,94]),o($V11,[2,95]),o($V11,[2,96]),o($V11,[2,97]),o($V11,[2,98]),o($V11,[2,99]),o($V11,[2,100]),o($V11,[2,101]),o($V11,[2,102]),o($V11,[2,103]),o($V11,[2,104]),o($V11,[2,105]),o($V11,[2,106]),o($V11,[2,107]),o($V11,[2,108]),o($V11,[2,109]),o($V11,[2,110]),{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:336,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:337,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:338,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:339,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},o($V11,[2,115]),o($Vl1,[2,151]),o($V01,[2,140]),o($V01,[2,141]),o($Vn1,$VA1,{46:[1,340]}),o($Vn1,$VB1,{46:[1,341]}),{5:[2,63],52:$Vm1},o($Vp1,[2,126]),o($Vu1,[2,136],{84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1}),o($Vp1,[2,127]),o($Vw1,[2,134]),{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:342,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{52:[1,343]},{5:[2,40]},{5:[2,42],55:[1,344],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,345],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{52:[1,346],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,347],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{52:[1,348],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},o($Vp1,[2,129]),o($Vp1,[2,130]),{5:[2,36],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{45:[1,349]},{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:350,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},o($V11,[2,111]),{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:351,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},o($V11,[2,113]),{10:$Vs,12:$Vt,36:$Vv,44:$Vw,45:$Vx,47:352,86:$Vy,96:$Vz,103:$VA,104:$VB,105:$VC,106:$VD,107:$VE,108:$VF,109:$VG,110:$VH,111:$VI,112:$VJ,113:$VK,114:$VL,115:$VM,116:$VN,117:$VO,118:$VP,119:$VQ,120:$VR,121:$VS,122:$VT,123:$VU,124:$VV,125:111,126:$Vu},{5:[2,39]},{5:[2,41],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,353],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},{37:[1,354],84:$V41,85:$V51,87:$V61,88:$V71,89:$V81,90:$V91,91:$Va1,92:$Vb1,93:$Vc1,94:$Vd1,95:$Ve1,96:$Vf1,97:$Vg1,98:$Vh1,99:$Vi1},o($V11,[2,112]),o($V11,[2,114])],
defaultActions: {5:[2,9],7:[2,11],8:[2,12],9:[2,13],10:[2,14],11:[2,15],12:[2,16],13:[2,17],14:[2,18],15:[2,19],16:[2,20],18:[2,22],19:[2,23],20:[2,24],21:[2,25],22:[2,26],23:[2,27],24:[2,28],25:[2,29],26:[2,30],27:[2,31],30:[2,6],37:[2,38],51:[2,65],54:[2,69],55:[2,70],56:[2,71],59:[2,2],62:[2,8],63:[2,10],64:[2,7],67:[2,33],131:[2,59],136:[2,68],140:[2,1],151:[2,43],219:[2,32],272:[2,48],273:[2,49],274:[2,50],283:[2,57],284:[2,58],334:[2,40],349:[2,39]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};


    katra = require('./katra');
    command = katra.command;
    keyword = katra.keyword;
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 5;
break;
case 1:/* skip whitespace */;
break;
case 2:return 97;
break;
case 3:return 98;
break;
case 4:return 96;
break;
case 5:return 95;
break;
case 6:return 99;
break;
case 7:return 87;
break;
case 8:return 46;
break;
case 9:return 88;
break;
case 10:return 92;
break;
case 11:return 90;
break;
case 12:return 91;
break;
case 13:return 89;
break;
case 14:return 93;
break;
case 15:return 94;
break;
case 16:return 85;
break;
case 17:return 84;
break;
case 18:return 86;
break;
case 19:return 36;
break;
case 20:return 37;
break;
case 21:return 100;
break;
case 22:return 102;
break;
case 23:return 52;
break;
case 24:return ':';
break;
case 25:return 78;
break;
case 26:return 15;
break;
case 27:return 16;
break;
case 28:return 17;
break;
case 29:return 11;
break;
case 30:return 18;
break;
case 31:return 19;
break;
case 32:return 20;
break;
case 33:return 21;
break;
case 34:return 22;
break;
case 35:return 23;
break;
case 36:return 24;
break;
case 37:return 14;
break;
case 38:return 25;
break;
case 39:return 26;
break;
case 40:return 27
break;
case 41:return 28;
break;
case 42:return 29;
break;
case 43:return 31;
break;
case 44:return 32;
break;
case 45:return 33;
break;
case 46:return 34;
break;
case 47:return 103;
break;
case 48:return 104;
break;
case 49:return 105;
break;
case 50:return 106;
break;
case 51:return 107;
break;
case 52:return 108;
break;
case 53:return 109;
break;
case 54:return 110;
break;
case 55:return 111;
break;
case 56:return 112;
break;
case 57:return 113;
break;
case 58:return 115;
break;
case 59:return 116;
break;
case 60:return 117;
break;
case 61:return 118;
break;
case 62:return 119;
break;
case 63:return 120;
break;
case 64:return 121;
break;
case 65:return 122;
break;
case 66:return 123;
break;
case 67:return 124;
break;
case 68:return 13;
break;
case 69:return 38;
break;
case 70:return 72;
break;
case 71:return 39;
break;
case 72:return 35;
break;
case 73:return 41;
break;
case 74:return 43;
break;
case 75:return 48;
break;
case 76:return 49;
break;
case 77:return 50;
break;
case 78:return 53;
break;
case 79:return 60;
break;
case 80:return 57;
break;
case 81:return 56;
break;
case 82:return 61;
break;
case 83:return 63;
break;
case 84:return 65;
break;
case 85:return 67;
break;
case 86:return 69
break;
case 87:return 73;
break;
case 88:return 'OFF';
break;
case 89:return 58;
break;
case 90:return 'ON';
break;
case 91:return 74;
break;
case 92:return 30;
break;
case 93:return 79;
break;
case 94:return 82;
break;
case 95:return 70;
break;
case 96:return 80;
break;
case 97:return 81
break;
case 98:return 55;
break;
case 99:return 83;
break;
case 100:return 62;
break;
case 101:return 54;
break;
case 102:return 77;
break;
case 103:return 71;
break;
case 104:return 126;
break;
case 105:return 10;
break;
case 106:return 12;
break;
case 107:return 44;
break;
case 108:return 45;
break;
case 109:return 51;
break;
case 110:return 6;
break;
case 111:return 'INVALID';
break;
}
},
rules: [/^(?:\n)/,/^(?:[\t ]+)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\^)/,/^(?:==)/,/^(?:=)/,/^(?:<>)/,/^(?:<=)/,/^(?:>=)/,/^(?:<)/,/^(?:>)/,/^(?:([Mm][Aa][Xx]))/,/^(?:([Mm][Ii][Nn]))/,/^(?:([Aa][Nn][Dd]))/,/^(?:([Oo][Rr]))/,/^(?:([Nn][Oo][Tt]))/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:;)/,/^(?:([Tt][Rr][Oo][Nn]))/,/^(?:([Tt][Rr][Oo][Ff][Ff]))/,/^(?:([Aa][Pp][Pp][Ee]?[Nn]?[Dd]?[\-]([\$\*\@\!\#]?[A-Za-z][A-Za-z0-9]+)))/,/^(?:([Aa][Tt][Aa][Rr][Ii]))/,/^(?:([Cc][Aa][Tt][Aa]?[Ll]?[Oo]?[Gg]?))/,/^(?:([Dd][Ee][Ll][Ee]?[Tt]?[Ee]?([\-]([0-9,]+))?))/,/^(?:([Dd][Ii][Rr]))/,/^(?:([Ee][Xx][Ee][Cc]?[Uu]?[Tt]?[Ee]?[\-]([\$\*\@\!\#]?[A-Za-z][A-Za-z0-9]+)))/,/^(?:([Ff][Ii][Ll][Ee][Ss]))/,/^(?:([Gg][Ee][Tt][\-]([\$\*\@\!\#]?[A-Za-z][A-Za-z0-9]+)))/,/^(?:([Gg][Rr][Oo][Uu]?[Pp]?))/,/^(?:([Gg][Ww][Bb]?[Aa]?[Ss]?[Ii]?[Cc]?))/,/^(?:([Ll][Ii][Bb][Rr]?[Aa]?[Rr]?[Yy]?))/,/^(?:([Ll][Ii][Ss][Tt]?([\-]([0-9,]+))?))/,/^(?:([Nn][Aa][Mm][Ee]?[\-]([\$\*\@\!\#]?[A-Za-z][A-Za-z0-9]+)))/,/^(?:([Pp][Uu][Rr][Gg]?[Ee]?[\-]([\$\*\@\!\#]?[A-Za-z][A-Za-z0-9]+)))/,/^(?:([Rr][Ee][Nn][Uu]?[Mm]?[Bb]?[Ee]?[Rr]?([\-]([0-9,]+))?))/,/^(?:([Rr][Uu][Nn]([\-]([0-9])+)?))/,/^(?:([Ss][Aa][Vv][Ee]?))/,/^(?:([Ss][Cc][Rr][Aa]?[Tt]?[Cc]?[Hh]?))/,/^(?:([Tt][Ee][Ss][Tt]?))/,/^(?:([Aa][Bb][Ss]))/,/^(?:([Aa][Tt][Nn]))/,/^(?:([Cc][Oo][Ss]))/,/^(?:([Ee][Xx][Pp]))/,/^(?:([Ii][Nn][Tt]))/,/^(?:([Ll][Ee][Nn]))/,/^(?:([Ll][Ii][Nn]))/,/^(?:([Ll][Oo][Gg]))/,/^(?:([Rr][Nn][Dd]))/,/^(?:([Ss][Gg][Nn]))/,/^(?:([Ss][Ii][Nn]))/,/^(?:([Ss][Qq][Rr]))/,/^(?:([Tt][Aa][Bb]))/,/^(?:([Tt][Aa][Nn]))/,/^(?:([Tt][Ii][Mm]))/,/^(?:([Ll][Cc][Aa][Ss][Ee][\$]))/,/^(?:([Ll][Ee][Ff][Tt][\$]))/,/^(?:([Mm][Ii][Dd][\$]))/,/^(?:([Rr][Ii][Gg][Hh][Tt][\$]))/,/^(?:([Ss][Uu][Bb][Ss][Tt][Rr]))/,/^(?:([Uu][Cc][Aa][Ss][Ee][\$]))/,/^(?:([Cc][Ll][Ss]))/,/^(?:([Cc][Hh][Aa][Ii][Nn]))/,/^(?:([Cc][Oo][Nn]))/,/^(?:([Cc][Oo][Mm]))/,/^(?:([Bb][Aa][Ss][Ee]))/,/^(?:([Dd][Aa][Tt][Aa]))/,/^(?:([Dd][Ee][Ff]))/,/^(?:([Dd][Ii][Mm]))/,/^(?:([Ee][Nn][Dd]))/,/^(?:([Ee][Nn][Tt][Ee][Rr]))/,/^(?:([Ff][Oo][Rr]))/,/^(?:([Gg][Oo][Ss][Uu][Bb]))/,/^(?:([Gg][Oo][Tt][Oo]))/,/^(?:([Gg][Oo]))/,/^(?:([Ii][Ff]))/,/^(?:([Ii][Mm][Aa][Gg][Ee]))/,/^(?:([Ii][Nn][Pp][Uu][Tt]))/,/^(?:([Ll][Ee][Tt]))/,/^(?:([Mm][Aa][Tt]))/,/^(?:([Nn][Ee][Xx][Tt]))/,/^(?:{OFF})/,/^(?:([Oo][Ff]))/,/^(?:{ON})/,/^(?:([Pp][Rr][Ii][Nn][Tt]))/,/^(?:([Qq][Uu][Ii][Tt]))/,/^(?:([Rr][Aa][Nn][Dd][Oo][Mm][Ii][Zz][Ee]))/,/^(?:([Rr][Ee][Mm]).*)/,/^(?:([Rr][Ee][Aa][Dd]))/,/^(?:([Rr][Ee][Ss][Tt][Oo][Rr][Ee]))/,/^(?:([Rr][Ee][Tt][Uu][Rr][Nn]))/,/^(?:([Ss][Tt][Ee][Pp]))/,/^(?:([Ss][Tt][Oo][Pp]))/,/^(?:([Tt][Hh][Ee][Nn]))/,/^(?:([Tt][Oo]))/,/^(?:([Uu][Ss][Ii][Nn][Gg]))/,/^(?:([Zz][Ee][Rr]))/,/^(?:(([0-9])*\.([0-9])+([eE][-+]?[0-9]+)?))/,/^(?:(([0-9])+))/,/^(?:("[^"]*"))/,/^(?:([Ff][Nn]([A-Za-z])))/,/^(?:((([A-Za-z])([A-Za-z0-9])?)[$%]?))/,/^(?:([\#]([A-Za-z])))/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this,require('_process'))
},{"./katra":3,"_process":10,"fs":8,"path":9}],5:[function(require,module,exports){
(function (process,__dirname){
// Generated by CoffeeScript 1.7.1
var Console, FileSystem, MODE_REPL, MODE_RUN, rte,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MODE_REPL = 0;

MODE_RUN = 1;

module.exports = rte = typeof window !== "undefined" && window !== null ? {
  Console: Console = (function() {
    require('./katra.console');

    Console.prototype.autofocus = true;

    Console.prototype.prompt = '>';

    Console.prototype.promptAlt = '?';

    Console.prototype.history = true;

    Console.prototype.title = '';

    Console.prototype.mode = MODE_REPL;

    Console.prototype.element = '';

    Console.prototype.console = null;

    Console.prototype.buffer = null;

    Console.prototype.vars = null;

    function Console(element, prompt) {
      this.element = element != null ? element : '.console';
      this.prompt = prompt != null ? prompt : '>';
      this.clear();
    }

    Console.prototype.commandValidate = function($line) {
      if ($line === "") {
        return false;
      } else {
        return true;
      }
    };

    Console.prototype.input = function($prompt, $vars) {
      if ($prompt != null) {
        this.print($prompt);
      }
      this.buffer = [];
      this.vars = $vars;
      return true;
    };

    Console.prototype.pause = function($set) {};

    Console.prototype.setPrompt = function($prompt) {
      return this.console.setPrompt($prompt);
    };

    Console.prototype.setMode = function($mode) {
      return this.mode = $mode;
    };

    Console.prototype.debug = function($text) {
      return this.console.debug($text);
    };

    Console.prototype.hilite = function($text) {
      return this.console.hilite($text);
    };

    Console.prototype.print = function($text) {
      return this.console.print($text);
    };

    Console.prototype.println = function($text) {
      return this.console.println($text);
    };

    Console.prototype.clear = function() {
      this.console = $(this.element).console(this);
      return this.console.clear();
    };

    return Console;

  })(),
  FileSystem: FileSystem = (function() {
    var $root, _data, _get, _set_title;

    function FileSystem() {}

    $root = '/';

    _get = function($name, $next) {
      if (localStorage[$name] != null) {
        return $next(localStorage[$name]);
      } else {
        return $next('');
      }
    };

    _set_title = function($filename) {
      var $name;
      $name = $filename.split('/').pop();
      if (/\[.*\]$/.test(document.title)) {
        return document.title.replace(/\[(.*)\]$/, $name);
      } else {
        return document.title += " - [" + $name + "]";
      }
    };

    FileSystem.prototype.setRoot = function($path) {
      return $root = $path;
    };

    FileSystem.prototype.readFile = function($filename, $next) {
      if (localStorage[$filename] != null) {
        return _get($filename, function($data) {
          _set_title($filename);
          return $next(null, String($data));
        });
      } else {
        return $.get($root + $filename + '.bas', function($data) {
          _set_title($filename);
          return $next(null, String($data));
        });
      }
    };

    FileSystem.prototype.writeFile = function($filename, $data, $next) {
      localStorage[$filename] = $data;
      return $next(null);
    };

    FileSystem.prototype.deleteFile = function($filename, $next) {
      delete localStorage[$filename];
      return $next(null);
    };

    FileSystem.prototype.readDir = function($dir, $next) {
      var $name, $path, $value;
      return $next(((function() {
        var _ref, _results;
        _ref = _data[$dir];
        _results = [];
        for ($name in _ref) {
          $path = _ref[$name];
          _results.push($name + '.bas');
        }
        return _results;
      })()).concat($dir === 'CATALOG' ? (function() {
        var _results;
        _results = [];
        for ($name in localStorage) {
          $value = localStorage[$name];
          _results.push($name.split('/').pop() + '.bas');
        }
        return _results;
      })() : []));
    };

    _data = {
      ATARI: {
        SRTRK: 'bas/atari/SRTRK.bas',
        WUMPUS: 'bas/atari/WUMPUS.bas'
      },
      GWBASIC: {
        eliza: 'bas/gwbasic/eliza.bas',
        romulan: 'bas/gwbasic/romulan.bas'
      },
      GROUP: {
        TREK0: 'bas/hp2k/group/TREK0.bas',
        TREK1: 'bas/hp2k/group/TREK1.bas',
        TREK2: 'bas/hp2k/group/TREK2.bas',
        TREK3: 'bas/hp2k/group/TREK3.bas',
        TREK4: 'bas/hp2k/group/TREK4.bas',
        TREK73: 'bas/hp2k/group/TREK73.bas'
      },
      LIBRARY: {
        TRADER: 'bas/hp2k/system/TRADER.bas',
        TRADES: 'bas/hp2k/system/TRADES.bas'
      },
      TEST: {
        data: 'bas/hp2k/test/data.bas',
        def: 'bas/hp2k/test/def.bas',
        dim: 'bas/hp2k/test/dim.bas',
        "for": 'bas/hp2k/test/for.bas',
        gosub: 'bas/hp2k/test/gosub.bas',
        "if": 'bas/hp2k/test/if.bas',
        input: 'bas/hp2k/test/input.bas',
        "let": 'bas/hp2k/test/let.bas',
        numbers: 'bas/hp2k/test/numbers.bas',
        print: 'bas/hp2k/test/print.bas',
        test: 'bas/hp2k/test/test.bas',
        unary: 'bas/hp2k/test/unary.bas'
      },
      CATALOG: {
        OREGON: 'bas/hp2k/OREGON.bas',
        STRTR1: 'bas/hp2k/STRTR1.bas',
        STTR1: 'bas/hp2k/STTR1.bas'
      }
    };

    return FileSystem;

  })()
} : {
  Console: Console = (function() {
    var colors;

    colors = require('colors');

    Console.prototype.buffer = null;

    Console.prototype.vars = null;

    Console.prototype.paused = false;

    Console.prototype.prompt = '';

    Console.prototype.altPrompt = '?';

    function Console(prompt) {
      var stdin;
      this.prompt = prompt != null ? prompt : 'katra> ';
      this.pause = __bind(this.pause, this);
      this.listener = __bind(this.listener, this);
      stdin = process.openStdin();
      process.stdout.write(this.prompt);
      stdin.addListener("data", this.listener);
    }

    Console.prototype.listener = function($data) {
      this.commandHandle($data.toString());
      if (this.mode === MODE_REPL) {
        if (!this.paused) {
          return process.stdout.write(this.prompt);
        }
      } else {
        return process.stdout.write(this.altPrompt);
      }
    };

    Console.prototype.setPrompt = function($prompt) {};

    Console.prototype.pause = function($set) {
      if (this.paused === $set) {
        return;
      }
      if ((this.paused = $set)) {
        return process.stdin.removeListener("data", this.listener);
      } else {
        process.stdin.addListener("data", this.listener);
        if (this.mode === MODE_REPL) {
          return process.stdout.write(this.prompt);
        } else {
          return process.stdout.write(this.altPrompt);
        }
      }
    };

    Console.prototype.input = function($prompt, $vars) {
      if (this.paused) {
        this.pause(false);
      }
      if ($prompt != null) {
        this.print($prompt);
      }
      this.buffer = [];
      this.vars = $vars;
      return true;
    };

    Console.prototype.debug = function($text) {
      return process.stdout.write($text.blue + '\n');
    };

    Console.prototype.hilite = function($text) {
      return process.stdout.write($text.yellow + '\n');
    };

    Console.prototype.print = function($text) {
      if ($text == null) {
        $text = '';
      }
      return process.stdout.write($text);
    };

    Console.prototype.println = function($text) {
      if ($text == null) {
        $text = '';
      }
      return process.stdout.write($text + '\n');
    };

    Console.prototype.clear = function() {};

    return Console;

  })(),
  FileSystem: FileSystem = (function() {
    var $root, fs, path, _data;

    function FileSystem() {}

    fs = require('fs');

    path = require('path');

    $root = __dirname.slice(0, +__dirname.lastIndexOf('/') + 1 || 9e9);

    FileSystem.prototype.setRoot = function($path) {
      return $root = $path;
    };

    FileSystem.prototype.readFile = function($filename, $next) {
      return fs.readFile(path.join($root, $filename) + '.bas', function($err, $data) {
        if ($err != null) {
          return $next($err);
        } else {
          return $next(null, String($data));
        }
      });
    };

    FileSystem.prototype.writeFile = function($filename, $data, $next) {
      return fs.writeFile(path.join($root, $filename) + '.bas', "" + $filename + "\n\n" + $data, $next);
    };

    FileSystem.prototype.deleteFile = function($filename, $next) {
      return fs.unlink(path.join($root, $filename) + '.bas', $next);
    };

    FileSystem.prototype.readDir = function($dir, $next) {
      return fs.readdir($root + _data[$dir], function($err, $files) {
        var $name;
        if ($err != null) {
          return $next([]);
        } else {
          return $next((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = $files.length; _i < _len; _i++) {
              $name = $files[_i];
              if (/.*\.bas$/.test($name)) {
                _results.push($name);
              }
            }
            return _results;
          })());
        }
      });
    };

    _data = {
      ATARI: 'bas/atari/',
      GWBASIC: 'bas/gwbasic/',
      GROUP: 'bas/hp2k/group/',
      LIBRARY: 'bas/hp2k/system/',
      TEST: 'bas/hp2k/test/',
      CATALOG: 'bas/hp2k/'
    };

    return FileSystem;

  })()
};

}).call(this,require('_process'),"/tmp")
},{"./katra.console":2,"_process":10,"colors":1,"fs":8,"path":9}],6:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
$(function() {
  var args, katra, parseQuery, setSize, _ref;
  katra = require('./katra');
  args = void 0;
  parseQuery = function() {
    var i, pair, pairs, result;
    if (typeof d16a !== "undefined" && d16a !== null) {
      return d16a.args;
    } else {
      result = {};
      pairs = window.location.search.substring(1).split("&");
      for (i in pairs) {
        if (pairs[i].length > 0) {
          pair = pairs[i].split("=");
          result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
      }
      return result;
    }
  };
  setSize = function() {
    $("div.console div.jquery-console-inner").offset({
      top: 0,
      left: 0
    });
    $("div.console div.jquery-console-inner").width($(this).width() - 12);
    return $("div.console div.jquery-console-inner").height($(this).height() - 12);
  };
  $(window).resize(function() {
    if (this.resizeTO) {
      clearTimeout(this.resizeTO);
    }
    return this.resizeTO = setTimeout(function() {
      return $(this).trigger("resizeEnd");
    }, 500);
  });
  $(window).bind("resizeEnd", setSize);
  args = parseQuery();
  console.log(args);
  katra.setRoot((_ref = args.root) != null ? _ref : "/katra/");
  if (Object.keys(args).length === 0) {
    args = {
      title: "Katra BASIC"
    };
    document.title = args.title;
  }
  katra.main(args);
  return setSize();
});

},{"./katra":3}],7:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
var PRINTF, util;

PRINTF = /(\%)([-])?([+])?([0])?(\d*)?(\.\d*)?([\%ds])/g;

module.exports = util = {
  clean: function($code) {
    if ($code.charCodeAt(0) === 0xfeff) {
      $code = $code.slice(1);
    }
    return $code = ($code + '\n').replace(/\r/g, '\n').replace(/\n+/g, '\n');
  },
  flatten: function($list) {
    var $a, $item, _i, _len;
    if ($list == null) {
      return [];
    }
    $a = [];
    for (_i = 0, _len = $list.length; _i < _len; _i++) {
      $item = $list[_i];
      if (Array.isArray($item)) {
        $a = $a.concat(util.flatten($item));
      } else {
        $a.push($item);
      }
    }
    return $a;
  },
  sprintf: function($fmt, $list) {
    var $count, foreach;
    $count = 0;
    foreach = function($match, $pct, $just, $sign, $pad, $width, $prec, $spec, $ofset, $string) {
      var $value;
      if ($pad == null) {
        $pad = ' ';
      }
      $value = String($list[$count++]);
      switch ($spec) {
        case '%':
          return '%';
        case 's':
          if ($width != null) {
            $width = parseInt($width, 10);
            if ($value.length < $width) {
              if ($just != null) {
                return Array($width - $value.length + 1).join($pad) + $value;
              } else {
                return $value + Array($width - $value.length + 1).join($pad);
              }
            }
          }
          return $value;
        case 'd':
          if ($width != null) {
            $width = parseInt($width, 10);
            if ($value.length < $width) {
              if ($just != null) {
                return $value + Array($width - $value.length + 1).join($pad);
              } else {
                return Array($width - $value.length + 1).join($pad) + $value;
              }
            }
          }
          return $value;
      }
    };
    return $fmt.replace(PRINTF, foreach);
  },
  pad: function($value, $len, $pad) {
    var $right;
    if ($pad == null) {
      $pad = ' ';
    }
    $right = !isNaN($value);
    $value = String($value);
    if ($right) {
      if ($value.length < $len) {
        return Array($len - $value.length + 1, $pad) + $value;
      } else {
        return $value.substr(0, $len);
      }
    } else {
      if ($value.length < $len) {
        return $value + Array($len - $value.length + 1, $pad);
      } else {
        return $value.substr(0, $len);
      }
    }
  }
};

},{}],8:[function(require,module,exports){

},{}],9:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":10}],10:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[6])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9icnVjZS9HaXQvcmV0cm8tdHJlay9ub2RlX21vZHVsZXMvY29sb3JzL2NvbG9ycy5qcyIsIi9ob21lL2JydWNlL0dpdC9yZXRyby10cmVrL3RtcC9rYXRyYS5jb25zb2xlLmpzIiwiL2hvbWUvYnJ1Y2UvR2l0L3JldHJvLXRyZWsvdG1wL2thdHJhLmpzIiwiL2hvbWUvYnJ1Y2UvR2l0L3JldHJvLXRyZWsvdG1wL2tjLmpzIiwiL2hvbWUvYnJ1Y2UvR2l0L3JldHJvLXRyZWsvdG1wL3J0ZS5qcyIsIi9ob21lL2JydWNlL0dpdC9yZXRyby10cmVrL3RtcC9ydW4ta2F0cmEuanMiLCIvaG9tZS9icnVjZS9HaXQvcmV0cm8tdHJlay90bXAvdXRpbC5qcyIsIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2xpYi9fZW1wdHkuanMiLCIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwiL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzd5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4cUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuY29sb3JzLmpzXG5cbkNvcHlyaWdodCAoYykgMjAxMFxuXG5NYXJhayBTcXVpcmVzXG5BbGV4aXMgU2VsbGllciAoY2xvdWRoZWFkKVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG5cbiovXG5cbnZhciBpc0hlYWRsZXNzID0gZmFsc2U7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICBpc0hlYWRsZXNzID0gdHJ1ZTtcbn1cblxuaWYgKCFpc0hlYWRsZXNzKSB7XG4gIHZhciBleHBvcnRzID0ge307XG4gIHZhciBtb2R1bGUgPSB7fTtcbiAgdmFyIGNvbG9ycyA9IGV4cG9ydHM7XG4gIGV4cG9ydHMubW9kZSA9IFwiYnJvd3NlclwiO1xufSBlbHNlIHtcbiAgZXhwb3J0cy5tb2RlID0gXCJjb25zb2xlXCI7XG59XG5cbi8vXG4vLyBQcm90b3R5cGVzIHRoZSBzdHJpbmcgb2JqZWN0IHRvIGhhdmUgYWRkaXRpb25hbCBtZXRob2QgY2FsbHMgdGhhdCBhZGQgdGVybWluYWwgY29sb3JzXG4vL1xudmFyIGFkZFByb3BlcnR5ID0gZnVuY3Rpb24gKGNvbG9yLCBmdW5jKSB7XG4gIGV4cG9ydHNbY29sb3JdID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHN0cik7XG4gIH07XG4gIFN0cmluZy5wcm90b3R5cGUuX19kZWZpbmVHZXR0ZXJfXyhjb2xvciwgZnVuYyk7XG59O1xuXG5mdW5jdGlvbiBzdHlsaXplKHN0ciwgc3R5bGUpIHtcblxuICB2YXIgc3R5bGVzO1xuXG4gIGlmIChleHBvcnRzLm1vZGUgPT09ICdjb25zb2xlJykge1xuICAgIHN0eWxlcyA9IHtcbiAgICAgIC8vc3R5bGVzXG4gICAgICAnYm9sZCcgICAgICA6IFsnXFx4MUJbMW0nLCAgJ1xceDFCWzIybSddLFxuICAgICAgJ2l0YWxpYycgICAgOiBbJ1xceDFCWzNtJywgICdcXHgxQlsyM20nXSxcbiAgICAgICd1bmRlcmxpbmUnIDogWydcXHgxQls0bScsICAnXFx4MUJbMjRtJ10sXG4gICAgICAnaW52ZXJzZScgICA6IFsnXFx4MUJbN20nLCAgJ1xceDFCWzI3bSddLFxuICAgICAgJ3N0cmlrZXRocm91Z2gnIDogWydcXHgxQls5bScsICAnXFx4MUJbMjltJ10sXG4gICAgICAvL3RleHQgY29sb3JzXG4gICAgICAvL2dyYXlzY2FsZVxuICAgICAgJ3doaXRlJyAgICAgOiBbJ1xceDFCWzM3bScsICdcXHgxQlszOW0nXSxcbiAgICAgICdncmV5JyAgICAgIDogWydcXHgxQls5MG0nLCAnXFx4MUJbMzltJ10sXG4gICAgICAnYmxhY2snICAgICA6IFsnXFx4MUJbMzBtJywgJ1xceDFCWzM5bSddLFxuICAgICAgLy9jb2xvcnNcbiAgICAgICdibHVlJyAgICAgIDogWydcXHgxQlszNG0nLCAnXFx4MUJbMzltJ10sXG4gICAgICAnY3lhbicgICAgICA6IFsnXFx4MUJbMzZtJywgJ1xceDFCWzM5bSddLFxuICAgICAgJ2dyZWVuJyAgICAgOiBbJ1xceDFCWzMybScsICdcXHgxQlszOW0nXSxcbiAgICAgICdtYWdlbnRhJyAgIDogWydcXHgxQlszNW0nLCAnXFx4MUJbMzltJ10sXG4gICAgICAncmVkJyAgICAgICA6IFsnXFx4MUJbMzFtJywgJ1xceDFCWzM5bSddLFxuICAgICAgJ3llbGxvdycgICAgOiBbJ1xceDFCWzMzbScsICdcXHgxQlszOW0nXSxcbiAgICAgIC8vYmFja2dyb3VuZCBjb2xvcnNcbiAgICAgIC8vZ3JheXNjYWxlXG4gICAgICAnd2hpdGVCRycgICAgIDogWydcXHgxQls0N20nLCAnXFx4MUJbNDltJ10sXG4gICAgICAnZ3JleUJHJyAgICAgIDogWydcXHgxQls0OTs1OzhtJywgJ1xceDFCWzQ5bSddLFxuICAgICAgJ2JsYWNrQkcnICAgICA6IFsnXFx4MUJbNDBtJywgJ1xceDFCWzQ5bSddLFxuICAgICAgLy9jb2xvcnNcbiAgICAgICdibHVlQkcnICAgICAgOiBbJ1xceDFCWzQ0bScsICdcXHgxQls0OW0nXSxcbiAgICAgICdjeWFuQkcnICAgICAgOiBbJ1xceDFCWzQ2bScsICdcXHgxQls0OW0nXSxcbiAgICAgICdncmVlbkJHJyAgICAgOiBbJ1xceDFCWzQybScsICdcXHgxQls0OW0nXSxcbiAgICAgICdtYWdlbnRhQkcnICAgOiBbJ1xceDFCWzQ1bScsICdcXHgxQls0OW0nXSxcbiAgICAgICdyZWRCRycgICAgICAgOiBbJ1xceDFCWzQxbScsICdcXHgxQls0OW0nXSxcbiAgICAgICd5ZWxsb3dCRycgICAgOiBbJ1xceDFCWzQzbScsICdcXHgxQls0OW0nXVxuICAgIH07XG4gIH0gZWxzZSBpZiAoZXhwb3J0cy5tb2RlID09PSAnYnJvd3NlcicpIHtcbiAgICBzdHlsZXMgPSB7XG4gICAgICAvL3N0eWxlc1xuICAgICAgJ2JvbGQnICAgICAgOiBbJzxiPicsICAnPC9iPiddLFxuICAgICAgJ2l0YWxpYycgICAgOiBbJzxpPicsICAnPC9pPiddLFxuICAgICAgJ3VuZGVybGluZScgOiBbJzx1PicsICAnPC91PiddLFxuICAgICAgJ2ludmVyc2UnICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpibGFjaztjb2xvcjp3aGl0ZTtcIj4nLCAgJzwvc3Bhbj4nXSxcbiAgICAgICdzdHJpa2V0aHJvdWdoJyA6IFsnPGRlbD4nLCAgJzwvZGVsPiddLFxuICAgICAgLy90ZXh0IGNvbG9yc1xuICAgICAgLy9ncmF5c2NhbGVcbiAgICAgICd3aGl0ZScgICAgIDogWyc8c3BhbiBzdHlsZT1cImNvbG9yOndoaXRlO1wiPicsICAgJzwvc3Bhbj4nXSxcbiAgICAgICdncmV5JyAgICAgIDogWyc8c3BhbiBzdHlsZT1cImNvbG9yOmdyYXk7XCI+JywgICAgJzwvc3Bhbj4nXSxcbiAgICAgICdibGFjaycgICAgIDogWyc8c3BhbiBzdHlsZT1cImNvbG9yOmJsYWNrO1wiPicsICAgJzwvc3Bhbj4nXSxcbiAgICAgIC8vY29sb3JzXG4gICAgICAnYmx1ZScgICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpibHVlO1wiPicsICAgICc8L3NwYW4+J10sXG4gICAgICAnY3lhbicgICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpjeWFuO1wiPicsICAgICc8L3NwYW4+J10sXG4gICAgICAnZ3JlZW4nICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpncmVlbjtcIj4nLCAgICc8L3NwYW4+J10sXG4gICAgICAnbWFnZW50YScgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjptYWdlbnRhO1wiPicsICc8L3NwYW4+J10sXG4gICAgICAncmVkJyAgICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpyZWQ7XCI+JywgICAgICc8L3NwYW4+J10sXG4gICAgICAneWVsbG93JyAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjp5ZWxsb3c7XCI+JywgICc8L3NwYW4+J10sXG4gICAgICAvL2JhY2tncm91bmQgY29sb3JzXG4gICAgICAvL2dyYXlzY2FsZVxuICAgICAgJ3doaXRlQkcnICAgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1wiPicsICAgJzwvc3Bhbj4nXSxcbiAgICAgICdncmV5QkcnICAgICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpncmF5O1wiPicsICAgICc8L3NwYW4+J10sXG4gICAgICAnYmxhY2tCRycgICAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6YmxhY2s7XCI+JywgICAnPC9zcGFuPiddLFxuICAgICAgLy9jb2xvcnNcbiAgICAgICdibHVlQkcnICAgICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpibHVlO1wiPicsICAgICc8L3NwYW4+J10sXG4gICAgICAnY3lhbkJHJyAgICAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Y3lhbjtcIj4nLCAgICAnPC9zcGFuPiddLFxuICAgICAgJ2dyZWVuQkcnICAgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOmdyZWVuO1wiPicsICAgJzwvc3Bhbj4nXSxcbiAgICAgICdtYWdlbnRhQkcnICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjptYWdlbnRhO1wiPicsICc8L3NwYW4+J10sXG4gICAgICAncmVkQkcnICAgICAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6cmVkO1wiPicsICAgICAnPC9zcGFuPiddLFxuICAgICAgJ3llbGxvd0JHJyAgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOnllbGxvdztcIj4nLCAgJzwvc3Bhbj4nXVxuICAgIH07XG4gIH0gZWxzZSBpZiAoZXhwb3J0cy5tb2RlID09PSAnbm9uZScpIHtcbiAgICByZXR1cm4gc3RyICsgJyc7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ3Vuc3VwcG9ydGVkIG1vZGUsIHRyeSBcImJyb3dzZXJcIiwgXCJjb25zb2xlXCIgb3IgXCJub25lXCInKTtcbiAgfVxuICByZXR1cm4gc3R5bGVzW3N0eWxlXVswXSArIHN0ciArIHN0eWxlc1tzdHlsZV1bMV07XG59XG5cbmZ1bmN0aW9uIGFwcGx5VGhlbWUodGhlbWUpIHtcblxuICAvL1xuICAvLyBSZW1hcms6IFRoaXMgaXMgYSBsaXN0IG9mIG1ldGhvZHMgdGhhdCBleGlzdFxuICAvLyBvbiBTdHJpbmcgdGhhdCB5b3Ugc2hvdWxkIG5vdCBvdmVyd3JpdGUuXG4gIC8vXG4gIHZhciBzdHJpbmdQcm90b3R5cGVCbGFja2xpc3QgPSBbXG4gICAgJ19fZGVmaW5lR2V0dGVyX18nLCAnX19kZWZpbmVTZXR0ZXJfXycsICdfX2xvb2t1cEdldHRlcl9fJywgJ19fbG9va3VwU2V0dGVyX18nLCAnY2hhckF0JywgJ2NvbnN0cnVjdG9yJyxcbiAgICAnaGFzT3duUHJvcGVydHknLCAnaXNQcm90b3R5cGVPZicsICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICd0b0xvY2FsZVN0cmluZycsICd0b1N0cmluZycsICd2YWx1ZU9mJywgJ2NoYXJDb2RlQXQnLFxuICAgICdpbmRleE9mJywgJ2xhc3RJbmRleG9mJywgJ2xlbmd0aCcsICdsb2NhbGVDb21wYXJlJywgJ21hdGNoJywgJ3JlcGxhY2UnLCAnc2VhcmNoJywgJ3NsaWNlJywgJ3NwbGl0JywgJ3N1YnN0cmluZycsXG4gICAgJ3RvTG9jYWxlTG93ZXJDYXNlJywgJ3RvTG9jYWxlVXBwZXJDYXNlJywgJ3RvTG93ZXJDYXNlJywgJ3RvVXBwZXJDYXNlJywgJ3RyaW0nLCAndHJpbUxlZnQnLCAndHJpbVJpZ2h0J1xuICBdO1xuXG4gIE9iamVjdC5rZXlzKHRoZW1lKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgaWYgKHN0cmluZ1Byb3RvdHlwZUJsYWNrbGlzdC5pbmRleE9mKHByb3ApICE9PSAtMSkge1xuICAgICAgY29uc29sZS5sb2coJ3dhcm46ICcucmVkICsgKCdTdHJpbmcucHJvdG90eXBlJyArIHByb3ApLm1hZ2VudGEgKyAnIGlzIHByb2JhYmx5IHNvbWV0aGluZyB5b3UgZG9uXFwndCB3YW50IHRvIG92ZXJyaWRlLiBJZ25vcmluZyBzdHlsZSBuYW1lJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZih0aGVtZVtwcm9wXSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGFkZFByb3BlcnR5KHByb3AsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZXhwb3J0c1t0aGVtZVtwcm9wXV0odGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFkZFByb3BlcnR5KHByb3AsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgcmV0ID0gdGhpcztcbiAgICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoZW1lW3Byb3BdLmxlbmd0aDsgdCsrKSB7XG4gICAgICAgICAgICByZXQgPSBleHBvcnRzW3RoZW1lW3Byb3BdW3RdXShyZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5cbi8vXG4vLyBJdGVyYXRlIHRocm91Z2ggYWxsIGRlZmF1bHQgc3R5bGVzIGFuZCBjb2xvcnNcbi8vXG52YXIgeCA9IFsnYm9sZCcsICd1bmRlcmxpbmUnLCAnc3RyaWtldGhyb3VnaCcsICdpdGFsaWMnLCAnaW52ZXJzZScsICdncmV5JywgJ2JsYWNrJywgJ3llbGxvdycsICdyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICd3aGl0ZScsICdjeWFuJywgJ21hZ2VudGEnLCAnZ3JleUJHJywgJ2JsYWNrQkcnLCAneWVsbG93QkcnLCAncmVkQkcnLCAnZ3JlZW5CRycsICdibHVlQkcnLCAnd2hpdGVCRycsICdjeWFuQkcnLCAnbWFnZW50YUJHJ107XG54LmZvckVhY2goZnVuY3Rpb24gKHN0eWxlKSB7XG5cbiAgLy8gX19kZWZpbmVHZXR0ZXJfXyBhdCB0aGUgbGVhc3Qgd29ya3MgaW4gbW9yZSBicm93c2Vyc1xuICAvLyBodHRwOi8vcm9iZXJ0bnltYW4uY29tL2phdmFzY3JpcHQvamF2YXNjcmlwdC1nZXR0ZXJzLXNldHRlcnMuaHRtbFxuICAvLyBPYmplY3QuZGVmaW5lUHJvcGVydHkgb25seSB3b3JrcyBpbiBDaHJvbWVcbiAgYWRkUHJvcGVydHkoc3R5bGUsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc3R5bGl6ZSh0aGlzLCBzdHlsZSk7XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIHNlcXVlbmNlcihtYXApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWlzSGVhZGxlc3MpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyggKS8sICckMScpO1xuICAgIH1cbiAgICB2YXIgZXhwbG9kZWQgPSB0aGlzLnNwbGl0KFwiXCIpLCBpID0gMDtcbiAgICBleHBsb2RlZCA9IGV4cGxvZGVkLm1hcChtYXApO1xuICAgIHJldHVybiBleHBsb2RlZC5qb2luKFwiXCIpO1xuICB9O1xufVxuXG52YXIgcmFpbmJvd01hcCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciByYWluYm93Q29sb3JzID0gWydyZWQnLCAneWVsbG93JywgJ2dyZWVuJywgJ2JsdWUnLCAnbWFnZW50YSddOyAvL1JvWSBHIEJpVlxuICByZXR1cm4gZnVuY3Rpb24gKGxldHRlciwgaSwgZXhwbG9kZWQpIHtcbiAgICBpZiAobGV0dGVyID09PSBcIiBcIikge1xuICAgICAgcmV0dXJuIGxldHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0eWxpemUobGV0dGVyLCByYWluYm93Q29sb3JzW2krKyAlIHJhaW5ib3dDb2xvcnMubGVuZ3RoXSk7XG4gICAgfVxuICB9O1xufSkoKTtcblxuZXhwb3J0cy50aGVtZXMgPSB7fTtcblxuZXhwb3J0cy5hZGRTZXF1ZW5jZXIgPSBmdW5jdGlvbiAobmFtZSwgbWFwKSB7XG4gIGFkZFByb3BlcnR5KG5hbWUsIHNlcXVlbmNlcihtYXApKTtcbn07XG5cbmV4cG9ydHMuYWRkU2VxdWVuY2VyKCdyYWluYm93JywgcmFpbmJvd01hcCk7XG5leHBvcnRzLmFkZFNlcXVlbmNlcignemVicmEnLCBmdW5jdGlvbiAobGV0dGVyLCBpLCBleHBsb2RlZCkge1xuICByZXR1cm4gaSAlIDIgPT09IDAgPyBsZXR0ZXIgOiBsZXR0ZXIuaW52ZXJzZTtcbn0pO1xuXG5leHBvcnRzLnNldFRoZW1lID0gZnVuY3Rpb24gKHRoZW1lKSB7XG4gIGlmICh0eXBlb2YgdGhlbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGV4cG9ydHMudGhlbWVzW3RoZW1lXSA9IHJlcXVpcmUodGhlbWUpO1xuICAgICAgYXBwbHlUaGVtZShleHBvcnRzLnRoZW1lc1t0aGVtZV0pO1xuICAgICAgcmV0dXJuIGV4cG9ydHMudGhlbWVzW3RoZW1lXTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhcHBseVRoZW1lKHRoZW1lKTtcbiAgfVxufTtcblxuXG5hZGRQcm9wZXJ0eSgnc3RyaXBDb2xvcnMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAoXCJcIiArIHRoaXMpLnJlcGxhY2UoL1xceDFCXFxbXFxkK20vZywgJycpO1xufSk7XG5cbi8vIHBsZWFzZSBub1xuZnVuY3Rpb24gemFsZ28odGV4dCwgb3B0aW9ucykge1xuICB2YXIgc291bCA9IHtcbiAgICBcInVwXCIgOiBbXG4gICAgICAnzI0nLCAnzI4nLCAnzIQnLCAnzIUnLFxuICAgICAgJ8y/JywgJ8yRJywgJ8yGJywgJ8yQJyxcbiAgICAgICfNkicsICfNlycsICfNkScsICfMhycsXG4gICAgICAnzIgnLCAnzIonLCAnzYInLCAnzJMnLFxuICAgICAgJ8yIJywgJ82KJywgJ82LJywgJ82MJyxcbiAgICAgICfMgycsICfMgicsICfMjCcsICfNkCcsXG4gICAgICAnzIAnLCAnzIEnLCAnzIsnLCAnzI8nLFxuICAgICAgJ8ySJywgJ8yTJywgJ8yUJywgJ8y9JyxcbiAgICAgICfMiScsICfNoycsICfNpCcsICfNpScsXG4gICAgICAnzaYnLCAnzacnLCAnzagnLCAnzaknLFxuICAgICAgJ82qJywgJ82rJywgJ82sJywgJ82tJyxcbiAgICAgICfNricsICfNrycsICfMvicsICfNmycsXG4gICAgICAnzYYnLCAnzJonXG4gICAgXSxcbiAgICBcImRvd25cIiA6IFtcbiAgICAgICfMlicsICfMlycsICfMmCcsICfMmScsXG4gICAgICAnzJwnLCAnzJ0nLCAnzJ4nLCAnzJ8nLFxuICAgICAgJ8ygJywgJ8ykJywgJ8ylJywgJ8ymJyxcbiAgICAgICfMqScsICfMqicsICfMqycsICfMrCcsXG4gICAgICAnzK0nLCAnzK4nLCAnzK8nLCAnzLAnLFxuICAgICAgJ8yxJywgJ8yyJywgJ8yzJywgJ8y5JyxcbiAgICAgICfMuicsICfMuycsICfMvCcsICfNhScsXG4gICAgICAnzYcnLCAnzYgnLCAnzYknLCAnzY0nLFxuICAgICAgJ82OJywgJ82TJywgJ82UJywgJ82VJyxcbiAgICAgICfNlicsICfNmScsICfNmicsICfMoydcbiAgICBdLFxuICAgIFwibWlkXCIgOiBbXG4gICAgICAnzJUnLCAnzJsnLCAnzIAnLCAnzIEnLFxuICAgICAgJ82YJywgJ8yhJywgJ8yiJywgJ8ynJyxcbiAgICAgICfMqCcsICfMtCcsICfMtScsICfMticsXG4gICAgICAnzZwnLCAnzZ0nLCAnzZ4nLFxuICAgICAgJ82fJywgJ82gJywgJ82iJywgJ8y4JyxcbiAgICAgICfMtycsICfNoScsICcg0oknXG4gICAgXVxuICB9LFxuICBhbGwgPSBbXS5jb25jYXQoc291bC51cCwgc291bC5kb3duLCBzb3VsLm1pZCksXG4gIHphbGdvID0ge307XG5cbiAgZnVuY3Rpb24gcmFuZG9tTnVtYmVyKHJhbmdlKSB7XG4gICAgdmFyIHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5nZSk7XG4gICAgcmV0dXJuIHI7XG4gIH1cblxuICBmdW5jdGlvbiBpc19jaGFyKGNoYXJhY3Rlcikge1xuICAgIHZhciBib29sID0gZmFsc2U7XG4gICAgYWxsLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgYm9vbCA9IChpID09PSBjaGFyYWN0ZXIpO1xuICAgIH0pO1xuICAgIHJldHVybiBib29sO1xuICB9XG5cbiAgZnVuY3Rpb24gaGVDb21lcyh0ZXh0LCBvcHRpb25zKSB7XG4gICAgdmFyIHJlc3VsdCA9ICcnLCBjb3VudHMsIGw7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9uc1tcInVwXCJdID0gb3B0aW9uc1tcInVwXCJdIHx8IHRydWU7XG4gICAgb3B0aW9uc1tcIm1pZFwiXSA9IG9wdGlvbnNbXCJtaWRcIl0gfHwgdHJ1ZTtcbiAgICBvcHRpb25zW1wiZG93blwiXSA9IG9wdGlvbnNbXCJkb3duXCJdIHx8IHRydWU7XG4gICAgb3B0aW9uc1tcInNpemVcIl0gPSBvcHRpb25zW1wic2l6ZVwiXSB8fCBcIm1heGlcIjtcbiAgICB0ZXh0ID0gdGV4dC5zcGxpdCgnJyk7XG4gICAgZm9yIChsIGluIHRleHQpIHtcbiAgICAgIGlmIChpc19jaGFyKGwpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgdGV4dFtsXTtcbiAgICAgIGNvdW50cyA9IHtcInVwXCIgOiAwLCBcImRvd25cIiA6IDAsIFwibWlkXCIgOiAwfTtcbiAgICAgIHN3aXRjaCAob3B0aW9ucy5zaXplKSB7XG4gICAgICBjYXNlICdtaW5pJzpcbiAgICAgICAgY291bnRzLnVwID0gcmFuZG9tTnVtYmVyKDgpO1xuICAgICAgICBjb3VudHMubWluID0gcmFuZG9tTnVtYmVyKDIpO1xuICAgICAgICBjb3VudHMuZG93biA9IHJhbmRvbU51bWJlcig4KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtYXhpJzpcbiAgICAgICAgY291bnRzLnVwID0gcmFuZG9tTnVtYmVyKDE2KSArIDM7XG4gICAgICAgIGNvdW50cy5taW4gPSByYW5kb21OdW1iZXIoNCkgKyAxO1xuICAgICAgICBjb3VudHMuZG93biA9IHJhbmRvbU51bWJlcig2NCkgKyAzO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvdW50cy51cCA9IHJhbmRvbU51bWJlcig4KSArIDE7XG4gICAgICAgIGNvdW50cy5taWQgPSByYW5kb21OdW1iZXIoNikgLyAyO1xuICAgICAgICBjb3VudHMuZG93biA9IHJhbmRvbU51bWJlcig4KSArIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXJyID0gW1widXBcIiwgXCJtaWRcIiwgXCJkb3duXCJdO1xuICAgICAgZm9yICh2YXIgZCBpbiBhcnIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJyW2RdO1xuICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPD0gY291bnRzW2luZGV4XTsgaSsrKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnNbaW5kZXhdKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBzb3VsW2luZGV4XVtyYW5kb21OdW1iZXIoc291bFtpbmRleF0ubGVuZ3RoKV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhlQ29tZXModGV4dCk7XG59XG5cblxuLy8gZG9uJ3Qgc3VtbW9uIHphbGdvXG5hZGRQcm9wZXJ0eSgnemFsZ28nLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB6YWxnbyh0aGlzKTtcbn0pO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjcuMVxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgdmFyIENvbnNvbGU7XG4gICQucHJvdG90eXBlLmNvbnNvbGUgPSBmdW5jdGlvbigkb3B0aW9ucykge1xuICAgIHZhciBfcmVmO1xuICAgIGlmICgkb3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICAkb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gKF9yZWYgPSAkLmRhdGEodGhpcywgJ2NvbnNvbGUnKSkgIT0gbnVsbCA/IF9yZWYgOiAkLmRhdGEodGhpcywgJ2NvbnNvbGUnLCBuZXcgQ29uc29sZSh0aGlzLCAkb3B0aW9ucykpO1xuICB9O1xuICByZXR1cm4gQ29uc29sZSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgS0VZX0JTLCBLRVlfQywgS0VZX0NSLCBLRVlfRE9XTiwgS0VZX0VTQywgS0VZX1IsIEtFWV9UQUIsIEtFWV9VUCwgY29sb3JzLCBmaXg7XG5cbiAgICBLRVlfQlMgPSA4O1xuXG4gICAgS0VZX1RBQiA9IDk7XG5cbiAgICBLRVlfQ1IgPSAxMztcblxuICAgIEtFWV9FU0MgPSAyNztcblxuICAgIEtFWV9VUCA9IDM4O1xuXG4gICAgS0VZX0RPV04gPSA0MDtcblxuICAgIEtFWV9DID0gNjc7XG5cbiAgICBLRVlfUiA9IDgyO1xuXG4gICAgY29sb3JzID0gcmVxdWlyZSgnY29sb3JzJyk7XG5cbiAgICBmaXggPSBmdW5jdGlvbigkdGV4dCkge1xuICAgICAgcmV0dXJuICR0ZXh0LnJlcGxhY2UoL1xcIC9nLCBcIiZuYnNwO1wiKS5yZXBsYWNlKC9cXG4vZywgXCI8YnIgLz5cIik7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmhpc3Rwb3MgPSAwO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuaGlzdG9yeSA9IG51bGw7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5pbnB1dCA9IG51bGw7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5vdXRwdXQgPSBudWxsO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucHJvbXB0ID0gbnVsbDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLm1vZGUgPSAwO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUub3B0aW9ucyA9IG51bGw7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZVtcImRlZmF1bHRcIl0gPSB7XG4gICAgICBhdXRvZm9jdXM6IHRydWUsXG4gICAgICBoaXN0b3J5OiB0cnVlLFxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgcHJvbXB0OiAnPicsXG4gICAgICBwcm9tcHRBbHQ6ICc/JyxcbiAgICAgIGNvbW1hbmRIYW5kbGU6IGZ1bmN0aW9uKCkge30sXG4gICAgICBjYW5jZWxIYW5kbGU6IGZ1bmN0aW9uKCkge31cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gQ29uc29sZSgkY29udGFpbmVyLCAkb3B0aW9ucykge1xuICAgICAgdGhpcy5oaXN0b3J5ID0gW107XG4gICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh0aGlzW1wiZGVmYXVsdFwiXSwgJG9wdGlvbnMpO1xuICAgICAgJGNvbnRhaW5lci5odG1sKFwiPHNwYW4gY2xhc3M9XFxcIm91dHB1dFxcXCI+PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJwcm9tcHRcXFwiPjwvc3Bhbj48aW5wdXQgY2xhc3M9XFxcImlucHV0XFxcIj48L2lucHV0PlwiKTtcbiAgICAgIHRoaXMub3V0cHV0ID0gJGNvbnRhaW5lci5maW5kKCcub3V0cHV0Jyk7XG4gICAgICB0aGlzLnByb21wdCA9ICRjb250YWluZXIuZmluZCgnLnByb21wdCcpO1xuICAgICAgdGhpcy5pbnB1dCA9ICRjb250YWluZXIuZmluZCgnLmlucHV0Jyk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9mb2N1cykge1xuICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnByb21wdC50ZXh0KHRoaXMub3B0aW9ucy5wcm9tcHQpO1xuICAgICAgJCh3aW5kb3cpLm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgICQoZG9jdW1lbnQuYm9keSkub24oJ2tleWRvd24nLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgaWYgKCRlLmtleUNvZGUgPT09IEtFWV9FU0MpIHtcbiAgICAgICAgICAgICRlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgdGhpcy5pbnB1dC5vbignY2xpY2snLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgcmV0dXJuICRlLnRhcmdldC52YWx1ZSA9ICRlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICAgIHRoaXMuaW5wdXQub24oJ2tleXVwJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigkZSkge1xuICAgICAgICAgIHZhciAkaW5wdXQsICR0ZW1wO1xuICAgICAgICAgIGlmICghX3RoaXMub3B0aW9ucy5oaXN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgICRpbnB1dCA9ICRlLnRhcmdldDtcbiAgICAgICAgICAkdGVtcCA9IDA7XG4gICAgICAgICAgaWYgKF90aGlzLmhpc3RvcnkubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoJGUua2V5Q29kZSA9PT0gS0VZX1VQIHx8ICRlLmtleUNvZGUgPT09IEtFWV9ET1dOKSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5oaXN0b3J5W190aGlzLmhpc3Rwb3NdKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlzdG9yeVtfdGhpcy5oaXN0cG9zXSA9ICRpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkdGVtcCA9IF90aGlzLmlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJGUua2V5Q29kZSA9PT0gS0VZX1VQKSB7XG4gICAgICAgICAgICAgIF90aGlzLmhpc3Rwb3MtLTtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLmhpc3Rwb3MgPCAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlzdHBvcyA9IDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJGUua2V5Q29kZSA9PT0gS0VZX0RPV04pIHtcbiAgICAgICAgICAgICAgX3RoaXMuaGlzdHBvcysrO1xuICAgICAgICAgICAgICBpZiAoX3RoaXMuaGlzdHBvcyA+IF90aGlzLmhpc3RvcnkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlzdHBvcyA9IF90aGlzLmhpc3RvcnkubGVuZ3RoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJGUua2V5Q29kZSA9PT0gS0VZX1VQIHx8ICRlLmtleUNvZGUgPT09IEtFWV9ET1dOKSB7XG4gICAgICAgICAgICAgICRpbnB1dC52YWx1ZSA9IF90aGlzLmhpc3RvcnlbX3RoaXMuaGlzdHBvc10gPyBfdGhpcy5oaXN0b3J5W190aGlzLmhpc3Rwb3NdIDogJHRlbXA7XG4gICAgICAgICAgICAgIHJldHVybiAkaW5wdXQudmFsdWUgPSAkaW5wdXQudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgdGhpcy5pbnB1dC5vbigna2V5ZG93bicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICBpZiAoJGUuY3RybEtleSB8fCAkZS5tZXRhS2V5KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKCRlLmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBLRVlfQzpcbiAgICAgICAgICAgICAgICBfdGhpcy5vcHRpb25zLmNhbmNlbEhhbmRsZSgpO1xuICAgICAgICAgICAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICBjYXNlIEtFWV9SOlxuICAgICAgICAgICAgICAgIF90aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgdGhpcy5pbnB1dC5vbigna2V5ZG93bicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICB2YXIgJGlucHV0LCAkcHJvbXB0O1xuICAgICAgICAgICRpbnB1dCA9ICRlLnRhcmdldDtcbiAgICAgICAgICBzd2l0Y2ggKCRlLmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgS0VZX0JTOlxuICAgICAgICAgICAgICBpZiAoISRpbnB1dC52YWx1ZSkge1xuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEtFWV9UQUI6XG4gICAgICAgICAgICAgIHJldHVybiAkZS5wcmV2ZW50RGVmYXVsdDtcbiAgICAgICAgICAgIGNhc2UgS0VZX0NSOlxuICAgICAgICAgICAgICBpZiAoJGlucHV0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlzdG9yeVtfdGhpcy5oaXN0b3J5Lmxlbmd0aF0gPSAkaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGlzdHBvcyA9IF90aGlzLmhpc3RvcnkubGVuZ3RoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRwcm9tcHQgPSBfdGhpcy5tb2RlID8gX3RoaXMub3B0aW9ucy5wcm9tcHRBbHQgOiBfdGhpcy5vcHRpb25zLnByb21wdDtcbiAgICAgICAgICAgICAgX3RoaXMub3V0cHV0LmFwcGVuZChcIlwiICsgJHByb21wdCArICRpbnB1dC52YWx1ZSArIFwiPGJyIC8+XCIpO1xuICAgICAgICAgICAgICAkaW5wdXQuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICAgICAgaWYgKCRpbnB1dC52YWx1ZSAmJiAkaW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub3B0aW9ucy5jb21tYW5kSGFuZGxlKCRpbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuICRpbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICB9XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5vdXRwdXQuaHRtbCgnJyk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaW50bG4odGhpcy5vcHRpb25zLnRpdGxlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuc2V0UHJvbXB0ID0gZnVuY3Rpb24oJHByb21wdCkge1xuICAgICAgaWYgKCRwcm9tcHQgPT0gbnVsbCkge1xuICAgICAgICAkcHJvbXB0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLnByb21wdC50ZXh0KCRwcm9tcHQgPyB0aGlzLm9wdGlvbnMucHJvbXB0QWx0IDogdGhpcy5vcHRpb25zLnByb21wdCk7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlID0gJHByb21wdDtcbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucHJpbnQgPSBmdW5jdGlvbigkdGV4dCkge1xuICAgICAgaWYgKCR0ZXh0ID09IG51bGwpIHtcbiAgICAgICAgJHRleHQgPSAnJztcbiAgICAgIH1cbiAgICAgIHRoaXMub3V0cHV0LmFwcGVuZChmaXgoJHRleHQpKTtcbiAgICAgIHJldHVybiB0aGlzLmlucHV0LmdldCgwKS5zY3JvbGxJbnRvVmlldygpO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5wcmludGxuID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIGlmICgkdGV4dCA9PSBudWxsKSB7XG4gICAgICAgICR0ZXh0ID0gJyc7XG4gICAgICB9XG4gICAgICB0aGlzLm91dHB1dC5hcHBlbmQoZml4KFwiXCIgKyAkdGV4dCArIFwiXFxuXCIpKTtcbiAgICAgIHJldHVybiB0aGlzLmlucHV0LmdldCgwKS5zY3JvbGxJbnRvVmlldygpO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5kZWJ1ZyA9IGZ1bmN0aW9uKCR0ZXh0KSB7XG4gICAgICB0aGlzLm91dHB1dC5hcHBlbmQoZml4KFwiXCIgKyAkdGV4dCArIFwiXFxuXCIpLmJsdWUpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5wdXQuZ2V0KDApLnNjcm9sbEludG9WaWV3KCk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmhpbGl0ZSA9IGZ1bmN0aW9uKCR0ZXh0KSB7XG4gICAgICB0aGlzLm91dHB1dC5hcHBlbmQoZml4KFwiXCIgKyAkdGV4dCArIFwiXFxuXCIpLnllbGxvdyk7XG4gICAgICByZXR1cm4gdGhpcy5pbnB1dC5nZXQoMCkuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbnNvbGU7XG5cbiAgfSkoKTtcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7XG4iLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xuLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjcuMVxudmFyIEFCUywgQU5ELCBBVE4sIEFkZCwgQmFzZSwgQnVpbHRJbiwgQ09TLCBDaGFpbiwgQ29tLCBDb21tYSwgQ29uLCBDb25zb2xlLCBDb25zdCwgRGF0YSwgRGVmLCBEaW0sIERpdiwgRVEsIEVYUCwgRW5kLCBFbnRlciwgRk4sIEZPUiwgRm9yLCBHRSwgR09TVUIsIEdULCBHb3N1YiwgR290bywgSU5ULCBJZiwgSW1hZ2UsIElucHV0LCBLZXl3b3JkLCBMQ0FTRSwgTEUsIExFRlQsIExFTiwgTElOLCBMT0csIExULCBMZXQsIE1JRCwgTU9ERV9SRVBMLCBNT0RFX1JVTiwgTWF0LCBNYXRSZWFkLCBNYXgsIE1pbiwgTXVsLCBORSwgTk9ULCBOZXh0LCBPUiwgT3BlcmF0b3IsIFBIQVNFX0VYRUMsIFBIQVNFX1NDQU4sIFBvdywgUHJpbnQsIFJJR0hULCBSTkQsIFJhbmRvbWl6ZSwgUmVhZCwgUmVtLCBSZXN0b3JlLCBSZXR1cm4sIFNHTiwgU0lOLCBTUEEsIFNRUiwgU1VCU1RSLCBTZW1pYywgU3RhdGVtZW50LCBTdG9wLCBTdWIsIFRBQiwgVEFOLCBUSU0sIFVDQVNFLCBVc2luZywgVl9BVEFSSSwgVl9HV0JBU0lDLCBWX0hQMjAwMCwgVmFyLCBaZXIsIGFycmF5cywgYmVuY2htYXJrLCBiZW5jaG1hcmtzLCBjaGFpbiwgY29tbW9uLCBkYXRhLCBkaW0sIGRwLCBlbGFwc2VkVGltZSwgZW9wLCBleGVjdXRlLCBmaXh1cElmLCBmaXh1cFByaW50LCBmb3JtYXQsIGZ1bmN0aW9ucywgZ3csIGluaXRpYWxpemUsIGthdHJhLCBsb2FkLCBuYW1lLCBvZmZzZXQsIHBhcnNlLCBwYywgcHJvZywgcXVhbGlmeUZpbGVuYW1lLCByYXcsIHJ0ZSwgcnVuLCBzYXZlLCBzdGFjaywgc3RhcnQsIHN0cmluZ3MsIHRleHQsIHRpdGxlLCB0cmFjZSwgdHlwZSwgdXRpbCwgdmFsdWVPZiwgdmFyaWFibGVzLCB4cmYsIF9jb24sIF9mcyxcbiAgX19iaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfSxcbiAgX19oYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIF9fZXh0ZW5kcyA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoX19oYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBfX3NsaWNlID0gW10uc2xpY2U7XG5cbnV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuXG5ydGUgPSByZXF1aXJlKCcuL3J0ZScpO1xuXG5WX0hQMjAwMCA9IDA7XG5cblZfQVRBUkkgPSAxO1xuXG5WX0dXQkFTSUMgPSAyO1xuXG5HT1NVQiA9IDE7XG5cbkZPUiA9IDI7XG5cblBIQVNFX1NDQU4gPSAwO1xuXG5QSEFTRV9FWEVDID0gMTtcblxuTU9ERV9SRVBMID0gMDtcblxuTU9ERV9SVU4gPSAxO1xuXG5fY29uID0gbnVsbDtcblxuX2ZzID0gbnVsbDtcblxuYXJyYXlzID0ge307XG5cbmJlbmNobWFya3MgPSB7fTtcblxuY29tbW9uID0gW107XG5cbmRhdGEgPSBbXTtcblxudHJhY2UgPSBmYWxzZTtcblxuZHAgPSAwO1xuXG5lb3AgPSBmYWxzZTtcblxuZnVuY3Rpb25zID0ge307XG5cbmd3ID0gZmFsc2U7XG5cbm5hbWUgPSAnJztcblxub2Zmc2V0ID0gMDtcblxucGMgPSAwO1xuXG5wcm9nID0gW107XG5cbnJhdyA9IHt9O1xuXG5zdGFjayA9IFtdO1xuXG5zdHJpbmdzID0ge307XG5cbnRleHQgPSAnJztcblxudHlwZSA9IDA7XG5cbnRpdGxlID0gJyc7XG5cbnZhcmlhYmxlcyA9IHt9O1xuXG54cmYgPSB7fTtcblxuQ29uc29sZSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgX19leHRlbmRzKENvbnNvbGUsIF9zdXBlcik7XG5cbiAgQ29uc29sZS5wcm90b3R5cGUubW9kZSA9IE1PREVfUkVQTDtcblxuICBDb25zb2xlLnByb3RvdHlwZS5leGVjID0gdHJ1ZTtcblxuICBmdW5jdGlvbiBDb25zb2xlKCR0aXRsZSkge1xuICAgIHRoaXMuY29tbWFuZEhhbmRsZSA9IF9fYmluZCh0aGlzLmNvbW1hbmRIYW5kbGUsIHRoaXMpO1xuICAgIHRoaXMudGl0bGUgPSAkdGl0bGU7XG4gICAgQ29uc29sZS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIENvbnNvbGUucHJvdG90eXBlLmNhbmNlbEhhbmRsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGVvcCA9IHRydWU7XG4gICAgY29uLnByaW50KCdeQycpO1xuICAgIGNvbi5zZXRQcm9tcHQoZmFsc2UpO1xuICAgIHJldHVybiBydW4oKTtcbiAgfTtcblxuICBDb25zb2xlLnByb3RvdHlwZS5jb21tYW5kSGFuZGxlID0gZnVuY3Rpb24oJGxpbmUpIHtcbiAgICB2YXIgJGl0ZW0sICRpeCwgJG5hbWUsIF9pLCBfaiwgX2xlbiwgX2xlbjEsIF9yZWYsIF9yZWYxO1xuICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICBjYXNlIE1PREVfUlVOOlxuICAgICAgICBfcmVmID0gJGxpbmUudHJpbSgpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJGl0ZW0gPSBfcmVmW19pXTtcbiAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGlzTmFOKCRpdGVtKSA/IFN0cmluZygkaXRlbSkudG9VcHBlckNhc2UoKSA6IE51bWJlcigkaXRlbSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPCB0aGlzLnZhcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jb250aW51ZWRQcm9tcHQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9yZWYxID0gdGhpcy52YXJzO1xuICAgICAgICAgIGZvciAoJGl4ID0gX2ogPSAwLCBfbGVuMSA9IF9yZWYxLmxlbmd0aDsgX2ogPCBfbGVuMTsgJGl4ID0gKytfaikge1xuICAgICAgICAgICAgJG5hbWUgPSBfcmVmMVskaXhdO1xuICAgICAgICAgICAgaWYgKC9cXCQkLy50ZXN0KCRuYW1lKSkge1xuICAgICAgICAgICAgICBzdHJpbmdzWyRuYW1lXSA9IHRoaXMuYnVmZmVyWyRpeF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXJpYWJsZXNbJG5hbWVdID0gdGhpcy5idWZmZXJbJGl4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jb250aW51ZWRQcm9tcHQgPSBmYWxzZTtcbiAgICAgICAgICBydW4oKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTU9ERV9SRVBMOlxuICAgICAgICAkbGluZSA9IC9cXG4kLy50ZXN0KCRsaW5lKSA/ICRsaW5lIDogXCJcIiArICRsaW5lICsgXCJcXG5cIjtcbiAgICAgICAgcmV0dXJuIHBhcnNlKCRsaW5lKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENvbnNvbGU7XG5cbn0pKHJ0ZS5Db25zb2xlKTtcblxuKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgIGNvbjoge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF9jb24gPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBfY29uID0gbmV3IENvbnNvbGUodGl0bGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfY29uO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBmczoge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF9mcyA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIF9mcyA9IG5ldyBydGUuRmlsZVN5c3RlbSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfZnM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSkoKTtcblxuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCRhbGwpIHtcbiAgYXJyYXlzID0ge307XG4gIGNvbW1vbiA9IFtdO1xuICBkYXRhID0gW107XG4gIGRwID0gMDtcbiAgZW9wID0gZmFsc2U7XG4gIGZ1bmN0aW9ucyA9IHt9O1xuICBiZW5jaG1hcmtzID0ge307XG4gIG9mZnNldCA9IDA7XG4gIHBjID0gMDtcbiAgaWYgKCRhbGwpIHtcbiAgICByYXcgPSB7fTtcbiAgfVxuICBzdGFjayA9IFtdO1xuICBzdHJpbmdzID0ge307XG4gIHZhcmlhYmxlcyA9IHt9O1xuICByZXR1cm4geHJmID0ge307XG59O1xuXG52YWx1ZU9mID0gZnVuY3Rpb24oJHZhbHVlKSB7XG4gIGlmICgkdmFsdWVbXCJldmFsXCJdICE9IG51bGwpIHtcbiAgICByZXR1cm4gJHZhbHVlW1wiZXZhbFwiXSgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAkdmFsdWU7XG4gIH1cbn07XG5cbnF1YWxpZnlGaWxlbmFtZSA9IGZ1bmN0aW9uKCRuYW1lLCAkdmVyc2lvbikge1xuICBpZiAoJHZlcnNpb24gPT0gbnVsbCkge1xuICAgICR2ZXJzaW9uID0gVl9IUDIwMDA7XG4gIH1cbiAgc3dpdGNoICgkdmVyc2lvbikge1xuICAgIGNhc2UgVl9BVEFSSTpcbiAgICAgIHJldHVybiAnYmFzL2F0YXJpLycgKyAkbmFtZTtcbiAgICBjYXNlIFZfR1dCQVNJQzpcbiAgICAgIHJldHVybiAnYmFzL2d3YmFzaWMvJyArICRuYW1lO1xuICAgIGNhc2UgVl9IUDIwMDA6XG4gICAgICBzd2l0Y2ggKCRuYW1lWzBdKSB7XG4gICAgICAgIGNhc2UgXCIqXCI6XG4gICAgICAgICAgcmV0dXJuICdiYXMvaHAyay9ncm91cC8nICsgJG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIGNhc2UgXCIkXCI6XG4gICAgICAgICAgcmV0dXJuICdiYXMvaHAyay9zeXN0ZW0vJyArICRuYW1lLnNsaWNlKDEpO1xuICAgICAgICBjYXNlIFwiI1wiOlxuICAgICAgICAgIHJldHVybiAnYmFzL2hwMmsvdGVzdC8nICsgJG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICdiYXMvaHAyay8nICsgJG5hbWU7XG4gICAgICB9XG4gIH1cbn07XG5cbnNhdmUgPSBmdW5jdGlvbigkdmVyc2lvbiwgJG5hbWUsICRkYXRhLCAkbmV4dCkge1xuICAkbmFtZSA9ICRuYW1lWzBdID09PSAnXCInID8gJG5hbWUuc2xpY2UoMSwgLTEpIDogJG5hbWU7XG4gIGNvbi5wYXVzZSh0cnVlKTtcbiAgZnMud3JpdGVGaWxlKHF1YWxpZnlGaWxlbmFtZSgkbmFtZSwgJHZlcnNpb24pLCAkZGF0YSwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiAkbmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAkbmV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4gY29uLnBhdXNlKGZhbHNlKTtcbiAgfSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxubG9hZCA9IGZ1bmN0aW9uKCR2ZXJzaW9uLCAkbmFtZSwgJGluaXQsICRuZXh0KSB7XG4gIGlmICgkaW5pdCA9PSBudWxsKSB7XG4gICAgJGluaXQgPSB0cnVlO1xuICB9XG4gICRuYW1lID0gJG5hbWVbMF0gPT09ICdcIicgPyAkbmFtZS5zbGljZSgxLCAtMSkgOiAkbmFtZTtcbiAgaW5pdGlhbGl6ZSgkaW5pdCk7XG4gIGNvbi5wYXVzZSh0cnVlKTtcbiAgZnMucmVhZEZpbGUocXVhbGlmeUZpbGVuYW1lKCRuYW1lLCAkdmVyc2lvbiksIGZ1bmN0aW9uKCRlcnIsICRkYXRhKSB7XG4gICAgaWYgKCRlcnIgIT0gbnVsbCkge1xuICAgICAgY29uLnByaW50bG4oJGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgICRkYXRhID0gdXRpbC5jbGVhbigkZGF0YSkuc3BsaXQoJ1xcbicpO1xuICAgICAgaWYgKGlzTmFOKCRkYXRhWzBdWzBdKSkge1xuICAgICAgICAkZGF0YS5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgaWYgKCRkYXRhWzBdID09PSBcIlwiKSB7XG4gICAgICAgICRkYXRhLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICBuYW1lID0gL15bQS1aYS16XS8udGVzdCgkbmFtZSkgPyAkbmFtZSA6ICRuYW1lLnNsaWNlKDEpO1xuICAgICAgdHlwZSA9ICR2ZXJzaW9uO1xuICAgICAgZ3cgPSB0eXBlID09PSBWX0dXQkFTSUMgPyB0cnVlIDogZmFsc2U7XG4gICAgICB0ZXh0ID0gJGRhdGEuam9pbignXFxuJyk7XG4gICAgICBpZiAodHlwZW9mICRuZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgJG5leHQodGV4dCk7XG4gICAgICB9XG4gICAgICBwYXJzZSh0ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbi5wYXVzZShmYWxzZSk7XG4gIH0pO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4ZWN1dGUgPSBmdW5jdGlvbigkdmVyc2lvbiwgJG5hbWUsICRpbml0KSB7XG4gIGlmICgkaW5pdCA9PSBudWxsKSB7XG4gICAgJGluaXQgPSB0cnVlO1xuICB9XG4gIGluaXRpYWxpemUoJGluaXQpO1xuICBjb24ucGF1c2UodHJ1ZSk7XG4gIGZzLnJlYWRGaWxlKHF1YWxpZnlGaWxlbmFtZSgkbmFtZSwgJHZlcnNpb24pLCBmdW5jdGlvbigkZXJyLCAkZGF0YSkge1xuICAgIGlmICgkZXJyICE9IG51bGwpIHtcbiAgICAgIGNvbi5wcmludGxuKCRlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkZGF0YSA9IHV0aWwuY2xlYW4oJGRhdGEpLnNwbGl0KCdcXG4nKTtcbiAgICAgIGlmIChpc05hTigkZGF0YVswXVswXSkpIHtcbiAgICAgICAgJGRhdGEuc2hpZnQoKTtcbiAgICAgIH1cbiAgICAgIGlmICgkZGF0YVswXSA9PT0gXCJcIikge1xuICAgICAgICAkZGF0YS5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgbmFtZSA9IC9eW0EtWmEtel0vLnRlc3QoJG5hbWUpID8gJG5hbWUgOiAkbmFtZS5zbGljZSgxKTtcbiAgICAgIHR5cGUgPSAkdmVyc2lvbjtcbiAgICAgIGd3ID0gdHlwZSA9PT0gVl9HV0JBU0lDID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgdGV4dCA9ICRkYXRhLmpvaW4oJ1xcbicpO1xuICAgICAgcGFyc2UodGV4dCk7XG4gICAgICBzdGFydCgpO1xuICAgICAgcnVuKCk7XG4gICAgfVxuICAgIHJldHVybiBjb24ucGF1c2UoZmFsc2UpO1xuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJGxpbmVubywgJHN0YXRlbWVudCwgX2ksIF9sZW4sIF9yZWY7XG4gIHByb2cgPSBbXTtcbiAgZm9yICgkbGluZW5vIGluIHJhdykge1xuICAgICRzdGF0ZW1lbnQgPSByYXdbJGxpbmVub107XG4gICAgd2hpbGUgKCRsaW5lbm8ubGVuZ3RoIDwgNCkge1xuICAgICAgJGxpbmVubyA9ICcwJyArICRsaW5lbm87XG4gICAgfVxuICAgIHByb2cucHVzaChbJGxpbmVubywgJHN0YXRlbWVudF0pO1xuICB9XG4gIHByb2cuc29ydCgpO1xuICBpbml0aWFsaXplKGZhbHNlKTtcbiAgZm9yIChfaSA9IDAsIF9sZW4gPSBwcm9nLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgX3JlZiA9IHByb2dbX2ldLCAkbGluZW5vID0gX3JlZlswXSwgJHN0YXRlbWVudCA9IF9yZWZbMV07XG4gICAgaWYgKCRzdGF0ZW1lbnQuY29kZS50eXBlID09PSBQSEFTRV9TQ0FOKSB7XG4gICAgICAkc3RhdGVtZW50LmNvZGVbXCJldmFsXCJdKCk7XG4gICAgfVxuICAgIHhyZltwYXJzZUludCgkbGluZW5vLCAxMCldID0gcGMrKztcbiAgfVxuICByZXR1cm4gcGMgPSAwO1xufTtcblxucnVuID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkY29kZSwgJGUsICRsaW5lbm8sICRzdGF0ZW1lbnQsICR3YWl0LCBfcmVmO1xuICAkd2FpdCA9IGZhbHNlO1xuICBjb24uc2V0TW9kZShNT0RFX1JVTik7XG4gIHRyeSB7XG4gICAgd2hpbGUgKCEoZW9wIHx8ICR3YWl0KSkge1xuICAgICAgX3JlZiA9IHByb2dbcGMrK10sICRsaW5lbm8gPSBfcmVmWzBdLCAkc3RhdGVtZW50ID0gX3JlZlsxXTtcbiAgICAgICRjb2RlID0gJHN0YXRlbWVudC5jb2RlO1xuICAgICAgaWYgKCRzdGF0ZW1lbnQuY29kZS50eXBlID09PSBQSEFTRV9FWEVDKSB7XG4gICAgICAgIGlmICh0cmFjZSkge1xuICAgICAgICAgIGNvbi5kZWJ1ZygkbGluZW5vICsgJyAnICsgJGNvZGUudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgJHdhaXQgPSAkY29kZVtcImV2YWxcIl0oKTtcbiAgICAgIH1cbiAgICAgIGNvbi5zZXRQcm9tcHQoJHdhaXQpO1xuICAgICAgaWYgKHBjID49IHByb2cubGVuZ3RoKSB7XG4gICAgICAgIGVvcCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAkZSA9IF9lcnJvcjtcbiAgICBjb24ucHJpbnRsbigkZSk7XG4gICAgJHdhaXQgPSBmYWxzZTtcbiAgfVxuICBpZiAoISR3YWl0KSB7XG4gICAgY29uLnNldE1vZGUoTU9ERV9SRVBMKTtcbiAgICByZXR1cm4gY29uLnByaW50bG4oJ0RPTkUnKTtcbiAgfVxufTtcblxuY2hhaW4gPSBmdW5jdGlvbigkY29kZSkge1xuICB2YXIgJGl4LCAkc2F2ZSwgJHZhciwgX2ksIF9qLCBfbGVuLCBfbGVuMTtcbiAgJHNhdmUgPSBBcnJheShjb21tb24ubGVuZ3RoKTtcbiAgZm9yICgkaXggPSBfaSA9IDAsIF9sZW4gPSBjb21tb24ubGVuZ3RoOyBfaSA8IF9sZW47ICRpeCA9ICsrX2kpIHtcbiAgICAkdmFyID0gY29tbW9uWyRpeF07XG4gICAgc3dpdGNoICgkdmFyLnR5cGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgJHNhdmVbJGl4XSA9IHN0cmluZ3NbJHZhci5uYW1lXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgICRzYXZlWyRpeF0gPSB2YXJpYWJsZXNbJHZhci5uYW1lXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgICRzYXZlWyRpeF0gPSBhcnJheXNbJHZhci5uYW1lXTtcbiAgICB9XG4gIH1cbiAgaW5pdGlhbGl6ZSh0cnVlKTtcbiAgcGFyc2UoJGNvZGUpO1xuICBzdGFydCgpO1xuICBmb3IgKCRpeCA9IF9qID0gMCwgX2xlbjEgPSBjb21tb24ubGVuZ3RoOyBfaiA8IF9sZW4xOyAkaXggPSArK19qKSB7XG4gICAgJHZhciA9IGNvbW1vblskaXhdO1xuICAgIHN3aXRjaCAoJHZhci50eXBlKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHN0cmluZ3NbJHZhci5uYW1lXSA9ICRzYXZlWyRpeF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICB2YXJpYWJsZXNbJHZhci5uYW1lXSA9ICRzYXZlWyRpeF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBhcnJheXNbJHZhci5uYW1lXSA9ICRzYXZlWyRpeF07XG4gICAgfVxuICB9XG4gIHJldHVybiBydW4oKTtcbn07XG5cbnBhcnNlID0gZnVuY3Rpb24oJGNvZGUpIHtcbiAgdmFyICRlLCAkaW5kZXgsICRsaW5lLCBrYywgX2ksIF9sZW47XG4gIGtjID0gcmVxdWlyZSgnLi9rYycpO1xuICAkY29kZSA9ICRjb2RlLnNwbGl0KCdcXG4nKTtcbiAgZm9yICgkaW5kZXggPSBfaSA9IDAsIF9sZW4gPSAkY29kZS5sZW5ndGg7IF9pIDwgX2xlbjsgJGluZGV4ID0gKytfaSkge1xuICAgICRsaW5lID0gJGNvZGVbJGluZGV4XTtcbiAgICBpZiAoL15cXGQqXFxzKklGL2kudGVzdCgkbGluZSkpIHtcbiAgICAgICRjb2RlWyRpbmRleF0gPSAkbGluZSA9IGZpeHVwSWYoJGxpbmUpO1xuICAgIH1cbiAgICBpZiAoL15cXGQqXFxzKlBSSU5UL2kudGVzdCgkbGluZSkpIHtcbiAgICAgICRjb2RlWyRpbmRleF0gPSAkbGluZSA9IGZpeHVwUHJpbnQoJGxpbmUpO1xuICAgIH1cbiAgICBpZiAoL1xcJyg/PVteXCJdKig/OlwiW15cIl0qXCJbXlwiXSopKiQpLy50ZXN0KCRsaW5lKSkge1xuICAgICAgJGNvZGVbJGluZGV4XSA9ICRsaW5lID0gJGxpbmUucmVwbGFjZSgvKFxcJy4qKD89W15cIl0qKD86XCJbXlwiXSpcIlteXCJdKikqJCkpL2csIFwiXCIpO1xuICAgIH1cbiAgICBpZiAoL1xcKlxcKig/PVteXCJdKig/OlwiW15cIl0qXCJbXlwiXSopKiQpLy50ZXN0KCRsaW5lKSkge1xuICAgICAgJGNvZGVbJGluZGV4XSA9ICRsaW5lID0gJGxpbmUucmVwbGFjZSgvKFxcKlxcKig/PVteXCJdKig/OlwiW15cIl0qXCJbXlwiXSopKiQpKS9nLCBcIl5cIik7XG4gICAgfVxuICB9XG4gIHRyeSB7XG4gICAga2MucGFyc2UoJGNvZGUuam9pbignXFxuJykpO1xuICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAkZSA9IF9lcnJvcjtcbiAgICBjb24uZGVidWcoU3RyaW5nKCRlKSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5maXh1cElmID0gZnVuY3Rpb24oJGxpbmUpIHtcbiAgJGxpbmUgPSAkbGluZS5zcGxpdCgvVEhFTi9pKTtcbiAgJGxpbmVbMF0gPSAkbGluZVswXS5yZXBsYWNlKC9cXD0vZywgJz09JykucmVwbGFjZSgvXFw8XFw9XFw9L2csICc8PScpLnJlcGxhY2UoL1xcPlxcPVxcPS9nLCAnPj0nKS5yZXBsYWNlKC9cXCMvZywgJzw+Jyk7XG4gIHJldHVybiAkbGluZS5qb2luKFwiIFRIRU4gXCIpO1xufTtcblxuZml4dXBQcmludCA9IGZ1bmN0aW9uKCRsaW5lKSB7XG4gIHZhciAkY2h1bmssICRpbmRleCwgJGlzX3N0cmluZywgJG1hdGNoLCAkc2VwLCBTRVAsIF9pLCBfbGVuLCBfcmVmLCBfcmVmMTtcbiAgU0VQID0gJzs6LCc7XG4gICRpc19zdHJpbmcgPSBmYWxzZTtcbiAgJG1hdGNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBfaSwgX2xlbiwgX3JlZiwgX3Jlc3VsdHM7XG4gICAgX3JlZiA9ICRsaW5lLm1hdGNoKC9bXlwiXSooPyFcXFxcXCJbXlwiXSpcXFwiKS9nKTtcbiAgICBfcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgJGNodW5rID0gX3JlZltfaV07XG4gICAgICBpZiAoJGNodW5rICE9PSAnJykge1xuICAgICAgICBfcmVzdWx0cy5wdXNoKCRjaHVuayk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfcmVzdWx0cztcbiAgfSkoKTtcbiAgZm9yICgkaW5kZXggPSBfaSA9IDAsIF9sZW4gPSAkbWF0Y2gubGVuZ3RoOyBfaSA8IF9sZW47ICRpbmRleCA9ICsrX2kpIHtcbiAgICAkY2h1bmsgPSAkbWF0Y2hbJGluZGV4XTtcbiAgICAkc2VwID0gL15cXGQqXFxzKlBSSU5UXFxzKiQvaS50ZXN0KCRjaHVuaykgfHwgJGluZGV4ID09PSAkbWF0Y2gubGVuZ3RoIC0gMSA/ICcnIDogJzsnO1xuICAgIGlmICgkaXNfc3RyaW5nKSB7XG4gICAgICAkbWF0Y2hbJGluZGV4XSA9ICRjaHVuayA9ICdcIicgKyAkY2h1bmsgKyAnXCInO1xuICAgICAgaWYgKFNFUC5pbmRleE9mKChfcmVmID0gKF9yZWYxID0gJG1hdGNoWyRpbmRleCArIDFdKSAhPSBudWxsID8gX3JlZjFbMF0gOiB2b2lkIDApICE9IG51bGwgPyBfcmVmIDogJycpID09PSAtMSkge1xuICAgICAgICAkbWF0Y2hbJGluZGV4XSA9ICRjaHVuayArICRzZXA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChTRVAuaW5kZXhPZigkY2h1bmsuc3Vic3RyKC0xKSkgPT09IC0xKSB7XG4gICAgICAgICRtYXRjaFskaW5kZXhdID0gJGNodW5rICsgJHNlcDtcbiAgICAgIH1cbiAgICB9XG4gICAgJGlzX3N0cmluZyA9ICEkaXNfc3RyaW5nO1xuICB9XG4gIHJldHVybiAkbWF0Y2guam9pbignJyk7XG59O1xuXG5kaW0gPSBmdW5jdGlvbigkaW5pdCwgJGRpbTEsICRkaW0yKSB7XG4gIHZhciAkYSwgJGksICRqLCBfaSwgX2osIF9rLCBfcmVmLCBfcmVmMSwgX3JlZjI7XG4gICRhID0gW107XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMjpcbiAgICAgIGZvciAoJGkgPSBfaSA9IG9mZnNldCwgX3JlZiA9ICRkaW0xICsgMTsgb2Zmc2V0IDw9IF9yZWYgPyBfaSA8IF9yZWYgOiBfaSA+IF9yZWY7ICRpID0gb2Zmc2V0IDw9IF9yZWYgPyArK19pIDogLS1faSkge1xuICAgICAgICAkYVskaV0gPSAkaW5pdDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIGZvciAoJGkgPSBfaiA9IG9mZnNldCwgX3JlZjEgPSAkZGltMSArIDE7IG9mZnNldCA8PSBfcmVmMSA/IF9qIDwgX3JlZjEgOiBfaiA+IF9yZWYxOyAkaSA9IG9mZnNldCA8PSBfcmVmMSA/ICsrX2ogOiAtLV9qKSB7XG4gICAgICAgICRhWyRpXSA9IFtdO1xuICAgICAgICBmb3IgKCRqID0gX2sgPSBvZmZzZXQsIF9yZWYyID0gJGRpbTIgKyAxOyBvZmZzZXQgPD0gX3JlZjIgPyBfayA8IF9yZWYyIDogX2sgPiBfcmVmMjsgJGogPSBvZmZzZXQgPD0gX3JlZjIgPyArK19rIDogLS1faykge1xuICAgICAgICAgICRhWyRpXVskal0gPSAkaW5pdDtcbiAgICAgICAgfVxuICAgICAgfVxuICB9XG4gIHJldHVybiAkYTtcbn07XG5cbmZvcm1hdCA9IGZ1bmN0aW9uKCRpbWFnZSkge1xuICB2YXIgJGNvdW50LCAkaGVhZCwgJG91dDtcbiAgaWYgKCRpbWFnZSA9PSBudWxsKSB7XG4gICAgJGltYWdlID0gW107XG4gIH1cbiAgJG91dCA9ICcnO1xuICAkY291bnQgPSAxO1xuICB3aGlsZSAoJGltYWdlLmxlbmd0aCA+IDApIHtcbiAgICAkaGVhZCA9ICRpbWFnZS5zaGlmdCgpO1xuICAgIGlmIChpc05hTigkaGVhZCkpIHtcbiAgICAgIHN3aXRjaCAoJGhlYWQpIHtcbiAgICAgICAgY2FzZSAnLCc6XG4gICAgICAgICAgJGNvdW50ID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgJG91dCArPSAkY291bnQgPiAxID8gJyUnICsgJGNvdW50ICsgJ2QnIDogJyVkJztcbiAgICAgICAgICAkY291bnQgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAkb3V0ICs9ICRjb3VudCA+IDEgPyAnJScgKyAkY291bnQgKyAncycgOiAnJXMnO1xuICAgICAgICAgICRjb3VudCA9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1gnOlxuICAgICAgICAgICRvdXQgKz0gQXJyYXkoJGNvdW50ICsgMSkuam9pbignICcpO1xuICAgICAgICAgICRjb3VudCA9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJygnOlxuICAgICAgICAgICRvdXQgKz0gQXJyYXkoJGNvdW50ICsgMSkuam9pbihmb3JtYXQoJGltYWdlKSk7XG4gICAgICAgICAgJGNvdW50ID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnKSc6XG4gICAgICAgICAgcmV0dXJuICRvdXQ7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgJG91dCArPSAkaGVhZC5zbGljZSgxLCAtMSk7XG4gICAgICAgICAgJGNvdW50ID0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgJGNvdW50ID0gJGhlYWQ7XG4gICAgfVxuICB9XG4gIHJldHVybiAkb3V0O1xufTtcblxuYmVuY2htYXJrID0gZnVuY3Rpb24oJG5hbWUpIHtcbiAgcmV0dXJuIGJlbmNobWFya3NbJG5hbWVdID0gbmV3IERhdGUoKTtcbn07XG5cbmVsYXBzZWRUaW1lID0gZnVuY3Rpb24oJHBvaW50MSwgJHBvaW50Mikge1xuICBpZiAoYmVuY2htYXJrc1skcG9pbnQxXSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKGJlbmNobWFya3NbJHBvaW50Ml0gPT0gbnVsbCkge1xuICAgIGJlbmNobWFya3NbJHBvaW50Ml0gPSBuZXcgRGF0ZSgpO1xuICB9XG4gIHJldHVybiBiZW5jaG1hcmtzWyRwb2ludDJdIC0gYmVuY2htYXJrc1skcG9pbnQxXTtcbn07XG5cblplciA9IHtcbiAgXCJldmFsXCI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAwO1xuICB9LFxuICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICdaRVInO1xuICB9XG59O1xuXG5Db24gPSB7XG4gIFwiZXZhbFwiOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gMTtcbiAgfSxcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAnQ09OJztcbiAgfVxufTtcblxuU2VtaWMgPSB7XG4gIFwiZXZhbFwiOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJyc7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJzsnO1xuICB9XG59O1xuXG5Db21tYSA9IHtcbiAgXCJldmFsXCI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAnICAgICc7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJywnO1xuICB9XG59O1xuXG5PcGVyYXRvciA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gT3BlcmF0b3IobGVmdCwgcmlnaHQpIHtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgfVxuXG4gIHJldHVybiBPcGVyYXRvcjtcblxufSkoKTtcblxuQnVpbHRJbiA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gQnVpbHRJbigkMCwgJDEsICQyKSB7XG4gICAgdGhpcy4kMCA9ICQwO1xuICAgIHRoaXMuJDEgPSAkMTtcbiAgICB0aGlzLiQyID0gJDI7XG4gIH1cblxuICBCdWlsdEluLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIlwiICsgKHRoaXMuY29uc3RydWN0b3IubmFtZS50b1VwcGVyQ2FzZSgpKSArIFwiKFwiICsgdGhpcy4kMCArIFwiKVwiO1xuICB9O1xuXG4gIHJldHVybiBCdWlsdEluO1xuXG59KSgpO1xuXG5LZXl3b3JkID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBLZXl3b3JkKCkge31cblxuICBLZXl3b3JkLnByb3RvdHlwZS50eXBlID0gUEhBU0VfRVhFQztcblxuICBLZXl3b3JkLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIEtleXdvcmQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0ga2F0cmEgPSB7XG4gIG1haW46IGZ1bmN0aW9uKCRhcmdzKSB7XG4gICAgdmFyIF9yZWY7XG4gICAgdGl0bGUgPSAoX3JlZiA9ICRhcmdzLnRpdGxlKSAhPSBudWxsID8gX3JlZiA6IHRpdGxlO1xuICAgIHN3aXRjaCAoJGFyZ3MuYmFzaWMpIHtcbiAgICAgIGNhc2UgJ2F0YXJpJzpcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGUoVl9BVEFSSSwgJGFyZ3MucHJvZ3JhbSk7XG4gICAgICBjYXNlICdnd2Jhc2ljJzpcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGUoVl9HV0JBU0lDLCAkYXJncy5wcm9ncmFtKTtcbiAgICAgIGNhc2UgJ2hwMmsnOlxuICAgICAgICByZXR1cm4gZXhlY3V0ZShWX0hQMjAwMCwgJGFyZ3MucHJvZ3JhbSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gY29uLnNldE1vZGUoTU9ERV9SRVBMKTtcbiAgICB9XG4gIH0sXG4gIHNldFJvb3Q6IGZ1bmN0aW9uKCRyb290KSB7XG4gICAgcmV0dXJuIGZzLnNldFJvb3QoJHJvb3QpO1xuICB9LFxuICBnZXRUZXh0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfSxcbiAgY29tbWFuZDoge1xuICAgIGFwcGVuZDogZnVuY3Rpb24oJDApIHtcbiAgICAgIHJldHVybiBsb2FkKFZfSFAyMDAwLCAkMC5zcGxpdCgnLScpWzFdLCBmYWxzZSk7XG4gICAgfSxcbiAgICBhdGFyaTogZnVuY3Rpb24oJDAsICRuZXh0KSB7XG4gICAgICByZXR1cm4gbG9hZChWX0FUQVJJLCAkMCwgdHJ1ZSwgJG5leHQpO1xuICAgIH0sXG4gICAgY2F0OiBmdW5jdGlvbigkZGlyKSB7XG4gICAgICB2YXIgJGN3LCAkaGRyLCAkbmM7XG4gICAgICAkbmMgPSA0O1xuICAgICAgJGN3ID0gMjA7XG4gICAgICAkaGRyID0gJ25hbWUgICAgICAgICAgICAgICAgJztcbiAgICAgIHJldHVybiBmcy5yZWFkRGlyKCRkaXIsIGZ1bmN0aW9uKCRmaWxlcykge1xuICAgICAgICB2YXIgJGNvbCwgJGZpbGUsIF9pLCBfbGVuO1xuICAgICAgICAkY29sID0gMDtcbiAgICAgICAgY29uLmhpbGl0ZShcIlxcblwiICsgJGRpciArIFwiXFxuXCIgKyAoQXJyYXkoJG5jICsgMSkuam9pbigkaGRyKSkpO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9ICRmaWxlcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICRmaWxlID0gJGZpbGVzW19pXTtcbiAgICAgICAgICAkZmlsZSA9ICRmaWxlLnNwbGl0KCcuJylbMF07XG4gICAgICAgICAgd2hpbGUgKCRmaWxlLmxlbmd0aCA8ICRjdykge1xuICAgICAgICAgICAgJGZpbGUgKz0gXCIgXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbi5wcmludCgkZmlsZSk7XG4gICAgICAgICAgaWYgKCgkY29sKyspICUgJG5jID09PSAkbmMgLSAxKSB7XG4gICAgICAgICAgICBjb24ucHJpbnRsbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB3aW5kb3cgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gY29uLnByaW50KFwiXFxuXCIgKyBjb24ucHJvbXB0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNvbi5jbGVhcigpO1xuICAgIH0sXG4gICAgZGVsOiBmdW5jdGlvbigkMCkge1xuICAgICAgdmFyICRlbmQsICRsaW5lbm8sICRzdGFydCwgX2ksIF9yZWYsIF9yZXN1bHRzO1xuICAgICAgX3JlZiA9ICQwLnNwbGl0KCctJylbMV0uc3BsaXQoJywnKSwgJHN0YXJ0ID0gX3JlZlswXSwgJGVuZCA9IF9yZWZbMV07XG4gICAgICBpZiAoISRlbmQpIHtcbiAgICAgICAgJGVuZCA9ICRzdGFydDtcbiAgICAgIH1cbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKCRsaW5lbm8gPSBfaSA9ICRzdGFydDsgJHN0YXJ0IDw9ICRlbmQgPyBfaSA8ICRlbmQgOiBfaSA+ICRlbmQ7ICRsaW5lbm8gPSAkc3RhcnQgPD0gJGVuZCA/ICsrX2kgOiAtLV9pKSB7XG4gICAgICAgIGlmIChyYXdbJGxpbmVub10gIT0gbnVsbCkge1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2goZGVsZXRlIHJhd1skbGluZW5vXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaCh2b2lkIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfSxcbiAgICBkaXI6IGZ1bmN0aW9uKCQwKSB7fSxcbiAgICBleGVjOiBmdW5jdGlvbigkMCkge1xuICAgICAgcmV0dXJuIGV4ZWN1dGUoVl9IUDIwMDAsICQwLnNwbGl0KCctJylbMV0pO1xuICAgIH0sXG4gICAgZmlsZXM6IGZ1bmN0aW9uKCQwKSB7fSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCQwLCAkbmV4dCkge1xuICAgICAgcmV0dXJuIGxvYWQoVl9IUDIwMDAsICQwLnNwbGl0KCctJylbMV0sIHRydWUsICRuZXh0KTtcbiAgICB9LFxuICAgIGd3YmFzaWM6IGZ1bmN0aW9uKCQwLCAkbmV4dCkge1xuICAgICAgcmV0dXJuIGxvYWQoVl9HV0JBU0lDLCAkMCwgdHJ1ZSwgJG5leHQpO1xuICAgIH0sXG4gICAgbGlzdDogZnVuY3Rpb24oJDApIHtcbiAgICAgIHZhciAkMSwgJGNvZGUsICRlbmQsICRsaW5lbm8sICRsaW5lcywgJHN0YXJ0LCAkc3RhdGVtZW50LCBfaSwgX2xlbiwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xuICAgICAgJDEgPSAkMC5zcGxpdCgnLScpWzFdO1xuICAgICAgaWYgKCQxICE9IG51bGwpIHtcbiAgICAgICAgX3JlZiA9ICQxLnNwbGl0KCcsJyksICRzdGFydCA9IF9yZWZbMF0sICRlbmQgPSBfcmVmWzFdO1xuICAgICAgfVxuICAgICAgaWYgKCRzdGFydCAhPSBudWxsKSB7XG4gICAgICAgICRlbmQgPSAkZW5kICE9IG51bGwgPyAkZW5kIDogJHN0YXJ0O1xuICAgICAgICAkc3RhcnQgPSBwYXJzZUludCgkc3RhcnQsIDEwKTtcbiAgICAgICAgJGVuZCA9IHBhcnNlSW50KCRlbmQsIDEwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzdGFydCA9IDE7XG4gICAgICAgICRlbmQgPSA5OTk5O1xuICAgICAgfVxuICAgICAgJGxpbmVzID0gW107XG4gICAgICBmb3IgKCRsaW5lbm8gaW4gcmF3KSB7XG4gICAgICAgICRzdGF0ZW1lbnQgPSByYXdbJGxpbmVub107XG4gICAgICAgIHdoaWxlICgkbGluZW5vLmxlbmd0aCA8IDUpIHtcbiAgICAgICAgICAkbGluZW5vID0gJzAnICsgJGxpbmVubztcbiAgICAgICAgfVxuICAgICAgICAkbGluZXMucHVzaChbJGxpbmVubywgJHN0YXRlbWVudF0pO1xuICAgICAgfVxuICAgICAgJGxpbmVzLnNvcnQoKTtcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9ICRsaW5lcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBfcmVmMSA9ICRsaW5lc1tfaV0sICRsaW5lbm8gPSBfcmVmMVswXSwgJHN0YXRlbWVudCA9IF9yZWYxWzFdO1xuICAgICAgICAkbGluZW5vID0gcGFyc2VJbnQoJHN0YXRlbWVudC5saW5lbm8sIDEwKTtcbiAgICAgICAgJGNvZGUgPSAkc3RhdGVtZW50LmNvZGU7XG4gICAgICAgIGlmICgkc3RhcnQgIT0gbnVsbCkge1xuICAgICAgICAgIGlmICgkbGluZW5vID49IHBhcnNlSW50KCRzdGFydCwgMTApICYmICRsaW5lbm8gPD0gcGFyc2VJbnQoJGVuZCwgMTApKSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKGNvbi5wcmludGxuKCRsaW5lbm8gKyAnICcgKyAkY29kZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2goY29uLnByaW50bG4oJGxpbmVubyArICcgJyArICRjb2RlKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9LFxuICAgIG5hbWU6IGZ1bmN0aW9uKCQwKSB7XG4gICAgICByZXR1cm4gbmFtZSA9ICQwLnNwbGl0KCctJylbMV07XG4gICAgfSxcbiAgICBwdXJnZTogZnVuY3Rpb24oJDApIHtcbiAgICAgIHJldHVybiBmcy5kZWxldGVGaWxlKHF1YWxpZnlGaWxlbmFtZSgkMC5zcGxpdCgnLScpWzFdLCB0eXBlKSwgZnVuY3Rpb24oJGVycikge1xuICAgICAgICBpZiAoJGVyciAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbi5wcmludGxuKCRlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHF1aXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MgIT09IG51bGwgPyBwcm9jZXNzLmV4aXQoKSA6IHZvaWQgMDtcbiAgICB9LFxuICAgIHJlbnVtOiBmdW5jdGlvbigkMCkge1xuICAgICAgcmV0dXJuIGNvbi5wcmludGxuKFwiUmVudW1iZXIgTm90IEltcGxlbWVudGVkXCIpO1xuICAgIH0sXG4gICAgcnVuOiBmdW5jdGlvbigkMCkge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHJhdykubGVuZ3RoID4gMCkge1xuICAgICAgICBzdGFydCgpO1xuICAgICAgICByZXR1cm4gcnVuKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkY29kZSwgJGxpbmVubywgJGxpbmVzLCAkc3RhdGVtZW50LCAkdGV4dCwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICBpZiAobmFtZSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIGNvbi5wcmludGxuKFwiTmFtZSBub3Qgc2V0XCIpO1xuICAgICAgfVxuICAgICAgJGxpbmVzID0gW107XG4gICAgICAkdGV4dCA9ICcnO1xuICAgICAgZm9yICgkbGluZW5vIGluIHJhdykge1xuICAgICAgICAkc3RhdGVtZW50ID0gcmF3WyRsaW5lbm9dO1xuICAgICAgICAkbGluZXMucHVzaChbJGxpbmVubywgJHN0YXRlbWVudC5jb2RlXSk7XG4gICAgICB9XG4gICAgICAkbGluZXMuc29ydCgpO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSAkbGluZXMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgX3JlZiA9ICRsaW5lc1tfaV0sICRsaW5lbm8gPSBfcmVmWzBdLCAkY29kZSA9IF9yZWZbMV07XG4gICAgICAgICR0ZXh0ICs9ICRsaW5lbm8gKyAnICcgKyAkY29kZSArICdcXG4nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNhdmUodHlwZSwgbmFtZSwgJHRleHQuc2xpY2UoMCwgLTEpLCBmdW5jdGlvbigkZXJyKSB7XG4gICAgICAgIGlmICgkZXJyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gY29uLnByaW50bG4oJGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2NyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBpbml0aWFsaXplKHRydWUpO1xuICAgIH0sXG4gICAgdHJvZmY6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRyYWNlID0gZmFsc2U7XG4gICAgfSxcbiAgICB0cm9uOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cmFjZSA9IHRydWU7XG4gICAgfVxuICB9LFxuICBrZXl3b3JkOiB7XG4gICAgWmVyOiBaZXIsXG4gICAgQ29uOiBDb24sXG4gICAgU2VtaWM6IFNlbWljLFxuICAgIENvbW1hOiBDb21tYSxcbiAgICBTdGF0ZW1lbnQ6IFN0YXRlbWVudCA9IChmdW5jdGlvbigpIHtcbiAgICAgIGZ1bmN0aW9uIFN0YXRlbWVudCgkY29kZSwgJGxpbmVubykge1xuICAgICAgICBpZiAoJGxpbmVubyAhPSBudWxsKSB7XG4gICAgICAgICAgcmF3WyRsaW5lbm9dID0ge1xuICAgICAgICAgICAgbGluZW5vOiAkbGluZW5vLFxuICAgICAgICAgICAgY29kZTogJGNvZGVcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgkY29kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mICRjb2RlW1wiZXZhbFwiXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICRjb2RlW1wiZXZhbFwiXSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gU3RhdGVtZW50O1xuXG4gICAgfSkoKSxcbiAgICBDb25zdDogQ29uc3QgPSAoZnVuY3Rpb24oKSB7XG4gICAgICBmdW5jdGlvbiBDb25zdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaXNfc3RyaW5nID0gJ3N0cmluZycgPT09IHR5cGVvZiB0aGlzLnZhbHVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pc19zdHJpbmcpIHtcbiAgICAgICAgICBpZiAodGhpcy52YWx1ZS5jaGFyQXQoMCkgPT09ICdcIicpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQ29uc3QucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgfTtcblxuICAgICAgQ29uc3QucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgIH07XG5cbiAgICAgIENvbnN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc19zdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gXCJcXFwiXCIgKyB0aGlzLnZhbHVlICsgXCJcXFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29uc3Q7XG5cbiAgICB9KSgpLFxuICAgIFZhcjogVmFyID0gKGZ1bmN0aW9uKCkge1xuICAgICAgZnVuY3Rpb24gVmFyKG5hbWUsICRkZWxpbSwgJGRpbXMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pc19zdHJpbmcgPSAvXFwkJC8udGVzdCh0aGlzLm5hbWUpO1xuICAgICAgICBpZiAoJGRlbGltICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmlzX2FycmF5ID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmRpbXMgPSB1dGlsLmZsYXR0ZW4oJGRpbXMpO1xuICAgICAgICAgIHRoaXMuZGltMSA9IHRoaXMuZGltc1swXTtcbiAgICAgICAgICB0aGlzLmRpbTIgPSB0aGlzLmRpbXNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc19hcnJheSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIFZhci5wcm90b3R5cGVbXCJsZXRcIl0gPSBmdW5jdGlvbigkdmFsdWUpIHtcbiAgICAgICAgdmFyICRkaW0xLCAkZGltMiwgJGVuZCwgJGxlbiwgJHN0YXJ0LCAkc3RyO1xuICAgICAgICBpZiAodGhpcy5pc19zdHJpbmcpIHtcbiAgICAgICAgICBpZiAoZ3cpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpbTIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAkZGltMSA9IHRoaXMuZGltMVtcImV2YWxcIl0oKTtcbiAgICAgICAgICAgICAgJGRpbTIgPSB0aGlzLmRpbTJbXCJldmFsXCJdKCk7XG4gICAgICAgICAgICAgIHJldHVybiBzdHJpbmdzW3RoaXMubmFtZV1bJGRpbTFdWyRkaW0yXSA9ICR2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaW0xICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgJGRpbTEgPSB0aGlzLmRpbTFbXCJldmFsXCJdKCk7XG4gICAgICAgICAgICAgIHJldHVybiBzdHJpbmdzW3RoaXMubmFtZV1bJGRpbTFdID0gJHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3NbdGhpcy5uYW1lXSA9ICR2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGltMiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICRzdGFydCA9IHRoaXMuZGltMVtcImV2YWxcIl0oKSAtIDE7XG4gICAgICAgICAgICAgICRlbmQgPSB0aGlzLmRpbTJbXCJldmFsXCJdKCk7XG4gICAgICAgICAgICAgIGlmICgkZW5kIDwgJHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgU3RyaW5nIGluZGV4OiAnICsgdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICRsZW4gPSAkZW5kIC0gJHN0YXJ0O1xuICAgICAgICAgICAgICAkdmFsdWUgPSAkdmFsdWUuc3Vic3RyKDAsICRsZW4pO1xuICAgICAgICAgICAgICAkdmFsdWUgPSB1dGlsLnBhZCgkdmFsdWUsICRsZW4pO1xuICAgICAgICAgICAgICAkc3RyID0gc3RyaW5nc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nc1t0aGlzLm5hbWVdID0gJHN0ci5zdWJzdHIoMCwgJHN0YXJ0KSArICR2YWx1ZSArICRzdHIuc3Vic3RyKCRlbmQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpbTEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAkc3RhcnQgPSB0aGlzLmRpbTFbXCJldmFsXCJdKCkgLSAxO1xuICAgICAgICAgICAgICAkc3RyID0gc3RyaW5nc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nc1t0aGlzLm5hbWVdID0gJHN0ci5zdWJzdHIoMCwgJHN0YXJ0KSArICR2YWx1ZSArICRzdHIuc3Vic3RyKCRzdGFydCArICR2YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJGxlbiA9IHN0cmluZ3NbdGhpcy5uYW1lXS5sZW5ndGg7XG4gICAgICAgICAgICAgIGlmICgkdmFsdWUubGVuZ3RoIDwgJGxlbikge1xuICAgICAgICAgICAgICAgICR2YWx1ZSArPSBBcnJheSgkbGVuIC0gJHZhbHVlLmxlbmd0aCArIDEpLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nc1t0aGlzLm5hbWVdID0gJHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpbTIgIT0gbnVsbCkge1xuICAgICAgICAgICRkaW0xID0gdGhpcy5kaW0xW1wiZXZhbFwiXSgpO1xuICAgICAgICAgICRkaW0yID0gdGhpcy5kaW0yW1wiZXZhbFwiXSgpO1xuICAgICAgICAgIHJldHVybiBhcnJheXNbdGhpcy5uYW1lXVskZGltMV1bJGRpbTJdID0gJHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGltMSAhPSBudWxsKSB7XG4gICAgICAgICAgJGRpbTEgPSB0aGlzLmRpbTFbXCJldmFsXCJdKCk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5c1t0aGlzLm5hbWVdWyRkaW0xXSA9ICR2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdmFyaWFibGVzW3RoaXMubmFtZV0gPSAkdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIFZhci5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkZGltMSwgJGRpbTIsICRlbmQsICRzdGFydCwgX3JlZiwgX3JlZjEsIF9yZWYxMCwgX3JlZjExLCBfcmVmMTIsIF9yZWYxMywgX3JlZjE0LCBfcmVmMTUsIF9yZWYxNiwgX3JlZjIsIF9yZWYzLCBfcmVmNCwgX3JlZjUsIF9yZWY2LCBfcmVmNywgX3JlZjgsIF9yZWY5O1xuICAgICAgICBpZiAodGhpcy5pc19zdHJpbmcpIHtcbiAgICAgICAgICBpZiAoZ3cpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpbTIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAkZGltMSA9IHRoaXMuZGltMVtcImV2YWxcIl0oKTtcbiAgICAgICAgICAgICAgJGRpbTIgPSB0aGlzLmRpbTJbXCJldmFsXCJdKCk7XG4gICAgICAgICAgICAgIHJldHVybiAoX3JlZiA9IChfcmVmMSA9IHN0cmluZ3NbdGhpcy5uYW1lXSkgIT0gbnVsbCA/IChfcmVmMiA9IF9yZWYxWyRkaW0xXSkgIT0gbnVsbCA/IF9yZWYyWyRkaW0yXSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCA/IF9yZWYgOiAnJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaW0xICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgJGRpbTEgPSB0aGlzLmRpbTFbXCJldmFsXCJdKCk7XG4gICAgICAgICAgICAgIHJldHVybiAoX3JlZjMgPSAoX3JlZjQgPSBzdHJpbmdzW3RoaXMubmFtZV0pICE9IG51bGwgPyBfcmVmNFskZGltMV0gOiB2b2lkIDApICE9IG51bGwgPyBfcmVmMyA6ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChfcmVmNSA9IHN0cmluZ3NbdGhpcy5uYW1lXSkgIT0gbnVsbCA/IF9yZWY1IDogJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpbTIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAkc3RhcnQgPSB0aGlzLmRpbTFbXCJldmFsXCJdKCkgLSAxO1xuICAgICAgICAgICAgICAkZW5kID0gdGhpcy5kaW0yW1wiZXZhbFwiXSgpO1xuICAgICAgICAgICAgICBpZiAoJGVuZCA8ICRzdGFydCkge1xuICAgICAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIFN0cmluZyBpbmRleDogJyArIHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gKF9yZWY2ID0gKF9yZWY3ID0gc3RyaW5nc1t0aGlzLm5hbWVdKSAhPSBudWxsID8gX3JlZjcuc2xpY2UoJHN0YXJ0LCAkZW5kKSA6IHZvaWQgMCkgIT0gbnVsbCA/IF9yZWY2IDogJyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGltMSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICRzdGFydCA9IHRoaXMuZGltMVtcImV2YWxcIl0oKSAtIDE7XG4gICAgICAgICAgICAgIHJldHVybiAoX3JlZjggPSAoX3JlZjkgPSBzdHJpbmdzW3RoaXMubmFtZV0pICE9IG51bGwgPyBfcmVmOS5zbGljZSgkc3RhcnQpIDogdm9pZCAwKSAhPSBudWxsID8gX3JlZjggOiAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiAoX3JlZjEwID0gc3RyaW5nc1t0aGlzLm5hbWVdKSAhPSBudWxsID8gX3JlZjEwIDogJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGltMiAhPSBudWxsKSB7XG4gICAgICAgICAgJGRpbTEgPSB0aGlzLmRpbTFbXCJldmFsXCJdKCk7XG4gICAgICAgICAgJGRpbTIgPSB0aGlzLmRpbTJbXCJldmFsXCJdKCk7XG4gICAgICAgICAgcmV0dXJuIChfcmVmMTEgPSAoX3JlZjEyID0gYXJyYXlzW3RoaXMubmFtZV0pICE9IG51bGwgPyAoX3JlZjEzID0gX3JlZjEyWyRkaW0xXSkgIT0gbnVsbCA/IF9yZWYxM1skZGltMl0gOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwgPyBfcmVmMTEgOiAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGltMSAhPSBudWxsKSB7XG4gICAgICAgICAgJGRpbTEgPSB0aGlzLmRpbTFbXCJldmFsXCJdKCk7XG4gICAgICAgICAgcmV0dXJuIChfcmVmMTQgPSAoX3JlZjE1ID0gYXJyYXlzW3RoaXMubmFtZV0pICE9IG51bGwgPyBfcmVmMTVbJGRpbTFdIDogdm9pZCAwKSAhPSBudWxsID8gX3JlZjE0IDogMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gKF9yZWYxNiA9IHZhcmlhYmxlc1t0aGlzLm5hbWVdKSAhPSBudWxsID8gX3JlZjE2IDogMDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgVmFyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc19hcnJheSkge1xuICAgICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5uYW1lICsgXCJbXCIgKyAodGhpcy5kaW1zLmpvaW4oJywnKSkgKyBcIl1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gVmFyO1xuXG4gICAgfSkoKSxcbiAgICBCYXNlOiBCYXNlID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEJhc2UsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIEJhc2UoYmFzZSkge1xuICAgICAgICB0aGlzLmJhc2UgPSBiYXNlO1xuICAgICAgfVxuXG4gICAgICBCYXNlLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgb2Zmc2V0ID0gdGhpcy5iYXNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBCYXNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJCQVNFIFwiICsgdGhpcy5iYXNlO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEJhc2U7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBDaGFpbjogQ2hhaW4gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoQ2hhaW4sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIENoYWluKHByb2dyYW0pIHtcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgIH1cblxuICAgICAgQ2hhaW4ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb24ucGF1c2UodHJ1ZSk7XG4gICAgICAgIHJldHVybiBmcy5yZWFkRmlsZSh0aGlzLnByb2dyYW0sIGZ1bmN0aW9uKCRlcnIsICRkYXRhKSB7XG4gICAgICAgICAgaWYgKCRlcnIgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uLnByaW50bG4oJGVycik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHR5cGUgPSAkZGF0YS50eXBlO1xuICAgICAgICAgICAgbmFtZSA9ICRkYXRhLm5hbWU7XG4gICAgICAgICAgICBndyA9IHR5cGUgPT09IFZfR1dCQVNJQyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIGNoYWluKCRkYXRhLmRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY29uLnBhdXNlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBDaGFpbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiQ0hBSU4gXFxcIlwiICsgdGhpcy5wcm9ncmFtICsgXCJcXFwiXCI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ2hhaW47XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBDb206IENvbSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhDb20sIF9zdXBlcik7XG5cbiAgICAgIENvbS5wcm90b3R5cGUudHlwZSA9IFBIQVNFX1NDQU47XG5cbiAgICAgIGZ1bmN0aW9uIENvbSgkdmFycykge1xuICAgICAgICB0aGlzLnZhcnMgPSB1dGlsLmZsYXR0ZW4oJHZhcnMpO1xuICAgICAgfVxuXG4gICAgICBDb20ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHZhciwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgIF9yZWYgPSB0aGlzLnZhcnM7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICR2YXIgPSBfcmVmW19pXTtcbiAgICAgICAgICBpZiAoL1xcJCQvLnRlc3QoJHZhci5uYW1lKSkge1xuICAgICAgICAgICAgaWYgKGd3KSB7XG4gICAgICAgICAgICAgIGlmICgkdmFyLmRpbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nc1skdmFyLm5hbWVdID0gJyc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nc1skdmFyLm5hbWVdID0gZGltLmFwcGx5KG51bGwsIFsnJ10uY29uY2F0KF9fc2xpY2UuY2FsbCgkdmFyLmRpbXMpKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0cmluZ3NbJHZhci5uYW1lXSA9IEFycmF5KCR2YXIuZGltc1swXSArIDEpLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgY29tbW9uLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IDAsXG4gICAgICAgICAgICAgICAgbmFtZTogJHZhci5uYW1lXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoJHZhci5kaW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB2YXJpYWJsZXNbJHZhci5uYW1lXSA9IDA7XG4gICAgICAgICAgICAgIGNvbW1vbi5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxuICAgICAgICAgICAgICAgIG5hbWU6ICR2YXIubmFtZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFycmF5c1skdmFyLm5hbWVdID0gZGltLmFwcGx5KG51bGwsIFswXS5jb25jYXQoX19zbGljZS5jYWxsKCR2YXIuZGltcykpKTtcbiAgICAgICAgICAgICAgY29tbW9uLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IDIsXG4gICAgICAgICAgICAgICAgbmFtZTogJHZhci5uYW1lXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBDb20ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIkNPTSBcIiArICh0aGlzLnZhcnMuam9pbignLCAnKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29tO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgRGF0YTogRGF0YSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhEYXRhLCBfc3VwZXIpO1xuXG4gICAgICBEYXRhLnByb3RvdHlwZS50eXBlID0gUEhBU0VfU0NBTjtcblxuICAgICAgZnVuY3Rpb24gRGF0YSgkZGF0YSkge1xuICAgICAgICB0aGlzLmRhdGEgPSB1dGlsLmZsYXR0ZW4oJGRhdGEpO1xuICAgICAgfVxuXG4gICAgICBEYXRhLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICBkYXRhID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KHRoaXMuZGF0YSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIERhdGEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIkRBVEEgXCIgKyAodGhpcy5kYXRhLmpvaW4oJywgJykpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIERhdGE7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBEZWY6IERlZiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhEZWYsIF9zdXBlcik7XG5cbiAgICAgIERlZi5wcm90b3R5cGUudHlwZSA9IFBIQVNFX1NDQU47XG5cbiAgICAgIGZ1bmN0aW9uIERlZihuYW1lLCBwYXIsIGJvZHkpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5wYXIgPSBwYXI7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICB9XG5cbiAgICAgIERlZi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uc1t0aGlzLm5hbWVdID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCRwYXIpIHtcbiAgICAgICAgICAgIHZhciAkcmV0LCAkdG1wO1xuICAgICAgICAgICAgJHRtcCA9IHZhcmlhYmxlc1tfdGhpcy5wYXJdO1xuICAgICAgICAgICAgdmFyaWFibGVzW190aGlzLnBhcl0gPSAkcGFyO1xuICAgICAgICAgICAgJHJldCA9IF90aGlzLmJvZHlbXCJldmFsXCJdKCk7XG4gICAgICAgICAgICB2YXJpYWJsZXNbX3RoaXMucGFyXSA9ICR0bXA7XG4gICAgICAgICAgICByZXR1cm4gJHJldDtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgRGVmLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJERUYgXCIgKyB0aGlzLm5hbWUgKyBcIihcIiArIHRoaXMucGFyICsgXCIpID0gXCIgKyB0aGlzLmJvZHk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gRGVmO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgRGltOiBEaW0gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoRGltLCBfc3VwZXIpO1xuXG4gICAgICBEaW0ucHJvdG90eXBlLnR5cGUgPSBQSEFTRV9TQ0FOO1xuXG4gICAgICBmdW5jdGlvbiBEaW0oJHZhcnMpIHtcbiAgICAgICAgdGhpcy52YXJzID0gdXRpbC5mbGF0dGVuKCR2YXJzKTtcbiAgICAgIH1cblxuICAgICAgRGltLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICR2YXIsIF9pLCBfbGVuLCBfcmVmO1xuICAgICAgICBfcmVmID0gdGhpcy52YXJzO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAkdmFyID0gX3JlZltfaV07XG4gICAgICAgICAgaWYgKC9cXCQkLy50ZXN0KCR2YXIubmFtZSkpIHtcbiAgICAgICAgICAgIGlmIChndykge1xuICAgICAgICAgICAgICBpZiAoJHZhci5kaW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0cmluZ3NbJHZhci5uYW1lXSA9ICcnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0cmluZ3NbJHZhci5uYW1lXSA9IGRpbS5hcHBseShudWxsLCBbJyddLmNvbmNhdChfX3NsaWNlLmNhbGwoJHZhci5kaW1zKSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdHJpbmdzWyR2YXIubmFtZV0gPSBBcnJheSgkdmFyLmRpbXNbMF0gKyAxKS5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgkdmFyLmRpbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhcmlhYmxlc1skdmFyLm5hbWVdID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFycmF5c1skdmFyLm5hbWVdID0gZGltLmFwcGx5KG51bGwsIFswXS5jb25jYXQoX19zbGljZS5jYWxsKCR2YXIuZGltcykpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgRGltLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJESU0gXCIgKyAodGhpcy52YXJzLmpvaW4oJywgJykpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIERpbTtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIEVuZDogRW5kID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEVuZCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gRW5kKCkge1xuICAgICAgICByZXR1cm4gRW5kLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBFbmQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBlb3AgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBFbmQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIkVORFwiO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEVuZDtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIEVudGVyOiBFbnRlciA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhFbnRlciwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gRW50ZXIocG9ydCwgdGltZSwgc3RhdHVzLCBfdmFyKSB7XG4gICAgICAgIHZhciBfcmVmO1xuICAgICAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpc1tcInZhclwiXSA9IF92YXI7XG4gICAgICAgIGlmICh0aGlzW1widmFyXCJdID09IG51bGwpIHtcbiAgICAgICAgICBfcmVmID0gW251bGwsIHRoaXMucG9ydCwgdGhpcy50aW1lLCB0aGlzLnN0YXR1c10sIHRoaXMucG9ydCA9IF9yZWZbMF0sIHRoaXMudGltZSA9IF9yZWZbMV0sIHRoaXMuc3RhdHVzID0gX3JlZlsyXSwgdGhpc1tcInZhclwiXSA9IF9yZWZbM107XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgRW50ZXIucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb24uaW5wdXQoJycsIFt0aGlzW1widmFyXCJdXSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcblxuICAgICAgRW50ZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIkVOVEVSIFwiICsgdGhpcy5wb3J0ICsgXCIsIFwiICsgdGhpcy50aW1lICsgXCIsIFwiICsgdGhpcy5zdGF0dXMgKyBcIiwgXCIgKyB0aGlzW1widmFyXCJdO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEVudGVyO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgRm9yOiBGb3IgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoRm9yLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBGb3IoX3Zhciwgc3RhcnQsIGVuZCwgc3RlcCkge1xuICAgICAgICB0aGlzW1widmFyXCJdID0gX3ZhcjtcbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgICAgICB0aGlzLmVuZCA9IGVuZDtcbiAgICAgICAgdGhpcy5zdGVwID0gc3RlcCAhPSBudWxsID8gc3RlcCA6IG5ldyBDb25zdCgxKTtcbiAgICAgIH1cblxuICAgICAgRm9yLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyaWFibGVzW3RoaXNbXCJ2YXJcIl1dID0gdmFsdWVPZih0aGlzLnN0YXJ0KTtcbiAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgaWQ6IEZPUixcbiAgICAgICAgICBwYzogcGMsXG4gICAgICAgICAgbmFtZTogdGhpc1tcInZhclwiXSxcbiAgICAgICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgICAgICAgIHN0ZXA6IHRoaXMuc3RlcFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgRm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGVwID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIFwiRk9SIFwiICsgdGhpc1tcInZhclwiXSArIFwiID0gXCIgKyB0aGlzLnN0YXJ0ICsgXCIgVE8gXCIgKyB0aGlzLmVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCJGT1IgXCIgKyB0aGlzW1widmFyXCJdICsgXCIgPSBcIiArIHRoaXMuc3RhcnQgKyBcIiBUTyBcIiArIHRoaXMuZW5kICsgXCIgU1RFUCBcIiArIHRoaXMuc3RlcDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEZvcjtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIEdvdG86IEdvdG8gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoR290bywgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gR290byhsaW5lbm8sICRvZikge1xuICAgICAgICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgICAgICAgdGhpcy5vZiA9IHV0aWwuZmxhdHRlbigkb2YpO1xuICAgICAgfVxuXG4gICAgICBHb3RvLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRpbmRleDtcbiAgICAgICAgaWYgKHRoaXMub2YubGVuZ3RoID4gMCkge1xuICAgICAgICAgICRpbmRleCA9IHZhbHVlT2YodGhpcy5saW5lbm8pIC0gMTtcbiAgICAgICAgICBpZiAodGhpcy5vZlskaW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBjID0geHJmW3RoaXMub2ZbJGluZGV4XV07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBjID0geHJmW3BhcnNlSW50KHRoaXMubGluZW5vLCAxMCldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIEdvdG8ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm9mLmxlbmd0aCA+ICgwICE9IG51bGwpKSB7XG4gICAgICAgICAgcmV0dXJuIFwiR09UTyBcIiArIHRoaXMubGluZW5vICsgXCIgT0YgXCIgKyAodGhpcy5vZi5qb2luKCcsJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcIkdPVE8gXCIgKyB0aGlzLmxpbmVubztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEdvdG87XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBHb3N1YjogR29zdWIgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoR29zdWIsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIEdvc3ViKGxpbmVubywgJG9mKSB7XG4gICAgICAgIHRoaXMubGluZW5vID0gbGluZW5vO1xuICAgICAgICB0aGlzLm9mID0gdXRpbC5mbGF0dGVuKCRvZik7XG4gICAgICB9XG5cbiAgICAgIEdvc3ViLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgaWQ6IEdPU1VCLFxuICAgICAgICAgIHBjOiBwY1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEdvc3ViLl9fc3VwZXJfX1tcImV2YWxcIl0uY2FsbCh0aGlzKTtcbiAgICAgIH07XG5cbiAgICAgIEdvc3ViLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5vZi5sZW5ndGggPiAoMCAhPSBudWxsKSkge1xuICAgICAgICAgIHJldHVybiBcIkdPU1VCIFwiICsgdGhpcy5saW5lbm8gKyBcIiBPRiBcIiArICh0aGlzLm9mLmpvaW4oJywnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFwiR09TVUIgXCIgKyB0aGlzLmxpbmVubztcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEdvc3ViO1xuXG4gICAgfSkoR290byksXG4gICAgSWY6IElmID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKElmLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBJZihjb25kLCB0aGVuKSB7XG4gICAgICAgIHRoaXMuY29uZCA9IGNvbmQ7XG4gICAgICAgIHRoaXMudGhlbiA9IHRoZW47XG4gICAgICB9XG5cbiAgICAgIElmLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZFtcImV2YWxcIl0oKSkge1xuICAgICAgICAgIGlmICh0aGlzLnRoZW5bXCJldmFsXCJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbltcImV2YWxcIl0oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGMgPSB4cmZbcGFyc2VJbnQodGhpcy50aGVuLCAxMCldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBJZi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiSUYgXCIgKyB0aGlzLmNvbmQgKyBcIiBUSEVOIFwiICsgdGhpcy50aGVuO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIElmO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgSW1hZ2U6IEltYWdlID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEltYWdlLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBJbWFnZSgkZm9ybWF0KSB7XG4gICAgICAgIGlmICgkZm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAkZm9ybWF0ID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb3VyY2UgPSB1dGlsLmZsYXR0ZW4oJGZvcm1hdCk7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0KHRoaXMuc291cmNlKTtcbiAgICAgIH1cblxuICAgICAgSW1hZ2UucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBJbWFnZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiSU1BR0UgXCIgKyAodGhpcy5zb3VyY2Uuam9pbignJykpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEltYWdlO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgSW5wdXQ6IElucHV0ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKElucHV0LCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBJbnB1dCgkdmFycywgcHJvbXB0KSB7XG4gICAgICAgIHRoaXMucHJvbXB0ID0gcHJvbXB0O1xuICAgICAgICB0aGlzLnZhcnMgPSB1dGlsLmZsYXR0ZW4oJHZhcnMpO1xuICAgICAgfVxuXG4gICAgICBJbnB1dC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbi5pbnB1dCh0aGlzLnByb21wdCwgdGhpcy52YXJzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuXG4gICAgICBJbnB1dC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvbXB0ICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gXCJJTlBVVCBcIiArIHRoaXMucHJvbXB0ICsgXCIsIFwiICsgKHRoaXMudmFycy5qb2luKCcsJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcIklOUFVUIFwiICsgKHRoaXMudmFycy5qb2luKCcsJykpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gSW5wdXQ7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBMZXQ6IExldCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhMZXQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIExldCgkdmFycywgdmFsdWUpIHtcbiAgICAgICAgdmFyICR2YXIsIF9pLCBfbGVuLCBfcmVmO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmFycyA9IFtdO1xuICAgICAgICBfcmVmID0gdXRpbC5mbGF0dGVuKCR2YXJzKTtcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJHZhciA9IF9yZWZbX2ldO1xuICAgICAgICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mICR2YXIpIHtcbiAgICAgICAgICAgIHRoaXMudmFycy5wdXNoKG5ldyBWYXIoJHZhcikpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhcnMucHVzaCgkdmFyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgTGV0LnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICR2YWx1ZSwgJHZhciwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgICR2YWx1ZSA9IHZhbHVlT2YodGhpcy52YWx1ZSk7XG4gICAgICAgIF9yZWYgPSB0aGlzLnZhcnM7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICR2YXIgPSBfcmVmW19pXTtcbiAgICAgICAgICAkdmFyW1wibGV0XCJdKCR2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgTGV0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHMsICR2YXIsIF9pLCBfbGVuLCBfcmVmO1xuICAgICAgICAkcyA9ICcnO1xuICAgICAgICBfcmVmID0gdGhpcy52YXJzO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAkdmFyID0gX3JlZltfaV07XG4gICAgICAgICAgJHMgKz0gJHZhciArICcgPSAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIkxFVCBcIiArICRzICsgdGhpcy52YWx1ZTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBMZXQ7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBNYXQ6IE1hdCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhNYXQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE1hdChfdmFyLCB2YWx1ZSkge1xuICAgICAgICB0aGlzW1widmFyXCJdID0gX3ZhcjtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICBNYXQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGksICRqLCAkdmFsdWU7XG4gICAgICAgICR2YWx1ZSA9IHRoaXMudmFsdWVbXCJldmFsXCJdKCk7XG4gICAgICAgIGlmIChhcnJheXNbdGhpc1tcInZhclwiXV0gIT0gbnVsbCkge1xuICAgICAgICAgICRpID0gYXJyYXlzW3RoaXNbXCJ2YXJcIl1dLmxlbmd0aDtcbiAgICAgICAgICAkaiA9IGFycmF5c1t0aGlzW1widmFyXCJdXVtvZmZzZXRdLmxlbmd0aDtcbiAgICAgICAgICBhcnJheXNbdGhpc1tcInZhclwiXV0gPSBkaW0oJHZhbHVlLCAkaSwgJGopO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycmF5c1t0aGlzW1widmFyXCJdXSA9IGRpbSgkdmFsdWUsIDEwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTWF0O1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgTWF0UmVhZDogTWF0UmVhZCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhNYXRSZWFkLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBNYXRSZWFkKCR2YXJzKSB7XG4gICAgICAgIHRoaXMudmFycyA9IHV0aWwuZmxhdHRlbigkdmFycyk7XG4gICAgICB9XG5cbiAgICAgIE1hdFJlYWQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHZhciwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgIF9yZWYgPSB0aGlzLnZhcnM7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICR2YXIgPSBfcmVmW19pXTtcbiAgICAgICAgICBpZiAoZHAgPCBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgJHZhcltcImxldFwiXShkYXRhW2RwKytdLnZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHZhcltcImxldFwiXSh2b2lkIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBNYXRSZWFkLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJNQVQgUkVBRCBcIiArICh0aGlzLnZhcnMuam9pbignLCcpKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBNYXRSZWFkO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgTmV4dDogTmV4dCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhOZXh0LCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBOZXh0KF92YXIpIHtcbiAgICAgICAgdGhpc1tcInZhclwiXSA9IF92YXI7XG4gICAgICB9XG5cbiAgICAgIE5leHQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGNvdW50ZXIsICRmcmFtZSwgJG5hbWUsICRzdGVwO1xuICAgICAgICAkZnJhbWUgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKCRmcmFtZS5pZCAhPT0gRk9SKSB7XG4gICAgICAgICAgdGhyb3cgXCJOZXh0IHdpdGhvdXQgZm9yXCI7XG4gICAgICAgIH1cbiAgICAgICAgJG5hbWUgPSB0aGlzW1widmFyXCJdLm5hbWU7XG4gICAgICAgIGlmICgkZnJhbWUubmFtZSAhPT0gJG5hbWUpIHtcbiAgICAgICAgICB0aHJvdyBcIk1pc21hdGNoZWQgRm9yL05leHQgXCIgKyAkbmFtZTtcbiAgICAgICAgfVxuICAgICAgICAkc3RlcCA9IHZhbHVlT2YoJGZyYW1lLnN0ZXApO1xuICAgICAgICAkY291bnRlciA9IHRoaXNbXCJ2YXJcIl1bXCJldmFsXCJdKCkgKyAkc3RlcDtcbiAgICAgICAgdGhpc1tcInZhclwiXVtcImxldFwiXSgkY291bnRlcik7XG4gICAgICAgIGlmICgkc3RlcCA8IDApIHtcbiAgICAgICAgICBpZiAoJGNvdW50ZXIgPCB2YWx1ZU9mKCRmcmFtZS5lbmQpKSB7XG4gICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGMgPSAkZnJhbWUucGM7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgkY291bnRlciA+IHZhbHVlT2YoJGZyYW1lLmVuZCkpIHtcbiAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYyA9ICRmcmFtZS5wYztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgTmV4dC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiTkVYVCBcIiArIHRoaXNbXCJ2YXJcIl07XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTmV4dDtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIFByaW50OiBQcmludCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhQcmludCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gUHJpbnQoKSB7XG4gICAgICAgIHZhciAkaXRlbXM7XG4gICAgICAgICRpdGVtcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIHRoaXMuaXRlbXMgPSB1dGlsLmZsYXR0ZW4oWyRpdGVtc10pO1xuICAgICAgfVxuXG4gICAgICBQcmludC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkaXRlbSwgJHN0ciwgJHZhbCwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgICRzdHIgPSAnJztcbiAgICAgICAgX3JlZiA9IHRoaXMuaXRlbXM7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICRpdGVtID0gX3JlZltfaV07XG4gICAgICAgICAgJHN0ciArPSBpc05hTigkdmFsID0gdmFsdWVPZigkaXRlbSkpID8gJHZhbCA6ICcgJyArICR2YWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCRpdGVtID09PSBTZW1pYyB8fCAkaXRlbSA9PT0gQ29tbWEpIHtcbiAgICAgICAgICBjb24ucHJpbnQoJHN0cik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uLnByaW50bG4oJHN0cik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgUHJpbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkaXRlbSwgJHN0ciwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgICRzdHIgPSAnJztcbiAgICAgICAgX3JlZiA9IHRoaXMuaXRlbXM7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICRpdGVtID0gX3JlZltfaV07XG4gICAgICAgICAgJHN0ciArPSAkaXRlbS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlBSSU5UIFwiICsgJHN0cjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBQcmludDtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIFVzaW5nOiBVc2luZyA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhVc2luZywgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gVXNpbmcoKSB7XG4gICAgICAgIHZhciAkaXRlbXMsIGxpbmVubztcbiAgICAgICAgbGluZW5vID0gYXJndW1lbnRzWzBdLCAkaXRlbXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgICAgICAgdGhpcy5pdGVtcyA9IHV0aWwuZmxhdHRlbigkaXRlbXMpO1xuICAgICAgfVxuXG4gICAgICBVc2luZy5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkYXJncywgJGksICRpdGVtLCAkbGluZW5vLCAkc3RhdGVtZW50LCBfaSwgX2xlbiwgX3JlZiwgX3JlZjE7XG4gICAgICAgICRpID0geHJmW3RoaXMubGluZW5vXTtcbiAgICAgICAgX3JlZiA9IHByb2dbJGldLCAkbGluZW5vID0gX3JlZlswXSwgJHN0YXRlbWVudCA9IF9yZWZbMV07XG4gICAgICAgICRhcmdzID0gW107XG4gICAgICAgIF9yZWYxID0gdGhpcy5pdGVtcztcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICRpdGVtID0gX3JlZjFbX2ldO1xuICAgICAgICAgICRhcmdzLnB1c2godmFsdWVPZigkaXRlbSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkaXRlbSA9PT0gU2VtaWMgfHwgJGl0ZW0gPT09IENvbW1hKSB7XG4gICAgICAgICAgY29uLnByaW50KHV0aWwuc3ByaW50Zigkc3RhdGVtZW50LmNvZGUuZm9ybWF0LCAkYXJncykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbi5wcmludGxuKHV0aWwuc3ByaW50Zigkc3RhdGVtZW50LmNvZGUuZm9ybWF0LCAkYXJncykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIFVzaW5nLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGl0ZW0sICRzdHIsIF9pLCBfbGVuLCBfcmVmO1xuICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gXCJQUklOVCBVU0lORyBcIiArIHRoaXMubGluZW5vO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzdHIgPSAnJztcbiAgICAgICAgICBfcmVmID0gdGhpcy5pdGVtcztcbiAgICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAgICRpdGVtID0gX3JlZltfaV07XG4gICAgICAgICAgICAkc3RyICs9ICRpdGVtLnRvU3RyaW5nKCkgKyAnLCc7XG4gICAgICAgICAgfVxuICAgICAgICAgICRzdHIgPSAkc3RyLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICByZXR1cm4gXCJQUklOVCBVU0lORyBcIiArIHRoaXMubGluZW5vICsgXCI7XCIgKyAkc3RyO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gVXNpbmc7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBSYW5kb21pemU6IFJhbmRvbWl6ZSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhSYW5kb21pemUsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFJhbmRvbWl6ZSgpIHt9XG5cbiAgICAgIFJhbmRvbWl6ZS5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIFJhbmRvbWl6ZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiUkFORE9NSVpFXCI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUmFuZG9taXplO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgUmVhZDogUmVhZCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhSZWFkLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBSZWFkKCR2YXJzKSB7XG4gICAgICAgIHRoaXMudmFycyA9IHV0aWwuZmxhdHRlbigkdmFycyk7XG4gICAgICB9XG5cbiAgICAgIFJlYWQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHZhciwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgIF9yZWYgPSB0aGlzLnZhcnM7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICR2YXIgPSBfcmVmW19pXTtcbiAgICAgICAgICBpZiAoZHAgPCBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgJHZhcltcImxldFwiXShkYXRhW2RwKytdLnZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHZhcltcImxldFwiXSh2b2lkIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBSZWFkLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJSRUFEIFwiICsgKHRoaXMudmFycy5qb2luKCcsJykpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFJlYWQ7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBSZXN0b3JlOiBSZXN0b3JlID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFJlc3RvcmUsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFJlc3RvcmUobGluZW5vKSB7XG4gICAgICAgIHRoaXMubGluZW5vID0gbGluZW5vO1xuICAgICAgfVxuXG4gICAgICBSZXN0b3JlLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZHAgPSAwO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBSZXN0b3JlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5saW5lbm8gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBcIlJFU1RPUkUgXCIgKyB0aGlzLmxpbmVubztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCJSRVNUT1JFXCI7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBSZXN0b3JlO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgUmV0dXJuOiBSZXR1cm4gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoUmV0dXJuLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBSZXR1cm4oKSB7fVxuXG4gICAgICBSZXR1cm4ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGZyYW1lO1xuICAgICAgICAkZnJhbWUgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgd2hpbGUgKCRmcmFtZS5pZCAhPT0gR09TVUIpIHtcbiAgICAgICAgICAkZnJhbWUgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBwYyA9ICRmcmFtZS5wYztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgUmV0dXJuLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJSRVRVUk5cIjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBSZXR1cm47XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBSZW06IFJlbSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhSZW0sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFJlbSgkdGV4dCkge1xuICAgICAgICB0aGlzLnRleHQgPSAkdGV4dC5yZXBsYWNlKC9eUkVNL2ksICcnKTtcbiAgICAgIH1cblxuICAgICAgUmVtLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgUmVtLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJSRU1cIiArIHRoaXMudGV4dDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBSZW07XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBTdG9wOiBTdG9wID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFN0b3AsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFN0b3AoKSB7fVxuXG4gICAgICBTdG9wLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZW9wID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgU3RvcC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiU1RPUFwiO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFN0b3A7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBNYXg6IE1heCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhNYXgsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE1heCgpIHtcbiAgICAgICAgcmV0dXJuIE1heC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTWF4LnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbHVlT2YodGhpcy5sZWZ0KSwgdmFsdWVPZih0aGlzLnJpZ2h0KSk7XG4gICAgICB9O1xuXG4gICAgICBNYXgucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgTUFYIFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBNYXg7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgTWluOiBNaW4gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoTWluLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBNaW4oKSB7XG4gICAgICAgIHJldHVybiBNaW4uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIE1pbi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbih2YWx1ZU9mKHRoaXMubGVmdCksIHZhbHVlT2YodGhpcy5yaWdodCkpO1xuICAgICAgfTtcblxuICAgICAgTWluLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiIE1JTiBcIiArIHRoaXMucmlnaHQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTWluO1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIEFkZDogQWRkID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEFkZCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gQWRkKCkge1xuICAgICAgICByZXR1cm4gQWRkLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBBZGQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLmxlZnQpICsgdmFsdWVPZih0aGlzLnJpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIEFkZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLmxlZnQgKyBcIiArIFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBBZGQ7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgU3ViOiBTdWIgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoU3ViLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBTdWIoKSB7XG4gICAgICAgIHJldHVybiBTdWIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFN1Yi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMubGVmdCkgLSB2YWx1ZU9mKHRoaXMucmlnaHQpO1xuICAgICAgfTtcblxuICAgICAgU3ViLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiIC0gXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFN1YjtcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBNdWw6IE11bCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhNdWwsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE11bCgpIHtcbiAgICAgICAgcmV0dXJuIE11bC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTXVsLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlT2YodGhpcy5sZWZ0KSAqIHZhbHVlT2YodGhpcy5yaWdodCk7XG4gICAgICB9O1xuXG4gICAgICBNdWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgKiBcIiArIHRoaXMucmlnaHQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTXVsO1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIERpdjogRGl2ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKERpdiwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gRGl2KCkge1xuICAgICAgICByZXR1cm4gRGl2Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBEaXYucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLmxlZnQpIC8gdmFsdWVPZih0aGlzLnJpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIERpdi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLmxlZnQgKyBcIiAvIFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBEaXY7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgUG93OiBQb3cgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoUG93LCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBQb3coKSB7XG4gICAgICAgIHJldHVybiBQb3cuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFBvdy5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnBvdyh2YWx1ZU9mKHRoaXMubGVmdCksIHZhbHVlT2YodGhpcy5yaWdodCkpO1xuICAgICAgfTtcblxuICAgICAgUG93LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiIF4gXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFBvdztcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBPUjogT1IgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoT1IsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE9SKCkge1xuICAgICAgICByZXR1cm4gT1IuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIE9SLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlT2YodGhpcy5sZWZ0KSB8fCB2YWx1ZU9mKHRoaXMucmlnaHQpO1xuICAgICAgfTtcblxuICAgICAgT1IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgT1IgXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIE9SO1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIEFORDogQU5EID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEFORCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gQU5EKCkge1xuICAgICAgICByZXR1cm4gQU5ELl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBBTkQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLmxlZnQpICYmIHZhbHVlT2YodGhpcy5yaWdodCk7XG4gICAgICB9O1xuXG4gICAgICBBTkQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgQU5EIFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBBTkQ7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgTk9UOiBOT1QgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoTk9ULCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBOT1QoKSB7XG4gICAgICAgIHJldHVybiBOT1QuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIE5PVC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhdmFsdWVPZih0aGlzLmxlZnQpO1xuICAgICAgfTtcblxuICAgICAgTk9ULnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJOT1QgXCIgKyB0aGlzLmxlZnQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTk9UO1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIExUOiBMVCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhMVCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gTFQoKSB7XG4gICAgICAgIHJldHVybiBMVC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTFQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLmxlZnQpIDwgdmFsdWVPZih0aGlzLnJpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIExULnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiIDwgXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIExUO1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIEdUOiBHVCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhHVCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gR1QoKSB7XG4gICAgICAgIHJldHVybiBHVC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgR1QucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLmxlZnQpID4gdmFsdWVPZih0aGlzLnJpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIEdULnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiID4gXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEdUO1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIExFOiBMRSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhMRSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gTEUoKSB7XG4gICAgICAgIHJldHVybiBMRS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTEUucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLmxlZnQpIDw9IHZhbHVlT2YodGhpcy5yaWdodCk7XG4gICAgICB9O1xuXG4gICAgICBMRS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLmxlZnQgKyBcIiA8PSBcIiArIHRoaXMucmlnaHQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTEU7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgR0U6IEdFID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEdFLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBHRSgpIHtcbiAgICAgICAgcmV0dXJuIEdFLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBHRS5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMubGVmdCkgPj0gdmFsdWVPZih0aGlzLnJpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIEdFLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiID49IFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBHRTtcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBFUTogRVEgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoRVEsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIEVRKCkge1xuICAgICAgICByZXR1cm4gRVEuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIEVRLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHZhbHVlT2YodGhpcy5sZWZ0KSA9PT0gdmFsdWVPZih0aGlzLnJpZ2h0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgRVEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgPSBcIiArIHRoaXMucmlnaHQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gRVE7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgTkU6IE5FID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKE5FLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBORSgpIHtcbiAgICAgICAgcmV0dXJuIE5FLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBORS5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh2YWx1ZU9mKHRoaXMubGVmdCkgIT09IHZhbHVlT2YodGhpcy5yaWdodCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIE5FLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiIDw+IFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBORTtcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBGTjogRk4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICBmdW5jdGlvbiBGTihuYW1lLCBwYXJtKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucGFybSA9IHBhcm07XG4gICAgICB9XG5cbiAgICAgIEZOLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uc1t0aGlzLm5hbWVdKHZhbHVlT2YodGhpcy5wYXJtKSk7XG4gICAgICB9O1xuXG4gICAgICBGTi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLm5hbWUgKyBcIihcIiArIHRoaXMucGFybSArIFwiKVwiO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEZOO1xuXG4gICAgfSkoKSxcbiAgICBBQlM6IEFCUyA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhBQlMsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIEFCUygpIHtcbiAgICAgICAgcmV0dXJuIEFCUy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgQUJTLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHZhbHVlT2YodGhpcy4kMCkpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEFCUztcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIEFUTjogQVROID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEFUTiwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gQVROKCkge1xuICAgICAgICByZXR1cm4gQVROLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBBVE4ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuKHZhbHVlT2YodGhpcy4kMCkpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEFUTjtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIENPUzogQ09TID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKENPUywgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gQ09TKCkge1xuICAgICAgICByZXR1cm4gQ09TLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBDT1MucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5jb3ModmFsdWVPZih0aGlzLiQwKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ09TO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgRVhQOiBFWFAgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoRVhQLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBFWFAoKSB7XG4gICAgICAgIHJldHVybiBFWFAuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIEVYUC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmV4cCh2YWx1ZU9mKHRoaXMuJDApKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBFWFA7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBJTlQ6IElOVCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhJTlQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIElOVCgpIHtcbiAgICAgICAgcmV0dXJuIElOVC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgSU5ULnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodmFsdWVPZih0aGlzLiQwKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gSU5UO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgTEVOOiBMRU4gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoTEVOLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBMRU4oKSB7XG4gICAgICAgIHJldHVybiBMRU4uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIExFTi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMuJDApLmxlbmd0aDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBMRU47XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBMSU46IExJTiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhMSU4sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIExJTigpIHtcbiAgICAgICAgcmV0dXJuIExJTi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTElOLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5KE1hdGguYWJzKHZhbHVlT2YodGhpcy4kMCkpICsgMSkuam9pbignXFxuJyk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTElOO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgTE9HOiBMT0cgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoTE9HLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBMT0coKSB7XG4gICAgICAgIHJldHVybiBMT0cuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIExPRy5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmxvZyh2YWx1ZU9mKHRoaXMuJDApKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBMT0c7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBSTkQ6IFJORCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhSTkQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFJORCgpIHtcbiAgICAgICAgcmV0dXJuIFJORC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgUk5ELnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUk5EO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgU0dOOiBTR04gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoU0dOLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBTR04oKSB7XG4gICAgICAgIHJldHVybiBTR04uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFNHTi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkMDtcbiAgICAgICAgJDAgPSB2YWx1ZU9mKHRoaXMuJDApO1xuICAgICAgICBpZiAoJDAgPCAwKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKCQwID4gMCkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gU0dOO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgU0lOOiBTSU4gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoU0lOLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBTSU4oKSB7XG4gICAgICAgIHJldHVybiBTSU4uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFNJTi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNpbih2YWx1ZU9mKHRoaXMuJDApKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBTSU47XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBTUEE6IFNQQSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhTUEEsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFNQQSgpIHtcbiAgICAgICAgcmV0dXJuIFNQQS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgU1BBLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5KHZhbHVlT2YodGhpcy4kMCkpLmpvaW4oXCIgXCIpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFNQQTtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIFNRUjogU1FSID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFNRUiwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gU1FSKCkge1xuICAgICAgICByZXR1cm4gU1FSLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBTUVIucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHZhbHVlT2YodGhpcy4kMCkpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFNRUjtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIFRBQjogVEFCID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFRBQiwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gVEFCKCkge1xuICAgICAgICByZXR1cm4gVEFCLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBUQUIucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkoTWF0aC5mbG9vcih2YWx1ZU9mKHRoaXMuJDApKSkuam9pbihcIiBcIik7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gVEFCO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgVEFOOiBUQU4gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoVEFOLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBUQU4oKSB7XG4gICAgICAgIHJldHVybiBUQU4uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFRBTi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnRhbih2YWx1ZU9mKHRoaXMuJDApKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBUQU47XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBUSU06IFRJTSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhUSU0sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFRJTSgpIHtcbiAgICAgICAgcmV0dXJuIFRJTS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgVElNLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHZhbHVlT2YodGhpcy4kMCkgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkpLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFRJTTtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIExDQVNFOiBMQ0FTRSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhMQ0FTRSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gTENBU0UoKSB7XG4gICAgICAgIHJldHVybiBMQ0FTRS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTENBU0UucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLiQwKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgfTtcblxuICAgICAgTENBU0UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIkxDQVNFKFwiICsgdGhpcy4kMCArIFwiLCBcIiArIHRoaXMuJDEgKyBcIiwgXCIgKyB0aGlzLiQyICsgXCIpXCI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTENBU0U7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBMRUZUOiBMRUZUID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKExFRlQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIExFRlQoKSB7XG4gICAgICAgIHJldHVybiBMRUZULl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBMRUZULnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlT2YodGhpcy4kMCkuc3Vic3RyKDAsIHZhbHVlT2YodGhpcy4kMSkgLSAxKTtcbiAgICAgIH07XG5cbiAgICAgIExFRlQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIkxFRlQoXCIgKyB0aGlzLiQwICsgXCIsIFwiICsgdGhpcy4kMSArIFwiLCBcIiArIHRoaXMuJDIgKyBcIilcIjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBMRUZUO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgTUlEOiBNSUQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoTUlELCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBNSUQoKSB7XG4gICAgICAgIHJldHVybiBNSUQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIE1JRC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMuJDApLnN1YnN0cmluZyh2YWx1ZU9mKHRoaXMuJDEpLCB2YWx1ZU9mKHRoaXMuJDIpKTtcbiAgICAgIH07XG5cbiAgICAgIE1JRC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiTUlEKFwiICsgdGhpcy4kMCArIFwiLCBcIiArIHRoaXMuJDEgKyBcIiwgXCIgKyB0aGlzLiQyICsgXCIpXCI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTUlEO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgUklHSFQ6IFJJR0hUID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFJJR0hULCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBSSUdIVCgpIHtcbiAgICAgICAgcmV0dXJuIFJJR0hULl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBSSUdIVC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMuJDApLnN1YnN0cih2YWx1ZU9mKHRoaXMuJDEpIC0gMSk7XG4gICAgICB9O1xuXG4gICAgICBSSUdIVC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiUklHSFQoXCIgKyB0aGlzLiQwICsgXCIsIFwiICsgdGhpcy4kMSArIFwiLCBcIiArIHRoaXMuJDIgKyBcIilcIjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBSSUdIVDtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIFNVQlNUUjogU1VCU1RSID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFNVQlNUUiwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gU1VCU1RSKCkge1xuICAgICAgICByZXR1cm4gU1VCU1RSLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBTVUJTVFIucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLiQwKS5zdWJzdHIodmFsdWVPZih0aGlzLiQxKSAtIDEsIHZhbHVlT2YodGhpcy4kMikpO1xuICAgICAgfTtcblxuICAgICAgU1VCU1RSLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJTVUJTVFIoXCIgKyB0aGlzLiQwICsgXCIsIFwiICsgdGhpcy4kMSArIFwiLCBcIiArIHRoaXMuJDIgKyBcIilcIjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBTVUJTVFI7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBVQ0FTRTogVUNBU0UgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoVUNBU0UsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFVDQVNFKCkge1xuICAgICAgICByZXR1cm4gVUNBU0UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFVDQVNFLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlT2YodGhpcy4kMCkudG9VcHBlckNhc2UoKTtcbiAgICAgIH07XG5cbiAgICAgIFVDQVNFLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJVQ0FTRShcIiArIHRoaXMuJDAgKyBcIiwgXCIgKyB0aGlzLiQxICsgXCIsIFwiICsgdGhpcy4kMiArIFwiKVwiO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFVDQVNFO1xuXG4gICAgfSkoQnVpbHRJbilcbiAgfVxufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qIHBhcnNlciBnZW5lcmF0ZWQgYnkgamlzb24gMC40LjE1ICovXG4vKlxuICBSZXR1cm5zIGEgUGFyc2VyIG9iamVjdCBvZiB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcblxuICBQYXJzZXI6IHtcbiAgICB5eToge31cbiAgfVxuXG4gIFBhcnNlci5wcm90b3R5cGU6IHtcbiAgICB5eToge30sXG4gICAgdHJhY2U6IGZ1bmN0aW9uKCksXG4gICAgc3ltYm9sc186IHthc3NvY2lhdGl2ZSBsaXN0OiBuYW1lID09PiBudW1iZXJ9LFxuICAgIHRlcm1pbmFsc186IHthc3NvY2lhdGl2ZSBsaXN0OiBudW1iZXIgPT0+IG5hbWV9LFxuICAgIHByb2R1Y3Rpb25zXzogWy4uLl0sXG4gICAgcGVyZm9ybUFjdGlvbjogZnVuY3Rpb24gYW5vbnltb3VzKHl5dGV4dCwgeXlsZW5nLCB5eWxpbmVubywgeXksIHl5c3RhdGUsICQkLCBfJCksXG4gICAgdGFibGU6IFsuLi5dLFxuICAgIGRlZmF1bHRBY3Rpb25zOiB7Li4ufSxcbiAgICBwYXJzZUVycm9yOiBmdW5jdGlvbihzdHIsIGhhc2gpLFxuICAgIHBhcnNlOiBmdW5jdGlvbihpbnB1dCksXG5cbiAgICBsZXhlcjoge1xuICAgICAgICBFT0Y6IDEsXG4gICAgICAgIHBhcnNlRXJyb3I6IGZ1bmN0aW9uKHN0ciwgaGFzaCksXG4gICAgICAgIHNldElucHV0OiBmdW5jdGlvbihpbnB1dCksXG4gICAgICAgIGlucHV0OiBmdW5jdGlvbigpLFxuICAgICAgICB1bnB1dDogZnVuY3Rpb24oc3RyKSxcbiAgICAgICAgbW9yZTogZnVuY3Rpb24oKSxcbiAgICAgICAgbGVzczogZnVuY3Rpb24obiksXG4gICAgICAgIHBhc3RJbnB1dDogZnVuY3Rpb24oKSxcbiAgICAgICAgdXBjb21pbmdJbnB1dDogZnVuY3Rpb24oKSxcbiAgICAgICAgc2hvd1Bvc2l0aW9uOiBmdW5jdGlvbigpLFxuICAgICAgICB0ZXN0X21hdGNoOiBmdW5jdGlvbihyZWdleF9tYXRjaF9hcnJheSwgcnVsZV9pbmRleCksXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKCksXG4gICAgICAgIGxleDogZnVuY3Rpb24oKSxcbiAgICAgICAgYmVnaW46IGZ1bmN0aW9uKGNvbmRpdGlvbiksXG4gICAgICAgIHBvcFN0YXRlOiBmdW5jdGlvbigpLFxuICAgICAgICBfY3VycmVudFJ1bGVzOiBmdW5jdGlvbigpLFxuICAgICAgICB0b3BTdGF0ZTogZnVuY3Rpb24oKSxcbiAgICAgICAgcHVzaFN0YXRlOiBmdW5jdGlvbihjb25kaXRpb24pLFxuXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHJhbmdlczogYm9vbGVhbiAgICAgICAgICAgKG9wdGlvbmFsOiB0cnVlID09PiB0b2tlbiBsb2NhdGlvbiBpbmZvIHdpbGwgaW5jbHVkZSBhIC5yYW5nZVtdIG1lbWJlcilcbiAgICAgICAgICAgIGZsZXg6IGJvb2xlYW4gICAgICAgICAgICAgKG9wdGlvbmFsOiB0cnVlID09PiBmbGV4LWxpa2UgbGV4aW5nIGJlaGF2aW91ciB3aGVyZSB0aGUgcnVsZXMgYXJlIHRlc3RlZCBleGhhdXN0aXZlbHkgdG8gZmluZCB0aGUgbG9uZ2VzdCBtYXRjaClcbiAgICAgICAgICAgIGJhY2t0cmFja19sZXhlcjogYm9vbGVhbiAgKG9wdGlvbmFsOiB0cnVlID09PiBsZXhlciByZWdleGVzIGFyZSB0ZXN0ZWQgaW4gb3JkZXIgYW5kIGZvciBlYWNoIG1hdGNoaW5nIHJlZ2V4IHRoZSBhY3Rpb24gY29kZSBpcyBpbnZva2VkOyB0aGUgbGV4ZXIgdGVybWluYXRlcyB0aGUgc2NhbiB3aGVuIGEgdG9rZW4gaXMgcmV0dXJuZWQgYnkgdGhlIGFjdGlvbiBjb2RlKVxuICAgICAgICB9LFxuXG4gICAgICAgIHBlcmZvcm1BY3Rpb246IGZ1bmN0aW9uKHl5LCB5eV8sICRhdm9pZGluZ19uYW1lX2NvbGxpc2lvbnMsIFlZX1NUQVJUKSxcbiAgICAgICAgcnVsZXM6IFsuLi5dLFxuICAgICAgICBjb25kaXRpb25zOiB7YXNzb2NpYXRpdmUgbGlzdDogbmFtZSA9PT4gc2V0fSxcbiAgICB9XG4gIH1cblxuXG4gIHRva2VuIGxvY2F0aW9uIGluZm8gKEAkLCBfJCwgZXRjLik6IHtcbiAgICBmaXJzdF9saW5lOiBuLFxuICAgIGxhc3RfbGluZTogbixcbiAgICBmaXJzdF9jb2x1bW46IG4sXG4gICAgbGFzdF9jb2x1bW46IG4sXG4gICAgcmFuZ2U6IFtzdGFydF9udW1iZXIsIGVuZF9udW1iZXJdICAgICAgICh3aGVyZSB0aGUgbnVtYmVycyBhcmUgaW5kZXhlcyBpbnRvIHRoZSBpbnB1dCBzdHJpbmcsIHJlZ3VsYXIgemVyby1iYXNlZClcbiAgfVxuXG5cbiAgdGhlIHBhcnNlRXJyb3IgZnVuY3Rpb24gcmVjZWl2ZXMgYSAnaGFzaCcgb2JqZWN0IHdpdGggdGhlc2UgbWVtYmVycyBmb3IgbGV4ZXIgYW5kIHBhcnNlciBlcnJvcnM6IHtcbiAgICB0ZXh0OiAgICAgICAgKG1hdGNoZWQgdGV4dClcbiAgICB0b2tlbjogICAgICAgKHRoZSBwcm9kdWNlZCB0ZXJtaW5hbCB0b2tlbiwgaWYgYW55KVxuICAgIGxpbmU6ICAgICAgICAoeXlsaW5lbm8pXG4gIH1cbiAgd2hpbGUgcGFyc2VyIChncmFtbWFyKSBlcnJvcnMgd2lsbCBhbHNvIHByb3ZpZGUgdGhlc2UgbWVtYmVycywgaS5lLiBwYXJzZXIgZXJyb3JzIGRlbGl2ZXIgYSBzdXBlcnNldCBvZiBhdHRyaWJ1dGVzOiB7XG4gICAgbG9jOiAgICAgICAgICh5eWxsb2MpXG4gICAgZXhwZWN0ZWQ6ICAgIChzdHJpbmcgZGVzY3JpYmluZyB0aGUgc2V0IG9mIGV4cGVjdGVkIHRva2VucylcbiAgICByZWNvdmVyYWJsZTogKGJvb2xlYW46IFRSVUUgd2hlbiB0aGUgcGFyc2VyIGhhcyBhIGVycm9yIHJlY292ZXJ5IHJ1bGUgYXZhaWxhYmxlIGZvciB0aGlzIHBhcnRpY3VsYXIgZXJyb3IpXG4gIH1cbiovXG52YXIgcGFyc2VyID0gKGZ1bmN0aW9uKCl7XG52YXIgbz1mdW5jdGlvbihrLHYsbyxsKXtmb3Iobz1vfHx7fSxsPWsubGVuZ3RoO2wtLTtvW2tbbF1dPXYpO3JldHVybiBvfSwkVjA9WzEsMzFdLCRWMT1bMSwzMl0sJFYyPVsxLDMzXSwkVjM9WzEsMzRdLCRWND1bMSwzNV0sJFY1PVsxLDU3XSwkVjY9WzEsMzZdLCRWNz1bMSwzN10sJFY4PVsxLDM4XSwkVjk9WzEsMzldLCRWYT1bMSw0MF0sJFZiPVsxLDQxXSwkVmM9WzEsNDJdLCRWZD1bMSw0M10sJFZlPVsxLDQ0XSwkVmY9WzEsNDVdLCRWZz1bMSw0Nl0sJFZoPVsxLDQ4XSwkVmk9WzEsNTJdLCRWaj1bMSw0OV0sJFZrPVsxLDUwXSwkVmw9WzEsNTFdLCRWbT1bMSw1M10sJFZuPVsxLDU0XSwkVm89WzEsNTVdLCRWcD1bMSw1Nl0sJFZxPVs2LDEwLDM1LDM4LDM5LDQxLDQzLDQ1LDQ4LDQ5LDUwLDUzLDU2LDU3LDYwLDYxLDYzLDY1LDY3LDY5LDcwLDczLDc0LDc5LDgwLDgxLDgyLDgzXSwkVnI9WzEsNzBdLCRWcz1bMSw3M10sJFZ0PVsxLDc0XSwkVnU9WzEsNzVdLCRWdj1bMSw4Nl0sJFZ3PVsxLDg4XSwkVng9WzEsODddLCRWeT1bMSw4NF0sJFZ6PVsxLDg1XSwkVkE9WzEsODldLCRWQj1bMSw5MF0sJFZDPVsxLDkxXSwkVkQ9WzEsOTJdLCRWRT1bMSw5M10sJFZGPVsxLDk0XSwkVkc9WzEsOTVdLCRWSD1bMSw5Nl0sJFZJPVsxLDk3XSwkVko9WzEsOThdLCRWSz1bMSw5OV0sJFZMPVsxLDEwMF0sJFZNPVsxLDEwMV0sJFZOPVsxLDEwMl0sJFZPPVsxLDEwM10sJFZQPVsxLDEwNF0sJFZRPVsxLDEwNV0sJFZSPVsxLDEwNl0sJFZTPVsxLDEwN10sJFZUPVsxLDEwOF0sJFZVPVsxLDEwOV0sJFZWPVsxLDExMF0sJFZXPVsxLDEyMF0sJFZYPVsxLDExN10sJFZZPVsxLDEyMV0sJFZaPVsxLDEyNV0sJFZfPVsxLDEyOF0sJFYkPVsxLDE0M10sJFYwMT1bNSw1Ml0sJFYxMT1bNSwzNyw1Miw1NCw1NSw1Nyw1OCw2Miw3OCw4NCw4NSw4Nyw4OCw4OSw5MCw5MSw5Miw5Myw5NCw5NSw5Niw5Nyw5OCw5OSwxMDJdLCRWMjE9WzIsMTE3XSwkVjMxPVs1OCw4NCw4NSw4Nyw4OCw4OSw5MCw5MSw5Miw5Myw5NCw5NSw5Niw5Nyw5OCw5OV0sJFY0MT1bMSwxNTNdLCRWNTE9WzEsMTU0XSwkVjYxPVsxLDE1NV0sJFY3MT1bMSwxNTZdLCRWODE9WzEsMTU3XSwkVjkxPVsxLDE1OF0sJFZhMT1bMSwxNTldLCRWYjE9WzEsMTYwXSwkVmMxPVsxLDE2MV0sJFZkMT1bMSwxNjJdLCRWZTE9WzEsMTYzXSwkVmYxPVsxLDE2NF0sJFZnMT1bMSwxNjVdLCRWaDE9WzEsMTY2XSwkVmkxPVsxLDE2N10sJFZqMT1bMiw5MF0sJFZrMT1bMSwxOTldLCRWbDE9WzUsMzcsNTJdLCRWbTE9WzEsMjAyXSwkVm4xPVs1LDg0LDg1LDg3LDg4LDg5LDkwLDkxLDkyLDkzLDk0LDk1LDk2LDk3LDk4LDk5XSwkVm8xPVs1LDUyLDc4XSwkVnAxPVsxMCwxMiwzNiw0NCw0NSw4Niw5NiwxMDMsMTA0LDEwNSwxMDYsMTA3LDEwOCwxMDksMTEwLDExMSwxMTIsMTEzLDExNCwxMTUsMTE2LDExNywxMTgsMTE5LDEyMCwxMjEsMTIyLDEyMywxMjQsMTI2XSwkVnExPVsxLDIyMl0sJFZyMT1bNSwzNyw1Miw1NCw1NSw1Nyw1OCw2Miw3OCw4NCw4NSw4Nyw4OCw4OSw5MCw5MSw5MiwxMDJdLCRWczE9WzUsMTAsMTIsMzYsNDQsNDUsODYsOTYsMTAzLDEwNCwxMDUsMTA2LDEwNywxMDgsMTA5LDExMCwxMTEsMTEyLDExMywxMTQsMTE1LDExNiwxMTcsMTE4LDExOSwxMjAsMTIxLDEyMiwxMjMsMTI0LDEyNl0sJFZ0MT1bMSwyODhdLCRWdTE9WzM3LDUyLDEwMl0sJFZ2MT1bMSwyOTFdLCRWdzE9WzUsMzcsNTIsMTAyXSwkVngxPVs1LDM3LDUyLDU0LDU1LDU3LDU4LDYyLDc4LDg0LDg1LDg3LDg4LDg5LDkwLDkxLDkyLDkzLDk0LDEwMl0sJFZ5MT1bNSwzNyw1Miw1NCw1NSw1Nyw1OCw2Miw3OCw4NCw4NSw4Nyw4OCw4OSw5MCw5MSw5Miw5Myw5NCw5NSw5NiwxMDJdLCRWejE9WzUsMzcsNTIsNTQsNTUsNTcsNTgsNjIsNzgsODQsODUsODcsODgsODksOTAsOTEsOTIsOTMsOTQsOTUsOTYsOTcsOTgsMTAyXSwkVkExPVsyLDkxXSwkVkIxPVsyLDkyXTtcbnZhciBwYXJzZXIgPSB7dHJhY2U6IGZ1bmN0aW9uIHRyYWNlKCkgeyB9LFxueXk6IHt9LFxuc3ltYm9sc186IHtcImVycm9yXCI6MixcIlByb2dyYW1cIjozLFwiQ29tbWFuZFwiOjQsXCJORVdMSU5FXCI6NSxcIkVPRlwiOjYsXCJMaW5lc1wiOjcsXCJMaW5lXCI6OCxcIlN0YXRlbWVudFwiOjksXCJJTlRFR0VSXCI6MTAsXCJBVEFSSVwiOjExLFwiU1RSSU5HXCI6MTIsXCJDTFNcIjoxMyxcIkdXQkFTSUNcIjoxNCxcIlRST05cIjoxNSxcIlRST0ZGXCI6MTYsXCJBUFBFTkRcIjoxNyxcIkNBVEFMT0dcIjoxOCxcIkRFTEVURVwiOjE5LFwiRElSXCI6MjAsXCJFWEVDVVRFXCI6MjEsXCJGSUxFU1wiOjIyLFwiR0VUXCI6MjMsXCJHUk9VUFwiOjI0LFwiTElCUkFSWVwiOjI1LFwiTElTVFwiOjI2LFwiTkFNRVwiOjI3LFwiUFVSR0VcIjoyOCxcIlJFTlVNQkVSXCI6MjksXCJRVUlUXCI6MzAsXCJSVU5cIjozMSxcIlNBVkVcIjozMixcIlNDUkFUQ0hcIjozMyxcIlRFU1RcIjozNCxcIkJBU0VcIjozNSxcIihcIjozNixcIilcIjozNyxcIkNIQUlOXCI6MzgsXCJDT01cIjozOSxcIkRpbUxpc3RcIjo0MCxcIkRBVEFcIjo0MSxcIkNvbnN0YW50TGlzdFwiOjQyLFwiREVGXCI6NDMsXCJGTkRcIjo0NCxcIlZBUlwiOjQ1LFwiPVwiOjQ2LFwiRXhwcmVzc2lvblwiOjQ3LFwiRElNXCI6NDgsXCJFTkRcIjo0OSxcIkVOVEVSXCI6NTAsXCJQT1JUXCI6NTEsXCIsXCI6NTIsXCJGT1JcIjo1MyxcIlRPXCI6NTQsXCJTVEVQXCI6NTUsXCJHT1wiOjU2LFwiR09UT1wiOjU3LFwiT0ZcIjo1OCxcIkludGVnZXJMaXN0XCI6NTksXCJHT1NVQlwiOjYwLFwiSUZcIjo2MSxcIlRIRU5cIjo2MixcIklNQUdFXCI6NjMsXCJJbWFnZUxpc3RcIjo2NCxcIklOUFVUXCI6NjUsXCJWYXJMaXN0XCI6NjYsXCJMRVRcIjo2NyxcIkxldExpc3RcIjo2OCxcIk1BVFwiOjY5LFwiUkVBRFwiOjcwLFwiWkVSXCI6NzEsXCJDT05cIjo3MixcIk5FWFRcIjo3MyxcIlBSSU5UXCI6NzQsXCJQcmludExpc3RcIjo3NSxcIlByaW50U2VwXCI6NzYsXCJVU0lOR1wiOjc3LFwiO1wiOjc4LFwiUkFORE9NSVpFXCI6NzksXCJSRVNUT1JFXCI6ODAsXCJSRVRVUk5cIjo4MSxcIlJFTVwiOjgyLFwiU1RPUFwiOjgzLFwiT1JcIjo4NCxcIkFORFwiOjg1LFwiTk9UXCI6ODYsXCJFUVwiOjg3LFwiTkVcIjo4OCxcIj5cIjo4OSxcIkdFXCI6OTAsXCI8XCI6OTEsXCJMRVwiOjkyLFwiTUFYXCI6OTMsXCJNSU5cIjo5NCxcIitcIjo5NSxcIi1cIjo5NixcIipcIjo5NyxcIi9cIjo5OCxcIl5cIjo5OSxcIltcIjoxMDAsXCJFeHByZXNzaW9uTGlzdFwiOjEwMSxcIl1cIjoxMDIsXCJBQlNcIjoxMDMsXCJBVE5cIjoxMDQsXCJDT1NcIjoxMDUsXCJFWFBcIjoxMDYsXCJJTlRcIjoxMDcsXCJMRU5cIjoxMDgsXCJMSU5cIjoxMDksXCJMT0dcIjoxMTAsXCJSTkRcIjoxMTEsXCJTR05cIjoxMTIsXCJTSU5cIjoxMTMsXCJTUEFcIjoxMTQsXCJTUVJcIjoxMTUsXCJUQUJcIjoxMTYsXCJUQU5cIjoxMTcsXCJUSU1cIjoxMTgsXCJMQ0FTRVwiOjExOSxcIkxFRlRcIjoxMjAsXCJNSURcIjoxMjEsXCJSSUdIVFwiOjEyMixcIlNVQlNUUlwiOjEyMyxcIlVDQVNFXCI6MTI0LFwiQ29uc3RhbnRcIjoxMjUsXCJOVU1CRVJcIjoxMjYsXCJEaW1cIjoxMjcsXCJWYXJJdGVtXCI6MTI4LFwiSW1hZ2VJdGVtXCI6MTI5LFwiSW1hZ2VNYXNrXCI6MTMwLFwiSW1hZ2VNYXNrSXRlbVwiOjEzMSxcIiRhY2NlcHRcIjowLFwiJGVuZFwiOjF9LFxudGVybWluYWxzXzogezI6XCJlcnJvclwiLDU6XCJORVdMSU5FXCIsNjpcIkVPRlwiLDEwOlwiSU5URUdFUlwiLDExOlwiQVRBUklcIiwxMjpcIlNUUklOR1wiLDEzOlwiQ0xTXCIsMTQ6XCJHV0JBU0lDXCIsMTU6XCJUUk9OXCIsMTY6XCJUUk9GRlwiLDE3OlwiQVBQRU5EXCIsMTg6XCJDQVRBTE9HXCIsMTk6XCJERUxFVEVcIiwyMDpcIkRJUlwiLDIxOlwiRVhFQ1VURVwiLDIyOlwiRklMRVNcIiwyMzpcIkdFVFwiLDI0OlwiR1JPVVBcIiwyNTpcIkxJQlJBUllcIiwyNjpcIkxJU1RcIiwyNzpcIk5BTUVcIiwyODpcIlBVUkdFXCIsMjk6XCJSRU5VTUJFUlwiLDMwOlwiUVVJVFwiLDMxOlwiUlVOXCIsMzI6XCJTQVZFXCIsMzM6XCJTQ1JBVENIXCIsMzQ6XCJURVNUXCIsMzU6XCJCQVNFXCIsMzY6XCIoXCIsMzc6XCIpXCIsMzg6XCJDSEFJTlwiLDM5OlwiQ09NXCIsNDE6XCJEQVRBXCIsNDM6XCJERUZcIiw0NDpcIkZORFwiLDQ1OlwiVkFSXCIsNDY6XCI9XCIsNDg6XCJESU1cIiw0OTpcIkVORFwiLDUwOlwiRU5URVJcIiw1MTpcIlBPUlRcIiw1MjpcIixcIiw1MzpcIkZPUlwiLDU0OlwiVE9cIiw1NTpcIlNURVBcIiw1NjpcIkdPXCIsNTc6XCJHT1RPXCIsNTg6XCJPRlwiLDYwOlwiR09TVUJcIiw2MTpcIklGXCIsNjI6XCJUSEVOXCIsNjM6XCJJTUFHRVwiLDY1OlwiSU5QVVRcIiw2NzpcIkxFVFwiLDY5OlwiTUFUXCIsNzA6XCJSRUFEXCIsNzE6XCJaRVJcIiw3MjpcIkNPTlwiLDczOlwiTkVYVFwiLDc0OlwiUFJJTlRcIiw3NzpcIlVTSU5HXCIsNzg6XCI7XCIsNzk6XCJSQU5ET01JWkVcIiw4MDpcIlJFU1RPUkVcIiw4MTpcIlJFVFVSTlwiLDgyOlwiUkVNXCIsODM6XCJTVE9QXCIsODQ6XCJPUlwiLDg1OlwiQU5EXCIsODY6XCJOT1RcIiw4NzpcIkVRXCIsODg6XCJORVwiLDg5OlwiPlwiLDkwOlwiR0VcIiw5MTpcIjxcIiw5MjpcIkxFXCIsOTM6XCJNQVhcIiw5NDpcIk1JTlwiLDk1OlwiK1wiLDk2OlwiLVwiLDk3OlwiKlwiLDk4OlwiL1wiLDk5OlwiXlwiLDEwMDpcIltcIiwxMDI6XCJdXCIsMTAzOlwiQUJTXCIsMTA0OlwiQVROXCIsMTA1OlwiQ09TXCIsMTA2OlwiRVhQXCIsMTA3OlwiSU5UXCIsMTA4OlwiTEVOXCIsMTA5OlwiTElOXCIsMTEwOlwiTE9HXCIsMTExOlwiUk5EXCIsMTEyOlwiU0dOXCIsMTEzOlwiU0lOXCIsMTE0OlwiU1BBXCIsMTE1OlwiU1FSXCIsMTE2OlwiVEFCXCIsMTE3OlwiVEFOXCIsMTE4OlwiVElNXCIsMTE5OlwiTENBU0VcIiwxMjA6XCJMRUZUXCIsMTIxOlwiTUlEXCIsMTIyOlwiUklHSFRcIiwxMjM6XCJTVUJTVFJcIiwxMjQ6XCJVQ0FTRVwiLDEyNjpcIk5VTUJFUlwifSxcbnByb2R1Y3Rpb25zXzogWzAsWzMsM10sWzMsMl0sWzcsM10sWzcsMl0sWzcsMV0sWzgsMV0sWzgsMl0sWzQsMl0sWzQsMV0sWzQsMl0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzksNF0sWzksMl0sWzksMl0sWzksMl0sWzksN10sWzksMl0sWzksMV0sWzksOF0sWzksNl0sWzksOF0sWzksNl0sWzksM10sWzksMl0sWzksNF0sWzksMl0sWzksNF0sWzksNF0sWzksNF0sWzksNF0sWzksMl0sWzksMl0sWzksNF0sWzksM10sWzksMl0sWzksM10sWzksNF0sWzksNF0sWzksMl0sWzksM10sWzksMl0sWzksMV0sWzksNV0sWzksM10sWzksMV0sWzksMl0sWzksMV0sWzksMl0sWzksMV0sWzksMV0sWzksMV0sWzQ3LDNdLFs0NywzXSxbNDcsMl0sWzQ3LDNdLFs0NywzXSxbNDcsM10sWzQ3LDNdLFs0NywzXSxbNDcsM10sWzQ3LDNdLFs0NywzXSxbNDcsM10sWzQ3LDNdLFs0NywzXSxbNDcsM10sWzQ3LDNdLFs0NywyXSxbNDcsM10sWzQ3LDFdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDZdLFs0Nyw4XSxbNDcsNl0sWzQ3LDhdLFs0Nyw0XSxbNDcsMV0sWzEyNSwxXSxbMTI1LDFdLFsxMjUsMV0sWzQwLDFdLFs0MCwzXSxbMTI3LDFdLFsxMjcsNF0sWzEyNyw0XSxbNjgsMl0sWzY4LDVdLFs2OCw1XSxbNjgsM10sWzY4LDZdLFs2OCw2XSxbNDIsMV0sWzQyLDNdLFs1OSwxXSxbNTksM10sWzEwMSwxXSxbMTAxLDNdLFs2NiwxXSxbNjYsM10sWzEyOCwxXSxbMTI4LDRdLFsxMjgsNF0sWzc1LDFdLFs3NSwzXSxbNzYsMV0sWzc2LDFdLFs2NCwxXSxbNjQsM10sWzEyOSwxXSxbMTI5LDFdLFsxMzAsMV0sWzEzMCw0XSxbMTMxLDFdLFsxMzEsMl1dLFxucGVyZm9ybUFjdGlvbjogZnVuY3Rpb24gYW5vbnltb3VzKHl5dGV4dCwgeXlsZW5nLCB5eWxpbmVubywgeXksIHl5c3RhdGUgLyogYWN0aW9uWzFdICovLCAkJCAvKiB2c3RhY2sgKi8sIF8kIC8qIGxzdGFjayAqLykge1xuLyogdGhpcyA9PSB5eXZhbCAqL1xuXG52YXIgJDAgPSAkJC5sZW5ndGggLSAxO1xuc3dpdGNoICh5eXN0YXRlKSB7XG5jYXNlIDE6XG50aGlzLiQgPSBuZXcga2V5d29yZC5TdGF0ZW1lbnQoJCRbJDAtMl0pO1xuYnJlYWs7XG5jYXNlIDY6XG50aGlzLiQgPSBuZXcga2V5d29yZC5TdGF0ZW1lbnQoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA3OlxudGhpcy4kID0gbmV3IGtleXdvcmQuU3RhdGVtZW50KCQkWyQwXSwgJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDg6XG4gY29tbWFuZC5hdGFyaSgkJFskMF0pOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSA5OlxuIGNvbW1hbmQuY2xzKCk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDEwOlxuIGNvbW1hbmQuZ3diYXNpYygkJFskMF0pOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAxMTpcbiBjb21tYW5kLnRyb24oKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMTI6XG4gY29tbWFuZC50cm9mZigpOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAxMzpcbiBjb21tYW5kLmFwcGVuZCgkJFskMF0pOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAxNDpcbiBjb21tYW5kLmNhdCgnQ0FUQUxPRycpOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAxNTpcbiBjb21tYW5kLmRlbCgkJFskMF0pOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAxNjpcbiBjb21tYW5kLmNhdCgnR1dCQVNJQycpOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAxNzpcbiBjb21tYW5kLmV4ZWMoJCRbJDBdKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMTg6XG4gY29tbWFuZC5jYXQoJ0FUQVJJJyk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDE5OlxuIGNvbW1hbmQuZ2V0KCQkWyQwXSk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDIwOlxuIGNvbW1hbmQuY2F0KCdHUk9VUCcpOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAyMTpcbiBjb21tYW5kLmRlbChcImRlbC1cIiskJFskMF0pOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAyMjpcbiBjb21tYW5kLmNhdCgnTElCUkFSWScpOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAyMzpcbiBjb21tYW5kLmxpc3QoJCRbJDBdKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMjQ6XG4gY29tbWFuZC5uYW1lKCQkWyQwXSk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDI1OlxuIGNvbW1hbmQucHVyZ2UoJCRbJDBdKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMjY6XG4gY29tbWFuZC5yZW51bSgkJFskMF0pOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAyNzpcbiBjb21tYW5kLnF1aXQoKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMjg6XG4gY29tbWFuZC5ydW4oJCRbJDBdKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMjk6XG4gY29tbWFuZC5zYXZlKCk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDMwOlxuIGNvbW1hbmQuc2NyKCk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDMxOlxuIGNvbW1hbmQuY2F0KCdURVNUJyk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDMyOlxudGhpcy4kID0gbmV3IGtleXdvcmQuQmFzZSgkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMzM6XG50aGlzLiQgPSBuZXcga2V5d29yZC5DaGFpbigkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDM0OlxudGhpcy4kID0gbmV3IGtleXdvcmQuQ29tKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgMzU6XG50aGlzLiQgPSBuZXcga2V5d29yZC5EYXRhKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgMzY6XG50aGlzLiQgPSBuZXcga2V5d29yZC5EZWYoJCRbJDAtNV0sICQkWyQwLTNdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDM3OlxudGhpcy4kID0gbmV3IGtleXdvcmQuRGltKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgMzg6XG50aGlzLiQgPSBuZXcga2V5d29yZC5FbmQoKTtcbmJyZWFrO1xuY2FzZSAzOTpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkVudGVyKCQkWyQwLTZdLCAkJFskMC00XSwgJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDA6XG50aGlzLiQgPSBuZXcga2V5d29yZC5FbnRlcigkJFskMC00XSwgJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDE6XG50aGlzLiQgPSBuZXcga2V5d29yZC5Gb3IoJCRbJDAtNl0sICQkWyQwLTRdLCAkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA0MjpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkZvcigkJFskMC00XSwgJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDM6IGNhc2UgNDQ6XG50aGlzLiQgPSBuZXcga2V5d29yZC5Hb3RvKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDU6XG50aGlzLiQgPSBuZXcga2V5d29yZC5Hb3RvKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDQ2OlxudGhpcy4kID0gbmV3IGtleXdvcmQuR29zdWIoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA0NzpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkdvc3ViKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDQ4OiBjYXNlIDQ5OiBjYXNlIDUwOlxudGhpcy4kID0gbmV3IGtleXdvcmQuSWYoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNTE6XG50aGlzLiQgPSBuZXcga2V5d29yZC5JbWFnZSgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDUyOlxudGhpcy4kID0gbmV3IGtleXdvcmQuSW5wdXQoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA1MzpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLklucHV0KCQkWyQwXSwgJCRbJDAtMl0pO1xuYnJlYWs7XG5jYXNlIDU0OiBjYXNlIDU1OlxudGhpcy4kID0gbmV3IGtleXdvcmQuTGV0KCQkWyQwLTFdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDU2OlxudGhpcy4kID0gbmV3IGtleXdvcmQuTWF0UmVhZCgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDU3OlxudGhpcy4kID0gbmV3IGtleXdvcmQuTWF0KG5ldyBrZXl3b3JkLlZhcigkJFskMC0yXSksIGtleXdvcmQuWmVyKTtcbmJyZWFrO1xuY2FzZSA1ODpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLk1hdChuZXcga2V5d29yZC5WYXIoJCRbJDAtMl0pLCBrZXl3b3JkLkNvbik7XG5icmVhaztcbmNhc2UgNTk6XG50aGlzLiQgPSBuZXcga2V5d29yZC5OZXh0KG5ldyBrZXl3b3JkLlZhcigkJFskMF0pKTtcbmJyZWFrO1xuY2FzZSA2MDpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlByaW50KCQkWyQwLTFdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDYxOlxudGhpcy4kID0gbmV3IGtleXdvcmQuUHJpbnQoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA2MjpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlByaW50KG5ldyBrZXl3b3JkLkNvbnN0KCcnKSk7XG5icmVhaztcbmNhc2UgNjM6XG50aGlzLiQgPSBuZXcga2V5d29yZC5Vc2luZygkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA2NDpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlVzaW5nKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNjU6XG50aGlzLiQgPSBuZXcga2V5d29yZC5SYW5kb21pemUoKTtcbmJyZWFrO1xuY2FzZSA2NjpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlJlYWQoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA2NzpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlJlc3RvcmUoKTtcbmJyZWFrO1xuY2FzZSA2ODpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlJlc3RvcmUoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA2OTpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlJldHVybigpO1xuYnJlYWs7XG5jYXNlIDcwOlxudGhpcy4kID0gbmV3IGtleXdvcmQuUmVtKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNzE6XG50aGlzLiQgPSBuZXcga2V5d29yZC5TdG9wKCk7XG5icmVhaztcbmNhc2UgNzI6XG50aGlzLiQgPSBuZXcga2V5d29yZC5PUigkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA3MzpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkFORCgkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA3NDpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLk5PVCgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDc1OlxudGhpcy4kID0gbmV3IGtleXdvcmQuRVEoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNzY6XG50aGlzLiQgPSBuZXcga2V5d29yZC5ORSgkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA3NzpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkdUKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDc4OlxudGhpcy4kID0gbmV3IGtleXdvcmQuR0UoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNzk6XG50aGlzLiQgPSBuZXcga2V5d29yZC5MVCgkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA4MDpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkxFKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDgxOlxudGhpcy4kID0gbmV3IGtleXdvcmQuTWF4KCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDgyOlxudGhpcy4kID0gbmV3IGtleXdvcmQuTWluKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDgzOlxudGhpcy4kID0gbmV3IGtleXdvcmQuQWRkKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDg0OlxudGhpcy4kID0gbmV3IGtleXdvcmQuU3ViKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDg1OlxudGhpcy4kID0gbmV3IGtleXdvcmQuTXVsKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDg2OlxudGhpcy4kID0gbmV3IGtleXdvcmQuRGl2KCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDg3OlxudGhpcy4kID0gbmV3IGtleXdvcmQuUG93KCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDg4OlxudGhpcy4kID0gLSQkWyQwXTtcbmJyZWFrO1xuY2FzZSA4OTpcbnRoaXMuJCA9ICQkWyQwLTFdO1xuYnJlYWs7XG5jYXNlIDkwOiBjYXNlIDEyMjogY2FzZSAxMzk6XG50aGlzLiQgPSBuZXcga2V5d29yZC5WYXIoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA5MTogY2FzZSA5MjogY2FzZSAxMjM6IGNhc2UgMTI0OiBjYXNlIDE0MDogY2FzZSAxNDE6XG50aGlzLiQgPSBuZXcga2V5d29yZC5WYXIoJCRbJDAtM10sICQkWyQwLTJdLCAkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgOTM6XG50aGlzLiQgPSBuZXcga2V5d29yZC5GTigkJFskMC0zXSwgJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDk0OlxudGhpcy4kID0gbmV3IGtleXdvcmQuQUJTKCQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSA5NTpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkFUTigkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgOTY6XG50aGlzLiQgPSBuZXcga2V5d29yZC5DT1MoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDk3OlxudGhpcy4kID0gbmV3IGtleXdvcmQuRVhQKCQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSA5ODpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLklOVCgkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgOTk6XG50aGlzLiQgPSBuZXcga2V5d29yZC5MRU4oJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwMDpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkxJTigkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMTAxOlxudGhpcy4kID0gbmV3IGtleXdvcmQuTE9HKCQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAxMDI6XG50aGlzLiQgPSBuZXcga2V5d29yZC5STkQoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwMzpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlNHTigkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMTA0OlxudGhpcy4kID0gbmV3IGtleXdvcmQuU0lOKCQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAxMDU6XG50aGlzLiQgPSBuZXcga2V5d29yZC5TUEEoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwNjpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlNRUigkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMTA3OlxudGhpcy4kID0gbmV3IGtleXdvcmQuVEFCKCQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAxMDg6XG50aGlzLiQgPSBuZXcga2V5d29yZC5UQU4oJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwOTpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLlRJTSgkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMTEwOlxudGhpcy4kID0gbmV3IGtleXdvcmQuTENBU0UoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDExMTpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkxFRlQoJCRbJDAtM10sICQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAxMTI6XG50aGlzLiQgPSBuZXcga2V5d29yZC5NSUQoJCRbJDAtNV0sICQkWyQwLTNdLCAkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMTEzOlxudGhpcy4kID0gbmV3IGtleXdvcmQuUklHSFQoJCRbJDAtM10sICQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAxMTQ6XG50aGlzLiQgPSBuZXcga2V5d29yZC5TVUJTVFIoJCRbJDAtNV0sICQkWyQwLTNdLCAkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMTE1OlxudGhpcy4kID0gbmV3IGtleXdvcmQuVUNBU0UoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDExNjogY2FzZSAxNDg6IGNhc2UgMTQ5OlxudGhpcy4kID0gJCRbJDBdO1xuYnJlYWs7XG5jYXNlIDExNzpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkNvbnN0KHBhcnNlSW50KCQkWyQwXSwgMTApKTtcbmJyZWFrO1xuY2FzZSAxMTg6XG50aGlzLiQgPSBuZXcga2V5d29yZC5Db25zdCgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDExOTpcbnRoaXMuJCA9IG5ldyBrZXl3b3JkLkNvbnN0KE51bWJlcigkJFskMF0pKTtcbmJyZWFrO1xuY2FzZSAxMjA6IGNhc2UgMTMxOiBjYXNlIDEzNTogY2FzZSAxMzc6IGNhc2UgMTQyOiBjYXNlIDE0NjogY2FzZSAxNTA6IGNhc2UgMTUyOlxudGhpcy4kID0gWyQkWyQwXV07XG5icmVhaztcbmNhc2UgMTIxOiBjYXNlIDEzMjogY2FzZSAxMzY6IGNhc2UgMTM4OlxudGhpcy4kID0gWyQkWyQwLTJdLCAkJFskMF1dO1xuYnJlYWs7XG5jYXNlIDEyNTpcbnRoaXMuJCA9IFskJFskMC0xXV07XG5icmVhaztcbmNhc2UgMTI2OiBjYXNlIDEyNzpcbnRoaXMuJCA9IFtuZXcga2V5d29yZC5WYXIoJCRbJDAtNF0sICQkWyQwLTNdLCAkJFskMC0yXSldO1xuYnJlYWs7XG5jYXNlIDEyODpcbnRoaXMuJCA9IFskJFskMC0yXSwgJCRbJDAtMV1dO1xuYnJlYWs7XG5jYXNlIDEyOTogY2FzZSAxMzA6XG50aGlzLiQgPSBbJCRbJDAtNV0sIG5ldyBrZXl3b3JkLlZhcigkJFskMC00XSwgJCRbJDAtM10sICQkWyQwLTJdKV07XG5icmVhaztcbmNhc2UgMTMzOlxudGhpcy4kID0gW3BhcnNlSW50KCQkWyQwXSwgMTApXTtcbmJyZWFrO1xuY2FzZSAxMzQ6XG50aGlzLiQgPSBbJCRbJDAtMl0sIHBhcnNlSW50KCQkWyQwXSwgMTApXTtcbmJyZWFrO1xuY2FzZSAxNDM6IGNhc2UgMTQ3OlxudGhpcy4kID0gWyQkWyQwLTJdLCAkJFskMC0xXSwgJCRbJDBdXTtcbmJyZWFrO1xuY2FzZSAxNDQ6XG50aGlzLiQgPSBrZXl3b3JkLlNlbWljO1xuYnJlYWs7XG5jYXNlIDE0NTpcbnRoaXMuJCA9IGtleXdvcmQuQ29tbWE7XG5icmVhaztcbmNhc2UgMTUxOlxudGhpcy4kID0gW3BhcnNlSW50KCQkWyQwLTNdLCAxMCksICQkWyQwLTJdLCAkJFskMC0xXSwgJCRbJDBdXTtcbmJyZWFrO1xuY2FzZSAxNTM6XG50aGlzLiQgPSBbcGFyc2VJbnQoJCRbJDAtMV0sIDEwKSwgJCRbJDBdXTtcbmJyZWFrO1xufVxufSxcbnRhYmxlOiBbezM6MSw0OjIsNTpbMSwyOV0sNzozLDg6MjgsOTozMCwxMDpbMSwxN10sMTE6WzEsNF0sMTM6WzEsNV0sMTQ6WzEsNl0sMTU6WzEsN10sMTY6WzEsOF0sMTc6WzEsOV0sMTg6WzEsMTBdLDE5OlsxLDExXSwyMDpbMSwxMl0sMjE6WzEsMTNdLDIyOlsxLDE0XSwyMzpbMSwxNV0sMjQ6WzEsMTZdLDI1OlsxLDE4XSwyNjpbMSwxOV0sMjc6WzEsMjBdLDI4OlsxLDIxXSwyOTpbMSwyMl0sMzA6WzEsMjNdLDMxOlsxLDI0XSwzMjpbMSwyNV0sMzM6WzEsMjZdLDM0OlsxLDI3XSwzNTokVjAsMzg6JFYxLDM5OiRWMiw0MTokVjMsNDM6JFY0LDQ1OiRWNSw0ODokVjYsNDk6JFY3LDUwOiRWOCw1MzokVjksNTY6JFZhLDU3OiRWYiw2MDokVmMsNjE6JFZkLDYzOiRWZSw2NTokVmYsNjc6JFZnLDY4OjQ3LDY5OiRWaCw3MDokVmksNzM6JFZqLDc0OiRWayw3OTokVmwsODA6JFZtLDgxOiRWbiw4MjokVm8sODM6JFZwfSx7MTpbM119LHs1OlsxLDU4XX0sezY6WzEsNTldLDg6NjAsOTozMCwxMDpbMSw2MV0sMzU6JFYwLDM4OiRWMSwzOTokVjIsNDE6JFYzLDQzOiRWNCw0NTokVjUsNDg6JFY2LDQ5OiRWNyw1MDokVjgsNTM6JFY5LDU2OiRWYSw1NzokVmIsNjA6JFZjLDYxOiRWZCw2MzokVmUsNjU6JFZmLDY3OiRWZyw2ODo0Nyw2OTokVmgsNzA6JFZpLDczOiRWaiw3NDokVmssNzk6JFZsLDgwOiRWbSw4MTokVm4sODI6JFZvLDgzOiRWcH0sezEyOlsxLDYyXX0sezU6WzIsOV19LHsxMjpbMSw2M119LHs1OlsyLDExXX0sezU6WzIsMTJdfSx7NTpbMiwxM119LHs1OlsyLDE0XX0sezU6WzIsMTVdfSx7NTpbMiwxNl19LHs1OlsyLDE3XX0sezU6WzIsMThdfSx7NTpbMiwxOV19LHs1OlsyLDIwXX0sezU6WzIsMjFdLDk6NjQsMzU6JFYwLDM4OiRWMSwzOTokVjIsNDE6JFYzLDQzOiRWNCw0NTokVjUsNDg6JFY2LDQ5OiRWNyw1MDokVjgsNTM6JFY5LDU2OiRWYSw1NzokVmIsNjA6JFZjLDYxOiRWZCw2MzokVmUsNjU6JFZmLDY3OiRWZyw2ODo0Nyw2OTokVmgsNzA6JFZpLDczOiRWaiw3NDokVmssNzk6JFZsLDgwOiRWbSw4MTokVm4sODI6JFZvLDgzOiRWcH0sezU6WzIsMjJdfSx7NTpbMiwyM119LHs1OlsyLDI0XX0sezU6WzIsMjVdfSx7NTpbMiwyNl19LHs1OlsyLDI3XX0sezU6WzIsMjhdfSx7NTpbMiwyOV19LHs1OlsyLDMwXX0sezU6WzIsMzFdfSx7NTpbMSw2NV19LG8oJFZxLFsyLDVdKSx7NTpbMiw2XX0sezM2OlsxLDY2XX0sezEyOlsxLDY3XX0sezQwOjY4LDQ1OiRWciwxMjc6Njl9LHsxMDokVnMsMTI6JFZ0LDQyOjcxLDEyNTo3MiwxMjY6JFZ1fSx7NDQ6WzEsNzZdfSx7NDA6NzcsNDU6JFZyLDEyNzo2OX0sezU6WzIsMzhdfSx7NDU6WzEsNzldLDUxOlsxLDc4XX0sezQ1OlsxLDgwXX0sezU0OlsxLDgxXX0sezEwOlsxLDgyXSwxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6ODMsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOlsxLDExMl0sMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjExMyw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoxMTQsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWVywxMjokVlgsNDU6JFZZLDY0OjExNSwxMjk6MTE2LDEzMDoxMTgsMTMxOjExOX0sezEyOlsxLDEyM10sNDU6JFZaLDY2OjEyMiwxMjg6MTI0fSx7NDU6JFY1LDY4OjEyNn0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVl8sNDc6MTI3LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHs0NTpbMSwxMzBdLDcwOlsxLDEyOV19LHs0NTpbMSwxMzFdfSx7NTpbMiw2Ml0sMTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoxMzQsNzU6MTMyLDc3OlsxLDEzM10sODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezU6WzIsNjVdfSx7NDU6JFZaLDY2OjEzNSwxMjg6MTI0fSx7NTpbMiw2N10sMTA6WzEsMTM2XX0sezU6WzIsNjldfSx7NTpbMiw3MF19LHs1OlsyLDcxXX0sezM2OlsxLDEzOV0sNDY6WzEsMTM3XSwxMDA6WzEsMTM4XX0sezY6WzEsMTQwXX0sezE6WzIsMl19LHs1OlsxLDE0MV19LHs5OjY0LDM1OiRWMCwzODokVjEsMzk6JFYyLDQxOiRWMyw0MzokVjQsNDU6JFY1LDQ4OiRWNiw0OTokVjcsNTA6JFY4LDUzOiRWOSw1NjokVmEsNTc6JFZiLDYwOiRWYyw2MTokVmQsNjM6JFZlLDY1OiRWZiw2NzokVmcsNjg6NDcsNjk6JFZoLDcwOiRWaSw3MzokVmosNzQ6JFZrLDc5OiRWbCw4MDokVm0sODE6JFZuLDgyOiRWbyw4MzokVnB9LHs1OlsyLDhdfSx7NTpbMiwxMF19LHs1OlsyLDddfSxvKCRWcSxbMiw0XSksezEwOlsxLDE0Ml19LHs1OlsyLDMzXX0sezU6WzIsMzRdLDUyOiRWJH0sbygkVjAxLFsyLDEyMF0pLG8oJFYwMSxbMiwxMjJdLHszNjpbMSwxNDVdLDEwMDpbMSwxNDRdfSksezU6WzIsMzVdLDUyOlsxLDE0Nl19LG8oJFYwMSxbMiwxMzFdKSxvKCRWMTEsJFYyMSksbygkVjExLFsyLDExOF0pLG8oJFYxMSxbMiwxMTldKSx7MzY6WzEsMTQ3XX0sezU6WzIsMzddLDUyOiRWJH0sezUyOlsxLDE0OF19LHs1MjpbMSwxNDldfSx7NDY6WzEsMTUwXX0sezEwOlsxLDE1MV19LG8oJFYzMSwkVjIxLHs1OlsyLDQ0XX0pLHs1ODpbMSwxNTJdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoxNjgsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MTY5LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjE3MCw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSxvKCRWMTEsJFZqMSx7MzY6WzEsMTcyXSwxMDA6WzEsMTcxXX0pLHszNjpbMSwxNzNdfSx7MzY6WzEsMTc0XX0sezM2OlsxLDE3NV19LHszNjpbMSwxNzZdfSx7MzY6WzEsMTc3XX0sezM2OlsxLDE3OF19LHszNjpbMSwxNzldfSx7MzY6WzEsMTgwXX0sezM2OlsxLDE4MV19LHszNjpbMSwxODJdfSx7MzY6WzEsMTgzXX0sezM2OlsxLDE4NF19LHszNjpbMSwxODVdfSx7MzY6WzEsMTg2XX0sezM2OlsxLDE4N119LHszNjpbMSwxODhdfSx7MzY6WzEsMTg5XX0sezM2OlsxLDE5MF19LHszNjpbMSwxOTFdfSx7MzY6WzEsMTkyXX0sezM2OlsxLDE5M119LHszNjpbMSwxOTRdfSx7MzY6WzEsMTk1XX0sbygkVjExLFsyLDExNl0pLG8oJFYzMSwkVjIxLHs1OlsyLDQ2XX0pLHs1ODpbMSwxOTZdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7NTc6WzEsMTk3XSw2MjpbMSwxOThdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7NTpbMiw1MV0sNTI6JFZrMX0sbygkVmwxLFsyLDE0Nl0pLG8oJFZsMSxbMiwxNDhdKSxvKCRWbDEsWzIsMTQ5XSksbygkVmwxLFsyLDE1MF0pLHszNjpbMSwyMDBdLDQ1OlsxLDIwMV19LG8oJFZsMSxbMiwxNTJdKSx7NTpbMiw1Ml0sNTI6JFZtMX0sezUyOlsxLDIwM119LG8oJFYwMSxbMiwxMzddKSxvKCRWMDEsWzIsMTM5XSx7MzY6WzEsMjA1XSwxMDA6WzEsMjA0XX0pLHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZfLDQ3OjIwNiw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7NTpbMiw1NV0sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LG8oJFZuMSwkVmoxLHszNjpbMSwyMDldLDQ2OlsxLDIwN10sMTAwOlsxLDIwOF19KSx7NDU6JFZaLDY2OjIxMCwxMjg6MTI0fSx7NDY6WzEsMjExXX0sezU6WzIsNTldfSx7NTpbMiw2MV0sNTI6WzEsMjE0XSw3NjoyMTIsNzg6WzEsMjEzXX0sezEwOlsxLDIxNV19LG8oJFZvMSxbMiwxNDJdLHs4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0pLHs1OlsyLDY2XSw1MjokVm0xfSx7NTpbMiw2OF19LG8oJFZwMSxbMiwxMjVdKSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyMTcsODY6JFZ5LDk2OiRWeiwxMDE6MjE2LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyMTcsODY6JFZ5LDk2OiRWeiwxMDE6MjE4LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTpbMiwxXX0sbygkVnEsWzIsM10pLHszNzpbMSwyMTldfSx7NDU6JFZyLDEyNzoyMjB9LHsxMDokVnExLDU5OjIyMX0sezEwOiRWcTEsNTk6MjIzfSx7MTA6JFZzLDEyOiRWdCwxMjU6MjI0LDEyNjokVnV9LHs0NTpbMSwyMjVdfSx7NDU6WzEsMjI2XX0sezQ1OlsxLDIyN119LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjIyOCw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7NTpbMiw0M119LHsxMDokVnExLDU5OjIyOX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjMwLDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjIzMSw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyMzIsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjMzLDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjIzNCw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyMzUsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjM2LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjIzNyw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyMzgsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjM5LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI0MCw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNDEsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjQyLDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI0Myw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNDQsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sbygkVnIxLFsyLDc0XSx7OTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0pLG8oJFYxMSxbMiw4OF0pLHszNzpbMSwyNDVdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyMTcsODY6JFZ5LDk2OiRWeiwxMDE6MjQ2LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyMTcsODY6JFZ5LDk2OiRWeiwxMDE6MjQ3LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNDgsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjQ5LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI1MCw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNTEsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjUyLDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI1Myw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNTQsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjU1LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI1Niw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNTcsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjU4LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI1OSw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNjAsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjYxLDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI2Miw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNjMsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjY0LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI2NSw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNjYsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjY3LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI2OCw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzoyNjksODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjcwLDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnExLDU5OjI3MX0sezEwOlsxLDI3Ml19LHs5OjI3NCwxMDpbMSwyNzNdLDM1OiRWMCwzODokVjEsMzk6JFYyLDQxOiRWMyw0MzokVjQsNDU6JFY1LDQ4OiRWNiw0OTokVjcsNTA6JFY4LDUzOiRWOSw1NjokVmEsNTc6JFZiLDYwOiRWYyw2MTokVmQsNjM6JFZlLDY1OiRWZiw2NzokVmcsNjg6NDcsNjk6JFZoLDcwOiRWaSw3MzokVmosNzQ6JFZrLDc5OiRWbCw4MDokVm0sODE6JFZuLDgyOiRWbyw4MzokVnB9LHsxMDokVlcsMTI6JFZYLDQ1OiRWWSwxMjk6Mjc1LDEzMDoxMTgsMTMxOjExOX0sezEwOiRWVywxMjokVlgsNDU6JFZZLDY0OjI3NiwxMjk6MTE2LDEzMDoxMTgsMTMxOjExOX0sbygkVmwxLFsyLDE1M10pLHs0NTokVlosMTI4OjI3N30sezQ1OiRWWiw2NjoyNzgsMTI4OjEyNH0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjE3LDg2OiRWeSw5NjokVnosMTAxOjI3OSwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjE3LDg2OiRWeSw5NjokVnosMTAxOjI4MCwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezU6WzIsNTRdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSxvKCRWcDEsWzIsMTI4XSksezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjE3LDg2OiRWeSw5NjokVnosMTAxOjI4MSwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MjE3LDg2OiRWeSw5NjokVnosMTAxOjI4MiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezU6WzIsNTZdLDUyOiRWbTF9LHs3MTpbMSwyODNdLDcyOlsxLDI4NF19LHs1OlsyLDYwXSwxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjI4NSw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSxvKCRWczEsWzIsMTQ0XSksbygkVnMxLFsyLDE0NV0pLHs1OlsyLDY0XSw3ODpbMSwyODZdfSx7NTI6JFZ0MSwxMDI6WzEsMjg3XX0sbygkVnUxLFsyLDEzNV0sezg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSksezM3OlsxLDI4OV0sNTI6JFZ0MX0sezU6WzIsMzJdfSxvKCRWMDEsWzIsMTIxXSksezUyOiRWdjEsMTAyOlsxLDI5MF19LG8oJFZ3MSxbMiwxMzNdKSx7Mzc6WzEsMjkyXSw1MjokVnYxfSxvKCRWMDEsWzIsMTMyXSksezM3OlsxLDI5M119LHs1MjpbMSwyOTRdfSx7NTI6WzEsMjk1XX0sezU0OlsxLDI5Nl0sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHs1OlsyLDQ1XSw1MjokVnYxfSxvKFs1LDM3LDUyLDU0LDU1LDU3LDU4LDYyLDc4LDg0LDEwMl0sWzIsNzJdLHs4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9KSxvKFs1LDM3LDUyLDU0LDU1LDU3LDU4LDYyLDc4LDg0LDg1LDEwMl0sWzIsNzNdLHs4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSksbygkVnIxLFsyLDc1XSx7OTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0pLG8oJFZyMSxbMiw3Nl0sezkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9KSxvKCRWcjEsWzIsNzddLHs5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSksbygkVnIxLFsyLDc4XSx7OTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0pLG8oJFZyMSxbMiw3OV0sezkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9KSxvKCRWcjEsWzIsODBdLHs5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSksbygkVngxLFsyLDgxXSx7OTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSksbygkVngxLFsyLDgyXSx7OTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSksbygkVnkxLFsyLDgzXSx7OTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9KSxvKCRWeTEsWzIsODRdLHs5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0pLG8oJFZ6MSxbMiw4NV0sezk5OiRWaTF9KSxvKCRWejEsWzIsODZdLHs5OTokVmkxfSksbygkVjExLFsyLDg3XSksbygkVjExLFsyLDg5XSksezUyOiRWdDEsMTAyOlsxLDI5N119LHszNzpbMSwyOThdLDUyOiRWdDF9LHszNzpbMSwyOTldLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7Mzc6WzEsMzAwXSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezM3OlsxLDMwMV0sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHszNzpbMSwzMDJdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7Mzc6WzEsMzAzXSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezM3OlsxLDMwNF0sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHszNzpbMSwzMDVdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7Mzc6WzEsMzA2XSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezM3OlsxLDMwN10sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHszNzpbMSwzMDhdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7Mzc6WzEsMzA5XSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezM3OlsxLDMxMF0sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHszNzpbMSwzMTFdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7Mzc6WzEsMzEyXSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezM3OlsxLDMxM10sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHszNzpbMSwzMTRdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7Mzc6WzEsMzE1XSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezM3OlsxLDMxNl0sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHs1MjpbMSwzMTddLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7NTI6WzEsMzE4XSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezUyOlsxLDMxOV0sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHs1MjpbMSwzMjBdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7Mzc6WzEsMzIxXSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezU6WzIsNDddLDUyOiRWdjF9LHs1OlsyLDQ4XX0sezU6WzIsNDldfSx7NTpbMiw1MF19LG8oJFZsMSxbMiwxNDddKSx7Mzc6WzEsMzIyXSw1MjokVmsxfSxvKCRWMDEsWzIsMTM4XSksezU6WzIsNTNdLDUyOiRWbTF9LHs1MjokVnQxLDEwMjpbMSwzMjNdfSx7Mzc6WzEsMzI0XSw1MjokVnQxfSx7NTI6JFZ0MSwxMDI6WzEsMzI1XX0sezM3OlsxLDMyNl0sNTI6JFZ0MX0sezU6WzIsNTddfSx7NTpbMiw1OF19LG8oJFZvMSxbMiwxNDNdLHs4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0pLHs0NTokVlosNjY6MzI3LDEyODoxMjR9LHs0NjpbMSwzMjhdfSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzozMjksODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezQ2OlsxLDMzMF19LG8oJFYwMSxbMiwxMjNdKSx7MTA6WzEsMzMxXX0sbygkVjAxLFsyLDEyNF0pLHs0NjpbMSwzMzJdfSx7NDU6WzEsMzMzXX0sezQ1OlsxLDMzNF19LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjMzNSw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSxvKCRWMTEsJFZBMSksbygkVjExLCRWQjEpLG8oJFYxMSxbMiw5M10pLG8oJFYxMSxbMiw5NF0pLG8oJFYxMSxbMiw5NV0pLG8oJFYxMSxbMiw5Nl0pLG8oJFYxMSxbMiw5N10pLG8oJFYxMSxbMiw5OF0pLG8oJFYxMSxbMiw5OV0pLG8oJFYxMSxbMiwxMDBdKSxvKCRWMTEsWzIsMTAxXSksbygkVjExLFsyLDEwMl0pLG8oJFYxMSxbMiwxMDNdKSxvKCRWMTEsWzIsMTA0XSksbygkVjExLFsyLDEwNV0pLG8oJFYxMSxbMiwxMDZdKSxvKCRWMTEsWzIsMTA3XSksbygkVjExLFsyLDEwOF0pLG8oJFYxMSxbMiwxMDldKSxvKCRWMTEsWzIsMTEwXSksezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MzM2LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjMzNyw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzozMzgsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MzM5LDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LG8oJFYxMSxbMiwxMTVdKSxvKCRWbDEsWzIsMTUxXSksbygkVjAxLFsyLDE0MF0pLG8oJFYwMSxbMiwxNDFdKSxvKCRWbjEsJFZBMSx7NDY6WzEsMzQwXX0pLG8oJFZuMSwkVkIxLHs0NjpbMSwzNDFdfSksezU6WzIsNjNdLDUyOiRWbTF9LG8oJFZwMSxbMiwxMjZdKSxvKCRWdTEsWzIsMTM2XSx7ODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9KSxvKCRWcDEsWzIsMTI3XSksbygkVncxLFsyLDEzNF0pLHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjM0Miw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7NTI6WzEsMzQzXX0sezU6WzIsNDBdfSx7NTpbMiw0Ml0sNTU6WzEsMzQ0XSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezM3OlsxLDM0NV0sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHs1MjpbMSwzNDZdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7Mzc6WzEsMzQ3XSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezUyOlsxLDM0OF0sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LG8oJFZwMSxbMiwxMjldKSxvKCRWcDEsWzIsMTMwXSksezU6WzIsMzZdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSx7NDU6WzEsMzQ5XX0sezEwOiRWcywxMjokVnQsMzY6JFZ2LDQ0OiRWdyw0NTokVngsNDc6MzUwLDg2OiRWeSw5NjokVnosMTAzOiRWQSwxMDQ6JFZCLDEwNTokVkMsMTA2OiRWRCwxMDc6JFZFLDEwODokVkYsMTA5OiRWRywxMTA6JFZILDExMTokVkksMTEyOiRWSiwxMTM6JFZLLDExNDokVkwsMTE1OiRWTSwxMTY6JFZOLDExNzokVk8sMTE4OiRWUCwxMTk6JFZRLDEyMDokVlIsMTIxOiRWUywxMjI6JFZULDEyMzokVlUsMTI0OiRWViwxMjU6MTExLDEyNjokVnV9LG8oJFYxMSxbMiwxMTFdKSx7MTA6JFZzLDEyOiRWdCwzNjokVnYsNDQ6JFZ3LDQ1OiRWeCw0NzozNTEsODY6JFZ5LDk2OiRWeiwxMDM6JFZBLDEwNDokVkIsMTA1OiRWQywxMDY6JFZELDEwNzokVkUsMTA4OiRWRiwxMDk6JFZHLDExMDokVkgsMTExOiRWSSwxMTI6JFZKLDExMzokVkssMTE0OiRWTCwxMTU6JFZNLDExNjokVk4sMTE3OiRWTywxMTg6JFZQLDExOTokVlEsMTIwOiRWUiwxMjE6JFZTLDEyMjokVlQsMTIzOiRWVSwxMjQ6JFZWLDEyNToxMTEsMTI2OiRWdX0sbygkVjExLFsyLDExM10pLHsxMDokVnMsMTI6JFZ0LDM2OiRWdiw0NDokVncsNDU6JFZ4LDQ3OjM1Miw4NjokVnksOTY6JFZ6LDEwMzokVkEsMTA0OiRWQiwxMDU6JFZDLDEwNjokVkQsMTA3OiRWRSwxMDg6JFZGLDEwOTokVkcsMTEwOiRWSCwxMTE6JFZJLDExMjokVkosMTEzOiRWSywxMTQ6JFZMLDExNTokVk0sMTE2OiRWTiwxMTc6JFZPLDExODokVlAsMTE5OiRWUSwxMjA6JFZSLDEyMTokVlMsMTIyOiRWVCwxMjM6JFZVLDEyNDokVlYsMTI1OjExMSwxMjY6JFZ1fSx7NTpbMiwzOV19LHs1OlsyLDQxXSw4NDokVjQxLDg1OiRWNTEsODc6JFY2MSw4ODokVjcxLDg5OiRWODEsOTA6JFY5MSw5MTokVmExLDkyOiRWYjEsOTM6JFZjMSw5NDokVmQxLDk1OiRWZTEsOTY6JFZmMSw5NzokVmcxLDk4OiRWaDEsOTk6JFZpMX0sezM3OlsxLDM1M10sODQ6JFY0MSw4NTokVjUxLDg3OiRWNjEsODg6JFY3MSw4OTokVjgxLDkwOiRWOTEsOTE6JFZhMSw5MjokVmIxLDkzOiRWYzEsOTQ6JFZkMSw5NTokVmUxLDk2OiRWZjEsOTc6JFZnMSw5ODokVmgxLDk5OiRWaTF9LHszNzpbMSwzNTRdLDg0OiRWNDEsODU6JFY1MSw4NzokVjYxLDg4OiRWNzEsODk6JFY4MSw5MDokVjkxLDkxOiRWYTEsOTI6JFZiMSw5MzokVmMxLDk0OiRWZDEsOTU6JFZlMSw5NjokVmYxLDk3OiRWZzEsOTg6JFZoMSw5OTokVmkxfSxvKCRWMTEsWzIsMTEyXSksbygkVjExLFsyLDExNF0pXSxcbmRlZmF1bHRBY3Rpb25zOiB7NTpbMiw5XSw3OlsyLDExXSw4OlsyLDEyXSw5OlsyLDEzXSwxMDpbMiwxNF0sMTE6WzIsMTVdLDEyOlsyLDE2XSwxMzpbMiwxN10sMTQ6WzIsMThdLDE1OlsyLDE5XSwxNjpbMiwyMF0sMTg6WzIsMjJdLDE5OlsyLDIzXSwyMDpbMiwyNF0sMjE6WzIsMjVdLDIyOlsyLDI2XSwyMzpbMiwyN10sMjQ6WzIsMjhdLDI1OlsyLDI5XSwyNjpbMiwzMF0sMjc6WzIsMzFdLDMwOlsyLDZdLDM3OlsyLDM4XSw1MTpbMiw2NV0sNTQ6WzIsNjldLDU1OlsyLDcwXSw1NjpbMiw3MV0sNTk6WzIsMl0sNjI6WzIsOF0sNjM6WzIsMTBdLDY0OlsyLDddLDY3OlsyLDMzXSwxMzE6WzIsNTldLDEzNjpbMiw2OF0sMTQwOlsyLDFdLDE1MTpbMiw0M10sMjE5OlsyLDMyXSwyNzI6WzIsNDhdLDI3MzpbMiw0OV0sMjc0OlsyLDUwXSwyODM6WzIsNTddLDI4NDpbMiw1OF0sMzM0OlsyLDQwXSwzNDk6WzIsMzldfSxcbnBhcnNlRXJyb3I6IGZ1bmN0aW9uIHBhcnNlRXJyb3Ioc3RyLCBoYXNoKSB7XG4gICAgaWYgKGhhc2gucmVjb3ZlcmFibGUpIHtcbiAgICAgICAgdGhpcy50cmFjZShzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihzdHIpO1xuICAgIH1cbn0sXG5wYXJzZTogZnVuY3Rpb24gcGFyc2UoaW5wdXQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsIHN0YWNrID0gWzBdLCB0c3RhY2sgPSBbXSwgdnN0YWNrID0gW251bGxdLCBsc3RhY2sgPSBbXSwgdGFibGUgPSB0aGlzLnRhYmxlLCB5eXRleHQgPSAnJywgeXlsaW5lbm8gPSAwLCB5eWxlbmcgPSAwLCByZWNvdmVyaW5nID0gMCwgVEVSUk9SID0gMiwgRU9GID0gMTtcbiAgICB2YXIgYXJncyA9IGxzdGFjay5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGxleGVyID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmxleGVyKTtcbiAgICB2YXIgc2hhcmVkU3RhdGUgPSB7IHl5OiB7fSB9O1xuICAgIGZvciAodmFyIGsgaW4gdGhpcy55eSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMueXksIGspKSB7XG4gICAgICAgICAgICBzaGFyZWRTdGF0ZS55eVtrXSA9IHRoaXMueXlba107XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV4ZXIuc2V0SW5wdXQoaW5wdXQsIHNoYXJlZFN0YXRlLnl5KTtcbiAgICBzaGFyZWRTdGF0ZS55eS5sZXhlciA9IGxleGVyO1xuICAgIHNoYXJlZFN0YXRlLnl5LnBhcnNlciA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiBsZXhlci55eWxsb2MgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbGV4ZXIueXlsbG9jID0ge307XG4gICAgfVxuICAgIHZhciB5eWxvYyA9IGxleGVyLnl5bGxvYztcbiAgICBsc3RhY2sucHVzaCh5eWxvYyk7XG4gICAgdmFyIHJhbmdlcyA9IGxleGVyLm9wdGlvbnMgJiYgbGV4ZXIub3B0aW9ucy5yYW5nZXM7XG4gICAgaWYgKHR5cGVvZiBzaGFyZWRTdGF0ZS55eS5wYXJzZUVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucGFyc2VFcnJvciA9IHNoYXJlZFN0YXRlLnl5LnBhcnNlRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJzZUVycm9yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLnBhcnNlRXJyb3I7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvcFN0YWNrKG4pIHtcbiAgICAgICAgc3RhY2subGVuZ3RoID0gc3RhY2subGVuZ3RoIC0gMiAqIG47XG4gICAgICAgIHZzdGFjay5sZW5ndGggPSB2c3RhY2subGVuZ3RoIC0gbjtcbiAgICAgICAgbHN0YWNrLmxlbmd0aCA9IGxzdGFjay5sZW5ndGggLSBuO1xuICAgIH1cbiAgICBfdG9rZW5fc3RhY2s6XG4gICAgICAgIGZ1bmN0aW9uIGxleCgpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgICAgIHRva2VuID0gbGV4ZXIubGV4KCkgfHwgRU9GO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHNlbGYuc3ltYm9sc19bdG9rZW5dIHx8IHRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9XG4gICAgdmFyIHN5bWJvbCwgcHJlRXJyb3JTeW1ib2wsIHN0YXRlLCBhY3Rpb24sIGEsIHIsIHl5dmFsID0ge30sIHAsIGxlbiwgbmV3U3RhdGUsIGV4cGVjdGVkO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHN0YXRlID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRBY3Rpb25zW3N0YXRlXSkge1xuICAgICAgICAgICAgYWN0aW9uID0gdGhpcy5kZWZhdWx0QWN0aW9uc1tzdGF0ZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc3ltYm9sID09PSBudWxsIHx8IHR5cGVvZiBzeW1ib2wgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSBsZXgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjdGlvbiA9IHRhYmxlW3N0YXRlXSAmJiB0YWJsZVtzdGF0ZV1bc3ltYm9sXTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ3VuZGVmaW5lZCcgfHwgIWFjdGlvbi5sZW5ndGggfHwgIWFjdGlvblswXSkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJTdHIgPSAnJztcbiAgICAgICAgICAgICAgICBleHBlY3RlZCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAocCBpbiB0YWJsZVtzdGF0ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGVybWluYWxzX1twXSAmJiBwID4gVEVSUk9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZC5wdXNoKCdcXCcnICsgdGhpcy50ZXJtaW5hbHNfW3BdICsgJ1xcJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsZXhlci5zaG93UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyU3RyID0gJ1BhcnNlIGVycm9yIG9uIGxpbmUgJyArICh5eWxpbmVubyArIDEpICsgJzpcXG4nICsgbGV4ZXIuc2hvd1Bvc2l0aW9uKCkgKyAnXFxuRXhwZWN0aW5nICcgKyBleHBlY3RlZC5qb2luKCcsICcpICsgJywgZ290IFxcJycgKyAodGhpcy50ZXJtaW5hbHNfW3N5bWJvbF0gfHwgc3ltYm9sKSArICdcXCcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVyclN0ciA9ICdQYXJzZSBlcnJvciBvbiBsaW5lICcgKyAoeXlsaW5lbm8gKyAxKSArICc6IFVuZXhwZWN0ZWQgJyArIChzeW1ib2wgPT0gRU9GID8gJ2VuZCBvZiBpbnB1dCcgOiAnXFwnJyArICh0aGlzLnRlcm1pbmFsc19bc3ltYm9sXSB8fCBzeW1ib2wpICsgJ1xcJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlRXJyb3IoZXJyU3RyLCB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGxleGVyLm1hdGNoLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogdGhpcy50ZXJtaW5hbHNfW3N5bWJvbF0gfHwgc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBsZXhlci55eWxpbmVubyxcbiAgICAgICAgICAgICAgICAgICAgbG9jOiB5eWxvYyxcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb25bMF0gaW5zdGFuY2VvZiBBcnJheSAmJiBhY3Rpb24ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJzZSBFcnJvcjogbXVsdGlwbGUgYWN0aW9ucyBwb3NzaWJsZSBhdCBzdGF0ZTogJyArIHN0YXRlICsgJywgdG9rZW46ICcgKyBzeW1ib2wpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uWzBdKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHN0YWNrLnB1c2goc3ltYm9sKTtcbiAgICAgICAgICAgIHZzdGFjay5wdXNoKGxleGVyLnl5dGV4dCk7XG4gICAgICAgICAgICBsc3RhY2sucHVzaChsZXhlci55eWxsb2MpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChhY3Rpb25bMV0pO1xuICAgICAgICAgICAgc3ltYm9sID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghcHJlRXJyb3JTeW1ib2wpIHtcbiAgICAgICAgICAgICAgICB5eWxlbmcgPSBsZXhlci55eWxlbmc7XG4gICAgICAgICAgICAgICAgeXl0ZXh0ID0gbGV4ZXIueXl0ZXh0O1xuICAgICAgICAgICAgICAgIHl5bGluZW5vID0gbGV4ZXIueXlsaW5lbm87XG4gICAgICAgICAgICAgICAgeXlsb2MgPSBsZXhlci55eWxsb2M7XG4gICAgICAgICAgICAgICAgaWYgKHJlY292ZXJpbmcgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY292ZXJpbmctLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN5bWJvbCA9IHByZUVycm9yU3ltYm9sO1xuICAgICAgICAgICAgICAgIHByZUVycm9yU3ltYm9sID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBsZW4gPSB0aGlzLnByb2R1Y3Rpb25zX1thY3Rpb25bMV1dWzFdO1xuICAgICAgICAgICAgeXl2YWwuJCA9IHZzdGFja1t2c3RhY2subGVuZ3RoIC0gbGVuXTtcbiAgICAgICAgICAgIHl5dmFsLl8kID0ge1xuICAgICAgICAgICAgICAgIGZpcnN0X2xpbmU6IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gKGxlbiB8fCAxKV0uZmlyc3RfbGluZSxcbiAgICAgICAgICAgICAgICBsYXN0X2xpbmU6IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gMV0ubGFzdF9saW5lLFxuICAgICAgICAgICAgICAgIGZpcnN0X2NvbHVtbjogbHN0YWNrW2xzdGFjay5sZW5ndGggLSAobGVuIHx8IDEpXS5maXJzdF9jb2x1bW4sXG4gICAgICAgICAgICAgICAgbGFzdF9jb2x1bW46IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gMV0ubGFzdF9jb2x1bW5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgeXl2YWwuXyQucmFuZ2UgPSBbXG4gICAgICAgICAgICAgICAgICAgIGxzdGFja1tsc3RhY2subGVuZ3RoIC0gKGxlbiB8fCAxKV0ucmFuZ2VbMF0sXG4gICAgICAgICAgICAgICAgICAgIGxzdGFja1tsc3RhY2subGVuZ3RoIC0gMV0ucmFuZ2VbMV1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgciA9IHRoaXMucGVyZm9ybUFjdGlvbi5hcHBseSh5eXZhbCwgW1xuICAgICAgICAgICAgICAgIHl5dGV4dCxcbiAgICAgICAgICAgICAgICB5eWxlbmcsXG4gICAgICAgICAgICAgICAgeXlsaW5lbm8sXG4gICAgICAgICAgICAgICAgc2hhcmVkU3RhdGUueXksXG4gICAgICAgICAgICAgICAgYWN0aW9uWzFdLFxuICAgICAgICAgICAgICAgIHZzdGFjayxcbiAgICAgICAgICAgICAgICBsc3RhY2tcbiAgICAgICAgICAgIF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZW4pIHtcbiAgICAgICAgICAgICAgICBzdGFjayA9IHN0YWNrLnNsaWNlKDAsIC0xICogbGVuICogMik7XG4gICAgICAgICAgICAgICAgdnN0YWNrID0gdnN0YWNrLnNsaWNlKDAsIC0xICogbGVuKTtcbiAgICAgICAgICAgICAgICBsc3RhY2sgPSBsc3RhY2suc2xpY2UoMCwgLTEgKiBsZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhY2sucHVzaCh0aGlzLnByb2R1Y3Rpb25zX1thY3Rpb25bMV1dWzBdKTtcbiAgICAgICAgICAgIHZzdGFjay5wdXNoKHl5dmFsLiQpO1xuICAgICAgICAgICAgbHN0YWNrLnB1c2goeXl2YWwuXyQpO1xuICAgICAgICAgICAgbmV3U3RhdGUgPSB0YWJsZVtzdGFja1tzdGFjay5sZW5ndGggLSAyXV1bc3RhY2tbc3RhY2subGVuZ3RoIC0gMV1dO1xuICAgICAgICAgICAgc3RhY2sucHVzaChuZXdTdGF0ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59fTtcblxuXG4gICAga2F0cmEgPSByZXF1aXJlKCcuL2thdHJhJyk7XG4gICAgY29tbWFuZCA9IGthdHJhLmNvbW1hbmQ7XG4gICAga2V5d29yZCA9IGthdHJhLmtleXdvcmQ7XG4vKiBnZW5lcmF0ZWQgYnkgamlzb24tbGV4IDAuMy40ICovXG52YXIgbGV4ZXIgPSAoZnVuY3Rpb24oKXtcbnZhciBsZXhlciA9ICh7XG5cbkVPRjoxLFxuXG5wYXJzZUVycm9yOmZ1bmN0aW9uIHBhcnNlRXJyb3Ioc3RyLCBoYXNoKSB7XG4gICAgICAgIGlmICh0aGlzLnl5LnBhcnNlcikge1xuICAgICAgICAgICAgdGhpcy55eS5wYXJzZXIucGFyc2VFcnJvcihzdHIsIGhhc2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHN0cik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4vLyByZXNldHMgdGhlIGxleGVyLCBzZXRzIG5ldyBpbnB1dFxuc2V0SW5wdXQ6ZnVuY3Rpb24gKGlucHV0LCB5eSkge1xuICAgICAgICB0aGlzLnl5ID0geXkgfHwgdGhpcy55eSB8fCB7fTtcbiAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5fbW9yZSA9IHRoaXMuX2JhY2t0cmFjayA9IHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnl5bGluZW5vID0gdGhpcy55eWxlbmcgPSAwO1xuICAgICAgICB0aGlzLnl5dGV4dCA9IHRoaXMubWF0Y2hlZCA9IHRoaXMubWF0Y2ggPSAnJztcbiAgICAgICAgdGhpcy5jb25kaXRpb25TdGFjayA9IFsnSU5JVElBTCddO1xuICAgICAgICB0aGlzLnl5bGxvYyA9IHtcbiAgICAgICAgICAgIGZpcnN0X2xpbmU6IDEsXG4gICAgICAgICAgICBmaXJzdF9jb2x1bW46IDAsXG4gICAgICAgICAgICBsYXN0X2xpbmU6IDEsXG4gICAgICAgICAgICBsYXN0X2NvbHVtbjogMFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJhbmdlcykge1xuICAgICAgICAgICAgdGhpcy55eWxsb2MucmFuZ2UgPSBbMCwwXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbi8vIGNvbnN1bWVzIGFuZCByZXR1cm5zIG9uZSBjaGFyIGZyb20gdGhlIGlucHV0XG5pbnB1dDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaCA9IHRoaXMuX2lucHV0WzBdO1xuICAgICAgICB0aGlzLnl5dGV4dCArPSBjaDtcbiAgICAgICAgdGhpcy55eWxlbmcrKztcbiAgICAgICAgdGhpcy5vZmZzZXQrKztcbiAgICAgICAgdGhpcy5tYXRjaCArPSBjaDtcbiAgICAgICAgdGhpcy5tYXRjaGVkICs9IGNoO1xuICAgICAgICB2YXIgbGluZXMgPSBjaC5tYXRjaCgvKD86XFxyXFxuP3xcXG4pLiovZyk7XG4gICAgICAgIGlmIChsaW5lcykge1xuICAgICAgICAgICAgdGhpcy55eWxpbmVubysrO1xuICAgICAgICAgICAgdGhpcy55eWxsb2MubGFzdF9saW5lKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnl5bGxvYy5sYXN0X2NvbHVtbisrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnl5bGxvYy5yYW5nZVsxXSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5wdXQgPSB0aGlzLl9pbnB1dC5zbGljZSgxKTtcbiAgICAgICAgcmV0dXJuIGNoO1xuICAgIH0sXG5cbi8vIHVuc2hpZnRzIG9uZSBjaGFyIChvciBhIHN0cmluZykgaW50byB0aGUgaW5wdXRcbnVucHV0OmZ1bmN0aW9uIChjaCkge1xuICAgICAgICB2YXIgbGVuID0gY2gubGVuZ3RoO1xuICAgICAgICB2YXIgbGluZXMgPSBjaC5zcGxpdCgvKD86XFxyXFxuP3xcXG4pL2cpO1xuXG4gICAgICAgIHRoaXMuX2lucHV0ID0gY2ggKyB0aGlzLl9pbnB1dDtcbiAgICAgICAgdGhpcy55eXRleHQgPSB0aGlzLnl5dGV4dC5zdWJzdHIoMCwgdGhpcy55eXRleHQubGVuZ3RoIC0gbGVuKTtcbiAgICAgICAgLy90aGlzLnl5bGVuZyAtPSBsZW47XG4gICAgICAgIHRoaXMub2Zmc2V0IC09IGxlbjtcbiAgICAgICAgdmFyIG9sZExpbmVzID0gdGhpcy5tYXRjaC5zcGxpdCgvKD86XFxyXFxuP3xcXG4pL2cpO1xuICAgICAgICB0aGlzLm1hdGNoID0gdGhpcy5tYXRjaC5zdWJzdHIoMCwgdGhpcy5tYXRjaC5sZW5ndGggLSAxKTtcbiAgICAgICAgdGhpcy5tYXRjaGVkID0gdGhpcy5tYXRjaGVkLnN1YnN0cigwLCB0aGlzLm1hdGNoZWQubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgaWYgKGxpbmVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMueXlsaW5lbm8gLT0gbGluZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgciA9IHRoaXMueXlsbG9jLnJhbmdlO1xuXG4gICAgICAgIHRoaXMueXlsbG9jID0ge1xuICAgICAgICAgICAgZmlyc3RfbGluZTogdGhpcy55eWxsb2MuZmlyc3RfbGluZSxcbiAgICAgICAgICAgIGxhc3RfbGluZTogdGhpcy55eWxpbmVubyArIDEsXG4gICAgICAgICAgICBmaXJzdF9jb2x1bW46IHRoaXMueXlsbG9jLmZpcnN0X2NvbHVtbixcbiAgICAgICAgICAgIGxhc3RfY29sdW1uOiBsaW5lcyA/XG4gICAgICAgICAgICAgICAgKGxpbmVzLmxlbmd0aCA9PT0gb2xkTGluZXMubGVuZ3RoID8gdGhpcy55eWxsb2MuZmlyc3RfY29sdW1uIDogMClcbiAgICAgICAgICAgICAgICAgKyBvbGRMaW5lc1tvbGRMaW5lcy5sZW5ndGggLSBsaW5lcy5sZW5ndGhdLmxlbmd0aCAtIGxpbmVzWzBdLmxlbmd0aCA6XG4gICAgICAgICAgICAgIHRoaXMueXlsbG9jLmZpcnN0X2NvbHVtbiAtIGxlblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnl5bGxvYy5yYW5nZSA9IFtyWzBdLCByWzBdICsgdGhpcy55eWxlbmcgLSBsZW5dO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueXlsZW5nID0gdGhpcy55eXRleHQubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4vLyBXaGVuIGNhbGxlZCBmcm9tIGFjdGlvbiwgY2FjaGVzIG1hdGNoZWQgdGV4dCBhbmQgYXBwZW5kcyBpdCBvbiBuZXh0IGFjdGlvblxubW9yZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX21vcmUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4vLyBXaGVuIGNhbGxlZCBmcm9tIGFjdGlvbiwgc2lnbmFscyB0aGUgbGV4ZXIgdGhhdCB0aGlzIHJ1bGUgZmFpbHMgdG8gbWF0Y2ggdGhlIGlucHV0LCBzbyB0aGUgbmV4dCBtYXRjaGluZyBydWxlIChyZWdleCkgc2hvdWxkIGJlIHRlc3RlZCBpbnN0ZWFkLlxucmVqZWN0OmZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYWNrdHJhY2tfbGV4ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2JhY2t0cmFjayA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUVycm9yKCdMZXhpY2FsIGVycm9yIG9uIGxpbmUgJyArICh0aGlzLnl5bGluZW5vICsgMSkgKyAnLiBZb3UgY2FuIG9ubHkgaW52b2tlIHJlamVjdCgpIGluIHRoZSBsZXhlciB3aGVuIHRoZSBsZXhlciBpcyBvZiB0aGUgYmFja3RyYWNraW5nIHBlcnN1YXNpb24gKG9wdGlvbnMuYmFja3RyYWNrX2xleGVyID0gdHJ1ZSkuXFxuJyArIHRoaXMuc2hvd1Bvc2l0aW9uKCksIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMueXlsaW5lbm9cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuLy8gcmV0YWluIGZpcnN0IG4gY2hhcmFjdGVycyBvZiB0aGUgbWF0Y2hcbmxlc3M6ZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgdGhpcy51bnB1dCh0aGlzLm1hdGNoLnNsaWNlKG4pKTtcbiAgICB9LFxuXG4vLyBkaXNwbGF5cyBhbHJlYWR5IG1hdGNoZWQgaW5wdXQsIGkuZS4gZm9yIGVycm9yIG1lc3NhZ2VzXG5wYXN0SW5wdXQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFzdCA9IHRoaXMubWF0Y2hlZC5zdWJzdHIoMCwgdGhpcy5tYXRjaGVkLmxlbmd0aCAtIHRoaXMubWF0Y2gubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIChwYXN0Lmxlbmd0aCA+IDIwID8gJy4uLic6JycpICsgcGFzdC5zdWJzdHIoLTIwKS5yZXBsYWNlKC9cXG4vZywgXCJcIik7XG4gICAgfSxcblxuLy8gZGlzcGxheXMgdXBjb21pbmcgaW5wdXQsIGkuZS4gZm9yIGVycm9yIG1lc3NhZ2VzXG51cGNvbWluZ0lucHV0OmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5leHQgPSB0aGlzLm1hdGNoO1xuICAgICAgICBpZiAobmV4dC5sZW5ndGggPCAyMCkge1xuICAgICAgICAgICAgbmV4dCArPSB0aGlzLl9pbnB1dC5zdWJzdHIoMCwgMjAtbmV4dC5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobmV4dC5zdWJzdHIoMCwyMCkgKyAobmV4dC5sZW5ndGggPiAyMCA/ICcuLi4nIDogJycpKS5yZXBsYWNlKC9cXG4vZywgXCJcIik7XG4gICAgfSxcblxuLy8gZGlzcGxheXMgdGhlIGNoYXJhY3RlciBwb3NpdGlvbiB3aGVyZSB0aGUgbGV4aW5nIGVycm9yIG9jY3VycmVkLCBpLmUuIGZvciBlcnJvciBtZXNzYWdlc1xuc2hvd1Bvc2l0aW9uOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByZSA9IHRoaXMucGFzdElucHV0KCk7XG4gICAgICAgIHZhciBjID0gbmV3IEFycmF5KHByZS5sZW5ndGggKyAxKS5qb2luKFwiLVwiKTtcbiAgICAgICAgcmV0dXJuIHByZSArIHRoaXMudXBjb21pbmdJbnB1dCgpICsgXCJcXG5cIiArIGMgKyBcIl5cIjtcbiAgICB9LFxuXG4vLyB0ZXN0IHRoZSBsZXhlZCB0b2tlbjogcmV0dXJuIEZBTFNFIHdoZW4gbm90IGEgbWF0Y2gsIG90aGVyd2lzZSByZXR1cm4gdG9rZW5cbnRlc3RfbWF0Y2g6ZnVuY3Rpb24gKG1hdGNoLCBpbmRleGVkX3J1bGUpIHtcbiAgICAgICAgdmFyIHRva2VuLFxuICAgICAgICAgICAgbGluZXMsXG4gICAgICAgICAgICBiYWNrdXA7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYWNrdHJhY2tfbGV4ZXIpIHtcbiAgICAgICAgICAgIC8vIHNhdmUgY29udGV4dFxuICAgICAgICAgICAgYmFja3VwID0ge1xuICAgICAgICAgICAgICAgIHl5bGluZW5vOiB0aGlzLnl5bGluZW5vLFxuICAgICAgICAgICAgICAgIHl5bGxvYzoge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdF9saW5lOiB0aGlzLnl5bGxvYy5maXJzdF9saW5lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0X2xpbmU6IHRoaXMubGFzdF9saW5lLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdF9jb2x1bW46IHRoaXMueXlsbG9jLmZpcnN0X2NvbHVtbixcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9jb2x1bW46IHRoaXMueXlsbG9jLmxhc3RfY29sdW1uXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB5eXRleHQ6IHRoaXMueXl0ZXh0LFxuICAgICAgICAgICAgICAgIG1hdGNoOiB0aGlzLm1hdGNoLFxuICAgICAgICAgICAgICAgIG1hdGNoZXM6IHRoaXMubWF0Y2hlcyxcbiAgICAgICAgICAgICAgICBtYXRjaGVkOiB0aGlzLm1hdGNoZWQsXG4gICAgICAgICAgICAgICAgeXlsZW5nOiB0aGlzLnl5bGVuZyxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0LFxuICAgICAgICAgICAgICAgIF9tb3JlOiB0aGlzLl9tb3JlLFxuICAgICAgICAgICAgICAgIF9pbnB1dDogdGhpcy5faW5wdXQsXG4gICAgICAgICAgICAgICAgeXk6IHRoaXMueXksXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uU3RhY2s6IHRoaXMuY29uZGl0aW9uU3RhY2suc2xpY2UoMCksXG4gICAgICAgICAgICAgICAgZG9uZTogdGhpcy5kb25lXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBiYWNrdXAueXlsbG9jLnJhbmdlID0gdGhpcy55eWxsb2MucmFuZ2Uuc2xpY2UoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsaW5lcyA9IG1hdGNoWzBdLm1hdGNoKC8oPzpcXHJcXG4/fFxcbikuKi9nKTtcbiAgICAgICAgaWYgKGxpbmVzKSB7XG4gICAgICAgICAgICB0aGlzLnl5bGluZW5vICs9IGxpbmVzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnl5bGxvYyA9IHtcbiAgICAgICAgICAgIGZpcnN0X2xpbmU6IHRoaXMueXlsbG9jLmxhc3RfbGluZSxcbiAgICAgICAgICAgIGxhc3RfbGluZTogdGhpcy55eWxpbmVubyArIDEsXG4gICAgICAgICAgICBmaXJzdF9jb2x1bW46IHRoaXMueXlsbG9jLmxhc3RfY29sdW1uLFxuICAgICAgICAgICAgbGFzdF9jb2x1bW46IGxpbmVzID9cbiAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lc1tsaW5lcy5sZW5ndGggLSAxXS5sZW5ndGggLSBsaW5lc1tsaW5lcy5sZW5ndGggLSAxXS5tYXRjaCgvXFxyP1xcbj8vKVswXS5sZW5ndGggOlxuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueXlsbG9jLmxhc3RfY29sdW1uICsgbWF0Y2hbMF0ubGVuZ3RoXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMueXl0ZXh0ICs9IG1hdGNoWzBdO1xuICAgICAgICB0aGlzLm1hdGNoICs9IG1hdGNoWzBdO1xuICAgICAgICB0aGlzLm1hdGNoZXMgPSBtYXRjaDtcbiAgICAgICAgdGhpcy55eWxlbmcgPSB0aGlzLnl5dGV4dC5sZW5ndGg7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnl5bGxvYy5yYW5nZSA9IFt0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKz0gdGhpcy55eWxlbmddO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21vcmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYmFja3RyYWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gdGhpcy5faW5wdXQuc2xpY2UobWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5tYXRjaGVkICs9IG1hdGNoWzBdO1xuICAgICAgICB0b2tlbiA9IHRoaXMucGVyZm9ybUFjdGlvbi5jYWxsKHRoaXMsIHRoaXMueXksIHRoaXMsIGluZGV4ZWRfcnVsZSwgdGhpcy5jb25kaXRpb25TdGFja1t0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgaWYgKHRoaXMuZG9uZSAmJiB0aGlzLl9pbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYmFja3RyYWNrKSB7XG4gICAgICAgICAgICAvLyByZWNvdmVyIGNvbnRleHRcbiAgICAgICAgICAgIGZvciAodmFyIGsgaW4gYmFja3VwKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trXSA9IGJhY2t1cFtrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gcnVsZSBhY3Rpb24gY2FsbGVkIHJlamVjdCgpIGltcGx5aW5nIHRoZSBuZXh0IHJ1bGUgc2hvdWxkIGJlIHRlc3RlZCBpbnN0ZWFkLlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4vLyByZXR1cm4gbmV4dCBtYXRjaCBpbiBpbnB1dFxubmV4dDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkVPRjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2lucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRva2VuLFxuICAgICAgICAgICAgbWF0Y2gsXG4gICAgICAgICAgICB0ZW1wTWF0Y2gsXG4gICAgICAgICAgICBpbmRleDtcbiAgICAgICAgaWYgKCF0aGlzLl9tb3JlKSB7XG4gICAgICAgICAgICB0aGlzLnl5dGV4dCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5tYXRjaCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBydWxlcyA9IHRoaXMuX2N1cnJlbnRSdWxlcygpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0ZW1wTWF0Y2ggPSB0aGlzLl9pbnB1dC5tYXRjaCh0aGlzLnJ1bGVzW3J1bGVzW2ldXSk7XG4gICAgICAgICAgICBpZiAodGVtcE1hdGNoICYmICghbWF0Y2ggfHwgdGVtcE1hdGNoWzBdLmxlbmd0aCA+IG1hdGNoWzBdLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRlbXBNYXRjaDtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5iYWNrdHJhY2tfbGV4ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSB0aGlzLnRlc3RfbWF0Y2godGVtcE1hdGNoLCBydWxlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9iYWNrdHJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTsgLy8gcnVsZSBhY3Rpb24gY2FsbGVkIHJlamVjdCgpIGltcGx5aW5nIGEgcnVsZSBNSVNtYXRjaC5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2U6IHRoaXMgaXMgYSBsZXhlciBydWxlIHdoaWNoIGNvbnN1bWVzIGlucHV0IHdpdGhvdXQgcHJvZHVjaW5nIGEgdG9rZW4gKGUuZy4gd2hpdGVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5mbGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHRva2VuID0gdGhpcy50ZXN0X21hdGNoKG1hdGNoLCBydWxlc1tpbmRleF0pO1xuICAgICAgICAgICAgaWYgKHRva2VuICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGVsc2U6IHRoaXMgaXMgYSBsZXhlciBydWxlIHdoaWNoIGNvbnN1bWVzIGlucHV0IHdpdGhvdXQgcHJvZHVjaW5nIGEgdG9rZW4gKGUuZy4gd2hpdGVzcGFjZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faW5wdXQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkVPRjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlRXJyb3IoJ0xleGljYWwgZXJyb3Igb24gbGluZSAnICsgKHRoaXMueXlsaW5lbm8gKyAxKSArICcuIFVucmVjb2duaXplZCB0ZXh0LlxcbicgKyB0aGlzLnNob3dQb3NpdGlvbigpLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogbnVsbCxcbiAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLnl5bGluZW5vXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbi8vIHJldHVybiBuZXh0IG1hdGNoIHRoYXQgaGFzIGEgdG9rZW5cbmxleDpmdW5jdGlvbiBsZXgoKSB7XG4gICAgICAgIHZhciByID0gdGhpcy5uZXh0KCk7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxleCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuLy8gYWN0aXZhdGVzIGEgbmV3IGxleGVyIGNvbmRpdGlvbiBzdGF0ZSAocHVzaGVzIHRoZSBuZXcgbGV4ZXIgY29uZGl0aW9uIHN0YXRlIG9udG8gdGhlIGNvbmRpdGlvbiBzdGFjaylcbmJlZ2luOmZ1bmN0aW9uIGJlZ2luKGNvbmRpdGlvbikge1xuICAgICAgICB0aGlzLmNvbmRpdGlvblN0YWNrLnB1c2goY29uZGl0aW9uKTtcbiAgICB9LFxuXG4vLyBwb3AgdGhlIHByZXZpb3VzbHkgYWN0aXZlIGxleGVyIGNvbmRpdGlvbiBzdGF0ZSBvZmYgdGhlIGNvbmRpdGlvbiBzdGFja1xucG9wU3RhdGU6ZnVuY3Rpb24gcG9wU3RhdGUoKSB7XG4gICAgICAgIHZhciBuID0gdGhpcy5jb25kaXRpb25TdGFjay5sZW5ndGggLSAxO1xuICAgICAgICBpZiAobiA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvblN0YWNrLnBvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uU3RhY2tbMF07XG4gICAgICAgIH1cbiAgICB9LFxuXG4vLyBwcm9kdWNlIHRoZSBsZXhlciBydWxlIHNldCB3aGljaCBpcyBhY3RpdmUgZm9yIHRoZSBjdXJyZW50bHkgYWN0aXZlIGxleGVyIGNvbmRpdGlvbiBzdGF0ZVxuX2N1cnJlbnRSdWxlczpmdW5jdGlvbiBfY3VycmVudFJ1bGVzKCkge1xuICAgICAgICBpZiAodGhpcy5jb25kaXRpb25TdGFjay5sZW5ndGggJiYgdGhpcy5jb25kaXRpb25TdGFja1t0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25kaXRpb25zW3RoaXMuY29uZGl0aW9uU3RhY2tbdGhpcy5jb25kaXRpb25TdGFjay5sZW5ndGggLSAxXV0ucnVsZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25kaXRpb25zW1wiSU5JVElBTFwiXS5ydWxlcztcbiAgICAgICAgfVxuICAgIH0sXG5cbi8vIHJldHVybiB0aGUgY3VycmVudGx5IGFjdGl2ZSBsZXhlciBjb25kaXRpb24gc3RhdGU7IHdoZW4gYW4gaW5kZXggYXJndW1lbnQgaXMgcHJvdmlkZWQgaXQgcHJvZHVjZXMgdGhlIE4tdGggcHJldmlvdXMgY29uZGl0aW9uIHN0YXRlLCBpZiBhdmFpbGFibGVcbnRvcFN0YXRlOmZ1bmN0aW9uIHRvcFN0YXRlKG4pIHtcbiAgICAgICAgbiA9IHRoaXMuY29uZGl0aW9uU3RhY2subGVuZ3RoIC0gMSAtIE1hdGguYWJzKG4gfHwgMCk7XG4gICAgICAgIGlmIChuID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvblN0YWNrW25dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiSU5JVElBTFwiO1xuICAgICAgICB9XG4gICAgfSxcblxuLy8gYWxpYXMgZm9yIGJlZ2luKGNvbmRpdGlvbilcbnB1c2hTdGF0ZTpmdW5jdGlvbiBwdXNoU3RhdGUoY29uZGl0aW9uKSB7XG4gICAgICAgIHRoaXMuYmVnaW4oY29uZGl0aW9uKTtcbiAgICB9LFxuXG4vLyByZXR1cm4gdGhlIG51bWJlciBvZiBzdGF0ZXMgY3VycmVudGx5IG9uIHRoZSBzdGFja1xuc3RhdGVTdGFja1NpemU6ZnVuY3Rpb24gc3RhdGVTdGFja1NpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aDtcbiAgICB9LFxub3B0aW9uczoge30sXG5wZXJmb3JtQWN0aW9uOiBmdW5jdGlvbiBhbm9ueW1vdXMoeXkseXlfLCRhdm9pZGluZ19uYW1lX2NvbGxpc2lvbnMsWVlfU1RBUlQpIHtcbnZhciBZWVNUQVRFPVlZX1NUQVJUO1xuc3dpdGNoKCRhdm9pZGluZ19uYW1lX2NvbGxpc2lvbnMpIHtcbmNhc2UgMDpyZXR1cm4gNTtcbmJyZWFrO1xuY2FzZSAxOi8qIHNraXAgd2hpdGVzcGFjZSAqLztcbmJyZWFrO1xuY2FzZSAyOnJldHVybiA5NztcbmJyZWFrO1xuY2FzZSAzOnJldHVybiA5ODtcbmJyZWFrO1xuY2FzZSA0OnJldHVybiA5NjtcbmJyZWFrO1xuY2FzZSA1OnJldHVybiA5NTtcbmJyZWFrO1xuY2FzZSA2OnJldHVybiA5OTtcbmJyZWFrO1xuY2FzZSA3OnJldHVybiA4NztcbmJyZWFrO1xuY2FzZSA4OnJldHVybiA0NjtcbmJyZWFrO1xuY2FzZSA5OnJldHVybiA4ODtcbmJyZWFrO1xuY2FzZSAxMDpyZXR1cm4gOTI7XG5icmVhaztcbmNhc2UgMTE6cmV0dXJuIDkwO1xuYnJlYWs7XG5jYXNlIDEyOnJldHVybiA5MTtcbmJyZWFrO1xuY2FzZSAxMzpyZXR1cm4gODk7XG5icmVhaztcbmNhc2UgMTQ6cmV0dXJuIDkzO1xuYnJlYWs7XG5jYXNlIDE1OnJldHVybiA5NDtcbmJyZWFrO1xuY2FzZSAxNjpyZXR1cm4gODU7XG5icmVhaztcbmNhc2UgMTc6cmV0dXJuIDg0O1xuYnJlYWs7XG5jYXNlIDE4OnJldHVybiA4NjtcbmJyZWFrO1xuY2FzZSAxOTpyZXR1cm4gMzY7XG5icmVhaztcbmNhc2UgMjA6cmV0dXJuIDM3O1xuYnJlYWs7XG5jYXNlIDIxOnJldHVybiAxMDA7XG5icmVhaztcbmNhc2UgMjI6cmV0dXJuIDEwMjtcbmJyZWFrO1xuY2FzZSAyMzpyZXR1cm4gNTI7XG5icmVhaztcbmNhc2UgMjQ6cmV0dXJuICc6JztcbmJyZWFrO1xuY2FzZSAyNTpyZXR1cm4gNzg7XG5icmVhaztcbmNhc2UgMjY6cmV0dXJuIDE1O1xuYnJlYWs7XG5jYXNlIDI3OnJldHVybiAxNjtcbmJyZWFrO1xuY2FzZSAyODpyZXR1cm4gMTc7XG5icmVhaztcbmNhc2UgMjk6cmV0dXJuIDExO1xuYnJlYWs7XG5jYXNlIDMwOnJldHVybiAxODtcbmJyZWFrO1xuY2FzZSAzMTpyZXR1cm4gMTk7XG5icmVhaztcbmNhc2UgMzI6cmV0dXJuIDIwO1xuYnJlYWs7XG5jYXNlIDMzOnJldHVybiAyMTtcbmJyZWFrO1xuY2FzZSAzNDpyZXR1cm4gMjI7XG5icmVhaztcbmNhc2UgMzU6cmV0dXJuIDIzO1xuYnJlYWs7XG5jYXNlIDM2OnJldHVybiAyNDtcbmJyZWFrO1xuY2FzZSAzNzpyZXR1cm4gMTQ7XG5icmVhaztcbmNhc2UgMzg6cmV0dXJuIDI1O1xuYnJlYWs7XG5jYXNlIDM5OnJldHVybiAyNjtcbmJyZWFrO1xuY2FzZSA0MDpyZXR1cm4gMjdcbmJyZWFrO1xuY2FzZSA0MTpyZXR1cm4gMjg7XG5icmVhaztcbmNhc2UgNDI6cmV0dXJuIDI5O1xuYnJlYWs7XG5jYXNlIDQzOnJldHVybiAzMTtcbmJyZWFrO1xuY2FzZSA0NDpyZXR1cm4gMzI7XG5icmVhaztcbmNhc2UgNDU6cmV0dXJuIDMzO1xuYnJlYWs7XG5jYXNlIDQ2OnJldHVybiAzNDtcbmJyZWFrO1xuY2FzZSA0NzpyZXR1cm4gMTAzO1xuYnJlYWs7XG5jYXNlIDQ4OnJldHVybiAxMDQ7XG5icmVhaztcbmNhc2UgNDk6cmV0dXJuIDEwNTtcbmJyZWFrO1xuY2FzZSA1MDpyZXR1cm4gMTA2O1xuYnJlYWs7XG5jYXNlIDUxOnJldHVybiAxMDc7XG5icmVhaztcbmNhc2UgNTI6cmV0dXJuIDEwODtcbmJyZWFrO1xuY2FzZSA1MzpyZXR1cm4gMTA5O1xuYnJlYWs7XG5jYXNlIDU0OnJldHVybiAxMTA7XG5icmVhaztcbmNhc2UgNTU6cmV0dXJuIDExMTtcbmJyZWFrO1xuY2FzZSA1NjpyZXR1cm4gMTEyO1xuYnJlYWs7XG5jYXNlIDU3OnJldHVybiAxMTM7XG5icmVhaztcbmNhc2UgNTg6cmV0dXJuIDExNTtcbmJyZWFrO1xuY2FzZSA1OTpyZXR1cm4gMTE2O1xuYnJlYWs7XG5jYXNlIDYwOnJldHVybiAxMTc7XG5icmVhaztcbmNhc2UgNjE6cmV0dXJuIDExODtcbmJyZWFrO1xuY2FzZSA2MjpyZXR1cm4gMTE5O1xuYnJlYWs7XG5jYXNlIDYzOnJldHVybiAxMjA7XG5icmVhaztcbmNhc2UgNjQ6cmV0dXJuIDEyMTtcbmJyZWFrO1xuY2FzZSA2NTpyZXR1cm4gMTIyO1xuYnJlYWs7XG5jYXNlIDY2OnJldHVybiAxMjM7XG5icmVhaztcbmNhc2UgNjc6cmV0dXJuIDEyNDtcbmJyZWFrO1xuY2FzZSA2ODpyZXR1cm4gMTM7XG5icmVhaztcbmNhc2UgNjk6cmV0dXJuIDM4O1xuYnJlYWs7XG5jYXNlIDcwOnJldHVybiA3MjtcbmJyZWFrO1xuY2FzZSA3MTpyZXR1cm4gMzk7XG5icmVhaztcbmNhc2UgNzI6cmV0dXJuIDM1O1xuYnJlYWs7XG5jYXNlIDczOnJldHVybiA0MTtcbmJyZWFrO1xuY2FzZSA3NDpyZXR1cm4gNDM7XG5icmVhaztcbmNhc2UgNzU6cmV0dXJuIDQ4O1xuYnJlYWs7XG5jYXNlIDc2OnJldHVybiA0OTtcbmJyZWFrO1xuY2FzZSA3NzpyZXR1cm4gNTA7XG5icmVhaztcbmNhc2UgNzg6cmV0dXJuIDUzO1xuYnJlYWs7XG5jYXNlIDc5OnJldHVybiA2MDtcbmJyZWFrO1xuY2FzZSA4MDpyZXR1cm4gNTc7XG5icmVhaztcbmNhc2UgODE6cmV0dXJuIDU2O1xuYnJlYWs7XG5jYXNlIDgyOnJldHVybiA2MTtcbmJyZWFrO1xuY2FzZSA4MzpyZXR1cm4gNjM7XG5icmVhaztcbmNhc2UgODQ6cmV0dXJuIDY1O1xuYnJlYWs7XG5jYXNlIDg1OnJldHVybiA2NztcbmJyZWFrO1xuY2FzZSA4NjpyZXR1cm4gNjlcbmJyZWFrO1xuY2FzZSA4NzpyZXR1cm4gNzM7XG5icmVhaztcbmNhc2UgODg6cmV0dXJuICdPRkYnO1xuYnJlYWs7XG5jYXNlIDg5OnJldHVybiA1ODtcbmJyZWFrO1xuY2FzZSA5MDpyZXR1cm4gJ09OJztcbmJyZWFrO1xuY2FzZSA5MTpyZXR1cm4gNzQ7XG5icmVhaztcbmNhc2UgOTI6cmV0dXJuIDMwO1xuYnJlYWs7XG5jYXNlIDkzOnJldHVybiA3OTtcbmJyZWFrO1xuY2FzZSA5NDpyZXR1cm4gODI7XG5icmVhaztcbmNhc2UgOTU6cmV0dXJuIDcwO1xuYnJlYWs7XG5jYXNlIDk2OnJldHVybiA4MDtcbmJyZWFrO1xuY2FzZSA5NzpyZXR1cm4gODFcbmJyZWFrO1xuY2FzZSA5ODpyZXR1cm4gNTU7XG5icmVhaztcbmNhc2UgOTk6cmV0dXJuIDgzO1xuYnJlYWs7XG5jYXNlIDEwMDpyZXR1cm4gNjI7XG5icmVhaztcbmNhc2UgMTAxOnJldHVybiA1NDtcbmJyZWFrO1xuY2FzZSAxMDI6cmV0dXJuIDc3O1xuYnJlYWs7XG5jYXNlIDEwMzpyZXR1cm4gNzE7XG5icmVhaztcbmNhc2UgMTA0OnJldHVybiAxMjY7XG5icmVhaztcbmNhc2UgMTA1OnJldHVybiAxMDtcbmJyZWFrO1xuY2FzZSAxMDY6cmV0dXJuIDEyO1xuYnJlYWs7XG5jYXNlIDEwNzpyZXR1cm4gNDQ7XG5icmVhaztcbmNhc2UgMTA4OnJldHVybiA0NTtcbmJyZWFrO1xuY2FzZSAxMDk6cmV0dXJuIDUxO1xuYnJlYWs7XG5jYXNlIDExMDpyZXR1cm4gNjtcbmJyZWFrO1xuY2FzZSAxMTE6cmV0dXJuICdJTlZBTElEJztcbmJyZWFrO1xufVxufSxcbnJ1bGVzOiBbL14oPzpcXG4pLywvXig/OltcXHQgXSspLywvXig/OlxcKikvLC9eKD86XFwvKS8sL14oPzotKS8sL14oPzpcXCspLywvXig/OlxcXikvLC9eKD86PT0pLywvXig/Oj0pLywvXig/Ojw+KS8sL14oPzo8PSkvLC9eKD86Pj0pLywvXig/OjwpLywvXig/Oj4pLywvXig/OihbTW1dW0FhXVtYeF0pKS8sL14oPzooW01tXVtJaV1bTm5dKSkvLC9eKD86KFtBYV1bTm5dW0RkXSkpLywvXig/OihbT29dW1JyXSkpLywvXig/OihbTm5dW09vXVtUdF0pKS8sL14oPzpcXCgpLywvXig/OlxcKSkvLC9eKD86XFxbKS8sL14oPzpcXF0pLywvXig/OiwpLywvXig/OjopLywvXig/OjspLywvXig/OihbVHRdW1JyXVtPb11bTm5dKSkvLC9eKD86KFtUdF1bUnJdW09vXVtGZl1bRmZdKSkvLC9eKD86KFtBYV1bUHBdW1BwXVtFZV0/W05uXT9bRGRdP1tcXC1dKFtcXCRcXCpcXEBcXCFcXCNdP1tBLVphLXpdW0EtWmEtejAtOV0rKSkpLywvXig/OihbQWFdW1R0XVtBYV1bUnJdW0lpXSkpLywvXig/OihbQ2NdW0FhXVtUdF1bQWFdP1tMbF0/W09vXT9bR2ddPykpLywvXig/OihbRGRdW0VlXVtMbF1bRWVdP1tUdF0/W0VlXT8oW1xcLV0oWzAtOSxdKykpPykpLywvXig/OihbRGRdW0lpXVtScl0pKS8sL14oPzooW0VlXVtYeF1bRWVdW0NjXT9bVXVdP1tUdF0/W0VlXT9bXFwtXShbXFwkXFwqXFxAXFwhXFwjXT9bQS1aYS16XVtBLVphLXowLTldKykpKS8sL14oPzooW0ZmXVtJaV1bTGxdW0VlXVtTc10pKS8sL14oPzooW0dnXVtFZV1bVHRdW1xcLV0oW1xcJFxcKlxcQFxcIVxcI10/W0EtWmEtel1bQS1aYS16MC05XSspKSkvLC9eKD86KFtHZ11bUnJdW09vXVtVdV0/W1BwXT8pKS8sL14oPzooW0dnXVtXd11bQmJdP1tBYV0/W1NzXT9bSWldP1tDY10/KSkvLC9eKD86KFtMbF1bSWldW0JiXVtScl0/W0FhXT9bUnJdP1tZeV0/KSkvLC9eKD86KFtMbF1bSWldW1NzXVtUdF0/KFtcXC1dKFswLTksXSspKT8pKS8sL14oPzooW05uXVtBYV1bTW1dW0VlXT9bXFwtXShbXFwkXFwqXFxAXFwhXFwjXT9bQS1aYS16XVtBLVphLXowLTldKykpKS8sL14oPzooW1BwXVtVdV1bUnJdW0dnXT9bRWVdP1tcXC1dKFtcXCRcXCpcXEBcXCFcXCNdP1tBLVphLXpdW0EtWmEtejAtOV0rKSkpLywvXig/OihbUnJdW0VlXVtObl1bVXVdP1tNbV0/W0JiXT9bRWVdP1tScl0/KFtcXC1dKFswLTksXSspKT8pKS8sL14oPzooW1JyXVtVdV1bTm5dKFtcXC1dKFswLTldKSspPykpLywvXig/OihbU3NdW0FhXVtWdl1bRWVdPykpLywvXig/OihbU3NdW0NjXVtScl1bQWFdP1tUdF0/W0NjXT9bSGhdPykpLywvXig/OihbVHRdW0VlXVtTc11bVHRdPykpLywvXig/OihbQWFdW0JiXVtTc10pKS8sL14oPzooW0FhXVtUdF1bTm5dKSkvLC9eKD86KFtDY11bT29dW1NzXSkpLywvXig/OihbRWVdW1h4XVtQcF0pKS8sL14oPzooW0lpXVtObl1bVHRdKSkvLC9eKD86KFtMbF1bRWVdW05uXSkpLywvXig/OihbTGxdW0lpXVtObl0pKS8sL14oPzooW0xsXVtPb11bR2ddKSkvLC9eKD86KFtScl1bTm5dW0RkXSkpLywvXig/OihbU3NdW0dnXVtObl0pKS8sL14oPzooW1NzXVtJaV1bTm5dKSkvLC9eKD86KFtTc11bUXFdW1JyXSkpLywvXig/OihbVHRdW0FhXVtCYl0pKS8sL14oPzooW1R0XVtBYV1bTm5dKSkvLC9eKD86KFtUdF1bSWldW01tXSkpLywvXig/OihbTGxdW0NjXVtBYV1bU3NdW0VlXVtcXCRdKSkvLC9eKD86KFtMbF1bRWVdW0ZmXVtUdF1bXFwkXSkpLywvXig/OihbTW1dW0lpXVtEZF1bXFwkXSkpLywvXig/OihbUnJdW0lpXVtHZ11bSGhdW1R0XVtcXCRdKSkvLC9eKD86KFtTc11bVXVdW0JiXVtTc11bVHRdW1JyXSkpLywvXig/OihbVXVdW0NjXVtBYV1bU3NdW0VlXVtcXCRdKSkvLC9eKD86KFtDY11bTGxdW1NzXSkpLywvXig/OihbQ2NdW0hoXVtBYV1bSWldW05uXSkpLywvXig/OihbQ2NdW09vXVtObl0pKS8sL14oPzooW0NjXVtPb11bTW1dKSkvLC9eKD86KFtCYl1bQWFdW1NzXVtFZV0pKS8sL14oPzooW0RkXVtBYV1bVHRdW0FhXSkpLywvXig/OihbRGRdW0VlXVtGZl0pKS8sL14oPzooW0RkXVtJaV1bTW1dKSkvLC9eKD86KFtFZV1bTm5dW0RkXSkpLywvXig/OihbRWVdW05uXVtUdF1bRWVdW1JyXSkpLywvXig/OihbRmZdW09vXVtScl0pKS8sL14oPzooW0dnXVtPb11bU3NdW1V1XVtCYl0pKS8sL14oPzooW0dnXVtPb11bVHRdW09vXSkpLywvXig/OihbR2ddW09vXSkpLywvXig/OihbSWldW0ZmXSkpLywvXig/OihbSWldW01tXVtBYV1bR2ddW0VlXSkpLywvXig/OihbSWldW05uXVtQcF1bVXVdW1R0XSkpLywvXig/OihbTGxdW0VlXVtUdF0pKS8sL14oPzooW01tXVtBYV1bVHRdKSkvLC9eKD86KFtObl1bRWVdW1h4XVtUdF0pKS8sL14oPzp7T0ZGfSkvLC9eKD86KFtPb11bRmZdKSkvLC9eKD86e09OfSkvLC9eKD86KFtQcF1bUnJdW0lpXVtObl1bVHRdKSkvLC9eKD86KFtRcV1bVXVdW0lpXVtUdF0pKS8sL14oPzooW1JyXVtBYV1bTm5dW0RkXVtPb11bTW1dW0lpXVtael1bRWVdKSkvLC9eKD86KFtScl1bRWVdW01tXSkuKikvLC9eKD86KFtScl1bRWVdW0FhXVtEZF0pKS8sL14oPzooW1JyXVtFZV1bU3NdW1R0XVtPb11bUnJdW0VlXSkpLywvXig/OihbUnJdW0VlXVtUdF1bVXVdW1JyXVtObl0pKS8sL14oPzooW1NzXVtUdF1bRWVdW1BwXSkpLywvXig/OihbU3NdW1R0XVtPb11bUHBdKSkvLC9eKD86KFtUdF1bSGhdW0VlXVtObl0pKS8sL14oPzooW1R0XVtPb10pKS8sL14oPzooW1V1XVtTc11bSWldW05uXVtHZ10pKS8sL14oPzooW1p6XVtFZV1bUnJdKSkvLC9eKD86KChbMC05XSkqXFwuKFswLTldKSsoW2VFXVstK10/WzAtOV0rKT8pKS8sL14oPzooKFswLTldKSspKS8sL14oPzooXCJbXlwiXSpcIikpLywvXig/OihbRmZdW05uXShbQS1aYS16XSkpKS8sL14oPzooKChbQS1aYS16XSkoW0EtWmEtejAtOV0pPylbJCVdPykpLywvXig/OihbXFwjXShbQS1aYS16XSkpKS8sL14oPzokKS8sL14oPzouKS9dLFxuY29uZGl0aW9uczoge1wiSU5JVElBTFwiOntcInJ1bGVzXCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNDgsNDksNTAsNTEsNTIsNTMsNTQsNTUsNTYsNTcsNTgsNTksNjAsNjEsNjIsNjMsNjQsNjUsNjYsNjcsNjgsNjksNzAsNzEsNzIsNzMsNzQsNzUsNzYsNzcsNzgsNzksODAsODEsODIsODMsODQsODUsODYsODcsODgsODksOTAsOTEsOTIsOTMsOTQsOTUsOTYsOTcsOTgsOTksMTAwLDEwMSwxMDIsMTAzLDEwNCwxMDUsMTA2LDEwNywxMDgsMTA5LDExMCwxMTFdLFwiaW5jbHVzaXZlXCI6dHJ1ZX19XG59KTtcbnJldHVybiBsZXhlcjtcbn0pKCk7XG5wYXJzZXIubGV4ZXIgPSBsZXhlcjtcbmZ1bmN0aW9uIFBhcnNlciAoKSB7XG4gIHRoaXMueXkgPSB7fTtcbn1cblBhcnNlci5wcm90b3R5cGUgPSBwYXJzZXI7cGFyc2VyLlBhcnNlciA9IFBhcnNlcjtcbnJldHVybiBuZXcgUGFyc2VyO1xufSkoKTtcblxuXG5pZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuZXhwb3J0cy5wYXJzZXIgPSBwYXJzZXI7XG5leHBvcnRzLlBhcnNlciA9IHBhcnNlci5QYXJzZXI7XG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFyc2VyLnBhcnNlLmFwcGx5KHBhcnNlciwgYXJndW1lbnRzKTsgfTtcbmV4cG9ydHMubWFpbiA9IGZ1bmN0aW9uIGNvbW1vbmpzTWFpbihhcmdzKSB7XG4gICAgaWYgKCFhcmdzWzFdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2FnZTogJythcmdzWzBdKycgRklMRScpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuICAgIHZhciBzb3VyY2UgPSByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhyZXF1aXJlKCdwYXRoJykubm9ybWFsaXplKGFyZ3NbMV0pLCBcInV0ZjhcIik7XG4gICAgcmV0dXJuIGV4cG9ydHMucGFyc2VyLnBhcnNlKHNvdXJjZSk7XG59O1xuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIGV4cG9ydHMubWFpbihwcm9jZXNzLmFyZ3Yuc2xpY2UoMSkpO1xufVxufVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLF9fZGlybmFtZSl7XG4vLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG52YXIgQ29uc29sZSwgRmlsZVN5c3RlbSwgTU9ERV9SRVBMLCBNT0RFX1JVTiwgcnRlLFxuICBfX2JpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9O1xuXG5NT0RFX1JFUEwgPSAwO1xuXG5NT0RFX1JVTiA9IDE7XG5cbm1vZHVsZS5leHBvcnRzID0gcnRlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cgIT09IG51bGwgPyB7XG4gIENvbnNvbGU6IENvbnNvbGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgcmVxdWlyZSgnLi9rYXRyYS5jb25zb2xlJyk7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5hdXRvZm9jdXMgPSB0cnVlO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucHJvbXB0ID0gJz4nO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucHJvbXB0QWx0ID0gJz8nO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuaGlzdG9yeSA9IHRydWU7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS50aXRsZSA9ICcnO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUubW9kZSA9IE1PREVfUkVQTDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmVsZW1lbnQgPSAnJztcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmNvbnNvbGUgPSBudWxsO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuYnVmZmVyID0gbnVsbDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnZhcnMgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gQ29uc29sZShlbGVtZW50LCBwcm9tcHQpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQgOiAnLmNvbnNvbGUnO1xuICAgICAgdGhpcy5wcm9tcHQgPSBwcm9tcHQgIT0gbnVsbCA/IHByb21wdCA6ICc+JztcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5jb21tYW5kVmFsaWRhdGUgPSBmdW5jdGlvbigkbGluZSkge1xuICAgICAgaWYgKCRsaW5lID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5pbnB1dCA9IGZ1bmN0aW9uKCRwcm9tcHQsICR2YXJzKSB7XG4gICAgICBpZiAoJHByb21wdCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucHJpbnQoJHByb21wdCk7XG4gICAgICB9XG4gICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgdGhpcy52YXJzID0gJHZhcnM7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigkc2V0KSB7fTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnNldFByb21wdCA9IGZ1bmN0aW9uKCRwcm9tcHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnNvbGUuc2V0UHJvbXB0KCRwcm9tcHQpO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5zZXRNb2RlID0gZnVuY3Rpb24oJG1vZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGUgPSAkbW9kZTtcbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuZGVidWcgPSBmdW5jdGlvbigkdGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc29sZS5kZWJ1ZygkdGV4dCk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmhpbGl0ZSA9IGZ1bmN0aW9uKCR0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zb2xlLmhpbGl0ZSgkdGV4dCk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnByaW50ID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnNvbGUucHJpbnQoJHRleHQpO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5wcmludGxuID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnNvbGUucHJpbnRsbigkdGV4dCk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmNvbnNvbGUgPSAkKHRoaXMuZWxlbWVudCkuY29uc29sZSh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLmNvbnNvbGUuY2xlYXIoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbnNvbGU7XG5cbiAgfSkoKSxcbiAgRmlsZVN5c3RlbTogRmlsZVN5c3RlbSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgJHJvb3QsIF9kYXRhLCBfZ2V0LCBfc2V0X3RpdGxlO1xuXG4gICAgZnVuY3Rpb24gRmlsZVN5c3RlbSgpIHt9XG5cbiAgICAkcm9vdCA9ICcvJztcblxuICAgIF9nZXQgPSBmdW5jdGlvbigkbmFtZSwgJG5leHQpIHtcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2VbJG5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICRuZXh0KGxvY2FsU3RvcmFnZVskbmFtZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICRuZXh0KCcnKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3NldF90aXRsZSA9IGZ1bmN0aW9uKCRmaWxlbmFtZSkge1xuICAgICAgdmFyICRuYW1lO1xuICAgICAgJG5hbWUgPSAkZmlsZW5hbWUuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgIGlmICgvXFxbLipcXF0kLy50ZXN0KGRvY3VtZW50LnRpdGxlKSkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQudGl0bGUucmVwbGFjZSgvXFxbKC4qKVxcXSQvLCAkbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQudGl0bGUgKz0gXCIgLSBbXCIgKyAkbmFtZSArIFwiXVwiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5zZXRSb290ID0gZnVuY3Rpb24oJHBhdGgpIHtcbiAgICAgIHJldHVybiAkcm9vdCA9ICRwYXRoO1xuICAgIH07XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5yZWFkRmlsZSA9IGZ1bmN0aW9uKCRmaWxlbmFtZSwgJG5leHQpIHtcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2VbJGZpbGVuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBfZ2V0KCRmaWxlbmFtZSwgZnVuY3Rpb24oJGRhdGEpIHtcbiAgICAgICAgICBfc2V0X3RpdGxlKCRmaWxlbmFtZSk7XG4gICAgICAgICAgcmV0dXJuICRuZXh0KG51bGwsIFN0cmluZygkZGF0YSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAkLmdldCgkcm9vdCArICRmaWxlbmFtZSArICcuYmFzJywgZnVuY3Rpb24oJGRhdGEpIHtcbiAgICAgICAgICBfc2V0X3RpdGxlKCRmaWxlbmFtZSk7XG4gICAgICAgICAgcmV0dXJuICRuZXh0KG51bGwsIFN0cmluZygkZGF0YSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRmlsZVN5c3RlbS5wcm90b3R5cGUud3JpdGVGaWxlID0gZnVuY3Rpb24oJGZpbGVuYW1lLCAkZGF0YSwgJG5leHQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZVskZmlsZW5hbWVdID0gJGRhdGE7XG4gICAgICByZXR1cm4gJG5leHQobnVsbCk7XG4gICAgfTtcblxuICAgIEZpbGVTeXN0ZW0ucHJvdG90eXBlLmRlbGV0ZUZpbGUgPSBmdW5jdGlvbigkZmlsZW5hbWUsICRuZXh0KSB7XG4gICAgICBkZWxldGUgbG9jYWxTdG9yYWdlWyRmaWxlbmFtZV07XG4gICAgICByZXR1cm4gJG5leHQobnVsbCk7XG4gICAgfTtcblxuICAgIEZpbGVTeXN0ZW0ucHJvdG90eXBlLnJlYWREaXIgPSBmdW5jdGlvbigkZGlyLCAkbmV4dCkge1xuICAgICAgdmFyICRuYW1lLCAkcGF0aCwgJHZhbHVlO1xuICAgICAgcmV0dXJuICRuZXh0KCgoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfcmVmLCBfcmVzdWx0cztcbiAgICAgICAgX3JlZiA9IF9kYXRhWyRkaXJdO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKCRuYW1lIGluIF9yZWYpIHtcbiAgICAgICAgICAkcGF0aCA9IF9yZWZbJG5hbWVdO1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2goJG5hbWUgKyAnLmJhcycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH0pKCkpLmNvbmNhdCgkZGlyID09PSAnQ0FUQUxPRycgPyAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfcmVzdWx0cztcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yICgkbmFtZSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAkdmFsdWUgPSBsb2NhbFN0b3JhZ2VbJG5hbWVdO1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2goJG5hbWUuc3BsaXQoJy8nKS5wb3AoKSArICcuYmFzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfSkoKSA6IFtdKSk7XG4gICAgfTtcblxuICAgIF9kYXRhID0ge1xuICAgICAgQVRBUkk6IHtcbiAgICAgICAgU1JUUks6ICdiYXMvYXRhcmkvU1JUUksuYmFzJyxcbiAgICAgICAgV1VNUFVTOiAnYmFzL2F0YXJpL1dVTVBVUy5iYXMnXG4gICAgICB9LFxuICAgICAgR1dCQVNJQzoge1xuICAgICAgICBlbGl6YTogJ2Jhcy9nd2Jhc2ljL2VsaXphLmJhcycsXG4gICAgICAgIHJvbXVsYW46ICdiYXMvZ3diYXNpYy9yb211bGFuLmJhcydcbiAgICAgIH0sXG4gICAgICBHUk9VUDoge1xuICAgICAgICBUUkVLMDogJ2Jhcy9ocDJrL2dyb3VwL1RSRUswLmJhcycsXG4gICAgICAgIFRSRUsxOiAnYmFzL2hwMmsvZ3JvdXAvVFJFSzEuYmFzJyxcbiAgICAgICAgVFJFSzI6ICdiYXMvaHAyay9ncm91cC9UUkVLMi5iYXMnLFxuICAgICAgICBUUkVLMzogJ2Jhcy9ocDJrL2dyb3VwL1RSRUszLmJhcycsXG4gICAgICAgIFRSRUs0OiAnYmFzL2hwMmsvZ3JvdXAvVFJFSzQuYmFzJyxcbiAgICAgICAgVFJFSzczOiAnYmFzL2hwMmsvZ3JvdXAvVFJFSzczLmJhcydcbiAgICAgIH0sXG4gICAgICBMSUJSQVJZOiB7XG4gICAgICAgIFRSQURFUjogJ2Jhcy9ocDJrL3N5c3RlbS9UUkFERVIuYmFzJyxcbiAgICAgICAgVFJBREVTOiAnYmFzL2hwMmsvc3lzdGVtL1RSQURFUy5iYXMnXG4gICAgICB9LFxuICAgICAgVEVTVDoge1xuICAgICAgICBkYXRhOiAnYmFzL2hwMmsvdGVzdC9kYXRhLmJhcycsXG4gICAgICAgIGRlZjogJ2Jhcy9ocDJrL3Rlc3QvZGVmLmJhcycsXG4gICAgICAgIGRpbTogJ2Jhcy9ocDJrL3Rlc3QvZGltLmJhcycsXG4gICAgICAgIFwiZm9yXCI6ICdiYXMvaHAyay90ZXN0L2Zvci5iYXMnLFxuICAgICAgICBnb3N1YjogJ2Jhcy9ocDJrL3Rlc3QvZ29zdWIuYmFzJyxcbiAgICAgICAgXCJpZlwiOiAnYmFzL2hwMmsvdGVzdC9pZi5iYXMnLFxuICAgICAgICBpbnB1dDogJ2Jhcy9ocDJrL3Rlc3QvaW5wdXQuYmFzJyxcbiAgICAgICAgXCJsZXRcIjogJ2Jhcy9ocDJrL3Rlc3QvbGV0LmJhcycsXG4gICAgICAgIG51bWJlcnM6ICdiYXMvaHAyay90ZXN0L251bWJlcnMuYmFzJyxcbiAgICAgICAgcHJpbnQ6ICdiYXMvaHAyay90ZXN0L3ByaW50LmJhcycsXG4gICAgICAgIHRlc3Q6ICdiYXMvaHAyay90ZXN0L3Rlc3QuYmFzJyxcbiAgICAgICAgdW5hcnk6ICdiYXMvaHAyay90ZXN0L3VuYXJ5LmJhcydcbiAgICAgIH0sXG4gICAgICBDQVRBTE9HOiB7XG4gICAgICAgIE9SRUdPTjogJ2Jhcy9ocDJrL09SRUdPTi5iYXMnLFxuICAgICAgICBTVFJUUjE6ICdiYXMvaHAyay9TVFJUUjEuYmFzJyxcbiAgICAgICAgU1RUUjE6ICdiYXMvaHAyay9TVFRSMS5iYXMnXG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBGaWxlU3lzdGVtO1xuXG4gIH0pKClcbn0gOiB7XG4gIENvbnNvbGU6IENvbnNvbGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbG9ycztcblxuICAgIGNvbG9ycyA9IHJlcXVpcmUoJ2NvbG9ycycpO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuYnVmZmVyID0gbnVsbDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnZhcnMgPSBudWxsO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucGF1c2VkID0gZmFsc2U7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5wcm9tcHQgPSAnJztcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmFsdFByb21wdCA9ICc/JztcblxuICAgIGZ1bmN0aW9uIENvbnNvbGUocHJvbXB0KSB7XG4gICAgICB2YXIgc3RkaW47XG4gICAgICB0aGlzLnByb21wdCA9IHByb21wdCAhPSBudWxsID8gcHJvbXB0IDogJ2thdHJhPiAnO1xuICAgICAgdGhpcy5wYXVzZSA9IF9fYmluZCh0aGlzLnBhdXNlLCB0aGlzKTtcbiAgICAgIHRoaXMubGlzdGVuZXIgPSBfX2JpbmQodGhpcy5saXN0ZW5lciwgdGhpcyk7XG4gICAgICBzdGRpbiA9IHByb2Nlc3Mub3BlblN0ZGluKCk7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh0aGlzLnByb21wdCk7XG4gICAgICBzdGRpbi5hZGRMaXN0ZW5lcihcImRhdGFcIiwgdGhpcy5saXN0ZW5lcik7XG4gICAgfVxuXG4gICAgQ29uc29sZS5wcm90b3R5cGUubGlzdGVuZXIgPSBmdW5jdGlvbigkZGF0YSkge1xuICAgICAgdGhpcy5jb21tYW5kSGFuZGxlKCRkYXRhLnRvU3RyaW5nKCkpO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9SRVBMKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUodGhpcy5wcm9tcHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUodGhpcy5hbHRQcm9tcHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5zZXRQcm9tcHQgPSBmdW5jdGlvbigkcHJvbXB0KSB7fTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oJHNldCkge1xuICAgICAgaWYgKHRoaXMucGF1c2VkID09PSAkc2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5wYXVzZWQgPSAkc2V0KSkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5zdGRpbi5yZW1vdmVMaXN0ZW5lcihcImRhdGFcIiwgdGhpcy5saXN0ZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLnN0ZGluLmFkZExpc3RlbmVyKFwiZGF0YVwiLCB0aGlzLmxpc3RlbmVyKTtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9SRVBMKSB7XG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRoaXMucHJvbXB0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUodGhpcy5hbHRQcm9tcHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmlucHV0ID0gZnVuY3Rpb24oJHByb21wdCwgJHZhcnMpIHtcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICB0aGlzLnBhdXNlKGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmICgkcHJvbXB0ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5wcmludCgkcHJvbXB0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICB0aGlzLnZhcnMgPSAkdmFycztcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5kZWJ1ZyA9IGZ1bmN0aW9uKCR0ZXh0KSB7XG4gICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoJHRleHQuYmx1ZSArICdcXG4nKTtcbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuaGlsaXRlID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzLnN0ZG91dC53cml0ZSgkdGV4dC55ZWxsb3cgKyAnXFxuJyk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnByaW50ID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIGlmICgkdGV4dCA9PSBudWxsKSB7XG4gICAgICAgICR0ZXh0ID0gJyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoJHRleHQpO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5wcmludGxuID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIGlmICgkdGV4dCA9PSBudWxsKSB7XG4gICAgICAgICR0ZXh0ID0gJyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoJHRleHQgKyAnXFxuJyk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7fTtcblxuICAgIHJldHVybiBDb25zb2xlO1xuXG4gIH0pKCksXG4gIEZpbGVTeXN0ZW06IEZpbGVTeXN0ZW0gPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyICRyb290LCBmcywgcGF0aCwgX2RhdGE7XG5cbiAgICBmdW5jdGlvbiBGaWxlU3lzdGVtKCkge31cblxuICAgIGZzID0gcmVxdWlyZSgnZnMnKTtcblxuICAgIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbiAgICAkcm9vdCA9IF9fZGlybmFtZS5zbGljZSgwLCArX19kaXJuYW1lLmxhc3RJbmRleE9mKCcvJykgKyAxIHx8IDllOSk7XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5zZXRSb290ID0gZnVuY3Rpb24oJHBhdGgpIHtcbiAgICAgIHJldHVybiAkcm9vdCA9ICRwYXRoO1xuICAgIH07XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5yZWFkRmlsZSA9IGZ1bmN0aW9uKCRmaWxlbmFtZSwgJG5leHQpIHtcbiAgICAgIHJldHVybiBmcy5yZWFkRmlsZShwYXRoLmpvaW4oJHJvb3QsICRmaWxlbmFtZSkgKyAnLmJhcycsIGZ1bmN0aW9uKCRlcnIsICRkYXRhKSB7XG4gICAgICAgIGlmICgkZXJyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJG5leHQoJGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICRuZXh0KG51bGwsIFN0cmluZygkZGF0YSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRmlsZVN5c3RlbS5wcm90b3R5cGUud3JpdGVGaWxlID0gZnVuY3Rpb24oJGZpbGVuYW1lLCAkZGF0YSwgJG5leHQpIHtcbiAgICAgIHJldHVybiBmcy53cml0ZUZpbGUocGF0aC5qb2luKCRyb290LCAkZmlsZW5hbWUpICsgJy5iYXMnLCBcIlwiICsgJGZpbGVuYW1lICsgXCJcXG5cXG5cIiArICRkYXRhLCAkbmV4dCk7XG4gICAgfTtcblxuICAgIEZpbGVTeXN0ZW0ucHJvdG90eXBlLmRlbGV0ZUZpbGUgPSBmdW5jdGlvbigkZmlsZW5hbWUsICRuZXh0KSB7XG4gICAgICByZXR1cm4gZnMudW5saW5rKHBhdGguam9pbigkcm9vdCwgJGZpbGVuYW1lKSArICcuYmFzJywgJG5leHQpO1xuICAgIH07XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5yZWFkRGlyID0gZnVuY3Rpb24oJGRpciwgJG5leHQpIHtcbiAgICAgIHJldHVybiBmcy5yZWFkZGlyKCRyb290ICsgX2RhdGFbJGRpcl0sIGZ1bmN0aW9uKCRlcnIsICRmaWxlcykge1xuICAgICAgICB2YXIgJG5hbWU7XG4gICAgICAgIGlmICgkZXJyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJG5leHQoW10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAkbmV4dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX2ksIF9sZW4sIF9yZXN1bHRzO1xuICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gJGZpbGVzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgICAgICRuYW1lID0gJGZpbGVzW19pXTtcbiAgICAgICAgICAgICAgaWYgKC8uKlxcLmJhcyQvLnRlc3QoJG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCgkbmFtZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgICB9KSgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9kYXRhID0ge1xuICAgICAgQVRBUkk6ICdiYXMvYXRhcmkvJyxcbiAgICAgIEdXQkFTSUM6ICdiYXMvZ3diYXNpYy8nLFxuICAgICAgR1JPVVA6ICdiYXMvaHAyay9ncm91cC8nLFxuICAgICAgTElCUkFSWTogJ2Jhcy9ocDJrL3N5c3RlbS8nLFxuICAgICAgVEVTVDogJ2Jhcy9ocDJrL3Rlc3QvJyxcbiAgICAgIENBVEFMT0c6ICdiYXMvaHAyay8nXG4gICAgfTtcblxuICAgIHJldHVybiBGaWxlU3lzdGVtO1xuXG4gIH0pKClcbn07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpLFwiL3RtcFwiKSIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS43LjFcbiQoZnVuY3Rpb24oKSB7XG4gIHZhciBhcmdzLCBrYXRyYSwgcGFyc2VRdWVyeSwgc2V0U2l6ZSwgX3JlZjtcbiAga2F0cmEgPSByZXF1aXJlKCcuL2thdHJhJyk7XG4gIGFyZ3MgPSB2b2lkIDA7XG4gIHBhcnNlUXVlcnkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSwgcGFpciwgcGFpcnMsIHJlc3VsdDtcbiAgICBpZiAodHlwZW9mIGQxNmEgIT09IFwidW5kZWZpbmVkXCIgJiYgZDE2YSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGQxNmEuYXJncztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0ge307XG4gICAgICBwYWlycyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KFwiJlwiKTtcbiAgICAgIGZvciAoaSBpbiBwYWlycykge1xuICAgICAgICBpZiAocGFpcnNbaV0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHBhaXIgPSBwYWlyc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICAgICAgcmVzdWx0W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuICBzZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gICAgJChcImRpdi5jb25zb2xlIGRpdi5qcXVlcnktY29uc29sZS1pbm5lclwiKS5vZmZzZXQoe1xuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMFxuICAgIH0pO1xuICAgICQoXCJkaXYuY29uc29sZSBkaXYuanF1ZXJ5LWNvbnNvbGUtaW5uZXJcIikud2lkdGgoJCh0aGlzKS53aWR0aCgpIC0gMTIpO1xuICAgIHJldHVybiAkKFwiZGl2LmNvbnNvbGUgZGl2LmpxdWVyeS1jb25zb2xlLWlubmVyXCIpLmhlaWdodCgkKHRoaXMpLmhlaWdodCgpIC0gMTIpO1xuICB9O1xuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnJlc2l6ZVRPKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUTyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlc2l6ZVRPID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAkKHRoaXMpLnRyaWdnZXIoXCJyZXNpemVFbmRcIik7XG4gICAgfSwgNTAwKTtcbiAgfSk7XG4gICQod2luZG93KS5iaW5kKFwicmVzaXplRW5kXCIsIHNldFNpemUpO1xuICBhcmdzID0gcGFyc2VRdWVyeSgpO1xuICBjb25zb2xlLmxvZyhhcmdzKTtcbiAga2F0cmEuc2V0Um9vdCgoX3JlZiA9IGFyZ3Mucm9vdCkgIT0gbnVsbCA/IF9yZWYgOiBcIi9rYXRyYS9cIik7XG4gIGlmIChPYmplY3Qua2V5cyhhcmdzKS5sZW5ndGggPT09IDApIHtcbiAgICBhcmdzID0ge1xuICAgICAgdGl0bGU6IFwiS2F0cmEgQkFTSUNcIlxuICAgIH07XG4gICAgZG9jdW1lbnQudGl0bGUgPSBhcmdzLnRpdGxlO1xuICB9XG4gIGthdHJhLm1haW4oYXJncyk7XG4gIHJldHVybiBzZXRTaXplKCk7XG59KTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS43LjFcbnZhciBQUklOVEYsIHV0aWw7XG5cblBSSU5URiA9IC8oXFwlKShbLV0pPyhbK10pPyhbMF0pPyhcXGQqKT8oXFwuXFxkKik/KFtcXCVkc10pL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbCA9IHtcbiAgY2xlYW46IGZ1bmN0aW9uKCRjb2RlKSB7XG4gICAgaWYgKCRjb2RlLmNoYXJDb2RlQXQoMCkgPT09IDB4ZmVmZikge1xuICAgICAgJGNvZGUgPSAkY29kZS5zbGljZSgxKTtcbiAgICB9XG4gICAgcmV0dXJuICRjb2RlID0gKCRjb2RlICsgJ1xcbicpLnJlcGxhY2UoL1xcci9nLCAnXFxuJykucmVwbGFjZSgvXFxuKy9nLCAnXFxuJyk7XG4gIH0sXG4gIGZsYXR0ZW46IGZ1bmN0aW9uKCRsaXN0KSB7XG4gICAgdmFyICRhLCAkaXRlbSwgX2ksIF9sZW47XG4gICAgaWYgKCRsaXN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgJGEgPSBbXTtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9ICRsaXN0Lmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAkaXRlbSA9ICRsaXN0W19pXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KCRpdGVtKSkge1xuICAgICAgICAkYSA9ICRhLmNvbmNhdCh1dGlsLmZsYXR0ZW4oJGl0ZW0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRhLnB1c2goJGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJGE7XG4gIH0sXG4gIHNwcmludGY6IGZ1bmN0aW9uKCRmbXQsICRsaXN0KSB7XG4gICAgdmFyICRjb3VudCwgZm9yZWFjaDtcbiAgICAkY291bnQgPSAwO1xuICAgIGZvcmVhY2ggPSBmdW5jdGlvbigkbWF0Y2gsICRwY3QsICRqdXN0LCAkc2lnbiwgJHBhZCwgJHdpZHRoLCAkcHJlYywgJHNwZWMsICRvZnNldCwgJHN0cmluZykge1xuICAgICAgdmFyICR2YWx1ZTtcbiAgICAgIGlmICgkcGFkID09IG51bGwpIHtcbiAgICAgICAgJHBhZCA9ICcgJztcbiAgICAgIH1cbiAgICAgICR2YWx1ZSA9IFN0cmluZygkbGlzdFskY291bnQrK10pO1xuICAgICAgc3dpdGNoICgkc3BlYykge1xuICAgICAgICBjYXNlICclJzpcbiAgICAgICAgICByZXR1cm4gJyUnO1xuICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICBpZiAoJHdpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgICR3aWR0aCA9IHBhcnNlSW50KCR3aWR0aCwgMTApO1xuICAgICAgICAgICAgaWYgKCR2YWx1ZS5sZW5ndGggPCAkd2lkdGgpIHtcbiAgICAgICAgICAgICAgaWYgKCRqdXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkoJHdpZHRoIC0gJHZhbHVlLmxlbmd0aCArIDEpLmpvaW4oJHBhZCkgKyAkdmFsdWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICR2YWx1ZSArIEFycmF5KCR3aWR0aCAtICR2YWx1ZS5sZW5ndGggKyAxKS5qb2luKCRwYWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAkdmFsdWU7XG4gICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgIGlmICgkd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgJHdpZHRoID0gcGFyc2VJbnQoJHdpZHRoLCAxMCk7XG4gICAgICAgICAgICBpZiAoJHZhbHVlLmxlbmd0aCA8ICR3aWR0aCkge1xuICAgICAgICAgICAgICBpZiAoJGp1c3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkdmFsdWUgKyBBcnJheSgkd2lkdGggLSAkdmFsdWUubGVuZ3RoICsgMSkuam9pbigkcGFkKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkoJHdpZHRoIC0gJHZhbHVlLmxlbmd0aCArIDEpLmpvaW4oJHBhZCkgKyAkdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAkZm10LnJlcGxhY2UoUFJJTlRGLCBmb3JlYWNoKTtcbiAgfSxcbiAgcGFkOiBmdW5jdGlvbigkdmFsdWUsICRsZW4sICRwYWQpIHtcbiAgICB2YXIgJHJpZ2h0O1xuICAgIGlmICgkcGFkID09IG51bGwpIHtcbiAgICAgICRwYWQgPSAnICc7XG4gICAgfVxuICAgICRyaWdodCA9ICFpc05hTigkdmFsdWUpO1xuICAgICR2YWx1ZSA9IFN0cmluZygkdmFsdWUpO1xuICAgIGlmICgkcmlnaHQpIHtcbiAgICAgIGlmICgkdmFsdWUubGVuZ3RoIDwgJGxlbikge1xuICAgICAgICByZXR1cm4gQXJyYXkoJGxlbiAtICR2YWx1ZS5sZW5ndGggKyAxLCAkcGFkKSArICR2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAkdmFsdWUuc3Vic3RyKDAsICRsZW4pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoJHZhbHVlLmxlbmd0aCA8ICRsZW4pIHtcbiAgICAgICAgcmV0dXJuICR2YWx1ZSArIEFycmF5KCRsZW4gLSAkdmFsdWUubGVuZ3RoICsgMSwgJHBhZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJHZhbHVlLnN1YnN0cigwLCAkbGVuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iLG51bGwsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBTcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF0sIHVuaXggdmVyc2lvblxuLy8gJ3Jvb3QnIGlzIGp1c3QgYSBzbGFzaCwgb3Igbm90aGluZy5cbnZhciBzcGxpdFBhdGhSZSA9XG4gICAgL14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC87XG52YXIgc3BsaXRQYXRoID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aFJlLmV4ZWMoZmlsZW5hbWUpLnNsaWNlKDEpO1xufTtcblxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgcGF0aCA9ICcuJztcbiAgfVxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XG4gICAgcGF0aCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9KS5qb2luKCcvJykpO1xufTtcblxuXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufTtcblxuZXhwb3J0cy5zZXAgPSAnLyc7XG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcblxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgcmVzdWx0ID0gc3BsaXRQYXRoKHBhdGgpLFxuICAgICAgcm9vdCA9IHJlc3VsdFswXSxcbiAgICAgIGRpciA9IHJlc3VsdFsxXTtcblxuICBpZiAoIXJvb3QgJiYgIWRpcikge1xuICAgIC8vIE5vIGRpcm5hbWUgd2hhdHNvZXZlclxuICAgIHJldHVybiAnLic7XG4gIH1cblxuICBpZiAoZGlyKSB7XG4gICAgLy8gSXQgaGFzIGEgZGlybmFtZSwgc3RyaXAgdHJhaWxpbmcgc2xhc2hcbiAgICBkaXIgPSBkaXIuc3Vic3RyKDAsIGRpci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIHJldHVybiByb290ICsgZGlyO1xufTtcblxuXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24ocGF0aCwgZXh0KSB7XG4gIHZhciBmID0gc3BsaXRQYXRoKHBhdGgpWzJdO1xuICAvLyBUT0RPOiBtYWtlIHRoaXMgY29tcGFyaXNvbiBjYXNlLWluc2Vuc2l0aXZlIG9uIHdpbmRvd3M/XG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XG4gICAgZiA9IGYuc3Vic3RyKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIGY7XG59O1xuXG5cbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aChwYXRoKVszXTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iXX0=
