/**
 * Created by dell on 2017/3/27.
 */
    //定义一个对象是为了防止和别的文件发生冲突
var app = app || {};

app.Todo = Backbone.Model.extend({
    //添加默认属性 会放在defaults中
    defaults:{
        title:'',
        //用来表示任务的状态 true任务完成  false任务还在进行中
        completed:false
    },
    toggle: function () {
        this.save({
           completed:!this.get('completed')
        });
    }
});
