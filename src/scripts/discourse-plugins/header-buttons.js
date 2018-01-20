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

/**
 * Icon buttons to prepend to the navbar
 * @param  {DecoratorHelper} helper A utility for generating DOM elements
 * @return {Array}
 */
function headerButtons(helper) {
	return [
		helper.h('li', [
			helper.h('a#donate-button.icon.btn-flat', {
				title: 'Donate',
				href:'https://www.paypal.me/ady624',
				target: '_blank',
			}, helper.h('i.fa.fa-paypal.home-button-icon.d-icon.smaller')),
		]),

		helper.h('li', [
			helper.h('a#dashboard-button.icon.btn-flat', {
				title: 'Dashboard',
				href:'https://dashboard.webcore.co/',
				target: '_blank',
			}, helper.h('i.fa.fa-dashboard.home-button-icon.d-icon.smaller')),
		]),

		helper.h('li', [
			helper.h('a#wiki-button.icon.btn-flat', {
				title: 'Documentation wiki',
				href:'https://wiki.webcore.co/',
				target: '_blank',
			}, helper.h('i.fa.fa-book.home-button-icon.d-icon.smaller')),
		]),

		// Buttons to show or hide the homepage greeting, only on desktop
		helper.h('span.unless-mobile', [
			helper.h('span.if-homepage-i', [
				helper.h('a.btn.btn-small.btn-flat.login-button.toggle-hide-homepage.if-hide-homepage-ib', {
					text: 'Show greeting',
				}),
				helper.h('a.btn.btn-small.login-button.toggle-hide-homepage.unless-hide-homepage', {
					text: 'Hide greeting',
				}),
			])
		]),
	];
}

api.decorateWidget('header-icons:before', headerButtons);
