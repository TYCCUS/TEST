/*
Challenge:
1. Create a counter which counts up from a 
   provided start number to a provided end 
   number. It should log each number in turn.
*/
function countUp(start, end) {
  let count = start;
  if (count > end) {
    return;
  } else {
    console.log(count++);
    countUp(count, end);
  }
}

countUp(2, 6);

function sumToN(n) {
   if (n <= 0) {
       return 0 
   } else {
       return n + sumToN(n -1)
   }
}

console.log(sumToN(10))

let str = 'SCRIMBA'

function reverseStr(str) {
   /*
   Challenge:
      1. Write logic for a recursive function 
         that reverses a string.
   */
         if (str === "") {
            return "";
          } else {
            return reverseStr(str.substring(1)) + str.charAt(0);
          }
}

console.log(reverseStr(str))