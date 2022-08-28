// STICKY MENU FN
const nav = document.querySelector(".main-nav");
window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    console.log(scrollPosition);
    const scrollVAlue = 300;

    if (scrollPosition >= scrollVAlue) {
        nav.classList.add("is-sticky");
    }
    else {
        nav.classList.remove("is-sticky");
    }
})

// COUNTER FN 

const carNumber = document.querySelector(".cars_num");
const clientNumber = document.querySelector(".clients_num");
const lendNumber = document.querySelector(".lends_num");

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
        const interval = setInterval(counter, 10);
        if (cartStart === 80) clearInterval(interval);
    }
});

// SLIDER FN

const firtsImg = document.querySelector(".main-slider__default");
const slider = [...document.querySelectorAll(".main-slider__item")];
const slideH2 = document.querySelector("header h2");
const slidePosition = document.querySelector(".main-header__title");
const sliderBtns = [...document.querySelectorAll(".main-slider__btn")];

const time = 8000;

const slide = [{
    h2: "Luksusowe samochody w Twoim zasięgu",
    top: 50,
    left: 0,
    color: "gray",
    image: 'images/slide-1.jpg'
}, {
    h2: 'Poczuj się jak James Bond',
    top: 60,
    left: 55,
    color: "blue",
    image: 'images/slide-2.jpg'
}, {
    h2: "Szalej beztrosko po bezdrożach",
    top: 30,
    left: 10,
    color: "green",
    image: "images/slide-3.jpg"
}, {
    h2: "Poczuj wyjątkową moc",
    top: 20,
    left: 50,
    color: "red",
    image: "images/slide-4.jpg"
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
    firtsImg.classList.add("main-slider__hide-default");
    if (i >= slide.length) {
        i = 0;
    }
    slider.forEach(slide => slide.classList.remove("active_slide"))
    slider[i].classList.add("active_slide");
    slider[i].style.backgroundImage = `url(${slide[i].image}`;
    slidePosition.style.top = `${slide[i].top}%`;
    slidePosition.style.left = `${slide[i].left}%`;
    slideH2.textContent = slide[i].h2;
    changeBtn();
}

let autoSlide = setInterval(changeSlide, time);

// HORIZONTAL SLIDER FN

// const windowW = window.innerWidth;
// const horizontalLength = document.querySelector(".element-wrapper").scrollWidth;
// const distFromTop = document.querySelector(".horizontal-section").offsetTop;

// const scrollDist = distFromTop + horizontalLength - windowW;

// document.querySelector(".horizontal-section").style.height = horizontalLength + "px";

// window.onscroll = function () {
//     const scrollTop = window.scrollY;
//     if (scrollTop >= distFromTop && scrollTop <= scrollDist) {
//         document.querySelector(".element-wrapper").style.transform = `translateX(-${scrollTop - distFromTop}px)`;
//     }
// }