import { compiler } from './Observe/utils'
import { initState } from './Observe'
import Watcher from './Observe/Watcher'
function Vue(options) { //vue中传入的参数
  //初始化用户传入的数据
  this._init(options)
}
Vue.prototype._init = function (options) {
  let vm = this
  vm.$options = options
  //重新初始化状态 data computed watch
  initState(vm)
  //初始化渲染页面
  if(vm.$options.el){
    vm.$mount()
  }
}
function query(el) {
  if(typeof el === 'string'){
    return document.querySelector(el)
  }
  return el
}
Vue.prototype.$mount = function() {
  let vm = this
  let el = vm.$options.el
  el = vm.$el = query(el) //获取当前节点
  //渲染节点 通过watcher渲染
  let updateComponent = () => {
    vm._update()
  }
  new Watcher(vm, updateComponent)
}
Vue.prototype._update = function() {
  //拿到数据更新视图
  let vm = this
  let el = vm.$el
  let node = document.createDocumentFragment()
  let firstChild
  while (firstChild = el.firstChild) {
    node.appendChild(firstChild)
  }
  //文本替换
  compiler(node, vm)
  el.appendChild(node) //替换完再放进去
}
Vue.prototype.$watch = function(key, handler) {
  let vm = this
  new Watcher(vm, key, handler, {
    user: true
  })
}
export default Vue