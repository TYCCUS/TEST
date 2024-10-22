/*
Challenge:
    1. Add a hidden property to the book object 
       holding a librarian’s note to say the book 
       has gone missing. 
    2. Log out the new property.
*/
const note = Symbol('note');
const book = {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951
}
book[note]='Book has gone missing'
console.log(Object.keys(book))
console.log(book[note])