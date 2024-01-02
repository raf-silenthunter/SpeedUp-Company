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
        this.elements = {
            scrollWrap: document.querySelector(".hidden-scroll-wrap"),
            body: document.querySelector("body"),
            btnClose: document.querySelector(".hidden-scroll-wrap__btn-close"),
        }
        //komposition: passed here three external classes to use their methods
        this.dataBase = dataBase;
        this.updatedDataBase = {};
        //local database desined to commit info to other Classes
        this.stickyMenu = stickyMenu;
        this.scrollBtn = scrollBtn;
        this.stepsHandler = stepsHandler;
        //not adding btnClose to the same event handler
        this.elements.btnClose.addEventListener("click", (e) => this.closeModal(e));
    }

    init(bookingParent){
        bookingParent.addEventListener("click", (e) => this.handleModal(e))
    }
    //loading of cars data into users's interface
    loadData(carDataObject){
        const {
            carName : model = "brak",
            carEngine : engine = "brak",
            carPrice : price = "brak",
            carImg : img = "brak",
            carEquipement : equipement = "brak"
        } = carDataObject;
        //local database update
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

    handleScrollContextChange = () =>{
        this.elements.scrollWrap.classList.toggle("not-hidden-scroll-wrap");
        this.elements.body.classList.toggle("stop-scroll");
    }

    openModal(e){
        e.stopPropagation();
        this.handleScrollContextChange();
        const scrollableContent = document.querySelector(".booking-panel");
        this.stickyMenu.init(scrollableContent);
        this.scrollBtn.removeBtn();
    }

    closeModal(e){
        e.stopPropagation();
        this.stickyMenu.init(window);
        this.scrollBtn.visible = true;
        this.handleScrollContextChange();
        this.stepsHandler.bookingModalCalc.resetChosenValues();
        if(this.stepsHandler.bookingModalCalc.errorInfoInput) this.stepsHandler.bookingModalCalc.errorInfoInput.textContent = "";
    }  
}

export class StepsHandler{
    constructor(){
        this.elements = {
            stepsElemsParent: document.querySelector(".booking-panel"),
            stepsElems: [...document.querySelectorAll(".booking-section")],
        }
        this.step = 0;
        //external Class invoking in order to use external methods
        this.bookingModalCalc = new BookingModalCalc(importedOrderData);

        this.buttonControls = [...document.querySelectorAll(".booking-section__btn-controls")];
        this.buttonControls.forEach(controls => {
            controls.addEventListener("click", (e) => this.changeSection(e))
        }) 
    }

    resetTextInputs(){
        const textInputs = this.elements.stepsElemsParent.querySelectorAll('input[type="text"]');
        textInputs.forEach(input => input.value = '');
    }

    resetSelectInputs(){
        const selectElements = this.elements.stepsElemsParent.querySelectorAll('select')
        selectElements.forEach(select => select.selectedIndex = 0);
    }

    resetRadioInputs(){
        const radioInputs = this.elements.stepsElemsParent.querySelectorAll('input[type="radio"]');
        radioInputs[0].checked = 1;
    }

    resetCheckboxInputs(){
        const checkboxInputs = this.elements.stepsElemsParent.querySelectorAll('input[type="checkbox"]');
        checkboxInputs.forEach(box => box.checked = 0);
    }

    resetHandler(){
        this.resetTextInputs();
        this.resetSelectInputs();
        this.resetRadioInputs();
        this.resetCheckboxInputs();
    }

    updateVisibilityOfSections(step){
        this.elements.stepsElems.forEach((elem, index) => {
            if (index === step) {
                elem.classList.add("visible");
                elem.classList.remove("not-visible-section");
            } else {
                elem.classList.remove("visible");
                elem.classList.add("not-visible-section");
            }
        });
}

    scrollToControls(stepSection){
        const wrapHeight = Math.floor(this.elements.stepsElemsParent.scrollHeight);
        const sectionPositionSetbackHeight = 275;
        // sectionPositionSetbackHeight is used to adjust the scroll position.
        // subtracts a constant value from the calculated scroll position to ensure that the 
        // section of the form is not scrolled too high or too low on the screen,
        // which improves the visibility and accessibility of the user interface.
        const sectionHeight = stepSection.offsetHeight;
        const scrollValue = wrapHeight - sectionHeight - sectionPositionSetbackHeight;
        this.elements.stepsElemsParent.scrollTo({
            top: scrollValue,
            behavior: "smooth",
        })
    }

    changeStep(step){
        this.updateVisibilityOfSections(step);
        if(step !== 0) this.scrollToControls(this.elements.stepsElems[step]);
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

    init(carPrice){
        this.step = 0;
        this.changeStep(this.step);
        datePickerInit();
        //set car price from external database
        this.bookingModalCalc.carPrice = carPrice;
        //create database for equipment chosen by the user
        this.bookingModalCalc.bookingData.equipementIds = [];
        this.bookingModalCalc.handleStep(this.step);
        this.resetHandler();
    }
}

export class BookingModalCalc{
    constructor(data){
        this.carPrice = null; //carPrice is submited by StepsHandler init() method. This value comes from checkData method in BookingModal Class
        const {options, equipement} = data; //fetching data - how to do it async?
        this.optionPrices = options; //coming from constructor
        this.equipementPrices = equipement; //coming from constructor

        this.bookingData = {
            days: null,
            optionName: "basic", //basic option is set by default so if user will not change it price from basic option will be submitted
            equipementIds: [], //user doesn't need to chose any add-on so we can have empty array here
            carPrice : this.carPrice,
        }

        this.boundHandleEquipementchange = this.handleEquipementchange;
        this.boundOptionchange = this.handleOptionChange;
        this.boundDatechange = this.handleDateChange;
        //bounding a reference to the function so I can make sure that I have only one event, and function is invoked only once

        this.startDate = null;
        this.endDate = null;
        this.startPlace = "Kraków ul. Hoyera 1"; //default value
        this.endPlace = "Kraków ul. Hoyera 1"; //default value
        this.startHour = "9"; //default value
        this.endHour = "9"; //default value

        this.errorInfoInput;
    }

    resetChosenValues(){
        this.startDate = null;
        this.endDate = null;
        this.startPlace = "Kraków ul. Hoyera 1";
        this.endPlace = "Kraków ul. Hoyera 1";
        this.startHour = "9";
        this.endHour = "9";
        this.bookingData.optionName = "basic";
    }

    calcFinalPrice(updatedOrderData){
        const {days, optionName, equipementIds, carPrice} = updatedOrderData;        
        const priceForOption = this.optionPrices[optionName];

        const getEquipementPrices = () => {
            if (!equipementIds || equipementIds.length === 0) {
                console.log('no equipment chosen');
                return 0; //no equipment chosen - this is not an error!
            }
            else return equipementIds
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
                //co robi powyższy kod!!!
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
            this.bookingData.equipementIds.push(chosenOption);
        } else if(e.target.type === "checkbox" && !e.target.checked){
            const newArray = this.bookingData.equipementIds.filter((element)=> element !== chosenOption);
            //we need to update an array while user delete chosen option. This is the simpliest way
            this.bookingData.equipementIds = newArray;
        } else console.log("no option in step two has been chosen");
    }

    handleOptionChange = (e) => {
            const chosenOption = e.target.id;
            if(e.target.type === "radio" && e.target.checked) this.bookingData.optionName = chosenOption;
            else console.log('problem with option');
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

    parseEqupiementIdIntoTitles(){
        //every equipement element in HTML has its own id thats connects it with local database
        const chosenEquipementIds = this.bookingData.equipementIds;
        if(chosenEquipementIds.length !== 0){
            const chosenEquipementTitlesArr = [];
            chosenEquipementIds.forEach((id) => {
                const equipementElement = document.getElementById(id);
                const equipementElementTitle = equipementElement.nextElementSibling.querySelector("h4").textContent;
                chosenEquipementTitlesArr.push(equipementElementTitle);
            })
            const equipementTitlesWithComma = chosenEquipementTitlesArr.join(", ")
            return equipementTitlesWithComma;
        } else {
            return "NONE";
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

    removeEvent(eventTarget, eventType, eventFunction){
        eventTarget.removeEventListener(eventType, eventFunction);
    }

    handleStepZero(eventHook){
        eventHook.addEventListener("change", this.boundDatechange);
    }

    handleStepOne(eventHook){
        eventHook.addEventListener("change", this.boundOptionchange);
    }

    handleStepTwo(eventHook){
        eventHook.addEventListener("change", this.boundHandleEquipementchange);
    }

    updateLabelContent(label, content){
        if(label) label.textContent = content;
    }

    handleStepThree(){
        const labels = {
            carLabel: document.querySelector('[data-order="car"]'),
            datesLabel: document.querySelector('[data-order="date-range"]'),
            daysLabel: document.querySelector('[data-order="days"]'),
            insuranceLabel: document.querySelector('[data-order="option"]'),
            pickupPlaceLabel: document.querySelector('[data-order="pickup-loc"]'),
            returnPlaceLabel: document.querySelector('[data-order="return-loc"]'),
            pickupTimeLabel: document.querySelector('[data-order="pickup-tim"]'),
            returnTimeLabel: document.querySelector('[data-order="return-tim"]'),
            extrasLabel: document.querySelector('[data-order="extras"]'),
            priceLabel: document.querySelector('[data-order="price-full"]'),
        }

        this.updateLabelContent(labels.carLabel, document.querySelector('[data-info="car-model"]').textContent);
        this.updateLabelContent(labels.datesLabel, `${this.parseDate(this.startDate)} to ${this.parseDate(this.endDate)}`);
        this.updateLabelContent(labels.daysLabel, this.bookingData.days);
        this.updateLabelContent(labels.insuranceLabel, this.bookingData.optionName);
        this.updateLabelContent(labels.pickupPlaceLabel, this.startPlace);
        this.updateLabelContent(labels.returnPlaceLabel, this.endPlace);
        this.updateLabelContent(labels.pickupTimeLabel, `${this.startHour}:00`);
        this.updateLabelContent(labels.returnTimeLabel, `${this.endHour}:00`);
        this.updateLabelContent(labels.extrasLabel, this.parseEqupiementIdIntoTitles());
        this.updateLabelContent(labels.priceLabel, `${this.calcFinalPrice(this.bookingData)} pln`);
    }

    checkIfcanGoIntoNextStep(step = 0){
        this.errorInfoInput = document.querySelector(`[data-info="step-${step}"]`);
        let status = false;
        switch(step){
            case 0:
                if((this.startDate === null || this.endDate === null) || (this.startDate === undefined || this.endDate === undefined)){
                    this.errorInfoInput.textContent = "Chose pickup and delivery date!";
                    status = false;
                    console.log('date has not been chosen!');
                } 
                else if(this.startDate > this.endDate){
                    this.errorInfoInput.textContent = "Delivery date can't be earlier than pickup date!";
                    status = false;
                    console.log('date has not been chosen!');
                } 
                else {
                    this.errorInfoInput.textContent = "";
                    status = true;
                }
            break;
            case 1:
                this.optionInputsArr = [...document.querySelectorAll('[data-name="option-group"]')];
                if(this.optionInputsArr.some((input) => input.checked)) status = true;
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

    removeBookingEvents(dataHook, optionHook, extrasHook){
        this.removeEvent(dataHook, "change", this.boundDatechange);
        this.removeEvent(optionHook, "change", this.boundOptionchange);
        this.removeEvent(extrasHook, "change", this.boundHandleEquipementchange);
    }

    handleStep(step){
        let actualStep = step;
        const stepsEventsHooks = {
            dataEventHook: document.querySelector(".booking-section__data-wrap"),
            optionEventHook: document.querySelector('[data-content="options"]'),
            extrasEventHook: document.querySelector(".extras"),
        }
        
        this.removeBookingEvents(stepsEventsHooks.dataEventHook, stepsEventsHooks.optionEventHook, stepsEventsHooks.extrasEventHook);
        //this function deletes all events hooked to specific section of modal
        switch(actualStep){
            case 0:
                this.bookingData.carPrice = this.carPrice;
                this.handleStepZero(stepsEventsHooks.dataEventHook);
                break;
            case 1:
                this.handleStepOne(stepsEventsHooks.optionEventHook);
                break;
            case 2:
                this.handleStepTwo(stepsEventsHooks.extrasEventHook);
                break;
            case 3:
                this.handleStepThree();
            break;
        }
    }
}