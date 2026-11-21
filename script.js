document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const numbersContainer = document.getElementById("slide-numbers");
  const currentSlideEl = document.getElementById("current-slide");
  const totalSlidesEl = document.getElementById("total-slides");

  if (!slides.length || !prevBtn || !nextBtn || !numbersContainer || !currentSlideEl || !totalSlidesEl) {
    return;
  }

  let currentIndex = 0;
  const totalSlides = slides.length;

  totalSlidesEl.textContent = String(totalSlides);

  function updateUI() {
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    const numberButtons = numbersContainer.querySelectorAll(".number-btn");
    numberButtons.forEach((button, index) => {
      const isActive = index === currentIndex;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;
    currentSlideEl.textContent = String(currentIndex + 1);
  }

  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    updateUI();
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      showSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      showSlide(currentIndex - 1);
    }
  }

  function createNumberButtons() {
    slides.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "number-btn";
      button.textContent = String(index + 1);
      button.setAttribute("aria-label", `الانتقال إلى الشريحة ${index + 1}`);
      button.addEventListener("click", () => showSlide(index));
      numbersContainer.appendChild(button);
    });
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
        event.preventDefault();
        nextSlide();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        event.preventDefault();
        prevSlide();
        break;
      case "Home":
        event.preventDefault();
        showSlide(0);
        break;
      case "End":
        event.preventDefault();
        showSlide(totalSlides - 1);
        break;
      default:
        break;
    }
  });

  createNumberButtons();
  updateUI();
});
