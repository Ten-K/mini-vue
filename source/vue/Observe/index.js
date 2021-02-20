import Observe from './observe'
export function initState(vm) {
  //做不同的初始化工作
  let opts = vm.$options
  if(opts.data){
    initData(vm)
  }
  if(opts.computed){
    initComputed()
  }
  if(opts.watch){
    initWatch()
  }
}

export function observe(data) {
  //判断是不是对象
  if( typeof data !== 'object' || data == null){
    return
  }
  return new Observe(data)
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get(){
      return vm[source][key]
    },
    set(newValue){ 
      return vm[source][key] = newValue
    }
  })
}

function initData(vm) {
  //获取用户传入的数据
  let data = vm.$options.data
  //判断是不是函数 把数据放在vm.data 方便观察
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  //vm._data代理vm的操作 
  Object.keys(data).forEach(key => {
    proxy(vm, "_data", key)
  })
  //观察数据
  observe(data)
}

function initComputed() {}

function initWatch() {}