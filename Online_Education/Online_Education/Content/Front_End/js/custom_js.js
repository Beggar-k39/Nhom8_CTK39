document.addEventListener("DOMContentLoaded", function () {
    var maintop = document.querySelector('.main-top'),
        shortmenu = document.querySelector('.short-menu');
    
    var status = true;
    window.addEventListener('scroll', function () {
        if (this.window.pageYOffset > 94) {
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
    })
    
},false)