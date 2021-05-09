let images = document.querySelectorAll(".slider .slider-line .slider-line__item")
let sliderLine = document.querySelector(".slider-line");

function init() {
  let images = document.querySelectorAll(".slider .slider-line .slider-line__item")
  width = document.querySelector(".slider").offsetWidth
  sliderLine = document.querySelector(".slider-line");
  sliderLine.style.width = width * images.length + "px"
  images.forEach(item => {
    item.style.width = width + "px"
    item.style.height = "auto"
  })
}

window.addEventListener("resize", init)
init()

let button = document.querySelector(".slider-button__next")
document.querySelector(".slider-button__next").addEventListener("click", () => {
  button.disabled = !button.disabled;
  rollSlider()
})

addEventListener("keyup", (e) => {
  if (e.code === "ControlRight" && !button.disabled) {
    button.disabled = !button.disabled;
    rollSlider()
  }
})

function rollSlider() {
  let length = 0
  width = document.querySelector(".slider").offsetWidth
  let timer = setInterval(async () => {
    sliderLine.style.left = "-" + length + "px"
    length += 15
    if (length >= width) {
      await clearInterval(timer)
      sliderLine.style.left = 0 + "px"
      button.disabled = !button.disabled
      firstItem = document.querySelectorAll(".slider .slider-line .slider-line__item")[0]
      document.querySelectorAll(".slider .slider-line .slider-line__item")[images.length - 1].insertAdjacentHTML("afterend",
        `<img class="slider-line__item" src="${firstItem.src}" alt="" style="width: ${width}px; height: auto">`)
      firstItem.remove()
    }
  }, 15)
}
