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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");



const displayFormat = (value, type, listID) => {
  switch (type) {
    case 'date':
      const dd = value.getDate()
      const mm = value.getMonth() + 1
      const yy = value
        .getFullYear()
        .toString()
        .substr(-2)
      return `${dd}-${mm}-${yy}`
    case 'number':
      return value
    case 'checkbox':
      const checked = value ? 'checked' : ''
      return `
              <input type="checkbox" ${checked} class="completed-checkbox">
              `

    case 'button':
      return `
              <button class="select-btn select-${listID}">
              ${value}
              </button>
              `
    default:
      return value
  }
}
const Display = (() => {
  const displayList = (list, listID) => {
    const listElement = document.getElementById(listID)
    if (list.length === 0) {
      listElement.innerHTML = ''
    }
    let listHTML = list.reduce((accumulator, item) => {
      let itemHTML = item.propsForDisplay().reduce(
        (accu, entry) =>
          accu +
          ` <span class ="${entry.class}">
                  ${displayFormat(entry.prop, entry.type, listID)}
                  </span>`,
        ''
      )
      return (
        accumulator +
        `<li>
      <button class="edit-btn round-btn edit-${listID}">✎</button>
      ${itemHTML}
      <button class="delete-btn round-btn del-${listID}">-</button>

      </li>`
      )
    }, '')

    listElement.innerHTML = listHTML
    Array.from(document.getElementsByClassName('delete-btn')).forEach(
      button => {
        button.addEventListener('click', _ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].deleteButton)
      }
    )
    Array.from(document.getElementsByClassName('select-btn')).forEach(
      button => {
        button.addEventListener('click', _ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].selectButton)
      }
    )
    Array.from(document.getElementsByClassName('edit-btn')).forEach(
      button => {
        button.addEventListener('click', _ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].editButton)
      }
    )
    Array.from(document.getElementsByClassName('completed-checkbox')).forEach(
      button => {
        button.addEventListener('click', _ui_js__WEBPACK_IMPORTED_MODULE_1__["default"].completeButton)
      }
    )
  }
  const refresh = (activeProject = 0) => {
    displayList(_project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list, 'project-list')
    displayList(_project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list[activeProject].listItems(), 'todo-list')
    const allButtons = document.getElementsByClassName('select-project-list')

    allButtons.item(activeProject).classList.add('active-btn')
    _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].save()

  }
  return {
    displayList,
    refresh
  }
})()
/* harmony default export */ __webpack_exports__["default"] = (Display);


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
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");
/* harmony import */ var _jmUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./jmUtils.js */ "./src/jmUtils.js");







const projectList = localStorage.getObj('project-list')
console.log(projectList)
if (projectList) {
  _project_js__WEBPACK_IMPORTED_MODULE_1__["default"].load()
} else {
  const test = Object(_item_js__WEBPACK_IMPORTED_MODULE_0__["Item"])('Add items to your todo list', new Date('2020-02-01'))

  const test2 = Object(_item_js__WEBPACK_IMPORTED_MODULE_0__["Item"])('Add another project', new Date('2020-03-01'))

  const test3 = Object(_item_js__WEBPACK_IMPORTED_MODULE_0__["Item"])('test', new Date('2020-04-01'))

  const defaultProject = _project_js__WEBPACK_IMPORTED_MODULE_1__["default"].create('Default Project')

  defaultProject.addItems([test, test2, test3])

  _project_js__WEBPACK_IMPORTED_MODULE_1__["default"].create('Test project')
}
_display_js__WEBPACK_IMPORTED_MODULE_2__["default"].refresh()

document
  .getElementById('new-project-btn')
  .addEventListener('click', _ui_js__WEBPACK_IMPORTED_MODULE_3__["default"].newButton)

document.getElementById('new-todo-btn').addEventListener('click', _ui_js__WEBPACK_IMPORTED_MODULE_3__["default"].newButton)

console.log(
  document.getElementById('project-list').getElementsByClassName('select-btn')
)
document
  .getElementById('project-list')
  .getElementsByClassName('select-btn')
  .item(0)
  .classList.add('active-btn')


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
const Item = (__title = 'Item', _dueDate = null, _priority = 0) => {
  let priority
  let _title
  let dueDate
  let completed = false
  const getCompleted = () => completed
  const title = () => _title
  const titleSet = __title => {
    _title = __title
  }
  titleSet(__title)
  const getPriority = () => {
    return priority
  }
  const setPriority = priority_raw => {
    priority = Math.max(Math.min(priority_raw, 10), 0)
  }
  setPriority(_priority)
  const toggleComplete = () => {
    completed = !completed
  }

  const getDueDate = () => {
    return dueDate
  }

  const setDueDate = _dueDate => {
    if (
      _dueDate &&
      Object.prototype.toString.call(_dueDate) === '[object Date]' &&
      !isNaN(_dueDate)
    ) {
      console.log(_dueDate)
      dueDate = _dueDate
    } else {
      dueDate = new Date()
    }
  }
  setDueDate(_dueDate)
  const getPropsForSave = () => {
    return {
      title: title(),
      dueDate: getDueDate(),
      priority: getPriority(),
      completed: getCompleted()
    }
  }
  const propsForDisplay = () => {
    return [
      { descr: 'Description', prop: title(), class: 'item-description' },
      {
        descr: 'Due Date',
        prop: getDueDate(),
        class: 'item-due-date',
        type: 'date'
      },
      {
        descr: 'Priority',
        prop: getPriority(),
        class: 'item-priority',
        type: 'number'
      },
      {
        descr: 'Completed?',
        prop: getCompleted(),
        class: 'item-completed',
        type: 'checkbox'
      }
    ]
  }
  return {
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
    get title () {
      return _title
    },
    titleSet,
    getCompleted,
    toggleComplete,
    propsForDisplay,
    getPropsForSave
  }
}




/***/ }),

/***/ "./src/jmUtils.js":
/*!************************!*\
  !*** ./src/jmUtils.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Usage: localStorage.setObj(key, obj)
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
// Usage: let obj =  localStorage.getObj(key)
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

const JMUtils = {

}

/* harmony default export */ __webpack_exports__["default"] = (JMUtils);


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item.js */ "./src/item.js");

const Project = (() => {
  let projectList = []

  const _create = (_name = 'A todo list') => {
    let todos = []
    let name = _name

    const setName = _name => {
      name = _name
    }
    const getName = () => {
      return name
    }

    const addItem = item => {
      todos.push(item)
    }
    const addItems = items => {
      for (const index in items) {
        addItem(items[index])
      }
    }
    const listItems = () => {
      return todos.map((item, order) => Object.assign({}, item, { order }))
    }
    const removeItemAt = index => {
      let removedItem
      ;[removedItem] = todos.splice(index, 1)
      return removedItem
    }
    const getItemAt = order => Object.assign({}, todos[order], { order })
    const replaceItemWith = item => {
      todos[item.order] = item
    }
    const propsForDisplay = () => {
      return [
        {
          descr: 'Number of Items',
          class: 'project-number-items',
          prop: todos.length,
          readOnly: true
        },
        {
          descr: 'Project Name',
          class: 'project-name',
          prop: name,
          type: 'button'
        }
      ]
    }

    return {
      setName,
      getName,
      addItem,
      addItems,
      listItems,
      removeItemAt,
      getItemAt,
      replaceItemWith,
      propsForDisplay
    }
  }

  const create = name => {
    const newProject = _create(name)
    projectList.push(newProject)
    return newProject
  }
  const removeListAt = index => {
    return projectList.splice(index, 1)
  }
  const replaceList = list => {
    projectList = list
  }
  const save = () => {
    const saveProjectList = projectList.map(project => {
      return {
        todos: project.listItems().map(todo => {
          return todo.getPropsForSave()
        }),
        name: project.getName()
      }
    })
    localStorage.setObj('project-list', saveProjectList)
    console.log(localStorage.getObj('project-list', projectList))
  }
  const load = () => {
    const projectListPure = localStorage.getObj('project-list')
    console.log(projectListPure)
    projectList = projectListPure.map(project => {
      const newProject = create(project.name)
      project.todos.forEach(todo => {
        let newTodo = Object(_item_js__WEBPACK_IMPORTED_MODULE_0__["Item"])(todo.title, new Date(todo.dueDate), todo.priority)
        if (todo.completed) {
          newTodo.toggleComplete()
        }
        newProject.addItem(newTodo)
      })
      return newProject
    })
  }
  return {
    create,
    get list () {
      return projectList
    },
    removeListAt,
    replaceList,
    save,
    load
  }
})()
/* harmony default export */ __webpack_exports__["default"] = (Project);


/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _item_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item.js */ "./src/item.js");
/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display.js */ "./src/display.js");



const UI = (() => {
  const getActiveList = () => {
    const activeListButton = document
      .getElementsByClassName('select-project-list active-btn')
      .item(0)
    return getIndex(activeListButton.parentElement)
  }
  const getCleanDate = value => {
    const dd = ('0' + value.getDate()).substr(-2)
    const mm = ('0' + (value.getMonth() + 1)).substr(-2)
    const yyyy = value
      .getFullYear()
      .toString()
      .substr(-4)
    return `${yyyy}-${mm}-${dd}`
  }

  const newButton = event => {
    const projectIndex = getActiveList()
    if (event.target.id === 'new-project-btn') {
      const projectName = document.getElementById('new-project-input').value
      _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].create(projectName)
      _display_js__WEBPACK_IMPORTED_MODULE_2__["default"].refresh(projectIndex)

    } else if (event.target.id === 'new-todo-btn') {
      const name = document.getElementById('new-todo-name').value
      const date = new Date(document.getElementById('new-todo-date').value)
      const priority = parseInt(
        document.getElementById('new-todo-priority').value
      )
      const newTodo = Object(_item_js__WEBPACK_IMPORTED_MODULE_1__["Item"])(name, date, priority)
      _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list[projectIndex].addItem(newTodo)
      _display_js__WEBPACK_IMPORTED_MODULE_2__["default"].refresh(projectIndex)
    }
  }

  const getIndex = element => {
    const liElement = element.parentElement
    return [...liElement.parentNode.children].indexOf(liElement)
  }

  const deleteButton = event => {
    const liProjectIndex = getActiveList()
    if (event.target.classList.contains('del-project-list')) {
      const liIndex = getIndex(event.target)
      _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeListAt(liIndex)
      _display_js__WEBPACK_IMPORTED_MODULE_2__["default"].refresh(liProjectIndex)
    } else if (event.target.classList.contains('del-todo-list')) {
      // Find the active list
      const liItemIndex = getIndex(event.target)
      _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list[liProjectIndex].removeItemAt(liItemIndex)
      _display_js__WEBPACK_IMPORTED_MODULE_2__["default"].refresh(liProjectIndex)
    }
  }

  const saveName = event => {
    let input = event.target
    const projectIndex = parseInt(input.classList)
    const projectName = input.value
    _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list[projectIndex].setName(projectName)
    _display_js__WEBPACK_IMPORTED_MODULE_2__["default"].refresh(projectIndex)
  }

  const saveDetails = () => {
    const projectIndex = getActiveList()
    const itemNum = parseInt(
      document.getElementById('edit-todo-name').classList
    )
    const newName = document.getElementById('edit-todo-name').value
    const newDueDate = new Date(
      document.getElementById('edit-todo-date-name').value
    )
    const newPriority = parseInt(document.getElementById('edit-todo-priority-name').value)
    const item = _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list[projectIndex].listItems()[itemNum]
    item.titleSet(newName)
    item.setDueDate(newDueDate)
    item.setPriority(newPriority)
    _display_js__WEBPACK_IMPORTED_MODULE_2__["default"].refresh(projectIndex)
    window.removeEventListener('click', clickAnyWhere)
  }
  const clickAnyWhere = event => {
    if (
      !(event.target.parentElement)
      ||
      !(event.target.parentElement.children.item(1))
      ||
      (
      event.target.id !== 'input-wrapper' &&
      event.target.parentElement.id !== 'input-wrapper' &&
      event.target.parentElement.children.item(1).id !== 'input-wrapper'
    )
    ) {
      saveDetails()
    }
  }

  const getEditElement = (liIndex, li, klass) => {
    const element = li.parentElement.getElementsByClassName(klass).item(0)
    return element
  }

  const replaceEditElement = (
    type,
    element,
    index,
    name,
    inputType,
    custom
  ) => {
    element.outerHTML = `<input type="${inputType}" ${custom}
                              id="edit-${type}-name" class="${index}"
                              value = "${name}" >`
    let inputName = document.getElementById(`edit-${type}-name`)
    const functionCall = type === 'project' ? saveName : saveDetails
    inputName.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        functionCall(event)
      }
    })
    inputName.focus()
    return inputName
  }

  const editButton = event => {
    const button = event.target
    const liIndex = getIndex(button)
    if (button.classList.contains('edit-project-list')) {
      let element = getEditElement(liIndex, button, 'select-project-list')
      const projectName = _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list[liIndex].getName()
      const inputName = replaceEditElement(
        'project',
        element,
        liIndex,
        projectName,
        'text',
        'maxLength="18" size="21"'
      )
      inputName.addEventListener('focusout', saveName)
    } else if (event.target.classList.contains('edit-todo-list')) {
      // Find the active list
      const liProjectIndex = getActiveList()

      let _wrapper = getEditElement(liIndex, button, 'item-description')
      _wrapper.outerHTML = '<span id="input-wrapper"></span>'
      let wrapper = document.getElementById('input-wrapper')
      let _element = document.createElement('span')
      wrapper.appendChild(_element)
      _element.outerHTML = '<span id="input-placeholder"></span>'
      let element = document.getElementById('input-placeholder')
      const todoItem = _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list[liProjectIndex].listItems()[liIndex]
      const todoName = todoItem.title
      wrapper.appendChild(
        replaceEditElement('todo', element, liIndex, todoName, 'text', 'maxLength="30" size="33"')
      )

      let dueDateElement = getEditElement(liIndex, button, 'item-due-date')
      const dueDate = todoItem.getDueDate()
      wrapper.appendChild(
        replaceEditElement(
          'todo-date',
          dueDateElement,
          liIndex,
          getCleanDate(dueDate),
          'date',
          'size="7"'
        )
      )
      let priorityElement = getEditElement(liIndex, button, 'item-priority')
      const priority = parseInt(todoItem.getPriority())
      wrapper.appendChild(
        replaceEditElement(
          'todo-priority',
          priorityElement,
          liIndex,
          priority,
          'number',
          ' min="0" max="10"'
        )
      )

      window.addEventListener('click', clickAnyWhere)
    }
  }
  const selectButton = event => {
    if (event.target.classList.contains('active-btn')) return
    const liIndex = getIndex(event.target.parentElement)
    const allButtons = [
      ...document.getElementsByClassName(event.target.className)
    ]
    allButtons.forEach(button => {
      button.classList.remove('active-btn')
    })
    allButtons[liIndex].classList.add('active-btn')
    _display_js__WEBPACK_IMPORTED_MODULE_2__["default"].displayList(_project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list[liIndex].listItems(), 'todo-list')
  }
  const completeButton = (event) => {
    const liIndex = getIndex(event.target.parentElement)
    const projectIndex = getActiveList()
    _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].list[projectIndex].listItems()[liIndex].toggleComplete()
    _project_js__WEBPACK_IMPORTED_MODULE_0__["default"].save()
  }

  return {
    newButton,
    deleteButton,
    selectButton,
    editButton,
    completeButton

  }
})()

/* harmony default export */ __webpack_exports__["default"] = (UI);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map