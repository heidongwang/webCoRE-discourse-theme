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

let link;
const wiki = 'https://wiki.webcore.co';
const community = 'https://community.webcore.co';

/**
 * A mapping of keywords to the relevant hyperlinks.
 * @type {Object}
 */
const linkedKeywords = {
	'case traversal policy': (link = `${wiki}/Case_Traversal_Policy`),

	'condition': (link = `${community}/t/conditions-and-triggers-the-difference/164`),
	'conditions': link,
	'trigger': link,
	'triggers': link,

	'execution method': (link = `${wiki}/Execution_Method`),
	'execution methods': link,
	'asynchronous': link,
	'synchronous': link,

	'expression': (link = `${wiki}/Expressions`),
	'expressions': link,

	'function': (link = `${wiki}/Functions`),
	'functions': link,

	'glossary': (link = `${wiki}/Glossary`),

	'piston state': (link = `${wiki}/Piston_State`),

	'task cancellation policy': (link = `${wiki}/Task_Cancellation_Policy`),
	'task cancelation policy': link,

	'task scheduling policy': (link = `${wiki}/Task_Scheduling_Policy`),

	'variable': (link = `${wiki}/Variable`),
	'variables': link,

	'wiki': (link = `${wiki}`),

	'$nfl': (link = `${wiki}/NFL`),
	'nfl api': link,

	'$weather': (link = `${wiki}/Weather`),
	'weather api': link,
};

/**
 * Removes a wrapping element while retaining its contents.
 * @param {Element|jQuery} el The wrapping element to remove
 */
function replaceWithContents(el) {
	$(el).contents().unwrap();
}

/**
 * A
 *
 * For the sake of performance it is recommended that the `$html` element not
 * be added to the document until after linking keywords to avoid DOM thrashing.
 * @param  {jQuery}  $html The element in which to insert links
 * @return {boolean}       Whether links were added
 */
function linkKeywords($html) {
	if (!$html) {
		return false;
	}
	let hasLinks = false;

	// Discourse operates on a fork of an old highlight implementation; docs:
	// https://github.com/discourse/discourse/blob/master/vendor/assets/javascripts/highlight.js
	$html.highlight(Object.keys(linkedKeywords), {
		element: 'a',
		className: 'wc-keyword',
		wordsOnly: true,
		caseSensitive: false,
	});

	// Discard links nested in code blocks and other links
	$html.find('a a.wc-keyword, code a.wc-keyword').each(
		(i, el) => replaceWithContents(el)
	);

	// Add the link href
	$html.find('a.wc-keyword').each((i, el) => {
		hasLinks = true;
		let $el = $(el);
		let href = linkedKeywords[$el.text().toLowerCase()];
		if (href) {
			$el.attr({
				target: '_blank',
				href,
			});
		} else {
			// Remove markup for invalid links
			replaceWithContents($el);
		}
	});

	return hasLinks;
}

// Add links to post elements before they are added to the document
api.decorateCooked(linkKeywords);
