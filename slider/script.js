let images = document.querySelectorAll(
  ".slider .slider-line .slider-line__item"
);

let sliderLine = document.querySelector(".slider-line");
let sliderDots = document.querySelector(".slider-dots");

const slidesLength = images.length,
  firstImage = images[0],
  cloneFirst = firstImage.cloneNode(true),
  lastImage = images[slidesLength - 1],
  cloneLast = lastImage.cloneNode(true);

let index = 1;
let shift = true;

sliderLine.appendChild(cloneFirst);
sliderLine.insertBefore(cloneLast, firstImage);

for (let i = 1; i <= slidesLength; i++) {
  sliderDots.insertAdjacentHTML(
    "beforeend",
    `<span class="slider-dot" id="${i}"></span>`
  );
}

document.getElementById("1").classList.add("red");

function init() {
  let imagesInit = document.querySelectorAll(
    ".slider .slider-line .slider-line__item"
  );
  width = document.querySelector(".slider").offsetWidth;
  sliderLine = document.querySelector(".slider-line");
  sliderLine.style.width = width * imagesInit.length + "px";
  imagesInit.forEach((item) => {
    item.style.width = width + "px";
    item.style.height = "auto";
  });
}

window.addEventListener("resize", () => {
  init();
  sliderLine.style.left = "-" + width * index + "px";
});
init();
let length = width;
let buttonNext = document.querySelector(".slider-button__next");
let buttonPrev = document.querySelector(".slider-button__previous");

buttonNext.addEventListener("click", () => {
  if (shift) {
    shift = false;
    rollSlider("next");
  }
});

buttonPrev.addEventListener("click", () => {
  if (shift) {
    shift = false;
    rollSlider("prev");
  }
});

let dots = document.querySelectorAll(".slider-dot");
for (let i = 1; i <= dots.length; i++) {
  dots[i - 1].addEventListener("click", (e) => {
    if (i === index) {
      return;
    }
    if (shift) {
      shift = false;
      rollSlider(i);
    }
  });
}

addEventListener("keyup", (e) => {
  if (e.code === "ControlRight" && shift) {
    shift = false;
    rollSlider("next");
  }
});

function rollSlider(event) {
  shift = false;
  document.getElementById(`${index}`).classList.remove("red");
  if (event === "next") {
    index++;
    document.getElementById(`${index}`)
      ? document.getElementById(`${index}`).classList.add("red")
      : document.getElementById(`1`).classList.add("red");
    let timer = setInterval(async () => {
      sliderLine.style.left = "-" + length + "px";
      length += 30;
      if (length >= width * index) {
        await clearInterval(timer);
        length = width * index;
        sliderLine.style.left = "-" + length + "px";
        shift = true;
        if (index > slidesLength) {
          let sliderLine = document.querySelector(".slider-line");
          sliderLine.style.left = width;
          index = 1;
          length = width;
        }
      }
    }, 20);
  }
  if (event === "prev") {
    index--;
    if (index === 0) {
      document.getElementById(`${slidesLength}`).classList.add("red");
      let timer = setInterval(async () => {
        sliderLine.style.left = "-" + length + "px";
        length -= 30;
        if (length <= 0) {
          await clearInterval(timer);
          index = slidesLength;
          sliderLine.style.left = "-" + width * slidesLength + "px";
          length = width * index;
          shift = true;
        }
      }, 20);
    } else {
      document.getElementById(`${index}`).classList.add("red");
      let timer = setInterval(async () => {
        sliderLine.style.left = "-" + length + "px";
        length -= 30;
        if (length <= width * index) {
          await clearInterval(timer);
          length = width * index;
          sliderLine.style.left = "-" + length + "px";
          shift = true;
        }
      }, 20);
    }
  }
  if (typeof event === "number") {
    if (event > index) {
      index = event;
      document.getElementById(`${index}`).classList.add("red");
      let timer = setInterval(async () => {
        sliderLine.style.left = "-" + length + "px";
        length += 30;
        if (length >= width * index) {
          await clearInterval(timer);
          length = width * index;
          sliderLine.style.left = "-" + length + "px";
          shift = true;
        }
      }, 20);
    }
    if (event < index) {
      index = event;
      document.getElementById(`${index}`).classList.add("red");
      let timer = setInterval(async () => {
        sliderLine.style.left = "-" + length + "px";
        length -= 30;
        if (length <= width * index) {
          await clearInterval(timer);
          length = width * index;
          sliderLine.style.left = "-" + length + "px";
          shift = true;
        }
      }, 20);
    }
  }
}
