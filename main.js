function scaleOnPicture() {
  const body_width = document.body.clientWidth;
  let carousel_slide = document.querySelector(".carousel_slide");
  let nav = document.getElementById("removedNav");
  if (body_width >= 600) {
    carousel_slide.classList.toggle("after-clicked");
    nav.classList.toggle("removed_nav");
  } else {
    carousel_slide.classList.remove("after-clicked");
  }
}





const updateDescription = (amountOfClicks, start) => {
  let index;

  let prevElement;
  let nextElement;
  if (start) {
    index = caruselImageElements.length - 1;
  } else {
    index = caruselImageElements.length - amountOfClicks - 1;
  }




  let focusElement = caruselImageElements[index]
  focusElement.classList.add('focuse_image')

  let otherImages = [...caruselImageElements].filter(element => element != focusElement)
  otherImages.forEach(elem => elem.classList.remove('focuse_image'))


  let backgroundImagePath = focusElement.attributes["src"].nodeValue;
  backImage.style.backgroundImage = `url("${backgroundImagePath}")`;

  let currentImgAtribute = focusElement.dataset;
  description.innerHTML = ` ${currentImgAtribute.description}<span class="futura-condensed-font">  (${currentImgAtribute.metres}m) </span> `;
}






////  ====================================v
///================== CARUSEL

const carusel = document.querySelector(".carusel");
const caruselImages = document.querySelectorAll(".carusel_div");
const caruselImageElements = document.querySelectorAll(".carusel_image");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const backImage = document.querySelector(".carousel_slide");
const description = document.querySelector(".description");
const color_radius = document.querySelector(".border");

let amountOfClicks = 0;
const size = caruselImages[0].clientWidth;

let total = 0;
let caruselImageWidth = Math.floor(getComputedStyle(caruselImages[0]).width.split("px")[0]);
let caruselImageRightMargin = parseInt(getComputedStyle(caruselImages[0]).marginRight.split("px")[0]);

let amount = caruselImageWidth + caruselImageRightMargin;

document.addEventListener("resize", () => {
  amountOfClicks = 0;
  size = caruselImages[0].clientWidth;
  total = 0;
  caruselImageWidth = Math.floor(getComputedStyle(caruselImages[0]).width.split("px")[0]);
  caruselImageRightMargin = parseInt(getComputedStyle(caruselImages[0]).marginRight.split("px")[0]);
  amount = caruselImageWidth + caruselImageRightMargin;
});

updateDescription(caruselImageElements.length, true)

//// NEXT-BTN
nextBtn.addEventListener("click", () => {
  amountOfClicks++;
  if (amountOfClicks == caruselImages.length) {
    total = 0;
    amountOfClicks = 0;
  } else {
    if (amountOfClicks <= 0) {
      prevBtn.classList.add("btn_opacity");
    } else {
      prevBtn.classList.remove("btn_opacity");
    }
    total = total + amount;
  }
  updateDescription(amountOfClicks, false)
  carusel.style.transform = `translateX(${total}px)`;
});

//// PREV-BTN
prevBtn.addEventListener("click", () => {
  amountOfClicks--;

  if (amountOfClicks <= 0) {
    total = 0;
    amountOfClicks = 0;
    carusel.style.transform = `translateX(${total}px)`;
    prevBtn.classList.add("btn_opacity");
  } else {
    prevBtn.classList.remove("btn_opacity");
    total = total - amount;
  }
  updateDescription(amountOfClicks, false)
  carusel.style.transform = `translateX(${total}px)`;
});











////  ====================================v
///==================
//// ==================== FOR-NAVIGATION-WHEN SCROLLL
const navigation = document.querySelector(".navigation");
const sectionHero = document.querySelector(".hero_picture");

const sectionOptions = {
  rootMargin: "-600px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navigation.classList.add("nav-scrolled");
    } else {
      navigation.classList.remove("nav-scrolled");
    }
  });
},
  sectionOptions);

sectionOneObserver.observe(sectionHero);

///// =============NAV-BAR ANIMATIONS
const toggleNav = () => {
  const mobile_nav = document.querySelector(".new-opacity");
  const active_hamburger = document.querySelector(".hamburger");
  const new_nav = document.querySelector(".navigation");
  const body = document.body;

  body.classList.toggle("body-overflow");

  mobile_nav.classList.toggle("mobile_nav");
  active_hamburger.classList.toggle("active-burger");
  new_nav.classList.toggle("new-nav");
  console.log("clicked");
};

// Scroll to specific values
// scrollTo is the same

const buttonScrolled = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });

  // Scroll certain amounts from current position
  window.scrollBy({
    top: 0, // could be negative value
    left: 0,
    behavior: "smooth"
  });
  // Scroll to a certain element
  document.querySelector("#smoothScrolled").scrollIntoView({
    behavior: "smooth"
  });

  console.log("Clicked");
};




























