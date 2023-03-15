// OPEN MOBILE MENU FN 
const mobileMenuBtn = document.querySelector(".main-nav__hamburger-btn");
const mobileMenuList = document.querySelector(".list");
const mainNav = document.querySelector(".main-nav");

mobileMenuBtn.addEventListener("click", () => {
    mobileMenuList.classList.toggle("list--is-visible");
    mainNav.classList.toggle("main-nav--is-dropdown");
})

//DROPDOWN MENU ITEMS
const dropdownBtn = document.querySelector(".dropdown");
const dropdownList = document.querySelector(".dropdown__list");
const dropdownItems = [...document.querySelectorAll(".dropdown__item")];
const dropdownLinks = [...document.querySelectorAll(".dropdown__link")];

const slowDropDownList = () => {
    let showItemTime = 0;
        dropdownItems.forEach(item => {
            setTimeout(() => {
            item.classList.add("dropdown__item--is-dropdown");
        }, showItemTime)
        showItemTime += 500;
    })
}

dropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.stopPropagation();
    })
})

dropdownBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownBtn.classList.toggle("dropdown--is-checked");
        const isListdropDown = dropdownList.classList.contains("dropdown__list--is-dropdown");
        slowDropDownList();
        if(!isListdropDown){
            dropdownList.classList.add("dropdown__list--is-dropdown");
        } else {
            const dropDownItem = document.querySelector(".dropdown__item");
            const isItemInView = dropDownItem.classList.contains("dropdown__item--is-dropdown");
            if(isItemInView) dropdownList.classList.remove("dropdown__list--is-dropdown");
            else return;
        }
})

// STICKY MENU FN
const nav = document.querySelector(".main-nav");
const scrollVAlue = 100;  

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