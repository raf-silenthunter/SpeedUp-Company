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

export class ScrollBtn {
    constructor(elemsWrap){
        this.scrollBtn = document.querySelector(".scroll-btn");
        this.scrolledElemsWrap = elemsWrap;
        this.visible = true;
        this.scrollBtn.addEventListener("click", this.scroll)
    }

    scroll(){
        const target = document.querySelector(".filter");
        const targetFromTop = target.offsetTop;
        const mainNavHeight = 100;
        const scrollPosition = targetFromTop - mainNavHeight;

            window.scrollTo({
                behavior: "smooth",
                top: scrollPosition,
            });
    }

    removeBtn(){
        this.scrollBtn.classList.remove("scroll-btn--visible");
        this.visible = false;
    }

    showBtn(){
        if(this.visible){
        const scrollerWrapPos = this.scrolledElemsWrap.getBoundingClientRect().top;
        scrollerWrapPos <= 0 ? this.scrollBtn.classList.add("scroll-btn--visible") : this.scrollBtn.classList.remove("scroll-btn--visible");
        }
    }
}

export class BookingModal{
    constructor(stickyMenu, scrollBtn, stepsHandler){
        this.bookingPanel = document.querySelector(".hidden-scroll-wrap");
        this.body = document.querySelector("body");
        this.btnClose = document.querySelector(".btn-close--sticky");
        //komposition: pass here two external classes to use their methods
        this.stickyMenu = stickyMenu;
        this.scrollBtn = scrollBtn;
        this.stepsHandler = stepsHandler;
        //not adding btnClose to the same event handler
        this.btnClose.addEventListener("click", (e) => this.closeModal(e));
    }

    init(bookingParent){
        bookingParent.addEventListener("click", (e) => this.handleModal(e))
    }

    handleModal(e){
        if(e.target.matches('[data-info="booking-btn"]')) {
            this.openModal(e);
            this.stepsHandler.init();
        }
        else return;
    }

    toggleModal = () =>{
        this.bookingPanel.classList.toggle("not-hidden-scroll-wrap");
        this.body.classList.toggle("stop-scroll");
    }

    openModal(e){
        e.stopPropagation();
        this.toggleModal();
        const scrollableContent = document.querySelector(".booking-panel");
        this.stickyMenu.init(scrollableContent);
        this.scrollBtn.removeBtn();
    }

    closeModal(e){
        e.stopPropagation();
        this.scrollBtn.visible = true;
        this.stickyMenu.init(window);
        this.toggleModal();
    }
    
}

export class StepsHandler{
    constructor(){
        this.stepsWrap;
        this.stepsElemsParent = document.querySelector(".booking-panel");
        this.stepsElems = [...document.querySelectorAll(".booking-section")];
        this.step = 0;

        this.buttonControls = [...document.querySelectorAll(".booking-section__btn-controls")];
        this.buttonControls.forEach(controls => {
            controls.addEventListener("click", (e)=> this.changeSection(e))
        }) 
    }

    setCarInfo(){
        //
    }

    resetHandler(){
        const textInputs = this.stepsElemsParent.querySelectorAll('input[type="text"]');
        textInputs.forEach(input => input.value = '');

        const selectElements = this.stepsElemsParent.querySelectorAll('select')
        selectElements.forEach(select => select.selectedIndex = 0);

        const radioInputs = this.stepsElemsParent.querySelectorAll('input[type="radio"]');
        radioInputs[0].checked= 1;

        const checkboxInputs = this.stepsElemsParent.querySelectorAll('input[type="checkbox"]');
        checkboxInputs.forEach(box => box.checked = 0);
    }

    removeVisibleSections(){
        this.stepsElems.forEach(step => step.classList.remove("visible", "not-visible-section"));
    }

    scrollToControls(stepSection){
        const wrapHeight = Math.floor(this.stepsElemsParent.scrollHeight);
        const mainNavHeight = 150;
        const sectionHeight = stepSection.offsetHeight;
        const scrollValue = wrapHeight - sectionHeight - mainNavHeight;
        this.stepsElemsParent.scrollTo({
            top: scrollValue,
            behavior: "smooth",
        })
    }

    changeStep(step){
        this.removeVisibleSections();
        this.stepsElems[step].classList.add("visible");
        this.hideElems();
        if(step !== 0) this.scrollToControls(this.stepsElems[step]);
    }

    changeSection(e){
        if(e.target.matches('[data-option="next"]')){
            this.step = ++this.step;
            this.changeStep(this.step);
        }
        else if(e.target.matches('[data-option="prev"]')){
            this.step = --this.step;
            this.changeStep(this.step);
        }
    }

    hideElems(){
        const elemsToHide = this.stepsElems.filter(element => !element.classList.contains("visible"))
        elemsToHide.forEach(elem => elem.classList.add("not-visible-section"));
    }

    init(){
        this.step = 0;
        this.changeStep(this.step)
        this.resetHandler();
        this.setCarInfo();
    }
}