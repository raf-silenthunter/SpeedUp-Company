class Slider {
    constructor(time) {

        this.slidesArray = [...document.querySelectorAll(".slide")];
        this.slideTitle = document.querySelector("header h2");
        this.titlePosition = document.querySelector(".main-header__speedup-txt");
        this.slidesStyles = [{
            h2: "Luksusowe samochody w Twoim zasięgu",
            top: 40,
            left: 0,
            mobileImg: '../images/slide-1-mobile.jpg',
            desktopImg: '../images/slide-1.jpg'
        }, {
            h2: 'Poczuj się jak James Bond',
            top: 25,
            left: 0,
            mobileImg: '../images/slide-2-mobile.jpg',
            desktopImg: '../images/slide-2.jpg'
        }, {
            h2: "Szalej beztrosko po bezdrożach",
            top: 45,
            left: 0,
            mobileImg: "../images/slide-3-mobile.jpg",
            desktopImg: "../images/slide-3.jpg"
        }, {
            h2: "Poczuj wyjątkową moc",
            top: 30,
            left: 0,
            mobileImg: "../images/slide-4-mobile.jpg",
            desktopImg: "../images/slide-4.jpg"
        }]

        const btnElements = document.querySelectorAll(".btns-wrap__btn");
        this.sliderBtns = [...btnElements];
        this.sliderBtns.forEach((btn, i) => btn.dataset.key = `${i}`);
        this.sliderBtns.forEach(btn => btn.addEventListener("click", this.changeSlideByBtn))

        this.currentSlide = 0;
        this.slideChangeTime = this.getSlideChangeTime(time);

        this.autoSlide = setInterval(this.changeSlide, this.slideChangeTime);
    }

    getSlideChangeTime = (time) => time;

    changeSlideByBtn = (e) => {
        const clickedBtn = e.target.dataset.key;
        this.currentSlide = clickedBtn;

        clearInterval(this.autoSlide);
        this.currentSlide--;
        this.changeSlide();
        this.autoSlide = setInterval(this.changeSlide, this.slideChangeTime);
    }

    changeSlide = () => {
        this.currentSlide++;
        this.currentSlide >= this.slidesStyles.length ? this.currentSlide = 0 : this.currentSlide;
        
        this.slidesArray.forEach(slide => slide.classList.remove("slide--is-active"))
        this.slidesArray[this.currentSlide].classList.add("slide--is-active");
        
        this.setSlideInterior();
        this.changeBtn();
    }

    changeBtn = () => {
        this.sliderBtns.forEach(btn => btn.classList.remove("is-btn-filled"));
        this.sliderBtns[this.currentSlide].classList.add("is-btn-filled");
    }

    setSlideInterior = () => {
        this.setSlideImg();
        this.titlePosition.style.top = `${this.slidesStyles[this.currentSlide].top}%`;
        this.titlePosition.style.left = `${this.slidesStyles[this.currentSlide].left}%`;
        this.slideTitle.textContent = this.slidesStyles[this.currentSlide].h2;
    }

    setSlideImg = () => {
            const screenWidth = window.innerWidth;
            const tabletWidth = 700;
            const isDesktop =  screenWidth >= tabletWidth ? true : false;
            if(isDesktop) {
                this.slidesStyles[this.currentSlide].mobileImg = this.slidesStyles[this.currentSlide].desktopImg;
            }
            this.slidesArray[this.currentSlide].style.backgroundImage = `url(${this.slidesStyles[this.currentSlide].mobileImg}`;
        }
    
    setDefaultImage = () => this.setSlideImg();
    }

const mainSlider = new Slider(10000);
document.addEventListener("DOMContentLoaded", mainSlider.setDefaultImage);