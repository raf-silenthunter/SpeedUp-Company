export class StickyNav {
    constructor(){
        this.nav = document.querySelector(".main-nav");
        this.scrollVAlue = 100;  
    }

    toggleNav(){
        let scrollPosition = window.scrollY;
        this.nav.classList.toggle("is-sticky", scrollPosition >= this.scrollVAlue);
    }
}

export class ShowMobileNav {
    constructor() {
        this.mobileMenuBtn = document.querySelector(".main-nav__hamburger-btn");
        this.mobileMenuList = document.querySelector(".list");
        this.mainNav = document.querySelector(".main-nav");  
    }

    showNav() {
        this.mobileMenuList.classList.toggle("list--is-visible");
        this.mainNav.classList.toggle("main-nav--is-dropdown");
    }
}

export class DropdownNav {
    constructor(){
        this.dropdownBtn = document.querySelector(".dropdown");
        this.dropdownList = document.querySelector(".dropdown__list");
        this.dropdownItems = [...document.querySelectorAll(".dropdown__item")];
        this.dropdownLinks = [...document.querySelectorAll(".dropdown__link")];
    }

    slowDropDownList(){
        let showItemTime = 0;
        this.dropdownItems.forEach(item => {
                setTimeout(() => {
                item.classList.add("dropdown__item--is-dropdown");
            }, showItemTime)
            showItemTime += 500;
        })
    }

    stopPropagation(){
        this.dropdownLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.stopPropagation(e);
            })
        })    
    }

    dropdownNav(e){
        e.preventDefault();
        this.dropdownBtn.classList.toggle("dropdown--is-checked");
        const isListdropDown = this.dropdownList.classList.contains("dropdown__list--is-dropdown");
        this.slowDropDownList();
        if(!isListdropDown){
            this.dropdownList.classList.add("dropdown__list--is-dropdown");
        } else {
            const dropDownItem = document.querySelector(".dropdown__item");
            const isItemInView = dropDownItem.classList.contains("dropdown__item--is-dropdown");
            if(isItemInView) this.dropdownList.classList.remove("dropdown__list--is-dropdown");
            else return;
        }
    }
}

export class OpenModal{
    constructor(){
        this.modalBtnsElements = document.querySelectorAll(".main-nav__sign-btn, .btn-close");
        this.modalBtns = [...this.modalBtnsElements];
        this.loginModal = document.querySelector(".modal");
    }

    checkModalBtn = (e) => {
        if (e.target.matches('.main-nav__sign-icon, .main-nav__sign-btn, .main-nav__sign-btn--lash, .main-nav__call-to-action')) return "open";
        else if (e.target.matches(".btn-close__icon, .modal__btn-close, .btn-close, .btn-close__icon--is-rotated")) return "close";
        else console.error("wrong element clicked or does not contain proper class!");
    }

    changeModalState = (e) => {
        let clickedBtn = this.checkModalBtn(e);
        this.loginModal.classList.toggle("visible", clickedBtn === "open");
    }
}