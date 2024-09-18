document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.querySelector('.input');
    const resultElement = document.querySelector('.result');
    const buttons = document.querySelectorAll('.buttons-grid button');

    let expression = '';
    let isResultDisplayed = false;
    let lastAnswer = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();

            // If the user presses a number or period, add it to the expression
            if (button.classList.contains('number') || buttonText === '.') {
                if (isResultDisplayed) {
                    expression = buttonText;  // Start a new expression if a result was previously displayed
                    isResultDisplayed = false;
                } else {
                    expression += buttonText;
                }
                updateDisplay();
            }

            // Handle operator buttons
            else if (button.classList.contains('operator')) {
                if (buttonText === 'ans') {
                    expression += lastAnswer;
                } else if (buttonText === 'del') {
                    expression = expression.slice(0, -1);
                } else if (buttonText === 'clr') {
                    expression = '';
                    resultElement.textContent = '0';
                } else if (buttonText === '+/-') {
                    toggleSign();
                } else if (buttonText === 'x²') {  // Handle the square function
                    expression += '^2';  // Append the square symbol to the expression
                } else {
                    if (isResultDisplayed) {
                        isResultDisplayed = false;
                    }
                    expression += buttonText;
                }
                updateDisplay();
            }

            // Enter button triggers evaluation of the expression
            else if (button.classList.contains('Enter')) {
                calculateResult();
            }
        });
    });

    // Update the input display
    function updateDisplay() {
        inputElement.textContent = expression;
    }

    // Toggle positive/negative sign
    function toggleSign() {
        if (expression && !isNaN(expression)) {
            expression = expression.startsWith('-') ? expression.slice(1) : '-' + expression;
        }
    }

    // Evaluate the expression and update the result
    function calculateResult() {
        try {
            // Handle squaring if the expression contains '^2'
            if (expression.includes('^2')) {
                expression = handleSquareCalculation(expression);
            }

            // Use eval() to compute the result with proper percentage and square handling
            let result = eval(expression.replace('%', '/100'));
            result = parseFloat(result.toFixed(10));  // Prevent floating-point precision errors
            resultElement.textContent = result;
            lastAnswer = result;  // Store the result for future use with "ans"
            isResultDisplayed = true;
            expression = result.toString();  // Allow chaining operations
        } catch (e) {
            resultElement.textContent = 'Error';
            expression = '';  // Reset the expression if there's an error
        }
    }

    // Function to handle square calculation
    function handleSquareCalculation(expr) {
        return expr.replace(/(\d+(\.\d+)?)\^2/g, (_, num) => Math.pow(parseFloat(num), 2));
    }
});
