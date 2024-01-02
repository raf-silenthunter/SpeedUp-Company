export class StickyNav {
    constructor(scrollContent){
        this.nav = document.querySelector(".main-nav");
        this.scrollValue = 100;  
        this.scrollPosition = this.checkScrollState(scrollContent);  
    }

    checkScrollState(scrollContent){
        return scrollContent === window ? window.scrollY : scrollContent.scrollTop;
    }

    toggleStickyNav(scrollContent){
        this.scrollPosition = this.checkScrollState(scrollContent);
        this.nav.classList.toggle("is-sticky", this.scrollPosition >= this.scrollValue);
    }

    init(scrollContent = window){
        const initPosition = this.checkScrollState(scrollContent);
        initPosition <= this.scrollValue ? this.nav.classList.remove("is-sticky") : this.nav.classList.add("is-sticky");
        scrollContent.addEventListener("scroll", () => this.toggleStickyNav(scrollContent))
    }
}

export class ShowMobileNav {
    constructor() {
        this.elements = {
            body: document.querySelector("body"),
            mobileMenuBtn: document.querySelector(".main-nav__hamburger-btn"),
            mobileMenuList: document.querySelector(".list"),
            mainNav: document.querySelector(".main-nav"),  
        }

        this.bodyScrollActive = true; //indicartes if there is overflow:hidden/stop scroll on body
    }

    handleBodyScroll(){
        const bookingPanelActive = document.querySelector(".not-hidden-scroll-wrap");
        const modalActive = document.querySelector(".visible");
        if(this.bodyScrollActive) {
            this.elements.body.classList.add("stop-scroll");
            this.bodyScrollActive = false;
        } else {
            //if bookign panel is active then there already is no scroll on body

            if(!bookingPanelActive || !modalActive) {
                this.elements.body.classList.remove("stop-scroll");
                //remove only when there is no booking panel
                //booking panel can handle scroll so there is no need
                //to update scroll in every situation
            }
            this.bodyScrollActive = true;
        }
    }

    showNav() {
        this.elements.mobileMenuList.classList.toggle("list--is-visible");
        this.elements.mainNav.classList.toggle("main-nav--is-dropdown");
        this.handleBodyScroll();

        //hide dynamic border when you use mobile nav
        this.dynamicBorder = document.querySelector(".dynamic-border");
        if(this.dynamicBorder){
            this.elements.mobileMenuList.classList.contains("list--is-visible") ? this.dynamicBorder.style.display = "none" : this.dynamicBorder.style.display = "block";
        } else console.log('no dynamic border detected');
    }
}

export class DropdownNav {
    constructor(){
        this.elements = {
            dropdownBtn: document.querySelector(".dropdown"),
            dropdownList: document.querySelector(".dropdown__list"),
            dropdownItems: [...document.querySelectorAll(".dropdown__item")],
            dropdownLinks: [...document.querySelectorAll(".dropdown__link")],
        };
    }

    slowDropDownList(){
        let showItemTime = 0;
        this.elements.dropdownItems.forEach(item => {
                setTimeout(() => {
                item.classList.add("dropdown__item--is-dropdown");
            }, showItemTime)
            showItemTime += 500;
        })
    }

    stopPropagation(){
        this.elements.dropdownLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.stopPropagation(e);
            })
        })    
    }

    dropdownNav(e){
        e.preventDefault();
        const isListDropDown = this.elements.dropdownList.classList.contains("dropdown__list--is-dropdown");

        this.elements.dropdownBtn.classList.toggle("dropdown--is-checked");
        this.slowDropDownList();
        if(!isListDropDown){
            this.elements.dropdownList.classList.add("dropdown__list--is-dropdown");
        } else {
            const dropDownItem = document.querySelector(".dropdown__item");
            const isItemInView = dropDownItem.classList.contains("dropdown__item--is-dropdown");
            if(isItemInView) this.elements.dropdownList.classList.remove("dropdown__list--is-dropdown");
            else return;
        }
    }
}

export class OpenModal{
    constructor(){
        const modalBtnsElements = document.querySelectorAll(".main-nav__sign-btn, .btn-close");
        this.elements = {
            modalBtnsElements: modalBtnsElements,
            modalBtns: [...modalBtnsElements],
            loginModal: document.querySelector(".modal"),
            body: document.querySelector("body"),
        }
    }

    checkModalBtn = (e) => {
        if (e.target.matches('.main-nav__sign-icon, .main-nav__sign-btn, .main-nav__sign-btn--lash, .main-nav__call-to-action')) return "open";
        else if (e.target.matches(".btn-close__icon, .modal__btn-close, .btn-close, .btn-close__icon--is-rotated")) return "close";
        else console.error("wrong element clicked or does not contain proper class!");
    }

    changeModalState = (e) => {
        let clickedBtn = this.checkModalBtn(e);
        const isMainNavActive = document.querySelector(".main-nav--is-dropdown");
        this.elements.loginModal.classList.toggle("visible", clickedBtn === "open");
        //you always need to check whether main nav is open, because OpenModal and ShowMobileNav Class
        //they both add a stop-scroll on body. You need to detect that, so it won't be doubled
        if(clickedBtn === "open"){
            this.elements.body.classList.add("stop-scroll")
        } else if (clickedBtn === "close"){
            if(!isMainNavActive){
                this.elements.body.classList.remove("stop-scroll");
            }
        }
    }
}