// Available images in each category
const galleryImages = {
    'gcse-artbook': [
        'IMG_5129.jpg',
        'sample-2.jpg'
    ],
    'drawings': [
        'IMG_5097.jpg',
        'sample-3.jpg'
    ],
    'oil-and-acrylic': [
        'IMG_6086.jpg',
        'sample-1.jpg'
    ],
    'other': [
        'IMG_6088.jpg',
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
    const newUrl = `images/${folder}/${availableImages[randomIndex]}`;
    console.log(`Changing ${folder} image to: ${newUrl}`);
    return newUrl;
}

// Function to fade out and in
async function fadeTransition(element, newSrc) {
    console.log(`Starting fade transition for ${element.dataset.folder}`);
    element.style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, 1000)); // Slower fade out (1 second)
    element.src = newSrc;
    element.style.opacity = '1';
    console.log(`Completed fade transition for ${element.dataset.folder}`);
}

// Update all previews simultaneously
async function updateAllPreviews(previews) {
    console.log('Updating all previews');
    
    // Prepare all new images first
    const updates = Array.from(previews).map(preview => {
        const newImageUrl = getRandomImageUrl(preview.dataset.folder, preview.src);
        return { preview, newImageUrl };
    });

    // Preload all images
    await Promise.all(updates.map(({ newImageUrl }) => {
        return new Promise((resolve, reject) => {
            if (!newImageUrl) {
                resolve();
                return;
            }
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = newImageUrl;
        });
    }));

    // Update all images with fade transition
    await Promise.all(updates.map(({ preview, newImageUrl }) => {
        if (newImageUrl) {
            return fadeTransition(preview, newImageUrl);
        }
    }));
}

// Initialize all previews
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing gallery');
    const previews = document.querySelectorAll('.category-preview');
    console.log(`Found ${previews.length} preview elements`);
    
    // Add fade transition style (slower transition)
    previews.forEach(preview => {
        preview.style.transition = 'opacity 1s ease-in-out';
    });

    // Set initial random images
    previews.forEach(preview => {
        const initialImage = getRandomImageUrl(preview.dataset.folder);
        if (initialImage) {
            preview.src = initialImage;
            console.log(`Set initial image for ${preview.dataset.folder}: ${initialImage}`);
        }
    });

    // Update all images every 7 seconds
    setInterval(() => {
        updateAllPreviews(previews);
    }, 7000);
});
