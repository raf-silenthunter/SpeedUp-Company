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
                case "sport": img.setAttribute("src", "../../images/sport/sport-secondary-big.webp")
                    break;
                case "oldtimer": img.setAttribute("src", "../../images/oldtimer/oldtimer-secondary-image.webp")
                    break;
                case "luxury": img.setAttribute("src", "../../images/luxury/luxury-secondary-image.webp")
                    break;
                case "terrain": img.setAttribute("src", "../../images/slide-4.webp")
                    break;
                default: img.setAttribute("src", "../../images/slide-4.webp")
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
        this.btnClose = document.querySelector(".hidden-scroll-wrap__btn-close");
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
                console.log(this.scrollBtn.visible);
    }

    closeModal(e){
        e.stopPropagation();
        this.stickyMenu.init(window);
        this.scrollBtn.visible = true;
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
        const sectionPositionSetbackHeight = 275;
        const sectionHeight = stepSection.offsetHeight;
        const scrollValue = wrapHeight - sectionHeight - sectionPositionSetbackHeight;
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
            if(this.bookingModalCalc.checkIfcanGoIntoNextStep(this.step)){
                ++this.step;
                this.changeStep(this.step);
                this.bookingModalCalc.handleStep(this.step);
            }
        }
        else if(e.target.matches('[data-option="prev"]')){
            --this.step;
            this.bookingModalCalc.handleStep(this.step);
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
        this.bookingModalCalc.bookingData.equipementNames = [];
        this.bookingModalCalc.handleStep(this.step)
        this.resetHandler();
    }
}

export class BookingModalCalc{
    constructor(data){
        this.carPrice = null; //carPrice is submited by StepsHandler init() method
        const {options, equipement} = data; //fetching data - how to do it async?
        this.optionPrices = options; //coming from contructor
        this.equipementPrices = equipement; //coming from contructor

        this.bookingData = {
            days: null,
            optionName: "basic", //basic option is set by default so if user will not change it he will have proce for basic option
            equipementNames: [], //user doesn't need to chose any add-on so we can have empty array here
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
        const {days, optionName, equipementNames, carPrice} = updatedOrderData;        
        const priceForOption = this.optionPrices[optionName];

        const getEquipementPrices = () => {
            if (!equipementNames || equipementNames.length === 0) {
                return 0; //no equipment chosen
            }
            else return equipementNames
            .map(priceKey => {
                    const price = this.equipementPrices[priceKey];
                    if (typeof price === "number") {
                        return price;
                    } else {
                        console.log('this is not numer - fetching data issue!');
                        return 0;
                    }
                })
                .reduce((accum, currVal) => accum + currVal, 0);
        };    
        const summEquipementPrices = getEquipementPrices();

        const finalCarPrice = days * carPrice;
        const finalOptionPrice = priceForOption * (days/2);
        const finalEquipementPrice = summEquipementPrices * days;
        return finalCarPrice + finalOptionPrice + finalEquipementPrice;
    }

    handleEquipementchange = (e) => {
        const chosenOption = e.target.id;
        if(e.target.type === "checkbox" && e.target.checked){
            this.bookingData.equipementNames.push(chosenOption);
        } else if(e.target.type === "checkbox" && !e.target.checked){
            const newArray = this.bookingData.equipementNames.filter((element)=> element !== chosenOption);
            //we need to update an array while user delete chosen option. This is the simpliest way
            this.bookingData.equipementNames = newArray;
        } else console.log("no option in step two has been chosen");
    }

    handleOptionChange = (e) => {
            const chosenOption = e.target.id;
            if(e.target.type === "radio" && e.target.checked) this.bookingData.optionName = chosenOption;
            else console.log('proeblem with option');
        }

    checkIsDateReady = (startDate, endDate) => {
            const errorInfoInput = document.querySelector(`[data-info="step-0"]`);
            if(startDate != null && endDate != null){
                const differenceInDays = endDate - startDate;
                const firstDay = 1;
                const orderDurationInDays = Math.floor((differenceInDays / (24 * 60 * 60 * 1000)) + firstDay);
                this.bookingData.days = orderDurationInDays;
                errorInfoInput.textContent = "";
                } else {
                    console.log('set second date!', this.startDate, this.endDate);
                }
        }  

    parseDate(dateInTxt){
        const dataTxt = dateInTxt;
        const day = dataTxt.getDate();
        const month = dataTxt.getMonth() + 1;
        const year = dataTxt.getFullYear();
        return `${day}.${month}.${year}`;
    }

    parseEqupiementIdIntoTxt(){
        const chosenEquipementIds = this.bookingData.equipementNames;
        const chosenEquipementTxtsArr = [];
        chosenEquipementIds.forEach((id) => {
            const element = document.getElementById(id);
            const txtRelatedToElement = element.nextElementSibling.querySelector("h4").textContent;
            chosenEquipementTxtsArr.push(txtRelatedToElement);
        })
        const equipementTxtsAfterJoin = chosenEquipementTxtsArr.join(", ")
        return equipementTxtsAfterJoin;
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
                    this.startHour = e.target.value;
                break;
                case "end-time" :
                    this.endHour = e.target.value;
                break;
                case "pickup-location" :
                    this.startPlace = e.target.value;
                break;
                case "delivery-location" :
                    this.endPlace = e.target.value;
                break;
            }
        }

    handleStepZero(){
        const inputsParent = document.querySelector(".booking-section__data-wrap");        
        inputsParent.removeEventListener("change", this.handleDateChange);
        inputsParent.addEventListener("change", this.handleDateChange);
    }

    handleStepOne(){
        const inputsParent = document.querySelector('[data-content="options"]');
        inputsParent.removeEventListener("change", this.handleOptionChange);
        inputsParent.addEventListener("change", this.handleOptionChange);
    }

    handleStepTwo(){
        const inputsParent = document.querySelector(".extras");
        inputsParent.removeEventListener("change", this.boundHandleEquipementchange);
        inputsParent.addEventListener("change", this.boundHandleEquipementchange);
    }

    handleStepThree(){
        const carLabel = document.querySelector('[data-order="car"]');
        const datesLabel = document.querySelector('[data-order="date-range"]');
        const daysLabel = document.querySelector('[data-order="days"]');
        const insuranceLabel = document.querySelector('[data-order="option"]');
        const pickupPlaceLabel = document.querySelector('[data-order="pickup-loc"]');
        const returnPlaceLabel = document.querySelector('[data-order="return-loc"]');
        const pickupTimeLabel = document.querySelector('[data-order="pickup-tim"]');
        const returnTimeLabel = document.querySelector('[data-order="return-tim"]');
        const extrasLabel = document.querySelector('[data-order="extras"]');
        const priceLabel = document.querySelector('[data-order="price-full"]');

        carLabel.textContent = document.querySelector('[data-info="car-model"]').textContent;
        datesLabel.textContent = `${this.parseDate(this.startDate)} to ${this.parseDate(this.endDate)}`
        daysLabel.textContent = this.bookingData.days;
        insuranceLabel.textContent = this.bookingData.optionName;
        pickupPlaceLabel.textContent = this.startPlace;
        returnPlaceLabel.textContent = this.endPlace;
        pickupTimeLabel.textContent = `${this.startHour}:00`;
        returnTimeLabel.textContent = `${this.endHour}:00`;
        extrasLabel.textContent = this.parseEqupiementIdIntoTxt();
        priceLabel.textContent = `${this.calcFinalPrice(this.bookingData)} pln`;
    }

    checkIfcanGoIntoNextStep(step = 0){
        const errorInfoInput = document.querySelector(`[data-info="step-${step}"]`);
        const optionInputsArr = [...document.querySelectorAll(".booking-section__checkbox")]; 
        let status;
        switch(step){
            case 0:
                if((this.startDate === null || this.endDate === null) || (this.startDate === undefined || this.endDate === undefined)){
                    errorInfoInput.textContent = "Chose pickup and delivery date!";
                    status = false;
                    console.log('date has not been chosen!');
                } else {
                    errorInfoInput.textContent = "";
                    status = true;
                }
            break;
            case 1:
                if(optionInputsArr.some((input) => input.checked)) status = true;
                else {
                    status = false;
                    console.log('option has not been chosen!');
                }
            break;
            case 2: 
                status = true; //always true. Options in this step are optional
            break;
            case 3: 
                status = true; //always true. Eqipement in this step is optional
            break;
        }
        return status;
    }

    handleStep(step){
        let actualStep = step;
        this.bookingData.carPrice = this.carPrice;
        switch(actualStep){
            case 0:
                this.handleStepZero();
                break;
            case 1:
                this.handleStepOne();
                break;
            case 2:
                this.handleStepTwo();
                break;
            case 3:
                this.handleStepThree();
                //reset wybranych dat po przejściu do innego auta
            break;
        }
    }
}