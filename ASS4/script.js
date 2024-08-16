
/*
|
| Main function.
| Added a reference to HTML mirror. So we can output the result to the user for convenience.
| Wrapped fx in DOM loaded listener (IFEE may be executed b4 consoleMirror is rendered)
|
*/

document.addEventListener('DOMContentLoaded', (event) => { //IFEE may be executed before the DOM is loaded causing consoleMirror to not be found at the time of execution
  const consoleMirror= document.getElementById('consoleMirror');
  (function(){
    const names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
    for (const name of names){
      const firstLetter = name.charAt(0).toLowerCase();   
      if(firstLetter==='j'){
        byeSpeaker.speak(name);
      }else{
        helloSpeaker.speak(name);
      }
    }
  })();
});
