import { StickyNav, ShowMobileNav, DropdownNav, OpenModal} from "./general/mainnav-scripts.js";

//StickyNav Class invoking
const stickyMenu = new StickyNav();
window.addEventListener("scroll", () => stickyMenu.toggleNav());

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
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

const contactForm = new FormValidation(form, name, surname, email, phone, message);
contactForm.init();