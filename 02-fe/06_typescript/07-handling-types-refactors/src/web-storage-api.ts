//FOREACH
//1. Initialize an Array of Numbers:
const nums = [1, 2, 3, 4, 5];

//2. Use the forEach Method to Print Each Number:
// nums.forEach((num) => console.log(num));

//3. Use the forEach Method to Calculate the Sum of the Numbers:
let sum = 0;
nums.forEach(num => (sum += num));
// console.log(sum);
//4. Use the forEach Method to Create a New Array with Squared Values:
const sqrNums = [];
nums.forEach(num => sqrNums.push(num * num));
// console.log(sqrNums);

//MAP
//1. Initialize an Array of Numbers:

//2. Use the map Method to Create a New Array with Doubled Values:
const dblNums = nums.map(num => num * 2);
console.log(dblNums);
//3. Use the map Method to Create a New Array of Strings:
const stringNums = nums.map(num => `Number: ${num}`);
console.log(stringNums);
//4. Use the map Method to Create a New Array of Objects:
const numObjs = nums.map(num => ({ original: num, squared: num * num }));
console.log(numObjs);

//FIND
//1. Initialize an Array of Numbers:
const bigNums = [10, 20, 30, 40, 50];
//2. Use the find Method to Locate a Number Greater Than 25:
const firstOver25 = bigNums.find(num => num > 25);
console.log(firstOver25);
//3. Initialize an Array of Objects:
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 40 }
];
//4. Use the find Method to Locate a Person Named "Charlie":
const charlie = people.find(({ name }) => name === 'Charlie');
console.log(charlie);

//FILTER
//1. Initialize an Array of Numbers:
const numsBy5 = [5, 10, 15, 20, 25, 30];
//2. Use the filter Method to Create a New Array with Numbers Greater Than 15:
const greaterThan15 = numsBy5.filter(num => num > 15);
console.log(greaterThan15);
//3. Initialize an Array of Objects:
const students = [
  { name: 'Alice', grade: 85 },
  { name: 'Bob', grade: 92 },
  { name: 'Charlie', grade: 78 },
  { name: 'David', grade: 88 },
  { name: 'Eve', grade: 95 }
];
//4.Use the filter Method to Create a New Array with Students Who Scored Above 80:
const goodStudents = students.filter(({ grade }) => grade > 80);
console.log(goodStudents);

//1. Initialize an Array of Numbers:
const numsBy4 = [4, 8, 15, 16, 23, 42];
//2. Use the some Method to Check for Numbers Greater Than 20:
const areSomeOver20 = numsBy4.some(num => num > 20);
console.log(areSomeOver20);
//3. Use the every Method to Check for Numbers Less Than 50:
const areAllUnder50 = numsBy4.every(num => num < 50);
console.log(areAllUnder50);
//4. Initialize an Array of Objects:
const moreStudents = [
  { name: 'Alice', age: 25, passed: true },
  { name: 'Bob', age: 22, passed: false },
  { name: 'Charlie', age: 27, passed: true },
  { name: 'David', age: 20, passed: true }
];
//5. Use the some Method to Check if Any Student Failed:
const didAnyFail = moreStudents.some(({ passed }) => !passed);
console.log(didAnyFail);
//6.  Use the every Method to Check if All Students are Older Than 18:
const areAllAdults = moreStudents.every(({ age }) => age > 18);
console.log(areAllAdults);
