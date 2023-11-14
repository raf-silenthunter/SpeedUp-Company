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

//Booking Modal feature
import {carsInfo} from '../../data/carsInfo.js'
const carsInfoDatabase = carsInfo;

import {ScrollBtn, BookingModal, StepsHandler} from "./general/extras-scripts.js";
const stepsHandler = new StepsHandler();
const bookingWrap = document.querySelector(".grid");
const scrollBtn = new ScrollBtn(bookingWrap);
window.addEventListener("scroll", () => scrollBtn.showBtn());

const bookingModal = new BookingModal(stickyMenu, scrollBtn, stepsHandler, carsInfoDatabase);
bookingModal.init(bookingWrap);

import {FormValidation} from "./general/form-scripts.js";
const form = document.querySelector(".booking-section__form");
const bookingSuccessInfoPlaceholder = document.querySelector('[data-info="booking-success"]');
const contactForm = new FormValidation(form, ["inputMessage"], bookingSuccessInfoPlaceholder);
contactForm.init();
//Booking Modal feature

//Rozwiązać problem
// FormValidation Class invoking for just NL subscription
const nlFormWrap = document.querySelector(".nl-wrap__form");
const nlSuccessInfoPlaceholder = document.querySelector('[data-info="nl-success"]');
const nlForm = new FormValidation(nlFormWrap, ["inputName", "inputSurname", "inputPhone", "inputMessage"], nlSuccessInfoPlaceholder);
nlForm.init();