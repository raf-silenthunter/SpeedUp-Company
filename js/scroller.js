document.addEventListener("DOMContentLoaded", () => {
    // eslint-disable-next-line no-undef
    const mainScroller = new Scroller();

    document.addEventListener("wheel", (event) => mainScroller.listenScroll(event));
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