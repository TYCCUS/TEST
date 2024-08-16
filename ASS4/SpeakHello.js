/*
|
| Added statement to output to screen in addition to console.
|
*/

(function(window){
  var speakWord = "Hello";
  const helloSpeaker = {};
  helloSpeaker.speak= function(name){
    const greet = speakWord + " " + name;
    console.log(greet);
    consoleMirror.insertAdjacentHTML('beforeend','<br>'+greet);
  }
  window.helloSpeaker = helloSpeaker;
})(window);
