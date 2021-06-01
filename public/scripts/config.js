/**
 * Configuration Scripts
 *
 * @author Tibor Buzási <develop@tiborbuzasi.com>
 * 
 * Copyright © 2021 Tibor Buzási. All rights reserved.
 * Licensed under the GNU General Public License version 3 or any later version.
 */

// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3

var menu, pages;
var currentPage = "home";
var constantTitle = "ConclusionMedia Website";

menu = {
	"home": "Home",
	"games/blocchi": "Blocchi",
	"games/rollaball": "Rollaball",
};

pages = {
	"home": {
		"pages": [
			"home.html"
		],
		"title": "Home"
	},
	"games/blocchi": {
		"pages": [
			"blocchi.html"
		],
		"title": "Blocchi",
		"scripts": [
			"/__/firebase/8.6.2/firebase-app.js",
			"/__/firebase/8.6.2/firebase-storage.js",
			"/__/firebase/init.js",
			"download.js"
		]
	},
	"games/rollaball": {
		"pages": [
			"rollaball.html"
		],
		"title": "Rollaball",
		"scripts": [
			"/__/firebase/8.6.2/firebase-app.js",
			"/__/firebase/8.6.2/firebase-storage.js",
			"/__/firebase/init.js",
			"download.js"
		]
	},
	"license": {
		"pages": [
			"license.html"
		],
		"title": "License Information"
	}
};

// @license-end
