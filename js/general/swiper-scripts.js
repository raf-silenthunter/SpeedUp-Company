export class MainSlider {
    constructor(time) {
        this.elements = {
            slideTitle: document.querySelector("header h2"),
            slidesArray: [...document.querySelectorAll(".slide")],
            titlePosition: document.querySelector(".main-header__dynamic-info"),
            //buttons are called DynamicButtons because their href and text changes with slides
            slideDynamicBtn: document.querySelector(".main-header__dynamic-info button"),
            slideDynamicLink: document.querySelector(".main-header__dynamic-info a"),    
            
            sliderBtnControlsArr: [...document.querySelectorAll(".btns-wrap__btn")],
            sliderBtnControlsArrParent: document.querySelector(".btns-wrap"),

            slideChangeTime: time,
            body: document.querySelector("body"),
        }

        this.slidesStyles = [{
            h2: "Luxury cars within your reach",
            top: 40,
            mobileImg: '../images/slide-1-mobile.webp',
            desktopImg: '../images/slide-1.webp',
            buttonTxt: "Check luxurious cars",
            buttonLink: './fleet/luxury.html',
        }, {
            h2: 'Feel like James Bond',
            top: 25,
            mobileImg: '../images/slide-2-mobile.webp',
            desktopImg: '../images/slide-2.webp',
            buttonTxt: "Check oldtimer cars",
            buttonLink: './fleet/oldtimers.html',
        }, {
            h2: "Feel the unique power",
            top: 45,
            mobileImg: "../images/slide-3-mobile.webp",
            desktopImg: "../images/slide-3.webp",
            buttonTxt: "Check sport cars",
            buttonLink: './fleet/sport.html',
        }, {
            h2: "Go wild without a care in the wilderness",
            top: 30,
            mobileImg: "../images/slide-4-mobile.jpg",
            desktopImg: "../images/slide-4.webp",
            buttonTxt: "Check terrain cars",
            buttonLink: './fleet/terrain.html',
        }]

        this.currentSlideIndex = 0;
        this.isTrottled = false;

        this.elements.sliderBtnControlsArr.forEach((btn, i) => btn.dataset.key = `${i}`);
        this.elements.sliderBtnControlsArrParent.addEventListener("click", (e) => this.changeSlideByBtn(e));

        this.changeSlideAuto = setInterval(() => {
            this.changeSlide()
        }, this.elements.slideChangeTime);

        this.initResizeObserver();
    }

    initResizeObserver(){
        const resizeObserver = new ResizeObserver((entries) => {
            if(this.isTrottled) return;
            this.isTrottled = true;

            setTimeout(()=> {
                for(let entry of entries){
                    this.setSlideImg();
                    }
                this.isTrottled = false;
            }, 2500)
        });
        resizeObserver.observe(document.body);
    }

    resetInterval(){
        clearInterval(this.changeSlideAuto);
        this.changeSlideAuto = setInterval(this.changeSlide, this.elements.slideChangeTime);
    }

    changeSlideByBtn = (e) => {
        if(!e.target.classList.contains("btns-wrap__btn")) return;
        const clickedBtnKey = e.target.dataset.key;
        this.currentSlideIndex = clickedBtnKey;

        this.currentSlideIndex--;
        this.changeSlide();
        this.resetInterval();
    }

    changeSlide = () => {
        this.currentSlideIndex++;
        this.currentSlideIndex >= this.slidesStyles.length ? this.currentSlideIndex = 0 : this.currentSlideIndex;
        
        this.elements.slidesArray.forEach(slide => slide.classList.remove("slide--is-active"))
        this.elements.slidesArray[this.currentSlideIndex].classList.add("slide--is-active");
        
        this.setSlideInterior();
        this.changeBtn();
    }

    changeBtn = () => {
        this.elements.sliderBtnControlsArr.forEach(btn => btn.classList.remove("is-btn-filled"));
        this.elements.sliderBtnControlsArr[this.currentSlideIndex].classList.add("is-btn-filled");
    }

    setSlideInterior = () => {
        this.setSlideImg();
        this.elements.titlePosition.style.top = `${this.slidesStyles[this.currentSlideIndex].top}%`;
        this.elements.slideTitle.textContent = this.slidesStyles[this.currentSlideIndex].h2;
        this.elements.slideDynamicBtn.textContent = this.slidesStyles[this.currentSlideIndex].buttonTxt;
        this.elements.slideDynamicLink.href = this.slidesStyles[this.currentSlideIndex].buttonLink;
    }

    setSlideImg = () => {
            this.isViewportDesktop = window.matchMedia('(orientation: landscape)').matches;
            const currSlideBackgroundImg = this.elements.slidesArray[this.currentSlideIndex];
            if(this.isViewportDesktop) {
                currSlideBackgroundImg.style.backgroundImage = `url(${this.slidesStyles[this.currentSlideIndex].desktopImg}`;
            } else {
                currSlideBackgroundImg.style.backgroundImage = `url(${this.slidesStyles[this.currentSlideIndex].mobileImg}`;
            }
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
        this.options.forEach((option, index) => {
            const positionIndex = (this.defaultPosition + index) % this.optionsClasses.length;
            option.classList.add(`${this.optionsClasses[positionIndex]}`);
        });
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

    checkClickedBtn(e){
        if (e.target.classList.contains('biz-slider__btn')) {
        const clickedBtn = e.target.dataset.btn === 'biz-right' ? 'right' : 'left';
        console.log(clickedBtn);
        this.changeOption(clickedBtn);
        }
    }

    init(){
        this.bizSlider.addEventListener("click", (e) => this.checkClickedBtn(e));
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

    moveSlider(direction) {
        const brandColumnWidth = document.querySelector(".brands__col").offsetWidth; //value updated after every event intentionally. In case of screen change slider will always know correct column width
        const excludedShiftArea = brandColumnWidth * 2; //2 columns are always visible. Their area is excluded from shift
        let maxShiftArea = (brandColumnWidth * this.brandsColumns.length) - excludedShiftArea;

            switch(direction){
            case "right": {
                this.currShift = this.currShift === maxShiftArea * -1 ? 0 : this.currShift -= brandColumnWidth;
            break;
            }           
            case "left":  {
                this.currShift = this.currShift === 0 ? maxShiftArea * -1 : this.currShift += brandColumnWidth;
            break;
            }   
            default: throw alert("wrong value!")
        }
        this.setShift();
    }

    checkClickedBtn(e){
        if (e.target.classList.contains('brands__btn')) {
            const direction = e.target.dataset.btn === 'brands-right' ? 'right' : 'left'
            this.moveSlider(direction);
        }
    }

    init(){
        this.brandsSliderRoot.addEventListener("click", (e) => this.checkClickedBtn(e));
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
            if(diffY < 0) {
                document.dispatchEvent(this.events.swipeDown);
            } else {
                document.dispatchEvent(this.events.swipeUp);
            }
        }

        this.initialX = null;
        this.initialY = null;
    }
}

export class Scroller {
    constructor() {
        this.swiper = document.querySelector(".swiper");
        this.sections = [...document.querySelectorAll(".swiper-section")];
        this.sectioninView = (() => {
            let index = this.sections.findIndex(this.checkSectionInView.bind(this));
            if (index < 0) {
                this.sections[0].scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                index = 0;
            }
            return index;
        })();

        this.currSectionIndex = this.sectioninView;
        this.isThrottled = false; 

        this.drawNavigation();
        
        this.navDots = [...document.querySelectorAll(".aside-nav__item")];
        this.changeDot();
        this.toggleNav();
    }

    listenScroll(event) {
        if(this.isThrottled) return;
        this.isThrottled = true;
        setTimeout(() => {
            this.isThrottled = false;
        }, 1500)
        
        const direction = event.deltaY > 0 ? 1 : -1;
        this.scroll(direction);
    }

    toggleNav() {
        const nav = document.querySelector(".main-nav");
        nav.classList.toggle("is-sticky", this.currSectionIndex > 0)
    }
    
    scroll(direction) {
        if(direction === 1) {
            const isLastSection = this.currSectionIndex === this.sections.length -1 ? true : false;
            if(isLastSection) return;
        } else {
            const isFirstSection = this.currSectionIndex === 0 ? true : false;
            if(isFirstSection) return;
        }
        this.currSectionIndex += direction;
        this.scrollToCurrSection();
    }

    scrollToCurrSection() {
            this.sections[this.currSectionIndex].scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
        this.changeDot();
        this.toggleNav();
    }

    changeDot() {
        this.navDots.forEach(dot => dot.style.backgroundColor = "#000205");
        this.navDots[this.currSectionIndex].style.backgroundColor = "#acacac";
    }

    checkSectionInView(section) {
            const {top, bottom} = section.getBoundingClientRect();
            const isVisible = (top >= 0) && (Math.floor(bottom) <= window.innerHeight);
            return isVisible;
    }

    drawNavigation() {
        const aside = document.createElement("aside");
        aside.setAttribute("class", "aside-nav");
        const asideList = document.createElement("ul");
        asideList.className = "aside-nav__list";

        this.sections.forEach((section, index) => {
            const listItem = document.createElement("li");
            listItem.className = "aside-nav__item";
            asideList.append(listItem);
            // przerobić listenery na parent element - zrób poza forEachem i pobierz tam itemy
            listItem.addEventListener("click", () => {
                this.currSectionIndex = index;
                this.scrollToCurrSection();
            });
        })
        
        this.swiper.append(aside);
        aside.append(asideList);
    }
}