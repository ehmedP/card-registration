export class VisaCard {
    constructor({ userFullName="", cardNumber="", cardCvv="", cardYear="", cardMonth="" }) {
        this.userFullName = userFullName;
        this.userFirstName = this.userFullName.split(' ')[0];
        this.userLastName = this.userFullName.split(' ')[1];
        this.cardNumber = cardNumber;
        this.cardCvv = cardCvv;
        this.cardMonth = cardMonth;
        this.cardYear = cardYear;
    }

    getUserFullName() { return this.userFullName }
    setUserFullName(userFullName) { this.userFullName = userFullName }

    getUserFirstName() { return this.userFirstName }
    setUserFirstName(userFirstName) { this.userFirstName = userFirstName }

    getUserLastName() { return this.userLastName }
    setUserLastName(userLastName) { this.userLastName = userLastName }

    getCardNumber() { return this.cardNumber }
    setCardNumber(cardNumber) { this.cardNumber = cardNumber }

    getCardCvv() { return this.cardCvv }
    setCardCvv(cardCvv) { this.cardCvv = cardCvv }

    getCardMonth() { return this.cardMonth }
    setCardMonth(cardMonth) { this.cardMonth = cardMonth }

    getCardYear() { return this.cardYear }
    setCardYear(cardYear) { this.cardYear = cardYear }

    getInfo() {
        return {
            fullName: this.userFullName,
            firstName: this.userFirstName,
            lastName: this.userLastName,
            cardNumber: this.cardNumber,
            cardCVV: this.cardCvv,
            cardMonth: this.cardMonth,
            cardYear: this.cardYear
        }
    }
}