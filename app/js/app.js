(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

//if (typeof module !== 'undefined') {
//  isHeadless = true;
//}
if (typeof window === 'undefined') {
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
var process=require("__browserify_process");// Generated by CoffeeScript 1.7.1
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

},{"./kc":4,"./rte":5,"./util":7,"__browserify_process":9}],4:[function(require,module,exports){
var process=require("__browserify_process");/* parser generated by jison 0.4.13 */
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
var kc = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Program":3,"Command":4,"NEWLINE":5,"EOF":6,"Lines":7,"Line":8,"Statement":9,"INTEGER":10,"ATARI":11,"STRING":12,"CLS":13,"GWBASIC":14,"TRON":15,"TROFF":16,"APPEND":17,"CATALOG":18,"DELETE":19,"DIR":20,"EXECUTE":21,"FILES":22,"GET":23,"GROUP":24,"LIBRARY":25,"LIST":26,"NAME":27,"PURGE":28,"RENUMBER":29,"QUIT":30,"RUN":31,"SAVE":32,"SCRATCH":33,"TEST":34,"BASE":35,"(":36,")":37,"CHAIN":38,"COM":39,"DimList":40,"DATA":41,"ConstantList":42,"DEF":43,"FND":44,"VAR":45,"=":46,"Expression":47,"DIM":48,"END":49,"ENTER":50,"PORT":51,",":52,"FOR":53,"TO":54,"STEP":55,"GO":56,"GOTO":57,"OF":58,"IntegerList":59,"GOSUB":60,"IF":61,"THEN":62,"IMAGE":63,"ImageList":64,"INPUT":65,"VarList":66,"LET":67,"LetList":68,"MAT":69,"READ":70,"ZER":71,"CON":72,"NEXT":73,"PRINT":74,"PrintList":75,"PrintSep":76,"USING":77,";":78,"RANDOMIZE":79,"RESTORE":80,"RETURN":81,"REM":82,"STOP":83,"OR":84,"AND":85,"NOT":86,"EQ":87,"NE":88,">":89,"GE":90,"<":91,"LE":92,"MAX":93,"MIN":94,"+":95,"-":96,"*":97,"/":98,"^":99,"[":100,"ExpressionList":101,"]":102,"ABS":103,"ATN":104,"COS":105,"EXP":106,"INT":107,"LEN":108,"LIN":109,"LOG":110,"RND":111,"SGN":112,"SIN":113,"SPA":114,"SQR":115,"TAB":116,"TAN":117,"TIM":118,"LCASE":119,"LEFT":120,"MID":121,"RIGHT":122,"SUBSTR":123,"UCASE":124,"Constant":125,"NUMBER":126,"Dim":127,"VarItem":128,"ImageItem":129,"ImageMask":130,"ImageMaskItem":131,"$accept":0,"$end":1},
terminals_: {2:"error",5:"NEWLINE",6:"EOF",10:"INTEGER",11:"ATARI",12:"STRING",13:"CLS",14:"GWBASIC",15:"TRON",16:"TROFF",17:"APPEND",18:"CATALOG",19:"DELETE",20:"DIR",21:"EXECUTE",22:"FILES",23:"GET",24:"GROUP",25:"LIBRARY",26:"LIST",27:"NAME",28:"PURGE",29:"RENUMBER",30:"QUIT",31:"RUN",32:"SAVE",33:"SCRATCH",34:"TEST",35:"BASE",36:"(",37:")",38:"CHAIN",39:"COM",41:"DATA",43:"DEF",44:"FND",45:"VAR",46:"=",48:"DIM",49:"END",50:"ENTER",51:"PORT",52:",",53:"FOR",54:"TO",55:"STEP",56:"GO",57:"GOTO",58:"OF",60:"GOSUB",61:"IF",62:"THEN",63:"IMAGE",65:"INPUT",67:"LET",69:"MAT",70:"READ",71:"ZER",72:"CON",73:"NEXT",74:"PRINT",77:"USING",78:";",79:"RANDOMIZE",80:"RESTORE",81:"RETURN",82:"REM",83:"STOP",84:"OR",85:"AND",86:"NOT",87:"EQ",88:"NE",89:">",90:"GE",91:"<",92:"LE",93:"MAX",94:"MIN",95:"+",96:"-",97:"*",98:"/",99:"^",100:"[",102:"]",103:"ABS",104:"ATN",105:"COS",106:"EXP",107:"INT",108:"LEN",109:"LIN",110:"LOG",111:"RND",112:"SGN",113:"SIN",114:"SPA",115:"SQR",116:"TAB",117:"TAN",118:"TIM",119:"LCASE",120:"LEFT",121:"MID",122:"RIGHT",123:"SUBSTR",124:"UCASE",126:"NUMBER"},
productions_: [0,[3,3],[3,2],[7,3],[7,2],[7,1],[8,1],[8,2],[4,2],[4,1],[4,2],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[9,4],[9,2],[9,2],[9,2],[9,7],[9,2],[9,1],[9,8],[9,6],[9,8],[9,6],[9,3],[9,2],[9,4],[9,2],[9,4],[9,4],[9,4],[9,4],[9,2],[9,2],[9,4],[9,3],[9,2],[9,3],[9,4],[9,4],[9,2],[9,3],[9,2],[9,1],[9,5],[9,3],[9,1],[9,2],[9,1],[9,2],[9,1],[9,1],[9,1],[47,3],[47,3],[47,2],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,3],[47,2],[47,3],[47,1],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,4],[47,6],[47,8],[47,6],[47,8],[47,4],[47,1],[125,1],[125,1],[125,1],[40,1],[40,3],[127,1],[127,4],[127,4],[68,2],[68,5],[68,5],[68,3],[68,6],[68,6],[42,1],[42,3],[59,1],[59,3],[101,1],[101,3],[66,1],[66,3],[128,1],[128,4],[128,4],[75,1],[75,3],[76,1],[76,1],[64,1],[64,3],[129,1],[129,1],[130,1],[130,4],[131,1],[131,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:this.$ = new keyword.Statement($$[$0-2]);
break;
case 6:this.$ = new keyword.Statement($$[$0]);
break;
case 7:this.$ = new keyword.Statement($$[$0], $$[$0-1]);
break;
case 8: command.atari($$[$0]); return true;
break;
case 9: command.cls(); return true;
break;
case 10: command.gwbasic($$[$0]); return true;
break;
case 11: command.tron(); return true;
break;
case 12: command.troff(); return true;
break;
case 13: command.append($$[$0]); return true;
break;
case 14: command.cat('CATALOG'); return true;
break;
case 15: command.del($$[$0]); return true;
break;
case 16: command.cat('GWBASIC'); return true;
break;
case 17: command.exec($$[$0]); return true;
break;
case 18: command.cat('ATARI'); return true;
break;
case 19: command.get($$[$0]); return true;
break;
case 20: command.cat('GROUP'); return true;
break;
case 21: command.del("del-"+$$[$0]); return true;
break;
case 22: command.cat('LIBRARY'); return true;
break;
case 23: command.list($$[$0]); return true;
break;
case 24: command.name($$[$0]); return true;
break;
case 25: command.purge($$[$0]); return true;
break;
case 26: command.renum($$[$0]); return true;
break;
case 27: command.quit(); return true;
break;
case 28: command.run($$[$0]); return true;
break;
case 29: command.save(); return true;
break;
case 30: command.scr(); return true;
break;
case 31: command.cat('TEST'); return true;
break;
case 32:this.$ = new keyword.Base($$[$0-1]);
break;
case 33:this.$ = new keyword.Chain($$[$0]);
break;
case 34:this.$ = new keyword.Com($$[$0]);
break;
case 35:this.$ = new keyword.Data($$[$0]);
break;
case 36:this.$ = new keyword.Def($$[$0-5], $$[$0-3], $$[$0]);
break;
case 37:this.$ = new keyword.Dim($$[$0]);
break;
case 38:this.$ = new keyword.End();
break;
case 39:this.$ = new keyword.Enter($$[$0-6], $$[$0-4], $$[$0-2], $$[$0]);
break;
case 40:this.$ = new keyword.Enter($$[$0-4], $$[$0-2], $$[$0]);
break;
case 41:this.$ = new keyword.For($$[$0-6], $$[$0-4], $$[$0-2], $$[$0]);
break;
case 42:this.$ = new keyword.For($$[$0-4], $$[$0-2], $$[$0]);
break;
case 43:this.$ = new keyword.Goto($$[$0]);
break;
case 44:this.$ = new keyword.Goto($$[$0]);
break;
case 45:this.$ = new keyword.Goto($$[$0-2], $$[$0]);
break;
case 46:this.$ = new keyword.Gosub($$[$0]);
break;
case 47:this.$ = new keyword.Gosub($$[$0-2], $$[$0]);
break;
case 48:this.$ = new keyword.If($$[$0-2], $$[$0]);
break;
case 49:this.$ = new keyword.If($$[$0-2], $$[$0]);
break;
case 50:this.$ = new keyword.If($$[$0-2], $$[$0]);
break;
case 51:this.$ = new keyword.Image($$[$0]);
break;
case 52:this.$ = new keyword.Input($$[$0]);
break;
case 53:this.$ = new keyword.Input($$[$0], $$[$0-2]);
break;
case 54:this.$ = new keyword.Let($$[$0-1], $$[$0]);
break;
case 55:this.$ = new keyword.Let($$[$0-1], $$[$0]);
break;
case 56:this.$ = new keyword.MatRead($$[$0]);
break;
case 57:this.$ = new keyword.Mat(new keyword.Var($$[$0-2]), keyword.Zer);
break;
case 58:this.$ = new keyword.Mat(new keyword.Var($$[$0-2]), keyword.Con);
break;
case 59:this.$ = new keyword.Next(new keyword.Var($$[$0]));
break;
case 60:this.$ = new keyword.Print($$[$0-1], $$[$0]);
break;
case 61:this.$ = new keyword.Print($$[$0]);
break;
case 62:this.$ = new keyword.Print(new keyword.Const(''));
break;
case 63:this.$ = new keyword.Using($$[$0-2], $$[$0]);
break;
case 64:this.$ = new keyword.Using($$[$0]);
break;
case 65:this.$ = new keyword.Randomize();
break;
case 66:this.$ = new keyword.Read($$[$0]);
break;
case 67:this.$ = new keyword.Restore();
break;
case 68:this.$ = new keyword.Restore($$[$0]);
break;
case 69:this.$ = new keyword.Return();
break;
case 70:this.$ = new keyword.Rem($$[$0]);
break;
case 71:this.$ = new keyword.Stop();
break;
case 72:this.$ = new keyword.OR($$[$0-2], $$[$0]);
break;
case 73:this.$ = new keyword.AND($$[$0-2], $$[$0]);
break;
case 74:this.$ = new keyword.NOT($$[$0]);
break;
case 75:this.$ = new keyword.EQ($$[$0-2], $$[$0]);
break;
case 76:this.$ = new keyword.NE($$[$0-2], $$[$0]);
break;
case 77:this.$ = new keyword.GT($$[$0-2], $$[$0]);
break;
case 78:this.$ = new keyword.GE($$[$0-2], $$[$0]);
break;
case 79:this.$ = new keyword.LT($$[$0-2], $$[$0]);
break;
case 80:this.$ = new keyword.LE($$[$0-2], $$[$0]);
break;
case 81:this.$ = new keyword.Max($$[$0-2], $$[$0]);
break;
case 82:this.$ = new keyword.Min($$[$0-2], $$[$0]);
break;
case 83:this.$ = new keyword.Add($$[$0-2], $$[$0]);
break;
case 84:this.$ = new keyword.Sub($$[$0-2], $$[$0]);
break;
case 85:this.$ = new keyword.Mul($$[$0-2], $$[$0]);
break;
case 86:this.$ = new keyword.Div($$[$0-2], $$[$0]);
break;
case 87:this.$ = new keyword.Pow($$[$0-2], $$[$0]);
break;
case 88:this.$ = -$$[$0];
break;
case 89:this.$ = $$[$0-1];
break;
case 90:this.$ = new keyword.Var($$[$0]);
break;
case 91:this.$ = new keyword.Var($$[$0-3], $$[$0-2], $$[$0-1]);
break;
case 92:this.$ = new keyword.Var($$[$0-3], $$[$0-2], $$[$0-1]);
break;
case 93:this.$ = new keyword.FN($$[$0-3], $$[$0-1]);
break;
case 94:this.$ = new keyword.ABS($$[$0-1]);
break;
case 95:this.$ = new keyword.ATN($$[$0-1]);
break;
case 96:this.$ = new keyword.COS($$[$0-1]);
break;
case 97:this.$ = new keyword.EXP($$[$0-1]);
break;
case 98:this.$ = new keyword.INT($$[$0-1]);
break;
case 99:this.$ = new keyword.LEN($$[$0-1]);
break;
case 100:this.$ = new keyword.LIN($$[$0-1]);
break;
case 101:this.$ = new keyword.LOG($$[$0-1]);
break;
case 102:this.$ = new keyword.RND($$[$0-1]);
break;
case 103:this.$ = new keyword.SGN($$[$0-1]);
break;
case 104:this.$ = new keyword.SIN($$[$0-1]);
break;
case 105:this.$ = new keyword.SPA($$[$0-1]);
break;
case 106:this.$ = new keyword.SQR($$[$0-1]);
break;
case 107:this.$ = new keyword.TAB($$[$0-1]);
break;
case 108:this.$ = new keyword.TAN($$[$0-1]);
break;
case 109:this.$ = new keyword.TIM($$[$0-1]);
break;
case 110:this.$ = new keyword.LCASE($$[$0-1]);
break;
case 111:this.$ = new keyword.LEFT($$[$0-3], $$[$0-1]);
break;
case 112:this.$ = new keyword.MID($$[$0-5], $$[$0-3], $$[$0-1]);
break;
case 113:this.$ = new keyword.RIGHT($$[$0-3], $$[$0-1]);
break;
case 114:this.$ = new keyword.SUBSTR($$[$0-5], $$[$0-3], $$[$0-1]);
break;
case 115:this.$ = new keyword.UCASE($$[$0-1]);
break;
case 116:this.$ = $$[$0];
break;
case 117:this.$ = new keyword.Const(parseInt($$[$0], 10));
break;
case 118:this.$ = new keyword.Const($$[$0]);
break;
case 119:this.$ = new keyword.Const(Number($$[$0]));
break;
case 120:this.$ = [$$[$0]];
break;
case 121:this.$ = [$$[$0-2], $$[$0]];
break;
case 122:this.$ = new keyword.Var($$[$0]);
break;
case 123:this.$ = new keyword.Var($$[$0-3], $$[$0-2], $$[$0-1]);
break;
case 124:this.$ = new keyword.Var($$[$0-3], $$[$0-2], $$[$0-1]);
break;
case 125:this.$ = [$$[$0-1]];
break;
case 126:this.$ = [new keyword.Var($$[$0-4], $$[$0-3], $$[$0-2])];
break;
case 127:this.$ = [new keyword.Var($$[$0-4], $$[$0-3], $$[$0-2])];
break;
case 128:this.$ = [$$[$0-2], $$[$0-1]];
break;
case 129:this.$ = [$$[$0-5], new keyword.Var($$[$0-4], $$[$0-3], $$[$0-2])];
break;
case 130:this.$ = [$$[$0-5], new keyword.Var($$[$0-4], $$[$0-3], $$[$0-2])];
break;
case 131:this.$ = [$$[$0]];
break;
case 132:this.$ = [$$[$0-2], $$[$0]];
break;
case 133:this.$ = [parseInt($$[$0], 10)];
break;
case 134:this.$ = [$$[$0-2], parseInt($$[$0], 10)];
break;
case 135:this.$ = [$$[$0]];
break;
case 136:this.$ = [$$[$0-2], $$[$0]];
break;
case 137:this.$ = [$$[$0]];
break;
case 138:this.$ = [$$[$0-2], $$[$0]];
break;
case 139:this.$ = new keyword.Var($$[$0]);
break;
case 140:this.$ = new keyword.Var($$[$0-3], $$[$0-2], $$[$0-1]);
break;
case 141:this.$ = new keyword.Var($$[$0-3], $$[$0-2], $$[$0-1]);
break;
case 142:this.$ = [$$[$0]];
break;
case 143:this.$ = [$$[$0-2], $$[$0-1], $$[$0]];
break;
case 144:this.$ = keyword.Semic;
break;
case 145:this.$ = keyword.Comma;
break;
case 146:this.$ = [$$[$0]];
break;
case 147:this.$ = [$$[$0-2], $$[$0-1], $$[$0]];
break;
case 148:this.$ = $$[$0];
break;
case 149:this.$ = $$[$0];
break;
case 150:this.$ = [$$[$0]];
break;
case 151:this.$ = [parseInt($$[$0-3], 10), $$[$0-2], $$[$0-1], $$[$0]];
break;
case 152:this.$ = [$$[$0]];
break;
case 153:this.$ = [parseInt($$[$0-1], 10), $$[$0]];
break;
}
},
table: [{3:1,4:2,5:[1,29],7:3,8:28,9:30,10:[1,17],11:[1,4],13:[1,5],14:[1,6],15:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],21:[1,13],22:[1,14],23:[1,15],24:[1,16],25:[1,18],26:[1,19],27:[1,20],28:[1,21],29:[1,22],30:[1,23],31:[1,24],32:[1,25],33:[1,26],34:[1,27],35:[1,31],38:[1,32],39:[1,33],41:[1,34],43:[1,35],45:[1,57],48:[1,36],49:[1,37],50:[1,38],53:[1,39],56:[1,40],57:[1,41],60:[1,42],61:[1,43],63:[1,44],65:[1,45],67:[1,46],68:47,69:[1,48],70:[1,52],73:[1,49],74:[1,50],79:[1,51],80:[1,53],81:[1,54],82:[1,55],83:[1,56]},{1:[3]},{5:[1,58]},{6:[1,59],8:60,9:30,10:[1,61],35:[1,31],38:[1,32],39:[1,33],41:[1,34],43:[1,35],45:[1,57],48:[1,36],49:[1,37],50:[1,38],53:[1,39],56:[1,40],57:[1,41],60:[1,42],61:[1,43],63:[1,44],65:[1,45],67:[1,46],68:47,69:[1,48],70:[1,52],73:[1,49],74:[1,50],79:[1,51],80:[1,53],81:[1,54],82:[1,55],83:[1,56]},{12:[1,62]},{5:[2,9]},{12:[1,63]},{5:[2,11]},{5:[2,12]},{5:[2,13]},{5:[2,14]},{5:[2,15]},{5:[2,16]},{5:[2,17]},{5:[2,18]},{5:[2,19]},{5:[2,20]},{5:[2,21],9:64,35:[1,31],38:[1,32],39:[1,33],41:[1,34],43:[1,35],45:[1,57],48:[1,36],49:[1,37],50:[1,38],53:[1,39],56:[1,40],57:[1,41],60:[1,42],61:[1,43],63:[1,44],65:[1,45],67:[1,46],68:47,69:[1,48],70:[1,52],73:[1,49],74:[1,50],79:[1,51],80:[1,53],81:[1,54],82:[1,55],83:[1,56]},{5:[2,22]},{5:[2,23]},{5:[2,24]},{5:[2,25]},{5:[2,26]},{5:[2,27]},{5:[2,28]},{5:[2,29]},{5:[2,30]},{5:[2,31]},{5:[1,65]},{6:[2,5],10:[2,5],35:[2,5],38:[2,5],39:[2,5],41:[2,5],43:[2,5],45:[2,5],48:[2,5],49:[2,5],50:[2,5],53:[2,5],56:[2,5],57:[2,5],60:[2,5],61:[2,5],63:[2,5],65:[2,5],67:[2,5],69:[2,5],70:[2,5],73:[2,5],74:[2,5],79:[2,5],80:[2,5],81:[2,5],82:[2,5],83:[2,5]},{5:[2,6]},{36:[1,66]},{12:[1,67]},{40:68,45:[1,70],127:69},{10:[1,73],12:[1,74],42:71,125:72,126:[1,75]},{44:[1,76]},{40:77,45:[1,70],127:69},{5:[2,38]},{45:[1,79],51:[1,78]},{45:[1,80]},{54:[1,81]},{10:[1,82],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:83,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,112],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:113,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:114,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,120],12:[1,117],45:[1,121],64:115,129:116,130:118,131:119},{12:[1,123],45:[1,125],66:122,128:124},{45:[1,57],68:126},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,128],47:127,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{45:[1,130],70:[1,129]},{45:[1,131]},{5:[2,62],10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:134,75:132,77:[1,133],86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,65]},{45:[1,125],66:135,128:124},{5:[2,67],10:[1,136]},{5:[2,69]},{5:[2,70]},{5:[2,71]},{36:[1,139],46:[1,137],100:[1,138]},{6:[1,140]},{1:[2,2]},{5:[1,141]},{9:64,35:[1,31],38:[1,32],39:[1,33],41:[1,34],43:[1,35],45:[1,57],48:[1,36],49:[1,37],50:[1,38],53:[1,39],56:[1,40],57:[1,41],60:[1,42],61:[1,43],63:[1,44],65:[1,45],67:[1,46],68:47,69:[1,48],70:[1,52],73:[1,49],74:[1,50],79:[1,51],80:[1,53],81:[1,54],82:[1,55],83:[1,56]},{5:[2,8]},{5:[2,10]},{5:[2,7]},{6:[2,4],10:[2,4],35:[2,4],38:[2,4],39:[2,4],41:[2,4],43:[2,4],45:[2,4],48:[2,4],49:[2,4],50:[2,4],53:[2,4],56:[2,4],57:[2,4],60:[2,4],61:[2,4],63:[2,4],65:[2,4],67:[2,4],69:[2,4],70:[2,4],73:[2,4],74:[2,4],79:[2,4],80:[2,4],81:[2,4],82:[2,4],83:[2,4]},{10:[1,142]},{5:[2,33]},{5:[2,34],52:[1,143]},{5:[2,120],52:[2,120]},{5:[2,122],36:[1,145],52:[2,122],100:[1,144]},{5:[2,35],52:[1,146]},{5:[2,131],52:[2,131]},{5:[2,117],37:[2,117],52:[2,117],54:[2,117],55:[2,117],57:[2,117],58:[2,117],62:[2,117],78:[2,117],84:[2,117],85:[2,117],87:[2,117],88:[2,117],89:[2,117],90:[2,117],91:[2,117],92:[2,117],93:[2,117],94:[2,117],95:[2,117],96:[2,117],97:[2,117],98:[2,117],99:[2,117],102:[2,117]},{5:[2,118],37:[2,118],52:[2,118],54:[2,118],55:[2,118],57:[2,118],58:[2,118],62:[2,118],78:[2,118],84:[2,118],85:[2,118],87:[2,118],88:[2,118],89:[2,118],90:[2,118],91:[2,118],92:[2,118],93:[2,118],94:[2,118],95:[2,118],96:[2,118],97:[2,118],98:[2,118],99:[2,118],102:[2,118]},{5:[2,119],37:[2,119],52:[2,119],54:[2,119],55:[2,119],57:[2,119],58:[2,119],62:[2,119],78:[2,119],84:[2,119],85:[2,119],87:[2,119],88:[2,119],89:[2,119],90:[2,119],91:[2,119],92:[2,119],93:[2,119],94:[2,119],95:[2,119],96:[2,119],97:[2,119],98:[2,119],99:[2,119],102:[2,119]},{36:[1,147]},{5:[2,37],52:[1,143]},{52:[1,148]},{52:[1,149]},{46:[1,150]},{10:[1,151]},{5:[2,44],58:[2,117],84:[2,117],85:[2,117],87:[2,117],88:[2,117],89:[2,117],90:[2,117],91:[2,117],92:[2,117],93:[2,117],94:[2,117],95:[2,117],96:[2,117],97:[2,117],98:[2,117],99:[2,117]},{58:[1,152],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:168,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:169,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:170,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,90],36:[1,172],37:[2,90],52:[2,90],54:[2,90],55:[2,90],57:[2,90],58:[2,90],62:[2,90],78:[2,90],84:[2,90],85:[2,90],87:[2,90],88:[2,90],89:[2,90],90:[2,90],91:[2,90],92:[2,90],93:[2,90],94:[2,90],95:[2,90],96:[2,90],97:[2,90],98:[2,90],99:[2,90],100:[1,171],102:[2,90]},{36:[1,173]},{36:[1,174]},{36:[1,175]},{36:[1,176]},{36:[1,177]},{36:[1,178]},{36:[1,179]},{36:[1,180]},{36:[1,181]},{36:[1,182]},{36:[1,183]},{36:[1,184]},{36:[1,185]},{36:[1,186]},{36:[1,187]},{36:[1,188]},{36:[1,189]},{36:[1,190]},{36:[1,191]},{36:[1,192]},{36:[1,193]},{36:[1,194]},{36:[1,195]},{5:[2,116],37:[2,116],52:[2,116],54:[2,116],55:[2,116],57:[2,116],58:[2,116],62:[2,116],78:[2,116],84:[2,116],85:[2,116],87:[2,116],88:[2,116],89:[2,116],90:[2,116],91:[2,116],92:[2,116],93:[2,116],94:[2,116],95:[2,116],96:[2,116],97:[2,116],98:[2,116],99:[2,116],102:[2,116]},{5:[2,46],58:[2,117],84:[2,117],85:[2,117],87:[2,117],88:[2,117],89:[2,117],90:[2,117],91:[2,117],92:[2,117],93:[2,117],94:[2,117],95:[2,117],96:[2,117],97:[2,117],98:[2,117],99:[2,117]},{58:[1,196],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{57:[1,197],62:[1,198],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{5:[2,51],52:[1,199]},{5:[2,146],37:[2,146],52:[2,146]},{5:[2,148],37:[2,148],52:[2,148]},{5:[2,149],37:[2,149],52:[2,149]},{5:[2,150],37:[2,150],52:[2,150]},{36:[1,200],45:[1,201]},{5:[2,152],37:[2,152],52:[2,152]},{5:[2,52],52:[1,202]},{52:[1,203]},{5:[2,137],52:[2,137]},{5:[2,139],36:[1,205],52:[2,139],100:[1,204]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,128],47:206,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,55],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{5:[2,90],36:[1,209],46:[1,207],84:[2,90],85:[2,90],87:[2,90],88:[2,90],89:[2,90],90:[2,90],91:[2,90],92:[2,90],93:[2,90],94:[2,90],95:[2,90],96:[2,90],97:[2,90],98:[2,90],99:[2,90],100:[1,208]},{45:[1,125],66:210,128:124},{46:[1,211]},{5:[2,59]},{5:[2,61],52:[1,214],76:212,78:[1,213]},{10:[1,215]},{5:[2,142],52:[2,142],78:[2,142],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{5:[2,66],52:[1,202]},{5:[2,68]},{10:[2,125],12:[2,125],36:[2,125],44:[2,125],45:[2,125],86:[2,125],96:[2,125],103:[2,125],104:[2,125],105:[2,125],106:[2,125],107:[2,125],108:[2,125],109:[2,125],110:[2,125],111:[2,125],112:[2,125],113:[2,125],114:[2,125],115:[2,125],116:[2,125],117:[2,125],118:[2,125],119:[2,125],120:[2,125],121:[2,125],122:[2,125],123:[2,125],124:[2,125],126:[2,125]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:217,86:[1,84],96:[1,85],101:216,103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:217,86:[1,84],96:[1,85],101:218,103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{1:[2,1]},{6:[2,3],10:[2,3],35:[2,3],38:[2,3],39:[2,3],41:[2,3],43:[2,3],45:[2,3],48:[2,3],49:[2,3],50:[2,3],53:[2,3],56:[2,3],57:[2,3],60:[2,3],61:[2,3],63:[2,3],65:[2,3],67:[2,3],69:[2,3],70:[2,3],73:[2,3],74:[2,3],79:[2,3],80:[2,3],81:[2,3],82:[2,3],83:[2,3]},{37:[1,219]},{45:[1,70],127:220},{10:[1,222],59:221},{10:[1,222],59:223},{10:[1,73],12:[1,74],125:224,126:[1,75]},{45:[1,225]},{45:[1,226]},{45:[1,227]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:228,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,43]},{10:[1,222],59:229},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:230,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:231,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:232,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:233,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:234,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:235,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:236,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:237,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:238,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:239,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:240,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:241,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:242,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:243,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:244,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,74],37:[2,74],52:[2,74],54:[2,74],55:[2,74],57:[2,74],58:[2,74],62:[2,74],78:[2,74],84:[2,74],85:[2,74],87:[2,74],88:[2,74],89:[2,74],90:[2,74],91:[2,74],92:[2,74],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,74]},{5:[2,88],37:[2,88],52:[2,88],54:[2,88],55:[2,88],57:[2,88],58:[2,88],62:[2,88],78:[2,88],84:[2,88],85:[2,88],87:[2,88],88:[2,88],89:[2,88],90:[2,88],91:[2,88],92:[2,88],93:[2,88],94:[2,88],95:[2,88],96:[2,88],97:[2,88],98:[2,88],99:[2,88],102:[2,88]},{37:[1,245],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:217,86:[1,84],96:[1,85],101:246,103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:217,86:[1,84],96:[1,85],101:247,103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:248,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:249,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:250,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:251,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:252,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:253,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:254,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:255,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:256,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:257,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:258,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:259,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:260,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:261,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:262,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:263,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:264,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:265,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:266,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:267,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:268,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:269,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:270,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,222],59:271},{10:[1,272]},{9:274,10:[1,273],35:[1,31],38:[1,32],39:[1,33],41:[1,34],43:[1,35],45:[1,57],48:[1,36],49:[1,37],50:[1,38],53:[1,39],56:[1,40],57:[1,41],60:[1,42],61:[1,43],63:[1,44],65:[1,45],67:[1,46],68:47,69:[1,48],70:[1,52],73:[1,49],74:[1,50],79:[1,51],80:[1,53],81:[1,54],82:[1,55],83:[1,56]},{10:[1,120],12:[1,117],45:[1,121],129:275,130:118,131:119},{10:[1,120],12:[1,117],45:[1,121],64:276,129:116,130:118,131:119},{5:[2,153],37:[2,153],52:[2,153]},{45:[1,125],128:277},{45:[1,125],66:278,128:124},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:217,86:[1,84],96:[1,85],101:279,103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:217,86:[1,84],96:[1,85],101:280,103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,54],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{10:[2,128],12:[2,128],36:[2,128],44:[2,128],45:[2,128],86:[2,128],96:[2,128],103:[2,128],104:[2,128],105:[2,128],106:[2,128],107:[2,128],108:[2,128],109:[2,128],110:[2,128],111:[2,128],112:[2,128],113:[2,128],114:[2,128],115:[2,128],116:[2,128],117:[2,128],118:[2,128],119:[2,128],120:[2,128],121:[2,128],122:[2,128],123:[2,128],124:[2,128],126:[2,128]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:217,86:[1,84],96:[1,85],101:281,103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:217,86:[1,84],96:[1,85],101:282,103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,56],52:[1,202]},{71:[1,283],72:[1,284]},{5:[2,60],10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:285,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,144],10:[2,144],12:[2,144],36:[2,144],44:[2,144],45:[2,144],86:[2,144],96:[2,144],103:[2,144],104:[2,144],105:[2,144],106:[2,144],107:[2,144],108:[2,144],109:[2,144],110:[2,144],111:[2,144],112:[2,144],113:[2,144],114:[2,144],115:[2,144],116:[2,144],117:[2,144],118:[2,144],119:[2,144],120:[2,144],121:[2,144],122:[2,144],123:[2,144],124:[2,144],126:[2,144]},{5:[2,145],10:[2,145],12:[2,145],36:[2,145],44:[2,145],45:[2,145],86:[2,145],96:[2,145],103:[2,145],104:[2,145],105:[2,145],106:[2,145],107:[2,145],108:[2,145],109:[2,145],110:[2,145],111:[2,145],112:[2,145],113:[2,145],114:[2,145],115:[2,145],116:[2,145],117:[2,145],118:[2,145],119:[2,145],120:[2,145],121:[2,145],122:[2,145],123:[2,145],124:[2,145],126:[2,145]},{5:[2,64],78:[1,286]},{52:[1,288],102:[1,287]},{37:[2,135],52:[2,135],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,135]},{37:[1,289],52:[1,288]},{5:[2,32]},{5:[2,121],52:[2,121]},{52:[1,291],102:[1,290]},{5:[2,133],37:[2,133],52:[2,133],102:[2,133]},{37:[1,292],52:[1,291]},{5:[2,132],52:[2,132]},{37:[1,293]},{52:[1,294]},{52:[1,295]},{54:[1,296],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{5:[2,45],52:[1,291]},{5:[2,72],37:[2,72],52:[2,72],54:[2,72],55:[2,72],57:[2,72],58:[2,72],62:[2,72],78:[2,72],84:[2,72],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,72]},{5:[2,73],37:[2,73],52:[2,73],54:[2,73],55:[2,73],57:[2,73],58:[2,73],62:[2,73],78:[2,73],84:[2,73],85:[2,73],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,73]},{5:[2,75],37:[2,75],52:[2,75],54:[2,75],55:[2,75],57:[2,75],58:[2,75],62:[2,75],78:[2,75],84:[2,75],85:[2,75],87:[2,75],88:[2,75],89:[2,75],90:[2,75],91:[2,75],92:[2,75],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,75]},{5:[2,76],37:[2,76],52:[2,76],54:[2,76],55:[2,76],57:[2,76],58:[2,76],62:[2,76],78:[2,76],84:[2,76],85:[2,76],87:[2,76],88:[2,76],89:[2,76],90:[2,76],91:[2,76],92:[2,76],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,76]},{5:[2,77],37:[2,77],52:[2,77],54:[2,77],55:[2,77],57:[2,77],58:[2,77],62:[2,77],78:[2,77],84:[2,77],85:[2,77],87:[2,77],88:[2,77],89:[2,77],90:[2,77],91:[2,77],92:[2,77],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,77]},{5:[2,78],37:[2,78],52:[2,78],54:[2,78],55:[2,78],57:[2,78],58:[2,78],62:[2,78],78:[2,78],84:[2,78],85:[2,78],87:[2,78],88:[2,78],89:[2,78],90:[2,78],91:[2,78],92:[2,78],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,78]},{5:[2,79],37:[2,79],52:[2,79],54:[2,79],55:[2,79],57:[2,79],58:[2,79],62:[2,79],78:[2,79],84:[2,79],85:[2,79],87:[2,79],88:[2,79],89:[2,79],90:[2,79],91:[2,79],92:[2,79],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,79]},{5:[2,80],37:[2,80],52:[2,80],54:[2,80],55:[2,80],57:[2,80],58:[2,80],62:[2,80],78:[2,80],84:[2,80],85:[2,80],87:[2,80],88:[2,80],89:[2,80],90:[2,80],91:[2,80],92:[2,80],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,80]},{5:[2,81],37:[2,81],52:[2,81],54:[2,81],55:[2,81],57:[2,81],58:[2,81],62:[2,81],78:[2,81],84:[2,81],85:[2,81],87:[2,81],88:[2,81],89:[2,81],90:[2,81],91:[2,81],92:[2,81],93:[2,81],94:[2,81],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,81]},{5:[2,82],37:[2,82],52:[2,82],54:[2,82],55:[2,82],57:[2,82],58:[2,82],62:[2,82],78:[2,82],84:[2,82],85:[2,82],87:[2,82],88:[2,82],89:[2,82],90:[2,82],91:[2,82],92:[2,82],93:[2,82],94:[2,82],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,82]},{5:[2,83],37:[2,83],52:[2,83],54:[2,83],55:[2,83],57:[2,83],58:[2,83],62:[2,83],78:[2,83],84:[2,83],85:[2,83],87:[2,83],88:[2,83],89:[2,83],90:[2,83],91:[2,83],92:[2,83],93:[2,83],94:[2,83],95:[2,83],96:[2,83],97:[1,165],98:[1,166],99:[1,167],102:[2,83]},{5:[2,84],37:[2,84],52:[2,84],54:[2,84],55:[2,84],57:[2,84],58:[2,84],62:[2,84],78:[2,84],84:[2,84],85:[2,84],87:[2,84],88:[2,84],89:[2,84],90:[2,84],91:[2,84],92:[2,84],93:[2,84],94:[2,84],95:[2,84],96:[2,84],97:[1,165],98:[1,166],99:[1,167],102:[2,84]},{5:[2,85],37:[2,85],52:[2,85],54:[2,85],55:[2,85],57:[2,85],58:[2,85],62:[2,85],78:[2,85],84:[2,85],85:[2,85],87:[2,85],88:[2,85],89:[2,85],90:[2,85],91:[2,85],92:[2,85],93:[2,85],94:[2,85],95:[2,85],96:[2,85],97:[2,85],98:[2,85],99:[1,167],102:[2,85]},{5:[2,86],37:[2,86],52:[2,86],54:[2,86],55:[2,86],57:[2,86],58:[2,86],62:[2,86],78:[2,86],84:[2,86],85:[2,86],87:[2,86],88:[2,86],89:[2,86],90:[2,86],91:[2,86],92:[2,86],93:[2,86],94:[2,86],95:[2,86],96:[2,86],97:[2,86],98:[2,86],99:[1,167],102:[2,86]},{5:[2,87],37:[2,87],52:[2,87],54:[2,87],55:[2,87],57:[2,87],58:[2,87],62:[2,87],78:[2,87],84:[2,87],85:[2,87],87:[2,87],88:[2,87],89:[2,87],90:[2,87],91:[2,87],92:[2,87],93:[2,87],94:[2,87],95:[2,87],96:[2,87],97:[2,87],98:[2,87],99:[2,87],102:[2,87]},{5:[2,89],37:[2,89],52:[2,89],54:[2,89],55:[2,89],57:[2,89],58:[2,89],62:[2,89],78:[2,89],84:[2,89],85:[2,89],87:[2,89],88:[2,89],89:[2,89],90:[2,89],91:[2,89],92:[2,89],93:[2,89],94:[2,89],95:[2,89],96:[2,89],97:[2,89],98:[2,89],99:[2,89],102:[2,89]},{52:[1,288],102:[1,297]},{37:[1,298],52:[1,288]},{37:[1,299],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,300],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,301],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,302],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,303],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,304],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,305],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,306],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,307],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,308],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,309],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,310],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,311],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,312],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,313],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,314],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,315],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,316],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{52:[1,317],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{52:[1,318],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{52:[1,319],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{52:[1,320],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,321],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{5:[2,47],52:[1,291]},{5:[2,48]},{5:[2,49]},{5:[2,50]},{5:[2,147],37:[2,147],52:[2,147]},{37:[1,322],52:[1,199]},{5:[2,138],52:[2,138]},{5:[2,53],52:[1,202]},{52:[1,288],102:[1,323]},{37:[1,324],52:[1,288]},{52:[1,288],102:[1,325]},{37:[1,326],52:[1,288]},{5:[2,57]},{5:[2,58]},{5:[2,143],52:[2,143],78:[2,143],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{45:[1,125],66:327,128:124},{46:[1,328]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:329,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{46:[1,330]},{5:[2,123],52:[2,123]},{10:[1,331]},{5:[2,124],52:[2,124]},{46:[1,332]},{45:[1,333]},{45:[1,334]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:335,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,91],37:[2,91],52:[2,91],54:[2,91],55:[2,91],57:[2,91],58:[2,91],62:[2,91],78:[2,91],84:[2,91],85:[2,91],87:[2,91],88:[2,91],89:[2,91],90:[2,91],91:[2,91],92:[2,91],93:[2,91],94:[2,91],95:[2,91],96:[2,91],97:[2,91],98:[2,91],99:[2,91],102:[2,91]},{5:[2,92],37:[2,92],52:[2,92],54:[2,92],55:[2,92],57:[2,92],58:[2,92],62:[2,92],78:[2,92],84:[2,92],85:[2,92],87:[2,92],88:[2,92],89:[2,92],90:[2,92],91:[2,92],92:[2,92],93:[2,92],94:[2,92],95:[2,92],96:[2,92],97:[2,92],98:[2,92],99:[2,92],102:[2,92]},{5:[2,93],37:[2,93],52:[2,93],54:[2,93],55:[2,93],57:[2,93],58:[2,93],62:[2,93],78:[2,93],84:[2,93],85:[2,93],87:[2,93],88:[2,93],89:[2,93],90:[2,93],91:[2,93],92:[2,93],93:[2,93],94:[2,93],95:[2,93],96:[2,93],97:[2,93],98:[2,93],99:[2,93],102:[2,93]},{5:[2,94],37:[2,94],52:[2,94],54:[2,94],55:[2,94],57:[2,94],58:[2,94],62:[2,94],78:[2,94],84:[2,94],85:[2,94],87:[2,94],88:[2,94],89:[2,94],90:[2,94],91:[2,94],92:[2,94],93:[2,94],94:[2,94],95:[2,94],96:[2,94],97:[2,94],98:[2,94],99:[2,94],102:[2,94]},{5:[2,95],37:[2,95],52:[2,95],54:[2,95],55:[2,95],57:[2,95],58:[2,95],62:[2,95],78:[2,95],84:[2,95],85:[2,95],87:[2,95],88:[2,95],89:[2,95],90:[2,95],91:[2,95],92:[2,95],93:[2,95],94:[2,95],95:[2,95],96:[2,95],97:[2,95],98:[2,95],99:[2,95],102:[2,95]},{5:[2,96],37:[2,96],52:[2,96],54:[2,96],55:[2,96],57:[2,96],58:[2,96],62:[2,96],78:[2,96],84:[2,96],85:[2,96],87:[2,96],88:[2,96],89:[2,96],90:[2,96],91:[2,96],92:[2,96],93:[2,96],94:[2,96],95:[2,96],96:[2,96],97:[2,96],98:[2,96],99:[2,96],102:[2,96]},{5:[2,97],37:[2,97],52:[2,97],54:[2,97],55:[2,97],57:[2,97],58:[2,97],62:[2,97],78:[2,97],84:[2,97],85:[2,97],87:[2,97],88:[2,97],89:[2,97],90:[2,97],91:[2,97],92:[2,97],93:[2,97],94:[2,97],95:[2,97],96:[2,97],97:[2,97],98:[2,97],99:[2,97],102:[2,97]},{5:[2,98],37:[2,98],52:[2,98],54:[2,98],55:[2,98],57:[2,98],58:[2,98],62:[2,98],78:[2,98],84:[2,98],85:[2,98],87:[2,98],88:[2,98],89:[2,98],90:[2,98],91:[2,98],92:[2,98],93:[2,98],94:[2,98],95:[2,98],96:[2,98],97:[2,98],98:[2,98],99:[2,98],102:[2,98]},{5:[2,99],37:[2,99],52:[2,99],54:[2,99],55:[2,99],57:[2,99],58:[2,99],62:[2,99],78:[2,99],84:[2,99],85:[2,99],87:[2,99],88:[2,99],89:[2,99],90:[2,99],91:[2,99],92:[2,99],93:[2,99],94:[2,99],95:[2,99],96:[2,99],97:[2,99],98:[2,99],99:[2,99],102:[2,99]},{5:[2,100],37:[2,100],52:[2,100],54:[2,100],55:[2,100],57:[2,100],58:[2,100],62:[2,100],78:[2,100],84:[2,100],85:[2,100],87:[2,100],88:[2,100],89:[2,100],90:[2,100],91:[2,100],92:[2,100],93:[2,100],94:[2,100],95:[2,100],96:[2,100],97:[2,100],98:[2,100],99:[2,100],102:[2,100]},{5:[2,101],37:[2,101],52:[2,101],54:[2,101],55:[2,101],57:[2,101],58:[2,101],62:[2,101],78:[2,101],84:[2,101],85:[2,101],87:[2,101],88:[2,101],89:[2,101],90:[2,101],91:[2,101],92:[2,101],93:[2,101],94:[2,101],95:[2,101],96:[2,101],97:[2,101],98:[2,101],99:[2,101],102:[2,101]},{5:[2,102],37:[2,102],52:[2,102],54:[2,102],55:[2,102],57:[2,102],58:[2,102],62:[2,102],78:[2,102],84:[2,102],85:[2,102],87:[2,102],88:[2,102],89:[2,102],90:[2,102],91:[2,102],92:[2,102],93:[2,102],94:[2,102],95:[2,102],96:[2,102],97:[2,102],98:[2,102],99:[2,102],102:[2,102]},{5:[2,103],37:[2,103],52:[2,103],54:[2,103],55:[2,103],57:[2,103],58:[2,103],62:[2,103],78:[2,103],84:[2,103],85:[2,103],87:[2,103],88:[2,103],89:[2,103],90:[2,103],91:[2,103],92:[2,103],93:[2,103],94:[2,103],95:[2,103],96:[2,103],97:[2,103],98:[2,103],99:[2,103],102:[2,103]},{5:[2,104],37:[2,104],52:[2,104],54:[2,104],55:[2,104],57:[2,104],58:[2,104],62:[2,104],78:[2,104],84:[2,104],85:[2,104],87:[2,104],88:[2,104],89:[2,104],90:[2,104],91:[2,104],92:[2,104],93:[2,104],94:[2,104],95:[2,104],96:[2,104],97:[2,104],98:[2,104],99:[2,104],102:[2,104]},{5:[2,105],37:[2,105],52:[2,105],54:[2,105],55:[2,105],57:[2,105],58:[2,105],62:[2,105],78:[2,105],84:[2,105],85:[2,105],87:[2,105],88:[2,105],89:[2,105],90:[2,105],91:[2,105],92:[2,105],93:[2,105],94:[2,105],95:[2,105],96:[2,105],97:[2,105],98:[2,105],99:[2,105],102:[2,105]},{5:[2,106],37:[2,106],52:[2,106],54:[2,106],55:[2,106],57:[2,106],58:[2,106],62:[2,106],78:[2,106],84:[2,106],85:[2,106],87:[2,106],88:[2,106],89:[2,106],90:[2,106],91:[2,106],92:[2,106],93:[2,106],94:[2,106],95:[2,106],96:[2,106],97:[2,106],98:[2,106],99:[2,106],102:[2,106]},{5:[2,107],37:[2,107],52:[2,107],54:[2,107],55:[2,107],57:[2,107],58:[2,107],62:[2,107],78:[2,107],84:[2,107],85:[2,107],87:[2,107],88:[2,107],89:[2,107],90:[2,107],91:[2,107],92:[2,107],93:[2,107],94:[2,107],95:[2,107],96:[2,107],97:[2,107],98:[2,107],99:[2,107],102:[2,107]},{5:[2,108],37:[2,108],52:[2,108],54:[2,108],55:[2,108],57:[2,108],58:[2,108],62:[2,108],78:[2,108],84:[2,108],85:[2,108],87:[2,108],88:[2,108],89:[2,108],90:[2,108],91:[2,108],92:[2,108],93:[2,108],94:[2,108],95:[2,108],96:[2,108],97:[2,108],98:[2,108],99:[2,108],102:[2,108]},{5:[2,109],37:[2,109],52:[2,109],54:[2,109],55:[2,109],57:[2,109],58:[2,109],62:[2,109],78:[2,109],84:[2,109],85:[2,109],87:[2,109],88:[2,109],89:[2,109],90:[2,109],91:[2,109],92:[2,109],93:[2,109],94:[2,109],95:[2,109],96:[2,109],97:[2,109],98:[2,109],99:[2,109],102:[2,109]},{5:[2,110],37:[2,110],52:[2,110],54:[2,110],55:[2,110],57:[2,110],58:[2,110],62:[2,110],78:[2,110],84:[2,110],85:[2,110],87:[2,110],88:[2,110],89:[2,110],90:[2,110],91:[2,110],92:[2,110],93:[2,110],94:[2,110],95:[2,110],96:[2,110],97:[2,110],98:[2,110],99:[2,110],102:[2,110]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:336,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:337,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:338,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:339,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,115],37:[2,115],52:[2,115],54:[2,115],55:[2,115],57:[2,115],58:[2,115],62:[2,115],78:[2,115],84:[2,115],85:[2,115],87:[2,115],88:[2,115],89:[2,115],90:[2,115],91:[2,115],92:[2,115],93:[2,115],94:[2,115],95:[2,115],96:[2,115],97:[2,115],98:[2,115],99:[2,115],102:[2,115]},{5:[2,151],37:[2,151],52:[2,151]},{5:[2,140],52:[2,140]},{5:[2,141],52:[2,141]},{5:[2,91],46:[1,340],84:[2,91],85:[2,91],87:[2,91],88:[2,91],89:[2,91],90:[2,91],91:[2,91],92:[2,91],93:[2,91],94:[2,91],95:[2,91],96:[2,91],97:[2,91],98:[2,91],99:[2,91]},{5:[2,92],46:[1,341],84:[2,92],85:[2,92],87:[2,92],88:[2,92],89:[2,92],90:[2,92],91:[2,92],92:[2,92],93:[2,92],94:[2,92],95:[2,92],96:[2,92],97:[2,92],98:[2,92],99:[2,92]},{5:[2,63],52:[1,202]},{10:[2,126],12:[2,126],36:[2,126],44:[2,126],45:[2,126],86:[2,126],96:[2,126],103:[2,126],104:[2,126],105:[2,126],106:[2,126],107:[2,126],108:[2,126],109:[2,126],110:[2,126],111:[2,126],112:[2,126],113:[2,126],114:[2,126],115:[2,126],116:[2,126],117:[2,126],118:[2,126],119:[2,126],120:[2,126],121:[2,126],122:[2,126],123:[2,126],124:[2,126],126:[2,126]},{37:[2,136],52:[2,136],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167],102:[2,136]},{10:[2,127],12:[2,127],36:[2,127],44:[2,127],45:[2,127],86:[2,127],96:[2,127],103:[2,127],104:[2,127],105:[2,127],106:[2,127],107:[2,127],108:[2,127],109:[2,127],110:[2,127],111:[2,127],112:[2,127],113:[2,127],114:[2,127],115:[2,127],116:[2,127],117:[2,127],118:[2,127],119:[2,127],120:[2,127],121:[2,127],122:[2,127],123:[2,127],124:[2,127],126:[2,127]},{5:[2,134],37:[2,134],52:[2,134],102:[2,134]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:342,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{52:[1,343]},{5:[2,40]},{5:[2,42],55:[1,344],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,345],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{52:[1,346],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,347],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{52:[1,348],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{10:[2,129],12:[2,129],36:[2,129],44:[2,129],45:[2,129],86:[2,129],96:[2,129],103:[2,129],104:[2,129],105:[2,129],106:[2,129],107:[2,129],108:[2,129],109:[2,129],110:[2,129],111:[2,129],112:[2,129],113:[2,129],114:[2,129],115:[2,129],116:[2,129],117:[2,129],118:[2,129],119:[2,129],120:[2,129],121:[2,129],122:[2,129],123:[2,129],124:[2,129],126:[2,129]},{10:[2,130],12:[2,130],36:[2,130],44:[2,130],45:[2,130],86:[2,130],96:[2,130],103:[2,130],104:[2,130],105:[2,130],106:[2,130],107:[2,130],108:[2,130],109:[2,130],110:[2,130],111:[2,130],112:[2,130],113:[2,130],114:[2,130],115:[2,130],116:[2,130],117:[2,130],118:[2,130],119:[2,130],120:[2,130],121:[2,130],122:[2,130],123:[2,130],124:[2,130],126:[2,130]},{5:[2,36],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{45:[1,349]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:350,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,111],37:[2,111],52:[2,111],54:[2,111],55:[2,111],57:[2,111],58:[2,111],62:[2,111],78:[2,111],84:[2,111],85:[2,111],87:[2,111],88:[2,111],89:[2,111],90:[2,111],91:[2,111],92:[2,111],93:[2,111],94:[2,111],95:[2,111],96:[2,111],97:[2,111],98:[2,111],99:[2,111],102:[2,111]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:351,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,113],37:[2,113],52:[2,113],54:[2,113],55:[2,113],57:[2,113],58:[2,113],62:[2,113],78:[2,113],84:[2,113],85:[2,113],87:[2,113],88:[2,113],89:[2,113],90:[2,113],91:[2,113],92:[2,113],93:[2,113],94:[2,113],95:[2,113],96:[2,113],97:[2,113],98:[2,113],99:[2,113],102:[2,113]},{10:[1,73],12:[1,74],36:[1,86],44:[1,88],45:[1,87],47:352,86:[1,84],96:[1,85],103:[1,89],104:[1,90],105:[1,91],106:[1,92],107:[1,93],108:[1,94],109:[1,95],110:[1,96],111:[1,97],112:[1,98],113:[1,99],114:[1,100],115:[1,101],116:[1,102],117:[1,103],118:[1,104],119:[1,105],120:[1,106],121:[1,107],122:[1,108],123:[1,109],124:[1,110],125:111,126:[1,75]},{5:[2,39]},{5:[2,41],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,353],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{37:[1,354],84:[1,153],85:[1,154],87:[1,155],88:[1,156],89:[1,157],90:[1,158],91:[1,159],92:[1,160],93:[1,161],94:[1,162],95:[1,163],96:[1,164],97:[1,165],98:[1,166],99:[1,167]},{5:[2,112],37:[2,112],52:[2,112],54:[2,112],55:[2,112],57:[2,112],58:[2,112],62:[2,112],78:[2,112],84:[2,112],85:[2,112],87:[2,112],88:[2,112],89:[2,112],90:[2,112],91:[2,112],92:[2,112],93:[2,112],94:[2,112],95:[2,112],96:[2,112],97:[2,112],98:[2,112],99:[2,112],102:[2,112]},{5:[2,114],37:[2,114],52:[2,114],54:[2,114],55:[2,114],57:[2,114],58:[2,114],62:[2,114],78:[2,114],84:[2,114],85:[2,114],87:[2,114],88:[2,114],89:[2,114],90:[2,114],91:[2,114],92:[2,114],93:[2,114],94:[2,114],95:[2,114],96:[2,114],97:[2,114],98:[2,114],99:[2,114],102:[2,114]}],
defaultActions: {5:[2,9],7:[2,11],8:[2,12],9:[2,13],10:[2,14],11:[2,15],12:[2,16],13:[2,17],14:[2,18],15:[2,19],16:[2,20],18:[2,22],19:[2,23],20:[2,24],21:[2,25],22:[2,26],23:[2,27],24:[2,28],25:[2,29],26:[2,30],27:[2,31],30:[2,6],37:[2,38],51:[2,65],54:[2,69],55:[2,70],56:[2,71],59:[2,2],62:[2,8],63:[2,10],64:[2,7],67:[2,33],131:[2,59],136:[2,68],140:[2,1],151:[2,43],219:[2,32],272:[2,48],273:[2,49],274:[2,50],283:[2,57],284:[2,58],334:[2,40],349:[2,39]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
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
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
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
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
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
                this.yy,
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
/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
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
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
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
};
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
exports.parser = kc;
exports.Parser = kc.Parser;
exports.parse = function () { return kc.parse.apply(kc, arguments); };
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
},{"./katra":3,"__browserify_process":9,"fs":8,"path":10}],5:[function(require,module,exports){
var process=require("__browserify_process"),__dirname="/";// Generated by CoffeeScript 1.7.1
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

},{"./katra.console":2,"__browserify_process":9,"colors":1,"fs":8,"path":10}],6:[function(require,module,exports){
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
            if (ev.source === window && ev.data === 'process-tick') {
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],10:[function(require,module,exports){
var process=require("__browserify_process");// Copyright Joyent, Inc. and other Node contributors.
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

},{"__browserify_process":9}]},{},[6])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9icnVjZS9jaHJvbWUvcmV0cm8tdHJlay9ub2RlX21vZHVsZXMvY29sb3JzL2NvbG9ycy5qcyIsIi9ob21lL2JydWNlL2Nocm9tZS9yZXRyby10cmVrL3RtcC9rYXRyYS5jb25zb2xlLmpzIiwiL2hvbWUvYnJ1Y2UvY2hyb21lL3JldHJvLXRyZWsvdG1wL2thdHJhLmpzIiwiL2hvbWUvYnJ1Y2UvY2hyb21lL3JldHJvLXRyZWsvdG1wL2tjLmpzIiwiL2hvbWUvYnJ1Y2UvY2hyb21lL3JldHJvLXRyZWsvdG1wL3J0ZS5qcyIsIi9ob21lL2JydWNlL2Nocm9tZS9yZXRyby10cmVrL3RtcC9ydW4ta2F0cmEuanMiLCIvaG9tZS9icnVjZS9jaHJvbWUvcmV0cm8tdHJlay90bXAvdXRpbC5qcyIsIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L19lbXB0eS5qcyIsIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wYXRoLWJyb3dzZXJpZnkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzeUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbmNvbG9ycy5qc1xuXG5Db3B5cmlnaHQgKGMpIDIwMTBcblxuTWFyYWsgU3F1aXJlc1xuQWxleGlzIFNlbGxpZXIgKGNsb3VkaGVhZClcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuXG4qL1xuXG52YXIgaXNIZWFkbGVzcyA9IGZhbHNlO1xuXG4vL2lmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuLy8gIGlzSGVhZGxlc3MgPSB0cnVlO1xuLy99XG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpc0hlYWRsZXNzID0gdHJ1ZTtcbn1cblxuXG5pZiAoIWlzSGVhZGxlc3MpIHtcbiAgdmFyIGV4cG9ydHMgPSB7fTtcbiAgdmFyIG1vZHVsZSA9IHt9O1xuICB2YXIgY29sb3JzID0gZXhwb3J0cztcbiAgZXhwb3J0cy5tb2RlID0gXCJicm93c2VyXCI7XG59IGVsc2Uge1xuICBleHBvcnRzLm1vZGUgPSBcImNvbnNvbGVcIjtcbn1cblxuLy9cbi8vIFByb3RvdHlwZXMgdGhlIHN0cmluZyBvYmplY3QgdG8gaGF2ZSBhZGRpdGlvbmFsIG1ldGhvZCBjYWxscyB0aGF0IGFkZCB0ZXJtaW5hbCBjb2xvcnNcbi8vXG52YXIgYWRkUHJvcGVydHkgPSBmdW5jdGlvbiAoY29sb3IsIGZ1bmMpIHtcbiAgZXhwb3J0c1tjb2xvcl0gPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkoc3RyKTtcbiAgfTtcbiAgU3RyaW5nLnByb3RvdHlwZS5fX2RlZmluZUdldHRlcl9fKGNvbG9yLCBmdW5jKTtcbn07XG5cbmZ1bmN0aW9uIHN0eWxpemUoc3RyLCBzdHlsZSkge1xuXG4gIHZhciBzdHlsZXM7XG5cbiAgaWYgKGV4cG9ydHMubW9kZSA9PT0gJ2NvbnNvbGUnKSB7XG4gICAgc3R5bGVzID0ge1xuICAgICAgLy9zdHlsZXNcbiAgICAgICdib2xkJyAgICAgIDogWydcXHgxQlsxbScsICAnXFx4MUJbMjJtJ10sXG4gICAgICAnaXRhbGljJyAgICA6IFsnXFx4MUJbM20nLCAgJ1xceDFCWzIzbSddLFxuICAgICAgJ3VuZGVybGluZScgOiBbJ1xceDFCWzRtJywgICdcXHgxQlsyNG0nXSxcbiAgICAgICdpbnZlcnNlJyAgIDogWydcXHgxQls3bScsICAnXFx4MUJbMjdtJ10sXG4gICAgICAnc3RyaWtldGhyb3VnaCcgOiBbJ1xceDFCWzltJywgICdcXHgxQlsyOW0nXSxcbiAgICAgIC8vdGV4dCBjb2xvcnNcbiAgICAgIC8vZ3JheXNjYWxlXG4gICAgICAnd2hpdGUnICAgICA6IFsnXFx4MUJbMzdtJywgJ1xceDFCWzM5bSddLFxuICAgICAgJ2dyZXknICAgICAgOiBbJ1xceDFCWzkwbScsICdcXHgxQlszOW0nXSxcbiAgICAgICdibGFjaycgICAgIDogWydcXHgxQlszMG0nLCAnXFx4MUJbMzltJ10sXG4gICAgICAvL2NvbG9yc1xuICAgICAgJ2JsdWUnICAgICAgOiBbJ1xceDFCWzM0bScsICdcXHgxQlszOW0nXSxcbiAgICAgICdjeWFuJyAgICAgIDogWydcXHgxQlszNm0nLCAnXFx4MUJbMzltJ10sXG4gICAgICAnZ3JlZW4nICAgICA6IFsnXFx4MUJbMzJtJywgJ1xceDFCWzM5bSddLFxuICAgICAgJ21hZ2VudGEnICAgOiBbJ1xceDFCWzM1bScsICdcXHgxQlszOW0nXSxcbiAgICAgICdyZWQnICAgICAgIDogWydcXHgxQlszMW0nLCAnXFx4MUJbMzltJ10sXG4gICAgICAneWVsbG93JyAgICA6IFsnXFx4MUJbMzNtJywgJ1xceDFCWzM5bSddLFxuICAgICAgLy9iYWNrZ3JvdW5kIGNvbG9yc1xuICAgICAgLy9ncmF5c2NhbGVcbiAgICAgICd3aGl0ZUJHJyAgICAgOiBbJ1xceDFCWzQ3bScsICdcXHgxQls0OW0nXSxcbiAgICAgICdncmV5QkcnICAgICAgOiBbJ1xceDFCWzQ5OzU7OG0nLCAnXFx4MUJbNDltJ10sXG4gICAgICAnYmxhY2tCRycgICAgIDogWydcXHgxQls0MG0nLCAnXFx4MUJbNDltJ10sXG4gICAgICAvL2NvbG9yc1xuICAgICAgJ2JsdWVCRycgICAgICA6IFsnXFx4MUJbNDRtJywgJ1xceDFCWzQ5bSddLFxuICAgICAgJ2N5YW5CRycgICAgICA6IFsnXFx4MUJbNDZtJywgJ1xceDFCWzQ5bSddLFxuICAgICAgJ2dyZWVuQkcnICAgICA6IFsnXFx4MUJbNDJtJywgJ1xceDFCWzQ5bSddLFxuICAgICAgJ21hZ2VudGFCRycgICA6IFsnXFx4MUJbNDVtJywgJ1xceDFCWzQ5bSddLFxuICAgICAgJ3JlZEJHJyAgICAgICA6IFsnXFx4MUJbNDFtJywgJ1xceDFCWzQ5bSddLFxuICAgICAgJ3llbGxvd0JHJyAgICA6IFsnXFx4MUJbNDNtJywgJ1xceDFCWzQ5bSddXG4gICAgfTtcbiAgfSBlbHNlIGlmIChleHBvcnRzLm1vZGUgPT09ICdicm93c2VyJykge1xuICAgIHN0eWxlcyA9IHtcbiAgICAgIC8vc3R5bGVzXG4gICAgICAnYm9sZCcgICAgICA6IFsnPGI+JywgICc8L2I+J10sXG4gICAgICAnaXRhbGljJyAgICA6IFsnPGk+JywgICc8L2k+J10sXG4gICAgICAndW5kZXJsaW5lJyA6IFsnPHU+JywgICc8L3U+J10sXG4gICAgICAnaW52ZXJzZScgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOmJsYWNrO2NvbG9yOndoaXRlO1wiPicsICAnPC9zcGFuPiddLFxuICAgICAgJ3N0cmlrZXRocm91Z2gnIDogWyc8ZGVsPicsICAnPC9kZWw+J10sXG4gICAgICAvL3RleHQgY29sb3JzXG4gICAgICAvL2dyYXlzY2FsZVxuICAgICAgJ3doaXRlJyAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6d2hpdGU7XCI+JywgICAnPC9zcGFuPiddLFxuICAgICAgJ2dyZXknICAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6Z3JheTtcIj4nLCAgICAnPC9zcGFuPiddLFxuICAgICAgJ2JsYWNrJyAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6YmxhY2s7XCI+JywgICAnPC9zcGFuPiddLFxuICAgICAgLy9jb2xvcnNcbiAgICAgICdibHVlJyAgICAgIDogWyc8c3BhbiBzdHlsZT1cImNvbG9yOmJsdWU7XCI+JywgICAgJzwvc3Bhbj4nXSxcbiAgICAgICdjeWFuJyAgICAgIDogWyc8c3BhbiBzdHlsZT1cImNvbG9yOmN5YW47XCI+JywgICAgJzwvc3Bhbj4nXSxcbiAgICAgICdncmVlbicgICAgIDogWyc8c3BhbiBzdHlsZT1cImNvbG9yOmdyZWVuO1wiPicsICAgJzwvc3Bhbj4nXSxcbiAgICAgICdtYWdlbnRhJyAgIDogWyc8c3BhbiBzdHlsZT1cImNvbG9yOm1hZ2VudGE7XCI+JywgJzwvc3Bhbj4nXSxcbiAgICAgICdyZWQnICAgICAgIDogWyc8c3BhbiBzdHlsZT1cImNvbG9yOnJlZDtcIj4nLCAgICAgJzwvc3Bhbj4nXSxcbiAgICAgICd5ZWxsb3cnICAgIDogWyc8c3BhbiBzdHlsZT1cImNvbG9yOnllbGxvdztcIj4nLCAgJzwvc3Bhbj4nXSxcbiAgICAgIC8vYmFja2dyb3VuZCBjb2xvcnNcbiAgICAgIC8vZ3JheXNjYWxlXG4gICAgICAnd2hpdGVCRycgICAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6d2hpdGU7XCI+JywgICAnPC9zcGFuPiddLFxuICAgICAgJ2dyZXlCRycgICAgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOmdyYXk7XCI+JywgICAgJzwvc3Bhbj4nXSxcbiAgICAgICdibGFja0JHJyAgICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpibGFjaztcIj4nLCAgICc8L3NwYW4+J10sXG4gICAgICAvL2NvbG9yc1xuICAgICAgJ2JsdWVCRycgICAgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOmJsdWU7XCI+JywgICAgJzwvc3Bhbj4nXSxcbiAgICAgICdjeWFuQkcnICAgICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpjeWFuO1wiPicsICAgICc8L3NwYW4+J10sXG4gICAgICAnZ3JlZW5CRycgICAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Z3JlZW47XCI+JywgICAnPC9zcGFuPiddLFxuICAgICAgJ21hZ2VudGFCRycgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOm1hZ2VudGE7XCI+JywgJzwvc3Bhbj4nXSxcbiAgICAgICdyZWRCRycgICAgICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpyZWQ7XCI+JywgICAgICc8L3NwYW4+J10sXG4gICAgICAneWVsbG93QkcnICAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6eWVsbG93O1wiPicsICAnPC9zcGFuPiddXG4gICAgfTtcbiAgfSBlbHNlIGlmIChleHBvcnRzLm1vZGUgPT09ICdub25lJykge1xuICAgIHJldHVybiBzdHIgKyAnJztcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygndW5zdXBwb3J0ZWQgbW9kZSwgdHJ5IFwiYnJvd3NlclwiLCBcImNvbnNvbGVcIiBvciBcIm5vbmVcIicpO1xuICB9XG4gIHJldHVybiBzdHlsZXNbc3R5bGVdWzBdICsgc3RyICsgc3R5bGVzW3N0eWxlXVsxXTtcbn1cblxuZnVuY3Rpb24gYXBwbHlUaGVtZSh0aGVtZSkge1xuXG4gIC8vXG4gIC8vIFJlbWFyazogVGhpcyBpcyBhIGxpc3Qgb2YgbWV0aG9kcyB0aGF0IGV4aXN0XG4gIC8vIG9uIFN0cmluZyB0aGF0IHlvdSBzaG91bGQgbm90IG92ZXJ3cml0ZS5cbiAgLy9cbiAgdmFyIHN0cmluZ1Byb3RvdHlwZUJsYWNrbGlzdCA9IFtcbiAgICAnX19kZWZpbmVHZXR0ZXJfXycsICdfX2RlZmluZVNldHRlcl9fJywgJ19fbG9va3VwR2V0dGVyX18nLCAnX19sb29rdXBTZXR0ZXJfXycsICdjaGFyQXQnLCAnY29uc3RydWN0b3InLFxuICAgICdoYXNPd25Qcm9wZXJ0eScsICdpc1Byb3RvdHlwZU9mJywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJ3RvTG9jYWxlU3RyaW5nJywgJ3RvU3RyaW5nJywgJ3ZhbHVlT2YnLCAnY2hhckNvZGVBdCcsXG4gICAgJ2luZGV4T2YnLCAnbGFzdEluZGV4b2YnLCAnbGVuZ3RoJywgJ2xvY2FsZUNvbXBhcmUnLCAnbWF0Y2gnLCAncmVwbGFjZScsICdzZWFyY2gnLCAnc2xpY2UnLCAnc3BsaXQnLCAnc3Vic3RyaW5nJyxcbiAgICAndG9Mb2NhbGVMb3dlckNhc2UnLCAndG9Mb2NhbGVVcHBlckNhc2UnLCAndG9Mb3dlckNhc2UnLCAndG9VcHBlckNhc2UnLCAndHJpbScsICd0cmltTGVmdCcsICd0cmltUmlnaHQnXG4gIF07XG5cbiAgT2JqZWN0LmtleXModGhlbWUpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICBpZiAoc3RyaW5nUHJvdG90eXBlQmxhY2tsaXN0LmluZGV4T2YocHJvcCkgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2FybjogJy5yZWQgKyAoJ1N0cmluZy5wcm90b3R5cGUnICsgcHJvcCkubWFnZW50YSArICcgaXMgcHJvYmFibHkgc29tZXRoaW5nIHlvdSBkb25cXCd0IHdhbnQgdG8gb3ZlcnJpZGUuIElnbm9yaW5nIHN0eWxlIG5hbWUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAodHlwZW9mKHRoZW1lW3Byb3BdKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgYWRkUHJvcGVydHkocHJvcCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBleHBvcnRzW3RoZW1lW3Byb3BdXSh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWRkUHJvcGVydHkocHJvcCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciByZXQgPSB0aGlzO1xuICAgICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGhlbWVbcHJvcF0ubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgICAgIHJldCA9IGV4cG9ydHNbdGhlbWVbcHJvcF1bdF1dKHJldCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cblxuLy9cbi8vIEl0ZXJhdGUgdGhyb3VnaCBhbGwgZGVmYXVsdCBzdHlsZXMgYW5kIGNvbG9yc1xuLy9cbnZhciB4ID0gWydib2xkJywgJ3VuZGVybGluZScsICdzdHJpa2V0aHJvdWdoJywgJ2l0YWxpYycsICdpbnZlcnNlJywgJ2dyZXknLCAnYmxhY2snLCAneWVsbG93JywgJ3JlZCcsICdncmVlbicsICdibHVlJywgJ3doaXRlJywgJ2N5YW4nLCAnbWFnZW50YScsICdncmV5QkcnLCAnYmxhY2tCRycsICd5ZWxsb3dCRycsICdyZWRCRycsICdncmVlbkJHJywgJ2JsdWVCRycsICd3aGl0ZUJHJywgJ2N5YW5CRycsICdtYWdlbnRhQkcnXTtcbnguZm9yRWFjaChmdW5jdGlvbiAoc3R5bGUpIHtcblxuICAvLyBfX2RlZmluZUdldHRlcl9fIGF0IHRoZSBsZWFzdCB3b3JrcyBpbiBtb3JlIGJyb3dzZXJzXG4gIC8vIGh0dHA6Ly9yb2JlcnRueW1hbi5jb20vamF2YXNjcmlwdC9qYXZhc2NyaXB0LWdldHRlcnMtc2V0dGVycy5odG1sXG4gIC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvbmx5IHdvcmtzIGluIENocm9tZVxuICBhZGRQcm9wZXJ0eShzdHlsZSwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzdHlsaXplKHRoaXMsIHN0eWxlKTtcbiAgfSk7XG59KTtcblxuZnVuY3Rpb24gc2VxdWVuY2VyKG1hcCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghaXNIZWFkbGVzcykge1xuICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKCApLywgJyQxJyk7XG4gICAgfVxuICAgIHZhciBleHBsb2RlZCA9IHRoaXMuc3BsaXQoXCJcIiksIGkgPSAwO1xuICAgIGV4cGxvZGVkID0gZXhwbG9kZWQubWFwKG1hcCk7XG4gICAgcmV0dXJuIGV4cGxvZGVkLmpvaW4oXCJcIik7XG4gIH07XG59XG5cbnZhciByYWluYm93TWFwID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJhaW5ib3dDb2xvcnMgPSBbJ3JlZCcsICd5ZWxsb3cnLCAnZ3JlZW4nLCAnYmx1ZScsICdtYWdlbnRhJ107IC8vUm9ZIEcgQmlWXG4gIHJldHVybiBmdW5jdGlvbiAobGV0dGVyLCBpLCBleHBsb2RlZCkge1xuICAgIGlmIChsZXR0ZXIgPT09IFwiIFwiKSB7XG4gICAgICByZXR1cm4gbGV0dGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3R5bGl6ZShsZXR0ZXIsIHJhaW5ib3dDb2xvcnNbaSsrICUgcmFpbmJvd0NvbG9ycy5sZW5ndGhdKTtcbiAgICB9XG4gIH07XG59KSgpO1xuXG5leHBvcnRzLnRoZW1lcyA9IHt9O1xuXG5leHBvcnRzLmFkZFNlcXVlbmNlciA9IGZ1bmN0aW9uIChuYW1lLCBtYXApIHtcbiAgYWRkUHJvcGVydHkobmFtZSwgc2VxdWVuY2VyKG1hcCkpO1xufTtcblxuZXhwb3J0cy5hZGRTZXF1ZW5jZXIoJ3JhaW5ib3cnLCByYWluYm93TWFwKTtcbmV4cG9ydHMuYWRkU2VxdWVuY2VyKCd6ZWJyYScsIGZ1bmN0aW9uIChsZXR0ZXIsIGksIGV4cGxvZGVkKSB7XG4gIHJldHVybiBpICUgMiA9PT0gMCA/IGxldHRlciA6IGxldHRlci5pbnZlcnNlO1xufSk7XG5cbmV4cG9ydHMuc2V0VGhlbWUgPSBmdW5jdGlvbiAodGhlbWUpIHtcbiAgaWYgKHR5cGVvZiB0aGVtZSA9PT0gJ3N0cmluZycpIHtcbiAgICB0cnkge1xuICAgICAgZXhwb3J0cy50aGVtZXNbdGhlbWVdID0gcmVxdWlyZSh0aGVtZSk7XG4gICAgICBhcHBseVRoZW1lKGV4cG9ydHMudGhlbWVzW3RoZW1lXSk7XG4gICAgICByZXR1cm4gZXhwb3J0cy50aGVtZXNbdGhlbWVdO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIHJldHVybiBlcnI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFwcGx5VGhlbWUodGhlbWUpO1xuICB9XG59O1xuXG5cbmFkZFByb3BlcnR5KCdzdHJpcENvbG9ycycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIChcIlwiICsgdGhpcykucmVwbGFjZSgvXFx4MUJcXFtcXGQrbS9nLCAnJyk7XG59KTtcblxuLy8gcGxlYXNlIG5vXG5mdW5jdGlvbiB6YWxnbyh0ZXh0LCBvcHRpb25zKSB7XG4gIHZhciBzb3VsID0ge1xuICAgIFwidXBcIiA6IFtcbiAgICAgICfMjScsICfMjicsICfMhCcsICfMhScsXG4gICAgICAnzL8nLCAnzJEnLCAnzIYnLCAnzJAnLFxuICAgICAgJ82SJywgJ82XJywgJ82RJywgJ8yHJyxcbiAgICAgICfMiCcsICfMiicsICfNgicsICfMkycsXG4gICAgICAnzIgnLCAnzYonLCAnzYsnLCAnzYwnLFxuICAgICAgJ8yDJywgJ8yCJywgJ8yMJywgJ82QJyxcbiAgICAgICfMgCcsICfMgScsICfMiycsICfMjycsXG4gICAgICAnzJInLCAnzJMnLCAnzJQnLCAnzL0nLFxuICAgICAgJ8yJJywgJ82jJywgJ82kJywgJ82lJyxcbiAgICAgICfNpicsICfNpycsICfNqCcsICfNqScsXG4gICAgICAnzaonLCAnzasnLCAnzawnLCAnza0nLFxuICAgICAgJ82uJywgJ82vJywgJ8y+JywgJ82bJyxcbiAgICAgICfNhicsICfMmidcbiAgICBdLFxuICAgIFwiZG93blwiIDogW1xuICAgICAgJ8yWJywgJ8yXJywgJ8yYJywgJ8yZJyxcbiAgICAgICfMnCcsICfMnScsICfMnicsICfMnycsXG4gICAgICAnzKAnLCAnzKQnLCAnzKUnLCAnzKYnLFxuICAgICAgJ8ypJywgJ8yqJywgJ8yrJywgJ8ysJyxcbiAgICAgICfMrScsICfMricsICfMrycsICfMsCcsXG4gICAgICAnzLEnLCAnzLInLCAnzLMnLCAnzLknLFxuICAgICAgJ8y6JywgJ8y7JywgJ8y8JywgJ82FJyxcbiAgICAgICfNhycsICfNiCcsICfNiScsICfNjScsXG4gICAgICAnzY4nLCAnzZMnLCAnzZQnLCAnzZUnLFxuICAgICAgJ82WJywgJ82ZJywgJ82aJywgJ8yjJ1xuICAgIF0sXG4gICAgXCJtaWRcIiA6IFtcbiAgICAgICfMlScsICfMmycsICfMgCcsICfMgScsXG4gICAgICAnzZgnLCAnzKEnLCAnzKInLCAnzKcnLFxuICAgICAgJ8yoJywgJ8y0JywgJ8y1JywgJ8y2JyxcbiAgICAgICfNnCcsICfNnScsICfNnicsXG4gICAgICAnzZ8nLCAnzaAnLCAnzaInLCAnzLgnLFxuICAgICAgJ8y3JywgJ82hJywgJyDSiSdcbiAgICBdXG4gIH0sXG4gIGFsbCA9IFtdLmNvbmNhdChzb3VsLnVwLCBzb3VsLmRvd24sIHNvdWwubWlkKSxcbiAgemFsZ28gPSB7fTtcblxuICBmdW5jdGlvbiByYW5kb21OdW1iZXIocmFuZ2UpIHtcbiAgICB2YXIgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJhbmdlKTtcbiAgICByZXR1cm4gcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzX2NoYXIoY2hhcmFjdGVyKSB7XG4gICAgdmFyIGJvb2wgPSBmYWxzZTtcbiAgICBhbGwuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICBib29sID0gKGkgPT09IGNoYXJhY3Rlcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJvb2w7XG4gIH1cblxuICBmdW5jdGlvbiBoZUNvbWVzKHRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgcmVzdWx0ID0gJycsIGNvdW50cywgbDtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zW1widXBcIl0gPSBvcHRpb25zW1widXBcIl0gfHwgdHJ1ZTtcbiAgICBvcHRpb25zW1wibWlkXCJdID0gb3B0aW9uc1tcIm1pZFwiXSB8fCB0cnVlO1xuICAgIG9wdGlvbnNbXCJkb3duXCJdID0gb3B0aW9uc1tcImRvd25cIl0gfHwgdHJ1ZTtcbiAgICBvcHRpb25zW1wic2l6ZVwiXSA9IG9wdGlvbnNbXCJzaXplXCJdIHx8IFwibWF4aVwiO1xuICAgIHRleHQgPSB0ZXh0LnNwbGl0KCcnKTtcbiAgICBmb3IgKGwgaW4gdGV4dCkge1xuICAgICAgaWYgKGlzX2NoYXIobCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSByZXN1bHQgKyB0ZXh0W2xdO1xuICAgICAgY291bnRzID0ge1widXBcIiA6IDAsIFwiZG93blwiIDogMCwgXCJtaWRcIiA6IDB9O1xuICAgICAgc3dpdGNoIChvcHRpb25zLnNpemUpIHtcbiAgICAgIGNhc2UgJ21pbmknOlxuICAgICAgICBjb3VudHMudXAgPSByYW5kb21OdW1iZXIoOCk7XG4gICAgICAgIGNvdW50cy5taW4gPSByYW5kb21OdW1iZXIoMik7XG4gICAgICAgIGNvdW50cy5kb3duID0gcmFuZG9tTnVtYmVyKDgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21heGknOlxuICAgICAgICBjb3VudHMudXAgPSByYW5kb21OdW1iZXIoMTYpICsgMztcbiAgICAgICAgY291bnRzLm1pbiA9IHJhbmRvbU51bWJlcig0KSArIDE7XG4gICAgICAgIGNvdW50cy5kb3duID0gcmFuZG9tTnVtYmVyKDY0KSArIDM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY291bnRzLnVwID0gcmFuZG9tTnVtYmVyKDgpICsgMTtcbiAgICAgICAgY291bnRzLm1pZCA9IHJhbmRvbU51bWJlcig2KSAvIDI7XG4gICAgICAgIGNvdW50cy5kb3duID0gcmFuZG9tTnVtYmVyKDgpICsgMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBhcnIgPSBbXCJ1cFwiLCBcIm1pZFwiLCBcImRvd25cIl07XG4gICAgICBmb3IgKHZhciBkIGluIGFycikge1xuICAgICAgICB2YXIgaW5kZXggPSBhcnJbZF07XG4gICAgICAgIGZvciAodmFyIGkgPSAwIDsgaSA8PSBjb3VudHNbaW5kZXhdOyBpKyspIHtcbiAgICAgICAgICBpZiAob3B0aW9uc1tpbmRleF0pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHNvdWxbaW5kZXhdW3JhbmRvbU51bWJlcihzb3VsW2luZGV4XS5sZW5ndGgpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGVDb21lcyh0ZXh0KTtcbn1cblxuXG4vLyBkb24ndCBzdW1tb24gemFsZ29cbmFkZFByb3BlcnR5KCd6YWxnbycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHphbGdvKHRoaXMpO1xufSk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCkge1xuICB2YXIgQ29uc29sZTtcbiAgJC5wcm90b3R5cGUuY29uc29sZSA9IGZ1bmN0aW9uKCRvcHRpb25zKSB7XG4gICAgdmFyIF9yZWY7XG4gICAgaWYgKCRvcHRpb25zID09IG51bGwpIHtcbiAgICAgICRvcHRpb25zID0ge307XG4gICAgfVxuICAgIHJldHVybiAoX3JlZiA9ICQuZGF0YSh0aGlzLCAnY29uc29sZScpKSAhPSBudWxsID8gX3JlZiA6ICQuZGF0YSh0aGlzLCAnY29uc29sZScsIG5ldyBDb25zb2xlKHRoaXMsICRvcHRpb25zKSk7XG4gIH07XG4gIHJldHVybiBDb25zb2xlID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBLRVlfQlMsIEtFWV9DLCBLRVlfQ1IsIEtFWV9ET1dOLCBLRVlfRVNDLCBLRVlfUiwgS0VZX1RBQiwgS0VZX1VQLCBjb2xvcnMsIGZpeDtcblxuICAgIEtFWV9CUyA9IDg7XG5cbiAgICBLRVlfVEFCID0gOTtcblxuICAgIEtFWV9DUiA9IDEzO1xuXG4gICAgS0VZX0VTQyA9IDI3O1xuXG4gICAgS0VZX1VQID0gMzg7XG5cbiAgICBLRVlfRE9XTiA9IDQwO1xuXG4gICAgS0VZX0MgPSA2NztcblxuICAgIEtFWV9SID0gODI7XG5cbiAgICBjb2xvcnMgPSByZXF1aXJlKCdjb2xvcnMnKTtcblxuICAgIGZpeCA9IGZ1bmN0aW9uKCR0ZXh0KSB7XG4gICAgICByZXR1cm4gJHRleHQucmVwbGFjZSgvXFwgL2csIFwiJm5ic3A7XCIpLnJlcGxhY2UoL1xcbi9nLCBcIjxiciAvPlwiKTtcbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuaGlzdHBvcyA9IDA7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5oaXN0b3J5ID0gbnVsbDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmlucHV0ID0gbnVsbDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLm91dHB1dCA9IG51bGw7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5wcm9tcHQgPSBudWxsO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUubW9kZSA9IDA7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5vcHRpb25zID0gbnVsbDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlW1wiZGVmYXVsdFwiXSA9IHtcbiAgICAgIGF1dG9mb2N1czogdHJ1ZSxcbiAgICAgIGhpc3Rvcnk6IHRydWUsXG4gICAgICB0aXRsZTogJycsXG4gICAgICBwcm9tcHQ6ICc+JyxcbiAgICAgIHByb21wdEFsdDogJz8nLFxuICAgICAgY29tbWFuZEhhbmRsZTogZnVuY3Rpb24oKSB7fSxcbiAgICAgIGNhbmNlbEhhbmRsZTogZnVuY3Rpb24oKSB7fVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBDb25zb2xlKCRjb250YWluZXIsICRvcHRpb25zKSB7XG4gICAgICB0aGlzLmhpc3RvcnkgPSBbXTtcbiAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHRoaXNbXCJkZWZhdWx0XCJdLCAkb3B0aW9ucyk7XG4gICAgICAkY29udGFpbmVyLmh0bWwoXCI8c3BhbiBjbGFzcz1cXFwib3V0cHV0XFxcIj48L3NwYW4+XFxuPHNwYW4gY2xhc3M9XFxcInByb21wdFxcXCI+PC9zcGFuPjxpbnB1dCBjbGFzcz1cXFwiaW5wdXRcXFwiPjwvaW5wdXQ+XCIpO1xuICAgICAgdGhpcy5vdXRwdXQgPSAkY29udGFpbmVyLmZpbmQoJy5vdXRwdXQnKTtcbiAgICAgIHRoaXMucHJvbXB0ID0gJGNvbnRhaW5lci5maW5kKCcucHJvbXB0Jyk7XG4gICAgICB0aGlzLmlucHV0ID0gJGNvbnRhaW5lci5maW5kKCcuaW5wdXQnKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b2ZvY3VzKSB7XG4gICAgICAgIHRoaXMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvbXB0LnRleHQodGhpcy5vcHRpb25zLnByb21wdCk7XG4gICAgICAkKHdpbmRvdykub24oJ2NsaWNrJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigkZSkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgJChkb2N1bWVudC5ib2R5KS5vbigna2V5ZG93bicsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICBpZiAoJGUua2V5Q29kZSA9PT0gS0VZX0VTQykge1xuICAgICAgICAgICAgJGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICB0aGlzLmlucHV0Lm9uKCdjbGljaycsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICByZXR1cm4gJGUudGFyZ2V0LnZhbHVlID0gJGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgICAgdGhpcy5pbnB1dC5vbigna2V5dXAnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgdmFyICRpbnB1dCwgJHRlbXA7XG4gICAgICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLmhpc3RvcnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgJGlucHV0ID0gJGUudGFyZ2V0O1xuICAgICAgICAgICR0ZW1wID0gMDtcbiAgICAgICAgICBpZiAoX3RoaXMuaGlzdG9yeS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICgkZS5rZXlDb2RlID09PSBLRVlfVVAgfHwgJGUua2V5Q29kZSA9PT0gS0VZX0RPV04pIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLmhpc3RvcnlbX3RoaXMuaGlzdHBvc10pIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaXN0b3J5W190aGlzLmhpc3Rwb3NdID0gJGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICR0ZW1wID0gX3RoaXMuaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkZS5rZXlDb2RlID09PSBLRVlfVVApIHtcbiAgICAgICAgICAgICAgX3RoaXMuaGlzdHBvcy0tO1xuICAgICAgICAgICAgICBpZiAoX3RoaXMuaGlzdHBvcyA8IDApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaXN0cG9zID0gMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICgkZS5rZXlDb2RlID09PSBLRVlfRE9XTikge1xuICAgICAgICAgICAgICBfdGhpcy5oaXN0cG9zKys7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5oaXN0cG9zID4gX3RoaXMuaGlzdG9yeS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaXN0cG9zID0gX3RoaXMuaGlzdG9yeS5sZW5ndGg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkZS5rZXlDb2RlID09PSBLRVlfVVAgfHwgJGUua2V5Q29kZSA9PT0gS0VZX0RPV04pIHtcbiAgICAgICAgICAgICAgJGlucHV0LnZhbHVlID0gX3RoaXMuaGlzdG9yeVtfdGhpcy5oaXN0cG9zXSA/IF90aGlzLmhpc3RvcnlbX3RoaXMuaGlzdHBvc10gOiAkdGVtcDtcbiAgICAgICAgICAgICAgcmV0dXJuICRpbnB1dC52YWx1ZSA9ICRpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICB0aGlzLmlucHV0Lm9uKCdrZXlkb3duJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigkZSkge1xuICAgICAgICAgIGlmICgkZS5jdHJsS2V5IHx8ICRlLm1ldGFLZXkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoJGUua2V5Q29kZSkge1xuICAgICAgICAgICAgICBjYXNlIEtFWV9DOlxuICAgICAgICAgICAgICAgIF90aGlzLm9wdGlvbnMuY2FuY2VsSGFuZGxlKCk7XG4gICAgICAgICAgICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIGNhc2UgS0VZX1I6XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgICB0aGlzLmlucHV0Lm9uKCdrZXlkb3duJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigkZSkge1xuICAgICAgICAgIHZhciAkaW5wdXQsICRwcm9tcHQ7XG4gICAgICAgICAgJGlucHV0ID0gJGUudGFyZ2V0O1xuICAgICAgICAgIHN3aXRjaCAoJGUua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBLRVlfQlM6XG4gICAgICAgICAgICAgIGlmICghJGlucHV0LnZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgS0VZX1RBQjpcbiAgICAgICAgICAgICAgcmV0dXJuICRlLnByZXZlbnREZWZhdWx0O1xuICAgICAgICAgICAgY2FzZSBLRVlfQ1I6XG4gICAgICAgICAgICAgIGlmICgkaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaXN0b3J5W190aGlzLmhpc3RvcnkubGVuZ3RoXSA9ICRpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaXN0cG9zID0gX3RoaXMuaGlzdG9yeS5sZW5ndGg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJHByb21wdCA9IF90aGlzLm1vZGUgPyBfdGhpcy5vcHRpb25zLnByb21wdEFsdCA6IF90aGlzLm9wdGlvbnMucHJvbXB0O1xuICAgICAgICAgICAgICBfdGhpcy5vdXRwdXQuYXBwZW5kKFwiXCIgKyAkcHJvbXB0ICsgJGlucHV0LnZhbHVlICsgXCI8YnIgLz5cIik7XG4gICAgICAgICAgICAgICRpbnB1dC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICAgICAgICBpZiAoJGlucHV0LnZhbHVlICYmICRpbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vcHRpb25zLmNvbW1hbmRIYW5kbGUoJGlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gJGlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgIH1cblxuICAgIENvbnNvbGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm91dHB1dC5odG1sKCcnKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbnRsbih0aGlzLm9wdGlvbnMudGl0bGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5zZXRQcm9tcHQgPSBmdW5jdGlvbigkcHJvbXB0KSB7XG4gICAgICBpZiAoJHByb21wdCA9PSBudWxsKSB7XG4gICAgICAgICRwcm9tcHQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvbXB0LnRleHQoJHByb21wdCA/IHRoaXMub3B0aW9ucy5wcm9tcHRBbHQgOiB0aGlzLm9wdGlvbnMucHJvbXB0KTtcbiAgICAgIHJldHVybiB0aGlzLm1vZGUgPSAkcHJvbXB0O1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5wcmludCA9IGZ1bmN0aW9uKCR0ZXh0KSB7XG4gICAgICBpZiAoJHRleHQgPT0gbnVsbCkge1xuICAgICAgICAkdGV4dCA9ICcnO1xuICAgICAgfVxuICAgICAgdGhpcy5vdXRwdXQuYXBwZW5kKGZpeCgkdGV4dCkpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5wdXQuZ2V0KDApLnNjcm9sbEludG9WaWV3KCk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnByaW50bG4gPSBmdW5jdGlvbigkdGV4dCkge1xuICAgICAgaWYgKCR0ZXh0ID09IG51bGwpIHtcbiAgICAgICAgJHRleHQgPSAnJztcbiAgICAgIH1cbiAgICAgIHRoaXMub3V0cHV0LmFwcGVuZChmaXgoXCJcIiArICR0ZXh0ICsgXCJcXG5cIikpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5wdXQuZ2V0KDApLnNjcm9sbEludG9WaWV3KCk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmRlYnVnID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIHRoaXMub3V0cHV0LmFwcGVuZChmaXgoXCJcIiArICR0ZXh0ICsgXCJcXG5cIikuYmx1ZSk7XG4gICAgICByZXR1cm4gdGhpcy5pbnB1dC5nZXQoMCkuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuaGlsaXRlID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIHRoaXMub3V0cHV0LmFwcGVuZChmaXgoXCJcIiArICR0ZXh0ICsgXCJcXG5cIikueWVsbG93KTtcbiAgICAgIHJldHVybiB0aGlzLmlucHV0LmdldCgwKS5zY3JvbGxJbnRvVmlldygpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ29uc29sZTtcblxuICB9KSgpO1xufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcbiIsInZhciBwcm9jZXNzPXJlcXVpcmUoXCJfX2Jyb3dzZXJpZnlfcHJvY2Vzc1wiKTsvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG52YXIgQUJTLCBBTkQsIEFUTiwgQWRkLCBCYXNlLCBCdWlsdEluLCBDT1MsIENoYWluLCBDb20sIENvbW1hLCBDb24sIENvbnNvbGUsIENvbnN0LCBEYXRhLCBEZWYsIERpbSwgRGl2LCBFUSwgRVhQLCBFbmQsIEVudGVyLCBGTiwgRk9SLCBGb3IsIEdFLCBHT1NVQiwgR1QsIEdvc3ViLCBHb3RvLCBJTlQsIElmLCBJbWFnZSwgSW5wdXQsIEtleXdvcmQsIExDQVNFLCBMRSwgTEVGVCwgTEVOLCBMSU4sIExPRywgTFQsIExldCwgTUlELCBNT0RFX1JFUEwsIE1PREVfUlVOLCBNYXQsIE1hdFJlYWQsIE1heCwgTWluLCBNdWwsIE5FLCBOT1QsIE5leHQsIE9SLCBPcGVyYXRvciwgUEhBU0VfRVhFQywgUEhBU0VfU0NBTiwgUG93LCBQcmludCwgUklHSFQsIFJORCwgUmFuZG9taXplLCBSZWFkLCBSZW0sIFJlc3RvcmUsIFJldHVybiwgU0dOLCBTSU4sIFNQQSwgU1FSLCBTVUJTVFIsIFNlbWljLCBTdGF0ZW1lbnQsIFN0b3AsIFN1YiwgVEFCLCBUQU4sIFRJTSwgVUNBU0UsIFVzaW5nLCBWX0FUQVJJLCBWX0dXQkFTSUMsIFZfSFAyMDAwLCBWYXIsIFplciwgYXJyYXlzLCBiZW5jaG1hcmssIGJlbmNobWFya3MsIGNoYWluLCBjb21tb24sIGRhdGEsIGRpbSwgZHAsIGVsYXBzZWRUaW1lLCBlb3AsIGV4ZWN1dGUsIGZpeHVwSWYsIGZpeHVwUHJpbnQsIGZvcm1hdCwgZnVuY3Rpb25zLCBndywgaW5pdGlhbGl6ZSwga2F0cmEsIGxvYWQsIG5hbWUsIG9mZnNldCwgcGFyc2UsIHBjLCBwcm9nLCBxdWFsaWZ5RmlsZW5hbWUsIHJhdywgcnRlLCBydW4sIHNhdmUsIHN0YWNrLCBzdGFydCwgc3RyaW5ncywgdGV4dCwgdGl0bGUsIHRyYWNlLCB0eXBlLCB1dGlsLCB2YWx1ZU9mLCB2YXJpYWJsZXMsIHhyZiwgX2NvbiwgX2ZzLFxuICBfX2JpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9LFxuICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgX19leHRlbmRzID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChfX2hhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gIF9fc2xpY2UgPSBbXS5zbGljZTtcblxudXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5cbnJ0ZSA9IHJlcXVpcmUoJy4vcnRlJyk7XG5cblZfSFAyMDAwID0gMDtcblxuVl9BVEFSSSA9IDE7XG5cblZfR1dCQVNJQyA9IDI7XG5cbkdPU1VCID0gMTtcblxuRk9SID0gMjtcblxuUEhBU0VfU0NBTiA9IDA7XG5cblBIQVNFX0VYRUMgPSAxO1xuXG5NT0RFX1JFUEwgPSAwO1xuXG5NT0RFX1JVTiA9IDE7XG5cbl9jb24gPSBudWxsO1xuXG5fZnMgPSBudWxsO1xuXG5hcnJheXMgPSB7fTtcblxuYmVuY2htYXJrcyA9IHt9O1xuXG5jb21tb24gPSBbXTtcblxuZGF0YSA9IFtdO1xuXG50cmFjZSA9IGZhbHNlO1xuXG5kcCA9IDA7XG5cbmVvcCA9IGZhbHNlO1xuXG5mdW5jdGlvbnMgPSB7fTtcblxuZ3cgPSBmYWxzZTtcblxubmFtZSA9ICcnO1xuXG5vZmZzZXQgPSAwO1xuXG5wYyA9IDA7XG5cbnByb2cgPSBbXTtcblxucmF3ID0ge307XG5cbnN0YWNrID0gW107XG5cbnN0cmluZ3MgPSB7fTtcblxudGV4dCA9ICcnO1xuXG50eXBlID0gMDtcblxudGl0bGUgPSAnJztcblxudmFyaWFibGVzID0ge307XG5cbnhyZiA9IHt9O1xuXG5Db25zb2xlID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICBfX2V4dGVuZHMoQ29uc29sZSwgX3N1cGVyKTtcblxuICBDb25zb2xlLnByb3RvdHlwZS5tb2RlID0gTU9ERV9SRVBMO1xuXG4gIENvbnNvbGUucHJvdG90eXBlLmV4ZWMgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIENvbnNvbGUoJHRpdGxlKSB7XG4gICAgdGhpcy5jb21tYW5kSGFuZGxlID0gX19iaW5kKHRoaXMuY29tbWFuZEhhbmRsZSwgdGhpcyk7XG4gICAgdGhpcy50aXRsZSA9ICR0aXRsZTtcbiAgICBDb25zb2xlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICB9XG5cbiAgQ29uc29sZS5wcm90b3R5cGUuY2FuY2VsSGFuZGxlID0gZnVuY3Rpb24oKSB7XG4gICAgZW9wID0gdHJ1ZTtcbiAgICBjb24ucHJpbnQoJ15DJyk7XG4gICAgY29uLnNldFByb21wdChmYWxzZSk7XG4gICAgcmV0dXJuIHJ1bigpO1xuICB9O1xuXG4gIENvbnNvbGUucHJvdG90eXBlLmNvbW1hbmRIYW5kbGUgPSBmdW5jdGlvbigkbGluZSkge1xuICAgIHZhciAkaXRlbSwgJGl4LCAkbmFtZSwgX2ksIF9qLCBfbGVuLCBfbGVuMSwgX3JlZiwgX3JlZjE7XG4gICAgc3dpdGNoICh0aGlzLm1vZGUpIHtcbiAgICAgIGNhc2UgTU9ERV9SVU46XG4gICAgICAgIF9yZWYgPSAkbGluZS50cmltKCkuc3BsaXQoXCIsXCIpO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAkaXRlbSA9IF9yZWZbX2ldO1xuICAgICAgICAgIHRoaXMuYnVmZmVyLnB1c2goaXNOYU4oJGl0ZW0pID8gU3RyaW5nKCRpdGVtKS50b1VwcGVyQ2FzZSgpIDogTnVtYmVyKCRpdGVtKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA8IHRoaXMudmFycy5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNvbnRpbnVlZFByb21wdCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3JlZjEgPSB0aGlzLnZhcnM7XG4gICAgICAgICAgZm9yICgkaXggPSBfaiA9IDAsIF9sZW4xID0gX3JlZjEubGVuZ3RoOyBfaiA8IF9sZW4xOyAkaXggPSArK19qKSB7XG4gICAgICAgICAgICAkbmFtZSA9IF9yZWYxWyRpeF07XG4gICAgICAgICAgICBpZiAoL1xcJCQvLnRlc3QoJG5hbWUpKSB7XG4gICAgICAgICAgICAgIHN0cmluZ3NbJG5hbWVdID0gdGhpcy5idWZmZXJbJGl4XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhcmlhYmxlc1skbmFtZV0gPSB0aGlzLmJ1ZmZlclskaXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNvbnRpbnVlZFByb21wdCA9IGZhbHNlO1xuICAgICAgICAgIHJ1bigpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNT0RFX1JFUEw6XG4gICAgICAgICRsaW5lID0gL1xcbiQvLnRlc3QoJGxpbmUpID8gJGxpbmUgOiBcIlwiICsgJGxpbmUgKyBcIlxcblwiO1xuICAgICAgICByZXR1cm4gcGFyc2UoJGxpbmUpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gQ29uc29sZTtcblxufSkocnRlLkNvbnNvbGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgY29uOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX2NvbiA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIF9jb24gPSBuZXcgQ29uc29sZSh0aXRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9jb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGZzOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX2ZzID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gX2ZzID0gbmV3IHJ0ZS5GaWxlU3lzdGVtKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF9mcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KSgpO1xuXG5pbml0aWFsaXplID0gZnVuY3Rpb24oJGFsbCkge1xuICBhcnJheXMgPSB7fTtcbiAgY29tbW9uID0gW107XG4gIGRhdGEgPSBbXTtcbiAgZHAgPSAwO1xuICBlb3AgPSBmYWxzZTtcbiAgZnVuY3Rpb25zID0ge307XG4gIGJlbmNobWFya3MgPSB7fTtcbiAgb2Zmc2V0ID0gMDtcbiAgcGMgPSAwO1xuICBpZiAoJGFsbCkge1xuICAgIHJhdyA9IHt9O1xuICB9XG4gIHN0YWNrID0gW107XG4gIHN0cmluZ3MgPSB7fTtcbiAgdmFyaWFibGVzID0ge307XG4gIHJldHVybiB4cmYgPSB7fTtcbn07XG5cbnZhbHVlT2YgPSBmdW5jdGlvbigkdmFsdWUpIHtcbiAgaWYgKCR2YWx1ZVtcImV2YWxcIl0gIT0gbnVsbCkge1xuICAgIHJldHVybiAkdmFsdWVbXCJldmFsXCJdKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICR2YWx1ZTtcbiAgfVxufTtcblxucXVhbGlmeUZpbGVuYW1lID0gZnVuY3Rpb24oJG5hbWUsICR2ZXJzaW9uKSB7XG4gIGlmICgkdmVyc2lvbiA9PSBudWxsKSB7XG4gICAgJHZlcnNpb24gPSBWX0hQMjAwMDtcbiAgfVxuICBzd2l0Y2ggKCR2ZXJzaW9uKSB7XG4gICAgY2FzZSBWX0FUQVJJOlxuICAgICAgcmV0dXJuICdiYXMvYXRhcmkvJyArICRuYW1lO1xuICAgIGNhc2UgVl9HV0JBU0lDOlxuICAgICAgcmV0dXJuICdiYXMvZ3diYXNpYy8nICsgJG5hbWU7XG4gICAgY2FzZSBWX0hQMjAwMDpcbiAgICAgIHN3aXRjaCAoJG5hbWVbMF0pIHtcbiAgICAgICAgY2FzZSBcIipcIjpcbiAgICAgICAgICByZXR1cm4gJ2Jhcy9ocDJrL2dyb3VwLycgKyAkbmFtZS5zbGljZSgxKTtcbiAgICAgICAgY2FzZSBcIiRcIjpcbiAgICAgICAgICByZXR1cm4gJ2Jhcy9ocDJrL3N5c3RlbS8nICsgJG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIGNhc2UgXCIjXCI6XG4gICAgICAgICAgcmV0dXJuICdiYXMvaHAyay90ZXN0LycgKyAkbmFtZS5zbGljZSgxKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJ2Jhcy9ocDJrLycgKyAkbmFtZTtcbiAgICAgIH1cbiAgfVxufTtcblxuc2F2ZSA9IGZ1bmN0aW9uKCR2ZXJzaW9uLCAkbmFtZSwgJGRhdGEsICRuZXh0KSB7XG4gICRuYW1lID0gJG5hbWVbMF0gPT09ICdcIicgPyAkbmFtZS5zbGljZSgxLCAtMSkgOiAkbmFtZTtcbiAgY29uLnBhdXNlKHRydWUpO1xuICBmcy53cml0ZUZpbGUocXVhbGlmeUZpbGVuYW1lKCRuYW1lLCAkdmVyc2lvbiksICRkYXRhLCBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mICRuZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICRuZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiBjb24ucGF1c2UoZmFsc2UpO1xuICB9KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5sb2FkID0gZnVuY3Rpb24oJHZlcnNpb24sICRuYW1lLCAkaW5pdCwgJG5leHQpIHtcbiAgaWYgKCRpbml0ID09IG51bGwpIHtcbiAgICAkaW5pdCA9IHRydWU7XG4gIH1cbiAgJG5hbWUgPSAkbmFtZVswXSA9PT0gJ1wiJyA/ICRuYW1lLnNsaWNlKDEsIC0xKSA6ICRuYW1lO1xuICBpbml0aWFsaXplKCRpbml0KTtcbiAgY29uLnBhdXNlKHRydWUpO1xuICBmcy5yZWFkRmlsZShxdWFsaWZ5RmlsZW5hbWUoJG5hbWUsICR2ZXJzaW9uKSwgZnVuY3Rpb24oJGVyciwgJGRhdGEpIHtcbiAgICBpZiAoJGVyciAhPSBudWxsKSB7XG4gICAgICBjb24ucHJpbnRsbigkZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGRhdGEgPSB1dGlsLmNsZWFuKCRkYXRhKS5zcGxpdCgnXFxuJyk7XG4gICAgICBpZiAoaXNOYU4oJGRhdGFbMF1bMF0pKSB7XG4gICAgICAgICRkYXRhLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICBpZiAoJGRhdGFbMF0gPT09IFwiXCIpIHtcbiAgICAgICAgJGRhdGEuc2hpZnQoKTtcbiAgICAgIH1cbiAgICAgIG5hbWUgPSAvXltBLVphLXpdLy50ZXN0KCRuYW1lKSA/ICRuYW1lIDogJG5hbWUuc2xpY2UoMSk7XG4gICAgICB0eXBlID0gJHZlcnNpb247XG4gICAgICBndyA9IHR5cGUgPT09IFZfR1dCQVNJQyA/IHRydWUgOiBmYWxzZTtcbiAgICAgIHRleHQgPSAkZGF0YS5qb2luKCdcXG4nKTtcbiAgICAgIGlmICh0eXBlb2YgJG5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAkbmV4dCh0ZXh0KTtcbiAgICAgIH1cbiAgICAgIHBhcnNlKHRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY29uLnBhdXNlKGZhbHNlKTtcbiAgfSk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhlY3V0ZSA9IGZ1bmN0aW9uKCR2ZXJzaW9uLCAkbmFtZSwgJGluaXQpIHtcbiAgaWYgKCRpbml0ID09IG51bGwpIHtcbiAgICAkaW5pdCA9IHRydWU7XG4gIH1cbiAgaW5pdGlhbGl6ZSgkaW5pdCk7XG4gIGNvbi5wYXVzZSh0cnVlKTtcbiAgZnMucmVhZEZpbGUocXVhbGlmeUZpbGVuYW1lKCRuYW1lLCAkdmVyc2lvbiksIGZ1bmN0aW9uKCRlcnIsICRkYXRhKSB7XG4gICAgaWYgKCRlcnIgIT0gbnVsbCkge1xuICAgICAgY29uLnByaW50bG4oJGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgICRkYXRhID0gdXRpbC5jbGVhbigkZGF0YSkuc3BsaXQoJ1xcbicpO1xuICAgICAgaWYgKGlzTmFOKCRkYXRhWzBdWzBdKSkge1xuICAgICAgICAkZGF0YS5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgaWYgKCRkYXRhWzBdID09PSBcIlwiKSB7XG4gICAgICAgICRkYXRhLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICBuYW1lID0gL15bQS1aYS16XS8udGVzdCgkbmFtZSkgPyAkbmFtZSA6ICRuYW1lLnNsaWNlKDEpO1xuICAgICAgdHlwZSA9ICR2ZXJzaW9uO1xuICAgICAgZ3cgPSB0eXBlID09PSBWX0dXQkFTSUMgPyB0cnVlIDogZmFsc2U7XG4gICAgICB0ZXh0ID0gJGRhdGEuam9pbignXFxuJyk7XG4gICAgICBwYXJzZSh0ZXh0KTtcbiAgICAgIHN0YXJ0KCk7XG4gICAgICBydW4oKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbi5wYXVzZShmYWxzZSk7XG4gIH0pO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkbGluZW5vLCAkc3RhdGVtZW50LCBfaSwgX2xlbiwgX3JlZjtcbiAgcHJvZyA9IFtdO1xuICBmb3IgKCRsaW5lbm8gaW4gcmF3KSB7XG4gICAgJHN0YXRlbWVudCA9IHJhd1skbGluZW5vXTtcbiAgICB3aGlsZSAoJGxpbmVuby5sZW5ndGggPCA0KSB7XG4gICAgICAkbGluZW5vID0gJzAnICsgJGxpbmVubztcbiAgICB9XG4gICAgcHJvZy5wdXNoKFskbGluZW5vLCAkc3RhdGVtZW50XSk7XG4gIH1cbiAgcHJvZy5zb3J0KCk7XG4gIGluaXRpYWxpemUoZmFsc2UpO1xuICBmb3IgKF9pID0gMCwgX2xlbiA9IHByb2cubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICBfcmVmID0gcHJvZ1tfaV0sICRsaW5lbm8gPSBfcmVmWzBdLCAkc3RhdGVtZW50ID0gX3JlZlsxXTtcbiAgICBpZiAoJHN0YXRlbWVudC5jb2RlLnR5cGUgPT09IFBIQVNFX1NDQU4pIHtcbiAgICAgICRzdGF0ZW1lbnQuY29kZVtcImV2YWxcIl0oKTtcbiAgICB9XG4gICAgeHJmW3BhcnNlSW50KCRsaW5lbm8sIDEwKV0gPSBwYysrO1xuICB9XG4gIHJldHVybiBwYyA9IDA7XG59O1xuXG5ydW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyICRjb2RlLCAkZSwgJGxpbmVubywgJHN0YXRlbWVudCwgJHdhaXQsIF9yZWY7XG4gICR3YWl0ID0gZmFsc2U7XG4gIGNvbi5zZXRNb2RlKE1PREVfUlVOKTtcbiAgdHJ5IHtcbiAgICB3aGlsZSAoIShlb3AgfHwgJHdhaXQpKSB7XG4gICAgICBfcmVmID0gcHJvZ1twYysrXSwgJGxpbmVubyA9IF9yZWZbMF0sICRzdGF0ZW1lbnQgPSBfcmVmWzFdO1xuICAgICAgJGNvZGUgPSAkc3RhdGVtZW50LmNvZGU7XG4gICAgICBpZiAoJHN0YXRlbWVudC5jb2RlLnR5cGUgPT09IFBIQVNFX0VYRUMpIHtcbiAgICAgICAgaWYgKHRyYWNlKSB7XG4gICAgICAgICAgY29uLmRlYnVnKCRsaW5lbm8gKyAnICcgKyAkY29kZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICAkd2FpdCA9ICRjb2RlW1wiZXZhbFwiXSgpO1xuICAgICAgfVxuICAgICAgY29uLnNldFByb21wdCgkd2FpdCk7XG4gICAgICBpZiAocGMgPj0gcHJvZy5sZW5ndGgpIHtcbiAgICAgICAgZW9wID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICRlID0gX2Vycm9yO1xuICAgIGNvbi5wcmludGxuKCRlKTtcbiAgICAkd2FpdCA9IGZhbHNlO1xuICB9XG4gIGlmICghJHdhaXQpIHtcbiAgICBjb24uc2V0TW9kZShNT0RFX1JFUEwpO1xuICAgIHJldHVybiBjb24ucHJpbnRsbignRE9ORScpO1xuICB9XG59O1xuXG5jaGFpbiA9IGZ1bmN0aW9uKCRjb2RlKSB7XG4gIHZhciAkaXgsICRzYXZlLCAkdmFyLCBfaSwgX2osIF9sZW4sIF9sZW4xO1xuICAkc2F2ZSA9IEFycmF5KGNvbW1vbi5sZW5ndGgpO1xuICBmb3IgKCRpeCA9IF9pID0gMCwgX2xlbiA9IGNvbW1vbi5sZW5ndGg7IF9pIDwgX2xlbjsgJGl4ID0gKytfaSkge1xuICAgICR2YXIgPSBjb21tb25bJGl4XTtcbiAgICBzd2l0Y2ggKCR2YXIudHlwZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICAkc2F2ZVskaXhdID0gc3RyaW5nc1skdmFyLm5hbWVdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgJHNhdmVbJGl4XSA9IHZhcmlhYmxlc1skdmFyLm5hbWVdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgJHNhdmVbJGl4XSA9IGFycmF5c1skdmFyLm5hbWVdO1xuICAgIH1cbiAgfVxuICBpbml0aWFsaXplKHRydWUpO1xuICBwYXJzZSgkY29kZSk7XG4gIHN0YXJ0KCk7XG4gIGZvciAoJGl4ID0gX2ogPSAwLCBfbGVuMSA9IGNvbW1vbi5sZW5ndGg7IF9qIDwgX2xlbjE7ICRpeCA9ICsrX2opIHtcbiAgICAkdmFyID0gY29tbW9uWyRpeF07XG4gICAgc3dpdGNoICgkdmFyLnR5cGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgc3RyaW5nc1skdmFyLm5hbWVdID0gJHNhdmVbJGl4XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHZhcmlhYmxlc1skdmFyLm5hbWVdID0gJHNhdmVbJGl4XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGFycmF5c1skdmFyLm5hbWVdID0gJHNhdmVbJGl4XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJ1bigpO1xufTtcblxucGFyc2UgPSBmdW5jdGlvbigkY29kZSkge1xuICB2YXIgJGUsICRpbmRleCwgJGxpbmUsIGtjLCBfaSwgX2xlbjtcbiAga2MgPSByZXF1aXJlKCcuL2tjJyk7XG4gICRjb2RlID0gJGNvZGUuc3BsaXQoJ1xcbicpO1xuICBmb3IgKCRpbmRleCA9IF9pID0gMCwgX2xlbiA9ICRjb2RlLmxlbmd0aDsgX2kgPCBfbGVuOyAkaW5kZXggPSArK19pKSB7XG4gICAgJGxpbmUgPSAkY29kZVskaW5kZXhdO1xuICAgIGlmICgvXlxcZCpcXHMqSUYvaS50ZXN0KCRsaW5lKSkge1xuICAgICAgJGNvZGVbJGluZGV4XSA9ICRsaW5lID0gZml4dXBJZigkbGluZSk7XG4gICAgfVxuICAgIGlmICgvXlxcZCpcXHMqUFJJTlQvaS50ZXN0KCRsaW5lKSkge1xuICAgICAgJGNvZGVbJGluZGV4XSA9ICRsaW5lID0gZml4dXBQcmludCgkbGluZSk7XG4gICAgfVxuICAgIGlmICgvXFwnKD89W15cIl0qKD86XCJbXlwiXSpcIlteXCJdKikqJCkvLnRlc3QoJGxpbmUpKSB7XG4gICAgICAkY29kZVskaW5kZXhdID0gJGxpbmUgPSAkbGluZS5yZXBsYWNlKC8oXFwnLiooPz1bXlwiXSooPzpcIlteXCJdKlwiW15cIl0qKSokKSkvZywgXCJcIik7XG4gICAgfVxuICAgIGlmICgvXFwqXFwqKD89W15cIl0qKD86XCJbXlwiXSpcIlteXCJdKikqJCkvLnRlc3QoJGxpbmUpKSB7XG4gICAgICAkY29kZVskaW5kZXhdID0gJGxpbmUgPSAkbGluZS5yZXBsYWNlKC8oXFwqXFwqKD89W15cIl0qKD86XCJbXlwiXSpcIlteXCJdKikqJCkpL2csIFwiXlwiKTtcbiAgICB9XG4gIH1cbiAgdHJ5IHtcbiAgICBrYy5wYXJzZSgkY29kZS5qb2luKCdcXG4nKSk7XG4gIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICRlID0gX2Vycm9yO1xuICAgIGNvbi5kZWJ1ZyhTdHJpbmcoJGUpKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZpeHVwSWYgPSBmdW5jdGlvbigkbGluZSkge1xuICAkbGluZSA9ICRsaW5lLnNwbGl0KC9USEVOL2kpO1xuICAkbGluZVswXSA9ICRsaW5lWzBdLnJlcGxhY2UoL1xcPS9nLCAnPT0nKS5yZXBsYWNlKC9cXDxcXD1cXD0vZywgJzw9JykucmVwbGFjZSgvXFw+XFw9XFw9L2csICc+PScpLnJlcGxhY2UoL1xcIy9nLCAnPD4nKTtcbiAgcmV0dXJuICRsaW5lLmpvaW4oXCIgVEhFTiBcIik7XG59O1xuXG5maXh1cFByaW50ID0gZnVuY3Rpb24oJGxpbmUpIHtcbiAgdmFyICRjaHVuaywgJGluZGV4LCAkaXNfc3RyaW5nLCAkbWF0Y2gsICRzZXAsIFNFUCwgX2ksIF9sZW4sIF9yZWYsIF9yZWYxO1xuICBTRVAgPSAnOzosJztcbiAgJGlzX3N0cmluZyA9IGZhbHNlO1xuICAkbWF0Y2ggPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9pLCBfbGVuLCBfcmVmLCBfcmVzdWx0cztcbiAgICBfcmVmID0gJGxpbmUubWF0Y2goL1teXCJdKig/IVxcXFxcIlteXCJdKlxcXCIpL2cpO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAkY2h1bmsgPSBfcmVmW19pXTtcbiAgICAgIGlmICgkY2h1bmsgIT09ICcnKSB7XG4gICAgICAgIF9yZXN1bHRzLnB1c2goJGNodW5rKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9yZXN1bHRzO1xuICB9KSgpO1xuICBmb3IgKCRpbmRleCA9IF9pID0gMCwgX2xlbiA9ICRtYXRjaC5sZW5ndGg7IF9pIDwgX2xlbjsgJGluZGV4ID0gKytfaSkge1xuICAgICRjaHVuayA9ICRtYXRjaFskaW5kZXhdO1xuICAgICRzZXAgPSAvXlxcZCpcXHMqUFJJTlRcXHMqJC9pLnRlc3QoJGNodW5rKSB8fCAkaW5kZXggPT09ICRtYXRjaC5sZW5ndGggLSAxID8gJycgOiAnOyc7XG4gICAgaWYgKCRpc19zdHJpbmcpIHtcbiAgICAgICRtYXRjaFskaW5kZXhdID0gJGNodW5rID0gJ1wiJyArICRjaHVuayArICdcIic7XG4gICAgICBpZiAoU0VQLmluZGV4T2YoKF9yZWYgPSAoX3JlZjEgPSAkbWF0Y2hbJGluZGV4ICsgMV0pICE9IG51bGwgPyBfcmVmMVswXSA6IHZvaWQgMCkgIT0gbnVsbCA/IF9yZWYgOiAnJykgPT09IC0xKSB7XG4gICAgICAgICRtYXRjaFskaW5kZXhdID0gJGNodW5rICsgJHNlcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFNFUC5pbmRleE9mKCRjaHVuay5zdWJzdHIoLTEpKSA9PT0gLTEpIHtcbiAgICAgICAgJG1hdGNoWyRpbmRleF0gPSAkY2h1bmsgKyAkc2VwO1xuICAgICAgfVxuICAgIH1cbiAgICAkaXNfc3RyaW5nID0gISRpc19zdHJpbmc7XG4gIH1cbiAgcmV0dXJuICRtYXRjaC5qb2luKCcnKTtcbn07XG5cbmRpbSA9IGZ1bmN0aW9uKCRpbml0LCAkZGltMSwgJGRpbTIpIHtcbiAgdmFyICRhLCAkaSwgJGosIF9pLCBfaiwgX2ssIF9yZWYsIF9yZWYxLCBfcmVmMjtcbiAgJGEgPSBbXTtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAyOlxuICAgICAgZm9yICgkaSA9IF9pID0gb2Zmc2V0LCBfcmVmID0gJGRpbTEgKyAxOyBvZmZzZXQgPD0gX3JlZiA/IF9pIDwgX3JlZiA6IF9pID4gX3JlZjsgJGkgPSBvZmZzZXQgPD0gX3JlZiA/ICsrX2kgOiAtLV9pKSB7XG4gICAgICAgICRhWyRpXSA9ICRpbml0O1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgZm9yICgkaSA9IF9qID0gb2Zmc2V0LCBfcmVmMSA9ICRkaW0xICsgMTsgb2Zmc2V0IDw9IF9yZWYxID8gX2ogPCBfcmVmMSA6IF9qID4gX3JlZjE7ICRpID0gb2Zmc2V0IDw9IF9yZWYxID8gKytfaiA6IC0tX2opIHtcbiAgICAgICAgJGFbJGldID0gW107XG4gICAgICAgIGZvciAoJGogPSBfayA9IG9mZnNldCwgX3JlZjIgPSAkZGltMiArIDE7IG9mZnNldCA8PSBfcmVmMiA/IF9rIDwgX3JlZjIgOiBfayA+IF9yZWYyOyAkaiA9IG9mZnNldCA8PSBfcmVmMiA/ICsrX2sgOiAtLV9rKSB7XG4gICAgICAgICAgJGFbJGldWyRqXSA9ICRpbml0O1xuICAgICAgICB9XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuICRhO1xufTtcblxuZm9ybWF0ID0gZnVuY3Rpb24oJGltYWdlKSB7XG4gIHZhciAkY291bnQsICRoZWFkLCAkb3V0O1xuICBpZiAoJGltYWdlID09IG51bGwpIHtcbiAgICAkaW1hZ2UgPSBbXTtcbiAgfVxuICAkb3V0ID0gJyc7XG4gICRjb3VudCA9IDE7XG4gIHdoaWxlICgkaW1hZ2UubGVuZ3RoID4gMCkge1xuICAgICRoZWFkID0gJGltYWdlLnNoaWZ0KCk7XG4gICAgaWYgKGlzTmFOKCRoZWFkKSkge1xuICAgICAgc3dpdGNoICgkaGVhZCkge1xuICAgICAgICBjYXNlICcsJzpcbiAgICAgICAgICAkY291bnQgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAkb3V0ICs9ICRjb3VudCA+IDEgPyAnJScgKyAkY291bnQgKyAnZCcgOiAnJWQnO1xuICAgICAgICAgICRjb3VudCA9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICRvdXQgKz0gJGNvdW50ID4gMSA/ICclJyArICRjb3VudCArICdzJyA6ICclcyc7XG4gICAgICAgICAgJGNvdW50ID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnWCc6XG4gICAgICAgICAgJG91dCArPSBBcnJheSgkY291bnQgKyAxKS5qb2luKCcgJyk7XG4gICAgICAgICAgJGNvdW50ID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnKCc6XG4gICAgICAgICAgJG91dCArPSBBcnJheSgkY291bnQgKyAxKS5qb2luKGZvcm1hdCgkaW1hZ2UpKTtcbiAgICAgICAgICAkY291bnQgPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcpJzpcbiAgICAgICAgICByZXR1cm4gJG91dDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAkb3V0ICs9ICRoZWFkLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgICAkY291bnQgPSAxO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAkY291bnQgPSAkaGVhZDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICRvdXQ7XG59O1xuXG5iZW5jaG1hcmsgPSBmdW5jdGlvbigkbmFtZSkge1xuICByZXR1cm4gYmVuY2htYXJrc1skbmFtZV0gPSBuZXcgRGF0ZSgpO1xufTtcblxuZWxhcHNlZFRpbWUgPSBmdW5jdGlvbigkcG9pbnQxLCAkcG9pbnQyKSB7XG4gIGlmIChiZW5jaG1hcmtzWyRwb2ludDFdID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoYmVuY2htYXJrc1skcG9pbnQyXSA9PSBudWxsKSB7XG4gICAgYmVuY2htYXJrc1skcG9pbnQyXSA9IG5ldyBEYXRlKCk7XG4gIH1cbiAgcmV0dXJuIGJlbmNobWFya3NbJHBvaW50Ml0gLSBiZW5jaG1hcmtzWyRwb2ludDFdO1xufTtcblxuWmVyID0ge1xuICBcImV2YWxcIjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJ1pFUic7XG4gIH1cbn07XG5cbkNvbiA9IHtcbiAgXCJldmFsXCI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAxO1xuICB9LFxuICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICdDT04nO1xuICB9XG59O1xuXG5TZW1pYyA9IHtcbiAgXCJldmFsXCI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAnJztcbiAgfSxcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAnOyc7XG4gIH1cbn07XG5cbkNvbW1hID0ge1xuICBcImV2YWxcIjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICcgICAgJztcbiAgfSxcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAnLCc7XG4gIH1cbn07XG5cbk9wZXJhdG9yID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBPcGVyYXRvcihsZWZ0LCByaWdodCkge1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIE9wZXJhdG9yO1xuXG59KSgpO1xuXG5CdWlsdEluID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBCdWlsdEluKCQwLCAkMSwgJDIpIHtcbiAgICB0aGlzLiQwID0gJDA7XG4gICAgdGhpcy4kMSA9ICQxO1xuICAgIHRoaXMuJDIgPSAkMjtcbiAgfVxuXG4gIEJ1aWx0SW4ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiXCIgKyAodGhpcy5jb25zdHJ1Y3Rvci5uYW1lLnRvVXBwZXJDYXNlKCkpICsgXCIoXCIgKyB0aGlzLiQwICsgXCIpXCI7XG4gIH07XG5cbiAgcmV0dXJuIEJ1aWx0SW47XG5cbn0pKCk7XG5cbktleXdvcmQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEtleXdvcmQoKSB7fVxuXG4gIEtleXdvcmQucHJvdG90eXBlLnR5cGUgPSBQSEFTRV9FWEVDO1xuXG4gIEtleXdvcmQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4gS2V5d29yZDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBrYXRyYSA9IHtcbiAgbWFpbjogZnVuY3Rpb24oJGFyZ3MpIHtcbiAgICB2YXIgX3JlZjtcbiAgICB0aXRsZSA9IChfcmVmID0gJGFyZ3MudGl0bGUpICE9IG51bGwgPyBfcmVmIDogdGl0bGU7XG4gICAgc3dpdGNoICgkYXJncy5iYXNpYykge1xuICAgICAgY2FzZSAnYXRhcmknOlxuICAgICAgICByZXR1cm4gZXhlY3V0ZShWX0FUQVJJLCAkYXJncy5wcm9ncmFtKTtcbiAgICAgIGNhc2UgJ2d3YmFzaWMnOlxuICAgICAgICByZXR1cm4gZXhlY3V0ZShWX0dXQkFTSUMsICRhcmdzLnByb2dyYW0pO1xuICAgICAgY2FzZSAnaHAyayc6XG4gICAgICAgIHJldHVybiBleGVjdXRlKFZfSFAyMDAwLCAkYXJncy5wcm9ncmFtKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBjb24uc2V0TW9kZShNT0RFX1JFUEwpO1xuICAgIH1cbiAgfSxcbiAgc2V0Um9vdDogZnVuY3Rpb24oJHJvb3QpIHtcbiAgICByZXR1cm4gZnMuc2V0Um9vdCgkcm9vdCk7XG4gIH0sXG4gIGdldFRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9LFxuICBjb21tYW5kOiB7XG4gICAgYXBwZW5kOiBmdW5jdGlvbigkMCkge1xuICAgICAgcmV0dXJuIGxvYWQoVl9IUDIwMDAsICQwLnNwbGl0KCctJylbMV0sIGZhbHNlKTtcbiAgICB9LFxuICAgIGF0YXJpOiBmdW5jdGlvbigkMCwgJG5leHQpIHtcbiAgICAgIHJldHVybiBsb2FkKFZfQVRBUkksICQwLCB0cnVlLCAkbmV4dCk7XG4gICAgfSxcbiAgICBjYXQ6IGZ1bmN0aW9uKCRkaXIpIHtcbiAgICAgIHZhciAkY3csICRoZHIsICRuYztcbiAgICAgICRuYyA9IDQ7XG4gICAgICAkY3cgPSAyMDtcbiAgICAgICRoZHIgPSAnbmFtZSAgICAgICAgICAgICAgICAnO1xuICAgICAgcmV0dXJuIGZzLnJlYWREaXIoJGRpciwgZnVuY3Rpb24oJGZpbGVzKSB7XG4gICAgICAgIHZhciAkY29sLCAkZmlsZSwgX2ksIF9sZW47XG4gICAgICAgICRjb2wgPSAwO1xuICAgICAgICBjb24uaGlsaXRlKFwiXFxuXCIgKyAkZGlyICsgXCJcXG5cIiArIChBcnJheSgkbmMgKyAxKS5qb2luKCRoZHIpKSk7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gJGZpbGVzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJGZpbGUgPSAkZmlsZXNbX2ldO1xuICAgICAgICAgICRmaWxlID0gJGZpbGUuc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICB3aGlsZSAoJGZpbGUubGVuZ3RoIDwgJGN3KSB7XG4gICAgICAgICAgICAkZmlsZSArPSBcIiBcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uLnByaW50KCRmaWxlKTtcbiAgICAgICAgICBpZiAoKCRjb2wrKykgJSAkbmMgPT09ICRuYyAtIDEpIHtcbiAgICAgICAgICAgIGNvbi5wcmludGxuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8IHdpbmRvdyA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBjb24ucHJpbnQoXCJcXG5cIiArIGNvbi5wcm9tcHQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNsczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY29uLmNsZWFyKCk7XG4gICAgfSxcbiAgICBkZWw6IGZ1bmN0aW9uKCQwKSB7XG4gICAgICB2YXIgJGVuZCwgJGxpbmVubywgJHN0YXJ0LCBfaSwgX3JlZiwgX3Jlc3VsdHM7XG4gICAgICBfcmVmID0gJDAuc3BsaXQoJy0nKVsxXS5zcGxpdCgnLCcpLCAkc3RhcnQgPSBfcmVmWzBdLCAkZW5kID0gX3JlZlsxXTtcbiAgICAgIGlmICghJGVuZCkge1xuICAgICAgICAkZW5kID0gJHN0YXJ0O1xuICAgICAgfVxuICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoJGxpbmVubyA9IF9pID0gJHN0YXJ0OyAkc3RhcnQgPD0gJGVuZCA/IF9pIDwgJGVuZCA6IF9pID4gJGVuZDsgJGxpbmVubyA9ICRzdGFydCA8PSAkZW5kID8gKytfaSA6IC0tX2kpIHtcbiAgICAgICAgaWYgKHJhd1skbGluZW5vXSAhPSBudWxsKSB7XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaChkZWxldGUgcmF3WyRsaW5lbm9dKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9LFxuICAgIGRpcjogZnVuY3Rpb24oJDApIHt9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKCQwKSB7XG4gICAgICByZXR1cm4gZXhlY3V0ZShWX0hQMjAwMCwgJDAuc3BsaXQoJy0nKVsxXSk7XG4gICAgfSxcbiAgICBmaWxlczogZnVuY3Rpb24oJDApIHt9LFxuICAgIGdldDogZnVuY3Rpb24oJDAsICRuZXh0KSB7XG4gICAgICByZXR1cm4gbG9hZChWX0hQMjAwMCwgJDAuc3BsaXQoJy0nKVsxXSwgdHJ1ZSwgJG5leHQpO1xuICAgIH0sXG4gICAgZ3diYXNpYzogZnVuY3Rpb24oJDAsICRuZXh0KSB7XG4gICAgICByZXR1cm4gbG9hZChWX0dXQkFTSUMsICQwLCB0cnVlLCAkbmV4dCk7XG4gICAgfSxcbiAgICBsaXN0OiBmdW5jdGlvbigkMCkge1xuICAgICAgdmFyICQxLCAkY29kZSwgJGVuZCwgJGxpbmVubywgJGxpbmVzLCAkc3RhcnQsICRzdGF0ZW1lbnQsIF9pLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHM7XG4gICAgICAkMSA9ICQwLnNwbGl0KCctJylbMV07XG4gICAgICBpZiAoJDEgIT0gbnVsbCkge1xuICAgICAgICBfcmVmID0gJDEuc3BsaXQoJywnKSwgJHN0YXJ0ID0gX3JlZlswXSwgJGVuZCA9IF9yZWZbMV07XG4gICAgICB9XG4gICAgICBpZiAoJHN0YXJ0ICE9IG51bGwpIHtcbiAgICAgICAgJGVuZCA9ICRlbmQgIT0gbnVsbCA/ICRlbmQgOiAkc3RhcnQ7XG4gICAgICAgICRzdGFydCA9IHBhcnNlSW50KCRzdGFydCwgMTApO1xuICAgICAgICAkZW5kID0gcGFyc2VJbnQoJGVuZCwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHN0YXJ0ID0gMTtcbiAgICAgICAgJGVuZCA9IDk5OTk7XG4gICAgICB9XG4gICAgICAkbGluZXMgPSBbXTtcbiAgICAgIGZvciAoJGxpbmVubyBpbiByYXcpIHtcbiAgICAgICAgJHN0YXRlbWVudCA9IHJhd1skbGluZW5vXTtcbiAgICAgICAgd2hpbGUgKCRsaW5lbm8ubGVuZ3RoIDwgNSkge1xuICAgICAgICAgICRsaW5lbm8gPSAnMCcgKyAkbGluZW5vO1xuICAgICAgICB9XG4gICAgICAgICRsaW5lcy5wdXNoKFskbGluZW5vLCAkc3RhdGVtZW50XSk7XG4gICAgICB9XG4gICAgICAkbGluZXMuc29ydCgpO1xuICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gJGxpbmVzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIF9yZWYxID0gJGxpbmVzW19pXSwgJGxpbmVubyA9IF9yZWYxWzBdLCAkc3RhdGVtZW50ID0gX3JlZjFbMV07XG4gICAgICAgICRsaW5lbm8gPSBwYXJzZUludCgkc3RhdGVtZW50LmxpbmVubywgMTApO1xuICAgICAgICAkY29kZSA9ICRzdGF0ZW1lbnQuY29kZTtcbiAgICAgICAgaWYgKCRzdGFydCAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKCRsaW5lbm8gPj0gcGFyc2VJbnQoJHN0YXJ0LCAxMCkgJiYgJGxpbmVubyA8PSBwYXJzZUludCgkZW5kLCAxMCkpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goY29uLnByaW50bG4oJGxpbmVubyArICcgJyArICRjb2RlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaChjb24ucHJpbnRsbigkbGluZW5vICsgJyAnICsgJGNvZGUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgIH0sXG4gICAgbmFtZTogZnVuY3Rpb24oJDApIHtcbiAgICAgIHJldHVybiBuYW1lID0gJDAuc3BsaXQoJy0nKVsxXTtcbiAgICB9LFxuICAgIHB1cmdlOiBmdW5jdGlvbigkMCkge1xuICAgICAgcmV0dXJuIGZzLmRlbGV0ZUZpbGUocXVhbGlmeUZpbGVuYW1lKCQwLnNwbGl0KCctJylbMV0sIHR5cGUpLCBmdW5jdGlvbigkZXJyKSB7XG4gICAgICAgIGlmICgkZXJyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gY29uLnByaW50bG4oJGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcXVpdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2VzcyAhPT0gbnVsbCA/IHByb2Nlc3MuZXhpdCgpIDogdm9pZCAwO1xuICAgIH0sXG4gICAgcmVudW06IGZ1bmN0aW9uKCQwKSB7XG4gICAgICByZXR1cm4gY29uLnByaW50bG4oXCJSZW51bWJlciBOb3QgSW1wbGVtZW50ZWRcIik7XG4gICAgfSxcbiAgICBydW46IGZ1bmN0aW9uKCQwKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXMocmF3KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0YXJ0KCk7XG4gICAgICAgIHJldHVybiBydW4oKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRjb2RlLCAkbGluZW5vLCAkbGluZXMsICRzdGF0ZW1lbnQsICR0ZXh0LCBfaSwgX2xlbiwgX3JlZjtcbiAgICAgIGlmIChuYW1lID09PSAnJykge1xuICAgICAgICByZXR1cm4gY29uLnByaW50bG4oXCJOYW1lIG5vdCBzZXRcIik7XG4gICAgICB9XG4gICAgICAkbGluZXMgPSBbXTtcbiAgICAgICR0ZXh0ID0gJyc7XG4gICAgICBmb3IgKCRsaW5lbm8gaW4gcmF3KSB7XG4gICAgICAgICRzdGF0ZW1lbnQgPSByYXdbJGxpbmVub107XG4gICAgICAgICRsaW5lcy5wdXNoKFskbGluZW5vLCAkc3RhdGVtZW50LmNvZGVdKTtcbiAgICAgIH1cbiAgICAgICRsaW5lcy5zb3J0KCk7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9ICRsaW5lcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBfcmVmID0gJGxpbmVzW19pXSwgJGxpbmVubyA9IF9yZWZbMF0sICRjb2RlID0gX3JlZlsxXTtcbiAgICAgICAgJHRleHQgKz0gJGxpbmVubyArICcgJyArICRjb2RlICsgJ1xcbic7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2F2ZSh0eXBlLCBuYW1lLCAkdGV4dC5zbGljZSgwLCAtMSksIGZ1bmN0aW9uKCRlcnIpIHtcbiAgICAgICAgaWYgKCRlcnIgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBjb24ucHJpbnRsbigkZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBzY3I6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGluaXRpYWxpemUodHJ1ZSk7XG4gICAgfSxcbiAgICB0cm9mZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJhY2UgPSBmYWxzZTtcbiAgICB9LFxuICAgIHRyb246IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRyYWNlID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG4gIGtleXdvcmQ6IHtcbiAgICBaZXI6IFplcixcbiAgICBDb246IENvbixcbiAgICBTZW1pYzogU2VtaWMsXG4gICAgQ29tbWE6IENvbW1hLFxuICAgIFN0YXRlbWVudDogU3RhdGVtZW50ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgZnVuY3Rpb24gU3RhdGVtZW50KCRjb2RlLCAkbGluZW5vKSB7XG4gICAgICAgIGlmICgkbGluZW5vICE9IG51bGwpIHtcbiAgICAgICAgICByYXdbJGxpbmVub10gPSB7XG4gICAgICAgICAgICBsaW5lbm86ICRsaW5lbm8sXG4gICAgICAgICAgICBjb2RlOiAkY29kZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCRjb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgJGNvZGVbXCJldmFsXCJdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgJGNvZGVbXCJldmFsXCJdKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBTdGF0ZW1lbnQ7XG5cbiAgICB9KSgpLFxuICAgIENvbnN0OiBDb25zdCA9IChmdW5jdGlvbigpIHtcbiAgICAgIGZ1bmN0aW9uIENvbnN0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5pc19zdHJpbmcgPSAnc3RyaW5nJyA9PT0gdHlwZW9mIHRoaXMudmFsdWUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzX3N0cmluZykge1xuICAgICAgICAgIGlmICh0aGlzLnZhbHVlLmNoYXJBdCgwKSA9PT0gJ1wiJykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuc2xpY2UoMSwgLTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBDb25zdC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICB9O1xuXG4gICAgICBDb25zdC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgfTtcblxuICAgICAgQ29uc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzX3N0cmluZykge1xuICAgICAgICAgIHJldHVybiBcIlxcXCJcIiArIHRoaXMudmFsdWUgKyBcIlxcXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb25zdDtcblxuICAgIH0pKCksXG4gICAgVmFyOiBWYXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICBmdW5jdGlvbiBWYXIobmFtZSwgJGRlbGltLCAkZGltcykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmlzX3N0cmluZyA9IC9cXCQkLy50ZXN0KHRoaXMubmFtZSk7XG4gICAgICAgIGlmICgkZGVsaW0gIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuaXNfYXJyYXkgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuZGltcyA9IHV0aWwuZmxhdHRlbigkZGltcyk7XG4gICAgICAgICAgdGhpcy5kaW0xID0gdGhpcy5kaW1zWzBdO1xuICAgICAgICAgIHRoaXMuZGltMiA9IHRoaXMuZGltc1sxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlzX2FycmF5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgVmFyLnByb3RvdHlwZVtcImxldFwiXSA9IGZ1bmN0aW9uKCR2YWx1ZSkge1xuICAgICAgICB2YXIgJGRpbTEsICRkaW0yLCAkZW5kLCAkbGVuLCAkc3RhcnQsICRzdHI7XG4gICAgICAgIGlmICh0aGlzLmlzX3N0cmluZykge1xuICAgICAgICAgIGlmIChndykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGltMiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICRkaW0xID0gdGhpcy5kaW0xW1wiZXZhbFwiXSgpO1xuICAgICAgICAgICAgICAkZGltMiA9IHRoaXMuZGltMltcImV2YWxcIl0oKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3NbdGhpcy5uYW1lXVskZGltMV1bJGRpbTJdID0gJHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpbTEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAkZGltMSA9IHRoaXMuZGltMVtcImV2YWxcIl0oKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3NbdGhpcy5uYW1lXVskZGltMV0gPSAkdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nc1t0aGlzLm5hbWVdID0gJHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaW0yICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgJHN0YXJ0ID0gdGhpcy5kaW0xW1wiZXZhbFwiXSgpIC0gMTtcbiAgICAgICAgICAgICAgJGVuZCA9IHRoaXMuZGltMltcImV2YWxcIl0oKTtcbiAgICAgICAgICAgICAgaWYgKCRlbmQgPCAkc3RhcnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnSW52YWxpZCBTdHJpbmcgaW5kZXg6ICcgKyB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJGxlbiA9ICRlbmQgLSAkc3RhcnQ7XG4gICAgICAgICAgICAgICR2YWx1ZSA9ICR2YWx1ZS5zdWJzdHIoMCwgJGxlbik7XG4gICAgICAgICAgICAgICR2YWx1ZSA9IHV0aWwucGFkKCR2YWx1ZSwgJGxlbik7XG4gICAgICAgICAgICAgICRzdHIgPSBzdHJpbmdzW3RoaXMubmFtZV07XG4gICAgICAgICAgICAgIHJldHVybiBzdHJpbmdzW3RoaXMubmFtZV0gPSAkc3RyLnN1YnN0cigwLCAkc3RhcnQpICsgJHZhbHVlICsgJHN0ci5zdWJzdHIoJGVuZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGltMSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICRzdGFydCA9IHRoaXMuZGltMVtcImV2YWxcIl0oKSAtIDE7XG4gICAgICAgICAgICAgICRzdHIgPSBzdHJpbmdzW3RoaXMubmFtZV07XG4gICAgICAgICAgICAgIHJldHVybiBzdHJpbmdzW3RoaXMubmFtZV0gPSAkc3RyLnN1YnN0cigwLCAkc3RhcnQpICsgJHZhbHVlICsgJHN0ci5zdWJzdHIoJHN0YXJ0ICsgJHZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkbGVuID0gc3RyaW5nc1t0aGlzLm5hbWVdLmxlbmd0aDtcbiAgICAgICAgICAgICAgaWYgKCR2YWx1ZS5sZW5ndGggPCAkbGVuKSB7XG4gICAgICAgICAgICAgICAgJHZhbHVlICs9IEFycmF5KCRsZW4gLSAkdmFsdWUubGVuZ3RoICsgMSkuam9pbignICcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBzdHJpbmdzW3RoaXMubmFtZV0gPSAkdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGltMiAhPSBudWxsKSB7XG4gICAgICAgICAgJGRpbTEgPSB0aGlzLmRpbTFbXCJldmFsXCJdKCk7XG4gICAgICAgICAgJGRpbTIgPSB0aGlzLmRpbTJbXCJldmFsXCJdKCk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5c1t0aGlzLm5hbWVdWyRkaW0xXVskZGltMl0gPSAkdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaW0xICE9IG51bGwpIHtcbiAgICAgICAgICAkZGltMSA9IHRoaXMuZGltMVtcImV2YWxcIl0oKTtcbiAgICAgICAgICByZXR1cm4gYXJyYXlzW3RoaXMubmFtZV1bJGRpbTFdID0gJHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB2YXJpYWJsZXNbdGhpcy5uYW1lXSA9ICR2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgVmFyLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRkaW0xLCAkZGltMiwgJGVuZCwgJHN0YXJ0LCBfcmVmLCBfcmVmMSwgX3JlZjEwLCBfcmVmMTEsIF9yZWYxMiwgX3JlZjEzLCBfcmVmMTQsIF9yZWYxNSwgX3JlZjE2LCBfcmVmMiwgX3JlZjMsIF9yZWY0LCBfcmVmNSwgX3JlZjYsIF9yZWY3LCBfcmVmOCwgX3JlZjk7XG4gICAgICAgIGlmICh0aGlzLmlzX3N0cmluZykge1xuICAgICAgICAgIGlmIChndykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGltMiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICRkaW0xID0gdGhpcy5kaW0xW1wiZXZhbFwiXSgpO1xuICAgICAgICAgICAgICAkZGltMiA9IHRoaXMuZGltMltcImV2YWxcIl0oKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChfcmVmID0gKF9yZWYxID0gc3RyaW5nc1t0aGlzLm5hbWVdKSAhPSBudWxsID8gKF9yZWYyID0gX3JlZjFbJGRpbTFdKSAhPSBudWxsID8gX3JlZjJbJGRpbTJdIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsID8gX3JlZiA6ICcnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpbTEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAkZGltMSA9IHRoaXMuZGltMVtcImV2YWxcIl0oKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChfcmVmMyA9IChfcmVmNCA9IHN0cmluZ3NbdGhpcy5uYW1lXSkgIT0gbnVsbCA/IF9yZWY0WyRkaW0xXSA6IHZvaWQgMCkgIT0gbnVsbCA/IF9yZWYzIDogJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gKF9yZWY1ID0gc3RyaW5nc1t0aGlzLm5hbWVdKSAhPSBudWxsID8gX3JlZjUgOiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGltMiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICRzdGFydCA9IHRoaXMuZGltMVtcImV2YWxcIl0oKSAtIDE7XG4gICAgICAgICAgICAgICRlbmQgPSB0aGlzLmRpbTJbXCJldmFsXCJdKCk7XG4gICAgICAgICAgICAgIGlmICgkZW5kIDwgJHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgU3RyaW5nIGluZGV4OiAnICsgdGhpcy50b1N0cmluZygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAoX3JlZjYgPSAoX3JlZjcgPSBzdHJpbmdzW3RoaXMubmFtZV0pICE9IG51bGwgPyBfcmVmNy5zbGljZSgkc3RhcnQsICRlbmQpIDogdm9pZCAwKSAhPSBudWxsID8gX3JlZjYgOiAnJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaW0xICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgJHN0YXJ0ID0gdGhpcy5kaW0xW1wiZXZhbFwiXSgpIC0gMTtcbiAgICAgICAgICAgICAgcmV0dXJuIChfcmVmOCA9IChfcmVmOSA9IHN0cmluZ3NbdGhpcy5uYW1lXSkgIT0gbnVsbCA/IF9yZWY5LnNsaWNlKCRzdGFydCkgOiB2b2lkIDApICE9IG51bGwgPyBfcmVmOCA6ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChfcmVmMTAgPSBzdHJpbmdzW3RoaXMubmFtZV0pICE9IG51bGwgPyBfcmVmMTAgOiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaW0yICE9IG51bGwpIHtcbiAgICAgICAgICAkZGltMSA9IHRoaXMuZGltMVtcImV2YWxcIl0oKTtcbiAgICAgICAgICAkZGltMiA9IHRoaXMuZGltMltcImV2YWxcIl0oKTtcbiAgICAgICAgICByZXR1cm4gKF9yZWYxMSA9IChfcmVmMTIgPSBhcnJheXNbdGhpcy5uYW1lXSkgIT0gbnVsbCA/IChfcmVmMTMgPSBfcmVmMTJbJGRpbTFdKSAhPSBudWxsID8gX3JlZjEzWyRkaW0yXSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCA/IF9yZWYxMSA6IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaW0xICE9IG51bGwpIHtcbiAgICAgICAgICAkZGltMSA9IHRoaXMuZGltMVtcImV2YWxcIl0oKTtcbiAgICAgICAgICByZXR1cm4gKF9yZWYxNCA9IChfcmVmMTUgPSBhcnJheXNbdGhpcy5uYW1lXSkgIT0gbnVsbCA/IF9yZWYxNVskZGltMV0gOiB2b2lkIDApICE9IG51bGwgPyBfcmVmMTQgOiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAoX3JlZjE2ID0gdmFyaWFibGVzW3RoaXMubmFtZV0pICE9IG51bGwgPyBfcmVmMTYgOiAwO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBWYXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzX2FycmF5KSB7XG4gICAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLm5hbWUgKyBcIltcIiArICh0aGlzLmRpbXMuam9pbignLCcpKSArIFwiXVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBWYXI7XG5cbiAgICB9KSgpLFxuICAgIEJhc2U6IEJhc2UgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoQmFzZSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gQmFzZShiYXNlKSB7XG4gICAgICAgIHRoaXMuYmFzZSA9IGJhc2U7XG4gICAgICB9XG5cbiAgICAgIEJhc2UucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBvZmZzZXQgPSB0aGlzLmJhc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIEJhc2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIkJBU0UgXCIgKyB0aGlzLmJhc2U7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQmFzZTtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIENoYWluOiBDaGFpbiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhDaGFpbiwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gQ2hhaW4ocHJvZ3JhbSkge1xuICAgICAgICB0aGlzLnByb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgfVxuXG4gICAgICBDaGFpbi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbi5wYXVzZSh0cnVlKTtcbiAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlKHRoaXMucHJvZ3JhbSwgZnVuY3Rpb24oJGVyciwgJGRhdGEpIHtcbiAgICAgICAgICBpZiAoJGVyciAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb24ucHJpbnRsbigkZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHlwZSA9ICRkYXRhLnR5cGU7XG4gICAgICAgICAgICBuYW1lID0gJGRhdGEubmFtZTtcbiAgICAgICAgICAgIGd3ID0gdHlwZSA9PT0gVl9HV0JBU0lDID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgY2hhaW4oJGRhdGEuZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjb24ucGF1c2UoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIENoYWluLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJDSEFJTiBcXFwiXCIgKyB0aGlzLnByb2dyYW0gKyBcIlxcXCJcIjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDaGFpbjtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIENvbTogQ29tID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKENvbSwgX3N1cGVyKTtcblxuICAgICAgQ29tLnByb3RvdHlwZS50eXBlID0gUEhBU0VfU0NBTjtcblxuICAgICAgZnVuY3Rpb24gQ29tKCR2YXJzKSB7XG4gICAgICAgIHRoaXMudmFycyA9IHV0aWwuZmxhdHRlbigkdmFycyk7XG4gICAgICB9XG5cbiAgICAgIENvbS5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdmFyLCBfaSwgX2xlbiwgX3JlZjtcbiAgICAgICAgX3JlZiA9IHRoaXMudmFycztcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJHZhciA9IF9yZWZbX2ldO1xuICAgICAgICAgIGlmICgvXFwkJC8udGVzdCgkdmFyLm5hbWUpKSB7XG4gICAgICAgICAgICBpZiAoZ3cpIHtcbiAgICAgICAgICAgICAgaWYgKCR2YXIuZGltcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdHJpbmdzWyR2YXIubmFtZV0gPSAnJztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHJpbmdzWyR2YXIubmFtZV0gPSBkaW0uYXBwbHkobnVsbCwgWycnXS5jb25jYXQoX19zbGljZS5jYWxsKCR2YXIuZGltcykpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RyaW5nc1skdmFyLm5hbWVdID0gQXJyYXkoJHZhci5kaW1zWzBdICsgMSkuam9pbignICcpO1xuICAgICAgICAgICAgICBjb21tb24ucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogMCxcbiAgICAgICAgICAgICAgICBuYW1lOiAkdmFyLm5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgkdmFyLmRpbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHZhcmlhYmxlc1skdmFyLm5hbWVdID0gMDtcbiAgICAgICAgICAgICAgY29tbW9uLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgbmFtZTogJHZhci5uYW1lXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXJyYXlzWyR2YXIubmFtZV0gPSBkaW0uYXBwbHkobnVsbCwgWzBdLmNvbmNhdChfX3NsaWNlLmNhbGwoJHZhci5kaW1zKSkpO1xuICAgICAgICAgICAgICBjb21tb24ucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogMixcbiAgICAgICAgICAgICAgICBuYW1lOiAkdmFyLm5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIENvbS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiQ09NIFwiICsgKHRoaXMudmFycy5qb2luKCcsICcpKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb207XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBEYXRhOiBEYXRhID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKERhdGEsIF9zdXBlcik7XG5cbiAgICAgIERhdGEucHJvdG90eXBlLnR5cGUgPSBQSEFTRV9TQ0FOO1xuXG4gICAgICBmdW5jdGlvbiBEYXRhKCRkYXRhKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHV0aWwuZmxhdHRlbigkZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIERhdGEucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgIGRhdGEgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQodGhpcy5kYXRhKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgRGF0YS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiREFUQSBcIiArICh0aGlzLmRhdGEuam9pbignLCAnKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gRGF0YTtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIERlZjogRGVmID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKERlZiwgX3N1cGVyKTtcblxuICAgICAgRGVmLnByb3RvdHlwZS50eXBlID0gUEhBU0VfU0NBTjtcblxuICAgICAgZnVuY3Rpb24gRGVmKG5hbWUsIHBhciwgYm9keSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnBhciA9IHBhcjtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICAgIH1cblxuICAgICAgRGVmLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb25zW3RoaXMubmFtZV0gPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oJHBhcikge1xuICAgICAgICAgICAgdmFyICRyZXQsICR0bXA7XG4gICAgICAgICAgICAkdG1wID0gdmFyaWFibGVzW190aGlzLnBhcl07XG4gICAgICAgICAgICB2YXJpYWJsZXNbX3RoaXMucGFyXSA9ICRwYXI7XG4gICAgICAgICAgICAkcmV0ID0gX3RoaXMuYm9keVtcImV2YWxcIl0oKTtcbiAgICAgICAgICAgIHZhcmlhYmxlc1tfdGhpcy5wYXJdID0gJHRtcDtcbiAgICAgICAgICAgIHJldHVybiAkcmV0O1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKHRoaXMpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBEZWYucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIkRFRiBcIiArIHRoaXMubmFtZSArIFwiKFwiICsgdGhpcy5wYXIgKyBcIikgPSBcIiArIHRoaXMuYm9keTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBEZWY7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBEaW06IERpbSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhEaW0sIF9zdXBlcik7XG5cbiAgICAgIERpbS5wcm90b3R5cGUudHlwZSA9IFBIQVNFX1NDQU47XG5cbiAgICAgIGZ1bmN0aW9uIERpbSgkdmFycykge1xuICAgICAgICB0aGlzLnZhcnMgPSB1dGlsLmZsYXR0ZW4oJHZhcnMpO1xuICAgICAgfVxuXG4gICAgICBEaW0ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHZhciwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgIF9yZWYgPSB0aGlzLnZhcnM7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICR2YXIgPSBfcmVmW19pXTtcbiAgICAgICAgICBpZiAoL1xcJCQvLnRlc3QoJHZhci5uYW1lKSkge1xuICAgICAgICAgICAgaWYgKGd3KSB7XG4gICAgICAgICAgICAgIGlmICgkdmFyLmRpbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nc1skdmFyLm5hbWVdID0gJyc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RyaW5nc1skdmFyLm5hbWVdID0gZGltLmFwcGx5KG51bGwsIFsnJ10uY29uY2F0KF9fc2xpY2UuY2FsbCgkdmFyLmRpbXMpKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0cmluZ3NbJHZhci5uYW1lXSA9IEFycmF5KCR2YXIuZGltc1swXSArIDEpLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCR2YXIuZGltcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdmFyaWFibGVzWyR2YXIubmFtZV0gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXJyYXlzWyR2YXIubmFtZV0gPSBkaW0uYXBwbHkobnVsbCwgWzBdLmNvbmNhdChfX3NsaWNlLmNhbGwoJHZhci5kaW1zKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBEaW0ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIkRJTSBcIiArICh0aGlzLnZhcnMuam9pbignLCAnKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gRGltO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgRW5kOiBFbmQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoRW5kLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBFbmQoKSB7XG4gICAgICAgIHJldHVybiBFbmQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIEVuZC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGVvcCA9IHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIEVuZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiRU5EXCI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gRW5kO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgRW50ZXI6IEVudGVyID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEVudGVyLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBFbnRlcihwb3J0LCB0aW1lLCBzdGF0dXMsIF92YXIpIHtcbiAgICAgICAgdmFyIF9yZWY7XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQ7XG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzW1widmFyXCJdID0gX3ZhcjtcbiAgICAgICAgaWYgKHRoaXNbXCJ2YXJcIl0gPT0gbnVsbCkge1xuICAgICAgICAgIF9yZWYgPSBbbnVsbCwgdGhpcy5wb3J0LCB0aGlzLnRpbWUsIHRoaXMuc3RhdHVzXSwgdGhpcy5wb3J0ID0gX3JlZlswXSwgdGhpcy50aW1lID0gX3JlZlsxXSwgdGhpcy5zdGF0dXMgPSBfcmVmWzJdLCB0aGlzW1widmFyXCJdID0gX3JlZlszXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBFbnRlci5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbi5pbnB1dCgnJywgW3RoaXNbXCJ2YXJcIl1dKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuXG4gICAgICBFbnRlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiRU5URVIgXCIgKyB0aGlzLnBvcnQgKyBcIiwgXCIgKyB0aGlzLnRpbWUgKyBcIiwgXCIgKyB0aGlzLnN0YXR1cyArIFwiLCBcIiArIHRoaXNbXCJ2YXJcIl07XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gRW50ZXI7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBGb3I6IEZvciA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhGb3IsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIEZvcihfdmFyLCBzdGFydCwgZW5kLCBzdGVwKSB7XG4gICAgICAgIHRoaXNbXCJ2YXJcIl0gPSBfdmFyO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgIHRoaXMuZW5kID0gZW5kO1xuICAgICAgICB0aGlzLnN0ZXAgPSBzdGVwICE9IG51bGwgPyBzdGVwIDogbmV3IENvbnN0KDEpO1xuICAgICAgfVxuXG4gICAgICBGb3IucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXJpYWJsZXNbdGhpc1tcInZhclwiXV0gPSB2YWx1ZU9mKHRoaXMuc3RhcnQpO1xuICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICBpZDogRk9SLFxuICAgICAgICAgIHBjOiBwYyxcbiAgICAgICAgICBuYW1lOiB0aGlzW1widmFyXCJdLFxuICAgICAgICAgIGVuZDogdGhpcy5lbmQsXG4gICAgICAgICAgc3RlcDogdGhpcy5zdGVwXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBGb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0ZXAgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gXCJGT1IgXCIgKyB0aGlzW1widmFyXCJdICsgXCIgPSBcIiArIHRoaXMuc3RhcnQgKyBcIiBUTyBcIiArIHRoaXMuZW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcIkZPUiBcIiArIHRoaXNbXCJ2YXJcIl0gKyBcIiA9IFwiICsgdGhpcy5zdGFydCArIFwiIFRPIFwiICsgdGhpcy5lbmQgKyBcIiBTVEVQIFwiICsgdGhpcy5zdGVwO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gRm9yO1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgR290bzogR290byA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhHb3RvLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBHb3RvKGxpbmVubywgJG9mKSB7XG4gICAgICAgIHRoaXMubGluZW5vID0gbGluZW5vO1xuICAgICAgICB0aGlzLm9mID0gdXRpbC5mbGF0dGVuKCRvZik7XG4gICAgICB9XG5cbiAgICAgIEdvdG8ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGluZGV4O1xuICAgICAgICBpZiAodGhpcy5vZi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJGluZGV4ID0gdmFsdWVPZih0aGlzLmxpbmVubykgLSAxO1xuICAgICAgICAgIGlmICh0aGlzLm9mWyRpbmRleF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcGMgPSB4cmZbdGhpcy5vZlskaW5kZXhdXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGMgPSB4cmZbcGFyc2VJbnQodGhpcy5saW5lbm8sIDEwKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgR290by5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMub2YubGVuZ3RoID4gKDAgIT0gbnVsbCkpIHtcbiAgICAgICAgICByZXR1cm4gXCJHT1RPIFwiICsgdGhpcy5saW5lbm8gKyBcIiBPRiBcIiArICh0aGlzLm9mLmpvaW4oJywnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFwiR09UTyBcIiArIHRoaXMubGluZW5vO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gR290bztcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIEdvc3ViOiBHb3N1YiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhHb3N1YiwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gR29zdWIobGluZW5vLCAkb2YpIHtcbiAgICAgICAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gICAgICAgIHRoaXMub2YgPSB1dGlsLmZsYXR0ZW4oJG9mKTtcbiAgICAgIH1cblxuICAgICAgR29zdWIucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICBpZDogR09TVUIsXG4gICAgICAgICAgcGM6IHBjXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gR29zdWIuX19zdXBlcl9fW1wiZXZhbFwiXS5jYWxsKHRoaXMpO1xuICAgICAgfTtcblxuICAgICAgR29zdWIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm9mLmxlbmd0aCA+ICgwICE9IG51bGwpKSB7XG4gICAgICAgICAgcmV0dXJuIFwiR09TVUIgXCIgKyB0aGlzLmxpbmVubyArIFwiIE9GIFwiICsgKHRoaXMub2Yuam9pbignLCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCJHT1NVQiBcIiArIHRoaXMubGluZW5vO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gR29zdWI7XG5cbiAgICB9KShHb3RvKSxcbiAgICBJZjogSWYgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoSWYsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIElmKGNvbmQsIHRoZW4pIHtcbiAgICAgICAgdGhpcy5jb25kID0gY29uZDtcbiAgICAgICAgdGhpcy50aGVuID0gdGhlbjtcbiAgICAgIH1cblxuICAgICAgSWYucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5jb25kW1wiZXZhbFwiXSgpKSB7XG4gICAgICAgICAgaWYgKHRoaXMudGhlbltcImV2YWxcIl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50aGVuW1wiZXZhbFwiXSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYyA9IHhyZltwYXJzZUludCh0aGlzLnRoZW4sIDEwKV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIElmLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJJRiBcIiArIHRoaXMuY29uZCArIFwiIFRIRU4gXCIgKyB0aGlzLnRoZW47XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gSWY7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBJbWFnZTogSW1hZ2UgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoSW1hZ2UsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIEltYWdlKCRmb3JtYXQpIHtcbiAgICAgICAgaWYgKCRmb3JtYXQgPT0gbnVsbCkge1xuICAgICAgICAgICRmb3JtYXQgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvdXJjZSA9IHV0aWwuZmxhdHRlbigkZm9ybWF0KTtcbiAgICAgICAgdGhpcy5mb3JtYXQgPSBmb3JtYXQodGhpcy5zb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICBJbWFnZS5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIEltYWdlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJJTUFHRSBcIiArICh0aGlzLnNvdXJjZS5qb2luKCcnKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gSW1hZ2U7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBJbnB1dDogSW5wdXQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoSW5wdXQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIElucHV0KCR2YXJzLCBwcm9tcHQpIHtcbiAgICAgICAgdGhpcy5wcm9tcHQgPSBwcm9tcHQ7XG4gICAgICAgIHRoaXMudmFycyA9IHV0aWwuZmxhdHRlbigkdmFycyk7XG4gICAgICB9XG5cbiAgICAgIElucHV0LnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uLmlucHV0KHRoaXMucHJvbXB0LCB0aGlzLnZhcnMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG5cbiAgICAgIElucHV0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9tcHQgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBcIklOUFVUIFwiICsgdGhpcy5wcm9tcHQgKyBcIiwgXCIgKyAodGhpcy52YXJzLmpvaW4oJywnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFwiSU5QVVQgXCIgKyAodGhpcy52YXJzLmpvaW4oJywnKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBJbnB1dDtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIExldDogTGV0ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKExldCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gTGV0KCR2YXJzLCB2YWx1ZSkge1xuICAgICAgICB2YXIgJHZhciwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52YXJzID0gW107XG4gICAgICAgIF9yZWYgPSB1dGlsLmZsYXR0ZW4oJHZhcnMpO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAkdmFyID0gX3JlZltfaV07XG4gICAgICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgJHZhcikge1xuICAgICAgICAgICAgdGhpcy52YXJzLnB1c2gobmV3IFZhcigkdmFyKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFycy5wdXNoKCR2YXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBMZXQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHZhbHVlLCAkdmFyLCBfaSwgX2xlbiwgX3JlZjtcbiAgICAgICAgJHZhbHVlID0gdmFsdWVPZih0aGlzLnZhbHVlKTtcbiAgICAgICAgX3JlZiA9IHRoaXMudmFycztcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJHZhciA9IF9yZWZbX2ldO1xuICAgICAgICAgICR2YXJbXCJsZXRcIl0oJHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBMZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkcywgJHZhciwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgICRzID0gJyc7XG4gICAgICAgIF9yZWYgPSB0aGlzLnZhcnM7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICR2YXIgPSBfcmVmW19pXTtcbiAgICAgICAgICAkcyArPSAkdmFyICsgJyA9ICc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiTEVUIFwiICsgJHMgKyB0aGlzLnZhbHVlO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIExldDtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIE1hdDogTWF0ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKE1hdCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gTWF0KF92YXIsIHZhbHVlKSB7XG4gICAgICAgIHRoaXNbXCJ2YXJcIl0gPSBfdmFyO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIE1hdC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkaSwgJGosICR2YWx1ZTtcbiAgICAgICAgJHZhbHVlID0gdGhpcy52YWx1ZVtcImV2YWxcIl0oKTtcbiAgICAgICAgaWYgKGFycmF5c1t0aGlzW1widmFyXCJdXSAhPSBudWxsKSB7XG4gICAgICAgICAgJGkgPSBhcnJheXNbdGhpc1tcInZhclwiXV0ubGVuZ3RoO1xuICAgICAgICAgICRqID0gYXJyYXlzW3RoaXNbXCJ2YXJcIl1dW29mZnNldF0ubGVuZ3RoO1xuICAgICAgICAgIGFycmF5c1t0aGlzW1widmFyXCJdXSA9IGRpbSgkdmFsdWUsICRpLCAkaik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyYXlzW3RoaXNbXCJ2YXJcIl1dID0gZGltKCR2YWx1ZSwgMTApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBNYXQ7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBNYXRSZWFkOiBNYXRSZWFkID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKE1hdFJlYWQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE1hdFJlYWQoJHZhcnMpIHtcbiAgICAgICAgdGhpcy52YXJzID0gdXRpbC5mbGF0dGVuKCR2YXJzKTtcbiAgICAgIH1cblxuICAgICAgTWF0UmVhZC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdmFyLCBfaSwgX2xlbiwgX3JlZjtcbiAgICAgICAgX3JlZiA9IHRoaXMudmFycztcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJHZhciA9IF9yZWZbX2ldO1xuICAgICAgICAgIGlmIChkcCA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAkdmFyW1wibGV0XCJdKGRhdGFbZHArK10udmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdmFyW1wibGV0XCJdKHZvaWQgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIE1hdFJlYWQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIk1BVCBSRUFEIFwiICsgKHRoaXMudmFycy5qb2luKCcsJykpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIE1hdFJlYWQ7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBOZXh0OiBOZXh0ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKE5leHQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE5leHQoX3Zhcikge1xuICAgICAgICB0aGlzW1widmFyXCJdID0gX3ZhcjtcbiAgICAgIH1cblxuICAgICAgTmV4dC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkY291bnRlciwgJGZyYW1lLCAkbmFtZSwgJHN0ZXA7XG4gICAgICAgICRmcmFtZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoJGZyYW1lLmlkICE9PSBGT1IpIHtcbiAgICAgICAgICB0aHJvdyBcIk5leHQgd2l0aG91dCBmb3JcIjtcbiAgICAgICAgfVxuICAgICAgICAkbmFtZSA9IHRoaXNbXCJ2YXJcIl0ubmFtZTtcbiAgICAgICAgaWYgKCRmcmFtZS5uYW1lICE9PSAkbmFtZSkge1xuICAgICAgICAgIHRocm93IFwiTWlzbWF0Y2hlZCBGb3IvTmV4dCBcIiArICRuYW1lO1xuICAgICAgICB9XG4gICAgICAgICRzdGVwID0gdmFsdWVPZigkZnJhbWUuc3RlcCk7XG4gICAgICAgICRjb3VudGVyID0gdGhpc1tcInZhclwiXVtcImV2YWxcIl0oKSArICRzdGVwO1xuICAgICAgICB0aGlzW1widmFyXCJdW1wibGV0XCJdKCRjb3VudGVyKTtcbiAgICAgICAgaWYgKCRzdGVwIDwgMCkge1xuICAgICAgICAgIGlmICgkY291bnRlciA8IHZhbHVlT2YoJGZyYW1lLmVuZCkpIHtcbiAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYyA9ICRmcmFtZS5wYztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCRjb3VudGVyID4gdmFsdWVPZigkZnJhbWUuZW5kKSkge1xuICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBjID0gJGZyYW1lLnBjO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBOZXh0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJORVhUIFwiICsgdGhpc1tcInZhclwiXTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBOZXh0O1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgUHJpbnQ6IFByaW50ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFByaW50LCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBQcmludCgpIHtcbiAgICAgICAgdmFyICRpdGVtcztcbiAgICAgICAgJGl0ZW1zID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHV0aWwuZmxhdHRlbihbJGl0ZW1zXSk7XG4gICAgICB9XG5cbiAgICAgIFByaW50LnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRpdGVtLCAkc3RyLCAkdmFsLCBfaSwgX2xlbiwgX3JlZjtcbiAgICAgICAgJHN0ciA9ICcnO1xuICAgICAgICBfcmVmID0gdGhpcy5pdGVtcztcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJGl0ZW0gPSBfcmVmW19pXTtcbiAgICAgICAgICAkc3RyICs9IGlzTmFOKCR2YWwgPSB2YWx1ZU9mKCRpdGVtKSkgPyAkdmFsIDogJyAnICsgJHZhbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJGl0ZW0gPT09IFNlbWljIHx8ICRpdGVtID09PSBDb21tYSkge1xuICAgICAgICAgIGNvbi5wcmludCgkc3RyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb24ucHJpbnRsbigkc3RyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBQcmludC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRpdGVtLCAkc3RyLCBfaSwgX2xlbiwgX3JlZjtcbiAgICAgICAgJHN0ciA9ICcnO1xuICAgICAgICBfcmVmID0gdGhpcy5pdGVtcztcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJGl0ZW0gPSBfcmVmW19pXTtcbiAgICAgICAgICAkc3RyICs9ICRpdGVtLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiUFJJTlQgXCIgKyAkc3RyO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFByaW50O1xuXG4gICAgfSkoS2V5d29yZCksXG4gICAgVXNpbmc6IFVzaW5nID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFVzaW5nLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBVc2luZygpIHtcbiAgICAgICAgdmFyICRpdGVtcywgbGluZW5vO1xuICAgICAgICBsaW5lbm8gPSBhcmd1bWVudHNbMF0sICRpdGVtcyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICAgIHRoaXMubGluZW5vID0gbGluZW5vO1xuICAgICAgICB0aGlzLml0ZW1zID0gdXRpbC5mbGF0dGVuKCRpdGVtcyk7XG4gICAgICB9XG5cbiAgICAgIFVzaW5nLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRhcmdzLCAkaSwgJGl0ZW0sICRsaW5lbm8sICRzdGF0ZW1lbnQsIF9pLCBfbGVuLCBfcmVmLCBfcmVmMTtcbiAgICAgICAgJGkgPSB4cmZbdGhpcy5saW5lbm9dO1xuICAgICAgICBfcmVmID0gcHJvZ1skaV0sICRsaW5lbm8gPSBfcmVmWzBdLCAkc3RhdGVtZW50ID0gX3JlZlsxXTtcbiAgICAgICAgJGFyZ3MgPSBbXTtcbiAgICAgICAgX3JlZjEgPSB0aGlzLml0ZW1zO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJGl0ZW0gPSBfcmVmMVtfaV07XG4gICAgICAgICAgJGFyZ3MucHVzaCh2YWx1ZU9mKCRpdGVtKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCRpdGVtID09PSBTZW1pYyB8fCAkaXRlbSA9PT0gQ29tbWEpIHtcbiAgICAgICAgICBjb24ucHJpbnQodXRpbC5zcHJpbnRmKCRzdGF0ZW1lbnQuY29kZS5mb3JtYXQsICRhcmdzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uLnByaW50bG4odXRpbC5zcHJpbnRmKCRzdGF0ZW1lbnQuY29kZS5mb3JtYXQsICRhcmdzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgVXNpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkaXRlbSwgJHN0ciwgX2ksIF9sZW4sIF9yZWY7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBcIlBSSU5UIFVTSU5HIFwiICsgdGhpcy5saW5lbm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHN0ciA9ICcnO1xuICAgICAgICAgIF9yZWYgPSB0aGlzLml0ZW1zO1xuICAgICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICAgJGl0ZW0gPSBfcmVmW19pXTtcbiAgICAgICAgICAgICRzdHIgKz0gJGl0ZW0udG9TdHJpbmcoKSArICcsJztcbiAgICAgICAgICB9XG4gICAgICAgICAgJHN0ciA9ICRzdHIuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgIHJldHVybiBcIlBSSU5UIFVTSU5HIFwiICsgdGhpcy5saW5lbm8gKyBcIjtcIiArICRzdHI7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBVc2luZztcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIFJhbmRvbWl6ZTogUmFuZG9taXplID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFJhbmRvbWl6ZSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gUmFuZG9taXplKCkge31cblxuICAgICAgUmFuZG9taXplLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgUmFuZG9taXplLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJSQU5ET01JWkVcIjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBSYW5kb21pemU7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBSZWFkOiBSZWFkID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFJlYWQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFJlYWQoJHZhcnMpIHtcbiAgICAgICAgdGhpcy52YXJzID0gdXRpbC5mbGF0dGVuKCR2YXJzKTtcbiAgICAgIH1cblxuICAgICAgUmVhZC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdmFyLCBfaSwgX2xlbiwgX3JlZjtcbiAgICAgICAgX3JlZiA9IHRoaXMudmFycztcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgJHZhciA9IF9yZWZbX2ldO1xuICAgICAgICAgIGlmIChkcCA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAkdmFyW1wibGV0XCJdKGRhdGFbZHArK10udmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdmFyW1wibGV0XCJdKHZvaWQgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIFJlYWQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlJFQUQgXCIgKyAodGhpcy52YXJzLmpvaW4oJywnKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUmVhZDtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIFJlc3RvcmU6IFJlc3RvcmUgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoUmVzdG9yZSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gUmVzdG9yZShsaW5lbm8pIHtcbiAgICAgICAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gICAgICB9XG5cbiAgICAgIFJlc3RvcmUucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBkcCA9IDA7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIFJlc3RvcmUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmxpbmVubyAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIFwiUkVTVE9SRSBcIiArIHRoaXMubGluZW5vO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcIlJFU1RPUkVcIjtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFJlc3RvcmU7XG5cbiAgICB9KShLZXl3b3JkKSxcbiAgICBSZXR1cm46IFJldHVybiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhSZXR1cm4sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFJldHVybigpIHt9XG5cbiAgICAgIFJldHVybi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkZnJhbWU7XG4gICAgICAgICRmcmFtZSA9IHN0YWNrLnBvcCgpO1xuICAgICAgICB3aGlsZSAoJGZyYW1lLmlkICE9PSBHT1NVQikge1xuICAgICAgICAgICRmcmFtZSA9IHN0YWNrLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHBjID0gJGZyYW1lLnBjO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBSZXR1cm4ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlJFVFVSTlwiO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFJldHVybjtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIFJlbTogUmVtID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFJlbSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gUmVtKCR0ZXh0KSB7XG4gICAgICAgIHRoaXMudGV4dCA9ICR0ZXh0LnJlcGxhY2UoL15SRU0vaSwgJycpO1xuICAgICAgfVxuXG4gICAgICBSZW0ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBSZW0ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlJFTVwiICsgdGhpcy50ZXh0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFJlbTtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIFN0b3A6IFN0b3AgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoU3RvcCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gU3RvcCgpIHt9XG5cbiAgICAgIFN0b3AucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBlb3AgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBTdG9wLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJTVE9QXCI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gU3RvcDtcblxuICAgIH0pKEtleXdvcmQpLFxuICAgIE1heDogTWF4ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKE1heCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gTWF4KCkge1xuICAgICAgICByZXR1cm4gTWF4Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBNYXgucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgodmFsdWVPZih0aGlzLmxlZnQpLCB2YWx1ZU9mKHRoaXMucmlnaHQpKTtcbiAgICAgIH07XG5cbiAgICAgIE1heC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLmxlZnQgKyBcIiBNQVggXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIE1heDtcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBNaW46IE1pbiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhNaW4sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE1pbigpIHtcbiAgICAgICAgcmV0dXJuIE1pbi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTWluLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKHZhbHVlT2YodGhpcy5sZWZ0KSwgdmFsdWVPZih0aGlzLnJpZ2h0KSk7XG4gICAgICB9O1xuXG4gICAgICBNaW4ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgTUlOIFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBNaW47XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgQWRkOiBBZGQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoQWRkLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBBZGQoKSB7XG4gICAgICAgIHJldHVybiBBZGQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIEFkZC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMubGVmdCkgKyB2YWx1ZU9mKHRoaXMucmlnaHQpO1xuICAgICAgfTtcblxuICAgICAgQWRkLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiICsgXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEFkZDtcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBTdWI6IFN1YiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhTdWIsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFN1YigpIHtcbiAgICAgICAgcmV0dXJuIFN1Yi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgU3ViLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlT2YodGhpcy5sZWZ0KSAtIHZhbHVlT2YodGhpcy5yaWdodCk7XG4gICAgICB9O1xuXG4gICAgICBTdWIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgLSBcIiArIHRoaXMucmlnaHQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gU3ViO1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIE11bDogTXVsID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKE11bCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gTXVsKCkge1xuICAgICAgICByZXR1cm4gTXVsLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBNdWwucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLmxlZnQpICogdmFsdWVPZih0aGlzLnJpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIE11bC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLmxlZnQgKyBcIiAqIFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBNdWw7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgRGl2OiBEaXYgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoRGl2LCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBEaXYoKSB7XG4gICAgICAgIHJldHVybiBEaXYuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIERpdi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMubGVmdCkgLyB2YWx1ZU9mKHRoaXMucmlnaHQpO1xuICAgICAgfTtcblxuICAgICAgRGl2LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiIC8gXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIERpdjtcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBQb3c6IFBvdyA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhQb3csIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFBvdygpIHtcbiAgICAgICAgcmV0dXJuIFBvdy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgUG93LnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KHZhbHVlT2YodGhpcy5sZWZ0KSwgdmFsdWVPZih0aGlzLnJpZ2h0KSk7XG4gICAgICB9O1xuXG4gICAgICBQb3cucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgXiBcIiArIHRoaXMucmlnaHQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUG93O1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIE9SOiBPUiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhPUiwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gT1IoKSB7XG4gICAgICAgIHJldHVybiBPUi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgT1IucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLmxlZnQpIHx8IHZhbHVlT2YodGhpcy5yaWdodCk7XG4gICAgICB9O1xuXG4gICAgICBPUi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLmxlZnQgKyBcIiBPUiBcIiArIHRoaXMucmlnaHQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gT1I7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgQU5EOiBBTkQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoQU5ELCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBBTkQoKSB7XG4gICAgICAgIHJldHVybiBBTkQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIEFORC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMubGVmdCkgJiYgdmFsdWVPZih0aGlzLnJpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIEFORC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLmxlZnQgKyBcIiBBTkQgXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEFORDtcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBOT1Q6IE5PVCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhOT1QsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE5PVCgpIHtcbiAgICAgICAgcmV0dXJuIE5PVC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTk9ULnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICF2YWx1ZU9mKHRoaXMubGVmdCk7XG4gICAgICB9O1xuXG4gICAgICBOT1QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIk5PVCBcIiArIHRoaXMubGVmdDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBOT1Q7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgTFQ6IExUID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKExULCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBMVCgpIHtcbiAgICAgICAgcmV0dXJuIExULl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBMVC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMubGVmdCkgPCB2YWx1ZU9mKHRoaXMucmlnaHQpO1xuICAgICAgfTtcblxuICAgICAgTFQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgPCBcIiArIHRoaXMucmlnaHQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gTFQ7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgR1Q6IEdUID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEdULCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBHVCgpIHtcbiAgICAgICAgcmV0dXJuIEdULl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBHVC5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMubGVmdCkgPiB2YWx1ZU9mKHRoaXMucmlnaHQpO1xuICAgICAgfTtcblxuICAgICAgR1QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgPiBcIiArIHRoaXMucmlnaHQ7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gR1Q7XG5cbiAgICB9KShPcGVyYXRvciksXG4gICAgTEU6IExFID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKExFLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBMRSgpIHtcbiAgICAgICAgcmV0dXJuIExFLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBMRS5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMubGVmdCkgPD0gdmFsdWVPZih0aGlzLnJpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIExFLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubGVmdCArIFwiIDw9IFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBMRTtcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBHRTogR0UgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoR0UsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIEdFKCkge1xuICAgICAgICByZXR1cm4gR0UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIEdFLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlT2YodGhpcy5sZWZ0KSA+PSB2YWx1ZU9mKHRoaXMucmlnaHQpO1xuICAgICAgfTtcblxuICAgICAgR0UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgPj0gXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEdFO1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIEVROiBFUSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhFUSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gRVEoKSB7XG4gICAgICAgIHJldHVybiBFUS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgRVEucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmFsdWVPZih0aGlzLmxlZnQpID09PSB2YWx1ZU9mKHRoaXMucmlnaHQpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBFUS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIgKyB0aGlzLmxlZnQgKyBcIiA9IFwiICsgdGhpcy5yaWdodDtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBFUTtcblxuICAgIH0pKE9wZXJhdG9yKSxcbiAgICBORTogTkUgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoTkUsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE5FKCkge1xuICAgICAgICByZXR1cm4gTkUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIE5FLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHZhbHVlT2YodGhpcy5sZWZ0KSAhPT0gdmFsdWVPZih0aGlzLnJpZ2h0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgTkUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlwiICsgdGhpcy5sZWZ0ICsgXCIgPD4gXCIgKyB0aGlzLnJpZ2h0O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIE5FO1xuXG4gICAgfSkoT3BlcmF0b3IpLFxuICAgIEZOOiBGTiA9IChmdW5jdGlvbigpIHtcbiAgICAgIGZ1bmN0aW9uIEZOKG5hbWUsIHBhcm0pIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5wYXJtID0gcGFybTtcbiAgICAgIH1cblxuICAgICAgRk4ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb25zW3RoaXMubmFtZV0odmFsdWVPZih0aGlzLnBhcm0pKTtcbiAgICAgIH07XG5cbiAgICAgIEZOLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMubmFtZSArIFwiKFwiICsgdGhpcy5wYXJtICsgXCIpXCI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gRk47XG5cbiAgICB9KSgpLFxuICAgIEFCUzogQUJTID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKEFCUywgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gQUJTKCkge1xuICAgICAgICByZXR1cm4gQUJTLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBBQlMucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModmFsdWVPZih0aGlzLiQwKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQUJTO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgQVROOiBBVE4gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoQVROLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBBVE4oKSB7XG4gICAgICAgIHJldHVybiBBVE4uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIEFUTi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4odmFsdWVPZih0aGlzLiQwKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQVROO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgQ09TOiBDT1MgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoQ09TLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBDT1MoKSB7XG4gICAgICAgIHJldHVybiBDT1MuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIENPUy5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNvcyh2YWx1ZU9mKHRoaXMuJDApKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDT1M7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBFWFA6IEVYUCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhFWFAsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIEVYUCgpIHtcbiAgICAgICAgcmV0dXJuIEVYUC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgRVhQLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZXhwKHZhbHVlT2YodGhpcy4kMCkpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEVYUDtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIElOVDogSU5UID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKElOVCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gSU5UKCkge1xuICAgICAgICByZXR1cm4gSU5ULl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBJTlQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih2YWx1ZU9mKHRoaXMuJDApKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBJTlQ7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBMRU46IExFTiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhMRU4sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIExFTigpIHtcbiAgICAgICAgcmV0dXJuIExFTi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTEVOLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlT2YodGhpcy4kMCkubGVuZ3RoO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIExFTjtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIExJTjogTElOID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKExJTiwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gTElOKCkge1xuICAgICAgICByZXR1cm4gTElOLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBMSU4ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkoTWF0aC5hYnModmFsdWVPZih0aGlzLiQwKSkgKyAxKS5qb2luKCdcXG4nKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBMSU47XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBMT0c6IExPRyA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhMT0csIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIExPRygpIHtcbiAgICAgICAgcmV0dXJuIExPRy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTE9HLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubG9nKHZhbHVlT2YodGhpcy4kMCkpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIExPRztcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIFJORDogUk5EID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFJORCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gUk5EKCkge1xuICAgICAgICByZXR1cm4gUk5ELl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBSTkQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBSTkQ7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBTR046IFNHTiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhTR04sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFNHTigpIHtcbiAgICAgICAgcmV0dXJuIFNHTi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgU0dOLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICQwO1xuICAgICAgICAkMCA9IHZhbHVlT2YodGhpcy4kMCk7XG4gICAgICAgIGlmICgkMCA8IDApIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoJDAgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBTR047XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBTSU46IFNJTiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhTSU4sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFNJTigpIHtcbiAgICAgICAgcmV0dXJuIFNJTi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgU0lOLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc2luKHZhbHVlT2YodGhpcy4kMCkpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFNJTjtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIFNQQTogU1BBID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFNQQSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gU1BBKCkge1xuICAgICAgICByZXR1cm4gU1BBLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBTUEEucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkodmFsdWVPZih0aGlzLiQwKSkuam9pbihcIiBcIik7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gU1BBO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgU1FSOiBTUVIgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoU1FSLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBTUVIoKSB7XG4gICAgICAgIHJldHVybiBTUVIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFNRUi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodmFsdWVPZih0aGlzLiQwKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gU1FSO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgVEFCOiBUQUIgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoVEFCLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBUQUIoKSB7XG4gICAgICAgIHJldHVybiBUQUIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFRBQi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBBcnJheShNYXRoLmZsb29yKHZhbHVlT2YodGhpcy4kMCkpKS5qb2luKFwiIFwiKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBUQUI7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBUQU46IFRBTiA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhUQU4sIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFRBTigpIHtcbiAgICAgICAgcmV0dXJuIFRBTi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgVEFOLnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgudGFuKHZhbHVlT2YodGhpcy4kMCkpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFRBTjtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIFRJTTogVElNID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKFRJTSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gVElNKCkge1xuICAgICAgICByZXR1cm4gVElNLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBUSU0ucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmFsdWVPZih0aGlzLiQwKSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiAobmV3IERhdGUoKSkuZ2V0TWludXRlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAobmV3IERhdGUoKSkuZ2V0U2Vjb25kcygpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gVElNO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgTENBU0U6IExDQVNFID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgICAgX19leHRlbmRzKExDQVNFLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBMQ0FTRSgpIHtcbiAgICAgICAgcmV0dXJuIExDQVNFLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICBMQ0FTRS5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMuJDApLnRvTG93ZXJDYXNlKCk7XG4gICAgICB9O1xuXG4gICAgICBMQ0FTRS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiTENBU0UoXCIgKyB0aGlzLiQwICsgXCIsIFwiICsgdGhpcy4kMSArIFwiLCBcIiArIHRoaXMuJDIgKyBcIilcIjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBMQ0FTRTtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIExFRlQ6IExFRlQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoTEVGVCwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gTEVGVCgpIHtcbiAgICAgICAgcmV0dXJuIExFRlQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIExFRlQucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLiQwKS5zdWJzdHIoMCwgdmFsdWVPZih0aGlzLiQxKSAtIDEpO1xuICAgICAgfTtcblxuICAgICAgTEVGVC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFwiTEVGVChcIiArIHRoaXMuJDAgKyBcIiwgXCIgKyB0aGlzLiQxICsgXCIsIFwiICsgdGhpcy4kMiArIFwiKVwiO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIExFRlQ7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBNSUQ6IE1JRCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhNSUQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIE1JRCgpIHtcbiAgICAgICAgcmV0dXJuIE1JRC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgTUlELnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlT2YodGhpcy4kMCkuc3Vic3RyaW5nKHZhbHVlT2YodGhpcy4kMSksIHZhbHVlT2YodGhpcy4kMikpO1xuICAgICAgfTtcblxuICAgICAgTUlELnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJNSUQoXCIgKyB0aGlzLiQwICsgXCIsIFwiICsgdGhpcy4kMSArIFwiLCBcIiArIHRoaXMuJDIgKyBcIilcIjtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBNSUQ7XG5cbiAgICB9KShCdWlsdEluKSxcbiAgICBSSUdIVDogUklHSFQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoUklHSFQsIF9zdXBlcik7XG5cbiAgICAgIGZ1bmN0aW9uIFJJR0hUKCkge1xuICAgICAgICByZXR1cm4gUklHSFQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFJJR0hULnByb3RvdHlwZVtcImV2YWxcIl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlT2YodGhpcy4kMCkuc3Vic3RyKHZhbHVlT2YodGhpcy4kMSkgLSAxKTtcbiAgICAgIH07XG5cbiAgICAgIFJJR0hULnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJSSUdIVChcIiArIHRoaXMuJDAgKyBcIiwgXCIgKyB0aGlzLiQxICsgXCIsIFwiICsgdGhpcy4kMiArIFwiKVwiO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFJJR0hUO1xuXG4gICAgfSkoQnVpbHRJbiksXG4gICAgU1VCU1RSOiBTVUJTVFIgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgICBfX2V4dGVuZHMoU1VCU1RSLCBfc3VwZXIpO1xuXG4gICAgICBmdW5jdGlvbiBTVUJTVFIoKSB7XG4gICAgICAgIHJldHVybiBTVUJTVFIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIFNVQlNUUi5wcm90b3R5cGVbXCJldmFsXCJdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMuJDApLnN1YnN0cih2YWx1ZU9mKHRoaXMuJDEpIC0gMSwgdmFsdWVPZih0aGlzLiQyKSk7XG4gICAgICB9O1xuXG4gICAgICBTVUJTVFIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlNVQlNUUihcIiArIHRoaXMuJDAgKyBcIiwgXCIgKyB0aGlzLiQxICsgXCIsIFwiICsgdGhpcy4kMiArIFwiKVwiO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFNVQlNUUjtcblxuICAgIH0pKEJ1aWx0SW4pLFxuICAgIFVDQVNFOiBVQ0FTRSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICAgIF9fZXh0ZW5kcyhVQ0FTRSwgX3N1cGVyKTtcblxuICAgICAgZnVuY3Rpb24gVUNBU0UoKSB7XG4gICAgICAgIHJldHVybiBVQ0FTRS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgVUNBU0UucHJvdG90eXBlW1wiZXZhbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmFsdWVPZih0aGlzLiQwKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgfTtcblxuICAgICAgVUNBU0UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBcIlVDQVNFKFwiICsgdGhpcy4kMCArIFwiLCBcIiArIHRoaXMuJDEgKyBcIiwgXCIgKyB0aGlzLiQyICsgXCIpXCI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gVUNBU0U7XG5cbiAgICB9KShCdWlsdEluKVxuICB9XG59O1xuIiwidmFyIHByb2Nlc3M9cmVxdWlyZShcIl9fYnJvd3NlcmlmeV9wcm9jZXNzXCIpOy8qIHBhcnNlciBnZW5lcmF0ZWQgYnkgamlzb24gMC40LjEzICovXG4vKlxuICBSZXR1cm5zIGEgUGFyc2VyIG9iamVjdCBvZiB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZTpcblxuICBQYXJzZXI6IHtcbiAgICB5eToge31cbiAgfVxuXG4gIFBhcnNlci5wcm90b3R5cGU6IHtcbiAgICB5eToge30sXG4gICAgdHJhY2U6IGZ1bmN0aW9uKCksXG4gICAgc3ltYm9sc186IHthc3NvY2lhdGl2ZSBsaXN0OiBuYW1lID09PiBudW1iZXJ9LFxuICAgIHRlcm1pbmFsc186IHthc3NvY2lhdGl2ZSBsaXN0OiBudW1iZXIgPT0+IG5hbWV9LFxuICAgIHByb2R1Y3Rpb25zXzogWy4uLl0sXG4gICAgcGVyZm9ybUFjdGlvbjogZnVuY3Rpb24gYW5vbnltb3VzKHl5dGV4dCwgeXlsZW5nLCB5eWxpbmVubywgeXksIHl5c3RhdGUsICQkLCBfJCksXG4gICAgdGFibGU6IFsuLi5dLFxuICAgIGRlZmF1bHRBY3Rpb25zOiB7Li4ufSxcbiAgICBwYXJzZUVycm9yOiBmdW5jdGlvbihzdHIsIGhhc2gpLFxuICAgIHBhcnNlOiBmdW5jdGlvbihpbnB1dCksXG5cbiAgICBsZXhlcjoge1xuICAgICAgICBFT0Y6IDEsXG4gICAgICAgIHBhcnNlRXJyb3I6IGZ1bmN0aW9uKHN0ciwgaGFzaCksXG4gICAgICAgIHNldElucHV0OiBmdW5jdGlvbihpbnB1dCksXG4gICAgICAgIGlucHV0OiBmdW5jdGlvbigpLFxuICAgICAgICB1bnB1dDogZnVuY3Rpb24oc3RyKSxcbiAgICAgICAgbW9yZTogZnVuY3Rpb24oKSxcbiAgICAgICAgbGVzczogZnVuY3Rpb24obiksXG4gICAgICAgIHBhc3RJbnB1dDogZnVuY3Rpb24oKSxcbiAgICAgICAgdXBjb21pbmdJbnB1dDogZnVuY3Rpb24oKSxcbiAgICAgICAgc2hvd1Bvc2l0aW9uOiBmdW5jdGlvbigpLFxuICAgICAgICB0ZXN0X21hdGNoOiBmdW5jdGlvbihyZWdleF9tYXRjaF9hcnJheSwgcnVsZV9pbmRleCksXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKCksXG4gICAgICAgIGxleDogZnVuY3Rpb24oKSxcbiAgICAgICAgYmVnaW46IGZ1bmN0aW9uKGNvbmRpdGlvbiksXG4gICAgICAgIHBvcFN0YXRlOiBmdW5jdGlvbigpLFxuICAgICAgICBfY3VycmVudFJ1bGVzOiBmdW5jdGlvbigpLFxuICAgICAgICB0b3BTdGF0ZTogZnVuY3Rpb24oKSxcbiAgICAgICAgcHVzaFN0YXRlOiBmdW5jdGlvbihjb25kaXRpb24pLFxuXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIHJhbmdlczogYm9vbGVhbiAgICAgICAgICAgKG9wdGlvbmFsOiB0cnVlID09PiB0b2tlbiBsb2NhdGlvbiBpbmZvIHdpbGwgaW5jbHVkZSBhIC5yYW5nZVtdIG1lbWJlcilcbiAgICAgICAgICAgIGZsZXg6IGJvb2xlYW4gICAgICAgICAgICAgKG9wdGlvbmFsOiB0cnVlID09PiBmbGV4LWxpa2UgbGV4aW5nIGJlaGF2aW91ciB3aGVyZSB0aGUgcnVsZXMgYXJlIHRlc3RlZCBleGhhdXN0aXZlbHkgdG8gZmluZCB0aGUgbG9uZ2VzdCBtYXRjaClcbiAgICAgICAgICAgIGJhY2t0cmFja19sZXhlcjogYm9vbGVhbiAgKG9wdGlvbmFsOiB0cnVlID09PiBsZXhlciByZWdleGVzIGFyZSB0ZXN0ZWQgaW4gb3JkZXIgYW5kIGZvciBlYWNoIG1hdGNoaW5nIHJlZ2V4IHRoZSBhY3Rpb24gY29kZSBpcyBpbnZva2VkOyB0aGUgbGV4ZXIgdGVybWluYXRlcyB0aGUgc2NhbiB3aGVuIGEgdG9rZW4gaXMgcmV0dXJuZWQgYnkgdGhlIGFjdGlvbiBjb2RlKVxuICAgICAgICB9LFxuXG4gICAgICAgIHBlcmZvcm1BY3Rpb246IGZ1bmN0aW9uKHl5LCB5eV8sICRhdm9pZGluZ19uYW1lX2NvbGxpc2lvbnMsIFlZX1NUQVJUKSxcbiAgICAgICAgcnVsZXM6IFsuLi5dLFxuICAgICAgICBjb25kaXRpb25zOiB7YXNzb2NpYXRpdmUgbGlzdDogbmFtZSA9PT4gc2V0fSxcbiAgICB9XG4gIH1cblxuXG4gIHRva2VuIGxvY2F0aW9uIGluZm8gKEAkLCBfJCwgZXRjLik6IHtcbiAgICBmaXJzdF9saW5lOiBuLFxuICAgIGxhc3RfbGluZTogbixcbiAgICBmaXJzdF9jb2x1bW46IG4sXG4gICAgbGFzdF9jb2x1bW46IG4sXG4gICAgcmFuZ2U6IFtzdGFydF9udW1iZXIsIGVuZF9udW1iZXJdICAgICAgICh3aGVyZSB0aGUgbnVtYmVycyBhcmUgaW5kZXhlcyBpbnRvIHRoZSBpbnB1dCBzdHJpbmcsIHJlZ3VsYXIgemVyby1iYXNlZClcbiAgfVxuXG5cbiAgdGhlIHBhcnNlRXJyb3IgZnVuY3Rpb24gcmVjZWl2ZXMgYSAnaGFzaCcgb2JqZWN0IHdpdGggdGhlc2UgbWVtYmVycyBmb3IgbGV4ZXIgYW5kIHBhcnNlciBlcnJvcnM6IHtcbiAgICB0ZXh0OiAgICAgICAgKG1hdGNoZWQgdGV4dClcbiAgICB0b2tlbjogICAgICAgKHRoZSBwcm9kdWNlZCB0ZXJtaW5hbCB0b2tlbiwgaWYgYW55KVxuICAgIGxpbmU6ICAgICAgICAoeXlsaW5lbm8pXG4gIH1cbiAgd2hpbGUgcGFyc2VyIChncmFtbWFyKSBlcnJvcnMgd2lsbCBhbHNvIHByb3ZpZGUgdGhlc2UgbWVtYmVycywgaS5lLiBwYXJzZXIgZXJyb3JzIGRlbGl2ZXIgYSBzdXBlcnNldCBvZiBhdHRyaWJ1dGVzOiB7XG4gICAgbG9jOiAgICAgICAgICh5eWxsb2MpXG4gICAgZXhwZWN0ZWQ6ICAgIChzdHJpbmcgZGVzY3JpYmluZyB0aGUgc2V0IG9mIGV4cGVjdGVkIHRva2VucylcbiAgICByZWNvdmVyYWJsZTogKGJvb2xlYW46IFRSVUUgd2hlbiB0aGUgcGFyc2VyIGhhcyBhIGVycm9yIHJlY292ZXJ5IHJ1bGUgYXZhaWxhYmxlIGZvciB0aGlzIHBhcnRpY3VsYXIgZXJyb3IpXG4gIH1cbiovXG52YXIga2MgPSAoZnVuY3Rpb24oKXtcbnZhciBwYXJzZXIgPSB7dHJhY2U6IGZ1bmN0aW9uIHRyYWNlKCkgeyB9LFxueXk6IHt9LFxuc3ltYm9sc186IHtcImVycm9yXCI6MixcIlByb2dyYW1cIjozLFwiQ29tbWFuZFwiOjQsXCJORVdMSU5FXCI6NSxcIkVPRlwiOjYsXCJMaW5lc1wiOjcsXCJMaW5lXCI6OCxcIlN0YXRlbWVudFwiOjksXCJJTlRFR0VSXCI6MTAsXCJBVEFSSVwiOjExLFwiU1RSSU5HXCI6MTIsXCJDTFNcIjoxMyxcIkdXQkFTSUNcIjoxNCxcIlRST05cIjoxNSxcIlRST0ZGXCI6MTYsXCJBUFBFTkRcIjoxNyxcIkNBVEFMT0dcIjoxOCxcIkRFTEVURVwiOjE5LFwiRElSXCI6MjAsXCJFWEVDVVRFXCI6MjEsXCJGSUxFU1wiOjIyLFwiR0VUXCI6MjMsXCJHUk9VUFwiOjI0LFwiTElCUkFSWVwiOjI1LFwiTElTVFwiOjI2LFwiTkFNRVwiOjI3LFwiUFVSR0VcIjoyOCxcIlJFTlVNQkVSXCI6MjksXCJRVUlUXCI6MzAsXCJSVU5cIjozMSxcIlNBVkVcIjozMixcIlNDUkFUQ0hcIjozMyxcIlRFU1RcIjozNCxcIkJBU0VcIjozNSxcIihcIjozNixcIilcIjozNyxcIkNIQUlOXCI6MzgsXCJDT01cIjozOSxcIkRpbUxpc3RcIjo0MCxcIkRBVEFcIjo0MSxcIkNvbnN0YW50TGlzdFwiOjQyLFwiREVGXCI6NDMsXCJGTkRcIjo0NCxcIlZBUlwiOjQ1LFwiPVwiOjQ2LFwiRXhwcmVzc2lvblwiOjQ3LFwiRElNXCI6NDgsXCJFTkRcIjo0OSxcIkVOVEVSXCI6NTAsXCJQT1JUXCI6NTEsXCIsXCI6NTIsXCJGT1JcIjo1MyxcIlRPXCI6NTQsXCJTVEVQXCI6NTUsXCJHT1wiOjU2LFwiR09UT1wiOjU3LFwiT0ZcIjo1OCxcIkludGVnZXJMaXN0XCI6NTksXCJHT1NVQlwiOjYwLFwiSUZcIjo2MSxcIlRIRU5cIjo2MixcIklNQUdFXCI6NjMsXCJJbWFnZUxpc3RcIjo2NCxcIklOUFVUXCI6NjUsXCJWYXJMaXN0XCI6NjYsXCJMRVRcIjo2NyxcIkxldExpc3RcIjo2OCxcIk1BVFwiOjY5LFwiUkVBRFwiOjcwLFwiWkVSXCI6NzEsXCJDT05cIjo3MixcIk5FWFRcIjo3MyxcIlBSSU5UXCI6NzQsXCJQcmludExpc3RcIjo3NSxcIlByaW50U2VwXCI6NzYsXCJVU0lOR1wiOjc3LFwiO1wiOjc4LFwiUkFORE9NSVpFXCI6NzksXCJSRVNUT1JFXCI6ODAsXCJSRVRVUk5cIjo4MSxcIlJFTVwiOjgyLFwiU1RPUFwiOjgzLFwiT1JcIjo4NCxcIkFORFwiOjg1LFwiTk9UXCI6ODYsXCJFUVwiOjg3LFwiTkVcIjo4OCxcIj5cIjo4OSxcIkdFXCI6OTAsXCI8XCI6OTEsXCJMRVwiOjkyLFwiTUFYXCI6OTMsXCJNSU5cIjo5NCxcIitcIjo5NSxcIi1cIjo5NixcIipcIjo5NyxcIi9cIjo5OCxcIl5cIjo5OSxcIltcIjoxMDAsXCJFeHByZXNzaW9uTGlzdFwiOjEwMSxcIl1cIjoxMDIsXCJBQlNcIjoxMDMsXCJBVE5cIjoxMDQsXCJDT1NcIjoxMDUsXCJFWFBcIjoxMDYsXCJJTlRcIjoxMDcsXCJMRU5cIjoxMDgsXCJMSU5cIjoxMDksXCJMT0dcIjoxMTAsXCJSTkRcIjoxMTEsXCJTR05cIjoxMTIsXCJTSU5cIjoxMTMsXCJTUEFcIjoxMTQsXCJTUVJcIjoxMTUsXCJUQUJcIjoxMTYsXCJUQU5cIjoxMTcsXCJUSU1cIjoxMTgsXCJMQ0FTRVwiOjExOSxcIkxFRlRcIjoxMjAsXCJNSURcIjoxMjEsXCJSSUdIVFwiOjEyMixcIlNVQlNUUlwiOjEyMyxcIlVDQVNFXCI6MTI0LFwiQ29uc3RhbnRcIjoxMjUsXCJOVU1CRVJcIjoxMjYsXCJEaW1cIjoxMjcsXCJWYXJJdGVtXCI6MTI4LFwiSW1hZ2VJdGVtXCI6MTI5LFwiSW1hZ2VNYXNrXCI6MTMwLFwiSW1hZ2VNYXNrSXRlbVwiOjEzMSxcIiRhY2NlcHRcIjowLFwiJGVuZFwiOjF9LFxudGVybWluYWxzXzogezI6XCJlcnJvclwiLDU6XCJORVdMSU5FXCIsNjpcIkVPRlwiLDEwOlwiSU5URUdFUlwiLDExOlwiQVRBUklcIiwxMjpcIlNUUklOR1wiLDEzOlwiQ0xTXCIsMTQ6XCJHV0JBU0lDXCIsMTU6XCJUUk9OXCIsMTY6XCJUUk9GRlwiLDE3OlwiQVBQRU5EXCIsMTg6XCJDQVRBTE9HXCIsMTk6XCJERUxFVEVcIiwyMDpcIkRJUlwiLDIxOlwiRVhFQ1VURVwiLDIyOlwiRklMRVNcIiwyMzpcIkdFVFwiLDI0OlwiR1JPVVBcIiwyNTpcIkxJQlJBUllcIiwyNjpcIkxJU1RcIiwyNzpcIk5BTUVcIiwyODpcIlBVUkdFXCIsMjk6XCJSRU5VTUJFUlwiLDMwOlwiUVVJVFwiLDMxOlwiUlVOXCIsMzI6XCJTQVZFXCIsMzM6XCJTQ1JBVENIXCIsMzQ6XCJURVNUXCIsMzU6XCJCQVNFXCIsMzY6XCIoXCIsMzc6XCIpXCIsMzg6XCJDSEFJTlwiLDM5OlwiQ09NXCIsNDE6XCJEQVRBXCIsNDM6XCJERUZcIiw0NDpcIkZORFwiLDQ1OlwiVkFSXCIsNDY6XCI9XCIsNDg6XCJESU1cIiw0OTpcIkVORFwiLDUwOlwiRU5URVJcIiw1MTpcIlBPUlRcIiw1MjpcIixcIiw1MzpcIkZPUlwiLDU0OlwiVE9cIiw1NTpcIlNURVBcIiw1NjpcIkdPXCIsNTc6XCJHT1RPXCIsNTg6XCJPRlwiLDYwOlwiR09TVUJcIiw2MTpcIklGXCIsNjI6XCJUSEVOXCIsNjM6XCJJTUFHRVwiLDY1OlwiSU5QVVRcIiw2NzpcIkxFVFwiLDY5OlwiTUFUXCIsNzA6XCJSRUFEXCIsNzE6XCJaRVJcIiw3MjpcIkNPTlwiLDczOlwiTkVYVFwiLDc0OlwiUFJJTlRcIiw3NzpcIlVTSU5HXCIsNzg6XCI7XCIsNzk6XCJSQU5ET01JWkVcIiw4MDpcIlJFU1RPUkVcIiw4MTpcIlJFVFVSTlwiLDgyOlwiUkVNXCIsODM6XCJTVE9QXCIsODQ6XCJPUlwiLDg1OlwiQU5EXCIsODY6XCJOT1RcIiw4NzpcIkVRXCIsODg6XCJORVwiLDg5OlwiPlwiLDkwOlwiR0VcIiw5MTpcIjxcIiw5MjpcIkxFXCIsOTM6XCJNQVhcIiw5NDpcIk1JTlwiLDk1OlwiK1wiLDk2OlwiLVwiLDk3OlwiKlwiLDk4OlwiL1wiLDk5OlwiXlwiLDEwMDpcIltcIiwxMDI6XCJdXCIsMTAzOlwiQUJTXCIsMTA0OlwiQVROXCIsMTA1OlwiQ09TXCIsMTA2OlwiRVhQXCIsMTA3OlwiSU5UXCIsMTA4OlwiTEVOXCIsMTA5OlwiTElOXCIsMTEwOlwiTE9HXCIsMTExOlwiUk5EXCIsMTEyOlwiU0dOXCIsMTEzOlwiU0lOXCIsMTE0OlwiU1BBXCIsMTE1OlwiU1FSXCIsMTE2OlwiVEFCXCIsMTE3OlwiVEFOXCIsMTE4OlwiVElNXCIsMTE5OlwiTENBU0VcIiwxMjA6XCJMRUZUXCIsMTIxOlwiTUlEXCIsMTIyOlwiUklHSFRcIiwxMjM6XCJTVUJTVFJcIiwxMjQ6XCJVQ0FTRVwiLDEyNjpcIk5VTUJFUlwifSxcbnByb2R1Y3Rpb25zXzogWzAsWzMsM10sWzMsMl0sWzcsM10sWzcsMl0sWzcsMV0sWzgsMV0sWzgsMl0sWzQsMl0sWzQsMV0sWzQsMl0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzQsMV0sWzksNF0sWzksMl0sWzksMl0sWzksMl0sWzksN10sWzksMl0sWzksMV0sWzksOF0sWzksNl0sWzksOF0sWzksNl0sWzksM10sWzksMl0sWzksNF0sWzksMl0sWzksNF0sWzksNF0sWzksNF0sWzksNF0sWzksMl0sWzksMl0sWzksNF0sWzksM10sWzksMl0sWzksM10sWzksNF0sWzksNF0sWzksMl0sWzksM10sWzksMl0sWzksMV0sWzksNV0sWzksM10sWzksMV0sWzksMl0sWzksMV0sWzksMl0sWzksMV0sWzksMV0sWzksMV0sWzQ3LDNdLFs0NywzXSxbNDcsMl0sWzQ3LDNdLFs0NywzXSxbNDcsM10sWzQ3LDNdLFs0NywzXSxbNDcsM10sWzQ3LDNdLFs0NywzXSxbNDcsM10sWzQ3LDNdLFs0NywzXSxbNDcsM10sWzQ3LDNdLFs0NywyXSxbNDcsM10sWzQ3LDFdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDRdLFs0Nyw0XSxbNDcsNF0sWzQ3LDZdLFs0Nyw4XSxbNDcsNl0sWzQ3LDhdLFs0Nyw0XSxbNDcsMV0sWzEyNSwxXSxbMTI1LDFdLFsxMjUsMV0sWzQwLDFdLFs0MCwzXSxbMTI3LDFdLFsxMjcsNF0sWzEyNyw0XSxbNjgsMl0sWzY4LDVdLFs2OCw1XSxbNjgsM10sWzY4LDZdLFs2OCw2XSxbNDIsMV0sWzQyLDNdLFs1OSwxXSxbNTksM10sWzEwMSwxXSxbMTAxLDNdLFs2NiwxXSxbNjYsM10sWzEyOCwxXSxbMTI4LDRdLFsxMjgsNF0sWzc1LDFdLFs3NSwzXSxbNzYsMV0sWzc2LDFdLFs2NCwxXSxbNjQsM10sWzEyOSwxXSxbMTI5LDFdLFsxMzAsMV0sWzEzMCw0XSxbMTMxLDFdLFsxMzEsMl1dLFxucGVyZm9ybUFjdGlvbjogZnVuY3Rpb24gYW5vbnltb3VzKHl5dGV4dCwgeXlsZW5nLCB5eWxpbmVubywgeXksIHl5c3RhdGUgLyogYWN0aW9uWzFdICovLCAkJCAvKiB2c3RhY2sgKi8sIF8kIC8qIGxzdGFjayAqLykge1xuLyogdGhpcyA9PSB5eXZhbCAqL1xuXG52YXIgJDAgPSAkJC5sZW5ndGggLSAxO1xuc3dpdGNoICh5eXN0YXRlKSB7XG5jYXNlIDE6dGhpcy4kID0gbmV3IGtleXdvcmQuU3RhdGVtZW50KCQkWyQwLTJdKTtcbmJyZWFrO1xuY2FzZSA2OnRoaXMuJCA9IG5ldyBrZXl3b3JkLlN0YXRlbWVudCgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDc6dGhpcy4kID0gbmV3IGtleXdvcmQuU3RhdGVtZW50KCQkWyQwXSwgJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDg6IGNvbW1hbmQuYXRhcmkoJCRbJDBdKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgOTogY29tbWFuZC5jbHMoKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMTA6IGNvbW1hbmQuZ3diYXNpYygkJFskMF0pOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAxMTogY29tbWFuZC50cm9uKCk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDEyOiBjb21tYW5kLnRyb2ZmKCk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDEzOiBjb21tYW5kLmFwcGVuZCgkJFskMF0pOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAxNDogY29tbWFuZC5jYXQoJ0NBVEFMT0cnKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMTU6IGNvbW1hbmQuZGVsKCQkWyQwXSk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDE2OiBjb21tYW5kLmNhdCgnR1dCQVNJQycpOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAxNzogY29tbWFuZC5leGVjKCQkWyQwXSk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDE4OiBjb21tYW5kLmNhdCgnQVRBUkknKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMTk6IGNvbW1hbmQuZ2V0KCQkWyQwXSk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDIwOiBjb21tYW5kLmNhdCgnR1JPVVAnKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMjE6IGNvbW1hbmQuZGVsKFwiZGVsLVwiKyQkWyQwXSk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDIyOiBjb21tYW5kLmNhdCgnTElCUkFSWScpOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAyMzogY29tbWFuZC5saXN0KCQkWyQwXSk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDI0OiBjb21tYW5kLm5hbWUoJCRbJDBdKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMjU6IGNvbW1hbmQucHVyZ2UoJCRbJDBdKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMjY6IGNvbW1hbmQucmVudW0oJCRbJDBdKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMjc6IGNvbW1hbmQucXVpdCgpOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAyODogY29tbWFuZC5ydW4oJCRbJDBdKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMjk6IGNvbW1hbmQuc2F2ZSgpOyByZXR1cm4gdHJ1ZTtcbmJyZWFrO1xuY2FzZSAzMDogY29tbWFuZC5zY3IoKTsgcmV0dXJuIHRydWU7XG5icmVhaztcbmNhc2UgMzE6IGNvbW1hbmQuY2F0KCdURVNUJyk7IHJldHVybiB0cnVlO1xuYnJlYWs7XG5jYXNlIDMyOnRoaXMuJCA9IG5ldyBrZXl3b3JkLkJhc2UoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDMzOnRoaXMuJCA9IG5ldyBrZXl3b3JkLkNoYWluKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgMzQ6dGhpcy4kID0gbmV3IGtleXdvcmQuQ29tKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgMzU6dGhpcy4kID0gbmV3IGtleXdvcmQuRGF0YSgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDM2OnRoaXMuJCA9IG5ldyBrZXl3b3JkLkRlZigkJFskMC01XSwgJCRbJDAtM10sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgMzc6dGhpcy4kID0gbmV3IGtleXdvcmQuRGltKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgMzg6dGhpcy4kID0gbmV3IGtleXdvcmQuRW5kKCk7XG5icmVhaztcbmNhc2UgMzk6dGhpcy4kID0gbmV3IGtleXdvcmQuRW50ZXIoJCRbJDAtNl0sICQkWyQwLTRdLCAkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA0MDp0aGlzLiQgPSBuZXcga2V5d29yZC5FbnRlcigkJFskMC00XSwgJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDE6dGhpcy4kID0gbmV3IGtleXdvcmQuRm9yKCQkWyQwLTZdLCAkJFskMC00XSwgJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDI6dGhpcy4kID0gbmV3IGtleXdvcmQuRm9yKCQkWyQwLTRdLCAkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA0Mzp0aGlzLiQgPSBuZXcga2V5d29yZC5Hb3RvKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDQ6dGhpcy4kID0gbmV3IGtleXdvcmQuR290bygkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDQ1OnRoaXMuJCA9IG5ldyBrZXl3b3JkLkdvdG8oJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDY6dGhpcy4kID0gbmV3IGtleXdvcmQuR29zdWIoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA0Nzp0aGlzLiQgPSBuZXcga2V5d29yZC5Hb3N1YigkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA0ODp0aGlzLiQgPSBuZXcga2V5d29yZC5JZigkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA0OTp0aGlzLiQgPSBuZXcga2V5d29yZC5JZigkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA1MDp0aGlzLiQgPSBuZXcga2V5d29yZC5JZigkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA1MTp0aGlzLiQgPSBuZXcga2V5d29yZC5JbWFnZSgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDUyOnRoaXMuJCA9IG5ldyBrZXl3b3JkLklucHV0KCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNTM6dGhpcy4kID0gbmV3IGtleXdvcmQuSW5wdXQoJCRbJDBdLCAkJFskMC0yXSk7XG5icmVhaztcbmNhc2UgNTQ6dGhpcy4kID0gbmV3IGtleXdvcmQuTGV0KCQkWyQwLTFdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDU1OnRoaXMuJCA9IG5ldyBrZXl3b3JkLkxldCgkJFskMC0xXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA1Njp0aGlzLiQgPSBuZXcga2V5d29yZC5NYXRSZWFkKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNTc6dGhpcy4kID0gbmV3IGtleXdvcmQuTWF0KG5ldyBrZXl3b3JkLlZhcigkJFskMC0yXSksIGtleXdvcmQuWmVyKTtcbmJyZWFrO1xuY2FzZSA1ODp0aGlzLiQgPSBuZXcga2V5d29yZC5NYXQobmV3IGtleXdvcmQuVmFyKCQkWyQwLTJdKSwga2V5d29yZC5Db24pO1xuYnJlYWs7XG5jYXNlIDU5OnRoaXMuJCA9IG5ldyBrZXl3b3JkLk5leHQobmV3IGtleXdvcmQuVmFyKCQkWyQwXSkpO1xuYnJlYWs7XG5jYXNlIDYwOnRoaXMuJCA9IG5ldyBrZXl3b3JkLlByaW50KCQkWyQwLTFdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDYxOnRoaXMuJCA9IG5ldyBrZXl3b3JkLlByaW50KCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNjI6dGhpcy4kID0gbmV3IGtleXdvcmQuUHJpbnQobmV3IGtleXdvcmQuQ29uc3QoJycpKTtcbmJyZWFrO1xuY2FzZSA2Mzp0aGlzLiQgPSBuZXcga2V5d29yZC5Vc2luZygkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA2NDp0aGlzLiQgPSBuZXcga2V5d29yZC5Vc2luZygkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDY1OnRoaXMuJCA9IG5ldyBrZXl3b3JkLlJhbmRvbWl6ZSgpO1xuYnJlYWs7XG5jYXNlIDY2OnRoaXMuJCA9IG5ldyBrZXl3b3JkLlJlYWQoJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA2Nzp0aGlzLiQgPSBuZXcga2V5d29yZC5SZXN0b3JlKCk7XG5icmVhaztcbmNhc2UgNjg6dGhpcy4kID0gbmV3IGtleXdvcmQuUmVzdG9yZSgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDY5OnRoaXMuJCA9IG5ldyBrZXl3b3JkLlJldHVybigpO1xuYnJlYWs7XG5jYXNlIDcwOnRoaXMuJCA9IG5ldyBrZXl3b3JkLlJlbSgkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDcxOnRoaXMuJCA9IG5ldyBrZXl3b3JkLlN0b3AoKTtcbmJyZWFrO1xuY2FzZSA3Mjp0aGlzLiQgPSBuZXcga2V5d29yZC5PUigkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA3Mzp0aGlzLiQgPSBuZXcga2V5d29yZC5BTkQoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNzQ6dGhpcy4kID0gbmV3IGtleXdvcmQuTk9UKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNzU6dGhpcy4kID0gbmV3IGtleXdvcmQuRVEoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNzY6dGhpcy4kID0gbmV3IGtleXdvcmQuTkUoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNzc6dGhpcy4kID0gbmV3IGtleXdvcmQuR1QoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNzg6dGhpcy4kID0gbmV3IGtleXdvcmQuR0UoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgNzk6dGhpcy4kID0gbmV3IGtleXdvcmQuTFQoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgODA6dGhpcy4kID0gbmV3IGtleXdvcmQuTEUoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgODE6dGhpcy4kID0gbmV3IGtleXdvcmQuTWF4KCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDgyOnRoaXMuJCA9IG5ldyBrZXl3b3JkLk1pbigkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA4Mzp0aGlzLiQgPSBuZXcga2V5d29yZC5BZGQoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgODQ6dGhpcy4kID0gbmV3IGtleXdvcmQuU3ViKCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDg1OnRoaXMuJCA9IG5ldyBrZXl3b3JkLk11bCgkJFskMC0yXSwgJCRbJDBdKTtcbmJyZWFrO1xuY2FzZSA4Njp0aGlzLiQgPSBuZXcga2V5d29yZC5EaXYoJCRbJDAtMl0sICQkWyQwXSk7XG5icmVhaztcbmNhc2UgODc6dGhpcy4kID0gbmV3IGtleXdvcmQuUG93KCQkWyQwLTJdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDg4OnRoaXMuJCA9IC0kJFskMF07XG5icmVhaztcbmNhc2UgODk6dGhpcy4kID0gJCRbJDAtMV07XG5icmVhaztcbmNhc2UgOTA6dGhpcy4kID0gbmV3IGtleXdvcmQuVmFyKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgOTE6dGhpcy4kID0gbmV3IGtleXdvcmQuVmFyKCQkWyQwLTNdLCAkJFskMC0yXSwgJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDkyOnRoaXMuJCA9IG5ldyBrZXl3b3JkLlZhcigkJFskMC0zXSwgJCRbJDAtMl0sICQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSA5Mzp0aGlzLiQgPSBuZXcga2V5d29yZC5GTigkJFskMC0zXSwgJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDk0OnRoaXMuJCA9IG5ldyBrZXl3b3JkLkFCUygkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgOTU6dGhpcy4kID0gbmV3IGtleXdvcmQuQVROKCQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSA5Njp0aGlzLiQgPSBuZXcga2V5d29yZC5DT1MoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDk3OnRoaXMuJCA9IG5ldyBrZXl3b3JkLkVYUCgkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgOTg6dGhpcy4kID0gbmV3IGtleXdvcmQuSU5UKCQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSA5OTp0aGlzLiQgPSBuZXcga2V5d29yZC5MRU4oJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwMDp0aGlzLiQgPSBuZXcga2V5d29yZC5MSU4oJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwMTp0aGlzLiQgPSBuZXcga2V5d29yZC5MT0coJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwMjp0aGlzLiQgPSBuZXcga2V5d29yZC5STkQoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwMzp0aGlzLiQgPSBuZXcga2V5d29yZC5TR04oJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwNDp0aGlzLiQgPSBuZXcga2V5d29yZC5TSU4oJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwNTp0aGlzLiQgPSBuZXcga2V5d29yZC5TUEEoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwNjp0aGlzLiQgPSBuZXcga2V5d29yZC5TUVIoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwNzp0aGlzLiQgPSBuZXcga2V5d29yZC5UQUIoJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwODp0aGlzLiQgPSBuZXcga2V5d29yZC5UQU4oJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEwOTp0aGlzLiQgPSBuZXcga2V5d29yZC5USU0oJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDExMDp0aGlzLiQgPSBuZXcga2V5d29yZC5MQ0FTRSgkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMTExOnRoaXMuJCA9IG5ldyBrZXl3b3JkLkxFRlQoJCRbJDAtM10sICQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAxMTI6dGhpcy4kID0gbmV3IGtleXdvcmQuTUlEKCQkWyQwLTVdLCAkJFskMC0zXSwgJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDExMzp0aGlzLiQgPSBuZXcga2V5d29yZC5SSUdIVCgkJFskMC0zXSwgJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDExNDp0aGlzLiQgPSBuZXcga2V5d29yZC5TVUJTVFIoJCRbJDAtNV0sICQkWyQwLTNdLCAkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMTE1OnRoaXMuJCA9IG5ldyBrZXl3b3JkLlVDQVNFKCQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAxMTY6dGhpcy4kID0gJCRbJDBdO1xuYnJlYWs7XG5jYXNlIDExNzp0aGlzLiQgPSBuZXcga2V5d29yZC5Db25zdChwYXJzZUludCgkJFskMF0sIDEwKSk7XG5icmVhaztcbmNhc2UgMTE4OnRoaXMuJCA9IG5ldyBrZXl3b3JkLkNvbnN0KCQkWyQwXSk7XG5icmVhaztcbmNhc2UgMTE5OnRoaXMuJCA9IG5ldyBrZXl3b3JkLkNvbnN0KE51bWJlcigkJFskMF0pKTtcbmJyZWFrO1xuY2FzZSAxMjA6dGhpcy4kID0gWyQkWyQwXV07XG5icmVhaztcbmNhc2UgMTIxOnRoaXMuJCA9IFskJFskMC0yXSwgJCRbJDBdXTtcbmJyZWFrO1xuY2FzZSAxMjI6dGhpcy4kID0gbmV3IGtleXdvcmQuVmFyKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgMTIzOnRoaXMuJCA9IG5ldyBrZXl3b3JkLlZhcigkJFskMC0zXSwgJCRbJDAtMl0sICQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAxMjQ6dGhpcy4kID0gbmV3IGtleXdvcmQuVmFyKCQkWyQwLTNdLCAkJFskMC0yXSwgJCRbJDAtMV0pO1xuYnJlYWs7XG5jYXNlIDEyNTp0aGlzLiQgPSBbJCRbJDAtMV1dO1xuYnJlYWs7XG5jYXNlIDEyNjp0aGlzLiQgPSBbbmV3IGtleXdvcmQuVmFyKCQkWyQwLTRdLCAkJFskMC0zXSwgJCRbJDAtMl0pXTtcbmJyZWFrO1xuY2FzZSAxMjc6dGhpcy4kID0gW25ldyBrZXl3b3JkLlZhcigkJFskMC00XSwgJCRbJDAtM10sICQkWyQwLTJdKV07XG5icmVhaztcbmNhc2UgMTI4OnRoaXMuJCA9IFskJFskMC0yXSwgJCRbJDAtMV1dO1xuYnJlYWs7XG5jYXNlIDEyOTp0aGlzLiQgPSBbJCRbJDAtNV0sIG5ldyBrZXl3b3JkLlZhcigkJFskMC00XSwgJCRbJDAtM10sICQkWyQwLTJdKV07XG5icmVhaztcbmNhc2UgMTMwOnRoaXMuJCA9IFskJFskMC01XSwgbmV3IGtleXdvcmQuVmFyKCQkWyQwLTRdLCAkJFskMC0zXSwgJCRbJDAtMl0pXTtcbmJyZWFrO1xuY2FzZSAxMzE6dGhpcy4kID0gWyQkWyQwXV07XG5icmVhaztcbmNhc2UgMTMyOnRoaXMuJCA9IFskJFskMC0yXSwgJCRbJDBdXTtcbmJyZWFrO1xuY2FzZSAxMzM6dGhpcy4kID0gW3BhcnNlSW50KCQkWyQwXSwgMTApXTtcbmJyZWFrO1xuY2FzZSAxMzQ6dGhpcy4kID0gWyQkWyQwLTJdLCBwYXJzZUludCgkJFskMF0sIDEwKV07XG5icmVhaztcbmNhc2UgMTM1OnRoaXMuJCA9IFskJFskMF1dO1xuYnJlYWs7XG5jYXNlIDEzNjp0aGlzLiQgPSBbJCRbJDAtMl0sICQkWyQwXV07XG5icmVhaztcbmNhc2UgMTM3OnRoaXMuJCA9IFskJFskMF1dO1xuYnJlYWs7XG5jYXNlIDEzODp0aGlzLiQgPSBbJCRbJDAtMl0sICQkWyQwXV07XG5icmVhaztcbmNhc2UgMTM5OnRoaXMuJCA9IG5ldyBrZXl3b3JkLlZhcigkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDE0MDp0aGlzLiQgPSBuZXcga2V5d29yZC5WYXIoJCRbJDAtM10sICQkWyQwLTJdLCAkJFskMC0xXSk7XG5icmVhaztcbmNhc2UgMTQxOnRoaXMuJCA9IG5ldyBrZXl3b3JkLlZhcigkJFskMC0zXSwgJCRbJDAtMl0sICQkWyQwLTFdKTtcbmJyZWFrO1xuY2FzZSAxNDI6dGhpcy4kID0gWyQkWyQwXV07XG5icmVhaztcbmNhc2UgMTQzOnRoaXMuJCA9IFskJFskMC0yXSwgJCRbJDAtMV0sICQkWyQwXV07XG5icmVhaztcbmNhc2UgMTQ0OnRoaXMuJCA9IGtleXdvcmQuU2VtaWM7XG5icmVhaztcbmNhc2UgMTQ1OnRoaXMuJCA9IGtleXdvcmQuQ29tbWE7XG5icmVhaztcbmNhc2UgMTQ2OnRoaXMuJCA9IFskJFskMF1dO1xuYnJlYWs7XG5jYXNlIDE0Nzp0aGlzLiQgPSBbJCRbJDAtMl0sICQkWyQwLTFdLCAkJFskMF1dO1xuYnJlYWs7XG5jYXNlIDE0ODp0aGlzLiQgPSAkJFskMF07XG5icmVhaztcbmNhc2UgMTQ5OnRoaXMuJCA9ICQkWyQwXTtcbmJyZWFrO1xuY2FzZSAxNTA6dGhpcy4kID0gWyQkWyQwXV07XG5icmVhaztcbmNhc2UgMTUxOnRoaXMuJCA9IFtwYXJzZUludCgkJFskMC0zXSwgMTApLCAkJFskMC0yXSwgJCRbJDAtMV0sICQkWyQwXV07XG5icmVhaztcbmNhc2UgMTUyOnRoaXMuJCA9IFskJFskMF1dO1xuYnJlYWs7XG5jYXNlIDE1Mzp0aGlzLiQgPSBbcGFyc2VJbnQoJCRbJDAtMV0sIDEwKSwgJCRbJDBdXTtcbmJyZWFrO1xufVxufSxcbnRhYmxlOiBbezM6MSw0OjIsNTpbMSwyOV0sNzozLDg6MjgsOTozMCwxMDpbMSwxN10sMTE6WzEsNF0sMTM6WzEsNV0sMTQ6WzEsNl0sMTU6WzEsN10sMTY6WzEsOF0sMTc6WzEsOV0sMTg6WzEsMTBdLDE5OlsxLDExXSwyMDpbMSwxMl0sMjE6WzEsMTNdLDIyOlsxLDE0XSwyMzpbMSwxNV0sMjQ6WzEsMTZdLDI1OlsxLDE4XSwyNjpbMSwxOV0sMjc6WzEsMjBdLDI4OlsxLDIxXSwyOTpbMSwyMl0sMzA6WzEsMjNdLDMxOlsxLDI0XSwzMjpbMSwyNV0sMzM6WzEsMjZdLDM0OlsxLDI3XSwzNTpbMSwzMV0sMzg6WzEsMzJdLDM5OlsxLDMzXSw0MTpbMSwzNF0sNDM6WzEsMzVdLDQ1OlsxLDU3XSw0ODpbMSwzNl0sNDk6WzEsMzddLDUwOlsxLDM4XSw1MzpbMSwzOV0sNTY6WzEsNDBdLDU3OlsxLDQxXSw2MDpbMSw0Ml0sNjE6WzEsNDNdLDYzOlsxLDQ0XSw2NTpbMSw0NV0sNjc6WzEsNDZdLDY4OjQ3LDY5OlsxLDQ4XSw3MDpbMSw1Ml0sNzM6WzEsNDldLDc0OlsxLDUwXSw3OTpbMSw1MV0sODA6WzEsNTNdLDgxOlsxLDU0XSw4MjpbMSw1NV0sODM6WzEsNTZdfSx7MTpbM119LHs1OlsxLDU4XX0sezY6WzEsNTldLDg6NjAsOTozMCwxMDpbMSw2MV0sMzU6WzEsMzFdLDM4OlsxLDMyXSwzOTpbMSwzM10sNDE6WzEsMzRdLDQzOlsxLDM1XSw0NTpbMSw1N10sNDg6WzEsMzZdLDQ5OlsxLDM3XSw1MDpbMSwzOF0sNTM6WzEsMzldLDU2OlsxLDQwXSw1NzpbMSw0MV0sNjA6WzEsNDJdLDYxOlsxLDQzXSw2MzpbMSw0NF0sNjU6WzEsNDVdLDY3OlsxLDQ2XSw2ODo0Nyw2OTpbMSw0OF0sNzA6WzEsNTJdLDczOlsxLDQ5XSw3NDpbMSw1MF0sNzk6WzEsNTFdLDgwOlsxLDUzXSw4MTpbMSw1NF0sODI6WzEsNTVdLDgzOlsxLDU2XX0sezEyOlsxLDYyXX0sezU6WzIsOV19LHsxMjpbMSw2M119LHs1OlsyLDExXX0sezU6WzIsMTJdfSx7NTpbMiwxM119LHs1OlsyLDE0XX0sezU6WzIsMTVdfSx7NTpbMiwxNl19LHs1OlsyLDE3XX0sezU6WzIsMThdfSx7NTpbMiwxOV19LHs1OlsyLDIwXX0sezU6WzIsMjFdLDk6NjQsMzU6WzEsMzFdLDM4OlsxLDMyXSwzOTpbMSwzM10sNDE6WzEsMzRdLDQzOlsxLDM1XSw0NTpbMSw1N10sNDg6WzEsMzZdLDQ5OlsxLDM3XSw1MDpbMSwzOF0sNTM6WzEsMzldLDU2OlsxLDQwXSw1NzpbMSw0MV0sNjA6WzEsNDJdLDYxOlsxLDQzXSw2MzpbMSw0NF0sNjU6WzEsNDVdLDY3OlsxLDQ2XSw2ODo0Nyw2OTpbMSw0OF0sNzA6WzEsNTJdLDczOlsxLDQ5XSw3NDpbMSw1MF0sNzk6WzEsNTFdLDgwOlsxLDUzXSw4MTpbMSw1NF0sODI6WzEsNTVdLDgzOlsxLDU2XX0sezU6WzIsMjJdfSx7NTpbMiwyM119LHs1OlsyLDI0XX0sezU6WzIsMjVdfSx7NTpbMiwyNl19LHs1OlsyLDI3XX0sezU6WzIsMjhdfSx7NTpbMiwyOV19LHs1OlsyLDMwXX0sezU6WzIsMzFdfSx7NTpbMSw2NV19LHs2OlsyLDVdLDEwOlsyLDVdLDM1OlsyLDVdLDM4OlsyLDVdLDM5OlsyLDVdLDQxOlsyLDVdLDQzOlsyLDVdLDQ1OlsyLDVdLDQ4OlsyLDVdLDQ5OlsyLDVdLDUwOlsyLDVdLDUzOlsyLDVdLDU2OlsyLDVdLDU3OlsyLDVdLDYwOlsyLDVdLDYxOlsyLDVdLDYzOlsyLDVdLDY1OlsyLDVdLDY3OlsyLDVdLDY5OlsyLDVdLDcwOlsyLDVdLDczOlsyLDVdLDc0OlsyLDVdLDc5OlsyLDVdLDgwOlsyLDVdLDgxOlsyLDVdLDgyOlsyLDVdLDgzOlsyLDVdfSx7NTpbMiw2XX0sezM2OlsxLDY2XX0sezEyOlsxLDY3XX0sezQwOjY4LDQ1OlsxLDcwXSwxMjc6Njl9LHsxMDpbMSw3M10sMTI6WzEsNzRdLDQyOjcxLDEyNTo3MiwxMjY6WzEsNzVdfSx7NDQ6WzEsNzZdfSx7NDA6NzcsNDU6WzEsNzBdLDEyNzo2OX0sezU6WzIsMzhdfSx7NDU6WzEsNzldLDUxOlsxLDc4XX0sezQ1OlsxLDgwXX0sezU0OlsxLDgxXX0sezEwOlsxLDgyXSwxMjpbMSw3NF0sMzY6WzEsODZdLDQ0OlsxLDg4XSw0NTpbMSw4N10sNDc6ODMsODY6WzEsODRdLDk2OlsxLDg1XSwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7MTA6WzEsMTEyXSwxMjpbMSw3NF0sMzY6WzEsODZdLDQ0OlsxLDg4XSw0NTpbMSw4N10sNDc6MTEzLDg2OlsxLDg0XSw5NjpbMSw4NV0sMTAzOlsxLDg5XSwxMDQ6WzEsOTBdLDEwNTpbMSw5MV0sMTA2OlsxLDkyXSwxMDc6WzEsOTNdLDEwODpbMSw5NF0sMTA5OlsxLDk1XSwxMTA6WzEsOTZdLDExMTpbMSw5N10sMTEyOlsxLDk4XSwxMTM6WzEsOTldLDExNDpbMSwxMDBdLDExNTpbMSwxMDFdLDExNjpbMSwxMDJdLDExNzpbMSwxMDNdLDExODpbMSwxMDRdLDExOTpbMSwxMDVdLDEyMDpbMSwxMDZdLDEyMTpbMSwxMDddLDEyMjpbMSwxMDhdLDEyMzpbMSwxMDldLDEyNDpbMSwxMTBdLDEyNToxMTEsMTI2OlsxLDc1XX0sezEwOlsxLDczXSwxMjpbMSw3NF0sMzY6WzEsODZdLDQ0OlsxLDg4XSw0NTpbMSw4N10sNDc6MTE0LDg2OlsxLDg0XSw5NjpbMSw4NV0sMTAzOlsxLDg5XSwxMDQ6WzEsOTBdLDEwNTpbMSw5MV0sMTA2OlsxLDkyXSwxMDc6WzEsOTNdLDEwODpbMSw5NF0sMTA5OlsxLDk1XSwxMTA6WzEsOTZdLDExMTpbMSw5N10sMTEyOlsxLDk4XSwxMTM6WzEsOTldLDExNDpbMSwxMDBdLDExNTpbMSwxMDFdLDExNjpbMSwxMDJdLDExNzpbMSwxMDNdLDExODpbMSwxMDRdLDExOTpbMSwxMDVdLDEyMDpbMSwxMDZdLDEyMTpbMSwxMDddLDEyMjpbMSwxMDhdLDEyMzpbMSwxMDldLDEyNDpbMSwxMTBdLDEyNToxMTEsMTI2OlsxLDc1XX0sezEwOlsxLDEyMF0sMTI6WzEsMTE3XSw0NTpbMSwxMjFdLDY0OjExNSwxMjk6MTE2LDEzMDoxMTgsMTMxOjExOX0sezEyOlsxLDEyM10sNDU6WzEsMTI1XSw2NjoxMjIsMTI4OjEyNH0sezQ1OlsxLDU3XSw2ODoxMjZ9LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsMTI4XSw0NzoxMjcsODY6WzEsODRdLDk2OlsxLDg1XSwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7NDU6WzEsMTMwXSw3MDpbMSwxMjldfSx7NDU6WzEsMTMxXX0sezU6WzIsNjJdLDEwOlsxLDczXSwxMjpbMSw3NF0sMzY6WzEsODZdLDQ0OlsxLDg4XSw0NTpbMSw4N10sNDc6MTM0LDc1OjEzMiw3NzpbMSwxMzNdLDg2OlsxLDg0XSw5NjpbMSw4NV0sMTAzOlsxLDg5XSwxMDQ6WzEsOTBdLDEwNTpbMSw5MV0sMTA2OlsxLDkyXSwxMDc6WzEsOTNdLDEwODpbMSw5NF0sMTA5OlsxLDk1XSwxMTA6WzEsOTZdLDExMTpbMSw5N10sMTEyOlsxLDk4XSwxMTM6WzEsOTldLDExNDpbMSwxMDBdLDExNTpbMSwxMDFdLDExNjpbMSwxMDJdLDExNzpbMSwxMDNdLDExODpbMSwxMDRdLDExOTpbMSwxMDVdLDEyMDpbMSwxMDZdLDEyMTpbMSwxMDddLDEyMjpbMSwxMDhdLDEyMzpbMSwxMDldLDEyNDpbMSwxMTBdLDEyNToxMTEsMTI2OlsxLDc1XX0sezU6WzIsNjVdfSx7NDU6WzEsMTI1XSw2NjoxMzUsMTI4OjEyNH0sezU6WzIsNjddLDEwOlsxLDEzNl19LHs1OlsyLDY5XX0sezU6WzIsNzBdfSx7NTpbMiw3MV19LHszNjpbMSwxMzldLDQ2OlsxLDEzN10sMTAwOlsxLDEzOF19LHs2OlsxLDE0MF19LHsxOlsyLDJdfSx7NTpbMSwxNDFdfSx7OTo2NCwzNTpbMSwzMV0sMzg6WzEsMzJdLDM5OlsxLDMzXSw0MTpbMSwzNF0sNDM6WzEsMzVdLDQ1OlsxLDU3XSw0ODpbMSwzNl0sNDk6WzEsMzddLDUwOlsxLDM4XSw1MzpbMSwzOV0sNTY6WzEsNDBdLDU3OlsxLDQxXSw2MDpbMSw0Ml0sNjE6WzEsNDNdLDYzOlsxLDQ0XSw2NTpbMSw0NV0sNjc6WzEsNDZdLDY4OjQ3LDY5OlsxLDQ4XSw3MDpbMSw1Ml0sNzM6WzEsNDldLDc0OlsxLDUwXSw3OTpbMSw1MV0sODA6WzEsNTNdLDgxOlsxLDU0XSw4MjpbMSw1NV0sODM6WzEsNTZdfSx7NTpbMiw4XX0sezU6WzIsMTBdfSx7NTpbMiw3XX0sezY6WzIsNF0sMTA6WzIsNF0sMzU6WzIsNF0sMzg6WzIsNF0sMzk6WzIsNF0sNDE6WzIsNF0sNDM6WzIsNF0sNDU6WzIsNF0sNDg6WzIsNF0sNDk6WzIsNF0sNTA6WzIsNF0sNTM6WzIsNF0sNTY6WzIsNF0sNTc6WzIsNF0sNjA6WzIsNF0sNjE6WzIsNF0sNjM6WzIsNF0sNjU6WzIsNF0sNjc6WzIsNF0sNjk6WzIsNF0sNzA6WzIsNF0sNzM6WzIsNF0sNzQ6WzIsNF0sNzk6WzIsNF0sODA6WzIsNF0sODE6WzIsNF0sODI6WzIsNF0sODM6WzIsNF19LHsxMDpbMSwxNDJdfSx7NTpbMiwzM119LHs1OlsyLDM0XSw1MjpbMSwxNDNdfSx7NTpbMiwxMjBdLDUyOlsyLDEyMF19LHs1OlsyLDEyMl0sMzY6WzEsMTQ1XSw1MjpbMiwxMjJdLDEwMDpbMSwxNDRdfSx7NTpbMiwzNV0sNTI6WzEsMTQ2XX0sezU6WzIsMTMxXSw1MjpbMiwxMzFdfSx7NTpbMiwxMTddLDM3OlsyLDExN10sNTI6WzIsMTE3XSw1NDpbMiwxMTddLDU1OlsyLDExN10sNTc6WzIsMTE3XSw1ODpbMiwxMTddLDYyOlsyLDExN10sNzg6WzIsMTE3XSw4NDpbMiwxMTddLDg1OlsyLDExN10sODc6WzIsMTE3XSw4ODpbMiwxMTddLDg5OlsyLDExN10sOTA6WzIsMTE3XSw5MTpbMiwxMTddLDkyOlsyLDExN10sOTM6WzIsMTE3XSw5NDpbMiwxMTddLDk1OlsyLDExN10sOTY6WzIsMTE3XSw5NzpbMiwxMTddLDk4OlsyLDExN10sOTk6WzIsMTE3XSwxMDI6WzIsMTE3XX0sezU6WzIsMTE4XSwzNzpbMiwxMThdLDUyOlsyLDExOF0sNTQ6WzIsMTE4XSw1NTpbMiwxMThdLDU3OlsyLDExOF0sNTg6WzIsMTE4XSw2MjpbMiwxMThdLDc4OlsyLDExOF0sODQ6WzIsMTE4XSw4NTpbMiwxMThdLDg3OlsyLDExOF0sODg6WzIsMTE4XSw4OTpbMiwxMThdLDkwOlsyLDExOF0sOTE6WzIsMTE4XSw5MjpbMiwxMThdLDkzOlsyLDExOF0sOTQ6WzIsMTE4XSw5NTpbMiwxMThdLDk2OlsyLDExOF0sOTc6WzIsMTE4XSw5ODpbMiwxMThdLDk5OlsyLDExOF0sMTAyOlsyLDExOF19LHs1OlsyLDExOV0sMzc6WzIsMTE5XSw1MjpbMiwxMTldLDU0OlsyLDExOV0sNTU6WzIsMTE5XSw1NzpbMiwxMTldLDU4OlsyLDExOV0sNjI6WzIsMTE5XSw3ODpbMiwxMTldLDg0OlsyLDExOV0sODU6WzIsMTE5XSw4NzpbMiwxMTldLDg4OlsyLDExOV0sODk6WzIsMTE5XSw5MDpbMiwxMTldLDkxOlsyLDExOV0sOTI6WzIsMTE5XSw5MzpbMiwxMTldLDk0OlsyLDExOV0sOTU6WzIsMTE5XSw5NjpbMiwxMTldLDk3OlsyLDExOV0sOTg6WzIsMTE5XSw5OTpbMiwxMTldLDEwMjpbMiwxMTldfSx7MzY6WzEsMTQ3XX0sezU6WzIsMzddLDUyOlsxLDE0M119LHs1MjpbMSwxNDhdfSx7NTI6WzEsMTQ5XX0sezQ2OlsxLDE1MF19LHsxMDpbMSwxNTFdfSx7NTpbMiw0NF0sNTg6WzIsMTE3XSw4NDpbMiwxMTddLDg1OlsyLDExN10sODc6WzIsMTE3XSw4ODpbMiwxMTddLDg5OlsyLDExN10sOTA6WzIsMTE3XSw5MTpbMiwxMTddLDkyOlsyLDExN10sOTM6WzIsMTE3XSw5NDpbMiwxMTddLDk1OlsyLDExN10sOTY6WzIsMTE3XSw5NzpbMiwxMTddLDk4OlsyLDExN10sOTk6WzIsMTE3XX0sezU4OlsxLDE1Ml0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjE2OCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjE2OSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjE3MCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHs1OlsyLDkwXSwzNjpbMSwxNzJdLDM3OlsyLDkwXSw1MjpbMiw5MF0sNTQ6WzIsOTBdLDU1OlsyLDkwXSw1NzpbMiw5MF0sNTg6WzIsOTBdLDYyOlsyLDkwXSw3ODpbMiw5MF0sODQ6WzIsOTBdLDg1OlsyLDkwXSw4NzpbMiw5MF0sODg6WzIsOTBdLDg5OlsyLDkwXSw5MDpbMiw5MF0sOTE6WzIsOTBdLDkyOlsyLDkwXSw5MzpbMiw5MF0sOTQ6WzIsOTBdLDk1OlsyLDkwXSw5NjpbMiw5MF0sOTc6WzIsOTBdLDk4OlsyLDkwXSw5OTpbMiw5MF0sMTAwOlsxLDE3MV0sMTAyOlsyLDkwXX0sezM2OlsxLDE3M119LHszNjpbMSwxNzRdfSx7MzY6WzEsMTc1XX0sezM2OlsxLDE3Nl19LHszNjpbMSwxNzddfSx7MzY6WzEsMTc4XX0sezM2OlsxLDE3OV19LHszNjpbMSwxODBdfSx7MzY6WzEsMTgxXX0sezM2OlsxLDE4Ml19LHszNjpbMSwxODNdfSx7MzY6WzEsMTg0XX0sezM2OlsxLDE4NV19LHszNjpbMSwxODZdfSx7MzY6WzEsMTg3XX0sezM2OlsxLDE4OF19LHszNjpbMSwxODldfSx7MzY6WzEsMTkwXX0sezM2OlsxLDE5MV19LHszNjpbMSwxOTJdfSx7MzY6WzEsMTkzXX0sezM2OlsxLDE5NF19LHszNjpbMSwxOTVdfSx7NTpbMiwxMTZdLDM3OlsyLDExNl0sNTI6WzIsMTE2XSw1NDpbMiwxMTZdLDU1OlsyLDExNl0sNTc6WzIsMTE2XSw1ODpbMiwxMTZdLDYyOlsyLDExNl0sNzg6WzIsMTE2XSw4NDpbMiwxMTZdLDg1OlsyLDExNl0sODc6WzIsMTE2XSw4ODpbMiwxMTZdLDg5OlsyLDExNl0sOTA6WzIsMTE2XSw5MTpbMiwxMTZdLDkyOlsyLDExNl0sOTM6WzIsMTE2XSw5NDpbMiwxMTZdLDk1OlsyLDExNl0sOTY6WzIsMTE2XSw5NzpbMiwxMTZdLDk4OlsyLDExNl0sOTk6WzIsMTE2XSwxMDI6WzIsMTE2XX0sezU6WzIsNDZdLDU4OlsyLDExN10sODQ6WzIsMTE3XSw4NTpbMiwxMTddLDg3OlsyLDExN10sODg6WzIsMTE3XSw4OTpbMiwxMTddLDkwOlsyLDExN10sOTE6WzIsMTE3XSw5MjpbMiwxMTddLDkzOlsyLDExN10sOTQ6WzIsMTE3XSw5NTpbMiwxMTddLDk2OlsyLDExN10sOTc6WzIsMTE3XSw5ODpbMiwxMTddLDk5OlsyLDExN119LHs1ODpbMSwxOTZdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7NTc6WzEsMTk3XSw2MjpbMSwxOThdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7NTpbMiw1MV0sNTI6WzEsMTk5XX0sezU6WzIsMTQ2XSwzNzpbMiwxNDZdLDUyOlsyLDE0Nl19LHs1OlsyLDE0OF0sMzc6WzIsMTQ4XSw1MjpbMiwxNDhdfSx7NTpbMiwxNDldLDM3OlsyLDE0OV0sNTI6WzIsMTQ5XX0sezU6WzIsMTUwXSwzNzpbMiwxNTBdLDUyOlsyLDE1MF19LHszNjpbMSwyMDBdLDQ1OlsxLDIwMV19LHs1OlsyLDE1Ml0sMzc6WzIsMTUyXSw1MjpbMiwxNTJdfSx7NTpbMiw1Ml0sNTI6WzEsMjAyXX0sezUyOlsxLDIwM119LHs1OlsyLDEzN10sNTI6WzIsMTM3XX0sezU6WzIsMTM5XSwzNjpbMSwyMDVdLDUyOlsyLDEzOV0sMTAwOlsxLDIwNF19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsMTI4XSw0NzoyMDYsODY6WzEsODRdLDk2OlsxLDg1XSwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7NTpbMiw1NV0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHs1OlsyLDkwXSwzNjpbMSwyMDldLDQ2OlsxLDIwN10sODQ6WzIsOTBdLDg1OlsyLDkwXSw4NzpbMiw5MF0sODg6WzIsOTBdLDg5OlsyLDkwXSw5MDpbMiw5MF0sOTE6WzIsOTBdLDkyOlsyLDkwXSw5MzpbMiw5MF0sOTQ6WzIsOTBdLDk1OlsyLDkwXSw5NjpbMiw5MF0sOTc6WzIsOTBdLDk4OlsyLDkwXSw5OTpbMiw5MF0sMTAwOlsxLDIwOF19LHs0NTpbMSwxMjVdLDY2OjIxMCwxMjg6MTI0fSx7NDY6WzEsMjExXX0sezU6WzIsNTldfSx7NTpbMiw2MV0sNTI6WzEsMjE0XSw3NjoyMTIsNzg6WzEsMjEzXX0sezEwOlsxLDIxNV19LHs1OlsyLDE0Ml0sNTI6WzIsMTQyXSw3ODpbMiwxNDJdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7NTpbMiw2Nl0sNTI6WzEsMjAyXX0sezU6WzIsNjhdfSx7MTA6WzIsMTI1XSwxMjpbMiwxMjVdLDM2OlsyLDEyNV0sNDQ6WzIsMTI1XSw0NTpbMiwxMjVdLDg2OlsyLDEyNV0sOTY6WzIsMTI1XSwxMDM6WzIsMTI1XSwxMDQ6WzIsMTI1XSwxMDU6WzIsMTI1XSwxMDY6WzIsMTI1XSwxMDc6WzIsMTI1XSwxMDg6WzIsMTI1XSwxMDk6WzIsMTI1XSwxMTA6WzIsMTI1XSwxMTE6WzIsMTI1XSwxMTI6WzIsMTI1XSwxMTM6WzIsMTI1XSwxMTQ6WzIsMTI1XSwxMTU6WzIsMTI1XSwxMTY6WzIsMTI1XSwxMTc6WzIsMTI1XSwxMTg6WzIsMTI1XSwxMTk6WzIsMTI1XSwxMjA6WzIsMTI1XSwxMjE6WzIsMTI1XSwxMjI6WzIsMTI1XSwxMjM6WzIsMTI1XSwxMjQ6WzIsMTI1XSwxMjY6WzIsMTI1XX0sezEwOlsxLDczXSwxMjpbMSw3NF0sMzY6WzEsODZdLDQ0OlsxLDg4XSw0NTpbMSw4N10sNDc6MjE3LDg2OlsxLDg0XSw5NjpbMSw4NV0sMTAxOjIxNiwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7MTA6WzEsNzNdLDEyOlsxLDc0XSwzNjpbMSw4Nl0sNDQ6WzEsODhdLDQ1OlsxLDg3XSw0NzoyMTcsODY6WzEsODRdLDk2OlsxLDg1XSwxMDE6MjE4LDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxOlsyLDFdfSx7NjpbMiwzXSwxMDpbMiwzXSwzNTpbMiwzXSwzODpbMiwzXSwzOTpbMiwzXSw0MTpbMiwzXSw0MzpbMiwzXSw0NTpbMiwzXSw0ODpbMiwzXSw0OTpbMiwzXSw1MDpbMiwzXSw1MzpbMiwzXSw1NjpbMiwzXSw1NzpbMiwzXSw2MDpbMiwzXSw2MTpbMiwzXSw2MzpbMiwzXSw2NTpbMiwzXSw2NzpbMiwzXSw2OTpbMiwzXSw3MDpbMiwzXSw3MzpbMiwzXSw3NDpbMiwzXSw3OTpbMiwzXSw4MDpbMiwzXSw4MTpbMiwzXSw4MjpbMiwzXSw4MzpbMiwzXX0sezM3OlsxLDIxOV19LHs0NTpbMSw3MF0sMTI3OjIyMH0sezEwOlsxLDIyMl0sNTk6MjIxfSx7MTA6WzEsMjIyXSw1OToyMjN9LHsxMDpbMSw3M10sMTI6WzEsNzRdLDEyNToyMjQsMTI2OlsxLDc1XX0sezQ1OlsxLDIyNV19LHs0NTpbMSwyMjZdfSx7NDU6WzEsMjI3XX0sezEwOlsxLDczXSwxMjpbMSw3NF0sMzY6WzEsODZdLDQ0OlsxLDg4XSw0NTpbMSw4N10sNDc6MjI4LDg2OlsxLDg0XSw5NjpbMSw4NV0sMTAzOlsxLDg5XSwxMDQ6WzEsOTBdLDEwNTpbMSw5MV0sMTA2OlsxLDkyXSwxMDc6WzEsOTNdLDEwODpbMSw5NF0sMTA5OlsxLDk1XSwxMTA6WzEsOTZdLDExMTpbMSw5N10sMTEyOlsxLDk4XSwxMTM6WzEsOTldLDExNDpbMSwxMDBdLDExNTpbMSwxMDFdLDExNjpbMSwxMDJdLDExNzpbMSwxMDNdLDExODpbMSwxMDRdLDExOTpbMSwxMDVdLDEyMDpbMSwxMDZdLDEyMTpbMSwxMDddLDEyMjpbMSwxMDhdLDEyMzpbMSwxMDldLDEyNDpbMSwxMTBdLDEyNToxMTEsMTI2OlsxLDc1XX0sezU6WzIsNDNdfSx7MTA6WzEsMjIyXSw1OToyMjl9LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzMCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzMSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzMiw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzMyw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzNCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzNSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzNiw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzNyw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzOCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIzOSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI0MCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI0MSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI0Miw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI0Myw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI0NCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHs1OlsyLDc0XSwzNzpbMiw3NF0sNTI6WzIsNzRdLDU0OlsyLDc0XSw1NTpbMiw3NF0sNTc6WzIsNzRdLDU4OlsyLDc0XSw2MjpbMiw3NF0sNzg6WzIsNzRdLDg0OlsyLDc0XSw4NTpbMiw3NF0sODc6WzIsNzRdLDg4OlsyLDc0XSw4OTpbMiw3NF0sOTA6WzIsNzRdLDkxOlsyLDc0XSw5MjpbMiw3NF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XSwxMDI6WzIsNzRdfSx7NTpbMiw4OF0sMzc6WzIsODhdLDUyOlsyLDg4XSw1NDpbMiw4OF0sNTU6WzIsODhdLDU3OlsyLDg4XSw1ODpbMiw4OF0sNjI6WzIsODhdLDc4OlsyLDg4XSw4NDpbMiw4OF0sODU6WzIsODhdLDg3OlsyLDg4XSw4ODpbMiw4OF0sODk6WzIsODhdLDkwOlsyLDg4XSw5MTpbMiw4OF0sOTI6WzIsODhdLDkzOlsyLDg4XSw5NDpbMiw4OF0sOTU6WzIsODhdLDk2OlsyLDg4XSw5NzpbMiw4OF0sOTg6WzIsODhdLDk5OlsyLDg4XSwxMDI6WzIsODhdfSx7Mzc6WzEsMjQ1XSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezEwOlsxLDczXSwxMjpbMSw3NF0sMzY6WzEsODZdLDQ0OlsxLDg4XSw0NTpbMSw4N10sNDc6MjE3LDg2OlsxLDg0XSw5NjpbMSw4NV0sMTAxOjI0NiwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7MTA6WzEsNzNdLDEyOlsxLDc0XSwzNjpbMSw4Nl0sNDQ6WzEsODhdLDQ1OlsxLDg3XSw0NzoyMTcsODY6WzEsODRdLDk2OlsxLDg1XSwxMDE6MjQ3LDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI0OCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI0OSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1MCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1MSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1Miw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1Myw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1NCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1NSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1Niw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1Nyw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1OCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI1OSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2MCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2MSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2Miw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2Myw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2NCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2NSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2Niw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2Nyw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2OCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI2OSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjI3MCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSwyMjJdLDU5OjI3MX0sezEwOlsxLDI3Ml19LHs5OjI3NCwxMDpbMSwyNzNdLDM1OlsxLDMxXSwzODpbMSwzMl0sMzk6WzEsMzNdLDQxOlsxLDM0XSw0MzpbMSwzNV0sNDU6WzEsNTddLDQ4OlsxLDM2XSw0OTpbMSwzN10sNTA6WzEsMzhdLDUzOlsxLDM5XSw1NjpbMSw0MF0sNTc6WzEsNDFdLDYwOlsxLDQyXSw2MTpbMSw0M10sNjM6WzEsNDRdLDY1OlsxLDQ1XSw2NzpbMSw0Nl0sNjg6NDcsNjk6WzEsNDhdLDcwOlsxLDUyXSw3MzpbMSw0OV0sNzQ6WzEsNTBdLDc5OlsxLDUxXSw4MDpbMSw1M10sODE6WzEsNTRdLDgyOlsxLDU1XSw4MzpbMSw1Nl19LHsxMDpbMSwxMjBdLDEyOlsxLDExN10sNDU6WzEsMTIxXSwxMjk6Mjc1LDEzMDoxMTgsMTMxOjExOX0sezEwOlsxLDEyMF0sMTI6WzEsMTE3XSw0NTpbMSwxMjFdLDY0OjI3NiwxMjk6MTE2LDEzMDoxMTgsMTMxOjExOX0sezU6WzIsMTUzXSwzNzpbMiwxNTNdLDUyOlsyLDE1M119LHs0NTpbMSwxMjVdLDEyODoyNzd9LHs0NTpbMSwxMjVdLDY2OjI3OCwxMjg6MTI0fSx7MTA6WzEsNzNdLDEyOlsxLDc0XSwzNjpbMSw4Nl0sNDQ6WzEsODhdLDQ1OlsxLDg3XSw0NzoyMTcsODY6WzEsODRdLDk2OlsxLDg1XSwxMDE6Mjc5LDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjIxNyw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMToyODAsMTAzOlsxLDg5XSwxMDQ6WzEsOTBdLDEwNTpbMSw5MV0sMTA2OlsxLDkyXSwxMDc6WzEsOTNdLDEwODpbMSw5NF0sMTA5OlsxLDk1XSwxMTA6WzEsOTZdLDExMTpbMSw5N10sMTEyOlsxLDk4XSwxMTM6WzEsOTldLDExNDpbMSwxMDBdLDExNTpbMSwxMDFdLDExNjpbMSwxMDJdLDExNzpbMSwxMDNdLDExODpbMSwxMDRdLDExOTpbMSwxMDVdLDEyMDpbMSwxMDZdLDEyMTpbMSwxMDddLDEyMjpbMSwxMDhdLDEyMzpbMSwxMDldLDEyNDpbMSwxMTBdLDEyNToxMTEsMTI2OlsxLDc1XX0sezU6WzIsNTRdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7MTA6WzIsMTI4XSwxMjpbMiwxMjhdLDM2OlsyLDEyOF0sNDQ6WzIsMTI4XSw0NTpbMiwxMjhdLDg2OlsyLDEyOF0sOTY6WzIsMTI4XSwxMDM6WzIsMTI4XSwxMDQ6WzIsMTI4XSwxMDU6WzIsMTI4XSwxMDY6WzIsMTI4XSwxMDc6WzIsMTI4XSwxMDg6WzIsMTI4XSwxMDk6WzIsMTI4XSwxMTA6WzIsMTI4XSwxMTE6WzIsMTI4XSwxMTI6WzIsMTI4XSwxMTM6WzIsMTI4XSwxMTQ6WzIsMTI4XSwxMTU6WzIsMTI4XSwxMTY6WzIsMTI4XSwxMTc6WzIsMTI4XSwxMTg6WzIsMTI4XSwxMTk6WzIsMTI4XSwxMjA6WzIsMTI4XSwxMjE6WzIsMTI4XSwxMjI6WzIsMTI4XSwxMjM6WzIsMTI4XSwxMjQ6WzIsMTI4XSwxMjY6WzIsMTI4XX0sezEwOlsxLDczXSwxMjpbMSw3NF0sMzY6WzEsODZdLDQ0OlsxLDg4XSw0NTpbMSw4N10sNDc6MjE3LDg2OlsxLDg0XSw5NjpbMSw4NV0sMTAxOjI4MSwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7MTA6WzEsNzNdLDEyOlsxLDc0XSwzNjpbMSw4Nl0sNDQ6WzEsODhdLDQ1OlsxLDg3XSw0NzoyMTcsODY6WzEsODRdLDk2OlsxLDg1XSwxMDE6MjgyLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHs1OlsyLDU2XSw1MjpbMSwyMDJdfSx7NzE6WzEsMjgzXSw3MjpbMSwyODRdfSx7NTpbMiw2MF0sMTA6WzEsNzNdLDEyOlsxLDc0XSwzNjpbMSw4Nl0sNDQ6WzEsODhdLDQ1OlsxLDg3XSw0NzoyODUsODY6WzEsODRdLDk2OlsxLDg1XSwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7NTpbMiwxNDRdLDEwOlsyLDE0NF0sMTI6WzIsMTQ0XSwzNjpbMiwxNDRdLDQ0OlsyLDE0NF0sNDU6WzIsMTQ0XSw4NjpbMiwxNDRdLDk2OlsyLDE0NF0sMTAzOlsyLDE0NF0sMTA0OlsyLDE0NF0sMTA1OlsyLDE0NF0sMTA2OlsyLDE0NF0sMTA3OlsyLDE0NF0sMTA4OlsyLDE0NF0sMTA5OlsyLDE0NF0sMTEwOlsyLDE0NF0sMTExOlsyLDE0NF0sMTEyOlsyLDE0NF0sMTEzOlsyLDE0NF0sMTE0OlsyLDE0NF0sMTE1OlsyLDE0NF0sMTE2OlsyLDE0NF0sMTE3OlsyLDE0NF0sMTE4OlsyLDE0NF0sMTE5OlsyLDE0NF0sMTIwOlsyLDE0NF0sMTIxOlsyLDE0NF0sMTIyOlsyLDE0NF0sMTIzOlsyLDE0NF0sMTI0OlsyLDE0NF0sMTI2OlsyLDE0NF19LHs1OlsyLDE0NV0sMTA6WzIsMTQ1XSwxMjpbMiwxNDVdLDM2OlsyLDE0NV0sNDQ6WzIsMTQ1XSw0NTpbMiwxNDVdLDg2OlsyLDE0NV0sOTY6WzIsMTQ1XSwxMDM6WzIsMTQ1XSwxMDQ6WzIsMTQ1XSwxMDU6WzIsMTQ1XSwxMDY6WzIsMTQ1XSwxMDc6WzIsMTQ1XSwxMDg6WzIsMTQ1XSwxMDk6WzIsMTQ1XSwxMTA6WzIsMTQ1XSwxMTE6WzIsMTQ1XSwxMTI6WzIsMTQ1XSwxMTM6WzIsMTQ1XSwxMTQ6WzIsMTQ1XSwxMTU6WzIsMTQ1XSwxMTY6WzIsMTQ1XSwxMTc6WzIsMTQ1XSwxMTg6WzIsMTQ1XSwxMTk6WzIsMTQ1XSwxMjA6WzIsMTQ1XSwxMjE6WzIsMTQ1XSwxMjI6WzIsMTQ1XSwxMjM6WzIsMTQ1XSwxMjQ6WzIsMTQ1XSwxMjY6WzIsMTQ1XX0sezU6WzIsNjRdLDc4OlsxLDI4Nl19LHs1MjpbMSwyODhdLDEwMjpbMSwyODddfSx7Mzc6WzIsMTM1XSw1MjpbMiwxMzVdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddLDEwMjpbMiwxMzVdfSx7Mzc6WzEsMjg5XSw1MjpbMSwyODhdfSx7NTpbMiwzMl19LHs1OlsyLDEyMV0sNTI6WzIsMTIxXX0sezUyOlsxLDI5MV0sMTAyOlsxLDI5MF19LHs1OlsyLDEzM10sMzc6WzIsMTMzXSw1MjpbMiwxMzNdLDEwMjpbMiwxMzNdfSx7Mzc6WzEsMjkyXSw1MjpbMSwyOTFdfSx7NTpbMiwxMzJdLDUyOlsyLDEzMl19LHszNzpbMSwyOTNdfSx7NTI6WzEsMjk0XX0sezUyOlsxLDI5NV19LHs1NDpbMSwyOTZdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7NTpbMiw0NV0sNTI6WzEsMjkxXX0sezU6WzIsNzJdLDM3OlsyLDcyXSw1MjpbMiw3Ml0sNTQ6WzIsNzJdLDU1OlsyLDcyXSw1NzpbMiw3Ml0sNTg6WzIsNzJdLDYyOlsyLDcyXSw3ODpbMiw3Ml0sODQ6WzIsNzJdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XSwxMDI6WzIsNzJdfSx7NTpbMiw3M10sMzc6WzIsNzNdLDUyOlsyLDczXSw1NDpbMiw3M10sNTU6WzIsNzNdLDU3OlsyLDczXSw1ODpbMiw3M10sNjI6WzIsNzNdLDc4OlsyLDczXSw4NDpbMiw3M10sODU6WzIsNzNdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N10sMTAyOlsyLDczXX0sezU6WzIsNzVdLDM3OlsyLDc1XSw1MjpbMiw3NV0sNTQ6WzIsNzVdLDU1OlsyLDc1XSw1NzpbMiw3NV0sNTg6WzIsNzVdLDYyOlsyLDc1XSw3ODpbMiw3NV0sODQ6WzIsNzVdLDg1OlsyLDc1XSw4NzpbMiw3NV0sODg6WzIsNzVdLDg5OlsyLDc1XSw5MDpbMiw3NV0sOTE6WzIsNzVdLDkyOlsyLDc1XSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddLDEwMjpbMiw3NV19LHs1OlsyLDc2XSwzNzpbMiw3Nl0sNTI6WzIsNzZdLDU0OlsyLDc2XSw1NTpbMiw3Nl0sNTc6WzIsNzZdLDU4OlsyLDc2XSw2MjpbMiw3Nl0sNzg6WzIsNzZdLDg0OlsyLDc2XSw4NTpbMiw3Nl0sODc6WzIsNzZdLDg4OlsyLDc2XSw4OTpbMiw3Nl0sOTA6WzIsNzZdLDkxOlsyLDc2XSw5MjpbMiw3Nl0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XSwxMDI6WzIsNzZdfSx7NTpbMiw3N10sMzc6WzIsNzddLDUyOlsyLDc3XSw1NDpbMiw3N10sNTU6WzIsNzddLDU3OlsyLDc3XSw1ODpbMiw3N10sNjI6WzIsNzddLDc4OlsyLDc3XSw4NDpbMiw3N10sODU6WzIsNzddLDg3OlsyLDc3XSw4ODpbMiw3N10sODk6WzIsNzddLDkwOlsyLDc3XSw5MTpbMiw3N10sOTI6WzIsNzddLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N10sMTAyOlsyLDc3XX0sezU6WzIsNzhdLDM3OlsyLDc4XSw1MjpbMiw3OF0sNTQ6WzIsNzhdLDU1OlsyLDc4XSw1NzpbMiw3OF0sNTg6WzIsNzhdLDYyOlsyLDc4XSw3ODpbMiw3OF0sODQ6WzIsNzhdLDg1OlsyLDc4XSw4NzpbMiw3OF0sODg6WzIsNzhdLDg5OlsyLDc4XSw5MDpbMiw3OF0sOTE6WzIsNzhdLDkyOlsyLDc4XSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddLDEwMjpbMiw3OF19LHs1OlsyLDc5XSwzNzpbMiw3OV0sNTI6WzIsNzldLDU0OlsyLDc5XSw1NTpbMiw3OV0sNTc6WzIsNzldLDU4OlsyLDc5XSw2MjpbMiw3OV0sNzg6WzIsNzldLDg0OlsyLDc5XSw4NTpbMiw3OV0sODc6WzIsNzldLDg4OlsyLDc5XSw4OTpbMiw3OV0sOTA6WzIsNzldLDkxOlsyLDc5XSw5MjpbMiw3OV0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XSwxMDI6WzIsNzldfSx7NTpbMiw4MF0sMzc6WzIsODBdLDUyOlsyLDgwXSw1NDpbMiw4MF0sNTU6WzIsODBdLDU3OlsyLDgwXSw1ODpbMiw4MF0sNjI6WzIsODBdLDc4OlsyLDgwXSw4NDpbMiw4MF0sODU6WzIsODBdLDg3OlsyLDgwXSw4ODpbMiw4MF0sODk6WzIsODBdLDkwOlsyLDgwXSw5MTpbMiw4MF0sOTI6WzIsODBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N10sMTAyOlsyLDgwXX0sezU6WzIsODFdLDM3OlsyLDgxXSw1MjpbMiw4MV0sNTQ6WzIsODFdLDU1OlsyLDgxXSw1NzpbMiw4MV0sNTg6WzIsODFdLDYyOlsyLDgxXSw3ODpbMiw4MV0sODQ6WzIsODFdLDg1OlsyLDgxXSw4NzpbMiw4MV0sODg6WzIsODFdLDg5OlsyLDgxXSw5MDpbMiw4MV0sOTE6WzIsODFdLDkyOlsyLDgxXSw5MzpbMiw4MV0sOTQ6WzIsODFdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XSwxMDI6WzIsODFdfSx7NTpbMiw4Ml0sMzc6WzIsODJdLDUyOlsyLDgyXSw1NDpbMiw4Ml0sNTU6WzIsODJdLDU3OlsyLDgyXSw1ODpbMiw4Ml0sNjI6WzIsODJdLDc4OlsyLDgyXSw4NDpbMiw4Ml0sODU6WzIsODJdLDg3OlsyLDgyXSw4ODpbMiw4Ml0sODk6WzIsODJdLDkwOlsyLDgyXSw5MTpbMiw4Ml0sOTI6WzIsODJdLDkzOlsyLDgyXSw5NDpbMiw4Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddLDEwMjpbMiw4Ml19LHs1OlsyLDgzXSwzNzpbMiw4M10sNTI6WzIsODNdLDU0OlsyLDgzXSw1NTpbMiw4M10sNTc6WzIsODNdLDU4OlsyLDgzXSw2MjpbMiw4M10sNzg6WzIsODNdLDg0OlsyLDgzXSw4NTpbMiw4M10sODc6WzIsODNdLDg4OlsyLDgzXSw4OTpbMiw4M10sOTA6WzIsODNdLDkxOlsyLDgzXSw5MjpbMiw4M10sOTM6WzIsODNdLDk0OlsyLDgzXSw5NTpbMiw4M10sOTY6WzIsODNdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddLDEwMjpbMiw4M119LHs1OlsyLDg0XSwzNzpbMiw4NF0sNTI6WzIsODRdLDU0OlsyLDg0XSw1NTpbMiw4NF0sNTc6WzIsODRdLDU4OlsyLDg0XSw2MjpbMiw4NF0sNzg6WzIsODRdLDg0OlsyLDg0XSw4NTpbMiw4NF0sODc6WzIsODRdLDg4OlsyLDg0XSw4OTpbMiw4NF0sOTA6WzIsODRdLDkxOlsyLDg0XSw5MjpbMiw4NF0sOTM6WzIsODRdLDk0OlsyLDg0XSw5NTpbMiw4NF0sOTY6WzIsODRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddLDEwMjpbMiw4NF19LHs1OlsyLDg1XSwzNzpbMiw4NV0sNTI6WzIsODVdLDU0OlsyLDg1XSw1NTpbMiw4NV0sNTc6WzIsODVdLDU4OlsyLDg1XSw2MjpbMiw4NV0sNzg6WzIsODVdLDg0OlsyLDg1XSw4NTpbMiw4NV0sODc6WzIsODVdLDg4OlsyLDg1XSw4OTpbMiw4NV0sOTA6WzIsODVdLDkxOlsyLDg1XSw5MjpbMiw4NV0sOTM6WzIsODVdLDk0OlsyLDg1XSw5NTpbMiw4NV0sOTY6WzIsODVdLDk3OlsyLDg1XSw5ODpbMiw4NV0sOTk6WzEsMTY3XSwxMDI6WzIsODVdfSx7NTpbMiw4Nl0sMzc6WzIsODZdLDUyOlsyLDg2XSw1NDpbMiw4Nl0sNTU6WzIsODZdLDU3OlsyLDg2XSw1ODpbMiw4Nl0sNjI6WzIsODZdLDc4OlsyLDg2XSw4NDpbMiw4Nl0sODU6WzIsODZdLDg3OlsyLDg2XSw4ODpbMiw4Nl0sODk6WzIsODZdLDkwOlsyLDg2XSw5MTpbMiw4Nl0sOTI6WzIsODZdLDkzOlsyLDg2XSw5NDpbMiw4Nl0sOTU6WzIsODZdLDk2OlsyLDg2XSw5NzpbMiw4Nl0sOTg6WzIsODZdLDk5OlsxLDE2N10sMTAyOlsyLDg2XX0sezU6WzIsODddLDM3OlsyLDg3XSw1MjpbMiw4N10sNTQ6WzIsODddLDU1OlsyLDg3XSw1NzpbMiw4N10sNTg6WzIsODddLDYyOlsyLDg3XSw3ODpbMiw4N10sODQ6WzIsODddLDg1OlsyLDg3XSw4NzpbMiw4N10sODg6WzIsODddLDg5OlsyLDg3XSw5MDpbMiw4N10sOTE6WzIsODddLDkyOlsyLDg3XSw5MzpbMiw4N10sOTQ6WzIsODddLDk1OlsyLDg3XSw5NjpbMiw4N10sOTc6WzIsODddLDk4OlsyLDg3XSw5OTpbMiw4N10sMTAyOlsyLDg3XX0sezU6WzIsODldLDM3OlsyLDg5XSw1MjpbMiw4OV0sNTQ6WzIsODldLDU1OlsyLDg5XSw1NzpbMiw4OV0sNTg6WzIsODldLDYyOlsyLDg5XSw3ODpbMiw4OV0sODQ6WzIsODldLDg1OlsyLDg5XSw4NzpbMiw4OV0sODg6WzIsODldLDg5OlsyLDg5XSw5MDpbMiw4OV0sOTE6WzIsODldLDkyOlsyLDg5XSw5MzpbMiw4OV0sOTQ6WzIsODldLDk1OlsyLDg5XSw5NjpbMiw4OV0sOTc6WzIsODldLDk4OlsyLDg5XSw5OTpbMiw4OV0sMTAyOlsyLDg5XX0sezUyOlsxLDI4OF0sMTAyOlsxLDI5N119LHszNzpbMSwyOThdLDUyOlsxLDI4OF19LHszNzpbMSwyOTldLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7Mzc6WzEsMzAwXSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezM3OlsxLDMwMV0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHszNzpbMSwzMDJdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7Mzc6WzEsMzAzXSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezM3OlsxLDMwNF0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHszNzpbMSwzMDVdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7Mzc6WzEsMzA2XSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezM3OlsxLDMwN10sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHszNzpbMSwzMDhdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7Mzc6WzEsMzA5XSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezM3OlsxLDMxMF0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHszNzpbMSwzMTFdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7Mzc6WzEsMzEyXSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezM3OlsxLDMxM10sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHszNzpbMSwzMTRdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7Mzc6WzEsMzE1XSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezM3OlsxLDMxNl0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHs1MjpbMSwzMTddLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7NTI6WzEsMzE4XSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezUyOlsxLDMxOV0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHs1MjpbMSwzMjBdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7Mzc6WzEsMzIxXSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezU6WzIsNDddLDUyOlsxLDI5MV19LHs1OlsyLDQ4XX0sezU6WzIsNDldfSx7NTpbMiw1MF19LHs1OlsyLDE0N10sMzc6WzIsMTQ3XSw1MjpbMiwxNDddfSx7Mzc6WzEsMzIyXSw1MjpbMSwxOTldfSx7NTpbMiwxMzhdLDUyOlsyLDEzOF19LHs1OlsyLDUzXSw1MjpbMSwyMDJdfSx7NTI6WzEsMjg4XSwxMDI6WzEsMzIzXX0sezM3OlsxLDMyNF0sNTI6WzEsMjg4XX0sezUyOlsxLDI4OF0sMTAyOlsxLDMyNV19LHszNzpbMSwzMjZdLDUyOlsxLDI4OF19LHs1OlsyLDU3XX0sezU6WzIsNThdfSx7NTpbMiwxNDNdLDUyOlsyLDE0M10sNzg6WzIsMTQzXSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezQ1OlsxLDEyNV0sNjY6MzI3LDEyODoxMjR9LHs0NjpbMSwzMjhdfSx7MTA6WzEsNzNdLDEyOlsxLDc0XSwzNjpbMSw4Nl0sNDQ6WzEsODhdLDQ1OlsxLDg3XSw0NzozMjksODY6WzEsODRdLDk2OlsxLDg1XSwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7NDY6WzEsMzMwXX0sezU6WzIsMTIzXSw1MjpbMiwxMjNdfSx7MTA6WzEsMzMxXX0sezU6WzIsMTI0XSw1MjpbMiwxMjRdfSx7NDY6WzEsMzMyXX0sezQ1OlsxLDMzM119LHs0NTpbMSwzMzRdfSx7MTA6WzEsNzNdLDEyOlsxLDc0XSwzNjpbMSw4Nl0sNDQ6WzEsODhdLDQ1OlsxLDg3XSw0NzozMzUsODY6WzEsODRdLDk2OlsxLDg1XSwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7NTpbMiw5MV0sMzc6WzIsOTFdLDUyOlsyLDkxXSw1NDpbMiw5MV0sNTU6WzIsOTFdLDU3OlsyLDkxXSw1ODpbMiw5MV0sNjI6WzIsOTFdLDc4OlsyLDkxXSw4NDpbMiw5MV0sODU6WzIsOTFdLDg3OlsyLDkxXSw4ODpbMiw5MV0sODk6WzIsOTFdLDkwOlsyLDkxXSw5MTpbMiw5MV0sOTI6WzIsOTFdLDkzOlsyLDkxXSw5NDpbMiw5MV0sOTU6WzIsOTFdLDk2OlsyLDkxXSw5NzpbMiw5MV0sOTg6WzIsOTFdLDk5OlsyLDkxXSwxMDI6WzIsOTFdfSx7NTpbMiw5Ml0sMzc6WzIsOTJdLDUyOlsyLDkyXSw1NDpbMiw5Ml0sNTU6WzIsOTJdLDU3OlsyLDkyXSw1ODpbMiw5Ml0sNjI6WzIsOTJdLDc4OlsyLDkyXSw4NDpbMiw5Ml0sODU6WzIsOTJdLDg3OlsyLDkyXSw4ODpbMiw5Ml0sODk6WzIsOTJdLDkwOlsyLDkyXSw5MTpbMiw5Ml0sOTI6WzIsOTJdLDkzOlsyLDkyXSw5NDpbMiw5Ml0sOTU6WzIsOTJdLDk2OlsyLDkyXSw5NzpbMiw5Ml0sOTg6WzIsOTJdLDk5OlsyLDkyXSwxMDI6WzIsOTJdfSx7NTpbMiw5M10sMzc6WzIsOTNdLDUyOlsyLDkzXSw1NDpbMiw5M10sNTU6WzIsOTNdLDU3OlsyLDkzXSw1ODpbMiw5M10sNjI6WzIsOTNdLDc4OlsyLDkzXSw4NDpbMiw5M10sODU6WzIsOTNdLDg3OlsyLDkzXSw4ODpbMiw5M10sODk6WzIsOTNdLDkwOlsyLDkzXSw5MTpbMiw5M10sOTI6WzIsOTNdLDkzOlsyLDkzXSw5NDpbMiw5M10sOTU6WzIsOTNdLDk2OlsyLDkzXSw5NzpbMiw5M10sOTg6WzIsOTNdLDk5OlsyLDkzXSwxMDI6WzIsOTNdfSx7NTpbMiw5NF0sMzc6WzIsOTRdLDUyOlsyLDk0XSw1NDpbMiw5NF0sNTU6WzIsOTRdLDU3OlsyLDk0XSw1ODpbMiw5NF0sNjI6WzIsOTRdLDc4OlsyLDk0XSw4NDpbMiw5NF0sODU6WzIsOTRdLDg3OlsyLDk0XSw4ODpbMiw5NF0sODk6WzIsOTRdLDkwOlsyLDk0XSw5MTpbMiw5NF0sOTI6WzIsOTRdLDkzOlsyLDk0XSw5NDpbMiw5NF0sOTU6WzIsOTRdLDk2OlsyLDk0XSw5NzpbMiw5NF0sOTg6WzIsOTRdLDk5OlsyLDk0XSwxMDI6WzIsOTRdfSx7NTpbMiw5NV0sMzc6WzIsOTVdLDUyOlsyLDk1XSw1NDpbMiw5NV0sNTU6WzIsOTVdLDU3OlsyLDk1XSw1ODpbMiw5NV0sNjI6WzIsOTVdLDc4OlsyLDk1XSw4NDpbMiw5NV0sODU6WzIsOTVdLDg3OlsyLDk1XSw4ODpbMiw5NV0sODk6WzIsOTVdLDkwOlsyLDk1XSw5MTpbMiw5NV0sOTI6WzIsOTVdLDkzOlsyLDk1XSw5NDpbMiw5NV0sOTU6WzIsOTVdLDk2OlsyLDk1XSw5NzpbMiw5NV0sOTg6WzIsOTVdLDk5OlsyLDk1XSwxMDI6WzIsOTVdfSx7NTpbMiw5Nl0sMzc6WzIsOTZdLDUyOlsyLDk2XSw1NDpbMiw5Nl0sNTU6WzIsOTZdLDU3OlsyLDk2XSw1ODpbMiw5Nl0sNjI6WzIsOTZdLDc4OlsyLDk2XSw4NDpbMiw5Nl0sODU6WzIsOTZdLDg3OlsyLDk2XSw4ODpbMiw5Nl0sODk6WzIsOTZdLDkwOlsyLDk2XSw5MTpbMiw5Nl0sOTI6WzIsOTZdLDkzOlsyLDk2XSw5NDpbMiw5Nl0sOTU6WzIsOTZdLDk2OlsyLDk2XSw5NzpbMiw5Nl0sOTg6WzIsOTZdLDk5OlsyLDk2XSwxMDI6WzIsOTZdfSx7NTpbMiw5N10sMzc6WzIsOTddLDUyOlsyLDk3XSw1NDpbMiw5N10sNTU6WzIsOTddLDU3OlsyLDk3XSw1ODpbMiw5N10sNjI6WzIsOTddLDc4OlsyLDk3XSw4NDpbMiw5N10sODU6WzIsOTddLDg3OlsyLDk3XSw4ODpbMiw5N10sODk6WzIsOTddLDkwOlsyLDk3XSw5MTpbMiw5N10sOTI6WzIsOTddLDkzOlsyLDk3XSw5NDpbMiw5N10sOTU6WzIsOTddLDk2OlsyLDk3XSw5NzpbMiw5N10sOTg6WzIsOTddLDk5OlsyLDk3XSwxMDI6WzIsOTddfSx7NTpbMiw5OF0sMzc6WzIsOThdLDUyOlsyLDk4XSw1NDpbMiw5OF0sNTU6WzIsOThdLDU3OlsyLDk4XSw1ODpbMiw5OF0sNjI6WzIsOThdLDc4OlsyLDk4XSw4NDpbMiw5OF0sODU6WzIsOThdLDg3OlsyLDk4XSw4ODpbMiw5OF0sODk6WzIsOThdLDkwOlsyLDk4XSw5MTpbMiw5OF0sOTI6WzIsOThdLDkzOlsyLDk4XSw5NDpbMiw5OF0sOTU6WzIsOThdLDk2OlsyLDk4XSw5NzpbMiw5OF0sOTg6WzIsOThdLDk5OlsyLDk4XSwxMDI6WzIsOThdfSx7NTpbMiw5OV0sMzc6WzIsOTldLDUyOlsyLDk5XSw1NDpbMiw5OV0sNTU6WzIsOTldLDU3OlsyLDk5XSw1ODpbMiw5OV0sNjI6WzIsOTldLDc4OlsyLDk5XSw4NDpbMiw5OV0sODU6WzIsOTldLDg3OlsyLDk5XSw4ODpbMiw5OV0sODk6WzIsOTldLDkwOlsyLDk5XSw5MTpbMiw5OV0sOTI6WzIsOTldLDkzOlsyLDk5XSw5NDpbMiw5OV0sOTU6WzIsOTldLDk2OlsyLDk5XSw5NzpbMiw5OV0sOTg6WzIsOTldLDk5OlsyLDk5XSwxMDI6WzIsOTldfSx7NTpbMiwxMDBdLDM3OlsyLDEwMF0sNTI6WzIsMTAwXSw1NDpbMiwxMDBdLDU1OlsyLDEwMF0sNTc6WzIsMTAwXSw1ODpbMiwxMDBdLDYyOlsyLDEwMF0sNzg6WzIsMTAwXSw4NDpbMiwxMDBdLDg1OlsyLDEwMF0sODc6WzIsMTAwXSw4ODpbMiwxMDBdLDg5OlsyLDEwMF0sOTA6WzIsMTAwXSw5MTpbMiwxMDBdLDkyOlsyLDEwMF0sOTM6WzIsMTAwXSw5NDpbMiwxMDBdLDk1OlsyLDEwMF0sOTY6WzIsMTAwXSw5NzpbMiwxMDBdLDk4OlsyLDEwMF0sOTk6WzIsMTAwXSwxMDI6WzIsMTAwXX0sezU6WzIsMTAxXSwzNzpbMiwxMDFdLDUyOlsyLDEwMV0sNTQ6WzIsMTAxXSw1NTpbMiwxMDFdLDU3OlsyLDEwMV0sNTg6WzIsMTAxXSw2MjpbMiwxMDFdLDc4OlsyLDEwMV0sODQ6WzIsMTAxXSw4NTpbMiwxMDFdLDg3OlsyLDEwMV0sODg6WzIsMTAxXSw4OTpbMiwxMDFdLDkwOlsyLDEwMV0sOTE6WzIsMTAxXSw5MjpbMiwxMDFdLDkzOlsyLDEwMV0sOTQ6WzIsMTAxXSw5NTpbMiwxMDFdLDk2OlsyLDEwMV0sOTc6WzIsMTAxXSw5ODpbMiwxMDFdLDk5OlsyLDEwMV0sMTAyOlsyLDEwMV19LHs1OlsyLDEwMl0sMzc6WzIsMTAyXSw1MjpbMiwxMDJdLDU0OlsyLDEwMl0sNTU6WzIsMTAyXSw1NzpbMiwxMDJdLDU4OlsyLDEwMl0sNjI6WzIsMTAyXSw3ODpbMiwxMDJdLDg0OlsyLDEwMl0sODU6WzIsMTAyXSw4NzpbMiwxMDJdLDg4OlsyLDEwMl0sODk6WzIsMTAyXSw5MDpbMiwxMDJdLDkxOlsyLDEwMl0sOTI6WzIsMTAyXSw5MzpbMiwxMDJdLDk0OlsyLDEwMl0sOTU6WzIsMTAyXSw5NjpbMiwxMDJdLDk3OlsyLDEwMl0sOTg6WzIsMTAyXSw5OTpbMiwxMDJdLDEwMjpbMiwxMDJdfSx7NTpbMiwxMDNdLDM3OlsyLDEwM10sNTI6WzIsMTAzXSw1NDpbMiwxMDNdLDU1OlsyLDEwM10sNTc6WzIsMTAzXSw1ODpbMiwxMDNdLDYyOlsyLDEwM10sNzg6WzIsMTAzXSw4NDpbMiwxMDNdLDg1OlsyLDEwM10sODc6WzIsMTAzXSw4ODpbMiwxMDNdLDg5OlsyLDEwM10sOTA6WzIsMTAzXSw5MTpbMiwxMDNdLDkyOlsyLDEwM10sOTM6WzIsMTAzXSw5NDpbMiwxMDNdLDk1OlsyLDEwM10sOTY6WzIsMTAzXSw5NzpbMiwxMDNdLDk4OlsyLDEwM10sOTk6WzIsMTAzXSwxMDI6WzIsMTAzXX0sezU6WzIsMTA0XSwzNzpbMiwxMDRdLDUyOlsyLDEwNF0sNTQ6WzIsMTA0XSw1NTpbMiwxMDRdLDU3OlsyLDEwNF0sNTg6WzIsMTA0XSw2MjpbMiwxMDRdLDc4OlsyLDEwNF0sODQ6WzIsMTA0XSw4NTpbMiwxMDRdLDg3OlsyLDEwNF0sODg6WzIsMTA0XSw4OTpbMiwxMDRdLDkwOlsyLDEwNF0sOTE6WzIsMTA0XSw5MjpbMiwxMDRdLDkzOlsyLDEwNF0sOTQ6WzIsMTA0XSw5NTpbMiwxMDRdLDk2OlsyLDEwNF0sOTc6WzIsMTA0XSw5ODpbMiwxMDRdLDk5OlsyLDEwNF0sMTAyOlsyLDEwNF19LHs1OlsyLDEwNV0sMzc6WzIsMTA1XSw1MjpbMiwxMDVdLDU0OlsyLDEwNV0sNTU6WzIsMTA1XSw1NzpbMiwxMDVdLDU4OlsyLDEwNV0sNjI6WzIsMTA1XSw3ODpbMiwxMDVdLDg0OlsyLDEwNV0sODU6WzIsMTA1XSw4NzpbMiwxMDVdLDg4OlsyLDEwNV0sODk6WzIsMTA1XSw5MDpbMiwxMDVdLDkxOlsyLDEwNV0sOTI6WzIsMTA1XSw5MzpbMiwxMDVdLDk0OlsyLDEwNV0sOTU6WzIsMTA1XSw5NjpbMiwxMDVdLDk3OlsyLDEwNV0sOTg6WzIsMTA1XSw5OTpbMiwxMDVdLDEwMjpbMiwxMDVdfSx7NTpbMiwxMDZdLDM3OlsyLDEwNl0sNTI6WzIsMTA2XSw1NDpbMiwxMDZdLDU1OlsyLDEwNl0sNTc6WzIsMTA2XSw1ODpbMiwxMDZdLDYyOlsyLDEwNl0sNzg6WzIsMTA2XSw4NDpbMiwxMDZdLDg1OlsyLDEwNl0sODc6WzIsMTA2XSw4ODpbMiwxMDZdLDg5OlsyLDEwNl0sOTA6WzIsMTA2XSw5MTpbMiwxMDZdLDkyOlsyLDEwNl0sOTM6WzIsMTA2XSw5NDpbMiwxMDZdLDk1OlsyLDEwNl0sOTY6WzIsMTA2XSw5NzpbMiwxMDZdLDk4OlsyLDEwNl0sOTk6WzIsMTA2XSwxMDI6WzIsMTA2XX0sezU6WzIsMTA3XSwzNzpbMiwxMDddLDUyOlsyLDEwN10sNTQ6WzIsMTA3XSw1NTpbMiwxMDddLDU3OlsyLDEwN10sNTg6WzIsMTA3XSw2MjpbMiwxMDddLDc4OlsyLDEwN10sODQ6WzIsMTA3XSw4NTpbMiwxMDddLDg3OlsyLDEwN10sODg6WzIsMTA3XSw4OTpbMiwxMDddLDkwOlsyLDEwN10sOTE6WzIsMTA3XSw5MjpbMiwxMDddLDkzOlsyLDEwN10sOTQ6WzIsMTA3XSw5NTpbMiwxMDddLDk2OlsyLDEwN10sOTc6WzIsMTA3XSw5ODpbMiwxMDddLDk5OlsyLDEwN10sMTAyOlsyLDEwN119LHs1OlsyLDEwOF0sMzc6WzIsMTA4XSw1MjpbMiwxMDhdLDU0OlsyLDEwOF0sNTU6WzIsMTA4XSw1NzpbMiwxMDhdLDU4OlsyLDEwOF0sNjI6WzIsMTA4XSw3ODpbMiwxMDhdLDg0OlsyLDEwOF0sODU6WzIsMTA4XSw4NzpbMiwxMDhdLDg4OlsyLDEwOF0sODk6WzIsMTA4XSw5MDpbMiwxMDhdLDkxOlsyLDEwOF0sOTI6WzIsMTA4XSw5MzpbMiwxMDhdLDk0OlsyLDEwOF0sOTU6WzIsMTA4XSw5NjpbMiwxMDhdLDk3OlsyLDEwOF0sOTg6WzIsMTA4XSw5OTpbMiwxMDhdLDEwMjpbMiwxMDhdfSx7NTpbMiwxMDldLDM3OlsyLDEwOV0sNTI6WzIsMTA5XSw1NDpbMiwxMDldLDU1OlsyLDEwOV0sNTc6WzIsMTA5XSw1ODpbMiwxMDldLDYyOlsyLDEwOV0sNzg6WzIsMTA5XSw4NDpbMiwxMDldLDg1OlsyLDEwOV0sODc6WzIsMTA5XSw4ODpbMiwxMDldLDg5OlsyLDEwOV0sOTA6WzIsMTA5XSw5MTpbMiwxMDldLDkyOlsyLDEwOV0sOTM6WzIsMTA5XSw5NDpbMiwxMDldLDk1OlsyLDEwOV0sOTY6WzIsMTA5XSw5NzpbMiwxMDldLDk4OlsyLDEwOV0sOTk6WzIsMTA5XSwxMDI6WzIsMTA5XX0sezU6WzIsMTEwXSwzNzpbMiwxMTBdLDUyOlsyLDExMF0sNTQ6WzIsMTEwXSw1NTpbMiwxMTBdLDU3OlsyLDExMF0sNTg6WzIsMTEwXSw2MjpbMiwxMTBdLDc4OlsyLDExMF0sODQ6WzIsMTEwXSw4NTpbMiwxMTBdLDg3OlsyLDExMF0sODg6WzIsMTEwXSw4OTpbMiwxMTBdLDkwOlsyLDExMF0sOTE6WzIsMTEwXSw5MjpbMiwxMTBdLDkzOlsyLDExMF0sOTQ6WzIsMTEwXSw5NTpbMiwxMTBdLDk2OlsyLDExMF0sOTc6WzIsMTEwXSw5ODpbMiwxMTBdLDk5OlsyLDExMF0sMTAyOlsyLDExMF19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjMzNiw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjMzNyw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjMzOCw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjMzOSw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHs1OlsyLDExNV0sMzc6WzIsMTE1XSw1MjpbMiwxMTVdLDU0OlsyLDExNV0sNTU6WzIsMTE1XSw1NzpbMiwxMTVdLDU4OlsyLDExNV0sNjI6WzIsMTE1XSw3ODpbMiwxMTVdLDg0OlsyLDExNV0sODU6WzIsMTE1XSw4NzpbMiwxMTVdLDg4OlsyLDExNV0sODk6WzIsMTE1XSw5MDpbMiwxMTVdLDkxOlsyLDExNV0sOTI6WzIsMTE1XSw5MzpbMiwxMTVdLDk0OlsyLDExNV0sOTU6WzIsMTE1XSw5NjpbMiwxMTVdLDk3OlsyLDExNV0sOTg6WzIsMTE1XSw5OTpbMiwxMTVdLDEwMjpbMiwxMTVdfSx7NTpbMiwxNTFdLDM3OlsyLDE1MV0sNTI6WzIsMTUxXX0sezU6WzIsMTQwXSw1MjpbMiwxNDBdfSx7NTpbMiwxNDFdLDUyOlsyLDE0MV19LHs1OlsyLDkxXSw0NjpbMSwzNDBdLDg0OlsyLDkxXSw4NTpbMiw5MV0sODc6WzIsOTFdLDg4OlsyLDkxXSw4OTpbMiw5MV0sOTA6WzIsOTFdLDkxOlsyLDkxXSw5MjpbMiw5MV0sOTM6WzIsOTFdLDk0OlsyLDkxXSw5NTpbMiw5MV0sOTY6WzIsOTFdLDk3OlsyLDkxXSw5ODpbMiw5MV0sOTk6WzIsOTFdfSx7NTpbMiw5Ml0sNDY6WzEsMzQxXSw4NDpbMiw5Ml0sODU6WzIsOTJdLDg3OlsyLDkyXSw4ODpbMiw5Ml0sODk6WzIsOTJdLDkwOlsyLDkyXSw5MTpbMiw5Ml0sOTI6WzIsOTJdLDkzOlsyLDkyXSw5NDpbMiw5Ml0sOTU6WzIsOTJdLDk2OlsyLDkyXSw5NzpbMiw5Ml0sOTg6WzIsOTJdLDk5OlsyLDkyXX0sezU6WzIsNjNdLDUyOlsxLDIwMl19LHsxMDpbMiwxMjZdLDEyOlsyLDEyNl0sMzY6WzIsMTI2XSw0NDpbMiwxMjZdLDQ1OlsyLDEyNl0sODY6WzIsMTI2XSw5NjpbMiwxMjZdLDEwMzpbMiwxMjZdLDEwNDpbMiwxMjZdLDEwNTpbMiwxMjZdLDEwNjpbMiwxMjZdLDEwNzpbMiwxMjZdLDEwODpbMiwxMjZdLDEwOTpbMiwxMjZdLDExMDpbMiwxMjZdLDExMTpbMiwxMjZdLDExMjpbMiwxMjZdLDExMzpbMiwxMjZdLDExNDpbMiwxMjZdLDExNTpbMiwxMjZdLDExNjpbMiwxMjZdLDExNzpbMiwxMjZdLDExODpbMiwxMjZdLDExOTpbMiwxMjZdLDEyMDpbMiwxMjZdLDEyMTpbMiwxMjZdLDEyMjpbMiwxMjZdLDEyMzpbMiwxMjZdLDEyNDpbMiwxMjZdLDEyNjpbMiwxMjZdfSx7Mzc6WzIsMTM2XSw1MjpbMiwxMzZdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddLDEwMjpbMiwxMzZdfSx7MTA6WzIsMTI3XSwxMjpbMiwxMjddLDM2OlsyLDEyN10sNDQ6WzIsMTI3XSw0NTpbMiwxMjddLDg2OlsyLDEyN10sOTY6WzIsMTI3XSwxMDM6WzIsMTI3XSwxMDQ6WzIsMTI3XSwxMDU6WzIsMTI3XSwxMDY6WzIsMTI3XSwxMDc6WzIsMTI3XSwxMDg6WzIsMTI3XSwxMDk6WzIsMTI3XSwxMTA6WzIsMTI3XSwxMTE6WzIsMTI3XSwxMTI6WzIsMTI3XSwxMTM6WzIsMTI3XSwxMTQ6WzIsMTI3XSwxMTU6WzIsMTI3XSwxMTY6WzIsMTI3XSwxMTc6WzIsMTI3XSwxMTg6WzIsMTI3XSwxMTk6WzIsMTI3XSwxMjA6WzIsMTI3XSwxMjE6WzIsMTI3XSwxMjI6WzIsMTI3XSwxMjM6WzIsMTI3XSwxMjQ6WzIsMTI3XSwxMjY6WzIsMTI3XX0sezU6WzIsMTM0XSwzNzpbMiwxMzRdLDUyOlsyLDEzNF0sMTAyOlsyLDEzNF19LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjM0Miw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHs1MjpbMSwzNDNdfSx7NTpbMiw0MF19LHs1OlsyLDQyXSw1NTpbMSwzNDRdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7Mzc6WzEsMzQ1XSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezUyOlsxLDM0Nl0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHszNzpbMSwzNDddLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7NTI6WzEsMzQ4XSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezEwOlsyLDEyOV0sMTI6WzIsMTI5XSwzNjpbMiwxMjldLDQ0OlsyLDEyOV0sNDU6WzIsMTI5XSw4NjpbMiwxMjldLDk2OlsyLDEyOV0sMTAzOlsyLDEyOV0sMTA0OlsyLDEyOV0sMTA1OlsyLDEyOV0sMTA2OlsyLDEyOV0sMTA3OlsyLDEyOV0sMTA4OlsyLDEyOV0sMTA5OlsyLDEyOV0sMTEwOlsyLDEyOV0sMTExOlsyLDEyOV0sMTEyOlsyLDEyOV0sMTEzOlsyLDEyOV0sMTE0OlsyLDEyOV0sMTE1OlsyLDEyOV0sMTE2OlsyLDEyOV0sMTE3OlsyLDEyOV0sMTE4OlsyLDEyOV0sMTE5OlsyLDEyOV0sMTIwOlsyLDEyOV0sMTIxOlsyLDEyOV0sMTIyOlsyLDEyOV0sMTIzOlsyLDEyOV0sMTI0OlsyLDEyOV0sMTI2OlsyLDEyOV19LHsxMDpbMiwxMzBdLDEyOlsyLDEzMF0sMzY6WzIsMTMwXSw0NDpbMiwxMzBdLDQ1OlsyLDEzMF0sODY6WzIsMTMwXSw5NjpbMiwxMzBdLDEwMzpbMiwxMzBdLDEwNDpbMiwxMzBdLDEwNTpbMiwxMzBdLDEwNjpbMiwxMzBdLDEwNzpbMiwxMzBdLDEwODpbMiwxMzBdLDEwOTpbMiwxMzBdLDExMDpbMiwxMzBdLDExMTpbMiwxMzBdLDExMjpbMiwxMzBdLDExMzpbMiwxMzBdLDExNDpbMiwxMzBdLDExNTpbMiwxMzBdLDExNjpbMiwxMzBdLDExNzpbMiwxMzBdLDExODpbMiwxMzBdLDExOTpbMiwxMzBdLDEyMDpbMiwxMzBdLDEyMTpbMiwxMzBdLDEyMjpbMiwxMzBdLDEyMzpbMiwxMzBdLDEyNDpbMiwxMzBdLDEyNjpbMiwxMzBdfSx7NTpbMiwzNl0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHs0NTpbMSwzNDldfSx7MTA6WzEsNzNdLDEyOlsxLDc0XSwzNjpbMSw4Nl0sNDQ6WzEsODhdLDQ1OlsxLDg3XSw0NzozNTAsODY6WzEsODRdLDk2OlsxLDg1XSwxMDM6WzEsODldLDEwNDpbMSw5MF0sMTA1OlsxLDkxXSwxMDY6WzEsOTJdLDEwNzpbMSw5M10sMTA4OlsxLDk0XSwxMDk6WzEsOTVdLDExMDpbMSw5Nl0sMTExOlsxLDk3XSwxMTI6WzEsOThdLDExMzpbMSw5OV0sMTE0OlsxLDEwMF0sMTE1OlsxLDEwMV0sMTE2OlsxLDEwMl0sMTE3OlsxLDEwM10sMTE4OlsxLDEwNF0sMTE5OlsxLDEwNV0sMTIwOlsxLDEwNl0sMTIxOlsxLDEwN10sMTIyOlsxLDEwOF0sMTIzOlsxLDEwOV0sMTI0OlsxLDExMF0sMTI1OjExMSwxMjY6WzEsNzVdfSx7NTpbMiwxMTFdLDM3OlsyLDExMV0sNTI6WzIsMTExXSw1NDpbMiwxMTFdLDU1OlsyLDExMV0sNTc6WzIsMTExXSw1ODpbMiwxMTFdLDYyOlsyLDExMV0sNzg6WzIsMTExXSw4NDpbMiwxMTFdLDg1OlsyLDExMV0sODc6WzIsMTExXSw4ODpbMiwxMTFdLDg5OlsyLDExMV0sOTA6WzIsMTExXSw5MTpbMiwxMTFdLDkyOlsyLDExMV0sOTM6WzIsMTExXSw5NDpbMiwxMTFdLDk1OlsyLDExMV0sOTY6WzIsMTExXSw5NzpbMiwxMTFdLDk4OlsyLDExMV0sOTk6WzIsMTExXSwxMDI6WzIsMTExXX0sezEwOlsxLDczXSwxMjpbMSw3NF0sMzY6WzEsODZdLDQ0OlsxLDg4XSw0NTpbMSw4N10sNDc6MzUxLDg2OlsxLDg0XSw5NjpbMSw4NV0sMTAzOlsxLDg5XSwxMDQ6WzEsOTBdLDEwNTpbMSw5MV0sMTA2OlsxLDkyXSwxMDc6WzEsOTNdLDEwODpbMSw5NF0sMTA5OlsxLDk1XSwxMTA6WzEsOTZdLDExMTpbMSw5N10sMTEyOlsxLDk4XSwxMTM6WzEsOTldLDExNDpbMSwxMDBdLDExNTpbMSwxMDFdLDExNjpbMSwxMDJdLDExNzpbMSwxMDNdLDExODpbMSwxMDRdLDExOTpbMSwxMDVdLDEyMDpbMSwxMDZdLDEyMTpbMSwxMDddLDEyMjpbMSwxMDhdLDEyMzpbMSwxMDldLDEyNDpbMSwxMTBdLDEyNToxMTEsMTI2OlsxLDc1XX0sezU6WzIsMTEzXSwzNzpbMiwxMTNdLDUyOlsyLDExM10sNTQ6WzIsMTEzXSw1NTpbMiwxMTNdLDU3OlsyLDExM10sNTg6WzIsMTEzXSw2MjpbMiwxMTNdLDc4OlsyLDExM10sODQ6WzIsMTEzXSw4NTpbMiwxMTNdLDg3OlsyLDExM10sODg6WzIsMTEzXSw4OTpbMiwxMTNdLDkwOlsyLDExM10sOTE6WzIsMTEzXSw5MjpbMiwxMTNdLDkzOlsyLDExM10sOTQ6WzIsMTEzXSw5NTpbMiwxMTNdLDk2OlsyLDExM10sOTc6WzIsMTEzXSw5ODpbMiwxMTNdLDk5OlsyLDExM10sMTAyOlsyLDExM119LHsxMDpbMSw3M10sMTI6WzEsNzRdLDM2OlsxLDg2XSw0NDpbMSw4OF0sNDU6WzEsODddLDQ3OjM1Miw4NjpbMSw4NF0sOTY6WzEsODVdLDEwMzpbMSw4OV0sMTA0OlsxLDkwXSwxMDU6WzEsOTFdLDEwNjpbMSw5Ml0sMTA3OlsxLDkzXSwxMDg6WzEsOTRdLDEwOTpbMSw5NV0sMTEwOlsxLDk2XSwxMTE6WzEsOTddLDExMjpbMSw5OF0sMTEzOlsxLDk5XSwxMTQ6WzEsMTAwXSwxMTU6WzEsMTAxXSwxMTY6WzEsMTAyXSwxMTc6WzEsMTAzXSwxMTg6WzEsMTA0XSwxMTk6WzEsMTA1XSwxMjA6WzEsMTA2XSwxMjE6WzEsMTA3XSwxMjI6WzEsMTA4XSwxMjM6WzEsMTA5XSwxMjQ6WzEsMTEwXSwxMjU6MTExLDEyNjpbMSw3NV19LHs1OlsyLDM5XX0sezU6WzIsNDFdLDg0OlsxLDE1M10sODU6WzEsMTU0XSw4NzpbMSwxNTVdLDg4OlsxLDE1Nl0sODk6WzEsMTU3XSw5MDpbMSwxNThdLDkxOlsxLDE1OV0sOTI6WzEsMTYwXSw5MzpbMSwxNjFdLDk0OlsxLDE2Ml0sOTU6WzEsMTYzXSw5NjpbMSwxNjRdLDk3OlsxLDE2NV0sOTg6WzEsMTY2XSw5OTpbMSwxNjddfSx7Mzc6WzEsMzUzXSw4NDpbMSwxNTNdLDg1OlsxLDE1NF0sODc6WzEsMTU1XSw4ODpbMSwxNTZdLDg5OlsxLDE1N10sOTA6WzEsMTU4XSw5MTpbMSwxNTldLDkyOlsxLDE2MF0sOTM6WzEsMTYxXSw5NDpbMSwxNjJdLDk1OlsxLDE2M10sOTY6WzEsMTY0XSw5NzpbMSwxNjVdLDk4OlsxLDE2Nl0sOTk6WzEsMTY3XX0sezM3OlsxLDM1NF0sODQ6WzEsMTUzXSw4NTpbMSwxNTRdLDg3OlsxLDE1NV0sODg6WzEsMTU2XSw4OTpbMSwxNTddLDkwOlsxLDE1OF0sOTE6WzEsMTU5XSw5MjpbMSwxNjBdLDkzOlsxLDE2MV0sOTQ6WzEsMTYyXSw5NTpbMSwxNjNdLDk2OlsxLDE2NF0sOTc6WzEsMTY1XSw5ODpbMSwxNjZdLDk5OlsxLDE2N119LHs1OlsyLDExMl0sMzc6WzIsMTEyXSw1MjpbMiwxMTJdLDU0OlsyLDExMl0sNTU6WzIsMTEyXSw1NzpbMiwxMTJdLDU4OlsyLDExMl0sNjI6WzIsMTEyXSw3ODpbMiwxMTJdLDg0OlsyLDExMl0sODU6WzIsMTEyXSw4NzpbMiwxMTJdLDg4OlsyLDExMl0sODk6WzIsMTEyXSw5MDpbMiwxMTJdLDkxOlsyLDExMl0sOTI6WzIsMTEyXSw5MzpbMiwxMTJdLDk0OlsyLDExMl0sOTU6WzIsMTEyXSw5NjpbMiwxMTJdLDk3OlsyLDExMl0sOTg6WzIsMTEyXSw5OTpbMiwxMTJdLDEwMjpbMiwxMTJdfSx7NTpbMiwxMTRdLDM3OlsyLDExNF0sNTI6WzIsMTE0XSw1NDpbMiwxMTRdLDU1OlsyLDExNF0sNTc6WzIsMTE0XSw1ODpbMiwxMTRdLDYyOlsyLDExNF0sNzg6WzIsMTE0XSw4NDpbMiwxMTRdLDg1OlsyLDExNF0sODc6WzIsMTE0XSw4ODpbMiwxMTRdLDg5OlsyLDExNF0sOTA6WzIsMTE0XSw5MTpbMiwxMTRdLDkyOlsyLDExNF0sOTM6WzIsMTE0XSw5NDpbMiwxMTRdLDk1OlsyLDExNF0sOTY6WzIsMTE0XSw5NzpbMiwxMTRdLDk4OlsyLDExNF0sOTk6WzIsMTE0XSwxMDI6WzIsMTE0XX1dLFxuZGVmYXVsdEFjdGlvbnM6IHs1OlsyLDldLDc6WzIsMTFdLDg6WzIsMTJdLDk6WzIsMTNdLDEwOlsyLDE0XSwxMTpbMiwxNV0sMTI6WzIsMTZdLDEzOlsyLDE3XSwxNDpbMiwxOF0sMTU6WzIsMTldLDE2OlsyLDIwXSwxODpbMiwyMl0sMTk6WzIsMjNdLDIwOlsyLDI0XSwyMTpbMiwyNV0sMjI6WzIsMjZdLDIzOlsyLDI3XSwyNDpbMiwyOF0sMjU6WzIsMjldLDI2OlsyLDMwXSwyNzpbMiwzMV0sMzA6WzIsNl0sMzc6WzIsMzhdLDUxOlsyLDY1XSw1NDpbMiw2OV0sNTU6WzIsNzBdLDU2OlsyLDcxXSw1OTpbMiwyXSw2MjpbMiw4XSw2MzpbMiwxMF0sNjQ6WzIsN10sNjc6WzIsMzNdLDEzMTpbMiw1OV0sMTM2OlsyLDY4XSwxNDA6WzIsMV0sMTUxOlsyLDQzXSwyMTk6WzIsMzJdLDI3MjpbMiw0OF0sMjczOlsyLDQ5XSwyNzQ6WzIsNTBdLDI4MzpbMiw1N10sMjg0OlsyLDU4XSwzMzQ6WzIsNDBdLDM0OTpbMiwzOV19LFxucGFyc2VFcnJvcjogZnVuY3Rpb24gcGFyc2VFcnJvcihzdHIsIGhhc2gpIHtcbiAgICBpZiAoaGFzaC5yZWNvdmVyYWJsZSkge1xuICAgICAgICB0aGlzLnRyYWNlKHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHN0cik7XG4gICAgfVxufSxcbnBhcnNlOiBmdW5jdGlvbiBwYXJzZShpbnB1dCkge1xuICAgIHZhciBzZWxmID0gdGhpcywgc3RhY2sgPSBbMF0sIHZzdGFjayA9IFtudWxsXSwgbHN0YWNrID0gW10sIHRhYmxlID0gdGhpcy50YWJsZSwgeXl0ZXh0ID0gJycsIHl5bGluZW5vID0gMCwgeXlsZW5nID0gMCwgcmVjb3ZlcmluZyA9IDAsIFRFUlJPUiA9IDIsIEVPRiA9IDE7XG4gICAgdmFyIGFyZ3MgPSBsc3RhY2suc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHRoaXMubGV4ZXIuc2V0SW5wdXQoaW5wdXQpO1xuICAgIHRoaXMubGV4ZXIueXkgPSB0aGlzLnl5O1xuICAgIHRoaXMueXkubGV4ZXIgPSB0aGlzLmxleGVyO1xuICAgIHRoaXMueXkucGFyc2VyID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHRoaXMubGV4ZXIueXlsbG9jID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMubGV4ZXIueXlsbG9jID0ge307XG4gICAgfVxuICAgIHZhciB5eWxvYyA9IHRoaXMubGV4ZXIueXlsbG9jO1xuICAgIGxzdGFjay5wdXNoKHl5bG9jKTtcbiAgICB2YXIgcmFuZ2VzID0gdGhpcy5sZXhlci5vcHRpb25zICYmIHRoaXMubGV4ZXIub3B0aW9ucy5yYW5nZXM7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnl5LnBhcnNlRXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5wYXJzZUVycm9yID0gdGhpcy55eS5wYXJzZUVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFyc2VFcnJvciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5wYXJzZUVycm9yO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb3BTdGFjayhuKSB7XG4gICAgICAgIHN0YWNrLmxlbmd0aCA9IHN0YWNrLmxlbmd0aCAtIDIgKiBuO1xuICAgICAgICB2c3RhY2subGVuZ3RoID0gdnN0YWNrLmxlbmd0aCAtIG47XG4gICAgICAgIGxzdGFjay5sZW5ndGggPSBsc3RhY2subGVuZ3RoIC0gbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGV4KCkge1xuICAgICAgICB2YXIgdG9rZW47XG4gICAgICAgIHRva2VuID0gc2VsZi5sZXhlci5sZXgoKSB8fCBFT0Y7XG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHNlbGYuc3ltYm9sc19bdG9rZW5dIHx8IHRva2VuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gICAgdmFyIHN5bWJvbCwgcHJlRXJyb3JTeW1ib2wsIHN0YXRlLCBhY3Rpb24sIGEsIHIsIHl5dmFsID0ge30sIHAsIGxlbiwgbmV3U3RhdGUsIGV4cGVjdGVkO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHN0YXRlID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRBY3Rpb25zW3N0YXRlXSkge1xuICAgICAgICAgICAgYWN0aW9uID0gdGhpcy5kZWZhdWx0QWN0aW9uc1tzdGF0ZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc3ltYm9sID09PSBudWxsIHx8IHR5cGVvZiBzeW1ib2wgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSBsZXgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjdGlvbiA9IHRhYmxlW3N0YXRlXSAmJiB0YWJsZVtzdGF0ZV1bc3ltYm9sXTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ3VuZGVmaW5lZCcgfHwgIWFjdGlvbi5sZW5ndGggfHwgIWFjdGlvblswXSkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJTdHIgPSAnJztcbiAgICAgICAgICAgICAgICBleHBlY3RlZCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAocCBpbiB0YWJsZVtzdGF0ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGVybWluYWxzX1twXSAmJiBwID4gVEVSUk9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZC5wdXNoKCdcXCcnICsgdGhpcy50ZXJtaW5hbHNfW3BdICsgJ1xcJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxleGVyLnNob3dQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBlcnJTdHIgPSAnUGFyc2UgZXJyb3Igb24gbGluZSAnICsgKHl5bGluZW5vICsgMSkgKyAnOlxcbicgKyB0aGlzLmxleGVyLnNob3dQb3NpdGlvbigpICsgJ1xcbkV4cGVjdGluZyAnICsgZXhwZWN0ZWQuam9pbignLCAnKSArICcsIGdvdCBcXCcnICsgKHRoaXMudGVybWluYWxzX1tzeW1ib2xdIHx8IHN5bWJvbCkgKyAnXFwnJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlcnJTdHIgPSAnUGFyc2UgZXJyb3Igb24gbGluZSAnICsgKHl5bGluZW5vICsgMSkgKyAnOiBVbmV4cGVjdGVkICcgKyAoc3ltYm9sID09IEVPRiA/ICdlbmQgb2YgaW5wdXQnIDogJ1xcJycgKyAodGhpcy50ZXJtaW5hbHNfW3N5bWJvbF0gfHwgc3ltYm9sKSArICdcXCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUVycm9yKGVyclN0ciwge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmxleGVyLm1hdGNoLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogdGhpcy50ZXJtaW5hbHNfW3N5bWJvbF0gfHwgc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiB0aGlzLmxleGVyLnl5bGluZW5vLFxuICAgICAgICAgICAgICAgICAgICBsb2M6IHl5bG9jLFxuICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvblswXSBpbnN0YW5jZW9mIEFycmF5ICYmIGFjdGlvbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcnNlIEVycm9yOiBtdWx0aXBsZSBhY3Rpb25zIHBvc3NpYmxlIGF0IHN0YXRlOiAnICsgc3RhdGUgKyAnLCB0b2tlbjogJyArIHN5bWJvbCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChhY3Rpb25bMF0pIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgc3RhY2sucHVzaChzeW1ib2wpO1xuICAgICAgICAgICAgdnN0YWNrLnB1c2godGhpcy5sZXhlci55eXRleHQpO1xuICAgICAgICAgICAgbHN0YWNrLnB1c2godGhpcy5sZXhlci55eWxsb2MpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChhY3Rpb25bMV0pO1xuICAgICAgICAgICAgc3ltYm9sID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghcHJlRXJyb3JTeW1ib2wpIHtcbiAgICAgICAgICAgICAgICB5eWxlbmcgPSB0aGlzLmxleGVyLnl5bGVuZztcbiAgICAgICAgICAgICAgICB5eXRleHQgPSB0aGlzLmxleGVyLnl5dGV4dDtcbiAgICAgICAgICAgICAgICB5eWxpbmVubyA9IHRoaXMubGV4ZXIueXlsaW5lbm87XG4gICAgICAgICAgICAgICAgeXlsb2MgPSB0aGlzLmxleGVyLnl5bGxvYztcbiAgICAgICAgICAgICAgICBpZiAocmVjb3ZlcmluZyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3ZlcmluZy0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3ltYm9sID0gcHJlRXJyb3JTeW1ib2w7XG4gICAgICAgICAgICAgICAgcHJlRXJyb3JTeW1ib2wgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGxlbiA9IHRoaXMucHJvZHVjdGlvbnNfW2FjdGlvblsxXV1bMV07XG4gICAgICAgICAgICB5eXZhbC4kID0gdnN0YWNrW3ZzdGFjay5sZW5ndGggLSBsZW5dO1xuICAgICAgICAgICAgeXl2YWwuXyQgPSB7XG4gICAgICAgICAgICAgICAgZmlyc3RfbGluZTogbHN0YWNrW2xzdGFjay5sZW5ndGggLSAobGVuIHx8IDEpXS5maXJzdF9saW5lLFxuICAgICAgICAgICAgICAgIGxhc3RfbGluZTogbHN0YWNrW2xzdGFjay5sZW5ndGggLSAxXS5sYXN0X2xpbmUsXG4gICAgICAgICAgICAgICAgZmlyc3RfY29sdW1uOiBsc3RhY2tbbHN0YWNrLmxlbmd0aCAtIChsZW4gfHwgMSldLmZpcnN0X2NvbHVtbixcbiAgICAgICAgICAgICAgICBsYXN0X2NvbHVtbjogbHN0YWNrW2xzdGFjay5sZW5ndGggLSAxXS5sYXN0X2NvbHVtblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChyYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB5eXZhbC5fJC5yYW5nZSA9IFtcbiAgICAgICAgICAgICAgICAgICAgbHN0YWNrW2xzdGFjay5sZW5ndGggLSAobGVuIHx8IDEpXS5yYW5nZVswXSxcbiAgICAgICAgICAgICAgICAgICAgbHN0YWNrW2xzdGFjay5sZW5ndGggLSAxXS5yYW5nZVsxXVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByID0gdGhpcy5wZXJmb3JtQWN0aW9uLmFwcGx5KHl5dmFsLCBbXG4gICAgICAgICAgICAgICAgeXl0ZXh0LFxuICAgICAgICAgICAgICAgIHl5bGVuZyxcbiAgICAgICAgICAgICAgICB5eWxpbmVubyxcbiAgICAgICAgICAgICAgICB0aGlzLnl5LFxuICAgICAgICAgICAgICAgIGFjdGlvblsxXSxcbiAgICAgICAgICAgICAgICB2c3RhY2ssXG4gICAgICAgICAgICAgICAgbHN0YWNrXG4gICAgICAgICAgICBdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVuKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sgPSBzdGFjay5zbGljZSgwLCAtMSAqIGxlbiAqIDIpO1xuICAgICAgICAgICAgICAgIHZzdGFjayA9IHZzdGFjay5zbGljZSgwLCAtMSAqIGxlbik7XG4gICAgICAgICAgICAgICAgbHN0YWNrID0gbHN0YWNrLnNsaWNlKDAsIC0xICogbGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YWNrLnB1c2godGhpcy5wcm9kdWN0aW9uc19bYWN0aW9uWzFdXVswXSk7XG4gICAgICAgICAgICB2c3RhY2sucHVzaCh5eXZhbC4kKTtcbiAgICAgICAgICAgIGxzdGFjay5wdXNoKHl5dmFsLl8kKTtcbiAgICAgICAgICAgIG5ld1N0YXRlID0gdGFibGVbc3RhY2tbc3RhY2subGVuZ3RoIC0gMl1dW3N0YWNrW3N0YWNrLmxlbmd0aCAtIDFdXTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobmV3U3RhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufX07XG5cblxuICAgIGthdHJhID0gcmVxdWlyZSgnLi9rYXRyYScpO1xuICAgIGNvbW1hbmQgPSBrYXRyYS5jb21tYW5kO1xuICAgIGtleXdvcmQgPSBrYXRyYS5rZXl3b3JkO1xuLyogZ2VuZXJhdGVkIGJ5IGppc29uLWxleCAwLjIuMSAqL1xudmFyIGxleGVyID0gKGZ1bmN0aW9uKCl7XG52YXIgbGV4ZXIgPSB7XG5cbkVPRjoxLFxuXG5wYXJzZUVycm9yOmZ1bmN0aW9uIHBhcnNlRXJyb3Ioc3RyLCBoYXNoKSB7XG4gICAgICAgIGlmICh0aGlzLnl5LnBhcnNlcikge1xuICAgICAgICAgICAgdGhpcy55eS5wYXJzZXIucGFyc2VFcnJvcihzdHIsIGhhc2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHN0cik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4vLyByZXNldHMgdGhlIGxleGVyLCBzZXRzIG5ldyBpbnB1dFxuc2V0SW5wdXQ6ZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMuX21vcmUgPSB0aGlzLl9iYWNrdHJhY2sgPSB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy55eWxpbmVubyA9IHRoaXMueXlsZW5nID0gMDtcbiAgICAgICAgdGhpcy55eXRleHQgPSB0aGlzLm1hdGNoZWQgPSB0aGlzLm1hdGNoID0gJyc7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uU3RhY2sgPSBbJ0lOSVRJQUwnXTtcbiAgICAgICAgdGhpcy55eWxsb2MgPSB7XG4gICAgICAgICAgICBmaXJzdF9saW5lOiAxLFxuICAgICAgICAgICAgZmlyc3RfY29sdW1uOiAwLFxuICAgICAgICAgICAgbGFzdF9saW5lOiAxLFxuICAgICAgICAgICAgbGFzdF9jb2x1bW46IDBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMueXlsbG9jLnJhbmdlID0gWzAsMF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4vLyBjb25zdW1lcyBhbmQgcmV0dXJucyBvbmUgY2hhciBmcm9tIHRoZSBpbnB1dFxuaW5wdXQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2ggPSB0aGlzLl9pbnB1dFswXTtcbiAgICAgICAgdGhpcy55eXRleHQgKz0gY2g7XG4gICAgICAgIHRoaXMueXlsZW5nKys7XG4gICAgICAgIHRoaXMub2Zmc2V0Kys7XG4gICAgICAgIHRoaXMubWF0Y2ggKz0gY2g7XG4gICAgICAgIHRoaXMubWF0Y2hlZCArPSBjaDtcbiAgICAgICAgdmFyIGxpbmVzID0gY2gubWF0Y2goLyg/Olxcclxcbj98XFxuKS4qL2cpO1xuICAgICAgICBpZiAobGluZXMpIHtcbiAgICAgICAgICAgIHRoaXMueXlsaW5lbm8rKztcbiAgICAgICAgICAgIHRoaXMueXlsbG9jLmxhc3RfbGluZSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy55eWxsb2MubGFzdF9jb2x1bW4rKztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJhbmdlcykge1xuICAgICAgICAgICAgdGhpcy55eWxsb2MucmFuZ2VbMV0rKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lucHV0ID0gdGhpcy5faW5wdXQuc2xpY2UoMSk7XG4gICAgICAgIHJldHVybiBjaDtcbiAgICB9LFxuXG4vLyB1bnNoaWZ0cyBvbmUgY2hhciAob3IgYSBzdHJpbmcpIGludG8gdGhlIGlucHV0XG51bnB1dDpmdW5jdGlvbiAoY2gpIHtcbiAgICAgICAgdmFyIGxlbiA9IGNoLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpbmVzID0gY2guc3BsaXQoLyg/Olxcclxcbj98XFxuKS9nKTtcblxuICAgICAgICB0aGlzLl9pbnB1dCA9IGNoICsgdGhpcy5faW5wdXQ7XG4gICAgICAgIHRoaXMueXl0ZXh0ID0gdGhpcy55eXRleHQuc3Vic3RyKDAsIHRoaXMueXl0ZXh0Lmxlbmd0aCAtIGxlbiAtIDEpO1xuICAgICAgICAvL3RoaXMueXlsZW5nIC09IGxlbjtcbiAgICAgICAgdGhpcy5vZmZzZXQgLT0gbGVuO1xuICAgICAgICB2YXIgb2xkTGluZXMgPSB0aGlzLm1hdGNoLnNwbGl0KC8oPzpcXHJcXG4/fFxcbikvZyk7XG4gICAgICAgIHRoaXMubWF0Y2ggPSB0aGlzLm1hdGNoLnN1YnN0cigwLCB0aGlzLm1hdGNoLmxlbmd0aCAtIDEpO1xuICAgICAgICB0aGlzLm1hdGNoZWQgPSB0aGlzLm1hdGNoZWQuc3Vic3RyKDAsIHRoaXMubWF0Y2hlZC5sZW5ndGggLSAxKTtcblxuICAgICAgICBpZiAobGluZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy55eWxpbmVubyAtPSBsaW5lcy5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIHZhciByID0gdGhpcy55eWxsb2MucmFuZ2U7XG5cbiAgICAgICAgdGhpcy55eWxsb2MgPSB7XG4gICAgICAgICAgICBmaXJzdF9saW5lOiB0aGlzLnl5bGxvYy5maXJzdF9saW5lLFxuICAgICAgICAgICAgbGFzdF9saW5lOiB0aGlzLnl5bGluZW5vICsgMSxcbiAgICAgICAgICAgIGZpcnN0X2NvbHVtbjogdGhpcy55eWxsb2MuZmlyc3RfY29sdW1uLFxuICAgICAgICAgICAgbGFzdF9jb2x1bW46IGxpbmVzID9cbiAgICAgICAgICAgICAgICAobGluZXMubGVuZ3RoID09PSBvbGRMaW5lcy5sZW5ndGggPyB0aGlzLnl5bGxvYy5maXJzdF9jb2x1bW4gOiAwKVxuICAgICAgICAgICAgICAgICArIG9sZExpbmVzW29sZExpbmVzLmxlbmd0aCAtIGxpbmVzLmxlbmd0aF0ubGVuZ3RoIC0gbGluZXNbMF0ubGVuZ3RoIDpcbiAgICAgICAgICAgICAgdGhpcy55eWxsb2MuZmlyc3RfY29sdW1uIC0gbGVuXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMueXlsbG9jLnJhbmdlID0gW3JbMF0sIHJbMF0gKyB0aGlzLnl5bGVuZyAtIGxlbl07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy55eWxlbmcgPSB0aGlzLnl5dGV4dC5sZW5ndGg7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbi8vIFdoZW4gY2FsbGVkIGZyb20gYWN0aW9uLCBjYWNoZXMgbWF0Y2hlZCB0ZXh0IGFuZCBhcHBlbmRzIGl0IG9uIG5leHQgYWN0aW9uXG5tb3JlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbW9yZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbi8vIFdoZW4gY2FsbGVkIGZyb20gYWN0aW9uLCBzaWduYWxzIHRoZSBsZXhlciB0aGF0IHRoaXMgcnVsZSBmYWlscyB0byBtYXRjaCB0aGUgaW5wdXQsIHNvIHRoZSBuZXh0IG1hdGNoaW5nIHJ1bGUgKHJlZ2V4KSBzaG91bGQgYmUgdGVzdGVkIGluc3RlYWQuXG5yZWplY3Q6ZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhY2t0cmFja19sZXhlcikge1xuICAgICAgICAgICAgdGhpcy5fYmFja3RyYWNrID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlRXJyb3IoJ0xleGljYWwgZXJyb3Igb24gbGluZSAnICsgKHRoaXMueXlsaW5lbm8gKyAxKSArICcuIFlvdSBjYW4gb25seSBpbnZva2UgcmVqZWN0KCkgaW4gdGhlIGxleGVyIHdoZW4gdGhlIGxleGVyIGlzIG9mIHRoZSBiYWNrdHJhY2tpbmcgcGVyc3Vhc2lvbiAob3B0aW9ucy5iYWNrdHJhY2tfbGV4ZXIgPSB0cnVlKS5cXG4nICsgdGhpcy5zaG93UG9zaXRpb24oKSwge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IG51bGwsXG4gICAgICAgICAgICAgICAgbGluZTogdGhpcy55eWxpbmVub1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4vLyByZXRhaW4gZmlyc3QgbiBjaGFyYWN0ZXJzIG9mIHRoZSBtYXRjaFxubGVzczpmdW5jdGlvbiAobikge1xuICAgICAgICB0aGlzLnVucHV0KHRoaXMubWF0Y2guc2xpY2UobikpO1xuICAgIH0sXG5cbi8vIGRpc3BsYXlzIGFscmVhZHkgbWF0Y2hlZCBpbnB1dCwgaS5lLiBmb3IgZXJyb3IgbWVzc2FnZXNcbnBhc3RJbnB1dDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXN0ID0gdGhpcy5tYXRjaGVkLnN1YnN0cigwLCB0aGlzLm1hdGNoZWQubGVuZ3RoIC0gdGhpcy5tYXRjaC5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gKHBhc3QubGVuZ3RoID4gMjAgPyAnLi4uJzonJykgKyBwYXN0LnN1YnN0cigtMjApLnJlcGxhY2UoL1xcbi9nLCBcIlwiKTtcbiAgICB9LFxuXG4vLyBkaXNwbGF5cyB1cGNvbWluZyBpbnB1dCwgaS5lLiBmb3IgZXJyb3IgbWVzc2FnZXNcbnVwY29taW5nSW5wdXQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV4dCA9IHRoaXMubWF0Y2g7XG4gICAgICAgIGlmIChuZXh0Lmxlbmd0aCA8IDIwKSB7XG4gICAgICAgICAgICBuZXh0ICs9IHRoaXMuX2lucHV0LnN1YnN0cigwLCAyMC1uZXh0Lmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChuZXh0LnN1YnN0cigwLDIwKSArIChuZXh0Lmxlbmd0aCA+IDIwID8gJy4uLicgOiAnJykpLnJlcGxhY2UoL1xcbi9nLCBcIlwiKTtcbiAgICB9LFxuXG4vLyBkaXNwbGF5cyB0aGUgY2hhcmFjdGVyIHBvc2l0aW9uIHdoZXJlIHRoZSBsZXhpbmcgZXJyb3Igb2NjdXJyZWQsIGkuZS4gZm9yIGVycm9yIG1lc3NhZ2VzXG5zaG93UG9zaXRpb246ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJlID0gdGhpcy5wYXN0SW5wdXQoKTtcbiAgICAgICAgdmFyIGMgPSBuZXcgQXJyYXkocHJlLmxlbmd0aCArIDEpLmpvaW4oXCItXCIpO1xuICAgICAgICByZXR1cm4gcHJlICsgdGhpcy51cGNvbWluZ0lucHV0KCkgKyBcIlxcblwiICsgYyArIFwiXlwiO1xuICAgIH0sXG5cbi8vIHRlc3QgdGhlIGxleGVkIHRva2VuOiByZXR1cm4gRkFMU0Ugd2hlbiBub3QgYSBtYXRjaCwgb3RoZXJ3aXNlIHJldHVybiB0b2tlblxudGVzdF9tYXRjaDpmdW5jdGlvbiAobWF0Y2gsIGluZGV4ZWRfcnVsZSkge1xuICAgICAgICB2YXIgdG9rZW4sXG4gICAgICAgICAgICBsaW5lcyxcbiAgICAgICAgICAgIGJhY2t1cDtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhY2t0cmFja19sZXhlcikge1xuICAgICAgICAgICAgLy8gc2F2ZSBjb250ZXh0XG4gICAgICAgICAgICBiYWNrdXAgPSB7XG4gICAgICAgICAgICAgICAgeXlsaW5lbm86IHRoaXMueXlsaW5lbm8sXG4gICAgICAgICAgICAgICAgeXlsbG9jOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0X2xpbmU6IHRoaXMueXlsbG9jLmZpcnN0X2xpbmUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RfbGluZTogdGhpcy5sYXN0X2xpbmUsXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0X2NvbHVtbjogdGhpcy55eWxsb2MuZmlyc3RfY29sdW1uLFxuICAgICAgICAgICAgICAgICAgICBsYXN0X2NvbHVtbjogdGhpcy55eWxsb2MubGFzdF9jb2x1bW5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHl5dGV4dDogdGhpcy55eXRleHQsXG4gICAgICAgICAgICAgICAgbWF0Y2g6IHRoaXMubWF0Y2gsXG4gICAgICAgICAgICAgICAgbWF0Y2hlczogdGhpcy5tYXRjaGVzLFxuICAgICAgICAgICAgICAgIG1hdGNoZWQ6IHRoaXMubWF0Y2hlZCxcbiAgICAgICAgICAgICAgICB5eWxlbmc6IHRoaXMueXlsZW5nLFxuICAgICAgICAgICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQsXG4gICAgICAgICAgICAgICAgX21vcmU6IHRoaXMuX21vcmUsXG4gICAgICAgICAgICAgICAgX2lucHV0OiB0aGlzLl9pbnB1dCxcbiAgICAgICAgICAgICAgICB5eTogdGhpcy55eSxcbiAgICAgICAgICAgICAgICBjb25kaXRpb25TdGFjazogdGhpcy5jb25kaXRpb25TdGFjay5zbGljZSgwKSxcbiAgICAgICAgICAgICAgICBkb25lOiB0aGlzLmRvbmVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJhbmdlcykge1xuICAgICAgICAgICAgICAgIGJhY2t1cC55eWxsb2MucmFuZ2UgPSB0aGlzLnl5bGxvYy5yYW5nZS5zbGljZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxpbmVzID0gbWF0Y2hbMF0ubWF0Y2goLyg/Olxcclxcbj98XFxuKS4qL2cpO1xuICAgICAgICBpZiAobGluZXMpIHtcbiAgICAgICAgICAgIHRoaXMueXlsaW5lbm8gKz0gbGluZXMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueXlsbG9jID0ge1xuICAgICAgICAgICAgZmlyc3RfbGluZTogdGhpcy55eWxsb2MubGFzdF9saW5lLFxuICAgICAgICAgICAgbGFzdF9saW5lOiB0aGlzLnl5bGluZW5vICsgMSxcbiAgICAgICAgICAgIGZpcnN0X2NvbHVtbjogdGhpcy55eWxsb2MubGFzdF9jb2x1bW4sXG4gICAgICAgICAgICBsYXN0X2NvbHVtbjogbGluZXMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdLmxlbmd0aCAtIGxpbmVzW2xpbmVzLmxlbmd0aCAtIDFdLm1hdGNoKC9cXHI/XFxuPy8pWzBdLmxlbmd0aCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55eWxsb2MubGFzdF9jb2x1bW4gKyBtYXRjaFswXS5sZW5ndGhcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy55eXRleHQgKz0gbWF0Y2hbMF07XG4gICAgICAgIHRoaXMubWF0Y2ggKz0gbWF0Y2hbMF07XG4gICAgICAgIHRoaXMubWF0Y2hlcyA9IG1hdGNoO1xuICAgICAgICB0aGlzLnl5bGVuZyA9IHRoaXMueXl0ZXh0Lmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMueXlsbG9jLnJhbmdlID0gW3RoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArPSB0aGlzLnl5bGVuZ107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9yZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9iYWNrdHJhY2sgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5wdXQgPSB0aGlzLl9pbnB1dC5zbGljZShtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICB0aGlzLm1hdGNoZWQgKz0gbWF0Y2hbMF07XG4gICAgICAgIHRva2VuID0gdGhpcy5wZXJmb3JtQWN0aW9uLmNhbGwodGhpcywgdGhpcy55eSwgdGhpcywgaW5kZXhlZF9ydWxlLCB0aGlzLmNvbmRpdGlvblN0YWNrW3RoaXMuY29uZGl0aW9uU3RhY2subGVuZ3RoIC0gMV0pO1xuICAgICAgICBpZiAodGhpcy5kb25lICYmIHRoaXMuX2lucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9iYWNrdHJhY2spIHtcbiAgICAgICAgICAgIC8vIHJlY292ZXIgY29udGV4dFxuICAgICAgICAgICAgZm9yICh2YXIgayBpbiBiYWNrdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tdID0gYmFja3VwW2tdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBydWxlIGFjdGlvbiBjYWxsZWQgcmVqZWN0KCkgaW1wbHlpbmcgdGhlIG5leHQgcnVsZSBzaG91bGQgYmUgdGVzdGVkIGluc3RlYWQuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbi8vIHJldHVybiBuZXh0IG1hdGNoIGluIGlucHV0XG5uZXh0OmZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuRU9GO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5faW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9rZW4sXG4gICAgICAgICAgICBtYXRjaCxcbiAgICAgICAgICAgIHRlbXBNYXRjaCxcbiAgICAgICAgICAgIGluZGV4O1xuICAgICAgICBpZiAoIXRoaXMuX21vcmUpIHtcbiAgICAgICAgICAgIHRoaXMueXl0ZXh0ID0gJyc7XG4gICAgICAgICAgICB0aGlzLm1hdGNoID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJ1bGVzID0gdGhpcy5fY3VycmVudFJ1bGVzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRlbXBNYXRjaCA9IHRoaXMuX2lucHV0Lm1hdGNoKHRoaXMucnVsZXNbcnVsZXNbaV1dKTtcbiAgICAgICAgICAgIGlmICh0ZW1wTWF0Y2ggJiYgKCFtYXRjaCB8fCB0ZW1wTWF0Y2hbMF0ubGVuZ3RoID4gbWF0Y2hbMF0ubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gdGVtcE1hdGNoO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJhY2t0cmFja19sZXhlcikge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHRoaXMudGVzdF9tYXRjaCh0ZW1wTWF0Y2gsIHJ1bGVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JhY2t0cmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBydWxlIGFjdGlvbiBjYWxsZWQgcmVqZWN0KCkgaW1wbHlpbmcgYSBydWxlIE1JU21hdGNoLlxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZTogdGhpcyBpcyBhIGxleGVyIHJ1bGUgd2hpY2ggY29uc3VtZXMgaW5wdXQgd2l0aG91dCBwcm9kdWNpbmcgYSB0b2tlbiAoZS5nLiB3aGl0ZXNwYWNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLmZsZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdG9rZW4gPSB0aGlzLnRlc3RfbWF0Y2gobWF0Y2gsIHJ1bGVzW2luZGV4XSk7XG4gICAgICAgICAgICBpZiAodG9rZW4gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZWxzZTogdGhpcyBpcyBhIGxleGVyIHJ1bGUgd2hpY2ggY29uc3VtZXMgaW5wdXQgd2l0aG91dCBwcm9kdWNpbmcgYSB0b2tlbiAoZS5nLiB3aGl0ZXNwYWNlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pbnB1dCA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuRU9GO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VFcnJvcignTGV4aWNhbCBlcnJvciBvbiBsaW5lICcgKyAodGhpcy55eWxpbmVubyArIDEpICsgJy4gVW5yZWNvZ25pemVkIHRleHQuXFxuJyArIHRoaXMuc2hvd1Bvc2l0aW9uKCksIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpbmU6IHRoaXMueXlsaW5lbm9cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuLy8gcmV0dXJuIG5leHQgbWF0Y2ggdGhhdCBoYXMgYSB0b2tlblxubGV4OmZ1bmN0aW9uIGxleCgpIHtcbiAgICAgICAgdmFyIHIgPSB0aGlzLm5leHQoKTtcbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGV4KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4vLyBhY3RpdmF0ZXMgYSBuZXcgbGV4ZXIgY29uZGl0aW9uIHN0YXRlIChwdXNoZXMgdGhlIG5ldyBsZXhlciBjb25kaXRpb24gc3RhdGUgb250byB0aGUgY29uZGl0aW9uIHN0YWNrKVxuYmVnaW46ZnVuY3Rpb24gYmVnaW4oY29uZGl0aW9uKSB7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uU3RhY2sucHVzaChjb25kaXRpb24pO1xuICAgIH0sXG5cbi8vIHBvcCB0aGUgcHJldmlvdXNseSBhY3RpdmUgbGV4ZXIgY29uZGl0aW9uIHN0YXRlIG9mZiB0aGUgY29uZGl0aW9uIHN0YWNrXG5wb3BTdGF0ZTpmdW5jdGlvbiBwb3BTdGF0ZSgpIHtcbiAgICAgICAgdmFyIG4gPSB0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aCAtIDE7XG4gICAgICAgIGlmIChuID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uU3RhY2sucG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25kaXRpb25TdGFja1swXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbi8vIHByb2R1Y2UgdGhlIGxleGVyIHJ1bGUgc2V0IHdoaWNoIGlzIGFjdGl2ZSBmb3IgdGhlIGN1cnJlbnRseSBhY3RpdmUgbGV4ZXIgY29uZGl0aW9uIHN0YXRlXG5fY3VycmVudFJ1bGVzOmZ1bmN0aW9uIF9jdXJyZW50UnVsZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aCAmJiB0aGlzLmNvbmRpdGlvblN0YWNrW3RoaXMuY29uZGl0aW9uU3RhY2subGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvbnNbdGhpcy5jb25kaXRpb25TdGFja1t0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aCAtIDFdXS5ydWxlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvbnNbXCJJTklUSUFMXCJdLnJ1bGVzO1xuICAgICAgICB9XG4gICAgfSxcblxuLy8gcmV0dXJuIHRoZSBjdXJyZW50bHkgYWN0aXZlIGxleGVyIGNvbmRpdGlvbiBzdGF0ZTsgd2hlbiBhbiBpbmRleCBhcmd1bWVudCBpcyBwcm92aWRlZCBpdCBwcm9kdWNlcyB0aGUgTi10aCBwcmV2aW91cyBjb25kaXRpb24gc3RhdGUsIGlmIGF2YWlsYWJsZVxudG9wU3RhdGU6ZnVuY3Rpb24gdG9wU3RhdGUobikge1xuICAgICAgICBuID0gdGhpcy5jb25kaXRpb25TdGFjay5sZW5ndGggLSAxIC0gTWF0aC5hYnMobiB8fCAwKTtcbiAgICAgICAgaWYgKG4gPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uU3RhY2tbbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJJTklUSUFMXCI7XG4gICAgICAgIH1cbiAgICB9LFxuXG4vLyBhbGlhcyBmb3IgYmVnaW4oY29uZGl0aW9uKVxucHVzaFN0YXRlOmZ1bmN0aW9uIHB1c2hTdGF0ZShjb25kaXRpb24pIHtcbiAgICAgICAgdGhpcy5iZWdpbihjb25kaXRpb24pO1xuICAgIH0sXG5cbi8vIHJldHVybiB0aGUgbnVtYmVyIG9mIHN0YXRlcyBjdXJyZW50bHkgb24gdGhlIHN0YWNrXG5zdGF0ZVN0YWNrU2l6ZTpmdW5jdGlvbiBzdGF0ZVN0YWNrU2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uU3RhY2subGVuZ3RoO1xuICAgIH0sXG5vcHRpb25zOiB7fSxcbnBlcmZvcm1BY3Rpb246IGZ1bmN0aW9uIGFub255bW91cyh5eSx5eV8sJGF2b2lkaW5nX25hbWVfY29sbGlzaW9ucyxZWV9TVEFSVCkge1xuXG52YXIgWVlTVEFURT1ZWV9TVEFSVDtcbnN3aXRjaCgkYXZvaWRpbmdfbmFtZV9jb2xsaXNpb25zKSB7XG5jYXNlIDA6cmV0dXJuIDU7XG5icmVhaztcbmNhc2UgMTovKiBza2lwIHdoaXRlc3BhY2UgKi87XG5icmVhaztcbmNhc2UgMjpyZXR1cm4gOTc7XG5icmVhaztcbmNhc2UgMzpyZXR1cm4gOTg7XG5icmVhaztcbmNhc2UgNDpyZXR1cm4gOTY7XG5icmVhaztcbmNhc2UgNTpyZXR1cm4gOTU7XG5icmVhaztcbmNhc2UgNjpyZXR1cm4gOTk7XG5icmVhaztcbmNhc2UgNzpyZXR1cm4gODc7XG5icmVhaztcbmNhc2UgODpyZXR1cm4gNDY7XG5icmVhaztcbmNhc2UgOTpyZXR1cm4gODg7XG5icmVhaztcbmNhc2UgMTA6cmV0dXJuIDkyO1xuYnJlYWs7XG5jYXNlIDExOnJldHVybiA5MDtcbmJyZWFrO1xuY2FzZSAxMjpyZXR1cm4gOTE7XG5icmVhaztcbmNhc2UgMTM6cmV0dXJuIDg5O1xuYnJlYWs7XG5jYXNlIDE0OnJldHVybiA5MztcbmJyZWFrO1xuY2FzZSAxNTpyZXR1cm4gOTQ7XG5icmVhaztcbmNhc2UgMTY6cmV0dXJuIDg1O1xuYnJlYWs7XG5jYXNlIDE3OnJldHVybiA4NDtcbmJyZWFrO1xuY2FzZSAxODpyZXR1cm4gODY7XG5icmVhaztcbmNhc2UgMTk6cmV0dXJuIDM2O1xuYnJlYWs7XG5jYXNlIDIwOnJldHVybiAzNztcbmJyZWFrO1xuY2FzZSAyMTpyZXR1cm4gMTAwO1xuYnJlYWs7XG5jYXNlIDIyOnJldHVybiAxMDI7XG5icmVhaztcbmNhc2UgMjM6cmV0dXJuIDUyO1xuYnJlYWs7XG5jYXNlIDI0OnJldHVybiAnOic7XG5icmVhaztcbmNhc2UgMjU6cmV0dXJuIDc4O1xuYnJlYWs7XG5jYXNlIDI2OnJldHVybiAxNTtcbmJyZWFrO1xuY2FzZSAyNzpyZXR1cm4gMTY7XG5icmVhaztcbmNhc2UgMjg6cmV0dXJuIDE3O1xuYnJlYWs7XG5jYXNlIDI5OnJldHVybiAxMTtcbmJyZWFrO1xuY2FzZSAzMDpyZXR1cm4gMTg7XG5icmVhaztcbmNhc2UgMzE6cmV0dXJuIDE5O1xuYnJlYWs7XG5jYXNlIDMyOnJldHVybiAyMDtcbmJyZWFrO1xuY2FzZSAzMzpyZXR1cm4gMjE7XG5icmVhaztcbmNhc2UgMzQ6cmV0dXJuIDIyO1xuYnJlYWs7XG5jYXNlIDM1OnJldHVybiAyMztcbmJyZWFrO1xuY2FzZSAzNjpyZXR1cm4gMjQ7XG5icmVhaztcbmNhc2UgMzc6cmV0dXJuIDE0O1xuYnJlYWs7XG5jYXNlIDM4OnJldHVybiAyNTtcbmJyZWFrO1xuY2FzZSAzOTpyZXR1cm4gMjY7XG5icmVhaztcbmNhc2UgNDA6cmV0dXJuIDI3XG5icmVhaztcbmNhc2UgNDE6cmV0dXJuIDI4O1xuYnJlYWs7XG5jYXNlIDQyOnJldHVybiAyOTtcbmJyZWFrO1xuY2FzZSA0MzpyZXR1cm4gMzE7XG5icmVhaztcbmNhc2UgNDQ6cmV0dXJuIDMyO1xuYnJlYWs7XG5jYXNlIDQ1OnJldHVybiAzMztcbmJyZWFrO1xuY2FzZSA0NjpyZXR1cm4gMzQ7XG5icmVhaztcbmNhc2UgNDc6cmV0dXJuIDEwMztcbmJyZWFrO1xuY2FzZSA0ODpyZXR1cm4gMTA0O1xuYnJlYWs7XG5jYXNlIDQ5OnJldHVybiAxMDU7XG5icmVhaztcbmNhc2UgNTA6cmV0dXJuIDEwNjtcbmJyZWFrO1xuY2FzZSA1MTpyZXR1cm4gMTA3O1xuYnJlYWs7XG5jYXNlIDUyOnJldHVybiAxMDg7XG5icmVhaztcbmNhc2UgNTM6cmV0dXJuIDEwOTtcbmJyZWFrO1xuY2FzZSA1NDpyZXR1cm4gMTEwO1xuYnJlYWs7XG5jYXNlIDU1OnJldHVybiAxMTE7XG5icmVhaztcbmNhc2UgNTY6cmV0dXJuIDExMjtcbmJyZWFrO1xuY2FzZSA1NzpyZXR1cm4gMTEzO1xuYnJlYWs7XG5jYXNlIDU4OnJldHVybiAxMTU7XG5icmVhaztcbmNhc2UgNTk6cmV0dXJuIDExNjtcbmJyZWFrO1xuY2FzZSA2MDpyZXR1cm4gMTE3O1xuYnJlYWs7XG5jYXNlIDYxOnJldHVybiAxMTg7XG5icmVhaztcbmNhc2UgNjI6cmV0dXJuIDExOTtcbmJyZWFrO1xuY2FzZSA2MzpyZXR1cm4gMTIwO1xuYnJlYWs7XG5jYXNlIDY0OnJldHVybiAxMjE7XG5icmVhaztcbmNhc2UgNjU6cmV0dXJuIDEyMjtcbmJyZWFrO1xuY2FzZSA2NjpyZXR1cm4gMTIzO1xuYnJlYWs7XG5jYXNlIDY3OnJldHVybiAxMjQ7XG5icmVhaztcbmNhc2UgNjg6cmV0dXJuIDEzO1xuYnJlYWs7XG5jYXNlIDY5OnJldHVybiAzODtcbmJyZWFrO1xuY2FzZSA3MDpyZXR1cm4gNzI7XG5icmVhaztcbmNhc2UgNzE6cmV0dXJuIDM5O1xuYnJlYWs7XG5jYXNlIDcyOnJldHVybiAzNTtcbmJyZWFrO1xuY2FzZSA3MzpyZXR1cm4gNDE7XG5icmVhaztcbmNhc2UgNzQ6cmV0dXJuIDQzO1xuYnJlYWs7XG5jYXNlIDc1OnJldHVybiA0ODtcbmJyZWFrO1xuY2FzZSA3NjpyZXR1cm4gNDk7XG5icmVhaztcbmNhc2UgNzc6cmV0dXJuIDUwO1xuYnJlYWs7XG5jYXNlIDc4OnJldHVybiA1MztcbmJyZWFrO1xuY2FzZSA3OTpyZXR1cm4gNjA7XG5icmVhaztcbmNhc2UgODA6cmV0dXJuIDU3O1xuYnJlYWs7XG5jYXNlIDgxOnJldHVybiA1NjtcbmJyZWFrO1xuY2FzZSA4MjpyZXR1cm4gNjE7XG5icmVhaztcbmNhc2UgODM6cmV0dXJuIDYzO1xuYnJlYWs7XG5jYXNlIDg0OnJldHVybiA2NTtcbmJyZWFrO1xuY2FzZSA4NTpyZXR1cm4gNjc7XG5icmVhaztcbmNhc2UgODY6cmV0dXJuIDY5XG5icmVhaztcbmNhc2UgODc6cmV0dXJuIDczO1xuYnJlYWs7XG5jYXNlIDg4OnJldHVybiAnT0ZGJztcbmJyZWFrO1xuY2FzZSA4OTpyZXR1cm4gNTg7XG5icmVhaztcbmNhc2UgOTA6cmV0dXJuICdPTic7XG5icmVhaztcbmNhc2UgOTE6cmV0dXJuIDc0O1xuYnJlYWs7XG5jYXNlIDkyOnJldHVybiAzMDtcbmJyZWFrO1xuY2FzZSA5MzpyZXR1cm4gNzk7XG5icmVhaztcbmNhc2UgOTQ6cmV0dXJuIDgyO1xuYnJlYWs7XG5jYXNlIDk1OnJldHVybiA3MDtcbmJyZWFrO1xuY2FzZSA5NjpyZXR1cm4gODA7XG5icmVhaztcbmNhc2UgOTc6cmV0dXJuIDgxXG5icmVhaztcbmNhc2UgOTg6cmV0dXJuIDU1O1xuYnJlYWs7XG5jYXNlIDk5OnJldHVybiA4MztcbmJyZWFrO1xuY2FzZSAxMDA6cmV0dXJuIDYyO1xuYnJlYWs7XG5jYXNlIDEwMTpyZXR1cm4gNTQ7XG5icmVhaztcbmNhc2UgMTAyOnJldHVybiA3NztcbmJyZWFrO1xuY2FzZSAxMDM6cmV0dXJuIDcxO1xuYnJlYWs7XG5jYXNlIDEwNDpyZXR1cm4gMTI2O1xuYnJlYWs7XG5jYXNlIDEwNTpyZXR1cm4gMTA7XG5icmVhaztcbmNhc2UgMTA2OnJldHVybiAxMjtcbmJyZWFrO1xuY2FzZSAxMDc6cmV0dXJuIDQ0O1xuYnJlYWs7XG5jYXNlIDEwODpyZXR1cm4gNDU7XG5icmVhaztcbmNhc2UgMTA5OnJldHVybiA1MTtcbmJyZWFrO1xuY2FzZSAxMTA6cmV0dXJuIDY7XG5icmVhaztcbmNhc2UgMTExOnJldHVybiAnSU5WQUxJRCc7XG5icmVhaztcbn1cbn0sXG5ydWxlczogWy9eKD86XFxuKS8sL14oPzpbXFx0IF0rKS8sL14oPzpcXCopLywvXig/OlxcLykvLC9eKD86LSkvLC9eKD86XFwrKS8sL14oPzpcXF4pLywvXig/Oj09KS8sL14oPzo9KS8sL14oPzo8PikvLC9eKD86PD0pLywvXig/Oj49KS8sL14oPzo8KS8sL14oPzo+KS8sL14oPzooW01tXVtBYV1bWHhdKSkvLC9eKD86KFtNbV1bSWldW05uXSkpLywvXig/OihbQWFdW05uXVtEZF0pKS8sL14oPzooW09vXVtScl0pKS8sL14oPzooW05uXVtPb11bVHRdKSkvLC9eKD86XFwoKS8sL14oPzpcXCkpLywvXig/OlxcWykvLC9eKD86XFxdKS8sL14oPzosKS8sL14oPzo6KS8sL14oPzo7KS8sL14oPzooW1R0XVtScl1bT29dW05uXSkpLywvXig/OihbVHRdW1JyXVtPb11bRmZdW0ZmXSkpLywvXig/OihbQWFdW1BwXVtQcF1bRWVdP1tObl0/W0RkXT9bXFwtXShbXFwkXFwqXFxAXFwhXFwjXT9bQS1aYS16XVtBLVphLXowLTldKykpKS8sL14oPzooW0FhXVtUdF1bQWFdW1JyXVtJaV0pKS8sL14oPzooW0NjXVtBYV1bVHRdW0FhXT9bTGxdP1tPb10/W0dnXT8pKS8sL14oPzooW0RkXVtFZV1bTGxdW0VlXT9bVHRdP1tFZV0/KFtcXC1dKFswLTksXSspKT8pKS8sL14oPzooW0RkXVtJaV1bUnJdKSkvLC9eKD86KFtFZV1bWHhdW0VlXVtDY10/W1V1XT9bVHRdP1tFZV0/W1xcLV0oW1xcJFxcKlxcQFxcIVxcI10/W0EtWmEtel1bQS1aYS16MC05XSspKSkvLC9eKD86KFtGZl1bSWldW0xsXVtFZV1bU3NdKSkvLC9eKD86KFtHZ11bRWVdW1R0XVtcXC1dKFtcXCRcXCpcXEBcXCFcXCNdP1tBLVphLXpdW0EtWmEtejAtOV0rKSkpLywvXig/OihbR2ddW1JyXVtPb11bVXVdP1tQcF0/KSkvLC9eKD86KFtHZ11bV3ddW0JiXT9bQWFdP1tTc10/W0lpXT9bQ2NdPykpLywvXig/OihbTGxdW0lpXVtCYl1bUnJdP1tBYV0/W1JyXT9bWXldPykpLywvXig/OihbTGxdW0lpXVtTc11bVHRdPyhbXFwtXShbMC05LF0rKSk/KSkvLC9eKD86KFtObl1bQWFdW01tXVtFZV0/W1xcLV0oW1xcJFxcKlxcQFxcIVxcI10/W0EtWmEtel1bQS1aYS16MC05XSspKSkvLC9eKD86KFtQcF1bVXVdW1JyXVtHZ10/W0VlXT9bXFwtXShbXFwkXFwqXFxAXFwhXFwjXT9bQS1aYS16XVtBLVphLXowLTldKykpKS8sL14oPzooW1JyXVtFZV1bTm5dW1V1XT9bTW1dP1tCYl0/W0VlXT9bUnJdPyhbXFwtXShbMC05LF0rKSk/KSkvLC9eKD86KFtScl1bVXVdW05uXShbXFwtXShbMC05XSkrKT8pKS8sL14oPzooW1NzXVtBYV1bVnZdW0VlXT8pKS8sL14oPzooW1NzXVtDY11bUnJdW0FhXT9bVHRdP1tDY10/W0hoXT8pKS8sL14oPzooW1R0XVtFZV1bU3NdW1R0XT8pKS8sL14oPzooW0FhXVtCYl1bU3NdKSkvLC9eKD86KFtBYV1bVHRdW05uXSkpLywvXig/OihbQ2NdW09vXVtTc10pKS8sL14oPzooW0VlXVtYeF1bUHBdKSkvLC9eKD86KFtJaV1bTm5dW1R0XSkpLywvXig/OihbTGxdW0VlXVtObl0pKS8sL14oPzooW0xsXVtJaV1bTm5dKSkvLC9eKD86KFtMbF1bT29dW0dnXSkpLywvXig/OihbUnJdW05uXVtEZF0pKS8sL14oPzooW1NzXVtHZ11bTm5dKSkvLC9eKD86KFtTc11bSWldW05uXSkpLywvXig/OihbU3NdW1FxXVtScl0pKS8sL14oPzooW1R0XVtBYV1bQmJdKSkvLC9eKD86KFtUdF1bQWFdW05uXSkpLywvXig/OihbVHRdW0lpXVtNbV0pKS8sL14oPzooW0xsXVtDY11bQWFdW1NzXVtFZV1bXFwkXSkpLywvXig/OihbTGxdW0VlXVtGZl1bVHRdW1xcJF0pKS8sL14oPzooW01tXVtJaV1bRGRdW1xcJF0pKS8sL14oPzooW1JyXVtJaV1bR2ddW0hoXVtUdF1bXFwkXSkpLywvXig/OihbU3NdW1V1XVtCYl1bU3NdW1R0XVtScl0pKS8sL14oPzooW1V1XVtDY11bQWFdW1NzXVtFZV1bXFwkXSkpLywvXig/OihbQ2NdW0xsXVtTc10pKS8sL14oPzooW0NjXVtIaF1bQWFdW0lpXVtObl0pKS8sL14oPzooW0NjXVtPb11bTm5dKSkvLC9eKD86KFtDY11bT29dW01tXSkpLywvXig/OihbQmJdW0FhXVtTc11bRWVdKSkvLC9eKD86KFtEZF1bQWFdW1R0XVtBYV0pKS8sL14oPzooW0RkXVtFZV1bRmZdKSkvLC9eKD86KFtEZF1bSWldW01tXSkpLywvXig/OihbRWVdW05uXVtEZF0pKS8sL14oPzooW0VlXVtObl1bVHRdW0VlXVtScl0pKS8sL14oPzooW0ZmXVtPb11bUnJdKSkvLC9eKD86KFtHZ11bT29dW1NzXVtVdV1bQmJdKSkvLC9eKD86KFtHZ11bT29dW1R0XVtPb10pKS8sL14oPzooW0dnXVtPb10pKS8sL14oPzooW0lpXVtGZl0pKS8sL14oPzooW0lpXVtNbV1bQWFdW0dnXVtFZV0pKS8sL14oPzooW0lpXVtObl1bUHBdW1V1XVtUdF0pKS8sL14oPzooW0xsXVtFZV1bVHRdKSkvLC9eKD86KFtNbV1bQWFdW1R0XSkpLywvXig/OihbTm5dW0VlXVtYeF1bVHRdKSkvLC9eKD86e09GRn0pLywvXig/OihbT29dW0ZmXSkpLywvXig/OntPTn0pLywvXig/OihbUHBdW1JyXVtJaV1bTm5dW1R0XSkpLywvXig/OihbUXFdW1V1XVtJaV1bVHRdKSkvLC9eKD86KFtScl1bQWFdW05uXVtEZF1bT29dW01tXVtJaV1bWnpdW0VlXSkpLywvXig/OihbUnJdW0VlXVtNbV0pLiopLywvXig/OihbUnJdW0VlXVtBYV1bRGRdKSkvLC9eKD86KFtScl1bRWVdW1NzXVtUdF1bT29dW1JyXVtFZV0pKS8sL14oPzooW1JyXVtFZV1bVHRdW1V1XVtScl1bTm5dKSkvLC9eKD86KFtTc11bVHRdW0VlXVtQcF0pKS8sL14oPzooW1NzXVtUdF1bT29dW1BwXSkpLywvXig/OihbVHRdW0hoXVtFZV1bTm5dKSkvLC9eKD86KFtUdF1bT29dKSkvLC9eKD86KFtVdV1bU3NdW0lpXVtObl1bR2ddKSkvLC9eKD86KFtael1bRWVdW1JyXSkpLywvXig/OigoWzAtOV0pKlxcLihbMC05XSkrKFtlRV1bLStdP1swLTldKyk/KSkvLC9eKD86KChbMC05XSkrKSkvLC9eKD86KFwiW15cIl0qXCIpKS8sL14oPzooW0ZmXVtObl0oW0EtWmEtel0pKSkvLC9eKD86KCgoW0EtWmEtel0pKFtBLVphLXowLTldKT8pWyQlXT8pKS8sL14oPzooW1xcI10oW0EtWmEtel0pKSkvLC9eKD86JCkvLC9eKD86LikvXSxcbmNvbmRpdGlvbnM6IHtcIklOSVRJQUxcIjp7XCJydWxlc1wiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwLDUxLDUyLDUzLDU0LDU1LDU2LDU3LDU4LDU5LDYwLDYxLDYyLDYzLDY0LDY1LDY2LDY3LDY4LDY5LDcwLDcxLDcyLDczLDc0LDc1LDc2LDc3LDc4LDc5LDgwLDgxLDgyLDgzLDg0LDg1LDg2LDg3LDg4LDg5LDkwLDkxLDkyLDkzLDk0LDk1LDk2LDk3LDk4LDk5LDEwMCwxMDEsMTAyLDEwMywxMDQsMTA1LDEwNiwxMDcsMTA4LDEwOSwxMTAsMTExXSxcImluY2x1c2l2ZVwiOnRydWV9fVxufTtcbnJldHVybiBsZXhlcjtcbn0pKCk7XG5wYXJzZXIubGV4ZXIgPSBsZXhlcjtcbmZ1bmN0aW9uIFBhcnNlciAoKSB7XG4gIHRoaXMueXkgPSB7fTtcbn1cblBhcnNlci5wcm90b3R5cGUgPSBwYXJzZXI7cGFyc2VyLlBhcnNlciA9IFBhcnNlcjtcbnJldHVybiBuZXcgUGFyc2VyO1xufSkoKTtcblxuXG5pZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuZXhwb3J0cy5wYXJzZXIgPSBrYztcbmV4cG9ydHMuUGFyc2VyID0ga2MuUGFyc2VyO1xuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGtjLnBhcnNlLmFwcGx5KGtjLCBhcmd1bWVudHMpOyB9O1xuZXhwb3J0cy5tYWluID0gZnVuY3Rpb24gY29tbW9uanNNYWluKGFyZ3MpIHtcbiAgICBpZiAoIWFyZ3NbMV0pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VzYWdlOiAnK2FyZ3NbMF0rJyBGSUxFJyk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG4gICAgdmFyIHNvdXJjZSA9IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKHJlcXVpcmUoJ3BhdGgnKS5ub3JtYWxpemUoYXJnc1sxXSksIFwidXRmOFwiKTtcbiAgICByZXR1cm4gZXhwb3J0cy5wYXJzZXIucGFyc2Uoc291cmNlKTtcbn07XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcbiAgZXhwb3J0cy5tYWluKHByb2Nlc3MuYXJndi5zbGljZSgxKSk7XG59XG59IiwidmFyIHByb2Nlc3M9cmVxdWlyZShcIl9fYnJvd3NlcmlmeV9wcm9jZXNzXCIpLF9fZGlybmFtZT1cIi9cIjsvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG52YXIgQ29uc29sZSwgRmlsZVN5c3RlbSwgTU9ERV9SRVBMLCBNT0RFX1JVTiwgcnRlLFxuICBfX2JpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9O1xuXG5NT0RFX1JFUEwgPSAwO1xuXG5NT0RFX1JVTiA9IDE7XG5cbm1vZHVsZS5leHBvcnRzID0gcnRlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cgIT09IG51bGwgPyB7XG4gIENvbnNvbGU6IENvbnNvbGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgcmVxdWlyZSgnLi9rYXRyYS5jb25zb2xlJyk7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5hdXRvZm9jdXMgPSB0cnVlO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucHJvbXB0ID0gJz4nO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucHJvbXB0QWx0ID0gJz8nO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuaGlzdG9yeSA9IHRydWU7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS50aXRsZSA9ICcnO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUubW9kZSA9IE1PREVfUkVQTDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmVsZW1lbnQgPSAnJztcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmNvbnNvbGUgPSBudWxsO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuYnVmZmVyID0gbnVsbDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnZhcnMgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gQ29uc29sZShlbGVtZW50LCBwcm9tcHQpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQgOiAnLmNvbnNvbGUnO1xuICAgICAgdGhpcy5wcm9tcHQgPSBwcm9tcHQgIT0gbnVsbCA/IHByb21wdCA6ICc+JztcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5jb21tYW5kVmFsaWRhdGUgPSBmdW5jdGlvbigkbGluZSkge1xuICAgICAgaWYgKCRsaW5lID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5pbnB1dCA9IGZ1bmN0aW9uKCRwcm9tcHQsICR2YXJzKSB7XG4gICAgICBpZiAoJHByb21wdCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucHJpbnQoJHByb21wdCk7XG4gICAgICB9XG4gICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgdGhpcy52YXJzID0gJHZhcnM7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigkc2V0KSB7fTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnNldFByb21wdCA9IGZ1bmN0aW9uKCRwcm9tcHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnNvbGUuc2V0UHJvbXB0KCRwcm9tcHQpO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5zZXRNb2RlID0gZnVuY3Rpb24oJG1vZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGUgPSAkbW9kZTtcbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuZGVidWcgPSBmdW5jdGlvbigkdGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc29sZS5kZWJ1ZygkdGV4dCk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmhpbGl0ZSA9IGZ1bmN0aW9uKCR0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zb2xlLmhpbGl0ZSgkdGV4dCk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnByaW50ID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnNvbGUucHJpbnQoJHRleHQpO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5wcmludGxuID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnNvbGUucHJpbnRsbigkdGV4dCk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmNvbnNvbGUgPSAkKHRoaXMuZWxlbWVudCkuY29uc29sZSh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzLmNvbnNvbGUuY2xlYXIoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbnNvbGU7XG5cbiAgfSkoKSxcbiAgRmlsZVN5c3RlbTogRmlsZVN5c3RlbSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgJHJvb3QsIF9kYXRhLCBfZ2V0LCBfc2V0X3RpdGxlO1xuXG4gICAgZnVuY3Rpb24gRmlsZVN5c3RlbSgpIHt9XG5cbiAgICAkcm9vdCA9ICcvJztcblxuICAgIF9nZXQgPSBmdW5jdGlvbigkbmFtZSwgJG5leHQpIHtcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2VbJG5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICRuZXh0KGxvY2FsU3RvcmFnZVskbmFtZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICRuZXh0KCcnKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3NldF90aXRsZSA9IGZ1bmN0aW9uKCRmaWxlbmFtZSkge1xuICAgICAgdmFyICRuYW1lO1xuICAgICAgJG5hbWUgPSAkZmlsZW5hbWUuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgIGlmICgvXFxbLipcXF0kLy50ZXN0KGRvY3VtZW50LnRpdGxlKSkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQudGl0bGUucmVwbGFjZSgvXFxbKC4qKVxcXSQvLCAkbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQudGl0bGUgKz0gXCIgLSBbXCIgKyAkbmFtZSArIFwiXVwiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5zZXRSb290ID0gZnVuY3Rpb24oJHBhdGgpIHtcbiAgICAgIHJldHVybiAkcm9vdCA9ICRwYXRoO1xuICAgIH07XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5yZWFkRmlsZSA9IGZ1bmN0aW9uKCRmaWxlbmFtZSwgJG5leHQpIHtcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2VbJGZpbGVuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBfZ2V0KCRmaWxlbmFtZSwgZnVuY3Rpb24oJGRhdGEpIHtcbiAgICAgICAgICBfc2V0X3RpdGxlKCRmaWxlbmFtZSk7XG4gICAgICAgICAgcmV0dXJuICRuZXh0KG51bGwsIFN0cmluZygkZGF0YSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAkLmdldCgkcm9vdCArICRmaWxlbmFtZSArICcuYmFzJywgZnVuY3Rpb24oJGRhdGEpIHtcbiAgICAgICAgICBfc2V0X3RpdGxlKCRmaWxlbmFtZSk7XG4gICAgICAgICAgcmV0dXJuICRuZXh0KG51bGwsIFN0cmluZygkZGF0YSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRmlsZVN5c3RlbS5wcm90b3R5cGUud3JpdGVGaWxlID0gZnVuY3Rpb24oJGZpbGVuYW1lLCAkZGF0YSwgJG5leHQpIHtcbiAgICAgIGxvY2FsU3RvcmFnZVskZmlsZW5hbWVdID0gJGRhdGE7XG4gICAgICByZXR1cm4gJG5leHQobnVsbCk7XG4gICAgfTtcblxuICAgIEZpbGVTeXN0ZW0ucHJvdG90eXBlLmRlbGV0ZUZpbGUgPSBmdW5jdGlvbigkZmlsZW5hbWUsICRuZXh0KSB7XG4gICAgICBkZWxldGUgbG9jYWxTdG9yYWdlWyRmaWxlbmFtZV07XG4gICAgICByZXR1cm4gJG5leHQobnVsbCk7XG4gICAgfTtcblxuICAgIEZpbGVTeXN0ZW0ucHJvdG90eXBlLnJlYWREaXIgPSBmdW5jdGlvbigkZGlyLCAkbmV4dCkge1xuICAgICAgdmFyICRuYW1lLCAkcGF0aCwgJHZhbHVlO1xuICAgICAgcmV0dXJuICRuZXh0KCgoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfcmVmLCBfcmVzdWx0cztcbiAgICAgICAgX3JlZiA9IF9kYXRhWyRkaXJdO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKCRuYW1lIGluIF9yZWYpIHtcbiAgICAgICAgICAkcGF0aCA9IF9yZWZbJG5hbWVdO1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2goJG5hbWUgKyAnLmJhcycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH0pKCkpLmNvbmNhdCgkZGlyID09PSAnQ0FUQUxPRycgPyAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfcmVzdWx0cztcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yICgkbmFtZSBpbiBsb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAkdmFsdWUgPSBsb2NhbFN0b3JhZ2VbJG5hbWVdO1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2goJG5hbWUuc3BsaXQoJy8nKS5wb3AoKSArICcuYmFzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfSkoKSA6IFtdKSk7XG4gICAgfTtcblxuICAgIF9kYXRhID0ge1xuICAgICAgQVRBUkk6IHtcbiAgICAgICAgU1JUUks6ICdiYXMvYXRhcmkvU1JUUksuYmFzJyxcbiAgICAgICAgV1VNUFVTOiAnYmFzL2F0YXJpL1dVTVBVUy5iYXMnXG4gICAgICB9LFxuICAgICAgR1dCQVNJQzoge1xuICAgICAgICBlbGl6YTogJ2Jhcy9nd2Jhc2ljL2VsaXphLmJhcycsXG4gICAgICAgIHJvbXVsYW46ICdiYXMvZ3diYXNpYy9yb211bGFuLmJhcydcbiAgICAgIH0sXG4gICAgICBHUk9VUDoge1xuICAgICAgICBUUkVLMDogJ2Jhcy9ocDJrL2dyb3VwL1RSRUswLmJhcycsXG4gICAgICAgIFRSRUsxOiAnYmFzL2hwMmsvZ3JvdXAvVFJFSzEuYmFzJyxcbiAgICAgICAgVFJFSzI6ICdiYXMvaHAyay9ncm91cC9UUkVLMi5iYXMnLFxuICAgICAgICBUUkVLMzogJ2Jhcy9ocDJrL2dyb3VwL1RSRUszLmJhcycsXG4gICAgICAgIFRSRUs0OiAnYmFzL2hwMmsvZ3JvdXAvVFJFSzQuYmFzJyxcbiAgICAgICAgVFJFSzczOiAnYmFzL2hwMmsvZ3JvdXAvVFJFSzczLmJhcydcbiAgICAgIH0sXG4gICAgICBMSUJSQVJZOiB7XG4gICAgICAgIFRSQURFUjogJ2Jhcy9ocDJrL3N5c3RlbS9UUkFERVIuYmFzJyxcbiAgICAgICAgVFJBREVTOiAnYmFzL2hwMmsvc3lzdGVtL1RSQURFUy5iYXMnXG4gICAgICB9LFxuICAgICAgVEVTVDoge1xuICAgICAgICBkYXRhOiAnYmFzL2hwMmsvdGVzdC9kYXRhLmJhcycsXG4gICAgICAgIGRlZjogJ2Jhcy9ocDJrL3Rlc3QvZGVmLmJhcycsXG4gICAgICAgIGRpbTogJ2Jhcy9ocDJrL3Rlc3QvZGltLmJhcycsXG4gICAgICAgIFwiZm9yXCI6ICdiYXMvaHAyay90ZXN0L2Zvci5iYXMnLFxuICAgICAgICBnb3N1YjogJ2Jhcy9ocDJrL3Rlc3QvZ29zdWIuYmFzJyxcbiAgICAgICAgXCJpZlwiOiAnYmFzL2hwMmsvdGVzdC9pZi5iYXMnLFxuICAgICAgICBpbnB1dDogJ2Jhcy9ocDJrL3Rlc3QvaW5wdXQuYmFzJyxcbiAgICAgICAgXCJsZXRcIjogJ2Jhcy9ocDJrL3Rlc3QvbGV0LmJhcycsXG4gICAgICAgIG51bWJlcnM6ICdiYXMvaHAyay90ZXN0L251bWJlcnMuYmFzJyxcbiAgICAgICAgcHJpbnQ6ICdiYXMvaHAyay90ZXN0L3ByaW50LmJhcycsXG4gICAgICAgIHRlc3Q6ICdiYXMvaHAyay90ZXN0L3Rlc3QuYmFzJyxcbiAgICAgICAgdW5hcnk6ICdiYXMvaHAyay90ZXN0L3VuYXJ5LmJhcydcbiAgICAgIH0sXG4gICAgICBDQVRBTE9HOiB7XG4gICAgICAgIE9SRUdPTjogJ2Jhcy9ocDJrL09SRUdPTi5iYXMnLFxuICAgICAgICBTVFJUUjE6ICdiYXMvaHAyay9TVFJUUjEuYmFzJyxcbiAgICAgICAgU1RUUjE6ICdiYXMvaHAyay9TVFRSMS5iYXMnXG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBGaWxlU3lzdGVtO1xuXG4gIH0pKClcbn0gOiB7XG4gIENvbnNvbGU6IENvbnNvbGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbG9ycztcblxuICAgIGNvbG9ycyA9IHJlcXVpcmUoJ2NvbG9ycycpO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuYnVmZmVyID0gbnVsbDtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnZhcnMgPSBudWxsO1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUucGF1c2VkID0gZmFsc2U7XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5wcm9tcHQgPSAnJztcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmFsdFByb21wdCA9ICc/JztcblxuICAgIGZ1bmN0aW9uIENvbnNvbGUocHJvbXB0KSB7XG4gICAgICB2YXIgc3RkaW47XG4gICAgICB0aGlzLnByb21wdCA9IHByb21wdCAhPSBudWxsID8gcHJvbXB0IDogJ2thdHJhPiAnO1xuICAgICAgdGhpcy5wYXVzZSA9IF9fYmluZCh0aGlzLnBhdXNlLCB0aGlzKTtcbiAgICAgIHRoaXMubGlzdGVuZXIgPSBfX2JpbmQodGhpcy5saXN0ZW5lciwgdGhpcyk7XG4gICAgICBzdGRpbiA9IHByb2Nlc3Mub3BlblN0ZGluKCk7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh0aGlzLnByb21wdCk7XG4gICAgICBzdGRpbi5hZGRMaXN0ZW5lcihcImRhdGFcIiwgdGhpcy5saXN0ZW5lcik7XG4gICAgfVxuXG4gICAgQ29uc29sZS5wcm90b3R5cGUubGlzdGVuZXIgPSBmdW5jdGlvbigkZGF0YSkge1xuICAgICAgdGhpcy5jb21tYW5kSGFuZGxlKCRkYXRhLnRvU3RyaW5nKCkpO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9SRVBMKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUodGhpcy5wcm9tcHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUodGhpcy5hbHRQcm9tcHQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5zZXRQcm9tcHQgPSBmdW5jdGlvbigkcHJvbXB0KSB7fTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oJHNldCkge1xuICAgICAgaWYgKHRoaXMucGF1c2VkID09PSAkc2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5wYXVzZWQgPSAkc2V0KSkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5zdGRpbi5yZW1vdmVMaXN0ZW5lcihcImRhdGFcIiwgdGhpcy5saXN0ZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9jZXNzLnN0ZGluLmFkZExpc3RlbmVyKFwiZGF0YVwiLCB0aGlzLmxpc3RlbmVyKTtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9SRVBMKSB7XG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRoaXMucHJvbXB0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUodGhpcy5hbHRQcm9tcHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmlucHV0ID0gZnVuY3Rpb24oJHByb21wdCwgJHZhcnMpIHtcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICB0aGlzLnBhdXNlKGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmICgkcHJvbXB0ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5wcmludCgkcHJvbXB0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICB0aGlzLnZhcnMgPSAkdmFycztcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5kZWJ1ZyA9IGZ1bmN0aW9uKCR0ZXh0KSB7XG4gICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoJHRleHQuYmx1ZSArICdcXG4nKTtcbiAgICB9O1xuXG4gICAgQ29uc29sZS5wcm90b3R5cGUuaGlsaXRlID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzLnN0ZG91dC53cml0ZSgkdGV4dC55ZWxsb3cgKyAnXFxuJyk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLnByaW50ID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIGlmICgkdGV4dCA9PSBudWxsKSB7XG4gICAgICAgICR0ZXh0ID0gJyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoJHRleHQpO1xuICAgIH07XG5cbiAgICBDb25zb2xlLnByb3RvdHlwZS5wcmludGxuID0gZnVuY3Rpb24oJHRleHQpIHtcbiAgICAgIGlmICgkdGV4dCA9PSBudWxsKSB7XG4gICAgICAgICR0ZXh0ID0gJyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoJHRleHQgKyAnXFxuJyk7XG4gICAgfTtcblxuICAgIENvbnNvbGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7fTtcblxuICAgIHJldHVybiBDb25zb2xlO1xuXG4gIH0pKCksXG4gIEZpbGVTeXN0ZW06IEZpbGVTeXN0ZW0gPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyICRyb290LCBmcywgcGF0aCwgX2RhdGE7XG5cbiAgICBmdW5jdGlvbiBGaWxlU3lzdGVtKCkge31cblxuICAgIGZzID0gcmVxdWlyZSgnZnMnKTtcblxuICAgIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbiAgICAkcm9vdCA9IF9fZGlybmFtZS5zbGljZSgwLCArX19kaXJuYW1lLmxhc3RJbmRleE9mKCcvJykgKyAxIHx8IDllOSk7XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5zZXRSb290ID0gZnVuY3Rpb24oJHBhdGgpIHtcbiAgICAgIHJldHVybiAkcm9vdCA9ICRwYXRoO1xuICAgIH07XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5yZWFkRmlsZSA9IGZ1bmN0aW9uKCRmaWxlbmFtZSwgJG5leHQpIHtcbiAgICAgIHJldHVybiBmcy5yZWFkRmlsZShwYXRoLmpvaW4oJHJvb3QsICRmaWxlbmFtZSkgKyAnLmJhcycsIGZ1bmN0aW9uKCRlcnIsICRkYXRhKSB7XG4gICAgICAgIGlmICgkZXJyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJG5leHQoJGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICRuZXh0KG51bGwsIFN0cmluZygkZGF0YSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRmlsZVN5c3RlbS5wcm90b3R5cGUud3JpdGVGaWxlID0gZnVuY3Rpb24oJGZpbGVuYW1lLCAkZGF0YSwgJG5leHQpIHtcbiAgICAgIHJldHVybiBmcy53cml0ZUZpbGUocGF0aC5qb2luKCRyb290LCAkZmlsZW5hbWUpICsgJy5iYXMnLCBcIlwiICsgJGZpbGVuYW1lICsgXCJcXG5cXG5cIiArICRkYXRhLCAkbmV4dCk7XG4gICAgfTtcblxuICAgIEZpbGVTeXN0ZW0ucHJvdG90eXBlLmRlbGV0ZUZpbGUgPSBmdW5jdGlvbigkZmlsZW5hbWUsICRuZXh0KSB7XG4gICAgICByZXR1cm4gZnMudW5saW5rKHBhdGguam9pbigkcm9vdCwgJGZpbGVuYW1lKSArICcuYmFzJywgJG5leHQpO1xuICAgIH07XG5cbiAgICBGaWxlU3lzdGVtLnByb3RvdHlwZS5yZWFkRGlyID0gZnVuY3Rpb24oJGRpciwgJG5leHQpIHtcbiAgICAgIHJldHVybiBmcy5yZWFkZGlyKCRyb290ICsgX2RhdGFbJGRpcl0sIGZ1bmN0aW9uKCRlcnIsICRmaWxlcykge1xuICAgICAgICB2YXIgJG5hbWU7XG4gICAgICAgIGlmICgkZXJyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJG5leHQoW10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAkbmV4dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX2ksIF9sZW4sIF9yZXN1bHRzO1xuICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gJGZpbGVzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgICAgICRuYW1lID0gJGZpbGVzW19pXTtcbiAgICAgICAgICAgICAgaWYgKC8uKlxcLmJhcyQvLnRlc3QoJG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCgkbmFtZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgICB9KSgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9kYXRhID0ge1xuICAgICAgQVRBUkk6ICdiYXMvYXRhcmkvJyxcbiAgICAgIEdXQkFTSUM6ICdiYXMvZ3diYXNpYy8nLFxuICAgICAgR1JPVVA6ICdiYXMvaHAyay9ncm91cC8nLFxuICAgICAgTElCUkFSWTogJ2Jhcy9ocDJrL3N5c3RlbS8nLFxuICAgICAgVEVTVDogJ2Jhcy9ocDJrL3Rlc3QvJyxcbiAgICAgIENBVEFMT0c6ICdiYXMvaHAyay8nXG4gICAgfTtcblxuICAgIHJldHVybiBGaWxlU3lzdGVtO1xuXG4gIH0pKClcbn07XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNy4xXG4kKGZ1bmN0aW9uKCkge1xuICB2YXIgYXJncywga2F0cmEsIHBhcnNlUXVlcnksIHNldFNpemUsIF9yZWY7XG4gIGthdHJhID0gcmVxdWlyZSgnLi9rYXRyYScpO1xuICBhcmdzID0gdm9pZCAwO1xuICBwYXJzZVF1ZXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIHBhaXIsIHBhaXJzLCByZXN1bHQ7XG4gICAgaWYgKHR5cGVvZiBkMTZhICE9PSBcInVuZGVmaW5lZFwiICYmIGQxNmEgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBkMTZhLmFyZ3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHt9O1xuICAgICAgcGFpcnMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdChcIiZcIik7XG4gICAgICBmb3IgKGkgaW4gcGFpcnMpIHtcbiAgICAgICAgaWYgKHBhaXJzW2ldLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBwYWlyID0gcGFpcnNbaV0uc3BsaXQoXCI9XCIpO1xuICAgICAgICAgIHJlc3VsdFtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcbiAgc2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICQoXCJkaXYuY29uc29sZSBkaXYuanF1ZXJ5LWNvbnNvbGUtaW5uZXJcIikub2Zmc2V0KHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDBcbiAgICB9KTtcbiAgICAkKFwiZGl2LmNvbnNvbGUgZGl2LmpxdWVyeS1jb25zb2xlLWlubmVyXCIpLndpZHRoKCQodGhpcykud2lkdGgoKSAtIDEyKTtcbiAgICByZXR1cm4gJChcImRpdi5jb25zb2xlIGRpdi5qcXVlcnktY29uc29sZS1pbm5lclwiKS5oZWlnaHQoJCh0aGlzKS5oZWlnaHQoKSAtIDEyKTtcbiAgfTtcbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5yZXNpemVUTykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVE8pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXNpemVUTyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJCh0aGlzKS50cmlnZ2VyKFwicmVzaXplRW5kXCIpO1xuICAgIH0sIDUwMCk7XG4gIH0pO1xuICAkKHdpbmRvdykuYmluZChcInJlc2l6ZUVuZFwiLCBzZXRTaXplKTtcbiAgYXJncyA9IHBhcnNlUXVlcnkoKTtcbiAga2F0cmEuc2V0Um9vdCgoX3JlZiA9IGFyZ3Mucm9vdCkgIT0gbnVsbCA/IF9yZWYgOiBcIi9rYXRyYS9cIik7XG4gIGlmIChPYmplY3Qua2V5cyhhcmdzKS5sZW5ndGggPT09IDApIHtcbiAgICBhcmdzID0ge1xuICAgICAgdGl0bGU6IFwiS2F0cmEgQkFTSUNcIlxuICAgIH07XG4gICAgZG9jdW1lbnQudGl0bGUgPSBhcmdzLnRpdGxlO1xuICB9XG4gIGthdHJhLm1haW4oYXJncyk7XG4gIHJldHVybiBzZXRTaXplKCk7XG59KTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS43LjFcbnZhciBQUklOVEYsIHV0aWw7XG5cblBSSU5URiA9IC8oXFwlKShbLV0pPyhbK10pPyhbMF0pPyhcXGQqKT8oXFwuXFxkKik/KFtcXCVkc10pL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbCA9IHtcbiAgY2xlYW46IGZ1bmN0aW9uKCRjb2RlKSB7XG4gICAgaWYgKCRjb2RlLmNoYXJDb2RlQXQoMCkgPT09IDB4ZmVmZikge1xuICAgICAgJGNvZGUgPSAkY29kZS5zbGljZSgxKTtcbiAgICB9XG4gICAgcmV0dXJuICRjb2RlID0gKCRjb2RlICsgJ1xcbicpLnJlcGxhY2UoL1xcci9nLCAnXFxuJykucmVwbGFjZSgvXFxuKy9nLCAnXFxuJyk7XG4gIH0sXG4gIGZsYXR0ZW46IGZ1bmN0aW9uKCRsaXN0KSB7XG4gICAgdmFyICRhLCAkaXRlbSwgX2ksIF9sZW47XG4gICAgaWYgKCRsaXN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgJGEgPSBbXTtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9ICRsaXN0Lmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAkaXRlbSA9ICRsaXN0W19pXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KCRpdGVtKSkge1xuICAgICAgICAkYSA9ICRhLmNvbmNhdCh1dGlsLmZsYXR0ZW4oJGl0ZW0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRhLnB1c2goJGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJGE7XG4gIH0sXG4gIHNwcmludGY6IGZ1bmN0aW9uKCRmbXQsICRsaXN0KSB7XG4gICAgdmFyICRjb3VudCwgZm9yZWFjaDtcbiAgICAkY291bnQgPSAwO1xuICAgIGZvcmVhY2ggPSBmdW5jdGlvbigkbWF0Y2gsICRwY3QsICRqdXN0LCAkc2lnbiwgJHBhZCwgJHdpZHRoLCAkcHJlYywgJHNwZWMsICRvZnNldCwgJHN0cmluZykge1xuICAgICAgdmFyICR2YWx1ZTtcbiAgICAgIGlmICgkcGFkID09IG51bGwpIHtcbiAgICAgICAgJHBhZCA9ICcgJztcbiAgICAgIH1cbiAgICAgICR2YWx1ZSA9IFN0cmluZygkbGlzdFskY291bnQrK10pO1xuICAgICAgc3dpdGNoICgkc3BlYykge1xuICAgICAgICBjYXNlICclJzpcbiAgICAgICAgICByZXR1cm4gJyUnO1xuICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICBpZiAoJHdpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgICR3aWR0aCA9IHBhcnNlSW50KCR3aWR0aCwgMTApO1xuICAgICAgICAgICAgaWYgKCR2YWx1ZS5sZW5ndGggPCAkd2lkdGgpIHtcbiAgICAgICAgICAgICAgaWYgKCRqdXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkoJHdpZHRoIC0gJHZhbHVlLmxlbmd0aCArIDEpLmpvaW4oJHBhZCkgKyAkdmFsdWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICR2YWx1ZSArIEFycmF5KCR3aWR0aCAtICR2YWx1ZS5sZW5ndGggKyAxKS5qb2luKCRwYWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAkdmFsdWU7XG4gICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgIGlmICgkd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgJHdpZHRoID0gcGFyc2VJbnQoJHdpZHRoLCAxMCk7XG4gICAgICAgICAgICBpZiAoJHZhbHVlLmxlbmd0aCA8ICR3aWR0aCkge1xuICAgICAgICAgICAgICBpZiAoJGp1c3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkdmFsdWUgKyBBcnJheSgkd2lkdGggLSAkdmFsdWUubGVuZ3RoICsgMSkuam9pbigkcGFkKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkoJHdpZHRoIC0gJHZhbHVlLmxlbmd0aCArIDEpLmpvaW4oJHBhZCkgKyAkdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAkZm10LnJlcGxhY2UoUFJJTlRGLCBmb3JlYWNoKTtcbiAgfSxcbiAgcGFkOiBmdW5jdGlvbigkdmFsdWUsICRsZW4sICRwYWQpIHtcbiAgICB2YXIgJHJpZ2h0O1xuICAgIGlmICgkcGFkID09IG51bGwpIHtcbiAgICAgICRwYWQgPSAnICc7XG4gICAgfVxuICAgICRyaWdodCA9ICFpc05hTigkdmFsdWUpO1xuICAgICR2YWx1ZSA9IFN0cmluZygkdmFsdWUpO1xuICAgIGlmICgkcmlnaHQpIHtcbiAgICAgIGlmICgkdmFsdWUubGVuZ3RoIDwgJGxlbikge1xuICAgICAgICByZXR1cm4gQXJyYXkoJGxlbiAtICR2YWx1ZS5sZW5ndGggKyAxLCAkcGFkKSArICR2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAkdmFsdWUuc3Vic3RyKDAsICRsZW4pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoJHZhbHVlLmxlbmd0aCA8ICRsZW4pIHtcbiAgICAgICAgcmV0dXJuICR2YWx1ZSArIEFycmF5KCRsZW4gLSAkdmFsdWUubGVuZ3RoICsgMSwgJHBhZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJHZhbHVlLnN1YnN0cigwLCAkbGVuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iLG51bGwsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICBpZiAoZXYuc291cmNlID09PSB3aW5kb3cgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwidmFyIHByb2Nlc3M9cmVxdWlyZShcIl9fYnJvd3NlcmlmeV9wcm9jZXNzXCIpOy8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyByZXNvbHZlcyAuIGFuZCAuLiBlbGVtZW50cyBpbiBhIHBhdGggYXJyYXkgd2l0aCBkaXJlY3RvcnkgbmFtZXMgdGhlcmVcbi8vIG11c3QgYmUgbm8gc2xhc2hlcywgZW1wdHkgZWxlbWVudHMsIG9yIGRldmljZSBuYW1lcyAoYzpcXCkgaW4gdGhlIGFycmF5XG4vLyAoc28gYWxzbyBubyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzIC0gaXQgZG9lcyBub3QgZGlzdGluZ3Vpc2hcbi8vIHJlbGF0aXZlIGFuZCBhYnNvbHV0ZSBwYXRocylcbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5KHBhcnRzLCBhbGxvd0Fib3ZlUm9vdCkge1xuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgbGFzdCA9IHBhcnRzW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgcGFydHMudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFydHM7XG59XG5cbi8vIFNwbGl0IGEgZmlsZW5hbWUgaW50byBbcm9vdCwgZGlyLCBiYXNlbmFtZSwgZXh0XSwgdW5peCB2ZXJzaW9uXG4vLyAncm9vdCcgaXMganVzdCBhIHNsYXNoLCBvciBub3RoaW5nLlxudmFyIHNwbGl0UGF0aFJlID1cbiAgICAvXihcXC8/fCkoW1xcc1xcU10qPykoKD86XFwuezEsMn18W15cXC9dKz98KShcXC5bXi5cXC9dKnwpKSg/OltcXC9dKikkLztcbnZhciBzcGxpdFBhdGggPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICByZXR1cm4gc3BsaXRQYXRoUmUuZXhlYyhmaWxlbmFtZSkuc2xpY2UoMSk7XG59O1xuXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XG4gICAgdmFyIHBhdGggPSAoaSA+PSAwKSA/IGFyZ3VtZW50c1tpXSA6IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XG4gIH1cblxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICByZXR1cm4gKChyZXNvbHZlZEFic29sdXRlID8gJy8nIDogJycpICsgcmVzb2x2ZWRQYXRoKSB8fCAnLic7XG59O1xuXG4vLyBwYXRoLm5vcm1hbGl6ZShwYXRoKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLFxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBwYXRoID0gJy4nO1xuICB9XG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICBwYXRoICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5qb2luID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0pLmpvaW4oJy8nKSk7XG59O1xuXG5cbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XG4gIHRvID0gZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7XG5cbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xuICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XG4gIH1cblxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xuICB2YXIgdG9QYXJ0cyA9IHRyaW0odG8uc3BsaXQoJy8nKSk7XG5cbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcbiAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcbiAgICAgIHNhbWVQYXJ0c0xlbmd0aCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHNhbWVQYXJ0c0xlbmd0aDsgaSA8IGZyb21QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XG4gIH1cblxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xuXG4gIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJyk7XG59O1xuXG5leHBvcnRzLnNlcCA9ICcvJztcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xuXG5leHBvcnRzLmRpcm5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciByZXN1bHQgPSBzcGxpdFBhdGgocGF0aCksXG4gICAgICByb290ID0gcmVzdWx0WzBdLFxuICAgICAgZGlyID0gcmVzdWx0WzFdO1xuXG4gIGlmICghcm9vdCAmJiAhZGlyKSB7XG4gICAgLy8gTm8gZGlybmFtZSB3aGF0c29ldmVyXG4gICAgcmV0dXJuICcuJztcbiAgfVxuXG4gIGlmIChkaXIpIHtcbiAgICAvLyBJdCBoYXMgYSBkaXJuYW1lLCBzdHJpcCB0cmFpbGluZyBzbGFzaFxuICAgIGRpciA9IGRpci5zdWJzdHIoMCwgZGlyLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgcmV0dXJuIHJvb3QgKyBkaXI7XG59O1xuXG5cbmV4cG9ydHMuYmFzZW5hbWUgPSBmdW5jdGlvbihwYXRoLCBleHQpIHtcbiAgdmFyIGYgPSBzcGxpdFBhdGgocGF0aClbMl07XG4gIC8vIFRPRE86IG1ha2UgdGhpcyBjb21wYXJpc29uIGNhc2UtaW5zZW5zaXRpdmUgb24gd2luZG93cz9cbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gZjtcbn07XG5cblxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gc3BsaXRQYXRoKHBhdGgpWzNdO1xufTtcblxuZnVuY3Rpb24gZmlsdGVyICh4cywgZikge1xuICAgIGlmICh4cy5maWx0ZXIpIHJldHVybiB4cy5maWx0ZXIoZik7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGYoeHNbaV0sIGksIHhzKSkgcmVzLnB1c2goeHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBTdHJpbmcucHJvdG90eXBlLnN1YnN0ciAtIG5lZ2F0aXZlIGluZGV4IGRvbid0IHdvcmsgaW4gSUU4XG52YXIgc3Vic3RyID0gJ2FiJy5zdWJzdHIoLTEpID09PSAnYidcbiAgICA/IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHsgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbikgfVxuICAgIDogZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikge1xuICAgICAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IHN0ci5sZW5ndGggKyBzdGFydDtcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbik7XG4gICAgfVxuO1xuIl19
