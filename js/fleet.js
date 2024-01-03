import {Filter} from "./general/filter-scripts.js";
const fleetFeatureWrap = document.querySelector(".gallery__filter-feature");
const fleetElemsWrap = document.querySelector('[data-elem="scroll-wrap"]');
const fleetElements = document.querySelectorAll('[data-elem="elem"]');
const fleetFilter = new Filter(fleetFeatureWrap, fleetElemsWrap, fleetElements, true);
fleetFilter.filterInit();

import {StickyNav, ShowMobileNav, DropdownNav, OpenModal} from "./general/mainnav-scripts.js";
//StickyNav Class invoking
const scrollableContent = document.querySelector(".booking-panel");
const stickyMenu = new StickyNav(scrollableContent);
document.addEventListener("DOMContentLoaded", () => stickyMenu.init());

// ShowMobileNav Class invoking
const toggleMobileNav = new ShowMobileNav();
toggleMobileNav.elements.mobileMenuBtn.addEventListener("click", (e) => toggleMobileNav.showNav(e));

// DropdownNav Class invoking
const dropdownNav = new DropdownNav();
window.addEventListener("DOMContentLoaded", (e) => dropdownNav.stopPropagation(e));
dropdownNav.elements.dropdownBtn.addEventListener("click", (e) => dropdownNav.dropdownNav(e));

// OpenModal Class invoking
const modalFn = new OpenModal();
modalFn.elements.modalBtns.forEach((btn)=> {
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
const contactForm = new FormValidation(form, ["inputMessage", "inputLogin", "inputPassword"], bookingSuccessInfoPlaceholder);
contactForm.init();
//Booking Modal feature

// FormValidation Class invoking for just NL subscription
const nlFormWrap = document.querySelector(".nl-wrap__form");
const nlSuccessInfoPlaceholder = document.querySelector('[data-info="nl-success"]');
const nlForm = new FormValidation(nlFormWrap, ["inputName", "inputSurname", "inputPhone", "inputMessage", "inputLogin", "inputPassword"], nlSuccessInfoPlaceholder);
nlForm.init();

//Login Modal (FormValidation) Class invoking
const modalLoginform = document.querySelector(".modal__form");
const modalLoginsuccessElement = document.querySelector('[data-info="login-success"]')
const modalLoginForm = new FormValidation(modalLoginform, ["inputName", "inputSurname", "inputPhone", "inputMessage", "inputEmail"], modalLoginsuccessElement);
modalLoginForm.init();