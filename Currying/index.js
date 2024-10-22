function calculateVolume(length) {
    return function(width) {
        return function(height) {
            return length * width * height
        }
    }
}

const volume = calculateVolume(2, 3, 4)

console.log(volume)