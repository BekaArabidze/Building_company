// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function scaleOnPicture() {
  var body_width = document.body.clientWidth;
  var carousel_slide = document.querySelector(".carousel_slide");
  var nav = document.getElementById("removedNav");

  if (body_width >= 600) {
    carousel_slide.classList.toggle("after-clicked");
    nav.classList.toggle("removed_nav");
  } else {
    carousel_slide.classList.remove("after-clicked");
  }
}

var updateDescription = function updateDescription(amountOfClicks, start) {
  var index;
  var prevElement;
  var nextElement;

  if (start) {
    index = caruselImageElements.length - 1;
  } else {
    index = caruselImageElements.length - amountOfClicks - 1;
  }

  var focusElement = caruselImageElements[index];
  focusElement.classList.add('focuse_image');

  var otherImages = _toConsumableArray(caruselImageElements).filter(function (element) {
    return element != focusElement;
  });

  otherImages.forEach(function (elem) {
    return elem.classList.remove('focuse_image');
  });
  var backgroundImagePath = focusElement.attributes["src"].nodeValue;
  backImage.style.backgroundImage = "url(\"".concat(backgroundImagePath, "\")");
  var currentImgAtribute = focusElement.dataset;
  description.innerHTML = " ".concat(currentImgAtribute.description, "<span class=\"futura-condensed-font\">  (").concat(currentImgAtribute.metres, "m) </span> ");
}; ////  ====================================v
///================== CARUSEL


var carusel = document.querySelector(".carusel");
var caruselImages = document.querySelectorAll(".carusel_div");
var caruselImageElements = document.querySelectorAll(".carusel_image");
var prevBtn = document.querySelector("#prevBtn");
var nextBtn = document.querySelector("#nextBtn");
var backImage = document.querySelector(".carousel_slide");
var description = document.querySelector(".description");
var color_radius = document.querySelector(".border");
var amountOfClicks = 0;
var size = caruselImages[0].clientWidth;
var total = 0;
var caruselImageWidth = Math.floor(getComputedStyle(caruselImages[0]).width.split("px")[0]);
var caruselImageRightMargin = parseInt(getComputedStyle(caruselImages[0]).marginRight.split("px")[0]);
var amount = caruselImageWidth + caruselImageRightMargin;
document.addEventListener("resize", function () {
  amountOfClicks = 0;
  size = (_readOnlyError("size"), caruselImages[0].clientWidth);
  total = 0;
  caruselImageWidth = Math.floor(getComputedStyle(caruselImages[0]).width.split("px")[0]);
  caruselImageRightMargin = parseInt(getComputedStyle(caruselImages[0]).marginRight.split("px")[0]);
  amount = caruselImageWidth + caruselImageRightMargin;
});
updateDescription(caruselImageElements.length, true); //// NEXT-BTN

nextBtn.addEventListener("click", function () {
  amountOfClicks++;

  if (amountOfClicks == caruselImages.length) {
    total = 0;
    amountOfClicks = 0;
  } else {
    if (amountOfClicks <= 0) {
      prevBtn.classList.add("btn_opacity");
    } else {
      prevBtn.classList.remove("btn_opacity");
    }

    total = total + amount;
  }

  updateDescription(amountOfClicks, false);
  carusel.style.transform = "translateX(".concat(total, "px)");
}); //// PREV-BTN

prevBtn.addEventListener("click", function () {
  amountOfClicks--;

  if (amountOfClicks <= 0) {
    total = 0;
    amountOfClicks = 0;
    carusel.style.transform = "translateX(".concat(total, "px)");
    prevBtn.classList.add("btn_opacity");
  } else {
    prevBtn.classList.remove("btn_opacity");
    total = total - amount;
  }

  updateDescription(amountOfClicks, false);
  carusel.style.transform = "translateX(".concat(total, "px)");
}); ////  ====================================v
///==================
//// ==================== FOR-NAVIGATION-WHEN SCROLLL

var navigation = document.querySelector(".navigation");
var sectionHero = document.querySelector(".hero_picture");
var sectionOptions = {
  rootMargin: "-600px 0px 0px 0px"
};
var sectionOneObserver = new IntersectionObserver(function (entries, sectionOneObserver) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      navigation.classList.add("nav-scrolled");
    } else {
      navigation.classList.remove("nav-scrolled");
    }
  });
}, sectionOptions);
sectionOneObserver.observe(sectionHero); ///// =============NAV-BAR ANIMATIONS

var toggleOnNav = function toggleOnNav() {
  var mobile_nav = document.querySelector(".new-opacity");
  var active_hamburger = document.querySelector(".hamburger");
  var new_nav = document.querySelector(".navigation");
  var body = document.body;
  body.classList.toggle("body-overflow");
  mobile_nav.classList.toggle("mobile_nav");
  active_hamburger.classList.toggle("active-burger");
  new_nav.classList.toggle("new-nav");
  console.log("clicked");
}; // Scroll to specific values
// scrollTo is the same


var buttonScrolled = function buttonScrolled() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  }); // Scroll certain amounts from current position

  window.scrollBy({
    top: 0,
    // could be negative value
    left: 0,
    behavior: "smooth"
  }); // Scroll to a certain element

  document.querySelector("#smoothScrolled").scrollIntoView({
    behavior: "smooth"
  });
  console.log("Clicked");
};
<<<<<<< HEAD
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
=======
},{}],"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
>>>>>>> 6d774da1fdbd0075e8a2295af4448d9dedbcab2e
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
<<<<<<< HEAD
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50047" + '/');
=======
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50677" + '/');
>>>>>>> 6d774da1fdbd0075e8a2295af4448d9dedbcab2e

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
<<<<<<< HEAD
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
=======
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
>>>>>>> 6d774da1fdbd0075e8a2295af4448d9dedbcab2e
//# sourceMappingURL=/main.1f19ae8e.js.map