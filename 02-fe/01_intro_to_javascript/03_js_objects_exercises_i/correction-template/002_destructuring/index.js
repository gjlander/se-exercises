// *   **Simple Array Destructuring**
// Initial array
const fruits = ['apple', 'banana', 'cherry', 'date'];

//     Extract the first two elements from the `fruits` array and store them in variables `fruit1` and `fruit2`.

// *   **Skipping Elements in Array Destructuring**

//     Extract the first and third elements from the `fruits` array, skipping the second element.

// *   **Simple Object Destructuring**
// Initial object
const person = {
	name: 'John Doe',
	age: 30,
	address: {
		city: 'New York',
		zip: '10001'
	}
};

//     Extract the `name` and `age` properties from the `person` object.

// *   **Nested Object Destructuring**

//     Extract the `city` from the `address` property of the `person` object.

// *   **Destructuring in Function Parameters**
//     `displayPerson` is function that takes a `person` object
// and logs the `name` and `age` properties using dot notation.
// Modify the function to destructure the `name` and `age` properties directly in the parameters.
// Initial function
function displayPerson(person) {
	console.log(`Name: ${person.name}, Age: ${person.age}`);
}
