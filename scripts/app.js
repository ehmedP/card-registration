import { VisaCardRegistration } from "./VisaCardRegistration.js";

const cardRegistration1 = new VisaCardRegistration({
    fullNameInputId: "card-holder-input",   
    fullNameOutputId: "card-holder",
    cardNumberInputId: "card-number",
    cardNumberOutputId: "card-number-show",
    cardMonthInputId: "month-select",
    cardMonthOutputId: "month-show",
    cardYearInputId: "year-select",
    cardYearOutputId: "year-show",
    cardCvvInputId: "card-cvv-number",
    cardCvvOutputId: "cvv-show",
    formId: "register-form" 
});