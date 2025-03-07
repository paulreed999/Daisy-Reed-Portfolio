class ImageCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.slides = [];
        this.currentIndex = 0;
        this.autoPlayInterval = null;
    }

    addImages(images) {
        this.slides = images;
        this.render();
    }

    render() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="carousel-container">
                <div class="carousel-track"></div>
                <button class="carousel-button prev">&lt;</button>
                <button class="carousel-button next">&gt;</button>
                <div class="carousel-dots"></div>
            </div>
        `;

        const track = this.container.querySelector('.carousel-track');
        const dotsContainer = this.container.querySelector('.carousel-dots');

        // Create slides
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'carousel-slide';
            slideElement.innerHTML = `
                <img src="${slide.url}" alt="${slide.caption || ''}" />
                ${slide.caption ? `<div class="carousel-caption">${slide.caption}</div>` : ''}
            `;
            track.appendChild(slideElement);

            // Create dot
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
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

    updateSlides() {
        if (!this.container) return;

        const slides = this.container.querySelectorAll('.carousel-slide');
        const dots = this.container.querySelectorAll('.carousel-dot');

        slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
                dots[index].classList.add('active');
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
