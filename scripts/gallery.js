// Available images in each category
const galleryImages = {
    'gcse-artbook': ['Sample-Image-file-Download.jpg'],
    'drawings': ['Sample-Image-file-Download (3).jpg'],
    'oil-and-acrylic': ['Sample-Image-file-Download (2).jpg'],
    'other': ['Sample-Image-file-Download (1).jpg']
};

// Function to preload and update image
function updateImage(preview, imageUrl) {
    const img = new Image();
    img.onload = () => {
        preview.src = imageUrl;
    };
    img.onerror = () => {
        console.warn(`Failed to load image: ${imageUrl}`);
    };
    img.src = imageUrl;
}

// Update preview images
function updatePreviews() {
    const previews = document.querySelectorAll('.category-preview');
    previews.forEach(preview => {
        const folder = preview.dataset.folder;
        const images = galleryImages[folder];
        
        if (images && images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            const imageUrl = `images/${folder}/${images[randomIndex]}`;
            updateImage(preview, imageUrl);
        }
    });
}

// Update images periodically (every 10 seconds)
setInterval(updatePreviews, 10000);

// Initial update when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updatePreviews, 1000);
});
