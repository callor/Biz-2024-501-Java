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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

/***/ "12Ia":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "@emotion/styled/base"
var base_ = __webpack_require__("w8No");
var base_default = /*#__PURE__*/__webpack_require__.n(base_);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: ./src/stores/calendar/index.ts
var stores_calendar = __webpack_require__("aYQI");

// EXTERNAL MODULE: external "mobx-react"
var external_mobx_react_ = __webpack_require__("sGQ9");

// CONCATENATED MODULE: ./src/components/layout/main/CalendarNav.tsx




function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }





const CalendarBox = base_default()("div", {
  target: "er2ldq62",
  label: "CalendarBox"
})(true ? {
  name: "9u4hoo",
  styles: ">p{display:block;padding:19px 0;font-size:17px;font-weight:500;color:#252525;text-align:center;cursor:pointer;}"
} : undefined);

const CheckBoxWrap = base_default()("div", {
  target: "er2ldq61",
  label: "CheckBoxWrap"
})(">input{display:none;width:0;height:0;&+label{position:relative;display:block;font-size:14px;line-height:18px;color:#454545;padding-left:26px;&:after{position:absolute;top:0;left:0;content:\"\";display:block;width:18px;height:18px;background-position:center;background-repeat:no-repeat;border-radius:2px;color:", props => props.color.includes("#") ? props.color : `#${props.color}`, ";background-color:", props => props.bgColor.includes("#") ? props.bgColor : `#${props.bgColor}`, ";}}&:checked+label:after{background-image:url(\"/images/btn/btn_checkbox_white.png\");}}" + (true ? "" : undefined));

const CalendarListWrap = base_default()("div", {
  target: "er2ldq60",
  label: "CalendarListWrap"
})("border-top:1px solid #eeeeee;padding-top:19px;>", CheckBoxWrap, "+", CheckBoxWrap, "{margin-top:12px;}" + (true ? "" : undefined));

const CalendarNav = () => {
  const calendars = Object(external_react_["useMemo"])(() => stores_calendar["a" /* default */].calendars, [stores_calendar["a" /* default */].calendars]);
  const selectIds = Object(external_react_["useMemo"])(() => stores_calendar["a" /* default */].selectIds, [stores_calendar["a" /* default */].selectIds]);
  const onToggle = Object(external_react_["useCallback"])(e => {
    const {
      checked,
      value
    } = e.target;

    if (checked) {
      stores_calendar["a" /* default */].setSelctes([...selectIds, value]);
    } else {
      stores_calendar["a" /* default */].setSelctes(selectIds.filter(id => id !== value));
    }
  }, [selectIds]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(CalendarBox, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
      children: "\uC804\uCCB4\uC77C\uC815"
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CalendarListWrap, {
      children: calendars.map(({
        calendarId,
        name,
        color,
        bgColor
      }) => /*#__PURE__*/Object(jsx_runtime_["jsxs"])(CheckBoxWrap, {
        color: color,
        bgColor: bgColor,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
          type: "checkbox",
          id: calendarId,
          value: calendarId,
          checked: selectIds.includes(calendarId),
          onChange: onToggle
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          htmlFor: calendarId,
          children: name
        })]
      }, `calendar-wrap-${calendarId}`))
    })]
  });
};

/* harmony default export */ var main_CalendarNav = (Object(external_mobx_react_["observer"])(CalendarNav));
// EXTERNAL MODULE: ./src/utils/date.util.ts
var date_util = __webpack_require__("+TTV");

// CONCATENATED MODULE: ./src/components/layout/main/MiniCalendar.tsx




function MiniCalendar_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }






const MiniCalendarWrap = base_default()("div", {
  target: "e1pwg0id1",
  label: "MiniCalendarWrap"
})(true ? {
  name: "yhbwlm",
  styles: ">div{position:relative;user-select:none;>button{text-indent:-9999px;position:absolute;top:50%;transform:translateY(-50%);width:6px;height:10px;&.prev{background:url(/images/btn/btn_calandar_prev.png) no-repeat center;left:10px;}&.next{background:url(/images/btn/btn_calandar_next.png) no-repeat center;right:10px;}}>span{display:block;text-align:center;font-size:18px;font-weight:500;color:#252525;}}>table{margin:20px 0;text-align:center;th{line-height:26px;font-size:10px;color:#999;user-select:none;}}"
} : undefined);

const Day = base_default()("a", {
  target: "e1pwg0id0",
  label: "Day"
})("user-select:none;display:block;line-height:26px;font-size:12px;color:", props => props.isEmpty ? "rgba(0,0,0,0.3)" : "#666", ";&:hover{color:", props => props.isEmpty ? "rgba(0,0,0,0.3)" : "#666", ";}" + (true ? "" : undefined));

const MiniCalendar = () => {
  const {
    0: date,
    1: setDate
  } = Object(external_react_["useState"])(new Date());
  Object(external_react_["useEffect"])(() => {
    setDate(stores_calendar["a" /* default */].date);
  }, [stores_calendar["a" /* default */].date]);
  const addMonth = Object(external_react_["useCallback"])(num => {
    setDate(date_util["a" /* DateUtil */].addMonth(date, num));
  }, [date]);
  const calendar = Object(external_react_["useMemo"])(() => date_util["a" /* DateUtil */].getCalendar(date), [date]);
  const CalendarRender = Object(external_react_["useMemo"])(() => {
    return calendar.map((week, idx) => /*#__PURE__*/Object(jsx_runtime_["jsx"])("tr", {
      children: week.map(day => /*#__PURE__*/Object(jsx_runtime_["jsx"])("td", {
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Day, {
          isEmpty: day.isEmpty,
          children: day.day
        })
      }, `mini-calendar-day-${day.day}`))
    }, `mini-calendar-week-${idx}`));
  }, [calendar]);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(MiniCalendarWrap, {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
        className: "prev",
        onClick: () => {
          addMonth(-1);
        },
        children: "prev"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
        children: date_util["a" /* DateUtil */].format(date, "yyyy.MM")
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
        className: "next",
        onClick: () => {
          addMonth(1);
        },
        children: "next"
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("table", {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("colgroup", {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
          width: "26px"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
          width: "26px"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
          width: "26px"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
          width: "26px"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
          width: "26px"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
          width: "26px"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("col", {
          width: "26px"
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("thead", {
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("tr", {
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
            children: "\uC77C"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
            children: "\uC6D4"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
            children: "\uD654"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
            children: "\uC218"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
            children: "\uBAA9"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
            children: "\uAE08"
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("th", {
            children: "\uD1A0"
          })]
        })
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("tbody", {
        children: CalendarRender
      })]
    })]
  });
};

/* harmony default export */ var main_MiniCalendar = (Object(external_mobx_react_["observer"])(MiniCalendar));
// CONCATENATED MODULE: ./src/components/layout/main/index.tsx




function main_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }







const Container = base_default()("div", {
  target: "e1i6curz10",
  label: "Container"
})(true ? {
  name: "qvrrxd",
  styles: "flex:1;height:100%"
} : undefined);

const MainWrap = base_default()("div", {
  target: "e1i6curz9",
  label: "MainWrap"
})(true ? {
  name: "sr85wp",
  styles: "height:100%;display:flex;width:100%;flex-direction:row"
} : undefined);

const NavSection = base_default()("section", {
  target: "e1i6curz8",
  label: "NavSection"
})("height:100%;position:relative;width:200px;border-right:1px solid #dbdbdb;border-bottom:1px solid #dbdbdb;min-height:646px;display:", props => props.isOpen ? "flex" : "none", ";flex-direction:column;box-sizing:border-box;" + (true ? "" : undefined));

const NavTop = base_default()("div", {
  target: "e1i6curz7",
  label: "NavTop"
})(true ? {
  name: "14ymvel",
  styles: "flex:1;width:100%;padding:0 10px;box-sizing:border-box;padding-top:18px;>button{width:100%;height:46px;font-size:18px;font-weight:500;color:#ffffff;background-color:#177efb;border-radius:5px;box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.27);}"
} : undefined);

const NavBottom = base_default()("div", {
  target: "e1i6curz6",
  label: "NavBottom"
})(true ? {
  name: "1aiv9hc",
  styles: "width:100%;padding:0 9px;box-sizing:border-box;padding-bottom:15px;border-bottom:1px solid #dbdbdb"
} : undefined);

const MainSection = base_default()("section", {
  target: "e1i6curz5",
  label: "MainSection"
})(true ? {
  name: "1ry3mi4",
  styles: "flex:1;height:100%;position:relative;min-width:1050px;display:flex;flex-direction:column"
} : undefined);

const Copyright = base_default()("div", {
  target: "e1i6curz4",
  label: "Copyright"
})(true ? {
  name: "puaztz",
  styles: "font-size:10px;color:#999999"
} : undefined);

const MainSectionTop = base_default()("div", {
  target: "e1i6curz3",
  label: "MainSectionTop"
})(true ? {
  name: "1rbd50r",
  styles: "height:50px;display:flex;flex-direction:row"
} : undefined);

const NavToggleButton = base_default()("div", {
  target: "e1i6curz2",
  label: "NavToggleButton"
})("width:30px;height:100%;border-right:1px solid #dbdbdb;box-sizing:border-box;>button{width:100%;height:100%;background:url(\"/images/btn/btn_snb_open.png\") center no-repeat;transition:all 0.2s ease;", props => props.isOpen ? "" : "transform: rotate(180deg);", ";}" + (true ? "" : undefined));

const MainTitleWrap = base_default()("div", {
  target: "e1i6curz1",
  label: "MainTitleWrap"
})(true ? {
  name: "b3zq6f",
  styles: "flex:1;height:50px;overflow:hidden;padding:12px 14px;box-sizing:border-box;>p{font-size:18px;font-weight:700;color:#252525;line-height:26px;}"
} : undefined);

const MainView = base_default()("div", {
  target: "e1i6curz0",
  label: "MainView"
})(true ? {
  name: "1e11jy7",
  styles: "flex:1;width:100%;height:calc(100% - 50px);position:relative;border-bottom:1px solid #dbdbdb;box-sizing:border-box"
} : undefined);

const MainLayout = ({
  children,
  title
}) => {
  const {
    0: showNav,
    1: setShowNav
  } = Object(external_react_["useState"])(window.screen.width > 1280);
  const router = Object(router_["useRouter"])();
  const goWritePage = Object(external_react_["useMemo"])(() => "/" === router.pathname, [router.pathname]);
  const onClickNavShow = Object(external_react_["useCallback"])(() => {
    setShowNav(!showNav);
  }, [showNav]);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(Container, {
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(MainWrap, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(NavSection, {
        isOpen: showNav,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(NavTop, {
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(link_default.a, {
            href: goWritePage ? "/calendar/event/write" : "/",
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
              children: goWritePage ? "일정추가" : "일정보기"
            })
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(main_CalendarNav, {})]
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(NavBottom, {
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(main_MiniCalendar, {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Copyright, {
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
              children: "Copyright \xA9 KMEMO. All Rights Reserved."
            })
          })]
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(MainSection, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(MainSectionTop, {
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(NavToggleButton, {
            isOpen: showNav,
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
              onClick: onClickNavShow
            })
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(MainTitleWrap, {
            children: typeof title === "string" ? /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
              children: title
            }) : title
          })]
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(MainView, {
          children: children
        })]
      })]
    })
  });
};

/* harmony default export */ var main = __webpack_exports__["a"] = (MainLayout);

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

/***/ "4jX/":
/***/ (function(module, exports) {

module.exports = require("react-color");

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

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("wBYy");


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

/***/ "wBYy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return /* binding */ getServerSideProps; });

// EXTERNAL MODULE: external "@emotion/styled/base"
var base_ = __webpack_require__("w8No");
var base_default = /*#__PURE__*/__webpack_require__.n(base_);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: ./src/utils/network.util.ts
var network_util = __webpack_require__("0Pz+");

// EXTERNAL MODULE: ./src/components/layout/main/index.tsx + 2 modules
var main = __webpack_require__("12Ia");

// EXTERNAL MODULE: external "react-color"
var external_react_color_ = __webpack_require__("4jX/");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// CONCATENATED MODULE: ./src/components/common/colorpicker/CompactColorPicker.tsx





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }




const Wrap = base_default()("span", {
  target: "etg2ao52",
  label: "Wrap"
})("position:relative;>input{padding-left:", props => props.isPrefix ? 28 : 13, "px;}>input+div{position:absolute!important;bottom:-100px;left:-40px;z-index:9;}" + (true ? "" : undefined));

const Picker = /*#__PURE__*/base_default()(external_react_color_["CompactPicker"], {
  target: "etg2ao51",
  label: "Picker"
})(true ? {
  name: "hf9k9d",
  styles: "background-color:#fff;border:1px solid #999;border-radius:4px"
} : undefined);

const CloseBackground = base_default()("div", {
  target: "etg2ao50",
  label: "CloseBackground"
})(true ? {
  name: "18rkp3r",
  styles: "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2"
} : undefined);

const CompactColorPicker = (_ref, ref) => {
  let {
    color,
    onColorChange: _onColorChange
  } = _ref,
      props = _objectWithoutProperties(_ref, ["color", "onColorChange"]);

  const pickerRef = Object(external_react_["useRef"])();
  const {
    0: isShow,
    1: setShow
  } = Object(external_react_["useState"])(false);
  const onFocus = Object(external_react_["useCallback"])(() => {
    setShow(true);
  }, []);
  const onColorChange = Object(external_react_["useCallback"])(color => {
    if (_onColorChange) {
      _onColorChange(color);
    }

    setShow(false);
  }, [_onColorChange]);
  const onClose = Object(external_react_["useCallback"])(() => {
    setShow(false);
  }, []);
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(Wrap, {
    isPrefix: props.colorPrefix ? true : false,
    onFocus: onFocus,
    children: [props.colorPrefix && props.colorPrefix, /*#__PURE__*/Object(jsx_runtime_["jsx"])("input", _objectSpread(_objectSpread({}, props), {}, {
      ref: ref,
      autoComplete: "off"
    })), isShow && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Picker, {
        color: color,
        onChange: onColorChange,
        ref: pickerRef
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(CloseBackground, {
        onClick: onClose
      })]
    })]
  });
};

/* harmony default export */ var colorpicker_CompactColorPicker = (/*#__PURE__*/Object(external_react_["forwardRef"])(CompactColorPicker));
// EXTERNAL MODULE: ./src/components/common/button/ButtonWrap.tsx
var ButtonWrap = __webpack_require__("gy8J");

// EXTERNAL MODULE: ./src/components/common/button/index.tsx
var common_button = __webpack_require__("IX1n");

// EXTERNAL MODULE: ./src/components/mypage/form/index.tsx
var mypage_form = __webpack_require__("i5Xc");

// EXTERNAL MODULE: external "react-hook-form/dist/index.ie11"
var index_ie11_ = __webpack_require__("sPuw");

// CONCATENATED MODULE: ./src/hooks/useWindowSize.ts


const useWindowSize = () => {
  const {
    0: windowSize,
    1: setWindowSize
  } = Object(external_react_["useState"])({
    width: window.innerWidth,
    height: window.innerHeight
  });
  Object(external_react_["useEffect"])(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

/* harmony default export */ var hooks_useWindowSize = (useWindowSize);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// CONCATENATED MODULE: ./src/pages/calendar/setting.tsx




function setting_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function setting_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { setting_ownKeys(Object(source), true).forEach(function (key) { setting_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { setting_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function setting_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function setting_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }










 //#region styled

const setting_Wrap = base_default()("div", {
  target: "ekk7qe914",
  label: "Wrap"
})(true ? {
  name: "1gn3kn5",
  styles: "display:flex;width:100%;height:100%"
} : undefined);

const LeftWrap = base_default()("div", {
  target: "ekk7qe913",
  label: "LeftWrap"
})(true ? {
  name: "14hag4i",
  styles: "width:30px;flex:0 0 30px;height:100%;border-right:1px solid #dbdbdb;box-sizing:border-box"
} : undefined);

const MainWrap = base_default()("div", {
  target: "ekk7qe912",
  label: "MainWrap"
})(true ? {
  name: "1ffyzdl",
  styles: "flex:1;width:100%;height:100%;box-sizing:border-box"
} : undefined);

const TableWrap = base_default()("div", {
  target: "ekk7qe911",
  label: "TableWrap"
})(true ? {
  name: "1lu1tkp",
  styles: "height:100%;padding:20px 20px 10px;box-sizing:border-box;width:540px;float:left"
} : undefined);

const CalendarListWrap = base_default()("div", {
  target: "ekk7qe910",
  label: "CalendarListWrap"
})(true ? {
  name: "1bl4be0",
  styles: "width:220px;height:100%;border:1px solid #dbdbdb;border-top:1px solid #454545;border-bottom:none;box-sizing:border-box;float:left"
} : undefined);

const CalendarSettingWrap = /*#__PURE__*/base_default()(CalendarListWrap, {
  target: "ekk7qe99",
  label: "CalendarSettingWrap"
})("width:270px;margin-left:10px;", ButtonWrap["a" /* default */], "{margin-top:10px;button{width:60px;height:24px;line-height:22px;border-radius:2px;font-size:12px;+button{margin-left:7px;}}}" + (true ? "" : undefined));

const TableTop = base_default()("div", {
  target: "ekk7qe98",
  label: "TableTop"
})(true ? {
  name: "1w0uarj",
  styles: "height:42px;background:#fafafa;border-bottom:1px solid #eeeeee;box-sizing:border-box;>p{line-height:42px;font-size:14px;font-weight:500;color:#252525;text-align:center;}"
} : undefined);

const Table = base_default()("div", {
  target: "ekk7qe97",
  label: "Table"
})(true ? {
  name: "38r5wu",
  styles: "height:calc(100% - 42px);border-bottom:1px solid #dbdbdb;box-sizing:border-box;overflow-y:auto;>ul>li{height:36px;font-size:14px;line-height:35px;border-bottom:1px solid #dbdbdb;padding-left:7px;box-sizing:border-box;cursor:pointer;}"
} : undefined);

const InputWrap = base_default()("div", {
  target: "ekk7qe96",
  label: "InputWrap"
})(true ? {
  name: "19vn32n",
  styles: "border-bottom:1px solid #dbdbdb;padding:10px 10px 12px;position:relative;>input[type=\"text\"]{width:100%;height:36px;}"
} : undefined);

const CheckBox = base_default()("div", {
  target: "ekk7qe95",
  label: "CheckBox"
})(true ? {
  name: "1f43s4s",
  styles: "display:inline-block;+div{margin-left:40px;}input[type=\"checkbox\"]{display:none;+label{display:inline-block;font-size:14px;color:#454545;line-height:24px;padding-left:34px;background:url(\"/images/btn/btn_checkbox_no_24x24.png\") left center no-repeat;}&:checked+label{background:url(\"/images/btn/btn_checkbox_yes_24x24.png\") left center no-repeat;}}"
} : undefined);

const ColorPicker = /*#__PURE__*/base_default()(colorpicker_CompactColorPicker, {
  target: "ekk7qe94",
  label: "ColorPicker"
})(true ? {
  name: "1nbdcyf",
  styles: "position:relative;width:118px;height:36px;padding-right:32px;box-sizing:border-box;background-position:right 10px center;background-repeat:no-repeat;background-image:url(\"/images/ico/ico_color_text.png\")"
} : undefined);

const BgColorPicker = /*#__PURE__*/base_default()(ColorPicker, {
  target: "ekk7qe93",
  label: "BgColorPicker"
})(true ? {
  name: "4w0ou8",
  styles: "margin-left:10px;background-image:url(\"/images/ico/ico_color_bg.png\");background-position:right 5px center"
} : undefined);

const Banner = base_default()("div", {
  target: "ekk7qe92",
  label: "Banner"
})("float:left;width:calc(100% - 560px);height:100%;margin-left:20px;background-size:contain;background-position:left center;background-repeat:no-repeat;background-color:#e8eff5;background-image:url(\"", props => props.imageUrl, "\");cursor:pointer;" + (true ? "" : undefined));

const PreviewEvent = base_default()("p", {
  target: "ekk7qe91",
  label: "PreviewEvent"
})("width:100%;line-height:15px;font-size:13px;padding:3px 0 3px 10px;box-sizing:border-box;border-radius:8px;color:", props => props.color, ";background-color:", props => props.bgColor, ";" + (true ? "" : undefined));

const CalendarItem = base_default()("li", {
  target: "ekk7qe90",
  label: "CalendarItem"
})("background-color:", props => props.isOn ? "#6485ae" : "#f5f6f8", ";color:", props => props.isOn ? "#fff" : "#888e9c", ";" + (true ? "" : undefined)); //#endregion


const CalendarSettingPage = ({
  calendars
}) => {
  const windowSize = hooks_useWindowSize();
  const router = Object(router_["useRouter"])();
  const bannerImage = Object(external_react_["useMemo"])(() => windowSize.width <= 1280 ? "/images/sub/setting_banner_1280.jpg" : "/images/sub/setting_banner.jpg", [windowSize]);
  const {
    register,
    reset,
    setValue,
    getValues
  } = Object(index_ie11_["useForm"])({
    defaultValues: {
      name: "",
      color: "",
      bgColor: "",
      useYn: ""
    }
  });
  const {
    0: calendarColor,
    1: setCalendarColor
  } = Object(external_react_["useState"])();
  const {
    0: calendarId,
    1: setCalendarId
  } = Object(external_react_["useState"])();
  const getCalendarData = Object(external_react_["useCallback"])(async calendarId => {
    setCalendarId(calendarId);

    if (calendarId) {
      const {
        data: calendar
      } = await network_util["a" /* axios */].get(`/diary/calendar/${calendarId}`);
      setCalendarColor({
        color: calendar.color,
        bgColor: calendar.bgColor
      });
      setValue("color", calendar.color);
      setValue("bgColor", calendar.bgColor);
      setValue("name", calendar.name);
      setValue("useYn", calendar.useYn === "Y" ? "Y" : "");
    } else {
      setCalendarColor(undefined);
      reset();
    }
  }, []);
  Object(external_react_["useEffect"])(() => {
    var _calendars$;

    getCalendarData((_calendars$ = calendars[0]) === null || _calendars$ === void 0 ? void 0 : _calendars$.calendarId);
  }, []);
  const onCalendarSelectClick = Object(external_react_["useCallback"])(e => {
    const {
      calendarId
    } = e.currentTarget.dataset;
    getCalendarData(calendarId);
  }, []);
  const onColorChange = Object(external_react_["useCallback"])(color => {
    setValue("color", color.hex);
    setCalendarColor({
      color: color.hex,
      bgColor: calendarColor.bgColor
    });
  }, [calendarColor]);
  const onBgColorChange = Object(external_react_["useCallback"])(color => {
    setValue("bgColor", color.hex);
    setCalendarColor({
      color: calendarColor.color,
      bgColor: color.hex
    });
  }, [calendarColor]);
  const CalendarList = Object(external_react_["useMemo"])(() => calendars.map(({
    calendarId: _calendarId,
    name
  }) => /*#__PURE__*/Object(jsx_runtime_["jsx"])(CalendarItem, {
    "data-calendar-id": _calendarId,
    onClick: onCalendarSelectClick,
    isOn: calendarId === _calendarId,
    children: name
  }, `calendar-list-${_calendarId}`)), [calendarId]);
  const onBlurColorChange = Object(external_react_["useCallback"])(e => {
    const {
      name,
      value
    } = e.target;
    setCalendarColor(setting_objectSpread(setting_objectSpread({}, calendarColor), {}, {
      [name]: value
    }));
  }, [calendarColor]);
  const onDeleteCalendarClick = Object(external_react_["useCallback"])(async () => {
    if (calendarId && confirm("해당 그룹을 삭제하시겠습니까 ?")) {
      await network_util["a" /* axios */].delete(`/diary/calendar/${calendarId}`);
      alert("삭제 되었습니다.");
      router.reload();
    }
  }, [calendarId]);
  const onModifyCalendarClick = Object(external_react_["useCallback"])(async () => {
    if (calendarId) {
      const {
        name,
        useYn,
        bgColor,
        color
      } = getValues();

      if (!name) {
        alert("그룹명을 설정하셔야 합니다.");
        return;
      }

      if (!(color && bgColor)) {
        alert("사용하실 색상을 선택 하셔야합니다.");
        return;
      }

      const param = {
        calendarId,
        name,
        color,
        bgColor,
        useYn: useYn ? "Y" : "N"
      };
      await network_util["a" /* axios */].put(`/diary/calendar`, param);
      alert("수정 되었습니다.");
      router.reload();
    }
  }, [calendarId]);
  const openConinfo = Object(external_react_["useCallback"])(() => {
    window.open("https://coninfo.co.kr/", "_blank");
  }, []);
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(main["a" /* default */], {
    title: "그룹 설정",
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(setting_Wrap, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(LeftWrap, {}), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(MainWrap, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(TableWrap, {
          children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(CalendarListWrap, {
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(TableTop, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                children: "\uADF8\uB8F9\uBAA9\uB85D"
              })
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Table, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("ul", {
                children: CalendarList
              })
            })]
          }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(CalendarSettingWrap, {
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(TableTop, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                children: "\uADF8\uB8F9\uC124\uC815"
              })
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(InputWrap, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(CheckBox, {
                children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                  type: "checkbox",
                  id: "useYn",
                  name: "useYn",
                  value: "Y",
                  ref: register,
                  readOnly: calendarId === undefined
                }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
                  htmlFor: "useYn",
                  children: "\uC0AC\uC6A9"
                })]
              })
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(TableTop, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                children: "\uADF8\uB8F9\uBA85\uC124\uC815"
              })
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(InputWrap, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                type: "text",
                ref: register,
                name: "name"
              })
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(TableTop, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                children: "\uC0C9\uC0C1\uC124\uC815"
              })
            }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(InputWrap, {
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(ColorPicker, {
                ref: register,
                name: "color",
                color: calendarColor === null || calendarColor === void 0 ? void 0 : calendarColor.color,
                readOnly: calendarId === undefined,
                onColorChange: onColorChange,
                onBlur: onBlurColorChange
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(BgColorPicker, {
                ref: register,
                name: "bgColor",
                color: calendarColor === null || calendarColor === void 0 ? void 0 : calendarColor.bgColor,
                readOnly: calendarId === undefined,
                onColorChange: onBgColorChange,
                onBlur: onBlurColorChange
              })]
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(TableTop, {
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
                children: "\uC0C9\uC0C1 \uBBF8\uB9AC\uBCF4\uAE30"
              })
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(InputWrap, {
              children: calendarColor && /*#__PURE__*/Object(jsx_runtime_["jsx"])(PreviewEvent, {
                color: calendarColor.color,
                bgColor: calendarColor.bgColor,
                children: "- \uD604\uC7AC \uADF8\uB8F9\uC758 \uC124\uC815\uB41C \uC0C9\uC0C1 \uC785\uB2C8\uB2E4."
              })
            }), calendarId && /*#__PURE__*/Object(jsx_runtime_["jsxs"])(ButtonWrap["a" /* default */], {
              children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(common_button["a" /* BlueButton */], {
                onClick: onModifyCalendarClick,
                children: "\uC800\uC7A5"
              }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(mypage_form["b" /* FormButtonBasic */], {
                onClick: onDeleteCalendarClick,
                children: "\uC0AD\uC81C"
              })]
            })]
          })]
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Banner, {
          imageUrl: bannerImage,
          onClick: openConinfo
        })]
      })]
    })
  });
};

const getServerSideProps = async ctx => {
  const {
    data: calendars
  } = await Object(network_util["e" /* serverAxios */])(ctx).get("/diary/calendar/all");
  return {
    props: {
      calendars
    }
  };
};
/* harmony default export */ var setting = __webpack_exports__["default"] = (CalendarSettingPage);

/***/ }),

/***/ "wkBG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });