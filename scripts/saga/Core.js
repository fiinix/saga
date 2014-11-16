(function(App){
	"use strict";

	App.Core = function() {
		this.initialize = function() {
			this.now = new Date(),
			this.currentHour = now.getHours(),
			this.body = $('body'),
			this.editor = $('.editor'),
			this.counter = $('.counter');

			if (this.currentHour >= 6 && this.currentHour <= 18) {
				this.body.addClass('day-mode');
			}

			this.wordCount();
			this.setupEvents();
		};

		this.setupEvents = function() {
			this.counter.on(
				'click',
				function() {
					this.body.toggleClass('day-mode');
				}.bind(this)
			);

			this.editor.on(
				'keyup propertychange paste',
				function(){ 
					this.wordCount();
				}.bind(this)
			);

		};

		this.wordCount = function() {
			var content_div = this.editor,
			content_text,
			char_count = content_div.text().length,
			word_count = 0;

			// if no characters, words = 0
			if (char_count != 0)
			content_div.children().each(function(index, el) {
			content_text += $(el).text()+"\n";
			});
			// if there is content, splits the text at spaces (else displays 0 words)

			if (typeof content_text !== "undefined")
			word_count = content_text.split(/\s+/).length -1;
			// words_count = content_text.trim().replace(/\s+/, ' ').split(' ').length;
			this.counter.html(word_count + " words &nbsp;&bull;&nbsp; " + char_count + " characters");
		}


		this.initialize();
	}

})(namespace('Saga'));