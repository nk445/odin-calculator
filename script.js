let num1 = 0;
let num2 = 0;
let operator;
let displayNumber = '';
let ans;

const controls = document.querySelector(".controls");
const display = document.querySelector(".display");

controls.addEventListener("click", function (e) {
    console.log(`class: ${e.target.className}, id: ${e.target.id}`);
    if (e.target.className === "number") {
        displayNumber += e.target.id;
        display.textContent = displayNumber;
    }

    else if (e.target.className === "operator") {
        determineOperation(e);
    }

    else if (e.target.id === "=") {
        if (!num2) {
            num2 = Number(displayNumber);
        }
        evaluate();
    }

    else if (e.target.id === "clear") {
        allClear();
    }
});

function determineOperation(e) {
    // operation if nothing stored yet
    if (!num1) {
        // use prev calculation as first num if no new num entered
        if (displayNumber === '') {
            // if user hasn't entered a number or done prev calculation,
            // do nothing
            if (ans) {
                num1 = ans;
                operator = e.target.id;
            } 
        }
        
        else {
            num1 = Number(displayNumber);
            operator = e.target.id;
        }            
    }

    // operation if number 1 already stored
    else if (!num2) {
        // if second number entered, store it, set operator, evaluate
        if (displayNumber != '') {
            num2 = Number(displayNumber);
            evaluate();
            num1 = ans;
            operator = e.target.id;
        }

        // if second number not entered, simply change the operator selected
        operator = e.target.id;
    }

    displayNumber = '';
}

function evaluate() {
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