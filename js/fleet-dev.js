import flatpickr from "./../node_modules/flatpickr";
            const myInput = document.querySelector(".calendar__input");
            flatpickr(myInput, {});  // flatpickr

import {FleetFilter} from "./general/filter-scripts.js";
const grid = document.querySelector(".grid");
const gridElements = document.querySelectorAll(".option");
const blogFilter = new FleetFilter(grid, gridElements, true);
blogFilter.filterInit();

import {StickyNav} from "./general/mainnav-scripts.js";
// , ShowMobileNav, DropdownNav, OpenModal add it up
//StickyNav Class invoking
const stickyMenu = new StickyNav();
window.addEventListener("scroll", () => stickyMenu.toggleNav());

//ShowMobileNav Class invoking
// const toggleMobileNav = new ShowMobileNav();
// toggleMobileNav.mobileMenuBtn.addEventListener("click", (e) => toggleMobileNav.showNav(e));

//DropdownNav Class invoking
// const dropdownNav = new DropdownNav();
// window.addEventListener("DOMContentLoaded", (e) => dropdownNav.stopPropagation(e));
// dropdownNav.dropdownBtn.addEventListener("click", (e) => dropdownNav.dropdownNav(e));

//OpenModal Class invoking
// const modalFn = new OpenModal();
// modalFn.modalBtns.forEach((btn)=> {
//     btn.addEventListener("click", modalFn.changeModalState);
// });

import {ScrollBtn} from "./general/extras-scripts.js";
const elemsWrap = document.querySelector(".grid");
const scrollBtn = new ScrollBtn(elemsWrap);
window.addEventListener("scroll", () => scrollBtn.showBtn());