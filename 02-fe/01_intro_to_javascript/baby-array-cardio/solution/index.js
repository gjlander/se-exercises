// Declare two variables, one with const and one with let
// Give each one any value you'd like (string, number, array, object, boolean)
const myConst = 'Hip hip hooray!';

let myLet = 23;

// Log the values of each one of them to the console
console.log('myConst: ', myConst);
console.log('myLet: ', myLet);

// Create an ES5 function with no parameters that prints a string to the console. Then call it.

//function declaration
function saySomething() {
  console.log('Something, I say!');
}

//function expression
// const saySomething = function () {
//     console.log('Something, I say!');
// };

saySomething();

// Create an ES5 function that takes 2 parameters and **RETURNS** a string that includes those 2 parameters using template literal. Then log the value of that function to the console.
function madLibs(name, thing) {
  return `My name is ${name}, and I like ${thing}!`;
}

const funString = madLibs('Aang', 'penguin sledding');
console.log('funString: ', funString);

// Transform the 2 ES5 functions from the previous exercises into ES6
const saySomethingES6 = () => {
  console.log('Something, I say!');
};

const madLibsES6 = (name, thing) => {
  return `My name is ${name}, and I like ${thing}!`;
};

const es6String = madLibsES6('Jeffrey', 'to party');

console.log('es6String: ', es6String);

// Create an array containing 5 elements.
const myArray = [1, '2', true, 48, 'I am a string.'];

// Log the first 2 values to the console
console.log('first 2 values in myArray (w/ bracket notation): ', myArray[0], myArray[1]);

const [element1, element2] = myArray;
console.log('first 2 values in myArray (w/ destructuring): ', element1, element2);

// Log the last element in the array to the console
console.log('last item in myArray (fixed value): ', myArray[4]);
console.log('last item in myArray (based on array length): ', myArray[myArray.length - 1]);

// Log the 3rd and 4th elements in the array to the console
console.log('3rd and fourth elements of myArray (w/bracket notation): ', myArray[2], myArray[3]);

const [, , element3, element4] = myArray;
console.log('3rd and fourth elements of myArray (w/destructuring): ', element3, element4);

// Create an object with the keys "name", "age", "occupation" and "hobbies" (hobbies should be an array)
const someGuy = {
  name: 'Gerald',
  age: 32,
  occupation: 'Fireman',
  hobbies: ['golfing', 'running', 'sitting upside-down']
};

// Log the name to the console

console.log("someGuy's name (w/ dot notation): ", someGuy.name);

const { name } = someGuy;
console.log("someGuy's name (w/ destructuring): ", name);

// Log the occupation and age to the console
console.log(`(w/ dot notation) someGuy's age: ${someGuy.age}. and occupation: ${someGuy.occupation}`);
const { age, occupation } = someGuy;
console.log(`(w/ destructuring) someGuy's age: ${age}. and occupation: ${occupation}`);

// Log all the hobbies to the console
console.log("someGuy's hobbies (w/ dot notation): ", someGuy.hobbies);

const { hobbies } = someGuy;
console.log("someGuy's hobbies (w/ destructuring): ", hobbies);

// Log only the first hobby to the console
console.log("someGuy's first hobby (w/ dot notation): ", someGuy.hobbies[0]);
console.log("someGuy's first hobby (w/ destructuring): ", hobbies[0]);

// Create an array containing 3 objects. The objects should have the same keys as the one in the previous exercise
const somePeople = [
  {
    name: 'Sally',
    age: 77,
    occupation: 'retired',
    hobbies: ['watching grass grow', 'yelling at kids to get off her lawn']
  },
  {
    name: 'Frank',
    age: 18,
    occupation: 'waiter',
    hobbies: ['eating an entire pizza in one sitting', 'rock climbing']
  },
  {
    name: 'Francis',
    age: 46,
    occupation: 'banker',
    hobbies: ['board games', 'cooking']
  }
];

// Loop through the array of objects and log all the names to the console
// for loop
for (let i = 0; i < somePeople.length; i++) {
  // can still use dot notation or destructuring
  const { name } = somePeople[i];
  console.log(`name of some person at index ${i}: `, name);

  // console.log(`name of some person at index ${i}: `, somePeople[i].name);
}
//for ... of loop
for (const somePerson of somePeople) {
  // can still use dot notation or destructuring
  const { name } = somePerson;
  console.log(`name of somePerson: `, name);
  // console.log(`name of somePerson: `, somePerson.name);
}
