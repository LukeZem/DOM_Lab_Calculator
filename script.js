const display = document.getElementById("display");
const numButtons = document.querySelectorAll("#num-btn-container .button");
const opButtons = document.querySelectorAll("#op-btn-container .button");
const clearButton = document.querySelector(".clear-button");
const equalsButton = document.querySelector(".equals-button");


let operator = null;
let currentBtn;
let currentInput = '';
let prevInput = null;
let inputHistory = [];

// Function to update the display
function updateDisplay() {
    if (currentInput == '') {
        display.value = "Math is Hard"
    } else {
        display.value = currentInput;
    }
}

function realTimeDisplay() {
    display.value = inputHistory.join("");
}

// Add click event listeners to number buttons
numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (display.value === "Math is Hard") {
            currentInput = button.textContent;
            inputHistory.push(button.textContent);
        } else {
            currentInput += button.textContent;
            inputHistory.push(button.textContent);
        }
        realTimeDisplay();
    });
});

// Add click event listeners to operator buttons
opButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.add("active")
        if (operator !== null) {
            // Calculate and update the result
            currentInput = operate(parseFloat(prevInput), parseFloat(currentInput), operator);
            updateDisplay();
        }
        operator = button.textContent;
        prevInput = currentInput;
        currentInput = 0;
        display.value = prevInput;
        inputHistory = [];
    });
});


// Add click event listener to equals button
equalsButton.addEventListener("click", () => {
    if (operator !== null) {
        currentInput = operate(parseFloat(prevInput), parseFloat(currentInput), operator);
        updateDisplay();
        operator = "=";
        opButtons.forEach(opBtn => {
            opBtn.classList.remove("active");
        });
    }
});



// Add click event listener to clear button
clearButton.addEventListener("click", () => {
    currentInput = '';
    operator = null;
    prevInput = null;
    inputHistory = [];
    updateDisplay();
});


// Perform basic arithmetic operations
function operate(a, b, op) {
    switch (op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b !== 0 ? a / b : "UNDEFINED!!!";
        default:
            return b;
    }
}



// Initialize the display
updateDisplay();
