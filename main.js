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

////  ====================================v
///================== CARUSEL

const carusel = document.querySelector(".carusel");
const caruselImages = document.querySelectorAll(".carusel_div");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const backImage = document.querySelector(".carousel_slide");

let amountOfClicks = 0;
const size = caruselImages[0].clientWidth;

let total = 0;
let caruselImageWidth = Math.floor(
  getComputedStyle(document.querySelectorAll(".carusel_div")[0]).width.split(
    "px"
  )[0]
);
let caruselImageRightMargin = parseInt(
  getComputedStyle(
    document.querySelectorAll(".carusel_div")[0]
  ).marginRight.split("px")[0]
);

let amount = caruselImageWidth + caruselImageRightMargin;

document.addEventListener("resize", () => {
  amountOfClicks = 0;
  size = caruselImages[0].clientWidth;

  total = 0;
  caruselImageWidth = Math.floor(
    getComputedStyle(document.querySelectorAll(".carusel_div")[0]).width.split(
      "px"
    )[0]
  );
  caruselImageRightMargin = parseInt(
    getComputedStyle(
      document.querySelectorAll(".carusel_div")[0]
    ).marginRight.split("px")[0]
  );
  amount = caruselImageWidth + caruselImageRightMargin;
});

nextBtn.addEventListener("click", () => {
  amountOfClicks++;
  console.log(amountOfClicks);

  if (amountOfClicks == caruselImages.length) {
    total = 0;
    amountOfClicks = 0;
    if (amountOfClicks == 0) {
      backImage.style.backgroundImage = 'url("/../../pictures/six.png")';
    }

    console.log("reverse");
  } else {
    if (amountOfClicks <= 0) {
      prevBtn.classList.add("btn_opacity");
    } else {
      prevBtn.classList.remove("btn_opacity");
    }

    if (amountOfClicks == 1 || caruselImages[5]) {
      backImage.style.backgroundImage = 'url("/../../pictures/five.png")';
      // caruselImages.style.backgroundColor = "#ffffff";
      // caruselImages.style.borderRadius = "15"
      caruselImages[5].classList.add("color_radius");
    } else if (amountOfClicks == 2) {
      backImage.style.backgroundImage = 'url("/../../pictures/four.png")';
    } else if (amountOfClicks == 3) {
      backImage.style.backgroundImage = 'url("/../../pictures/three.png")';
    } else if (amountOfClicks == 4) {
      backImage.style.backgroundImage = 'url("/../../pictures/two.png")';
    } else if (amountOfClicks == 5) {
      backImage.style.backgroundImage = 'url("/../../pictures/one.png")';
    } else {
      console.log("error");
    }

    total = total + amount;
  }
  carusel.style.transform = `translateX(${total}px)`;
});

prevBtn.addEventListener("click", () => {
  amountOfClicks--;
  console.log(amountOfClicks);

  if (amountOfClicks <= 0) {
    total = 0;
    amountOfClicks = 0;
    carusel.style.transform = `translateX(${total}px)`;
    if (amountOfClicks == 0) {
      backImage.style.backgroundImage = 'url("/../../pictures/six.png")';
    }
    prevBtn.classList.add("btn_opacity");
    prevBtn.removeEventListener("click", this);
  } else {
    if (amountOfClicks == 0) {
      backImage.style.backgroundImage = 'url("/../../pictures/six.png")';
    } else if (amountOfClicks == 1) {
      backImage.style.backgroundImage = 'url("/../../pictures/five.png")';
    } else if (amountOfClicks == 2) {
      backImage.style.backgroundImage = 'url("/../../pictures/four.png")';
    } else if (amountOfClicks == 3) {
      backImage.style.backgroundImage = 'url("/../../pictures/three.png")';
    } else if (amountOfClicks == 4) {
      backImage.style.backgroundImage = 'url("/../../pictures/two.png")';
    } else if (amountOfClicks == 5) {
      backImage.style.backgroundImage = 'url("/../../pictures/one.png")';
    } else {
      console.log("error");
    }
    prevBtn.classList.remove("btn_opacity");
    total = total - amount;
  }
  carusel.style.transform = `translateX(${total}px)`;
});

////  ====================================v
///==================
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
  const body = document.body;

  body.classList.toggle("body-overflow");

  mobile_nav.classList.toggle("mobile_nav");
  active_hamburger.classList.toggle("active-burger");
  new_nav.classList.toggle("new-nav");
  console.log("clicked");
};
