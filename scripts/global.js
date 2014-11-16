/**
 * Contains global helper functions.
 * @file global.js
 */

/**
 * Makes sure that a namespace exists.
 *
 * @param {string} ns The namespace.
 * @return {object} The namespace objectified.
 */
function namespace(ns) {
	var object = this, tokens = ns.split('.'), token;

	while (tokens.length > 0) {
		token = tokens.shift();

		if (typeof object[token] === 'undefined') {
			object[token] = {};
		}

		object = object[token];
	}

	return object;
}
