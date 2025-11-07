//strings con

let ime = 'Filip'
let prezime = 'Grigorov'
let vozrast = 31
let zemja = "MKD"

console.log("Zdravo, jas sum", ime, " ", prezime, ', imam ', vozrast, ' godini i doagam od ', zemja)


let age = 25;
let isStudent = false;
let hasLicense = true;

if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}



if (age >= 18) {
    if (hasLicense) {
        console.log("You can drive.");
    } else {
        console.log("You cannot drive yet.");
    }
} else {
    console.log("You are too young to drive.");
}

if (age < 13) {
    console.log("You are a child.");
} else if (age < 20) {
    console.log("You are a teenager.");
} else if (age < 40) {
    console.log("You are an adult.");
} else {
    console.log("You are middle-aged or older.");
}