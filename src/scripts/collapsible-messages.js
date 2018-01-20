/*
 * webCoRE Discourse theme
 *
 * Copyright 2017-2018 authors; see AUTHORS.md or
 * https://webcore-mechanics.github.io/webCoRE-discourse-theme/AUTHORS
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function($) {
	/**
	 * Maps a message name to a permanent bitmask id that will determine
	 * whether the message is hidden.
	 * @type {Object}
	 */
	var messages = {
		// The community homepage content
		homepage: 1 << 0,
		// A request for donations
		donate:   1 << 1,
	};
	/**
	 * The name of the cookie that tracks message visibility preferences
	 * @type {String}
	 */
	var cookieName = 'wc-hidden';
	/**
	 * The DOM class name to which the message name will be appended.
	 *
	 * This class is applied to the `<html>` document element for any messages
	 * that are hidden.
	 * @type {String}
	 */
	var hiddenClassNamePrefix = 'hide-';
	/**
	 * The DOM class name to which the message name must be appended to make any
	 * element toggle the message on click.
	 * @type {String}
	 */
	var togglerClassNamePrefix = 'toggle-hide-';
	var $doc = $(document.documentElement);

	/**
	 * Gets the current bitmask value from the user's preferences
	 * @return {number} A number corresponding to the flags in `messages`
	 */
	function hiddenMessages() {
		return parseInt($.cookie(cookieName), 10) || 0;
	}

	/**
	 * Determines whether the specified message has been hidden.
	 *
	 * If not provided, `hidden` will default to `hiddenMessages()`.
	 * @param  {string}  message Value corresponding to the keys in `messages`
	 * @param  {number}  hidden  The bitmask as returned by hiddenMessages
	 * @return {boolean}         Whether the specified message is hidden
	 */
	function isHidden(message, hidden) {
		hidden = typeof hidden === 'number' ? hidden : hiddenMessages();
		return hidden & messages[message]; // yes, bitwise &
	}

	/**
	 * Invert the user's preference for the specified message.
	 *
	 * Updates the class list on the document element to either add or remove
	 * the specified message.
	 *
	 * Emits a `wcToggleMessage` event on `document.documentElement`
	 * corresponding to changes in the visibility of any message. The event is
	 * scoped based on the action ("show" or "hide") and the message key for use
	 * in targeting specific message and action pairs when necessary. The event
	 * is triggered with two arguments, the message key and action.
	 * @param {string} message Value corresponding to the keys in `messages`
	 */
	function toggleMessage(message) {
		var hidden = hiddenMessages();
		var flag = messages[message];
		if (flag) {
			var action;
			if (isHidden(message, hidden)) { // yes, bitwise &
				action = 'show';
				hidden -= flag;
				$doc.removeClass(hiddenClassNamePrefix + message);
			} else {
				action = 'hide';
				hidden += flag;
				$doc.addClass(hiddenClassNamePrefix + message);
			}
			$.cookie(cookieName, hidden, { expires: 365, path: '/' });
			$doc.trigger(['wcToggleMessage', message, action].join('.'), [ message, action ]);
		}
	}

	(function setup() {
		var hidden = hiddenMessages();
		// Extracts the message name for a toggler button
		var togglerMessagePattern = new RegExp('.*' + togglerClassNamePrefix + '(\\S+).*');

		// Immediately add hidden classes to the <html> element for anything hidden
		if (hidden) {
			Object.keys(messages).forEach(function(message) {
				if (isHidden(message, hidden)) {
					$doc.addClass(hiddenClassNamePrefix + message);
				}
			});
		}

		// Handle all toggle button clicks that bubble up to the document element
		$doc.on('click', '[class*=' + togglerClassNamePrefix + ']', function messageTogglerClick(e) {
			var message = e.target.className.replace(togglerMessagePattern, '$1');
			toggleMessage(message);
		});

		// Scroll back to the top of the screen when the homepage is displayed,
		// primarily for mobile
		$doc.on('wcToggleMessage.homepage.show', function() {
			window.scrollTo(0, 0);
		});
	})();
})(jQuery);
