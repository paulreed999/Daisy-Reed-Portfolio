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
    await new Promise(resolve => setTimeout(resolve, 500));
    element.src = newSrc;
    element.style.opacity = '1';
    console.log(`Completed fade transition for ${element.dataset.folder}`);
}

// Update a single preview
async function updatePreview(preview) {
    const folder = preview.dataset.folder;
    console.log(`Updating preview for ${folder}`);
    
    const newImageUrl = getRandomImageUrl(folder, preview.src);
    if (!newImageUrl) {
        console.warn(`No image URL generated for ${folder}`);
        return;
    }

    try {
        console.log(`Preloading image for ${folder}`);
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = newImageUrl;
        });
        await fadeTransition(preview, newImageUrl);
    } catch (error) {
        console.warn(`Failed to load image for ${folder}:`, error);
    }
}

// Initialize preview updates
function initializePreview(preview, index) {
    const folder = preview.dataset.folder;
    console.log(`Initializing preview for ${folder} at index ${index}`);
    
    // Set initial random image
    const initialImage = getRandomImageUrl(folder);
    if (initialImage) {
        preview.src = initialImage;
        console.log(`Set initial image for ${folder}: ${initialImage}`);
    }

    // Start updates with staggered delays
    const baseInterval = 7000; // Base interval of 7 seconds
    const randomOffset = Math.random() * 2000; // Random offset up to 2 seconds (7-9 seconds total)
    const startDelay = index * 1500; // Stagger initial updates

    // Set up the interval for this preview
    setTimeout(() => {
        // Initial update after the stagger delay
        updatePreview(preview);
        
        // Then set up regular interval with random offset
        setInterval(async () => {
            await updatePreview(preview);
        }, baseInterval + randomOffset);
    }, startDelay);
}

// Initialize all previews
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing gallery');
    const previews = document.querySelectorAll('.category-preview');
    console.log(`Found ${previews.length} preview elements`);
    
    // Add fade transition style
    previews.forEach(preview => {
        preview.style.transition = 'opacity 0.5s ease-in-out';
    });

    // Initialize each preview with staggered updates
    previews.forEach((preview, index) => {
        initializePreview(preview, index);
    });
});
