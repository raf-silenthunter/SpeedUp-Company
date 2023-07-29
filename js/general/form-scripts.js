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
        
        this.allInputs.forEach((input) => {
            input.addEventListener("change", (e) => {
                this.checkInput(e);
            })
        })

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validateInputs();
        });
    }

    checkInput(e){
        const inputId = e.target.id;
        const inputValue = e.target.value.trim();
        const validateEmail = (inputValue) => {
                return String(inputValue)
                    .toLowerCase()
                    .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                }

        const isEmailValid = validateEmail(inputValue);

        switch(inputId){
            case "name": 
                if(inputValue === ""){
                    const errorMessage = "Provide your name";
                    this.setError(this.form.name, errorMessage, true, "inputName");
                } else {
                    this.validationData.inputName = "true";
                    this.setSuccess(this.form.name);   
                }
                break;
            case "surname":
                break;
            case "phone":
                if(inputValue){
                    const phoneno = /^\d{9}$/;
                    if(!inputValue.match(phoneno)) {
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
                if(isEmailValid){
                    this.validationData.inputEmail = "true";
                    this.setSuccess(this.form.email);
                } else {
                    const errorMessage = "Wrong e-mail adress";                  
                    this.setError(this.form.email, errorMessage, true,"inputEmail");
                }
                break;  
            case "message":
                if(inputValue === ""){
                    const errorMessage = "Please, tell us what do you need";
                    this.setError(this.form.message, errorMessage, true, "inputMessage");
                } else {
                    this.validationData.inputMessage = "true";
                    this.setSuccess(this.form.message);   
                }
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
    }

    setSuccess(element){
        const inputParent = element.parentElement;
        const errorDisplay = inputParent.querySelector(".input-control__error-info");
        //dodać ifa - nie powinno zawsze resetować
        errorDisplay.innerHTML = "";
        element.classList.remove("input--error");
        element.classList.add("input--success");
        //sprawdzić czy toggle przyjmie 2 klasy i jak to działa
    }

    cleanValidationData(){
        for(const key in this.validationData){
            this.validationData[key] = null;
        }
    }

    checkValidationData(){
        this.isDataCorrect = Object.values(this.validationData).every((info)=> info === "true");
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