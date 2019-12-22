class CalcController {

    constructor(){

        //Notation with "_" in attributes refers private attributes, works only inside the class
        this._audio = new Audio('../click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';

        this._locale = 'pt-BR';
        this._currentDate;
        this._operation = []; //These array saves every operation digited by the the calculator user
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
    }

    //The method below transfer a copyed value and paste into the calculator display
    pasteFromClipboard(){
        document.addEventListener('paste', e => {
            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
        });
    }

    //JS access the clipboard area to copy values of the calculator display
    copyToClipboard(){
        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand("Copy");
        input.remove();
    }

    //MAIN METHOD() 
    initialize(){
       this.setDisplayDateTime();
       //For each 1 second, or 1000 milliseconds, the block of code inside setInterval() is executed 
       setInterval(()=> {
            this.setDisplayDateTime();    
       }, 1000);//Another interesting function is setTimeout(), who is executed only one time after X milliseconds
       this.setLastNumberToDisplay();
       this.pasteFromClipboard();
       document.querySelectorAll('.btn-ac').forEach(btn => {
            btn.addEventListener('dbclick', e => {
                this.toggleAudio();
            });
       });
    }

    //Method to set on or off the audio on the buttons
    toggleAudio(){
       this._audioOnOff = !this._audioOnOff;
    }

    //These method uses togglesAudio() to play a sound when a calculator method is pressed
    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }

    //Start keyboard capture when the calculator is open
    initKeyboard(){
        document.addEventListener('keyup', e => {
            this.playAudio();
            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                break;
                case 'Backspace':
                    this.cancelEntry();
                break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperation(e.key);
                break;
                case 'Enter':
                case '=':
                    this.calc();
                break;
                case '.':
                case ',':
                    this.addDot('.');
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
                    this.addOperation(parseInt(e.key));
                break;
                case 'c'://Copy element to calculator when user digits 'c'
                    if(e.ctrlKey) this.copyToClipboard();
                break;
            }
        })
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
        this._lastNumber = '';
        this._lastOperator = '';
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

    //Simple get result of an operation
    getResult(){
        return eval(this._operation.join(""));
    }

    //Method to validate when calculate an expression or not
    calc(){ 
        let last = '';
        this._lastOperator = this.getLastItem(true);

        if(this._operation.lenght < 3){
            let firstItem = this._operation[0];
            this.operation = [firstItem, this._lastOperator, this._lastNumber];
        }
        
        if(this._operation.length > 3){
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        } else if(this._operation.lenght == 3) {
            this._lastNumber = this.getResult(false);
        }

        let result = this.getResult();
        
        if(last == '%'){
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];
            if(last){
                this._operation.push(last);
            }
        }
        this.setLastNumberToDisplay();
    }

    //This method catch the last number when argument passed is true, or an operator if false
    getLastItem(isOperator = true){
        let lastItem
        for(let i = this._operation.length - 1; i >= 0; i--){
            if(isOperator){
                if(this.isOperator(this._operation[i]) == isOperator){
                    lastItem = this._operation[i];
                    break;
                }
            }
        }
        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
    }

    //Method to change the last number in the calculator display when it suffers a change
    setLastNumberToDisplay(){
        let lastNumber = this.getLastItem(false);
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
            } else {//Is a number, and its the first iteration into the array
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else {
            if(this.isOperator(value)){//If the last thing digited is a number following an operator
                this.pushOperation(value);
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);
                //Updating the display when a complete number are or the last digit are modifyed 
                this.setLastNumberToDisplay();
            }
        }
    }

    //Method created to threat the case what user send a illegal operation
    setError(){
        this.displayCalc = "ERROR"
    }

    //Mix dot with numbers in others
    addDot(){
        let lastOperation = this.getLastOperation();
        //Verifying if the user is digiting two times dot, and block these action
        if(typeof lastOperation === 'string' && lastOperation.split('').indeOf('.') > -1){
            return;
        }
        //First situation, dot is the first digit
        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }else{//If the dot is inserted after a number
            this.setLastOperation(lastOperation.toString() + '.');
        }
        this.setLastNumberToDisplay();
    }


    //Switch case to be used into "AC", "CE", "%", "/", "*", "-", "+", "." and "=" buttons
    execBtn(value){

        this.playAudio();

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
                this.addDot('.');
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
        if(value.toString().lenght > 10){
            this.setError();
            return false;
        }
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