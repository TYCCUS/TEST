
class Character {
   constructor(name) {
      this.name = name;
      this.collectedItemsArr = [];
   }
   addItem = (item) => {
      this.collectedItemsArr.push(item);
      console.log(`${this.name} now has ${this.collectedItemsArr.toString()}`);
   }
}

const merlin = new Character('Merlin');
merlin.addItem('spoon');
merlin.addItem('cauldron');
