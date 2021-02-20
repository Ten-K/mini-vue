import { observe } from './index'
import { arrayMethods, observeArray } from './arr'
class Observe {
  constructor(data){ //data   就是vue里面我们定义的data vm.data
    //将用户的数据使用defineProperty定义
    if(Array.isArray(data)){
      data.__proto__ = arrayMethods
      //只能拦截数组的方法，数组里的每一项还要去监听
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
  observe(value)
  Object.defineProperty(data, key, {
    get(){
      console.log('获取数据')
      return value
    },
    set(newValue){
      console.log('设置数据')
      if(value === newValue) return
      observe(newValue)
      value = newValue
    }
  })
}
export default Observe