
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

export {Item};
