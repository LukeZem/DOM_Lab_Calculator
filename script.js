const display = document.getElementById("display");
const numButtons = document.querySelectorAll("#num-btn-container .button");
const opButtons = document.querySelectorAll("#op-btn-container .button");
const clearButton = document.querySelector(".clear-button");
const equalsButton = document.querySelector(".equals-button");

let currentInput = '';
let operator = null;
let useOperator = null;
let prevInput = null;
let calculationHistory = [];



// Function to update the display
function updateDisplay() {
    display.value = calculationHistory.join(" ") + " " + currentInput;
}

function realTimeUpdate() {
    
}



// Add click event listeners to number buttons
numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentInput === '' || operator === "=") {
            currentInput = button.textContent;
        } else {
            currentInput += button.textContent;
        }
        updateDisplay();
    });
});

// Add click event listeners to operator buttons
opButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (operator !== null) {
            // Calculate and update the result
            currentInput = operate(parseFloat(prevInput), parseFloat(currentInput), operator);
            updateDisplay();
        }
        operator = button.textContent;
        prevInput = currentInput;
        currentInput = '';
    });
});

// Add click event listener to equals button
equalsButton.addEventListener("click", () => {
    if (operator !== null) {
        const result = operate(parseFloat(prevInput), parseFloat(currentInput), operator);
        operator = "=";
        calculationHistory.push(`${prevInput} ${useOperator} ${currentInput} ${operator}`);
        currentInput = result.toString();
        updateDisplay();
    }
});



// Add click event listener to clear button
clearButton.addEventListener("click", () => {
    currentInput = '';
    operator = null;
    useOperator = null;
    prevInput = null;
    calculationHistory = [];
    updateDisplay();
});


// Perform basic arithmetic operations
function operate(a, b, op) {
    switch (op) {
        case "+":
            useOperator = "+"
            return a + b;
        case "-":
            useOperator = "-"
            return a - b;
        case "*":
            useOperator = "*"
            return a * b;
        case "/":
            useOperator = "/"
            return b !== 0 ? a / b : "Error";
        default:
            return b;
    }
}


// Initialize the display
updateDisplay();
