import Vue from 'vue'

Vue.directive('click-outside', {
  bind(el: any, binding, vnode: any): void {
    el.clickOutsideEvent = function (event: { target: any }) {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        if (binding?.expression) vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
})
