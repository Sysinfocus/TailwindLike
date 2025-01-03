const slides = document.querySelectorAll("section")
const totalSlides = slides.length;
let currentSlide = 0;

let isZooming = false;

window.addEventListener('touchstart', e => {
    if (isZooming) return;
    isZooming = e.touches.length > 1;
})

window.addEventListener('touchmove', e => {
    if (isZooming && e.touches.length > 1)
        return;
})

window.addEventListener('touchend', e => {
    if (!isZooming) changeSlideshow();
});

window.addEventListener('doubleclick', e => {
    isZooming = false;
});

window.addEventListener('mouseup', changeSlideshow);

function changeSlideshow() {
    if (isZooming) return;
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

document.querySelector(".title").addEventListener("click", () => location.reload());