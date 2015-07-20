/**
 * Created by aghassaei on 7/19/15.
 */


define(['jquery', 'underscore', 'plist', 'text!menus/templates/AudioView.html'],
    function($, _, plist, template){

    return Backbone.View.extend({

        el: '#audioContainer',

        events: {
            "change #audioInput":                                    "_selectFiles",
            "click #loadAudio":                                     "_loadAudio"
        },

        initialize: function(){
            _.bindAll(this, "render");
            this.render();
        },

        _loadAudio: function(e){
            e.preventDefault();
            $("#audioInput").click();
        },

        _selectFiles: function(e){
            e.preventDefault();
            var input = $(e.target),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            this._readDataURL(numFiles, label, input.get(0).files);
            input.val("");
        },

        _readDataURL: function(numFiles, filename, files){
            if (numFiles>1) console.warn("too many files selected");
            var reader = new FileReader();
            reader.readAsText(files[0]);
            var self = this;
            reader.onload = (function() {
                return function(e) {
                    var extension =  filename.split('.').pop().toUpperCase();
                    if (self._isDefaultExtension(extension) || self._isOtherSuppoertedExtension(extension)){
                        require(['aurora'], function(AV){
                            window.AV = AV;//todo this is stupid
                            if (self._isOtherSuppoertedExtension(extension)){
                                require(['aurora'+extension], function(parser){
                                    console.log(parser);
                                });
                            }
                        });
                    } else console.warn(extension + " is not a valid extension");
                    console.log(extension);

//                    if (extension == ".json"){
//                        fileSaver.loadFile(JSON.parse(e.target.result));
//                    } else if (extension == ".user"){
//                        fileSaver.loadUser(JSON.parse(e.target.result));
//                    } else console.warn("file type not recognized");
                }
            })();
        },

        _isDefaultExtension: function(extension){//default extensions supported by aurora
            return extension == "WAV"
                || extension == "AU"
                || extension == "AIFF"
                || extension == "CAF"
                || extension == "M4A";
        },

        _isOtherSuppoertedExtension: function(extension){//other supported extensions
            return extension == "MP3"
                || extension == "FLAC"
                || extension == "AAC"
                || extension == "ALAC";
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