const readline = require('readline');

const {
    square,
    double,
    isPositive,
    mToCm,
    cmToM,
    perimetar,
    plostina,
} = require ('./modules.js');
const { log } = require('console');



const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout

});

const question = (q) => {
    return new Promise(resolve => rl.question(q, resolve));
}

async function main(){
    const q1 = Number(await question("Vnesi broj:"));
    console.log(`Kvadrat na brojot ${q1} e ${square(q1)}`);

    const q2 = Number(await question("Vnesi broj:"));
    console.log(`Duplirana vrednost od ${q2} e ${double(q2)}`);
    
    const q3 = Number(await question("Vnesi broj za pozitivnost:"));
    console.log(`Brojot ${q3} e ${isPositive(q3)}`);
    
    const q4 = Number(await question("Vnesi metri:"));
    console.log(`${q4}m  = ${mToCm(q4)}cm`);
    
    const q5 = Number(await question("Vnesi centimetri:"));
    console.log(`${q5}cm  = ${cmToM(q5)}mm`);

    //so dva parametri
    const strani = await(question ("Vnesi strani a,b: "));
    const [a, b] = strani.split(' ').map(Number);
    console.log(`Perimetar na pravoagolnik so strani ${a} i ${b} e ${perimetar(a, b)}`);

    const plostinaStrani = await (question('Vnesi strani a,b: '))
    const [c, d] = plostinaStrani.split(' ').map(Number);
    console.log(`Plostina na pravoagolnik so strani ${c} i ${d} e ${plostina(c, d)}`);
    
    
    rl.close();
}

main()