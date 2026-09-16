# Book class
class Book:
    def __init__(self, name, author, release_date):
        self.name = name
        self.author = author
        self.release_date = release_date
        self.read = False
    def __str__(self):
         return(f"{self.name} {self.author} {self.release_date} {self.read}")

# Book collection class
class BookCollection:
    def __init__(self, books=[]):
        try:
            for book in books:
                if not isinstance(book, Book):
                    raise TypeError("Must be list of books")
            self.books = books
        except TypeError:
            print("Must be list of books")
    
    def add_book(self, new_book):
            try:
                if not isinstance(new_book, Book):
                        raise TypeError("Must be list of books")
                self.books.append(new_book)
            except TypeError:
                print("Must be list of books")
    def mark_as_read(self, book_name):
        for book in self.books:
            if book.name == book_name:
                book.read = True
                break
            else:
                print(f"{book_name} not found.")

    def list_books(self):
         for book in self.books:
              print(f"{book.name}, written by {book.author} in {book.release_date}. Read: {book.read}")



# Test your code
the_hobbit = Book(name="The Hobbit", author="J.R.R. Tolkien", release_date=1939)
fellowship = Book(name="The Fellowship of the Ring", author="J.R.R. Tolkien", release_date=1953)
# print(the_hobbit)
# print(fellowship)
lotr_books = BookCollection([the_hobbit, fellowship])

# lotr_books.list_books()
# lotr_books.add_book("Two towers")
lotr_books.add_book(Book(name="The Two Towers", author="J.R.R. Tolkien", release_date=1957))
lotr_books.mark_as_read("The Hobbit")
lotr_books.list_books()