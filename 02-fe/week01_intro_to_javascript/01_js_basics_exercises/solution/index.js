// 001 Variables ////////////////////////////////////////////////////

// 1. Declare Variables with let and const:
let age = 25;

const birthYear = 1999;
let name = 'John Doe';
const isStudent = true;

// 2. Reassign Values:
age = 26;
name = 'Jane Doe';
// birthYear = 2000;
// isStudent = false;

//3. Print Variables
// console.log(age);
// console.log(birthYear);
// console.log(name);
// console.log(isStudent);

// 4. Create and Modify a New Variable
let favoriteColor = 'blue';
// console.log(favoriteColor);
favoriteColor = 'green';
// console.log(favoriteColor);

// 002 Arithmetic ///////////////////////////////////////////////////////////////////////////

//1. Addition with Mixed Types
const num = 6;
const strNum = '11';
// console.log(num + strNum); //Concatenates with type string

//2. Subtraction with Mixed Types
// console.log(num - strNum); //Strings don't have a -, so coerces

//3. Multiplication with a String
// console.log(strNum * 3);

// 4. Division by a String
// console.log(44 / strNum);

// 5 Modulus Operation
// console.log(45 % 17);

// console.log(45 % '17');

//6. Perform a Series of Numeric Operations
// console.log(45 + 13 + '14');

// 003 Comparisons /////////////////////////////////////////////////////////////////////////////
// Strict vs Simple Equality and Inequality
// console.log('5 == "5": ', 5 == '5'); // Simple Equality, should be true
// console.log('5 === "5": ', 5 === '5'); // Strict Equality, should be false
// console.log(5 > 3);
// console.log(5 > '3');
// console.log(10 < 20);
// console.log(10 < '20');
// console.log(10 <= '10');

// 004 Conditionals ///////////////////////////////////////////////////////////////////////////
const temp = 21;

if (temp < 15) {
  console.log('Wear a coat');
} else if (temp > 15 && temp < 25) {
  console.log('Wear a sweater');
} else {
  console.log('Wear a t-shirt');
}

switch (true) {
  case temp < 10:
    console.log('Wear a real thick coat');
    break;
  case temp > 10 && temp < 20:
    console.log('Wear a light coat');
    break;
  default:
    console.log('Wear a t-shirt');
    break;
}

//Loops
const animals = ['lion', 'tiger', 'bear', 'giraffe', 'zebra', 'monkey'];
let totalAnimals = 0;
for (let i = 0; i < animals.length; i++) {
  totalAnimals++;
}
// console.log(`There are ${totalAnimals} animals in the zoo.`);

let animals5OrMore = 0;
let i = 0;
while (i < animals.length) {
  if (animals[i].length >= 5) {
    animals5OrMore++;
  }
  i++;
}
// console.log(`There are ${animals5OrMore} animals with 5 or more letters`);

let count = 0;
do {
  if (animals[count].startsWith('m')) {
    break;
  }
  count++;
} while (count < animals.length);

// console.log(`Count until m: ${count}`);

// 006 Functions //////////////////////////////////////////////////
//Part 1 Function Declarations
// 1.Declare a function with no parameters that outputs something to the console.
const helloWorld = () => {
  console.log('Hello, World!');
};
// helloWorld();

// 2. Declare a function with one parameter that returns something.
const square = num => num * num;
const squareOf5 = square(5);
// console.log(squareOf5);

// 3. Declare a function with one parameter that performs a control flow with a switch statement and returns accordingly.
function getDayName(num) {
  switch (num) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';

    default:
      return 'Invalid number!';
  }
}

const day3 = getDayName(3);
// console.log(day3);

const arrowDayName = num => {
  switch (num) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';

    default:
      return 'Invalid number!';
  }
};

// 007 Variables and Scope ///////////////////////////////////////
// 1. Global and Function Scope with var:
var myVar = 'Global with var';
function test() {
  // var, let and const behave very similar whtn it comes to function scope
  var myVar = 'Function scoped with var';
  console.log(myVar);
}

test();

console.log(myVar);

//2. Block Scope with let and const:
//3. Redeclaration with var:

if (true) {
  let myLetVar = 'something';
  const myConstVar = 'something else';
  var myVar = 're-declared';
  // let myLetVar = 'something';
  // const myConstVar = 'something else';
  console.log(myLetVar);
  console.log(myConstVar);
  console.log(myVar);
}
// let and const are scoped to the blocks they are declared in
// console.log(myLetVar);
// console.log(myConstVar);
console.log(myVar);

//4. Usage of const for Arrays and Objects:

const myArray = [1, 2, 3];
console.log(myArray);
myArray.push(4);
console.log(myArray);
