import Vue from 'vue'
let vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'hello',
      haha: {
        a: 'hehe'
      },
      arr: [1, 2, 3],
      td: '铁蛋',
      age: '18'
    }
  },
  computed: {
    name() {
      return this.td + this.age
    }
  },
  watch: {
    msg(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  }
})
setTimeout(function(){
  vm.age = '90'
},1000)
console.log(vm)