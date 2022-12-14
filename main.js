// DROPDOWN MENU FN 
const dropDownBtn = document.querySelector(".main-nav__hamburger-lines");
const dropDownMenu = document.querySelector(".list");
const mainNav = document.querySelector(".main-nav");

dropDownBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle("list--is-visible");
    mainNav.classList.toggle("main-nav--is-dropdown")
})


// STICKY MENU FN
const nav = document.querySelector(".main-nav");
window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    const scrollVAlue = 300;

    if (scrollPosition >= scrollVAlue) {
        nav.classList.add("is-sticky");
    }
    else {
        nav.classList.remove("is-sticky");
    }
})

// COUNTER FN 

const carNumber = document.querySelector(".cars-num");
const clientNumber = document.querySelector(".clients-num");
const lendNumber = document.querySelector(".lends-num");

let cartStart = 0;
let clientStart = 0;
let lendStart = 0;

const startCounter = document.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    const counter = () => {
        carNumber.textContent = `${cartStart >= 120 ? cartStart : cartStart++}`
        clientNumber.textContent = `${clientStart >= 300 ? clientStart : clientStart++}`
        lendNumber.textContent = `${lendStart >= 1500 ? lendStart : lendStart++}`
    }
    if (scrollPosition >= 300) {
        setInterval(counter, 10);
        // if (cartStart === 80) {clearInterval(interval)};
        // DO PONOWNEGO PRZEJRZENIA - SPORO BŁĘDÓW 
    }
});

// MAIN SLIDER FN
// WYMAGANA ZMIANA NAZW NA BARDZIEJ PRECISE 
const firtsImg = document.querySelector(".slide--is-default");
const slider = [...document.querySelectorAll(".slide")];
const slideH2 = document.querySelector("header h2");
const h2Position = document.querySelector(".main-header__speedup-txt");
const sliderBtns = [...document.querySelectorAll(".btns-wrap__btn")];

const time = 8000;

let screenWidth = window.innerWidth;
const tabletWidth = 700;

const slide = [{
    h2: "Luksusowe samochody w Twoim zasięgu",
    top: 40,
    left: 0,
    mobileImg: 'images/slide-1-mobile.jpg',
    desktopImg: 'images/slide-1.jpg'
}, {
    h2: 'Poczuj się jak James Bond',
    top: 25,
    left: 0,
    mobileImg: 'images/slide-2-mobile.jpg',
    desktopImg: 'images/slide-2.jpg'
}, {
    h2: "Szalej beztrosko po bezdrożach",
    top: 45,
    left: 0,
    mobileImg: "images/slide-3-mobile.jpg",
    desktopImg: "images/slide-3.jpg"
}, {
    h2: "Poczuj wyjątkową moc",
    top: 30,
    left: 0,
    mobileImg: "images/slide-4-mobile.jpg",
    desktopImg: "images/slide-4.jpg"
}]

let i = 0;

sliderBtns.forEach((btn, i) => btn.dataset.key = `${i}`);

const changeSlideByBtn = (e) => {
    let activeBtn = e.target.dataset.key;
    i = activeBtn - 1;
    clearInterval(autoSlide);
    changeSlide();
    autoSlide = setInterval(changeSlide, time);
}

sliderBtns.forEach(btn => btn.addEventListener("click", changeSlideByBtn))

const changeBtn = () => {
    sliderBtns.forEach(btn => btn.classList.remove("is-btn-filled"));
    sliderBtns[i].classList.add("is-btn-filled");
}

const changeSlide = () => {
    i++;
    firtsImg.classList.add("slide--hide-default");
    if (i >= slide.length) {
        i = 0;
    }
    slider.forEach(slide => slide.classList.remove("slide--is-active"))
    slider[i].classList.add("slide--is-active");
    if(screenWidth >= tabletWidth) {
        slide[i].mobileImg = slide[i].desktopImg;
    }
    slider[i].style.backgroundImage = `url(${slide[i].mobileImg}`;
    h2Position.style.top = `${slide[i].top}%`;
    h2Position.style.left = `${slide[i].left}%`;
    slideH2.textContent = slide[i].h2;
    changeBtn();
}

let autoSlide = setInterval(changeSlide, time);

// ABONAMENTS OPTIONS SLIDER FN

const basic = document.querySelector(".option--basic-position");
const medium = document.querySelector(".option--medium-position");
const premium = document.querySelector(".option--premium-position");
const options = [basic, medium, premium];

const optionsClasses = ["option--basic-position", "option--medium-position", "option--premium-position"];
const optionBtns = [...document.querySelectorAll(".biz-slider__btn")];

let defaultPosition = 0;

const checkClickedBtn = (e) => {
    if (e.target.classList.contains("biz-slider__btn--right")){
        return "right";
    } else if (e.target.classList.contains("biz-slider__btn--left")) {
        return "left"; 
    }
    else {
        throw alert("btn does not contain proper class!")
    }
}

const setBaseOptionsClasses = () => {
    options.forEach((option) => {
        option.classList = "option biz-slider__option";
    })
}

const setOptionsPositions = () => {
    // HOW CAN I MAKE THIS MORE UNIVERSAL???
        let basicPosition = defaultPosition;
        let mediumPosition = defaultPosition + 1;
        let premiumPosition = defaultPosition + 2;

        basicPosition >= optionsClasses.length ? basicPosition = defaultPosition - 1 : basicPosition;
        mediumPosition >= optionsClasses.length ? mediumPosition = defaultPosition - 2 : mediumPosition;
        premiumPosition >= optionsClasses.length ? premiumPosition = defaultPosition - 1 : premiumPosition;

        basic.classList.add(`${optionsClasses[basicPosition]}`);
        medium.classList.add(`${optionsClasses[mediumPosition]}`);
        premium.classList.add(`${optionsClasses[premiumPosition]}`);   
    }

const changeOption = (e) => {
    setBaseOptionsClasses();

    let clickedBtn = checkClickedBtn(e);
    switch(clickedBtn){
        case "right": 
            defaultPosition++;
            if(defaultPosition >= optionsClasses.length){
                defaultPosition = 0;
            } 
                break;
        case "left":     
            defaultPosition--;
            if(defaultPosition < 0){
                defaultPosition = optionsClasses.length - 1;
            }
                break;
        default: throw alert("wrong value!")
    }

    setOptionsPositions(); 
}

optionBtns.forEach((btn)=> {
    btn.addEventListener("click", changeOption);
});

// BRANDS SLIDER FN 

const brandsBtns = document.querySelectorAll(".brands__btn");

let currShift = 0;
const brandsColumns = [...document.getElementsByClassName("brands__col")];


const checkBtn = (e) => {
    if (e.target.classList.contains("brands__btn--right")) return "right";
    else if (e.target.classList.contains("brands__btn--left")) return "left";
    else throw alert("wrong element clicked or does not contain proper class!");
}

const setShift = () => {
    brandsColumns.forEach((col)=> {
        col.style.transform = `translateX(${currShift}px)`;
    })
}

const shiftSlider = (e) => {

    const brandColumnWidth = document.querySelector(".brands__col").offsetWidth;
    const excludedShiftArea = brandColumnWidth * 2; //2 columns are always visible. Their area is excluded from shift
    let maxShiftArea = (brandColumnWidth * brandsColumns.length) - excludedShiftArea;

    let clickedBtn = checkBtn(e);

        switch(clickedBtn){
        case "right": {

                if((currShift === maxShiftArea * -1)){
                    currShift = 0;
                    return setShift();
                }
            currShift -= brandColumnWidth;
            setShift();
            console.log(currShift);
            break;
        }
        
        case "left":  {

            if(currShift === 0){
                    currShift = maxShiftArea * -1;
                    return setShift();
                }
            currShift += brandColumnWidth;
            setShift();
            break;
        }   
        default: throw alert("wrong value!")
    }
}

brandsBtns.forEach((btn)=> {
    btn.addEventListener("click", shiftSlider);
});
