import {FleetFilter} from "./general/filter-scripts.js";
const grid = document.querySelector(".grid");
const gridElements = document.querySelectorAll(".option");
const blogFilter = new FleetFilter(grid, gridElements, true);
blogFilter.filterInit();

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

import {ScrollBtn} from "./general/extras-scripts.js";
const elemsWrap = document.querySelector(".grid");
const scrollBtn = new ScrollBtn(elemsWrap);
window.addEventListener("scroll", () => scrollBtn.showBtn());