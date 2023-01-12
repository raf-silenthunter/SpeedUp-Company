// DROPDOWN MENU FN 
const dropDownBtn = document.querySelector(".main-nav__hamburger-btn");
const dropDownMenu = document.querySelector(".list");
const mainNav = document.querySelector(".main-nav");

dropDownBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle("list--is-visible");
    mainNav.classList.toggle("main-nav--is-dropdown");
})


// STICKY MENU FN
const nav = document.querySelector(".main-nav");
const scrollVAlue = 200;  

window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    nav.classList.toggle("is-sticky", scrollPosition >= scrollVAlue);
})

// OPEN/CLOSE LOGIN MODAL FNs 

const modalBtnsElements = document.querySelectorAll(".main-nav__sign-btn, .btn-close");
const modalBtns = [...modalBtnsElements];
const loginModal = document.querySelector(".login-modal");

const checkModalBtn = (e) => {
    if (e.target.matches('.main-nav__sign-icon, .main-nav__sign-btn, .main-nav__sign-btn--lash, .main-nav__call-to-action')) return "open";
    else if (e.target.matches(".btn-close__icon, .login-modal__btn-close, .btn-close, .btn-close__icon--is-rotated")) return "close";
    else console.error("wrong element clicked or does not contain proper class!");
}

const changeModalState = (e) => {
    let clickedBtn = checkModalBtn(e);
    loginModal.classList.toggle("visible", clickedBtn === "open");
}

modalBtns.forEach((btn)=> {
    btn.addEventListener("click", changeModalState);
});

// COUNTER FN 

const carNumber = document.querySelector(".cars-num");
const clientNumber = document.querySelector(".clients-num");
const lendNumber = document.querySelector(".lends-num");

let carStart = 0, clientStart = 0, lendStart = 0;

const counterStartValue = 300;

const changeNumbers = () => {
    carNumber.textContent = `${carStart >= 120 ? carStart : carStart++}`
    clientNumber.textContent = `${clientStart >= 300 ? clientStart : clientStart++}`
    lendNumber.textContent = `${lendStart >= 1500 ? lendStart : lendStart++}`
}

const startCounter = document.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    if (scrollPosition >= counterStartValue) {
        const interval = setInterval(changeNumbers, 10);
        // value with the biggest number needs to stop interval 
        if (lendStart === 1500) clearInterval(interval);
    }
});

document.addEventListener("scroll", startCounter);

// MAIN SLIDER FN
// WYMAGANA ZMIANA NAZW NA BARDZIEJ PRECISE 
const firstImg = document.querySelector(".slide--is-default");
const slides = [...document.querySelectorAll(".slide")];
const slideH2 = document.querySelector("header h2");
const h2Position = document.querySelector(".main-header__speedup-txt");

const slideChangeTime = 8000;

const slidesStyles = [{
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

let i = 0;

//Here you can change slide only with buttons
const btnElements = document.querySelectorAll(".btns-wrap__btn");
// I want to send DOM request only once for this btns elements 
const sliderBtns = [...btnElements];

sliderBtns.forEach((btn, i) => btn.dataset.key = `${i}`);

const changeSlideByBtn = (e) => {
    const activeBtn = e.target.dataset.key;
    i = activeBtn - 1;
    clearInterval(autoSlide);
    changeSlide();
    autoSlide = setInterval(changeSlide, slideChangeTime);
}
sliderBtns.forEach(btn => btn.addEventListener("click", changeSlideByBtn))

const changeBtn = () => {
    sliderBtns.forEach(btn => btn.classList.remove("is-btn-filled"));
    sliderBtns[i].classList.add("is-btn-filled");
}

const setSlideImg = () => {
    const screenWidth = window.innerWidth;
    const tabletWidth = 700;

    if(screenWidth >= tabletWidth) {
        slidesStyles[i].mobileImg = slidesStyles[i].desktopImg;
    }
    slides[i].style.backgroundImage = `url(${slidesStyles[i].mobileImg}`;
}

const setSlideInterior = () =>{
    setSlideImg();
    h2Position.style.top = `${slidesStyles[i].top}%`;
    h2Position.style.left = `${slidesStyles[i].left}%`;
    slideH2.textContent = slidesStyles[i].h2;
}

const changeSlide = () => {
    i++;
    firstImg.classList.add("slide--hide-default");
    if (i >= slidesStyles.length) i = 0;
    slides.forEach(slide => slide.classList.remove("slide--is-active"))
    slides[i].classList.add("slide--is-active");
    setSlideInterior();
    changeBtn();
}

let autoSlide = setInterval(changeSlide, slideChangeTime);

// ABONAMENTS OPTIONS SLIDER FN

const bizSlider = document.querySelector(".biz-slider");
const optionsElements = document.querySelectorAll(".biz-slider__option");
const options = [...optionsElements];
const optionsClasses = ["option--basic-position", "option--medium-position", "option--premium-position"];
let defaultPosition = 0;

const setBaseOptionsClasses = () => {
    options.forEach((option) => {
        option.classList = "option biz-slider__option";
    })
}

const setOptionsPositions = () => {
    // Compute the position of each option based on the default position
    const basicPosition = (defaultPosition) % optionsClasses.length;
    const mediumPosition = (defaultPosition + 1) % optionsClasses.length;
    const premiumPosition = (defaultPosition + 2) % optionsClasses.length;
  // Add the new position class to each option
    options[0].classList.add(`${optionsClasses[basicPosition]}`);
    options[1].classList.add(`${optionsClasses[mediumPosition]}`);
    options[2].classList.add(`${optionsClasses[premiumPosition]}`);
    }

const changeOption = (clickedBtn) => {
    setBaseOptionsClasses();

    switch(clickedBtn){
        case "right": 
            defaultPosition--;
            if(defaultPosition < 0){
                defaultPosition = optionsClasses.length - 1;
            }
                break;
        case "left":     
            defaultPosition++;
            if(defaultPosition >= optionsClasses.length){
                defaultPosition = 0;
            } 
                break;
        default: throw alert("wrong value!")
    }

    setOptionsPositions(); 
}

bizSlider.addEventListener("click", (e) => {

    if (e.target.classList.contains('biz-slider__btn')) {
    const clickedBtn = e.target.classList.contains('biz-slider__btn--right') ? 'right' : 'left';
    changeOption(clickedBtn);
    }

});

// BRANDS SLIDER FN 
// INTERFACE FOR SHIFTSLIDER FUNCTION 
const brandsSlider = document.querySelector(".brands__slider");
let currShift = 0;
const brandsColumns = [...document.getElementsByClassName("brands__col")];

const setShift = () => {
    brandsColumns.forEach((col)=> {
        col.style.transform = `translateX(${currShift}px)`;
    })
}

const shiftSlider = (clickedBtn) => {
// INTERFACE FOR SHIFTSLIDER STATEMENTS 
    const brandColumnWidth = document.querySelector(".brands__col").offsetWidth;
    const excludedShiftArea = brandColumnWidth * 2; //2 columns are always visible. Their area is excluded from shift
    let maxShiftArea = (brandColumnWidth * brandsColumns.length) - excludedShiftArea;

        switch(clickedBtn){
        case "right": {
            if(currShift === maxShiftArea * -1) currShift = 0;
            else currShift -= brandColumnWidth;
        break;
        }
        
        case "left":  {
            if(!currShift) currShift = maxShiftArea * -1;
            else currShift += brandColumnWidth;
        break;
        }   
        default: throw alert("wrong value!")
    }
    setShift();
}

brandsSlider.addEventListener("click", (e) => {

    if (e.target.classList.contains('brands__btn')) {
    const clickedBtn = e.target.classList.contains('brands__btn--right') ? 'right' : 'left';
    shiftSlider(clickedBtn);
    }

});