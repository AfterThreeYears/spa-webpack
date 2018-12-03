import {
  sync
} from './components/sync';
import( /* webpackChunkName: "my-chunk-name" */ './components/async').then(_ => {
  _.default.init();
});
import Vue from 'vue';
console.log(Vue);
const vm = new Vue({
  el: '#vue',
  data() {
    return {
      val: 1,
    };
  },
  render(_c) {
    // return h('h1', { attrs: { id: 'wbb' } }, '11')
    return _c('div', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (this.val),
        expression: "val"
      }],
      domProps: {
        "value": (this.val)
      },
      on: {
        "input": ($event) => {
          if ($event.target.composing) return;
          this.val = $event.target.value
        }
      }
    }), _c('p', [this._v(this._s(this.val))])])
  }
});

console.log("hello world");
sync();