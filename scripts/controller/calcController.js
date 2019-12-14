class CalcController {

    constructor(){

        //Notation with "_" in attributes refers private attributes, works only inside the class
        this._currentDate;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();
    }

    initialize(){
       this._displayCalcEl.innerHTML = "000000";
       this._dateEl.innerHTML = "13/12/2019";
       this._timeEl.innerHTML = "23:59"
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl = value;
    }

    get currentDate(){
        return new Date();
    }

    //Class 'Date' has interesting methods, like: toLocaleDateString('pt-BR', {month: 'long'}), getFullYear(), getMonth() and more...
    set currentDate(value){
        this._currentDate = value;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }


}