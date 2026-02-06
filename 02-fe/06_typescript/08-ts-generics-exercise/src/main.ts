// === Generics Practice ===
// You will be implementing three utility functions using generics.
// These functions are very common patterns in typed codebases.

// ----------------------------------------------------
// 1. Create a generic function called `wrapInArray`
//    It should take a single value of any type and return an array with that value inside.
const wrapInArray = <T>(item: T): T[] => [item];
//    For example:
const wrappedNumber = wrapInArray<number>(5); // [5]
const wrappedString = wrapInArray<string>('hello'); // ["hello"]
const wrappedBool = wrapInArray<boolean>(true); // [true]
//
//    Hint: Use a generic type parameter <T>
console.log(wrappedNumber, wrappedString, wrappedBool);
// ----------------------------------------------------
// 2. Create a generic function called `firstItem`
//    It should take an array of any type and return the first element of that array.
//    If the array is empty, return undefined.
const firstItem = <T>(array: T[]): T | undefined => array[0];
//    For example:
const name = firstItem(['Ada', 'Grace']); // "Ada"
const number = firstItem([10, 20, 30]); // 10
const none = firstItem([]); // undefined
//
//    Hint: return type should be T | undefined
console.log(name, number, none);
// ----------------------------------------------------
// 3. Create a generic function called `mergeObjects`
//    It should take two objects and merge them into a single object.
//    The resulting object should contain all the keys and values from both.
const mergeObjects = <T extends object, U extends object>(obj1: T, obj2: U): T & U => ({ ...obj1, ...obj2 });
//    For example:
const merged = mergeObjects({ name: 'Ada' }, { age: 36 });
//    // Result: { name: "Ada", age: 36 }
//
const result = mergeObjects({ loggedIn: true }, { role: 'admin' });
//    // Result: { loggedIn: true, role: "admin" }
//
//    Hint: Use <T, U> as generic type parameters and return T & U
console.log(merged, result);
// ----------------------------------------------------
// 4. Create a type alias called `ApiResponse<T>`
//    It should describe an object with:
//    - `success: boolean`
//    - `data: T`
type ApiResponse<T> = {
  success: boolean;
  data: T;
};
//    Then use this type to define what the response of a fake API call might look like.
//
//    Example:
const userResponse: ApiResponse<{ name: string; age: number }> = {
  success: true,
  data: { name: 'Ada', age: 36 }
};
console.log(userResponse);
// ----------------------------------------------------
// 5. Create a generic function called `pluck`
//    It should take an object and a key, and return the value at that key.
//
//    - The object can be of any shape (use a generic type T)
//    - The key must be one of the keys of that object (use keyof T)
//    - The return type should be the type of that value (T[K])
const pluck = <T extends object, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
//    For example:
const user = { name: 'Ada', age: 36 };
const userName = pluck(user, 'name'); // "Ada"
const age = pluck(user, 'age'); // 36

console.log(user, userName, age);
//    Hint: Function signature will look something like:
//    function pluck<T, K extends keyof T>(obj: T, key: K): ????
