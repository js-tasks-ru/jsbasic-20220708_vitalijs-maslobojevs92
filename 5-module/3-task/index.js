function initCarousel() {
  let carousel = document.querySelector(".carousel");
  let leftArrowBtn = carousel.querySelector(".carousel__arrow_left");
  let rightArrowBtn = carousel.querySelector(".carousel__arrow_right");
  let slidesContainer = carousel.querySelector(".carousel__inner");
  let slideWidth = 0;
  let slidePos = 1;

  changeButtonState();

  carousel.addEventListener("click", function (e) {
    runCarousel(e.target.closest(".carousel__arrow"));
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
      slideWidth = slideWidth - slidesContainer.offsetWidth;
      slidesContainer.style.transform = `translateX(${slideWidth}px)`;
      slidePos++;
    } else {
      slideWidth = slideWidth + slidesContainer.offsetWidth;
      slidesContainer.style.transform = `translateX(${slideWidth}px)`;
      slidePos--;
    }
  }

  function changeButtonState() {
    rightArrowBtn.style.display =
      slidePos === slidesContainer.childElementCount ? "none" : "";

    leftArrowBtn.style.display = slidePos === 1 ? "none" : "";
  }
}
