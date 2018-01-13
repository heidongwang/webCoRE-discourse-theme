/*
 * webCoRE Discourse theme
 *
 * Copyright 2017 by its authors; see AUTHORS.md or
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
 * Add or remove the wc-homepage class on the root document element based on the
 * current URL path.
 * @param {string} pathname  The pathname component of the page URL
 * @param {string} title     The title of the new page as on the browser tab
 */
function toggleHomepageClass(pathname, title) {
	const method = pathname === '/' ? 'add' : 'remove';
	document.documentElement.classList[method]('wc-homepage');
}

api.onPageChange(toggleHomepageClass);
