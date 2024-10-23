import { data } from "./testData.js"; //ARRAY OF OBJECTS
// console.log(data)
const tableContainer = document.getElementById("tableContainer");
const fields = Object.keys(data[0]);
const fieldNo = fields.length;
let html = [];
html.push(
  `<thead><tr>${fields
    .map((field) => `<th>${field}</th>`)
    .join("")}</tr></thead>`
);
html.push(
  `<tbody>${data
    .map((entry) => {
      return `<tr>${fields
        .map((key) => {
          return `<td>${entry[key]}</td>`;
        })
        .join("")}</tr>`;
    })
    .join("")}</tbody>`
);
console.log(html.join(""));
const newTable = document.createElement("table");
newTable.classList.add("table", "table-dark", "table-hover");
newTable.setAttribute("border", "1");
newTable.setAttribute("cellspacing", "0");
newTable.setAttribute("cellpadding", "5");
newTable.innerHTML = html.join("");
tableContainer.classList.add("WR-100", "overflow-x-scroll");
tableContainer.appendChild(newTable);
