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

// FLEET OPTIONS FILTER 

const fleetWrap = document.querySelector(".gallery__options");
const fleetElements = document.querySelectorAll(".gallery__option");
const fleetOptions = [...fleetElements];

const setFleet = () => {
    fleetWrap.innerHTML = '';
    fleetWrap.classList.add("gallery__options--is-filtered");
}

const checkBtnKey = (e) => {
    if(e.target.matches(".filter__btn, .filter__title, .filter__icon, .filter__picture")){
        let target = e.target;
        while (target && !target.classList.contains("filter__btn")) target = target.parentElement;
        const clickedBtnKey = target.dataset.key;
        setFleet();
        return clickedBtnKey;
    } else if (e.target.matches(".option, .option__img, .option__list, .option__item, .option__txt, .action-btn")) {
        return console.log("option kliknięte");
    } else {
        fleetWrap.classList.remove("gallery__options--is-filtered");
        fleetOptions.forEach(fleetOption => fleetWrap.append(fleetOption));
    }
}

const filterFleet = (e) => {
    const btnKey = checkBtnKey(e); 
    const filteredFleet = fleetOptions.filter(e => e.dataset.option === btnKey)
    filteredFleet.forEach(fleetElement => fleetWrap.append(fleetElement))
};

document.addEventListener("click", filterFleet)