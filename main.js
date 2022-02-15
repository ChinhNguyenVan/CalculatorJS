class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOPerand = "";
        this.previousOPerand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOPerand = this.currentOPerand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOPerand.includes(".")) {
            return;
        }
        this.currentOPerand = this.currentOPerand.toString() + number.toString();
    }

    chooseOperations(operation) {
        if (this.currentOPerand === "") {
            return;
        }
        if (this.previousOPerand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOPerand = this.currentOPerand;
        this.currentOPerand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOPerand);
        const current = parseFloat(this.currentOPerand);

        if (isNaN(current) || isNaN(prev)) {
            return;
        }

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                if (current < 0) {
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOPerand = computation;
        this.operation = undefined;
        this.previousOPerand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
          integerDisplay = '';
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`;
        } else {
          return integerDisplay;
        }
      }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOPerand);
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOPerand)} ${this.operation}`;
            
        }
        else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

var $ = document.querySelectorAll.bind(document);
var $$ = document.querySelector.bind(document);

const numberButtons = $("[data-number]");
const operationButtons = $("[data-operation]");
const equalsButton = $$("[data-equals]");
const deleteButton = $$("[data-delete]");
const allClearButton = $$("[data-all-clear]");
const previousOperandTextElement = $$("[data-previous-operand]");
const currentOperandTextElement = $$("[data-current-operand]");

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperations(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});


deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});