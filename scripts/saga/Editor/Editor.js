(function(App){
	"use strict";

	App.Editor = function(editorElement) {
		/**
		 * Available callbacks.
		 * @type {Object}
		 */
		this.callbacks = {
			'change': []
		};

		this.element;

		this.initialize = function(editorElement) {
			this.element = editorElement;
			
			this.setupEvents();
		};

		this.setupEvents = function() {
			this.element.on(
				'keyup propertychange paste',
				function(){ 
					this.executeCallback('change', [this.wordCount()]);
				}.bind(this)
			);
		};

		this.wordCount = function() {
			var content_text,
			char_count = this.element.text().length,
			word_count = 0;

			// if no characters, words = 0
			if (char_count != 0) {
				this.element.children().each(
					function(index, el) {
						content_text += $(el).text()+"\n";
					}
				);
			}

			// if there is content, splits the text at spaces (else displays 0 words)
			if (typeof content_text !== "undefined") {
				word_count = content_text.split(/\s+/).length -1;
			}

			return {
				'characters': char_count,
				'words': word_count,
			};
		}

		this.initialize(editorElement);
	};

	App.Editor.prototype = new Saga.Handlers.EventExecutable();

})(namespace('Saga.Editor'));