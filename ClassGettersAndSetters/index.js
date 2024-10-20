class Holiday {    
/*
Challenge:
    1. Make 'price' a private field.
    2. Create a getter for price which appends a $ sign 
       to the front and displays it to a max of 2 decimal 
       places. 
    3. Create a setter for price which updates price with a 
       new price.
    4. Test! 
*/
    #price
    #destination
    constructor(destination, price) {
        this.#destination = destination
        this.#price = typeof price === 'number' ? price : 0
    }

    get destination() {
        return this.#destination
    }
    get price(){
        return `$${this.#price.toFixed(2)}`
    }
    set price(newPrice){
        typeof newPrice === 'number' && (this.#price = newPrice) 
    }
    set destination(newDestination) {
        if (typeof newDestination !== 'string' || newDestination.length <= 0){
            throw new Error('Destination not valid')
        }
        this.#destination = newDestination
    }
}

const safari = new Holiday('Kenya', 4000)
console.log(safari.price)
safari.price = 2500
console.log(safari.price)