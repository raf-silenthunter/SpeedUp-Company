import { StickyNav, ShowMobileNav, DropdownNav, OpenModal} from "./general/mainnav-scripts.js";

//StickyNav Class invoking
const scrollableContent = window;
const stickyMenu = new StickyNav(scrollableContent);
document.addEventListener("DOMContentLoaded", () => stickyMenu.init());

//ShowMobileNav Class invoking
const toggleMobileNav = new ShowMobileNav();
toggleMobileNav.mobileMenuBtn.addEventListener("click", (e) => toggleMobileNav.showNav(e));

//DropdownNav Class invoking
const dropdownNav = new DropdownNav();
window.addEventListener("DOMContentLoaded", (e) => dropdownNav.stopPropagation(e));
dropdownNav.dropdownBtn.addEventListener("click", (e) => dropdownNav.dropdownNav(e));

//OpenModal Class invoking
const modalFn = new OpenModal();
modalFn.modalBtns.forEach((btn)=> {
    btn.addEventListener("click", modalFn.changeModalState);
});

//FormValidation Class invoking
import {FormValidation} from "./general/form-scripts.js";

const form = document.querySelector(".contact__form");
const successElement = document.querySelector('[data-info="contact-success"]')
const contactForm = new FormValidation(form, ["inputSurname"], successElement);
contactForm.init();