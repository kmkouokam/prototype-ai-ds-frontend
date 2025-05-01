// test.js
const { JSDOM } = require('jsdom');  // Use jsdom to simulate the browser environment
// Import functions from the script
const { appendToDisplay, clearDisplay, calculateResult } = require('./script.js');
// Set up a mock DOM environment
beforeEach(() => {
     const dom = new JSDOM(`
    <html>
      <body>
        <input type="text" id="display" />
      </body>
    </html>
  `);
     global.document = dom.window.document;
     global.window = dom.window;
     global.HTMLElement = dom.window.HTMLElement;
});
// Test case 1: Test appendToDisplay
test('appendToDisplay should append value to display input field', () => {
     appendToDisplay('5');
     const display = document.getElementById('display');
     expect(display.value).toBe('5');

     appendToDisplay('+');
     expect(display.value).toBe('5+');
});
// Test case 2: Test clearDisplay
test('clearDisplay should clear the input field', () => {
     appendToDisplay('5+3');
     clearDisplay();
     const display = document.getElementById('display');
     expect(display.value).toBe('');
});
// Test case 3: Test calculateResult
test('calculateResult should evaluate expression and show result', () => {
     appendToDisplay('5+3');
     calculateResult();
     const display = document.getElementById('display');
     expect(display.value).toBe('8');
});
// Test case 4: Test calculateResult with invalid expression
test('calculateResult should show "Error" for invalid expression', () => {
     appendToDisplay('5/0');
     calculateResult();
     const display = document.getElementById('display');
     expect(display.value).toBe('Error');
});