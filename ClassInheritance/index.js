class Event {
    constructor(name, location, date) {
        this.name = name
        this.location = location
        this.date = date
    }

    getDetails() {
        return `Event: ${this.name}, Location: ${this.location}, Date: ${this.date}`
    }
}

class Concert extends Event {
    constructor(name, location, date, headliner) {
        super(name, location, date)                                     // inherit the superclass (Event) constructor. Must go beefore using this in the next line
        this.headliner = headliner
    }
    
    getDetails() {
        const eventBasics = super.getDetails()                          // inherit the superclass (Event) method getDetails
        return `${eventBasics} Headliner: ${this.headliner}`            // enhance, substitute or modify the inherited method (polymorphism)
    }
}

const concert = new Concert("Summer Beats", "City Stadium", "2023-07-15", "The Electrons")
console.log(concert.getDetails())