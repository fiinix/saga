(function(App){
	"use strict";

	App.Core = function() {
		this.appName = 'saga-editor';

		this.counter = null;
		this.editor = null;
		this.storage = null;

		this.initialize = function() {
			this.counter = $('.counter');
			this.storage = new App.Handlers.Storage(this.appName);
			this.editor = new App.Editor.Editor($('.editor'));

			this.loadData();
				
			this.setMode(true);
			
			this.setupEvents();
		};

		this.loadData = function() {
			var post = this.storage.getData('post');
			this.editor.content(post);
		}

		this.setMode = function(auto) {
			if(auto !== undefined && auto === true) {
				var currentHour = new Date().getHours();
				if (currentHour >= 6 && currentHour <= 18) {
					$('body').addClass('day-mode');
				}
			}

			$('body').toggleClass('day-mode');
		}

		this.setupEvents = function() {
			// Save post data on change.
			this.editor.on(
				'change',
				function(stats) {
					this.storage.setData('post', this.editor.content());
				}.bind(this)
			);

			// Recalculate stats on change.
			this.editor.on(
				'change',
				function(stats) {
					this.counter.html(stats.words + " words &nbsp;&bull;&nbsp; " + stats.characters + " characters");
				}.bind(this)
			);
			this.editor.element.trigger('keyup');

			// Mode toggle.
			this.counter.on(
				'click',
				this.setMode.bind(this)
			);

		};

		this.initialize();
	}

})(namespace('Saga'));