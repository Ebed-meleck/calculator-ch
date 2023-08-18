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

const displayArray = [];
let displayArrayJoin;
const backOperationArray = [];
let backOperationArrayJoin;
const inputArray = [];
let result;

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
        operation(value);
        if (value === "AC") {
            clear();
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
            result = eval(backOperationArrayJoin);
            display.textContent = `${display.textContent} = ${result} | `;
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
            backOperationArray.push(value);
            console.log(backOperationArray);
            backOperationArrayJoin = backOperationArray.join("");
            console.log(backOperationArrayJoin);
            if (value === "*") {
                value = "×";
            } else if (value === "/") {
                value = "÷";
            } else {
                value = value;
            }
            displayArray.push(value);
            displayArrayJoin = displayArray.join("");
            display.textContent += ` ${value} `;
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