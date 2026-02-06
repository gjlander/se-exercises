// Create a constructor function called Book.
// The Book constructor function should initialize the following properties:
function Book(title, author, pages, isRead) {
    // title: a string representing the title of the book.
    this.title = title;
    // author: a string representing the author of the book.
    this.author = author;
    // pages: a number representing the total pages in the book.
    this.pages = pages;
    // isRead: a boolean indicating if the book has been read or not.
    this.isRead = isRead;

    // Add a method named summary to the prototype of the Book constructor. This method should return a string summarizing the book details in the format:
    // "Title: [title], Author: [author], Pages: [pages], Read: [Yes/No]".
    this.summary = function () {
        return `Title: ${this.title}, Author: ${this.author}, Pages: ${
            this.pages
        }, Read: ${isRead ? 'Yes' : 'No'}`;
    };
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 236, true);
console.log('theHobbit: ', theHobbit);
console.log('the  summary: ', theHobbit.summary());
