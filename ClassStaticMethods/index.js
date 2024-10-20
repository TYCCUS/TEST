class Employee {
    constructor(name) {
        this.name = name
    }
    static getNewIntern(name){
        const start = new Date()
        return{
            name,           // object property value shorthand -- so we do not repeat: name=name
            role:'intern',
            startDate:start.toLocaleDateString(),
        }
    }
/*
Challenge:
1. Set up a static method called getNewIntern. 
   getNewIntern should return an object with a 'name' property, 
   a 'role' property which is hard-coded to ‘intern’, and a 
   'startDate' property which should be the time of code execution. 
   (🤔 How can you use JS to get the time right now?)
*/
}

 console.log(Employee.getNewIntern('Dave'))

