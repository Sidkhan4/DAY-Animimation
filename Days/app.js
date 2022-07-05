let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each sllide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    const slideT1 = gsap.timeline({default: {duration: 1, ease: 'power2,inOut' }})
    slideT1.fromTo(revealImg, {x: "0%"}, {x: "100%"});
    slideT1.fromTo(img, {scale: 2},{scale: 1}, "0.1");
    slideT1.fromTo(revealText, {x: "0%"}, {x: "150%"}, "-=0.5");
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25
    })
    .setTween(slideT1)
    .addTo(controller);
    const pageT1 = gsap.timeline();
    pageT1.fromTo(slide, {opacity:1, scale:1},{opacity:0, scale: 0});
    pageScene = new ScrollMagic.Scene({
      triggerElement : slide,
      duration: "100%",
      triggerHook:0  
    })
    .setPin(slide, { pushFollowers: false }) 
    .setTween(pageT1)
    .addTo(controller)
  });
  
}

let mouse = document.querySelector('.cursor')
let burger = document.querySelector('.burger')

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activeCursor(e){
  const item = e.target;
  if(item.id === "logo" || item.classList.contains("burger")){
    mouse.classList.add('nav-active')
  }else{
    mouse.classList.remove('nav-active')
  }
}
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  }else{
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

burger.addEventListener("click",navToggle)
window.addEventListener("mousemove",cursor)
window.addEventListener("mouseover", activeCursor)

animateSlides();  