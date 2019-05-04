import { Item } from './item.js'
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
        let newTodo = Item(todo.title, new Date(todo.dueDate), todo.priority)
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
export default Project
