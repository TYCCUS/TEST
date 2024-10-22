/* Challenge:
    1. Refactor this code to use a Set instead  
       of an array so no tags can be duplicated!
*/

// const postTags = []
const postTags = new Set();
function addTag(newTag) {
    //postTags.push(newTag)
    postTags.add(newTag)
}

addTag('history')
addTag('romans')
addTag('sociology')
addTag('history')
addTag('history')

postTags.forEach((tag) => console.log(tag))
