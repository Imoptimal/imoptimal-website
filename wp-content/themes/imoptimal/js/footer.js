/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csspointerevents-setclasses !*/
!function(e,n,s){function t(e,n){return typeof e===n}function o(){var e,n,s,o,a,i,f;for(var c in l)if(l.hasOwnProperty(c)){if(e=[],n=l[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(o=t(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],f=i.split("."),1===f.length?Modernizr[f[0]]=o:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),Modernizr[f[0]][f[1]]=o),r.push((o?"":"no-")+f.join("-"))}}function a(e){var n=c.className,s=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(t,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),u?c.className.baseVal=n:c.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var r=[],l=[],f={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){l.push({name:e,fn:n,options:s})},addAsyncTest:function(e){l.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var c=n.documentElement,u="svg"===c.nodeName.toLowerCase();Modernizr.addTest("csspointerevents",function(){var e=i("a").style;return e.cssText="pointer-events:auto","auto"===e.pointerEvents}),o(),a(r),delete f.addTest,delete f.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();e.Modernizr=Modernizr}(window,document);

//Prevent images to be right clicked or dragable
jQuery(function() {

    if (Modernizr.csspointerevents) {	// supported

        jQuery('img').css({
            'pointer-events': 'auto'
        });

        function prevent() {
            // this part disables the right click
            jQuery('img').on('contextmenu', function(e) {
                return false;
            });
            //this part disables dragging of image
            jQuery('img').on('dragstart', function(e) {
                return false;
            });

        }
        prevent();

    } else {	// not-supported

        function prevent() {
            // this part disables the right click
            jQuery('img').on('contextmenu', function(e) {
                return false;
            });
            //this part disables dragging of image
            jQuery('img').on('dragstart', function(e) {
                return false;
            });

        }
        prevent();
    }
});

// Fix skip-link focus in IE11
jQuery(function() {
    /(trident|msie)/i.test(navigator.userAgent)&&document.getElementById&&window.addEventListener&&window.addEventListener("hashchange",function(){var t,e=location.hash.substring(1);/^[A-z0-9_-]+$/.test(e)&&(t=document.getElementById(e))&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())},!1);   
});

// Dropdown menu
jQuery(function($) {
    var menuHandle = $('.imothm-container .site-header .dropdown-menu .handle');
    var menuToggler = $('.imothm-container .site-header .dropdown-menu .toggle');
    var headerMenu = $('.imothm-container .site-header .dropdown-menu .header-menu');
    var searchHandle = $('.imothm-container .site-header .search-toggle .handle');
    var searchToggler = $('.imothm-container .site-header .search-toggle .toggle');
    var searchForm = $('.imothm-container .site-header .search-toggle #searchform');
    var skipLink = $('.imothm-container .skip-link');
    $(headerMenu).prepend('<a class="close-menu" href="#"></a>');
    $(headerMenu).append('<a class="auto-close" href="#"></a>');
    var menuCloseButton = $('.imothm-container .site-header .dropdown-menu .close-menu');
    var menuAutoClose = $('.imothm-container .site-header .dropdown-menu .auto-close');
    $(searchForm).prepend('<a class="close-menu" href="#"></a>');
    $(searchForm).append('<a class="auto-close" href="#"></a>');
    var searchCloseButton = $('.imothm-container .site-header .search-toggle .close-menu');
    var searchAutoClose = $('.imothm-container .site-header .search-toggle .auto-close');
    // Enable menu to remain open with keyboard tab through menu
    function handleTabThrough(handle, handledItem, toggler) {
        handle.on('focus', function() {
            if (handledItem.hasClass('slided')) {
                handledItem.removeClass('slided');
                toggler.removeClass('clicked');
            } else {
                handledItem.addClass('slided');
                toggler.addClass('clicked');
            }
        });
    }
    handleTabThrough(menuHandle, headerMenu, menuToggler);
    handleTabThrough(searchHandle, searchForm, searchToggler);
    // Close on last tab trough dropdown menu
    function autoCloser(closeTrigger, closingItem, itemToggler) {
        $(closeTrigger).on('keyup', function(e) {
            if (e.key === 'Tab' || e.key === 'Space' || e.key === 'Enter') {
                e.preventDefault();
                if (closingItem.hasClass('slided')) {
                    closingItem.toggleClass('slided');
                    itemToggler.removeClass('clicked');
                }
            }
        });
    }
    autoCloser(menuAutoClose, headerMenu, menuToggler);
    autoCloser(searchAutoClose, searchForm, searchToggler);
    // Close on shift+tab on skip-link
    function closeInReverse(previousFocusElement, closingItem, itemToggler) {
        $(previousFocusElement).on('keyup', function(e) {
            if (e.shiftKey && e.key === 'Tab') {
                e.preventDefault();
                if (closingItem.hasClass('slided')) {
                    closingItem.toggleClass('slided');
                    itemToggler.removeClass('clicked');
                }
            }
        });
    }
    closeInReverse(skipLink, headerMenu, menuToggler);
    closeInReverse('.custom-logo-link', searchForm, searchToggler);
    // Close menu on esc button
    function closeOnEsc(closingItem, itemToggler) {
        $(document).on('keydown', function(e) {
            if ( e.keyCode === 27 ) {
                e.preventDefault();
                if (closingItem.hasClass('slided')) {
                    closingItem.toggleClass('slided');
                    itemToggler.removeClass('clicked');
                }
            }
        });
    }
    closeOnEsc(headerMenu, menuToggler);
    closeOnEsc(searchForm, searchToggler);
    // Open/close on toggler click
    function toggler(itemToggler, toggledItem) {
        $(itemToggler).on('click', function() {
            if ($(this).hasClass('clicked')) {
                $(this).removeClass('clicked');
            } else {
                $(this).addClass('clicked');
            }
            toggledItem.toggleClass('slided');
            return false;
        });
    }
    toggler(menuToggler, headerMenu);
    toggler(searchToggler, searchForm);
    // Close on close button click
    function closeButton(button, toggler, closingItem) {
        $(button).on('click', function() {
            toggler.removeClass('clicked');
            closingItem.removeClass('slided');
            return false;
        });
    }
    closeButton(menuCloseButton, menuToggler, headerMenu);
    closeButton(searchCloseButton, searchToggler, searchForm);
    // Close on any other item click
    function clickOutsideToClose(closingItem, toggler) {
        $(document).on('click', function(event) {	
            if (closingItem.hasClass('slided') && $(event.target).closest(closingItem).length == 0) {
                closingItem.toggleClass('slided');
                toggler.removeClass('clicked');  
            }
        });
    }
    clickOutsideToClose(headerMenu, menuToggler);
    clickOutsideToClose(searchForm, searchToggler);
});

// Elementor option disabled on archive or single post pages (missing header, footer and sidebar)
jQuery(function($) {
    container = $('.imothm-container');
    if (container.parents('.archive, .single-post').length != 0) {
        container.removeClass('imothm-elementor');
    }
});

