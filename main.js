function scaleOnPicture() {
  const body_width = document.body.clientWidth;
  let el = document.getElementById("main-picture");
  let nav = document.getElementById("removedNav");
  // el.classList.toggle("after-clicked");
  // nav.classList.toggle("remode_nav");

  if (body_width >= 600) {
    el.classList.toggle("after-clicked");
    nav.classList.toggle("remode_nav");
  } else {
    el.classList.remove("after-clicked");
  }
}

const carusel = document.querySelector(".carusel");
const caruselImages = document.querySelectorAll(".carusel_div");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let counter = 1;
const size = caruselImages[0].clientWidth;

let total = 0;
let amount = Math.floor(
  document.querySelector(".carusel").clientWidth / 6 -
    getComputedStyle(
      document.querySelectorAll(".carusel_div")[0]
    ).marginRight.split("px")[0]
);

document.addEventListener("resize", () => {
  amount =
    document.querySelector(".carusel").clientWidth /
      document.querySelectorAll(".carusel_div").length -
    getComputedStyle(
      document.querySelectorAll(".carusel_div")[0]
    ).marginRight.split("px")[0];
});

nextBtn.addEventListener("click", () => {
  if (counter >= caruselImages.length - 1) return;
  carusel.style.transition = "transform 0.5s ease-in-out";
  counter++;

  total = total + amount;

  console.log(total);

  carusel.style.transform = `translateX(${total}px)`;

  // var rect = caruselImages[0].getBoundingClientRect();
  // var top = (caruselImages[0].style.top = rect.top + "px");
  // var left = (caruselImages[0].style.left = rect.left + "px");

  // console.log(top + " Top");
  // console.log(left + " left");

  console.log("next");
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  if (total >= 0) {
    carusel.style.transition = "transform 0.5s ease-in-out";
    counter--;
    total = total - amount;
    carusel.style.transform = `translateX(${total}px)`;
    console.log("total");
  } else {
    carusel.style.transition = "none";
    console.log("naklebia");
  }
});

carusel.addEventListener("transitionend", () => {
  if (caruselImages[counter].id === "lastClone" && total >= 1900) {
    carusel.style.transition = "none";
    counter = carusel.length - 1;

    total = total + amount;
    carusel.style.transform = `translateX(${total}px)`;
  }
  if (caruselImages[counter].id === "firstClone") {
    carusel.style.transition = "none";
    counter = carusel.length - counter;
    total = total - amount;
    carusel.style.transform = `translateX(${total}px)`;
  }
  console.log("fired");
});

//// ==================== FOR-NAVIGATION-WHEN SCROLLL
const navigation = document.querySelector(".navigation");
const sectionHero = document.querySelector(".hero_picture");

const sectionOptions = {
  rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navigation.classList.add("nav-scrolled");
    } else {
      navigation.classList.remove("nav-scrolled");
    }
    console.log(entry.target);
  });
},
sectionOptions);

sectionOneObserver.observe(sectionHero);

///// =============NAV-BAR ANIMATIONS
const toggleOnNav = () => {
  const mobile_nav = document.querySelector(".new-opacity");
  const active_hamburger = document.querySelector(".hamburger");
  const new_nav = document.querySelector(".navigation");

  mobile_nav.classList.toggle("mobile_nav");
  active_hamburger.classList.toggle("active-burger");
  new_nav.classList.toggle("new-nav");
  console.log("clicked");
};
