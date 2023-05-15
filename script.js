const mainDisplay = document.getElementById("main-display");
const topDisplay = document.getElementById("top-display");
const allButtons = Array.from(document.querySelectorAll("button"));
allButtons.forEach(button => button.addEventListener("click", buttoned));
let currentOperation = "";
let regex = /[\+\-÷✕]/;
function buttoned(e) {
    switch (e.target.className) {
        case "number": number(e.target.textContent);
            break;
        case "clear": clear();
            break;
        case "operation": operation(e.target);
            break;
        case "back": back();
            break;
        case "equal": equal();
    }
}

function number(number) {
    if (number == "." && mainDisplay.textContent.includes(".")) return;
    mainDisplay.textContent = mainDisplay.textContent + number;
}
function clear() {
    mainDisplay.textContent = "";
    currentOperation = "";
    topDisplay.textContent = "";
}


function operation(operation) {
    if (mainDisplay.textContent == "") return;
    if (mainDisplay.textContent.search(regex) != -1 && mainDisplay.textContent.search(regex) != mainDisplay.textContent.length - 1) {
         equal(); 
        };
    switch (mainDisplay.textContent[mainDisplay.textContent.length - 1]) {
        case "+":
        case "÷":
        case "✕":
        case "-":
            back();
            break;
        default:
            break;
    }
    currentOperation = operation.textContent;
    console.log("Current Operation: " + operation.id);
    mainDisplay.textContent = mainDisplay.textContent + operation.textContent;
}

function back() {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, mainDisplay.textContent.length - 1);
}

function equal() {
    if (typeof mainDisplay.textContent != "string") return;
    let numbers = [];
    numbers = mainDisplay.textContent.split(currentOperation);
    console.log("a:" + numbers[0] + ", b: " + numbers[1]);
    let a = parseFloat(numbers[0]);
    let b = parseFloat(numbers[1]);
    switch (currentOperation) {
        case "+": updateDisplay(add(a, b)); break;
        case "÷": updateDisplay(divide(a, b)); break;
        case "✕": updateDisplay(multiply(a, b)); break;
        case "-": updateDisplay(substract(a, b)); break;
        case "": updateDisplay(mainDisplay.textContent);
        default:
            break;
    }
}

function updateDisplay(update) {
    console.log(update);
    topDisplay.textContent = mainDisplay.textContent;
    mainDisplay.textContent = update;
    currentOperation = "";
}

function add(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b == 0) {
        alert("YOU CAN'T DIVIDE BY 0");
        clear();
        return
    }
    return Math.floor((a / b) * 10) / 10;
}


