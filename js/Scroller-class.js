// eslint-disable-next-line no-unused-vars
class Scroller {
    constructor() {
        this.swiper = document.querySelector(".swiper");
        this.sections = [...document.querySelectorAll(".swiper__element")];

        this.sectioninView = this.sections.findIndex(this.checkSectionInView.bind(this)); 
        this.currSectionIndex = this.sectioninView;
        this.isThrottled = false; 

        this.drawNavigation();
        
        this.navDots = [...document.querySelectorAll(".aside-nav__item")];
        this.changeDot();
    }

    listenScroll(event) {

        if(this.isThrottled) return;
        this.isThrottled = true;
        setTimeout(() => {
            this.isThrottled = false;
        }, 1500)
        
        const direction = event.deltaY > 0 ? 1 : -1;
        this.scroll(direction);
    }
    
    scroll(direction) {
        if(direction === 1) {
            const isLastSection = this.currSectionIndex === this.sections.length -1 ? true : false;
            if(isLastSection) return;
        } else {
            const isFirstSection = this.currSectionIndex === 0 ? true : false;
            if(isFirstSection) return;
        }

        this.currSectionIndex += direction;
        this.scrollToCurrSection();
    }

    scrollToCurrSection() {
            this.sections[this.currSectionIndex].scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
        this.changeDot()
    }

    changeDot() {
        this.navDots.forEach(dot => dot.style.backgroundColor = "yellow");
        this.navDots[this.currSectionIndex].style.backgroundColor = "#000205";
    }

    checkSectionInView(section) {
            const {top, bottom} = section.getBoundingClientRect();

            const isVisible = (top >= 0) && (Math.floor(bottom) <= window.innerHeight);
            return isVisible;
    }

    drawNavigation() {
        const aside = document.createElement("aside");
        aside.setAttribute("class", "aside-nav");
        const asideList = document.createElement("ul");
        asideList.className = "aside-nav__list";

        this.sections.forEach((section, index) => {
            const listItem = document.createElement("li");
            listItem.className = "aside-nav__item";
            asideList.append(listItem);
            // przerobić listenery na parent element - zrób poza forEachem i pobierz tam itemy
            listItem.addEventListener("click", () => {
                this.currSectionIndex = index;
                this.scrollToCurrSection();
            });
        })
        
        this.swiper.append(aside);
        aside.append(asideList);
    }
}