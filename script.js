function appendToDisplay(value) {
     document.getElementById('display').value += value;
}

function clearDisplay() {
     document.getElementById('display').value = '';
}

function calculateResult() {
     let display = document.getElementById('display');
     try {
          display.value = eval(display.value);  // Evaluates the expression in the input field
     } catch (error) {
          display.value = 'Error';
     }
}