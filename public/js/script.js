/* define the application */
var app = new Backbone.Marionette.Application();

/* add the main region to the application */
app.addRegions({
	appRegion: '#AppBase'
});

/* define the module we will be using to create this app */
app.module('RouteTest', function(module, App, Backbone, Marionette, $, _){
	"use strict";

	/* the layout for the main view */
	module.AppLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'AppLayoutView',
		template: '#template-AppLayoutView',

		regions: {
			'contentRegion' : '#ContentRegion'
		},
		ui: {
			'navHome' : '#nav-home',
			'navMembers' : '#nav-members',
			'navAlbum' : '#nav-album',
			'navNewsfeed' : '#nav-newsfeed',
			'navContact' : '#nav-contact',
			'navMore' : '#nav-more'
		},
		events: {
			'click #nav-home' : 'onNavHomeClicked',
			'click #nav-members' : 'onNavMembersClicked',
			'click #nav-album' : 'onNavAlbumClicked',
			'click #nav-newsfeed' : 'onNewsfeedClicked',
			'click #nav-contact' : 'onNavContactClicked',
			'click #nav-more' : 'onNavMoreClicked'
		},

		/* when the view initializes, call initRouter to */
		initialize: function() {
			this.initRouter();
		},

		/* once the DOM is ready, start the Backbone history manager.
			This will cause the application to synch up with the
			current route of the browser, e.g. #home or #info.
			This must be called onRender instead of on initialize
			because it immediately tries to render the appropriate view
			into the contentRegion. Also: If you don't start the backbone
			history, the router won't work. */
		onRender: function() {
			if (!Backbone.History.started) Backbone.history.start();
		},

		/* initialize the AppRouter, which synchs the application
			to the browser navigation */
		initRouter: function() {

			// cache reference to 'this' in the module scope
			var capturedThis = this;

			// create a new instance of the AppRouter
			// and assign the routes and controller
			var appRouter = new Marionette.AppRouter({
				appRoutes: {
    					'' : 'onHomeRoute',
    				'home' : 'onHomeRoute',
    				'members' : 'onMembersRoute',
    				'album' : 'onAlbumRoute',
    				'newsfeed' : 'onNewsfeedRoute',
    				'contact' : 'onContactRoute',
    				'more' : 'onMoreRoute'
    			},
				controller: {
    				onHomeRoute: function() {
    					capturedThis.onHomeNavigated();
    				},
    				onMembersRoute: function() {
    					capturedThis.onMembersNavigated();
    				},
    				onAlbumRoute: function() {
    					capturedThis.onAlbumNavigated();
    				},
    				onNewsfeedRoute: function() {
    					capturedThis.onNewsfeedNavigated();
    				},
    				onContactRoute: function() {
    					capturedThis.onContactNavigated();
    				},
    				onMoreRoute: function() {
    					capturedThis.onMoreNavigated();
    				}
    			}
			});
		},

		/* called when the router sees that we have met the criteria
			to trigger the 'onHomeRoute' handler */
		onHomeNavigated: function() {

			// define and display an instance of the HomeLayoutView
			var homeLayoutView = new module.HomeLayoutView();
			this.contentRegion.show(homeLayoutView);

			// update the navigation
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navHome.addClass('active');
		},

		onMembersNavigated: function() {
			var layoutView = new module.MembersLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navMembers.addClass('active');
		},
		onAlbumNavigated: function() {
			var layoutView = new module.AlbumLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navAlbum.addClass('active');
		},
		onNewsfeedNavigated: function() {
			var layoutView = new module.NewsfeedLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navNewsfeed.addClass('active');
		},
		onContactNavigated: function() {
			var layoutView = new module.ContactLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navContact.addClass('active');
		},
		onMoreNavigated: function() {
			var layoutView = new module.MoreLayoutView();
			this.contentRegion.show(layoutView);
			this.$el.find('.navButton.active').removeClass('active');
			this.ui.navMore.addClass('active');
		}
	});
    
	
	module.HomeLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'HomeLayoutView',
		className: 'contentLayout',
		template: '#template-HomeLayoutView'
	});

	module.MembersLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'MembersLayoutView',
		className: 'contentLayout',
		template: '#template-MembersLayoutView'
	});

	module.AlbumLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'AlbumLayoutView',
		className: 'contentLayout',
		template: '#template-AlbumLayoutView'
	});

	module.NewsfeedLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'NewsfeedLayoutView',
		className: 'contentLayout',
		template: '#template-NewsfeedLayoutView'
	});

	module.ContactLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'ContactLayoutView',
		className: 'contentLayout',
		template: '#template-ContactLayoutView'
	});

	module.MoreLayoutView = Marionette.LayoutView.extend({
		tagName: 'div',
		id: 'MoreLayoutView',
		className: 'contentLayout',
		template: '#template-MoreLayoutView'
	});

	/* add initializer, which fires when the app starts */
	module.addInitializer(function(){
		var layout = new module.AppLayoutView();

		/* show the layout in the region we created at the top of this file */
		app.appRegion.show(layout);
	});
});

/* when the DOM for this page is available, start the application */
$(document).ready(function() {
	app.start();
});