/**
 * Download Scripts
 *
 * @author Tibor Buzási <develop@tiborbuzasi.com>
 * 
 * Copyright © 2021 Tibor Buzási. All rights reserved.
 * Licensed under the GNU General Public License version 3 or any later version.
 */

// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3

var storage = null;

function initDownload() {
	if (storage == null) {
		storage = firebase.storage();
	}
    
	var objects = document.querySelectorAll('.actions a');
	objects.forEach(function (object) {
		if (object.dataset.download != '') {
			object.addEventListener('click', download);
		}
	});
};

function download(event) {
	storage.ref(event.target.dataset.download).getDownloadURL().then((url) => {
		window.location.replace(url);
	}).catch((error) => {
		alert("Sorry, download is not available.");
	});
	event.preventDefault();
}

// @license-end
