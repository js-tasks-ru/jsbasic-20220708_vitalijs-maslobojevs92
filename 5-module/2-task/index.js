function toggleText() {
  let button = document.querySelector(".toggle-text-button");

  button.addEventListener("click", function (e) {
    text.hidden = text.hidden ? null : true;
  });
}
