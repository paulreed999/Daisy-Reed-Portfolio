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

// Function to preload and update image with fade effect
function updateImage(preview, imageUrl) {
    const img = new Image();
    img.onload = () => {
        preview.style.opacity = '0';
        setTimeout(() => {
            preview.src = imageUrl;
            preview.style.opacity = '1';
        }, 500);
    };
    img.onerror = () => {
        console.warn(`Failed to load image: ${imageUrl}`);
    };
    img.src = imageUrl;
}

// Update a single preview with random timing
function updateSinglePreview(preview) {
    const folder = preview.dataset.folder;
    const images = galleryImages[folder];
    
    if (images && images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        const imageUrl = `images/${folder}/${images[randomIndex]}`;
        updateImage(preview, imageUrl);
    }

    // Set next update with random delay between 5-7 seconds
    const nextDelay = 5000 + Math.random() * 2000;
    setTimeout(() => updateSinglePreview(preview), nextDelay);
}

// Initialize updates for all previews with staggered starts
function initializeStaggeredUpdates() {
    const previews = document.querySelectorAll('.category-preview');
    previews.forEach((preview, index) => {
        // Stagger the initial updates by 1.5 seconds each
        setTimeout(() => {
            updateSinglePreview(preview);
        }, index * 1500);
    });
}

// Add fade transition to preview images
document.addEventListener('DOMContentLoaded', () => {
    const previews = document.querySelectorAll('.category-preview');
    previews.forEach(preview => {
        preview.style.transition = 'opacity 0.5s ease-in-out';
    });
    
    // Start the staggered updates
    setTimeout(initializeStaggeredUpdates, 1000);
});
