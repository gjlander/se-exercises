// INITIALIZATION
// 1. Initialize an Array
// const myArray = [42, 'Hello, world!', true, 3, 14, 'JavaScript'];

// 2. Print the Array:
// console.log(myArray);

// 3. Access Array Elements:
// for (let i = 0; i < myArray.length; i++) {
//     console.log(myArray[i]);
// }

// 4. Modify an Array Element:
// myArray[1] = 'Changed Value';
// console.log(myArray[1]);

//PUSH, POP, SHIFT, UNSHIFT
//1. Initialize an Array:
const myArray = [1, 2, 3, 4, 5];

// 2. Add Elements to the End of the Array:
myArray.push(6, 7);
// console.log(myArray);

// 3. Remove the Last Element from the Array:
myArray.pop();
// console.log(myArray);

// 4. Remove the First Element from the Array:
myArray.shift();
// console.log(myArray);

// 5. Add Elements to the Beginning of the Array:
myArray.unshift(-1, 0);
// console.log(myArray);

//REVERSING
// Array 1: Use reverse() method
const array1 = [1, 2, 3, 4, 5];
// Reverse array1 in place and print the result

// Array 2: Use toReversed() method
const array2 = ['a', 'b', 'c', 'd', 'e'];

//1. Reverse the First Array in Place:
array1.reverse();

//2. Create a Reversed Copy of the Second Array:
const revArray = array2.toReversed();

//3. Print the Results:
// console.log(array1);
// console.log(revArray);
// console.log(array2);

//SPLICING
// Array 1: Use splice() method
const arrayA = [10, 20, 30, 40, 50];
// Modify array1 in place by removing and adding elements, then print the result

// Array 2: Use toSpliced() method
const arrayB = ['x', 'y', 'z'];
// Create a modified copy of array2 and print both arrays

//1. Remove the element at index 2 and add 35 and 36:
arrayA.splice(2, 1, 35, 36);

//2. Remove the element at index 1 and add b and c with toSpliced
const newArray = arrayB.toSpliced(1, 1, 'b', 'c');

//3. Print the Results:
// console.log(arrayA);
// console.log(newArray);
// console.log(arrayB);

//SLICING

//1. You will be given an array.
const array = [2, 4, 6, 8, 10, 12, 14, 16];

//2. Use the slice method to extract different portions of the array.
const slice1 = array.slice(1, 4);
const slice2 = array.slice(0, 7);
const slice3 = array.slice(4, 5);

//3. Print the original array and the sliced portions to the console.
// console.log(slice1);
// console.log(slice2);
// console.log(slice3);
// console.log(array);

//JOIN
//1. You will be given an array of strings.
const strings = ['apple', 'banana', 'cherry', 'date'];
//2. Use the join method to create different strings by joining the array elements with various delimiters.
// Default delimiter (comma)
const comma = strings.join();
// Using dash as delimiter
const dash = strings.join('-');
// Using space as delimiter;
const space = strings.join(' ');
// Using ' and ' as delimiter
const and = strings.join(' and ');
// Without any delimiter
const empty = strings.join('');
//3. Print the original array and the resulting strings to the console.
// console.log(strings);
// console.log(comma);
// console.log(dash);
// console.log(space);
// console.log(and);
// console.log(empty);

//LOOPS (FOR AND FOR...OF)
//1. Initialize an Array of Numbers:
const numArray = [10, 20, 30, 40, 50];
//2. Iterate Over the Array with a for Loop:
// for (let i = 0; i < newArray.length; i++) {
//     console.log(numArray[i]);
// }
//3. Iterate Over the Array with a for...of Loop:
for (const num of numArray) {
    console.log(num);
}
