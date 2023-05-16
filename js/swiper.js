// eslint-disable-next-line no-unused-vars
class Swiper {
    constructor() {
    this.initialX = null;
    this.initialY = null;

    document.addEventListener("touchstart", (event) => this.touchStart(event));
    document.addEventListener("touchmove", (event) => this.touchMove(event));
    //due to the fact that I created listeners inside this class, they are encapsulated,
    //and it makes this class more reusable. This doesn't need to detect external code.
    //events are global objects that can be used from anywhere in the code.
        this.events = {
            swipeUp: new Event("swipeUp"),
            swipeDown: new Event("swipeDown"),
            swipeLeft: new Event("swipeLeft"),
            swipeRight: new Event("swipeRight"),
        }   
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

        const diffX = this.initialX - finalX;
        const diffY = this.initialY - finalY;

        if(Math.abs(diffX) > Math.abs(diffY)){
            //oś X prawo-lewo
            if(diffX < 0) {
                document.dispatchEvent(this.events.swipeRight);
            } else {
                document.dispatchEvent(this.events.swipeLeft);
            }
        } else {
                console.log(diffY);
            if(diffY < 0) {
                console.log(this);
                document.dispatchEvent(this.events.swipeDown);
            } else {
                document.dispatchEvent(this.events.swipeUp);
            }
        }

        this.initialX = null;
        this.initialY = null;
    }
}