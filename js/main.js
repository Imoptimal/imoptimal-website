/* Main Script File 
    Content:
    1. Prevent img right click
    2. Lazy loading images
    3. Add border to header on scroll
    4. Menu slide in
    5. Open links in slide-in
    6. Open newsletter/scheduling form
    7. Custom progress bar instead of default scrollbar
    8. Mark current page in menu
    9. Mark and scroll to content section on a landing page
    10. Show only parts of landing pages (based on URL parameters)
    */

// When page has loaded
document.addEventListener("DOMContentLoaded", function () {
  /* 1. Prevent img right click */
  var imgs = document.querySelectorAll("img");
  imgs.forEach(function (img) {
    img.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
  });

  /* 2. Lazy loading images */
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

  /* 3. Add border to header on scroll */
  function headerOnScroll() {
    setTimeout(function () {
      var pageHeader = document.querySelector(".masthead");
      if (window.scrollY > pageHeader.offsetTop) {
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

  /* 4. Menu slide in */
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

  /* 5. Display loaded pages in slide-in */
  function openSlideInLinks(slideInEl, links, github = true) {
    var contentEl = document.querySelector("#slide-in .loaded-content");
    var pageHeader = document.querySelector(".masthead");
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var clickedEl = e.target;
        contentEl.scrollTop = 0;
        pageHeader.classList.add("hidden");
        // If getting a github html file data for local files
        if (github == true) {
          var file =
            "https://raw.githubusercontent.com/Imoptimal/imoptimal-website/master" +
            clickedEl.dataset.href;
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
        }
      });
    });
    // Close the section
    var closeButton = document.querySelector(".close-slide-in");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        if (slideInEl.classList.contains("displayed")) {
          var allDisplayed = document.querySelectorAll(".displayed");
          allDisplayed.forEach(function (item) {
            item.classList.remove("displayed");
          });
          pageHeader.classList.remove("hidden");
        }
      });
    }
  }
  var displayEl = document.querySelector("#slide-in");
  var footerLinks = document.querySelectorAll(".footer .links a");
  openSlideInLinks(displayEl, footerLinks);

  /* 6. Open newsletter/scheduling form */
  var newsletterButtons = document.querySelectorAll(".newsletter button");
  var newsletterContainer = document.querySelector("#brevo-iframe");
  var newsletterTemplate = "https://raw.githubusercontent.com/Imoptimal/imoptimal-website/master/templates/newsletter.html";
  var newsletterTemplateSelector =".newsletter-form";
  var schedulingButtons = document.querySelectorAll(".scheduling-button");
  var schedulingContainer = document.querySelector("#scheduling-iframe");
  var schedulingTemplate = "https://raw.githubusercontent.com/Imoptimal/imoptimal-website/master/templates/scheduling.html";
  var schedulingTemplateSelector =".scheduling-form";
  function showForm(openButtons, alreadyAppended, templateUrl, theFormSelector) {
    if (openButtons) {
      openButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          if (!alreadyAppended) {
            fetch(templateUrl)
              .then(function (response) {
                // When the page is loaded convert it to text
                return response.text();
              })
              .then(function (html) {
                // Initialize the DOM parser
                var parser = new DOMParser();
                // Parse the text
                var page = parser.parseFromString(html, "text/html");
                var getTheForm =
                  page.querySelector(theFormSelector).innerHTML;
                var destinationDiv = document.querySelector(".form-container");
                var onPageForm = document.querySelector(".the-form");
                onPageForm.innerHTML = getTheForm;
                destinationDiv.classList.add("opened");
              });
          } else {
            // If it's already loaded
            destinationDiv.classList.add("opened");
            return;
          }
        });
      });
    }
  }
  showForm(schedulingButtons, schedulingContainer, schedulingTemplate, schedulingTemplateSelector);
  showForm(newsletterButtons, newsletterContainer, newsletterTemplate, newsletterTemplateSelector);

  function closeForm() {
    var closeButton = document.querySelector(".form-container .close");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        var openedNewsletter = document.querySelector(".form-container.opened");
        if (openedNewsletter.classList.contains("opened")) {
          openedNewsletter.classList.remove("opened");
        }
      });
    }
  }
  closeForm();
  
  /* 7. Custom progress bar instead of default scrollbar */
  const progressBarContainer = document.querySelector("#progressBarContainer");
  const progressBar = document.querySelector("#progressBar");
  let totalPageHeight = document.body.scrollHeight - window.innerHeight;
  let debounceResize;

  if (progressBarContainer) {
    window.addEventListener(
      "scroll",
      () => {
        let newProgressHeight = window.scrollY / totalPageHeight;
        progressBar.style.transform = `scaleY(${newProgressHeight})`;
        progressBar.style.transformOrigin = "top";
        progressBar.style.opacity = `${newProgressHeight}`;
      },
      {
        capture: true,
        passive: true,
      }
    );

    window.addEventListener("resize", () => {
      clearTimeout(debounceResize);
      debounceResize = setTimeout(() => {
        totalPageHeight = document.body.scrollHeight - window.innerHeight;
      }, 250);
    });

    progressBarContainer.addEventListener("click", (e) => {
      let newPageScroll =
        (e.clientY / progressBarContainer.offsetHeight) * totalPageHeight;
      window.scrollTo({
        top: newPageScroll,
        behavior: "smooth",
      });
    });
  }

  /* 8. Mark current page in menu */
  const menuLinks = document.querySelectorAll(".masthead .slide-in ul li a");
  if (menuLinks) {
    // Get current page url and compare it to menuLinks, and add class name current to the item that matches
    var currentPage = window.location.href;
    menuLinks.forEach(function (link) {
      if (link.href == currentPage) {
        link.classList.add("current");
      }
    });
  }

  /* 9. Mark and scroll to content section on a landing page */
  if (menuLinks) {
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        // Remove the 'active' class from all list items
        menuLinks.forEach((link) => link.classList.remove("current"));
        link.classList.add("current");
      });
    });
  }

  /* 10. Show only parts of landing pages (based on URL parameters) */
  const allTuts = document.querySelectorAll("#one, #two, #three, #four, #five");
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.toString() === "") {
    // no params
    if (allTuts) {
      allTuts.forEach((tutEl) => {
        tutEl.style.display = "flex";
      });
    }
  } else {
    const tutorial = urlParams.get("tutorial");
    const pageTitle = document.querySelector("h1");
    const navigation = document.querySelector(".masthead .nav");
    pageTitle.style.display = "none";
    navigation.style.display = "none";
    const tutorialId = "#" + tutorial;
    if (tutorial) {
      const tutorialEl = document.querySelector(tutorialId);
      tutorialEl.style.display = "flex";
    }
    const newsletterEls = document.querySelectorAll(".newsletter");
    const onSocial = urlParams.get("social");
    if (newsletterEls && (onSocial == "yes")) {
      // don't hide newsletter buttons
    } else { // no social parameter
      newsletterEls.forEach((element) => {
        element.remove();
      });
    }
  }
});
