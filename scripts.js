//let currentValue = "";
let currentOperator = null;
let operand1 = null;
let operand2 = null;
let shouldResetDisplay = false;

const calcDisplay = document.querySelector(".calc-display");
const equalsButton = document.getElementById("equals-button");

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

// Add event listeners to the number buttons that runs appendValue()
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendValue(button.value);        
    });
});

// Add event listeners to the operator buttons
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        setOperator(button.value);
    });
});

// Add event listener to the equals button
equalsButton.addEventListener("click", () => {
    isEqualTo();
})

// Appends the clicked number to the current value and displays it
function appendValue(value) {
    if (shouldResetDisplay === true) resetDisplay(); // Resets display if an operation was performed
    if (calcDisplay.textContent === "0") calcDisplay.textContent = ""; // Removes the starting '0'
    calcDisplay.textContent += value;
    return;
}

// Stores the clicked operator
function setOperator(operator) {
    if (currentOperator !== null) runOperation();
    currentOperator = operator;
    operand1 = calcDisplay.textContent;
    shouldResetDisplay = true;
    return;
}

// Executes the operation, resets the operator
function runOperation() {
    // If there's already an operator, don't do anything
    if (shouldResetDisplay) return;
    // Grab current number as operand 2
    operand2 = calcDisplay.textContent;
    // Update display with solved number, then reset current operator
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
    if (currentOperator === null) return;
    runOperation();
    shouldResetDisplay = true;
    return;
}