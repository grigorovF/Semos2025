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
