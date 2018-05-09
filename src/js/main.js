
//scroll reveal
window.sr = ScrollReveal();
    sr.reveal('.card__image', {
        reset: true,
        delay: 200,
        origin: 'bottom',
        distance: 0,
        duration: 400,
        scale: 0.5,
        easing: 'linear',
    });
    sr.reveal('.card__title, .card__text', {
        reset: true,
        delay: 200,
        origin: 'bottom',
        duration: 400,
        scale: 0.5,
        easing: 'linear',
    });


//slider

$('.carousel').carousel({
    interval:0
});
