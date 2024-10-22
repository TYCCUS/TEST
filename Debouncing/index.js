// function debounce(func, delay) {

// /*
// Challenge:
//     1. Write logic inside this function to make 
//        handleInput fire only when there has been no 
//        activity in the input field for ‘delay’ seconds. 
//        handleInput should NOT run when the first event 
//        is detected.
//        🛟 hint.md for help!
// */


// }
 
function handleInput(e) {
    console.log('Input detected from element with id ' + e.target.id)
}

// const debounce = delay => func =>{
//     let timeout
//     return (...args) => { // we are passing the event with ...args
//         clearTimeout(timeout); //reset the timeout
//         timeout = setTimeout(() => {
//             func(...args)
//         },delay)
//     }
// }

// alternative return function using .apply()
// return function() {
//     clearTimeout(debounceTimer)
//     debounceTimer = setTimeout(()=> {
//         func.apply(this, arguments)
//     }, delay)
// }

//ALTERNATIVE USING .bind():
// const debounce = delay => func =>{
//     let timeout
//     return (...args) => {
//         clearTimeout(timeout);
//         timeout = setTimeout(func.bind(null,...args),delay);
//         // the first argument (null) sets the value of `this`. But since we do not need to change the context we set it as null.
//     }
// }

//ALTERNATIVE SIMPLY PASSING ...args
const debounce = delay => func =>{
    let timeout
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{func(...args)},delay);
    }
}
document.getElementById('name-input').addEventListener('input', debounce(500)(handleInput))