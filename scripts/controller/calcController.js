class CalcController {

    constructor(){

        //Notation with "_" in attributes refers private attributes
        this._displayCalc = "0";
        this._currentDate;
        this.initialize();
    }

    initialize(){
       let displayCalcEl = document.querySelector("#display");
       let dataEl = document.querySelector("#data");
       let timeEl = document.querySelector("#hora");

       displayCalcEl.innerHTML = "081194";
       dataEl.innerHTML = "11/12/2019";
       timeEl.innerHTML = "23:30"
    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(value){
        this.displayCalc = value;
    }

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(value){
        this.currentDate = value;
    }

}