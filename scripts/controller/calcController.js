class CalcController {

    constructor(){

        //Notation with "_" in attributes refers private attributes, works only inside the class
        this._locale = 'pt-BR';
        this._currentDate;
        this._operation = []; //These array saves every operation digited by the the calculator user
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
       this.setDisplayDateTime();
       //For each 1 second, or 1000 milliseconds, the block of code inside setInterval() is executed 
       setInterval(()=> {
            this.setDisplayDateTime();    
       }, 1000);//Another interesting function is setTimeout(), who is executed only one time after X milliseconds
       this.setLastNumberToDisplay();
    }

    //Replacing the native method addEventListener() to another method what stand more than one event per turn
    addEventListernerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    //Method created to the "ac" operation, what is the same of clear all done operations
    clearAll(){
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    //Method created to the "ce" operation, what is the same of clear the last operation
    cancelEntry(){
        this._operation.pop();
    }

    //Method who catch the last element of an array an see if the last member is NaN
    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    //Method to replace the old operation to the new
    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    //Method to check if the digited number is another operator
    isOperator(value){
        return (['+','-','*','/','%'].indexOf(value) > -1);
    }

    //Simple method to push into our array of numbers and operations
    pushOperation(value){
        this._operation.push(value);
        if(this._operation.length > 3){
            this.calc();
        }
    }

    //Method to validate when calculate an expression or not
    calc(){
        let last = '';
        if(this._operation.length > 3){
            last = this._operation.pop();
        }
        let result = eval(this._operation.join(""));
        if(last == '%'){
            result /= 100;
            this._operation = [result];
        }else{
            this._operation = [result];
            if(last){
                this._operation.push(last);
            }
        }
        this.setLastNumberToDisplay();
    }

    //Method to change the last number in the calculator display when it suffers a change
    setLastNumberToDisplay(){
        let lastNumber;
        for(let i = this._operation.length - 1; i >= 0; i--){
            if(this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }
        }
        if(!lastNumber){
            lastNumber = 0;
        }
        this.displayCalc = lastNumber;
    }

    //These method combines a number or an operator
    addOperation(value){
        console.log('A',value,isNaN(this.getLastOperation()))
        if(isNaN(this.getLastOperation())){
            if(this.isOperator(value)) {//If the last digit is another operator, so replace
                this.setLastOperation(value);
            } else if(isNaN(value)) {//For dot and equal
                
            } else {//Is a number, and its the first iteration into the array
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else {
            if(this.isOperator(value)){//If the last thing digited is a number following an operator
                this.pushOperation(value);
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                //Updating the display when a complete number are or the last digit are modifyed 
                this.setLastNumberToDisplay();
            }
        }
    }

    //Method created to threat the case what user send a illegal operation
    setError(){
        this.displayCalc = "ERROR"
    }

    //Switch case to be used into "AC", "CE", "%", "/", "*", "-", "+", "." and "=" buttons
    execBtn(value){
        switch (value) {

            case 'ac':
                this.clearAll();
            break;
            
            case 'ce':
                this.cancelEntry();
            break;
            
            case 'soma':
                this.addOperation('+');
            break;
            
            case 'subtracao':
                this.addOperation('-');
            break;
            
            case 'divisao':
                this.addOperation('/');
            break;
            
            case 'multiplicacao':
                this.addOperation('*');
            break;
            
            case 'porcento':
                this.addOperation('%');
            break;
            
            case 'igual':
                this.calc();
            break;

            case 'ponto':
                this.addOperation('.');
            break;
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
            break;
            
            default:
                this.setError();
            break;
        }
    }

    //Method to add event click in all buttons, including texts
    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach((btn, index) => {
            /*
            Put listener in all button to the event click, but addEventListener() stands only one event per turn:
                btn.addEventListener('click', e => {
                    console.log(btn.className.baseVal.replace("btn-", ""));
                });
            */
           this.addEventListernerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
           });
           this.addEventListernerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = "pointer";
           });
        })
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