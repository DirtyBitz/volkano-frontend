(function() {
  startup();
  const volkaURL = volkanoURLPleaseNoConflictingVariableNames;
  function startup() {
    let style = document.createElement('style');
    style.setAttribute('id', 'VolkaStyle');
    style.innerHTML = `
    img, video {
      transition: transform .5s;
    }

    img:hover, video:hover {
      border: 2px solid #8db517 !important;
      cursor: crosshair !important;
      transform: scale(1.05);
    }`;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);

    const images = document.getElementsByTagName('img');
    for (const img of images) {
      img.addEventListener('click', mediaClick);
    }

    const videos = document.getElementsByTagName('video');
    for (const video of videos) {
      video.addEventListener('click', videoClick);
    }
    document.addEventListener('contextmenu', abort, false);
  }

  function abort(e) {
    e.preventDefault();
    cleanup();
    return false;
  }

  function mediaClick(e) {
    e.preventDefault();
    cleanup();
    const img = e.target;
    let url = `${volkaURL}/additem?url=${img.src}`;

    if (img.title) {
      url += `&title=${img.title}`;
    } else if (img.alt) {
      url += `&title=${img.alt}`;
    }

    window.open(url);
  }

  function videoClick(e) {
    e.preventDefault();
    cleanup();
    const video = e.target;
    let src;
    if (video.src === '') {
      src = video.getElementsByTagName('source')[0].src;
      if (src === '' || typeof src === 'undefined') {
        alert('Could not find source of element, try adding it by right-clicking the element and copying the link.');
        return;
      }
    } else {
      src = video.src;
    }

    const url = `${volkaURL}/additem?url=${src}`;
    window.open(url);
  }

  function cleanup() {
    let images = document.getElementsByTagName('img');
    for (let img of images) {
      img.removeEventListener('click', mediaClick);
    }

    const videos = document.getElementsByTagName('video');
    for (const video of videos) {
      video.removeEventListener('click', videoClick);
    }

    document.removeEventListener('contextmenu', abort);

    let style = document.getElementById('VolkaStyle');
    style && style.parentNode.removeChild(style);

    let volka = document.getElementById('VolkaScript');
    volka && volka.parentNode.removeChild(volka);
  }
})();
