import {ShowMobileNav, OpenModal, DropdownNav} from "./general/mainnav-scripts.js";
import {Accordeon, secondaryImageDetector} from "./general/extras-scripts.js";
import {Swiper, Scroller} from "./general/swiper-scripts.js";
import {FormValidation} from "./general/form-scripts.js";

//ShowMobileNav Class invoking
const toggleMobileNav = new ShowMobileNav();
toggleMobileNav.elements.mobileMenuBtn.addEventListener("click", (e) => toggleMobileNav.showNav(e));

//DropdownNav Class invoking
const dropdownNav = new DropdownNav();
window.addEventListener("DOMContentLoaded", (e) => dropdownNav.stopPropagation(e));
dropdownNav.elements.dropdownBtn.addEventListener("click", (e) => dropdownNav.dropdownNav(e));

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

//Scroller Class invoking
const mainScroller = new Scroller();
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("wheel", (event) => mainScroller.listenScroll(event));
    //custom events 
    document.addEventListener("swipeUp", () => mainScroller.scroll(1))
    document.addEventListener("swipeDown", () => mainScroller.scroll(-1))
    //custom events
    document.addEventListener("keydown", (event) => {
        const arrow = event.key;
        if(arrow && arrow !== "undefined"){
            switch(arrow) {
                case "ArrowUp": mainScroller.scroll(-1);
                    break;
                case "ArrowDown": mainScroller.scroll(1);
                    break;
                default:
            }
        }
    })
})

//Swiper Class invoking
const mainSwiper = new Swiper();
document.addEventListener("touchstart", (event) => mainSwiper.touchStart(event));
document.addEventListener("touchmove", (event) => mainSwiper.touchMove(event));

//FormValidation Class invoking
const form = document.querySelector(".swiper-conversion__form");
const successElement = document.querySelector('[data-info="conversion-success"]');
const conversionForm = new FormValidation(form, ["inputSurname", "inputEmail", "inputMessage", "inputLogin", "inputPassword"], successElement);
conversionForm.init()

//Login Modal (FormValidation) Class invoking
const modalLoginform = document.querySelector(".modal__form");
const modalLoginsuccessElement = document.querySelector('[data-info="login-success"]')
const modalLoginForm = new FormValidation(modalLoginform, ["inputName", "inputSurname", "inputPhone", "inputMessage", "inputEmail"], modalLoginsuccessElement);
modalLoginForm.init();