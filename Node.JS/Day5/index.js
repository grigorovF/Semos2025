
const readWriteDelete = require('./readwrite.js');

(async () => {
    try {
        const dataString = await readWriteDelete.fileRead('studenti.json');

        console.log('RAW DATA:', dataString);

        const studenti = JSON.parse(dataString);

        sortirani = studenti.sort((a, b) => b.prosek - a.prosek);

        highest = sortirani[0];
        lowesest = sortirani[sortirani.length-1];

        console.log('Highest average:', highest);
        console.log('Lowest average:', lowest);

    } catch (err) {
        console.error('ERROR:', err.message);
    }
})();


//domasno 
//json fajl so student [id, ime, prezime, prosek, grad]
// dodavanje student-brisenje
// menuvanje na podatoci
// citanje na site studenti

// Treba da dodademe student
//1. Vcituvanje |fs.readFile 
//2. konverzija JSON.PArse
//3. Treba da gi dodadete podatocite vo nizata | array.push
//4. Nizata od JS Objekt/niza treba da bide konvertirana vo text | JSSON.stringify
//5. Tekstot da bide zacuvan vo fajlot  | fs.write

// Imeto da bide smeneto od aaa vo bbb
//1. Citanje na celata sodrzina | fs.readFile
//2. Koncertiranje od tekst vo js niza | JSON.Parse
//3. Minuvanje na site i izmena samo na soodveten clen
//4. Nizata od JS da se konvertita vo text | JSON.stringify
//5. Tekstot da e zacuvan vo fajl | fs.writeFile

//Treba da se izbrise student od fajlot
//1. Da ja vcitame sodrzinata od fajlot
//2 Parsiranje
//3. Moze da izbrisime soodveten clen
//4. Da ja konvertirame nazad vo JSON
//5. Da go zacuvame samiot fajl/ Podatok