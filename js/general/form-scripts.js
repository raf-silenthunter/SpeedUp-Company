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

        // this.dataSuccess = false;

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
        // for(const key in this.validationData){
        //         if(this.validationData[key] === null) {
        //             this.dataSuccess = false;
        //             break;
        //         }
        //         else this.dataSuccess = true;
        // }
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
        const nameValue = this.form.name.value.trim();
        const emailValue = this.form.email.value.trim();
        const phoneValue = this.form.phone.value.trim();
        const messageValue = this.form.message.value.trim();

        //username validation
        if(nameValue === ""){
            const errorMessage = "Provide your name";
            this.setError(this.form.name, errorMessage);
        } else {
            this.validationData.inputName = "true";
            this.setSuccess(this.form.name);   
        }
        //phone validation
        if(phoneValue){
            const phoneno = /^\d{9}$/;
            if(!phoneValue.match(phoneno)) {
                const errorMessage = "Provide 9 numbers phone";
                this.setError(this.form.phone, errorMessage);
            } else {
                this.validationData.inputPhone = "true";
                this.setSuccess(this.form.phone);
            }
        } else {
            const errorMessage = "Insert phone number";
            this.setError(this.form.phone, errorMessage);
        }
        //message validation
        if(messageValue === ""){
            const errorMessage = "Please, tell us what do you need";
            this.setError(this.form.message, errorMessage);
        } else {
            this.validationData.inputMessage = "true";
            this.setSuccess(this.form.message);   
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
            this.setError(this.form.email, errorMessage);
        } else {
            this.validationData.inputEmail = "true";
            this.setSuccess(this.form.email);
        }
        //data check and submit
        this.checkValidationData();
        this.cleanValidationData();
        if(this.isDataCorrect) {
            this.cleanInputs();
            this.showSuccessMsg();
        }
        else return;
    }
}