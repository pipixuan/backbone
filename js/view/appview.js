/**
 * Created by dell on 2017/3/27.
 */
var app = app || {};

app.Appview = Backbone.View.extend({
    el: '#todoapp',
    //监听按键
    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-complated': 'clearCompleted',
        'click #toggle-all': 'toggleA'
    },
    initialize: function () {
        this.listenTo(app.todoList, 'add', this.addOne);
        this.listenTo(app.todoList, 'all', this.render);
        this.listenTo(app.todoList, 'filter', this.filterAll);

        app.todoList.fetch()
    },
    statsTemplated: _.template($('#stats-templated').html()),
    render: function () {
        var completed = app.todoList.getCompleted().length;
        var remaining = app.todoList.gitRemaining().length;

        this.$('#footer').html(this.statsTemplated({
            completed: completed,
            remaining: remaining
        }));
        this.$('#filters li a')
            .removeClass('selected')
            .filter('[href = "#/' + (app.TodoFilter || '') + '"]')
            .addClass('selected')
    },
    filterOne: function () {
        todo.trigger('visible');
    },
    filterAll: function () {
        app.todoList.each(this.filterOne, this);
    },
    toggleA: function () {
        var completed = $('#toggle-all')[0].checked;
        app.todoList.each(function (todo) {
            todo.save({
                'completed': completed
            });
        });
    },
    clearCompleted: function () {
        _.invoke(app.todoList.getCompleted(), 'destory');
        return false;
    },
    addOne: function (todo) {
        var todoView = new app.todoview({model: todo});
        $('#todo-list').append(todoView.render().el);
    },
    createOnEnter: function (event) {
        //console.log(event.which);
        if (event.which !== 13 || this.$('#new-todo').val().trim() === '') {
            return;
        }
        app.todoList.create({
            title: this.$('#new-todo').val().trim(),
            completed: false
        });
        this.$('#new-todo').val('');
    }
})