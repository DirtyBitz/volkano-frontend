javascript: (function () {
  startup();
  function startup() {
    let initialized = document.getElementById("VolkaScript");
    if (initialized) {
      alert("Please click an image to add it, or right-click to abort.");
      return;
    }

    initialized = document.createElement("div");
    initialized.setAttribute("id", "VolkaScript");

    let head = document.getElementsByTagName("head")[0];
    head.appendChild(initialized);

    let style = document.createElement("style");
    style.setAttribute("id", "VolkaStyle");
    style.innerHTML = `
    img {
      transition: transform .5s;
    }

    img:hover {
      border: 2px solid #8db517 !important;
      cursor: crosshair !important;
      transform: scale(1.05);
    }`;
    head.appendChild(style);

    let images = document.getElementsByTagName("img");
    for (let img of images) {
      img.addEventListener("click", clickfunc);
    }

    document.addEventListener("contextmenu", abort, false);
  }

  function abort(e) {
    e.preventDefault();
    cleanup();
    return false;
  }

  function clickfunc(e) {
    e.preventDefault();
    cleanup();
    const img = e.target;
    let url = `https://volka.no/additem?url=${img.src}`;

    if (img.title) {
      url += `&title=${img.title}`
    } else if (img.alt) {
      url += `&title=${img.alt}`
    }

    window.open(url)
  };

  function cleanup() {
    let images = document.getElementsByTagName("img");
    for (let img of images) {
      img.removeEventListener("click", clickfunc);
    }

    let style = document.getElementById("VolkaStyle");
    style.parentNode.removeChild(style);

    let volka = document.getElementById("VolkaScript");
    volka.parentNode.removeChild(volka);
  }
})();
