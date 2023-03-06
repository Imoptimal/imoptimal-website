// When page has loaded
document.addEventListener("DOMContentLoaded", function() {
    // Cookie consent
    cookieconsent.run({ "notice_banner_type": "headline", "consent_type": "simple", "palette": "light", "language": "en", "page_load_consent_levels": ["strictly-necessary"], "notice_banner_reject_button_hide": false, "preferences_center_close_button_hide": false, "page_refresh_confirmation_buttons": false, "website_privacy_policy_url": "https://imoptimal.com/privacy-policy/" });

    // Display CMS content
    function displayCMS(rawGithubUrl, cmsEl, links, linksParent) {
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
                        });
                }
            });
            // Hide CMS content
            var closeButton = document.createElement("div");
            closeButton.classList.add("close-cms");
            closeButton.setAttribute('title', 'Close this section');
            cmsEl.append("X", closeButton);
            window.addEventListener('click', function() {
                if (cmsEl.classList.contains('displayed')) {
                    cmsEl.classList.remove('displayed');
                    clickedEl.classList.remove('displayed');
                }
            });
        });
    }
    var gitHubRepo = 'https://raw.githubusercontent.com/Imoptimal/imoptimal-website/master';
    var footerCms = document.querySelector('.footer #cms');
    var footerLinks = document.querySelectorAll('.footer .links a');
    var footerLinksParent = document.querySelector('.footer .links');
    displayCMS(gitHubRepo, footerCms, footerLinks, footerLinksParent);
});