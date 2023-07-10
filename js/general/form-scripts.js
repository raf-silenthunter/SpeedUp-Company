export class FormValidation{
    constructor(form, name, surname, email, phone, message){
        this.nameInput = name;
        this.surnameInput = surname;
        this.emailInput = email;
        this.phoneInput = phone;
        this.messageInput = message;

        this.allInputs = [this.nameInput, this.surnameInput, this.emailInput, this.phoneInput, this.messageInput];

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validateInputs();
        })
    }

    checkInputs(){
        const requiredInputs = [...document.querySelectorAll('[data-info="required"]')];
        const blankInputs = requiredInputs.filter((input) => {
            if(input.value.trim() === "") return input;
            this.setSuccess(input)
        })
        return blankInputs;
    }

    setError(element, msg){
        const inputParent = element.parentElement;
        const errorDisplay = inputParent.querySelector(".input-control--error-info");

        errorDisplay.innerHTML = msg;
        element.classList.add("input-control--error")
    }

    setSuccess(element){
        const inputParent = element.parentElement;
        const errorDisplay = inputParent.querySelector(".input-control--error-info");

        errorDisplay.innerHTML = "";
        element.classList.remove("input-control--error");
        element.classList.add("input-control--success");
    }

    validateInputs(){
        const blankInputs = this.checkInputs();
        if(blankInputs.length === 0){
            console.log('sukces');
            this.allInputs.forEach(input => input.value = "");
        }
        const errorMessage = "Provide information"; 
        blankInputs.forEach(input => {
            this.setError(input, errorMessage);
        })
    }
}