class CalcController {

    constructor(){

        //Notation with "_" in attributes refers private attributes, works only inside the class
        this._locale = 'pt-BR';
        this._currentDate;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();
    }

    initialize(){
       this.setDisplayDateTime();
       //For each 1 second, or 1000 milliseconds, the block of code inside setInterval() is executed 
       setInterval(()=> {
            this.setDisplayDateTime();    
       }, 1000);//Another interesting function is setTimeout(), who is executed only one time after X milliseconds
    }

    //Method to add event click in all buttons, including texts
    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
    }

    //Function created to be used into initialize() method
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this.locale,{
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
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