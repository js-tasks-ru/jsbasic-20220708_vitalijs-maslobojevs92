function initCarousel() {
  let carousel = document.querySelector(".carousel");
  let leftArrowBtn = carousel.querySelector(".carousel__arrow_left");
  let rightArrowBtn = carousel.querySelector(".carousel__arrow_right");
  let slides = carousel.querySelector(".carousel__inner");
  let slideWidth = 0;
  let slidesCount = 0;

  changeButtonState();

  carousel.addEventListener("click", function (e) {
    runSlide(e.target.closest(".carousel__arrow"));
  });

  function runSlide(button) {
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
      slideWidth = slideWidth - slides.offsetWidth;
      slides.style.transform = `translateX(${slideWidth}px)`;
      slidesCount++;
    } else {
      slideWidth = slideWidth + slides.offsetWidth;
      slides.style.transform = `translateX(${slideWidth}px)`;
      slidesCount--;
    }
  }

  function changeButtonState() {
    rightArrowBtn.style.display =
      slidesCount == slides.childElementCount - 1 ? "none" : "";

    leftArrowBtn.style.display = slidesCount == 0 ? "none" : "";
  }
}
