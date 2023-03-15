/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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

//DROPDOWN MENU ITEMS
const dropdownBtn = document.querySelector(".dropdown");
const dropdownList = document.querySelector(".dropdown__list");
const dropdownItems = [...document.querySelectorAll(".dropdown__item")];
const dropdownLinks = [...document.querySelectorAll(".dropdown__link")];

const slowDropDownList = () => {
    let showItemTime = 0;
        dropdownItems.forEach(item => {
            setTimeout(() => {
            item.classList.add("dropdown__item--is-dropdown");
        }, showItemTime)
        showItemTime += 500;
    })
}

dropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.stopPropagation();
    })
})

dropdownBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownBtn.classList.toggle("dropdown--is-checked");
        const isListdropDown = dropdownList.classList.contains("dropdown__list--is-dropdown");
        slowDropDownList();
        if(!isListdropDown){
            dropdownList.classList.add("dropdown__list--is-dropdown");
        } else {
            const dropDownItem = document.querySelector(".dropdown__item");
            const isItemInView = dropDownItem.classList.contains("dropdown__item--is-dropdown");
            if(isItemInView) dropdownList.classList.remove("dropdown__list--is-dropdown");
            else return;
        }
})