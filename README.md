
1. Variable Scope and Assignment (var, let, const)
The key difference between var, let, and const is their scope. var is function-scoped, which can lead to unpredictable behavior. Both let and const are block-scoped (limited to {} curly braces) and are preferred in modern JavaScript. Use const as your default, as it prevents re-assignment of the variable's reference. Only use let if you specifically need to re-assign the variable's value later.

2. Array Iteration and Transformation (map(), forEach(), filter())
These three array methods serve different purposes. map() transforms every item in an array and always returns a new array of the same length with the results. filter() selects a subset of elements that pass a given condition and returns a new array containing only those matches. forEach() simply iterates through the array to perform a side effect (like logging) and returns undefined.

3. Function Conciseness and this Binding (Arrow Functions)
Arrow functions (using =>) are a shorter, more concise syntax for writing function expressions in ES6. Their most significant feature is that they do not bind their own this keyword. Instead, they inherit the this value from the enclosing lexical (parent) scope, which simplifies how you manage context in object methods and callbacks compared to traditional functions.

4. Destructuring Assignment in ES6
Destructuring assignment is a JavaScript expression that enables you to quickly and clearly unpack values from arrays or properties from objects directly into distinct variables. It provides a more elegant and shorter syntax than accessing properties one by one. For objects, you extract properties using their names (e.g., const { name, age } = user;). For arrays, you extract values based on their position or index (e.g., const [first, second] = list;).

5. Template Literals in ES6
Template literals are a modern way to create strings in JavaScript by enclosing text within backticks ( `...` ). They differ significantly from string concatenation because they natively support interpolation (embedding variables or expressions using the ${expression} syntax) and allow strings to span multiple lines without special characters. This makes the code far cleaner and more readable than complex string concatenation using the + operator.
