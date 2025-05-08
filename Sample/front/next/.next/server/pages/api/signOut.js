module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

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

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("WjXT");


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

/***/ "LeJ0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  baseURL: "https://api.kmemo.co.kr/api",
  isServer: true
});

/***/ }),

/***/ "WjXT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_contants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8LO8");
/* harmony import */ var _utils_network_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0Pz+");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("kG9d");
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);




const signOut = async (req, res) => {
  if (req.method === "DELETE") {
    const {
      nsid
    } = Object(nookies__WEBPACK_IMPORTED_MODULE_2__["parseCookies"])({
      req
    });

    try {
      await _utils_network_util__WEBPACK_IMPORTED_MODULE_1__[/* axios */ "a"].delete("/auth/signOut", {
        headers: {
          authorization: `Bearer ${nsid}`
        }
      });
      Object(nookies__WEBPACK_IMPORTED_MODULE_2__["setCookie"])({
        res
      }, "nsid", _utils_contants__WEBPACK_IMPORTED_MODULE_0__[/* COOKIE_NOT_LOGIN */ "a"], _utils_network_util__WEBPACK_IMPORTED_MODULE_1__[/* cookieOption */ "c"]);
    } catch (error) {
      throw error;
    }
  }

  res.send(null);
};

/* harmony default export */ __webpack_exports__["default"] = (signOut);

/***/ }),

/***/ "kG9d":
/***/ (function(module, exports) {

module.exports = require("nookies");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });