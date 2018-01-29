javascript: (function() {
  startup();
  function startup() {
    let initialized = document.getElementById("VolkaScript");
    if (initialized){
      console.log("VolkaScript already initialized");
      return;
    }

    initialized = document.createElement("div");
    initialized.setAttribute("id", "VolkaScript");

    let head = document.getElementsByTagName("head")[0];
    head.appendChild(initialized);

    let style = document.createElement("style");
    style.setAttribute("id", "VolkaStyle");
    style.innerHTML = "img:hover { border: 2px solid #8db517 !important; cursor: crosshair !important}";
    head.appendChild(style);

    let images = document.getElementsByTagName("img");
    for (let img of images) {
      img.addEventListener("mouseover", hoverin);
      img.addEventListener("mouseleave", hoverin);
      img.addEventListener("click", clickfunc);
    }
  }
  function hoverin(e) {
    const img = e.target;
    console.log("Hovering over ", img);
  };

  function hoverout(e) {
    const img = e.target;
  };

  function clickfunc(e) {
    e.preventDefault();

    /* POST IMAGE TO SERVER HERE*/
    /* Other possible things to do here may be to extract information of where it came from (i.e. page you're browsing on), and other possible fun information. */
    console.log(e.target.src);

    const img = e.target;
    cleanup();
  };

  function cleanup() {
    let images = document.getElementsByTagName("img");
    for (let img of images) {
      img.removeEventListener("mouseover", hoverin);
      img.removeEventListener("mouseleave", hoverin);
      img.removeEventListener("click", clickfunc);
    }

    let style = document.getElementById("VolkaStyle");
    style.parentNode.removeChild(style);

    let volka = document.getElementById("VolkaScript");
    volka.parentNode.removeChild(volka);
  }
})();
