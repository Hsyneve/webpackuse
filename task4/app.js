import Vue from 'vue';
import AV from 'leancloud-storage'

var APP_ID = 'gHWqAFVNGLrC2kaNdOtOh6DQ-gzGzoHsz';
var APP_KEY = 'di3QChx0fSpXtfWb89pJL9Gd';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todolist: [],
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        currentUser: null,
        realuser: null
    },
    created: function() {
        window.onbeforeunload = () => {

        }
        this.currentUser = this.getCurrentUser();
    },

    methods: {
        addlist: function() {
            var newdate = new Date();
            var datefor = newdate.toLocaleString()
            this.todolist.push({
                title: this.newTodo,
                createdAt: datefor,
                done: false
            });
            this.newTodo = " ";
            if (this.currentUser != null) {
                AV.User.current().set('myTodos', this.todolist);
                AV.User.current().set('newtodo', this.newTodo);
                AV.User.current().save();
            }
        },
        deleteitem: function(todo) {

            let index = this.todolist.indexOf(todo);

            this.todolist.splice(index, 1);
            if (this.currentUser != null) {
                AV.User.current().set('myTodos', this.todolist);
                AV.User.current().set('newtodo', this.newTodo);
                AV.User.current().save();
            }

        },
        signUp: function() {
            // 新建 AVUser 对象实例
            let user = new AV.User();
            // 设置用户名
            user.setUsername(this.formData.username);
            // 设置密码
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                    this.currentUser = this.getCurrentUser();

                },
                function(error) {});
        },
        login: function() {


            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                    this.currentUser = this.getCurrentUser();


                },
                function(error) { alert('登录失败'); });

        },

        getCurrentUser: function() {
            if (AV.User.current()) {
                let { id, createdAt, attributes: { username, myTodos, newtodo } } = AV.User.current()
                this.realuser = username;
                this.todolist = myTodos || [];
                this.newTodo = newtodo || '';
                return { id, username, createdAt }
            } else
                return null;
        },
        logout: function() {
            debugger;

            AV.User.logOut();
            this.currentUser = null;
            this.realuser = null;
            // 

            window.location.reload()
        }
    }
})
