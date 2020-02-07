// const scaleOnPicture = () => {
//   let el = document.getElementsByClassName("hero_picture");
//   el.clas
//   console.log("Clicked");
// };

function scaleOnPicture() {
  let el = document.getElementById("main-picture");
  let nav = document.getElementById("removedNav");
  el.classList.toggle("after-clicked");
  nav.classList.toggle("remode_nav");
  //   el.classList.remove("no-transform");
  //   console.log("Clicked");
}

const carusel = document.querySelector(".carusel");
const caruselImages = document.querySelectorAll(".carusel_div");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let counter = 1;
const size = caruselImages[0].clientWidth;

let total = 0;
let amount =
  document.querySelector(".carusel").clientWidth /
    document.querySelectorAll(".carusel_div").length -
  getComputedStyle(
    document.querySelectorAll(".carusel_div")[0]
  ).marginRight.split("px")[0];

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

  console.log("next");
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carusel.style.transition = "transform 0.5s ease-in-out";
  counter--;
  total = total - amount;
  carusel.style.transform = `translateX(${total}px)`;
  console.log("prev");
});

if (caruselImages[counter].id === "firstClone") {
  carusel.style.transition = "none";
}

// carusel.addEventListener("transitionend", () => {
//   if (caruselImages[counter].id === "firstClone") {
//     carusel.style.transition = "none";
//     carusel.style.marginRight = "50px";
//     // counter = caruselImages.length - counter;
//     // total = total + amount;
//     // carusel.style.transform = `translateX(${total}px)`;
//   }
//   console.log("fired");
// });
