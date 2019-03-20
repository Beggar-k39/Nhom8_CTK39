document.addEventListener("DOMContentLoaded", function () {
    var maintop = document.querySelector('.main-top'),
        shortmenu = document.querySelector('.short-menu'),
        stickyleft = document.querySelector('.sticky-left');
    var status = true;
    var status1 = true;
    var y;
    window.addEventListener('scroll', function () {
        y = window.pageYOffset;
        console.log(y);
        if (y > 94) {
            if (status) {
                maintop.classList.add('menu-hide');
                shortmenu.classList.add('short-menu-show');
                status = false;
            }
        } else {
            maintop.classList.remove('menu-hide');
            shortmenu.classList.remove('short-menu-show');
            status = true;
        }

        if (y > 1200) {
            if (status1) {
                stickyleft.classList.add('sticky-left-show');
                status1 = false;
            }
        } else {
            stickyleft.classList.remove('sticky-left-show');
            status1 = true;
        }

    })

}, false)