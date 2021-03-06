const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
export const util = {
  getValue(vm, expr) {
    let keys = expr.split('.')
    return keys.reduce((memo, current) => {
      memo = memo[current]
      return memo
    }, vm)
  },
  compilerText(node, vm){
    if(!node.expr) {
      node.expr = node.textContent
    }
    node.textContent = node.expr.replace(defaultRE, function (...arg) {
      return util.getValue(vm, arg[1])
    })
  }
}
export function compiler(node, vm) {
  //取出子节点
  let childNodes = node.childNodes;
  //将类数组转换为数组
  [...childNodes].forEach(child => {
    if(child.nodeType === 1){
      compiler(child, vm)
    }else if(child.nodeType === 3){
      util.compilerText(child, vm)
    }
  })
}