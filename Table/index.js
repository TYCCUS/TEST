import { data as originalData } from "./testData.js";
import { dataTypes } from "./testData.js";
import { render } from "./functions/render.js";
import { fieldWidths as widths} from "./testData.js";
// import { debounceScroll } from "./functions/debounceScroll.js";

const data = [];
const dataMultiplier = (multiple) => {
  for (let i = 0; i < multiple + 1; i++) {
    originalData.forEach((record) => data.push(record));
  }
};
dataMultiplier(100);
const tableContainer = document.getElementById("tableContainer");
const fields = Object.keys(data[0]);
const windowHeight = window.innerHeight;
const tableHeight = 0.94;
const rowHeight = 28; // Estimated height of each row
const visibleRows = -1 + Math.floor((windowHeight * tableHeight) / rowHeight) // Number of rows to display at a time
console.log(visibleRows)
let position = 0;

// Table structure (visibleRows)
const table = document.createElement("TABLE");
table.classList.add("table", "table-dark","table-striped");
table.setAttribute("border", "1");
table.setAttribute("cellspacing", "0");
table.setAttribute("cellpadding", "5");

// Table header
const headerRow = table.createTHead().insertRow(0);
headerRow.insertCell().outerHTML = `<th scope='col' class="W50PX"><div hlx-element='header' hlx-type='rows' hlx-value=''></div></th>`; // Row counter header
fields.forEach(field => headerRow.insertCell().outerHTML =`<th scope='col' class="WMIN${widths[field]}PX"><div hlx-element='header' hlx-type='${dataTypes[field]}' hlx-value='${field}'>${field}</div></th>`)

// Table body (viewport only). ADDS EMPTY CELLS
const tableBody = table.createTBody();
for (let i = 0; i < visibleRows; i++) {
    const row = tableBody.insertRow()
    for (let j = 0; j <= fields.length; j++) {row.insertCell()}
}
tableContainer.appendChild(table);

// Initial population (first batch)
for (let i = 0; i < visibleRows; i++) {populateRow(i, data[i])}

// Populate cells
function populateRow(rowIndex, data) {
    const row = table.rows[rowIndex + 1] // +1 to account for the header row
    const cells = row.cells
    cells[0].outerHTML = `<th scope='row'><div hlx-element='rowHead' hlx-type='rowCounter'>${rowIndex + 1}</div></th>` //row counter
    fields.forEach((field, index) => {cells[index + 1].outerHTML = `<td class='relative'>${render(dataTypes[field], data[field])}</td>`}) //data
}

// Scroll handling
// tableContainer.addEventListener("wheel", debounceScroll(2)(event => {
tableContainer.addEventListener("wheel", (event => {
    if (event.deltaX !== 0) return
    event.preventDefault() // Prevent default scrolling
    event.stopPropagation()
    const scrollAmount = Math.sign(event.deltaY); // -1 for up, 1 for down
    position = Math.max(0, position + scrollAmount);
    requestAnimationFrame(() => { 
        for (let i = 0; i < visibleRows; i++) {
                populateRow(i, data[i + position])
        }
    })
    // console.log(`user scrolled ${scrollAmount} rows. Current position is: ${position}`)
  }));