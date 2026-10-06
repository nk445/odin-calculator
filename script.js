let num1 = 0;
let num2 = 0;
let operator;
let displayNumber = '';
let ans;
let decimalSelected = false;

const controls = document.querySelector(".controls");
const display = document.querySelector(".display");

controls.addEventListener("click", handleButtonClick);

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    // check if number key pressed
    if (/^[0-9]$/.test(e.key)) {
        handleNumberEntry(e.key);
    }

    // Check for math operations (+, -, *, /)
    else if (['+', '-', '*', '/'].includes(e.key)) {
        determineOperation(e.key);
    }

    else if (e.key === "Backspace") {
        handleBackspace();
    }

    else if (e.key === "=" || e.key === "Enter") {
        evaluate();
    }

    else if (e.key === "Escape") {
        allClear();
    }

    else if (e.key === ".") {
        handleDecimal();
    }
}

function handleButtonClick(e) {
    if (e.target.className === "number") {
        handleNumberEntry(e.target.id);
    }

    else if (e.target.className === "operator") {
        determineOperation(e.target.id);
    }

    else if (e.target.id === "=") {
        evaluate();
    }

    else if (e.target.id === "clear") {
        allClear();
    }

    else if (e.target.id === ".") {
        handleDecimal();
    }

    else if (e.target.id === "del") {
        handleBackspace();
    }
}

function handleNumberEntry(num) {
    displayNumber += num;
    display.textContent = displayNumber;
}

function handleDecimal() {
    if (!decimalSelected) {
        displayNumber += '.';
        display.textContent = displayNumber;
        decimalSelected = true;
    }
}

function determineOperation(op) {
    // operation if nothing stored yet
    if (!num1) {
        // use prev calculation as first num if no new num entered
        if (displayNumber === '') {
            // if user hasn't entered a number or done prev calculation,
            // do nothing
            if (ans) {
                num1 = ans;
                operator = op;
            } 
        }
        else {
            num1 = Number(displayNumber);
            operator = op;
        }            
    }

    // operation if number 1 already stored
    else if (!num2) {
        // if second number entered, store it, set operator, evaluate
        if (displayNumber != '') {
            num2 = Number(displayNumber);
            evaluate();
            num1 = ans;
            operator = op;
        }

        // if second number not entered, simply change the operator selected
        operator = op;
    }

    displayNumber = '';
    decimalSelected = false;
}

function handleBackspace() {
    if (displayNumber.at(-1) === ".") {
        decimalSelected = false;
    }
    displayNumber = displayNumber.slice(0, -1);
    display.textContent = displayNumber;
}

function evaluate() {
    if (!num2) {
        num2 = Number(displayNumber);
    }
    if (num2 === 0 && operator === '/') {
        display.textContent = "Don't EVER try that again";
    }
    else {
        ans = operate(num1, num2, operator);
        // truncate to 10 decimal places
        const factor = Math.pow(10, 10);
        ans = Math.trunc(ans * factor) / factor;

        // display ans
        display.textContent = ans;
    }
    
    clear();
}

function clear() {
    num1 = 0;
    num2 = 0;
    operator = null;
    displayNumber = '';
    decimalSelected = false;
}

function allClear() {
    clear();
    ans = 0;
    display.textContent = '';
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        default:
            return add(num1, num2);
    }
}