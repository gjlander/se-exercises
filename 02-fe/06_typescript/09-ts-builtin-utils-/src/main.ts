// ------------------------------------------
// Built-in Utility Types Practice
// ------------------------------------------

// 1. Partial
// Use Partial to make all properties in the User type optional.

type User = {
  id: number;
  name: string;
  email: string;
};

type PartialUser = Partial<User>;

// TODO: Create a variable `draftUser` of type Partial<User>
// and assign only one property to it.

const draftUser: PartialUser = { name: 'Draft' };
console.log(draftUser);

// 2. Required
// Use Required to make sure all fields are required.

type Settings = {
  darkMode?: boolean;
  fontSize?: number;
};

type ReqSettings = Required<Settings>;
// TODO: Create a variable `strictSettings` of type Required<Settings>
// and provide all the properties.

const strictSettings: ReqSettings = { darkMode: true, fontSize: 16 };
console.log(strictSettings);

// 3. Readonly
// Make a Book object that cannot be edited after creation.

type Book = {
  title: string;
  author: string;
};

type ReadonlyBook = Readonly<Book>;

// TODO: Use Readonly<Book> to make the book immutable.
// Try changing a property and see the error.

const book: ReadonlyBook = { title: '1984', author: 'George Orwell' };
// book.title = 'Animal Farm'; // ❌ Should be a compile error
console.log(book);

// 4. Record
// You’re building a key-value map of scores per user.
// Keys are usernames (string), values are numbers.

// TODO: Use Record<string, number> to type this object
type ScoresMap = Record<string, number>;
const scores: ScoresMap = {
  alice: 42,
  bob: 36
};
console.log(scores);
// 5. Pick
// Pick only the name and email from the User type.

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

// TODO: Create a type ContactInfo using Pick
// Then create a variable `contactInfo` with only those props.
type EmailInfo = Pick<Contact, 'name' | 'email'>;

const contactInfo: EmailInfo = { name: 'Grace', email: 'grace@example.com' };
console.log(contactInfo);

// 6. Omit
// Now do the reverse: remove the phone from Contact.

// TODO: Create a type ContactNoPhone using Omit
// Then try assigning a variable with a `phone` property and see the error.
type ContactNoPhone = Omit<Contact, 'phone'>;
const contactNoPhone: ContactNoPhone = {
  id: 1,
  name: 'Alan',
  email: 'alan@example.com'
  // phone: 'should not be allowed' // ❌
};
console.log(contactNoPhone);
