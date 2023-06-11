import {ShowMobileNav, OpenModal, DropdownNav} from "./general/mainnav-scripts.js";
import {Accordeon, secondaryImageDetector} from "./general/extras-scripts.js";

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

//Accordion Class invoking
const accordion = new Accordeon();
accordion.accordeonContainer.addEventListener("click", (e) => accordion.initAccordion(e));


//secondaryImageDetector Function invoking
const imageDetector = secondaryImageDetector();
document.addEventListener("DOMContentLoaded", imageDetector);