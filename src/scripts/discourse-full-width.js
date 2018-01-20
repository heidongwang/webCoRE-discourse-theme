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
	 * Patch $.fn.width to give Discourse the correct content width when
	 * determining which dropdown menu style to show.
	 *
	 * The full-width page design causes Discourse to align the menu to the far
	 * right since the element that it tests does not have a maximum width. This
	 * is a hack but there is no better hook to modify this behavior.
	 *
	 * The SiteHeaderComponent is responsible for sizing the dropdown:
	 * https://github.com/discourse/discourse/blob/master/app/assets/javascripts/discourse/components/site-header.js.es6
	 */
	function overrideContentContainerWidth() {
		var width = $.fn.width;
		/**
		 * Returns the width of the Discourse page content when given the
		 * selector '#main-outlet .container', otherwise the width of the
		 * element specified by the selector.
		 * @return {number} The width in pixels
		 */
		function discourseContentAwareWidth() {
			if (this.selector === '#main-outlet .container') {
				return $('#main-outlet * .container:visible').width();
			}
			return width.apply(this, arguments);
		}
		$.fn.width = discourseContentAwareWidth;
	}
	$(overrideContentContainerWidth);
})(jQuery);
