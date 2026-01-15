const {
    gramVoKilogram,
    kilogramVoGram,
    litarVoMililitar,
    mililitarVoLitar
} = require('./vaga');



const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Vnesi grami: ', (a) => {
    a = Number(a);
    console.log("Vo kilogrami: " + gramVoKilogram(a));

    rl.question('Vnesi kilogrami: ', (b) => {
        b = Number(b);
        console.log("Vo grami: " + kilogramVoGram(b));

        rl.question('Vnesi litri: ', (c) => {
            c = Number(c);
            console.log("Vo mililitri: " + litarVoMililitar(c));

            rl.question('Vnesi mililitri: ', (d) => {
                d = Number(d);
                console.log("Vo litri: " + mililitarVoLitar(d));

                rl.close();
            });
        });
    });
});


const {
    daliEParen,
    perimetarPravoagolnik,
    plostinaPravoagolnik,
    fahrenheitVoCelsius,
    celsiusVoFahrenheit
} = require('./domasna');

const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

rl2.question('Vnesi broj: ', (num) => {
    num = Number(num);
    console.log(daliEParen(num));

    rl2.question('Vnesi strani na pravoagolnik (a b): ', (sides) => {
        const [a, b] = sides.split(' ').map(Number);
        console.log("Perimetar: " + perimetarPravoagolnik(a, b));
        console.log("Plostina: " + plostinaPravoagolnik(a, b));
    

        rl2.question('Vnesi temperatura vo Fahrenheit: ', (f) => {
            f = Number(f);
            console.log("Vo Celsius: " + fahrenheitVoCelsius(f));   

            rl2.question('Vnesi temperatura vo Celsius: ', (c) => { 
                c = Number(c);
                console.log("Vo Fahrenheit: " + celsiusVoFahrenheit(c));});

                rl2.close();
            });
    });
});