/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! exports provided: display */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "display", function() { return display; });


const display = (list, listID) => {
  let listHTML = list.reduce((accumulator, item) => {
    let itemHTML  = item.propsForDisplay().reduce((accu, entry) =>
        accu + ` <span class ="${listID}-${entry.id}">${entry.prop}</span>`
        , "")
    return accumulator + `<li> ${itemHTML} </li>`;
  },"")

  const listElement = document.getElementById(listID);
  listElement.innerHTML = listHTML;
}



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item.js */ "./src/item.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display.js */ "./src/display.js");





const test = Object(_item_js__WEBPACK_IMPORTED_MODULE_0__["Item"])("Add items to your todo list", new Date("2020-02-01"));

const test2 = Object(_item_js__WEBPACK_IMPORTED_MODULE_0__["Item"])("Add another project", new Date("2020-03-01"));

const test3 = Object(_item_js__WEBPACK_IMPORTED_MODULE_0__["Item"])("test", new Date("2020-04-01"));

const defaultProject = Object(_project_js__WEBPACK_IMPORTED_MODULE_1__["Project"])("Default Project");

defaultProject.addItems([test,test2]);

const projectList = [defaultProject, Object(_project_js__WEBPACK_IMPORTED_MODULE_1__["Project"])("Another Project")];

Object(_display_js__WEBPACK_IMPORTED_MODULE_2__["display"])(projectList, 'project-list');


/***/ }),

/***/ "./src/item.js":
/*!*********************!*\
  !*** ./src/item.js ***!
  \*********************/
/*! exports provided: Item */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return Item; });

const Item = (title="Item", dueDate = null, _priority=0) => {
  let priority;
  let completed = false;
  const priority_set = (priority_raw) => {
    priority = Math.max(Math.min(priority_raw,10),0)
  };
  priority_set(_priority);
  const toggleComplete = () => {completed = !(completed)}
  const propsForDisplay = () => {
    return enInterface.encodeForDisplay({title}, {dueDate}, {priority}, {inputType:"checkbox",completed});
  }
  return { title,
          dueDate,
          get priority()  {
            return priority;
          },
          set priority(priority)  {
             priority_set(priority);
          },
          completed}
};




/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/*! exports provided: Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });


const Project = (name="A todo list") => {

  let todos = []

  const addItem = (item) => {
    todos.push(item);
  }
  const addItems = (items) => {
    for (const index in items) {
      addItem(items[index]);
    }
  }
  const listItems = () => {
    return todos.map((item,order) => Object.assign({},item,{order}))
  }
  const removeItemAt = (index) => {
    let removedItem;
    [removedItem] = todos.splice(index,1);
    return removedItem;
  }
  const getItemAt = (order) =>  Object.assign({},todos[order],{order})
  const replaceItemWith = (item) => {
    todos[order] = item;
  }
  const propsForDisplay = () => {
    return [{descr:"Project Name", class: "project-name", prop:name},
            {descr:"Number of Items", class: "project-number-items",
              prop: todos.length}];
  }

  return {
    name,
    addItem,
    addItems,
    listItems,
    removeItemAt,
    getItemAt,
    replaceItemWith,
    propsForDisplay,

  }

}




/***/ })

/******/ });
//# sourceMappingURL=main.js.map