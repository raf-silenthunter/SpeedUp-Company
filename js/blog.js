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

import {ScrollBtn} from "./general/extras-scripts.js";
const elemsWrap = document.querySelector(".grid");
const scrollBtn = new ScrollBtn(elemsWrap);
window.addEventListener("scroll", () => scrollBtn.showBtn());

import {ExtraFilter} from "./general/filter-scripts.js";

const grid = document.querySelector(".grid");
const gridElements = document.querySelectorAll(".grid__blog-article");

const extraFilter = new ExtraFilter(grid, gridElements, false);
extraFilter.filterInit();

