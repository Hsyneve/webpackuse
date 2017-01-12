import bar from './bar';
import Vue from 'vue';
bar();
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
     year: 'today is a nice day',
  }
})  