export class ImageCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.slides = [];
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    addImages(images) {
        this.slides = images;
        this.render();
        this.setupTouchEvents();
    }

    render() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="carousel-container">
                <div class="carousel-track"></div>
                <button class="carousel-button prev" aria-label="Previous slide">&lt;</button>
                <button class="carousel-button next" aria-label="Next slide">&gt;</button>
                <div class="carousel-dots"></div>
            </div>
        `;

        const track = this.container.querySelector('.carousel-track');
        const dotsContainer = this.container.querySelector('.carousel-dots');

        // Create slides
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'carousel-slide';
            
            // Create image wrapper for better aspect ratio handling
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'carousel-image-wrapper';
            
            // Create and add the image to the wrapper
            const img = document.createElement('img');
            img.src = slide.url;
            img.alt = slide.caption || '';
            img.loading = 'lazy';
            
            // Check image orientation when it loads
            img.onload = () => {
                imgWrapper.classList.add(img.width > img.height ? 'landscape' : 'portrait');
            };
            
            imgWrapper.appendChild(img);
            
            // Add wrapper and caption to slide
            slideElement.appendChild(imgWrapper);
            if (slide.caption) {
                const caption = document.createElement('div');
                caption.className = 'carousel-caption';
                caption.textContent = slide.caption;
                slideElement.appendChild(caption);
            }
            track.appendChild(slideElement);

            // Create dot
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Add event listeners
        this.container.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        this.container.querySelector('.next').addEventListener('click', () => this.nextSlide());

        // Show initial slide
        this.updateSlides();
        this.startAutoPlay();
    }

    setupTouchEvents() {
        this.container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            this.touchEndX = e.touches[0].clientX;
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            const diff = this.touchStartX - this.touchEndX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            this.startAutoPlay();
        });
    }

    updateSlides() {
        if (!this.container) return;

        const slides = this.container.querySelectorAll('.carousel-slide');
        const dots = this.container.querySelectorAll('.carousel-dot');

        slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
                dots[index].classList.add('active');
                // Preload next image
                if (index < slides.length - 1) {
                    const nextImg = slides[index + 1].querySelector('img');
                    if (nextImg) nextImg.loading = 'eager';
                }
            } else {
                slide.classList.remove('active');
                dots[index].classList.remove('active');
            }
        });
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlides();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlides();
        this.restartAutoPlay();
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}
