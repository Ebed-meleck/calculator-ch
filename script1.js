// { calculate } import './calculator';

// TODO: Faire la manipulation du DOM dans ce fichier

plus.addEventListener("click", e => e.preventDefault());
minus.addEventListener("click", e => e.preventDefault());
times.addEventListener("click", e => e.preventDefault());
divideby.addEventListener("click", e => e.preventDefault());
equals.addEventListener("click", e => e.preventDefault());
percentage.addEventListener("click", e => e.preventDefault());
reset.addEventListener("click", e => e.preventDefault());

const buttonsObject = [...document.querySelectorAll("button")];
const display = document.getElementById("calcul");
const input = document.getElementById("input");
const resetBtn = document.getElementById("reset");
const digitsObjects = [...document.querySelectorAll(".digit")];
let historyResult;
let historyResultWithEqual;

let displayArray = [];
let displayArrayJoin;
let backOperationArray = [];
let backOperationArrayJoin;
let inputArray = [];
let result;
let lastSymbol;
let lastNumber;
let displayValue = '';

digitsObjects.forEach(digit => {
    digit.addEventListener("click", e => {
        const num = e.target.textContent;
        input.value = num;
    })
    delInput(digit);
})

function delInput(btn) {
    btn.addEventListener("mousedown", e => {
        input.value = "";
    })
}

buttonsObject.forEach(button => {
    button.addEventListener("click", e => {
        const value = e.target.textContent;
        if (value === "AC") {
            historyResult = undefined;
            historyResultWithEqual = undefined;
            clear();
        } else {
            operation(value);
            getLastSymbol(value);
            getLastNumber(value);
        }
    })
})



function operation(value) {
    switch (value) {
        case ".":
            if (display.textContent.includes(".")) {
                display.textContent = display.textContent;
            } else {
                display.textContent += ` ${value} `;
            }
            break;
        case "C":
            del(value);
            break;
        case "+/-":
            // display.textContent = (display.textContent) * (-1);
            if ((backOperationArray.includes("-"))) {
                backOperationArray = backOperationArray;
            }
            backOperationArray.pop()
            backOperationArray.push((display.textContent) * (-1));
            console.log(backOperationArray);
            break;
        case "=":
            console.log('join', backOperationArrayJoin);
            console.log('his', historyResult);
            result = eval(backOperationArrayJoin);
            console.log('result', result);
            const isEqual = historyResultWithEqual !== undefined ? historyResultWithEqual.includes('=') : false;
            if (isEqual && historyResult) {
                 const newArray = [];
                const lstSymbol = sessionStorage.getItem('lastSymbol');
                console.log('lastnumber', lastNumber);
                newArray.push(historyResult);
                newArray.push(lstSymbol);
                newArray.push(lastNumber);
                console.log('last', lastNumber);
                console.log('new', newArray);
                const newValue = eval(newArray.join(''));
                historyResult = newValue;
                display.textContent = `${newValue}`;
                historyResultWithEqual = undefined;
            } else if (!result && historyResult) {
                const newArray = [];
                const lstSymbol = localStorage.getItem('lastSymbol'); 
                console.log('lastnumber', lastNumber);
                newArray.push(historyResult);
                newArray.push(lstSymbol);
                newArray.push(lastNumber);
                console.log('last', lastNumber);
                console.log('new', newArray);
                const newValue = eval(newArray.join(''));
                historyResult = newValue;
                display.textContent = `${newValue}`;
            }  else {
                historyResult = result;
                historyResultWithEqual = `${display.textContent} = ${result}`;
                display.textContent = `${display.textContent} = ${result}`;
                backOperationArray.splice(0);
                backOperationArrayJoin = '';
                displayArray.splice(0);
            }
            input.value = 0;
            break;
        case "%":
            result = eval(backOperationArrayJoin);
            result = result / 100;
            display.textContent = `${display.textContent} = ${result} | `;
            displayArray.splice(0);
            backOperationArray.splice(0);
            input.value = 0;
            break;
        default:
            if (value === "×") {
                value = "*";
            } else if (value === "÷") {
                value = "/";
            } else {
                value = value;
            }

            historyResultWithEqual = undefined;
            SessionStorage.clear();
            if (historyResult) {
                !backOperationArray.includes(historyResult) && backOperationArray.push(historyResult);
               !displayArray.includes(historyResult) && displayArray.push(historyResult);
            }

            if (value === "*") {
                value = "×";
            } else if (value === "/") {
                value = "÷";
            } else {
                value = value;
            }
            if (value === '0') {
               const arr =  displayValue.split(' ');
                const firstElt = arr[0];
                const firstDisplay = displayArray[0];
                console.log('dis f', typeof firstDisplay);
                if (firstElt !== '0') {
                    displayValue += `${value} `;
                }
                if (firstDisplay === undefined) {
                    displayArray.push(value);
                    displayArrayJoin = displayArray.join("");
                    backOperationArray.push(value);
                    console.log(backOperationArray);
                    backOperationArrayJoin = backOperationArray.join("");
                    console.log(backOperationArrayJoin);
                } 
                if (firstDisplay && firstDisplay !== '0') {
                    displayArray.push(value);
                    displayArrayJoin = displayArray.join("");
                    backOperationArray.push(value);
                    console.log(backOperationArray);
                    backOperationArrayJoin = backOperationArray.join("");
                    console.log(backOperationArrayJoin);
                }
            } else {
                
                displayValue += `${value} `;
                displayArray.push(value);
                displayArrayJoin = displayArray.join("");
                backOperationArray.push(value);
                console.log(backOperationArray);
                backOperationArrayJoin = backOperationArray.join("");
                console.log(backOperationArrayJoin);
            }
            display.textContent = `${displayValue}`;
            break;
    }
}

function clear() {
    display.textContent = "";
    input.value = 0;
    displayArray.splice(0);
    backOperationArray.splice(0);
};

function del(value) {
    if (value === "C") {
        displayArray.pop();
        display.textContent = displayArray.join("");
        backOperationArray.pop();
    }
};

window.addEventListener('error', e => {
    alert(`Votre calcul contient une erreur !`)
    console.log(e);
});

function getLastSymbol(value) {
    switch (value) {
        case "-":
            localStorage.setItem('lastSymbol', '-');
            break;
        case "+":
            lastSymbol = "+"
            localStorage.setItem('lastSymbol', '+');
            break;
        case "×":
            lastSymbol = "*";
            localStorage.setItem('lastSymbol', '*');
            break;
        case "÷":
            lastSymbol = "/"
            localStorage.setItem('lastSymbol', '/');
            break;
        default:
            break;
    }
}

function getLastNumber(value) {
    switch (value) {
        case "0":
            lastNumber = 0;
            console.log(lastNumber);
            break;
        case "1":
            lastSymbol = 1;
            console.log(lastNumber);
            break;
        case "2":
            lastNumber = 2;
            console.log(lastNumber);
            break;
        case "3":
            lastNumber = 3
            console.log(lastNumber);
            break;
            case "4":
                lastNumber = 4;
                console.log(lastNumber);
                break;
            case "5":
                lastSymbol = 5;
                console.log(lastNumber);
                break;
            case "6":
                lastNumber = 6;
                console.log(lastNumber);
                break;
            case "7":
            lastNumber = 7;
                console.log(lastNumber);
            break;
            case "8":
                lastNumber = 8;
                console.log(lastNumber);
                break;
            case "9":
                lastNumber = 9
                console.log(lastNumber);
                break;
        default:
            break;
    }
}