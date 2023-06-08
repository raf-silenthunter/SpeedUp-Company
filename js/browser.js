// FLEET OPTIONS FILTER 
import {FleetFilter} from "./Fleet-filer.js";
const grid = document.querySelector(".grid");
const gridElements = document.querySelectorAll(".option");
const blogFilter = new FleetFilter(grid, gridElements, true);
blogFilter.filterInit();

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