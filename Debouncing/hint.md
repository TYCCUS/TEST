Debounce should store a timer ‘debounceTimer’ and then return a function (closure).

The internal function should contain logic that:
	- Clears the timer on each input
	- Calls the function which was passed to debounce when the timer delay has passed
