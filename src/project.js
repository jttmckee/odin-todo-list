

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

export {Project};
