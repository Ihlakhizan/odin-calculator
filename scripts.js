//let currentValue = "";
let currentOperator = null;
let operand1 = null;
let operand2 = null;
let shouldResetDisplay = false;

// Initialize calculator display and buttons
const calcDisplay = document.querySelector(".calc-display");
const equalsButton = document.getElementById("equals-button");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

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
    operand2 = calcDisplay.textContent;
    // Update display with correct result
    calcDisplay.textContent = operate(Number(operand1), Number(operand2), currentOperator);
    currentOperator = null;
    return;
}

// Resets the calculator display
function resetDisplay() {
    calcDisplay.textContent = "0";
    shouldResetDisplay = false;
    return;
}

// Enables equal button functionality
function isEqualTo() {
    if (currentOperator === null) return; // If there's no operator, do nothing
    runOperation();
    shouldResetDisplay = true; // Resets display next time a number is entered
    return;
}