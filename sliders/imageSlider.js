const slides = document.querySelectorAll("section")
const totalSlides = slides.length;
let currentSlide = 0;

window.addEventListener('touchend', changeSlideshow);
window.addEventListener('mouseup', changeSlideshow);

function changeSlideshow() {
    let dir = detectSwipeDirection();
    let current = slides[currentSlide];
    if (dir === "right") {
        if (currentSlide === 0) return;
        current.classList.remove("slideLeft");
        current.classList.remove("slideRight");
        currentSlide--;
        slides[currentSlide].classList.add("slideRight"); 
    }
    else if (dir === "left") {
        if (currentSlide === totalSlides-1) return;
        current.classList.remove("slideLeft");
        current.classList.remove("slideRight");
        currentSlide++;
        slides[currentSlide].classList.add("slideLeft"); 
    }
    slides
}

slides[currentSlide].classList.add("slideLeft");