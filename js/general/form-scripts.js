export class FormValidation{
    constructor(form, name, surname, email, phone, message){
        this.nameInput = name;
        this.surnameInput = surname;
        this.emailInput = email;
        this.phoneInput = phone;
        this.messageInput = message;
        
        const allArguments = [...arguments];
        allArguments.splice(0,1);
        //form is always first. Add inputs at the end as arguments
        this.allInputs = allArguments;
        console.log(this.allInputs);
        //insert necessary inputs below
        this.validationData = {
            inputName: null,
            inputPhone: null,
            inputMessage: null,
            inputEmail: null,
        }

        this.dataSuccess = false;

        this.cleanInputs();
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validateInputs();
        });
    }

    cleanInputs(){
        this.allInputs.forEach(input => input.value = "");
    }

    setError(element, msg){
        const inputParent = element.parentElement;
        const errorDisplay = inputParent.querySelector(".input-control__error-info");

        errorDisplay.innerHTML = msg;
        errorDisplay.classList.add("contact__form-input--error-info");
        element.classList.add("contact__form-input--error");
    }

    setSuccess(element){
        const inputParent = element.parentElement;
        const errorDisplay = inputParent.querySelector(".input-control__error-info");
        //dodać ifa - nie powinno zawsze resetować
        errorDisplay.innerHTML = "";
        element.classList.remove("contact__form-input--error");
        element.classList.add("contact__form-input--success");
        //sprawdzić czy toggle przyjmie 2 klasy i jak to działa
    }

    cleanValidationData(){
        for(const key in this.validationData){
            this.validationData[key] = null;
        }
    }

    checkValidationData(){
        for(const key in this.validationData){
                if(this.validationData[key] === null) {
                    this.dataSuccess = false;
                    break;
                }
                else this.dataSuccess = true;
            }
    }

    showSuccessMsg(){
        const messageElement = document.querySelector(".success-msg");
        messageElement.classList.add("success-msg--active");
        setTimeout(()=> {
            messageElement.classList.remove("success-msg--active");
            this.allInputs.forEach((input)=> {
                input.classList.remove("contact__form-input--success");
            })
        }, 2000)
    }

    validateInputs(){
        const nameValue = this.nameInput.value.trim();
        const emailValue = this.emailInput.value.trim();
        const phoneValue = this.phoneInput.value.trim();
        const messageValue = this.messageInput.value.trim();

        //username validation
        if(nameValue === ""){
            const errorMessage = "Provide your name";
            this.setError(this.nameInput, errorMessage);
        } else {
            this.validationData.inputName = "true";
            this.setSuccess(this.nameInput);   
        }
        //phone validation
        if(phoneValue){
            const phoneno = /^\d{9}$/;
            if(!phoneValue.match(phoneno)) {
                const errorMessage = "Provide 9 numbers phone";
                this.setError(this.phoneInput, errorMessage);
            } else {
                this.validationData.inputPhone = "true";
                this.setSuccess(this.phoneInput);
            }
        } else {
            const errorMessage = "Insert phone number";
            this.setError(this.phoneInput, errorMessage);
        }
        //message validation
        if(messageValue === ""){
            const errorMessage = "Please, tell us what do you need";
            this.setError(this.messageInput, errorMessage);
        } else {
            this.validationData.inputMessage = "true";
            this.setSuccess(this.messageInput);   
        }
        //email validation
        const validateEmail = (value) => {
        return String(value)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        }
        const isEmailValid = validateEmail(emailValue);

        if(!isEmailValid){
            const errorMessage = "Wrong e-mail adress";
            this.setError(this.emailInput, errorMessage);
        } else {
            this.validationData.inputEmail = "true";
            this.setSuccess(this.emailInput);
        }
        //data check and submit
        this.checkValidationData();
        this.cleanValidationData();
        if(this.dataSuccess) {
            this.cleanInputs();
            this.showSuccessMsg();
        }
        else return;
    }
}