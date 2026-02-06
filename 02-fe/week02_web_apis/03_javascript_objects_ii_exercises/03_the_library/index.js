// Create a base class LibraryItem  with private fields for title and author, and a method getInfo() to return a string with the item's title and author
class LibraryItem {
    #title;
    #author;
    constructor(title, author) {
        this.#title = title;
        this.#author = author;
    }
    // Since we are using private class fields, we need to create special functions called getters to get the info securely from other classes that inherit from it.
    getTitle() {
        return this.#title;
    }
    getAuthor() {
        return this.#author;
    }
    getInfo() {
        return `Title: ${this.#title}, Author: ${this.#author}`;
    }
}
// Create a subclass Book that inherits from LibraryItem and adds a private field pages and a public method getInfo() that extends getInfo() to include the number of pages.
class Book extends LibraryItem {
    #pages;
    constructor(title, author, pages) {
        super(title, author);
        this.#pages = pages;
    }
    // In this example, the getInfo() method in LibraryItem and Book classes is a form of polymorphism. Remember, objects responding differently to the same methods.
    getInfo() {
        return `Title: ${this.getTitle()}, Author: ${this.getAuthor()}, Pages: ${
            this.#pages
        }`;
    }
}
// Create another subclass Member with private fields name and booksCheckedOut (an array to store Book objects).
class Member {
    #name;
    #booksCheckedOut;
    constructor(name) {
        this.#name = name;
        this.#booksCheckedOut = [];
    }
    // Add public methods checkOutBook(book), returnBook(book), and listBooks() to manage the books a member has checked out.
    checkOutBook(book) {
        this.#booksCheckedOut.push(book);
    }
    returnBook(book) {
        this.#booksCheckedOut = this.#booksCheckedOut.filter(
            (currBook) => currBook !== book
        );
    }
    listBooks() {
        return `${this.#name} has checked out: ${this.#booksCheckedOut
            .map((book) => book.getTitle())
            .join(', ')}.`;
    }
}

const movie1 = new LibraryItem('Fury Road', 'Somebody');

console.log('movie1 info: ', movie1.getInfo());

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 236);
const fellowship = new Book('The Fellowship of the Ring', 'J.R.R Tolkien', 400);
const twoTowers = new Book('The Two Towers', 'J.R.R Tolkien', 450);
const rotK = new Book('The Return of the King', 'J.R.R Tolkien', 452);

console.log('theHobbit info: ', theHobbit.getInfo());

const dave = new Member('Dave Pilky');
console.log('dave: ', dave);

dave.checkOutBook(theHobbit);
dave.checkOutBook(fellowship);
dave.checkOutBook(twoTowers);
dave.checkOutBook(rotK);

console.log("dave's books after checking out: ", dave.listBooks());

dave.returnBook(theHobbit);
dave.returnBook(fellowship);
dave.returnBook(twoTowers);

console.log('dave after returning all but one book: ', dave.listBooks());
