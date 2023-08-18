// { calculate } import './calculator';

// TODO: Faire la manipulation du DOM dans ce fichier

const buttonsObject = [...document.querySelectorAll("button")];
const buttons = buttonsObject.map(button => button.textContent);
const display = document.getElementById("calcul");
const dot = document.querySelector(".dot");
const input = document.getElementById("input");
const resetBtn = document.getElementById("reset");
const signesId = ["divideby", "times", "minus", "plus"]
const signesObject = [];
signesId.forEach(signe => {
    signesObject.push(document.getElementById(signe));
});
const signes = signesObject.map(signe => signe.textContent);

plus.addEventListener("click", e => e.preventDefault());
minus.addEventListener("click", e => e.preventDefault());
times.addEventListener("click", e => e.preventDefault());
divideby.addEventListener("click", e => e.preventDefault());
equals.addEventListener("click", e => e.preventDefault());
percentage.addEventListener("click", e => e.preventDefault());
display.textContent = "";

function clickBtn(btn) {
    btn.addEventListener("click", (e) => {
        const value = e.target.textContent;
        operation(value);
    })
}

let inputArray = [];
const displayScreen = [];
let evalOperation;
let inputArrayJoin;

buttonsObject.forEach(b => clickBtn(b));
buttonsObject.forEach(btn => clear(btn));
function operation(value) {
    switch (value) {
        case ".":
            if (display.textContent.includes(".")) {
                display.textContent = display.textContent;
            } else {
                display.textContent += ` ${value} `;
            }
            break;
        case "AC":
            display.textContent = "";
            input.value = "";
            inputArray.splice(0);
            console.log(inputArray);
            displayScreen.splice(0);
            break;
        case "=":
            const calcul = eval(inputArrayJoin);
            evalOperation = eval(evalOperation);
            console.log(evalOperation);
            input.value = "";
            display.textContent = `${display.textContent} = ${evalOperation}  |    `;
            input.value = "";
            inputArray.splice(0);
            displayScreen.splice(0);
            console.log(evalOperation);
            dot.hidden = false;
            break;
        case "+/-":
            display.textContent = (display.textContent) * (-1);
            break;
        case "%":
            pourcentage(evalOperation);
            console.log(evalOperation);
            display.textContent = `${evalOperation} | `;
            displayScreen.splice(0);
            displayScreen.textContent = "";
            break;
        case "C":
            del(value);
            break;
        default:
            if (value === "×") {
                value = "*";
            } else if (value === "÷") {
                value = "/";
            } else {
                value = value;
            }
            displayScreen.push(value);
            console.log(displayScreen);
            evalOperation = displayScreen.join("");

            inputArray.push(value);
            inputArrayJoin = inputArray.join("");
            input.value = inputArrayJoin;
            if (value === "*") {
                value = "×";
            } else if (value === "/") {
                value = "÷";
            }
            display.textContent += ` ${value} `;

            
    }
}

function del(value) {
    if (value === "C") {
        displayScreen.pop();
        // input.value = input.value.slice(0, -1);
        display.textContent = displayScreen.join("");
        // console.log(displayScreen);
        console.log(displayScreen);
    } return input.value;
}
function plusOuMoins(value) {
    if (value === "+/-") {

    }
}

function pourcentage(value) {
    evalOperation = evalOperation / 100;
    return evalOperation;
}

window.addEventListener('error', e => {
    alert(`Votre calcul contient une erreur !`)
    console.log(e);
});
// window.addEventListener('mousedown', e => {
//     // del(input.value);
//     input.value = "";
//     inputArray.splice(0);
//     // input.value = e.target;
//     // input.value = ""
// });

function clear(btn) {
    btn.addEventListener("mousedown", e => {
        input.value = "";
        inputArray.splice(0);
    })
}

function resetAll(display, input) {
    display.textContent = "";
    input.value = 0;
}

resetBtn.addEventListener("click", resetAll(display, input));