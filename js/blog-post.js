import { StickyNav, ShowMobileNav, DropdownNav, OpenModal} from "./general/mainnav-scripts.js";
import {DynamicBorder} from "./general/extras-scripts.js";

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

//DynamicBorder Class invoking
const root = document.querySelector(".post");
const mainnav = document.querySelector(".main-nav");
const dynamicBorder = new DynamicBorder(root, mainnav);
window.addEventListener("scroll", ()=> dynamicBorder.createBorder());