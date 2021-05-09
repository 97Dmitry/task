// prettier-ignore
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

const btn = document.getElementById("btn1")
btn.addEventListener("click", () => {
  let inputs = []
  inputs = document.querySelectorAll("input")
  inputs.forEach(item => {
    if (!item.value) {
      item.style.border = "2px solid red"
    } else {
      item.style.border = "2px solid #0fad0f"
    }
  })
})

