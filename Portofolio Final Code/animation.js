let controller;
let slideScene;
let pageScene;

function animateSlides(){
    //init controller
    controller = new ScrollMagic.Controller();
    //select some things
    const sliders = document.querySelectorAll(".slide");
    // const nav = document.querySelectorAll(".main-head");
    //loop over each slide
    sliders.forEach((slide,index,slides) => {
        const revealDiv = slide.querySelector('.reveal-div');
        const introSvg = slide.querySelector('.intro .intro-images svg');
        const aboutImg = slide.querySelector('.about .svg img');
        //gsap
        const slideTl = gsap.timeline( {defaults: {duration: 1, ease: "bounce.out" }});
        slideTl.fromTo(revealDiv, { x: "0%" }, { x: "100%" });
        slideTl.fromTo(introSvg, { scale: 2 }, { scale: 1 }, "-=1");
        slideTl.fromTo(aboutImg, { scale: 1.3 }, { scale: 1 }, "-=0.5");
        //Create scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })
        .setTween(slideTl)
        // .addIndicators({ colorStart: 'red', colorTrigger: 'red', name: 'slide'})
        .addTo(controller);
        // New Animation
        const pageTl = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
        pageTl.fromTo(nextSlide, { y: '0%'}, { y: '50%'});
        pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
        pageTl.fromTo(nextSlide, { y: '50%'}, { y: '0%'}, '-=0.5' );
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0
        })
        // .addIndicators({ colorStart: 'red', colorTrigger: 'red', name: 'page', indent: 200})
        .setPin(slide, {pushFollowers: false})
        .setTween(pageTl)
        .addTo(controller);
    });
}

animateSlides();