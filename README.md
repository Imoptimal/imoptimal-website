## imoptimal-website

- Add everything in between coments of <-- Site Header - Start --> and <-- Site Header - End -->, and <-- Site Footer - Start --> and <-- Site Footer - End --> to each page (copy from index.html). Those sections need to be updated manually on each page. Just add to unique id to container div (for customization of each page - #homepage, #about-me, #services, #why-website, #why-wordpress, #wordpress-plugins), and page titles (first part before the slogan).

- Landing pages (in the lp folder) should be replicated separately - slightly different header and footer  Add unique class to container div (. accessibility, .privacy, . security, .speed). And then populate the page content (menu) with sections for each landing page based on it's content.

- Add images as the \<img class="lazy-loading" data-src="./images/image-name.png" alt="Description." draggable="false" width="pictureWidth" height="pictureHeight"/>. All images are hosted on https://cloudinary.com/

- For links loading in slide-in section, add data-href property instead of href property, with the full link or relative github file path (to html template file), and add class="slide-in".

