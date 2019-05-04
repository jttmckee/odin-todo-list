import Project from './project.js'
import { Item } from './item.js'
import Display from './display.js'
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
    if (event.target.id === 'new-project-btn') {
      const projectName = document.getElementById('new-project-input').value
      Project.create(projectName)
      Display.displayList(Project.list, 'project-list')
      Project.save()
    } else if (event.target.id === 'new-todo-btn') {
      const name = document.getElementById('new-todo-name').value
      const date = new Date(document.getElementById('new-todo-date').value)
      const priority = parseInt(
        document.getElementById('new-todo-priority').value
      )
      const newTodo = Item(name, date, priority)
      const projectIndex = getActiveList()
      Project.list[projectIndex].addItem(newTodo)
      Display.refresh(projectIndex)
    }
  }

  const getIndex = element => {
    const liElement = element.parentElement
    return [...liElement.parentNode.children].indexOf(liElement)
  }

  const deleteButton = event => {
    if (event.target.classList.contains('del-project-list')) {
      const liIndex = getIndex(event.target)
      Project.removeListAt(liIndex)
      Display.refresh()
    } else if (event.target.classList.contains('del-todo-list')) {
      // Find the active list
      const liItemIndex = getIndex(event.target)
      const liProjectIndex = getActiveList()
      Project.list[liProjectIndex].removeItemAt(liItemIndex)
      Display.refresh(liProjectIndex)
    }
  }

  const saveName = event => {
    let input = event.target
    const projectIndex = parseInt(input.classList)
    const projectName = input.value
    Project.list[projectIndex].setName(projectName)
    Display.refresh(projectIndex)
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
    const item = Project.list[projectIndex].listItems()[itemNum]
    item.titleSet(newName)
    item.setDueDate(newDueDate)
    item.setPriority(newPriority)
    Display.refresh(projectIndex)
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
      const projectName = Project.list[liIndex].getName()
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
      const todoItem = Project.list[liProjectIndex].listItems()[liIndex]
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
    Display.displayList(Project.list[liIndex].listItems(), 'todo-list')
  }
  const completeButton = (event) => {
    const liIndex = getIndex(event.target.parentElement)
    const projectIndex = getActiveList()
    Project.list[projectIndex].listItems()[liIndex].toggleComplete()
    Project.save()
  }

  return {
    newButton,
    deleteButton,
    selectButton,
    editButton,
    completeButton

  }
})()

export default UI
