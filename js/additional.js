// When page has loaded
document.addEventListener("DOMContentLoaded", function() {
    //Cookie consent
    cookieconsent.run({ "notice_banner_type": "headline", "consent_type": "simple", "palette": "light", "language": "en", "page_load_consent_levels": ["strictly-necessary"], "notice_banner_reject_button_hide": false, "preferences_center_close_button_hide": false, "page_refresh_confirmation_buttons": false, "website_privacy_policy_url": "https://imoptimal.com/privacy-policy/" });

    // Add html template into another html file
    /*function includeHTML() {
        var z, i, elmnt, file, xhttp;
        // Loop through a collection of all HTML elements:
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            // search for elements with a certain atrribute:
            file = elmnt.getAttribute("include-html");
            if (file) {
                // Make an HTTP request using the attribute value as the file name:
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) { elmnt.innerHTML += this.responseText; }
                        if (this.status == 404) { console.log("Page not found."); }
                        // Remove the attribute, and call this function once more:
                        elmnt.removeAttribute("include-html");
                        includeHTML();
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
                // Exit the function:
                return;
            }
        }
    }

    includeHTML();*/
    // Add include-html="./layouts/template-parts/template-part.html" as an attribute to html element where you want to insert the template part
});