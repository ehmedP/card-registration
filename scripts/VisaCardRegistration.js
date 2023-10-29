import { VisaCard } from "./VisaCardClass.js";

export class VisaCardRegistration {
    constructor({
        fullNameInputId, fullNameOutputId, cardNumberInputId, cardNumberOutputId, 
        cardMonthInputId, cardMonthOutputId, cardYearInputId, cardYearOutputId, 
        cardCvvInputId, cardCvvOutputId, formId
    }) {

        // elements define
        this.fullNameInput = document.getElementById(fullNameInputId);          // full name input
        this.fullNameOutput = document.getElementById(fullNameOutputId);        // full name output
        this.cardNumberInput = document.getElementById(cardNumberInputId);      // card number input
        this.cardNumberOutput = document.getElementById(cardNumberOutputId);    // card number output
        this.cardMonthInput = document.getElementById(cardMonthInputId);        // month input
        this.cardMonthOutput = document.getElementById(cardMonthOutputId);      // month output
        this.cardYearInput = document.getElementById(cardYearInputId);          // year input
        this.cardYearOutput = document.getElementById(cardYearOutputId);        // year output
        this.cardCvvInput = document.getElementById(cardCvvInputId);            // cvv input
        this.cardCvvOutput = document.getElementById(cardCvvOutputId);          // cvv output
        this.registerForm = document.getElementById(formId);                    // form
        this.visaCard1 = new VisaCard({
            userFullName: "",
            cardNumber: "", 
            cardCvv: "", 
            cardMonth: "", 
            cardYear: ""
        });
        
        this.cardFront = document.querySelector('.register-card .show-card .card-front');
        this.cardBack = document.querySelector('.register-card .show-card .card-back');
        
        // init VisaCardRegister functions
        this.initFunctions();
        this.eventListeners();
    }

    CardNumberFormatterDOM = vals => {
        vals.target.value = vals.target.value.replace(/\D/, '');
        vals.target.value = (vals.target.value.match(/(\d{1,4})/gi) || []).join(' ');
    }

    CardNumberFulled(str='') {
        let result = '#### #### #### ####';
        result = result.split('')
            .reduce((total, item, index) => {
                let classList = /\d/g.test(str[index]) ? "digit" : /\s/g.test(str[index]) ? "space" : "";
                str.length-1 == index ? classList += " newDigit" : "";

                total += str[index] ? (`<span class="${classList}">${ (index > 3 && index < 15 && item != ' ') ? '*' : str[index] }</span>`) : item
                
                return total;
            }, "");
        this.cardNumberOutput.innerHTML = result;
    }

    isSubmitContinue = () => {
        let isContinue = true;

        try {
            if ((String(this.cardNumberInput.value).match(/\d/g) || []).length != 16) {
                throw new Error("Kart nomresi yanlis daxil edilmisdir");
            } else if (!/^[A-Za-z]+\s[A-Za-z]+\s*$/g.test(String(this.fullNameInput.value))) {
                throw new Error("Istifadeci adi yanlis daxil edilmisdir.")
            } else if (!/\d{1,2}/g.test(String(this.cardMonthInput.value))) {
                throw new Error("Kartin bitme tarixi yanlis daxil edilmisdir");
            } else if (!/\d{4}/g.test(String(this.cardYearInput.value))) {
                throw new Error("Kartin bitme tarixi yanlis daxil edilmisdir");
            } else if (!/\d{3,4}/g.test(String(this.cardCvvInput.value))) {
                throw new Error("Cvv kodu yanlis daxil edilmisir.");
            }
        } catch (e) {

            console.log(e);
            isContinue = false;
        } finally {

            return isContinue;
        }
    }

    submittionForm = event => {
        event.preventDefault();
        
        if( this.isSubmitContinue() ) {
            this.visaCard1.setUserFullName( this.fullNameInput.value );
            this.visaCard1.setCardNumber( this.cardNumberInput.value );
            this.visaCard1.setCardCvv( this.cardCvvInput.value );
            this.visaCard1.setCardMonth( this.cardMonthInput.value ); 
            this.visaCard1.setCardYear( this.cardYearInput.value );

            console.log(
                this.visaCard1.getInfo()
            );
        }
    }

    initFunctions() {
        this.cardMonthInput.innerHTML += new Array(12)
            .fill(1)
            .map((_, index) => index + 1)
            .reduce((total, item) => total += `<option value=${item}>${item}</option>` ,'');

        this.cardYearInput.innerHTML += new Array(12)
            .fill(new Date().getFullYear())
            .map((item, index) => item + index)
            .reduce((total, item) => total += `<option value=${item}>${item}</option>` ,'');
    }

    eventListeners() {
        this.cardMonthInput.addEventListener('input', e => { 
            this.cardMonthOutput.innerHTML = e.target.value == 'Month' ? 'MM' : e.target.value.padStart(2, '0').slice(-2);
        });

        this.cardYearInput.addEventListener('input', e => {
            this.cardYearOutput.innerHTML = e.target.value == 'Year' ? 'YY' : e.target.value.slice(-2);
        });

        this.cardCvvInput.addEventListener('focus', () => {
            this.cardFront.style.transform = 'rotateY(-180deg)';
            this.cardBack.style.transform = 'rotateY(0deg)';
            this.cardFront.style.zIndex = '0';
            this.cardBack.style.zIndex = '99';
        });

        this.cardCvvInput.addEventListener('blur', () => {
            this.cardBack.style.transform = 'rotateY(-180deg)';
            this.cardFront.style.transform = 'rotateY(-360deg)';
            this.cardFront.style.zIndex = '99';
            this.cardBack.style.zIndex = '0';
        });

        [this.cardNumberInput, this.cardCvvInput].forEach(item => item.addEventListener('input', this.CardNumberFormatterDOM));

        this.cardCvvInput.addEventListener('input', e => {
            this.cardCvvOutput.innerHTML = '&#149;'.repeat(e.target.value.length);
        });

        this.cardNumberInput.addEventListener('input', e => this.CardNumberFulled(e.target.value) );

        this.fullNameInput.addEventListener('blur' , e => { 
            if (/[\d.,-/*=+`~]/gi.test(e.target.value)) {
                e.target.style.border = '1px solid #f00';
            } else {
                this.fullNameOutput.innerHTML = e.target.value || 'Full Name';
                e.target.style.border = '1px solid #ced6e0';
            }   
        });

        this.registerForm.addEventListener('submit', this.submittionForm);

    } // event listeners end

} // class end