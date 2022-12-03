// Initialize variables
let currentOperator = null;
let operand1 = null;
let operand2 = null;
let shouldResetDisplay = false;

// Fetch calculator display and buttons and stores them in variables
const calcDisplay = document.querySelector(".calc-display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const allClearButton = document.getElementById("all-clear");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");

// Add event listeners to the number buttons, operator buttons, and special buttons (equals, C, AC, DEL)
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendValue(button.value);        
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        setOperator(button.value);
    });
});

equalsButton.addEventListener("click", () => isEqualTo());
allClearButton.addEventListener("click", () => clearAll());
clearButton.addEventListener("click", () => resetDisplay());
deleteButton.addEventListener("click", () => deleteLastDigit());

// Mathematical functions that are called on by operate()
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

// Returns a number based on the 2 numbers entered and the operator
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

// Appends the clicked number to the current value and displays it
function appendValue(value) {
    if (shouldResetDisplay === true) resetDisplay(); // Resets display if an operation was just performed
    if (calcDisplay.textContent === "0") calcDisplay.textContent = ""; // Removes the starting '0' when entering a new number
    calcDisplay.textContent += value;
    return;
}

// Stores the clicked operator and operand 1, and executes the operation if an operator is already present
function setOperator(operator) {
    if (currentOperator !== null) runOperation();

    currentOperator = operator;
    operand1 = calcDisplay.textContent;
    shouldResetDisplay = true; // So that the display resets when entering a new number
    return;
}

// Executes the operation and resets the current operator
function runOperation() {
    if (shouldResetDisplay) return;

    if (calcDisplay.textContent === "0" && currentOperator === "/") {
        alert("Don't try to divide by zero! It makes the computer unhappy :(");
        return;
    }

    operand2 = calcDisplay.textContent;
    // Update display with correct result
    calcDisplay.textContent = roundNumber(operate(Number(operand1), Number(operand2), currentOperator), 3); // Rounds to 3 decimal places
    currentOperator = null;
    return;
}

// Rounds the input number to the given number of decimal places
function roundNumber(num, decimalPlaces) {
    let num2 = Math.pow(10, decimalPlaces);
    return Math.round((num * num2)) / num2;
}

// Resets the calculator display when called
function resetDisplay() {
    calcDisplay.textContent = "0";
    shouldResetDisplay = false;
    return;
}

// Returns the current result
function isEqualTo() {
    if (currentOperator === null) return; // If there's no operator, do nothing
    runOperation();
    shouldResetDisplay = true; // Resets display next time a number is entered
    return;
}

// Clears the display and resets all variables
function clearAll() {
    currentOperator = null;
    operand1 = null;
    operand2 = null;
    resetDisplay();
    return;
}

// Deletes the last digit of the entered number
function deleteLastDigit() {
    if (shouldResetDisplay === true) resetDisplay(); // Resets the display if an operation was just entered
    calcDisplay.textContent = calcDisplay.textContent.slice(0, -1); // Deletes the last character of the display string
    if (calcDisplay.textContent === "") calcDisplay.textContent = "0";
    return;
}

// Just for debugging purposes :)
function debug() {
    console.log(`operand1: ${operand1}`);
    console.log(`operand2: ${operand2}`);
    console.log(`currentOperator: ${currentOperator}`);
    return;
}