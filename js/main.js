/* Main Script File 
    Content:
    1. Cookie consent
    2. Prevent img right click
    3. Lazy loading images
    4. Add border to header on scroll
    5. Menu slide in
    6. Open links in slide-in
    */
// When page has loaded
document.addEventListener("DOMContentLoaded", function() {
  /* 1. Cookie consent */
  cookieconsent.run({
    notice_banner_type: "simple",
    consent_type: "headline",
    palette: "light",
    language: "en",
    page_load_consent_levels: ["strictly-necessary"],
    notice_banner_reject_button_hide: true,
    preferences_center_close_button_hide: false,
    page_refresh_confirmation_buttons: false,
    website_name: "Small Business Website Expert - imoptimal.com",
    website_privacy_policy_url: "#privacy",
  });

  /* 2. Prevent img right click */
  var imgs = document.querySelectorAll("img");
  imgs.forEach(function (img) {
    img.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
  });

  /* 3. Lazy loading images */
  function isElementInViewport(element) {
    var el = element.getBoundingClientRect();

    return (
      el.top >= 0 &&
      el.left >= 0 &&
      el.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  // On load
  function lazyLoadImages(imgs) {
    imgs.forEach(function (img) {
      var visible = isElementInViewport(img);
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
  function triggerOnChange() {
    setTimeout(function () {
      var lazyImgs = document.querySelectorAll("img.lazy-loading");
      if (lazyImgs.length > 0) {
        lazyLoadImages(lazyImgs);
      } else {
        // No images - remove eventListeners
        document.removeEventListener("scroll", triggerOnChange);
        window.removeEventListener("resize", triggerOnChange);
        window.removeEventListener("orientationChange", triggerOnChange);
        return;
      }
    }, 100);
  }
  document.addEventListener("scroll", triggerOnChange);
  window.addEventListener("resize", triggerOnChange);
  window.addEventListener("orientationChange", triggerOnChange);

  /* 4. Add border to header on scroll */
  function headerOnScroll() {
    setTimeout(function () {
      var pageHeader = document.querySelector(".masthead");
      if (window.pageYOffset > pageHeader.offsetTop) {
        pageHeader.classList.add("scrolling");
      } else {
        pageHeader.classList.remove("scrolling");
      }
    }, 1000);
  }
  // On load
  headerOnScroll();
  // On scroll
  document.addEventListener("scroll", headerOnScroll);

  /* 5. Menu slide in */
  function slideMenu() {
    var menuButton = document.querySelector(".masthead .nav button");
    var slideIn = document.querySelector(".masthead .nav .slide-in");
    if (slideIn.classList.contains("clicked")) {
      menuButton.classList.remove("clicked");
      slideIn.classList.remove("clicked");
    } else {
      menuButton.classList.add("clicked");
      slideIn.classList.add("clicked");
    }
  }
  var menuButton = document.querySelector(".masthead .nav button");
  menuButton.addEventListener("click", slideMenu);
  // Close the menu
  var closeMenu = document.querySelector(".masthead .nav .close");
  closeMenu.addEventListener("click", slideMenu);
  /* 6. Display loaded pages in slide-in */
  function openSlideInLinks(url, slideInEl, links, github = true) {
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var clickedEl = e.target;
        var contentEl = document.querySelector(".#slide-in .loaded-content");
        // If getting a github html file data for local files
        if (github == true) {
          var file = url + clickedEl.dataset.href;
          if (clickedEl.classList.contains("slide-in")) {
            clickedEl.classList.add("displayed");
            slideInEl.classList.add("displayed");
            fetch(file)
              .then(function (response) {
                // When the page is loaded convert it to text
                return response.text();
              })
              .then(function (html) {
                // Initialize the DOM parser
                var parser = new DOMParser();
                // Parse the text
                var page = parser.parseFromString(html, "text/html");
                var partialContent =
                  page.querySelector(".slide-in-page").innerHTML;
                  contentEl.innerHTML = partialContent;
              });
          }
        } else if (github == false) {
          // if getting outside links
          var link = clickedEl.dataset.href;
          if (clickedEl.classList.contains("slide-in")) {
            clickedEl.classList.add("displayed");
            slideInEl.classList.add("displayed");
            fetch(link)
              .then(function (response) {
                // When the page is loaded convert it to text
                return response.text();
              })
              .then(function (html) {
                // Initialize the DOM parser
                var parser = new DOMParser();
                // Parse the text
                var fullPage = parser.parseFromString(html, "text/html");
                contentEl.innerHTML = fullPage;
              });
          }
        }
      });
    });
    // Close the section
    var closeButton = document.querySelector(".close-slide-in");
    closeButton.addEventListener("click", function () {
      if (slideInEl.classList.contains("displayed")) {
        var allDisplayed = document.querySelectorAll(".displayed");
        allDisplayed.forEach(function (item) {
          item.classList.remove("displayed");
        });
      }
    });
  }
  var gitHubRepo =
    "https://raw.githubusercontent.com/Imoptimal/imoptimal-website/master";
  var displayEl = document.querySelector("#slide-in");
  var footerLinks = document.querySelectorAll(".footer .links a");
  openSlideInLinks(gitHubRepo, displayEl, footerLinks);
});