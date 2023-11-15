import { StickyNav, ShowMobileNav, DropdownNav, OpenModal} from "./general/mainnav-scripts.js";
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

import {ScrollBtn} from "./general/extras-scripts.js";
const elemsWrap = document.querySelector(".grid");
const scrollBtn = new ScrollBtn(elemsWrap);
window.addEventListener("scroll", () => scrollBtn.showBtn());

import {BlogPostsFilter} from "./general/filter-scripts.js";
const blogfilterWrap = document.querySelector(".blog-content");
const blogElementsWrap = document.querySelector(".grid");
const blogElements = document.querySelectorAll(".grid__blog-article");

const blogFilter = new BlogPostsFilter(blogfilterWrap, blogElementsWrap, blogElements, false);
blogFilter.filterInit();

//FormValidation Class invoking for just NL subscription
const form = document.querySelector(".nl-wrap__form");
const nlSuccessInfoPlaceholder = document.querySelector('[data-info="nl-success"]');
const contactForm = new FormValidation(form, ["inputName", "inputSurname", "inputPhone", "inputMessage"], nlSuccessInfoPlaceholder);
contactForm.init();

