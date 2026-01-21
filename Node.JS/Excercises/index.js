const readline = require('readline');
const{
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
} = require('./modules');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (q) => {
    return new Promise((resolve) => r1.question(q, resolve));
}

async function main() {
    //zadaca1
    const num = Number (await question("Square number: "));
    console.log(`Number ${num} squared is ${square (num)}`);

    //zadaca2
    const numbers = await (question("Enter two numbers: "));
    const [num1, num2] = numbers.split(' ').map(Number);
    console.log(
        `${num1} + ${num2} = ${addition(num1, num2)}
         ${num1} - ${num2} = ${substraction(num1, num2)}
        ${num1} * ${num2} = ${multiplication(num1, num2)}
        ${num1} / ${num2} = ${division(num1, num2)}
    `
    );
    //Level2

    //zadaca3
    await positiveNumber(question);

    //zadaca4
    const celsius = Number (await question("Enter temperature in Celsius: "));
    console.log(`${celsius}°C is equal to ${celsiusToFahrenheit(celsius)}°F`);
    
    const fahrenheit = Number (await question("Enter temperature in Fahrenheit: "));
    console.log(`${fahrenheit}°F is equal to ${fahrenheitToCelsius(fahrenheit)}°C`);
    
    //zadaca5
    const strani = await (question("Enter the two sides of the rectangle: "));
    const [a, b] = strani.split(' ').map(Number);
    console.log(
        `Area of rectangle: ${rectAngleArea(a, b)}
         Perimeter of rectangle: ${rectAnglePerimeter(a, b)} `
    );   

    console.log("Do you want to solve another rectangle? (Y/N)");
    const answer = await question("");
    if (answer.toLowerCase() ==='y') {
        const strani = await (question("Enter the two sides of the rectangle: "));
        const [a, b] = strani.split(' ').map(Number);
        console.log(
            `Area of rectangle: ${rectAngleArea(a, b)}
             Perimeter of rectangle: ${rectAnglePerimeter(a, b)} `
        );
    }
    else{
        console.log("Thank you! Goodbye!");
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    r1.close();

}

main()