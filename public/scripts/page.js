/**
 * Page Scripts
 *
 * @author Tibor Buzási <develop@tiborbuzasi.com>
 * 
 * Copyright © 2021 Tibor Buzási. All rights reserved.
 * Licensed under the GNU General Public License version 3 or any later version.
 */

// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3

function displayMenu() {
	var navContent = '<ul><li class="mobile"><a onclick="toggleMenu(event)">&#x2261;</a></li>';
	for (var item in menu) {
		navContent += '<li><a href="/' + item + '" onclick="return loadPage(\'' + item + '\');"';
		if (item == currentPage) {
			navContent += ' class="selected"';
		}
		navContent += '>' +  menu[item] + '</a></li>';
	}
	navContent += "</ul>";

	document.getElementById("menu").innerHTML = navContent;
}

async function displaySubPage(subpage, first) {
	var main = document.getElementById('main');
	var initialContent = '<section id="' + subpage + '-page" style="min-height: calc(100vh - 2.6em);"><p class="note loading">Loading...</p></section>';
	if (first) {
		main.innerHTML = initialContent;
	} else {
		main.innerHTML += initialContent;
	}
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/pages/" + subpage, false);

	xhr.onreadystatechange = function() {
		// Requesting page content
		var pageContent = "";
		if (this.readyState !== 4) return;
		if (this.status !== 200) {
			if (!first) {
				pageContent += "<hr>";
			}
			pageContent += '<section id="' + subpage + '"><p class="note">Sorry for the inconvenience! This part of the content cannot be found.</p></section>';
		}
		else {
			pageContent += this.responseText;
		}

		// Set subpage content
		subpage = document.getElementById(subpage + "-page");
		subpage.outerHTML = pageContent;
	};

	await xhr.send();
}

function displayPage(page) {
	var main = document.getElementById("main");

	if (pages[page] == undefined || pages[page]["pages"] == undefined)
	{
		main.innerHTML = '<section><h2>This page cannot be found!</h2><p class="note">Sorry for the inconvenience!</p></section>';
		return;
	}

	// Loading subpage content
	var content = "";
	pages[page]['pages'].forEach((subpage, index) => {
		displaySubPage(subpage, index == 0);
	});

	// Loading scripts
	if (pages[page]["scripts"] != undefined) {
		pages[page]["scripts"].forEach(function(item) {
			var script = document.createElement("script");
			script.async = false;
			script.type = "text/javascript";
			if (item.charAt(0) == '/') {
				script.src = item;
			} else {
				script.src = "/scripts/" + item;
			}
			script.onload = function () {
				// Run init function if available
				var itemParts = item.split("/");
				var scriptName = itemParts[itemParts.length - 1].split(".")[0];
				var functionName = "init" + scriptName.charAt(0).toUpperCase() + scriptName.slice(1);
				if (typeof window[functionName] == 'function') {
					window[functionName]();
				}
			}

			document.getElementById("main").appendChild(script);
		});
	}
}

function load() {
	// Get page to load from URL
	var path = window.location.href.toString().split(window.location.host)[1].substr(1);
	var pathParts = path.split("#");
	if (pathParts[0] != "") {
		currentPage = pathParts[0];
	}

	// Display menu
	displayMenu();

	// Display page
	displayPage(currentPage);

	// Set page title
	var title;
	if (currentPage != undefined && pages[currentPage] != undefined && pages[currentPage]["title"] != undefined) {
		title = pages[currentPage]["title"] + " - " + constantTitle;
	} else {
		title = constantTitle;
	}
	document.title = title;

	// Check for hash
	var hash = window.location.hash.substr(1);
	if (!hash)
    {
        window.scrollTo(0, 0);
        return;
    }

	// Check if element with hash as ID exists
	element = document.querySelector("#" + hash);
	if (!element) return;

	// Display and scroll to details
	element.scrollIntoView({
		behavior: "smooth",
		block:    "start",
	});
};

function loadPage(page) {
	// Set current page to requested
	currentPage = page;
	window.history.pushState(page, menu[page], new URL(page, window.location.origin));
	load();
	return false;
}

function toggleMenu(event) {
	event.target.parentElement.parentElement.classList.toggle("show");
}

// @license-end
