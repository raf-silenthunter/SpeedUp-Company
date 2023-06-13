import {DropdownNav, StickyNav, OpenModal, ShowMobileNav} from "../js/general/mainnav-scripts.js"
import {counter} from "../js/general/extras-scripts.js";
import {MainSlider, OptionsSlider, BrandsSlider} from "../js/general/swiper-scripts.js";

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

//counter Function invoking
const initCounter = counter();
document.addEventListener("scroll", initCounter);

//MainSlider Class invoking
const mainSlider = new MainSlider(10000);
document.addEventListener("DOMContentLoaded", mainSlider.setDefaultImage);

//OptionsSlider Class invoking
const optionsSlider = new OptionsSlider();
optionsSlider.bizSlider.addEventListener("click", (e) => optionsSlider.init(e));

//BrandsSlider Class invoking
const brandsSlider = new BrandsSlider()
brandsSlider.brandsSliderRoot.addEventListener("click", (e) => brandsSlider.init(e));