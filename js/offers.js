import {ShowMobileNav, OpenModal, DropdownNav} from "./general/mainnav-scripts.js";
import {Accordeon, secondaryImageDetector} from "./general/extras-scripts.js";
import {Swiper} from "./general/swiper-scripts.js";

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

//Swiper Class invoking

document.addEventListener("DOMContentLoaded", () => {
    const mainScroller = new Scroller();
    const mainSwiper = new Swiper();

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
