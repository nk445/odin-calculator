let num1;
let num2;
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
        if (!num1) {
            num1 = Number(displayNumber);
        }
        else if (!num2) {
            num2 = Number(displayNumber);
        }
        displayNumber = '';
        operator = e.target.id;
    }

    else if (e.target.id === "=") {
        if (!num2) {
            num2 = Number(displayNumber);
        }
        ans = operate(num1, num2, operator);
        // display ans
        display.textContent = ans;
        displayNumber = '';
    }
});

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
    }
}