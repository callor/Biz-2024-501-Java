module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+TTV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateUtil; });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9BML");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class DateUtil {
  static setDate(date, option) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["set"](date, option);
  }

  static format(date, format) {
    if (date instanceof Date) {
      return date_fns__WEBPACK_IMPORTED_MODULE_0__["format"](date, format);
    } else {
      return date_fns__WEBPACK_IMPORTED_MODULE_0__["format"](new Date(date), format);
    }
  }

  static addDay(date, num) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["addDays"](date, num);
  }

  static addMonth(date, num) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["addMonths"](date, num);
  }
  /**
   * @example
   * DateUtil.getDayAndTime(new Date(2020,11,1)) // ['2020-12-01', '00:00']
   */


  static getDayAndTime(date) {
    return [this.format(date, "yyyy-MM-dd"), this.format(date, "HH:mm")];
  }
  /**
   * @example
   * DateUtil.formatLocale(new Date(2020,11,1)) // 2020.12.01 AM 00:00
   */


  static formatLocale(date) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["format"](date, "yyyy.MM.dd a hh:mm");
  }
  /**
   * @example
   * DateUtil.isInvalidDate(new Date(2020,11,1)) // false
   * DateUtil.isInvalidDate(new Date(undefined)) // true
   */


  static isInvalidDate(date) {
    return !date || isNaN(Number(date));
  }

  static getWeekOfMonth(date) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["getWeekOfMonth"](date);
  }

  static getLastMonthDay(date) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfMonth"](date);
  }

  static getStartCalendarDay(date) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfWeek"](date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfMonth"](date));
  }

  static getStartWeekDay(date) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfWeek"](date);
  }

  static getLastWeekDay(date) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["lastDayOfWeek"](date);
  }
  /**
   *
   * @param date1 기준날짜
   * @param date2 비교할날짜
   * @example
   * DateUtil.diffWeek(new Date(2020,10,30),new Date(2020,10,1))   ---> 4
   */


  static diffWeek(date1, date2) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["differenceInCalendarWeeks"](date1, date2);
  }

  static getDayType(day) {
    return this.days[day];
  }

  static weekToLocale(day, locale = "ko") {
    return this.localeWeek[locale][day - 1];
  }

  static dayToLocale(day, locale = "ko") {
    return this.localeDay[locale][day];
  }
  /**
   *
   * @param date1 기준 날짜
   * @param date2 비교할 날짜
   * @example
   * DateUtil.diffDay(new Date(2020,1,5), new Date(2020,1,3))  ---->  2
   */


  static diffDay(date1, date2) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["differenceInCalendarDays"](date1, date2);
  }

  static getCalendarStartDay(date) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfWeek"](date_fns__WEBPACK_IMPORTED_MODULE_0__["startOfMonth"](date));
  }

  static getCalendarLastDay(date) {
    return date_fns__WEBPACK_IMPORTED_MODULE_0__["lastDayOfWeek"](date_fns__WEBPACK_IMPORTED_MODULE_0__["endOfMonth"](date));
  } // 달력


  static getCalendar(date) {
    // 결과 담을 리스트
    const weekList = []; // 반복 돌릴 마지막 지점

    const monthLastDay = this.addDay(this.getCalendarLastDay(date), 1); // 일자 담을 리스트

    let dayList = []; // 반복 돌릴 시작 지점

    let day = this.getCalendarStartDay(date); // 같아질때까지 돌린다.

    date_fns__WEBPACK_IMPORTED_MODULE_0__["isSameDay"](day, monthLastDay);

    while (!date_fns__WEBPACK_IMPORTED_MODULE_0__["isSameDay"](day, monthLastDay)) {
      dayList.push({
        day: this.format(day, "dd"),
        isEmpty: !date_fns__WEBPACK_IMPORTED_MODULE_0__["isSameMonth"](day, date),
        value: day,
        ymd: this.format(day, "yyyyMMdd")
      }); // 7일 마다 배열을 넣고 새로 초기화

      if (dayList.length === 7) {
        weekList.push(dayList);
        dayList = [];
      }

      day = this.addDay(day, 1);
    }

    return weekList;
  }

}

_defineProperty(DateUtil, "days", ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]);

_defineProperty(DateUtil, "localeDay", {
  ko: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]
});

_defineProperty(DateUtil, "localeWeek", {
  ko: ["첫번째", "두번째", "세번째", "네번째", "마지막", "마지막"]
});

/***/ }),

/***/ "/jkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("hUgY");


/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouterWrapper;
}

/***/ }),

/***/ "0G5g":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

var _default = requestIdleCallback;
exports.default = _default;

/***/ }),

/***/ "0Pz+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return axios; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return serverAxios; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return axiosFetcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return cookieOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getThumbnail; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("LeJ0");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);



const axios = axios__WEBPACK_IMPORTED_MODULE_1___default.a.create({
  baseURL: _config__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].baseURL
});
const serverAxios = ({
  req,
  res
}) => {
  const axios = axios__WEBPACK_IMPORTED_MODULE_1___default.a.create({
    baseURL: _config__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].baseURL,
    headers: {
      authorization: `Bearer ${Object(nookies__WEBPACK_IMPORTED_MODULE_2__["parseCookies"])({
        req
      }).nsid}`
    }
  });
  axios.interceptors.response.use(res => res, err => {
    if ((err === null || err === void 0 ? void 0 : err.response.status) === 401) {
      res.writeHead(302, {
        Location: "/signIn"
      });
      res.end();
    }

    return Promise.reject(err);
  });
  return axios;
};
const axiosFetcher = url => axios.get(url).then(res => res.data);
const cookieOption = {
  maxAge: 3 * 24 * 3600,
  // 쿠키 3일
  path: "/",
  httpOnly: true,
  secure: false
};
const getThumbnail = fileId => fileId ? `${_config__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].baseURL}/file/thumbnail/${fileId}` : undefined;

/***/ }),

/***/ "284h":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("cDf5");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "3WeD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
exports.urlQueryToSearchParams = urlQueryToSearchParams;
exports.assign = assign;

function searchParamsToUrlQuery(searchParams) {
  const query = {};
  searchParams.forEach((value, key) => {
    if (typeof query[key] === 'undefined') {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      ;
      query[key].push(value);
    } else {
      query[key] = [query[key], value];
    }
  });
  return query;
}

function stringifyUrlQueryParam(param) {
  if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
    return String(param);
  } else {
    return '';
  }
}

function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => result.append(key, stringifyUrlQueryParam(item)));
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
}

function assign(target, ...searchParamsList) {
  searchParamsList.forEach(searchParams => {
    Array.from(searchParams.keys()).forEach(key => target.delete(key));
    searchParams.forEach((value, key) => target.append(key, value));
  });
  return target;
}

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "6D7l":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatUrl = formatUrl;

var querystring = _interopRequireWildcard(__webpack_require__("3WeD"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // Format function modified from nodejs
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


const slashedProtocols = /https?|ftp|gopher|file/;

function formatUrl(urlObj) {
  let {
    auth,
    hostname
  } = urlObj;
  let protocol = urlObj.protocol || '';
  let pathname = urlObj.pathname || '';
  let hash = urlObj.hash || '';
  let query = urlObj.query || '';
  let host = false;
  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';

  if (urlObj.host) {
    host = auth + urlObj.host;
  } else if (hostname) {
    host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);

    if (urlObj.port) {
      host += ':' + urlObj.port;
    }
  }

  if (query && typeof query === 'object') {
    query = String(querystring.urlQueryToSearchParams(query));
  }

  let search = urlObj.search || query && `?${query}` || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash[0] !== '#') hash = '#' + hash;
  if (search && search[0] !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace('#', '%23');
  return `${protocol}${host}${pathname}${search}${hash}`;
}

/***/ }),

/***/ "8LO8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TOP_BANNER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TOP_BANNER_SHOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COOKIE_NOT_LOGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEFAULT_PROFILE_IMG; });
/* unused harmony export ALRM_TYPE */
// 배너 관련
const TOP_BANNER = "TOP_BANNER";
const TOP_BANNER_SHOW = "FALSE"; // 쿠키 로그인 안한 경우

const COOKIE_NOT_LOGIN = "NOT_LOGIN"; // 프로필 이미지 기본

const DEFAULT_PROFILE_IMG = "/images/sub/mypage_profile_basic.jpg"; // ALRM

const ALRM_TYPE = {
  NEW_EVENT: "NEW_EVENT",
  INVITE_CALENDAR: "INVITE_CALENDAR",
  LEAVE_GROUP: "LEAVE_GROUP",
  EVENT_ALRM: "EVENT_ALRM"
};

/***/ }),

/***/ "9BML":
/***/ (function(module, exports) {

module.exports = require("date-fns");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "IX1n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlueButton; });
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("w8No");
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__);


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

const BlueButton = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("button", {
  target: "e1hz9j250",
  label: "BlueButton"
})(true ? {
  name: "gtt8b8",
  styles: "background-color:#177efb;border:1px solid #177efb;color:#fff"
} : undefined);

/***/ }),

/***/ "Kps4":
/***/ (function(module, exports) {

module.exports = require("@emotion/react");

/***/ }),

/***/ "LeJ0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  baseURL: "https://api.kmemo.co.kr/api",
  isServer: true
});

/***/ }),

/***/ "Nh2W":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__("UhrY"));

var _requestIdleCallback = _interopRequireDefault(__webpack_require__("0G5g")); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? // eslint-disable-next-line no-sequences
  generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (_unused) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR'); // TODO: unexport

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
}

function idleTimeout(ms, err) {
  return new Promise((_resolve, reject) => (0, _requestIdleCallback.default)(() => setTimeout(() => reject(err), ms)));
} // TODO: stop exporting or cache the failure
// It'd be best to stop exporting this. It's an implementation detail. We're
// only exporting it for backwards compatibilty with the `page-loader`.
// Only cache this response as a last resort if we cannot eliminate all other
// code branches that use the Build Manifest Callback and push them through
// the Route Loader interface.


function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return Promise.race([onBuildManifest, idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')))]);
}

function getFilesForRoute(assetPrefix, route) {
  if (false) {}

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route) {
      return withFuture(route, routes, async () => {
        try {
          const {
            scripts,
            css
          } = await getFilesForRoute(assetPrefix, route);
          const [, styles] = await Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
          const entrypoint = await Promise.race([this.whenEntrypoint(route), idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`)))]);
          const res = Object.assign({
            styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        } catch (err) {
          return {
            error: err
          };
        }
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback.default)(() => this.loadRoute(route));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

var _default = createRouteLoader;
exports.default = _default;

/***/ }),

/***/ "Osoz":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "PY3e":
/***/ (function(module, exports) {

module.exports = require("react-app-polyfill/ie9");

/***/ }),

/***/ "RE4Q":
/***/ (function(module, exports) {

module.exports = require("universal-cookie");

/***/ }),

/***/ "S3md":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "TqRt":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "UhrY":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "VBo9":
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ }),

/***/ "X24+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;
/**
* Removes the trailing slash of a path if there is one. Preserves the root path `/`.
*/

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}
/**
* Normalizes the trailing slash of a path according to the `trailingSlash` option
* in `next.config.js`.
*/


const normalizePathTrailingSlash =  false ? undefined : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "XFcN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: RootStore

// EXTERNAL MODULE: external "mobx"
var external_mobx_ = __webpack_require__("VBo9");

// EXTERNAL MODULE: ./src/utils/network.util.ts
var network_util = __webpack_require__("0Pz+");

// CONCATENATED MODULE: ./src/stores/auth/index.ts




class auth_AuthStore {
  constructor() {
    Object(external_mobx_["makeAutoObservable"])(this, {
      getMemberData: external_mobx_["flow"],
      userSignIn: external_mobx_["flow"],
      userSignOut: external_mobx_["flow"]
    });
  }

  *getMemberData(token) {
    try {
      const {
        data
      } = yield network_util["a" /* axios */].get("/user/info", {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      var _error$response;

      if (((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 401) {
        return undefined;
      } else {
        throw error;
      }
    }
  }

  *userSignIn(id, pw) {
    const {
      data
    } = yield network_util["a" /* axios */].post("/api/signIn", {
      id,
      pw
    }, {
      baseURL: "/"
    });
    return data;
  }

  *userSignOut() {
    yield network_util["a" /* axios */].delete("/api/signOut", {
      baseURL: "/"
    });
    stores.commonStore.isLoggedIn = false;
    stores.commonStore.member = undefined;
  }

}

/* harmony default export */ var auth = (auth_AuthStore);
// CONCATENATED MODULE: ./src/stores/common/index.ts
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class common_CommonStore {
  constructor() {
    _defineProperty(this, "member", void 0);

    _defineProperty(this, "isLoggedIn", false);

    Object(external_mobx_["makeAutoObservable"])(this);
  }

  settingLoggedIn(data) {
    this.member = data;
    this.isLoggedIn = true;
  }

}

/* harmony default export */ var common = (common_CommonStore);
// CONCATENATED MODULE: ./src/stores/index.ts
function stores_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




Object(external_mobx_["configure"])({
  useProxies: "never"
});
class RootStore {
  constructor(initialData) {
    stores_defineProperty(this, "commonStore", void 0);

    stores_defineProperty(this, "authStore", void 0);

    this.authStore = initialData.authStore;
    this.commonStore = initialData.commonStore;
  }

}
const rootStore = new RootStore({
  authStore: new auth(),
  commonStore: new common()
});
/* harmony default export */ var stores = __webpack_exports__["a"] = (rootStore);

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YTqd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function parseParameter(param) {
  const optional = param.startsWith('[') && param.endsWith(']');

  if (optional) {
    param = param.slice(1, -1);
  }

  const repeat = param.startsWith('...');

  if (repeat) {
    param = param.slice(3);
  }

  return {
    key: param,
    repeat,
    optional
  };
}

function getRouteRegex(normalizedRoute) {
  const segments = (normalizedRoute.replace(/\/$/, '') || '/').slice(1).split('/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = segments.map(segment => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const {
        key,
        optional,
        repeat
      } = parseParameter(segment.slice(1, -1));
      groups[key] = {
        pos: groupIndex++,
        repeat,
        optional
      };
      return repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
    } else {
      return `/${escapeRegex(segment)}`;
    }
  }).join(''); // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1; // builds a minimal routeKey using only a-z and minimal number of characters

    const getSafeRouteKey = () => {
      let routeKey = '';

      for (let i = 0; i < routeKeyCharLength; i++) {
        routeKey += String.fromCharCode(routeKeyCharCode);
        routeKeyCharCode++;

        if (routeKeyCharCode > 122) {
          routeKeyCharLength++;
          routeKeyCharCode = 97;
        }
      }

      return routeKey;
    };

    const routeKeys = {};
    let namedParameterizedRoute = segments.map(segment => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const {
          key,
          optional,
          repeat
        } = parseParameter(segment.slice(1, -1)); // replace any non-word characters since they can break
        // the named regex

        let cleanedKey = key.replace(/\W/g, '');
        let invalidKey = false; // check if the key is still invalid and fallback to using a known
        // safe key

        if (cleanedKey.length === 0 || cleanedKey.length > 30) {
          invalidKey = true;
        }

        if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
          invalidKey = true;
        }

        if (invalidKey) {
          cleanedKey = getSafeRouteKey();
        }

        routeKeys[cleanedKey] = key;
        return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join('');
    return {
      re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
      groups,
      routeKeys,
      namedRegex: `^${namedParameterizedRoute}(?:/)?$`
    };
  }

  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups
  };
}

/***/ }),

/***/ "aYQI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_date_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("+TTV");
/* harmony import */ var _utils_network_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0Pz+");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("VBo9");
/* harmony import */ var mobx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mobx__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class CalendarStore {
  constructor() {
    _defineProperty(this, "_date", new Date());

    _defineProperty(this, "_userCalendars", []);

    _defineProperty(this, "_commonCalendars", []);

    _defineProperty(this, "_selects", []);

    _defineProperty(this, "_calendar", {});

    _defineProperty(this, "_holidayMap", {});

    Object(mobx__WEBPACK_IMPORTED_MODULE_2__["makeAutoObservable"])(this, {
      syncHolidays: mobx__WEBPACK_IMPORTED_MODULE_2__["flow"]
    }); // 캘린더 이벤트 항목 불러오기

    Object(mobx__WEBPACK_IMPORTED_MODULE_2__["reaction"])(() => [this.calendars, this.date], () => {
      this.syncCalendar();
    }); // 특일정보 불러오기

    Object(mobx__WEBPACK_IMPORTED_MODULE_2__["reaction"])(() => this.date, async (date, prevDate) => {
      if (date.getFullYear() !== (prevDate === null || prevDate === void 0 ? void 0 : prevDate.getFullYear())) {
        this.syncHolidays();
      }
    });
  }

  get date() {
    return this._date;
  }

  get calendars() {
    return [...this._commonCalendars, ...this._userCalendars];
  }

  get calendarSort() {
    return this.calendars.filter(event => this.selectIds.includes(event.calendarId)).map(({
      calendarId
    }) => calendarId);
  }

  get calendarMap() {
    const calendarMap = {};
    this.calendars.forEach(({
      bgColor,
      color,
      calendarId
    }) => {
      calendarMap[calendarId] = {
        bgColor,
        color
      };
    });
    return calendarMap;
  }

  get selectIds() {
    return this._selects;
  }

  get calendar() {
    const copyCalendar = {};
    Object.keys(this._calendar).forEach(ymd => {
      copyCalendar[ymd] = this._calendar[ymd].filter(event => this.selectIds.includes(event.calendarId)).sort((a, b) => {
        const diff = b.colSpan - a.colSpan;
        return diff === 0 ? this.calendarSort.indexOf(a.calendarId) - this.calendarSort.indexOf(b.calendarId) : diff; // const diff = DateUtil.diffDay(a.startDt, b.startDt);
        // diff === 0
        //   ? DateUtil.diffDay(new Date(b.endDt), new Date(b.startDt)) -
        //       DateUtil.diffDay(new Date(a.endDt), new Date(a.startDt)) -
        //(this.calendarSort.indexOf(b.calendarId) -
        //         this.calendarSort.indexOf(a.calendarId))
        //   : diff;
      });
    });
    return copyCalendar;
  }

  get holidayMap() {
    return this._holidayMap;
  }

  getCalendarData(calendarId) {
    return this.calendarMap[calendarId];
  }

  setDate(date) {
    this._date = date;
  }

  setUserCalendars(calendars) {
    this._userCalendars = calendars;
    this._selects = [...this._commonCalendars, ...calendars].map(({
      calendarId
    }) => calendarId);
  }

  setSelctes(selectIds) {
    this._selects = selectIds;
  }

  setCalendar(calendar) {
    this._calendar = calendar;
  }

  *syncHolidays() {
    const date = this.date;
    const holidayMap = {};
    const {
      data: specialDays
    } = yield _utils_network_util__WEBPACK_IMPORTED_MODULE_1__[/* axios */ "a"].get(`/diary/special/${date.getFullYear()}`);
    specialDays.forEach((_ref) => {
      let {
        locDate,
        sno
      } = _ref,
          data = _objectWithoutProperties(_ref, ["locDate", "sno"]);

      if (sno === 0) {
        holidayMap[locDate] = [data];
      } else {
        holidayMap[locDate].push(data);
      }
    });
    this._holidayMap = holidayMap;
  }

  async syncCalendar() {
    const {
      date,
      calendars
    } = this;
    const calendar = {};
    const yyyymm = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].format(date, "yyyyMM");
    const calendarStartDt = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].getCalendarStartDay(date);
    const calendarEndDt = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].getCalendarLastDay(date);
    await Promise.all(calendars.map(async ({
      calendarId
    }) => {
      const {
        data: events
      } = await _utils_network_util__WEBPACK_IMPORTED_MODULE_1__[/* axios */ "a"].get(`/diary/calendar/${calendarId}/event?yyyymm=${yyyymm}`);
      events.forEach((_ref2) => {
        let {
          startDt: _startDt,
          endDt: _endDt
        } = _ref2,
            event = _objectWithoutProperties(_ref2, ["startDt", "endDt"]);

        const startDt = new Date(_startDt);
        const endDt = new Date(_endDt);
        const isBefore = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffDay(calendarStartDt, startDt) > 0;
        const isAfter = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffDay(endDt, calendarEndDt) > 0;
        let ymd = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].format(startDt, "yyyyMMdd");
        let colSpan = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffDay(endDt, startDt) + 1;
        let diffWeek = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffWeek(endDt, startDt);

        if (isBefore) {
          diffWeek = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffWeek(endDt, calendarStartDt);
        } else if (isAfter) {
          diffWeek = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffWeek(calendarEndDt, startDt);
        }

        if (diffWeek === 0) {
          if (isBefore) {
            ymd = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].format(calendarStartDt, "yyyyMMdd");
            colSpan = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffDay(endDt, calendarStartDt) + 1;
          } else if (isAfter) {
            ymd = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].format(startDt, "yyyyMMdd");
            colSpan = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffDay(calendarEndDt, startDt) + 1;
          }

          const data = _objectSpread(_objectSpread({}, event), {}, {
            calendarId,
            colSpan,
            startDt,
            endDt,
            eventStartDt: startDt
          });

          if (calendar[ymd]) {
            calendar[ymd].push(data);
          } else {
            calendar[ymd] = [data];
          }
        } else {
          for (let i = 0; i < diffWeek + 1; i++) {
            const eventStartDt = i === 0 ? isBefore ? calendarStartDt : startDt : _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].getStartWeekDay(_utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].addDay(isBefore ? calendarStartDt : startDt, i * 7));
            const weekLastDt = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].getLastWeekDay(eventStartDt);
            const eventEnd = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffDay(weekLastDt, endDt) > 0 ? isAfter ? calendarEndDt : endDt : weekLastDt;
            ymd = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].format(eventStartDt, "yyyyMMdd");
            colSpan = _utils_date_util__WEBPACK_IMPORTED_MODULE_0__[/* DateUtil */ "a"].diffDay(eventEnd, eventStartDt) + 1;

            const data = _objectSpread(_objectSpread({}, event), {}, {
              calendarId,
              colSpan,
              startDt,
              endDt,
              eventStartDt
            });

            if (calendar[ymd]) {
              calendar[ymd].push(data);
            } else {
              calendar[ymd] = [data];
            }
          }
        }
      });
    }));
    Object(mobx__WEBPACK_IMPORTED_MODULE_2__["runInAction"])(() => {
      this.setCalendar(calendar);
    });
  }

}

const calendarStore = new CalendarStore();
/* harmony default export */ __webpack_exports__["a"] = (calendarStore);

/***/ }),

/***/ "aYjl":
/***/ (function(module, exports) {

module.exports = require("swr");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cDf5":
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _router = __webpack_require__("elyg");

var _router2 = __webpack_require__("nOHt");

var _useIntersection = __webpack_require__("vNVm");

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (false) {}
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale
  }).then(success => {
    if (!success) return;

    if (scroll) {
      window.scrollTo(0, 0);
      document.body.focus();
    }
  });
}

function Link(props) {
  if (false) {}

  const p = props.prefetch !== false;
  const router = (0, _router2.useRouter)();
  const pathname = router && router.pathname || '/';

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router.resolveHref)(pathname, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  const child = _react.Children.only(children);

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(() => {
    const shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    childProps.href = (0, _router.addBasePath)((0, _router.addLocale)(as, typeof locale !== 'undefined' ? locale : router && router.locale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "dZ6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

/***/ }),

/***/ "edCo":
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime/runtime");

/***/ }),

/***/ "elyg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__("X24+");

var _routeLoader = __webpack_require__("Nh2W");

var _denormalizePagePath = __webpack_require__("wkBG");

var _mitt = _interopRequireDefault(__webpack_require__("dZ6Y"));

var _utils = __webpack_require__("g/15");

var _escapePathDelimiters = _interopRequireDefault(__webpack_require__("fcRV"));

var _isDynamic = __webpack_require__("/jkW");

var _parseRelativeUrl = __webpack_require__("hS4m");

var _querystring = __webpack_require__("3WeD");

var _resolveRewrites = _interopRequireDefault(__webpack_require__("S3md"));

var _routeMatcher = __webpack_require__("gguc");

var _routeRegex = __webpack_require__("YTqd");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* global __NEXT_DATA__ */
// tslint:disable:no-console


const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(prefix) : `${prefix}${path}` : path;
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function hasBasePath(path) {
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  return path.slice(basePath.length) || '/';
}
/**
* Detects whether a given url is routable by the Next.js router (browser only).
*/


function isLocalURL(url) {
  if (url.startsWith('/')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils.getLocationOrigin)();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex.getRouteRegex)(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && ( // Interpolate group into data URL if present
    interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(_escapePathDelimiters.default).join('/') : (0, _escapePathDelimiters.default)(value)) || '/');
  })) {
    interpolatedRoute = ''; // did not satisfy all requirements
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}
/**
* Resolves a given hyperlink with a certain router state (basePath not included).
* Preserves absolute urls.
*/


function resolveHref(currentPath, href, resolveAs) {
  // we use a dummy base url for relative urls
  const base = new URL(currentPath, 'http://n');
  const urlAsString = typeof href === 'string' ? href : (0, _utils.formatWithValidation)(href); // Return because it cannot be routed by the Next.js router

  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils.formatWithValidation)({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  return {
    url: addBasePath(resolveHref(router.pathname, url)),
    as: as ? addBasePath(resolveHref(router.pathname, as)) : as
  };
}

const manualScrollRestoration =  false && false;
const SSG_DATA_NOT_FOUND_ERROR = 'SSG Data NOT_FOUND';

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        // TODO: handle reloading in development from fallback returning 200
        // to on-demand-entry-handler causing it to reload periodically
        throw new Error(SSG_DATA_NOT_FOUND_ERROR);
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader.markAssetError)(err);
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  constructor(_pathname, _query, _as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;
    this._inFlightRoute = void 0;
    this._shallow = void 0;
    this.locale = void 0;
    this.locales = void 0;
    this.defaultLocale = void 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname: addBasePath(pathname),
          query
        }), (0, _utils.getURL)());
        return;
      }

      if (!state.__N) {
        return;
      }

      const {
        url,
        as,
        options
      } = state;
      const {
        pathname
      } = (0, _parseRelativeUrl.parseRelativeUrl)(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as === this.asPath && pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }));
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        initial: true,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: [
        /* /_app does not need its stylesheets managed */
      ]
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    (0, _isDynamic.isDynamicRoute)(_pathname) && __NEXT_DATA__.autoExport ? _pathname : _as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as = url, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as = url, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options) {
    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    }

    let localeChange = options.locale !== this.locale;

    if (false) {}

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs)) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route]);
      Router.events.emit('hashChangeComplete', as);
      return true;
    }

    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname,
      query
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
    } catch (err) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    }

    parsed = this._resolveHref(parsed, pages);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    } // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1


    pathname = pathname ? (0, _normalizeTrailingSlash.removePathTrailingSlash)(delBasePath(pathname)) : pathname; // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url

    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    }

    let route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
    const {
      shallow = false
    } = options; // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly

    let resolvedAs = as;

    if (false) {}

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic.isDynamicRoute)(route)) {
      const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex.getRouteRegex)(route);
      const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

        if (missingParams.length > 0) {
          if (false) {}

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://err.sh/vercel/next.js/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils.formatWithValidation)(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as);

    try {
      const routeInfo = await this.getRouteInfo(route, pathname, query, as, shallow);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props && props.pageProps && props.pageProps.__N_REDIRECT) {
        const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
        // client-navigation if it is falling back to hard navigation if
        // it's not

        if (destination.startsWith('/')) {
          const parsedHref = (0, _parseRelativeUrl.parseRelativeUrl)(destination);

          this._resolveHref(parsedHref, pages, false);

          if (pages.includes(parsedHref.pathname)) {
            const {
              url: newUrl,
              as: newAs
            } = prepareUrlAs(this, destination, destination);
            return this.change(method, newUrl, newAs, options);
          }
        }

        window.location.href = destination;
        return new Promise(() => {});
      }

      Router.events.emit('beforeHistoryChange', as);
      this.changeState(method, url, as, options);

      if (false) {}

      await this.set(route, pathname, query, cleanedAs, routeInfo).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs);
        throw error;
      }

      if (false) {}

      if (false) {}

      Router.events.emit('routeChangeComplete', as);
      return true;
    } catch (err) {
      if (err.cancelled) {
        return false;
      }

      throw err;
    }
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader.isAssetError)(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component;
      let styleSheets;
      let props;
      const ssg404 = err.message === SSG_DATA_NOT_FOUND_ERROR;

      if (ssg404) {
        try {
          let mod;
          ({
            page: Component,
            styleSheets,
            mod
          } = await this.fetchComponent('/404')); // TODO: should we tolerate these props missing and still render the
          // page instead of falling back to _error?

          if (mod && mod.__N_SSG) {
            props = await this._getStaticData(this.pageLoader.getDataHref('/404', '/404', true, this.locale));
          }
        } catch (_err) {// non-fatal fallback to _error
        }
      }

      if (typeof Component === 'undefined' || typeof styleSheets === 'undefined') {
        ;
        ({
          page: Component,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component,
        styleSheets,
        err: ssg404 ? undefined : err,
        error: ssg404 ? undefined : err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, shallow = false) {
    try {
      const existingRouteInfo = this.components[route];

      if (shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (false) {}

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils.formatWithValidation)({
          pathname,
          query
        }), delBasePath(as), __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err) {
      return this.handleRouteInfoError(err, pathname, query, as);
    }
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }

  _resolveHref(parsedHref, pages, applyBasePath = true) {
    const {
      pathname
    } = parsedHref;
    const cleanPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _denormalizePagePath.denormalizePagePath)(applyBasePath ? delBasePath(pathname) : pathname));

    if (cleanPathname === '/404' || cleanPathname === '/_error') {
      return parsedHref;
    } // handle resolving href for dynamic routes


    if (!pages.includes(cleanPathname)) {
      // eslint-disable-next-line array-callback-return
      pages.some(page => {
        if ((0, _isDynamic.isDynamicRoute)(page) && (0, _routeRegex.getRouteRegex)(page).re.test(cleanPathname)) {
          parsedHref.pathname = applyBasePath ? addBasePath(page) : page;
          return true;
        }
      });
    }

    return parsedHref;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    parsed = this._resolveHref(parsed, pages, false);

    if (parsed.pathname !== pathname) {
      pathname = parsed.pathname;
      url = (0, _utils.formatWithValidation)(parsed);
    } // Prefetch is not supported in development mode because it would trigger on-demand-entries


    if (false) {}

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
    await Promise.all([this.pageLoader._isSsg(url).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, asPath, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if ( true && this.sdc[cacheKey]) {
      return Promise.resolve(this.sdc[cacheKey]);
    }

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    return fetchNextData(dataHref, this.isSsr);
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    return this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

/***/ }),

/***/ "fcRV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = escapePathDelimiters; // escape delimiters used by path-to-regexp

function escapePathDelimiters(segment) {
  return segment.replace(/[/#?]/g, char => encodeURIComponent(char));
}

/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _formatUrl = __webpack_require__("6D7l");
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (false) { var _App$prototype; } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (false) {}

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url) {
  if (false) {}

  return (0, _formatUrl.formatUrl)(url);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ "gguc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

/***/ }),

/***/ "gy8J":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("w8No");
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__);


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

const ButtonWrap = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("div", {
  target: "ehu8idy0",
  label: "ButtonWrap"
})(true ? {
  name: "1azakc",
  styles: "text-align:center"
} : undefined);

/* harmony default export */ __webpack_exports__["a"] = (ButtonWrap);

/***/ }),

/***/ "hS4m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseRelativeUrl = parseRelativeUrl;

var _utils = __webpack_require__("g/15");

var _querystring = __webpack_require__("3WeD");
/**
* Parses path-relative urls (e.g. `/hello/world?foo=bar`). If url isn't path-relative
* (e.g. `./hello`) then at least base must be.
* Absolute urls are rejected with one exception, in the browser, absolute urls that are on
* the current origin will be parsed as relative
*/


function parseRelativeUrl(url, base) {
  const globalBase = new URL(true ? 'http://n' : undefined);
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const {
    pathname,
    searchParams,
    search,
    hash,
    href,
    origin
  } = new URL(url, resolvedBase);

  if (origin !== globalBase.origin) {
    throw new Error('invariant: invalid relative URL');
  }

  return {
    pathname,
    query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length)
  };
}

/***/ }),

/***/ "hUgY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@emotion/styled/base"
var base_ = __webpack_require__("w8No");
var base_default = /*#__PURE__*/__webpack_require__.n(base_);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "core-js/stable"
var stable_ = __webpack_require__("og1N");

// EXTERNAL MODULE: external "regenerator-runtime/runtime"
var runtime_ = __webpack_require__("edCo");

// EXTERNAL MODULE: external "react-app-polyfill/ie9"
var ie9_ = __webpack_require__("PY3e");

// EXTERNAL MODULE: external "react-app-polyfill/stable"
var external_react_app_polyfill_stable_ = __webpack_require__("xoQe");

// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__("Kps4");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// CONCATENATED MODULE: ./src/styles/reset.css.ts
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }


const resetCss = true ? {
  name: "1u01txu",
  styles: "html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-family:\"Noto Sans KR\",\"Noto Sans JP\",-apple-system,BlinkMacSystemFont,\"Malgun Gothic\",\"\uB9D1\uC740 \uACE0\uB515\",helvetica,\"Apple SD Gothic Neo\",sans-serif;color:inherit;vertical-align:baseline;letter-spacing:-0.04em;font-weight:400;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}body{line-height:1;color:#252525;}ol,ul{list-style:none;}blockquote,q{quotes:none;}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none;}table{border-collapse:collapse;border-spacing:0;}a,a:hover,a:focus,a:active{color:inherit;text-decoration:none;outline:0;}input,textarea,select{border:1px solid #bbbbbb;padding:0 10px;font-size:14px;font-family:\"Noto Sans KR\",-apple-system,BlinkMacSystemFont,\"Malgun Gothic\",\"\uB9D1\uC740 \uACE0\uB515\",helvetica,\"Apple SD Gothic Neo\",sans-serif;color:inherit;-webkit-appearance:none;-webkit-border-radius:0;box-sizing:border-box;border-radius:5px;outline:0;}input::placeholder{color:#bbbbbb;font-size:14px;font-weight:400;}input[readonly]{background-color:#fafafa;}input[type=\"number\"]{-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;}input[type=\"number\"]::-webkit-inner-spin-button,input[type=\"number\"]::-webkit-outer-spin-button{-webkit-appearance:none;}input::-webkit-calendar-picker-indicator{display:none;}select{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding-right:20px;background:#fff url(/images/ico/ico_select.png) right 6px center no-repeat;}select::-ms-expand{display:none;}button{padding:0;border:0;background:none;border-radius:0;font-size:inherit;font-family:inherit;outline:0;cursor:pointer;}em{font-style:normal;}img{max-width:100%;}select{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding-right:20px;}select::-ms-expand{display:none;}address{font-style:normal;}th,td{vertical-align:middle;}caption{font-size:0;line-height:0;text-indent:-9999em;clip:rect(0 0 0 0);}.clearfix:after{content:\"\";display:block;clear:both;}.fl{float:left;}.fr{float:right;}.checkbox_basic input[type=\"checkbox\"]{display:none;width:0;height:0;}.checkbox_basic input[type=\"checkbox\"]+label{display:inline-block;font-weight:350;padding-left:21px;background:url(\"/images/btn/btn_checkbox_no.png\") left center no-repeat;cursor:pointer;}.checkbox_basic input[type=\"checkbox\"]:checked+label{background:url(\"/images/btn/btn_checkbox_yes.png\") left center no-repeat;}"
} : undefined;
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// EXTERNAL MODULE: external "mobx-react"
var external_mobx_react_ = __webpack_require__("sGQ9");

// EXTERNAL MODULE: ./src/config/index.ts
var config = __webpack_require__("LeJ0");

// EXTERNAL MODULE: ./src/utils/contants.ts
var contants = __webpack_require__("8LO8");

// EXTERNAL MODULE: external "universal-cookie"
var external_universal_cookie_ = __webpack_require__("RE4Q");
var external_universal_cookie_default = /*#__PURE__*/__webpack_require__.n(external_universal_cookie_);

// CONCATENATED MODULE: ./src/components/common/header/banner/index.tsx




function banner_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }



 //#region styled

const BannerWrap = base_default()("div", {
  target: "ezcp5j50",
  label: "BannerWrap"
})(true ? {
  name: "1737enn",
  styles: "position:relative;width:100%;height:90px;>span{display:block;width:100%;height:100%;background-position:center;background-repeat:no-repeat;}>button{position:absolute;top:50%;right:18px;transform:translateY(-50%);width:20px;height:20px;background:url(\"/images/btn/btn_close_20x20.png\") center no-repeat;}"
} : undefined); //#endregion


const HeaderBanner = ({
  bannerImage = "/images/common/top_banner.jpg"
}) => {
  const {
    0: isShow,
    1: setShow
  } = Object(external_react_["useState"])(new external_universal_cookie_default.a().get(contants["c" /* TOP_BANNER */]) !== contants["d" /* TOP_BANNER_SHOW */]);
  const backgroundImage = Object(external_react_["useMemo"])(() => `url(${bannerImage})`, [bannerImage]);
  const onCloseClick = Object(external_react_["useCallback"])(() => {
    // 하루동안 보지 않기
    new external_universal_cookie_default.a().set(contants["c" /* TOP_BANNER */], contants["d" /* TOP_BANNER_SHOW */], {
      maxAge: 3600 * 24
    });
    setShow(false);
  }, []);
  return isShow && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(BannerWrap, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
      style: {
        backgroundImage: backgroundImage
      }
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
      onClick: onCloseClick
    })]
  });
};

/* harmony default export */ var banner = (HeaderBanner);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./src/utils/date.util.ts
var date_util = __webpack_require__("+TTV");

// CONCATENATED MODULE: ./src/components/common/clock/index.tsx


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




const Clock = (_ref) => {
  let {
    format = "yyyy.MM.dd HH:mm:ss"
  } = _ref,
      props = _objectWithoutProperties(_ref, ["format"]);

  const {
    0: now,
    1: setNow
  } = Object(external_react_["useState"])();
  Object(external_react_["useEffect"])(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", _objectSpread(_objectSpread({}, props), {}, {
    children: now && date_util["a" /* DateUtil */].format(now, format)
  }));
};

/* harmony default export */ var clock = (Clock);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// CONCATENATED MODULE: ./src/components/common/header/button/index.tsx



function button_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }




const ButtonWrap = base_default()("a", {
  target: "e15ydubl0",
  label: "ButtonWrap"
})(true ? {
  name: "v9c5lr",
  styles: "position:relative;display:inline-block;width:38px;height:36px;line-height:36px;font-size:0;text-align:center;cursor:pointer;>img{display:inline-block;margin:0 auto;vertical-align:middle;}"
} : undefined);

const HeaderButton = ({
  base,
  on,
  alt,
  link,
  onClick,
  className,
  isActive: _isActive
}) => {
  const router = Object(router_["useRouter"])();
  const {
    0: isActive,
    1: setActive
  } = Object(external_react_["useState"])(_isActive);
  const buttonClick = Object(external_react_["useCallback"])(() => {
    if (link) {
      router.push(link);
    } else if (onClick) {
      onClick();
    }
  }, [isActive, onClick]);
  Object(external_react_["useEffect"])(() => {
    if (link) {
      setActive(router.pathname === link);
    }
  }, [router.pathname]);
  Object(external_react_["useEffect"])(() => {
    if (typeof _isActive !== "undefined") {
      setActive(_isActive);
    }
  }, [_isActive]);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(ButtonWrap, {
    onClick: buttonClick,
    className: className,
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
      src: isActive ? on : base,
      alt: alt
    })
  });
};

/* harmony default export */ var header_button = (HeaderButton);
// EXTERNAL MODULE: ./src/components/common/button/index.tsx
var common_button = __webpack_require__("IX1n");

// EXTERNAL MODULE: ./src/components/mypage/form/index.tsx
var mypage_form = __webpack_require__("i5Xc");

// EXTERNAL MODULE: ./src/utils/network.util.ts
var network_util = __webpack_require__("0Pz+");

// CONCATENATED MODULE: ./src/components/notification/AlrmIcon.tsx



const getBackgroudImage = type => {
  switch (type) {
    case "NEW_EVENT":
      return "/images/ico/ico_alarm_type01.png";

    case "INVITE_CALENDAR":
      return "/images/ico/ico_alarm_type02.png";

    case "LEAVE_GROUP":
      return "/images/ico/ico_alarm_type03.png";

    case "EVENT_ALRM":
      return "/images/ico/ico_alarm_type04.png";
  }
};

const IconWrap = base_default()("div", {
  target: "eecjchb0",
  label: "IconWrap"
})("width:35px;text-align:right;>span{display:inline-block;width:15px;height:17px;margin-top:4px;vertical-align:top;background-position:center top;background-repeat:no-repeat;background-image:url(\"", ({
  type
}) => getBackgroudImage(type), "\");}" + (true ? "" : undefined));

const AlrmIcon = ({
  type
}) => {
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(IconWrap, {
    type: type,
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {})
  });
};

/* harmony default export */ var notification_AlrmIcon = (AlrmIcon);
// CONCATENATED MODULE: ./src/components/notification/index.tsx




function notification_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }








const PopWrap = base_default()("div", {
  target: "e3oer0d6",
  label: "PopWrap"
})(true ? {
  name: "1x8r5oe",
  styles: "z-index:9;position:absolute;width:360px;height:624px;top:40px;right:40px;background:#fff;box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.27);border-radius:10px;overflow:hidden;z-index:9"
} : undefined);

const PopTopWrap = base_default()("div", {
  target: "e3oer0d5",
  label: "PopTopWrap"
})(true ? {
  name: "1a2htau",
  styles: "position:relative;background-color:#454545;padding:0 19px;box-sizing:border-box;display:flex;justify-content:space-between;p{font-size:18px;font-weight:500;color:#ffffff;line-height:62px;+p{font-size:15px;font-weight:400;}}"
} : undefined);

const PopMain = base_default()("div", {
  target: "e3oer0d4",
  label: "PopMain"
})(true ? {
  name: "1250nmi",
  styles: "height:calc(100% - 62px)"
} : undefined);

const AlrmListWrap = base_default()("div", {
  target: "e3oer0d3",
  label: "AlrmListWrap"
})(true ? {
  name: "14a8e27",
  styles: "height:100%;overflow-y:scroll"
} : undefined);

const AlrmButtonWrap = base_default()("div", {
  target: "e3oer0d2",
  label: "AlrmButtonWrap"
})(true ? {
  name: "d5ctmy",
  styles: "margin-top:10px;>button{width:60px;height:24px;border-radius:2px;font-size:12px;+button{margin-left:7px;}}"
} : undefined);

const AlrmItem = base_default()("li", {
  target: "e3oer0d1",
  label: "AlrmItem"
})(true ? {
  name: "1blztcg",
  styles: "padding:20px 0;box-sizing:border-box;border-bottom:1px solid #f1f1f1;box-sizing:border-box;display:flex;width:100%;>article{width:calc(100% - 40px);padding:0 30px 0 10px;box-sizing:border-box;>p{font-size:16px;color:#454545;line-height:1.25;>strong{font-weight:500;color:#252525;}}>span{display:block;margin-top:5px;font-size:13px;color:#999999;}}"
} : undefined);

const NewIcon = base_default()("span", {
  target: "e3oer0d0",
  label: "NewIcon"
})(true ? {
  name: "7hrjjv",
  styles: "&:before{content:\" ( NEW )\";color:#f03e3e;font-weight:bold;}"
} : undefined);

const NotificationPop = ({
  newAlrms = [],
  onSave = async () => {}
}) => {
  const {
    0: readAlrms,
    1: setReadAlrms
  } = Object(external_react_["useState"])([]);
  const alrms = Object(external_react_["useMemo"])(() => [...newAlrms, ...readAlrms], [newAlrms, readAlrms]);
  const initAlrms = Object(external_react_["useCallback"])(async () => {
    const {
      data
    } = await network_util["a" /* axios */].get("/alrm?isReadYn=Y");
    await network_util["a" /* axios */].put("/alrm/read");
    setReadAlrms(data);
  }, []);
  Object(external_react_["useEffect"])(() => {
    initAlrms();
  }, [newAlrms]);
  const onInviteButtonClick = Object(external_react_["useCallback"])(async e => {
    const inviteYn = e.currentTarget.dataset.inviteYn;
    const {
      id
    } = e.currentTarget.parentElement.dataset;
    await network_util["a" /* axios */].put("/diary/calendar/invite", {
      calendarId: id,
      inviteYn
    });
    await network_util["a" /* axios */].delete(`/alrm/invite/${id}`);
    alert("처리되었습니다.");
    await onSave();
    await initAlrms();
  }, []);
  const AlrmList = Object(external_react_["useMemo"])(() => alrms.map(({
    alrmId,
    note,
    sendDt,
    readDt,
    dataId,
    type
  }, idx) => /*#__PURE__*/Object(jsx_runtime_["jsxs"])(AlrmItem, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(notification_AlrmIcon, {
      type: type
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("article", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
        dangerouslySetInnerHTML: {
          __html: note
        }
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
        children: [date_util["a" /* DateUtil */].formatLocale(new Date(sendDt)), !readDt && /*#__PURE__*/Object(jsx_runtime_["jsx"])(NewIcon, {})]
      }), type === "INVITE_CALENDAR" && dataId && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(AlrmButtonWrap, {
        "data-id": dataId,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(common_button["a" /* BlueButton */], {
          "data-invite-yn": "Y",
          onClick: onInviteButtonClick,
          children: "\uC218\uB77D"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(mypage_form["b" /* FormButtonBasic */], {
          "data-invite-yn": "N",
          onClick: onInviteButtonClick,
          children: "\uAC70\uC808"
        })]
      })]
    })]
  }, `new-alrm-key-${idx}`)), [alrms]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(PopWrap, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(PopTopWrap, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
        children: "\uC54C\uB9BC"
      }), (newAlrms === null || newAlrms === void 0 ? void 0 : newAlrms.length) > 0 && /*#__PURE__*/Object(jsx_runtime_["jsxs"])("p", {
        children: ["\uC0C8\uC54C\uB9BC ", newAlrms.length]
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(PopMain, {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(AlrmListWrap, {
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("ul", {
          children: AlrmList
        })
      })
    })]
  });
};

/* harmony default export */ var notification = (NotificationPop);
// CONCATENATED MODULE: ./src/hooks/useToggle.ts


const useToggle = (initVal = false) => {
  const {
    0: isVal,
    1: setVal
  } = Object(external_react_["useState"])(initVal);
  const toggle = Object(external_react_["useCallback"])(() => {
    setVal(!isVal);
  }, [isVal]);
  return [isVal, toggle];
};

/* harmony default export */ var hooks_useToggle = (useToggle);
// EXTERNAL MODULE: external "swr"
var external_swr_ = __webpack_require__("aYjl");
var external_swr_default = /*#__PURE__*/__webpack_require__.n(external_swr_);

// CONCATENATED MODULE: ./src/components/common/header/notification/index.tsx





function header_notification_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }









const onCss = true ? {
  name: "1kf3jsr",
  styles: "&:after{position:absolute;top:8px;right:8px;content:\"\";display:block;width:9px;height:9px;border-radius:50%;background-color:#d44040;}"
} : undefined;

const NotificationClose = base_default()("div", {
  target: "eoedzyd1",
  label: "NotificationClose"
})(true ? {
  name: "dihyl",
  styles: "position:fixed;top:0;right:0;left:0;bottom:0;width:100%;height:100%;background-color:transparent;z-index:8"
} : undefined);

const Alrm = /*#__PURE__*/base_default()(header_button, {
  target: "eoedzyd0",
  label: "Alrm"
})(props => props.isOn && onCss, ";" + (true ? "" : undefined));

const Notification = () => {
  const router = Object(router_["useRouter"])();
  const {
    data: newAlrms,
    error,
    mutate
  } = external_swr_default()("/alrm?isReadYn=N", network_util["b" /* axiosFetcher */]);
  const [isAlrmContainer, toggleAlrmContainer] = hooks_useToggle(false);
  const onSave = Object(external_react_["useCallback"])(async () => {
    await mutate();
  }, [mutate]);
  Object(external_react_["useEffect"])(() => {
    if (error) {
      if (error.status) {
        var _error$response;

        if (((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 403) {
          router.reload();
        } else {
          alert(error);
        }
      }
    }
  }, [error]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Alrm, {
      base: "/images/ico/ico_alarm.png",
      on: "/images/ico/ico_alarm_on.png",
      alt: "\uC54C\uB9BC",
      isActive: isAlrmContainer,
      onClick: toggleAlrmContainer,
      isOn: (newAlrms === null || newAlrms === void 0 ? void 0 : newAlrms.length) > 0
    }), isAlrmContainer && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(notification, {
        newAlrms: newAlrms,
        onSave: onSave
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(NotificationClose, {
        onClick: toggleAlrmContainer
      })]
    })]
  });
};

/* harmony default export */ var header_notification = (Notification);
// EXTERNAL MODULE: ./src/stores/index.ts + 2 modules
var stores = __webpack_require__("XFcN");

// EXTERNAL MODULE: external "mobx"
var external_mobx_ = __webpack_require__("VBo9");

// EXTERNAL MODULE: external "react-hook-form/dist/index.ie11"
var index_ie11_ = __webpack_require__("sPuw");

// CONCATENATED MODULE: ./src/components/contact/ContactItem.tsx





function ContactItem_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function ContactItem_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ContactItem_ownKeys(Object(source), true).forEach(function (key) { ContactItem_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ContactItem_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ContactItem_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ContactItem_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }



 //#region styled

const Name = base_default()("td", {
  target: "ec976dj9",
  label: "Name"
})(true ? {
  name: "ykv55g",
  styles: "color:#454545;font-weight:bold;letter-spacing:-0.04em"
} : undefined);

const Phone = base_default()("td", {
  target: "ec976dj8",
  label: "Phone"
})(true ? {
  name: "1flj9lk",
  styles: "text-align:left"
} : undefined);

const Check = base_default()("td", {
  target: "ec976dj7",
  label: "Check"
})(true ? {
  name: "1e7aljt",
  styles: "border-left:none!important;input[type=\"checkbox\"]{display:none;+label{display:inline-block;width:14px;height:14px;padding:0;margin:0;border:1px solid #dbdbdb;border-radius:5px;overflow:hidden;cursor:pointer;}&:checked+label{background:url(\"/images/ico/ico_checked.png\") center no-repeat;}}"
} : undefined);

const Mark = base_default()("td", {
  target: "ec976dj6",
  label: "Mark"
})(true ? {
  name: "17proft",
  styles: "input[type=\"checkbox\"]{display:none;width:0;height:0;+label{display:inline-block;width:14px;height:14px;background:url(\"/images/ico/ico_star_off.png\") center no-repeat;}&:checked+label{background:url(\"/images/ico/ico_star_on.png\") center no-repeat;}}"
} : undefined);

const MemoWrap = base_default()("tr", {
  target: "ec976dj5",
  label: "MemoWrap"
})(true ? {
  name: "16onadh",
  styles: "background-color:#fafafa;>td{padding:8px 0!important;border-left:none!important;}textarea{width:420px;height:72px;background-color:#fff;border:1px solid #dbdbdb;line-height:1.6;border-radius:5px;padding:10px;box-sizing:border-box;resize:none;overflow:hidden;float:left;}button{width:80px;height:72px;color:#fff;background-color:#177efb;border-radius:5px;font-size:14px;color:#fff;+button{margin-left:10px;background-color:#fff;color:#333;border:1px solid #757575;}}"
} : undefined);

const Input = base_default()("input", {
  target: "ec976dj4",
  label: "Input"
})("width:100%;font-size:12px;", props => !props.isShow && "display: none;", ";" + (true ? "" : undefined));

const ModifyBox = base_default()("div", {
  target: "ec976dj3",
  label: "ModifyBox"
})(true ? {
  name: "17q2oc5",
  styles: "position:absolute;top:50%;right:10px;transform:translateY(-50%);>button{width:18px;height:18px;border:1px solid #dbdbdb;border-radius:5px;background-size:auto;background-position:center;background-repeat:no-repeat;}"
} : undefined);

const Email = base_default()("td", {
  target: "ec976dj2",
  label: "Email"
})(true ? {
  name: "1flj9lk",
  styles: "text-align:left"
} : undefined);

const AddButton = base_default()("button", {
  target: "ec976dj1",
  label: "AddButton"
})(true ? {
  name: "u3zidn",
  styles: "margin-left:3px;background-image:url(\"/images/ico/ico_plus.png\")"
} : undefined);

const MinusButton = base_default()("button", {
  target: "ec976dj0",
  label: "MinusButton"
})(true ? {
  name: "j8npbv",
  styles: "background-image:url(\"/images/ico/ico_minus.png\")"
} : undefined); //#endregion


const ContactItem = ({
  name,
  favorYn,
  telId,
  memo,
  infos,
  onSaveClick: _onSaveClick,
  onCancelClick
}) => {
  const [isShow, showToggle] = hooks_useToggle(!telId);
  const {
    register,
    control,
    reset,
    getValues
  } = Object(index_ie11_["useForm"])({
    defaultValues: {
      favorYn: favorYn === "Y" ? "Y" : "",
      name,
      memo,
      infos: infos.map(({
        tel,
        fax,
        email
      }) => ({
        tel,
        fax,
        email
      }))
    }
  });
  const {
    fields,
    append,
    remove
  } = Object(index_ie11_["useFieldArray"])({
    control,
    name: "infos"
  });
  const onResetClick = Object(external_react_["useCallback"])(async () => {
    if (telId) {
      reset();
      showToggle();
    } else {
      onCancelClick({
        name,
        favorYn,
        telId,
        memo,
        infos
      });
    }
  }, [isShow]);
  const onSaveClick = Object(external_react_["useCallback"])(() => {
    const {
      name,
      favorYn,
      infos,
      memo
    } = getValues();

    if (!(name === null || name === void 0 ? void 0 : name.trim())) {
      alert("이름을 입력해주세요.");
      return;
    }

    const filterInfos = infos === null || infos === void 0 ? void 0 : infos.filter(({
      tel,
      fax,
      email
    }) => (tel === null || tel === void 0 ? void 0 : tel.trim()) || (fax === null || fax === void 0 ? void 0 : fax.trim()) || (email === null || email === void 0 ? void 0 : email.trim()));

    if ((filterInfos === null || filterInfos === void 0 ? void 0 : filterInfos.length) < 1) {
      alert("연락처 정보가 한건이라도 있어야 저장가능합니다.");
      return;
    }

    _onSaveClick({
      telId,
      name,
      memo,
      favorYn: favorYn ? "Y" : "N",
      infos: filterInfos.map((info, idx) => ContactItem_objectSpread(ContactItem_objectSpread({}, info), {}, {
        orded: idx
      }))
    });

    showToggle();
  }, [isShow]);
  const checkBoxRef = Object(external_react_["useRef"])();
  const checkContact = Object(external_react_["useCallback"])(e => {
    checkBoxRef.current.checked = !checkBoxRef.current.checked;
    e.stopPropagation();
  }, [checkBoxRef]);
  return fields.length > 0 && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
    children: [fields.map((field, idx) => /*#__PURE__*/Object(jsx_runtime_["jsxs"])("tr", {
      onClick: !isShow ? showToggle : () => {},
      children: [idx === 0 && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(Check, {
          rowSpan: fields.length,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
            ref: checkBoxRef,
            type: "checkbox",
            value: telId,
            className: "contact_tel_id"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
            onClick: checkContact
          })]
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Mark, {
          rowSpan: fields.length,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
            type: "checkbox",
            id: `${telId}-favor`,
            name: "favorYn",
            ref: register
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
            htmlFor: `${telId}-favor`
          })]
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Name, {
          rowSpan: fields.length,
          children: [!isShow && name, /*#__PURE__*/Object(jsx_runtime_["jsx"])(Input, {
            isShow: isShow,
            name: "name",
            ref: register
          })]
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Phone, {
        children: [!isShow && field.tel, /*#__PURE__*/Object(jsx_runtime_["jsx"])(Input, {
          isShow: isShow,
          name: `infos[${idx}].tel`,
          ref: register(),
          defaultValue: fields[idx].tel
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("td", {
        children: [!isShow && field.fax, /*#__PURE__*/Object(jsx_runtime_["jsx"])(Input, {
          isShow: isShow,
          name: `infos[${idx}].fax`,
          ref: register(),
          defaultValue: fields[idx].fax
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Email, {
        children: [!isShow && field.email, /*#__PURE__*/Object(jsx_runtime_["jsx"])(Input, {
          isShow: isShow,
          name: `infos[${idx}].email`,
          ref: register(),
          style: {
            width: "140px"
          },
          defaultValue: fields[idx].email
        }), isShow && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(ModifyBox, {
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(MinusButton, {
            onClick: () => {
              remove(idx);
            }
          }), idx + 1 === fields.length && /*#__PURE__*/Object(jsx_runtime_["jsx"])(AddButton, {
            onClick: () => {
              if (fields.length < 10) {
                append({
                  tel: "",
                  fax: "",
                  email: ""
                });
              } else {
                alert("최대 10개까지 등록가능합니다");
              }
            }
          })]
        })]
      })]
    }, `contact-infos-${idx}-${telId}`)), isShow && /*#__PURE__*/Object(jsx_runtime_["jsx"])(MemoWrap, {
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("td", {
        colSpan: 6,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("textarea", {
          ref: register,
          name: "memo"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
          onClick: onSaveClick,
          children: "\uC800\uC7A5"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
          onClick: onResetClick,
          children: "\uCDE8\uC18C"
        })]
      })
    })]
  });
};

/* harmony default export */ var contact_ContactItem = (ContactItem);
// CONCATENATED MODULE: ./src/components/contact/ContactPaging.tsx





function ContactPaging_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }



const activeCss = true ? {
  name: "15xdyk0",
  styles: "a{color:#177efb;&:after{position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);content:\"\";display:block;width:6px;border-bottom:1px solid #177efb;}}"
} : undefined;

const ContactPagingWrap = base_default()("div", {
  target: "e1tz44yx1",
  label: "ContactPagingWrap"
})(true ? {
  name: "lgt36b",
  styles: "text-align:center;padding-top:5px"
} : undefined);

const PagingItem = base_default()("li", {
  target: "e1tz44yx0",
  label: "PagingItem"
})("display:inline-block;vertical-align:middle;a{position:relative;display:block;font-size:14px;color:#a9a9a9;padding:5px;letter-spacing:-0.02em;cursor:pointer;img{display:inline-block;vertical-align:bottom;}}", props => props.isActive && activeCss, ";" + (true ? "" : undefined));

const ContactPaging = ({
  total,
  page,
  onClick
}) => {
  const lastPage = Object(external_react_["useMemo"])(() => Math.ceil(total / 10), [total]);
  const pages = Object(external_react_["useMemo"])(() => {
    const pagings = [];
    const firstPage = page < 5 ? 1 : page % 5 + 1;

    for (let i = firstPage; i <= lastPage && i < firstPage + 5; i++) {
      pagings.push(i);
    }

    return pagings;
  }, [page, lastPage]);
  const isBeforeButtons = Object(external_react_["useMemo"])(() => page > 5, [page]);
  const isAfterButtons = Object(external_react_["useMemo"])(() => pages[0] + 4 < lastPage, [pages[0], lastPage]);
  const onPageClick = Object(external_react_["useCallback"])(e => {
    const page = Number(e.currentTarget.dataset.page);
    onClick(page);
  }, []);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(ContactPagingWrap, {
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("ul", {
      children: [isBeforeButtons && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(PagingItem, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            "data-page": 1,
            onClick: onPageClick,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
              src: "/images/btn/btn_pager_first.png",
              alt: "\uCC98\uC74C\uC73C\uB85C"
            })
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(PagingItem, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            "data-page": pages[0] - 1,
            onClick: onPageClick,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
              src: "/images/btn/btn_pager_prev.png",
              alt: "\uC774\uC804\uC73C\uB85C"
            })
          })
        })]
      }), pages.map(pagingNumber => /*#__PURE__*/Object(jsx_runtime_["jsx"])(PagingItem, {
        isActive: pagingNumber === page,
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
          "data-page": pagingNumber,
          onClick: page === pagingNumber ? () => {} : onPageClick,
          children: pagingNumber
        })
      }, `contact-paging-${pagingNumber}`)), isAfterButtons && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(PagingItem, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            "data-page": pages[0] + 5,
            onClick: onPageClick,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
              src: "/images/btn/btn_pager_next.png",
              alt: "\uB2E4\uC74C\uC73C\uB85C"
            })
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(PagingItem, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            "data-page": lastPage,
            onClick: onPageClick,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
              src: "/images/btn/btn_pager_last.png",
              alt: "\uB9C8\uC9C0\uB9C9\uC73C\uB85C"
            })
          })
        })]
      })]
    })
  });
};

/* harmony default export */ var contact_ContactPaging = (ContactPaging);
// CONCATENATED MODULE: ./src/components/contact/index.tsx





function contact_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function contact_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { contact_ownKeys(Object(source), true).forEach(function (key) { contact_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { contact_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function contact_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function contact_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }




 //#region styled

const ContactPopWrap = base_default()("div", {
  target: "e1nfsorh9",
  label: "ContactPopWrap"
})(true ? {
  name: "ofdpgv",
  styles: "position:absolute;width:660px;height:620px;top:50px;right:30px;background:#fff;box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.27);border-radius:10px;overflow:hidden;z-index:9"
} : undefined);

const PopTop = base_default()("div", {
  target: "e1nfsorh8",
  label: "PopTop"
})(true ? {
  name: "rhy29w",
  styles: "position:relative;background-color:#454545;padding:0 19px;box-sizing:border-box;>p{font-size:18px;font-weight:500;color:#ffffff;line-height:62px;}>button{position:absolute;top:50%;right:18px;transform:translateY(-50%);width:16px;height:16px;background:url(\"/images/btn/btn_close_white_16x16.png\") center no-repeat;}"
} : undefined);

const InputWrap = base_default()("div", {
  target: "e1nfsorh7",
  label: "InputWrap"
})(true ? "" : undefined);

const RefreshButton = base_default()("button", {
  target: "e1nfsorh6",
  label: "RefreshButton"
})(true ? {
  name: "3teyc",
  styles: "display:inline-block;width:32px;height:32px;background:#fff url(\"/images/btn/btn_reset.png\") center no-repeat;background-size:18px 21px;margin-left:7px;border:1px solid #dbdbdb;border-radius:5px;overflow:hidden;vertical-align:top"
} : undefined);

const SearchWrap = base_default()("div", {
  target: "e1nfsorh5",
  label: "SearchWrap"
})("width:100%;height:56px;padding:10px 20px 14px;background-color:#f9f9f9;box-sizing:border-box;border-bottom:1px solid #dbdbdb;display:flex;justify-content:space-between;", InputWrap, "{display:inline-block;position:relative;input{height:32px;border-radius:5px;border:1px solid #dbdbdb;+button{position:absolute;top:0;right:3px;width:32px;height:32px;background:url(\"/images/ico/ico_search_black_18x18.png\") center no-repeat;background-size:18px;}}}" + (true ? "" : undefined));

const ButtonBox = base_default()("div", {
  target: "e1nfsorh4",
  label: "ButtonBox"
})(true ? {
  name: "1mdp0at",
  styles: "button{width:80px;height:32px;border-radius:2px;font-size:14px;}"
} : undefined);

const AddBtn = base_default()("button", {
  target: "e1nfsorh3",
  label: "AddBtn"
})(true ? {
  name: "ejemuo",
  styles: "border:1px solid #177efb;background-color:#177efb;color:#ffffff"
} : undefined);

const RemoveButton = base_default()("button", {
  target: "e1nfsorh2",
  label: "RemoveButton"
})(true ? {
  name: "1dmkda7",
  styles: "border:1px solid #757575;color:#454545;margin-left:7px"
} : undefined);

const ContactWrap = base_default()("div", {
  target: "e1nfsorh1",
  label: "ContactWrap"
})(true ? {
  name: "1erjgm8",
  styles: "padding-top:10px;box-sizing:border-box"
} : undefined);

const ContactListWrap = base_default()("div", {
  target: "e1nfsorh0",
  label: "ContactListWrap"
})(true ? {
  name: "u9vlan",
  styles: "position:relative;height:440px;width:100%;padding:0 20px;box-sizing:border-box;overflow-y:auto;table{width:100%;position:relative;text-align:center;table-layout:fixed;margin:0 auto;&:after{position:absolute;content:\"\";display:block;width:100%;top:0;border-top:1px solid #454545;z-index:1;}tr{border-bottom:1px solid #eee;}thead th{height:35px;font-size:14px;font-weight:500;color:#252525;background-color:#fafafa;border-left:1px solid #dbdbdb;box-sizing:border-box;&:first-of-type{border-left:none;}input[type=\"checkbox\"]{display:none;+label{display:inline-block;width:14px;height:14px;padding:0;margin:0;border:1px solid #dbdbdb;border-radius:5px;overflow:hidden;cursor:pointer;}&:checked+label{background:url(\"/images/ico/ico_checked.png\") center no-repeat;}}}tbody td{position:relative;font-family:\"dotum\",tahoma,\"MalgunGothic\",\"Verdana\",\"Arial\",\"Helvetica\",sans-serif;font-size:12px;color:#454545;letter-spacing:0;height:30px;padding:0px 5px;border-left:1px solid #dbdbdb;box-sizing:border-box;}}"
} : undefined); //#endregion


const ContactPopupContainer = ({
  isShow = false,
  onClose = () => {}
}) => {
  const {
    0: pagingData,
    1: setPagingData
  } = Object(external_react_["useState"])({
    page: 0,
    total: 0
  });
  const {
    0: contactList,
    1: setContactList
  } = Object(external_react_["useState"])([]);
  const searchRef = Object(external_react_["useRef"])();
  const getContactData = Object(external_react_["useCallback"])(async (page = 1, name = "") => {
    const {
      data: {
        page: currentPage,
        total,
        contacts
      }
    } = await network_util["a" /* axios */].get(`/contact/${page}${name ? `?name=${name}` : ""}`);
    setPagingData({
      page: currentPage,
      total
    });
    setContactList(contacts);
  }, []);
  Object(external_react_["useEffect"])(() => {
    getContactData(1);
  }, []);
  const onAddClick = Object(external_react_["useCallback"])(() => {
    if (contactList.findIndex(({
      telId
    }) => typeof telId === "undefined") > -1) {
      alert("현재 추가 진행 중입니다.");
      return;
    }

    setContactList([{
      favorYn: "N",
      name: "",
      memo: "",
      infos: [{
        orded: 0
      }]
    }, ...contactList]);
  }, [contactList]);
  const onSaveClick = Object(external_react_["useCallback"])(async contact => {
    if (!contact.telId) {
      await network_util["a" /* axios */].post("/contact", contact);
    } else {
      await network_util["a" /* axios */].put("/contact", contact);
    }

    alert("저장되었습니다.");
    setContactList([]);
    getContactData(1);
  }, []);
  const onCancelClick = Object(external_react_["useCallback"])(contact => {
    if (!contact.telId) {
      setContactList([...contactList].splice(1));
    }
  }, [contactList]);
  const onDeleteClick = Object(external_react_["useCallback"])(async () => {
    const telIdChecks = document.querySelectorAll(".contact_tel_id:checked");
    const telIds = [];
    telIdChecks.forEach(telId => {
      telIds.push(telId.value);
    });
    await network_util["a" /* axios */].post("/contact/delete", {
      telIds
    });
    alert("삭제되었습니다.");
    setContactList([]);
    getContactData(1);
  }, []);
  const onSearchClick = Object(external_react_["useCallback"])(() => {
    const name = searchRef.current.value.trim();

    if (!name) {
      alert("검색하실 이름을 입력해주세요.");
      return;
    }

    getContactData(1, name);
  }, [searchRef]);
  const onRefreshClick = Object(external_react_["useCallback"])(() => {
    searchRef.current.value = "";
    getContactData(1);
  }, [searchRef]);
  const allCheckEvent = Object(external_react_["useCallback"])(e => {
    const telIdChecks = document.querySelectorAll(".contact_tel_id");
    telIdChecks.forEach(telIdCheck => telIdCheck.checked = e.currentTarget.checked);
  }, []);
  const movePageClick = Object(external_react_["useCallback"])(page => {
    const name = searchRef.current.value.trim();
    getContactData(page, name ? name : null);
  }, [searchRef]);
  const ContactItemList = Object(external_react_["useMemo"])(() => contactList.map(contact => /*#__PURE__*/Object(external_react_["createElement"])(contact_ContactItem, contact_objectSpread(contact_objectSpread({}, contact), {}, {
    key: `contact-item-key-${contact.telId}`,
    onSaveClick: onSaveClick,
    onCancelClick: onCancelClick
  }))), [contactList]);
  return isShow && /*#__PURE__*/Object(jsx_runtime_["jsx"])(ContactPopWrap, {
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(PopTop, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
          children: "\uC5F0\uB77D\uCC98 \uAD00\uB9AC"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
          type: "button",
          onClick: onClose
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(SearchWrap, {
          children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
            children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(InputWrap, {
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                type: "text",
                ref: searchRef,
                placeholder: "이름 검색"
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
                type: "button",
                onClick: onSearchClick
              })]
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(RefreshButton, {
              onClick: onRefreshClick
            })]
          }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(ButtonBox, {
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(AddBtn, {
              type: "button",
              onClick: onAddClick,
              children: "\uCD94\uAC00"
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(RemoveButton, {
              type: "button",
              onClick: onDeleteClick,
              children: "\uC81C\uAC70"
            })]
          })]
        })
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(ContactWrap, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(ContactListWrap, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("table", {
            children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("colgroup", {
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
                width: "30px"
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
                width: "30px"
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
                width: "120px"
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
                width: "120px"
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
                width: "120px"
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
                width: "*"
              })]
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("thead", {
              children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("tr", {
                children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("th", {
                  children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                    type: "checkbox",
                    id: "checkAll",
                    onClick: allCheckEvent
                  }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
                    htmlFor: "checkAll"
                  })]
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
                  children: "\uC774\uB984"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
                  children: "\uC5F0\uB77D\uCC98"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
                  children: "\uD329\uC2A4"
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
                  children: "\uC774\uBA54\uC77C"
                })]
              })
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("tbody", {
              children: ContactItemList
            })]
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(contact_ContactPaging, {
          page: pagingData.page,
          total: pagingData.total,
          onClick: movePageClick
        })]
      })]
    })
  });
};

/* harmony default export */ var components_contact = (ContactPopupContainer);
// CONCATENATED MODULE: ./src/components/common/header/index.tsx





function header_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }












 //#region styled

const HeaderWrap = base_default()("header", {
  target: "ew187728",
  label: "HeaderWrap"
})(true ? {
  name: "bjn8wh",
  styles: "position:relative"
} : undefined);

const header_Clock = /*#__PURE__*/base_default()(clock, {
  target: "ew187727",
  label: "Clock"
})(true ? {
  name: "ny2lee",
  styles: "font-size:14px;color:#999999"
} : undefined);

const HeaderTop = base_default()("div", {
  target: "ew187726",
  label: "HeaderTop"
})(true ? {
  name: "pchqtr",
  styles: "position:relative;width:100%;height:60px;background-color:#fafafa;border-bottom:1px solid #eeeeee;box-sizing:border-box;display:flex;align-items:center;>h1{display:inline-block;margin:0 17px 0 20px;vertical-align:middle;}"
} : undefined);

const HeaderLeft = base_default()("div", {
  target: "ew187725",
  label: "HeaderLeft"
})(true ? {
  name: "1w3n8av",
  styles: "position:relative;display:flex;align-items:cetner"
} : undefined);

const HeaderRight = base_default()("div", {
  target: "ew187724",
  label: "HeaderRight"
})(true ? {
  name: "1jwmz52",
  styles: "position:relative;display:flex;align-items:cetner;margin-left:auto"
} : undefined);

const Logo = base_default()("h1", {
  target: "ew187723",
  label: "Logo"
})(true ? {
  name: "2jbd2c",
  styles: "display:flex;margin:0 17px 0 20px;align-items:center;cursor:pointer"
} : undefined);

const ClockWrap = base_default()("div", {
  target: "ew187722",
  label: "ClockWrap"
})(true ? {
  name: "s5xdrg",
  styles: "display:flex;align-items:center"
} : undefined);

const SignOutBox = base_default()("div", {
  target: "ew187721",
  label: "SignOutBox"
})(true ? {
  name: "18w2zic",
  styles: "display:flex;align-items:center;margin-right:13px;margin-left:5px;>a{font-size:14px;color:252525;cursor:pointer;+a{margin-left:16px;color:#757575;}}"
} : undefined);

const SignInBox = base_default()("div", {
  target: "ew187720",
  label: "SignInBox"
})(true ? {
  name: "gnrwkp",
  styles: "display:inline-block;vertical-align:middle;margin-right:6px"
} : undefined); //#endregion


const Header = () => {
  const router = Object(router_["useRouter"])();
  const [isShowContact, toggleContact] = hooks_useToggle();
  const onLogoutClick = Object(external_react_["useCallback"])(async () => {
    await Object(external_mobx_["flowResult"])(stores["a" /* default */].authStore.userSignOut());
    router.reload();
  }, []);
  const buttons = Object(external_react_["useMemo"])(() => {
    if (stores["a" /* default */].commonStore.isLoggedIn) {
      return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(SignInBox, {
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(header_button, {
            base: "/images/ico/ico_call.png",
            on: "/images/ico/ico_call_on.png",
            alt: "\uC5F0\uB77D\uCC98 \uAD00\uB9AC",
            isActive: isShowContact,
            onClick: toggleContact
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(header_button, {
            base: "/images/ico/ico_mypage.png",
            on: "/images/ico/ico_mypage_on.png",
            alt: "\uB9C8\uC774\uD398\uC774\uC9C0",
            link: "/user/me"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(header_button, {
            base: "/images/ico/ico_setting.png",
            on: "/images/ico/ico_setting_on.png",
            alt: "\uD658\uACBD\uC124\uC815",
            link: "/calendar/setting"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(header_notification, {})]
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(SignOutBox, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            onClick: onLogoutClick,
            children: "\uB85C\uADF8\uC544\uC6C3"
          })
        })]
      });
    } else {
      return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(SignOutBox, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
          href: "/user/signUp",
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            children: "\uD68C\uC6D0\uAC00\uC785"
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
          href: "/signIn",
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("a", {
            children: "\uB85C\uADF8\uC778"
          })
        })]
      });
    }
  }, [stores["a" /* default */].commonStore.isLoggedIn, router.pathname, isShowContact, toggleContact]);
  const onClickLogo = Object(external_react_["useCallback"])(() => {
    router.push("/");
  }, [router]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(HeaderWrap, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(banner, {}), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(HeaderTop, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(HeaderLeft, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Logo, {
          onClick: onClickLogo,
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
            src: "/images/logo.png",
            alt: "KMEMO \uB85C\uACE0"
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(ClockWrap, {
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(header_Clock, {})
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(HeaderRight, {
        children: buttons
      }), isShowContact && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_contact, {
        isShow: isShowContact,
        onClose: toggleContact
      })]
    })]
  });
};

/* harmony default export */ var header = (Object(external_mobx_react_["observer"])(Header));
// CONCATENATED MODULE: ./src/components/common/loading/FullPageLoading.tsx




function FullPageLoading_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

 //#region styled

const FullPage = base_default()("div", {
  target: "ec0rz3a2",
  label: "FullPage"
})(true ? {
  name: "15gtw3r",
  styles: "flex:1;width:100%;height:100%;@keyframes cubeGridScaleDelay{0%,70%,100%{transform:scale3D(1, 1, 1);}35%{transform:scale3D(0, 0, 1);}}"
} : undefined);

const CubeBox = base_default()("div", {
  target: "ec0rz3a1",
  label: "CubeBox"
})(true ? {
  name: "1wgkhb1",
  styles: "width:40px;height:40px;position:absolute;top:50%;left:50%;margin-top:-20px;margin-left:-20px"
} : undefined);

const CubeItem = base_default()("div", {
  target: "ec0rz3a0",
  label: "CubeItem"
})(true ? {
  name: "1ndfxkn",
  styles: "width:33%;height:33%;background-color:#333;float:left;animation:cubeGridScaleDelay 1.3s infinite ease-in-out;&.cube1,&.cube5,&.cube9{animation-delay:0.2s;}&.cube2,&.cube6{animation-delay:0.3s;}&.cube3{animation-delay:0.4s;}&.cube4,&.cube8{animation-delay:0.1s;}&.cube7{animation-delay:0s;}"
} : undefined); //#endregion


const FullPageLoading = () => /*#__PURE__*/Object(jsx_runtime_["jsx"])(FullPage, {
  children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(CubeBox, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(CubeItem, {
      className: "cube1"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CubeItem, {
      className: "cube2"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CubeItem, {
      className: "cube3"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CubeItem, {
      className: "cube4"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CubeItem, {
      className: "cube5"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CubeItem, {
      className: "cube6"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CubeItem, {
      className: "cube7"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CubeItem, {
      className: "cube8"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CubeItem, {
      className: "cube9"
    })]
  })
});

/* harmony default export */ var loading_FullPageLoading = (FullPageLoading);
// EXTERNAL MODULE: ./src/stores/calendar/index.ts
var calendar = __webpack_require__("aYQI");

// CONCATENATED MODULE: ./src/pages/_app.tsx




function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _app_ownKeys(Object(source), true).forEach(function (key) { _app_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _app_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

// IE 호환성

















const Wrap = base_default()("div", {
  target: "e1jn8o5n1",
  label: "Wrap"
})(true ? {
  name: "1139odl",
  styles: "display:flex;flex-direction:column;min-width:1280px;height:100vh;min-height:800px"
} : undefined);

const FullSize = base_default()("main", {
  target: "e1jn8o5n0",
  label: "FullSize"
})(true ? {
  name: "11k0cas",
  styles: "display:flex;flex-direction:column;height:100%;width:100%;flex:1;min-height:650px"
} : undefined); // store Setting


Object(external_mobx_react_["enableStaticRendering"])(config["a" /* default */].isServer);

const App = ({
  Component,
  pageProps
}) => {
  const {
    0: isLoaded,
    1: setLoaded
  } = Object(external_react_["useState"])(false);

  const preload = async () => {
    try {
      const {
        data
      } = await network_util["a" /* axios */].get("/api/check", {
        baseURL: "/"
      });

      if (data) {
        network_util["a" /* axios */].defaults.headers.authorization = `Bearer ${data.token}`;
        stores["a" /* default */].commonStore.settingLoggedIn(data);
      }
    } catch (error) {
      console.log(error);
    }

    setLoaded(true);
  };

  if (!config["a" /* default */].isServer) {
    Object(external_react_["useEffect"])(() => {
      preload();
      Object(external_mobx_["reaction"])(() => stores["a" /* default */].commonStore.isLoggedIn, async isLoggedIn => {
        if (isLoggedIn) {
          const {
            data: calendars
          } = await network_util["a" /* axios */].get("/diary/calendar");
          calendar["a" /* default */].setUserCalendars(calendars);
        } else {
          calendar["a" /* default */].setUserCalendars([]);
        }
      });
    }, []);
  }

  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(react_["ThemeProvider"], {
    theme: {},
    children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(head_default.a, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        charSet: "UTF-8"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        httpEquiv: "X-UA-Compatible",
        content: "IE=Edge"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        name: "format-detection",
        content: "telephone=no"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("title", {
        children: "KMEMO"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        property: "og:type",
        content: "website"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        property: "og:image",
        content: ""
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        property: "og:title",
        content: "\uAE40\uBC18\uC7A5-\uC77C\uC815\uAD00\uB9AC"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        name: "Description",
        content: "\uAE40\uBC18\uC7A5-\uC77C\uC815\uAD00\uB9AC"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        name: "Keywords",
        content: "\uAE40\uBC18\uC7A5-\uC77C\uC815\uAD00\uB9AC"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        property: "og:url",
        content: ""
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("meta", {
        property: "og:description",
        content: "\uAE40\uBC18\uC7A5-\uC77C\uC815\uAD00\uB9AC"
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(react_["Global"], {
      styles: resetCss
    }), isLoaded ? /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Wrap, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(header, {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])(FullSize, {
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Component, _app_objectSpread({}, pageProps))
      })]
    }) : /*#__PURE__*/Object(jsx_runtime_["jsx"])(loading_FullPageLoading, {})]
  });
};

/* harmony default export */ var _app = __webpack_exports__["default"] = (App);

/***/ }),

/***/ "i5Xc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return InputBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FormWrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FormConfrimButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FormButtonBasic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FormButtonBlue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return RadioBox; });
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("w8No");
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_common_button_ButtonWrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("gy8J");


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }


const InputBox = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("div", {
  target: "e1cwx7yc6",
  label: "InputBox"
})(">input{display:", props => props.hasButton ? "inline-block" : "block", ";width:", props => props.hasButton ? "262px" : "100%", ";height:42px;border-radius:5px;}>input+button{width:128px;height:42px;line-height:40px;margin-left:7px;border-radius:5px;vertical-align:top;}" + (true ? "" : undefined));
const FormWrap = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("div", {
  target: "e1cwx7yc5",
  label: "FormWrap"
})(InputBox, "+", InputBox, "{margin-top:10px;}", _components_common_button_ButtonWrap__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], "{margin-top:30px;}" + (true ? "" : undefined));
const CheckRow = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("div", {
  target: "e1cwx7yc4",
  label: "CheckRow"
})(true ? {
  name: "8qz8ia",
  styles: "padding-top:20px"
} : undefined);
const FormConfrimButton = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("button", {
  target: "e1cwx7yc3",
  label: "FormConfrimButton"
})(true ? {
  name: "f327bm",
  styles: "width:100%;height:48px;background-color:#177efb;font-size:18px;font-weight:500;color:#ffffff;border-radius:5px"
} : undefined);
const FormButtonBasic = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("button", {
  target: "e1cwx7yc2",
  label: "FormButtonBasic"
})(true ? {
  name: "ub939g",
  styles: "background-color:#fff;border:1px solid #252525;color:#252525"
} : undefined);
const FormButtonBlue = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("button", {
  target: "e1cwx7yc1",
  label: "FormButtonBlue"
})(true ? {
  name: "1wsrkey",
  styles: "background-color:#fff;border:1px solid #177efb;color:#177efb"
} : undefined);
const RadioBox = _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()("div", {
  target: "e1cwx7yc0",
  label: "RadioBox"
})(true ? {
  name: "696lha",
  styles: "width:100%;padding:20px 22px;border:1px solid #dbdbdb;text-align:left;box-sizing:border-box;>div+div{margin-top:10px;}input[type=\"radio\"]{display:none;width:0;height:0;+label{display:inline-block;font-size:16px;font-weight:350;color:#757575;padding-left:34px;line-height:24px;background:url(\"/images/btn/btn_radio_off.png\") left center no-repeat;cursor:pointer;}&:checked+label{background:url(\"/images/btn/btn_radio_on.png\") left center no-repeat;}}"
} : undefined);

/***/ }),

/***/ "kG9d":
/***/ (function(module, exports) {

module.exports = require("nookies");

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("Osoz");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "og1N":
/***/ (function(module, exports) {

module.exports = require("core-js/stable");

/***/ }),

/***/ "sGQ9":
/***/ (function(module, exports) {

module.exports = require("mobx-react");

/***/ }),

/***/ "sPuw":
/***/ (function(module, exports) {

module.exports = require("react-hook-form/dist/index.ie11");

/***/ }),

/***/ "vNVm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__("cDcd");

var _requestIdleCallback = _interopRequireDefault(__webpack_require__("0G5g"));

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) (0, _requestIdleCallback.default)(() => setVisible(true));
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "w8No":
/***/ (function(module, exports) {

module.exports = require("@emotion/styled/base");

/***/ }),

/***/ "wkBG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "xoQe":
/***/ (function(module, exports) {

module.exports = require("react-app-polyfill/stable");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });