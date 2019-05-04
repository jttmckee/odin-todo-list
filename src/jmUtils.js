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

export default JMUtils
