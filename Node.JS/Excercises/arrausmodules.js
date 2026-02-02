const findSum = (arr) => {
    return arr.reduce((sum, num) => sum+num, 0);
}

const findMin = (arr) => {
    return Math.min(...arr);
}
module.exports = {
    findSum,
    findMin
}