(function(App){
	"use strict";

	App.Storage = function(storageKey) {
		this.storageKey;
		this.storageData;

		this.initialize = function(storageKey) {
			this.storageKey = storageKey;

			this.updateContainer();
		};

		this.updateContainer = function() {
			this.storageData = JSON.parse(localStorage.getItem(this.storageKey));

			if(!this.storageData) {
				this.storageData = {};
			}
		};

		this.getData = function(key) {
			return this.storageData[key];
		};

		this.setData = function(key, data) {
			this.storageData[key] = data;
			this.storageData['_lastupdate'] = new Date().getTime();
			localStorage.setItem(this.storageKey, JSON.stringify(this.storageData));
		};

		this.initialize(storageKey);
	};

})(namespace('Saga.Handlers'));