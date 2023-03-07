// When page has loaded
document.addEventListener("DOMContentLoaded", function() {
    // Cookie consent
    cookieconsent.run({ "notice_banner_type": "headline", "consent_type": "simple", "palette": "light", "language": "en", "page_load_consent_levels": ["strictly-necessary"], "notice_banner_reject_button_hide": false, "preferences_center_close_button_hide": false, "page_refresh_confirmation_buttons": false, "website_privacy_policy_url": "https://imoptimal.com/privacy-policy/" });

    // Prevent img right click
    var imgs = document.querySelectorAll('img');
    imgs.forEach(function(img) {
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });

    // Lazy loading images
    function isElementInViewport(element) {
        var rect = element.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    // On load
    function lazyLoadImages(imgs) {
        imgs.forEach(function(img) {
            var visible = isElementInViewport(img);
            if (visible === true) {
                var imgSrc = img.dataset.src;
                img.setAttribute('src', imgSrc);
                img.classList.remove('lazy-loading');
            }
        });
    }
    var lazyImgs = document.querySelectorAll('img.lazy-loading');
    lazyLoadImages(lazyImgs);
    // On scroll, resize, orientationChange
    function triggerOnChange() {
        setTimeout(
            function() {
                console.log('triggered');
                var lazyImgs = document.querySelectorAll('img.lazy-loading');
                if (lazyImgs.length > 0) {
                    console.log('');
                    lazyLoadImages(lazyImgs);
                } else {
                    console.log('no images').
                    return;
                }
            }, 100);
    }
    document.addEventListener("scroll", triggerOnChange);
    window.addEventListener("resize", triggerOnChange);
    window.addEventListener("orientationChange", triggerOnChange);


    // Hide CMS content
    /*function closeCmsSection() {
        if (cmsEl.classList.contains('displayed')) {
            var displayedEl = document.querySelectorAll('displayed');
            displayedEl.forEach(function(el) {
                el.classList.remove('displayed');
            });

        }
    }*/

    // Display CMS content
    function displayCMS(rawGithubUrl, cmsEl, links) {
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var clickedEl = e.target;
                var file = rawGithubUrl + clickedEl.dataset.href;
                if (clickedEl.classList.contains('show-cms')) {
                    clickedEl.classList.add('displayed');
                    cmsEl.classList.add('displayed');
                    fetch(file)
                        .then(function(response) {
                            // When the page is loaded convert it to text
                            return response.text()
                        })
                        .then(function(html) {
                            // Initialize the DOM parser
                            var parser = new DOMParser();
                            // Parse the text
                            var page = parser.parseFromString(html, "text/html");
                            var content = page.querySelector('.cms').innerHTML;
                            cmsEl.innerHTML = content;

                            var closeButton = document.querySelector('.close-cms');
                            console.log(closeButton);
                            var parent = closeButton.parentNode;
                            console.log(parent);
                            var clone = closeButton.cloneNode(true);
                            console.log(clone);
                            // Remove eventListeners
                            parent.replaceChild(clone, closeButton);
                            console.log(closeButton);
                            console.log(clone);
                            clone.addEventListener('click', function() {
                                console.log('CLICKED');
                                if (cmsEl.classList.contains('displayed')) {
                                    var displayedEl = document.querySelectorAll('displayed');
                                    displayedEl.forEach(function(el) {
                                        el.classList.remove('displayed');
                                    });
                                }
                            })

                        });
                }
            });
        });
    }
    var gitHubRepo = 'https://raw.githubusercontent.com/Imoptimal/imoptimal-website/master';
    var footerCms = document.querySelector('.footer #cms');
    var footerLinks = document.querySelectorAll('.footer .links a');
    displayCMS(gitHubRepo, footerCms, footerLinks);
});