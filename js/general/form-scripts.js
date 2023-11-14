export class FormValidation{
    constructor(form, optionalInputs, successElement){
        //in second parameter put in Array inputName that is not used in form instance
        //important! check inputs for data-info in HTML, and delete them if not needed
        this.form = form;
        this.allInputs = Array.from(form.elements).filter((el) => el.tagName === "INPUT");
        this.successInfoPlaceholder = successElement;
        
        this.validationData = {
            inputName: null,
            inputSurname: null,
            inputPhone: null,
            inputMessage: null,
            inputEmail: null,
        }

        this.setOptionalInputs(optionalInputs);
        this.form.reset();
    }

    init(){
        this.form.addEventListener("change", (e) => this.handleInputChange(e));
        document.addEventListener("DOMContentLoaded", () => this.handlePlaceholderChange())
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validateInputs();
        });
    }

    handlePlaceholderChange() {
    this.form.addEventListener("focusin", (e) => {
        if (e.target.tagName === "INPUT") {
            this.input = e.target;
            this.placeholder = this.input.getAttribute("placeholder"); // Przechowuj placeholder aktualnego inputa
            this.input.placeholder = "";
        }
    }, true);
// do tego wrócić i do rozmowy z chatem i spisać do nauki!!!
    this.form.addEventListener("blur", (e) => {
        if (e.target.tagName === "INPUT") {
            e.target.placeholder = this.placeholder; // Przywróć placeholder dla tego konkretnego inputa
        }
    }, true);
}

    setOptionalInputs(inputs){
        if(inputs.length === 0) console.log("no optional inputs");
        else if(!Array.isArray(inputs)) console.log('wrong type of inputs provided. It is not an Array!');
        else inputs.map((input) => delete this.validationData[input]);
    }

    baseValidation(value, message, placement, data){
        //value = value inserted in input; message = error message to display; 
        //placement = location where to set error-info class
        //data = indicate which data part should update for validation process
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
        this.isDataCorrect = Object.values(this.validationData).every((value) => value === "true");
    }

    handleInputChange(e){
        const inputId = e.target.id;
        const inputValue = e.target.value.trim();

    if(e.target.getAttribute("data-info") === "required") {
        switch(inputId){
                case "name": 
                    this.baseValidation(inputValue, "Provide your name", this.form.name, "inputName");
                    break;
                case "surname":
                    this.baseValidation(inputValue, "Provide your surname", this.form.surname, "inputSurname");
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
    }

    setError(element, msg, setErrorForInput, inputStatus){
        const inputParent = element.parentElement;
        const errorDisplay = inputParent.querySelector(".input-control__error-info");
        if(setErrorForInput) this.validationData[inputStatus] = null;  

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
        console.log(this.successInfoPlaceholder);
        if(!this.successInfoPlaceholder) console.log("error - no input provided");
        this.successInfoPlaceholder.classList.add("success-msg--active");
        
        setTimeout(()=> {
            this.successInfoPlaceholder.classList.remove("success-msg--active");
            this.allInputs.forEach((input)=> {
                input.classList.remove("input--success");
            })
        }, 2000)
    }

    validateInputs(){
        this.checkValidationData();
        if(this.isDataCorrect) {
            this.form.reset();
            this.showSuccessMsg();
            this.cleanValidationData();
        } else {
            const emptyInputs = this.allInputs.filter((input) => input.value.trim() === "");
            emptyInputs.forEach((input) => {
                if(input.getAttribute("data-info") === "required") this.setError(input, "insert value!", false);
            })
        }
    }
}