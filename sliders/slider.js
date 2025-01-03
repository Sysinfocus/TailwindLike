let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let isMouseDown = false;

function touchStartHandler(e) {
    if (e.touches.length > 1) return;
    const touch = e.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
}

function touchEndHandler(e) {
    if (e.changedTouches.length > 1) return;
    const touch = e.changedTouches[0];
    endX = touch.pageX;
    endY = touch.pageY;

    // console.log(detectSwipeDirection());
}

function mouseDownHandler(e) {
    isMouseDown = true;
    startX = e.pageX;
    startY = e.pageY;
}

function mouseMoveHandler(e) {
    if (!isMouseDown) return;
    endX = e.pageX;
    endY = e.pageY;
}

function mouseUpHandler(e) {
    if (!isMouseDown) return;
    endX = e.pageX;
    endY = e.pageY;
    isMouseDown = false;

    // console.log(detectSwipeDirection());
}

function detectSwipeDirection() {
    const xDiff = endX - startX;
    const yDiff = endY - startY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            return "right";
        } else {
            return "left";
        }
    } else {
        if (yDiff > 0) {
            return "down";
        } else {
            return "up";
        }
    }
}

document.addEventListener("touchstart", touchStartHandler, false);
document.addEventListener("touchend", touchEndHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);