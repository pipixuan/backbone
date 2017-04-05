/**
 * Created by dell on 2017/3/27.
 */
var app = app || {};
app.TodoRouter = Backbone.Router.extend({
    routes: {
        '*filter':'setFilter'
    },
    setFilter: function (filter) {
        if(filter){
            filter = filter.trim();
        }
        app.TodoFilter = filter || '';
        app.todoList.trigger('filter');
        //console.log(app.TodoFilter);
    }
});
app.todoRouter = new app.TodoRouter;
Backbone.history.start();
