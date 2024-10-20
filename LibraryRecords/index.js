const collection = []

function addBookToCollection(title, author, yearPublished, libraryData) {

    collection.push({
        title: title || 'Unknown Title',
        author: author || 'Unknown Author',
        yearPublished: yearPublished || 'Not Specified',
        availability: (libraryData?.locations?.mainLibrary && 'Available') || 'Not Available'
    })

}

addBookToCollection('JavaScript: The Good Parts', 'Douglas Crockford', 2008, { locations: { mainLibrary: true}})
addBookToCollection('', 'William Shakespeare', null, null, )
addBookToCollection('House of Giants', 'Gemma Small', '', null, {locations: { mainLibrary: null}})
console.log(collection) // House of Giants is not yet published!!