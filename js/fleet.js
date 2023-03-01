// DROPDOWN MENU FN 
const dropDownBtn = document.querySelector(".main-nav__hamburger-btn");
const dropDownMenu = document.querySelector(".list");
const mainNav = document.querySelector(".main-nav");

dropDownBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle("list--is-visible");
    mainNav.classList.toggle("main-nav--is-dropdown");
})


// STICKY MENU FN
const nav = document.querySelector(".main-nav");
const scrollVAlue = 100;  
window.addEventListener("wheel", () => {
    //to trzeba przerobić
    let scrollPosition = window.scrollY;
    nav.classList.toggle("is-sticky", scrollPosition >= scrollVAlue);
})

// OPEN/CLOSE LOGIN MODAL FNs 

const modalBtnsElements = document.querySelectorAll(".main-nav__sign-btn, .btn-close");
const modalBtns = [...modalBtnsElements];
const loginModal = document.querySelector(".login-modal");

const checkModalBtn = (e) => {
    if (e.target.matches('.main-nav__sign-icon, .main-nav__sign-btn, .main-nav__sign-btn--lash, .main-nav__call-to-action')) return "open";
    else if (e.target.matches(".btn-close__icon, .login-modal__btn-close, .btn-close, .btn-close__icon--is-rotated")) return "close";
    else console.error("wrong element clicked or does not contain proper class!");
}

const changeModalState = (e) => {
    let clickedBtn = checkModalBtn(e);
    loginModal.classList.toggle("visible", clickedBtn === "open");
}

modalBtns.forEach((btn)=> {
    btn.addEventListener("click", changeModalState);
});

//ACCORDEON FUNCTION

const accordeonContainer = document.querySelector(".accordeon");
const accordeonPanels = [...document.querySelectorAll(".accordeon__panel")];
const accordeonInfo = [...document.querySelectorAll(".accordeon__info")];
let panelToCollapseIndex = null;

const setAttrforArr = (arr, attr) => arr.forEach((arrElement, index) => arrElement.setAttribute(`${attr}`, index));

const checkParentHasAttr = (target) => {
    let checkedElem = target;
    while(checkedElem && !checkedElem.hasAttribute("data-key")) checkedElem = checkedElem.parentElement;
    return checkedElem.dataset.key;
}

accordeonContainer.addEventListener("click", (e) => {
    const clickedElem = e.target;
    if(!clickedElem.matches(".accordeon__panel, .accordeon__title, .accordeon__icon")) return;
        
    setAttrforArr(accordeonPanels, "data-key");

    panelToCollapseIndex = checkParentHasAttr(clickedElem);
    const currentInfoPanel = accordeonInfo[panelToCollapseIndex];
    const isCollapsed = currentInfoPanel.classList.contains("accordeon__info--visible");

    if(!isCollapsed){
        accordeonInfo.forEach(info => info.classList.remove("accordeon__info--visible"));
        currentInfoPanel.classList.add("accordeon__info--visible");
    } else {
        currentInfoPanel.classList.remove("accordeon__info--visible");
    }
});