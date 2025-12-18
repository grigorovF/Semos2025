//Функции во JS

//Function Declaration() f
function myFunction(a, b) {
    return a+b;
}
console.log(myFunction(3,4)); //7

//Function Expression (Функционална експресија)
const myFunctionExpression = function(a, b) {
    return a+b;
};
console.log(myFunctionExpression(3,4)); //7

//Arrow Function (Стрелкова функција)
const myArrowFunction = (a, b) => a-b;
console.log(myArrowFunction(7,4)); //3

const perimetar = (a, b) => 2*((a+b))
console.log(perimetar(4,6)); //20

const usenik = {
    ime: "Filip",
    pozdravi: function() {
        console.log('Zdravo' +  this.ime + '!');
    }
};

usenik.pozdravi(); //Zdravo, Filip!



const c2f = function(c){
   return (c * 9/5) + 32;
} 
console.log(c2f(0)); 

const f2c = function(f){
    res = (f - 32) * 5/9;
    if (res <= 0 || res >= 20){
        console.log ("Temperaaturata e normalna");
    }
    else{
        console.log("Temperaaturata e pokacena");
    };

} 

console.log(f2c(10));



function mnozenje(broj1) {
  return function (broj2) {
    return broj2 * broj1;
  };
}

const pomnozen = mnozenje(2);
console.log(pomnozen(2));

// primer 2

function calculator(operacija) {
  return function (a, b) {
    switch (operacija) {
      case "soberi":
        return a + b;
      case "odzemi":
        return a - b;
      case "pomnozi":
        return a * b;
      case "podeli":
        return a / b;
    }
  };
}

const soberiOperacija = calculator("soberi");
console.log(soberiOperacija(2, 3));
console.log(soberiOperacija(6, 3));
const podeliOperacija = calculator("podeli");
console.log(podeliOperacija(18, 3));


//! undefined
//! null

//! TYPEOF
console.log(typeof undefined);
console.log(typeof 230);
console.log(typeof 12n);
console.log(typeof false);
console.log(typeof "false");
console.log(typeof null);
console.log(console.log);
console.log(console);

//! BOOLEAN TRUE FALSE
console.log(Boolean(1)); //true
console.log(Boolean(0)); //false
console.log(Boolean("1")); //true
console.log(Boolean("")); //false

console.log(2 > 1);
console.log(2 == "2");
console.log(2 === "2");
console.log(2 != 1);

console.log(`${+true}`);
console.log(`${+false}`);
console.log(`${+""}`);

//!    ||   -> or
//!    &&.  -> and

//! or
console.log(true || true); //true
console.log(true || false); //true
console.log(false || true); // true
console.log(false || false); //false

//! and
console.log(true && true); //true
console.log(true && false); //false
console.log(false && true); // false
console.log(false && false); //false

//! Ternary opeartors
const godini = 16;
const vozdrast = godini >= 18 ? "polnoletno" : "ne e polnoletno";
console.log(vozdrast);

//! Working with arrays

const arrayEden = [5, 2, 4, 6, 7, 8, 3, 7, 6];
const arrayDva = [5, 2, 4, 6, 7, 8, 3, 7];
const arrayNov = [];

for (let i = 0; i < arrayEden.length; i++) {
  arrayNov[i] = arrayEden[i] + 1;
}

console.log(arrayNov);

//! forEach vrshi iteracija na sekoj element vo arrayot znaci ne mo modificira arrayot po defult tuku samo go izminuca
arrayEden.forEach((item, i) => console.log(i));
arrayDva.forEach((item, i, arr) => (arr[i] = item + 10));

//! MAP metoda izminuva niza, i rezultatot e nova niza
const novaNiza = arrayEden.map((item, i) => {
  return i + 1;
});

console.log(novaNiza);

const rezultat = arrayEden.reduce((acc, s) => {
  return acc + s;
}, 0);

console.log(rezultat);

//! FILTER vrakja niza od elementi koi odgovaraat na postaven uslov

const brojkiFilter = arrayEden.filter((item) => {
  return item > 5;
});
console.log(brojkiFilter);

//! Find vrakja element od nizata koj odgovara za postaven uslov

const brojkaFind = brojkiFilter.find((s) => {
  return s === 6;
});

console.log(brojkaFind);

const studenti = [
  { ime: "Bojan", prosek: 7.2, grad: "Skopje" },
  { ime: "Pero", prosek: 8.3, grad: "Bitola" },
  { ime: "Janko", prosek: 6.9, grad: "Kumanovo" },
  { ime: "Vesna", prosek: 9.1, grad: "Skopje" },
  { ime: "Elena", prosek: 9.9, grad: "Tetovo" },
  { ime: "Vancho", prosek: 9.4, grad: "Kumanovo" },
  { ime: "Simona", prosek: 9.7, grad: "Kratovo" },
  { ime: "Trajamla", prosek: 7.4, grad: "Ohrid" },
  { ime: "Ivana", prosek: 6.9, grad: "Ohrid" },
  { ime: "Natasha", prosek: 9.0, grad: "Kichevo" },
  { ime: "Stanko", prosek: 8.5, grad: "Demir Kapija" },
  { ime: "Damjan", prosek: 6.2, grad: "Kumanovo" },
  { ime: "Sandra", prosek: 8.2, grad: "Ohrid" },
];

const filtriraniStudenti = studenti
  .filter((student) => student.prosek > 9.2)
  .sort((a, b) => b.prosek - a.prosek)
  .slice(0, 3);

const baranjeNaStipendist = studenti.find((student) => student.prosek === 10);

const ocenkitStudent = studenti.map((s) => {
  return {
    ...s,
    prosek: s.prosek > 7.1 ? s.prosek + 1 : s.prosek,
  };
});
