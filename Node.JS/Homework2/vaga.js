const gramVoKilogram = (grams)  => {
    return grams / 1000;
}

const kilogramVoGram = (kilograms) => {
    return kilograms * 1000;
}

const litarVoMililitar = (litri) => {
    return litri * 1000;
}

const mililitarVoLitar = (mililitri) => {
    return mililitri / 1000;
}

module.exports = {
    gramVoKilogram,
    kilogramVoGram,
    litarVoMililitar,
    mililitarVoLitar
}