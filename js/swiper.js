document.addEventListener("DOMContentLoaded", () => {

    const swiper = document.querySelector(".swiper");
    const sections = [...document.querySelectorAll(".swiper__element")];

    let isThrottled = false;    
    let sectioninView = sections.findIndex(checkSectionInView); 
    let currSectionIndex = sectioninView;

    drawNavigation();

    document.addEventListener("wheel", (event) => {

        if(isThrottled) return;
        isThrottled = true;
        setTimeout(() => {
            isThrottled = false;
        }, 1500)

        const direction = event.deltaY > 0 ? 1 : -1;
        scroll(direction);
    })

    document.addEventListener("keydown", (event) => {
        const arrow = event.key;
        if(arrow && arrow !== "undefined"){
            switch(arrow) {
                case "ArrowUp": scroll(-1);
                    break;
                case "ArrowDown": scroll(1);
                    break;
                default:
            }
        }
    })

    const scroll = (direction) => {
            if(direction === 1) {
                const isLastSection = currSectionIndex === sections.length -1 ? true : false;
                if(isLastSection) return;
            } else {
                const isFirstSection = currSectionIndex === 0 ? true : false;
                if(isFirstSection) return;
            }

            currSectionIndex += direction;
            scrollToCurrSection();
        }

    const scrollToCurrSection = () => {
            sections[currSectionIndex].scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    function checkSectionInView(section) {
            const {top, bottom} = section.getBoundingClientRect();

            const isVisible = (top >= 0) && (Math.floor(bottom) <= window.innerHeight);
            return isVisible;
    }

    function drawNavigation() {
        const aside = document.createElement("aside");
        aside.setAttribute("class", "aside-nav");
        const asideList = document.createElement("ul");
        asideList.className = "aside-nav__list";

        sections.forEach((section, index)=> {
            const listItem = document.createElement("li");
            listItem.className = "aside-nav__item";
            asideList.append(listItem);
            // przerobić listenery na parent element - zrób poza forEachem i pobierz tam itemy
            listItem.addEventListener("click", () => {
                currSectionIndex = index;
                scrollToCurrSection();
            });
        })
        
        swiper.append(aside);
        aside.append(asideList);
    }
})
    

