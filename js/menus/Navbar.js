/**
 * Created by aghassaei on 1/7/15.
 */


define(['jquery', 'underscore', 'backbone', 'fileSaver', 'navViewMenu', 'appState'], function($, _, Backbone, fileSaver, NavViewMenu, appState){

    return Backbone.View.extend({

        el: "body",

        events: {
            "click #showHideMenu":                                  "_setMenuVisibility",
            "click .menuHoverControls":                             "_setNavSelection",
            "shown.bs.modal .modal":                                "_showModal",
            "hide.bs.modal .modal":                                 "_hideModal",

            "click .saveJSON":                                      "_save",
            "click .saveAsJSON":                                    "_saveAs",
//            "change #saveAsFileName":                               "_saveAs",//detect enter key
            "click .saveUser":                                      "_saveUser",
            "change #saveUserFileName":                             "_saveUser",//detect enter key

            "click #viewMenuDropdown":                              "_renderViewMenu"
        },

        initialize: function(){

            this.viewMenu = new NavViewMenu({model:this.model});

            _.bindAll(this, "_setMenuVisibility", "_setNavSelection");

            this.listenTo(this.model, "change:currentNav", this._updateNavSelectionUI);

            this._logo();
            this._updateNavSelectionUI();
        },

        _setMenuVisibility: function(e){
            e.preventDefault();
            var state = this.model.get("menuIsVisible");
            this.model.set("menuIsVisible", !state);
            $(e.target).blur();
        },

        _setNavSelection: function(e){
            var navSelection = $(e.target).data("menuId");
            if (navSelection == "about") {
                $(e.target).blur();
                return;
            }
            e.preventDefault();
            if (navSelection) this.model.set("currentNav", navSelection);
        },

        _updateNavSelectionUI: function(){
            this._deselectAllNavItems();
            var navSelection = this.model.get("currentNav");
            _.each($(".menuHoverControls"), function(link){
                var $link = $(link);
                if ($link.data("menuId") == navSelection) $link.parent().addClass("open");//highlight
            });
        },

        _logo: function(){
            var $logo = $("#logo");
            $logo.mouseover(function(){
                $logo.attr("src","assets/imgs/logo-active.png");
            });
            $logo.mouseout(function(){
                $logo.attr("src","assets/imgs/logo.png");
            });
        },

        _deselectAllNavItems: function(){
            $(".open").removeClass("open");//no highlight
        },

        _showModal: function(e){
            var input = $(e.target).find("input.filename");
            input.focus();
            input.select();
        },

        _hideModal: function(e){
            $(e.target).find("input.filename").blur();
        },


        _renderViewMenu: function(){
            this.viewMenu.render();
        },



        _save: function(e){
            e.preventDefault();
            fileSaver.save();
        },

        _saveAs: function(e){
            e.preventDefault();
            var fileName = $("#saveAsFileName").val();
            fileSaver.save(fileName);
            $('#saveAsModel').modal('hide');
        }

    });
});