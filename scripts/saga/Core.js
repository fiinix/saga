(function(App){
	"use strict";

	App.Core = function() {
		this.counter = null;
		this.editor = null;

		this.initialize = function() {
			this.counter = $('.counter');
			this.editor = new App.Editor.Editor($('.editor'));
			
			this.setMode(true);
			
			this.setupEvents();
		};

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
			this.editor.on(
				'change',
				function(stats) {
					this.counter.html(stats.words + " words &nbsp;&bull;&nbsp; " + stats.characters + " characters");
				}.bind(this)
			);
			this.editor.element.trigger('keyup');

			this.counter.on(
				'click',
				this.setMode.bind(this)
			);

		};

		this.initialize();
	}

})(namespace('Saga'));