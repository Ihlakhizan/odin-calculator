let currentValue = "";
let result = 0;
let operand1 = null;
let operand2 = null;
let operator1 = "";
let operator2 = "";

// Basic arithmetic functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

// Calls relevant arithmetic function based on operator entered
function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

// Sends the current value to the calculator display
function displayValue(value) {
    document.querySelector(".calc-display").textContent = value;
    console.log(`currentValue: ${value}.`)
}

// Function
function storeOperators(op) {
    if (operator1 === "") {
        operator1 = op;
        console.log(`Stored operator1: ${operator1}.`)
    }
    else {
        operator2 = op;
        console.log(`Stored operator2: ${operator2}.`)
    }
    return;
}

// Function
function storeOperands() {
    if (operand1 === null) {
        operand1 = Number(currentValue);
        console.log(`Stored operand1: ${operand1}.`)
        currentValue = "";
        return;
    }
    if (operand2 === null) { 
        operand2 = Number(currentValue);
        console.log(`Stored operand2: ${operand2}.`)

        operand1 = operate(operand1, operand2, operator1);
        result = operand1;
        console.log(`Result: ${result}.`)

        operand2 = null;
        operator1 = operator2;
        operator2 = "";
        currentValue = "";
        displayValue(result);
        return;
    }
}

// Registers number input, corrects the current value, and calls displayValue()
const operandButtons = document.querySelectorAll(".operand");
operandButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentValue += button.value;
        displayValue(currentValue);
    });
});

// When clicked, the operator buttons will
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        storeOperators(button.value);
        storeOperands();
    });
});