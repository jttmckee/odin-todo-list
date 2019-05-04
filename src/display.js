import Project from './project.js'
import UI from './ui.js'

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
        button.addEventListener('click', UI.deleteButton)
      }
    )
    Array.from(document.getElementsByClassName('select-btn')).forEach(
      button => {
        button.addEventListener('click', UI.selectButton)
      }
    )
    Array.from(document.getElementsByClassName('edit-btn')).forEach(
      button => {
        button.addEventListener('click', UI.editButton)
      }
    )
    Array.from(document.getElementsByClassName('completed-checkbox')).forEach(
      button => {
        button.addEventListener('click', UI.completeButton)
      }
    )
  }
  const refresh = (activeProject = 0) => {
    displayList(Project.list, 'project-list')
    displayList(Project.list[activeProject].listItems(), 'todo-list')
    const allButtons = document.getElementsByClassName('select-project-list')

    allButtons.item(activeProject).classList.add('active-btn')
    Project.save()

  }
  return {
    displayList,
    refresh
  }
})()
export default Display
