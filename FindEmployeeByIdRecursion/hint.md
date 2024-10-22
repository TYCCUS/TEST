To complete this challenge with a variable declared in the global scope:

    Declare a let to hold an array of results.

    searchEmployeeById should take in the data and the target id as params.

    In the body of searchEmployeeById, use a for in to loop over the data.

    Check if any keys in the data are 'employees'. 

    We know 'employees' holds an array of objects. So loop over that array and check the id of each object in the array to see if it is the same as the target id. If it is, push it to results.
    
    If no keys in the data are 'employees' then we might want to move down a level. 
    
    Use an else if to check if the piece of data we are working with is an object (typeof data[key] === 'object')
    
    If it is, call searchEmployeeById passing in the current piece of data as the first param and the target id as the second param.
    
    Return the results array at the end of searchEmployeeById.
    
Stretch Goal

    Move the results array inside the body of searchEmployeeById
    
    Where we make the recursive function call, we need to make sure we update the results array so it holds the existing results and what gets returned from the recursive function call.
    
    You can combine arrays with the spread operator (...)
    
    You will want results to equals an array in which the existing results and the array that is returned by the function call are both spread.

    
    