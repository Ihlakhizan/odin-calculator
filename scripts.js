// Initialize variables
let currentOperator = null;
let operand1 = null;
let operand2 = null;
let shouldResetDisplay = false;

// Fetch calculator display, history, and buttons and stores them in variables
const calcDisplay = document.querySelector(".calc-display");
const calcHistory = document.querySelector(".calc-display-history");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");
const allClearButton = document.getElementById("all-clear");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const plusMinusButton = document.getElementById("plus-minus");

// Add event listeners to the number buttons, operator buttons, and special buttons
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
decimalButton.addEventListener("click", () => addDecimalPoint());
plusMinusButton.addEventListener("click", () => switchSigns());

// Add event listener to the window to check for keystrokes
window.addEventListener("keydown", (e) => {
    acceptKeyboardInput(e.key);
});

// Call the appropriate function for the key
function acceptKeyboardInput(key) {
    if (Number(key) || key === "0") appendValue(key); // 0-9
    if (key === ".") addDecimalPoint();
    if (key === "+" || key === "-" || key === "/" || key === "*") setOperator(key);
    if (key === "Escape") clearAll();
    if (key === "Delete") resetDisplay();
    if (key === "Backspace") deleteLastDigit();
    if (key === "=" || key === "Enter") isEqualTo();
    return;
}

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
    if (currentOperator !== null) {
        runOperation();
        //currentOperator = null;
    }

    currentOperator = operator;
    operand1 = calcDisplay.textContent;
    calcHistory.textContent = `${operand1} ${currentOperator}`;
    shouldResetDisplay = true; // So that the display resets when entering a new number
    return;
}

// Executes the operation, updates operand2, and resets the current operator
function runOperation() {
    if (shouldResetDisplay) return; // Stops the code below from running if the equals button was clicked

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

// Adds a decimal point when called if one is not already present
function addDecimalPoint() {
    if (calcDisplay.textContent.includes(".")) return;
    calcDisplay.textContent += ".";
    return;
}

// Resets the calculator display when called (also C)
function resetDisplay() {
    calcDisplay.textContent = "0";
    shouldResetDisplay = false;
    return;
}

// Resets the calculator history when called
function resetHistory() {
    calcHistory.textContent = "";
    return;
}

// =: Returns the current result
function isEqualTo() {
    if (currentOperator === null) return; // If there's no operator, do nothing

    runOperation();
    //currentOperator = null;

    calcHistory.textContent += ` ${operand2} =`; // Adds the last operand called and an equals sign to the history
    shouldResetDisplay = true; // Resets display next time a number is entered
    return;
}

// AC: Clears the display and history and resets all variables
function clearAll() {
    currentOperator = null;
    operand1 = null;
    operand2 = null;
    resetDisplay();
    resetHistory();
    return;
}

// DEL: Deletes the last digit of the entered number
function deleteLastDigit() {
    if (shouldResetDisplay === true) resetDisplay(); // Resets the display if an operation was just entered

    calcDisplay.textContent = calcDisplay.textContent.slice(0, -1); // Deletes the last character of the display string

    if (calcDisplay.textContent === "") calcDisplay.textContent = "0";
    return;
}

// +-: Switches the sign of the current value
function switchSigns() {
    if (calcDisplay.textContent === "0") return;
    if (Number(calcDisplay.textContent) > 0) {
        calcDisplay.textContent = "-" + calcDisplay.textContent;
        return;
    }
    calcDisplay.textContent = calcDisplay.textContent.slice(1);
    return;
}

// Just for debugging purposes :)
function debug() {
    console.log(`operand1: ${operand1}`);
    console.log(`operand2: ${operand2}`);
    console.log(`currentOperator: ${currentOperator}`);
    console.log(`shouldResetDisplay: ${shouldResetDisplay}`);
    return;
}