const readline = require('readline');
const {
    gramVoKilogram,
    kilogramVoGram,
    litarVoMililitar,
    mililitarVoLitar,
} = require('./vaga');

const {
    daliEParen,
    perimetarPravoagolnik,
    plostinaPravoagolnik,
    fahrenheitVoCelsius,
    celsiusVoFahrenheit
} = require('./domasna');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (q) => {
    return new Promise((resolve) => rl.question(q, resolve));
};

async function main() {
    const q1 = Number(await question("Vnesi Grami: "));
    console.log(`${q1} grami se ${gramVoKilogram(q1)} kilogrami.`);

    const q2 = Number(await question("Vnesi Kilogrami: "));
    console.log(`${q2} kilogrami se ${kilogramVoGram(q2)} grami.`);

    const q3 = Number(await question("Vnesi Litri: "));
    console.log(`${q3} litri se ${litarVoMililitar(q3)} mililitri.`);

    const q4 = Number(await question("Vnesi Mililitri: "));
    console.log(`${q4} mililitri se ${mililitarVoLitar(q4)} litri.`);

    const broj = Number(await question("Vnesi broj: "));
    console.log(`Brojot ${broj} e ${daliEParen(broj)}.`);

    const strani = await (question("Vnesi gi stranite na pravoagolnikot: "));
    const [a, b] = strani.split(' ').map(Number);
    console.log(`Perimetarot na pravoagolnikot e ${perimetarPravoagolnik(a, b)} cm.`);
    console.log(`Plostinata na pravoagolnikot e ${plostinaPravoagolnik(a, b)} cm2.`);

    const farenheit = Number(await question("Vnesi temperatura vo Fahrenheit: "));
    console.log(`${farenheit}°F se ${fahrenheitVoCelsius(farenheit)}°C.`);

    const celzius = Number(await question("Vnesi temperatura vo Celsius: "));
    console.log(`${celzius}°C se ${celsiusVoFahrenheit(celzius)}°F.`);
    rl.close();
}

main();