// function calculateVolume(length, width, height) {
//     return length * width * height
// }

// const volume = calculateVolume(2, 3, 4)
// console.log(volume)

//CURRIED FORM:
function calculateVolume(length) {
    return function(width) {
        return function(height) {
            return length * width * height
        }
    }
}
const withLength = calculateVolume(2)
const withLengthAndWidth = withLength(3)
const vol = withLengthAndWidth(4)

// CHANGED TO ARROW FUNCTIONS
//const cubeVolume = (length) => {(width) => { (height) => {return length * width * height}}} // THIS WOULD NOT WORK, here the functions are not being returned
const cubeVolume = length => width => height =>  length * width * height
const volume = cubeVolume(2)(3)(4)

console.log(volume)

/*
Challenge:
    1. Curry this function!
    Set up three partially applied functions called 'infoLogger', 
    'warnLogger', and 'errorLogger'. 
    The partially applied functions should have their level ('info', 
    'warn', 'error'). 
    You should be able to call these functions and pass in a message.
    E.g. console.log(warnLogger("Low disk space")) would log: "[WARN] Low disk space".
    🛟 hint.md for help.
*/
// const logMessage = (level, message) => `[${level.toUpperCase()}] ${message}`
const logMessage = level => message => `[${level.toUpperCase()}] ${message}`
const infoLogger = logMessage('info')
const warnLogger = logMessage('warn')
const errorLogger= logMessage('error')

console.log(infoLogger('Application started'))
console.log(infoLogger('User logged in'))
console.log(warnLogger('Low disk space'))
console.log(warnLogger('High memory usage'))
console.log(errorLogger('Unhandled exception'))
console.log(errorLogger('Failed to save file'))

// // Log messages with "info" level
// console.log(logMessage("info", "Application started")) // Output: "[INFO] Application started"
// console.log(logMessage("info", "User logged in")) // Output: "[INFO] User logged in"

// // Log messages with "warn" level
// console.log(logMessage("warn", "Low disk space")) // Output: "[WARN] Low disk space"
// console.log(logMessage("warn", "High memory usage")) // Output: "[WARN] High memory usage"

// // Log messages with "error" level
// console.log(logMessage("error", "Unhandled exception")) // Output: "[ERROR] Unhandled exception"
// console.log(logMessage("error", "Failed to save file")) // Output: "[ERROR] Failed to save file"