import Modal from './Modal.js';

const modal = new Modal('#transport-modal');

class OverlayMenu {
    constructor(headerSelector, options = {}) {
        this.headerElement = document.querySelector(headerSelector);
        if (!this.headerElement) {
            console.error(`Элемент ${headerSelector} не найден!`);
            return;
        }

        this.overlayElement = this.headerElement.querySelector(options.overlaySelector ?? '.js-overlay');
        this.burgerButtonElement = this.headerElement.querySelector(options.burgetButtonSelector ?? '.js-burger-button');
        this.links = this.headerElement.querySelectorAll('a[href]');

        this.animationDuration = options.animationDuration ?? 200;

        this.bindEvents();
    }

    onBurgerButtonClick = () => {
        this.toggleOverlay();
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick);
        this.links.forEach(link => link.addEventListener('click', () => this.closeOverlay()));
    }

    toggleOverlay() {
        this.burgerButtonElement.classList.toggle('is-active');
        document.documentElement.classList.toggle('is-lock');

        if (this.overlayElement.open) {
            this.overlayElement.classList.toggle('is-active');
            setTimeout(() => {
                this.overlayElement.open = !this.overlayElement.open;
            }, this.animationDuration);
        } else {
            this.overlayElement.open = !this.overlayElement.open;
            setTimeout(() => {
                this.overlayElement.classList.toggle('is-active');
            }, 0);
        }
    }

    closeOverlay() {
        this.burgerButtonElement.classList.remove('is-active');
        document.documentElement.classList.remove('is-lock');

        this.overlayElement.classList.remove('is-active');
        setTimeout(() => {
            this.overlayElement.open = false;
        }, this.animationDuration);
    }

    openOverlay() {
        this.burgerButtonElement.classList.add('is-active');
        document.documentElement.classList.add('is-lock');

        this.overlayElement.open = true;
        setTimeout(() => {
            this.overlayElement.classList.add('is-active');
        }, 0);
    }
}

const overlayMenu = new OverlayMenu('.header');

const headerElement = document.querySelector('header');
const toggleHeader = () => {
    if (window.scrollY > 10) {
        headerElement.classList.add('has-scroll');
    } else {
        headerElement.classList.remove('has-scroll');
    }
}

toggleHeader();
document.addEventListener('scroll', () => {
    toggleHeader();
});

const swiper = new Swiper('#sertificates-slider', {
    slidesPerView: 1,
    centeredSlides: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const animationElements = document.querySelectorAll('.animation');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animation-start');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
});

animationElements.forEach(element => observer.observe(element))
