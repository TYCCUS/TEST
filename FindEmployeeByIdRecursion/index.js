
import {organizationData} from './orgData.js'

// function searchEmployeeById() {
// /*
// Challenge:
// 1. Write a function that searches for an employee in 'organizationData'. The function should recursively traverse the nested objects and find all employees with a specified ID. 

// Stretch Goal:
// 💪 Complete the challenge without declaring any variable in the global scope.
// */

// }
// const employee = searchEmployeeById(organizationData, 5) // pass in data and employee id.

const searchEmployeeById = obj => id => {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        const result = findEmployeeNameById(obj[key], id);
        if (result) {
          return result;
        }
      } else if (key === 'id' && obj[key] === id) {
        return obj.name;
      }
    }
    return null; 
  }

const oData = searchEmployeeById(organizationData)
const employee = oData(5)

console.log(employee) // Output: [{id: 5, name: "Kwame Mensah", position: "Sales Executive"}]
