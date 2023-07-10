const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false

function sendNumberValue(number) {
  	if (awaitingNextValue) {   	// replace current display value if first value is entered
		calculatorDisplay.textContent = number
		awaitingNextValue = false
	} else {	 
		const displayValue = calculatorDisplay.textContent
		if (displayValue === '0') {		// if current display value is 0, replace it,
			calculatorDisplay.textContent = number
		} else { 	// if not add number to display value
			calculatorDisplay.textContent = displayValue + number
		}
		// calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
	}
}

function addDecimal() {
	// if operator pressed, don't add decimal
	if (awaitingNextValue) return
	// If no decimal, add one
	if (!calculatorDisplay.textContent.includes('.')) {
		calculatorDisplay.textContent += '.'
		// calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
	}
}

// calculate first and second values on operators
const calculate = {
	'/': (firstNumber, secondNumber) => firstNumber / secondNumber,
	'*': (firstNumber, secondNumber) => firstNumber * secondNumber, 	// JS floating-point error here when multiply decimals like: 1.2 * 9
	'+': (firstNumber, secondNumber) => firstNumber + secondNumber,
	'-': (firstNumber, secondNumber) => firstNumber - secondNumber,
	'=': (firstNumber, secondNumber) => secondNumber,
}

function useOperator(operator) {
	const currentValue = Number(calculatorDisplay.textContent);
	// prevent multiple operators
	if (operatorValue && awaitingNextValue) {
		operatorValue = operator;
		return;
	}
	// assign firstValue if no value
	if (!firstValue) {
		firstValue = currentValue;
	} else {
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation;
		firstValue = calculation;
	}
	// ready for next value, store operator
	awaitingNextValue = true;
	operatorValue = operator;
}

// event Listeners - numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
	if (inputBtn.classList.length === 0) {
		inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
	} else if (inputBtn.classList.contains('operator')) {
		inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
	} else if (inputBtn.classList.contains('decimal')) {
		inputBtn.addEventListener('click', () => addDecimal());
	}
})

// function reset
function resetAll() {
	firstValue = 0;
	operatorValue = '';
	awaitingNextValue = false;
	calculatorDisplay.textContent = '0';
}

// event Listener - reset button
clearBtn.addEventListener('click', resetAll)
