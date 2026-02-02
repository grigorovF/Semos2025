const square = (x) =>{
    return x*x;
}

const double = (x) => {
    return 2*x;
}

const isPositive = (x) => {
    return x >= 0 ? "Positive" : "Negative";
}

const mToCm = (m) => {
    return m*100;
}

const cmToM = (cm) => {
    return cm/100.00;
}

const perimetar = (a,b) => {
    return 2*a+2*b;
}


const plostina = (a,b) => {
    return a*b;
}


module.exports = {
    square,
    double,
    isPositive,
    mToCm,
    cmToM,
    perimetar,
    plostina
}