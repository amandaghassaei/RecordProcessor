/**
 * Created by aghassaei on 7/19/15.
 */


define(['jquery', 'underscore', 'plist', 'text!menus/templates/AudioView.html'],
    function($, _, plist, template){

    return Backbone.View.extend({

        el: '#audioContainer',

        events: {
            "click #loadAudio":                 "_loadAudio"
        },

        initialize: function(){
            _.bindAll(this, "render");
            this.render();
        },

        _loadAudio: function(){
            console.log("load");
        },

        _makeTemplateJSON: function(){
            return _.extend(this.model.toJSON());
        },

        render: function(){
            this.$el.html(this.template(this._makeTemplateJSON()));
        },

        template: _.template(template)
    });
});