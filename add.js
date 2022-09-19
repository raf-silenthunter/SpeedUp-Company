// SLIDER FN
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
    console.log(screenWidth);
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