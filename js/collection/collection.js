/**
 * Created by dell on 2017/3/27.
 */
var app = app || {};

app.TodoCollection = Backbone.Collection.extend({
    model:app.Todo,
    //url: 需要填写字符串地址
    localStroage: new Backbone.LocalStorage('todo'),

    getCompleted: function () {
      return this.filter(function (todo) {
          return todo.get('completed') === true;
      });

    },
    gitRemaining: function () {
        return this.filter(function (todo) {
            return todo.get('completed') === false;
        })
    }

});

app.todoList = new app.TodoCollection;
