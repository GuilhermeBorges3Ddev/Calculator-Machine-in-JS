class CalcController {

    constructor(){

        //Notation with "_" in attributes refers private attributes
        this._currentDate;
        this._displayCalcEl = document.querySelector("#display");
        this._dataEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();
    }

    initialize(){
       this._displayCalcEl.innerHTML = "081194";
       this._dataEl.innerHTML = "11/12/2019";
       this._timeEl.innerHTML = "23:30"
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this.displayCalcEl = value;
    }

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(value){
        this.currentDate = value;
    }

}