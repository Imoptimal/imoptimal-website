// When page has loaded
document.addEventListener("DOMContentLoaded", function () {
  /* 1. On hover, click or tap focus on the icon */
    document.querySelectorAll("#principles .cell").forEach((cell) => {
        var img = cell.querySelector("img");
        var paragraph = cell.querySelector("p");
        var span = paragraph.querySelector("span");
        // While the mouse is inside the image, add the class 'focus'
        cell.addEventListener("mouseover", () => {
            cell.classList.add("focus");
            img.src = img.src.replace(/\.png/, "-focus.png");
            img.classList.add("focus");
            paragraph.classList.add("focus");
            span.classList.add("focus");
        });
        // If outside the image, remove the class 'focus'
        cell.addEventListener("mouseout", () => {
            cell.classList.remove("focus");
            img.src = img.src.replace(/-focus.png/, ".png");
            img.classList.remove("focus");
            paragraph.classList.remove("focus");
            span.classList.remove("focus");
        });
    });

  /* 2. Lazy loading images */
    function isImageInViewport(element) {
        var el = element.getBoundingClientRect();
        return (
            el.top >= 0 &&
            el.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            el.bottom <=
        (window.innerHeight || document.documentElement.clientHeights)
        );
    }
    // On load
    function lazyLoadImages(imgs) {
        imgs.forEach(function (img) {
        var visible = isImageInViewport(img);
        if (visible === true) {
            var imgSrc = img.dataset.src;
            img.setAttribute("src", imgSrc);
            img.classList.remove("lazy-loading");
        } else {
            return;
        }
        });
    }
    var lazyImgs = document.querySelectorAll("img.lazy-loading");
    lazyLoadImages(lazyImgs);
    // On scroll, resize, orientationChange
    function loadOnChange() {
        setTimeout(function () {
        var lazyImgs = document.querySelectorAll("img.lazy-loading");
        if (lazyImgs.length > 0) {
            lazyLoadImages(lazyImgs);
        } else {
            // No images - remove eventListeners
            document.removeEventListener("scroll", loadOnChange);
            window.removeEventListener("resize", loadOnChange);
            window.removeEventListener("orientationChange", loadOnChange);
            return;
        }
        }, 100);
    }
    document.addEventListener("scroll", loadOnChange);
    window.addEventListener("resize", loadOnChange);
    window.addEventListener("orientationChange", loadOnChange);

    /* 3. Trigger animation when an element is in viewport */
    function isElementInViewport(element) {
        var el = element.getBoundingClientRect();
        return (
        el.top >= 0 &&
        el.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
    // On load
    function triggerAnimation(els) {
        els.forEach(function (el) {
        var visible = isElementInViewport(el);
        if (visible === true) {
            el.classList.add("on");
        } else {
            if (el.classList.contains("once")) {
            return;
            }
            el.classList.remove("on");
        }
        });
    }
    var animateEls = document.querySelectorAll(".animate-on-scroll");
    triggerAnimation(animateEls);
    // On scroll, resize, orientationChange
    function animateOnChange() {
        setTimeout(function () {
        var animateEls = document.querySelectorAll(".animate-on-scroll");
        if (animateEls.length > 0) {
            triggerAnimation(animateEls);
        } else {
            // No images - remove eventListeners
            document.removeEventListener("scroll", animateOnChange);
            window.removeEventListener("resize", animateOnChange);
            window.removeEventListener("orientationChange", animateOnChange);
            return;
        }
        }, 100);
    }
    document.addEventListener("scroll", animateOnChange);
    window.addEventListener("resize", animateOnChange);
    window.addEventListener("orientationChange", animateOnChange);

    /* 4. Load Ecwid store scripts and elements after the rest of the page has loaded */
    // Insert external script and it's content when the page has loaded
    function insertEcwidStore() {
        var storeDiv = document.createElement("div");
        storeDiv.setAttribute("id", "my-store-104266017");
        var scriptOne = document.createElement("script");
        scriptOne.setAttribute("data-cfasync", "false");
        scriptOne.setAttribute("type", "text/javascript");
        scriptOne.setAttribute("charset", "utf-8");
        scriptOne.src =
        "https://app.ecwid.com/script.js?104266017&data_platform=code&data_date=2024-05-18";
        var scriptTwo = document.createElement("script");
        scriptTwo.setAttribute("type", "text/javascript");
        scriptTwo.innerHTML =
        'xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list","id=my-store-104266017");';
        var parentDiv = document.querySelector("#shop .ecwid-store");
        parentDiv.appendChild(storeDiv);
        // Append the second script only after the first one has loaded
        parentDiv.appendChild(scriptOne);
        scriptOne.onload = function () {
        parentDiv.appendChild(scriptTwo);
        };
    }
    insertEcwidStore(); // On page load
});