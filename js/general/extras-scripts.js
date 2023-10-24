import importedOrderData from '../../data/orderInfo.js'
import {getSelectedDate, datePickerInit} from '../datepicker.js';

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
    constructor(stickyMenu, scrollBtn, stepsHandler, dataBase){
        this.bookingPanel = document.querySelector(".hidden-scroll-wrap");
        this.body = document.querySelector("body");
        this.btnClose = document.querySelector(".btn-close--sticky");
        //komposition: pass here two external classes to use their methods

        this.stickyMenu = stickyMenu;
        this.scrollBtn = scrollBtn;
        this.stepsHandler = stepsHandler;
        // this.bookingCalc = bookingModalInstance;
        //not adding btnClose to the same event handler

        this.dataBase = dataBase;
        this.btnClose.addEventListener("click", (e) => this.closeModal(e));

        this.updatedDataBase = {};
        //object desined to commit info to other Classes
    }

    init(bookingParent){
        bookingParent.addEventListener("click", (e) => this.handleModal(e))
    }

    loadData(carDataObject){
        const {
            carName : model = "brak",
            carEngine : engine = "brak",
            carPrice : price = "brak",
            carImg : img = "brak",
            carEquipement : equipement = "brak"
        } = carDataObject;
        this.updatedDataBase = carDataObject;

        const modelLabel = document.querySelector('[data-info="car-model"]');
        const engineLabel = document.querySelector('[data-info="engine"]');
        const priceLabel = document.querySelector('[data-info="daily-car-price"]');
        const imgLabel = document.querySelector('[data-info="car-img"]');
        const equipementLabelArray = [...document.querySelectorAll('[data-info="equipement"]')];
        
        modelLabel.textContent = model;
        engineLabel.textContent = engine;
        priceLabel.textContent = price;
        imgLabel.src = img;
        equipementLabelArray.forEach((label, index) => label.textContent = equipement[index])
    }

    checkData(e){
        if(e.target.matches('[data-car]')){
            const data = this.dataBase;
            const clientCarIndex = e.target.dataset.car; //index of a car chosen by a client
            const findCarDataset = data.filter(dataItem => dataItem.carIndex === clientCarIndex);
            this.loadData(...findCarDataset);
        }
    }

    handleModal(e){
        if(e.target.matches('[data-info="booking-btn"]')) {
            this.checkData(e);
            this.openModal(e);
            this.stepsHandler.init(this.updatedDataBase.carPrice);
        }
        else return;
        //tu wyżej wypadałoby dać jakieś zabezpieczenie
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

        this.bookingModalCalc = new BookingModalCalc(importedOrderData);

        this.buttonControls = [...document.querySelectorAll(".booking-section__btn-controls")];
        this.buttonControls.forEach(controls => {
            controls.addEventListener("click", (e)=> this.changeSection(e))
        }) 
    }

    resetHandler(){
        const textInputs = this.stepsElemsParent.querySelectorAll('input[type="text"]');
        textInputs.forEach(input => input.value = '');

        const selectElements = this.stepsElemsParent.querySelectorAll('select')
        selectElements.forEach(select => select.selectedIndex = 0);

        const radioInputs = this.stepsElemsParent.querySelectorAll('input[type="radio"]');
        radioInputs[0].checked = 1;

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
            this.bookingModalCalc.checkStep(this.step);
            this.changeStep(this.step);
        }
        else if(e.target.matches('[data-option="prev"]')){
            this.step = --this.step;
            this.bookingModalCalc.checkStep(this.step);
            this.changeStep(this.step);
        }
    }

    hideElems(){
        const elemsToHide = this.stepsElems.filter(element => !element.classList.contains("visible"))
        elemsToHide.forEach(elem => elem.classList.add("not-visible-section"));
    }

    init(carPrice){
        this.step = 0;
        this.changeStep(this.step)
        datePickerInit();
        this.bookingModalCalc.carPrice = carPrice;
        this.bookingModalCalc.bookingData.equipementPrice = [];
        this.bookingModalCalc.checkStep(this.step)
        this.resetHandler();
    }
}


export class BookingModalCalc{
    constructor(data){
        this.carPrice = null; //carPrice is submited by StepsHandler init() method
        const {options, equipement} = data; //how to do it async?
        this.optionPrices = options; //coming from contructor
        this.equipementPrices = equipement; //coming from contructor

        this.bookingData = {
            days: null,
            optionPrice: "basic", //basic option is set by default so if user will not change it he will have proce for basic option
            equipementPrice: [], //user doesn't need to chose any add-on so we can have empty array here
            carPrice : this.carPrice,
        }

        this.boundHandleEquipementchange = this.handleEquipementchange;
        this.boundOptionchange = this.handleOptionChange;
        this.boundDatechange = this.handleDateChange;
        //bounding a reference to the function so I can make sure that I have only one event, and only function is invoked only once

        this.startDate = null;
        this.endDate = null;
        this.startPlace = "Kraków ul. Hoyera 1"; //default value
        this.endPlace = "Kraków ul. Hoyera 1"; //default value
        this.startHour = "9"; //default value
        this.endHour = "9"; //default value
    }

    calcFinalPrice(updatedOrderData){
        const {days, optionPrice, equipementPrice, carPrice} = updatedOrderData;
        //zamienić wyżej na optionData itp. 
        console.log(days, optionPrice, equipementPrice, carPrice);        
        const priceForOption = this.optionPrices[optionPrice];

        const findEquipementPrices = () => {
            if(Array.from(equipementPrice).length === 0){
                return 0;
            } else {
                const allEquipementPrices = [];
                for(let i = 0; i < equipementPrice.length; i++){
                    for (const value of Object.keys(this.equipementPrices)){
                        if(value === equipementPrice[i]) {
                            const price = this.equipementPrices[value];
                            if(typeof(price) === "number") {
                                allEquipementPrices.push(price)
                            } else console.log('to nie jest number!');
                        } else console.log('brak podbieństwa');
                    } //jak napisać powyższe prościej???
                }
                    return allEquipementPrices;
                }
            }
            
        const allEquipementPricesArr = findEquipementPrices();
        const summEquipementPrices = allEquipementPricesArr.reduce((accum, currVal) => accum + currVal);

        const finalCarPrice = days * carPrice;
        const finalOptionPrice = priceForOption * (days/2);
        const finalEquipementPrice = summEquipementPrices * days;
        //data zmienić na price + musisz jeszcze equipment razy dzień
        const finalPrice = finalCarPrice + finalOptionPrice + finalEquipementPrice;
    }

    handleEquipementchange = (e) => {
        // e.stopPropagation();
        const chosenOption = e.target.id;
        if(e.target.type === "checkbox" && e.target.checked){
            this.bookingData.equipementPrice.push(chosenOption);
        } else if(e.target.type === "checkbox" && !e.target.checked){
            const newArray = this.bookingData.equipementPrice.filter((element)=> {
                return element !== chosenOption;
            })
            //we need to update an array while user delete chosen option. This is the simpliest way
            this.bookingData.equipementPrice = newArray;
        } else console.log("no option in step two has been chosen");
    }

    handleOptionChange = (e) => {
            const chosenOption = e.target.id;
            if(e.target.type === "radio" && e.target.checked) {
                this.bookingData.optionPrice = chosenOption;
            } else console.log("no option in step one has been chosen");
        }

    checkIsDateReady = (startDate, endDate) => {
            if((startDate !== null && endDate !== null) && (startDate !== undefined && endDate !== undefined)){
                const differenceInDays = endDate - startDate;
                const firstDay = 1;
                const orderDurationInDays = Math.floor((differenceInDays / (24 * 60 * 60 * 1000)) + firstDay);
                this.bookingData.days = orderDurationInDays;
                console.log(this.startDate, this.endDate);
                } else {
                    console.log('set second date!', this.startDate, this.endDate);
                }
            }  

    handleDateChange = (e) => {
            switch(e.target.id){
                case "start-date" : 
                    this.startDate = getSelectedDate();
                    this.checkIsDateReady(this.startDate, this.endDate)
                break;
                case "end-date" : 
                    this.endDate = getSelectedDate();
                    this.checkIsDateReady(this.startDate, this.endDate)
                break;
                case "start-time" :
                    this.startPlace = e.target.value;
                break;
                case "end-time" :
                    this.startPlace = e.target.value;
                break;
                case "pickup-location" :
                    this.startPlace = e.target.value;
                break;
                case "delivery-location" :
                    this.startPlace = e.target.value;
                break;
            }
        }

    stepZeroUpdate(){
        const inputsParent = document.querySelector(".booking-section__data-wrap");        
        inputsParent.removeEventListener("change", this.handleDateChange);
        inputsParent.addEventListener("change", this.handleDateChange);
    }

    stepOneUpdate(){
        const inputsParent = document.querySelector('[data-content="options"]');
        inputsParent.removeEventListener("change", this.handleOptionChange)
        inputsParent.addEventListener("change", this.handleOptionChange)
    }

    stepTwoUpdate(){
        const inputsParent = document.querySelector(".extras");
        inputsParent.removeEventListener("change", this.boundHandleEquipementchange);
        inputsParent.addEventListener("change", this.boundHandleEquipementchange);
    }

    stepThreeUpdate(){
        this.calcFinalPrice(this.bookingData);
    }

    checkStep(step){
        let actualStep = step;
        this.bookingData.carPrice = this.carPrice;
        
        switch(actualStep){
            case 0:
                this.stepZeroUpdate();
                break;
            case 1:
                this.stepOneUpdate();
                break;
            case 2:
                this.stepTwoUpdate();
                break;
            case 3:
                this.stepThreeUpdate();
                break;
        }
        // console.log(this.bookingData);
    }
}