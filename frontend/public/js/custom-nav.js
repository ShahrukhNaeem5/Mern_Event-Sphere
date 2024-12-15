(function() {
    var doc = document.documentElement;
    var w = window;
    var curScroll;
    var prevScroll = w.scrollY || doc.scrollTop;
    var curDirection = 0;
    var prevDirection = 0;
    var header = document.getElementById('header_menu');
    var toggled;
    var threshold = 200;

    if (!header) {
        console.error('Element with ID "header_menu" not found.');
        return; // Exit if the header element is not found
    }

    var checkScroll = function() {
        curScroll = w.scrollY || doc.scrollTop;

        if (curScroll > prevScroll) {
            curDirection = 2; // Scrolling down
        } else {
            curDirection = 1; // Scrolling up
        }

        if (curDirection !== prevDirection) {
            toggled = toggleHeader();
        }

        prevScroll = curScroll;

        if (toggled) {
            prevDirection = curDirection;
        }
    };

    var toggleHeader = function() {
        toggled = true;

        if (curDirection === 2 && curScroll > threshold) {
            header.classList.add('hide');
            jQuery('.sticky1').addClass('tab-sticky');
        } else if (curDirection === 1) {
            header.classList.remove('hide');
            jQuery('.sticky1').removeClass('tab-sticky');
        } else {
            toggled = false;
        }

        return toggled;
    };

    window.addEventListener('scroll', checkScroll);
})();
