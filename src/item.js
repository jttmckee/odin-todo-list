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
    dueDate = _dueDate
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

export { Item }
