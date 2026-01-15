const daliEParen = (broj) => {
    return broj % 2 === 0 ? "Paren" : "Neparen";
}

const perimetarPravoagolnik = (a, b) => {
    return 2 * (a + b);
}

const plostinaPravoagolnik = (a, b) => {
    return a * b;
}   

const fahrenheitVoCelsius = (f) => {
    return (f - 32) * 5 / 9;
}

const celsiusVoFahrenheit = (c) => {
    return (c * 9 / 5) + 32;
}

module.exports = {
    daliEParen,
    perimetarPravoagolnik,
    plostinaPravoagolnik,
    fahrenheitVoCelsius,
    celsiusVoFahrenheit
}   