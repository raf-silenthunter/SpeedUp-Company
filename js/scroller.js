/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
document.addEventListener("DOMContentLoaded", () => {
    const mainScroller = new Scroller();
    const mainSwiper = new Swiper();

    document.addEventListener("wheel", (event) => mainScroller.listenScroll(event));

    document.addEventListener("swipeUp", () => mainScroller.scroll(1))
    document.addEventListener("swipeDown", () => mainScroller.scroll(-1))

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