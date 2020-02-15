  //defining variables for both containers of the screen.
let display = document.getElementById("display");
let display2 = document.getElementById("display2");

  //function to clear whole screen
const clearDisplay = () => {
    display.innerHTML = '0';
    display2.innerHTML = '0';
}; 

  //function to clear bottom screen
const deleteDisplay = () =>{
    if(display2.innerHTML !== 'Welcome :)'){
        display.innerHTML = '0';
    }
}; 

  //functions to add or change value of lower screen
const displayLower = (value) => display.innerHTML += value;
const changeLower = (value) => display.innerHTML = value;

  //functions to add or change values of upper screen
const addUpper = () => display2.innerHTML += display.innerHTML;
const operatorUpper = (value) => display2.innerHTML = display.innerHTML + value;
const copyUpper = () => display2.innerHTML = display.innerHTML;

  //function to show on each screen the calculations
const concatenateElem = (value) =>{
    if (display.innerHTML == '0' && !display2.innerHTML.includes('=')){//when lower screen is 0 and equal sign hasn't been pressed
        if (value === '.'){
            displayLower(value);
        } else if (typeof(value) === 'number' || (value === '-')){
            changeLower(value);
        } //when the numbers fit in the screens
    } else if (display.innerHTML.length < 20 && display2.innerHTML.length < 20){
        if(display2.innerHTML.includes('=')){//if equal sign has been pressed
            if (typeof(value) === 'number'){
                clearDisplay();
                changeLower(value);
            } else if (value === '.'){
                clearDisplay();
                displayLower(value);
            } else {
                operatorUpper(value);
                deleteDisplay();
            }
        } else {//if equal sign hasn't been pressed
            if (typeof(value) === 'number' || (value === '.' && !/\./.test(display.innerHTML))){
                displayLower(value);
            } else if (typeof(value) !== 'number' && value !== '.'){
                displayLower(value);
                if (display2.innerHTML == '0'){
                    copyUpper();
                } else {
                    addUpper();
                }
                deleteDisplay();
            }
        }
    }
}

  //function to evaluate the top screen 
const evaluateExpresion = () => {
    let regex = /\*|\/|\-|\+/;
    let nums = /[1-9]/
    //first check if equal sign hasn't been pressed and if there's a number in the lower screen
    if (!display2.innerHTML.includes('=') && nums.test(display.innerHTML)){
        addUpper();
      //then check if any operation has been made
        if (regex.test(display2.innerHTML) ){
            let result =eval(display2.innerHTML); display2.innerHTML += '=';
            if(nums.test(result)){
                display.innerHTML = result;
            } else {
                display.innerHTML = "Error, please press C"
            }
        }
    }
}

