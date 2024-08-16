/*
|
| Added statement to output to screen in addition to console.
|
*/

(function(window){
  var speakWord = "Good Bye";
  const byeSpeaker={};
  byeSpeaker.speak=function(name){
    const greet = speakWord + " " + name;
    console.log(greet);
    consoleMirror.insertAdjacentHTML('beforeend','<br>'+greet);
  }
  window.byeSpeaker = byeSpeaker;
})(window);
