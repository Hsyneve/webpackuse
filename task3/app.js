import Vue from 'vue';
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todolist: [],
    },
    created: function() {
 window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.todolist) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
      window.localStorage.setItem('myTodos', dataString) // 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
     window.localStorage.setItem('newtodo', JSON.stringify(this.newTodo)) }

    let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    let oldTodo= JSON.parse(window.localStorage.getItem('newtodo'))
    this.todolist = oldData || []
    this.newTodo = oldTodo ||''

    },

    methods: {
        addlist: function() {
        	var newdate=new Date();
        	var datefor=newdate.toLocaleString()
            this.todolist.push({
                title: this.newTodo,
                createdAt: datefor,
                done: false
            });
            this.newTodo = "";
        },
        deleteitem: function(todo) {
        
            let index = this.todolist.indexOf(todo);
           
            this.todolist.splice(index, 1);
          
        }
    }
})
