import Vue from 'vue';
import AV from 'leancloud-storage'
import './main.css'; //使用require导入css文件

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

        this.currentUser = this.getCurrentUser();
        this.loaddata();
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
            this.savetodo();
        },
        loaddata: function() {
            if (this.currentUser) {
                var query = new AV.Query('AllTodos');
                query.find().then(todos => {
                    this.todolist = JSON.parse(todos[0].attributes.content);
                    this.todolist.id = todos[0].id;
                }, function(error) {
                    // 异常处理
                });
            }
        },
        updatedata: function() {
            // 第一个参数是 className，第二个参数是 objectId
            var todo = AV.Object.createWithoutData('AllTodos', this.todolist.id);
            // 修改属性
            var dataString = JSON.stringify(this.todolist);
            todo.set('content', dataString);
            // 保存到云端
            todo.save();
        },
        adddata: function() {
            var dataString = JSON.stringify(this.todolist)
            var AVTodos = AV.Object.extend('AllTodos');
            var avTodos = new AVTodos();
            avTodos.set('content', dataString);
            var acl = new AV.ACL();
            acl.setReadAccess(AV.User.current(), true);
            acl.setWriteAccess(AV.User.current(), true);
            avTodos.setACL(acl);
            avTodos.save().then(todo=> {
this.todolist.id=todo.id;
            }, function(error) {

            });
        },
        savetodo: function() {
            if (this.todolist.id) {
                this.updatedata();
            } else {
                this.adddata();
            }
        },
        deleteitem: function(todo) {

            let index = this.todolist.indexOf(todo);

            this.todolist.splice(index, 1);
            this.savetodo();

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
this.loaddata();

                },
                function(error) { alert('登录失败'); });

        },

        getCurrentUser: function() {
            if (AV.User.current()) {
                let { id, createdAt, attributes: { username } } = AV.User.current()
                this.realuser = username;

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
