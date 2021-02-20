// ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice']

import { observe } from "."

//获取数组原型上的方法
let oldArrayProtoMethods = Array.prototype
//赋值一份改新的
export let arrayMethods = Object.create(oldArrayProtoMethods)
//修改方法
let methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice']

export function observeArray(inserted) {
  inserted.forEach(item => {
    observe(item)
  })
}

methods.forEach(method => {
  arrayMethods[method] = function (...arg) {
    //不光返回新的数组方法，还要实行监听  
    let res = oldArrayProtoMethods[method].apply(this, arg)
    //拿到新增属性
    let inserted
    switch (method) {
      case 'push':
        break;
      case 'unshift':
        inserted = arg
        break;
      case 'splice':
        inserted = arg.slice(2)
        break;
      default:
        break;
    }
    //实现新增属性的监听
    if(inserted){
      observeArray(inserted)
    }
    return res
  }
})