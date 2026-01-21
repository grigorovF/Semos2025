const square = (x) => {
    return x * x;
}

const addition = (a, b) => {
    return a + b;
}

const substraction = (a, b) => {
    return a - b;
}

const multiplication = (a, b) => {
    return a * b;
}

const division = (a, b) => {
    if (b === 0) {
        return 'Error: Division by zero';
    }
    return a / b;
}

async function positiveNumber (question) {
    let number;
    do {
        number = Number (await question("Enter a positive number: "));
        if (number <=0) {
            console.log("The number is not positive. Please try again.");
        }
    }
    while(number <=0);
    return number;
};

const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
}

const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5/9;
}

const rectAngleArea = (a, b) => {
    return a * b;
}

const rectAnglePerimeter = (a, b) => {
    return 2 * (a + b);
}

module.exports = 
{
    square,
    addition,
    substraction,
    multiplication,
    division,
    positiveNumber,
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    rectAngleArea,
    rectAnglePerimeter,
};