while (true) {
    do something infinitely
}

To get a random hex code you can use this code. But it's not perfect and comes with no guarantees so don't use it in production!!

    const randomIndex = Math.floor(Math.random() * 16)
    color += '0123456789ABCDEF'[randomIndex]
