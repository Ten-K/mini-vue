import Vue from 'vue'
let vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'hello',
      haha: {
        a: 'hehe'
      },
      arr: [1, 2, 3]
    }
  },
  computed: {},
  watch: {}
})
