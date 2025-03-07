// Available images in each category
const galleryImages = {
    'gcse-artbook': [
        'Sample-Image-file-Download.jpg',
        'sample-2.jpg'
    ],
    'drawings': [
        'Sample-Image-file-Download (3).jpg',
        'sample-3.jpg'
    ],
    'oil-and-acrylic': [
        'Sample-Image-file-Download (2).jpg',
        'sample-1.jpg'
    ],
    'other': [
        'Sample-Image-file-Download (1).jpg',
        'sample-5.jpg'
    ]
};

// Get random image URL for a category
function getRandomImageUrl(folder, currentSrc) {
    const images = galleryImages[folder];
    if (!images || images.length === 0) return null;
    
    // Get current image name from src
    const currentImage = currentSrc?.split('/')?.pop();
    let availableImages = images;
    
    // Filter out current image to ensure we get a different one
    if (currentImage) {
        availableImages = images.filter(img => img !== currentImage);
    }
    
    // If no other images available, use all images
    if (availableImages.length === 0) {
        availableImages = images;
    }
    
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return `images/${folder}/${availableImages[randomIndex]}`;
}

// Function to fade out and in
async function fadeTransition(element, newSrc) {
    element.style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, 500));
    element.src = newSrc;
    element.style.opacity = '1';
}

// Update a single preview
async function updatePreview(preview) {
    const folder = preview.dataset.folder;
    const newImageUrl = getRandomImageUrl(folder, preview.src);
    if (!newImageUrl) return;

    // Preload the new image
    try {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = newImageUrl;
        });
        await fadeTransition(preview, newImageUrl);
    } catch (error) {
        console.warn(`Failed to load image: ${newImageUrl}`);
    }
}

// Schedule next update for a preview
function scheduleNextUpdate(preview, baseDelay) {
    const randomDelay = baseDelay + Math.random() * 2000; // Random additional delay up to 2 seconds
    setTimeout(async () => {
        await updatePreview(preview);
        scheduleNextUpdate(preview, baseDelay);
    }, randomDelay);
}

// Initialize all previews
document.addEventListener('DOMContentLoaded', () => {
    const previews = document.querySelectorAll('.category-preview');
    
    // Add fade transition style
    previews.forEach(preview => {
        preview.style.transition = 'opacity 0.5s ease-in-out';
    });

    // Set random initial images and start staggered updates
    previews.forEach((preview, index) => {
        // Set initial random image
        const initialImage = getRandomImageUrl(preview.dataset.folder);
        if (initialImage) {
            preview.src = initialImage;
        }

        // Start updates with staggered base delays
        const baseDelay = 5000; // Base delay of 5 seconds
        setTimeout(() => {
            scheduleNextUpdate(preview, baseDelay);
        }, index * 1500); // Stagger initial updates by 1.5 seconds
    });
});
