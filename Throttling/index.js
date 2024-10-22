function handleResize(e) {
  console.log("resize happened on event: " + e);
  // resize happened on event: [object Event]
}

// function throttle(func, delay) {
//     let throttleTimeout = null
//     return function(event) {
//         if(!throttleTimeout) {
//             func(event)
//             throttleTimeout = setTimeout(() => {
//                 throttleTimeout = null
//             }, delay)
//         }
//     }
// }
// const throttledHandleResize = throttle(handleResize, 1000)
// window.addEventListener('resize', throttledHandleResize)
// window.addEventListener('resize',(event)=>{
//     throttledHandleResize(event)
// })

// function throttle(func, delay) {
//     let throttleTimeout = null
//     return function() {
//         if(!throttleTimeout) {
//             func.apply(this, arguments) // using apply
//             throttleTimeout = setTimeout(() => {
//                 throttleTimeout = null
//             }, delay)
//         }
//     }
// }
// const throttledHandleResize = throttle(handleResize, 1000)
// window.addEventListener('resize', throttledHandleResize)

const throttledHandleResize = delay => func => {
  let throttleTimeout = null;
  return (...args) => { //takes all the arguments from the lexical scope (passed as arguments from the arrow functions which take from their surrounding lexical environment. THIS INCLUDES `event`
    if (!throttleTimeout) {
      func(...args);
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, delay);
    }
  };
};

window.addEventListener("resize", throttledHandleResize(1000)(handleResize) // `event` is passed always to the listener function, regardless if it was explicitly indicated as parameter
);
