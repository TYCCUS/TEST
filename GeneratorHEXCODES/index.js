/*
Challenge:
    1. Create a generator that yields a random hex code on demand.
    - You might need to research how you can do something infinitely 
      inside a generator.
    - See if you can work out how to generate a random hex code.
    🛟 hint.md for help
*/
function* hexColor(){
  do{
    let hex = '';
    for(let i=1;i<4;i++){
      hex += Math.floor((0 + Math.random() * 255)).toString(16);
    }
    yield(hex)
  }
  while (true)
}
const getColor = hexColor()
//console.log(getColor.next())
document.getElementById('nextColorButton').addEventListener('click', () => {
  /*
  Challenge:
  2. When the "Next Color" button is clicked, update 
  the textContent and backgroundColor attributes below.
  */
        const color = getColor.next().value
        console.log(color)
        document.getElementById('colorText').textContent = color
        document.getElementById('colorDisplay').style.backgroundColor = `#${color}`
})
