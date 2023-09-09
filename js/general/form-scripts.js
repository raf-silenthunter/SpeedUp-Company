export class FormValidation{
    constructor(form){
        this.form = form;
        this.allInputs = Array.from(form.elements).filter((el) => el.tagName === "INPUT");
        
        this.validationData = {
            inputName: null,
            inputPhone: null,
            inputMessage: null,
            inputEmail: null,
        }

        this.form.reset();
    }

    init(){
        this.form.addEventListener("change", (e) => this.handleInputChange(e));

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validateInputs();
        });
    }

    baseValidation(value, message, placement, data){
        if(value === ""){
            const errorMessage = message;
            this.setError(placement, errorMessage, true, "inputName");
        } else {
            this.validationData[data] = "true";
            this.setSuccess(placement);   
        }
    }

    validateEmail(inputValue) {
        return String(inputValue)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    checkValidationData(){
        this.isDataCorrect = Object.values(this.validationData).every((info)=> info === "true");
    }

    handleInputChange(e){
        const inputId = e.target.id;
        const inputValue = e.target.value.trim();

        switch(inputId){
            case "name": 
            this.baseValidation(inputValue, "Provide your name", this.form.name, "inputName");
                break;
            case "surname":
                break;
            case "phone":
                if(inputValue){
                    const inputValueReduced = inputValue.split(/[ ;-]/).join("");
                    const phoneno = /^\d{9}$/;
                    if(!inputValueReduced.match(phoneno)) {
                        const errorMessage = "Provide 9 numbers phone";
                        this.setError(this.form.phone, errorMessage, true, "inputPhone");
                    } else {
                        this.validationData.inputPhone = "true";
                        this.setSuccess(this.form.phone);
                    }
                } else {
                    const errorMessage = "Insert phone number";
                    this.setError(this.form.phone, errorMessage, true, "inputPhone");
                }
                break;
            case "email":
                if(this.validateEmail(inputValue)){
                    this.validationData.inputEmail = "true";
                    this.setSuccess(this.form.email);
                } else {
                    const errorMessage = "Wrong e-mail adress";                  
                    this.setError(this.form.email, errorMessage, true,"inputEmail");
                }
                break;  
            case "message":
                this.baseValidation(inputValue, "Please, tell us what do you need", this.form.message, "inputMessage");
                break;
        }
    }

    setError(element, msg, use, inputStatus){
        const inputParent = element.parentElement;
        const errorDisplay = inputParent.querySelector(".input-control__error-info");
        if(use) this.validationData[inputStatus] = null;  

        errorDisplay.innerHTML = msg;
        errorDisplay.classList.add("error-info");
        element.classList.add("input--error");
        element.classList.remove("input--success");
    }

    setSuccess(element){
        const inputParent = element.parentElement;
        const errorDisplay = inputParent.querySelector(".input-control__error-info");

        errorDisplay.innerHTML = "";
        element.classList.remove("input--error");
        element.classList.add("input--success");
    }

    cleanValidationData(){
        for(const key in this.validationData){
            this.validationData[key] = null;
        }
    }

    showSuccessMsg(){
    const messageElement = document.querySelector(".success-msg");
    messageElement.classList.add("success-msg--active");
        
        setTimeout(()=> {
            messageElement.classList.remove("success-msg--active");
            this.allInputs.forEach((input)=> {
                input.classList.remove("input--success");
            })
        }, 2000)
    }

    validateInputs(){
        this.checkValidationData()
        if(this.isDataCorrect) {
            this.form.reset();
            this.showSuccessMsg();
            this.cleanValidationData();
        } else {
            const emptyInputs = this.allInputs.filter((input) => input.value.trim() === "");
            emptyInputs.forEach((input) => {
                if(input.id !== "surname") this.setError(input, "insert value!", false);
            })
        }
    }
}