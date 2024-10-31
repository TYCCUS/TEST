
export const debounce = delay => func => {
        let timeoutId;
        return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                        func(...args);
                }, delay);
        };
};

export const throttle = delay => func => {
        let throttleTimeout = null;
        return (...args) => {
                if (!throttleTimeout) {
                        func(...args);
                        throttleTimeout = setTimeout(() => {
                                throttleTimeout = null;
                        }, delay);
                }
        };
};

export const sleep = time => {
        return new Promise(resolve => setTimeout(resolve, time));
};

let scrollAcc = 0;
let isUp = false;
let isDown = false;
export const slowScroll = scrollAmount => scrollDesceleration => {
        if (scrollAmount > 0 && isUp) {
                [scrollAcc, isUp, isDown] = [0, false, true]
        } else if (scrollAmount < 0 && isDown) {
                [scrollAcc, isUp, isDown] = [0, true, false]
        } else {
                scrollAmount > 0 && ([isUp, isDown] = [false, true])
                scrollAmount < 0 && ([isUp, isDown] = [true, false])
        }
        scrollAcc += scrollAmount;
        if (scrollAcc >= scrollDesceleration) {
                scrollAmount = Math.floor(scrollAcc / scrollDesceleration);
                scrollAcc = scrollAcc % scrollDesceleration;
        } else if (scrollAcc <= -scrollDesceleration) {
                scrollAmount = Math.ceil(scrollAcc / scrollDesceleration);
                scrollAcc = scrollAcc % scrollDesceleration;
        } else {
                scrollAmount = 0;
        }
        return scrollAmount;
};
