let initialDistance = 0;
let isZooming = false;
let isPanning = false;
let currentScale = 1; // Keep track of the zoom scale
let zoomOutThreshold = 0.5; // Define zoom out threshold for zoomed-out state
let isZoomedOut = false;
let startTouchX = 0;
let endTouchX = 0;
let isSwipeDetected = false;

// Function to calculate the distance between two touch points
function getTouchDistance(touch1, touch2) {
  const dx = touch1.pageX - touch2.pageX;
  const dy = touch1.pageY - touch2.pageY;
  return Math.sqrt(dx * dx + dy * dy);
}

// Detect if the user is panning (touch or mouse dragging)
function detectPanning(event) {
  if (event.type === 'touchmove' || event.type === 'mousemove') {
    isPanning = true;
  }
}

// Reset the panning state
function resetPanningState() {
  isPanning = false;
}

// Touch start event handler (for pinch/zoom detection)
function touchStartHandler(event) {
  if (event.touches.length === 2) {
    initialDistance = getTouchDistance(event.touches[0], event.touches[1]);
    isZooming = true; // Pinch started
  } else if (event.touches.length === 1) {
    // Start tracking swipe gesture when one finger is used
    startTouchX = event.touches[0].pageX;
  }
}

// Touch move event handler (for pinch/zoom detection)
function touchMoveHandler(event) {
  if (isZooming && event.touches.length === 2) {
    const currentDistance = getTouchDistance(event.touches[0], event.touches[1]);
    const zoomFactor = currentDistance / initialDistance;

    if (zoomFactor > 1) {
      isZoomedOut = false;
    } else if (zoomFactor < 1) {
      if (zoomFactor < zoomOutThreshold) {
        isZoomedOut = true; // Consider as zoomed out if below threshold
      }
    }

    initialDistance = currentDistance; // Update the initial distance for the next move
  } else if (event.touches.length === 1) {
    // Track swipe only if the user is not zooming
    endTouchX = event.touches[0].pageX;
    isSwipeDetected = Math.abs(endTouchX - startTouchX) > 50; // Threshold for swipe distance
  }
}

// Touch end event handler (end of pinch gesture or swipe gesture)
function touchEndHandler(event) {
  if (event.touches.length < 2) {
    isZooming = false; // End of pinch gesture
  }

  if (isSwipeDetected && !isZooming && !isZoomedOut && !isPanning) {
    if (endTouchX > startTouchX) {
      changeSlideshow('right'); // Right swipe (e.g., next image)
    } else if (endTouchX < startTouchX) {
      changeSlideshow('left'); // Left swipe (e.g., previous image)
    }
  }

  // Reset swipe detection
  isSwipeDetected = false;
  resetPanningState();
}

// Mouse events for panning detection (for desktop users)
function mouseMoveHandler(event) {
  detectPanning(event);
}

function mouseUpHandler(event) {
  resetPanningState();
}

// Add event listeners
document.addEventListener('touchstart', touchStartHandler, false);
document.addEventListener('touchmove', touchMoveHandler, false);
document.addEventListener('touchend', touchEndHandler, false);

// Mouse-based event listeners for panning detection (for desktop users)
document.addEventListener('mousemove', mouseMoveHandler, false);
document.addEventListener('mouseup', mouseUpHandler, false);

let lastTapTime = 0;
let zoomScale = 1; // Initial zoom scale
const zoomOutFactor = 0.8; // Factor by which to zoom out on double-tap/click
const zoomInFactor = 1.2; // Factor to zoom in (for reference)

const zoomOutThreshold = 0.5; // Define the minimum zoom scale to consider it "zoomed out"

// Function to apply zoom (scaling the content)
function applyZoom(scale) {
  document.body.style.transform = `scale(${scale})`;
  document.body.style.transformOrigin = 'center center'; // Keep zoom centered
}

// Function to handle double-tap (touch) or double-click (mouse)
function handleDoubleTapClick(event) {
  const currentTime = new Date().getTime();
  const tapDifference = currentTime - lastTapTime;

  if (tapDifference < 300) { // If two taps/clicks occur within 300ms, it's a double-tap/click
    zoomScale = zoomScale * zoomOutFactor;
    if (zoomScale < zoomOutThreshold) {
      zoomScale = zoomOutThreshold;
    }

    applyZoom(zoomScale); // Apply the zoom transformation
  }
  lastTapTime = currentTime;
}

// Add event listeners for both touch and mouse events
document.addEventListener('touchstart', handleDoubleTapClick, false);  // For mobile
document.addEventListener('click', handleDoubleTapClick, false);       // For desktop