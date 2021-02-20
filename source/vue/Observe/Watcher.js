let id = 0
class Watcher {
  constructor(vm, exprOrfn, cb = () => {}, opts){
    this.vm = vm
    this.exprOrfn = exprOrfn
    this.cb = cb
    this.id = id++
    if(typeof exprOrfn === 'function'){
      this.getter = exprOrfn
    }
    this.get() //默认创建一个watch,会调用自身的get方法
  }
  get(){
    this.getter()
  }
}
export default Watcher