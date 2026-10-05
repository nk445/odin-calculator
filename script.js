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
        if (!num1) {
            num1 = Number(displayNumber);
        }
        else if (!num2) {
            num2 = Number(displayNumber);
        }

        if (!operator) {
            operator = e.target.id;
        }
        else {
            evaluate();
            num1 = ans;
            operator = e.target.id;
        }

        displayNumber = '';
    }

    else if (e.target.id === "=") {
        if (!num2) {
            num2 = Number(displayNumber);
        }
        evaluate();
    }
});

function evaluate() {
    ans = operate(num1, num2, operator);
    // display ans
    display.textContent = ans;
    clear();
}

function clear() {
    num1 = null;
    num2 = null;
    operator = null;
    displayNumber = '';
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