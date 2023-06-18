export class Accordeon {
    constructor(){
        this.accordeonContainer = document.querySelector(".accordeon");
        this.accordeonPanels = [...document.querySelectorAll(".accordeon__panel")];
        this.accordeonInfo = [...document.querySelectorAll(".accordeon__info")];
        this.accordeonIcons = [...document.querySelectorAll(".accordeon__icon")];
        this.panelToCollapseIndex = null;
    }

    setAttrforArr(arr, attr) {
        arr.forEach((arrElement, index) => arrElement.setAttribute(`${attr}`, index));
    }

    checkParentHasAttr = (target) => {
        let checkedElem = target;
        while(checkedElem && !checkedElem.hasAttribute("data-key")) checkedElem = checkedElem.parentElement;
        return checkedElem.dataset.key;
    }

    initAccordion(e){
        const clickedElem = e.target;
        if(!clickedElem.matches(".accordeon__panel, .accordeon__title, .accordeon__icon")) return;
            
        this.setAttrforArr(this.accordeonPanels, "data-key");

        this.panelToCollapseIndex = this.checkParentHasAttr(clickedElem);
        const currentInfoPanel = this.accordeonInfo[this.panelToCollapseIndex];
        const isCollapsed = currentInfoPanel.classList.contains("accordeon__info--visible");

        if(!isCollapsed){
            this.accordeonInfo.forEach(info => info.classList.remove("accordeon__info--visible"));
            this.accordeonIcons.forEach(icon => icon.classList.remove("accordeon__icon--rotate"));
            
            currentInfoPanel.classList.add("accordeon__info--visible");
            this.accordeonIcons[this.panelToCollapseIndex].classList.add("accordeon__icon--rotate")
        } else {
            currentInfoPanel.classList.remove("accordeon__info--visible");
            this.accordeonIcons[this.panelToCollapseIndex].classList.remove("accordeon__icon--rotate")
        }
    }
}

export function secondaryImageDetector() {
        const img = document.querySelector(".swiper-profits__bg");
        const imgData = img.dataset.info;
            switch(imgData) {
                case "sport": img.setAttribute("src", "../../images/sport/sport-secondary-big.jpg")
                    break;
                case "oldtimer": img.setAttribute("src", "../../images/oldtimer/oldtimer-secondary-image.jpg")
                    break;
                case "luxury": img.setAttribute("src", "../../images/luxury/luxury-secondary-image.jpg")
                    break;
                case "terrain": img.setAttribute("src", "../../images/slide-4.jpg")
                    break;
                default: img.setAttribute("src", "../../images/slide-4.jpg")
    }
}

export function counter() {
    const carNumber = document.querySelector(".cars-num");
    const clientNumber = document.querySelector(".clients-num");
    const lendNumber = document.querySelector(".lends-num");

    let carStart = 0, clientStart = 0, lendStart = 0;

    const counterStartValue = 300;

    const changeNumbers = () => {
        carNumber.textContent = `${carStart >= 120 ? carStart : carStart++}`
        clientNumber.textContent = `${clientStart >= 300 ? clientStart : clientStart++}`
        lendNumber.textContent = `${lendStart >= 1500 ? lendStart : lendStart++}`
    }

    const startCounter = document.addEventListener("scroll", () => {
        let scrollPosition = window.scrollY;
        if (scrollPosition >= counterStartValue) {
            const interval = setInterval(changeNumbers, 10);
            // value with the biggest number needs to stop interval 
            if (lendStart === 1500) clearInterval(interval);
        }
    });

    document.addEventListener("scroll", startCounter);
}

export class DynamicBorder {
    constructor(root, parent){
        this.root = root;
        this.borderParent = parent;

        // this.rootTopPosition = this.root.offsetTop;
        // this.rootHeight = this.root.offsetHeight;
        // this.borderParentWidth = this.borderParent.offsetWidth;
        
        this.addBorder();
    }

    changeBorderLeft(value){
        const border = document.querySelector(".dynamic-border");
        border.style.width = value;
    }   

    addBorder(){
        const border = document.createElement("span");
        border.classList.add("dynamic-border");
        this.borderParent.append(border);
    }   

    calcBorder(scrollPos){
        const dynamicBorderWidth = scrollPos * 100 / this.rootHeight;
        return dynamicBorderWidth;
    }

    createBorder(){
        this.rootTopPosition = this.root.offsetTop;
        this.rootHeight = this.root.offsetHeight;
        this.borderParentWidth = this.borderParent.offsetWidth;
        //I want this to be updated with scroll incase user changes desktop viewport 
        const scrollPosition = window.scrollY;
        
        if(scrollPosition >= this.rootTopPosition && scrollPosition <= (this.rootTopPosition + this.rootHeight)) {
            const dynamicBorderWidth = this.calcBorder(scrollPosition)
            this.changeBorderLeft(`${dynamicBorderWidth}%`);
        } 
        else if(scrollPosition > this.rootHeight) {
            //extra condition needed in case of very fast scrolling
            this.changeBorderLeft(`${100}%`);
        } 
        else {
            return;
        }
    }
}