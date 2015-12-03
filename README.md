# optimizely-adblock

Host the file adblock.js on your server (or alternatively use http://maazze.com/adblock.js but up time is not guarantee)
Copy the content of add-to-project-js.js to your project js
Inside the project JS code, modify the URL http://www.maazze.com/adblock.js to whereever you uploaded the js file

You can now target ad block users by using the following code in your conditional activation box
function (activate, options) {
	var itv = setInterval(function() {
		if (window.ad_blocker !== undefined) {
			clearInterval(itv);
			if (window.ad_blocker == true) {
				activate();
			}
		}
	}, 50);
}

You can for example AB test messages asking users to disable ad block or you can just hide content if ad block is on

Create a dimension with the name 'adblock' to segment ad blocker users on the results page
Create a custom event 'userDisabledAdBlock' to track user who disabled their ad blocker after seeing the experiment