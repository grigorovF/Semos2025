const readline = require('readline');


const {
    findSum,
    findMin
} = require('./arrausmodules');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (q) =>{
    return new Promise(resolve => rl.question(q, resolve));
}

async function main(){
    let numbers = [];

    while (true){
        const input = Number(await question("Please enter a number:"));

        if (input < 0)
            break;

        numbers.push(input);
    }

    rl.close();
    console.log("Sumata na cela niza e:", findSum(numbers));
    console.log(`Minimum = ${findMin(numbers)}`);
}

main();