import {FleetFilter} from "./general/filter-scripts.js";
const grid = document.querySelector('[data-elem="scroll-wrap"]');
const gridElements = document.querySelectorAll('[data-elem="elem"]');
const blogFilter = new FleetFilter(grid, gridElements, true);
blogFilter.filterInit();

import {StickyNav, ShowMobileNav, DropdownNav, OpenModal} from "./general/mainnav-scripts.js";
//StickyNav Class invoking
// const scrollableContent = document.querySelector(".booking-panel");
const stickyMenu = new StickyNav();
document.addEventListener("DOMContentLoaded", () => stickyMenu.init());

// ShowMobileNav Class invoking
const toggleMobileNav = new ShowMobileNav();
toggleMobileNav.mobileMenuBtn.addEventListener("click", (e) => toggleMobileNav.showNav(e));

// DropdownNav Class invoking
const dropdownNav = new DropdownNav();
window.addEventListener("DOMContentLoaded", (e) => dropdownNav.stopPropagation(e));
dropdownNav.dropdownBtn.addEventListener("click", (e) => dropdownNav.dropdownNav(e));

// OpenModal Class invoking
const modalFn = new OpenModal();
modalFn.modalBtns.forEach((btn)=> {
    btn.addEventListener("click", modalFn.changeModalState);
});

import {ScrollBtn} from "./general/extras-scripts.js";
const elemsWrap = document.querySelector(".grid");
const scrollBtn = new ScrollBtn(elemsWrap);
window.addEventListener("scroll", () => scrollBtn.showBtn());

const bookingPanel = document.querySelector(".booking-panel");
const bookingBtns = [...document.querySelectorAll('[data-info="booking-btn"]')];
const body = document.querySelector("body");
const btnClose = document.querySelector(".btn-close--sticky");
// const scrollableContent = document.querySelector(".booking-panel");

const toggleModal = () =>{
    bookingPanel.classList.toggle("visible-block");
    body.classList.toggle("hidden-scroll");
}

bookingBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleModal();
        stickyMenu.addSticky();
        scrollBtn.removeBtn();
    })
})

btnClose.addEventListener("click", (e)=>{
    e.stopPropagation();
    toggleModal();
})

import {FormValidation} from "./general/form-scripts.js";

const form = document.querySelector(".booking-section__form");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const message = document.getElementById("message");

const contactForm = new FormValidation(form, name, surname, message);
contactForm.init();