'use strict'
import { Item } from './item.js'
import Project from './project.js'
import Display from './display.js'
import UI from './ui.js'
import JMUtils from './jmUtils.js'

const projectList = localStorage.getObj('project-list')
console.log(projectList)
if (projectList) {
  Project.load()
} else {
  const test = Item('Add items to your todo list', new Date('2020-02-01'))

  const test2 = Item('Add another project', new Date('2020-03-01'))

  const test3 = Item('test', new Date('2020-04-01'))

  const defaultProject = Project.create('Default Project')

  defaultProject.addItems([test, test2, test3])

  Project.create('Test project')
}
Display.refresh()

document
  .getElementById('new-project-btn')
  .addEventListener('click', UI.newButton)

document.getElementById('new-todo-btn').addEventListener('click', UI.newButton)

console.log(
  document.getElementById('project-list').getElementsByClassName('select-btn')
)
document
  .getElementById('project-list')
  .getElementsByClassName('select-btn')
  .item(0)
  .classList.add('active-btn')
