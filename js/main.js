import {DropdownNav, StickyNav, OpenModal, ShowMobileNav} from "../js/general/mainnav-scripts.js"
import {counter} from "../js/general/extras-scripts.js";
import {MainSlider, OptionsSlider, BrandsSlider} from "../js/general/swiper-scripts.js";
import {FormValidation} from "./general/form-scripts.js";

//StickyNav Class invoking
const scrollableContent = window;
const stickyMenu = new StickyNav(scrollableContent);
document.addEventListener("DOMContentLoaded", () => stickyMenu.init());

//ShowMobileNav Class invoking
const toggleMobileNav = new ShowMobileNav();
toggleMobileNav.elements.mobileMenuBtn.addEventListener("click", (e) => toggleMobileNav.showNav(e));

//DropdownNav Class invoking
const dropdownNav = new DropdownNav();
window.addEventListener("DOMContentLoaded", (e) => dropdownNav.stopPropagation(e));
dropdownNav.elements.dropdownBtn.addEventListener("click", (e) => dropdownNav.dropdownNav(e));

//OpenModal Class invoking
const modalFn = new OpenModal();
modalFn.elements.modalBtns.forEach((btn)=> {
    btn.addEventListener("click", modalFn.changeModalState);
});

//counter Function invoking
const initCounter = counter();
document.addEventListener("scroll", initCounter);

//MainSlider Class invoking
const mainSlider = new MainSlider(10000);
document.addEventListener("DOMContentLoaded", () => mainSlider.setDefaultImage());
//czy tutaj jest wywołanie wyniku funkcji?

//OptionsSlider Class invoking
const optionsSlider = new OptionsSlider();
optionsSlider.init();

//BrandsSlider Class invoking
const brandsSlider = new BrandsSlider()
brandsSlider.init();

//FormValidation Class invoking for just NL subscription
const form = document.querySelector(".nl-wrap__form");
const nlSuccessInfoPlaceholder = document.querySelector('[data-info="nl-success"]');
const contactForm = new FormValidation(form, ["inputName", "inputSurname", "inputPhone", "inputMessage", "inputLogin", "inputPassword"], nlSuccessInfoPlaceholder);
contactForm.init();

//Login Modal (FormValidation) Class invoking
const modalLoginform = document.querySelector(".modal__form");
const modalLoginsuccessElement = document.querySelector('[data-info="login-success"]')
const modalLoginForm = new FormValidation(modalLoginform, ["inputName", "inputSurname", "inputPhone", "inputMessage", "inputEmail"], modalLoginsuccessElement);
modalLoginForm.init();