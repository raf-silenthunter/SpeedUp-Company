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

//counter Function invoking
const initCounter = counter();
document.addEventListener("scroll", initCounter);

//MainSlider Class invoking
const mainSlider = new MainSlider(10000);
document.addEventListener("DOMContentLoaded", mainSlider.setDefaultImage);

//OptionsSlider Class invoking
const optionsSlider = new OptionsSlider();
optionsSlider.init();

//BrandsSlider Class invoking
const brandsSlider = new BrandsSlider()
brandsSlider.init();

//FormValidation Class invoking
const form = document.querySelector(".nl-wrap__form");
const contactForm = new FormValidation(form, ["inputName", "inputSurname", "inputPhone", "inputMessage"]);
contactForm.init();