/**
 * Adds event handling to an object.
 *
 * @file			EventExecutable.js
 * @package			Saga.Handlers
 * @dependencies	-
 */

;(function(App, window, document, undefined) {
	'use strict';

	/**
	 * Adds event handling to an object.
	 * 
	 * @return {object}
	 */
	App.EventExecutable = function() {
		/**
		 * Available callbacks. Should be overriden.
		 * @type {Object}
		 */
		this.callbacks = {};

		/**
		 * Execute callbacks
		 *
		 * @param  {String} event The event type.
		 * @param  {Array} args Optional arguments.
		 *
		 * @return void.
		 */
		this.executeCallback = function(event, args) {
			if (!this.callbacks[event]) {
				throw new Error('Invalid event given. ' + String(event));
			}

			if (!args) {
				args = [];
			}

			for (var i in this.callbacks[event]) {
				if (!this.callbacks[event].hasOwnProperty(i)) continue;
				this.callbacks[event][i].apply(null, args);
			}
		};

		/**
		 * Register callback
		 *
		 * @param  {String} event The event type.
		 * @param  {function} callback The callback.
		 * @param  {String} id Id of the callback.
		 * @return void.
		 */
		this.on = function(event, callback, id) {
			if (!this.callbacks[event]) {
				throw new Error('Invalid event given. ' + String(event));
			}
			if (!(callback instanceof Function)) {
				throw new Error('Invalid callback given.');
			}

			if (!id) {
				id = Math.random()*100000;
			}

			this.callbacks[event][id] = callback;
		};

		/**
		 * Unregister callback
		 *
		 * @param  {String} event The event type.
		 * @param  {String} id Id of the callback.
		 * @return void.
		 */
		this.off = function(event, id) {
			if (!this.callbacks[event]) {
				throw new Error('Invalid event given. ' + String(event));
			}

			var callbacks = [];

			for (var i in this.callbacks[event]) {
				if (!this.callbacks[event].hasOwnProperty(i)) continue;
				if (i == id) continue;
				callbacks[i] = this.callbacks[event][i];
			}

			this.callbacks[event] = callbacks;
		};
	};

}(namespace('Saga.Handlers'), window, document));