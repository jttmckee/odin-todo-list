

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
export {display};
