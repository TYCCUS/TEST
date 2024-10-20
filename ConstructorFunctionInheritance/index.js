function Event(name, location, date) {
    this.name = name
    this.location = location
    this.date = date
    this.getDetails = function () {
        return `Event: ${this.name}, Location: ${this.location}, Date: ${this.date}`
    }
}

function Concert(name, location, date, headliner) {
    Event.call(this, name, location, date)
    this.headliner = headliner
}

Concert.prototype = Object.create(Event.prototype) //Assigns the prototype of Concert to an instance of the Event prototype (defined by the constructor function Event).
Concert.prototype.constructor = Concert // Concert should have as constructor the Concert function, which is obviously not included in the Event constructor.

const concert = new Concert("Summer Beats", "City Stadium", "2024-07-15", "The Electrons")
console.log(concert)