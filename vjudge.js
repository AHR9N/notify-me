// background.js

window.browser = (function () {
    return window.msBrowser || window.browser || window.chrome;
})();

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
	console.log("button clicked!");
}

// console.log(window.location.href);
