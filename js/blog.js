import {FleetFilter} from "./Fleet-filer.js";
const grid = document.querySelector(".grid");
const gridElements = document.querySelectorAll(".grid__blog-article");
const blogFilter = new FleetFilter(grid, gridElements, false);
blogFilter.filterInit();

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