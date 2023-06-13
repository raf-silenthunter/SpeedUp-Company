export class MainSlider {
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

export class OptionsSlider{
    constructor(){
        this.bizSlider = document.querySelector(".biz-slider");
        this.optionsElements = document.querySelectorAll(".biz-slider__option");
        this.options = [...this.optionsElements];
        this.optionsClasses = ["option--basic-position", "option--medium-position", "option--premium-position"];
        this.defaultPosition = 0;
    }

    setBaseOptionsClasses() {
        this.options.forEach((option) => {
            option.classList = "option biz-slider__option";
        })
    }

    setOptionsPositions() {
    // Compute the position of each option based on the default position
    const basicPosition = (this.defaultPosition) % this.optionsClasses.length;
    const mediumPosition = (this.defaultPosition + 1) % this.optionsClasses.length;
    const premiumPosition = (this.defaultPosition + 2) % this.optionsClasses.length;
    // Add the new position class to each option
    this.options[0].classList.add(`${this.optionsClasses[basicPosition]}`);
    this.options[1].classList.add(`${this.optionsClasses[mediumPosition]}`);
    this.options[2].classList.add(`${this.optionsClasses[premiumPosition]}`);
    }

    changeOption(clickedBtn) {
        this.setBaseOptionsClasses();

        switch(clickedBtn){
            case "right": 
                this.defaultPosition--;
                if(this.defaultPosition < 0){
                    this.defaultPosition = this.optionsClasses.length - 1;
                }
                    break;
            case "left":     
                this.defaultPosition++;
                if(this.defaultPosition >= this.optionsClasses.length){
                    this.defaultPosition = 0;
                } 
                    break;
            default: throw alert("wrong value!")
        }
        this.setOptionsPositions(); 
    }

    init(e){
        if (e.target.classList.contains('biz-slider__btn')) {
        const clickedBtn = e.target.classList.contains('biz-slider__btn--right') ? 'right' : 'left';
        this.changeOption(clickedBtn);
        }
    }
}

export class BrandsSlider {
    constructor(){
        this.brandsSliderRoot = document.querySelector(".brands__slider");
        this.currShift = 0;
        this.brandsColumns = [...document.getElementsByClassName("brands__col")];
    }

    setShift() {
        this.brandsColumns.forEach((col)=> {
            col.style.transform = `translateX(${this.currShift}px)`;
        })
    }

    shiftSlider(clickedBtn) {
    // INTERFACE FOR SHIFTSLIDER STATEMENTS 
        const brandColumnWidth = document.querySelector(".brands__col").offsetWidth;
        const excludedShiftArea = brandColumnWidth * 2; //2 columns are always visible. Their area is excluded from shift
        let maxShiftArea = (brandColumnWidth * this.brandsColumns.length) - excludedShiftArea;

            switch(clickedBtn){
            case "right": {
                if(this.currShift === maxShiftArea * -1) this.currShift = 0;
                else this.currShift -= brandColumnWidth;
            break;
            }
            
            case "left":  {
                if(!this.currShift) this.currShift = maxShiftArea * -1;
                else this.currShift += brandColumnWidth;
            break;
            }   
            default: throw alert("wrong value!")
        }
        this.setShift();
    }

    init(e){
        if (e.target.classList.contains('brands__btn')) {
            const clickedBtn = e.target.classList.contains('brands__btn--right') ? 'right' : 'left';
            this.shiftSlider(clickedBtn);
        }
    }
}

export class Swiper {
    constructor() {
    this.initialX = null;
    this.initialY = null;

    document.addEventListener("touchstart", (event) => this.touchStart(event));
    document.addEventListener("touchmove", (event) => this.touchMove(event));
    //due to the fact that I created listeners inside this class, they are encapsulated,
    //and it makes this class more reusable. This doesn't need to detect external code.
    //events are global objects that can be used from anywhere in the code.
        this.events = {
            swipeUp: new Event("swipeUp"),
            swipeDown: new Event("swipeDown"),
            swipeLeft: new Event("swipeLeft"),
            swipeRight: new Event("swipeRight"),
        }   
    }

    touchStart(event) {
        event.preventDefault();
        this.initialX = event.targetTouches[0].clientX;
        this.initialY = event.targetTouches[0].clientY;
    }

    touchMove(event) {
        if(!this.initialX || !this.initialX) return;

        const {
            clientX: finalX,
            clientY: finalY
        } = event.targetTouches[0];

        const diffX = this.initialX - finalX;
        const diffY = this.initialY - finalY;

        if(Math.abs(diffX) > Math.abs(diffY)){
            //oś X prawo-lewo
            if(diffX < 0) {
                document.dispatchEvent(this.events.swipeRight);
            } else {
                document.dispatchEvent(this.events.swipeLeft);
            }
        } else {
                console.log(diffY);
            if(diffY < 0) {
                console.log(this);
                document.dispatchEvent(this.events.swipeDown);
            } else {
                document.dispatchEvent(this.events.swipeUp);
            }
        }

        this.initialX = null;
        this.initialY = null;
    }
}