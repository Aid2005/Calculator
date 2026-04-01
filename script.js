let display = document.getElementById("display"); // Variable for the display text

function ClickNumber(x) { // Input numbers, dot, comma

    let text = display.innerText;

    if (x === ',' || x === '.') { // Prevent repeating decimal/comma in the same number

        let lastNumber = text.split(/[\+\-\*\/]/).pop();

        if (lastNumber.includes(",") || lastNumber.includes(".")) { // Convert comma to dot
            return;
        }
    }

    if (text.length >= 9) { // Limit number of characters on display
        return;
    }

    if (text == "0" || text == "ERROR") { // Reset if input is 0 or ERROR
        display.innerHTML = x;
    } 
    else { // Normal input
        display.innerHTML += x;
    }
}

function ClearAll() { // Clear everything
    display.innerHTML = 0;
}

function ClearEntry() { // Delete last character
    display.innerText = display.innerText.slice(0, -1);

    if (display.innerText == "") {
        display.innerHTML = 0;
    }
}

function AddOperator(op) { // Input operator
    let lastChar = display.innerText.slice(-1);

    if (["+", "-", "*", "/", "%"].includes(lastChar)) { // Prevent repeating operators
        display.innerText = display.innerText.slice(0, -1) + op;
    } 
    
    else { // Normal input
        display.innerText += op;
    }
}

function Calculate() { // Calculate result
    try { // If everything works fine

        let expression = display.innerText.replace(/,/g, ".");

        expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)"); // Convert % to /100

        let result = eval(expression);

        result = Math.round(result * 1000) / 1000; // Round to 3 decimals

        display.innerText = result.toString().replace(/\./g, ",");

    } 
    
    catch { // If there is an error
        display.innerText = "ERROR";
    }
}