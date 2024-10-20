function Event1(name, location, date) {
    this.name = name
    this.location = location
    this.date = date
    /*this.getDetails = function() {
        return `Event: ${this.name}, Location: ${this.location}, Date: ${this.date}`
    }*/
}

/*
Challenge:
    1. Remove getDetails from the Event constructor's body 
       and add it to the Event constructor’s prototype. 
*/
Event1.prototype.getDetails = function(){return `Event: ${this.name}, Location: ${this.location}, Date: ${this.date}`}

Event1.prototype.cancelEvent = function() {
    return 'Event Cancelled'
}

function Concert(name, location, date, headliner) {
    Event1.call(this, name, location, date)                  // Passes Concert reference to Event.
    this.headliner = headliner
    // this.getDetails = function() {
        
    // }
}

Concert.prototype = Object.create(Event1.prototype)
Concert.prototype.constructor = Concert

Concert.prototype.getDetails = function() {                     // We are assigning this method to the Concert prototype so we can use Concert as parent of further objects.
    const eventBasics = Event1.prototype.getDetails.call(this)   // We are redefining getDetails so the Object children inherit details from the Concert prototype, not from the Event prototype.
    return `${eventBasics} Headliner: ${this.headliner}`        // To achieve that we are simply passing the Concert prototype context as `this`
                                                                // This technique allows the concert object to access an use a method from the Events prototype and use it as if it were it's own method.
}

const concert = new Concert("Summer Beats", "City Stadium", "2024-07-15", "The Electrons")
const concert2 = new Concert("Concert Two", "Highlands Park", "2024-08-08", "Dave Notes")
const concert3 = new Concert("Concert Three", "Highlands Park", "2024-08-08", "Dave Notes")
console.log(concert)
console.log(concert2)
console.log(concert3)

function Event(name, location, date) {
    this.name = name
    this.location = location
    this.date = date
}

Event.prototype.getDetails = function() {
    return `Event: ${this.name}, Location: ${this.location}, Date: ${this.date}`
}

function Conference(name, location, date, keynoteSpeaker){
    Event.call(this,name,location,date)
    this.keynoteSpeaker = keynoteSpeaker
}
Conference.prototype = Object.create(Event.prototype)
Conference.prototype.constructor = Conference

Conference.prototype.getDetails = function() {
    const eventData = Event.prototype.getDetails.call(this);
    return `${eventData} Keynote speaker: ${this.keynoteSpeaker}`
}


const conference = new Conference("10 Nights of JS", "Scrimba HQ", "2025-09-29", "Ashley Smith")
console.log(conference.keynoteSpeaker);
console.log(conference.getDetails())

/*
Challenge:
    1. Set up a constructor for 'Conference' which 
       should take in 'keynoteSpeaker' as a parameter. 
    2. 'Conference' should inherit from 'Event'.
    3. 'Conference' should have its own method 'getDetails'
       which calls Event's getDetails method and returns a string 
       with name, location, date, and keynote speaker.  
    4. When you set up an instance of Conference and call 
       getDetails you should log out: 
       Event: 10 Nights of JS, Location: Scrimba HQ, Date: 2025-09-29 Keynote Speaker: Ashley Smith
       📝 The new method should be on the prototype. 
*/