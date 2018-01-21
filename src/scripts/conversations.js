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


(function($, _) {
	/**
	 * HTML attributes that can be applied in the conversation markup to control
	 * the conversation behavior.
	 * @type {Object}
	 */
	var attributes = {
		conversationActiveDuration: 'data-duration',
	};
	/**
	 * CSS classNames that are used in the conversations markup.
	 * @type {Object}
	 */
	var classNames = {
		container: 'conversations',
		containerPrepared: 'conversations-ready',
		conversation: 'conversation',
		conversationActive: 'active',
	};
	/**
	 * CSS selectors for navigating the conversations markup.
	 * @type {Object}
	 */
	var selectors = {
		container: '.' + classNames.container,
		conversation: '.' + classNames.conversation,
		unpreparedContainer: '.' + classNames.container + ':not(' + classNames.containerPrepared + ')',
		conversationsInContainer: '> li',
		activeConversationInContainer: '> li.' + classNames.conversationActive,
		messagesInConversation: 'li',
	};
	/**
	 * The length of time given to read each message when an explicit duration
	 * is not specified for a conversation.
	 *
	 * Note that this time may not match the CSS animation speed; instead this
	 * is used to calculate the time for a conversation to remain active before
	 * switching to the next one.
	 * @type {Number}
	 */
	var defaultActiveDurationPerMessage = 6000;

	/**
	 * Call `prepareConversations` on any conversations in the DOM that have not
	 * yet been prepared.
	 */
	function prepareNewConversations() {
		$(selectors.unpreparedContainer).each(function() {
			prepareConversations($(this));
		});
	}

	/**
	 * Readies a conversation container for smooth animations.
	 *
	 * Conversation order is randomized, heights are matched to avoid relayout
	 * when switching between active conversations, CSS animations begin, and
	 * the next conversation is scheduled.
	 * @param {jQuery} $container An element containing multiple conversations
	 */
	function prepareConversations($container) {
		// Randomize the order of conversations
		$container.html(
			_.shuffle($container.children())
		);

		// Make all active then force a layout to get the max height
		var $conversations = $container.find(selectors.conversationsInContainer)
			.addClass(classNames.conversationActive);
		var maxHeight = Math.max.apply(Math, $conversations.map(function() {
			return $(this).height();
		}));

		// Only leave the first conversation active
		$conversations.slice(1).removeClass(classNames.conversationActive);

		// Match all conversations to the height of the tallest and begin animation
		scheduleNextConversation($conversations
			.find(selectors.conversation)
			.css('min-height', maxHeight)
			.first()
			.parent()
		);

		$container.addClass(classNames.containerPrepared);
	}

	/**
	 * Sets a timeout for the next conversation to appear.
	 *
	 * The timeout can be customized by providing a value in milliseconds for
	 * `attributes.conversationActiveDuration` in the markup, otherwise it is
	 * calculated based on the number of messages in the conversation and the
	 * `defaultActiveDurationPerMessage` value.
	 * @param {jQuery} $active The active conversation element
	 */
	function scheduleNextConversation($active) {
		// Get the specified duration for the conversation to remain active
		var duration = parseInt($active.attr(attributes.conversationActiveDuration), 10);
		// Default to a reasonable duration based on the number of messages
		if (!duration) {
			duration = defaultActiveDurationPerMessage * $active.find(selectors.messagesInConversation).length;
		}
		setTimeout(function() {
			advanceToNextConversation($active);
		}, duration);
	}

	/**
	 * Fades out the active conversation and then shows the next one.
	 * @param {jQuery} $active The active conversation
	 */
	function advanceToNextConversation($active) {
		// Fade out
		$active.fadeTo(350, 0, function() {
			// Activate the next conversation or wrap back to the first one
			var $next = $active.is(':last-child') ? $active.siblings().first() : $active.next();
			// Hide then avoid staying at 0% opacity next time
			$active.removeClass(classNames.conversationActive).css('opacity', '');
			// Make the next conversation active
			$next.addClass(classNames.conversationActive);

			scheduleNextConversation($next);
		});
	}

	// On document ready set up all of the conversations on the page
	$(prepareNewConversations);
})(jQuery, _);
