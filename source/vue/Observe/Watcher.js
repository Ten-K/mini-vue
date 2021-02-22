import { popTarger, pushTarger } from "./dep"
import { util } from "./utils"

let id = 0
class Watcher {
  constructor(vm, exprOrfn, cb = () => {}, opts){
    this.vm = vm
    this.exprOrfn = exprOrfn
    this.cb = cb
    this.deps = []
    this.depsId = new Set()
    this.id = id++
    this.lazy = opts?.lazy
    this.dirty = this.lazy
    //如果是计算属性，不会默认调用get方法
    if(typeof exprOrfn === 'function'){
      this.getter = exprOrfn
    }else {
      //现在 exprOrfn 是我们传进来的key
      this.getter = function() {
        return util.getValue(vm, exprOrfn)
      }
    }
    this.value = this.lazy ? undefined : this.get() //旧值
    if(opts){
      this.user = true
    }
    this.get() //默认创建一个watch,会调用自身的get方法
  }
  evalValue() {
    this.value = this.get()
    this.dirty = false
  }
  get(){
    // 渲染watcher
    pushTarger(this)
    let value = this.getter.call(this.vm)
    popTarger()
    return value
  }
  update() {
    if(this.lazy){
      this.dirty = true
    }else{
      //批量更新 防止重复渲染
      queueWatcher(this)
    }
  }
  run() {
    let value = this.get()
    if(this.value !== value){
      this.cb(value, this.value)
    }
  }
  addDep(dep) {
    let id = dep.id
    if(!this.depsId.has(id)) {
      this.depsId.add(id)
      // 当前的watcher记住当前的dep
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
  depend(){
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend()
    }
  }
}
let has = {}, queue = []
function flusqueue() {
  queue.forEach(watcher => watcher.run())
  has = {}
  queue = []
}
function queueWatcher(watcher) {
  let id = watcher.id
  if(!has[id]) {
    has[id] = true
    queue.push(watcher)
  }
  nextTick(flusqueue)
}
let callback = []

function flusCallback() {
  callback.forEach(cb => cb())
}
function nextTick(flusqueue) {
  callback.push(flusqueue)
  let asyncFn = () => {
    flusCallback()
  }
  if(Promise) {
    Promise.resolve().then(asyncFn)
  }
    setTimeout(asyncFn, 0)
}
export default Watcher