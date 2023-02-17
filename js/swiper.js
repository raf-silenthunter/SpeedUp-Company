class Swiper {
    constructor() {
    this.initialX = null;
    this.initialY = null;

    document.addEventListener("touchstart", this.touchStart);
    document.addEventListener("touchmove", this.touchMove);
    }

    touchStart(event) {
    event.preventDefault();
    this.initialX = event.targetTouches[0].clientX;
    this.initialY = event.targetTouches[0].clientY;

}

    touchMove(event) {

        if(!this.initialX || !this.initialX) return;

        const {
            clientX: finalX,
            clientY: finalY
        } = event.targetTouches[0];

        const diffX = this.initialX - finalX > 0 ? 1 : -1;
        const diffY = this.initialY - finalY > 0 ? 1 : -1;

        console.log({diffX});

    //tu zrób sprawdzenie czy jesteś na osiX/Y, a następnie w którą stronę scroll
    //tu skończyłeś
    }
}

const mainSwiper = new Swiper();
mainSwiper()
