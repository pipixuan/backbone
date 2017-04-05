/**
 * Created by dell on 2017/3/27.
 */
var app = app || {};
app.todoview = Backbone.View.extend({
    tagName: 'li',
    itmeTemplate: _.template($('#item-template').html()),
    events: {
        'click .toggle': 'toggleCompleted',
        'dblclick label': 'edit',
        'keypress .edit': 'update',
        'blur .edit': 'close',
        'click .destory': 'claer'
    },
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model,'visible',this.toggleVisible);
    },
    isHidden: function () {
      var completed = this.model.get('completed');
        return(
            (!completed && app.TodoFilter === 'completed')
            ||
            (completed && app.TodoFilter === 'active')
        );
    },
    toggleVisible: function () {
      this.$el.toggleClass('hidden',this.isHidden());
    },
    claer: function () {
        this.model.destroy();
    },
    close: function () {
        var newTitle = this.$('.edit').val().trim();
        if(newTitle){
            this.model.save({title: newTitle});
        }else{
            this.clear()
        }
        this.$el.removeClass('editing');
    },

    update: function (event) {
        if (event.which === 13) {
            this.close();
        }
    },
    edit: function () {
        this.$el.addClass('editing');
        this.$('.edit').focus();
    },
    toggleCompleted: function () {
        this.modal.toggle();
    },
    render: function () {
        this.$el.html(this.itmeTemplate(this.model.attributes));
        this.$el.toggleClass('completed', this.model.get('completed'));
        return this;

    }


})