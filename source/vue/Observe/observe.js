import { observe } from './index'
import { arrayMethods, observeArray, dependArray } from './arr'
import Dep from './dep'
class Observe {
  constructor(data){ // data   就是vue里面我们定义的data vm.data
    // 创建数组专用的dep
    this.dep = new Dep()
    // 给每一个对象包括我们数组添加一个属性,__ob__属性
    Object.defineProperty(data, '__ob__', {
      get: () => this
    })
    // 将用户的数据使用defineProperty定义
    if(Array.isArray(data)){
      data.__proto__ = arrayMethods
      // 只能拦截数组的方法，数组里的每一项还要去监听
      observeArray(data)
    }else{
      this.walk(data)
    }
  }
  walk(data){
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}
export function defineReactive(data, key, value) {
  // 观察是否是对象，是-递归监听
  let childOb = observe(value)
  let dep = new Dep()
  Object.defineProperty(data, key, {
    get(){
      if(Dep.targer){
        // watcher里面记录dep
        dep.depend()
        if(childOb) {
          childOb.dep.depend() // 数组收集当前渲染的watcher
          dependArray(value) // 收集儿子的依赖
        }
      }
      return value
    },
    set(newValue){
      console.log('设置数据')
      if(value === newValue) return
      observe(newValue)
      value = newValue
      dep.notify()
    }
  })
}
export default Observe