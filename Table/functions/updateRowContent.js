// Function to update row content
export const updateRowContent = (rowIndex, data, table) => {
  console.log('updating rows')
    const row = table.rows[rowIndex % visibleRows + 1]; // +1 to account for the header row, % visibleRows to wrap around
    const cells = row.cells;
    cells[0].firstChild.textContent = rowIndex + 1; // Update row counter (text content only)
  
    fields.forEach((field, index) => {
      const cell = cells[index + 1];
      const cellType = Object.keys(dataTypes[field])[0]; // Get the cell type (e.g., "select", "boolean")
  
      switch (cellType) {
        case "select":
          const selectElement = cell.querySelector("select");
          selectElement.value = data[field]; // Update selected option
          break;
        case "boolean":
          const checkboxElement = cell.querySelector("input[type='checkbox']");
          checkboxElement.checked = data[field]; // Update checkbox state
          break;
        default:
          cell.firstChild.textContent = data[field]; // Update text content for other types
      }
    });
  }
