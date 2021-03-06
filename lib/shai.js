(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("shai", [], factory);
	else if(typeof exports === 'object')
		exports["shai"] = factory();
	else
		root["shai"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 108);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(14);
var hide = __webpack_require__(6);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(40);
var toPrimitive = __webpack_require__(24);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(28)('wks');
var uid = __webpack_require__(16);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var createDesc = __webpack_require__(15);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(34);
var defined = __webpack_require__(25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(42);
var enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(53);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(66);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(46);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(70);
var enumBugKeys = __webpack_require__(29);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(41)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(71).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f;
var has = __webpack_require__(7);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(50);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(28)('keys');
var uid = __webpack_require__(16);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(31);
var wksExt = __webpack_require__(32);
var defineProperty = __webpack_require__(3).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(35);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(31);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(44);
var hide = __webpack_require__(6);
var has = __webpack_require__(7);
var Iterators = __webpack_require__(18);
var $iterCreate = __webpack_require__(69);
var setToStringTag = __webpack_require__(21);
var getPrototypeOf = __webpack_require__(45);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.types = undefined;

var _typeof2 = __webpack_require__(19);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module 类型检测 */

var has = function has(d) {
  return (typeof d === 'undefined' ? 'undefined' : (0, _typeof3.default)(d)) !== void 0;
},
    typeTest = function typeTest(d, type) {
  return Object.prototype.toString.call(d) === '[object ' + type + ']';
};

var types = exports.types = {
  'isObject': function isObject(d) {
    return has(d) && typeTest(d, 'Object') && d instanceof Object;
  },
  'isArray': function isArray(d) {
    return has(d) && typeTest(d, 'Array') && d instanceof Array;
  },
  'isRegexp': function isRegexp(d) {
    return has(d) && typeTest(d, 'RegExp') && d instanceof RegExp;
  },
  'isNumber': function isNumber(d) {
    return has(d) && has(d) && typeof d === 'number' && isFinite(d);
  },
  'isFunction': function isFunction(d) {
    return has(d) && typeTest(d, 'Function');
  },
  'isNull': function isNull(d) {
    return typeTest(d, 'Null');
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(9)(function () {
  return Object.defineProperty(__webpack_require__(41)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(64)(false);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7);
var toObject = __webpack_require__(13);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(16)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(7);
var setDesc = __webpack_require__(3).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(9)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(42);
var hiddenKeys = __webpack_require__(29).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(17);
var createDesc = __webpack_require__(15);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(24);
var has = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(40);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(9);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(97), __esModule: true };

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(68)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(36)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72);
var global = __webpack_require__(2);
var hide = __webpack_require__(6);
var Iterators = __webpack_require__(18);
var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(35);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {



/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = {
  ROOT       : 0,
  GROUP      : 1,
  POSITION   : 2,
  SET        : 3,
  RANGE      : 4,
  REPETITION : 5,
  REFERENCE  : 6,
  CHAR       : 7,
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(14);
var call = __webpack_require__(124);
var isArrayIter = __webpack_require__(125);
var anObject = __webpack_require__(10);
var toLength = __webpack_require__(43);
var getIterFn = __webpack_require__(126);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(63) });


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(12);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(17);
var toObject = __webpack_require__(13);
var IObject = __webpack_require__(34);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(9)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(43);
var toAbsoluteIndex = __webpack_require__(65);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
__webpack_require__(55);
module.exports = __webpack_require__(32).f('iterator');


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(20);
var descriptor = __webpack_require__(15);
var setToStringTag = __webpack_require__(21);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(12);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(73);
var step = __webpack_require__(56);
var Iterators = __webpack_require__(18);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(36)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75);
__webpack_require__(58);
__webpack_require__(78);
__webpack_require__(79);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(4);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(44);
var META = __webpack_require__(47).KEY;
var $fails = __webpack_require__(9);
var shared = __webpack_require__(28);
var setToStringTag = __webpack_require__(21);
var uid = __webpack_require__(16);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(32);
var wksDefine = __webpack_require__(33);
var enumKeys = __webpack_require__(76);
var isArray = __webpack_require__(57);
var anObject = __webpack_require__(10);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(24);
var createDesc = __webpack_require__(15);
var _create = __webpack_require__(20);
var gOPNExt = __webpack_require__(77);
var $GOPD = __webpack_require__(49);
var $DP = __webpack_require__(3);
var $keys = __webpack_require__(12);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(48).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(17).f = $propertyIsEnumerable;
  __webpack_require__(30).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(31)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(6)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(12);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(17);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(48).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('asyncIterator');


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('observable');


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(81);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(4), 'Object', { defineProperty: __webpack_require__(3).f });


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = undefined;

var _keys = __webpack_require__(37);

var _keys2 = _interopRequireDefault(_keys);

var _resource = __webpack_require__(85);

var _util = __webpack_require__(86);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = exports.config = {
  'divisionCode': _util.util.getItem((0, _keys2.default)(_resource.data.shorter)) + '0000',
  'beginTime': new Date('1970/01/01'),
  'endTime': new Date(),
  'baseIncrement': 0
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(13);
var $keys = __webpack_require__(12);

__webpack_require__(51)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.data = undefined;

var _pos = __webpack_require__(109);

var _pos2 = _interopRequireDefault(_pos);

var _gb = __webpack_require__(110);

var _gb2 = _interopRequireDefault(_gb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gb2.default.register('201607', __webpack_require__(112));

/** @constant
 *  @type {object}
 *  @default
 */
var data = exports.data = {
  /** 取英美排名前25-30的高使用率姓、名
   */
  'eSurname': ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King'],
  'eMaleName': ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Charles', 'Joseph', 'Thomas', 'Christopher', 'Daniel', 'Paul', 'Mark', 'Donald', 'George', 'Kenneth', 'Steven', 'Edward', 'Brian', 'Ronald', 'Anthony', 'Kevin', 'Jason', 'Jeff'],
  'eFemaleName': ['Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Jennifer', 'Maria', 'Susan', 'Margaret', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Sarah', 'Kimberly', 'Deborah'],
  /** 取中国排名前100左右高使用率姓、名
   */
  'cSurname': ['李', '王', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗', '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧', '程', '曹', '袁', '邓', '许', '傅', '沈', '曾', '彭', '吕', '苏', '卢', '蒋', '蔡', '贾', '丁', '魏', '薛', '叶', '阎', '余', '潘', '杜', '戴', '夏', '钟', '汪', '田', '任', '姜', '范', '方', '石', '姚', '谭', '廖', '邹', '熊', '金', '陆', '郝', '孔', '白', '崔', '康', '毛', '邱', '秦', '江', '史', '顾', '侯', '邵', '孟', '龙', '万', '段', '钱', '汤', '尹', '黎', '易', '常', '贺', '乔', '贺', '赖', '龚', '文', '庞', '樊', '兰', '殷', '施', '陶', '洪', '翟', '颜', '倪', '严', '牛', '温', '芦', '季', '俞', '章', '鲁'],
  'cMaleName': ['伟', '强', '磊', '洋', '勇', '军', '杰', '涛', '超', '明', '刚', '平', '辉', '鹏', '华', '飞', '鑫', '波', '斌', '宇', '浩', '凯', '健', '俊', '帆', '帅', '旭', '龙', '林', '阳', '建华', '亮', '成', '畅', '建', '峰', '建国', '建军', '晨', '瑞', '志强', '兵', '雷', '东', '博', '彬', '坤', '想', '岩', '杨', '文', '利', '建平'],
  'cFemaleName': ['芳', '娜', '敏', '静', '丽', '艳', '娟', '霞', '秀兰', '燕', '玲', '桂英', '丹', '萍', '红', '玉兰', '桂兰', '英', '秀英', '梅', '莉', '秀珍', '雪', '帅', '慧', '宁', '婷', '玉梅', '玉珍', '凤英', '晶', '欢', '玉英', '颖', '红梅', '佳', '倩', '琴', '兰英', '云', '洁', '柳', '淑珍', '春梅', '海燕', '晨', '冬梅', '秀荣', '桂珍', '莹', '秀云', '桂荣', '秀梅', '丽娟', '婷婷', '玉华', '琳', '雪梅', '淑兰', '丽丽', '玉', '秀芳', '欣', '淑英', '桂芳', '博', '丽华', '丹丹', '桂香', '淑华', '荣', '秀华', '桂芝', '小红', '金凤', '楠', '红霞', '瑜', '桂花', '璐', '凤兰'],
  /** 国家名，取GDP排名前50左右的国家
   */
  'eStates': ['United States', 'China', 'Japan', 'Germany', 'United Kingdom', 'France', 'India', 'Italy', 'Brazil', 'Canada', 'South Korea', 'Russia', 'Australia', 'Spain', 'Mexico', 'Indonesia', 'Turkey', 'Netherlands', 'Switzerland', 'Saudi Arabia', 'Argentina', 'Sweden', 'Poland', 'Belgium', 'Thailand', 'Nigeria', 'Austria', 'Iran', 'United Arab Emirates', 'Norway', 'Egypt', 'Israel', 'Denmark', 'Philippines', 'Singapore', 'Malaysia', 'South Africa', 'Ireland', 'Venezuela', 'Pakistan', 'Colombia', 'Chile', 'Finland', 'Bangladesh', 'Portugal', 'Vietnam', 'Peru', 'Greece', 'Czech Republic', 'Romania', 'New Zealand'],
  'cStates': ['美国', '中国', '日本', '德国', '英国', '法国', '印度', '意大利', '巴西', '加拿大', '韩国', '俄罗斯', '澳大利亚', '西班牙', '墨西哥', '印度尼西亚', '土耳其', '荷兰', '瑞士', '沙特阿拉伯', '阿根廷', '瑞典', '波兰', '比利时', '泰国', '尼日利亚', '奥地利', '伊朗', '阿联酋', '挪威', '埃及', '以色列', '丹麦', '菲律宾', '新加坡', '马来西亚', '南非', '爱尔兰', '委内瑞拉', '巴基斯坦', '哥伦比亚', '智利', '芬兰', '孟加拉国', '葡萄牙', '越南', '秘鲁', '希腊', '捷克', '罗马尼亚', '新西兰'],
  'shorter': {
    '11': '京', '12': '津', '13': '冀', '14': '豫', '15': '蒙', '21': '辽',
    '22': '吉', '23': '黑', '31': '沪', '32': '苏', '33': '浙', '34': '皖', '35': '闽',
    '36': '赣', '37': '鲁', '41': '豫', '42': '鄂', '43': '湘', '44': '粤', '45': '桂',
    '46': '琼', '50': '渝', '51': '川', '52': '贵', '53': '云', '54': '藏', '61': '陕',
    '62': '甘', '63': '青', '64': '宁', '65': '新'
  },
  /** 常用字
   */
  'commonWord': ['云', '舟', '巨', '鹏', '飞', '捷', '华', '禄', '富', '瑞', '天', '隆', '益', '力', '发', '文', '化', '世', '新', '金', '润', '寿', '宏', '康', '丰', '本', '恒', '明', '大', '先', '弘', '春', '利', '如', '伟', '贵', '长', '达', '德', '光', '安', '翔', '童', '青', '兴', '三', '美', '千', '广', '福', '万', '畅', '宝', '旺', '进', '合', '和', '雅', '浩', '成', '满', '祥', '奇', '永', '泰', '远', '林', '鑫', '晋', '志', '正', '君', '名', '多', '中', '亨', '高', '吉', '龙', '扬', '红', '荣', '轩', '众', '元', '雄', '裕', '昌', '盈', '晶', '方', '科', '源', '亚', '协', '优', '乐', '神', '亮', '复', '仑', '久', '盛', '海', '智', '顺', '信', '辰', '彩', '田', '诺', '驰', '环', '易', '锐', '博', '涛', '同', '辉', '洪', '晨', '聚', '佳', '仙', '渊', '勤', '百', '全', '汇', '凯', '慧', '超', '庆', '仁', '东', '星', '夏', '阳', '城', '茂', '才', '京', '舒', '精', '国', '空', '磊', '欣', '贯', '森', '香', '艺', '耀', '惠', '虹', '义', '平', '升', '煜', '子', '丽', '鼎', '立', '纯', '通', '意', '迪', '健', '柏', '友', '峰', '铭', '凤', '潮', '宇', '巧', '帆', '泉', '杰', '梦', '昊', '强', '学', '启', '宸', '清', '宁', '威', '日', '秀', '时', '胜', '坤', '行', '维', '欢', '秋', '际', '冠', '霖', '馨', '动', '实', '劲', '松', '一', '豪', '蓝', '展', '炜', '佑', '傲', '旭'],
  /** 常用路名
   */
  'road': ['建设', '人民', '文化', '迎宾', '朝阳', '育才', '振兴', '光明', '幸福', '解放', '团结', '公园', '和平', '新华', '西环', '胜利', '南环', '平安', '向阳', '青年', '滨河', '东环', '友谊', '富民', '前进', '文明', '花园', '健康', '广场', '创业', '中山', '迎宾', '东风', '中兴', '新兴', '环城', '民主', '文昌', '凤凰', '永安', '胜利', '体育', '学府'],
  'buildNature': ['新村', '花园', '小区', '苑', '大厦', '公寓', '楼', '广场', '城'],
  'companyNature': ['股份', '科技', '电子', '实业', '商贸', '机械', '服装', '广告', '建材', '物流', '能源', '办公用品', '信贷', '培训', '酒店', '房地产', '食品', '汽车服务', '五金'],
  'govDepartment': ['审计', '综合', '计财', '秘书', '监察'],
  'govPos': ['科员', '科长', '处长', '主任', '局长', '巡视员', '调研员', '副科长', '副处长', '副主任', '副局长'],
  'comDepartment': ['行政部', '人事部', '销售部', '研发部', '财务部', '物料部'],
  'comPos': ['总经理', '副总经理', '总裁', '总监', '工程师', '助理', '主管', '经理', '分析员'],
  /** GB/2260 行政区划
   */
  'division': new _gb2.default.GB2260(),
  /** GB/T2261，性别，不含未知的性别、未说明的性别
   */
  'geo': _pos2.default,
  'sex': ['男', '女'],
  /** GB/T3304 民族
   */
  'nation': ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛难族', '仡佬族', '锡伯族', '阿昌族', '普米族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'],
  /** GB/T4762 政治面貌
   */
  'affiliate': ['中国共产党党员', '中国共产党预备党员', '中国共产主义青年团团员', '中国国民党革命委员会会员', '中国民主同盟盟员', '中国民主建国会会员', '中国民主促进会会员', '中国农工民主党党员', '中国致公党党员', '九三学社社员', '台湾民主自治同盟盟员', '无党派民主人士', '群众'],
  /** GB/T4658 文化程度，大类
   */
  'edu': ['研究生', '大学本科', '大学专科和专科学校', '中等专业学校或中等技术学校', '技工学校', '高中', '初中', '小学', '文盲或半文盲'],
  /** GB/T4766 婚姻状况，不含其他
   */
  'mary': ['未婚', '已婚', '丧偶', '离婚'],
  /** GB/T4767 健康状况，大类
   */
  'health': ['健康或良好', '一般或较弱', '有慢性病', '有生理缺陷', '残废']
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var util = exports.util = {
  /**
   * 随机整数、数字
   */
  getInt: function getInt(a, b) {
    return a + Math.floor(Math.random() * (1 + b - a));
  },
  getNumber: function getNumber(a, b, c) {
    var p = c < 1 ? 1 : Math.pow(10, c);

    return this.getInt(Math.floor(a * p), Math.floor(b * p)) / p;
  },


  /**
   * 随机取数组元素，单项
   */
  getItem: function getItem(arr) {
    return arr.length > 0 ? arr[this.getInt(0, arr.length - 1)] : '';
  },


  /**
   * 随机取数组元素，多项
   */
  getItems: function getItems(arr, num) {
    var na = [];

    for (var i = 0; i < num; i++) {
      na.push(this.getItem(arr));
    }return na.join('');
  },


  /**
   * 随机时间、格式化
   */
  randDate: function randDate(arg1, arg2) {
    return new Date(this.getInt(arg1, arg2));
  },
  formatDate: function formatDate(d, fmt) {
    var o = {
      'M+': d.getMonth() + 1,
      'd+': d.getDate(),
      'h+': d.getHours(),
      'm+': d.getMinutes(),
      's+': d.getSeconds(),
      'q+': Math.floor((d.getMonth() + 3) / 3),
      'S': d.getMilliseconds()
    },
        week = {
      '0': '/u65e5',
      '1': '/u4e00',
      '2': '/u4e8c',
      '3': '/u4e09',
      '4': '/u56db',
      '5': '/u4e94',
      '6': '/u516d'
    },
        t = void 0;

    if (/(y+)/.test(fmt)) {
      t = RegExp.$1;
      fmt = fmt.replace(t, (d.getFullYear() + '').substr(4 - t.length));
    }
    if (/(E+)/.test(fmt)) {
      t = RegExp.$1;
      fmt = fmt.replace(t(t.length > 1 ? t.length > 2 ? '/u661f/u671f' : '/u5468' : '') + week[d.getDay() + '']);
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        t = RegExp.$1;
        fmt = fmt.replace(t, t.length === 1 ? o[k] : ('00' + o[k]).slice(-t.length));
      }
    }
    return fmt;
  }
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(37);

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = __webpack_require__(88);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(22);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(23);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(91);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(92);

var _inherits3 = _interopRequireDefault(_inherits2);

var _isJson = __webpack_require__(99);

var _isJson2 = _interopRequireDefault(_isJson);

var _validator = __webpack_require__(100);

var _validator2 = _interopRequireDefault(_validator);

var _type = __webpack_require__(38);

var _objectPath = __webpack_require__(101);

var _objectPath2 = _interopRequireDefault(_objectPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module 数据完整性校验 */
var DataType = function (_Valid) {
  (0, _inherits3.default)(DataType, _Valid);

  function DataType() {
    (0, _classCallCheck3.default)(this, DataType);

    // 扩展类型判断
    var _this = (0, _possibleConstructorReturn3.default)(this, (DataType.__proto__ || (0, _getPrototypeOf2.default)(DataType)).call(this));

    _this.addRule({
      'json': function json(arg) {
        return (0, _isJson2.default)(arg);
      },
      'object': function object(arg) {
        return _type.types.isObject(arg);
      },
      'array': function array(arg) {
        return _type.types.isArray(arg);
      },
      'string': function string(arg) {
        return typeof arg === 'string';
      },
      'number': function number(arg) {
        return _type.types.isNumber(arg);
      },
      'boolean': function boolean(arg) {
        return typeof arg === 'boolean';
      },
      'empty': function empty(arg) {
        var emptyarr = _type.types.isArray(arg) && arg.length === 0;

        return _type.types.isNull(arg) || emptyarr || arg + ''.trim() === '';
      }
    });
    _this.checkData = _this.checkData.bind(_this);
    return _this;
  }

  /**
   * 类型与数据匹配
   * @param {object} struct 数据类型对象
   * @param {object|string} data 数据
   * @param {function} callback 自定义回调，可选，参数为未通过项、对象层级路径
   * @returns {boolean} 是否验证通过
   */


  (0, _createClass3.default)(DataType, [{
    key: 'checkData',
    value: function checkData(struct, data, callback) {
      var _this2 = this;

      if (struct === void 0 || data === void 0) return false;

      var typeCheck = void 0,
          itemCheck = void 0,
          itemsCheck = void 0,
          cb = callback,
          passed = false,
          checkeds = [];
      var isStr = typeof data === 'string' && (0, _isJson2.default)(data),
          dataObj = isStr ? JSON.parse(data) : data;

      typeCheck = function typeCheck(dt, path) {
        var item = void 0,
            type = void 0,
            p = [];

        path.forEach(function (v) {
          // 数组数据路径转换
          if (/\d+/.test(v)) p.push(0);else p.push(v);
        });
        type = _objectPath2.default.get(struct, p); // 取对应规则
        if (type !== void 0) {
          item = {
            value: dt,
            rule: type,
            callback: function callback(faults) {
              if (_type.types.isFunction(cb)) cb(faults, path);else {
                faults.forEach(function (f) {
                  console.error('"' + path.join(' /') + '"，未通过" ' + f, '"项检查！');
                });
              }
            }
          };
          checkeds.push(_this2.checkItem(item));
        }
      };
      itemCheck = function itemCheck(d, path) {
        // 单对象匹配
        (0, _keys2.default)(d).forEach(function (key) {
          var p = path.concat();
          var dt = d[key];

          p.push(key);
          if (_type.types.isArray(dt)) itemsCheck(dt, p);else typeCheck(dt, p);
        });
      };
      itemsCheck = function itemsCheck(d, path) {
        // 组匹配
        var p = path.concat();

        if (_type.types.isArray(d)) {
          d.forEach(function (dt, i) {
            if (_type.types.isObject(dt)) {
              var pt = p.concat();

              pt.push(i);
              itemCheck(dt, pt);
            }
          });
        } else if (_type.types.isObject(d)) itemCheck(d, p);
      };

      itemsCheck(dataObj, []);
      if (checkeds.length > 0) passed = checkeds.indexOf(false) === -1;
      return passed;
    }
  }]);
  return DataType;
}(_validator2.default);

exports.default = DataType;
module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(13);
var $getPrototypeOf = __webpack_require__(45);

__webpack_require__(51)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(19);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(93);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(52);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(19);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(96).set });


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(8);
var anObject = __webpack_require__(10);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(14)(Function.call, __webpack_require__(49).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(20) });


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isJSON;
isJSON.strict = strict;

function isJSON (str, pass_object) {
  if (pass_object && isObject(str)) return true;

  if (!isString(str)) return false;

  str = str.replace(/\s/g, '').replace(/\n|\r/, '');

  if (/^\{(.*?)\}$/.test(str))
    return /"(.*?)":(.*?)/g.test(str);

  if (/^\[(.*?)\]$/.test(str)) {
    return str.replace(/^\[/, '')
      .replace(/\]$/, '')
      .replace(/},{/g, '}\n{')
      .split(/\n/)
      .map(function (s) { return isJSON(s); })
      .reduce(function (prev, curr) { return !!curr; });
  }

  return false;
}


function strict (str) {
  if (isObject(str)) {
    return true;
  }

  try {
   return JSON.parse(str) && true;
  } catch (ex) {
    return false;
  }
}

function isString (x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}



/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = __webpack_require__(50);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _create = __webpack_require__(52);

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = __webpack_require__(22);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(23);

var _createClass3 = _interopRequireDefault(_createClass2);

var _assign = __webpack_require__(39);

var _assign2 = _interopRequireDefault(_assign);

var _keys = __webpack_require__(37);

var _keys2 = _interopRequireDefault(_keys);

var _symbol = __webpack_require__(46);

var _symbol2 = _interopRequireDefault(_symbol);

var _type = __webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RULE_CACHE = (0, _symbol2.default)(); /** @module 数据验证 */

var rule,
    ruleMap = {};

/**
 * @prop  {regexp} rquire      任意字符，必填项
 * @prop  {regexp} english     英文字母
 * @prop  {regexp} qq          QQ号 5-11位
 * @prop  {regexp} age         年龄 0-129岁
 * @prop  {regexp} time        时间 12:12:12
 * @prop  {regexp} year        年份 1900-2099
 * @prop  {regexp} month       月份
 * @prop  {regexp} day         日
 * @prop  {regexp} hour        小时 0-23
 * @prop  {regexp} minute      分钟 0-59
 * @prop  {regexp} second      秒钟 0-59
 * @prop  {regexp} zipcode     邮编
 * @prop  {regexp} ip          IP地址
 * @prop  {regexp} port        端口
 * @prop  {regexp} currency    货币，双精度，带分号
 * @prop  {regexp} float       浮点数
 * @prop  {regexp} int         整数
 * @prop  {regexp} decimal     小数点1位及以上
 * @prop  {regexp} chinese     中文
 * @prop  {regexp} mail        邮箱地址
 * @prop  {regexp} url         网址
 * @prop  {regexp} account     账号名，abcd_dafsd_da
 * @prop  {regexp} password    密码，
 * @prop  {regexp} safe        安全敏感字符
 * @prop  {regexp} dbc         全角
 * @prop  {regexp} hex         HEX码
 * @prop  {regexp} color       颜色码，16进制
 * @prop  {regexp} ascii       ASCII码
 * @prop  {regexp} base64      BASE64码
 * @prop  {regexp} guid        GUID码
 * @prop  {regexp} mobile      手机 +8613700000000
 * @prop  {regexp} telphone    电话手机混合
 * @prop  {regexp} phone       固话，可带分机
 * @prop  {regexp} percent     百分数，可两位小数点
 * @prop  {regexp} date        日期 2017-7-17，含大小月、闰月检测
 * @prop  {regexp} datetime    日期 + 时间
 * @prop  {regexp} file        文件
 * @prop  {regexp} image       图像文件
 * @prop  {regexp} word        文档文件
 * @prop  {regexp} lon         地理位置——经度，最少一位小数
 * @prop  {regexp} lat         地理位置——纬度，最少一位小数
 * @prop  {regexp} approval    审批文号 某字〔2004〕18号 或 某字[2004]18号
 * @prop  {regexp} bizcode     统一信用代码
 * @prop  {regexp} invoice     增值税发票代码
 * @prop  {regexp} bankcard    银联卡卡号
 * @prop  {regexp} citycode    地区代码
 */
var base = {
  'rquire': /.+/,
  'english': /^[A-Za-z]+$/,
  'qq': /^[1-9]\d{4,10}$/,
  'age': /^(0|[1-9]\d?|1[0-2]\d)$/,
  'zipcode': /^(\d[1-7]|[1-9][0-7])\d{4}$/,
  'ip': /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, // eslint-disable-line max-len
  'port': /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
  'bizcode': /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
  'invoice': /^(((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12]))\d{5}[1-9][1-7][0-4])$/,
  'bankcard': /^(10|30|35|37|4\d||5[0-6]|58|60|62|6[8-9]|84|8[7-8]|9[0-2]|9[4-6]|9[8-9])\d{14,17}$/,
  'currency': /(^[-]?[1-9]\d{0,2}($|(\,\d{3})*($|(\.\d{1,2}$))))|((^[0](\.\d{1,2})?)|(^[-][0]\.\d{1,2}))$/,
  'float': /^(\-|\+)?\d+(\.\d+)?$/,
  'int': /^-?\d+$/,
  'decimal': /^-?\d+\.\d{1,}$/,
  'chinese': /^[\u2E80-\uFE4F]+$/,
  'mail': /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  'url': /(http|ftp|https|ws|wss):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
  'account': /^[A-Za-z0-9]+(_[A-Za-z0-9]+)*[A-Za-z0-9]+$/,
  'password': /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/, // eslint-disable-line max-len
  'safe': />|<|,|\[|\]|\{|\}|\?|\/|\+|=|\||\'|\\|\'|:|;|\~|\!|\@|\#|\*|\$|\%|\^|\&|\(|\)|`/i,
  'dbc': /[ａ-ｚＡ-Ｚ０-９！＠＃￥％＾＆＊（）＿＋｛｝［］｜：＂＇；．，／？＜＞｀～　]/, // eslint-disable-line no-irregular-whitespace
  'hex': /^[0-9A-F]+$/i,
  'color': /^#?[a-fA-F0-9]{6}$/i,
  'ascii': /^[\u0000-\u007F]+$/,
  'base64': /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i,
  'md5': /^(([0-9A-F]{16})|([0-9A-F]{32}))$/i,
  'uuid': /^[0-9A-F]{8}(-[0-9A-F]{4}){3}-[0-9A-F]{12}$/i,
  'mobile': /^((\+86)|(86))?(13\d|(14[5-7])|(15([0-3]|[5-9]))|166|17(0|1|8])|18\d|19(8|9))\d{8}$/,
  'telphone': /^[+]{0,1}\d{1,3}[ ]?([-]?(\d|[ ]){1,12})+$/,
  'phone': /^((\+86)|(86))?((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/, // eslint-disable-line max-len
  'percent': /^-?\d+(\.\d{2})?%$/,
  'year': /^(19|20)\d{2}$/,
  'month': /^(0?[1-9]|1[0-2])$/,
  'day': /^(([1-9])|([1-2]\d)|(3[0-1]))$/,
  'hour': /^((1?\d)|(2[0-3]))$/,
  'minute': /^[1-5]?\d$/,
  'time': /^(\d|([0-1]\d|2[0-3])):([0-5]\d):([0-5]\d)$/,
  'date': /^((((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13578]|1[02])\5(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13456789]|1[012])\11(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)0?2\17(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))(-|\/)0?2\25(29)))$/, // eslint-disable-line max-len
  'datetime': /^((((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13578]|1[02])\5(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13456789]|1[012])\11(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)0?2\17(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))(-|\/)0?2\25(29)))\s+(\d|([0-1]\d|2[0-3])):(\d|([0-5]?\d)):(\d|([0-5]?\d))$/, // eslint-disable-line max-len
  'file': /^[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  'image': /^.+\.(jpg|jpeg|gif|png|bmp|svg)$/i,
  'word': /^.+\.(txt|doc|docx|rtf|pdf|wps)$/i,
  'lon': /^(\-|\+)?(0?\d{1,2}\.\d{1,}|1[0-7]?\d{1}\.\d{1,}|180\.0{1,})$/,
  'lat': /^(\-|\+)?([0-8]?\d{1}\.\d{1,}|90\.0{1,})$/,
  'approval': /^([\u2E80-\uFE4F]+)\u5b57(\u3014|\[])(19|20)\d{2}(\u3015|\])\u7b2c?\d{1,}\u53f7$/,
  'citycode': /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12]))\d{4}$/,
  'address': /^[\u2E80-\uFE4F]+(\u5e02|\u53BF|\u533A|\u65D7|\u4E61|\u9547|\u8857\u9053|\u5DDE)\S{3,}$/,
  'upper': /[A-Z]/,
  'lower': /[a-z]/
};

ruleMap.base = (0, _keys2.default)(base);

/**
 * @prop  {function} even      奇数
 * @prop  {function} even      偶数
 * @prop  {function} ipv6      IPV6
 * @prop  {function} bodycard  身份证
 * @prop  {function} autocard  车牌号
 */
var fncOne = {
  'even': function even(arg) {
    return (+arg & 1) === 0;
  },
  'odd': function odd(arg) {
    return (+arg & 1) !== 0;
  },

  ipv6: function ipv6(arg) {
    var m = arg.match(/:/g),
        t1 = m ? m.length < 8 : false,
        t2 = /:/.test(arg),
        t3 = /::/.test(arg),
        t4 = m.length === 1,
        t5 = /^::$|^(::)?([\da-f]{1,4}(:|::))*[\da-f]{1,4}(:|::)?$/i.test(arg),
        t6 = /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(arg);

    // console.log(t1, t2, t3, t4, t5, t6);
    return t1 && t2 && (t3 ? t4 && t5 : t6);
  },
  bodycard: function bodycard(arg) {
    var args = arg.toUpperCase().split(''),
        factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2],
        reg = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((19|20)\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((19|20)\d{2}(0[13578]|1[02])31)|((19|20)\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/; // eslint-disable-line max-len
    var sum = 0,
        ai = 0,
        wi = 0;

    for (var i = 0; i < 17; i++) {
      ai = args[i];
      wi = factor[i];
      sum += ai * wi;
    }
    return reg.test(arg) && parity[sum % 11] == args[17]; // eslint-disable-line eqeqeq
  },
  autocard: function autocard(arg) {
    var sn = '京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼',
        reg1 = new RegExp('(^[' + sn + '使领][A-HJ-NP-Z]([A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警]|[DF][A-HJ-NP-Z0-9]{5}|[A-HJ-NP-Z0-9]{5}[DF])$)|(粤Z[A-HJ-NP-Z0-9]{4}[港澳])'),
        // eslint-disable-line max-len
    reg2 = new RegExp('(^WJ[' + sn + '](\\d{5}|[BDGHJSTX]\\d{4}|\\d{4}[BDGHJSTX])$)|(^[A-Z]{2}\\d{5}$)/');

    return reg1.test(arg) && arg.match(/[A-Z]/g).length < 4 || reg2.test(arg);
  }
};

ruleMap.fncOne = (0, _keys2.default)(fncOne);

function convert(content) {
  // 支持文本类型的数字及日期比较
  var value = content;

  if (typeof content === 'string') {
    if (base['float'].test(content)) value = +content;else if (base['date'].test(content) || base['datetime'].test(content)) {
      value = content.indexOf('-') > -1 ? new Date(content.replace(/-/g, '/')) : new Date(content);
    }
  }
  return value;
}

function checkLen(type, arg1, arg2) {
  var p = void 0,
      s = false;
  var l = parseInt(arg2, 10);

  if (_type.types.isObject(arg2)) p = (0, _keys2.default)(arg2).length;else if (_type.types.isArray(arg2)) p = arg2.length;else p = (arg1 + '').length;

  switch (type) {
    case 0:
      s = p === l;
      break;
    case 1:
      s = p >= l;
      break;
    case 2:
      s = p <= l;
      break;
  }
  return s;
}

/**
 * @prop  {function} not       不等于
 * @prop  {function} eq        等于
 * @prop  {function} gt        大于
 * @prop  {function} gte       大于或等于
 * @prop  {function} lt        小于
 * @prop  {function} lte       小于或等于
 * @prop  {function} min       最小
 * @prop  {function} max       最大
 * @prop  {function} minlen    最小长度
 * @prop  {function} maxlen    最大长度
 * @prop  {function} len       等于长度
 * @prop  {function} in        包含
 */
var fncMany = {
  'not': function not(arg1, arg2) {
    return convert(arg1) !== convert(arg2);
  },
  'eq': function eq(arg1, arg2) {
    return convert(arg1) === convert(arg2);
  },
  'gt': function gt(arg1, arg2) {
    return convert(arg1) > convert(arg2);
  },
  'gte': function gte(arg1, arg2) {
    return convert(arg1) >= convert(arg2);
  },
  'lt': function lt(arg1, arg2) {
    return convert(arg1) < convert(arg2);
  },
  'lte': function lte(arg1, arg2) {
    return convert(arg1) <= convert(arg2);
  },
  'bet': function bet(arg1, arg2, arg3) {
    return arg1 > arg2 && arg1 < arg3;
  },
  'min': function min(arg1) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return convert(arg1) === Math.min.apply(null, args);
  },
  'max': function max(arg1) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return convert(arg1) === Math.max.apply(null, args);
  },
  'len': function len(arg1, arg2) {
    return checkLen(0, arg1, arg2);
  },
  'minl': function minl(arg1, arg2) {
    return checkLen(1, arg1, arg2);
  },
  'maxl': function maxl(arg1, arg2) {
    return checkLen(2, arg1, arg2);
  },
  'in': function _in(arg, arg2) {
    var p = false;

    if (_type.types.isObject(arg2)) p = (0, _keys2.default)(arg2).indexOf(arg) > -1;else if (_type.types.isArray(arg2)) p = arg2.indexOf(arg) > -1;else p = new RegExp(arg).test(arg2);
    return p;
  }
};

ruleMap.fncMany = (0, _keys2.default)(fncMany);
rule = (0, _assign2.default)(base, (0, _assign2.default)(fncOne, fncMany));

var Validator = function () {
  function Validator() {
    (0, _classCallCheck3.default)(this, Validator);

    this.addRule = this.addRule.bind(this);
    this.check = this.check.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.checkItems = this.checkItems.bind(this);
  }

  /**
   * 扩展自定义验证方法
   * @param {object} option 对象
   * @example
   * addRule({ mystr: /^abc$/, myfnc: arg => { return arg!=0 }})
   */


  (0, _createClass3.default)(Validator, [{
    key: 'addRule',
    value: function addRule(option) {
      (0, _keys2.default)(option).forEach(function (key) {
        var newRule = option[key];

        if (_type.types.isRegexp(newRule)) {
          if (ruleMap.base.indexOf(key) === -1) ruleMap.base.push(key);
        } else if (_type.types.isFunction(newRule)) {
          if (newRule.length === 1 && ruleMap.fncOne.indexOf(key) === -1) ruleMap.fncOne.push(key);else if (ruleMap.fncMany.indexOf(key) === -1) ruleMap.fncMany.push(key);
        } else throw new TypeError('扩展规则类型非函数或正则！');
      });
      (0, _assign2.default)(rule, option);
    }

    /**
     * 缓存链式类型检测项设值内容
     */

  }, {
    key: 'check',


    /**
     * 单项单规则验证
     * @param {*} value 检测的值，必含
     * @param {string} [ruleStr] 规则属性，默认为判断是否为空，可选
     * @param {...*} args 对比值、参考值等自定义验证方法扩展参数，可选
     * @returns {boolean} 是否验证通过
     * @example
     * check('password1','==','password2')
     */
    value: function check(value) {
      var rn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rquire';

      var passed = false;
      var val = typeof value === 'string' ? value.trim() : value,
          c = { '==': 'eq', '!=': 'not', '>': 'gt', '>=': 'gte', '<': 'lt', '<=': 'lte' },
          ruleName = c.hasOwnProperty(rn) ? c[rn] : rn;

      if (rule.hasOwnProperty(ruleName)) {
        for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          args[_key3 - 2] = arguments[_key3];
        }

        if (args.length > 0) passed = rule[ruleName].apply(this, [val].concat(args));else if (_type.types.isFunction(rule[ruleName])) passed = rule[ruleName](val);else if (_type.types.isRegexp(rule[ruleName])) passed = rule[ruleName].test(val);
      } else throw new TypeError('没有找到相关验证规则！');

      return passed;
    }

    /**
     * 单项组合规则验证，对象方式
     * @param {object} options 属性对象。
     * @prop {*} value 必备选项，验证目标数据
     * @prop {t} rule 使用链式表达式检查，可选
     * @prop {function} callback 默认验证结果处置方法，可选，参数faults为没通过的项的集合
     * @returns {boolean} 是否验证通过
     * @example
     * checkItem({value:'password1', password:true, eq:'password2'})
     */

  }, {
    key: 'checkItem',
    value: function checkItem(options) {
      var _this = this;

      var passed = false,
          opts = options,
          cb = void 0,
          val = opts.value;
      var hasVal = !val || (val + '').trim() === '';

      delete opts.value;
      if (opts.hasOwnProperty('callback')) {
        // 取回调
        cb = opts.callback;
        delete opts.callback;
      }
      if (opts.hasOwnProperty('rule')) {
        // 转换链式规则为动态属性
        var caches = opts.rule[RULE_CACHE];

        if (caches !== void 0) {
          caches.forEach(function (t) {
            if (_type.types.isObject(t)) (0, _assign2.default)(opts, t);else opts[t] = true;
          });
        }
        delete opts.rule;
      }

      if (opts.hasOwnProperty('rquire') && !opts['rquire'] && hasVal) passed = true;else {
        var checkeds = [],
            faults = [],
            rs = void 0;

        (0, _keys2.default)(opts).forEach(function (k) {
          // 取出动态属性规则
          var prop = opts[k];

          if (_type.types.isArray(prop)) rs = _this.check.apply(_this, [val, k].concat(prop));else if (typeof prop === 'boolean') rs = _this.check(val, k) && prop;else rs = _this.check(val, k, prop);
          checkeds.push(rs);
          if (rs === false) faults.push(k);
        });
        if (_type.types.isFunction(cb)) cb(faults); // 执行回调
        if (checkeds.length > 0) passed = checkeds.indexOf(false) === -1;
      }
      return passed;
    }

    /**
     * 多项组合规则验证
     * @param {array} items 组对象
     * @returns {boolean} 是否验证通过
     */

  }, {
    key: 'checkItems',
    value: function checkItems(items) {
      var _this2 = this;

      var passed = false,
          checkeds = [];

      if (_type.types.isArray(items) && items.length > 0) {
        items.forEach(function (item) {
          if (_type.types.isObject(item)) checkeds.push(_this2.checkItem(item));else throw new TypeError('验证组内容不是对象!');
        });
        if (checkeds.length > 0) passed = checkeds.indexOf(false) === -1;
      }
      return passed;
    }
  }, {
    key: 't',
    get: function get() {
      var chain = (0, _create2.default)(null),
          caches = [];
      var oneKeys = ruleMap.base.concat(ruleMap.fncOne);

      // 单形参
      oneKeys.forEach(function (k) {
        (0, _defineProperty2.default)(chain, k, {
          get: function get() {
            caches.push(k);
            chain[RULE_CACHE] = caches;
            return chain;
          }
        });
      });

      // 多形参
      ruleMap.fncMany.forEach(function (k) {
        (0, _defineProperty2.default)(chain, k, {
          value: function value() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            var obj = {};

            obj[k] = args;
            caches.push(obj);
            chain[RULE_CACHE] = caches;
            return chain;
          }
        });
      });

      return chain;
    }
  }]);
  return Validator;
}();

exports.default = Validator;
;
module.exports = exports['default'];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {}

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function hasShallowProperty(obj, prop) {
      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
    }

    function getShallowProperty(obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      if (!hasShallowProperty(obj, currentPath)) {
        return obj;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1));
      }

      return obj;
    }

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod;
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(59);

var INTS = function() {
 return [{ type: types.RANGE , from: 48, to: 57 }];
};

var WORDS = function() {
 return [
    { type: types.CHAR, value: 95 },
    { type: types.RANGE, from: 97, to: 122 },
    { type: types.RANGE, from: 65, to: 90 }
  ].concat(INTS());
};

var WHITESPACE = function() {
 return [
    { type: types.CHAR, value: 9 },
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 11 },
    { type: types.CHAR, value: 12 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 32 },
    { type: types.CHAR, value: 160 },
    { type: types.CHAR, value: 5760 },
    { type: types.CHAR, value: 6158 },
    { type: types.CHAR, value: 8192 },
    { type: types.CHAR, value: 8193 },
    { type: types.CHAR, value: 8194 },
    { type: types.CHAR, value: 8195 },
    { type: types.CHAR, value: 8196 },
    { type: types.CHAR, value: 8197 },
    { type: types.CHAR, value: 8198 },
    { type: types.CHAR, value: 8199 },
    { type: types.CHAR, value: 8200 },
    { type: types.CHAR, value: 8201 },
    { type: types.CHAR, value: 8202 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
    { type: types.CHAR, value: 8239 },
    { type: types.CHAR, value: 8287 },
    { type: types.CHAR, value: 12288 },
    { type: types.CHAR, value: 65279 }
  ];
};

var NOTANYCHAR = function() {
  return [
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
  ];
};

// Predefined class objects.
exports.words = function() {
  return { type: types.SET, set: WORDS(), not: false };
};

exports.notWords = function() {
  return { type: types.SET, set: WORDS(), not: true };
};

exports.ints = function() {
  return { type: types.SET, set: INTS(), not: false };
};

exports.notInts = function() {
  return { type: types.SET, set: INTS(), not: true };
};

exports.whitespace = function() {
  return { type: types.SET, set: WHITESPACE(), not: false };
};

exports.notWhitespace = function() {
  return { type: types.SET, set: WHITESPACE(), not: true };
};

exports.anyChar = function() {
  return { type: types.SET, set: NOTANYCHAR(), not: true };
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(6);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(35);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 107 */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(39);

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = __webpack_require__(19);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(22);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(23);

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = __webpack_require__(82);

var _datatype = __webpack_require__(87);

var _datatype2 = _interopRequireDefault(_datatype);

var _datamake = __webpack_require__(113);

var _datamake2 = _interopRequireDefault(_datamake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dt, dm; /** @module Shai主模块 */

var Shai = function () {
  function Shai() {
    (0, _classCallCheck3.default)(this, Shai);

    dt = new _datatype2.default();
    dm = new _datamake2.default();

    this.check = dt.check;
    this.checkItem = dt.checkItem;
    this.checkItems = dt.checkItems;
    this.checkData = dt.checkData;
    this.addRule = dt.addRule;

    this.schema = dm.schema;
    this.make = dm.makeData;
    this.addSchema = dm.addSchema;
  }

  (0, _createClass3.default)(Shai, [{
    key: 't',
    get: function get() {
      return dt.t;
    }
  }, {
    key: 'config',
    set: function set(option) {
      if ((typeof option === 'undefined' ? 'undefined' : (0, _typeof3.default)(option)) !== void 0) {
        (0, _assign2.default)(_config.config, option);
        dm = new _datamake2.default();
      }
    }
  }]);
  return Shai;
}();

exports.default = Shai;
;
module.exports = exports['default'];

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = [{"county":"北京市","lon":116.4,"lat":39.9},{"county":"天安门","lon":116.38,"lat":39.9},{"county":"东城区","lon":116.42,"lat":39.93},{"county":"西城区","lon":116.37,"lat":39.92},{"county":"崇文区","lon":116.43,"lat":39.88},{"county":"宣武区","lon":116.35,"lat":39.87},{"county":"朝阳区","lon":116.43,"lat":39.92},{"county":"丰台区","lon":116.28,"lat":39.85},{"county":"石景山区","lon":116.22,"lat":39.9},{"county":"海淀区","lon":116.3,"lat":39.95},{"county":"门头沟区","lon":116.1,"lat":39.93},{"county":"房山区","lon":116.13,"lat":39.75},{"county":"通州区","lon":116.65,"lat":39.92},{"county":"顺义区","lon":116.65,"lat":40.13},{"county":"昌平区","lon":116.23,"lat":40.22},{"county":"大兴区","lon":116.33,"lat":39.73},{"county":"怀柔区","lon":116.63,"lat":40.32},{"county":"平谷区","lon":117.12,"lat":40.13},{"county":"密云县","lon":116.83,"lat":40.37},{"county":"延庆县","lon":115.97,"lat":40.45},{"county":"天津市","lon":117.2,"lat":39.12},{"county":"和平区","lon":117.2,"lat":39.12},{"county":"河东区","lon":117.22,"lat":39.12},{"county":"河西区","lon":117.22,"lat":39.12},{"county":"南开区","lon":117.15,"lat":39.13},{"county":"河北区","lon":117.18,"lat":39.15},{"county":"红桥区","lon":117.15,"lat":39.17},{"county":"塘沽区","lon":117.65,"lat":39.02},{"county":"汉沽区","lon":117.8,"lat":39.25},{"county":"大港区","lon":117.45,"lat":38.83},{"county":"东丽区","lon":117.3,"lat":39.08},{"county":"西青区","lon":117,"lat":39.13},{"county":"津南区","lon":117.38,"lat":38.98},{"county":"北辰区","lon":117.13,"lat":39.22},{"county":"武清区","lon":117.03,"lat":39.38},{"county":"宝坻区","lon":117.3,"lat":39.72},{"county":"滨海新区","lon":117.68,"lat":39.03},{"county":"宁河县","lon":117.82,"lat":39.33},{"county":"静海县","lon":116.92,"lat":38.93},{"county":"蓟县","lon":117.4,"lat":40.05},{"county":"石家庄市","lon":114.52,"lat":38.05},{"county":"长安区","lon":114.52,"lat":38.05},{"county":"桥东区","lon":114.5,"lat":38.05},{"county":"桥东区","lon":114.9,"lat":40.78},{"county":"桥东区","lon":114.5,"lat":37.07},{"county":"桥西区","lon":114.47,"lat":37.05},{"county":"桥西区","lon":114.87,"lat":40.83},{"county":"桥西区","lon":114.47,"lat":38.03},{"county":"新华区","lon":114.47,"lat":38.05},{"county":"新华区","lon":116.87,"lat":38.32},{"county":"井陉矿区","lon":114.05,"lat":38.08},{"county":"裕华区","lon":114.52,"lat":38.02},{"county":"井陉县","lon":114.13,"lat":38.03},{"county":"正定县","lon":114.57,"lat":38.15},{"county":"栾城县","lon":114.65,"lat":37.88},{"county":"行唐县","lon":114.55,"lat":38.43},{"county":"灵寿县","lon":114.37,"lat":38.3},{"county":"高邑县","lon":114.6,"lat":37.6},{"county":"深泽县","lon":115.2,"lat":38.18},{"county":"赞皇县","lon":114.38,"lat":37.67},{"county":"无极县","lon":114.97,"lat":38.18},{"county":"平山县","lon":114.2,"lat":38.25},{"county":"元氏县","lon":114.52,"lat":37.75},{"county":"赵县","lon":114.77,"lat":37.75},{"county":"辛集市","lon":115.22,"lat":37.92},{"county":"藁城市","lon":114.83,"lat":38.03},{"county":"晋州市","lon":115.03,"lat":38.03},{"county":"新乐市","lon":114.68,"lat":38.35},{"county":"鹿泉市","lon":114.3,"lat":38.08},{"county":"唐山市","lon":118.2,"lat":39.63},{"county":"路南区","lon":118.17,"lat":39.63},{"county":"路北区","lon":118.22,"lat":39.63},{"county":"古冶区","lon":118.42,"lat":39.73},{"county":"开平区","lon":118.27,"lat":39.68},{"county":"丰南区","lon":118.1,"lat":39.57},{"county":"丰润区","lon":118.17,"lat":39.83},{"county":"滦县","lon":118.7,"lat":39.75},{"county":"滦南县","lon":118.68,"lat":39.5},{"county":"乐亭县","lon":118.9,"lat":39.42},{"county":"迁西县","lon":118.32,"lat":40.15},{"county":"玉田县","lon":117.73,"lat":39.88},{"county":"唐海县","lon":118.45,"lat":39.27},{"county":"遵化市","lon":117.95,"lat":40.18},{"county":"迁安市","lon":118.7,"lat":40.02},{"county":"秦皇岛市","lon":119.6,"lat":39.93},{"county":"海港区","lon":119.6,"lat":39.93},{"county":"山海关区","lon":119.77,"lat":40},{"county":"北戴河区","lon":119.48,"lat":39.83},{"county":"青龙满族自治县","lon":118.95,"lat":40.4},{"county":"昌黎县","lon":119.17,"lat":39.7},{"county":"抚宁县","lon":119.23,"lat":39.88},{"county":"卢龙县","lon":118.87,"lat":39.88},{"county":"邯郸市","lon":114.48,"lat":36.62},{"county":"邯山区","lon":114.48,"lat":36.6},{"county":"丛台区","lon":114.48,"lat":36.63},{"county":"复兴区","lon":114.45,"lat":36.63},{"county":"峰峰矿区","lon":114.2,"lat":36.42},{"county":"邯郸县","lon":114.53,"lat":36.6},{"county":"临漳县","lon":114.62,"lat":36.35},{"county":"成安县","lon":114.68,"lat":36.43},{"county":"大名县","lon":115.15,"lat":36.28},{"county":"涉县","lon":113.67,"lat":36.57},{"county":"磁县","lon":114.37,"lat":36.35},{"county":"肥乡县","lon":114.8,"lat":36.55},{"county":"永年县","lon":114.48,"lat":36.78},{"county":"邱县","lon":115.17,"lat":36.82},{"county":"鸡泽县","lon":114.87,"lat":36.92},{"county":"广平县","lon":114.93,"lat":36.48},{"county":"馆陶县","lon":115.3,"lat":36.53},{"county":"魏县","lon":114.93,"lat":36.37},{"county":"曲周县","lon":114.95,"lat":36.78},{"county":"武安市","lon":114.2,"lat":36.7},{"county":"邢台市","lon":114.48,"lat":37.07},{"county":"桥东区","lon":114.5,"lat":38.05},{"county":"桥东区","lon":114.9,"lat":40.78},{"county":"桥东区","lon":114.5,"lat":37.07},{"county":"桥西区","lon":114.87,"lat":40.83},{"county":"桥西区","lon":114.47,"lat":38.03},{"county":"桥西区","lon":114.47,"lat":37.05},{"county":"邢台县","lon":114.5,"lat":37.08},{"county":"临城县","lon":114.5,"lat":37.43},{"county":"内丘县","lon":114.52,"lat":37.3},{"county":"柏乡县","lon":114.68,"lat":37.5},{"county":"隆尧县","lon":114.77,"lat":37.35},{"county":"任县","lon":114.68,"lat":37.13},{"county":"南和县","lon":114.68,"lat":37},{"county":"宁晋县","lon":114.92,"lat":37.62},{"county":"巨鹿县","lon":115.03,"lat":37.22},{"county":"新河县","lon":115.25,"lat":37.53},{"county":"广宗县","lon":115.15,"lat":37.07},{"county":"平乡县","lon":115.03,"lat":37.07},{"county":"威县","lon":115.25,"lat":36.98},{"county":"清河县","lon":115.67,"lat":37.07},{"county":"临西县","lon":115.5,"lat":36.85},{"county":"南宫市","lon":115.38,"lat":37.35},{"county":"沙河市","lon":114.5,"lat":36.85},{"county":"保定市","lon":115.47,"lat":38.87},{"county":"新市区","lon":115.45,"lat":38.87},{"county":"北市区","lon":115.48,"lat":38.87},{"county":"南市区","lon":115.5,"lat":38.85},{"county":"满城县","lon":115.32,"lat":38.95},{"county":"清苑县","lon":115.48,"lat":38.77},{"county":"涞水县","lon":115.72,"lat":39.4},{"county":"阜平县","lon":114.18,"lat":38.85},{"county":"徐水县","lon":115.65,"lat":39.02},{"county":"定兴县","lon":115.77,"lat":39.27},{"county":"唐县","lon":114.98,"lat":38.75},{"county":"高阳县","lon":115.78,"lat":38.68},{"county":"容城县","lon":115.87,"lat":39.05},{"county":"涞源县","lon":114.68,"lat":39.35},{"county":"望都县","lon":115.15,"lat":38.72},{"county":"安新县","lon":115.93,"lat":38.92},{"county":"易县","lon":115.5,"lat":39.35},{"county":"曲阳县","lon":114.7,"lat":38.62},{"county":"蠡县","lon":115.57,"lat":38.48},{"county":"顺平县","lon":115.13,"lat":38.83},{"county":"博野县","lon":115.47,"lat":38.45},{"county":"雄县","lon":116.1,"lat":38.98},{"county":"涿州市","lon":115.97,"lat":39.48},{"county":"定州市","lon":114.97,"lat":38.52},{"county":"安国市","lon":115.32,"lat":38.42},{"county":"高碑店市","lon":115.85,"lat":39.33},{"county":"张家口市","lon":114.88,"lat":40.82},{"county":"桥东区","lon":114.5,"lat":38.05},{"county":"桥东区","lon":114.9,"lat":40.78},{"county":"桥东区","lon":114.5,"lat":37.07},{"county":"桥西区","lon":114.87,"lat":40.83},{"county":"桥西区","lon":114.47,"lat":38.03},{"county":"桥西区","lon":114.47,"lat":37.05},{"county":"宣化区","lon":115.05,"lat":40.6},{"county":"下花园区","lon":115.27,"lat":40.48},{"county":"宣化县","lon":115.02,"lat":40.55},{"county":"张北县","lon":114.7,"lat":41.15},{"county":"康保县","lon":114.62,"lat":41.85},{"county":"沽源县","lon":115.7,"lat":41.67},{"county":"尚义县","lon":113.97,"lat":41.08},{"county":"蔚县","lon":114.57,"lat":39.85},{"county":"阳原县","lon":114.17,"lat":40.12},{"county":"怀安县","lon":114.42,"lat":40.67},{"county":"万全县","lon":114.72,"lat":40.75},{"county":"怀来县","lon":115.52,"lat":40.4},{"county":"涿鹿县","lon":115.22,"lat":40.38},{"county":"赤城县","lon":115.83,"lat":40.92},{"county":"崇礼县","lon":115.27,"lat":40.97},{"county":"承德市","lon":117.93,"lat":40.97},{"county":"双桥区","lon":117.93,"lat":40.97},{"county":"双滦区","lon":117.78,"lat":40.95},{"county":"鹰手营子矿区","lon":117.65,"lat":40.55},{"county":"承德县","lon":118.17,"lat":40.77},{"county":"兴隆县","lon":117.52,"lat":40.43},{"county":"平泉县","lon":118.68,"lat":41},{"county":"滦平县","lon":117.33,"lat":40.93},{"county":"隆化县","lon":117.72,"lat":41.32},{"county":"丰宁满族自治县","lon":116.65,"lat":41.2},{"county":"宽城满族自治县","lon":118.48,"lat":40.6},{"county":"围场满族蒙古族自治县","lon":117.75,"lat":41.93},{"county":"沧州市","lon":116.83,"lat":38.3},{"county":"新华区","lon":114.47,"lat":38.05},{"county":"新华区","lon":116.87,"lat":38.32},{"county":"运河区","lon":116.85,"lat":38.32},{"county":"沧县","lon":116.87,"lat":38.3},{"county":"青县","lon":116.82,"lat":38.58},{"county":"东光县","lon":116.53,"lat":37.88},{"county":"海兴县","lon":117.48,"lat":38.13},{"county":"盐山县","lon":117.22,"lat":38.05},{"county":"肃宁县","lon":115.83,"lat":38.43},{"county":"南皮县","lon":116.7,"lat":38.03},{"county":"吴桥县","lon":116.38,"lat":37.62},{"county":"献县","lon":116.12,"lat":38.18},{"county":"孟村回族自治县","lon":117.1,"lat":38.07},{"county":"泊头市","lon":116.57,"lat":38.07},{"county":"任丘市","lon":116.1,"lat":38.72},{"county":"黄骅市","lon":117.35,"lat":38.37},{"county":"河间市","lon":116.08,"lat":38.43},{"county":"廊坊市","lon":116.7,"lat":39.52},{"county":"安次区","lon":116.68,"lat":39.52},{"county":"广阳区","lon":116.72,"lat":39.53},{"county":"固安县","lon":116.3,"lat":39.43},{"county":"永清县","lon":116.5,"lat":39.32},{"county":"香河县","lon":117,"lat":39.77},{"county":"大城县","lon":116.63,"lat":38.7},{"county":"文安县","lon":116.47,"lat":38.87},{"county":"大厂回族自治县","lon":116.98,"lat":39.88},{"county":"霸州市","lon":116.4,"lat":39.1},{"county":"三河市","lon":117.07,"lat":39.98},{"county":"衡水市","lon":115.68,"lat":37.73},{"county":"桃城区","lon":115.68,"lat":37.73},{"county":"枣强县","lon":115.72,"lat":37.52},{"county":"武邑县","lon":115.88,"lat":37.82},{"county":"武强县","lon":115.98,"lat":38.03},{"county":"饶阳县","lon":115.73,"lat":38.23},{"county":"安平县","lon":115.52,"lat":38.23},{"county":"故城县","lon":115.97,"lat":37.35},{"county":"景县","lon":116.27,"lat":37.7},{"county":"阜城县","lon":116.15,"lat":37.87},{"county":"冀州市","lon":115.57,"lat":37.57},{"county":"深州市","lon":115.55,"lat":38.02},{"county":"太原市","lon":112.55,"lat":37.87},{"county":"小店区","lon":112.57,"lat":37.73},{"county":"迎泽区","lon":112.57,"lat":37.87},{"county":"杏花岭区","lon":112.57,"lat":37.88},{"county":"尖草坪区","lon":112.48,"lat":37.93},{"county":"万柏林区","lon":112.52,"lat":37.87},{"county":"晋源区","lon":112.48,"lat":37.73},{"county":"清徐县","lon":112.35,"lat":37.6},{"county":"阳曲县","lon":112.67,"lat":38.07},{"county":"娄烦县","lon":111.78,"lat":38.07},{"county":"古交市","lon":112.17,"lat":37.92},{"county":"大同市","lon":113.3,"lat":40.08},{"county":"城区","lon":113.28,"lat":40.08},{"county":"城区","lon":113.6,"lat":37.85},{"county":"城区","lon":113.12,"lat":36.22},{"county":"城区","lon":112.83,"lat":35.5},{"county":"矿区","lon":113.17,"lat":40.03},{"county":"矿区","lon":113.57,"lat":37.87},{"county":"南郊区","lon":113.13,"lat":40},{"county":"新荣区","lon":113.15,"lat":40.27},{"county":"阳高县","lon":113.75,"lat":40.37},{"county":"天镇县","lon":114.08,"lat":40.42},{"county":"广灵县","lon":114.28,"lat":39.77},{"county":"灵丘县","lon":114.23,"lat":39.43},{"county":"浑源县","lon":113.68,"lat":39.7},{"county":"左云县","lon":112.7,"lat":40},{"county":"大同县","lon":113.6,"lat":40.03},{"county":"阳泉市","lon":113.57,"lat":37.85},{"county":"城区","lon":113.28,"lat":40.08},{"county":"城区","lon":113.6,"lat":37.85},{"county":"城区","lon":113.12,"lat":36.22},{"county":"城区","lon":112.83,"lat":35.5},{"county":"矿区","lon":113.17,"lat":40.03},{"county":"矿区","lon":113.57,"lat":37.87},{"county":"郊区","lon":113.58,"lat":37.93},{"county":"郊区","lon":113.12,"lat":36.2},{"county":"平定县","lon":113.62,"lat":37.8},{"county":"盂县","lon":113.4,"lat":38.08},{"county":"长治市","lon":113.12,"lat":36.2},{"county":"城区","lon":113.28,"lat":40.08},{"county":"城区","lon":113.6,"lat":37.85},{"county":"城区","lon":113.12,"lat":36.22},{"county":"城区","lon":112.83,"lat":35.5},{"county":"郊区","lon":113.58,"lat":37.93},{"county":"郊区","lon":113.12,"lat":36.2},{"county":"长治县","lon":113.03,"lat":36.05},{"county":"襄垣县","lon":113.05,"lat":36.53},{"county":"屯留县","lon":112.88,"lat":36.32},{"county":"平顺县","lon":113.43,"lat":36.2},{"county":"黎城县","lon":113.38,"lat":36.5},{"county":"壶关县","lon":113.2,"lat":36.12},{"county":"长子县","lon":112.87,"lat":36.12},{"county":"武乡县","lon":112.85,"lat":36.83},{"county":"沁县","lon":112.7,"lat":36.75},{"county":"沁源县","lon":112.33,"lat":36.5},{"county":"潞城市","lon":113.22,"lat":36.33},{"county":"晋城市","lon":112.83,"lat":35.5},{"county":"城区","lon":113.28,"lat":40.08},{"county":"城区","lon":113.6,"lat":37.85},{"county":"城区","lon":113.12,"lat":36.22},{"county":"城区","lon":112.83,"lat":35.5},{"county":"沁水县","lon":112.18,"lat":35.68},{"county":"阳城县","lon":112.42,"lat":35.48},{"county":"陵川县","lon":113.27,"lat":35.78},{"county":"泽州县","lon":112.83,"lat":35.5},{"county":"高平市","lon":112.92,"lat":35.8},{"county":"朔州市","lon":112.43,"lat":39.33},{"county":"朔城区","lon":112.43,"lat":39.33},{"county":"山阴县","lon":112.82,"lat":39.52},{"county":"应县","lon":113.18,"lat":39.55},{"county":"右玉县","lon":112.47,"lat":39.98},{"county":"怀仁县","lon":113.08,"lat":39.83},{"county":"晋中市","lon":112.75,"lat":37.68},{"county":"榆次区","lon":112.75,"lat":37.68},{"county":"榆社县","lon":112.97,"lat":37.07},{"county":"左权县","lon":113.37,"lat":37.07},{"county":"和顺县","lon":113.57,"lat":37.33},{"county":"昔阳县","lon":113.7,"lat":37.62},{"county":"寿阳县","lon":113.18,"lat":37.88},{"county":"太谷县","lon":112.55,"lat":37.42},{"county":"祁县","lon":112.33,"lat":37.35},{"county":"平遥县","lon":112.17,"lat":37.18},{"county":"灵石县","lon":111.77,"lat":36.85},{"county":"介休市","lon":111.92,"lat":37.03},{"county":"运城市","lon":110.98,"lat":35.02},{"county":"盐湖区","lon":110.98,"lat":35.02},{"county":"临猗县","lon":110.77,"lat":35.15},{"county":"万荣县","lon":110.83,"lat":35.42},{"county":"闻喜县","lon":111.22,"lat":35.35},{"county":"稷山县","lon":110.97,"lat":35.6},{"county":"新绛县","lon":111.22,"lat":35.62},{"county":"绛县","lon":111.57,"lat":35.48},{"county":"垣曲县","lon":111.67,"lat":35.3},{"county":"夏县","lon":111.22,"lat":35.15},{"county":"平陆县","lon":111.22,"lat":34.83},{"county":"芮城县","lon":110.68,"lat":34.7},{"county":"河津市","lon":110.7,"lat":35.6},{"county":"忻州市","lon":112.73,"lat":38.42},{"county":"忻府区","lon":112.73,"lat":38.42},{"county":"定襄县","lon":112.95,"lat":38.48},{"county":"五台县","lon":113.25,"lat":38.73},{"county":"代县","lon":112.95,"lat":39.07},{"county":"繁峙县","lon":113.25,"lat":39.18},{"county":"宁武县","lon":112.3,"lat":39},{"county":"静乐县","lon":111.93,"lat":38.37},{"county":"神池县","lon":112.2,"lat":39.08},{"county":"五寨县","lon":111.85,"lat":38.9},{"county":"岢岚县","lon":111.57,"lat":38.7},{"county":"河曲县","lon":111.13,"lat":39.38},{"county":"偏关县","lon":111.5,"lat":39.43},{"county":"原平市","lon":112.7,"lat":38.73},{"county":"临汾市","lon":111.52,"lat":36.08},{"county":"尧都区","lon":111.52,"lat":36.08},{"county":"曲沃县","lon":111.47,"lat":35.63},{"county":"翼城县","lon":111.72,"lat":35.73},{"county":"襄汾县","lon":111.43,"lat":35.88},{"county":"洪洞县","lon":111.67,"lat":36.25},{"county":"古县","lon":111.92,"lat":36.27},{"county":"安泽县","lon":112.25,"lat":36.15},{"county":"浮山县","lon":111.83,"lat":35.97},{"county":"吉县","lon":110.68,"lat":36.1},{"county":"乡宁县","lon":110.83,"lat":35.97},{"county":"大宁县","lon":110.75,"lat":36.47},{"county":"隰县","lon":110.93,"lat":36.7},{"county":"永和县","lon":110.63,"lat":36.77},{"county":"蒲县","lon":111.08,"lat":36.42},{"county":"汾西县","lon":111.57,"lat":36.65},{"county":"侯马市","lon":111.35,"lat":35.62},{"county":"霍州市","lon":111.72,"lat":36.57},{"county":"吕梁市","lon":111.13,"lat":37.52},{"county":"离石区","lon":111.13,"lat":37.52},{"county":"文水县","lon":112.02,"lat":37.43},{"county":"交城县","lon":112.15,"lat":37.55},{"county":"兴县","lon":111.12,"lat":38.47},{"county":"临县","lon":110.98,"lat":37.95},{"county":"柳林县","lon":110.9,"lat":37.43},{"county":"石楼县","lon":110.83,"lat":37},{"county":"岚县","lon":111.67,"lat":38.28},{"county":"方山县","lon":111.23,"lat":37.88},{"county":"中阳县","lon":111.18,"lat":37.33},{"county":"交口县","lon":111.2,"lat":36.97},{"county":"孝义市","lon":111.77,"lat":37.15},{"county":"汾阳市","lon":111.78,"lat":37.27},{"county":"呼和浩特市","lon":111.73,"lat":40.83},{"county":"新城区","lon":111.65,"lat":40.87},{"county":"回民区","lon":111.6,"lat":40.8},{"county":"玉泉区","lon":111.67,"lat":40.75},{"county":"赛罕区","lon":111.68,"lat":40.8},{"county":"土默特左旗","lon":111.13,"lat":40.72},{"county":"托克托县","lon":111.18,"lat":40.27},{"county":"和林格尔县","lon":111.82,"lat":40.38},{"county":"清水河县","lon":111.68,"lat":39.92},{"county":"武川县","lon":111.45,"lat":41.08},{"county":"包头市","lon":109.83,"lat":40.65},{"county":"东河区","lon":110.02,"lat":40.58},{"county":"昆都仑区","lon":109.83,"lat":40.63},{"county":"青山区","lon":109.9,"lat":40.65},{"county":"石拐区","lon":110.27,"lat":40.68},{"county":"九原区","lon":109.97,"lat":40.6},{"county":"土默特右旗","lon":110.52,"lat":40.57},{"county":"固阳县","lon":110.05,"lat":41.03},{"county":"达尔罕茂明安联合旗","lon":110.43,"lat":41.7},{"county":"乌海市","lon":106.82,"lat":39.67},{"county":"海勃湾区","lon":106.83,"lat":39.7},{"county":"海南区","lon":106.88,"lat":39.43},{"county":"乌达区","lon":106.7,"lat":39.5},{"county":"赤峰市","lon":118.92,"lat":42.27},{"county":"红山区","lon":118.97,"lat":42.28},{"county":"元宝山区","lon":119.28,"lat":42.03},{"county":"松山区","lon":118.92,"lat":42.28},{"county":"阿鲁科尔沁旗","lon":120.08,"lat":43.88},{"county":"巴林左旗","lon":119.38,"lat":43.98},{"county":"巴林右旗","lon":118.67,"lat":43.52},{"county":"林西县","lon":118.05,"lat":43.6},{"county":"克什克腾旗","lon":117.53,"lat":43.25},{"county":"翁牛特旗","lon":119.02,"lat":42.93},{"county":"喀喇沁旗","lon":118.7,"lat":41.93},{"county":"宁城县","lon":119.33,"lat":41.6},{"county":"敖汉旗","lon":119.9,"lat":42.28},{"county":"通辽市","lon":122.27,"lat":43.62},{"county":"科尔沁区","lon":122.27,"lat":43.62},{"county":"科尔沁左翼中旗","lon":123.32,"lat":44.13},{"county":"科尔沁左翼后旗","lon":122.35,"lat":42.95},{"county":"开鲁县","lon":121.3,"lat":43.6},{"county":"库伦旗","lon":121.77,"lat":42.73},{"county":"奈曼旗","lon":120.65,"lat":42.85},{"county":"扎鲁特旗","lon":120.92,"lat":44.55},{"county":"霍林郭勒市","lon":119.65,"lat":45.53},{"county":"鄂尔多斯市","lon":109.8,"lat":39.62},{"county":"东胜区","lon":110,"lat":39.82},{"county":"达拉特旗","lon":110.03,"lat":40.4},{"county":"准格尔旗","lon":111.23,"lat":39.87},{"county":"鄂托克前旗","lon":107.48,"lat":38.18},{"county":"鄂托克旗","lon":107.98,"lat":39.1},{"county":"杭锦旗","lon":108.72,"lat":39.83},{"county":"乌审旗","lon":108.85,"lat":38.6},{"county":"伊金霍洛旗","lon":109.73,"lat":39.57},{"county":"呼伦贝尔市","lon":119.77,"lat":49.22},{"county":"海拉尔区","lon":119.77,"lat":49.22},{"county":"阿荣旗","lon":123.47,"lat":48.13},{"county":"鄂伦春自治旗","lon":123.72,"lat":50.58},{"county":"鄂温克族自治旗","lon":119.75,"lat":49.13},{"county":"陈巴尔虎旗","lon":119.43,"lat":49.32},{"county":"新巴尔虎左旗","lon":118.27,"lat":48.22},{"county":"新巴尔虎右旗","lon":116.82,"lat":48.67},{"county":"满洲里市","lon":117.45,"lat":49.58},{"county":"牙克石市","lon":120.73,"lat":49.28},{"county":"扎兰屯市","lon":122.75,"lat":47.98},{"county":"额尔古纳市","lon":120.18,"lat":50.23},{"county":"根河市","lon":121.52,"lat":50.78},{"county":"巴彦淖尔市","lon":107.42,"lat":40.75},{"county":"临河区","lon":107.4,"lat":40.75},{"county":"五原县","lon":108.27,"lat":41.1},{"county":"磴口县","lon":107.02,"lat":40.33},{"county":"乌拉特前旗","lon":108.65,"lat":40.72},{"county":"乌拉特中旗","lon":108.52,"lat":41.57},{"county":"乌拉特后旗","lon":107.07,"lat":41.1},{"county":"杭锦后旗","lon":107.15,"lat":40.88},{"county":"乌兰察布市","lon":113.12,"lat":40.98},{"county":"集宁区","lon":113.1,"lat":41.03},{"county":"卓资县","lon":112.57,"lat":40.9},{"county":"化德县","lon":114,"lat":41.9},{"county":"商都县","lon":113.53,"lat":41.55},{"county":"兴和县","lon":113.88,"lat":40.88},{"county":"凉城县","lon":112.48,"lat":40.53},{"county":"察哈尔右翼前旗","lon":113.22,"lat":40.78},{"county":"察哈尔右翼中旗","lon":112.63,"lat":41.27},{"county":"察哈尔右翼后旗","lon":113.18,"lat":41.45},{"county":"四子王旗","lon":111.7,"lat":41.52},{"county":"丰镇市","lon":113.15,"lat":40.43},{"county":"兴安盟","lon":122.05,"lat":46.08},{"county":"乌兰浩特市","lon":122.05,"lat":46.08},{"county":"阿尔山市","lon":119.93,"lat":47.18},{"county":"科尔沁右翼前旗","lon":121.92,"lat":46.07},{"county":"科尔沁右翼中旗","lon":121.47,"lat":45.05},{"county":"扎赉特旗","lon":122.9,"lat":46.73},{"county":"突泉县","lon":121.57,"lat":45.38},{"county":"锡林郭勒盟","lon":116.07,"lat":43.95},{"county":"二连浩特市","lon":111.98,"lat":43.65},{"county":"锡林浩特市","lon":116.07,"lat":43.93},{"county":"阿巴嘎旗","lon":114.97,"lat":44.02},{"county":"苏尼特左旗","lon":113.63,"lat":43.85},{"county":"苏尼特右旗","lon":112.65,"lat":42.75},{"county":"东乌珠穆沁旗","lon":116.97,"lat":45.52},{"county":"西乌珠穆沁旗","lon":117.6,"lat":44.58},{"county":"太仆寺旗","lon":115.28,"lat":41.9},{"county":"镶黄旗","lon":113.83,"lat":42.23},{"county":"正镶白旗","lon":115,"lat":42.3},{"county":"正蓝旗","lon":116,"lat":42.25},{"county":"多伦县","lon":116.47,"lat":42.18},{"county":"阿拉善盟","lon":105.67,"lat":38.83},{"county":"阿拉善左旗","lon":105.67,"lat":38.83},{"county":"阿拉善右旗","lon":101.68,"lat":39.2},{"county":"额济纳旗","lon":101.07,"lat":41.97},{"county":"沈阳市","lon":123.43,"lat":41.8},{"county":"和平区","lon":123.4,"lat":41.78},{"county":"沈河区","lon":123.45,"lat":41.8},{"county":"大东区","lon":123.47,"lat":41.8},{"county":"皇姑区","lon":123.42,"lat":41.82},{"county":"铁西区","lon":122.95,"lat":41.12},{"county":"铁西区","lon":123.35,"lat":41.8},{"county":"苏家屯区","lon":123.33,"lat":41.67},{"county":"东陵区","lon":123.47,"lat":41.77},{"county":"新城子区","lon":123.52,"lat":42.05},{"county":"于洪区","lon":123.3,"lat":41.78},{"county":"辽中县","lon":122.72,"lat":41.52},{"county":"康平县","lon":123.35,"lat":42.75},{"county":"法库县","lon":123.4,"lat":42.5},{"county":"新民市","lon":122.82,"lat":42},{"county":"大连市","lon":121.62,"lat":38.92},{"county":"中山区","lon":121.63,"lat":38.92},{"county":"西岗区","lon":121.6,"lat":38.92},{"county":"沙河口区","lon":121.58,"lat":38.9},{"county":"甘井子区","lon":121.57,"lat":38.95},{"county":"旅顺口区","lon":121.27,"lat":38.82},{"county":"金州区","lon":121.7,"lat":39.1},{"county":"长海县","lon":122.58,"lat":39.27},{"county":"瓦房店市","lon":122,"lat":39.62},{"county":"普兰店市","lon":121.95,"lat":39.4},{"county":"庄河市","lon":122.98,"lat":39.7},{"county":"鞍山市","lon":122.98,"lat":41.1},{"county":"铁东区","lon":122.98,"lat":41.1},{"county":"铁西区","lon":122.95,"lat":41.12},{"county":"铁西区","lon":123.35,"lat":41.8},{"county":"立山区","lon":123,"lat":41.15},{"county":"千山区","lon":122.97,"lat":41.07},{"county":"台安县","lon":122.42,"lat":41.38},{"county":"岫岩满族自治县","lon":123.28,"lat":40.28},{"county":"海城市","lon":122.7,"lat":40.88},{"county":"抚顺市","lon":123.98,"lat":41.88},{"county":"新抚区","lon":123.88,"lat":41.87},{"county":"东洲区","lon":124.02,"lat":41.85},{"county":"望花区","lon":123.78,"lat":41.85},{"county":"顺城区","lon":123.93,"lat":41.88},{"county":"抚顺县","lon":123.9,"lat":41.88},{"county":"新宾满族自治县","lon":125.03,"lat":41.73},{"county":"清原满族自治县","lon":124.92,"lat":42.1},{"county":"本溪市","lon":123.77,"lat":41.3},{"county":"平山区","lon":123.77,"lat":41.3},{"county":"溪湖区","lon":123.77,"lat":41.33},{"county":"明山区","lon":123.82,"lat":41.3},{"county":"南芬区","lon":123.73,"lat":41.1},{"county":"本溪满族自治县","lon":124.12,"lat":41.3},{"county":"桓仁满族自治县","lon":125.35,"lat":41.27},{"county":"丹东市","lon":124.38,"lat":40.13},{"county":"元宝区","lon":124.38,"lat":40.13},{"county":"振兴区","lon":124.35,"lat":40.08},{"county":"振安区","lon":124.42,"lat":40.17},{"county":"宽甸满族自治县","lon":124.78,"lat":40.73},{"county":"东港市","lon":124.15,"lat":39.87},{"county":"凤城市","lon":124.07,"lat":40.45},{"county":"锦州市","lon":121.13,"lat":41.1},{"county":"古塔区","lon":121.12,"lat":41.13},{"county":"凌河区","lon":121.15,"lat":41.12},{"county":"太和区","lon":121.1,"lat":41.1},{"county":"黑山县","lon":122.12,"lat":41.7},{"county":"义县","lon":121.23,"lat":41.53},{"county":"凌海市","lon":121.35,"lat":41.17},{"county":"营口市","lon":122.23,"lat":40.67},{"county":"站前区","lon":122.27,"lat":40.68},{"county":"西市区","lon":122.22,"lat":40.67},{"county":"鲅鱼圈区","lon":122.12,"lat":40.27},{"county":"老边区","lon":122.37,"lat":40.67},{"county":"盖州市","lon":122.35,"lat":40.4},{"county":"大石桥市","lon":122.5,"lat":40.65},{"county":"阜新市","lon":121.67,"lat":42.02},{"county":"海州区","lon":121.65,"lat":42.02},{"county":"太平区","lon":121.67,"lat":42.02},{"county":"清河门区","lon":121.42,"lat":41.75},{"county":"细河区","lon":121.68,"lat":42.03},{"county":"阜新蒙古族自治县","lon":121.75,"lat":42.07},{"county":"彰武县","lon":122.53,"lat":42.38},{"county":"辽阳市","lon":123.17,"lat":41.27},{"county":"白塔区","lon":123.17,"lat":41.27},{"county":"文圣区","lon":123.18,"lat":41.27},{"county":"宏伟区","lon":123.2,"lat":41.2},{"county":"弓长岭区","lon":123.45,"lat":41.13},{"county":"太子河区","lon":123.18,"lat":41.25},{"county":"辽阳县","lon":123.07,"lat":41.22},{"county":"灯塔市","lon":123.33,"lat":41.42},{"county":"盘锦市","lon":122.07,"lat":41.12},{"county":"双台子区","lon":122.05,"lat":41.2},{"county":"兴隆台区","lon":122.07,"lat":41.12},{"county":"大洼县","lon":122.07,"lat":40.98},{"county":"盘山县","lon":122.02,"lat":41.25},{"county":"铁岭市","lon":123.83,"lat":42.28},{"county":"银州区","lon":123.85,"lat":42.28},{"county":"清河区","lon":124.15,"lat":42.53},{"county":"铁岭县","lon":123.83,"lat":42.3},{"county":"西丰县","lon":124.72,"lat":42.73},{"county":"昌图县","lon":124.1,"lat":42.78},{"county":"调兵山市","lon":123.55,"lat":42.47},{"county":"开原市","lon":124.03,"lat":42.55},{"county":"朝阳市","lon":120.45,"lat":41.57},{"county":"双塔区","lon":120.45,"lat":41.57},{"county":"龙城区","lon":120.43,"lat":41.6},{"county":"朝阳县","lon":120.47,"lat":41.58},{"county":"建平县","lon":119.63,"lat":41.4},{"county":"北票市","lon":120.77,"lat":41.8},{"county":"凌源市","lon":119.4,"lat":41.25},{"county":"葫芦岛市","lon":120.83,"lat":40.72},{"county":"连山区","lon":120.87,"lat":40.77},{"county":"龙港区","lon":120.93,"lat":40.72},{"county":"南票区","lon":120.75,"lat":41.1},{"county":"绥中县","lon":120.33,"lat":40.32},{"county":"建昌县","lon":119.8,"lat":40.82},{"county":"兴城市","lon":120.72,"lat":40.62},{"county":"长春市","lon":125.32,"lat":43.9},{"county":"南关区","lon":125.33,"lat":43.87},{"county":"宽城区","lon":125.32,"lat":43.92},{"county":"朝阳区","lon":125.28,"lat":43.83},{"county":"二道区","lon":125.37,"lat":43.87},{"county":"绿园区","lon":125.25,"lat":43.88},{"county":"双阳区","lon":125.67,"lat":43.52},{"county":"农安县","lon":125.18,"lat":44.43},{"county":"九台市","lon":125.83,"lat":44.15},{"county":"榆树市","lon":126.55,"lat":44.82},{"county":"德惠市","lon":125.7,"lat":44.53},{"county":"吉林市","lon":126.55,"lat":43.83},{"county":"昌邑区","lon":126.57,"lat":43.88},{"county":"龙潭区","lon":126.57,"lat":43.92},{"county":"船营区","lon":126.53,"lat":43.83},{"county":"丰满区","lon":126.57,"lat":43.82},{"county":"永吉县","lon":126.5,"lat":43.67},{"county":"蛟河市","lon":127.33,"lat":43.72},{"county":"桦甸市","lon":126.73,"lat":42.97},{"county":"舒兰市","lon":126.95,"lat":44.42},{"county":"磐石市","lon":126.05,"lat":42.95},{"county":"四平市","lon":124.35,"lat":43.17},{"county":"铁西区","lon":124.35,"lat":43.15},{"county":"铁东区","lon":124.38,"lat":43.17},{"county":"梨树县","lon":124.33,"lat":43.32},{"county":"伊通满族自治县","lon":125.3,"lat":43.35},{"county":"公主岭市","lon":124.82,"lat":43.5},{"county":"双辽市","lon":123.5,"lat":43.52},{"county":"辽源市","lon":125.13,"lat":42.88},{"county":"龙山区","lon":125.12,"lat":42.9},{"county":"西安区","lon":125.15,"lat":42.92},{"county":"东丰县","lon":125.53,"lat":42.68},{"county":"东辽县","lon":125,"lat":42.92},{"county":"通化市","lon":125.93,"lat":41.73},{"county":"东昌区","lon":125.95,"lat":41.73},{"county":"二道江区","lon":126.03,"lat":41.77},{"county":"通化县","lon":125.75,"lat":41.68},{"county":"辉南县","lon":126.03,"lat":42.68},{"county":"柳河县","lon":125.73,"lat":42.28},{"county":"梅河口市","lon":125.68,"lat":42.53},{"county":"集安市","lon":126.18,"lat":41.12},{"county":"白山市","lon":126.42,"lat":41.93},{"county":"八道江区","lon":126.4,"lat":41.93},{"county":"抚松县","lon":127.28,"lat":42.33},{"county":"靖宇县","lon":126.8,"lat":42.4},{"county":"长白朝鲜族自治县","lon":128.2,"lat":41.42},{"county":"临江市","lon":126.9,"lat":41.8},{"county":"松原市","lon":124.82,"lat":45.13},{"county":"宁江区","lon":124.8,"lat":45.17},{"county":"长岭县","lon":123.98,"lat":44.28},{"county":"乾安县","lon":124.02,"lat":45.02},{"county":"扶余县","lon":126.02,"lat":44.98},{"county":"白城市","lon":122.83,"lat":45.62},{"county":"洮北区","lon":122.85,"lat":45.62},{"county":"镇赉县","lon":123.2,"lat":45.85},{"county":"通榆县","lon":123.08,"lat":44.82},{"county":"洮南市","lon":122.78,"lat":45.33},{"county":"大安市","lon":124.28,"lat":45.5},{"county":"延边朝鲜族自治州","lon":129.5,"lat":42.88},{"county":"延吉市","lon":129.5,"lat":42.88},{"county":"图们市","lon":129.83,"lat":42.97},{"county":"敦化市","lon":128.23,"lat":43.37},{"county":"珲春市","lon":130.37,"lat":42.87},{"county":"龙井市","lon":129.42,"lat":42.77},{"county":"和龙市","lon":129,"lat":42.53},{"county":"汪清县","lon":129.75,"lat":43.32},{"county":"安图县","lon":128.9,"lat":43.12},{"county":"哈尔滨市","lon":126.53,"lat":45.8},{"county":"道里区","lon":126.62,"lat":45.77},{"county":"南岗区","lon":126.68,"lat":45.77},{"county":"道外区","lon":126.65,"lat":45.78},{"county":"香坊区","lon":126.68,"lat":45.72},{"county":"平房区","lon":126.62,"lat":45.62},{"county":"松北区","lon":126.55,"lat":45.8},{"county":"呼兰区","lon":126.58,"lat":45.9},{"county":"依兰县","lon":129.55,"lat":46.32},{"county":"方正县","lon":128.83,"lat":45.83},{"county":"宾县","lon":127.48,"lat":45.75},{"county":"巴彦县","lon":127.4,"lat":46.08},{"county":"木兰县","lon":128.03,"lat":45.95},{"county":"通河县","lon":128.75,"lat":45.97},{"county":"延寿县","lon":128.33,"lat":45.45},{"county":"双城市","lon":126.32,"lat":45.37},{"county":"尚志市","lon":127.95,"lat":45.22},{"county":"五常市","lon":127.15,"lat":44.92},{"county":"齐齐哈尔市","lon":123.95,"lat":47.33},{"county":"龙沙区","lon":123.95,"lat":47.32},{"county":"建华区","lon":123.95,"lat":47.35},{"county":"铁锋区","lon":123.98,"lat":47.35},{"county":"昂昂溪区","lon":123.8,"lat":47.15},{"county":"富拉尔基区","lon":123.62,"lat":47.2},{"county":"龙江县","lon":123.18,"lat":47.33},{"county":"依安县","lon":125.3,"lat":47.88},{"county":"泰来县","lon":123.42,"lat":46.4},{"county":"甘南县","lon":123.5,"lat":47.92},{"county":"富裕县","lon":124.47,"lat":47.82},{"county":"克山县","lon":125.87,"lat":48.03},{"county":"克东县","lon":126.25,"lat":48.03},{"county":"拜泉县","lon":126.08,"lat":47.6},{"county":"讷河市","lon":124.87,"lat":48.48},{"county":"鸡西市","lon":130.97,"lat":45.3},{"county":"鸡冠区","lon":130.97,"lat":45.3},{"county":"恒山区","lon":130.93,"lat":45.2},{"county":"滴道区","lon":130.78,"lat":45.37},{"county":"梨树区","lon":130.68,"lat":45.08},{"county":"城子河区","lon":131,"lat":45.33},{"county":"麻山区","lon":130.52,"lat":45.2},{"county":"鸡东县","lon":131.13,"lat":45.25},{"county":"虎林市","lon":132.98,"lat":45.77},{"county":"密山市","lon":131.87,"lat":45.55},{"county":"鹤岗市","lon":130.27,"lat":47.33},{"county":"向阳区","lon":130.28,"lat":47.33},{"county":"向阳区","lon":130.33,"lat":46.8},{"county":"工农区","lon":130.25,"lat":47.32},{"county":"南山区","lon":130.28,"lat":47.3},{"county":"兴安区","lon":130.22,"lat":47.27},{"county":"东山区","lon":130.32,"lat":47.33},{"county":"兴山区","lon":130.3,"lat":47.37},{"county":"萝北县","lon":130.83,"lat":47.58},{"county":"绥滨县","lon":131.85,"lat":47.28},{"county":"双鸭山市","lon":131.15,"lat":46.63},{"county":"尖山区","lon":131.17,"lat":46.63},{"county":"岭东区","lon":131.13,"lat":46.57},{"county":"四方台区","lon":131.33,"lat":46.58},{"county":"宝山区","lon":131.4,"lat":46.57},{"county":"集贤县","lon":131.13,"lat":46.72},{"county":"友谊县","lon":131.8,"lat":46.78},{"county":"宝清县","lon":132.2,"lat":46.32},{"county":"饶河县","lon":134.02,"lat":46.8},{"county":"大庆市","lon":125.03,"lat":46.58},{"county":"萨尔图区","lon":125.02,"lat":46.6},{"county":"龙凤区","lon":125.1,"lat":46.53},{"county":"让胡路区","lon":124.85,"lat":46.65},{"county":"红岗区","lon":124.88,"lat":46.4},{"county":"大同区","lon":124.82,"lat":46.03},{"county":"肇州县","lon":125.27,"lat":45.7},{"county":"肇源县","lon":125.08,"lat":45.52},{"county":"林甸县","lon":124.87,"lat":47.18},{"county":"杜尔伯特蒙古族自治县","lon":124.45,"lat":46.87},{"county":"伊春市","lon":128.9,"lat":47.73},{"county":"南岔区","lon":129.28,"lat":47.13},{"county":"友好区","lon":128.82,"lat":47.85},{"county":"西林区","lon":129.28,"lat":47.48},{"county":"翠峦区","lon":128.65,"lat":47.72},{"county":"新青区","lon":129.53,"lat":48.28},{"county":"美溪区","lon":129.13,"lat":47.63},{"county":"金山屯区","lon":129.43,"lat":47.42},{"county":"五营区","lon":129.25,"lat":48.12},{"county":"乌马河区","lon":128.78,"lat":47.72},{"county":"汤旺河区","lon":129.57,"lat":48.45},{"county":"带岭区","lon":129.02,"lat":47.02},{"county":"乌伊岭区","lon":129.42,"lat":48.6},{"county":"红星区","lon":129.38,"lat":48.23},{"county":"上甘岭区","lon":129.02,"lat":47.97},{"county":"嘉荫县","lon":130.38,"lat":48.88},{"county":"铁力市","lon":128.02,"lat":46.98},{"county":"佳木斯市","lon":130.37,"lat":46.82},{"county":"向阳区","lon":130.28,"lat":47.33},{"county":"向阳区","lon":130.33,"lat":46.8},{"county":"前进区","lon":130.37,"lat":46.82},{"county":"东风区","lon":130.4,"lat":46.82},{"county":"郊区","lon":130.32,"lat":46.8},{"county":"桦南县","lon":130.57,"lat":46.23},{"county":"桦川县","lon":130.72,"lat":47.02},{"county":"汤原县","lon":129.9,"lat":46.73},{"county":"抚远县","lon":134.28,"lat":48.37},{"county":"同江市","lon":132.52,"lat":47.65},{"county":"富锦市","lon":132.03,"lat":47.25},{"county":"七台河市","lon":130.95,"lat":45.78},{"county":"新兴区","lon":130.83,"lat":45.8},{"county":"桃山区","lon":130.97,"lat":45.77},{"county":"茄子河区","lon":131.07,"lat":45.77},{"county":"勃利县","lon":130.57,"lat":45.75},{"county":"牡丹江市","lon":129.6,"lat":44.58},{"county":"东安区","lon":129.62,"lat":44.58},{"county":"阳明区","lon":129.63,"lat":44.6},{"county":"爱民区","lon":129.58,"lat":44.58},{"county":"西安区","lon":129.62,"lat":44.57},{"county":"东宁县","lon":131.12,"lat":44.07},{"county":"林口县","lon":130.27,"lat":45.3},{"county":"绥芬河市","lon":131.15,"lat":44.42},{"county":"海林市","lon":129.38,"lat":44.57},{"county":"宁安市","lon":129.47,"lat":44.35},{"county":"穆棱市","lon":130.52,"lat":44.92},{"county":"黑河市","lon":127.48,"lat":50.25},{"county":"爱辉区","lon":127.48,"lat":50.25},{"county":"逊克县","lon":128.47,"lat":49.58},{"county":"孙吴县","lon":127.32,"lat":49.42},{"county":"北安市","lon":126.52,"lat":48.23},{"county":"五大连池市","lon":126.2,"lat":48.52},{"county":"绥化市","lon":126.98,"lat":46.63},{"county":"北林区","lon":126.98,"lat":46.63},{"county":"望奎县","lon":126.48,"lat":46.83},{"county":"兰西县","lon":126.28,"lat":46.27},{"county":"青冈县","lon":126.1,"lat":46.68},{"county":"庆安县","lon":127.52,"lat":46.88},{"county":"明水县","lon":125.9,"lat":47.18},{"county":"绥棱县","lon":127.1,"lat":47.25},{"county":"安达市","lon":125.33,"lat":46.4},{"county":"肇东市","lon":125.98,"lat":46.07},{"county":"海伦市","lon":126.97,"lat":47.47},{"county":"大兴安岭地区","lon":124.12,"lat":50.42},{"county":"呼玛县","lon":126.65,"lat":51.73},{"county":"塔河县","lon":124.7,"lat":52.32},{"county":"漠河县","lon":122.53,"lat":52.97},{"county":"上海市","lon":121.47,"lat":31.23},{"county":"黄浦区","lon":121.48,"lat":31.23},{"county":"卢湾区","lon":121.47,"lat":31.22},{"county":"徐汇区","lon":121.43,"lat":31.18},{"county":"长宁区","lon":121.42,"lat":31.22},{"county":"静安区","lon":121.45,"lat":31.23},{"county":"普陀区","lon":121.4,"lat":31.25},{"county":"闸北区","lon":121.45,"lat":31.25},{"county":"虹口区","lon":121.5,"lat":31.27},{"county":"杨浦区","lon":121.52,"lat":31.27},{"county":"闵行区","lon":121.38,"lat":31.12},{"county":"宝山区","lon":121.48,"lat":31.4},{"county":"嘉定区","lon":121.27,"lat":31.38},{"county":"浦东新区","lon":121.53,"lat":31.22},{"county":"金山区","lon":121.33,"lat":30.75},{"county":"松江区","lon":121.22,"lat":31.03},{"county":"青浦区","lon":121.12,"lat":31.15},{"county":"南汇区","lon":121.75,"lat":31.05},{"county":"奉贤区","lon":121.47,"lat":30.92},{"county":"崇明县","lon":121.4,"lat":31.62},{"county":"南京市","lon":118.78,"lat":32.07},{"county":"玄武区","lon":118.8,"lat":32.05},{"county":"白下区","lon":118.78,"lat":32.03},{"county":"秦淮区","lon":118.8,"lat":32.02},{"county":"建邺区","lon":118.75,"lat":32.03},{"county":"鼓楼区","lon":117.18,"lat":34.28},{"county":"鼓楼区","lon":118.77,"lat":32.07},{"county":"下关区","lon":118.73,"lat":32.08},{"county":"浦口区","lon":118.62,"lat":32.05},{"county":"栖霞区","lon":118.88,"lat":32.12},{"county":"雨花台区","lon":118.77,"lat":32},{"county":"江宁区","lon":118.85,"lat":31.95},{"county":"六合区","lon":118.83,"lat":32.35},{"county":"溧水县","lon":119.02,"lat":31.65},{"county":"高淳县","lon":118.88,"lat":31.33},{"county":"无锡市","lon":120.3,"lat":31.57},{"county":"崇安区","lon":120.3,"lat":31.58},{"county":"南长区","lon":120.3,"lat":31.57},{"county":"北塘区","lon":120.28,"lat":31.58},{"county":"锡山区","lon":120.35,"lat":31.6},{"county":"惠山区","lon":120.28,"lat":31.68},{"county":"滨湖区","lon":120.27,"lat":31.57},{"county":"江阴市","lon":120.27,"lat":31.9},{"county":"宜兴市","lon":119.82,"lat":31.35},{"county":"徐州市","lon":117.18,"lat":34.27},{"county":"鼓楼区","lon":117.18,"lat":34.28},{"county":"鼓楼区","lon":118.77,"lat":32.07},{"county":"云龙区","lon":117.22,"lat":34.25},{"county":"九里区","lon":117.13,"lat":34.3},{"county":"贾汪区","lon":117.45,"lat":34.45},{"county":"泉山区","lon":117.18,"lat":34.25},{"county":"丰县","lon":116.6,"lat":34.7},{"county":"沛县","lon":116.93,"lat":34.73},{"county":"铜山县","lon":117.17,"lat":34.18},{"county":"睢宁县","lon":117.95,"lat":33.9},{"county":"新沂市","lon":118.35,"lat":34.38},{"county":"邳州市","lon":117.95,"lat":34.32},{"county":"常州市","lon":119.95,"lat":31.78},{"county":"天宁区","lon":119.93,"lat":31.75},{"county":"钟楼区","lon":119.93,"lat":31.78},{"county":"戚墅堰区","lon":120.05,"lat":31.73},{"county":"新北区","lon":119.97,"lat":31.83},{"county":"武进区","lon":119.93,"lat":31.72},{"county":"溧阳市","lon":119.48,"lat":31.42},{"county":"金坛市","lon":119.57,"lat":31.75},{"county":"苏州市","lon":120.58,"lat":31.3},{"county":"沧浪区","lon":120.63,"lat":31.3},{"county":"平江区","lon":120.63,"lat":31.32},{"county":"金阊区","lon":120.6,"lat":31.32},{"county":"虎丘区","lon":120.57,"lat":31.3},{"county":"吴中区","lon":120.63,"lat":31.27},{"county":"相城区","lon":120.63,"lat":31.37},{"county":"常熟市","lon":120.75,"lat":31.65},{"county":"张家港市","lon":120.55,"lat":31.87},{"county":"昆山市","lon":120.98,"lat":31.38},{"county":"吴江市","lon":120.63,"lat":31.17},{"county":"太仓市","lon":121.1,"lat":31.45},{"county":"南通市","lon":120.88,"lat":31.98},{"county":"崇川区","lon":120.85,"lat":32},{"county":"港闸区","lon":120.8,"lat":32.03},{"county":"海安县","lon":120.45,"lat":32.55},{"county":"如东县","lon":121.18,"lat":32.32},{"county":"启东市","lon":121.65,"lat":31.82},{"county":"如皋市","lon":120.57,"lat":32.4},{"county":"通州市","lon":121.07,"lat":32.08},{"county":"海门市","lon":121.17,"lat":31.9},{"county":"连云港市","lon":119.22,"lat":34.6},{"county":"连云区","lon":119.37,"lat":34.75},{"county":"新浦区","lon":119.17,"lat":34.6},{"county":"海州区","lon":119.12,"lat":34.57},{"county":"赣榆县","lon":119.12,"lat":34.83},{"county":"东海县","lon":118.77,"lat":34.53},{"county":"灌云县","lon":119.25,"lat":34.3},{"county":"灌南县","lon":119.35,"lat":34.08},{"county":"淮安市","lon":119.02,"lat":33.62},{"county":"清河区","lon":119.02,"lat":33.6},{"county":"楚州区","lon":119.13,"lat":33.5},{"county":"淮阴区","lon":119.03,"lat":33.63},{"county":"清浦区","lon":119.03,"lat":33.58},{"county":"涟水县","lon":119.27,"lat":33.78},{"county":"洪泽县","lon":118.83,"lat":33.3},{"county":"盱眙县","lon":118.48,"lat":33},{"county":"金湖县","lon":119.02,"lat":33.02},{"county":"盐城市","lon":120.15,"lat":33.35},{"county":"亭湖区","lon":120.13,"lat":33.4},{"county":"盐都区","lon":120.15,"lat":33.33},{"county":"响水县","lon":119.57,"lat":34.2},{"county":"滨海县","lon":119.83,"lat":33.98},{"county":"阜宁县","lon":119.8,"lat":33.78},{"county":"射阳县","lon":120.25,"lat":33.78},{"county":"建湖县","lon":119.8,"lat":33.47},{"county":"东台市","lon":120.3,"lat":32.85},{"county":"大丰市","lon":120.47,"lat":33.2},{"county":"扬州市","lon":119.4,"lat":32.4},{"county":"广陵区","lon":119.43,"lat":32.38},{"county":"邗江区","lon":119.4,"lat":32.38},{"county":"维扬区","lon":119.4,"lat":32.42},{"county":"宝应县","lon":119.3,"lat":33.23},{"county":"仪征市","lon":119.18,"lat":32.27},{"county":"高邮市","lon":119.43,"lat":32.78},{"county":"江都市","lon":119.55,"lat":32.43},{"county":"镇江市","lon":119.45,"lat":32.2},{"county":"京口区","lon":119.47,"lat":32.2},{"county":"润州区","lon":119.4,"lat":32.2},{"county":"丹徒区","lon":119.45,"lat":32.13},{"county":"丹阳市","lon":119.57,"lat":32},{"county":"扬中市","lon":119.82,"lat":32.23},{"county":"句容市","lon":119.17,"lat":31.95},{"county":"泰州市","lon":119.92,"lat":32.45},{"county":"兴化市","lon":119.85,"lat":32.92},{"county":"靖江市","lon":120.27,"lat":32.02},{"county":"泰兴市","lon":120.02,"lat":32.17},{"county":"姜堰市","lon":120.15,"lat":32.52},{"county":"宿迁市","lon":118.28,"lat":33.97},{"county":"宿城区","lon":118.25,"lat":33.97},{"county":"宿豫区","lon":118.32,"lat":33.95},{"county":"沭阳县","lon":118.77,"lat":34.13},{"county":"泗阳县","lon":118.68,"lat":33.72},{"county":"泗洪县","lon":118.22,"lat":33.47},{"county":"杭州市","lon":120.15,"lat":30.28},{"county":"上城区","lon":120.17,"lat":30.25},{"county":"下城区","lon":120.17,"lat":30.28},{"county":"江干区","lon":120.2,"lat":30.27},{"county":"拱墅区","lon":120.13,"lat":30.32},{"county":"西湖区","lon":120.13,"lat":30.27},{"county":"滨江区","lon":120.2,"lat":30.2},{"county":"萧山区","lon":120.27,"lat":30.17},{"county":"余杭区","lon":120.3,"lat":30.42},{"county":"桐庐县","lon":119.67,"lat":29.8},{"county":"淳安县","lon":119.03,"lat":29.6},{"county":"建德市","lon":119.28,"lat":29.48},{"county":"富阳市","lon":119.95,"lat":30.05},{"county":"临安市","lon":119.72,"lat":30.23},{"county":"宁波市","lon":121.55,"lat":29.88},{"county":"海曙区","lon":121.55,"lat":29.87},{"county":"江东区","lon":121.57,"lat":29.87},{"county":"江北区","lon":121.55,"lat":29.88},{"county":"北仑区","lon":121.85,"lat":29.93},{"county":"镇海区","lon":121.72,"lat":29.95},{"county":"鄞州区","lon":121.53,"lat":29.83},{"county":"象山县","lon":121.87,"lat":29.48},{"county":"宁海县","lon":121.43,"lat":29.28},{"county":"余姚市","lon":121.15,"lat":30.03},{"county":"慈溪市","lon":121.23,"lat":30.17},{"county":"奉化市","lon":121.4,"lat":29.65},{"county":"温州市","lon":120.7,"lat":28},{"county":"鹿城区","lon":120.65,"lat":28.02},{"county":"龙湾区","lon":120.82,"lat":27.93},{"county":"洞头县","lon":121.15,"lat":27.83},{"county":"永嘉县","lon":120.68,"lat":28.15},{"county":"平阳县","lon":120.57,"lat":27.67},{"county":"苍南县","lon":120.4,"lat":27.5},{"county":"文成县","lon":120.08,"lat":27.78},{"county":"泰顺县","lon":119.72,"lat":27.57},{"county":"瑞安市","lon":120.63,"lat":27.78},{"county":"乐清市","lon":120.95,"lat":28.13},{"county":"嘉兴市","lon":120.75,"lat":30.75},{"county":"秀洲区","lon":120.7,"lat":30.77},{"county":"嘉善县","lon":120.92,"lat":30.85},{"county":"海盐县","lon":120.95,"lat":30.53},{"county":"海宁市","lon":120.68,"lat":30.53},{"county":"平湖市","lon":121.02,"lat":30.7},{"county":"桐乡市","lon":120.57,"lat":30.63},{"county":"湖州市","lon":120.08,"lat":30.9},{"county":"吴兴区","lon":120.12,"lat":30.87},{"county":"南浔区","lon":120.43,"lat":30.88},{"county":"德清县","lon":119.97,"lat":30.53},{"county":"长兴县","lon":119.9,"lat":31.02},{"county":"安吉县","lon":119.68,"lat":30.63},{"county":"绍兴市","lon":120.57,"lat":30},{"county":"越城区","lon":120.57,"lat":30},{"county":"绍兴县","lon":120.47,"lat":30.08},{"county":"新昌县","lon":120.9,"lat":29.5},{"county":"诸暨市","lon":120.23,"lat":29.72},{"county":"上虞市","lon":120.87,"lat":30.03},{"county":"嵊州市","lon":120.82,"lat":29.58},{"county":"金华市","lon":119.65,"lat":29.08},{"county":"婺城区","lon":119.65,"lat":29.08},{"county":"金东区","lon":119.7,"lat":29.08},{"county":"武义县","lon":119.82,"lat":28.9},{"county":"浦江县","lon":119.88,"lat":29.45},{"county":"磐安县","lon":120.43,"lat":29.05},{"county":"兰溪市","lon":119.45,"lat":29.22},{"county":"义乌市","lon":120.07,"lat":29.3},{"county":"东阳市","lon":120.23,"lat":29.28},{"county":"永康市","lon":120.03,"lat":28.9},{"county":"衢州市","lon":118.87,"lat":28.93},{"county":"柯城区","lon":118.87,"lat":28.93},{"county":"衢江区","lon":118.93,"lat":28.98},{"county":"常山县","lon":118.52,"lat":28.9},{"county":"开化县","lon":118.42,"lat":29.13},{"county":"龙游县","lon":119.17,"lat":29.03},{"county":"江山市","lon":118.62,"lat":28.75},{"county":"舟山市","lon":122.2,"lat":30},{"county":"定海区","lon":122.1,"lat":30.02},{"county":"普陀区","lon":122.3,"lat":29.95},{"county":"岱山县","lon":122.2,"lat":30.25},{"county":"嵊泗县","lon":122.45,"lat":30.73},{"county":"台州市","lon":121.43,"lat":28.68},{"county":"椒江区","lon":121.43,"lat":28.68},{"county":"黄岩区","lon":121.27,"lat":28.65},{"county":"路桥区","lon":121.38,"lat":28.58},{"county":"玉环县","lon":121.23,"lat":28.13},{"county":"三门县","lon":121.38,"lat":29.12},{"county":"天台县","lon":121.03,"lat":29.13},{"county":"仙居县","lon":120.73,"lat":28.87},{"county":"温岭市","lon":121.37,"lat":28.37},{"county":"临海市","lon":121.12,"lat":28.85},{"county":"丽水市","lon":119.92,"lat":28.45},{"county":"莲都区","lon":119.92,"lat":28.45},{"county":"青田县","lon":120.28,"lat":28.15},{"county":"缙云县","lon":120.07,"lat":28.65},{"county":"遂昌县","lon":119.27,"lat":28.6},{"county":"松阳县","lon":119.48,"lat":28.45},{"county":"云和县","lon":119.57,"lat":28.12},{"county":"庆元县","lon":119.05,"lat":27.62},{"county":"景宁畲族自治县","lon":119.63,"lat":27.98},{"county":"龙泉市","lon":119.13,"lat":28.08},{"county":"合肥市","lon":117.25,"lat":31.83},{"county":"瑶海区","lon":117.3,"lat":31.87},{"county":"庐阳区","lon":117.25,"lat":31.88},{"county":"蜀山区","lon":117.27,"lat":31.85},{"county":"包河区","lon":117.3,"lat":31.8},{"county":"长丰县","lon":117.17,"lat":32.48},{"county":"肥东县","lon":117.47,"lat":31.88},{"county":"肥西县","lon":117.17,"lat":31.72},{"county":"芜湖市","lon":118.38,"lat":31.33},{"county":"镜湖区","lon":118.37,"lat":31.35},{"county":"鸠江区","lon":118.38,"lat":31.37},{"county":"芜湖县","lon":118.57,"lat":31.15},{"county":"繁昌县","lon":118.2,"lat":31.08},{"county":"南陵县","lon":118.33,"lat":30.92},{"county":"蚌埠市","lon":117.38,"lat":32.92},{"county":"龙子湖区","lon":117.38,"lat":32.95},{"county":"蚌山区","lon":117.35,"lat":32.95},{"county":"禹会区","lon":117.33,"lat":32.93},{"county":"淮上区","lon":117.35,"lat":32.97},{"county":"怀远县","lon":117.18,"lat":32.97},{"county":"五河县","lon":117.88,"lat":33.15},{"county":"固镇县","lon":117.32,"lat":33.32},{"county":"淮南市","lon":117,"lat":32.63},{"county":"大通区","lon":117.05,"lat":32.63},{"county":"田家庵区","lon":117,"lat":32.67},{"county":"谢家集区","lon":116.85,"lat":32.6},{"county":"八公山区","lon":116.83,"lat":32.63},{"county":"潘集区","lon":116.82,"lat":32.78},{"county":"凤台县","lon":116.72,"lat":32.7},{"county":"马鞍山市","lon":118.5,"lat":31.7},{"county":"金家庄区","lon":118.48,"lat":31.73},{"county":"花山区","lon":118.5,"lat":31.72},{"county":"雨山区","lon":118.48,"lat":31.68},{"county":"当涂县","lon":118.48,"lat":31.55},{"county":"淮北市","lon":116.8,"lat":33.95},{"county":"杜集区","lon":116.82,"lat":34},{"county":"相山区","lon":116.8,"lat":33.95},{"county":"烈山区","lon":116.8,"lat":33.9},{"county":"濉溪县","lon":116.77,"lat":33.92},{"county":"铜陵市","lon":117.82,"lat":30.93},{"county":"铜官山区","lon":117.82,"lat":30.93},{"county":"狮子山区","lon":117.85,"lat":30.95},{"county":"郊区","lon":117.78,"lat":30.92},{"county":"铜陵县","lon":117.78,"lat":30.95},{"county":"安庆市","lon":117.05,"lat":30.53},{"county":"迎江区","lon":117.05,"lat":30.5},{"county":"大观区","lon":117.03,"lat":30.52},{"county":"郊区","lon":117.78,"lat":30.92},{"county":"怀宁县","lon":116.83,"lat":30.72},{"county":"枞阳县","lon":117.2,"lat":30.7},{"county":"潜山县","lon":116.57,"lat":30.63},{"county":"太湖县","lon":116.27,"lat":30.43},{"county":"宿松县","lon":116.12,"lat":30.15},{"county":"望江县","lon":116.68,"lat":30.13},{"county":"岳西县","lon":116.35,"lat":30.85},{"county":"桐城市","lon":116.95,"lat":31.05},{"county":"黄山市","lon":118.33,"lat":29.72},{"county":"屯溪区","lon":118.33,"lat":29.72},{"county":"黄山区","lon":118.13,"lat":30.3},{"county":"徽州区","lon":118.33,"lat":29.82},{"county":"歙县","lon":118.43,"lat":29.87},{"county":"休宁县","lon":118.18,"lat":29.78},{"county":"黟县","lon":117.93,"lat":29.93},{"county":"祁门县","lon":117.72,"lat":29.87},{"county":"滁州市","lon":118.32,"lat":32.3},{"county":"琅琊区","lon":118.3,"lat":32.3},{"county":"南谯区","lon":118.3,"lat":32.32},{"county":"来安县","lon":118.43,"lat":32.45},{"county":"全椒县","lon":118.27,"lat":32.1},{"county":"定远县","lon":117.67,"lat":32.53},{"county":"凤阳县","lon":117.57,"lat":32.87},{"county":"天长市","lon":119,"lat":32.7},{"county":"明光市","lon":117.98,"lat":32.78},{"county":"阜阳市","lon":115.82,"lat":32.9},{"county":"颍州区","lon":115.8,"lat":32.88},{"county":"颍东区","lon":115.85,"lat":32.92},{"county":"颍泉区","lon":115.8,"lat":32.93},{"county":"临泉县","lon":115.25,"lat":33.07},{"county":"太和县","lon":115.62,"lat":33.17},{"county":"阜南县","lon":115.58,"lat":32.63},{"county":"颍上县","lon":116.27,"lat":32.63},{"county":"宿州市","lon":116.98,"lat":33.63},{"county":"埇桥区","lon":116.97,"lat":33.63},{"county":"砀山县","lon":116.35,"lat":34.42},{"county":"萧县","lon":116.93,"lat":34.18},{"county":"灵璧县","lon":117.55,"lat":33.55},{"county":"泗县","lon":117.88,"lat":33.48},{"county":"巢湖市","lon":117.87,"lat":31.6},{"county":"居巢区","lon":117.85,"lat":31.6},{"county":"庐江县","lon":117.28,"lat":31.25},{"county":"无为县","lon":117.92,"lat":31.3},{"county":"含山县","lon":118.1,"lat":31.72},{"county":"和县","lon":118.37,"lat":31.72},{"county":"六安市","lon":116.5,"lat":31.77},{"county":"金安区","lon":116.5,"lat":31.77},{"county":"裕安区","lon":116.48,"lat":31.77},{"county":"寿县","lon":116.78,"lat":32.58},{"county":"霍邱县","lon":116.27,"lat":32.33},{"county":"舒城县","lon":116.93,"lat":31.47},{"county":"金寨县","lon":115.92,"lat":31.72},{"county":"霍山县","lon":116.33,"lat":31.4},{"county":"亳州市","lon":115.78,"lat":33.85},{"county":"谯城区","lon":115.77,"lat":33.88},{"county":"涡阳县","lon":116.22,"lat":33.52},{"county":"蒙城县","lon":116.57,"lat":33.27},{"county":"利辛县","lon":116.2,"lat":33.15},{"county":"池州市","lon":117.48,"lat":30.67},{"county":"贵池区","lon":117.48,"lat":30.65},{"county":"东至县","lon":117.02,"lat":30.1},{"county":"石台县","lon":117.48,"lat":30.22},{"county":"青阳县","lon":117.85,"lat":30.65},{"county":"宣城市","lon":118.75,"lat":30.95},{"county":"宣州区","lon":118.75,"lat":30.95},{"county":"郎溪县","lon":119.17,"lat":31.13},{"county":"广德县","lon":119.42,"lat":30.9},{"county":"泾县","lon":118.4,"lat":30.7},{"county":"绩溪县","lon":118.6,"lat":30.07},{"county":"旌德县","lon":118.53,"lat":30.28},{"county":"宁国市","lon":118.98,"lat":30.63},{"county":"福州市","lon":119.3,"lat":26.08},{"county":"鼓楼区","lon":119.3,"lat":26.08},{"county":"台江区","lon":119.3,"lat":26.07},{"county":"仓山区","lon":119.32,"lat":26.05},{"county":"马尾区","lon":119.45,"lat":26},{"county":"晋安区","lon":119.32,"lat":26.08},{"county":"闽侯县","lon":119.13,"lat":26.15},{"county":"连江县","lon":119.53,"lat":26.2},{"county":"罗源县","lon":119.55,"lat":26.48},{"county":"闽清县","lon":118.85,"lat":26.22},{"county":"永泰县","lon":118.93,"lat":25.87},{"county":"平潭县","lon":119.78,"lat":25.52},{"county":"福清市","lon":119.38,"lat":25.72},{"county":"长乐市","lon":119.52,"lat":25.97},{"county":"厦门市","lon":118.08,"lat":24.48},{"county":"思明区","lon":118.08,"lat":24.45},{"county":"海沧区","lon":117.98,"lat":24.47},{"county":"湖里区","lon":118.08,"lat":24.52},{"county":"集美区","lon":118.1,"lat":24.57},{"county":"同安区","lon":118.15,"lat":24.73},{"county":"翔安区","lon":118.23,"lat":24.62},{"county":"莆田市","lon":119,"lat":25.43},{"county":"城厢区","lon":119,"lat":25.43},{"county":"涵江区","lon":119.1,"lat":25.45},{"county":"荔城区","lon":119.02,"lat":25.43},{"county":"秀屿区","lon":119.08,"lat":25.32},{"county":"仙游县","lon":118.68,"lat":25.37},{"county":"三明市","lon":117.62,"lat":26.27},{"county":"梅列区","lon":117.63,"lat":26.27},{"county":"三元区","lon":117.6,"lat":26.23},{"county":"明溪县","lon":117.2,"lat":26.37},{"county":"清流县","lon":116.82,"lat":26.18},{"county":"宁化县","lon":116.65,"lat":26.27},{"county":"大田县","lon":117.85,"lat":25.7},{"county":"尤溪县","lon":118.18,"lat":26.17},{"county":"沙县","lon":117.78,"lat":26.4},{"county":"将乐县","lon":117.47,"lat":26.73},{"county":"泰宁县","lon":117.17,"lat":26.9},{"county":"建宁县","lon":116.83,"lat":26.83},{"county":"永安市","lon":117.37,"lat":25.98},{"county":"泉州市","lon":118.67,"lat":24.88},{"county":"鲤城区","lon":118.6,"lat":24.92},{"county":"丰泽区","lon":118.6,"lat":24.92},{"county":"洛江区","lon":118.67,"lat":24.95},{"county":"泉港区","lon":118.88,"lat":25.12},{"county":"惠安县","lon":118.8,"lat":25.03},{"county":"安溪县","lon":118.18,"lat":25.07},{"county":"永春县","lon":118.3,"lat":25.32},{"county":"德化县","lon":118.23,"lat":25.5},{"county":"金门县","lon":118.32,"lat":24.43},{"county":"石狮市","lon":118.65,"lat":24.73},{"county":"晋江市","lon":118.58,"lat":24.82},{"county":"南安市","lon":118.38,"lat":24.97},{"county":"漳州市","lon":117.65,"lat":24.52},{"county":"芗城区","lon":117.65,"lat":24.52},{"county":"龙文区","lon":117.72,"lat":24.52},{"county":"云霄县","lon":117.33,"lat":23.95},{"county":"漳浦县","lon":117.62,"lat":24.13},{"county":"诏安县","lon":117.18,"lat":23.72},{"county":"长泰县","lon":117.75,"lat":24.62},{"county":"东山县","lon":117.43,"lat":23.7},{"county":"南靖县","lon":117.37,"lat":24.52},{"county":"平和县","lon":117.3,"lat":24.37},{"county":"华安县","lon":117.53,"lat":25.02},{"county":"龙海市","lon":117.82,"lat":24.45},{"county":"南平市","lon":118.17,"lat":26.65},{"county":"延平区","lon":118.17,"lat":26.65},{"county":"顺昌县","lon":117.8,"lat":26.8},{"county":"浦城县","lon":118.53,"lat":27.92},{"county":"光泽县","lon":117.33,"lat":27.55},{"county":"松溪县","lon":118.78,"lat":27.53},{"county":"政和县","lon":118.85,"lat":27.37},{"county":"邵武市","lon":117.48,"lat":27.37},{"county":"武夷山市","lon":118.03,"lat":27.77},{"county":"建瓯市","lon":118.32,"lat":27.03},{"county":"建阳市","lon":118.12,"lat":27.33},{"county":"龙岩市","lon":117.03,"lat":25.1},{"county":"新罗区","lon":117.03,"lat":25.1},{"county":"长汀县","lon":116.35,"lat":25.83},{"county":"永定县","lon":116.73,"lat":24.72},{"county":"上杭县","lon":116.42,"lat":25.05},{"county":"武平县","lon":116.1,"lat":25.1},{"county":"连城县","lon":116.75,"lat":25.72},{"county":"漳平市","lon":117.42,"lat":25.3},{"county":"宁德市","lon":119.52,"lat":26.67},{"county":"蕉城区","lon":119.52,"lat":26.67},{"county":"霞浦县","lon":120,"lat":26.88},{"county":"古田县","lon":118.75,"lat":26.58},{"county":"屏南县","lon":118.98,"lat":26.92},{"county":"寿宁县","lon":119.5,"lat":27.47},{"county":"周宁县","lon":119.33,"lat":27.12},{"county":"柘荣县","lon":119.9,"lat":27.23},{"county":"福安市","lon":119.65,"lat":27.08},{"county":"福鼎市","lon":120.22,"lat":27.33},{"county":"南昌市","lon":115.85,"lat":28.68},{"county":"东湖区","lon":115.9,"lat":28.68},{"county":"西湖区","lon":115.87,"lat":28.67},{"county":"青云谱区","lon":115.92,"lat":28.63},{"county":"湾里区","lon":115.73,"lat":28.72},{"county":"青山湖区","lon":115.95,"lat":28.68},{"county":"南昌县","lon":115.93,"lat":28.55},{"county":"新建县","lon":115.82,"lat":28.7},{"county":"安义县","lon":115.55,"lat":28.85},{"county":"进贤县","lon":116.27,"lat":28.37},{"county":"景德镇市","lon":117.17,"lat":29.27},{"county":"昌江区","lon":117.17,"lat":29.27},{"county":"珠山区","lon":117.2,"lat":29.3},{"county":"浮梁县","lon":117.25,"lat":29.37},{"county":"乐平市","lon":117.12,"lat":28.97},{"county":"萍乡市","lon":113.85,"lat":27.63},{"county":"安源区","lon":113.87,"lat":27.65},{"county":"湘东区","lon":113.73,"lat":27.65},{"county":"莲花县","lon":113.95,"lat":27.13},{"county":"上栗县","lon":113.8,"lat":27.88},{"county":"芦溪县","lon":114.03,"lat":27.63},{"county":"九江市","lon":116,"lat":29.7},{"county":"庐山区","lon":115.98,"lat":29.68},{"county":"浔阳区","lon":115.98,"lat":29.73},{"county":"九江县","lon":115.88,"lat":29.62},{"county":"武宁县","lon":115.1,"lat":29.27},{"county":"修水县","lon":114.57,"lat":29.03},{"county":"永修县","lon":115.8,"lat":29.03},{"county":"德安县","lon":115.77,"lat":29.33},{"county":"星子县","lon":116.03,"lat":29.45},{"county":"都昌县","lon":116.18,"lat":29.27},{"county":"湖口县","lon":116.22,"lat":29.73},{"county":"彭泽县","lon":116.55,"lat":29.9},{"county":"瑞昌市","lon":115.67,"lat":29.68},{"county":"新余市","lon":114.92,"lat":27.82},{"county":"渝水区","lon":114.93,"lat":27.8},{"county":"分宜县","lon":114.67,"lat":27.82},{"county":"鹰潭市","lon":117.07,"lat":28.27},{"county":"月湖区","lon":117.05,"lat":28.23},{"county":"余江县","lon":116.82,"lat":28.2},{"county":"贵溪市","lon":117.22,"lat":28.28},{"county":"赣州市","lon":114.93,"lat":25.83},{"county":"章贡区","lon":114.93,"lat":25.87},{"county":"赣县","lon":115,"lat":25.87},{"county":"信丰县","lon":114.93,"lat":25.38},{"county":"大余县","lon":114.35,"lat":25.4},{"county":"上犹县","lon":114.53,"lat":25.8},{"county":"崇义县","lon":114.3,"lat":25.7},{"county":"安远县","lon":115.38,"lat":25.13},{"county":"龙南县","lon":114.78,"lat":24.92},{"county":"定南县","lon":115.03,"lat":24.78},{"county":"全南县","lon":114.52,"lat":24.75},{"county":"宁都县","lon":116.02,"lat":26.48},{"county":"于都县","lon":115.42,"lat":25.95},{"county":"兴国县","lon":115.35,"lat":26.33},{"county":"会昌县","lon":115.78,"lat":25.6},{"county":"寻乌县","lon":115.65,"lat":24.95},{"county":"石城县","lon":116.33,"lat":26.33},{"county":"瑞金市","lon":116.03,"lat":25.88},{"county":"南康市","lon":114.75,"lat":25.65},{"county":"吉安市","lon":114.98,"lat":27.12},{"county":"吉州区","lon":114.98,"lat":27.12},{"county":"青原区","lon":115,"lat":27.1},{"county":"吉安县","lon":114.9,"lat":27.05},{"county":"吉水县","lon":115.13,"lat":27.22},{"county":"峡江县","lon":115.33,"lat":27.62},{"county":"新干县","lon":115.4,"lat":27.77},{"county":"永丰县","lon":115.43,"lat":27.32},{"county":"泰和县","lon":114.88,"lat":26.8},{"county":"遂川县","lon":114.52,"lat":26.33},{"county":"万安县","lon":114.78,"lat":26.47},{"county":"安福县","lon":114.62,"lat":27.38},{"county":"永新县","lon":114.23,"lat":26.95},{"county":"井冈山市","lon":114.27,"lat":26.72},{"county":"宜春市","lon":114.38,"lat":27.8},{"county":"袁州区","lon":114.38,"lat":27.8},{"county":"奉新县","lon":115.38,"lat":28.7},{"county":"万载县","lon":114.43,"lat":28.12},{"county":"上高县","lon":114.92,"lat":28.23},{"county":"宜丰县","lon":114.78,"lat":28.38},{"county":"靖安县","lon":115.35,"lat":28.87},{"county":"铜鼓县","lon":114.37,"lat":28.53},{"county":"丰城市","lon":115.78,"lat":28.2},{"county":"樟树市","lon":115.53,"lat":28.07},{"county":"高安市","lon":115.37,"lat":28.42},{"county":"抚州市","lon":116.35,"lat":28},{"county":"临川区","lon":116.35,"lat":27.98},{"county":"南城县","lon":116.63,"lat":27.55},{"county":"黎川县","lon":116.92,"lat":27.3},{"county":"南丰县","lon":116.53,"lat":27.22},{"county":"崇仁县","lon":116.05,"lat":27.77},{"county":"乐安县","lon":115.83,"lat":27.43},{"county":"宜黄县","lon":116.22,"lat":27.55},{"county":"金溪县","lon":116.77,"lat":27.92},{"county":"资溪县","lon":117.07,"lat":27.7},{"county":"东乡县","lon":116.62,"lat":28.23},{"county":"广昌县","lon":116.32,"lat":26.83},{"county":"上饶市","lon":117.97,"lat":28.45},{"county":"信州区","lon":117.95,"lat":28.43},{"county":"上饶县","lon":117.92,"lat":28.43},{"county":"广丰县","lon":118.18,"lat":28.43},{"county":"玉山县","lon":118.25,"lat":28.68},{"county":"铅山县","lon":117.7,"lat":28.32},{"county":"横峰县","lon":117.6,"lat":28.42},{"county":"弋阳县","lon":117.43,"lat":28.4},{"county":"余干县","lon":116.68,"lat":28.7},{"county":"鄱阳县","lon":116.67,"lat":29},{"county":"万年县","lon":117.07,"lat":28.7},{"county":"婺源县","lon":117.85,"lat":29.25},{"county":"德兴市","lon":117.57,"lat":28.95},{"county":"济南市","lon":116.98,"lat":36.67},{"county":"历下区","lon":117.08,"lat":36.67},{"county":"市中区","lon":117,"lat":36.65},{"county":"市中区","lon":116.58,"lat":35.4},{"county":"市中区","lon":117.57,"lat":34.87},{"county":"槐荫区","lon":116.93,"lat":36.65},{"county":"天桥区","lon":116.98,"lat":36.68},{"county":"历城区","lon":117.07,"lat":36.68},{"county":"长清区","lon":116.73,"lat":36.55},{"county":"平阴县","lon":116.45,"lat":36.28},{"county":"济阳县","lon":117.22,"lat":36.98},{"county":"商河县","lon":117.15,"lat":37.32},{"county":"章丘市","lon":117.53,"lat":36.72},{"county":"青岛市","lon":120.38,"lat":36.07},{"county":"市南区","lon":120.38,"lat":36.07},{"county":"市北区","lon":120.38,"lat":36.08},{"county":"四方区","lon":120.35,"lat":36.1},{"county":"黄岛区","lon":120.18,"lat":35.97},{"county":"崂山区","lon":120.47,"lat":36.1},{"county":"李沧区","lon":120.43,"lat":36.15},{"county":"城阳区","lon":120.37,"lat":36.3},{"county":"胶州市","lon":120.03,"lat":36.27},{"county":"即墨市","lon":120.45,"lat":36.38},{"county":"平度市","lon":119.95,"lat":36.78},{"county":"胶南市","lon":120.03,"lat":35.87},{"county":"莱西市","lon":120.5,"lat":36.87},{"county":"淄博市","lon":118.05,"lat":36.82},{"county":"张店区","lon":118.03,"lat":36.82},{"county":"博山区","lon":117.85,"lat":36.5},{"county":"临淄区","lon":118.3,"lat":36.82},{"county":"周村区","lon":117.87,"lat":36.8},{"county":"桓台县","lon":118.08,"lat":36.97},{"county":"高青县","lon":117.82,"lat":37.17},{"county":"沂源县","lon":118.17,"lat":36.18},{"county":"枣庄市","lon":117.32,"lat":34.82},{"county":"市中区","lon":117,"lat":36.65},{"county":"市中区","lon":116.58,"lat":35.4},{"county":"市中区","lon":117.57,"lat":34.87},{"county":"薛城区","lon":117.25,"lat":34.8},{"county":"峄城区","lon":117.58,"lat":34.77},{"county":"台儿庄区","lon":117.73,"lat":34.57},{"county":"山亭区","lon":117.45,"lat":35.08},{"county":"滕州市","lon":117.15,"lat":35.08},{"county":"东营市","lon":118.67,"lat":37.43},{"county":"东营区","lon":118.5,"lat":37.47},{"county":"河口区","lon":118.53,"lat":37.88},{"county":"垦利县","lon":118.55,"lat":37.58},{"county":"利津县","lon":118.25,"lat":37.48},{"county":"广饶县","lon":118.4,"lat":37.07},{"county":"烟台市","lon":121.43,"lat":37.45},{"county":"芝罘区","lon":121.38,"lat":37.53},{"county":"福山区","lon":121.25,"lat":37.5},{"county":"牟平区","lon":121.6,"lat":37.38},{"county":"莱山区","lon":121.43,"lat":37.5},{"county":"长岛县","lon":120.73,"lat":37.92},{"county":"龙口市","lon":120.52,"lat":37.65},{"county":"莱阳市","lon":120.7,"lat":36.98},{"county":"莱州市","lon":119.93,"lat":37.18},{"county":"蓬莱市","lon":120.75,"lat":37.82},{"county":"招远市","lon":120.4,"lat":37.37},{"county":"栖霞市","lon":120.83,"lat":37.3},{"county":"海阳市","lon":121.15,"lat":36.78},{"county":"潍坊市","lon":119.15,"lat":36.7},{"county":"潍城区","lon":119.1,"lat":36.72},{"county":"寒亭区","lon":119.22,"lat":36.77},{"county":"坊子区","lon":119.17,"lat":36.67},{"county":"奎文区","lon":119.12,"lat":36.72},{"county":"临朐县","lon":118.53,"lat":36.52},{"county":"昌乐县","lon":118.82,"lat":36.7},{"county":"青州市","lon":118.47,"lat":36.68},{"county":"诸城市","lon":119.4,"lat":36},{"county":"寿光市","lon":118.73,"lat":36.88},{"county":"安丘市","lon":119.2,"lat":36.43},{"county":"高密市","lon":119.75,"lat":36.38},{"county":"昌邑市","lon":119.4,"lat":36.87},{"county":"济宁市","lon":116.58,"lat":35.42},{"county":"市中区","lon":117,"lat":36.65},{"county":"市中区","lon":116.58,"lat":35.4},{"county":"市中区","lon":117.57,"lat":34.87},{"county":"任城区","lon":116.58,"lat":35.42},{"county":"微山县","lon":117.13,"lat":34.82},{"county":"鱼台县","lon":116.65,"lat":35},{"county":"金乡县","lon":116.3,"lat":35.07},{"county":"嘉祥县","lon":116.33,"lat":35.42},{"county":"汶上县","lon":116.48,"lat":35.73},{"county":"泗水县","lon":117.27,"lat":35.67},{"county":"梁山县","lon":116.08,"lat":35.8},{"county":"曲阜市","lon":116.98,"lat":35.58},{"county":"兖州市","lon":116.83,"lat":35.55},{"county":"邹城市","lon":116.97,"lat":35.4},{"county":"泰安市","lon":117.08,"lat":36.2},{"county":"泰山区","lon":117.13,"lat":36.18},{"county":"岱岳区","lon":117,"lat":36.18},{"county":"宁阳县","lon":116.8,"lat":35.77},{"county":"东平县","lon":116.47,"lat":35.93},{"county":"新泰市","lon":117.77,"lat":35.92},{"county":"肥城市","lon":116.77,"lat":36.18},{"county":"威海市","lon":122.12,"lat":37.52},{"county":"环翠区","lon":122.12,"lat":37.5},{"county":"文登市","lon":122.05,"lat":37.2},{"county":"荣成市","lon":122.42,"lat":37.17},{"county":"乳山市","lon":121.53,"lat":36.92},{"county":"日照市","lon":119.52,"lat":35.42},{"county":"东港区","lon":119.45,"lat":35.42},{"county":"岚山区","lon":119.33,"lat":35.1},{"county":"五莲县","lon":119.2,"lat":35.75},{"county":"莒县","lon":118.83,"lat":35.58},{"county":"莱芜市","lon":117.67,"lat":36.22},{"county":"莱城区","lon":117.65,"lat":36.2},{"county":"钢城区","lon":117.8,"lat":36.07},{"county":"临沂市","lon":118.35,"lat":35.05},{"county":"兰山区","lon":118.33,"lat":35.07},{"county":"罗庄区","lon":118.28,"lat":34.98},{"county":"河东区","lon":118.4,"lat":35.08},{"county":"沂南县","lon":118.47,"lat":35.55},{"county":"郯城县","lon":118.35,"lat":34.62},{"county":"沂水县","lon":118.62,"lat":35.78},{"county":"苍山县","lon":118.05,"lat":34.85},{"county":"费县","lon":117.97,"lat":35.27},{"county":"平邑县","lon":117.63,"lat":35.5},{"county":"莒南县","lon":118.83,"lat":35.18},{"county":"蒙阴县","lon":117.93,"lat":35.72},{"county":"临沭县","lon":118.65,"lat":34.92},{"county":"德州市","lon":116.3,"lat":37.45},{"county":"德城区","lon":116.3,"lat":37.45},{"county":"陵县","lon":116.57,"lat":37.33},{"county":"宁津县","lon":116.78,"lat":37.65},{"county":"庆云县","lon":117.38,"lat":37.78},{"county":"临邑县","lon":116.87,"lat":37.18},{"county":"齐河县","lon":116.75,"lat":36.8},{"county":"平原县","lon":116.43,"lat":37.17},{"county":"夏津县","lon":116,"lat":36.95},{"county":"武城县","lon":116.07,"lat":37.22},{"county":"乐陵市","lon":117.23,"lat":37.73},{"county":"禹城市","lon":116.63,"lat":36.93},{"county":"聊城市","lon":115.98,"lat":36.45},{"county":"东昌府区","lon":115.98,"lat":36.45},{"county":"阳谷县","lon":115.78,"lat":36.12},{"county":"莘县","lon":115.67,"lat":36.23},{"county":"茌平县","lon":116.25,"lat":36.58},{"county":"东阿县","lon":116.25,"lat":36.33},{"county":"冠县","lon":115.43,"lat":36.48},{"county":"高唐县","lon":116.23,"lat":36.87},{"county":"临清市","lon":115.7,"lat":36.85},{"county":"滨州市","lon":117.97,"lat":37.38},{"county":"滨城区","lon":118,"lat":37.38},{"county":"惠民县","lon":117.5,"lat":37.48},{"county":"阳信县","lon":117.58,"lat":37.63},{"county":"无棣县","lon":117.6,"lat":37.73},{"county":"沾化县","lon":118.13,"lat":37.7},{"county":"博兴县","lon":118.13,"lat":37.15},{"county":"邹平县","lon":117.73,"lat":36.88},{"county":"牡丹区","lon":115.43,"lat":35.25},{"county":"曹县","lon":115.53,"lat":34.83},{"county":"单县","lon":116.08,"lat":34.8},{"county":"成武县","lon":115.88,"lat":34.95},{"county":"巨野县","lon":116.08,"lat":35.4},{"county":"郓城县","lon":115.93,"lat":35.6},{"county":"鄄城县","lon":115.5,"lat":35.57},{"county":"定陶县","lon":115.57,"lat":35.07},{"county":"东明县","lon":115.08,"lat":35.28},{"county":"郑州市","lon":113.62,"lat":34.75},{"county":"中原区","lon":113.6,"lat":34.75},{"county":"二七区","lon":113.65,"lat":34.73},{"county":"管城回族区","lon":113.67,"lat":34.75},{"county":"金水区","lon":113.65,"lat":34.78},{"county":"上街区","lon":113.28,"lat":34.82},{"county":"惠济区","lon":113.6,"lat":34.87},{"county":"中牟县","lon":113.97,"lat":34.72},{"county":"巩义市","lon":112.98,"lat":34.77},{"county":"荥阳市","lon":113.4,"lat":34.78},{"county":"新密市","lon":113.38,"lat":34.53},{"county":"新郑市","lon":113.73,"lat":34.4},{"county":"登封市","lon":113.03,"lat":34.47},{"county":"开封市","lon":114.3,"lat":34.8},{"county":"龙亭区","lon":114.35,"lat":34.8},{"county":"顺河回族区","lon":114.35,"lat":34.8},{"county":"鼓楼区","lon":114.35,"lat":34.78},{"county":"杞县","lon":114.78,"lat":34.55},{"county":"通许县","lon":114.47,"lat":34.48},{"county":"尉氏县","lon":114.18,"lat":34.42},{"county":"开封县","lon":114.43,"lat":34.77},{"county":"兰考县","lon":114.82,"lat":34.82},{"county":"洛阳市","lon":112.45,"lat":34.62},{"county":"老城区","lon":112.47,"lat":34.68},{"county":"西工区","lon":112.43,"lat":34.67},{"county":"涧西区","lon":112.4,"lat":34.67},{"county":"吉利区","lon":112.58,"lat":34.9},{"county":"洛龙区","lon":112.45,"lat":34.62},{"county":"孟津县","lon":112.43,"lat":34.83},{"county":"新安县","lon":112.15,"lat":34.72},{"county":"栾川县","lon":111.62,"lat":33.78},{"county":"嵩县","lon":112.1,"lat":34.15},{"county":"汝阳县","lon":112.47,"lat":34.15},{"county":"宜阳县","lon":112.17,"lat":34.52},{"county":"洛宁县","lon":111.65,"lat":34.38},{"county":"伊川县","lon":112.42,"lat":34.42},{"county":"偃师市","lon":112.78,"lat":34.73},{"county":"平顶山市","lon":113.18,"lat":33.77},{"county":"新华区","lon":113.3,"lat":33.73},{"county":"卫东区","lon":113.33,"lat":33.73},{"county":"石龙区","lon":112.88,"lat":33.9},{"county":"湛河区","lon":113.28,"lat":33.73},{"county":"宝丰县","lon":113.07,"lat":33.88},{"county":"叶县","lon":113.35,"lat":33.62},{"county":"鲁山县","lon":112.9,"lat":33.73},{"county":"郏县","lon":113.22,"lat":33.97},{"county":"舞钢市","lon":113.52,"lat":33.3},{"county":"汝州市","lon":112.83,"lat":34.17},{"county":"安阳市","lon":114.38,"lat":36.1},{"county":"文峰区","lon":114.35,"lat":36.08},{"county":"北关区","lon":114.35,"lat":36.12},{"county":"殷都区","lon":114.3,"lat":36.12},{"county":"龙安区","lon":114.32,"lat":36.1},{"county":"安阳县","lon":114.35,"lat":36.1},{"county":"汤阴县","lon":114.35,"lat":35.92},{"county":"滑县","lon":114.52,"lat":35.58},{"county":"内黄县","lon":114.9,"lat":35.95},{"county":"林州市","lon":113.82,"lat":36.07},{"county":"鹤壁市","lon":114.28,"lat":35.75},{"county":"鹤山区","lon":114.15,"lat":35.95},{"county":"山城区","lon":114.18,"lat":35.9},{"county":"淇滨区","lon":114.3,"lat":35.73},{"county":"浚县","lon":114.55,"lat":35.67},{"county":"淇县","lon":114.2,"lat":35.6},{"county":"新乡市","lon":113.9,"lat":35.3},{"county":"红旗区","lon":113.87,"lat":35.3},{"county":"卫滨区","lon":113.85,"lat":35.3},{"county":"凤泉区","lon":113.92,"lat":35.38},{"county":"牧野区","lon":113.9,"lat":35.32},{"county":"新乡县","lon":113.8,"lat":35.2},{"county":"获嘉县","lon":113.65,"lat":35.27},{"county":"原阳县","lon":113.97,"lat":35.05},{"county":"延津县","lon":114.2,"lat":35.15},{"county":"封丘县","lon":114.42,"lat":35.05},{"county":"长垣县","lon":114.68,"lat":35.2},{"county":"卫辉市","lon":114.07,"lat":35.4},{"county":"辉县市","lon":113.8,"lat":35.47},{"county":"焦作市","lon":113.25,"lat":35.22},{"county":"解放区","lon":113.22,"lat":35.25},{"county":"中站区","lon":113.17,"lat":35.23},{"county":"马村区","lon":113.32,"lat":35.27},{"county":"山阳区","lon":113.25,"lat":35.22},{"county":"修武县","lon":113.43,"lat":35.23},{"county":"博爱县","lon":113.07,"lat":35.17},{"county":"武陟县","lon":113.38,"lat":35.1},{"county":"温县","lon":113.08,"lat":34.93},{"county":"济源市","lon":112.58,"lat":35.07},{"county":"沁阳市","lon":112.93,"lat":35.08},{"county":"孟州市","lon":112.78,"lat":34.9},{"county":"濮阳市","lon":115.03,"lat":35.77},{"county":"华龙区","lon":115.07,"lat":35.78},{"county":"清丰县","lon":115.12,"lat":35.9},{"county":"南乐县","lon":115.2,"lat":36.08},{"county":"范县","lon":115.5,"lat":35.87},{"county":"台前县","lon":115.85,"lat":36},{"county":"濮阳县","lon":115.02,"lat":35.7},{"county":"许昌市","lon":113.85,"lat":34.03},{"county":"魏都区","lon":113.82,"lat":34.03},{"county":"许昌县","lon":113.83,"lat":34},{"county":"鄢陵县","lon":114.2,"lat":34.1},{"county":"襄城县","lon":113.48,"lat":33.85},{"county":"禹州市","lon":113.47,"lat":34.17},{"county":"长葛市","lon":113.77,"lat":34.22},{"county":"漯河市","lon":114.02,"lat":33.58},{"county":"郾城区","lon":114,"lat":33.58},{"county":"召陵区","lon":114.07,"lat":33.57},{"county":"舞阳县","lon":113.6,"lat":33.43},{"county":"临颍县","lon":113.93,"lat":33.82},{"county":"三门峡市","lon":111.2,"lat":34.78},{"county":"湖滨区","lon":111.2,"lat":34.78},{"county":"渑池县","lon":111.75,"lat":34.77},{"county":"陕县","lon":111.08,"lat":34.7},{"county":"卢氏县","lon":111.05,"lat":34.05},{"county":"义马市","lon":111.87,"lat":34.75},{"county":"灵宝市","lon":110.87,"lat":34.52},{"county":"南阳市","lon":112.52,"lat":33},{"county":"宛城区","lon":112.55,"lat":33.02},{"county":"卧龙区","lon":112.53,"lat":32.98},{"county":"南召县","lon":112.43,"lat":33.5},{"county":"方城县","lon":113,"lat":33.27},{"county":"西峡县","lon":111.48,"lat":33.28},{"county":"镇平县","lon":112.23,"lat":33.03},{"county":"内乡县","lon":111.85,"lat":33.05},{"county":"淅川县","lon":111.48,"lat":33.13},{"county":"社旗县","lon":112.93,"lat":33.05},{"county":"唐河县","lon":112.83,"lat":32.7},{"county":"新野县","lon":112.35,"lat":32.52},{"county":"桐柏县","lon":113.4,"lat":32.37},{"county":"邓州市","lon":112.08,"lat":32.68},{"county":"商丘市","lon":115.65,"lat":34.45},{"county":"梁园区","lon":115.63,"lat":34.45},{"county":"睢阳区","lon":115.63,"lat":34.38},{"county":"民权县","lon":115.13,"lat":34.65},{"county":"睢县","lon":115.07,"lat":34.45},{"county":"宁陵县","lon":115.32,"lat":34.45},{"county":"柘城县","lon":115.3,"lat":34.07},{"county":"虞城县","lon":115.85,"lat":34.4},{"county":"夏邑县","lon":116.13,"lat":34.23},{"county":"永城市","lon":116.43,"lat":33.92},{"county":"信阳市","lon":114.07,"lat":32.13},{"county":"浉河区","lon":114.05,"lat":32.12},{"county":"平桥区","lon":114.12,"lat":32.1},{"county":"罗山县","lon":114.53,"lat":32.2},{"county":"光山县","lon":114.9,"lat":32.02},{"county":"新县","lon":114.87,"lat":31.63},{"county":"商城县","lon":115.4,"lat":31.8},{"county":"固始县","lon":115.68,"lat":32.18},{"county":"潢川县","lon":115.03,"lat":32.13},{"county":"淮滨县","lon":115.4,"lat":32.43},{"county":"息县","lon":114.73,"lat":32.35},{"county":"周口市","lon":114.65,"lat":33.62},{"county":"扶沟县","lon":114.38,"lat":34.07},{"county":"西华县","lon":114.53,"lat":33.8},{"county":"商水县","lon":114.6,"lat":33.53},{"county":"沈丘县","lon":115.07,"lat":33.4},{"county":"郸城县","lon":115.2,"lat":33.65},{"county":"淮阳县","lon":114.88,"lat":33.73},{"county":"太康县","lon":114.85,"lat":34.07},{"county":"鹿邑县","lon":115.48,"lat":33.87},{"county":"项城市","lon":114.9,"lat":33.45},{"county":"驻马店市","lon":114.02,"lat":32.98},{"county":"驿城区","lon":114.05,"lat":32.97},{"county":"西平县","lon":114.02,"lat":33.38},{"county":"上蔡县","lon":114.27,"lat":33.27},{"county":"平舆县","lon":114.63,"lat":32.97},{"county":"正阳县","lon":114.38,"lat":32.6},{"county":"确山县","lon":114.02,"lat":32.8},{"county":"泌阳县","lon":113.32,"lat":32.72},{"county":"汝南县","lon":114.35,"lat":33},{"county":"遂平县","lon":114,"lat":33.15},{"county":"新蔡县","lon":114.98,"lat":32.75},{"county":"武汉市","lon":114.3,"lat":30.6},{"county":"江岸区","lon":114.3,"lat":30.6},{"county":"江汉区","lon":114.27,"lat":30.6},{"county":"硚口区","lon":114.27,"lat":30.57},{"county":"汉阳区","lon":114.27,"lat":30.55},{"county":"武昌区","lon":114.3,"lat":30.57},{"county":"青山区","lon":114.38,"lat":30.63},{"county":"洪山区","lon":114.33,"lat":30.5},{"county":"东西湖区","lon":114.13,"lat":30.62},{"county":"汉南区","lon":114.08,"lat":30.32},{"county":"蔡甸区","lon":114.03,"lat":30.58},{"county":"江夏区","lon":114.32,"lat":30.35},{"county":"黄陂区","lon":114.37,"lat":30.87},{"county":"新洲区","lon":114.8,"lat":30.85},{"county":"黄石市","lon":115.03,"lat":30.2},{"county":"黄石港区","lon":115.07,"lat":30.23},{"county":"西塞山区","lon":115.12,"lat":30.2},{"county":"下陆区","lon":114.97,"lat":30.18},{"county":"铁山区","lon":114.9,"lat":30.2},{"county":"阳新县","lon":115.2,"lat":29.85},{"county":"大冶市","lon":114.97,"lat":30.1},{"county":"十堰市","lon":110.78,"lat":32.65},{"county":"茅箭区","lon":110.82,"lat":32.6},{"county":"张湾区","lon":110.78,"lat":32.65},{"county":"郧县","lon":110.82,"lat":32.83},{"county":"郧西县","lon":110.42,"lat":33},{"county":"竹山县","lon":110.23,"lat":32.23},{"county":"竹溪县","lon":109.72,"lat":32.32},{"county":"房县","lon":110.73,"lat":32.07},{"county":"丹江口市","lon":111.52,"lat":32.55},{"county":"宜昌市","lon":111.28,"lat":30.7},{"county":"西陵区","lon":111.27,"lat":30.7},{"county":"伍家岗区","lon":111.35,"lat":30.65},{"county":"点军区","lon":111.27,"lat":30.7},{"county":"猇亭区","lon":111.42,"lat":30.53},{"county":"夷陵区","lon":111.32,"lat":30.77},{"county":"远安县","lon":111.63,"lat":31.07},{"county":"兴山县","lon":110.75,"lat":31.35},{"county":"秭归县","lon":110.98,"lat":30.83},{"county":"长阳土家族自治县","lon":111.18,"lat":30.47},{"county":"五峰土家族自治县","lon":110.67,"lat":30.2},{"county":"宜都市","lon":111.45,"lat":30.4},{"county":"当阳市","lon":111.78,"lat":30.82},{"county":"枝江市","lon":111.77,"lat":30.43},{"county":"襄樊市","lon":112.15,"lat":32.02},{"county":"襄城区","lon":112.15,"lat":32.02},{"county":"樊城区","lon":112.13,"lat":32.03},{"county":"襄阳区","lon":112.2,"lat":32.08},{"county":"南漳县","lon":111.83,"lat":31.78},{"county":"谷城县","lon":111.65,"lat":32.27},{"county":"保康县","lon":111.25,"lat":31.88},{"county":"老河口市","lon":111.67,"lat":32.38},{"county":"枣阳市","lon":112.75,"lat":32.13},{"county":"宜城市","lon":112.25,"lat":31.72},{"county":"鄂州市","lon":114.88,"lat":30.4},{"county":"梁子湖区","lon":114.67,"lat":30.08},{"county":"华容区","lon":114.73,"lat":30.53},{"county":"鄂城区","lon":114.88,"lat":30.4},{"county":"荆门市","lon":112.2,"lat":31.03},{"county":"东宝区","lon":112.2,"lat":31.05},{"county":"掇刀区","lon":112.2,"lat":30.98},{"county":"京山县","lon":113.1,"lat":31.02},{"county":"沙洋县","lon":112.58,"lat":30.7},{"county":"钟祥市","lon":112.58,"lat":31.17},{"county":"孝感市","lon":113.92,"lat":30.93},{"county":"孝南区","lon":113.92,"lat":30.92},{"county":"孝昌县","lon":113.97,"lat":31.25},{"county":"大悟县","lon":114.12,"lat":31.57},{"county":"云梦县","lon":113.75,"lat":31.02},{"county":"应城市","lon":113.57,"lat":30.95},{"county":"安陆市","lon":113.68,"lat":31.27},{"county":"汉川市","lon":113.83,"lat":30.65},{"county":"荆州市","lon":112.23,"lat":30.33},{"county":"沙市区","lon":112.25,"lat":30.32},{"county":"荆州区","lon":112.18,"lat":30.35},{"county":"公安县","lon":112.23,"lat":30.07},{"county":"监利县","lon":112.88,"lat":29.82},{"county":"江陵县","lon":112.42,"lat":30.03},{"county":"石首市","lon":112.4,"lat":29.73},{"county":"洪湖市","lon":113.45,"lat":29.8},{"county":"松滋市","lon":111.77,"lat":30.18},{"county":"黄冈市","lon":114.87,"lat":30.45},{"county":"黄州区","lon":114.88,"lat":30.43},{"county":"团风县","lon":114.87,"lat":30.63},{"county":"红安县","lon":114.62,"lat":31.28},{"county":"罗田县","lon":115.4,"lat":30.78},{"county":"英山县","lon":115.67,"lat":30.75},{"county":"浠水县","lon":115.27,"lat":30.45},{"county":"蕲春县","lon":115.43,"lat":30.23},{"county":"黄梅县","lon":115.93,"lat":30.08},{"county":"麻城市","lon":115.03,"lat":31.18},{"county":"武穴市","lon":115.55,"lat":29.85},{"county":"咸宁市","lon":114.32,"lat":29.85},{"county":"咸安区","lon":114.3,"lat":29.87},{"county":"嘉鱼县","lon":113.9,"lat":29.98},{"county":"通城县","lon":113.82,"lat":29.25},{"county":"崇阳县","lon":114.03,"lat":29.55},{"county":"通山县","lon":114.52,"lat":29.6},{"county":"赤壁市","lon":113.88,"lat":29.72},{"county":"随州市","lon":113.37,"lat":31.72},{"county":"曾都区","lon":113.37,"lat":31.72},{"county":"广水市","lon":113.82,"lat":31.62},{"county":"恩施土家族苗族自治州","lon":109.47,"lat":30.3},{"county":"恩施市","lon":109.47,"lat":30.3},{"county":"利川市","lon":108.93,"lat":30.3},{"county":"建始县","lon":109.73,"lat":30.6},{"county":"巴东县","lon":110.33,"lat":31.05},{"county":"宣恩县","lon":109.48,"lat":29.98},{"county":"咸丰县","lon":109.15,"lat":29.68},{"county":"来凤县","lon":109.4,"lat":29.52},{"county":"鹤峰县","lon":110.03,"lat":29.9},{"county":"仙桃市","lon":113.45,"lat":30.37},{"county":"潜江市","lon":112.88,"lat":30.42},{"county":"天门市","lon":113.17,"lat":30.67},{"county":"神农架林区","lon":110.67,"lat":31.75},{"county":"长沙市","lon":112.93,"lat":28.23},{"county":"芙蓉区","lon":113.03,"lat":28.18},{"county":"天心区","lon":112.98,"lat":28.12},{"county":"岳麓区","lon":112.93,"lat":28.23},{"county":"开福区","lon":112.98,"lat":28.25},{"county":"雨花区","lon":113.03,"lat":28.13},{"county":"长沙县","lon":113.07,"lat":28.25},{"county":"望城县","lon":112.82,"lat":28.37},{"county":"宁乡县","lon":112.55,"lat":28.25},{"county":"浏阳市","lon":113.63,"lat":28.15},{"county":"株洲市","lon":113.13,"lat":27.83},{"county":"荷塘区","lon":113.17,"lat":27.87},{"county":"芦淞区","lon":113.15,"lat":27.83},{"county":"石峰区","lon":113.1,"lat":27.87},{"county":"天元区","lon":113.12,"lat":27.83},{"county":"株洲县","lon":113.13,"lat":27.72},{"county":"攸县","lon":113.33,"lat":27},{"county":"茶陵县","lon":113.53,"lat":26.8},{"county":"炎陵县","lon":113.77,"lat":26.48},{"county":"醴陵市","lon":113.48,"lat":27.67},{"county":"湘潭市","lon":112.93,"lat":27.83},{"county":"雨湖区","lon":112.9,"lat":27.87},{"county":"岳塘区","lon":112.95,"lat":27.87},{"county":"湘潭县","lon":112.95,"lat":27.78},{"county":"湘乡市","lon":112.53,"lat":27.73},{"county":"韶山市","lon":112.52,"lat":27.93},{"county":"衡阳市","lon":112.57,"lat":26.9},{"county":"珠晖区","lon":112.62,"lat":26.9},{"county":"雁峰区","lon":112.6,"lat":26.88},{"county":"石鼓区","lon":112.6,"lat":26.9},{"county":"蒸湘区","lon":112.6,"lat":26.9},{"county":"南岳区","lon":112.73,"lat":27.25},{"county":"衡阳县","lon":112.37,"lat":26.97},{"county":"衡南县","lon":112.67,"lat":26.73},{"county":"衡山县","lon":112.87,"lat":27.23},{"county":"衡东县","lon":112.95,"lat":27.08},{"county":"祁东县","lon":112.12,"lat":26.78},{"county":"耒阳市","lon":112.85,"lat":26.42},{"county":"常宁市","lon":112.38,"lat":26.42},{"county":"邵阳市","lon":111.47,"lat":27.25},{"county":"双清区","lon":111.47,"lat":27.23},{"county":"大祥区","lon":111.45,"lat":27.23},{"county":"北塔区","lon":111.45,"lat":27.25},{"county":"邵东县","lon":111.75,"lat":27.25},{"county":"新邵县","lon":111.45,"lat":27.32},{"county":"邵阳县","lon":111.27,"lat":27},{"county":"隆回县","lon":111.03,"lat":27.12},{"county":"洞口县","lon":110.57,"lat":27.05},{"county":"绥宁县","lon":110.15,"lat":26.58},{"county":"新宁县","lon":110.85,"lat":26.43},{"county":"城步苗族自治县","lon":110.32,"lat":26.37},{"county":"武冈市","lon":110.63,"lat":26.73},{"county":"岳阳市","lon":113.12,"lat":29.37},{"county":"岳阳楼区","lon":113.1,"lat":29.37},{"county":"云溪区","lon":113.3,"lat":29.47},{"county":"君山区","lon":113,"lat":29.43},{"county":"岳阳县","lon":113.12,"lat":29.15},{"county":"华容县","lon":112.57,"lat":29.52},{"county":"湘阴县","lon":112.88,"lat":28.68},{"county":"平江县","lon":113.58,"lat":28.72},{"county":"汨罗市","lon":113.08,"lat":28.8},{"county":"临湘市","lon":113.47,"lat":29.48},{"county":"常德市","lon":111.68,"lat":29.05},{"county":"武陵区","lon":111.68,"lat":29.03},{"county":"鼎城区","lon":111.68,"lat":29.02},{"county":"安乡县","lon":112.17,"lat":29.42},{"county":"汉寿县","lon":111.97,"lat":28.9},{"county":"澧县","lon":111.75,"lat":29.63},{"county":"临澧县","lon":111.65,"lat":29.45},{"county":"桃源县","lon":111.48,"lat":28.9},{"county":"石门县","lon":111.38,"lat":29.58},{"county":"津市市","lon":111.88,"lat":29.62},{"county":"张家界市","lon":110.47,"lat":29.13},{"county":"永定区","lon":110.48,"lat":29.13},{"county":"武陵源区","lon":110.53,"lat":29.35},{"county":"慈利县","lon":111.12,"lat":29.42},{"county":"桑植县","lon":110.15,"lat":29.4},{"county":"益阳市","lon":112.32,"lat":28.6},{"county":"资阳区","lon":112.32,"lat":28.6},{"county":"赫山区","lon":112.37,"lat":28.6},{"county":"南县","lon":112.4,"lat":29.38},{"county":"桃江县","lon":112.12,"lat":28.53},{"county":"安化县","lon":111.22,"lat":28.38},{"county":"沅江市","lon":112.38,"lat":28.85},{"county":"郴州市","lon":113.02,"lat":25.78},{"county":"北湖区","lon":113.02,"lat":25.8},{"county":"苏仙区","lon":113.03,"lat":25.8},{"county":"桂阳县","lon":112.73,"lat":25.73},{"county":"宜章县","lon":112.95,"lat":25.4},{"county":"永兴县","lon":113.1,"lat":26.13},{"county":"嘉禾县","lon":112.37,"lat":25.58},{"county":"临武县","lon":112.55,"lat":25.28},{"county":"汝城县","lon":113.68,"lat":25.55},{"county":"桂东县","lon":113.93,"lat":26.08},{"county":"安仁县","lon":113.27,"lat":26.7},{"county":"资兴市","lon":113.23,"lat":25.98},{"county":"永州市","lon":111.62,"lat":26.43},{"county":"冷水滩区","lon":111.6,"lat":26.43},{"county":"祁阳县","lon":111.85,"lat":26.58},{"county":"东安县","lon":111.28,"lat":26.4},{"county":"双牌县","lon":111.65,"lat":25.97},{"county":"道县","lon":111.58,"lat":25.53},{"county":"江永县","lon":111.33,"lat":25.28},{"county":"宁远县","lon":111.93,"lat":25.6},{"county":"蓝山县","lon":112.18,"lat":25.37},{"county":"新田县","lon":112.22,"lat":25.92},{"county":"江华瑶族自治县","lon":111.58,"lat":25.18},{"county":"怀化市","lon":110,"lat":27.57},{"county":"鹤城区","lon":109.95,"lat":27.55},{"county":"中方县","lon":109.93,"lat":27.4},{"county":"沅陵县","lon":110.38,"lat":28.47},{"county":"辰溪县","lon":110.18,"lat":28},{"county":"溆浦县","lon":110.58,"lat":27.92},{"county":"会同县","lon":109.72,"lat":26.87},{"county":"麻阳苗族自治县","lon":109.8,"lat":27.87},{"county":"新晃侗族自治县","lon":109.17,"lat":27.37},{"county":"芷江侗族自治县","lon":109.68,"lat":27.45},{"county":"靖州苗族侗族自治县","lon":109.68,"lat":26.58},{"county":"通道侗族自治县","lon":109.78,"lat":26.17},{"county":"洪江市","lon":109.82,"lat":27.2},{"county":"娄底市","lon":112,"lat":27.73},{"county":"娄星区","lon":112,"lat":27.73},{"county":"双峰县","lon":112.2,"lat":27.45},{"county":"新化县","lon":111.3,"lat":27.75},{"county":"冷水江市","lon":111.43,"lat":27.68},{"county":"涟源市","lon":111.67,"lat":27.7},{"county":"湘西土家族苗族自治州","lon":109.73,"lat":28.32},{"county":"吉首市","lon":109.73,"lat":28.32},{"county":"泸溪县","lon":110.22,"lat":28.22},{"county":"凤凰县","lon":109.6,"lat":27.95},{"county":"花垣县","lon":109.48,"lat":28.58},{"county":"保靖县","lon":109.65,"lat":28.72},{"county":"古丈县","lon":109.95,"lat":28.62},{"county":"永顺县","lon":109.85,"lat":29},{"county":"龙山县","lon":109.43,"lat":29.47},{"county":"广州市","lon":113.27,"lat":23.13},{"county":"荔湾区","lon":113.23,"lat":23.13},{"county":"越秀区","lon":113.27,"lat":23.13},{"county":"海珠区","lon":113.25,"lat":23.1},{"county":"天河区","lon":113.35,"lat":23.12},{"county":"白云区","lon":113.27,"lat":23.17},{"county":"黄埔区","lon":113.45,"lat":23.1},{"county":"番禺区","lon":113.35,"lat":22.95},{"county":"花都区","lon":113.22,"lat":23.4},{"county":"增城市","lon":113.83,"lat":23.3},{"county":"从化市","lon":113.58,"lat":23.55},{"county":"韶关市","lon":113.6,"lat":24.82},{"county":"武江区","lon":113.57,"lat":24.8},{"county":"浈江区","lon":113.6,"lat":24.8},{"county":"曲江区","lon":113.6,"lat":24.68},{"county":"始兴县","lon":114.07,"lat":24.95},{"county":"仁化县","lon":113.75,"lat":25.08},{"county":"翁源县","lon":114.13,"lat":24.35},{"county":"乳源瑶族自治县","lon":113.27,"lat":24.78},{"county":"新丰县","lon":114.2,"lat":24.07},{"county":"乐昌市","lon":113.35,"lat":25.13},{"county":"南雄市","lon":114.3,"lat":25.12},{"county":"深圳市","lon":114.05,"lat":22.55},{"county":"罗湖区","lon":114.12,"lat":22.55},{"county":"福田区","lon":114.05,"lat":22.53},{"county":"南山区","lon":113.92,"lat":22.52},{"county":"宝安区","lon":113.9,"lat":22.57},{"county":"龙岗区","lon":114.27,"lat":22.73},{"county":"盐田区","lon":114.22,"lat":22.55},{"county":"珠海市","lon":113.57,"lat":22.27},{"county":"香洲区","lon":113.55,"lat":22.27},{"county":"斗门区","lon":113.28,"lat":22.22},{"county":"金湾区","lon":113.4,"lat":22.07},{"county":"汕头市","lon":116.68,"lat":23.35},{"county":"龙湖区","lon":116.72,"lat":23.37},{"county":"金平区","lon":116.7,"lat":23.37},{"county":"潮阳区","lon":116.6,"lat":23.27},{"county":"潮南区","lon":116.43,"lat":23.25},{"county":"澄海区","lon":116.77,"lat":23.48},{"county":"南澳县","lon":117.02,"lat":23.42},{"county":"佛山市","lon":113.12,"lat":23.02},{"county":"南海区","lon":113.15,"lat":23.03},{"county":"顺德区","lon":113.3,"lat":22.8},{"county":"三水区","lon":112.87,"lat":23.17},{"county":"高明区","lon":112.88,"lat":22.9},{"county":"江门市","lon":113.08,"lat":22.58},{"county":"新会区","lon":113.03,"lat":22.47},{"county":"台山市","lon":112.78,"lat":22.25},{"county":"开平市","lon":112.67,"lat":22.38},{"county":"鹤山市","lon":112.97,"lat":22.77},{"county":"恩平市","lon":112.3,"lat":22.18},{"county":"湛江市","lon":110.35,"lat":21.27},{"county":"赤坎区","lon":110.37,"lat":21.27},{"county":"霞山区","lon":110.4,"lat":21.2},{"county":"坡头区","lon":110.47,"lat":21.23},{"county":"麻章区","lon":110.32,"lat":21.27},{"county":"遂溪县","lon":110.25,"lat":21.38},{"county":"徐闻县","lon":110.17,"lat":20.33},{"county":"廉江市","lon":110.27,"lat":21.62},{"county":"雷州市","lon":110.08,"lat":20.92},{"county":"吴川市","lon":110.77,"lat":21.43},{"county":"茂名市","lon":110.92,"lat":21.67},{"county":"茂南区","lon":110.92,"lat":21.63},{"county":"茂港区","lon":111.02,"lat":21.47},{"county":"电白县","lon":111,"lat":21.5},{"county":"高州市","lon":110.85,"lat":21.92},{"county":"化州市","lon":110.63,"lat":21.67},{"county":"信宜市","lon":110.95,"lat":22.35},{"county":"肇庆市","lon":112.47,"lat":23.05},{"county":"端州区","lon":112.48,"lat":23.05},{"county":"鼎湖区","lon":112.57,"lat":23.17},{"county":"广宁县","lon":112.43,"lat":23.63},{"county":"怀集县","lon":112.18,"lat":23.92},{"county":"封开县","lon":111.5,"lat":23.43},{"county":"德庆县","lon":111.77,"lat":23.15},{"county":"高要市","lon":112.45,"lat":23.03},{"county":"四会市","lon":112.68,"lat":23.33},{"county":"惠州市","lon":114.42,"lat":23.12},{"county":"惠城区","lon":114.4,"lat":23.08},{"county":"惠阳区","lon":114.47,"lat":22.8},{"county":"博罗县","lon":114.28,"lat":23.18},{"county":"惠东县","lon":114.72,"lat":22.98},{"county":"龙门县","lon":114.25,"lat":23.73},{"county":"梅州市","lon":116.12,"lat":24.28},{"county":"梅江区","lon":116.12,"lat":24.32},{"county":"梅县","lon":116.05,"lat":24.28},{"county":"大埔县","lon":116.7,"lat":24.35},{"county":"丰顺县","lon":116.18,"lat":23.77},{"county":"五华县","lon":115.77,"lat":23.93},{"county":"平远县","lon":115.88,"lat":24.57},{"county":"蕉岭县","lon":116.17,"lat":24.67},{"county":"兴宁市","lon":115.73,"lat":24.15},{"county":"汕尾市","lon":115.37,"lat":22.78},{"county":"海丰县","lon":115.33,"lat":22.97},{"county":"陆河县","lon":115.65,"lat":23.3},{"county":"陆丰市","lon":115.65,"lat":22.95},{"county":"河源市","lon":114.7,"lat":23.73},{"county":"源城区","lon":114.7,"lat":23.73},{"county":"紫金县","lon":115.18,"lat":23.63},{"county":"龙川县","lon":115.25,"lat":24.1},{"county":"连平县","lon":114.48,"lat":24.37},{"county":"和平县","lon":114.93,"lat":24.45},{"county":"东源县","lon":114.77,"lat":23.82},{"county":"阳江市","lon":111.98,"lat":21.87},{"county":"江城区","lon":111.95,"lat":21.87},{"county":"阳西县","lon":111.62,"lat":21.75},{"county":"阳东县","lon":112.02,"lat":21.88},{"county":"阳春市","lon":111.78,"lat":22.18},{"county":"清远市","lon":113.03,"lat":23.7},{"county":"清城区","lon":113.02,"lat":23.7},{"county":"佛冈县","lon":113.53,"lat":23.88},{"county":"阳山县","lon":112.63,"lat":24.48},{"county":"连山壮族瑶族自治县","lon":112.08,"lat":24.57},{"county":"连南瑶族自治县","lon":112.28,"lat":24.72},{"county":"清新县","lon":112.98,"lat":23.73},{"county":"英德市","lon":113.4,"lat":24.18},{"county":"连州市","lon":112.38,"lat":24.78},{"county":"东莞市","lon":113.75,"lat":23.05},{"county":"中山市","lon":113.38,"lat":22.52},{"county":"潮州市","lon":116.62,"lat":23.67},{"county":"湘桥区","lon":116.63,"lat":23.68},{"county":"潮安县","lon":116.68,"lat":23.45},{"county":"饶平县","lon":117,"lat":23.67},{"county":"揭阳市","lon":116.37,"lat":23.55},{"county":"揭东县","lon":116.42,"lat":23.57},{"county":"揭西县","lon":115.83,"lat":23.43},{"county":"惠来县","lon":116.28,"lat":23.03},{"county":"普宁市","lon":116.18,"lat":23.3},{"county":"云浮市","lon":112.03,"lat":22.92},{"county":"云城区","lon":112.03,"lat":22.93},{"county":"新兴县","lon":112.23,"lat":22.7},{"county":"郁南县","lon":111.53,"lat":23.23},{"county":"云安县","lon":112,"lat":23.08},{"county":"罗定市","lon":111.57,"lat":22.77},{"county":"南宁市","lon":108.37,"lat":22.82},{"county":"兴宁区","lon":108.38,"lat":22.87},{"county":"江南区","lon":108.28,"lat":22.78},{"county":"西乡塘区","lon":108.3,"lat":22.83},{"county":"良庆区","lon":108.32,"lat":22.77},{"county":"邕宁区","lon":108.48,"lat":22.75},{"county":"武鸣县","lon":108.27,"lat":23.17},{"county":"隆安县","lon":107.68,"lat":23.18},{"county":"马山县","lon":108.17,"lat":23.72},{"county":"上林县","lon":108.6,"lat":23.43},{"county":"宾阳县","lon":108.8,"lat":23.22},{"county":"横县","lon":109.27,"lat":22.68},{"county":"柳州市","lon":109.42,"lat":24.33},{"county":"柳南区","lon":109.38,"lat":24.35},{"county":"柳江县","lon":109.33,"lat":24.27},{"county":"柳城县","lon":109.23,"lat":24.65},{"county":"鹿寨县","lon":109.73,"lat":24.48},{"county":"融安县","lon":109.4,"lat":25.23},{"county":"融水苗族自治县","lon":109.25,"lat":25.07},{"county":"三江侗族自治县","lon":109.6,"lat":25.78},{"county":"桂林市","lon":110.28,"lat":25.28},{"county":"阳朔县","lon":110.48,"lat":24.78},{"county":"临桂县","lon":110.2,"lat":25.23},{"county":"灵川县","lon":110.32,"lat":25.42},{"county":"全州县","lon":111.07,"lat":25.93},{"county":"兴安县","lon":110.67,"lat":25.62},{"county":"永福县","lon":109.98,"lat":24.98},{"county":"灌阳县","lon":111.15,"lat":25.48},{"county":"龙胜各族自治县","lon":110,"lat":25.8},{"county":"资源县","lon":110.63,"lat":26.03},{"county":"平乐县","lon":110.63,"lat":24.63},{"county":"恭城瑶族自治县","lon":110.83,"lat":24.83},{"county":"梧州市","lon":111.27,"lat":23.48},{"county":"苍梧县","lon":111.23,"lat":23.42},{"county":"藤县","lon":110.92,"lat":23.38},{"county":"蒙山县","lon":110.52,"lat":24.2},{"county":"岑溪市","lon":110.98,"lat":22.92},{"county":"北海市","lon":109.12,"lat":21.48},{"county":"铁山港区","lon":109.43,"lat":21.53},{"county":"合浦县","lon":109.2,"lat":21.67},{"county":"防城港市","lon":108.35,"lat":21.7},{"county":"港口区","lon":108.37,"lat":21.65},{"county":"防城区","lon":108.35,"lat":21.77},{"county":"上思县","lon":107.98,"lat":22.15},{"county":"东兴市","lon":107.97,"lat":21.53},{"county":"钦州市","lon":108.62,"lat":21.95},{"county":"钦北区","lon":108.63,"lat":21.98},{"county":"灵山县","lon":109.3,"lat":22.43},{"county":"浦北县","lon":109.55,"lat":22.27},{"county":"贵港市","lon":109.6,"lat":23.1},{"county":"覃塘区","lon":109.42,"lat":23.13},{"county":"平南县","lon":110.38,"lat":23.55},{"county":"桂平市","lon":110.08,"lat":23.4},{"county":"玉林市","lon":110.17,"lat":22.63},{"county":"容县","lon":110.55,"lat":22.87},{"county":"陆川县","lon":110.27,"lat":22.33},{"county":"博白县","lon":109.97,"lat":22.28},{"county":"兴业县","lon":109.87,"lat":22.75},{"county":"北流市","lon":110.35,"lat":22.72},{"county":"百色市","lon":106.62,"lat":23.9},{"county":"田阳县","lon":106.92,"lat":23.73},{"county":"田东县","lon":107.12,"lat":23.6},{"county":"平果县","lon":107.58,"lat":23.32},{"county":"德保县","lon":106.62,"lat":23.33},{"county":"靖西县","lon":106.42,"lat":23.13},{"county":"那坡县","lon":105.83,"lat":23.42},{"county":"凌云县","lon":106.57,"lat":24.35},{"county":"乐业县","lon":106.55,"lat":24.78},{"county":"田林县","lon":106.23,"lat":24.3},{"county":"西林县","lon":105.1,"lat":24.5},{"county":"隆林各族自治县","lon":105.33,"lat":24.77},{"county":"贺州市","lon":111.55,"lat":24.42},{"county":"昭平县","lon":110.8,"lat":24.17},{"county":"钟山县","lon":111.3,"lat":24.53},{"county":"富川瑶族自治县","lon":111.27,"lat":24.83},{"county":"河池市","lon":108.07,"lat":24.7},{"county":"金城江区","lon":108.05,"lat":24.7},{"county":"南丹县","lon":107.53,"lat":24.98},{"county":"天峨县","lon":107.17,"lat":25},{"county":"凤山县","lon":107.05,"lat":24.55},{"county":"东兰县","lon":107.37,"lat":24.52},{"county":"罗城仫佬族自治县","lon":108.9,"lat":24.78},{"county":"环江毛南族自治县","lon":108.25,"lat":24.83},{"county":"巴马瑶族自治县","lon":107.25,"lat":24.15},{"county":"都安瑶族自治县","lon":108.1,"lat":23.93},{"county":"大化瑶族自治县","lon":107.98,"lat":23.73},{"county":"宜州市","lon":108.67,"lat":24.5},{"county":"来宾市","lon":109.23,"lat":23.73},{"county":"忻城县","lon":108.67,"lat":24.07},{"county":"象州县","lon":109.68,"lat":23.97},{"county":"武宣县","lon":109.67,"lat":23.6},{"county":"金秀瑶族自治县","lon":110.18,"lat":24.13},{"county":"合山市","lon":108.87,"lat":23.82},{"county":"崇左市","lon":107.37,"lat":22.4},{"county":"扶绥县","lon":107.9,"lat":22.63},{"county":"宁明县","lon":107.07,"lat":22.13},{"county":"龙州县","lon":106.85,"lat":22.35},{"county":"大新县","lon":107.2,"lat":22.83},{"county":"天等县","lon":107.13,"lat":23.08},{"county":"凭祥市","lon":106.75,"lat":22.12},{"county":"海口市","lon":110.32,"lat":20.03},{"county":"秀英区","lon":110.28,"lat":20.02},{"county":"龙华区","lon":110.3,"lat":20.03},{"county":"琼山区","lon":110.35,"lat":20},{"county":"美兰区","lon":110.37,"lat":20.03},{"county":"三亚市","lon":109.5,"lat":18.25},{"county":"五指山市","lon":109.52,"lat":18.78},{"county":"琼海市","lon":110.47,"lat":19.25},{"county":"儋州市","lon":109.57,"lat":19.52},{"county":"文昌市","lon":110.8,"lat":19.55},{"county":"万宁市","lon":110.4,"lat":18.8},{"county":"东方市","lon":108.63,"lat":19.1},{"county":"定安县","lon":110.32,"lat":19.7},{"county":"屯昌县","lon":110.1,"lat":19.37},{"county":"澄迈县","lon":110,"lat":19.73},{"county":"临高县","lon":109.68,"lat":19.92},{"county":"白沙黎族自治县","lon":109.45,"lat":19.23},{"county":"昌江黎族自治县","lon":109.05,"lat":19.25},{"county":"乐东黎族自治县","lon":109.17,"lat":18.75},{"county":"陵水黎族自治县","lon":110.03,"lat":18.5},{"county":"保亭黎族苗族自治县","lon":109.7,"lat":18.63},{"county":"琼中黎族苗族自治县","lon":109.83,"lat":19.03},{"county":"重庆市","lon":106.55,"lat":29.57},{"county":"万州区","lon":108.4,"lat":30.82},{"county":"涪陵区","lon":107.4,"lat":29.72},{"county":"渝中区","lon":106.57,"lat":29.55},{"county":"大渡口区","lon":106.48,"lat":29.48},{"county":"江北区","lon":106.57,"lat":29.6},{"county":"沙坪坝区","lon":106.45,"lat":29.53},{"county":"九龙坡区","lon":106.5,"lat":29.5},{"county":"南岸区","lon":106.57,"lat":29.52},{"county":"北碚区","lon":106.4,"lat":29.8},{"county":"万盛区","lon":106.92,"lat":28.97},{"county":"双桥区","lon":105.78,"lat":29.48},{"county":"渝北区","lon":106.63,"lat":29.72},{"county":"巴南区","lon":106.52,"lat":29.38},{"county":"黔江区","lon":108.77,"lat":29.53},{"county":"长寿区","lon":107.08,"lat":29.87},{"county":"綦江县","lon":106.65,"lat":29.03},{"county":"潼南县","lon":105.83,"lat":30.18},{"county":"铜梁县","lon":106.05,"lat":29.85},{"county":"大足县","lon":105.72,"lat":29.7},{"county":"荣昌县","lon":105.58,"lat":29.4},{"county":"璧山县","lon":106.22,"lat":29.6},{"county":"梁平县","lon":107.8,"lat":30.68},{"county":"城口县","lon":108.67,"lat":31.95},{"county":"丰都县","lon":107.73,"lat":29.87},{"county":"垫江县","lon":107.35,"lat":30.33},{"county":"武隆县","lon":107.75,"lat":29.33},{"county":"忠县","lon":108.02,"lat":30.3},{"county":"开县","lon":108.42,"lat":31.18},{"county":"云阳县","lon":108.67,"lat":30.95},{"county":"奉节县","lon":109.47,"lat":31.02},{"county":"巫山县","lon":109.88,"lat":31.08},{"county":"巫溪县","lon":109.63,"lat":31.4},{"county":"石柱土家族自治县","lon":108.12,"lat":30},{"county":"秀山土家族苗族自治县","lon":108.98,"lat":28.45},{"county":"酉阳土家族苗族自治县","lon":108.77,"lat":28.85},{"county":"彭水苗族土家族自治县","lon":108.17,"lat":29.3},{"county":"成都市","lon":104.07,"lat":30.67},{"county":"锦江区","lon":104.08,"lat":30.67},{"county":"青羊区","lon":104.05,"lat":30.68},{"county":"金牛区","lon":104.05,"lat":30.7},{"county":"武侯区","lon":104.05,"lat":30.65},{"county":"成华区","lon":104.1,"lat":30.67},{"county":"龙泉驿区","lon":104.27,"lat":30.57},{"county":"青白江区","lon":104.23,"lat":30.88},{"county":"新都区","lon":104.15,"lat":30.83},{"county":"温江区","lon":103.83,"lat":30.7},{"county":"金堂县","lon":104.43,"lat":30.85},{"county":"双流县","lon":103.92,"lat":30.58},{"county":"郫县","lon":103.88,"lat":30.82},{"county":"大邑县","lon":103.52,"lat":30.58},{"county":"蒲江县","lon":103.5,"lat":30.2},{"county":"新津县","lon":103.82,"lat":30.42},{"county":"都江堰市","lon":103.62,"lat":31},{"county":"彭州市","lon":103.93,"lat":30.98},{"county":"邛崃市","lon":103.47,"lat":30.42},{"county":"崇州市","lon":103.67,"lat":30.63},{"county":"自贡市","lon":104.78,"lat":29.35},{"county":"自流井区","lon":104.77,"lat":29.35},{"county":"贡井区","lon":104.72,"lat":29.35},{"county":"大安区","lon":104.77,"lat":29.37},{"county":"沿滩区","lon":104.87,"lat":29.27},{"county":"荣县","lon":104.42,"lat":29.47},{"county":"富顺县","lon":104.98,"lat":29.18},{"county":"攀枝花市","lon":101.72,"lat":26.58},{"county":"东区","lon":101.7,"lat":26.55},{"county":"西区","lon":101.6,"lat":26.6},{"county":"仁和区","lon":101.73,"lat":26.5},{"county":"米易县","lon":102.12,"lat":26.88},{"county":"盐边县","lon":101.85,"lat":26.7},{"county":"泸州市","lon":105.43,"lat":28.87},{"county":"江阳区","lon":105.45,"lat":28.88},{"county":"纳溪区","lon":105.37,"lat":28.77},{"county":"龙马潭区","lon":105.43,"lat":28.9},{"county":"泸县","lon":105.38,"lat":29.15},{"county":"合江县","lon":105.83,"lat":28.82},{"county":"叙永县","lon":105.43,"lat":28.17},{"county":"古蔺县","lon":105.82,"lat":28.05},{"county":"德阳市","lon":104.38,"lat":31.13},{"county":"旌阳区","lon":104.38,"lat":31.13},{"county":"中江县","lon":104.68,"lat":31.03},{"county":"罗江县","lon":104.5,"lat":31.32},{"county":"广汉市","lon":104.28,"lat":30.98},{"county":"什邡市","lon":104.17,"lat":31.13},{"county":"绵竹市","lon":104.2,"lat":31.35},{"county":"绵阳市","lon":104.73,"lat":31.47},{"county":"涪城区","lon":104.73,"lat":31.47},{"county":"游仙区","lon":104.75,"lat":31.47},{"county":"三台县","lon":105.08,"lat":31.1},{"county":"盐亭县","lon":105.38,"lat":31.22},{"county":"安县","lon":104.57,"lat":31.53},{"county":"梓潼县","lon":105.17,"lat":31.63},{"county":"北川羌族自治县","lon":104.45,"lat":31.82},{"county":"平武县","lon":104.53,"lat":32.42},{"county":"江油市","lon":104.75,"lat":31.78},{"county":"广元市","lon":105.83,"lat":32.43},{"county":"市中区","lon":105.05,"lat":29.58},{"county":"市中区","lon":103.77,"lat":29.57},{"county":"元坝区","lon":105.97,"lat":32.32},{"county":"朝天区","lon":105.88,"lat":32.65},{"county":"旺苍县","lon":106.28,"lat":32.23},{"county":"青川县","lon":105.23,"lat":32.58},{"county":"剑阁县","lon":105.52,"lat":32.28},{"county":"苍溪县","lon":105.93,"lat":31.73},{"county":"遂宁市","lon":105.57,"lat":30.52},{"county":"船山区","lon":105.57,"lat":30.52},{"county":"安居区","lon":105.45,"lat":30.35},{"county":"蓬溪县","lon":105.72,"lat":30.78},{"county":"射洪县","lon":105.38,"lat":30.87},{"county":"大英县","lon":105.25,"lat":30.58},{"county":"内江市","lon":105.05,"lat":29.58},{"county":"市中区","lon":105.05,"lat":29.58},{"county":"市中区","lon":103.77,"lat":29.57},{"county":"东兴区","lon":105.07,"lat":29.6},{"county":"威远县","lon":104.67,"lat":29.53},{"county":"资中县","lon":104.85,"lat":29.78},{"county":"隆??县","lon":105.28,"lat":29.35},{"county":"乐山市","lon":103.77,"lat":29.57},{"county":"市中区","lon":105.05,"lat":29.58},{"county":"市中区","lon":103.77,"lat":29.57},{"county":"沙湾区","lon":103.55,"lat":29.42},{"county":"五通桥区","lon":103.82,"lat":29.4},{"county":"金口河区","lon":103.08,"lat":29.25},{"county":"犍为县","lon":103.95,"lat":29.22},{"county":"井研县","lon":104.07,"lat":29.65},{"county":"夹江县","lon":103.57,"lat":29.73},{"county":"沐川县","lon":103.9,"lat":28.97},{"county":"峨边彝族自治县","lon":103.27,"lat":29.23},{"county":"马边彝族自治县","lon":103.55,"lat":28.83},{"county":"峨眉山市","lon":103.48,"lat":29.6},{"county":"南充市","lon":106.08,"lat":30.78},{"county":"顺庆区","lon":106.08,"lat":30.78},{"county":"高坪区","lon":106.1,"lat":30.77},{"county":"嘉陵区","lon":106.05,"lat":30.77},{"county":"南部县","lon":106.07,"lat":31.35},{"county":"营山县","lon":106.57,"lat":31.08},{"county":"蓬安县","lon":106.42,"lat":31.03},{"county":"仪陇县","lon":106.28,"lat":31.27},{"county":"西充县","lon":105.88,"lat":31},{"county":"阆中市","lon":106,"lat":31.55},{"county":"眉山市","lon":103.83,"lat":30.05},{"county":"东坡区","lon":103.83,"lat":30.05},{"county":"仁寿县","lon":104.15,"lat":30},{"county":"彭山县","lon":103.87,"lat":30.2},{"county":"洪雅县","lon":103.37,"lat":29.92},{"county":"丹棱县","lon":103.52,"lat":30.02},{"county":"青神县","lon":103.85,"lat":29.83},{"county":"宜宾市","lon":104.62,"lat":28.77},{"county":"翠屏区","lon":104.62,"lat":28.77},{"county":"宜宾县","lon":104.55,"lat":28.7},{"county":"南溪县","lon":104.98,"lat":28.85},{"county":"江安县","lon":105.07,"lat":28.73},{"county":"长宁县","lon":104.92,"lat":28.58},{"county":"高县","lon":104.52,"lat":28.43},{"county":"珙县","lon":104.72,"lat":28.45},{"county":"筠连县","lon":104.52,"lat":28.17},{"county":"兴文县","lon":105.23,"lat":28.3},{"county":"屏山县","lon":104.33,"lat":28.83},{"county":"广安市","lon":106.63,"lat":30.47},{"county":"岳池县","lon":106.43,"lat":30.55},{"county":"武胜县","lon":106.28,"lat":30.35},{"county":"邻水县","lon":106.93,"lat":30.33},{"county":"华蓥市","lon":106.77,"lat":30.38},{"county":"达州市","lon":107.5,"lat":31.22},{"county":"通川区","lon":107.48,"lat":31.22},{"county":"达县","lon":107.5,"lat":31.2},{"county":"宣汉县","lon":107.72,"lat":31.35},{"county":"开江县","lon":107.87,"lat":31.08},{"county":"大竹县","lon":107.2,"lat":30.73},{"county":"渠县","lon":106.97,"lat":30.83},{"county":"万源市","lon":108.03,"lat":32.07},{"county":"雅安市","lon":103,"lat":29.98},{"county":"雨城区","lon":103,"lat":29.98},{"county":"名山县","lon":103.12,"lat":30.08},{"county":"荥经县","lon":102.85,"lat":29.8},{"county":"汉源县","lon":102.65,"lat":29.35},{"county":"石棉县","lon":102.37,"lat":29.23},{"county":"天全县","lon":102.75,"lat":30.07},{"county":"芦山县","lon":102.92,"lat":30.15},{"county":"宝兴县","lon":102.82,"lat":30.37},{"county":"巴中市","lon":106.77,"lat":31.85},{"county":"巴州区","lon":106.77,"lat":31.85},{"county":"通江县","lon":107.23,"lat":31.92},{"county":"南江县","lon":106.83,"lat":32.35},{"county":"平昌县","lon":107.1,"lat":31.57},{"county":"资阳市","lon":104.65,"lat":30.12},{"county":"雁江区","lon":104.65,"lat":30.12},{"county":"安岳县","lon":105.33,"lat":30.1},{"county":"乐至县","lon":105.02,"lat":30.28},{"county":"简阳市","lon":104.55,"lat":30.4},{"county":"阿坝藏族羌族自治州","lon":102.22,"lat":31.9},{"county":"汶川县","lon":103.58,"lat":31.48},{"county":"理县","lon":103.17,"lat":31.43},{"county":"茂县","lon":103.85,"lat":31.68},{"county":"松潘县","lon":103.6,"lat":32.63},{"county":"九寨沟县","lon":104.23,"lat":33.27},{"county":"金川县","lon":102.07,"lat":31.48},{"county":"小金县","lon":102.37,"lat":31},{"county":"黑水县","lon":102.98,"lat":32.07},{"county":"马尔康县","lon":102.22,"lat":31.9},{"county":"壤塘县","lon":100.98,"lat":32.27},{"county":"阿坝县","lon":101.7,"lat":32.9},{"county":"若尔盖县","lon":102.95,"lat":33.58},{"county":"红原县","lon":102.55,"lat":32.8},{"county":"甘孜藏族自治州","lon":101.97,"lat":30.05},{"county":"康定县","lon":101.97,"lat":30.05},{"county":"泸定县","lon":102.23,"lat":29.92},{"county":"丹巴县","lon":101.88,"lat":30.88},{"county":"九龙县","lon":101.5,"lat":29},{"county":"雅江县","lon":101.02,"lat":30.03},{"county":"道孚县","lon":101.12,"lat":30.98},{"county":"炉霍县","lon":100.68,"lat":31.4},{"county":"甘孜县","lon":99.98,"lat":31.62},{"county":"新龙县","lon":100.32,"lat":30.95},{"county":"德格县","lon":98.58,"lat":31.82},{"county":"白玉县","lon":98.83,"lat":31.22},{"county":"石渠县","lon":98.1,"lat":32.98},{"county":"色达县","lon":100.33,"lat":32.27},{"county":"理塘县","lon":100.27,"lat":30},{"county":"巴塘县","lon":99.1,"lat":30},{"county":"乡城县","lon":99.8,"lat":28.93},{"county":"稻城县","lon":100.3,"lat":29.03},{"county":"得荣县","lon":99.28,"lat":28.72},{"county":"凉山彝族自治州","lon":102.27,"lat":27.9},{"county":"西昌市","lon":102.27,"lat":27.9},{"county":"木里藏族自治县","lon":101.28,"lat":27.93},{"county":"盐源县","lon":101.5,"lat":27.43},{"county":"德昌县","lon":102.18,"lat":27.4},{"county":"会理县","lon":102.25,"lat":26.67},{"county":"会东县","lon":102.58,"lat":26.63},{"county":"宁南县","lon":102.77,"lat":27.07},{"county":"普格县","lon":102.53,"lat":27.38},{"county":"布拖县","lon":102.82,"lat":27.72},{"county":"金阳县","lon":103.25,"lat":27.7},{"county":"昭觉县","lon":102.85,"lat":28.02},{"county":"喜德县","lon":102.42,"lat":28.32},{"county":"冕宁县","lon":102.17,"lat":28.55},{"county":"越西县","lon":102.52,"lat":28.65},{"county":"甘洛县","lon":102.77,"lat":28.97},{"county":"美姑县","lon":103.13,"lat":28.33},{"county":"雷波县","lon":103.57,"lat":28.27},{"county":"贵阳市","lon":106.63,"lat":26.65},{"county":"南明区","lon":106.72,"lat":26.57},{"county":"云岩区","lon":106.72,"lat":26.62},{"county":"乌当区","lon":106.75,"lat":26.63},{"county":"白云区","lon":106.65,"lat":26.68},{"county":"小河区","lon":106.7,"lat":26.53},{"county":"开阳县","lon":106.97,"lat":27.07},{"county":"息烽县","lon":106.73,"lat":27.1},{"county":"修文县","lon":106.58,"lat":26.83},{"county":"清镇市","lon":106.47,"lat":26.55},{"county":"六盘水市","lon":104.83,"lat":26.6},{"county":"钟山区","lon":104.83,"lat":26.6},{"county":"六枝特区","lon":105.48,"lat":26.22},{"county":"水城县","lon":104.95,"lat":26.55},{"county":"盘县","lon":104.47,"lat":25.72},{"county":"遵义市","lon":106.92,"lat":27.73},{"county":"红花岗区","lon":106.92,"lat":27.65},{"county":"汇川区","lon":106.92,"lat":27.73},{"county":"遵义县","lon":106.83,"lat":27.53},{"county":"桐梓县","lon":106.82,"lat":28.13},{"county":"绥阳县","lon":107.18,"lat":27.95},{"county":"正安县","lon":107.43,"lat":28.55},{"county":"道真仡佬族苗族自治县","lon":107.6,"lat":28.88},{"county":"务川仡佬族苗族自治县","lon":107.88,"lat":28.53},{"county":"凤冈县","lon":107.72,"lat":27.97},{"county":"湄潭县","lon":107.48,"lat":27.77},{"county":"余庆县","lon":107.88,"lat":27.22},{"county":"习水县","lon":106.22,"lat":28.32},{"county":"赤水市","lon":105.7,"lat":28.58},{"county":"仁怀市","lon":106.42,"lat":27.82},{"county":"安顺市","lon":105.95,"lat":26.25},{"county":"西秀区","lon":105.92,"lat":26.25},{"county":"平坝县","lon":106.25,"lat":26.42},{"county":"普定县","lon":105.75,"lat":26.32},{"county":"镇宁布依族苗族自治县","lon":105.77,"lat":26.07},{"county":"关岭布依族苗族自治县","lon":105.62,"lat":25.95},{"county":"紫云苗族布依族自治县","lon":106.08,"lat":25.75},{"county":"铜仁地区","lon":109.18,"lat":27.72},{"county":"铜仁市","lon":109.18,"lat":27.72},{"county":"江口县","lon":108.85,"lat":27.7},{"county":"玉屏侗族自治县","lon":108.92,"lat":27.23},{"county":"石阡县","lon":108.23,"lat":27.52},{"county":"思南县","lon":108.25,"lat":27.93},{"county":"印江土家族苗族自治县","lon":108.4,"lat":28},{"county":"德江县","lon":108.12,"lat":28.27},{"county":"沿河土家族自治县","lon":108.5,"lat":28.57},{"county":"松桃苗族自治县","lon":109.2,"lat":28.17},{"county":"万山特区","lon":109.2,"lat":27.52},{"county":"兴义市","lon":104.9,"lat":25.08},{"county":"兴仁县","lon":105.18,"lat":25.43},{"county":"普安县","lon":104.95,"lat":25.78},{"county":"晴隆县","lon":105.22,"lat":25.83},{"county":"贞丰县","lon":105.65,"lat":25.38},{"county":"望谟县","lon":106.1,"lat":25.17},{"county":"册亨县","lon":105.82,"lat":24.98},{"county":"安龙县","lon":105.47,"lat":25.12},{"county":"毕节地区","lon":105.28,"lat":27.3},{"county":"毕节市","lon":105.28,"lat":27.3},{"county":"大方县","lon":105.6,"lat":27.15},{"county":"黔西县","lon":106.03,"lat":27.03},{"county":"金沙县","lon":106.22,"lat":27.47},{"county":"织金县","lon":105.77,"lat":26.67},{"county":"纳雍县","lon":105.38,"lat":26.78},{"county":"赫章县","lon":104.72,"lat":27.13},{"county":"黔东南苗族侗族自治州","lon":107.97,"lat":26.58},{"county":"凯里市","lon":107.97,"lat":26.58},{"county":"黄平县","lon":107.9,"lat":26.9},{"county":"施秉县","lon":108.12,"lat":27.03},{"county":"三穗县","lon":108.68,"lat":26.97},{"county":"镇远县","lon":108.42,"lat":27.05},{"county":"岑巩县","lon":108.82,"lat":27.18},{"county":"天柱县","lon":109.2,"lat":26.92},{"county":"锦屏县","lon":109.2,"lat":26.68},{"county":"剑河县","lon":108.45,"lat":26.73},{"county":"台江县","lon":108.32,"lat":26.67},{"county":"黎平县","lon":109.13,"lat":26.23},{"county":"榕江县","lon":108.52,"lat":25.93},{"county":"从江县","lon":108.9,"lat":25.75},{"county":"雷山县","lon":108.07,"lat":26.38},{"county":"麻江县","lon":107.58,"lat":26.5},{"county":"丹寨县","lon":107.8,"lat":26.2},{"county":"黔南布依族苗族自治州","lon":107.52,"lat":26.27},{"county":"都匀市","lon":107.52,"lat":26.27},{"county":"福泉市","lon":107.5,"lat":26.7},{"county":"荔波县","lon":107.88,"lat":25.42},{"county":"贵定县","lon":107.23,"lat":26.58},{"county":"瓮安县","lon":107.47,"lat":27.07},{"county":"独山县","lon":107.53,"lat":25.83},{"county":"平塘县","lon":107.32,"lat":25.83},{"county":"罗甸县","lon":106.75,"lat":25.43},{"county":"长顺县","lon":106.45,"lat":26.03},{"county":"龙里县","lon":106.97,"lat":26.45},{"county":"惠水县","lon":106.65,"lat":26.13},{"county":"三都水族自治县","lon":107.87,"lat":25.98},{"county":"昆明市","lon":102.72,"lat":25.05},{"county":"五华区","lon":102.7,"lat":25.05},{"county":"盘龙区","lon":102.72,"lat":25.03},{"county":"官渡区","lon":102.75,"lat":25.02},{"county":"西山区","lon":102.67,"lat":25.03},{"county":"东川区","lon":103.18,"lat":26.08},{"county":"呈贡县","lon":102.8,"lat":24.88},{"county":"晋宁县","lon":102.6,"lat":24.67},{"county":"富民县","lon":102.5,"lat":25.22},{"county":"宜良县","lon":103.15,"lat":24.92},{"county":"石林彝族自治县","lon":103.27,"lat":24.77},{"county":"嵩明县","lon":103.03,"lat":25.35},{"county":"禄劝彝族苗族自治县","lon":102.47,"lat":25.55},{"county":"寻甸回族彝族自治县","lon":103.25,"lat":25.57},{"county":"安宁市","lon":102.48,"lat":24.92},{"county":"曲靖市","lon":103.8,"lat":25.5},{"county":"麒麟区","lon":103.8,"lat":25.5},{"county":"马龙县","lon":103.58,"lat":25.43},{"county":"陆良县","lon":103.67,"lat":25.03},{"county":"师宗县","lon":103.98,"lat":24.83},{"county":"罗平县","lon":104.3,"lat":24.88},{"county":"富源县","lon":104.25,"lat":25.67},{"county":"会泽县","lon":103.3,"lat":26.42},{"county":"沾益县","lon":103.82,"lat":25.62},{"county":"宣威市","lon":104.1,"lat":26.22},{"county":"玉溪市","lon":102.55,"lat":24.35},{"county":"江川县","lon":102.75,"lat":24.28},{"county":"澄江县","lon":102.92,"lat":24.67},{"county":"通海县","lon":102.75,"lat":24.12},{"county":"华宁县","lon":102.93,"lat":24.2},{"county":"易门县","lon":102.17,"lat":24.67},{"county":"峨山彝族自治县","lon":102.4,"lat":24.18},{"county":"新平彝族傣族自治县","lon":101.98,"lat":24.07},{"county":"保山市","lon":99.17,"lat":25.12},{"county":"隆阳区","lon":99.17,"lat":25.12},{"county":"施甸县","lon":99.18,"lat":24.73},{"county":"腾冲县","lon":98.5,"lat":25.03},{"county":"龙陵县","lon":98.68,"lat":24.58},{"county":"昌宁县","lon":99.6,"lat":24.83},{"county":"昭通市","lon":103.72,"lat":27.33},{"county":"昭阳区","lon":103.72,"lat":27.33},{"county":"鲁甸县","lon":103.55,"lat":27.2},{"county":"巧家县","lon":102.92,"lat":26.92},{"county":"盐津县","lon":104.23,"lat":28.12},{"county":"大关县","lon":103.88,"lat":27.75},{"county":"永善县","lon":103.63,"lat":28.23},{"county":"绥江县","lon":103.95,"lat":28.6},{"county":"镇雄县","lon":104.87,"lat":27.45},{"county":"彝良县","lon":104.05,"lat":27.63},{"county":"威信县","lon":105.05,"lat":27.85},{"county":"水富县","lon":104.4,"lat":28.63},{"county":"丽江市","lon":100.23,"lat":26.88},{"county":"古城区","lon":100.23,"lat":26.88},{"county":"玉龙纳西族自治县","lon":100.23,"lat":26.82},{"county":"永胜县","lon":100.75,"lat":26.68},{"county":"华坪县","lon":101.27,"lat":26.63},{"county":"宁蒗彝族自治县","lon":100.85,"lat":27.28},{"county":"墨江哈尼族自治县","lon":101.68,"lat":23.43},{"county":"景东彝族自治县","lon":100.83,"lat":24.45},{"county":"景谷傣族彝族自治县","lon":100.7,"lat":23.5},{"county":"江城哈尼族彝族自治县","lon":101.85,"lat":22.58},{"county":"澜沧拉祜族自治县","lon":99.93,"lat":22.55},{"county":"西盟佤族自治县","lon":99.62,"lat":22.63},{"county":"临沧市","lon":100.08,"lat":23.88},{"county":"临翔区","lon":100.08,"lat":23.88},{"county":"凤庆县","lon":99.92,"lat":24.6},{"county":"云县","lon":100.13,"lat":24.45},{"county":"永德县","lon":99.25,"lat":24.03},{"county":"镇康县","lon":98.83,"lat":23.78},{"county":"耿马傣族佤族自治县","lon":99.4,"lat":23.55},{"county":"沧源佤族自治县","lon":99.25,"lat":23.15},{"county":"楚雄彝族自治州","lon":101.55,"lat":25.03},{"county":"楚雄市","lon":101.55,"lat":25.03},{"county":"双柏县","lon":101.63,"lat":24.7},{"county":"牟定县","lon":101.53,"lat":25.32},{"county":"南华县","lon":101.27,"lat":25.2},{"county":"姚安县","lon":101.23,"lat":25.5},{"county":"大姚县","lon":101.32,"lat":25.73},{"county":"永仁县","lon":101.67,"lat":26.07},{"county":"元谋县","lon":101.88,"lat":25.7},{"county":"武定县","lon":102.4,"lat":25.53},{"county":"禄丰县","lon":102.08,"lat":25.15},{"county":"红河哈尼族彝族自治州","lon":103.4,"lat":23.37},{"county":"个旧市","lon":103.15,"lat":23.37},{"county":"开远市","lon":103.27,"lat":23.72},{"county":"蒙自县","lon":103.4,"lat":23.37},{"county":"屏边苗族自治县","lon":103.68,"lat":22.98},{"county":"建水县","lon":102.83,"lat":23.62},{"county":"石屏县","lon":102.5,"lat":23.72},{"county":"弥勒县","lon":103.43,"lat":24.4},{"county":"泸西县","lon":103.77,"lat":24.53},{"county":"元阳县","lon":102.83,"lat":23.23},{"county":"红河县","lon":102.42,"lat":23.37},{"county":"绿春县","lon":102.4,"lat":23},{"county":"河口瑶族自治县","lon":103.97,"lat":22.52},{"county":"文山壮族苗族自治州","lon":104.25,"lat":23.37},{"county":"文山县","lon":104.25,"lat":23.37},{"county":"砚山县","lon":104.33,"lat":23.62},{"county":"西畴县","lon":104.67,"lat":23.45},{"county":"麻栗坡县","lon":104.7,"lat":23.12},{"county":"马关县","lon":104.4,"lat":23.02},{"county":"丘北县","lon":104.18,"lat":24.05},{"county":"广南县","lon":105.07,"lat":24.05},{"county":"富宁县","lon":105.62,"lat":23.63},{"county":"西双版纳傣族自治州","lon":100.8,"lat":22.02},{"county":"景洪市","lon":100.8,"lat":22.02},{"county":"勐海县","lon":100.45,"lat":21.97},{"county":"勐腊县","lon":101.57,"lat":21.48},{"county":"大理白族自治州","lon":100.23,"lat":25.6},{"county":"大理市","lon":100.23,"lat":25.6},{"county":"漾濞彝族自治县","lon":99.95,"lat":25.67},{"county":"祥云县","lon":100.55,"lat":25.48},{"county":"宾川县","lon":100.58,"lat":25.83},{"county":"弥渡县","lon":100.48,"lat":25.35},{"county":"南涧彝族自治县","lon":100.52,"lat":25.05},{"county":"巍山彝族回族自治县","lon":100.3,"lat":25.23},{"county":"永平县","lon":99.53,"lat":25.47},{"county":"云龙县","lon":99.37,"lat":25.88},{"county":"洱源县","lon":99.95,"lat":26.12},{"county":"剑川县","lon":99.9,"lat":26.53},{"county":"鹤庆县","lon":100.18,"lat":26.57},{"county":"德宏傣族景颇族自治州","lon":98.58,"lat":24.43},{"county":"瑞丽市","lon":97.85,"lat":24.02},{"county":"潞西市","lon":98.58,"lat":24.43},{"county":"梁河县","lon":98.3,"lat":24.82},{"county":"盈江县","lon":97.93,"lat":24.72},{"county":"陇川县","lon":97.8,"lat":24.2},{"county":"怒江傈僳族自治州","lon":98.85,"lat":25.85},{"county":"泸水县","lon":98.85,"lat":25.85},{"county":"福贡县","lon":98.87,"lat":26.9},{"county":"贡山独龙族怒族自治县","lon":98.67,"lat":27.73},{"county":"兰坪白族普米族自治县","lon":99.42,"lat":26.45},{"county":"迪庆藏族自治州","lon":99.7,"lat":27.83},{"county":"香格里拉县","lon":99.7,"lat":27.83},{"county":"德钦县","lon":98.92,"lat":28.48},{"county":"维西傈僳族自治县","lon":99.28,"lat":27.18},{"county":"拉萨市","lon":91.13,"lat":29.65},{"county":"城关区","lon":91.13,"lat":29.65},{"county":"林周县","lon":91.25,"lat":29.9},{"county":"当雄县","lon":91.1,"lat":30.48},{"county":"尼木县","lon":90.15,"lat":29.45},{"county":"曲水县","lon":90.73,"lat":29.37},{"county":"堆龙德庆县","lon":91,"lat":29.65},{"county":"达孜县","lon":91.35,"lat":29.68},{"county":"墨竹工卡县","lon":91.73,"lat":29.83},{"county":"昌都地区","lon":97.18,"lat":31.13},{"county":"昌都县","lon":97.18,"lat":31.13},{"county":"江达县","lon":98.22,"lat":31.5},{"county":"贡觉县","lon":98.27,"lat":30.87},{"county":"类乌齐县","lon":96.6,"lat":31.22},{"county":"丁青县","lon":95.6,"lat":31.42},{"county":"察雅县","lon":97.57,"lat":30.65},{"county":"八宿县","lon":96.92,"lat":30.05},{"county":"左贡县","lon":97.85,"lat":29.67},{"county":"芒康县","lon":98.6,"lat":29.68},{"county":"洛隆县","lon":95.83,"lat":30.75},{"county":"边坝县","lon":94.7,"lat":30.93},{"county":"山南地区","lon":91.77,"lat":29.23},{"county":"乃东县","lon":91.77,"lat":29.23},{"county":"扎囊县","lon":91.33,"lat":29.25},{"county":"贡嘎县","lon":90.98,"lat":29.3},{"county":"桑日县","lon":92.02,"lat":29.27},{"county":"琼结县","lon":91.68,"lat":29.03},{"county":"曲松县","lon":92.2,"lat":29.07},{"county":"措美县","lon":91.43,"lat":28.43},{"county":"洛扎县","lon":90.87,"lat":28.38},{"county":"加查县","lon":92.58,"lat":29.15},{"county":"隆子县","lon":92.47,"lat":28.42},{"county":"错那县","lon":91.95,"lat":28},{"county":"浪卡子县","lon":90.4,"lat":28.97},{"county":"日喀则地区","lon":88.88,"lat":29.27},{"county":"日喀则市","lon":88.88,"lat":29.27},{"county":"南木林县","lon":89.1,"lat":29.68},{"county":"江孜县","lon":89.6,"lat":28.92},{"county":"定日县","lon":87.12,"lat":28.67},{"county":"萨迦县","lon":88.02,"lat":28.9},{"county":"拉孜县","lon":87.63,"lat":29.08},{"county":"昂仁县","lon":87.23,"lat":29.3},{"county":"谢通门县","lon":88.27,"lat":29.43},{"county":"白朗县","lon":89.27,"lat":29.12},{"county":"仁布县","lon":89.83,"lat":29.23},{"county":"康马县","lon":89.68,"lat":28.57},{"county":"定结县","lon":87.77,"lat":28.37},{"county":"仲巴县","lon":84.03,"lat":29.77},{"county":"亚东县","lon":88.9,"lat":27.48},{"county":"吉隆县","lon":85.3,"lat":28.85},{"county":"聂拉木县","lon":85.98,"lat":28.17},{"county":"萨嘎县","lon":85.23,"lat":29.33},{"county":"岗巴县","lon":88.52,"lat":28.28},{"county":"那曲地区","lon":92.07,"lat":31.48},{"county":"那曲县","lon":92.07,"lat":31.48},{"county":"嘉黎县","lon":93.25,"lat":30.65},{"county":"比如县","lon":93.68,"lat":31.48},{"county":"聂荣县","lon":92.3,"lat":32.12},{"county":"安多县","lon":91.68,"lat":32.27},{"county":"申扎县","lon":88.7,"lat":30.93},{"county":"索县","lon":93.78,"lat":31.88},{"county":"班戈县","lon":90.02,"lat":31.37},{"county":"巴青县","lon":94.03,"lat":31.93},{"county":"尼玛县","lon":87.23,"lat":31.78},{"county":"阿里地区","lon":80.1,"lat":32.5},{"county":"普兰县","lon":81.17,"lat":30.3},{"county":"札达县","lon":79.8,"lat":31.48},{"county":"噶尔县","lon":80.1,"lat":32.5},{"county":"日土县","lon":79.72,"lat":33.38},{"county":"革吉县","lon":81.12,"lat":32.4},{"county":"改则县","lon":84.07,"lat":32.3},{"county":"措勤县","lon":85.17,"lat":31.02},{"county":"林芝地区","lon":94.37,"lat":29.68},{"county":"林芝县","lon":94.37,"lat":29.68},{"county":"工布江达县","lon":93.25,"lat":29.88},{"county":"米林县","lon":94.22,"lat":29.22},{"county":"墨脱县","lon":95.33,"lat":29.33},{"county":"波密县","lon":95.77,"lat":29.87},{"county":"察隅县","lon":97.47,"lat":28.67},{"county":"朗县","lon":93.07,"lat":29.05},{"county":"西安市","lon":108.93,"lat":34.27},{"county":"新城区","lon":108.95,"lat":34.27},{"county":"碑林区","lon":108.93,"lat":34.23},{"county":"莲湖区","lon":108.93,"lat":34.27},{"county":"灞桥区","lon":109.07,"lat":34.27},{"county":"未央区","lon":108.93,"lat":34.28},{"county":"雁塔区","lon":108.95,"lat":34.22},{"county":"阎良区","lon":109.23,"lat":34.65},{"county":"临潼区","lon":109.22,"lat":34.37},{"county":"长安区","lon":108.93,"lat":34.17},{"county":"蓝田县","lon":109.32,"lat":34.15},{"county":"周至县","lon":108.2,"lat":34.17},{"county":"户县","lon":108.6,"lat":34.1},{"county":"高陵县","lon":109.08,"lat":34.53},{"county":"铜川市","lon":108.93,"lat":34.9},{"county":"王益区","lon":109.07,"lat":35.07},{"county":"印台区","lon":109.1,"lat":35.1},{"county":"耀州区","lon":108.98,"lat":34.92},{"county":"宜君县","lon":109.12,"lat":35.4},{"county":"宝鸡市","lon":107.13,"lat":34.37},{"county":"渭滨区","lon":107.15,"lat":34.37},{"county":"金台区","lon":107.13,"lat":34.38},{"county":"陈仓区","lon":107.37,"lat":34.37},{"county":"凤翔县","lon":107.38,"lat":34.52},{"county":"岐山县","lon":107.62,"lat":34.45},{"county":"扶风县","lon":107.87,"lat":34.37},{"county":"眉县","lon":107.75,"lat":34.28},{"county":"陇县","lon":106.85,"lat":34.9},{"county":"千阳县","lon":107.13,"lat":34.65},{"county":"麟游县","lon":107.78,"lat":34.68},{"county":"凤县","lon":106.52,"lat":33.92},{"county":"太白县","lon":107.32,"lat":34.07},{"county":"咸阳市","lon":108.7,"lat":34.33},{"county":"秦都区","lon":108.72,"lat":34.35},{"county":"杨凌区","lon":108.07,"lat":34.28},{"county":"渭城区","lon":108.73,"lat":34.33},{"county":"三原县","lon":108.93,"lat":34.62},{"county":"泾阳县","lon":108.83,"lat":34.53},{"county":"乾县","lon":108.23,"lat":34.53},{"county":"礼泉县","lon":108.42,"lat":34.48},{"county":"永寿县","lon":108.13,"lat":34.7},{"county":"彬县","lon":108.08,"lat":35.03},{"county":"长武县","lon":107.78,"lat":35.2},{"county":"旬邑县","lon":108.33,"lat":35.12},{"county":"淳化县","lon":108.58,"lat":34.78},{"county":"武功县","lon":108.2,"lat":34.27},{"county":"兴平市","lon":108.48,"lat":34.3},{"county":"渭南市","lon":109.5,"lat":34.5},{"county":"临渭区","lon":109.48,"lat":34.5},{"county":"华县","lon":109.77,"lat":34.52},{"county":"潼关县","lon":110.23,"lat":34.55},{"county":"大荔县","lon":109.93,"lat":34.8},{"county":"合阳县","lon":110.15,"lat":35.23},{"county":"澄城县","lon":109.93,"lat":35.18},{"county":"蒲城县","lon":109.58,"lat":34.95},{"county":"白水县","lon":109.58,"lat":35.18},{"county":"富平县","lon":109.18,"lat":34.75},{"county":"韩城市","lon":110.43,"lat":35.48},{"county":"华阴市","lon":110.08,"lat":34.57},{"county":"延安市","lon":109.48,"lat":36.6},{"county":"宝塔区","lon":109.48,"lat":36.6},{"county":"延长县","lon":110,"lat":36.58},{"county":"延川县","lon":110.18,"lat":36.88},{"county":"子长县","lon":109.67,"lat":37.13},{"county":"安塞县","lon":109.32,"lat":36.87},{"county":"志丹县","lon":108.77,"lat":36.82},{"county":"甘泉县","lon":109.35,"lat":36.28},{"county":"富县","lon":109.37,"lat":35.98},{"county":"洛川县","lon":109.43,"lat":35.77},{"county":"宜川县","lon":110.17,"lat":36.05},{"county":"黄龙县","lon":109.83,"lat":35.58},{"county":"黄陵县","lon":109.25,"lat":35.58},{"county":"汉中市","lon":107.02,"lat":33.07},{"county":"汉台区","lon":107.03,"lat":33.07},{"county":"南郑县","lon":106.93,"lat":33},{"county":"城固县","lon":107.33,"lat":33.15},{"county":"洋县","lon":107.55,"lat":33.22},{"county":"西乡县","lon":107.77,"lat":32.98},{"county":"勉县","lon":106.67,"lat":33.15},{"county":"宁强县","lon":106.25,"lat":32.83},{"county":"略阳县","lon":106.15,"lat":33.33},{"county":"镇巴县","lon":107.9,"lat":32.53},{"county":"留坝县","lon":106.92,"lat":33.62},{"county":"佛坪县","lon":107.98,"lat":33.53},{"county":"榆林市","lon":109.73,"lat":38.28},{"county":"榆阳区","lon":109.75,"lat":38.28},{"county":"神木县","lon":110.5,"lat":38.83},{"county":"府谷县","lon":111.07,"lat":39.03},{"county":"横山县","lon":109.28,"lat":37.95},{"county":"靖边县","lon":108.8,"lat":37.6},{"county":"定边县","lon":107.6,"lat":37.58},{"county":"绥德县","lon":110.25,"lat":37.5},{"county":"米脂县","lon":110.18,"lat":37.75},{"county":"佳县","lon":110.48,"lat":38.02},{"county":"吴堡县","lon":110.73,"lat":37.45},{"county":"清涧县","lon":110.12,"lat":37.08},{"county":"子洲县","lon":110.03,"lat":37.62},{"county":"安康市","lon":109.02,"lat":32.68},{"county":"汉滨区","lon":109.02,"lat":32.68},{"county":"汉阴县","lon":108.5,"lat":32.9},{"county":"石泉县","lon":108.25,"lat":33.05},{"county":"宁陕县","lon":108.32,"lat":33.32},{"county":"紫阳县","lon":108.53,"lat":32.52},{"county":"岚皋县","lon":108.9,"lat":32.32},{"county":"平利县","lon":109.35,"lat":32.4},{"county":"镇坪县","lon":109.52,"lat":31.88},{"county":"旬阳县","lon":109.38,"lat":32.83},{"county":"白河县","lon":110.1,"lat":32.82},{"county":"商洛市","lon":109.93,"lat":33.87},{"county":"商州区","lon":109.93,"lat":33.87},{"county":"洛南县","lon":110.13,"lat":34.08},{"county":"丹凤县","lon":110.33,"lat":33.7},{"county":"商南县","lon":110.88,"lat":33.53},{"county":"山阳县","lon":109.88,"lat":33.53},{"county":"镇安县","lon":109.15,"lat":33.43},{"county":"柞水县","lon":109.1,"lat":33.68},{"county":"兰州市","lon":103.82,"lat":36.07},{"county":"城关区","lon":103.83,"lat":36.05},{"county":"西固区","lon":103.62,"lat":36.1},{"county":"红古区","lon":102.87,"lat":36.33},{"county":"永登县","lon":103.27,"lat":36.73},{"county":"皋兰县","lon":103.95,"lat":36.33},{"county":"榆中县","lon":104.12,"lat":35.85},{"county":"嘉峪关市","lon":98.27,"lat":39.8},{"county":"金昌市","lon":102.18,"lat":38.5},{"county":"金川区","lon":102.18,"lat":38.5},{"county":"永昌县","lon":101.97,"lat":38.25},{"county":"白银市","lon":104.18,"lat":36.55},{"county":"白银区","lon":104.18,"lat":36.55},{"county":"平川区","lon":104.83,"lat":36.73},{"county":"靖远县","lon":104.68,"lat":36.57},{"county":"会宁县","lon":105.05,"lat":35.7},{"county":"景泰县","lon":104.07,"lat":37.15},{"county":"天水市","lon":105.72,"lat":34.58},{"county":"清水县","lon":106.13,"lat":34.75},{"county":"秦安县","lon":105.67,"lat":34.87},{"county":"甘谷县","lon":105.33,"lat":34.73},{"county":"武山县","lon":104.88,"lat":34.72},{"county":"张家川回族自治县","lon":106.22,"lat":35},{"county":"武威市","lon":102.63,"lat":37.93},{"county":"凉州区","lon":102.63,"lat":37.93},{"county":"民勤县","lon":103.08,"lat":38.62},{"county":"古浪县","lon":102.88,"lat":37.47},{"county":"天祝藏族自治县","lon":103.13,"lat":36.98},{"county":"张掖市","lon":100.45,"lat":38.93},{"county":"甘州区","lon":100.45,"lat":38.93},{"county":"肃南裕固族自治县","lon":99.62,"lat":38.83},{"county":"民乐县","lon":100.82,"lat":38.43},{"county":"临泽县","lon":100.17,"lat":39.13},{"county":"高台县","lon":99.82,"lat":39.38},{"county":"山丹县","lon":101.08,"lat":38.78},{"county":"平凉市","lon":106.67,"lat":35.55},{"county":"崆峒区","lon":106.67,"lat":35.55},{"county":"泾川县","lon":107.37,"lat":35.33},{"county":"灵台县","lon":107.62,"lat":35.07},{"county":"崇信县","lon":107.03,"lat":35.3},{"county":"华亭县","lon":106.65,"lat":35.22},{"county":"庄浪县","lon":106.05,"lat":35.2},{"county":"静宁县","lon":105.72,"lat":35.52},{"county":"酒泉市","lon":98.52,"lat":39.75},{"county":"肃州区","lon":98.52,"lat":39.75},{"county":"金塔县","lon":98.9,"lat":39.98},{"county":"肃北蒙古族自治县","lon":94.88,"lat":39.52},{"county":"阿克塞哈萨克族自治县","lon":94.33,"lat":39.63},{"county":"玉门市","lon":97.05,"lat":40.28},{"county":"敦煌市","lon":94.67,"lat":40.13},{"county":"庆阳市","lon":107.63,"lat":35.73},{"county":"西峰区","lon":107.63,"lat":35.73},{"county":"庆城县","lon":107.88,"lat":36},{"county":"环县","lon":107.3,"lat":36.58},{"county":"华池县","lon":107.98,"lat":36.47},{"county":"合水县","lon":108.02,"lat":35.82},{"county":"正宁县","lon":108.37,"lat":35.5},{"county":"宁县","lon":107.92,"lat":35.5},{"county":"镇原县","lon":107.2,"lat":35.68},{"county":"定西市","lon":104.62,"lat":35.58},{"county":"安定区","lon":104.62,"lat":35.58},{"county":"通渭县","lon":105.25,"lat":35.2},{"county":"陇西县","lon":104.63,"lat":35},{"county":"渭源县","lon":104.22,"lat":35.13},{"county":"临洮县","lon":103.87,"lat":35.38},{"county":"漳县","lon":104.47,"lat":34.85},{"county":"岷县","lon":104.03,"lat":34.43},{"county":"陇南市","lon":104.92,"lat":33.4},{"county":"武都区","lon":104.92,"lat":33.4},{"county":"成县","lon":105.72,"lat":33.73},{"county":"文县","lon":104.68,"lat":32.95},{"county":"宕昌县","lon":104.38,"lat":34.05},{"county":"康县","lon":105.6,"lat":33.33},{"county":"西和县","lon":105.3,"lat":34.02},{"county":"礼县","lon":105.17,"lat":34.18},{"county":"徽县","lon":106.08,"lat":33.77},{"county":"两当县","lon":106.3,"lat":33.92},{"county":"临夏回族自治州","lon":103.22,"lat":35.6},{"county":"临夏市","lon":103.22,"lat":35.6},{"county":"临夏县","lon":103,"lat":35.5},{"county":"康乐县","lon":103.72,"lat":35.37},{"county":"永靖县","lon":103.32,"lat":35.93},{"county":"广河县","lon":103.58,"lat":35.48},{"county":"和政县","lon":103.35,"lat":35.43},{"county":"东乡族自治县","lon":103.4,"lat":35.67},{"county":"甘南藏族自治州","lon":102.92,"lat":34.98},{"county":"合作市","lon":102.92,"lat":34.98},{"county":"临潭县","lon":103.35,"lat":34.7},{"county":"卓尼县","lon":103.5,"lat":34.58},{"county":"舟曲县","lon":104.37,"lat":33.78},{"county":"迭部县","lon":103.22,"lat":34.05},{"county":"玛曲县","lon":102.07,"lat":34},{"county":"碌曲县","lon":102.48,"lat":34.58},{"county":"夏河县","lon":102.52,"lat":35.2},{"county":"西宁市","lon":101.78,"lat":36.62},{"county":"城东区","lon":101.8,"lat":36.62},{"county":"城中区","lon":101.78,"lat":36.62},{"county":"城西区","lon":101.77,"lat":36.62},{"county":"城北区","lon":101.77,"lat":36.67},{"county":"大通回族土族自治县","lon":101.68,"lat":36.93},{"county":"湟中县","lon":101.57,"lat":36.5},{"county":"湟源县","lon":101.27,"lat":36.68},{"county":"海东地区","lon":102.12,"lat":36.5},{"county":"平安县","lon":102.12,"lat":36.5},{"county":"民和回族土族自治县","lon":102.8,"lat":36.33},{"county":"乐都县","lon":102.4,"lat":36.48},{"county":"互助土族自治县","lon":101.95,"lat":36.83},{"county":"化隆回族自治县","lon":102.27,"lat":36.1},{"county":"循化撒拉族自治县","lon":102.48,"lat":35.85},{"county":"海北藏族自治州","lon":100.9,"lat":36.97},{"county":"门源回族自治县","lon":101.62,"lat":37.38},{"county":"祁连县","lon":100.25,"lat":38.18},{"county":"海晏县","lon":100.98,"lat":36.9},{"county":"刚察县","lon":100.13,"lat":37.33},{"county":"黄南藏族自治州","lon":102.02,"lat":35.52},{"county":"同仁县","lon":102.02,"lat":35.52},{"county":"尖扎县","lon":102.03,"lat":35.93},{"county":"泽库县","lon":101.47,"lat":35.03},{"county":"河南蒙古族自治县","lon":101.6,"lat":34.73},{"county":"海南藏族自治州","lon":100.62,"lat":36.28},{"county":"共和县","lon":100.62,"lat":36.28},{"county":"同德县","lon":100.57,"lat":35.25},{"county":"贵德县","lon":101.43,"lat":36.05},{"county":"兴海县","lon":99.98,"lat":35.58},{"county":"贵南县","lon":100.75,"lat":35.58},{"county":"果洛藏族自治州","lon":100.23,"lat":34.48},{"county":"玛沁县","lon":100.23,"lat":34.48},{"county":"班玛县","lon":100.73,"lat":32.93},{"county":"甘德县","lon":99.9,"lat":33.97},{"county":"达日县","lon":99.65,"lat":33.75},{"county":"久治县","lon":101.48,"lat":33.43},{"county":"玛多县","lon":98.18,"lat":34.92},{"county":"玉树藏族自治州","lon":97.02,"lat":33},{"county":"玉树县","lon":97.02,"lat":33},{"county":"杂多县","lon":95.3,"lat":32.9},{"county":"称多县","lon":97.1,"lat":33.37},{"county":"治多县","lon":95.62,"lat":33.85},{"county":"囊谦县","lon":96.48,"lat":32.2},{"county":"曲麻莱县","lon":95.8,"lat":34.13},{"county":"海西蒙古族藏族自治州","lon":97.37,"lat":37.37},{"county":"格尔木市","lon":94.9,"lat":36.42},{"county":"德令哈市","lon":97.37,"lat":37.37},{"county":"乌兰县","lon":98.48,"lat":36.93},{"county":"都兰县","lon":98.08,"lat":36.3},{"county":"天峻县","lon":99.02,"lat":37.3},{"county":"银川市","lon":106.28,"lat":38.47},{"county":"兴庆区","lon":106.28,"lat":38.48},{"county":"西夏区","lon":106.18,"lat":38.48},{"county":"金凤区","lon":106.25,"lat":38.47},{"county":"永宁县","lon":106.25,"lat":38.28},{"county":"贺兰县","lon":106.35,"lat":38.55},{"county":"灵武市","lon":106.33,"lat":38.1},{"county":"石嘴山市","lon":106.38,"lat":39.02},{"county":"大武口区","lon":106.38,"lat":39.02},{"county":"惠农区","lon":106.78,"lat":39.25},{"county":"平罗县","lon":106.53,"lat":38.9},{"county":"吴忠市","lon":106.2,"lat":37.98},{"county":"利通区","lon":106.2,"lat":37.98},{"county":"盐池县","lon":107.4,"lat":37.78},{"county":"同心县","lon":105.92,"lat":36.98},{"county":"青铜峡市","lon":106.07,"lat":38.02},{"county":"固原市","lon":106.28,"lat":36},{"county":"原州区","lon":106.28,"lat":36},{"county":"西吉县","lon":105.73,"lat":35.97},{"county":"隆德县","lon":106.12,"lat":35.62},{"county":"泾源县","lon":106.33,"lat":35.48},{"county":"彭阳县","lon":106.63,"lat":35.85},{"county":"中卫市","lon":105.18,"lat":37.52},{"county":"沙坡头区","lon":105.18,"lat":37.52},{"county":"中宁县","lon":105.67,"lat":37.48},{"county":"海原县","lon":105.65,"lat":36.57},{"county":"乌鲁木齐市","lon":87.62,"lat":43.82},{"county":"天山区","lon":87.65,"lat":43.78},{"county":"沙依巴克区","lon":87.6,"lat":43.78},{"county":"新市区","lon":87.6,"lat":43.85},{"county":"水磨沟区","lon":87.63,"lat":43.83},{"county":"头屯河区","lon":87.42,"lat":43.87},{"county":"达坂城区","lon":88.3,"lat":43.35},{"county":"东山区","lon":87.68,"lat":43.95},{"county":"乌鲁木齐县","lon":87.6,"lat":43.8},{"county":"克拉玛依市","lon":84.87,"lat":45.6},{"county":"独山子区","lon":84.85,"lat":44.32},{"county":"克拉玛依区","lon":84.87,"lat":45.6},{"county":"白碱滩区","lon":85.13,"lat":45.7},{"county":"乌尔禾区","lon":85.68,"lat":46.08},{"county":"吐鲁番地区","lon":89.17,"lat":42.95},{"county":"吐鲁番市","lon":89.17,"lat":42.95},{"county":"鄯善县","lon":90.22,"lat":42.87},{"county":"托克逊县","lon":88.65,"lat":42.78},{"county":"哈密地区","lon":93.52,"lat":42.83},{"county":"哈密市","lon":93.52,"lat":42.83},{"county":"伊吾县","lon":94.7,"lat":43.25},{"county":"昌吉回族自治州","lon":87.3,"lat":44.02},{"county":"昌吉市","lon":87.3,"lat":44.02},{"county":"阜康市","lon":87.98,"lat":44.15},{"county":"米泉市","lon":87.65,"lat":43.97},{"county":"呼图壁县","lon":86.9,"lat":44.18},{"county":"玛纳斯县","lon":86.22,"lat":44.3},{"county":"奇台县","lon":89.58,"lat":44.02},{"county":"吉木萨尔县","lon":89.18,"lat":44},{"county":"木垒哈萨克自治县","lon":90.28,"lat":43.83},{"county":"博尔塔拉蒙古自治州","lon":82.07,"lat":44.9},{"county":"博乐市","lon":82.07,"lat":44.9},{"county":"精河县","lon":82.88,"lat":44.6},{"county":"温泉县","lon":81.03,"lat":44.97},{"county":"巴音郭楞蒙古自治州","lon":86.15,"lat":41.77},{"county":"库尔勒市","lon":86.15,"lat":41.77},{"county":"轮台县","lon":84.27,"lat":41.78},{"county":"尉犁县","lon":86.25,"lat":41.33},{"county":"若羌县","lon":88.17,"lat":39.02},{"county":"且末县","lon":85.53,"lat":38.13},{"county":"焉耆回族自治县","lon":86.57,"lat":42.07},{"county":"和静县","lon":86.4,"lat":42.32},{"county":"和硕县","lon":86.87,"lat":42.27},{"county":"博湖县","lon":86.63,"lat":41.98},{"county":"阿克苏地区","lon":80.27,"lat":41.17},{"county":"阿克苏市","lon":80.27,"lat":41.17},{"county":"温宿县","lon":80.23,"lat":41.28},{"county":"库车县","lon":82.97,"lat":41.72},{"county":"沙雅县","lon":82.78,"lat":41.22},{"county":"新和县","lon":82.6,"lat":41.55},{"county":"拜城县","lon":81.87,"lat":41.8},{"county":"乌什县","lon":79.23,"lat":41.22},{"county":"阿瓦提县","lon":80.38,"lat":40.63},{"county":"柯坪县","lon":79.05,"lat":40.5},{"county":"阿图什市","lon":76.17,"lat":39.72},{"county":"阿克陶县","lon":75.95,"lat":39.15},{"county":"阿合奇县","lon":78.45,"lat":40.93},{"county":"乌恰县","lon":75.25,"lat":39.72},{"county":"喀什地区","lon":75.98,"lat":39.47},{"county":"喀什市","lon":75.98,"lat":39.47},{"county":"疏附县","lon":75.85,"lat":39.38},{"county":"疏勒县","lon":76.05,"lat":39.4},{"county":"英吉沙县","lon":76.17,"lat":38.93},{"county":"泽普县","lon":77.27,"lat":38.18},{"county":"莎车县","lon":77.23,"lat":38.42},{"county":"叶城县","lon":77.42,"lat":37.88},{"county":"麦盖提县","lon":77.65,"lat":38.9},{"county":"岳普湖县","lon":76.77,"lat":39.23},{"county":"伽师县","lon":76.73,"lat":39.5},{"county":"巴楚县","lon":78.55,"lat":39.78},{"county":"和田地区","lon":79.92,"lat":37.12},{"county":"和田市","lon":79.92,"lat":37.12},{"county":"和田县","lon":79.93,"lat":37.1},{"county":"墨玉县","lon":79.73,"lat":37.27},{"county":"皮山县","lon":78.28,"lat":37.62},{"county":"洛浦县","lon":80.18,"lat":37.07},{"county":"策勒县","lon":80.8,"lat":37},{"county":"于田县","lon":81.67,"lat":36.85},{"county":"民丰县","lon":82.68,"lat":37.07},{"county":"伊犁哈萨克自治州","lon":81.32,"lat":43.92},{"county":"伊宁市","lon":81.32,"lat":43.92},{"county":"奎屯市","lon":84.9,"lat":44.42},{"county":"伊宁县","lon":81.52,"lat":43.98},{"county":"察布查尔锡伯自治县","lon":81.15,"lat":43.83},{"county":"霍城县","lon":80.88,"lat":44.05},{"county":"巩留县","lon":82.23,"lat":43.48},{"county":"新源县","lon":83.25,"lat":43.43},{"county":"昭苏县","lon":81.13,"lat":43.15},{"county":"特克斯县","lon":81.83,"lat":43.22},{"county":"尼勒克县","lon":82.5,"lat":43.78},{"county":"塔城地区","lon":82.98,"lat":46.75},{"county":"塔城市","lon":82.98,"lat":46.75},{"county":"乌苏市","lon":84.68,"lat":44.43},{"county":"额敏县","lon":83.63,"lat":46.53},{"county":"沙湾县","lon":85.62,"lat":44.33},{"county":"托里县","lon":83.6,"lat":45.93},{"county":"裕民县","lon":82.98,"lat":46.2},{"county":"和布克赛尔蒙古自治县","lon":85.72,"lat":46.8},{"county":"阿勒泰地区","lon":88.13,"lat":47.85},{"county":"阿勒泰市","lon":88.13,"lat":47.85},{"county":"布尔津县","lon":86.85,"lat":47.7},{"county":"富蕴县","lon":89.52,"lat":47},{"county":"福海县","lon":87.5,"lat":47.12},{"county":"哈巴河县","lon":86.42,"lat":48.07},{"county":"青河县","lon":90.38,"lat":46.67},{"county":"吉木乃县","lon":85.88,"lat":47.43},{"county":"石河子市","lon":86.03,"lat":44.3},{"county":"阿拉尔市","lon":81.28,"lat":40.55},{"county":"图木舒克市","lon":79.13,"lat":39.85},{"county":"五家渠市","lon":87.53,"lat":44.17},{"county":"香港","lon":114.08,"lat":22.2},{"county":"澳门","lon":113.33,"lat":22.13},{"county":"台北市","lon":121.5,"lat":25.03},{"county":"高雄市","lon":120.28,"lat":22.62},{"county":"基隆市","lon":121.73,"lat":25.13},{"county":"台中市","lon":120.67,"lat":24.15},{"county":"台南市","lon":120.2,"lat":23},{"county":"新竹市","lon":120.95,"lat":24.82},{"county":"嘉义市","lon":120.43,"lat":23.48},{"county":"台北县","lon":121.47,"lat":25.02},{"county":"宜兰县","lon":121.75,"lat":24.77},{"county":"桃园县","lon":121.3,"lat":24.97},{"county":"苗栗县","lon":120.8,"lat":24.53},{"county":"台中县","lon":120.72,"lat":24.25},{"county":"彰化县","lon":120.53,"lat":24.08},{"county":"南投县","lon":120.67,"lat":23.92},{"county":"云林县","lon":120.53,"lat":23.72},{"county":"台南县","lon":120.32,"lat":23.32},{"county":"高雄县","lon":120.37,"lat":22.63},{"county":"屏东县","lon":120.48,"lat":22.67},{"county":"台东县","lon":121.15,"lat":22.75},{"county":"花莲县","lon":121.6,"lat":23.98},{"county":"澎湖县","lon":119.58,"lat":23.58}]

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * GB2260 parser
 */

var REVISIONS = __webpack_require__(111);
var DATABASE = {};

function GB2260(revision, data) {
  revision = revision || REVISIONS[0];
  this.revision = revision;
  if (!data) {
    data = DATABASE[revision.toString()];
  }
  this._data = data;
}

GB2260.prototype.get = function(code) {
  code = code.toString();
  if (code.length !== 6) {
    throw new Error('Invalid code');
  }

  var name = this._data[code];
  if (!name) {
    return null;
  }

  var revision = this.revision;
  var division = new Division(code, name, revision);

  if (/0{4}$/.test(code)) {
    return division;
  }

  var provinceCode = code.substr(0, 2) + '0000';
  name = this._data[provinceCode];
  division.province = new Division(provinceCode, name, revision);

  if (/0{2}$/.test(code)) {
    return division;
  }

  var prefectureCode = code.substr(0, 4) + '00';
  name = this._data[prefectureCode];
  division.prefecture = new Division(prefectureCode, name, revision);
  return division;
};

GB2260.prototype.codes = function() {
  if (!this._codes) {
    this._codes = Object.keys(this._data).sort();
  }
  return this._codes;
};

GB2260.prototype.provinces = function() {
  var me = this;
  var rv = [], name;
  this.codes().forEach(function(k) {
    if (/0{4}$/.test(k)) {
      name = me._data[k];
      rv.push(new Division(k, name, me.revision));
    }
  });
  return rv;
};

GB2260.prototype.prefectures = function(code) {
  code = code.toString();
  if (!/0{4}$/.test(code)) {
    throw new Error('Invalid province code');
  }

  var name = this._data[code];
  if (!name) {
    throw new Error('Invalid province code');
  }

  var me = this;
  var province = new Division(code, name, me.revision);
  var pattern = new RegExp('^' + code.substr(0, 2) + '\\d{2}00$');
  var rv = [], division;

  this.codes().forEach(function(k) {
    if (pattern.test(k) && k !== code) {
      name = me._data[k];
      division = new Division(k, name, me.revision);
      division.province = province;
      rv.push(division);
    }
  });

  return rv;
};

GB2260.prototype.counties = function(code) {
  code = code.toString();
  if (!/[1-9]0{2,3}$/.test(code)) {
    throw new Error('Invalid prefecture code');
  }

  var name = this._data[code];
  if (!name) {
    throw new Error('Invalid prefecture code');
  }
  var me = this;
  var prefecture = new Division(code, name, me.revision);

  var provinceCode = code.substr(0, 2) + '0000';
  name = me._data[provinceCode]
  var province = new Division(provinceCode, name, me.revision);

  var pattern = new RegExp('^' + code.substr(0, 4));
  var rv = [], division;

  this.codes().forEach(function(k) {
    if (pattern.test(k) && k !== code) {
      name = me._data[k];
      division = new Division(k, name, me.revision);
      division.province = province;
      division.prefecture = prefecture;
      rv.push(division);
    }
  });

  return rv;
};


function Division(code, name, revision) {
  this.code = code;
  this.name = name;
  this.revision = revision;
}

Division.prototype.toString = function() {
  var rv = [];
  if (this.province) {
    rv.push(this.province.name);
  }
  if (this.prefecture) {
    rv.push(this.prefecture.name);
  }
  rv.push(this.name);
  return rv.join(' ');
};

Division.prototype.valueOf = function() {
  return this.toString();
};

Division.prototype.inspect = function() {
  var prefix = 'GB/T 2260';
  if (this.revision) {
    prefix += '-' + this.revision;
  }
  return '<' + prefix + '> ' + this.code + ' ' + this.toString();
};

Division.prototype.toJSON = function() {
  return {
    name: this.name,
    code: this.code,
    revision: this.revision
  };
};

exports.revisions = function() {
  return REVISIONS;
};

exports.register = function(revision, data) {
  DATABASE[revision] = data;
};

exports.Division = Division;
exports.GB2260 = GB2260;


/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = ["201607","201509","201410","201308","201210","201110","201010","200912","200812","200712","200612","200512","200506","200412","200409","200403","200312","200306","200212"]

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = {"110000":"北京市","110100":"市辖区","110101":"东城区","110102":"西城区","110105":"朝阳区","110106":"丰台区","110107":"石景山区","110108":"海淀区","110109":"门头沟区","110111":"房山区","110112":"通州区","110113":"顺义区","110114":"昌平区","110115":"大兴区","110116":"怀柔区","110117":"平谷区","110118":"密云区","110119":"延庆区","120000":"天津市","120100":"市辖区","120101":"和平区","120102":"河东区","120103":"河西区","120104":"南开区","120105":"河北区","120106":"红桥区","120110":"东丽区","120111":"西青区","120112":"津南区","120113":"北辰区","120114":"武清区","120115":"宝坻区","120116":"滨海新区","120117":"宁河区","120118":"静海区","120119":"蓟州区","130000":"河北省","130100":"石家庄市","130101":"市辖区","130102":"长安区","130104":"桥西区","130105":"新华区","130107":"井陉矿区","130108":"裕华区","130109":"藁城区","130110":"鹿泉区","130111":"栾城区","130121":"井陉县","130123":"正定县","130125":"行唐县","130126":"灵寿县","130127":"高邑县","130128":"深泽县","130129":"赞皇县","130130":"无极县","130131":"平山县","130132":"元氏县","130133":"赵县","130183":"晋州市","130184":"新乐市","130200":"唐山市","130201":"市辖区","130202":"路南区","130203":"路北区","130204":"古冶区","130205":"开平区","130207":"丰南区","130208":"丰润区","130209":"曹妃甸区","130223":"滦县","130224":"滦南县","130225":"乐亭县","130227":"迁西县","130229":"玉田县","130281":"遵化市","130283":"迁安市","130300":"秦皇岛市","130301":"市辖区","130302":"海港区","130303":"山海关区","130304":"北戴河区","130306":"抚宁区","130321":"青龙满族自治县","130322":"昌黎县","130324":"卢龙县","130400":"邯郸市","130401":"市辖区","130402":"邯山区","130403":"丛台区","130404":"复兴区","130406":"峰峰矿区","130421":"邯郸县","130423":"临漳县","130424":"成安县","130425":"大名县","130426":"涉县","130427":"磁县","130428":"肥乡县","130429":"永年县","130430":"邱县","130431":"鸡泽县","130432":"广平县","130433":"馆陶县","130434":"魏县","130435":"曲周县","130481":"武安市","130500":"邢台市","130501":"市辖区","130502":"桥东区","130503":"桥西区","130521":"邢台县","130522":"临城县","130523":"内丘县","130524":"柏乡县","130525":"隆尧县","130526":"任县","130527":"南和县","130528":"宁晋县","130529":"巨鹿县","130530":"新河县","130531":"广宗县","130532":"平乡县","130533":"威县","130534":"清河县","130535":"临西县","130581":"南宫市","130582":"沙河市","130600":"保定市","130601":"市辖区","130602":"竞秀区","130606":"莲池区","130607":"满城区","130608":"清苑区","130609":"徐水区","130623":"涞水县","130624":"阜平县","130626":"定兴县","130627":"唐县","130628":"高阳县","130629":"容城县","130630":"涞源县","130631":"望都县","130632":"安新县","130633":"易县","130634":"曲阳县","130635":"蠡县","130636":"顺平县","130637":"博野县","130638":"雄县","130681":"涿州市","130683":"安国市","130684":"高碑店市","130700":"张家口市","130701":"市辖区","130702":"桥东区","130703":"桥西区","130705":"宣化区","130706":"下花园区","130708":"万全区","130709":"崇礼区","130722":"张北县","130723":"康保县","130724":"沽源县","130725":"尚义县","130726":"蔚县","130727":"阳原县","130728":"怀安县","130730":"怀来县","130731":"涿鹿县","130732":"赤城县","130800":"承德市","130801":"市辖区","130802":"双桥区","130803":"双滦区","130804":"鹰手营子矿区","130821":"承德县","130822":"兴隆县","130823":"平泉县","130824":"滦平县","130825":"隆化县","130826":"丰宁满族自治县","130827":"宽城满族自治县","130828":"围场满族蒙古族自治县","130900":"沧州市","130901":"市辖区","130902":"新华区","130903":"运河区","130921":"沧县","130922":"青县","130923":"东光县","130924":"海兴县","130925":"盐山县","130926":"肃宁县","130927":"南皮县","130928":"吴桥县","130929":"献县","130930":"孟村回族自治县","130981":"泊头市","130982":"任丘市","130983":"黄骅市","130984":"河间市","131000":"廊坊市","131001":"市辖区","131002":"安次区","131003":"广阳区","131022":"固安县","131023":"永清县","131024":"香河县","131025":"大城县","131026":"文安县","131028":"大厂回族自治县","131081":"霸州市","131082":"三河市","131100":"衡水市","131101":"市辖区","131102":"桃城区","131103":"冀州区","131121":"枣强县","131122":"武邑县","131123":"武强县","131124":"饶阳县","131125":"安平县","131126":"故城县","131127":"景县","131128":"阜城县","131182":"深州市","139000":"省直辖县级行政区划","139001":"定州市","139002":"辛集市","140000":"山西省","140100":"太原市","140101":"市辖区","140105":"小店区","140106":"迎泽区","140107":"杏花岭区","140108":"尖草坪区","140109":"万柏林区","140110":"晋源区","140121":"清徐县","140122":"阳曲县","140123":"娄烦县","140181":"古交市","140200":"大同市","140201":"市辖区","140202":"城区","140203":"矿区","140211":"南郊区","140212":"新荣区","140221":"阳高县","140222":"天镇县","140223":"广灵县","140224":"灵丘县","140225":"浑源县","140226":"左云县","140227":"大同县","140300":"阳泉市","140301":"市辖区","140302":"城区","140303":"矿区","140311":"郊区","140321":"平定县","140322":"盂县","140400":"长治市","140401":"市辖区","140402":"城区","140411":"郊区","140421":"长治县","140423":"襄垣县","140424":"屯留县","140425":"平顺县","140426":"黎城县","140427":"壶关县","140428":"长子县","140429":"武乡县","140430":"沁县","140431":"沁源县","140481":"潞城市","140500":"晋城市","140501":"市辖区","140502":"城区","140521":"沁水县","140522":"阳城县","140524":"陵川县","140525":"泽州县","140581":"高平市","140600":"朔州市","140601":"市辖区","140602":"朔城区","140603":"平鲁区","140621":"山阴县","140622":"应县","140623":"右玉县","140624":"怀仁县","140700":"晋中市","140701":"市辖区","140702":"榆次区","140721":"榆社县","140722":"左权县","140723":"和顺县","140724":"昔阳县","140725":"寿阳县","140726":"太谷县","140727":"祁县","140728":"平遥县","140729":"灵石县","140781":"介休市","140800":"运城市","140801":"市辖区","140802":"盐湖区","140821":"临猗县","140822":"万荣县","140823":"闻喜县","140824":"稷山县","140825":"新绛县","140826":"绛县","140827":"垣曲县","140828":"夏县","140829":"平陆县","140830":"芮城县","140881":"永济市","140882":"河津市","140900":"忻州市","140901":"市辖区","140902":"忻府区","140921":"定襄县","140922":"五台县","140923":"代县","140924":"繁峙县","140925":"宁武县","140926":"静乐县","140927":"神池县","140928":"五寨县","140929":"岢岚县","140930":"河曲县","140931":"保德县","140932":"偏关县","140981":"原平市","141000":"临汾市","141001":"市辖区","141002":"尧都区","141021":"曲沃县","141022":"翼城县","141023":"襄汾县","141024":"洪洞县","141025":"古县","141026":"安泽县","141027":"浮山县","141028":"吉县","141029":"乡宁县","141030":"大宁县","141031":"隰县","141032":"永和县","141033":"蒲县","141034":"汾西县","141081":"侯马市","141082":"霍州市","141100":"吕梁市","141101":"市辖区","141102":"离石区","141121":"文水县","141122":"交城县","141123":"兴县","141124":"临县","141125":"柳林县","141126":"石楼县","141127":"岚县","141128":"方山县","141129":"中阳县","141130":"交口县","141181":"孝义市","141182":"汾阳市","150000":"内蒙古自治区","150100":"呼和浩特市","150101":"市辖区","150102":"新城区","150103":"回民区","150104":"玉泉区","150105":"赛罕区","150121":"土默特左旗","150122":"托克托县","150123":"和林格尔县","150124":"清水河县","150125":"武川县","150200":"包头市","150201":"市辖区","150202":"东河区","150203":"昆都仑区","150204":"青山区","150205":"石拐区","150206":"白云鄂博矿区","150207":"九原区","150221":"土默特右旗","150222":"固阳县","150223":"达尔罕茂明安联合旗","150300":"乌海市","150301":"市辖区","150302":"海勃湾区","150303":"海南区","150304":"乌达区","150400":"赤峰市","150401":"市辖区","150402":"红山区","150403":"元宝山区","150404":"松山区","150421":"阿鲁科尔沁旗","150422":"巴林左旗","150423":"巴林右旗","150424":"林西县","150425":"克什克腾旗","150426":"翁牛特旗","150428":"喀喇沁旗","150429":"宁城县","150430":"敖汉旗","150500":"通辽市","150501":"市辖区","150502":"科尔沁区","150521":"科尔沁左翼中旗","150522":"科尔沁左翼后旗","150523":"开鲁县","150524":"库伦旗","150525":"奈曼旗","150526":"扎鲁特旗","150581":"霍林郭勒市","150600":"鄂尔多斯市","150601":"市辖区","150602":"东胜区","150603":"康巴什区","150621":"达拉特旗","150622":"准格尔旗","150623":"鄂托克前旗","150624":"鄂托克旗","150625":"杭锦旗","150626":"乌审旗","150627":"伊金霍洛旗","150700":"呼伦贝尔市","150701":"市辖区","150702":"海拉尔区","150703":"扎赉诺尔区","150721":"阿荣旗","150722":"莫力达瓦达斡尔族自治旗","150723":"鄂伦春自治旗","150724":"鄂温克族自治旗","150725":"陈巴尔虎旗","150726":"新巴尔虎左旗","150727":"新巴尔虎右旗","150781":"满洲里市","150782":"牙克石市","150783":"扎兰屯市","150784":"额尔古纳市","150785":"根河市","150800":"巴彦淖尔市","150801":"市辖区","150802":"临河区","150821":"五原县","150822":"磴口县","150823":"乌拉特前旗","150824":"乌拉特中旗","150825":"乌拉特后旗","150826":"杭锦后旗","150900":"乌兰察布市","150901":"市辖区","150902":"集宁区","150921":"卓资县","150922":"化德县","150923":"商都县","150924":"兴和县","150925":"凉城县","150926":"察哈尔右翼前旗","150927":"察哈尔右翼中旗","150928":"察哈尔右翼后旗","150929":"四子王旗","150981":"丰镇市","152200":"兴安盟","152201":"乌兰浩特市","152202":"阿尔山市","152221":"科尔沁右翼前旗","152222":"科尔沁右翼中旗","152223":"扎赉特旗","152224":"突泉县","152500":"锡林郭勒盟","152501":"二连浩特市","152502":"锡林浩特市","152522":"阿巴嘎旗","152523":"苏尼特左旗","152524":"苏尼特右旗","152525":"东乌珠穆沁旗","152526":"西乌珠穆沁旗","152527":"太仆寺旗","152528":"镶黄旗","152529":"正镶白旗","152530":"正蓝旗","152531":"多伦县","152900":"阿拉善盟","152921":"阿拉善左旗","152922":"阿拉善右旗","152923":"额济纳旗","210000":"辽宁省","210100":"沈阳市","210101":"市辖区","210102":"和平区","210103":"沈河区","210104":"大东区","210105":"皇姑区","210106":"铁西区","210111":"苏家屯区","210112":"浑南区","210113":"沈北新区","210114":"于洪区","210115":"辽中区","210123":"康平县","210124":"法库县","210181":"新民市","210200":"大连市","210201":"市辖区","210202":"中山区","210203":"西岗区","210204":"沙河口区","210211":"甘井子区","210212":"旅顺口区","210213":"金州区","210214":"普兰店区","210224":"长海县","210281":"瓦房店市","210283":"庄河市","210300":"鞍山市","210301":"市辖区","210302":"铁东区","210303":"铁西区","210304":"立山区","210311":"千山区","210321":"台安县","210323":"岫岩满族自治县","210381":"海城市","210400":"抚顺市","210401":"市辖区","210402":"新抚区","210403":"东洲区","210404":"望花区","210411":"顺城区","210421":"抚顺县","210422":"新宾满族自治县","210423":"清原满族自治县","210500":"本溪市","210501":"市辖区","210502":"平山区","210503":"溪湖区","210504":"明山区","210505":"南芬区","210521":"本溪满族自治县","210522":"桓仁满族自治县","210600":"丹东市","210601":"市辖区","210602":"元宝区","210603":"振兴区","210604":"振安区","210624":"宽甸满族自治县","210681":"东港市","210682":"凤城市","210700":"锦州市","210701":"市辖区","210702":"古塔区","210703":"凌河区","210711":"太和区","210726":"黑山县","210727":"义县","210781":"凌海市","210782":"北镇市","210800":"营口市","210801":"市辖区","210802":"站前区","210803":"西市区","210804":"鲅鱼圈区","210811":"老边区","210881":"盖州市","210882":"大石桥市","210900":"阜新市","210901":"市辖区","210902":"海州区","210903":"新邱区","210904":"太平区","210905":"清河门区","210911":"细河区","210921":"阜新蒙古族自治县","210922":"彰武县","211000":"辽阳市","211001":"市辖区","211002":"白塔区","211003":"文圣区","211004":"宏伟区","211005":"弓长岭区","211011":"太子河区","211021":"辽阳县","211081":"灯塔市","211100":"盘锦市","211101":"市辖区","211102":"双台子区","211103":"兴隆台区","211104":"大洼区","211122":"盘山县","211200":"铁岭市","211201":"市辖区","211202":"银州区","211204":"清河区","211221":"铁岭县","211223":"西丰县","211224":"昌图县","211281":"调兵山市","211282":"开原市","211300":"朝阳市","211301":"市辖区","211302":"双塔区","211303":"龙城区","211321":"朝阳县","211322":"建平县","211324":"喀喇沁左翼蒙古族自治县","211381":"北票市","211382":"凌源市","211400":"葫芦岛市","211401":"市辖区","211402":"连山区","211403":"龙港区","211404":"南票区","211421":"绥中县","211422":"建昌县","211481":"兴城市","220000":"吉林省","220100":"长春市","220101":"市辖区","220102":"南关区","220103":"宽城区","220104":"朝阳区","220105":"二道区","220106":"绿园区","220112":"双阳区","220113":"九台区","220122":"农安县","220182":"榆树市","220183":"德惠市","220200":"吉林市","220201":"市辖区","220202":"昌邑区","220203":"龙潭区","220204":"船营区","220211":"丰满区","220221":"永吉县","220281":"蛟河市","220282":"桦甸市","220283":"舒兰市","220284":"磐石市","220300":"四平市","220301":"市辖区","220302":"铁西区","220303":"铁东区","220322":"梨树县","220323":"伊通满族自治县","220381":"公主岭市","220382":"双辽市","220400":"辽源市","220401":"市辖区","220402":"龙山区","220403":"西安区","220421":"东丰县","220422":"东辽县","220500":"通化市","220501":"市辖区","220502":"东昌区","220503":"二道江区","220521":"通化县","220523":"辉南县","220524":"柳河县","220581":"梅河口市","220582":"集安市","220600":"白山市","220601":"市辖区","220602":"浑江区","220605":"江源区","220621":"抚松县","220622":"靖宇县","220623":"长白朝鲜族自治县","220681":"临江市","220700":"松原市","220701":"市辖区","220702":"宁江区","220721":"前郭尔罗斯蒙古族自治县","220722":"长岭县","220723":"乾安县","220781":"扶余市","220800":"白城市","220801":"市辖区","220802":"洮北区","220821":"镇赉县","220822":"通榆县","220881":"洮南市","220882":"大安市","222400":"延边朝鲜族自治州","222401":"延吉市","222402":"图们市","222403":"敦化市","222404":"珲春市","222405":"龙井市","222406":"和龙市","222424":"汪清县","222426":"安图县","230000":"黑龙江省","230100":"哈尔滨市","230101":"市辖区","230102":"道里区","230103":"南岗区","230104":"道外区","230108":"平房区","230109":"松北区","230110":"香坊区","230111":"呼兰区","230112":"阿城区","230113":"双城区","230123":"依兰县","230124":"方正县","230125":"宾县","230126":"巴彦县","230127":"木兰县","230128":"通河县","230129":"延寿县","230183":"尚志市","230184":"五常市","230200":"齐齐哈尔市","230201":"市辖区","230202":"龙沙区","230203":"建华区","230204":"铁锋区","230205":"昂昂溪区","230206":"富拉尔基区","230207":"碾子山区","230208":"梅里斯达斡尔族区","230221":"龙江县","230223":"依安县","230224":"泰来县","230225":"甘南县","230227":"富裕县","230229":"克山县","230230":"克东县","230231":"拜泉县","230281":"讷河市","230300":"鸡西市","230301":"市辖区","230302":"鸡冠区","230303":"恒山区","230304":"滴道区","230305":"梨树区","230306":"城子河区","230307":"麻山区","230321":"鸡东县","230381":"虎林市","230382":"密山市","230400":"鹤岗市","230401":"市辖区","230402":"向阳区","230403":"工农区","230404":"南山区","230405":"兴安区","230406":"东山区","230407":"兴山区","230421":"萝北县","230422":"绥滨县","230500":"双鸭山市","230501":"市辖区","230502":"尖山区","230503":"岭东区","230505":"四方台区","230506":"宝山区","230521":"集贤县","230522":"友谊县","230523":"宝清县","230524":"饶河县","230600":"大庆市","230601":"市辖区","230602":"萨尔图区","230603":"龙凤区","230604":"让胡路区","230605":"红岗区","230606":"大同区","230621":"肇州县","230622":"肇源县","230623":"林甸县","230624":"杜尔伯特蒙古族自治县","230700":"伊春市","230701":"市辖区","230702":"伊春区","230703":"南岔区","230704":"友好区","230705":"西林区","230706":"翠峦区","230707":"新青区","230708":"美溪区","230709":"金山屯区","230710":"五营区","230711":"乌马河区","230712":"汤旺河区","230713":"带岭区","230714":"乌伊岭区","230715":"红星区","230716":"上甘岭区","230722":"嘉荫县","230781":"铁力市","230800":"佳木斯市","230801":"市辖区","230803":"向阳区","230804":"前进区","230805":"东风区","230811":"郊区","230822":"桦南县","230826":"桦川县","230828":"汤原县","230881":"同江市","230882":"富锦市","230883":"抚远市","230900":"七台河市","230901":"市辖区","230902":"新兴区","230903":"桃山区","230904":"茄子河区","230921":"勃利县","231000":"牡丹江市","231001":"市辖区","231002":"东安区","231003":"阳明区","231004":"爱民区","231005":"西安区","231025":"林口县","231081":"绥芬河市","231083":"海林市","231084":"宁安市","231085":"穆棱市","231086":"东宁市","231100":"黑河市","231101":"市辖区","231102":"爱辉区","231121":"嫩江县","231123":"逊克县","231124":"孙吴县","231181":"北安市","231182":"五大连池市","231200":"绥化市","231201":"市辖区","231202":"北林区","231221":"望奎县","231222":"兰西县","231223":"青冈县","231224":"庆安县","231225":"明水县","231226":"绥棱县","231281":"安达市","231282":"肇东市","231283":"海伦市","232700":"大兴安岭地区","232721":"呼玛县","232722":"塔河县","232723":"漠河县","310000":"上海市","310100":"市辖区","310101":"黄浦区","310104":"徐汇区","310105":"长宁区","310106":"静安区","310107":"普陀区","310109":"虹口区","310110":"杨浦区","310112":"闵行区","310113":"宝山区","310114":"嘉定区","310115":"浦东新区","310116":"金山区","310117":"松江区","310118":"青浦区","310120":"奉贤区","310151":"崇明区","320000":"江苏省","320100":"南京市","320101":"市辖区","320102":"玄武区","320104":"秦淮区","320105":"建邺区","320106":"鼓楼区","320111":"浦口区","320113":"栖霞区","320114":"雨花台区","320115":"江宁区","320116":"六合区","320117":"溧水区","320118":"高淳区","320200":"无锡市","320201":"市辖区","320205":"锡山区","320206":"惠山区","320211":"滨湖区","320213":"梁溪区","320214":"新吴区","320281":"江阴市","320282":"宜兴市","320300":"徐州市","320301":"市辖区","320302":"鼓楼区","320303":"云龙区","320305":"贾汪区","320311":"泉山区","320312":"铜山区","320321":"丰县","320322":"沛县","320324":"睢宁县","320381":"新沂市","320382":"邳州市","320400":"常州市","320401":"市辖区","320402":"天宁区","320404":"钟楼区","320411":"新北区","320412":"武进区","320413":"金坛区","320481":"溧阳市","320500":"苏州市","320501":"市辖区","320505":"虎丘区","320506":"吴中区","320507":"相城区","320508":"姑苏区","320509":"吴江区","320581":"常熟市","320582":"张家港市","320583":"昆山市","320585":"太仓市","320600":"南通市","320601":"市辖区","320602":"崇川区","320611":"港闸区","320612":"通州区","320621":"海安县","320623":"如东县","320681":"启东市","320682":"如皋市","320684":"海门市","320700":"连云港市","320701":"市辖区","320703":"连云区","320706":"海州区","320707":"赣榆区","320722":"东海县","320723":"灌云县","320724":"灌南县","320800":"淮安市","320801":"市辖区","320803":"淮安区","320804":"淮阴区","320812":"清江浦区","320813":"洪泽区","320826":"涟水县","320830":"盱眙县","320831":"金湖县","320900":"盐城市","320901":"市辖区","320902":"亭湖区","320903":"盐都区","320904":"大丰区","320921":"响水县","320922":"滨海县","320923":"阜宁县","320924":"射阳县","320925":"建湖县","320981":"东台市","321000":"扬州市","321001":"市辖区","321002":"广陵区","321003":"邗江区","321012":"江都区","321023":"宝应县","321081":"仪征市","321084":"高邮市","321100":"镇江市","321101":"市辖区","321102":"京口区","321111":"润州区","321112":"丹徒区","321181":"丹阳市","321182":"扬中市","321183":"句容市","321200":"泰州市","321201":"市辖区","321202":"海陵区","321203":"高港区","321204":"姜堰区","321281":"兴化市","321282":"靖江市","321283":"泰兴市","321300":"宿迁市","321301":"市辖区","321302":"宿城区","321311":"宿豫区","321322":"沭阳县","321323":"泗阳县","321324":"泗洪县","330000":"浙江省","330100":"杭州市","330101":"市辖区","330102":"上城区","330103":"下城区","330104":"江干区","330105":"拱墅区","330106":"西湖区","330108":"滨江区","330109":"萧山区","330110":"余杭区","330111":"富阳区","330122":"桐庐县","330127":"淳安县","330182":"建德市","330185":"临安市","330200":"宁波市","330201":"市辖区","330203":"海曙区","330204":"江东区","330205":"江北区","330206":"北仑区","330211":"镇海区","330212":"鄞州区","330225":"象山县","330226":"宁海县","330281":"余姚市","330282":"慈溪市","330283":"奉化市","330300":"温州市","330301":"市辖区","330302":"鹿城区","330303":"龙湾区","330304":"瓯海区","330305":"洞头区","330324":"永嘉县","330326":"平阳县","330327":"苍南县","330328":"文成县","330329":"泰顺县","330381":"瑞安市","330382":"乐清市","330400":"嘉兴市","330401":"市辖区","330402":"南湖区","330411":"秀洲区","330421":"嘉善县","330424":"海盐县","330481":"海宁市","330482":"平湖市","330483":"桐乡市","330500":"湖州市","330501":"市辖区","330502":"吴兴区","330503":"南浔区","330521":"德清县","330522":"长兴县","330523":"安吉县","330600":"绍兴市","330601":"市辖区","330602":"越城区","330603":"柯桥区","330604":"上虞区","330624":"新昌县","330681":"诸暨市","330683":"嵊州市","330700":"金华市","330701":"市辖区","330702":"婺城区","330703":"金东区","330723":"武义县","330726":"浦江县","330727":"磐安县","330781":"兰溪市","330782":"义乌市","330783":"东阳市","330784":"永康市","330800":"衢州市","330801":"市辖区","330802":"柯城区","330803":"衢江区","330822":"常山县","330824":"开化县","330825":"龙游县","330881":"江山市","330900":"舟山市","330901":"市辖区","330902":"定海区","330903":"普陀区","330921":"岱山县","330922":"嵊泗县","331000":"台州市","331001":"市辖区","331002":"椒江区","331003":"黄岩区","331004":"路桥区","331021":"玉环县","331022":"三门县","331023":"天台县","331024":"仙居县","331081":"温岭市","331082":"临海市","331100":"丽水市","331101":"市辖区","331102":"莲都区","331121":"青田县","331122":"缙云县","331123":"遂昌县","331124":"松阳县","331125":"云和县","331126":"庆元县","331127":"景宁畲族自治县","331181":"龙泉市","340000":"安徽省","340100":"合肥市","340101":"市辖区","340102":"瑶海区","340103":"庐阳区","340104":"蜀山区","340111":"包河区","340121":"长丰县","340122":"肥东县","340123":"肥西县","340124":"庐江县","340181":"巢湖市","340200":"芜湖市","340201":"市辖区","340202":"镜湖区","340203":"弋江区","340207":"鸠江区","340208":"三山区","340221":"芜湖县","340222":"繁昌县","340223":"南陵县","340225":"无为县","340300":"蚌埠市","340301":"市辖区","340302":"龙子湖区","340303":"蚌山区","340304":"禹会区","340311":"淮上区","340321":"怀远县","340322":"五河县","340323":"固镇县","340400":"淮南市","340401":"市辖区","340402":"大通区","340403":"田家庵区","340404":"谢家集区","340405":"八公山区","340406":"潘集区","340421":"凤台县","340422":"寿县","340500":"马鞍山市","340501":"市辖区","340503":"花山区","340504":"雨山区","340506":"博望区","340521":"当涂县","340522":"含山县","340523":"和县","340600":"淮北市","340601":"市辖区","340602":"杜集区","340603":"相山区","340604":"烈山区","340621":"濉溪县","340700":"铜陵市","340701":"市辖区","340705":"铜官区","340706":"义安区","340711":"郊区","340722":"枞阳县","340800":"安庆市","340801":"市辖区","340802":"迎江区","340803":"大观区","340811":"宜秀区","340822":"怀宁县","340824":"潜山县","340825":"太湖县","340826":"宿松县","340827":"望江县","340828":"岳西县","340881":"桐城市","341000":"黄山市","341001":"市辖区","341002":"屯溪区","341003":"黄山区","341004":"徽州区","341021":"歙县","341022":"休宁县","341023":"黟县","341024":"祁门县","341100":"滁州市","341101":"市辖区","341102":"琅琊区","341103":"南谯区","341122":"来安县","341124":"全椒县","341125":"定远县","341126":"凤阳县","341181":"天长市","341182":"明光市","341200":"阜阳市","341201":"市辖区","341202":"颍州区","341203":"颍东区","341204":"颍泉区","341221":"临泉县","341222":"太和县","341225":"阜南县","341226":"颍上县","341282":"界首市","341300":"宿州市","341301":"市辖区","341302":"埇桥区","341321":"砀山县","341322":"萧县","341323":"灵璧县","341324":"泗县","341500":"六安市","341501":"市辖区","341502":"金安区","341503":"裕安区","341504":"叶集区","341522":"霍邱县","341523":"舒城县","341524":"金寨县","341525":"霍山县","341600":"亳州市","341601":"市辖区","341602":"谯城区","341621":"涡阳县","341622":"蒙城县","341623":"利辛县","341700":"池州市","341701":"市辖区","341702":"贵池区","341721":"东至县","341722":"石台县","341723":"青阳县","341800":"宣城市","341801":"市辖区","341802":"宣州区","341821":"郎溪县","341822":"广德县","341823":"泾县","341824":"绩溪县","341825":"旌德县","341881":"宁国市","350000":"福建省","350100":"福州市","350101":"市辖区","350102":"鼓楼区","350103":"台江区","350104":"仓山区","350105":"马尾区","350111":"晋安区","350121":"闽侯县","350122":"连江县","350123":"罗源县","350124":"闽清县","350125":"永泰县","350128":"平潭县","350181":"福清市","350182":"长乐市","350200":"厦门市","350201":"市辖区","350203":"思明区","350205":"海沧区","350206":"湖里区","350211":"集美区","350212":"同安区","350213":"翔安区","350300":"莆田市","350301":"市辖区","350302":"城厢区","350303":"涵江区","350304":"荔城区","350305":"秀屿区","350322":"仙游县","350400":"三明市","350401":"市辖区","350402":"梅列区","350403":"三元区","350421":"明溪县","350423":"清流县","350424":"宁化县","350425":"大田县","350426":"尤溪县","350427":"沙县","350428":"将乐县","350429":"泰宁县","350430":"建宁县","350481":"永安市","350500":"泉州市","350501":"市辖区","350502":"鲤城区","350503":"丰泽区","350504":"洛江区","350505":"泉港区","350521":"惠安县","350524":"安溪县","350525":"永春县","350526":"德化县","350527":"金门县","350581":"石狮市","350582":"晋江市","350583":"南安市","350600":"漳州市","350601":"市辖区","350602":"芗城区","350603":"龙文区","350622":"云霄县","350623":"漳浦县","350624":"诏安县","350625":"长泰县","350626":"东山县","350627":"南靖县","350628":"平和县","350629":"华安县","350681":"龙海市","350700":"南平市","350701":"市辖区","350702":"延平区","350703":"建阳区","350721":"顺昌县","350722":"浦城县","350723":"光泽县","350724":"松溪县","350725":"政和县","350781":"邵武市","350782":"武夷山市","350783":"建瓯市","350800":"龙岩市","350801":"市辖区","350802":"新罗区","350803":"永定区","350821":"长汀县","350823":"上杭县","350824":"武平县","350825":"连城县","350881":"漳平市","350900":"宁德市","350901":"市辖区","350902":"蕉城区","350921":"霞浦县","350922":"古田县","350923":"屏南县","350924":"寿宁县","350925":"周宁县","350926":"柘荣县","350981":"福安市","350982":"福鼎市","360000":"江西省","360100":"南昌市","360101":"市辖区","360102":"东湖区","360103":"西湖区","360104":"青云谱区","360105":"湾里区","360111":"青山湖区","360112":"新建区","360121":"南昌县","360123":"安义县","360124":"进贤县","360200":"景德镇市","360201":"市辖区","360202":"昌江区","360203":"珠山区","360222":"浮梁县","360281":"乐平市","360300":"萍乡市","360301":"市辖区","360302":"安源区","360313":"湘东区","360321":"莲花县","360322":"上栗县","360323":"芦溪县","360400":"九江市","360401":"市辖区","360402":"濂溪区","360403":"浔阳区","360421":"九江县","360423":"武宁县","360424":"修水县","360425":"永修县","360426":"德安县","360428":"都昌县","360429":"湖口县","360430":"彭泽县","360481":"瑞昌市","360482":"共青城市","360483":"庐山市","360500":"新余市","360501":"市辖区","360502":"渝水区","360521":"分宜县","360600":"鹰潭市","360601":"市辖区","360602":"月湖区","360622":"余江县","360681":"贵溪市","360700":"赣州市","360701":"市辖区","360702":"章贡区","360703":"南康区","360721":"赣县","360722":"信丰县","360723":"大余县","360724":"上犹县","360725":"崇义县","360726":"安远县","360727":"龙南县","360728":"定南县","360729":"全南县","360730":"宁都县","360731":"于都县","360732":"兴国县","360733":"会昌县","360734":"寻乌县","360735":"石城县","360781":"瑞金市","360800":"吉安市","360801":"市辖区","360802":"吉州区","360803":"青原区","360821":"吉安县","360822":"吉水县","360823":"峡江县","360824":"新干县","360825":"永丰县","360826":"泰和县","360827":"遂川县","360828":"万安县","360829":"安福县","360830":"永新县","360881":"井冈山市","360900":"宜春市","360901":"市辖区","360902":"袁州区","360921":"奉新县","360922":"万载县","360923":"上高县","360924":"宜丰县","360925":"靖安县","360926":"铜鼓县","360981":"丰城市","360982":"樟树市","360983":"高安市","361000":"抚州市","361001":"市辖区","361002":"临川区","361021":"南城县","361022":"黎川县","361023":"南丰县","361024":"崇仁县","361025":"乐安县","361026":"宜黄县","361027":"金溪县","361028":"资溪县","361029":"东乡县","361030":"广昌县","361100":"上饶市","361101":"市辖区","361102":"信州区","361103":"广丰区","361121":"上饶县","361123":"玉山县","361124":"铅山县","361125":"横峰县","361126":"弋阳县","361127":"余干县","361128":"鄱阳县","361129":"万年县","361130":"婺源县","361181":"德兴市","370000":"山东省","370100":"济南市","370101":"市辖区","370102":"历下区","370103":"市中区","370104":"槐荫区","370105":"天桥区","370112":"历城区","370113":"长清区","370124":"平阴县","370125":"济阳县","370126":"商河县","370181":"章丘市","370200":"青岛市","370201":"市辖区","370202":"市南区","370203":"市北区","370211":"黄岛区","370212":"崂山区","370213":"李沧区","370214":"城阳区","370281":"胶州市","370282":"即墨市","370283":"平度市","370285":"莱西市","370300":"淄博市","370301":"市辖区","370302":"淄川区","370303":"张店区","370304":"博山区","370305":"临淄区","370306":"周村区","370321":"桓台县","370322":"高青县","370323":"沂源县","370400":"枣庄市","370401":"市辖区","370402":"市中区","370403":"薛城区","370404":"峄城区","370405":"台儿庄区","370406":"山亭区","370481":"滕州市","370500":"东营市","370501":"市辖区","370502":"东营区","370503":"河口区","370505":"垦利区","370522":"利津县","370523":"广饶县","370600":"烟台市","370601":"市辖区","370602":"芝罘区","370611":"福山区","370612":"牟平区","370613":"莱山区","370634":"长岛县","370681":"龙口市","370682":"莱阳市","370683":"莱州市","370684":"蓬莱市","370685":"招远市","370686":"栖霞市","370687":"海阳市","370700":"潍坊市","370701":"市辖区","370702":"潍城区","370703":"寒亭区","370704":"坊子区","370705":"奎文区","370724":"临朐县","370725":"昌乐县","370781":"青州市","370782":"诸城市","370783":"寿光市","370784":"安丘市","370785":"高密市","370786":"昌邑市","370800":"济宁市","370801":"市辖区","370811":"任城区","370812":"兖州区","370826":"微山县","370827":"鱼台县","370828":"金乡县","370829":"嘉祥县","370830":"汶上县","370831":"泗水县","370832":"梁山县","370881":"曲阜市","370883":"邹城市","370900":"泰安市","370901":"市辖区","370902":"泰山区","370911":"岱岳区","370921":"宁阳县","370923":"东平县","370982":"新泰市","370983":"肥城市","371000":"威海市","371001":"市辖区","371002":"环翠区","371003":"文登区","371082":"荣成市","371083":"乳山市","371100":"日照市","371101":"市辖区","371102":"东港区","371103":"岚山区","371121":"五莲县","371122":"莒县","371200":"莱芜市","371201":"市辖区","371202":"莱城区","371203":"钢城区","371300":"临沂市","371301":"市辖区","371302":"兰山区","371311":"罗庄区","371312":"河东区","371321":"沂南县","371322":"郯城县","371323":"沂水县","371324":"兰陵县","371325":"费县","371326":"平邑县","371327":"莒南县","371328":"蒙阴县","371329":"临沭县","371400":"德州市","371401":"市辖区","371402":"德城区","371403":"陵城区","371422":"宁津县","371423":"庆云县","371424":"临邑县","371425":"齐河县","371426":"平原县","371427":"夏津县","371428":"武城县","371481":"乐陵市","371482":"禹城市","371500":"聊城市","371501":"市辖区","371502":"东昌府区","371521":"阳谷县","371522":"莘县","371523":"茌平县","371524":"东阿县","371525":"冠县","371526":"高唐县","371581":"临清市","371600":"滨州市","371601":"市辖区","371602":"滨城区","371603":"沾化区","371621":"惠民县","371622":"阳信县","371623":"无棣县","371625":"博兴县","371626":"邹平县","371700":"菏泽市","371701":"市辖区","371702":"牡丹区","371703":"定陶区","371721":"曹县","371722":"单县","371723":"成武县","371724":"巨野县","371725":"郓城县","371726":"鄄城县","371728":"东明县","410000":"河南省","410100":"郑州市","410101":"市辖区","410102":"中原区","410103":"二七区","410104":"管城回族区","410105":"金水区","410106":"上街区","410108":"惠济区","410122":"中牟县","410181":"巩义市","410182":"荥阳市","410183":"新密市","410184":"新郑市","410185":"登封市","410200":"开封市","410201":"市辖区","410202":"龙亭区","410203":"顺河回族区","410204":"鼓楼区","410205":"禹王台区","410211":"金明区","410212":"祥符区","410221":"杞县","410222":"通许县","410223":"尉氏县","410225":"兰考县","410300":"洛阳市","410301":"市辖区","410302":"老城区","410303":"西工区","410304":"瀍河回族区","410305":"涧西区","410306":"吉利区","410311":"洛龙区","410322":"孟津县","410323":"新安县","410324":"栾川县","410325":"嵩县","410326":"汝阳县","410327":"宜阳县","410328":"洛宁县","410329":"伊川县","410381":"偃师市","410400":"平顶山市","410401":"市辖区","410402":"新华区","410403":"卫东区","410404":"石龙区","410411":"湛河区","410421":"宝丰县","410422":"叶县","410423":"鲁山县","410425":"郏县","410481":"舞钢市","410482":"汝州市","410500":"安阳市","410501":"市辖区","410502":"文峰区","410503":"北关区","410505":"殷都区","410506":"龙安区","410522":"安阳县","410523":"汤阴县","410526":"滑县","410527":"内黄县","410581":"林州市","410600":"鹤壁市","410601":"市辖区","410602":"鹤山区","410603":"山城区","410611":"淇滨区","410621":"浚县","410622":"淇县","410700":"新乡市","410701":"市辖区","410702":"红旗区","410703":"卫滨区","410704":"凤泉区","410711":"牧野区","410721":"新乡县","410724":"获嘉县","410725":"原阳县","410726":"延津县","410727":"封丘县","410728":"长垣县","410781":"卫辉市","410782":"辉县市","410800":"焦作市","410801":"市辖区","410802":"解放区","410803":"中站区","410804":"马村区","410811":"山阳区","410821":"修武县","410822":"博爱县","410823":"武陟县","410825":"温县","410882":"沁阳市","410883":"孟州市","410900":"濮阳市","410901":"市辖区","410902":"华龙区","410922":"清丰县","410923":"南乐县","410926":"范县","410927":"台前县","410928":"濮阳县","411000":"许昌市","411001":"市辖区","411002":"魏都区","411023":"许昌县","411024":"鄢陵县","411025":"襄城县","411081":"禹州市","411082":"长葛市","411100":"漯河市","411101":"市辖区","411102":"源汇区","411103":"郾城区","411104":"召陵区","411121":"舞阳县","411122":"临颍县","411200":"三门峡市","411201":"市辖区","411202":"湖滨区","411203":"陕州区","411221":"渑池县","411224":"卢氏县","411281":"义马市","411282":"灵宝市","411300":"南阳市","411301":"市辖区","411302":"宛城区","411303":"卧龙区","411321":"南召县","411322":"方城县","411323":"西峡县","411324":"镇平县","411325":"内乡县","411326":"淅川县","411327":"社旗县","411328":"唐河县","411329":"新野县","411330":"桐柏县","411381":"邓州市","411400":"商丘市","411401":"市辖区","411402":"梁园区","411403":"睢阳区","411421":"民权县","411422":"睢县","411423":"宁陵县","411424":"柘城县","411425":"虞城县","411426":"夏邑县","411481":"永城市","411500":"信阳市","411501":"市辖区","411502":"浉河区","411503":"平桥区","411521":"罗山县","411522":"光山县","411523":"新县","411524":"商城县","411525":"固始县","411526":"潢川县","411527":"淮滨县","411528":"息县","411600":"周口市","411601":"市辖区","411602":"川汇区","411621":"扶沟县","411622":"西华县","411623":"商水县","411624":"沈丘县","411625":"郸城县","411626":"淮阳县","411627":"太康县","411628":"鹿邑县","411681":"项城市","411700":"驻马店市","411701":"市辖区","411702":"驿城区","411721":"西平县","411722":"上蔡县","411723":"平舆县","411724":"正阳县","411725":"确山县","411726":"泌阳县","411727":"汝南县","411728":"遂平县","411729":"新蔡县","419000":"省直辖县级行政区划","419001":"济源市","420000":"湖北省","420100":"武汉市","420101":"市辖区","420102":"江岸区","420103":"江汉区","420104":"硚口区","420105":"汉阳区","420106":"武昌区","420107":"青山区","420111":"洪山区","420112":"东西湖区","420113":"汉南区","420114":"蔡甸区","420115":"江夏区","420116":"黄陂区","420117":"新洲区","420200":"黄石市","420201":"市辖区","420202":"黄石港区","420203":"西塞山区","420204":"下陆区","420205":"铁山区","420222":"阳新县","420281":"大冶市","420300":"十堰市","420301":"市辖区","420302":"茅箭区","420303":"张湾区","420304":"郧阳区","420322":"郧西县","420323":"竹山县","420324":"竹溪县","420325":"房县","420381":"丹江口市","420500":"宜昌市","420501":"市辖区","420502":"西陵区","420503":"伍家岗区","420504":"点军区","420505":"猇亭区","420506":"夷陵区","420525":"远安县","420526":"兴山县","420527":"秭归县","420528":"长阳土家族自治县","420529":"五峰土家族自治县","420581":"宜都市","420582":"当阳市","420583":"枝江市","420600":"襄阳市","420601":"市辖区","420602":"襄城区","420606":"樊城区","420607":"襄州区","420624":"南漳县","420625":"谷城县","420626":"保康县","420682":"老河口市","420683":"枣阳市","420684":"宜城市","420700":"鄂州市","420701":"市辖区","420702":"梁子湖区","420703":"华容区","420704":"鄂城区","420800":"荆门市","420801":"市辖区","420802":"东宝区","420804":"掇刀区","420821":"京山县","420822":"沙洋县","420881":"钟祥市","420900":"孝感市","420901":"市辖区","420902":"孝南区","420921":"孝昌县","420922":"大悟县","420923":"云梦县","420981":"应城市","420982":"安陆市","420984":"汉川市","421000":"荆州市","421001":"市辖区","421002":"沙市区","421003":"荆州区","421022":"公安县","421023":"监利县","421024":"江陵县","421081":"石首市","421083":"洪湖市","421087":"松滋市","421100":"黄冈市","421101":"市辖区","421102":"黄州区","421121":"团风县","421122":"红安县","421123":"罗田县","421124":"英山县","421125":"浠水县","421126":"蕲春县","421127":"黄梅县","421181":"麻城市","421182":"武穴市","421200":"咸宁市","421201":"市辖区","421202":"咸安区","421221":"嘉鱼县","421222":"通城县","421223":"崇阳县","421224":"通山县","421281":"赤壁市","421300":"随州市","421301":"市辖区","421303":"曾都区","421321":"随县","421381":"广水市","422800":"恩施土家族苗族自治州","422801":"恩施市","422802":"利川市","422822":"建始县","422823":"巴东县","422825":"宣恩县","422826":"咸丰县","422827":"来凤县","422828":"鹤峰县","429000":"省直辖县级行政区划","429004":"仙桃市","429005":"潜江市","429006":"天门市","429021":"神农架林区","430000":"湖南省","430100":"长沙市","430101":"市辖区","430102":"芙蓉区","430103":"天心区","430104":"岳麓区","430105":"开福区","430111":"雨花区","430112":"望城区","430121":"长沙县","430124":"宁乡县","430181":"浏阳市","430200":"株洲市","430201":"市辖区","430202":"荷塘区","430203":"芦淞区","430204":"石峰区","430211":"天元区","430221":"株洲县","430223":"攸县","430224":"茶陵县","430225":"炎陵县","430281":"醴陵市","430300":"湘潭市","430301":"市辖区","430302":"雨湖区","430304":"岳塘区","430321":"湘潭县","430381":"湘乡市","430382":"韶山市","430400":"衡阳市","430401":"市辖区","430405":"珠晖区","430406":"雁峰区","430407":"石鼓区","430408":"蒸湘区","430412":"南岳区","430421":"衡阳县","430422":"衡南县","430423":"衡山县","430424":"衡东县","430426":"祁东县","430481":"耒阳市","430482":"常宁市","430500":"邵阳市","430501":"市辖区","430502":"双清区","430503":"大祥区","430511":"北塔区","430521":"邵东县","430522":"新邵县","430523":"邵阳县","430524":"隆回县","430525":"洞口县","430527":"绥宁县","430528":"新宁县","430529":"城步苗族自治县","430581":"武冈市","430600":"岳阳市","430601":"市辖区","430602":"岳阳楼区","430603":"云溪区","430611":"君山区","430621":"岳阳县","430623":"华容县","430624":"湘阴县","430626":"平江县","430681":"汨罗市","430682":"临湘市","430700":"常德市","430701":"市辖区","430702":"武陵区","430703":"鼎城区","430721":"安乡县","430722":"汉寿县","430723":"澧县","430724":"临澧县","430725":"桃源县","430726":"石门县","430781":"津市市","430800":"张家界市","430801":"市辖区","430802":"永定区","430811":"武陵源区","430821":"慈利县","430822":"桑植县","430900":"益阳市","430901":"市辖区","430902":"资阳区","430903":"赫山区","430921":"南县","430922":"桃江县","430923":"安化县","430981":"沅江市","431000":"郴州市","431001":"市辖区","431002":"北湖区","431003":"苏仙区","431021":"桂阳县","431022":"宜章县","431023":"永兴县","431024":"嘉禾县","431025":"临武县","431026":"汝城县","431027":"桂东县","431028":"安仁县","431081":"资兴市","431100":"永州市","431101":"市辖区","431102":"零陵区","431103":"冷水滩区","431121":"祁阳县","431122":"东安县","431123":"双牌县","431124":"道县","431125":"江永县","431126":"宁远县","431127":"蓝山县","431128":"新田县","431129":"江华瑶族自治县","431200":"怀化市","431201":"市辖区","431202":"鹤城区","431221":"中方县","431222":"沅陵县","431223":"辰溪县","431224":"溆浦县","431225":"会同县","431226":"麻阳苗族自治县","431227":"新晃侗族自治县","431228":"芷江侗族自治县","431229":"靖州苗族侗族自治县","431230":"通道侗族自治县","431281":"洪江市","431300":"娄底市","431301":"市辖区","431302":"娄星区","431321":"双峰县","431322":"新化县","431381":"冷水江市","431382":"涟源市","433100":"湘西土家族苗族自治州","433101":"吉首市","433122":"泸溪县","433123":"凤凰县","433124":"花垣县","433125":"保靖县","433126":"古丈县","433127":"永顺县","433130":"龙山县","440000":"广东省","440100":"广州市","440101":"市辖区","440103":"荔湾区","440104":"越秀区","440105":"海珠区","440106":"天河区","440111":"白云区","440112":"黄埔区","440113":"番禺区","440114":"花都区","440115":"南沙区","440117":"从化区","440118":"增城区","440200":"韶关市","440201":"市辖区","440203":"武江区","440204":"浈江区","440205":"曲江区","440222":"始兴县","440224":"仁化县","440229":"翁源县","440232":"乳源瑶族自治县","440233":"新丰县","440281":"乐昌市","440282":"南雄市","440300":"深圳市","440301":"市辖区","440303":"罗湖区","440304":"福田区","440305":"南山区","440306":"宝安区","440307":"龙岗区","440308":"盐田区","440400":"珠海市","440401":"市辖区","440402":"香洲区","440403":"斗门区","440404":"金湾区","440500":"汕头市","440501":"市辖区","440507":"龙湖区","440511":"金平区","440512":"濠江区","440513":"潮阳区","440514":"潮南区","440515":"澄海区","440523":"南澳县","440600":"佛山市","440601":"市辖区","440604":"禅城区","440605":"南海区","440606":"顺德区","440607":"三水区","440608":"高明区","440700":"江门市","440701":"市辖区","440703":"蓬江区","440704":"江海区","440705":"新会区","440781":"台山市","440783":"开平市","440784":"鹤山市","440785":"恩平市","440800":"湛江市","440801":"市辖区","440802":"赤坎区","440803":"霞山区","440804":"坡头区","440811":"麻章区","440823":"遂溪县","440825":"徐闻县","440881":"廉江市","440882":"雷州市","440883":"吴川市","440900":"茂名市","440901":"市辖区","440902":"茂南区","440904":"电白区","440981":"高州市","440982":"化州市","440983":"信宜市","441200":"肇庆市","441201":"市辖区","441202":"端州区","441203":"鼎湖区","441204":"高要区","441223":"广宁县","441224":"怀集县","441225":"封开县","441226":"德庆县","441284":"四会市","441300":"惠州市","441301":"市辖区","441302":"惠城区","441303":"惠阳区","441322":"博罗县","441323":"惠东县","441324":"龙门县","441400":"梅州市","441401":"市辖区","441402":"梅江区","441403":"梅县区","441422":"大埔县","441423":"丰顺县","441424":"五华县","441426":"平远县","441427":"蕉岭县","441481":"兴宁市","441500":"汕尾市","441501":"市辖区","441502":"城区","441521":"海丰县","441523":"陆河县","441581":"陆丰市","441600":"河源市","441601":"市辖区","441602":"源城区","441621":"紫金县","441622":"龙川县","441623":"连平县","441624":"和平县","441625":"东源县","441700":"阳江市","441701":"市辖区","441702":"江城区","441704":"阳东区","441721":"阳西县","441781":"阳春市","441800":"清远市","441801":"市辖区","441802":"清城区","441803":"清新区","441821":"佛冈县","441823":"阳山县","441825":"连山壮族瑶族自治县","441826":"连南瑶族自治县","441881":"英德市","441882":"连州市","441900":"东莞市","442000":"中山市","445100":"潮州市","445101":"市辖区","445102":"湘桥区","445103":"潮安区","445122":"饶平县","445200":"揭阳市","445201":"市辖区","445202":"榕城区","445203":"揭东区","445222":"揭西县","445224":"惠来县","445281":"普宁市","445300":"云浮市","445301":"市辖区","445302":"云城区","445303":"云安区","445321":"新兴县","445322":"郁南县","445381":"罗定市","450000":"广西壮族自治区","450100":"南宁市","450101":"市辖区","450102":"兴宁区","450103":"青秀区","450105":"江南区","450107":"西乡塘区","450108":"良庆区","450109":"邕宁区","450110":"武鸣区","450123":"隆安县","450124":"马山县","450125":"上林县","450126":"宾阳县","450127":"横县","450200":"柳州市","450201":"市辖区","450202":"城中区","450203":"鱼峰区","450204":"柳南区","450205":"柳北区","450206":"柳江区","450222":"柳城县","450223":"鹿寨县","450224":"融安县","450225":"融水苗族自治县","450226":"三江侗族自治县","450300":"桂林市","450301":"市辖区","450302":"秀峰区","450303":"叠彩区","450304":"象山区","450305":"七星区","450311":"雁山区","450312":"临桂区","450321":"阳朔县","450323":"灵川县","450324":"全州县","450325":"兴安县","450326":"永福县","450327":"灌阳县","450328":"龙胜各族自治县","450329":"资源县","450330":"平乐县","450331":"荔浦县","450332":"恭城瑶族自治县","450400":"梧州市","450401":"市辖区","450403":"万秀区","450405":"长洲区","450406":"龙圩区","450421":"苍梧县","450422":"藤县","450423":"蒙山县","450481":"岑溪市","450500":"北海市","450501":"市辖区","450502":"海城区","450503":"银海区","450512":"铁山港区","450521":"合浦县","450600":"防城港市","450601":"市辖区","450602":"港口区","450603":"防城区","450621":"上思县","450681":"东兴市","450700":"钦州市","450701":"市辖区","450702":"钦南区","450703":"钦北区","450721":"灵山县","450722":"浦北县","450800":"贵港市","450801":"市辖区","450802":"港北区","450803":"港南区","450804":"覃塘区","450821":"平南县","450881":"桂平市","450900":"玉林市","450901":"市辖区","450902":"玉州区","450903":"福绵区","450921":"容县","450922":"陆川县","450923":"博白县","450924":"兴业县","450981":"北流市","451000":"百色市","451001":"市辖区","451002":"右江区","451021":"田阳县","451022":"田东县","451023":"平果县","451024":"德保县","451026":"那坡县","451027":"凌云县","451028":"乐业县","451029":"田林县","451030":"西林县","451031":"隆林各族自治县","451081":"靖西市","451100":"贺州市","451101":"市辖区","451102":"八步区","451103":"平桂区","451121":"昭平县","451122":"钟山县","451123":"富川瑶族自治县","451200":"河池市","451201":"市辖区","451202":"金城江区","451221":"南丹县","451222":"天峨县","451223":"凤山县","451224":"东兰县","451225":"罗城仫佬族自治县","451226":"环江毛南族自治县","451227":"巴马瑶族自治县","451228":"都安瑶族自治县","451229":"大化瑶族自治县","451281":"宜州市","451300":"来宾市","451301":"市辖区","451302":"兴宾区","451321":"忻城县","451322":"象州县","451323":"武宣县","451324":"金秀瑶族自治县","451381":"合山市","451400":"崇左市","451401":"市辖区","451402":"江州区","451421":"扶绥县","451422":"宁明县","451423":"龙州县","451424":"大新县","451425":"天等县","451481":"凭祥市","460000":"海南省","460100":"海口市","460101":"市辖区","460105":"秀英区","460106":"龙华区","460107":"琼山区","460108":"美兰区","460200":"三亚市","460201":"市辖区","460202":"海棠区","460203":"吉阳区","460204":"天涯区","460205":"崖州区","460300":"三沙市","460400":"儋州市","469000":"省直辖县级行政区划","469001":"五指山市","469002":"琼海市","469005":"文昌市","469006":"万宁市","469007":"东方市","469021":"定安县","469022":"屯昌县","469023":"澄迈县","469024":"临高县","469025":"白沙黎族自治县","469026":"昌江黎族自治县","469027":"乐东黎族自治县","469028":"陵水黎族自治县","469029":"保亭黎族苗族自治县","469030":"琼中黎族苗族自治县","500000":"重庆市","500100":"市辖区","500101":"万州区","500102":"涪陵区","500103":"渝中区","500104":"大渡口区","500105":"江北区","500106":"沙坪坝区","500107":"九龙坡区","500108":"南岸区","500109":"北碚区","500110":"綦江区","500111":"大足区","500112":"渝北区","500113":"巴南区","500114":"黔江区","500115":"长寿区","500116":"江津区","500117":"合川区","500118":"永川区","500119":"南川区","500120":"璧山区","500151":"铜梁区","500152":"潼南区","500153":"荣昌区","500154":"开州区","500200":"县","500228":"梁平县","500229":"城口县","500230":"丰都县","500231":"垫江县","500232":"武隆县","500233":"忠县","500235":"云阳县","500236":"奉节县","500237":"巫山县","500238":"巫溪县","500240":"石柱土家族自治县","500241":"秀山土家族苗族自治县","500242":"酉阳土家族苗族自治县","500243":"彭水苗族土家族自治县","510000":"四川省","510100":"成都市","510101":"市辖区","510104":"锦江区","510105":"青羊区","510106":"金牛区","510107":"武侯区","510108":"成华区","510112":"龙泉驿区","510113":"青白江区","510114":"新都区","510115":"温江区","510116":"双流区","510121":"金堂县","510124":"郫县","510129":"大邑县","510131":"蒲江县","510132":"新津县","510181":"都江堰市","510182":"彭州市","510183":"邛崃市","510184":"崇州市","510185":"简阳市","510300":"自贡市","510301":"市辖区","510302":"自流井区","510303":"贡井区","510304":"大安区","510311":"沿滩区","510321":"荣县","510322":"富顺县","510400":"攀枝花市","510401":"市辖区","510402":"东区","510403":"西区","510411":"仁和区","510421":"米易县","510422":"盐边县","510500":"泸州市","510501":"市辖区","510502":"江阳区","510503":"纳溪区","510504":"龙马潭区","510521":"泸县","510522":"合江县","510524":"叙永县","510525":"古蔺县","510600":"德阳市","510601":"市辖区","510603":"旌阳区","510623":"中江县","510626":"罗江县","510681":"广汉市","510682":"什邡市","510683":"绵竹市","510700":"绵阳市","510701":"市辖区","510703":"涪城区","510704":"游仙区","510705":"安州区","510722":"三台县","510723":"盐亭县","510725":"梓潼县","510726":"北川羌族自治县","510727":"平武县","510781":"江油市","510800":"广元市","510801":"市辖区","510802":"利州区","510811":"昭化区","510812":"朝天区","510821":"旺苍县","510822":"青川县","510823":"剑阁县","510824":"苍溪县","510900":"遂宁市","510901":"市辖区","510903":"船山区","510904":"安居区","510921":"蓬溪县","510922":"射洪县","510923":"大英县","511000":"内江市","511001":"市辖区","511002":"市中区","511011":"东兴区","511024":"威远县","511025":"资中县","511028":"隆昌县","511100":"乐山市","511101":"市辖区","511102":"市中区","511111":"沙湾区","511112":"五通桥区","511113":"金口河区","511123":"犍为县","511124":"井研县","511126":"夹江县","511129":"沐川县","511132":"峨边彝族自治县","511133":"马边彝族自治县","511181":"峨眉山市","511300":"南充市","511301":"市辖区","511302":"顺庆区","511303":"高坪区","511304":"嘉陵区","511321":"南部县","511322":"营山县","511323":"蓬安县","511324":"仪陇县","511325":"西充县","511381":"阆中市","511400":"眉山市","511401":"市辖区","511402":"东坡区","511403":"彭山区","511421":"仁寿县","511423":"洪雅县","511424":"丹棱县","511425":"青神县","511500":"宜宾市","511501":"市辖区","511502":"翠屏区","511503":"南溪区","511521":"宜宾县","511523":"江安县","511524":"长宁县","511525":"高县","511526":"珙县","511527":"筠连县","511528":"兴文县","511529":"屏山县","511600":"广安市","511601":"市辖区","511602":"广安区","511603":"前锋区","511621":"岳池县","511622":"武胜县","511623":"邻水县","511681":"华蓥市","511700":"达州市","511701":"市辖区","511702":"通川区","511703":"达川区","511722":"宣汉县","511723":"开江县","511724":"大竹县","511725":"渠县","511781":"万源市","511800":"雅安市","511801":"市辖区","511802":"雨城区","511803":"名山区","511822":"荥经县","511823":"汉源县","511824":"石棉县","511825":"天全县","511826":"芦山县","511827":"宝兴县","511900":"巴中市","511901":"市辖区","511902":"巴州区","511903":"恩阳区","511921":"通江县","511922":"南江县","511923":"平昌县","512000":"资阳市","512001":"市辖区","512002":"雁江区","512021":"安岳县","512022":"乐至县","513200":"阿坝藏族羌族自治州","513201":"马尔康市","513221":"汶川县","513222":"理县","513223":"茂县","513224":"松潘县","513225":"九寨沟县","513226":"金川县","513227":"小金县","513228":"黑水县","513230":"壤塘县","513231":"阿坝县","513232":"若尔盖县","513233":"红原县","513300":"甘孜藏族自治州","513301":"康定市","513322":"泸定县","513323":"丹巴县","513324":"九龙县","513325":"雅江县","513326":"道孚县","513327":"炉霍县","513328":"甘孜县","513329":"新龙县","513330":"德格县","513331":"白玉县","513332":"石渠县","513333":"色达县","513334":"理塘县","513335":"巴塘县","513336":"乡城县","513337":"稻城县","513338":"得荣县","513400":"凉山彝族自治州","513401":"西昌市","513422":"木里藏族自治县","513423":"盐源县","513424":"德昌县","513425":"会理县","513426":"会东县","513427":"宁南县","513428":"普格县","513429":"布拖县","513430":"金阳县","513431":"昭觉县","513432":"喜德县","513433":"冕宁县","513434":"越西县","513435":"甘洛县","513436":"美姑县","513437":"雷波县","520000":"贵州省","520100":"贵阳市","520101":"市辖区","520102":"南明区","520103":"云岩区","520111":"花溪区","520112":"乌当区","520113":"白云区","520115":"观山湖区","520121":"开阳县","520122":"息烽县","520123":"修文县","520181":"清镇市","520200":"六盘水市","520201":"钟山区","520203":"六枝特区","520221":"水城县","520222":"盘县","520300":"遵义市","520301":"市辖区","520302":"红花岗区","520303":"汇川区","520304":"播州区","520322":"桐梓县","520323":"绥阳县","520324":"正安县","520325":"道真仡佬族苗族自治县","520326":"务川仡佬族苗族自治县","520327":"凤冈县","520328":"湄潭县","520329":"余庆县","520330":"习水县","520381":"赤水市","520382":"仁怀市","520400":"安顺市","520401":"市辖区","520402":"西秀区","520403":"平坝区","520422":"普定县","520423":"镇宁布依族苗族自治县","520424":"关岭布依族苗族自治县","520425":"紫云苗族布依族自治县","520500":"毕节市","520501":"市辖区","520502":"七星关区","520521":"大方县","520522":"黔西县","520523":"金沙县","520524":"织金县","520525":"纳雍县","520526":"威宁彝族回族苗族自治县","520527":"赫章县","520600":"铜仁市","520601":"市辖区","520602":"碧江区","520603":"万山区","520621":"江口县","520622":"玉屏侗族自治县","520623":"石阡县","520624":"思南县","520625":"印江土家族苗族自治县","520626":"德江县","520627":"沿河土家族自治县","520628":"松桃苗族自治县","522300":"黔西南布依族苗族自治州","522301":"兴义市","522322":"兴仁县","522323":"普安县","522324":"晴隆县","522325":"贞丰县","522326":"望谟县","522327":"册亨县","522328":"安龙县","522600":"黔东南苗族侗族自治州","522601":"凯里市","522622":"黄平县","522623":"施秉县","522624":"三穗县","522625":"镇远县","522626":"岑巩县","522627":"天柱县","522628":"锦屏县","522629":"剑河县","522630":"台江县","522631":"黎平县","522632":"榕江县","522633":"从江县","522634":"雷山县","522635":"麻江县","522636":"丹寨县","522700":"黔南布依族苗族自治州","522701":"都匀市","522702":"福泉市","522722":"荔波县","522723":"贵定县","522725":"瓮安县","522726":"独山县","522727":"平塘县","522728":"罗甸县","522729":"长顺县","522730":"龙里县","522731":"惠水县","522732":"三都水族自治县","530000":"云南省","530100":"昆明市","530101":"市辖区","530102":"五华区","530103":"盘龙区","530111":"官渡区","530112":"西山区","530113":"东川区","530114":"呈贡区","530122":"晋宁县","530124":"富民县","530125":"宜良县","530126":"石林彝族自治县","530127":"嵩明县","530128":"禄劝彝族苗族自治县","530129":"寻甸回族彝族自治县","530181":"安宁市","530300":"曲靖市","530301":"市辖区","530302":"麒麟区","530303":"沾益区","530321":"马龙县","530322":"陆良县","530323":"师宗县","530324":"罗平县","530325":"富源县","530326":"会泽县","530381":"宣威市","530400":"玉溪市","530401":"市辖区","530402":"红塔区","530403":"江川区","530422":"澄江县","530423":"通海县","530424":"华宁县","530425":"易门县","530426":"峨山彝族自治县","530427":"新平彝族傣族自治县","530428":"元江哈尼族彝族傣族自治县","530500":"保山市","530501":"市辖区","530502":"隆阳区","530521":"施甸县","530523":"龙陵县","530524":"昌宁县","530581":"腾冲市","530600":"昭通市","530601":"市辖区","530602":"昭阳区","530621":"鲁甸县","530622":"巧家县","530623":"盐津县","530624":"大关县","530625":"永善县","530626":"绥江县","530627":"镇雄县","530628":"彝良县","530629":"威信县","530630":"水富县","530700":"丽江市","530701":"市辖区","530702":"古城区","530721":"玉龙纳西族自治县","530722":"永胜县","530723":"华坪县","530724":"宁蒗彝族自治县","530800":"普洱市","530801":"市辖区","530802":"思茅区","530821":"宁洱哈尼族彝族自治县","530822":"墨江哈尼族自治县","530823":"景东彝族自治县","530824":"景谷傣族彝族自治县","530825":"镇沅彝族哈尼族拉祜族自治县","530826":"江城哈尼族彝族自治县","530827":"孟连傣族拉祜族佤族自治县","530828":"澜沧拉祜族自治县","530829":"西盟佤族自治县","530900":"临沧市","530901":"市辖区","530902":"临翔区","530921":"凤庆县","530922":"云县","530923":"永德县","530924":"镇康县","530925":"双江拉祜族佤族布朗族傣族自治县","530926":"耿马傣族佤族自治县","530927":"沧源佤族自治县","532300":"楚雄彝族自治州","532301":"楚雄市","532322":"双柏县","532323":"牟定县","532324":"南华县","532325":"姚安县","532326":"大姚县","532327":"永仁县","532328":"元谋县","532329":"武定县","532331":"禄丰县","532500":"红河哈尼族彝族自治州","532501":"个旧市","532502":"开远市","532503":"蒙自市","532504":"弥勒市","532523":"屏边苗族自治县","532524":"建水县","532525":"石屏县","532527":"泸西县","532528":"元阳县","532529":"红河县","532530":"金平苗族瑶族傣族自治县","532531":"绿春县","532532":"河口瑶族自治县","532600":"文山壮族苗族自治州","532601":"文山市","532622":"砚山县","532623":"西畴县","532624":"麻栗坡县","532625":"马关县","532626":"丘北县","532627":"广南县","532628":"富宁县","532800":"西双版纳傣族自治州","532801":"景洪市","532822":"勐海县","532823":"勐腊县","532900":"大理白族自治州","532901":"大理市","532922":"漾濞彝族自治县","532923":"祥云县","532924":"宾川县","532925":"弥渡县","532926":"南涧彝族自治县","532927":"巍山彝族回族自治县","532928":"永平县","532929":"云龙县","532930":"洱源县","532931":"剑川县","532932":"鹤庆县","533100":"德宏傣族景颇族自治州","533102":"瑞丽市","533103":"芒市","533122":"梁河县","533123":"盈江县","533124":"陇川县","533300":"怒江傈僳族自治州","533301":"泸水市","533323":"福贡县","533324":"贡山独龙族怒族自治县","533325":"兰坪白族普米族自治县","533400":"迪庆藏族自治州","533401":"香格里拉市","533422":"德钦县","533423":"维西傈僳族自治县","540000":"西藏自治区","540100":"拉萨市","540101":"市辖区","540102":"城关区","540103":"堆龙德庆区","540121":"林周县","540122":"当雄县","540123":"尼木县","540124":"曲水县","540126":"达孜县","540127":"墨竹工卡县","540200":"日喀则市","540202":"桑珠孜区","540221":"南木林县","540222":"江孜县","540223":"定日县","540224":"萨迦县","540225":"拉孜县","540226":"昂仁县","540227":"谢通门县","540228":"白朗县","540229":"仁布县","540230":"康马县","540231":"定结县","540232":"仲巴县","540233":"亚东县","540234":"吉隆县","540235":"聂拉木县","540236":"萨嘎县","540237":"岗巴县","540300":"昌都市","540302":"卡若区","540321":"江达县","540322":"贡觉县","540323":"类乌齐县","540324":"丁青县","540325":"察雅县","540326":"八宿县","540327":"左贡县","540328":"芒康县","540329":"洛隆县","540330":"边坝县","540400":"林芝市","540402":"巴宜区","540421":"工布江达县","540422":"米林县","540423":"墨脱县","540424":"波密县","540425":"察隅县","540426":"朗县","540500":"山南市","540501":"市辖区","540502":"乃东区","540521":"扎囊县","540522":"贡嘎县","540523":"桑日县","540524":"琼结县","540525":"曲松县","540526":"措美县","540527":"洛扎县","540528":"加查县","540529":"隆子县","540530":"错那县","540531":"浪卡子县","542400":"那曲地区","542421":"那曲县","542422":"嘉黎县","542423":"比如县","542424":"聂荣县","542425":"安多县","542426":"申扎县","542427":"索县","542428":"班戈县","542429":"巴青县","542430":"尼玛县","542431":"双湖县","542500":"阿里地区","542521":"普兰县","542522":"札达县","542523":"噶尔县","542524":"日土县","542525":"革吉县","542526":"改则县","542527":"措勤县","610000":"陕西省","610100":"西安市","610101":"市辖区","610102":"新城区","610103":"碑林区","610104":"莲湖区","610111":"灞桥区","610112":"未央区","610113":"雁塔区","610114":"阎良区","610115":"临潼区","610116":"长安区","610117":"高陵区","610122":"蓝田县","610124":"周至县","610125":"户县","610200":"铜川市","610201":"市辖区","610202":"王益区","610203":"印台区","610204":"耀州区","610222":"宜君县","610300":"宝鸡市","610301":"市辖区","610302":"渭滨区","610303":"金台区","610304":"陈仓区","610322":"凤翔县","610323":"岐山县","610324":"扶风县","610326":"眉县","610327":"陇县","610328":"千阳县","610329":"麟游县","610330":"凤县","610331":"太白县","610400":"咸阳市","610401":"市辖区","610402":"秦都区","610403":"杨陵区","610404":"渭城区","610422":"三原县","610423":"泾阳县","610424":"乾县","610425":"礼泉县","610426":"永寿县","610427":"彬县","610428":"长武县","610429":"旬邑县","610430":"淳化县","610431":"武功县","610481":"兴平市","610500":"渭南市","610501":"市辖区","610502":"临渭区","610503":"华州区","610522":"潼关县","610523":"大荔县","610524":"合阳县","610525":"澄城县","610526":"蒲城县","610527":"白水县","610528":"富平县","610581":"韩城市","610582":"华阴市","610600":"延安市","610601":"市辖区","610602":"宝塔区","610603":"安塞区","610621":"延长县","610622":"延川县","610623":"子长县","610625":"志丹县","610626":"吴起县","610627":"甘泉县","610628":"富县","610629":"洛川县","610630":"宜川县","610631":"黄龙县","610632":"黄陵县","610700":"汉中市","610701":"市辖区","610702":"汉台区","610721":"南郑县","610722":"城固县","610723":"洋县","610724":"西乡县","610725":"勉县","610726":"宁强县","610727":"略阳县","610728":"镇巴县","610729":"留坝县","610730":"佛坪县","610800":"榆林市","610801":"市辖区","610802":"榆阳区","610803":"横山区","610821":"神木县","610822":"府谷县","610824":"靖边县","610825":"定边县","610826":"绥德县","610827":"米脂县","610828":"佳县","610829":"吴堡县","610830":"清涧县","610831":"子洲县","610900":"安康市","610901":"市辖区","610902":"汉滨区","610921":"汉阴县","610922":"石泉县","610923":"宁陕县","610924":"紫阳县","610925":"岚皋县","610926":"平利县","610927":"镇坪县","610928":"旬阳县","610929":"白河县","611000":"商洛市","611001":"市辖区","611002":"商州区","611021":"洛南县","611022":"丹凤县","611023":"商南县","611024":"山阳县","611025":"镇安县","611026":"柞水县","620000":"甘肃省","620100":"兰州市","620101":"市辖区","620102":"城关区","620103":"七里河区","620104":"西固区","620105":"安宁区","620111":"红古区","620121":"永登县","620122":"皋兰县","620123":"榆中县","620200":"嘉峪关市","620201":"市辖区","620300":"金昌市","620301":"市辖区","620302":"金川区","620321":"永昌县","620400":"白银市","620401":"市辖区","620402":"白银区","620403":"平川区","620421":"靖远县","620422":"会宁县","620423":"景泰县","620500":"天水市","620501":"市辖区","620502":"秦州区","620503":"麦积区","620521":"清水县","620522":"秦安县","620523":"甘谷县","620524":"武山县","620525":"张家川回族自治县","620600":"武威市","620601":"市辖区","620602":"凉州区","620621":"民勤县","620622":"古浪县","620623":"天祝藏族自治县","620700":"张掖市","620701":"市辖区","620702":"甘州区","620721":"肃南裕固族自治县","620722":"民乐县","620723":"临泽县","620724":"高台县","620725":"山丹县","620800":"平凉市","620801":"市辖区","620802":"崆峒区","620821":"泾川县","620822":"灵台县","620823":"崇信县","620824":"华亭县","620825":"庄浪县","620826":"静宁县","620900":"酒泉市","620901":"市辖区","620902":"肃州区","620921":"金塔县","620922":"瓜州县","620923":"肃北蒙古族自治县","620924":"阿克塞哈萨克族自治县","620981":"玉门市","620982":"敦煌市","621000":"庆阳市","621001":"市辖区","621002":"西峰区","621021":"庆城县","621022":"环县","621023":"华池县","621024":"合水县","621025":"正宁县","621026":"宁县","621027":"镇原县","621100":"定西市","621101":"市辖区","621102":"安定区","621121":"通渭县","621122":"陇西县","621123":"渭源县","621124":"临洮县","621125":"漳县","621126":"岷县","621200":"陇南市","621201":"市辖区","621202":"武都区","621221":"成县","621222":"文县","621223":"宕昌县","621224":"康县","621225":"西和县","621226":"礼县","621227":"徽县","621228":"两当县","622900":"临夏回族自治州","622901":"临夏市","622921":"临夏县","622922":"康乐县","622923":"永靖县","622924":"广河县","622925":"和政县","622926":"东乡族自治县","622927":"积石山保安族东乡族撒拉族自治县","623000":"甘南藏族自治州","623001":"合作市","623021":"临潭县","623022":"卓尼县","623023":"舟曲县","623024":"迭部县","623025":"玛曲县","623026":"碌曲县","623027":"夏河县","630000":"青海省","630100":"西宁市","630101":"市辖区","630102":"城东区","630103":"城中区","630104":"城西区","630105":"城北区","630121":"大通回族土族自治县","630122":"湟中县","630123":"湟源县","630200":"海东市","630202":"乐都区","630203":"平安区","630222":"民和回族土族自治县","630223":"互助土族自治县","630224":"化隆回族自治县","630225":"循化撒拉族自治县","632200":"海北藏族自治州","632221":"门源回族自治县","632222":"祁连县","632223":"海晏县","632224":"刚察县","632300":"黄南藏族自治州","632321":"同仁县","632322":"尖扎县","632323":"泽库县","632324":"河南蒙古族自治县","632500":"海南藏族自治州","632521":"共和县","632522":"同德县","632523":"贵德县","632524":"兴海县","632525":"贵南县","632600":"果洛藏族自治州","632621":"玛沁县","632622":"班玛县","632623":"甘德县","632624":"达日县","632625":"久治县","632626":"玛多县","632700":"玉树藏族自治州","632701":"玉树市","632722":"杂多县","632723":"称多县","632724":"治多县","632725":"囊谦县","632726":"曲麻莱县","632800":"海西蒙古族藏族自治州","632801":"格尔木市","632802":"德令哈市","632821":"乌兰县","632822":"都兰县","632823":"天峻县","640000":"宁夏回族自治区","640100":"银川市","640101":"市辖区","640104":"兴庆区","640105":"西夏区","640106":"金凤区","640121":"永宁县","640122":"贺兰县","640181":"灵武市","640200":"石嘴山市","640201":"市辖区","640202":"大武口区","640205":"惠农区","640221":"平罗县","640300":"吴忠市","640301":"市辖区","640302":"利通区","640303":"红寺堡区","640323":"盐池县","640324":"同心县","640381":"青铜峡市","640400":"固原市","640401":"市辖区","640402":"原州区","640422":"西吉县","640423":"隆德县","640424":"泾源县","640425":"彭阳县","640500":"中卫市","640501":"市辖区","640502":"沙坡头区","640521":"中宁县","640522":"海原县","650000":"新疆维吾尔自治区","650100":"乌鲁木齐市","650101":"市辖区","650102":"天山区","650103":"沙依巴克区","650104":"新市区","650105":"水磨沟区","650106":"头屯河区","650107":"达坂城区","650109":"米东区","650121":"乌鲁木齐县","650200":"克拉玛依市","650201":"市辖区","650202":"独山子区","650203":"克拉玛依区","650204":"白碱滩区","650205":"乌尔禾区","650400":"吐鲁番市","650402":"高昌区","650421":"鄯善县","650422":"托克逊县","650500":"哈密市","650502":"伊州区","650521":"巴里坤哈萨克自治县","650522":"伊吾县","652300":"昌吉回族自治州","652301":"昌吉市","652302":"阜康市","652323":"呼图壁县","652324":"玛纳斯县","652325":"奇台县","652327":"吉木萨尔县","652328":"木垒哈萨克自治县","652700":"博尔塔拉蒙古自治州","652701":"博乐市","652702":"阿拉山口市","652722":"精河县","652723":"温泉县","652800":"巴音郭楞蒙古自治州","652801":"库尔勒市","652822":"轮台县","652823":"尉犁县","652824":"若羌县","652825":"且末县","652826":"焉耆回族自治县","652827":"和静县","652828":"和硕县","652829":"博湖县","652900":"阿克苏地区","652901":"阿克苏市","652922":"温宿县","652923":"库车县","652924":"沙雅县","652925":"新和县","652926":"拜城县","652927":"乌什县","652928":"阿瓦提县","652929":"柯坪县","653000":"克孜勒苏柯尔克孜自治州","653001":"阿图什市","653022":"阿克陶县","653023":"阿合奇县","653024":"乌恰县","653100":"喀什地区","653101":"喀什市","653121":"疏附县","653122":"疏勒县","653123":"英吉沙县","653124":"泽普县","653125":"莎车县","653126":"叶城县","653127":"麦盖提县","653128":"岳普湖县","653129":"伽师县","653130":"巴楚县","653131":"塔什库尔干塔吉克自治县","653200":"和田地区","653201":"和田市","653221":"和田县","653222":"墨玉县","653223":"皮山县","653224":"洛浦县","653225":"策勒县","653226":"于田县","653227":"民丰县","654000":"伊犁哈萨克自治州","654002":"伊宁市","654003":"奎屯市","654004":"霍尔果斯市","654021":"伊宁县","654022":"察布查尔锡伯自治县","654023":"霍城县","654024":"巩留县","654025":"新源县","654026":"昭苏县","654027":"特克斯县","654028":"尼勒克县","654200":"塔城地区","654201":"塔城市","654202":"乌苏市","654221":"额敏县","654223":"沙湾县","654224":"托里县","654225":"裕民县","654226":"和布克赛尔蒙古自治县","654300":"阿勒泰地区","654301":"阿勒泰市","654321":"布尔津县","654322":"富蕴县","654323":"福海县","654324":"哈巴河县","654325":"青河县","654326":"吉木乃县","659000":"自治区直辖县级行政区划","659001":"石河子市","659002":"阿拉尔市","659003":"图木舒克市","659004":"五家渠市","659006":"铁门关市","710000":"台湾省","810000":"香港特别行政区","820000":"澳门特别行政区"}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(39);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(22);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(23);

var _createClass3 = _interopRequireDefault(_createClass2);

var _randexp = __webpack_require__(114);

var _randexp2 = _interopRequireDefault(_randexp);

var _region = __webpack_require__(119);

var _region2 = _interopRequireDefault(_region);

var _config = __webpack_require__(82);

var _resource = __webpack_require__(85);

var _util = __webpack_require__(86);

var _type = __webpack_require__(38);

var _md2 = __webpack_require__(139);

var _md3 = _interopRequireDefault(_md2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var region, rd; /** @module 数据生成 */


function getPosition(num1, num2) {
  var n = num1,
      l = /\d+/.test(num2) && num2 > 0 ? num2 : 15;

  return _util.util.getNumber(n, +(n + '9'), l);
}

/**
 * @prop  {function} exp        自定义正则，不带参数为随机任意字符
 * @prop  {function} range      自定义随机范围
 * @prop  {function} int        整数
 * @prop  {function} number     任意数字
 * @prop  {funciton} increment  自增整数
 * @prop  {function} bool       布尔
 * @prop  {function} datetime   日期时间，可选参数为指定格式，如 yyyy-MM-dd EEE hh:mm:ss
 * @prop  {function} chinese    中文随机文字
 * @prop  {regexp} uuid         uUID
 * @prop  {regexp} mid          产品型号
 * @prop  {regexp} color        颜色
 * @prop  {regexp} url          网址
 * @prop  {regexp} mail         邮箱
 * @prop  {regexp} mobile       手机
 * @prop  {regexp} telphone     固话
 * @prop  {function} datetime   时间
 * @prop  {regexp} enName       英文姓名
 * @prop  {regexp} enMaleName   英文姓名 男
 * @prop  {regexp} enFemaleName 英文姓名 女
 * @prop  {regexp} cnName       中文姓名
 * @prop  {regexp} cnMaleName   中文姓名 男
 * @prop  {regexp} cnFemaleName 中文姓名 女
 * @prop  {regexp} enState      英文国家名
 * @prop  {regexp} cnState      中文国家名
 * @prop  {function} company    公司名称
 * @prop  {function} autocard   车牌号
 * @prop  {function} citycode   行政代码
 * @prop  {function} province   省
 * @prop  {function} prefecture 市
 * @prop  {function} county     县区
 * @prop  {function} lon        经度
 * @prop  {function} lat        纬度
 * @prop  {function} sex        性别
 * @prop  {function} nation     民族
 * @prop  {function} affiliate  政治面貌
 * @prop  {function} edu        学历
 * @prop  {function} mary       婚姻状况
 * @prop  {function} health     健康状况
 * @prop  {function} bodycard   身份证
 * @description 可扩展，function设置返回值即可
 */
var methods = {
  'exp': function exp() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /.+/;
    return new _randexp2.default(typeof arg === 'string' ? new RegExp(arg) : arg).gen();
  },
  'range': function range() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _util.util.getItem(args);
  },
  'int': function int() {
    var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    return _util.util.getInt(arg1, arg2);
  },
  'number': function number() {
    var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
    var arg3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    return _util.util.getNumber(arg1, arg2, arg3);
  },
  'bool': function bool() {
    return _util.util.getItem([true, false]);
  },
  'datetime': function datetime(arg) {
    return _util.util.formatDate(rd(), arg ? arg : 'yyyy-MM-dd hh:mm:ss');
  },
  'date': function date() {
    return _util.util.formatDate(rd(), 'yyyy-MM-dd');
  },
  'time': function time() {
    return _util.util.formatDate(rd(), 'hh:mm:ss');
  },
  'year': function year() {
    return +_util.util.formatDate(rd(), 'yyyy');
  },
  'month': function month() {
    return _util.util.getInt(1, 12);
  },
  'day': function day() {
    return _util.util.getInt(1, 31);
  },
  'hour': function hour() {
    return _util.util.getInt(0, 23);
  },
  'minute': function minute() {
    return _util.util.getInt(1, 59);
  },
  'now': function now(arg) {
    return _util.util.formatDate(new Date(), arg ? arg : 'yyyy-MM-dd hh:mm:ss');
  },
  'mid': /[0-9A-Z]{1,8}(\-[0-9A-Z]{2,6}){0,2}/,
  'validcode': function validcode() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
    return new _randexp2.default(new RegExp('[A-Z0-9]{' + arg + '}')).gen();
  },
  'account': /[a-zA-Z]{1,3}[a-zA-Z0-9]{3,6}/,
  'password': /[a-zA-Z0-9][a-zA-Z0-9\W_]{7}/,
  'color': /#[A-F0-9]{6}/,
  'url': /http:\/\/www\.[a-z]{3,8}\.(com|cn|net|org)(\/[a-z]{3,5})?/,
  'mail': /([a-z0-9]{3,6}[-_]?[a-z0-9]{3,6})@[a-z]{3,8}\.(com|cn|net|org)/,
  'mobile': /(13\d|(14[5-7])|(15([0-3]|[5-9]))|17(0|1|8])|18\d)\d{8}/,
  'telphone': /[0-8]\d{3}-(2|6|8)\d{6,7}/,
  'ip': /((192\.168)|(172\.0)|(10\.0))\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])/,
  'port': /[1-9]\d{3}/,
  'zipcode': /(\d[1-7]|[1-9][0-7])\d{4}/,
  'bizcode': /91[1-4]\d{5}[0-9A-HJ-NPQRTUWXY]{10}/,
  'bankcard': /62(([0-3]\d)(4[0-5])|5([0-3]|5|8|9)|70|8[2-3])\d{12,15}/,
  'qq': /[1-9]\d{4,10}/,
  'enName': function enName() {
    return _util.util.getItem(_resource.data.eMaleName.concat(_resource.data.eFemaleName)) + ' ' + _util.util.getItem(_resource.data.eSurname);
  },
  'enMaleName': function enMaleName() {
    return _util.util.getItem(_resource.data.eMaleName) + ' ' + _util.util.getItem(_resource.data.eSurname);
  },
  'enFemaleName': function enFemaleName() {
    return _util.util.getItem(_resource.data.eFemaleName) + ' ' + _util.util.getItem(_resource.data.eSurname);
  },
  'cnName': function cnName() {
    return _util.util.getItem(_resource.data.cSurname) + _util.util.getItem(_resource.data.cMaleName.concat(_resource.data.cFemaleName));
  },
  'cnMaleName': function cnMaleName() {
    return _util.util.getItem(_resource.data.cSurname) + _util.util.getItem(_resource.data.cMaleName);
  },
  'cnFemaleName': function cnFemaleName() {
    return _util.util.getItem(_resource.data.cSurname) + _util.util.getItem(_resource.data.cFemaleName);
  },
  'enState': function enState() {
    return _util.util.getItem(_resource.data.eStates);
  },
  'cnState': function cnState() {
    return _util.util.getItem(_resource.data.cStates);
  },
  'comDep': function comDep() {
    return _util.util.getItem(_resource.data.comDepartment);
  },
  'comPos': function comPos() {
    return _util.util.getItem(_resource.data.comPos);
  },
  'govDep': function govDep() {
    return _util.util.getItem(_resource.data.govDepartment) + _util.util.getItem(['科', '处']);
  },
  'govPos': function govPos() {
    return _util.util.getItem(_resource.data.govPos);
  },
  'sex': function sex() {
    return _util.util.getItem(_resource.data.sex);
  },
  'nation': function nation() {
    return _util.util.getItem(_resource.data.nation);
  },
  'affiliate': function affiliate() {
    return _util.util.getItem(_resource.data.affiliate);
  },
  'edu': function edu() {
    return _util.util.getItem(_resource.data.edu);
  },
  'mary': function mary() {
    return _util.util.getItem(_resource.data.mary);
  },
  'health': function health() {
    return _util.util.getItem(_resource.data.health);
  },

  increment: function increment() {
    var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var arg2 = arguments[1];

    _config.config.baseIncrement += arg1;
    return arg2 ? (Array(arg2).join(0) + _config.config.baseIncrement).slice(-arg2) : _config.config.baseIncrement;
  },
  price: function price() {
    var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
    var arg3 = arguments[2];

    var d = _util.util.getNumber(arg1, arg2, 2);
    var r1 = /\d{1,3}(?=(\d{3})+$)/g,
        r2 = /^(-?)(\d+)((\.\d+)?)$/;

    if (arg3) d = d.toString().replace(r2, function (s, s1, s2, s3) {
      return s1 + s2.replace(r1, '$&,') + s3;
    });
    return d;
  },
  citycode: function citycode() {
    return region.cityCode;
  },
  province: function province() {
    return region.province;
  },
  prefecture: function prefecture() {
    if (region.level === 1) region.extract();
    return region.prefecture;
  },
  county: function county() {
    if (region.level < 3) region.extract();
    return region.county;
  },
  lon: function lon(arg) {
    return getPosition(region.point.lon, arg);
  },
  lat: function lat(arg) {
    return getPosition(region.point.lat, arg);
  },
  company: function company() {
    return region.prefecture + _util.util.getItems(_resource.data.commonWord, 2) + _util.util.getItem(_resource.data.companyNature) + '有限公司';
  },
  autocard: function autocard() {
    return region.shorter + new _randexp2.default(/[A-C](\d{3}[A-HJ-NP-UW-Z]{2}|[A-HJ-NP-UW-Z]\d{4})/).gen();
  },
  address: function address() {
    return region.county.replace('县', '县城') + _util.util.getItem(_resource.data.road) + new _randexp2.default(/路|街\d{3}号/).gen() + _util.util.getItems(_resource.data.commonWord, 2) + _util.util.getItem(_resource.data.buildNature) + new _randexp2.default(/[A-F]栋[一二三四五]单元[1-7]0[1-5]室/).gen();
  },
  english: function english(arg) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var d = arg ? arg : 'abcdefghijklmnopqrstuvwxyz';

    return _util.util.getItems(d.split(''), num);
  },
  chinese: function chinese(arg) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var d = arg ? arg.split('') : String.fromCharCode(_util.util.getInt(19968, 40869));

    return _util.util.getItems(d, num);
  },
  text: function text() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '填充文本样式';
    var n1 = arguments[1];
    var n2 = arguments[2];

    var d = 40;

    if (_type.types.isNumber(n1) && _type.types.isNumber(n2)) d = _util.util.getInt(n1, n2);else if (_type.types.isNumber(n1)) d = n1;
    return Array(d + 1).join(arg);
  },
  md5: function md5() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getTime();
    var is16 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return is16 ? (0, _md3.default)(arg).substr(8, 16) : (0, _md3.default)(arg);
  },
  uuid: function uuid(arg) {
    var d = new Date().getTime();
    var s = !arg ? '-' : '',
        str = 'xxxxxxxx' + s + 'xxxx' + s + '4xxx' + s + 'yxxx' + s + 'xxxxxxxxxxxx',
        uuid = str.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;

      d = Math.floor(d / 16);
      return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });

    return uuid;
  },
  bodycard: function bodycard() {
    var sn = region.cityCode + _util.util.formatDate(rd(), 'yyyyMMdd') + new _randexp2.default(/\d{3}/).gen(),
        arr = sn.split(''),
        factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0,
        ai = 0,
        wi = 0;

    for (var i = 0; i < 17; i++) {
      ai = arr[i];
      wi = factor[i];
      sum += ai * wi;
    }
    return sn + parity[sum % 11];
  }
};

var DataMake = function () {
  function DataMake() {
    (0, _classCallCheck3.default)(this, DataMake);

    this.addSchema = this.addSchema.bind(this);
    this.schema = this.schema.bind(this);
    this.makeData = this.makeData.bind(this);

    rd = function rd() {
      return _util.util.randDate(_config.config.beginTime.getTime(), _config.config.endTime.getTime());
    };
    region = new _region2.default();
    region.extract();
  }

  /**
   * 扩展自定义生成数据方法
   * @param {object} option 对象
   * @example
   * addMethod({ mystr: /^abc$/, myfnc: arg => { return arg!=0 }})
   */


  (0, _createClass3.default)(DataMake, [{
    key: 'addSchema',
    value: function addSchema(option) {
      (0, _assign2.default)(methods, option);
    }

    /**
     * 生成模拟数据
     * @param {string} [ruleStr] 方法属性名
     * @returns {string} 返回模拟数据
     * @example
     * fake('address');
     */

  }, {
    key: 'schema',
    value: function schema(methodName) {
      var result = '';

      if (methods.hasOwnProperty(methodName)) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        if (_type.types.isFunction(methods[methodName])) result = methods[methodName].apply(this, args);else if (_type.types.isRegexp(methods[methodName])) result = new _randexp2.default(methods[methodName]).gen();else throw new TypeError('扩展方法非函数或正则！');
      } else throw new TypeError('没有找到生成数据的方法！');
      return result;
    }

    /**
     * JSON数据模板解析
     * @param {string} content json字符串，通过##嵌套数据类型，多参数可使用逗号隔开如#int,10,20#
     * @param {number} n1 生成对象数目，生成数组字符串，可选
     * @param {number} n2 为随机数目上限，结合参数2使用，无此参数则不随机数目，可选
     * @returns {string} 替换数据后的json字符串
     */

  }, {
    key: 'makeData',
    value: function makeData(content, n1, n2) {
      var _this = this;

      var jsonstr = void 0,
          num = void 0,
          parseTPL = function parseTPL(keyword) {
        return keyword.replace(/#([^#\n\r]+)#/g, function ($0, $1) {
          var args = $1.trim().split(',');

          if (args.length > 1) {
            args.forEach(function (arg, i) {
              if (/^(\-|\+)?\d+(\.\d+)?$/.test(arg)) args[i] = parseFloat(arg);else if (typeof args[i] === 'boolean') args[i] = Boolean(args[i]);
            });
          }
          return _this.schema.apply(_this, args);
        });
      };

      if (_type.types.isNumber(n1) && _type.types.isNumber(n2)) num = _util.util.getInt(n1, n2);else num = n1;
      if (_type.types.isNumber(num)) {
        var list = [],
            i = void 0;

        for (i = 0; i < num; i++) {
          list.push(parseTPL(content));
        }jsonstr = '[' + list.join(',') + ']';
      } else jsonstr = parseTPL(content);
      return jsonstr;
    }
  }]);
  return DataMake;
}();

exports.default = DataMake;
;
module.exports = exports['default'];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var ret = __webpack_require__(115);
var DRange = __webpack_require__(118);
var types = ret.types;


/**
 * If code is alphabetic, converts to other case.
 * If not alphabetic, returns back code.
 *
 * @param {Number} code
 * @return {Number}
 */
function toOtherCase(code) {
  return code + (97 <= code && code <= 122 ? -32 :
                 65 <= code && code <= 90  ?  32 : 0);
}


/**
 * Randomly returns a true or false value.
 *
 * @return {Boolean}
 */
function randBool() {
  return !this.randInt(0, 1);
}


/**
 * Randomly selects and returns a value from the array.
 *
 * @param {Array.<Object>} arr
 * @return {Object}
 */
function randSelect(arr) {
  if (arr instanceof DRange) {
    return arr.index(this.randInt(0, arr.length - 1));
  }
  return arr[this.randInt(0, arr.length - 1)];
}


/**
 * expands a token to a DiscontinuousRange of characters which has a
 * length and an index function (for random selecting)
 *
 * @param {Object} token
 * @return {DiscontinuousRange}
 */
function expand(token) {
  if (token.type === ret.types.CHAR) {
    return new DRange(token.value);
  } else if (token.type === ret.types.RANGE) {
    return new DRange(token.from, token.to);
  } else {
    var drange = new DRange();
    for (var i = 0; i < token.set.length; i++) {
      var subrange = expand.call(this, token.set[i]);
      drange.add(subrange);
      if (this.ignoreCase) {
        for (var j = 0; j < subrange.length; j++) {
          var code = subrange.index(j);
          var otherCaseCode = toOtherCase(code);
          if (code !== otherCaseCode) {
            drange.add(otherCaseCode);
          }
        }
      }
    }
    if (token.not) {
      return this.defaultRange.clone().subtract(drange);
    } else {
      return drange;
    }
  }
}


/**
 * Checks if some custom properties have been set for this regexp.
 *
 * @param {RandExp} randexp
 * @param {RegExp} regexp
 */
function checkCustom(randexp, regexp) {
  if (typeof regexp.max === 'number') {
    randexp.max = regexp.max;
  }
  if (regexp.defaultRange instanceof DRange) {
    randexp.defaultRange = regexp.defaultRange;
  }
  if (typeof regexp.randInt === 'function') {
    randexp.randInt = regexp.randInt;
  }
}


/**
 * @constructor
 * @param {RegExp|String} regexp
 * @param {String} m
 */
var RandExp = module.exports = function(regexp, m) {
  this.defaultRange = this.defaultRange.clone();
  if (regexp instanceof RegExp) {
    this.ignoreCase = regexp.ignoreCase;
    this.multiline = regexp.multiline;
    checkCustom(this, regexp);
    regexp = regexp.source;

  } else if (typeof regexp === 'string') {
    this.ignoreCase = m && m.indexOf('i') !== -1;
    this.multiline = m && m.indexOf('m') !== -1;
  } else {
    throw new Error('Expected a regexp or string');
  }

  this.tokens = ret(regexp);
};


// When a repetitional token has its max set to Infinite,
// randexp won't actually generate a random amount between min and Infinite
// instead it will see Infinite as min + 100.
RandExp.prototype.max = 100;


// Generates the random string.
RandExp.prototype.gen = function() {
  return gen.call(this, this.tokens, []);
};


// Enables use of randexp with a shorter call.
RandExp.randexp = function(regexp, m) {
  var randexp;
  if (regexp._randexp === undefined) {
    randexp = new RandExp(regexp, m);
    regexp._randexp = randexp;
  } else {
    randexp = regexp._randexp;
  }
  checkCustom(randexp, regexp);
  return randexp.gen();
};


// This enables sugary /regexp/.gen syntax.
RandExp.sugar = function() {
  /* jshint freeze:false */
  RegExp.prototype.gen = function() {
    return RandExp.randexp(this);
  };
};

// This allows expanding to include additional characters
// for instance: RandExp.defaultRange.add(0, 65535);
RandExp.prototype.defaultRange = new DRange(32, 126);


/**
 * Randomly generates and returns a number between a and b (inclusive).
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 */
RandExp.prototype.randInt = function(a, b) {
  return a + Math.floor(Math.random() * (1 + b - a));
};


/**
 * Generate random string modeled after given tokens.
 *
 * @param {Object} token
 * @param {Array.<String>} groups
 * @return {String}
 */
function gen(token, groups) {
  var stack, str, n, i, l;

  switch (token.type) {


    case types.ROOT:
    case types.GROUP:
      // Ignore lookaheads for now.
      if (token.followedBy || token.notFollowedBy) { return ''; }

      // Insert placeholder until group string is generated.
      if (token.remember && token.groupNumber === undefined) {
        token.groupNumber = groups.push(null) - 1;
      }

      stack = token.options ?
        randSelect.call(this, token.options) : token.stack;

      str = '';
      for (i = 0, l = stack.length; i < l; i++) {
        str += gen.call(this, stack[i], groups);
      }

      if (token.remember) {
        groups[token.groupNumber] = str;
      }
      return str;


    case types.POSITION:
      // Do nothing for now.
      return '';


    case types.SET:
      var expandedSet = expand.call(this, token);
      if (!expandedSet.length) { return ''; }
      return String.fromCharCode(randSelect.call(this, expandedSet));


    case types.REPETITION:
      // Randomly generate number between min and max.
      n = this.randInt(token.min,
              token.max === Infinity ? token.min + this.max : token.max);

      str = '';
      for (i = 0; i < n; i++) {
        str += gen.call(this, token.value, groups);
      }

      return str;


    case types.REFERENCE:
      return groups[token.value - 1] || '';


    case types.CHAR:
      var code = this.ignoreCase && randBool.call(this) ?
        toOtherCase(token.value) : token.value;
      return String.fromCharCode(code);
  }
}




/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var util      = __webpack_require__(116);
var types     = __webpack_require__(59);
var sets      = __webpack_require__(102);
var positions = __webpack_require__(117);


module.exports = function(regexpStr) {
  var i = 0, l, c,
      start = { type: types.ROOT, stack: []},

      // Keep track of last clause/group and stack.
      lastGroup = start,
      last = start.stack,
      groupStack = [];


  var repeatErr = function(i) {
    util.error(regexpStr, 'Nothing to repeat at column ' + (i - 1));
  };

  // Decode a few escaped characters.
  var str = util.strToChars(regexpStr);
  l = str.length;

  // Iterate through each character in string.
  while (i < l) {
    c = str[i++];

    switch (c) {
      // Handle escaped characters, inclues a few sets.
      case '\\':
        c = str[i++];

        switch (c) {
          case 'b':
            last.push(positions.wordBoundary());
            break;

          case 'B':
            last.push(positions.nonWordBoundary());
            break;

          case 'w':
            last.push(sets.words());
            break;

          case 'W':
            last.push(sets.notWords());
            break;

          case 'd':
            last.push(sets.ints());
            break;

          case 'D':
            last.push(sets.notInts());
            break;

          case 's':
            last.push(sets.whitespace());
            break;

          case 'S':
            last.push(sets.notWhitespace());
            break;

          default:
            // Check if c is integer.
            // In which case it's a reference.
            if (/\d/.test(c)) {
              last.push({ type: types.REFERENCE, value: parseInt(c, 10) });

            // Escaped character.
            } else {
              last.push({ type: types.CHAR, value: c.charCodeAt(0) });
            }
        }

        break;


      // Positionals.
      case '^':
          last.push(positions.begin());
        break;

      case '$':
          last.push(positions.end());
        break;


      // Handle custom sets.
      case '[':
        // Check if this class is 'anti' i.e. [^abc].
        var not;
        if (str[i] === '^') {
          not = true;
          i++;
        } else {
          not = false;
        }

        // Get all the characters in class.
        var classTokens = util.tokenizeClass(str.slice(i), regexpStr);

        // Increase index by length of class.
        i += classTokens[1];
        last.push({
          type: types.SET,
          set: classTokens[0],
          not: not,
        });

        break;


      // Class of any character except \n.
      case '.':
        last.push(sets.anyChar());
        break;


      // Push group onto stack.
      case '(':
        // Create group.
        var group = {
          type: types.GROUP,
          stack: [],
          remember: true,
        };

        c = str[i];

        // If if this is a special kind of group.
        if (c === '?') {
          c = str[i + 1];
          i += 2;

          // Match if followed by.
          if (c === '=') {
            group.followedBy = true;

          // Match if not followed by.
          } else if (c === '!') {
            group.notFollowedBy = true;

          } else if (c !== ':') {
            util.error(regexpStr,
              'Invalid group, character \'' + c +
              '\' after \'?\' at column ' + (i - 1));
          }

          group.remember = false;
        }

        // Insert subgroup into current group stack.
        last.push(group);

        // Remember the current group for when the group closes.
        groupStack.push(lastGroup);

        // Make this new group the current group.
        lastGroup = group;
        last = group.stack;
        break;


      // Pop group out of stack.
      case ')':
        if (groupStack.length === 0) {
          util.error(regexpStr, 'Unmatched ) at column ' + (i - 1));
        }
        lastGroup = groupStack.pop();

        // Check if this group has a PIPE.
        // To get back the correct last stack.
        last = lastGroup.options ?
          lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
        break;


      // Use pipe character to give more choices.
      case '|':
        // Create array where options are if this is the first PIPE
        // in this clause.
        if (!lastGroup.options) {
          lastGroup.options = [lastGroup.stack];
          delete lastGroup.stack;
        }

        // Create a new stack and add to options for rest of clause.
        var stack = [];
        lastGroup.options.push(stack);
        last = stack;
        break;


      // Repetition.
      // For every repetition, remove last element from last stack
      // then insert back a RANGE object.
      // This design is chosen because there could be more than
      // one repetition symbols in a regex i.e. `a?+{2,3}`.
      case '{':
        var rs = /^(\d+)(,(\d+)?)?\}/.exec(str.slice(i)), min, max;
        if (rs !== null) {
          if (last.length === 0) {
            repeatErr(i);
          }
          min = parseInt(rs[1], 10);
          max = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
          i += rs[0].length;

          last.push({
            type: types.REPETITION,
            min: min,
            max: max,
            value: last.pop(),
          });
        } else {
          last.push({
            type: types.CHAR,
            value: 123,
          });
        }
        break;

      case '?':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 0,
          max: 1,
          value: last.pop(),
        });
        break;

      case '+':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 1,
          max: Infinity,
          value: last.pop(),
        });
        break;

      case '*':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 0,
          max: Infinity,
          value: last.pop(),
        });
        break;


      // Default is a character that is not `\[](){}?+*^$`.
      default:
        last.push({
          type: types.CHAR,
          value: c.charCodeAt(0),
        });
    }

  }

  // Check if any groups have not been closed.
  if (groupStack.length !== 0) {
    util.error(regexpStr, 'Unterminated group');
  }

  return start;
};

module.exports.types = types;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(59);
var sets  = __webpack_require__(102);


// All of these are private and only used by randexp.
// It's assumed that they will always be called with the correct input.

var CTRL = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?';
var SLSH = { '0': 0, 't': 9, 'n': 10, 'v': 11, 'f': 12, 'r': 13 };

/**
 * Finds character representations in str and convert all to
 * their respective characters
 *
 * @param {String} str
 * @return {String}
 */
exports.strToChars = function(str) {
  /* jshint maxlen: false */
  var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;
  str = str.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
    if (lbs) {
      return s;
    }

    var code = b     ? 8 :
               a16   ? parseInt(a16, 16) :
               b16   ? parseInt(b16, 16) :
               c8    ? parseInt(c8,   8) :
               dctrl ? CTRL.indexOf(dctrl) :
               SLSH[eslsh];

    var c = String.fromCharCode(code);

    // Escape special regex characters.
    if (/[\[\]{}\^$.|?*+()]/.test(c)) {
      c = '\\' + c;
    }

    return c;
  });

  return str;
};


/**
 * turns class into tokens
 * reads str until it encounters a ] not preceeded by a \
 *
 * @param {String} str
 * @param {String} regexpStr
 * @return {Array.<Array.<Object>, Number>}
 */
exports.tokenizeClass = function(str, regexpStr) {
  /* jshint maxlen: false */
  var tokens = [];
  var regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g;
  var rs, c;


  while ((rs = regexp.exec(str)) != null) {
    if (rs[1]) {
      tokens.push(sets.words());

    } else if (rs[2]) {
      tokens.push(sets.ints());

    } else if (rs[3]) {
      tokens.push(sets.whitespace());

    } else if (rs[4]) {
      tokens.push(sets.notWords());

    } else if (rs[5]) {
      tokens.push(sets.notInts());

    } else if (rs[6]) {
      tokens.push(sets.notWhitespace());

    } else if (rs[7]) {
      tokens.push({
        type: types.RANGE,
        from: (rs[8] || rs[9]).charCodeAt(0),
          to: rs[10].charCodeAt(0),
      });

    } else if (c = rs[12]) {
      tokens.push({
        type: types.CHAR,
        value: c.charCodeAt(0),
      });

    } else {
      return [tokens, regexp.lastIndex];
    }
  }

  exports.error(regexpStr, 'Unterminated character class');
};


/**
 * Shortcut to throw errors.
 *
 * @param {String} regexp
 * @param {String} msg
 */
exports.error = function(regexp, msg) {
  throw new SyntaxError('Invalid regular expression: /' + regexp + '/: ' + msg);
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(59);

exports.wordBoundary = function() {
  return { type: types.POSITION, value: 'b' };
};

exports.nonWordBoundary = function() {
  return { type: types.POSITION, value: 'B' };
};

exports.begin = function() {
  return { type: types.POSITION, value: '^' };
};

exports.end = function() {
  return { type: types.POSITION, value: '$' };
};


/***/ }),
/* 118 */
/***/ (function(module, exports) {

//protected helper class
function _SubRange(low, high) {
    this.low = low;
    this.high = high;
    this.length = 1 + high - low;
}

_SubRange.prototype.overlaps = function (range) {
    return !(this.high < range.low || this.low > range.high);
};

_SubRange.prototype.touches = function (range) {
    return !(this.high + 1 < range.low || this.low - 1 > range.high);
};

//returns inclusive combination of _SubRanges as a _SubRange
_SubRange.prototype.add = function (range) {
    return this.touches(range) && new _SubRange(Math.min(this.low, range.low), Math.max(this.high, range.high));
};

//returns subtraction of _SubRanges as an array of _SubRanges (there's a case where subtraction divides it in 2)
_SubRange.prototype.subtract = function (range) {
    if (!this.overlaps(range)) return false;
    if (range.low <= this.low && range.high >= this.high) return [];
    if (range.low > this.low && range.high < this.high) return [new _SubRange(this.low, range.low - 1), new _SubRange(range.high + 1, this.high)];
    if (range.low <= this.low) return [new _SubRange(range.high + 1, this.high)];
    return [new _SubRange(this.low, range.low - 1)];
};

_SubRange.prototype.toString = function () {
    if (this.low == this.high) return this.low.toString();
    return this.low + '-' + this.high;
};

_SubRange.prototype.clone = function () {
    return new _SubRange(this.low, this.high);
};




function DiscontinuousRange(a, b) {
    if (this instanceof DiscontinuousRange) {
        this.ranges = [];
        this.length = 0;
        if (a !== undefined) this.add(a, b);
    } else {
        return new DiscontinuousRange(a, b);
    }
}

function _update_length(self) {
    self.length = self.ranges.reduce(function (previous, range) {return previous + range.length}, 0);
}

DiscontinuousRange.prototype.add = function (a, b) {
    var self = this;
    function _add(subrange) {
        var new_ranges = [];
        var i = 0;
        while (i < self.ranges.length && !subrange.touches(self.ranges[i])) {
            new_ranges.push(self.ranges[i].clone());
            i++;
        }
        while (i < self.ranges.length && subrange.touches(self.ranges[i])) {
            subrange = subrange.add(self.ranges[i]);
            i++;
        }
        new_ranges.push(subrange);
        while (i < self.ranges.length) {
            new_ranges.push(self.ranges[i].clone());
            i++;
        }
        self.ranges = new_ranges;
        _update_length(self);
    }

    if (a instanceof DiscontinuousRange) {
        a.ranges.forEach(_add);
    } else {
        if (a instanceof _SubRange) {
            _add(a);
        } else {
            if (b === undefined) b = a;
            _add(new _SubRange(a, b));
        }
    }
    return this;
};

DiscontinuousRange.prototype.subtract = function (a, b) {
    var self = this;
    function _subtract(subrange) {
        var new_ranges = [];
        var i = 0;
        while (i < self.ranges.length && !subrange.overlaps(self.ranges[i])) {
            new_ranges.push(self.ranges[i].clone());
            i++;
        }
        while (i < self.ranges.length && subrange.overlaps(self.ranges[i])) {
            new_ranges = new_ranges.concat(self.ranges[i].subtract(subrange));
            i++;
        }
        while (i < self.ranges.length) {
            new_ranges.push(self.ranges[i].clone());
            i++;
        }
        self.ranges = new_ranges;
        _update_length(self);
    }
    if (a instanceof DiscontinuousRange) {
        a.ranges.forEach(_subtract);
    } else {
        if (a instanceof _SubRange) {
            _subtract(a);
        } else {
            if (b === undefined) b = a;
            _subtract(new _SubRange(a, b));
        }
    }
    return this;
};


DiscontinuousRange.prototype.index = function (index) {
    var i = 0;
    while (i < this.ranges.length && this.ranges[i].length <= index) {
        index -= this.ranges[i].length;
        i++;
    }
    if (i >= this.ranges.length) return null;
    return this.ranges[i].low + index;
};


DiscontinuousRange.prototype.toString = function () {
    return '[ ' + this.ranges.join(', ') + ' ]'
};

DiscontinuousRange.prototype.clone = function () {
    return new DiscontinuousRange(this);
};

module.exports = DiscontinuousRange;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = __webpack_require__(120);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(22);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(23);

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = __webpack_require__(82);

var _resource = __webpack_require__(85);

var _util = __webpack_require__(86);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var divisionCode,
    tmp1,
    tmp2,
    filterWord = ['市辖区', '县', '省直辖县级行政区划', '自治区直辖县级行政区划'],
    getNRItem = function getNRItem(arr, tmpSet) {
  var item = _util.util.getItem(arr);

  if (item && tmpSet.has(item)) item = getNRItem(arr, tmpSet);else {
    tmpSet.add(item);
    if (tmpSet.size === arr.length) tmpSet.clear();
  }
  return item;
};

var Region = function () {
  function Region() {
    (0, _classCallCheck3.default)(this, Region);

    tmp1 = new _set2.default([]);
    tmp2 = new _set2.default([]);
    divisionCode = _config.config.divisionCode + '';
    this.extract = this.extract.bind(this);
  }

  /**
   * 随机取省、市、县名称、简称、区划代码、位置
   */


  (0, _createClass3.default)(Region, [{
    key: 'extract',
    value: function extract() {
      var _this = this;

      var division = _resource.data.division.get(divisionCode),
          city = void 0,
          province = void 0,
          prefecture = void 0,
          county = void 0,
          cityCode = void 0;

      if (/0{4}$/.test(divisionCode)) {
        province = division.name;
        city = getNRItem(_resource.data.division.prefectures(division.code), tmp1);
        prefecture = city.name;
        city = getNRItem(_resource.data.division.counties(city.code), tmp2);
        county = city.name;
        cityCode = city.code;
        this.level = 1;
      } else if (/0{2}$/.test(divisionCode)) {
        province = division.province.name;
        prefecture = division.name;
        city = getNRItem(_resource.data.division.counties(division.code), tmp2);
        county = city.name;
        cityCode = city.code;
        this.level = 2;
      } else {
        province = division.province.name;
        prefecture = division.prefecture.name;
        county = division.name;
        cityCode = division.code;
        this.level = 3;
      }
      this.province = province;
      this.prefecture = filterWord.indexOf(prefecture) === -1 ? prefecture : province;
      this.county = filterWord.indexOf(county) === -1 ? county : prefecture;
      this.cityCode = cityCode;
      var pt = _resource.data.geo.find(function (elem) {
        return elem.county === _this.county;
      });

      this.point = pt ? pt : _resource.data.geo.find(function (elem) {
        return elem.county === _this.prefecture;
      });
      this.shorter = function (obj) {
        var name = '';

        for (var p in obj) {
          if (p === divisionCode.slice(0, 2)) {
            name = obj[p];
            break;
          }
        }
        return name;
      }(_resource.data.shorter);
    }
  }]);
  return Region;
}();

exports.default = Region;
module.exports = exports['default'];

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
__webpack_require__(54);
__webpack_require__(55);
__webpack_require__(122);
__webpack_require__(132);
__webpack_require__(135);
__webpack_require__(137);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(123);
var validate = __webpack_require__(106);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(128)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(3).f;
var create = __webpack_require__(20);
var redefineAll = __webpack_require__(103);
var ctx = __webpack_require__(14);
var anInstance = __webpack_require__(104);
var forOf = __webpack_require__(60);
var $iterDefine = __webpack_require__(36);
var step = __webpack_require__(56);
var setSpecies = __webpack_require__(127);
var DESCRIPTORS = __webpack_require__(4);
var fastKey = __webpack_require__(47).fastKey;
var validate = __webpack_require__(106);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(10);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(18);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(105);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(18);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var dP = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(4);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(1);
var meta = __webpack_require__(47);
var fails = __webpack_require__(9);
var hide = __webpack_require__(6);
var redefineAll = __webpack_require__(103);
var forOf = __webpack_require__(60);
var anInstance = __webpack_require__(104);
var isObject = __webpack_require__(8);
var setToStringTag = __webpack_require__(21);
var dP = __webpack_require__(3).f;
var each = __webpack_require__(129)(0);
var DESCRIPTORS = __webpack_require__(4);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(14);
var IObject = __webpack_require__(34);
var toObject = __webpack_require__(13);
var toLength = __webpack_require__(43);
var asc = __webpack_require__(130);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(131);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var isArray = __webpack_require__(57);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(133)('Set') });


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(105);
var from = __webpack_require__(134);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(60);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(136)('Set');


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(138)('Set');


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(53);
var ctx = __webpack_require__(14);
var forOf = __webpack_require__(60);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(140),
      utf8 = __webpack_require__(107).utf8,
      isBuffer = __webpack_require__(141),
      bin = __webpack_require__(107).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),
/* 140 */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),
/* 141 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=shai.js.map