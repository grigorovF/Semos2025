//index

const express = require("express");


const app = express();

app.get('/zdravo/:ime/:prezime', (req, res) => {
    res.send(`Zdravo ${req.params.ime} ${req.params.prezime}`);
});




const samoglaski = ['a', 'e', 'i', 'o', 'u'];

const karakteri = (name) => {
    let brojSamoglaski = 0;
    let brojSoglaski = 0;
    let brojKarakteri = name.length;
    let paren = "neparen";

    for (let i = 0; i < name.length; i++) {
        let karakter = name[i].toLowerCase();

        if (samoglaski.includes(karakter))
            brojSamoglaski++;
        else
            brojSoglaski++;
    }

    if (brojKarakteri % 2 === 0)
        paren = "paren";

    return { brojKarakteri, brojSamoglaski, brojSoglaski, paren };
};

app.get('/ime/:name', (req, res) => {
    const { name } = req.params;

    const {
        brojKarakteri,
        brojSamoglaski,
        brojSoglaski,
        paren
    } = karakteri(name);

    res.send(
        `Karakteri: ${brojKarakteri}\n` +
        `Soglaski: ${brojSoglaski}\n` +
        `Samoglaski: ${brojSamoglaski}\n` +
        `Parnost: ${paren}`
    );
});


app.listen(10000, (err) => {
     if (err) console.log(err.message);
    console.log("Server started on 10000 port");
});