function initCarousel() {
  let carousel = document.querySelector(".carousel");
  let leftArrowBtn = carousel.querySelector(".carousel__arrow_left");
  let rightArrowBtn = carousel.querySelector(".carousel__arrow_right");
  let slidesContainer = carousel.querySelector(".carousel__inner");
  let slideCoords = 0;
  let slidePos = 0;
  let timeout = null;

  changeButtonState();

  carousel.addEventListener("click", function (e) {
    runCarousel(e.target.closest(".carousel__arrow"));
  });

  window.addEventListener("resize", function () {
    clearTimeout(timeout);
    timeout = setTimeout(fixSlidePosition, 500);
  });

  function runCarousel(button) {
    if (button === rightArrowBtn) {
      moveSlide({ direction: "right" });
      changeButtonState();
    }

    if (button === leftArrowBtn) {
      moveSlide({ direction: "left" });
      changeButtonState();
    }
  }

  function moveSlide({ direction }) {
    if (direction === "right") {
      slidePos++;
      slideCoords = slidePos * slidesContainer.offsetWidth;
      slidesContainer.style.transform = `translateX(${-slideCoords}px)`;
    } else {
      slidePos--;
      slideCoords = slidePos * slidesContainer.offsetWidth;
      slidesContainer.style.transform = `translateX(${-slideCoords}px)`;
    }
  }

  function changeButtonState() {
    rightArrowBtn.style.display =
      slidePos === slidesContainer.childElementCount - 1 ? "none" : "";

    leftArrowBtn.style.display = slidePos === 0 ? "none" : "";
  }

  function fixSlidePosition() {
    slideCoords = slidePos * slidesContainer.offsetWidth;
    slidesContainer.style.transform = `translateX(${-slideCoords}px)`;
  }
}
