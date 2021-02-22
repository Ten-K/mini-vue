let id = 0
class Dep {
  constructor() {
    this.id = id++
    this.subs = []
  }
  addSub(watcher) { //订阅
    this.subs.push(watcher)
  }
  notify() {  //发布
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
  depend() {
    if(Dep.targer) {
      Dep.targer.addDep(this)
    }
  }
}
// 保存当前watcher
let stack = []
// 存
export function pushTarger(watcher) {
  Dep.targer = watcher
  stack.push(watcher)
}
// 取
export function popTarger(watcher) {
  stack.pop()
  Dep.targer = stack[stack.length - 1]
}
export default Dep