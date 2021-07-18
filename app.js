// Variables

const previousElement = document.querySelector(".previous-display");
const currentElement = document.querySelector(".current-display");

const acButton = document.querySelector(".ac");
const pmButton = document.querySelector(".pm");
const deleteButton = document.querySelector(".delete");

const additionButton = document.querySelector(".addition");
const subtractionButton = document.querySelector(".subtraction");
const multiplicationButton = document.querySelector(".multiplication");
const divisionButton = document.querySelector(".division");
const equalsButton = document.querySelector(".equals");

const decimalButton = document.querySelector(".decimal");
const number0 = document.querySelector(".number-0");
const number1 = document.querySelector(".number-1");
const number2 = document.querySelector(".number-2");
const number3 = document.querySelector(".number-3");
const number4 = document.querySelector(".number-4");
const number5 = document.querySelector(".number-5");
const number6 = document.querySelector(".number-6");
const number7 = document.querySelector(".number-7");
const number8 = document.querySelector(".number-8");
const number9 = document.querySelector(".number-9");

const operatorsArray = [
  additionButton,
  subtractionButton,
  multiplicationButton,
  divisionButton,
];

const numbersArray = [
  number0,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
];
let previousOperand = "";
let currentOperand = "";
let operation = "";
let temporaryOperand = "";

// Functions
function DisplayNumbers() {
  if (operation) {
    previousElement.innerHTML = `${previousOperand} ${operation}`;
  } else {
    previousElement.innerHTML = previousOperand;
  }
  currentElement.innerHTML = currentOperand;
}

function AppendNumber(number) {
  if (number === "." && currentOperand.includes(".")) {
    return; // koşul True olduğunda fonksiyonu çalıştırmaz.Birden fazla "." eklenmesi engellendi.
  }
  if (number === 0 && currentOperand === "0") {
    return; // koşul True olduğunda fonksiyonu çalıştırmaz.Birden fazla "0" eklenmesi engellendi.
  }
  if (currentOperand.length > 6) {
    return; // Ekrana sığması için currentOperand uzunluğu sınırlandırıldı.
  }
  currentOperand += number;
  DisplayNumbers();
}

function ChooseOperation(selectedOperation) {
  if (temporaryOperand) {
    previousOperand = temporaryOperand.toString();
    currentOperand = "";
    temporaryOperand = "";
    operation = selectedOperation;
    DisplayNumbers();
    return;
  }
  // seçilen operatörü değiştirir.
  if (operation) {
    operation = selectedOperation;
    DisplayNumbers();
    return;
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = "";
  DisplayNumbers();
}

function Compute() {
  let computation;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (!operation) return;
  if (isNaN(previous) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "x":
      computation = previous * current;
      break;
    case "/":
      if (previous % current === 0) {
        computation = previous / current;
      } else {
        computation = (previous / current).toFixed(2);
      }
      break;
    default:
      break;
  }

  if (isNaN(computation)) return;

  currentOperand = computation;
  previousOperand = "";
  operation = "";
  DisplayNumbers();
  temporaryOperand = currentOperand;
  currentOperand = "";
}

function AllClear() {
  operation = "";
  previousOperand = "";
  currentOperand = "";
  DisplayNumbers();
}

function PlusMinus() {
  currentOperand = currentOperand * -1;
  DisplayNumbers();
}

function Delete() {
  currentOperand = currentOperand.slice(0, currentOperand.length - 1);
  DisplayNumbers();
}

// Add event listener to operator buttons
for (let j = 0; j < operatorsArray.length; j++) {
  const operator = operatorsArray[j];
  operator.addEventListener("click", () => {
    ChooseOperation(operatorsArray[j].textContent);
  });
}

// Add event listener to top buttons
acButton.addEventListener("click", () => {
  AllClear();
});
equalsButton.addEventListener("click", () => {
  Compute();
});
pmButton.addEventListener("click", () => {
  PlusMinus();
});
deleteButton.addEventListener("click", () => {
  Delete();
});

// Add event listener to number buttons

for (let i = 0; i < numbersArray.length; i++) {
  const number = numbersArray[i];
  number.addEventListener("click", () => {
    AppendNumber(i);
    temporaryOperand = "";
  });
}
decimalButton.addEventListener("click", () => {
  AppendNumber(".");
});
