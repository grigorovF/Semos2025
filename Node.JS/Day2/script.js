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


//high order function

