// popup.js

window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

var authorClick = function() {
    browser.tabs.create({url: 'https://github.com/AHR9N'});
};
var githubClick = function() {
    browser.tabs.create({url: 'https://github.com/AHR9N/notify-me'});
};

document.getElementById('author').addEventListener('click', authorClick);
document.getElementById('github').addEventListener('click', githubClick);
