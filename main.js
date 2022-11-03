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

// CHANGE SLIDE FN

const basicPosition = document.querySelector(".option--basic-position");
const mediumPosition = document.querySelector(".option--medium-position");
const premiumPosition = document.querySelector(".option--premium-position");

const optionsPositions = [basicPosition, mediumPosition, premiumPosition];

const optionsClasses = ["option--basic-position", "option--medium-position", "option--premium-position"];

const optionBtns = [...document.querySelectorAll(".biz-slider__btn")];

const checkClickedBtn = (e) => {
    if (e.target.classList.contains("biz-slider__btn--right")){
        return true;
    } else if (e.target.classList.contains("biz-slider__btn--left")) {
        return false; 
    }
    else {
        throw alert("błąd!")
    }
}

let clickNum = 0;

let basicNum;
let mediumNum;
let premiumNum;

const changeOption = (e) => {
    optionsPositions.forEach((option) => {
        option.classList = "option biz-slider__option";
    })
    
    let nextBtnClicked = checkClickedBtn(e);

    if(nextBtnClicked){
        clickNum++;
        if(clickNum >= optionsClasses.length){
            clickNum = 0;
        }
    } else {    
        clickNum--;
        if(clickNum < 0){
            clickNum = optionsClasses.length - 1;
        }
    }

    basicNum = clickNum;
    mediumNum = clickNum + 1;
    premiumNum = clickNum + 2;

    basicNum >= optionsClasses.length ? basicNum = clickNum - 1 : basicNum;
    mediumNum >= optionsClasses.length ? mediumNum = clickNum - 2 : mediumNum;
    premiumNum >= optionsClasses.length ? premiumNum = clickNum - 1 : premiumNum;
    
    optionsPositions[0].classList.add(`${optionsClasses[basicNum]}`);
    optionsPositions[1].classList.add(`${optionsClasses[mediumNum]}`);
    optionsPositions[2].classList.add(`${optionsClasses[premiumNum]}`);
}

optionBtns.forEach((btn)=> {
    btn.addEventListener("click", changeOption);
});