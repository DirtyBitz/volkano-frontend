javascript: (function () {
  const baseURL = 'https://volka.no';
  let initialized = document.getElementById('VolkaScript');
  if (initialized) {
    alert('Please click an image or video to add it, or right-click to abort.');
    return;
  }

  initialized = document.createElement('script');
  initialized.setAttribute('src', `${baseURL}/static/bookmarklet.js`);
  initialized.setAttribute('id', 'VolkaScript');

  let head = document.getElementsByTagName('head')[0];
  head.appendChild(initialized);
})();
var volkanoURLPleaseNoConflictingVariableNames = 'https://volka.no';
