import {FleetFilter} from "./general/filter-scripts.js";
const gridParent = document.querySelector('[data-elem="scroll-wrap"]');
const gridElements = document.querySelectorAll('[data-elem="elem"]');
const blogFilter = new FleetFilter(gridParent, gridElements, true);
blogFilter.filterInit();

import {StickyNav, ShowMobileNav, DropdownNav, OpenModal} from "./general/mainnav-scripts.js";
//StickyNav Class invoking
const scrollableContent = document.querySelector(".booking-panel");
const stickyMenu = new StickyNav(scrollableContent);
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

///// stepsHandler Class invoking
const stepsHandler = new StepsHandler();
/////

import {ScrollBtn, BookingModal, StepsHandler} from "./general/extras-scripts.js";
const bookingWrap = document.querySelector(".grid");
const scrollBtn = new ScrollBtn(bookingWrap);
window.addEventListener("scroll", () => scrollBtn.showBtn());

const bookingModal = new BookingModal(stickyMenu, scrollBtn, stepsHandler);
bookingModal.init(bookingWrap);

import {FormValidation} from "./general/form-scripts.js";

const form = document.querySelector(".booking-section__form");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const message = document.getElementById("message");

const contactForm = new FormValidation(form, name, surname, message);
contactForm.init();