export const debounceScroll = delay => func => {
    let throttleTimeout = null;
    return (...args) => {
      if (!throttleTimeout) {
        func(...args)
        throttleTimeout = setTimeout(() => throttleTimeout = null, delay)
      }
    }
  }