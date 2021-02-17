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

/***/ "./components/Footer.tsx":
/*!*******************************!*\
  !*** ./components/Footer.tsx ***!
  \*******************************/
/*! exports provided: Footer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Footer\", function() { return Footer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals */ \"./globals.ts\");\nvar _jsxFileName = \"/Users/juangui/dev/jguixer/jguix-blog/components/Footer.tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\nconst Footer = () => __jsx(\"div\", {\n  className: \"footer\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 5,\n    columnNumber: 3\n  }\n}, __jsx(\"p\", {\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 6,\n    columnNumber: 5\n  }\n}, `© ${_globals__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].yourName} ${new Date().getFullYear()}`), __jsx(\"a\", {\n  href: \"/rss.xml\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 7,\n    columnNumber: 5\n  }\n}, __jsx(\"img\", {\n  src: \"/img/rss-white.svg\",\n  alt: \"RSS Feed\",\n  height: \"30\",\n  width: \"30\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 8,\n    columnNumber: 7\n  }\n})));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Zvb3Rlci50c3g/ZTI4NSJdLCJuYW1lcyI6WyJGb290ZXIiLCJnbG9iYWxzIiwieW91ck5hbWUiLCJEYXRlIiwiZ2V0RnVsbFllYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBRU8sTUFBTUEsTUFBZ0IsR0FBRyxNQUM5QjtBQUFLLFdBQVMsRUFBQyxRQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUssS0FBSUMsZ0RBQU8sQ0FBQ0MsUUFBUyxJQUFHLElBQUlDLElBQUosR0FBV0MsV0FBWCxFQUF5QixFQUF0RCxDQURGLEVBRUU7QUFBRyxNQUFJLEVBQUMsVUFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQ0U7QUFBSyxLQUFHLEVBQUMsb0JBQVQ7QUFBOEIsS0FBRyxFQUFDLFVBQWxDO0FBQTZDLFFBQU0sRUFBQyxJQUFwRDtBQUF5RCxPQUFLLEVBQUMsSUFBL0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQURGLENBRkYsQ0FESyIsImZpbGUiOiIuL2NvbXBvbmVudHMvRm9vdGVyLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi4vZ2xvYmFscyc7XG5cbmV4cG9ydCBjb25zdCBGb290ZXI6IFJlYWN0LkZDID0gKCkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImZvb3RlclwiPlxuICAgIDxwPntgwqkgJHtnbG9iYWxzLnlvdXJOYW1lfSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX1gfTwvcD5cbiAgICA8YSBocmVmPVwiL3Jzcy54bWxcIj5cbiAgICAgIDxpbWcgc3JjPVwiL2ltZy9yc3Mtd2hpdGUuc3ZnXCIgYWx0PVwiUlNTIEZlZWRcIiBoZWlnaHQ9XCIzMFwiIHdpZHRoPVwiMzBcIiAvPlxuICAgIDwvYT5cbiAgPC9kaXY+XG4pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Footer.tsx\n");

/***/ }),

/***/ "./components/Header.tsx":
/*!*******************************!*\
  !*** ./components/Header.tsx ***!
  \*******************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Header\", function() { return Header; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals */ \"./globals.ts\");\nvar _jsxFileName = \"/Users/juangui/dev/jguixer/jguix-blog/components/Header.tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\nconst Header = () => __jsx(\"div\", {\n  className: \"header\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 5,\n    columnNumber: 3\n  }\n}, __jsx(\"a\", {\n  href: \"/\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 6,\n    columnNumber: 5\n  }\n}, _globals__WEBPACK_IMPORTED_MODULE_1__[\"globals\"].siteName), __jsx(\"div\", {\n  className: \"flex-spacer\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 7,\n    columnNumber: 5\n  }\n}), __jsx(\"a\", {\n  href: \"/about\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 8,\n    columnNumber: 5\n  }\n}, \"About me\"), __jsx(\"a\", {\n  href: \"https://github.com/jguix\",\n  __self: undefined,\n  __source: {\n    fileName: _jsxFileName,\n    lineNumber: 9,\n    columnNumber: 5\n  }\n}, \"GitHub\"));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlYWRlci50c3g/ZGRiOCJdLCJuYW1lcyI6WyJIZWFkZXIiLCJnbG9iYWxzIiwic2l0ZU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBRU8sTUFBTUEsTUFBZ0IsR0FBRyxNQUM5QjtBQUFLLFdBQVMsRUFBQyxRQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FDRTtBQUFHLE1BQUksRUFBQyxHQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBYUMsZ0RBQU8sQ0FBQ0MsUUFBckIsQ0FERixFQUVFO0FBQUssV0FBUyxFQUFDLGFBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUZGLEVBR0U7QUFBRyxNQUFJLEVBQUMsUUFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBSEYsRUFJRTtBQUFHLE1BQUksRUFBQywwQkFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBSkYsQ0FESyIsImZpbGUiOiIuL2NvbXBvbmVudHMvSGVhZGVyLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGdsb2JhbHMgfSBmcm9tIFwiLi4vZ2xvYmFsc1wiO1xuXG5leHBvcnQgY29uc3QgSGVhZGVyOiBSZWFjdC5GQyA9ICgpID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICA8YSBocmVmPVwiL1wiPntnbG9iYWxzLnNpdGVOYW1lfTwvYT5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtc3BhY2VyXCIgLz5cbiAgICA8YSBocmVmPVwiL2Fib3V0XCI+QWJvdXQgbWU8L2E+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9qZ3VpeFwiPkdpdEh1YjwvYT5cbiAgPC9kaXY+XG4pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Header.tsx\n");

/***/ }),

/***/ "./globals.ts":
/*!********************!*\
  !*** ./globals.ts ***!
  \********************/
/*! exports provided: globals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"globals\", function() { return globals; });\nlet globals;\n\n(function (_globals) {\n  const yourName = _globals.yourName = \"Juangui Jordán\";\n  const siteName = _globals.siteName = \"Jguix site\";\n  const siteDescription = _globals.siteDescription = \"This is my site where I gather my blog posts and some other random stuff\";\n  const siteCreationDate = _globals.siteCreationDate = \"February 17, 2021 08:00:00 GMT\";\n  const twitterHandle = _globals.twitterHandle = \"@jguixer\";\n  const email = _globals.email = \"juangui@gmail.com\";\n  const url = _globals.url = \"https://juanguijordan.com\";\n  const accentColor = _globals.accentColor = \"#4fc2b4\";\n  const googleAnalyticsId = _globals.googleAnalyticsId = ``;\n})(globals || (globals = {}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9nbG9iYWxzLnRzPzljMWQiXSwibmFtZXMiOlsieW91ck5hbWUiLCJzaXRlTmFtZSIsInNpdGVEZXNjcmlwdGlvbiIsInNpdGVDcmVhdGlvbkRhdGUiLCJ0d2l0dGVySGFuZGxlIiwiZW1haWwiLCJ1cmwiLCJhY2NlbnRDb2xvciIsImdvb2dsZUFuYWx5dGljc0lkIiwiZ2xvYmFscyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFPOzs7QUFDRSxRQUFNQSxRQUFRLHVCQUFHLGdCQUFqQjtBQUNBLFFBQU1DLFFBQVEsdUJBQUcsWUFBakI7QUFDQSxRQUFNQyxlQUFlLDhCQUMxQiwwRUFESztBQUVBLFFBQU1DLGdCQUFnQiwrQkFBRyxnQ0FBekI7QUFDQSxRQUFNQyxhQUFhLDRCQUFHLFVBQXRCO0FBQ0EsUUFBTUMsS0FBSyxvQkFBRyxtQkFBZDtBQUNBLFFBQU1DLEdBQUcsa0JBQUcsMkJBQVo7QUFDQSxRQUFNQyxXQUFXLDBCQUFHLFNBQXBCO0FBQ0EsUUFBTUMsaUJBQWlCLGdDQUFJLEVBQTNCO0dBVlFDLE8sS0FBQUEsTyIsImZpbGUiOiIuL2dsb2JhbHMudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgbmFtZXNwYWNlIGdsb2JhbHMge1xuICBleHBvcnQgY29uc3QgeW91ck5hbWUgPSBcIkp1YW5ndWkgSm9yZMOhblwiO1xuICBleHBvcnQgY29uc3Qgc2l0ZU5hbWUgPSBcIkpndWl4IHNpdGVcIjtcbiAgZXhwb3J0IGNvbnN0IHNpdGVEZXNjcmlwdGlvbiA9XG4gICAgXCJUaGlzIGlzIG15IHNpdGUgd2hlcmUgSSBnYXRoZXIgbXkgYmxvZyBwb3N0cyBhbmQgc29tZSBvdGhlciByYW5kb20gc3R1ZmZcIjtcbiAgZXhwb3J0IGNvbnN0IHNpdGVDcmVhdGlvbkRhdGUgPSBcIkZlYnJ1YXJ5IDE3LCAyMDIxIDA4OjAwOjAwIEdNVFwiO1xuICBleHBvcnQgY29uc3QgdHdpdHRlckhhbmRsZSA9IFwiQGpndWl4ZXJcIjtcbiAgZXhwb3J0IGNvbnN0IGVtYWlsID0gXCJqdWFuZ3VpQGdtYWlsLmNvbVwiO1xuICBleHBvcnQgY29uc3QgdXJsID0gXCJodHRwczovL2p1YW5ndWlqb3JkYW4uY29tXCI7XG4gIGV4cG9ydCBjb25zdCBhY2NlbnRDb2xvciA9IFwiIzRmYzJiNFwiO1xuICBleHBvcnQgY29uc3QgZ29vZ2xlQW5hbHl0aWNzSWQgPSBgYDsgLy8gZS5nLiAnVUEtOTk5OTk5OTk5LTEnXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./globals.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Footer */ \"./components/Footer.tsx\");\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../globals */ \"./globals.ts\");\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Header */ \"./components/Header.tsx\");\n/* harmony import */ var _styles_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/base.css */ \"./styles/base.css\");\n/* harmony import */ var _styles_base_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_base_css__WEBPACK_IMPORTED_MODULE_5__);\nvar _jsxFileName = \"/Users/juangui/dev/jguixer/jguix-blog/pages/_app.tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\n\nconst App = ({\n  Component,\n  pageProps\n}) => {\n  return __jsx(\"div\", {\n    className: \"container\",\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 5\n    }\n  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 7\n    }\n  }, _globals__WEBPACK_IMPORTED_MODULE_3__[\"globals\"].googleAnalyticsId && __jsx(\"script\", {\n    async: true,\n    src: `https://www.googletagmanager.com/gtag/js?id=${_globals__WEBPACK_IMPORTED_MODULE_3__[\"globals\"].googleAnalyticsId}`,\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 13,\n      columnNumber: 11\n    }\n  }), _globals__WEBPACK_IMPORTED_MODULE_3__[\"globals\"].googleAnalyticsId && __jsx(\"script\", {\n    dangerouslySetInnerHTML: {\n      __html: `\n            window.dataLayer = window.dataLayer || [];\n            function gtag(){dataLayer.push(arguments);}\n            gtag('js', new Date());\n\n            gtag('globals', '${_globals__WEBPACK_IMPORTED_MODULE_3__[\"globals\"].googleAnalyticsId}');\n            `\n    },\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 16,\n      columnNumber: 11\n    }\n  })), __jsx(_components_Header__WEBPACK_IMPORTED_MODULE_4__[\"Header\"], {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 27,\n      columnNumber: 7\n    }\n  }), __jsx(Component, _extends({}, pageProps, {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 7\n    }\n  })), __jsx(_components_Footer__WEBPACK_IMPORTED_MODULE_2__[\"Footer\"], {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 29,\n      columnNumber: 7\n    }\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLnRzeD83MjE2Il0sIm5hbWVzIjpbIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImdsb2JhbHMiLCJnb29nbGVBbmFseXRpY3NJZCIsIl9faHRtbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1BLEdBQWEsR0FBRyxDQUFDO0FBQUVDLFdBQUY7QUFBYUM7QUFBYixDQUFELEtBQW1DO0FBQ3ZELFNBQ0U7QUFBSyxhQUFTLEVBQUMsV0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxnREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dDLGdEQUFPLENBQUNDLGlCQUFSLElBQ0M7QUFBUSxTQUFLLE1BQWI7QUFBYyxPQUFHLEVBQUcsK0NBQThDRCxnREFBTyxDQUFDQyxpQkFBa0IsRUFBNUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUZKLEVBSUdELGdEQUFPLENBQUNDLGlCQUFSLElBQ0M7QUFBUSwyQkFBdUIsRUFBRTtBQUM3QkMsWUFBTSxFQUFHOzs7OzsrQkFLUUYsZ0RBQU8sQ0FBQ0MsaUJBQWtCOztBQU5kLEtBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFMSixDQURGLEVBaUJFLE1BQUMseURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQWpCRixFQWtCRSxNQUFDLFNBQUQsZUFBZUYsU0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBbEJGLEVBbUJFLE1BQUMseURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQW5CRixDQURGO0FBdUJELENBeEJEOztBQTBCZUYsa0VBQWYiLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IHsgRm9vdGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Gb290ZXInO1xuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4uL2dsb2JhbHMnO1xuaW1wb3J0IHsgSGVhZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9IZWFkZXInO1xuaW1wb3J0ICcuLi9zdHlsZXMvYmFzZS5jc3MnO1xuXG5jb25zdCBBcHA6IFJlYWN0LkZDID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogYW55KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgIDxIZWFkPlxuICAgICAgICB7Z2xvYmFscy5nb29nbGVBbmFseXRpY3NJZCAmJiAoXG4gICAgICAgICAgPHNjcmlwdCBhc3luYyBzcmM9e2BodHRwczovL3d3dy5nb29nbGV0YWdtYW5hZ2VyLmNvbS9ndGFnL2pzP2lkPSR7Z2xvYmFscy5nb29nbGVBbmFseXRpY3NJZH1gfT48L3NjcmlwdD5cbiAgICAgICAgKX1cbiAgICAgICAge2dsb2JhbHMuZ29vZ2xlQW5hbHl0aWNzSWQgJiYgKFxuICAgICAgICAgIDxzY3JpcHQgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcbiAgICAgICAgICAgICAgX19odG1sOiBgXG4gICAgICAgICAgICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO31cbiAgICAgICAgICAgIGd0YWcoJ2pzJywgbmV3IERhdGUoKSk7XG5cbiAgICAgICAgICAgIGd0YWcoJ2dsb2JhbHMnLCAnJHtnbG9iYWxzLmdvb2dsZUFuYWx5dGljc0lkfScpO1xuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9fT48L3NjcmlwdD5cbiAgICAgICAgKX1cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxIZWFkZXIgLz5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDxGb290ZXIgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/base.css":
/*!*************************!*\
  !*** ./styles/base.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3N0eWxlcy9iYXNlLmNzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./styles/base.css\n");

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi private-next-pages/_app.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.tsx */"./pages/_app.tsx");


/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next/head\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIj81ZWYyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQvaGVhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvaGVhZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next/head\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ })

/******/ });