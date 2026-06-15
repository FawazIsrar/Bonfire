// Animation Settings
const frameCount = 270;
const animationFolder = 'animation';
const images = [];

// DOM Elements
const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderText = document.getElementById('loader-text');

// Create frame URL helper
function currentFrame(index) {
    const paddedIndex = String(index).padStart(3, '0');
    return `${animationFolder}/ezgif-frame-${paddedIndex}.jpg`;
}

// Preload Images
let loadedCount = 0;
function preloadImages() {
    return new Promise((resolve) => {
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedCount++;
                const percentage = Math.round((loadedCount / frameCount) * 100);
                loaderBar.style.width = `${percentage}%`;
                loaderText.innerText = `Loading Assets (${percentage}%)`;

                if (loadedCount === frameCount) {
                    resolve();
                }
            };
            // Fallback for load errors to prevent blocking the loader
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    resolve();
                }
            };
            images.push(img);
        }
    });
}

// Draw Frame centered and covering the canvas (aspect-ratio: cover)
function drawImageCover(img) {
    if (!img) return;
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (!imgWidth || !imgHeight) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgRatio > canvasRatio) {
        // Image is wider than canvas
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
    } else {
        // Image is taller than canvas
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

// Handle Canvas Resize
function resizeCanvas() {
    // Account for high-DPI displays (retina screens)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    // Scale context back to normal coordinates
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Redraw current frame
    const scrollFraction = getScrollFraction();
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );
    drawImageCover(images[frameIndex]);
}

// Calculate scroll fraction (0 to 1)
function getScrollFraction() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    
    if (maxScrollTop <= 0) return 0;
    return scrollTop / maxScrollTop;
}

// Update loop for animations
let lastFrameIndex = -1;
let ticking = false;

function updateScrollAnimation() {
    const scrollFraction = getScrollFraction();
    
    // Determine current frame index (0-indexed array)
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    // Only redraw if the frame index actually changed
    if (frameIndex !== lastFrameIndex && images[frameIndex]) {
        drawImageCover(images[frameIndex]);
        lastFrameIndex = frameIndex;
    }

    ticking = false;
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimation);
        ticking = true;
    }
}

// Initialize
async function init() {
    // Preload all 270 frames
    await preloadImages();

    // Setup initial Canvas size
    resizeCanvas();
    
    // Hide Loader
    loader.classList.add('fade-out');

    // Attach Event Listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', onScroll);

    // Run initial update to render first frame
    updateScrollAnimation();
}

// Start app when DOM is fully ready
document.addEventListener('DOMContentLoaded', init);
