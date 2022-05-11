// Scroll animations
AOS.init({
    duration: 1500,
    delay: 500,
    // once: false,
    mirror: true
});

function disableMobileScroll() {
    document.body.classList.add('scroll-disable-mobile');
}
disableMobileScroll();

function enableMobileScroll() {
    document.body.classList.remove('scroll-disable-mobile')
}



// Disable Navigation when page is loading
// disableNavigation();

// When page is loaded do something
window.addEventListener('load', () => {
    // disable the preloader, enable scroll and navigation.
    // setTimeout(enableScroll, 2000);
    // setTimeout(enableNavigation, 2000);
    setTimeout(disablePreloader, 2000);
    setTimeout(enableMobileScroll, 2000);
});

// Disable preloader
function disablePreloader() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('preloader-finish');
}
// Disable preloader


// Enable and disable Navigation


function disableNavigation() {
    const navigation = document.querySelector('.et-hero-tabs-container');
    navigation.classList.add('disable-nav');
    console.log("Navigation is disabled");
}

function enableNavigation() {
    const navigation = document.querySelector('.et-hero-tabs-container');
    navigation.classList.remove('disable-nav');
    console.log("Navigation is enabled");

}

// Enable and disable Navigation

// Disable Enable Scrolling
// left: 37, up: 38, right: 39, down: 40,

//Reset scroll top

history.scrollRestoration = "manual";

$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});

// Contact form

document.querySelector('#contact-form').addEventListener('submit', (e) => {
    if (e.cancelable) e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
});
