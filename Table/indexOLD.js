import { data as originalData } from "./testData.js";
import { dataTypes } from "./testData.js";
import { render } from "./functions/render.js";

const data = [];
const dataMultiplier = (multiple) => {
  for (let i = 0; i < multiple + 1; i++) {
    originalData.forEach((record) => data.push(record));
  }
};
dataMultiplier(100);
const windowHeight = window.innerHeight 
const tableHeight= 0.9
const renderBuffer = 3
const tableContainer = document.getElementById("tableContainer");
const fields = Object.keys(data[0])
const rowHeight = 28 // Estimated height of each row
const visibleRows = (windowHeight * tableHeight * renderBuffer) / rowHeight //60; // Number of rows to display at a time

// Create a container for the visible rows
const viewport = document.createElement("div");
viewport.style.overflowY = "auto";
viewport.style.height = `${rowHeight * visibleRows}px`;
tableContainer.appendChild(viewport);

// Create an inner container to hold the virtualized table
const innerContainer = document.createElement("div");
innerContainer.style.position = "relative"; 
viewport.appendChild(innerContainer);

function renderRows(startIndex, endIndex) {
  const fragment = document.createDocumentFragment(); // Use fragment for performance
  const table = document.createElement("table");
  table.classList.add("table", "table-dark");
  table.setAttribute("border", "1");
  table.setAttribute("cellspacing", "0");
  table.setAttribute("cellpadding", "5");

  let html = [];
  html.push(
    `<thead><tr><th><div hlx-element='header' hlx-type='rows' hlx-value=''></div></th>${fields
      .map(
        (field) =>
          `<th><div hlx-element='header' hlx-type='${dataTypes[field]}' hlx-value='${field}'>${field}</div></th>`
      )
      .join("")}</tr></thead>`
  );

  html.push(
    `<tbody>${data
      .slice(startIndex, endIndex)
      .map((entry,index) => {
        const rowNumber = startIndex + index + 1;
        return `<tr><td><div hlx-element='rowHead' hlx-type='rowCounter'>${rowNumber}</div></td>${fields
          .map((key) => `<td>${render(dataTypes[key], entry[key])}</td>`)
          .join("")}</tr>`;
      })
      .join("")}</tbody>`
  );

  table.innerHTML = html.join("");
  fragment.appendChild(table);
  innerContainer.appendChild(fragment);
}

// Initial rendering
renderRows(0, visibleRows);

// Set the total height of the inner container for scrolling
innerContainer.style.height = `${data.length * rowHeight}px`;

const debounceScroll = delay => func =>{
    let throttleTimeout = null;
    return (...args) => {
      if (!throttleTimeout) {
        func(...args);
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null;
        }, delay);
      }
    };
}

viewport.addEventListener("scroll",  debounceScroll(100)(scrollTable))

function scrollTable() {
    const scrollTop = viewport.scrollTop;
    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex = startIndex + visibleRows;
    requestAnimationFrame(() => {
        // Clear the inner container
        innerContainer.innerHTML = "";

        // Render the visible rows
        renderRows(startIndex, endIndex);

        // Calculate the necessary height for the inner container
        const remainingRows = Math.max(0, data.length - startIndex); 
        const requiredHeight = remainingRows * rowHeight;
        innerContainer.style.height = `${requiredHeight}px`; 

        // Adjust the top position of the table to simulate scrolling
        innerContainer.style.top = `${startIndex * rowHeight}px`; 
    });
};