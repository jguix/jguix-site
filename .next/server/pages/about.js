module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"pages/about": 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("../" + ({}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/about/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Code.tsx":
/*!*****************************!*\
  !*** ./components/Code.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Code; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_syntax_highlighter_dist_cjs_styles_prism__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-syntax-highlighter/dist/cjs/styles/prism */ \"react-syntax-highlighter/dist/cjs/styles/prism\");\n/* harmony import */ var react_syntax_highlighter_dist_cjs_styles_prism__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_dist_cjs_styles_prism__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-syntax-highlighter */ \"react-syntax-highlighter\");\n/* harmony import */ var react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/Users/juangui/dev/jguixer/jguix-blog/components/Code.tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\nclass Code extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {\n  render() {\n    const {\n      language,\n      value\n    } = this.props;\n    return __jsx(react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__[\"Prism\"], {\n      language: (language === 'ts' ? 'typescript' : language) || 'typescript',\n      style: react_syntax_highlighter_dist_cjs_styles_prism__WEBPACK_IMPORTED_MODULE_1__[\"darcula\"],\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 12,\n        columnNumber: 7\n      }\n    }, value);\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0NvZGUudHN4P2JjMTgiXSwibmFtZXMiOlsiQ29kZSIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsInJlbmRlciIsImxhbmd1YWdlIiwidmFsdWUiLCJwcm9wcyIsImRhcmN1bGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFZSxNQUFNQSxJQUFOLFNBQW1CQyw0Q0FBSyxDQUFDQyxhQUF6QixDQUdaO0FBQ0RDLFFBQU0sR0FBRztBQUNQLFVBQU07QUFBRUMsY0FBRjtBQUFZQztBQUFaLFFBQXNCLEtBQUtDLEtBQWpDO0FBQ0EsV0FDRSxNQUFDLDhEQUFEO0FBQ0UsY0FBUSxFQUFFLENBQUNGLFFBQVEsS0FBSyxJQUFiLEdBQW9CLFlBQXBCLEdBQW1DQSxRQUFwQyxLQUFpRCxZQUQ3RDtBQUVFLFdBQUssRUFBRUcsc0ZBRlQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUlHRixLQUpILENBREY7QUFRRDs7QUFYQSIsImZpbGUiOiIuL2NvbXBvbmVudHMvQ29kZS50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZGFyY3VsYSB9IGZyb20gJ3JlYWN0LXN5bnRheC1oaWdobGlnaHRlci9kaXN0L2Nqcy9zdHlsZXMvcHJpc20nO1xuaW1wb3J0IHsgUHJpc20gYXMgU3ludGF4SGlnaGxpZ2h0ZXIgfSBmcm9tICdyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2RlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDx7XG4gIGxhbmd1YWdlOiBzdHJpbmc7XG4gIHZhbHVlPzogc3RyaW5nO1xufT4ge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYW5ndWFnZSwgdmFsdWUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTeW50YXhIaWdobGlnaHRlclxuICAgICAgICBsYW5ndWFnZT17KGxhbmd1YWdlID09PSAndHMnID8gJ3R5cGVzY3JpcHQnIDogbGFuZ3VhZ2UpIHx8ICd0eXBlc2NyaXB0J31cbiAgICAgICAgc3R5bGU9e2RhcmN1bGF9XG4gICAgICA+XG4gICAgICAgIHt2YWx1ZX1cbiAgICAgIDwvU3ludGF4SGlnaGxpZ2h0ZXI+XG4gICAgKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Code.tsx\n");

/***/ }),

/***/ "./components/Markdown.tsx":
/*!*********************************!*\
  !*** ./components/Markdown.tsx ***!
  \*********************************/
/*! exports provided: Markdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Markdown\", function() { return Markdown; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Code__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Code */ \"./components/Code.tsx\");\n/* harmony import */ var react_markdown_with_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-markdown/with-html */ \"react-markdown/with-html\");\n/* harmony import */ var react_markdown_with_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_markdown_with_html__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/Users/juangui/dev/jguixer/jguix-blog/components/Markdown.tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\nconst Markdown = props => {\n  return __jsx(\"div\", {\n    style: {\n      width: '100%'\n    },\n    className: \"devii-markdown\",\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 7,\n      columnNumber: 5\n    }\n  }, __jsx(react_markdown_with_html__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    key: \"content\",\n    source: props.source,\n    renderers: {\n      code: _Code__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n    },\n    escapeHtml: false,\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 8,\n      columnNumber: 7\n    }\n  }));\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL01hcmtkb3duLnRzeD9lM2ZkIl0sIm5hbWVzIjpbIk1hcmtkb3duIiwicHJvcHMiLCJ3aWR0aCIsInNvdXJjZSIsImNvZGUiLCJDb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFTyxNQUFNQSxRQUFzQyxHQUFJQyxLQUFELElBQVc7QUFDL0QsU0FDRTtBQUFLLFNBQUssRUFBRTtBQUFFQyxXQUFLLEVBQUU7QUFBVCxLQUFaO0FBQStCLGFBQVMsRUFBQyxnQkFBekM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsK0RBQUQ7QUFDRSxPQUFHLEVBQUMsU0FETjtBQUVFLFVBQU0sRUFBRUQsS0FBSyxDQUFDRSxNQUZoQjtBQUdFLGFBQVMsRUFBRTtBQUNUQyxVQUFJLEVBQUVDLDZDQUFJQTtBQURELEtBSGI7QUFNRSxjQUFVLEVBQUUsS0FOZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsQ0FERjtBQVlELENBYk0iLCJmaWxlIjoiLi9jb21wb25lbnRzL01hcmtkb3duLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ29kZSBmcm9tICcuL0NvZGUnO1xuaW1wb3J0IFJlYWN0TWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24vd2l0aC1odG1sJztcblxuZXhwb3J0IGNvbnN0IE1hcmtkb3duOiBSZWFjdC5GQzx7IHNvdXJjZTogc3RyaW5nIH0+ID0gKHByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19IGNsYXNzTmFtZT1cImRldmlpLW1hcmtkb3duXCI+XG4gICAgICA8UmVhY3RNYXJrZG93blxuICAgICAgICBrZXk9XCJjb250ZW50XCJcbiAgICAgICAgc291cmNlPXtwcm9wcy5zb3VyY2V9XG4gICAgICAgIHJlbmRlcmVycz17e1xuICAgICAgICAgIGNvZGU6IENvZGUsXG4gICAgICAgIH19XG4gICAgICAgIGVzY2FwZUh0bWw9e2ZhbHNlfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Markdown.tsx\n");

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

/***/ "./loader.ts":
/*!*******************!*\
  !*** ./loader.ts ***!
  \*******************/
/*! exports provided: loadMarkdownFile, mdToPost, loadMarkdownFiles, loadPost, loadBlogPosts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadMarkdownFile\", function() { return loadMarkdownFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mdToPost\", function() { return mdToPost; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadMarkdownFiles\", function() { return loadMarkdownFiles; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadPost\", function() { return loadPost; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadBlogPosts\", function() { return loadBlogPosts; });\n/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gray-matter */ \"gray-matter\");\n/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gray_matter__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! glob */ \"glob\");\n/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(glob__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals */ \"./globals.ts\");\n\n\n\nconst loadMarkdownFile = async path => {\n  const mdFile = await __webpack_require__(\"./md lazy recursive ^\\\\.\\\\/.*$\")(`./${path}`);\n  return {\n    path,\n    contents: mdFile.default\n  };\n};\nconst mdToPost = file => {\n  const metadata = gray_matter__WEBPACK_IMPORTED_MODULE_0___default()(file.contents);\n  const path = file.path.replace('.md', '');\n  const post = {\n    path,\n    title: metadata.data.title,\n    subtitle: metadata.data.subtitle || null,\n    published: metadata.data.published || false,\n    datePublished: metadata.data.datePublished || null,\n    tags: metadata.data.tags || null,\n    description: metadata.data.description || null,\n    canonicalUrl: metadata.data.canonicalUrl || `${_globals__WEBPACK_IMPORTED_MODULE_2__[\"globals\"].url}/${path}`,\n    author: metadata.data.author || null,\n    authorPhoto: metadata.data.authorPhoto || null,\n    authorTwitter: metadata.data.authorTwitter || null,\n    bannerPhoto: metadata.data.bannerPhoto || null,\n    thumbnailPhoto: metadata.data.thumbnailPhoto || null,\n    content: metadata.content\n  };\n  if (!post.title) throw new Error(`Missing required field: title.`);\n  if (!post.content) throw new Error(`Missing required field: content.`);\n  if (!post.datePublished) throw new Error(`Missing required field: datePublished.`);\n  return post;\n};\nconst loadMarkdownFiles = async path => {\n  const blogPaths = glob__WEBPACK_IMPORTED_MODULE_1___default.a.sync(`./md/${path}`);\n  const postDataList = await Promise.all(blogPaths.map(blogPath => {\n    const modPath = blogPath.slice(blogPath.indexOf(`md/`) + 3);\n    return loadMarkdownFile(`${modPath}`);\n  }));\n  return postDataList;\n};\nconst loadPost = async path => {\n  const file = await loadMarkdownFile(path);\n  return mdToPost(file);\n};\nconst loadBlogPosts = async () => {\n  return await (await loadMarkdownFiles(`blog/*.md`)).map(mdToPost).filter(p => p.published).sort((a, b) => (b.datePublished || 0) - (a.datePublished || 0));\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9sb2FkZXIudHM/MzQ2YiJdLCJuYW1lcyI6WyJsb2FkTWFya2Rvd25GaWxlIiwicGF0aCIsIm1kRmlsZSIsImNvbnRlbnRzIiwiZGVmYXVsdCIsIm1kVG9Qb3N0IiwiZmlsZSIsIm1ldGFkYXRhIiwibWF0dGVyIiwicmVwbGFjZSIsInBvc3QiLCJ0aXRsZSIsImRhdGEiLCJzdWJ0aXRsZSIsInB1Ymxpc2hlZCIsImRhdGVQdWJsaXNoZWQiLCJ0YWdzIiwiZGVzY3JpcHRpb24iLCJjYW5vbmljYWxVcmwiLCJnbG9iYWxzIiwidXJsIiwiYXV0aG9yIiwiYXV0aG9yUGhvdG8iLCJhdXRob3JUd2l0dGVyIiwiYmFubmVyUGhvdG8iLCJ0aHVtYm5haWxQaG90byIsImNvbnRlbnQiLCJFcnJvciIsImxvYWRNYXJrZG93bkZpbGVzIiwiYmxvZ1BhdGhzIiwiZ2xvYiIsInN5bmMiLCJwb3N0RGF0YUxpc3QiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiYmxvZ1BhdGgiLCJtb2RQYXRoIiwic2xpY2UiLCJpbmRleE9mIiwibG9hZFBvc3QiLCJsb2FkQmxvZ1Bvc3RzIiwiZmlsdGVyIiwicCIsInNvcnQiLCJhIiwiYiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQXFCTyxNQUFNQSxnQkFBZ0IsR0FBRyxNQUFPQyxJQUFQLElBQTBDO0FBQ3hFLFFBQU1DLE1BQU0sR0FBRyxNQUFNLHNEQUFRLEtBQU9ELElBQUssRUFBcEIsQ0FBckI7QUFDQSxTQUFPO0FBQUVBLFFBQUY7QUFBUUUsWUFBUSxFQUFFRCxNQUFNLENBQUNFO0FBQXpCLEdBQVA7QUFDRCxDQUhNO0FBS0EsTUFBTUMsUUFBUSxHQUFJQyxJQUFELElBQTZCO0FBQ25ELFFBQU1DLFFBQVEsR0FBR0Msa0RBQU0sQ0FBQ0YsSUFBSSxDQUFDSCxRQUFOLENBQXZCO0FBQ0EsUUFBTUYsSUFB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Qy9CLGFBQUYsSUFBbUIsQ0FBcEIsS0FBMEI4QixDQUFDLENBQUM5QixhQUFGLElBQW1CLENBQTdDLENBSEwsQ0FBYjtBQUlELENBTE0iLCJmaWxlIjoiLi9sb2FkZXIudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJztcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InO1xuaW1wb3J0IHsgZ2xvYmFscyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbmV4cG9ydCB0eXBlIFBvc3REYXRhID0ge1xuICBwYXRoOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHN1YnRpdGxlPzogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBjYW5vbmljYWxVcmw/OiBzdHJpbmc7XG4gIHB1Ymxpc2hlZDogYm9vbGVhbjtcbiAgZGF0ZVB1Ymxpc2hlZDogbnVtYmVyO1xuICBhdXRob3I/OiBzdHJpbmc7XG4gIGF1dGhvclBob3RvPzogc3RyaW5nO1xuICBhdXRob3JUd2l0dGVyPzogc3RyaW5nO1xuICB0YWdzPzogc3RyaW5nW107XG4gIGJhbm5lclBob3RvPzogc3RyaW5nO1xuICB0aHVtYm5haWxQaG90bz86IHN0cmluZztcbn07XG5cbnR5cGUgUmF3RmlsZSA9IHsgcGF0aDogc3RyaW5nOyBjb250ZW50czogc3RyaW5nIH07XG5cbmV4cG9ydCBjb25zdCBsb2FkTWFya2Rvd25GaWxlID0gYXN5bmMgKHBhdGg6IHN0cmluZyk6IFByb21pc2U8UmF3RmlsZT4gPT4ge1xuICBjb25zdCBtZEZpbGUgPSBhd2FpdCBpbXBvcnQoYC4vbWQvJHtwYXRofWApO1xuICByZXR1cm4geyBwYXRoLCBjb250ZW50czogbWRGaWxlLmRlZmF1bHQgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBtZFRvUG9zdCA9IChmaWxlOiBSYXdGaWxlKTogUG9zdERhdGEgPT4ge1xuICBjb25zdCBtZXRhZGF0YSA9IG1hdHRlcihmaWxlLmNvbnRlbnRzKTtcbiAgY29uc3QgcGF0aCA9IGZpbGUucGF0aC5yZXBsYWNlKCcubWQnLCAnJyk7XG4gIGNvbnN0IHBvc3QgPSB7XG4gICAgcGF0aCxcbiAgICB0aXRsZTogbWV0YWRhdGEuZGF0YS50aXRsZSxcbiAgICBzdWJ0aXRsZTogbWV0YWRhdGEuZGF0YS5zdWJ0aXRsZSB8fCBudWxsLFxuICAgIHB1Ymxpc2hlZDogbWV0YWRhdGEuZGF0YS5wdWJsaXNoZWQgfHwgZmFsc2UsXG4gICAgZGF0ZVB1Ymxpc2hlZDogbWV0YWRhdGEuZGF0YS5kYXRlUHVibGlzaGVkIHx8IG51bGwsXG4gICAgdGFnczogbWV0YWRhdGEuZGF0YS50YWdzIHx8IG51bGwsXG4gICAgZGVzY3JpcHRpb246IG1ldGFkYXRhLmRhdGEuZGVzY3JpcHRpb24gfHwgbnVsbCxcbiAgICBjYW5vbmljYWxVcmw6IG1ldGFkYXRhLmRhdGEuY2Fub25pY2FsVXJsIHx8IGAke2dsb2JhbHMudXJsfS8ke3BhdGh9YCxcbiAgICBhdXRob3I6IG1ldGFkYXRhLmRhdGEuYXV0aG9yIHx8IG51bGwsXG4gICAgYXV0aG9yUGhvdG86IG1ldGFkYXRhLmRhdGEuYXV0aG9yUGhvdG8gfHwgbnVsbCxcbiAgICBhdXRob3JUd2l0dGVyOiBtZXRhZGF0YS5kYXRhLmF1dGhvclR3aXR0ZXIgfHwgbnVsbCxcbiAgICBiYW5uZXJQaG90bzogbWV0YWRhdGEuZGF0YS5iYW5uZXJQaG90byB8fCBudWxsLFxuICAgIHRodW1ibmFpbFBob3RvOiBtZXRhZGF0YS5kYXRhLnRodW1ibmFpbFBob3RvIHx8IG51bGwsXG4gICAgY29udGVudDogbWV0YWRhdGEuY29udGVudCxcbiAgfTtcblxuICBpZiAoIXBvc3QudGl0bGUpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIHJlcXVpcmVkIGZpZWxkOiB0aXRsZS5gKTtcblxuICBpZiAoIXBvc3QuY29udGVudClcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgcmVxdWlyZWQgZmllbGQ6IGNvbnRlbnQuYCk7XG5cbiAgaWYgKCFwb3N0LmRhdGVQdWJsaXNoZWQpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIHJlcXVpcmVkIGZpZWxkOiBkYXRlUHVibGlzaGVkLmApO1xuXG4gIHJldHVybiBwb3N0IGFzIFBvc3REYXRhO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRNYXJrZG93bkZpbGVzID0gYXN5bmMgKHBhdGg6IHN0cmluZykgPT4ge1xuICBjb25zdCBibG9nUGF0aHMgPSBnbG9iLnN5bmMoYC4vbWQvJHtwYXRofWApO1xuICBjb25zdCBwb3N0RGF0YUxpc3QgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBibG9nUGF0aHMubWFwKChibG9nUGF0aCkgPT4ge1xuICAgICAgY29uc3QgbW9kUGF0aCA9IGJsb2dQYXRoLnNsaWNlKGJsb2dQYXRoLmluZGV4T2YoYG1kL2ApICsgMyk7XG4gICAgICByZXR1cm4gbG9hZE1hcmtkb3duRmlsZShgJHttb2RQYXRofWApO1xuICAgIH0pXG4gICk7XG4gIHJldHVybiBwb3N0RGF0YUxpc3Q7XG59O1xuXG5leHBvcnQgY29uc3QgbG9hZFBvc3QgPSBhc3luYyAocGF0aDogc3RyaW5nKTogUHJvbWlzZTxQb3N0RGF0YT4gPT4ge1xuICBjb25zdCBmaWxlID0gYXdhaXQgbG9hZE1hcmtkb3duRmlsZShwYXRoKTtcbiAgcmV0dXJuIG1kVG9Qb3N0KGZpbGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRCbG9nUG9zdHMgPSBhc3luYyAoKTogUHJvbWlzZTxQb3N0RGF0YVtdPiA9PiB7XG4gIHJldHVybiBhd2FpdCAoYXdhaXQgbG9hZE1hcmtkb3duRmlsZXMoYGJsb2cvKi5tZGApKVxuICAgIC5tYXAobWRUb1Bvc3QpXG4gICAgLmZpbHRlcigocCkgPT4gcC5wdWJsaXNoZWQpXG4gICAgLnNvcnQoKGEsIGIpID0+IChiLmRhdGVQdWJsaXNoZWQgfHwgMCkgLSAoYS5kYXRlUHVibGlzaGVkIHx8IDApKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./loader.ts\n");

/***/ }),

/***/ "./md lazy recursive ^\\.\\/.*$":
/*!*******************************************!*\
  !*** ./md lazy ^\.\/.*$ namespace object ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./about.md\": [\n\t\t\"./md/about.md\",\n\t\t10\n\t],\n\t\"./blog/2018-03_angular-cli-github-pages-stackblitz.md\": [\n\t\t\"./md/blog/2018-03_angular-cli-github-pages-stackblitz.md\",\n\t\t1\n\t],\n\t\"./blog/2018-04_versioning-features-in-an-angular-app.md\": [\n\t\t\"./md/blog/2018-04_versioning-features-in-an-angular-app.md\",\n\t\t2\n\t],\n\t\"./blog/2018-08_ionic-stencil-integration.md\": [\n\t\t\"./md/blog/2018-08_ionic-stencil-integration.md\",\n\t\t3\n\t],\n\t\"./blog/2019-05_circular-design-sprint.md\": [\n\t\t\"./md/blog/2019-05_circular-design-sprint.md\",\n\t\t4\n\t],\n\t\"./blog/2020-05_creating-a-chrome-extension.md\": [\n\t\t\"./md/blog/2020-05_creating-a-chrome-extension.md\",\n\t\t5\n\t],\n\t\"./blog/2020-08_redux-normalized-store-part-1.md\": [\n\t\t\"./md/blog/2020-08_redux-normalized-store-part-1.md\",\n\t\t6\n\t],\n\t\"./blog/2021-01_redux-normalized-store-part-2.md\": [\n\t\t\"./md/blog/2021-01_redux-normalized-store-part-2.md\",\n\t\t7\n\t],\n\t\"./features.md\": [\n\t\t\"./md/features.md\",\n\t\t8\n\t],\n\t\"./introduction.md\": [\n\t\t\"./md/introduction.md\",\n\t\t9\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(function() {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(function() {\n\t\treturn __webpack_require__(id);\n\t});\n}\nwebpackAsyncContext.keys = function webpackAsyncContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackAsyncContext.id = \"./md lazy recursive ^\\\\.\\\\/.*$\";\nmodule.exports = webpackAsyncContext;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9tZCBsYXp5IF5cXC5cXC8uKiQgbmFtZXNwYWNlIG9iamVjdD81MmRjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vbWQgbGF6eSByZWN1cnNpdmUgXlxcLlxcLy4qJC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBtYXAgPSB7XG5cdFwiLi9hYm91dC5tZFwiOiBbXG5cdFx0XCIuL21kL2Fib3V0Lm1kXCIsXG5cdFx0MTBcblx0XSxcblx0XCIuL2Jsb2cvMjAxOC0wM19hbmd1bGFyLWNsaS1naXRodWItcGFnZXMtc3RhY2tibGl0ei5tZFwiOiBbXG5cdFx0XCIuL21kL2Jsb2cvMjAxOC0wM19hbmd1bGFyLWNsaS1naXRodWItcGFnZXMtc3RhY2tibGl0ei5tZFwiLFxuXHRcdDFcblx0XSxcblx0XCIuL2Jsb2cvMjAxOC0wNF92ZXJzaW9uaW5nLWZlYXR1cmVzLWluLWFuLWFuZ3VsYXItYXBwLm1kXCI6IFtcblx0XHRcIi4vbWQvYmxvZy8yMDE4LTA0X3ZlcnNpb25pbmctZmVhdHVyZXMtaW4tYW4tYW5ndWxhci1hcHAubWRcIixcblx0XHQyXG5cdF0sXG5cdFwiLi9ibG9nLzIwMTgtMDhfaW9uaWMtc3RlbmNpbC1pbnRlZ3JhdGlvbi5tZFwiOiBbXG5cdFx0XCIuL21kL2Jsb2cvMjAxOC0wOF9pb25pYy1zdGVuY2lsLWludGVncmF0aW9uLm1kXCIsXG5cdFx0M1xuXHRdLFxuXHRcIi4vYmxvZy8yMDE5LTA1X2NpcmN1bGFyLWRlc2lnbi1zcHJpbnQubWRcIjogW1xuXHRcdFwiLi9tZC9ibG9nLzIwMTktMDVfY2lyY3VsYXItZGVzaWduLXNwcmludC5tZFwiLFxuXHRcdDRcblx0XSxcblx0XCIuL2Jsb2cvMjAyMC0wNV9jcmVhdGluZy1hLWNocm9tZS1leHRlbnNpb24ubWRcIjogW1xuXHRcdFwiLi9tZC9ibG9nLzIwMjAtMDVfY3JlYXRpbmctYS1jaHJvbWUtZXh0ZW5zaW9uLm1kXCIsXG5cdFx0NVxuXHRdLFxuXHRcIi4vYmxvZy8yMDIwLTA4X3JlZHV4LW5vcm1hbGl6ZWQtc3RvcmUtcGFydC0xLm1kXCI6IFtcblx0XHRcIi4vbWQvYmxvZy8yMDIwLTA4X3JlZHV4LW5vcm1hbGl6ZWQtc3RvcmUtcGFydC0xLm1kXCIsXG5cdFx0NlxuXHRdLFxuXHRcIi4vYmxvZy8yMDIxLTAxX3JlZHV4LW5vcm1hbGl6ZWQtc3RvcmUtcGFydC0yLm1kXCI6IFtcblx0XHRcIi4vbWQvYmxvZy8yMDIxLTAxX3JlZHV4LW5vcm1hbGl6ZWQtc3RvcmUtcGFydC0yLm1kXCIsXG5cdFx0N1xuXHRdLFxuXHRcIi4vZmVhdHVyZXMubWRcIjogW1xuXHRcdFwiLi9tZC9mZWF0dXJlcy5tZFwiLFxuXHRcdDhcblx0XSxcblx0XCIuL2ludHJvZHVjdGlvbi5tZFwiOiBbXG5cdFx0XCIuL21kL2ludHJvZHVjdGlvbi5tZFwiLFxuXHRcdDlcblx0XVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tBc3luY0NvbnRleHQocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH0pO1xuXHR9XG5cblx0dmFyIGlkcyA9IG1hcFtyZXFdLCBpZCA9IGlkc1swXTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShpZHNbMV0pLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xuXHR9KTtcbn1cbndlYnBhY2tBc3luY0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tBc3luY0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQXN5bmNDb250ZXh0LmlkID0gXCIuL21kIGxhenkgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tBc3luY0NvbnRleHQ7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./md lazy recursive ^\\.\\/.*$\n");

/***/ }),

/***/ "./pages/about/index.tsx":
/*!*******************************!*\
  !*** ./pages/about/index.tsx ***!
  \*******************************/
/*! exports provided: default, getStaticProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStaticProps\", function() { return getStaticProps; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Markdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Markdown */ \"./components/Markdown.tsx\");\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../loader */ \"./loader.ts\");\nvar _jsxFileName = \"/Users/juangui/dev/jguixer/jguix-blog/pages/about/index.tsx\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\nconst About = ({\n  about\n}) => {\n  return __jsx(\"div\", {\n    className: \"content\",\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 5\n    }\n  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 7\n    }\n  }, __jsx(\"title\", {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 9\n    }\n  }, \"About me\"), __jsx(\"link\", {\n    rel: \"icon\",\n    href: \"/favicon.ico\",\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 13,\n      columnNumber: 9\n    }\n  })), __jsx(\"div\", {\n    className: \"introduction\",\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 16,\n      columnNumber: 7\n    }\n  }, __jsx(\"h1\", {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 17,\n      columnNumber: 9\n    }\n  }, \"Juangui Jord\\xE1n\"), __jsx(_components_Markdown__WEBPACK_IMPORTED_MODULE_2__[\"Markdown\"], {\n    source: about,\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 18,\n      columnNumber: 9\n    }\n  })));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (About);\nconst getStaticProps = async () => {\n  const about = await Object(_loader__WEBPACK_IMPORTED_MODULE_3__[\"loadMarkdownFile\"])(\"about.md\");\n  const props = {\n    about: about.contents\n  };\n  return {\n    props\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hYm91dC9pbmRleC50c3g/OGQ3MiJdLCJuYW1lcyI6WyJBYm91dCIsImFib3V0IiwiZ2V0U3RhdGljUHJvcHMiLCJsb2FkTWFya2Rvd25GaWxlIiwicHJvcHMiLCJjb250ZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7O0FBSUEsTUFBTUEsS0FBZ0IsR0FBRyxDQUFDO0FBQUVDO0FBQUYsQ0FBRCxLQUFlO0FBQ3RDLFNBQ0U7QUFBSyxhQUFTLEVBQUMsU0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxnREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixFQUVFO0FBQU0sT0FBRyxFQUFDLE1BQVY7QUFBaUIsUUFBSSxFQUFDLGNBQXRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFGRixDQURGLEVBTUU7QUFBSyxhQUFTLEVBQUMsY0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFERixFQUVFLE1BQUMsNkRBQUQ7QUFBVSxVQUFNLEVBQUVBLEtBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFGRixDQU5GLENBREY7QUFhRCxDQWREOztBQWdCZUQsb0VBQWY7QUFFTyxNQUFNRSxjQUFjLEdBQUcsWUFBWTtBQUN4QyxRQUFNRCxLQUFLLEdBQUcsTUFBTUUsZ0VBQWdCLENBQUMsVUFBRCxDQUFwQztBQUVBLFFBQU1DLEtBQUssR0FBRztBQUNaSCxTQUFLLEVBQUVBLEtBQUssQ0FBQ0k7QUFERCxHQUFkO0FBSUEsU0FBTztBQUFFRDtBQUFGLEdBQVA7QUFDRCxDQVJNIiwiZmlsZSI6Ii4vcGFnZXMvYWJvdXQvaW5kZXgudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuaW1wb3J0IHsgRkMgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE1hcmtkb3duIH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvTWFya2Rvd25cIjtcbmltcG9ydCB7IGxvYWRNYXJrZG93bkZpbGUgfSBmcm9tIFwiLi4vLi4vbG9hZGVyXCI7XG5cbnR5cGUgUHJvcHMgPSB7IGFib3V0OiBzdHJpbmcgfTtcblxuY29uc3QgQWJvdXQ6IEZDPFByb3BzPiA9ICh7IGFib3V0IH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+QWJvdXQgbWU8L3RpdGxlPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLmljb1wiIC8+XG4gICAgICA8L0hlYWQ+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50cm9kdWN0aW9uXCI+XG4gICAgICAgIDxoMT5KdWFuZ3VpIEpvcmTDoW48L2gxPlxuICAgICAgICA8TWFya2Rvd24gc291cmNlPXthYm91dH0gLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWJvdXQ7XG5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQcm9wcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgYWJvdXQgPSBhd2FpdCBsb2FkTWFya2Rvd25GaWxlKFwiYWJvdXQubWRcIik7XG5cbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgYWJvdXQ6IGFib3V0LmNvbnRlbnRzLFxuICB9O1xuXG4gIHJldHVybiB7IHByb3BzIH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/about/index.tsx\n");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"glob\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJnbG9iXCI/ODYzMSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJnbG9iLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ2xvYlwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///glob\n");

/***/ }),

/***/ "gray-matter":
/*!******************************!*\
  !*** external "gray-matter" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"gray-matter\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncmF5LW1hdHRlclwiP2Y4YmMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZ3JheS1tYXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmF5LW1hdHRlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///gray-matter\n");

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

/***/ }),

/***/ "react-markdown/with-html":
/*!*******************************************!*\
  !*** external "react-markdown/with-html" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-markdown/with-html\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1tYXJrZG93bi93aXRoLWh0bWxcIj8wMzFjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0LW1hcmtkb3duL3dpdGgtaHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LW1hcmtkb3duL3dpdGgtaHRtbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-markdown/with-html\n");

/***/ }),

/***/ "react-syntax-highlighter":
/*!*******************************************!*\
  !*** external "react-syntax-highlighter" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-syntax-highlighter\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXJcIj8wZGE1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0LXN5bnRheC1oaWdobGlnaHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXN5bnRheC1oaWdobGlnaHRlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-syntax-highlighter\n");

/***/ }),

/***/ "react-syntax-highlighter/dist/cjs/styles/prism":
/*!*****************************************************************!*\
  !*** external "react-syntax-highlighter/dist/cjs/styles/prism" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-syntax-highlighter/dist/cjs/styles/prism\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXIvZGlzdC9janMvc3R5bGVzL3ByaXNtXCI/N2EwMiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJyZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXIvZGlzdC9janMvc3R5bGVzL3ByaXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyL2Rpc3QvY2pzL3N0eWxlcy9wcmlzbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-syntax-highlighter/dist/cjs/styles/prism\n");

/***/ })

/******/ });