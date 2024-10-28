export class RENDER{

        constructor(Dataset,Events,container){
                this.windowHeight = window.innerHeight;
                this.tableHeight = 1 //fraction of window height
                this.rowHeight = 24 // Estimated height of each row
                this.visibleRows = -1 + Math.floor((this.windowHeight * this.tableHeight) / this.rowHeight) // Number of rows on viewport
                // alert(this.visibleRows)
                this.dataRenderStartIndex = 0
                this.scrollDesceleration = 4
                this.Dataset = Dataset
                this.Events=Events
                this.table = this.Dataset.table
                this.tableContainer = container
                this.tableHeadersVisible = true
                this.setTableAttributes()
                this.renderTableHeader()
                this.renderTableBody()
                this.showTable()
        }
        setTableAttributes(){
                this.table.classList.add("table")
                // this.table.classList.add("table", "table-dark","table-striped")
                this.table.setAttribute("border", "1")
                this.table.setAttribute("cellspacing", "0")
                this.table.setAttribute("cellpadding", "5")
                this.table.addEventListener( "click", (event)=>{
                        event.stopPropagation()
                        this.Events.handler(event)
                })
        }
        renderTableHeader(){
                const headerRow = this.table.createTHead().insertRow(0);
                headerRow.insertCell().outerHTML = `<th scope='col' class="W50PX"><div hlx-element='header' hlx-type='rows' hlx-value=''></div></th>`; // Row counter header
                this.Dataset.fields.forEach(field => {
                        const cell = headerRow.insertCell()
                        const div = document.createElement('div');
                        div.setAttribute('hlx-element', 'header');
                        // div.setAttribute('hlx-category', this.Dataset.dataCategories[field]);
                        div.setAttribute('hlx-field', field);
                        div.classList.add('cursor-pointer');
                        div.textContent = field;
                        cell.appendChild(div)
                        requestAnimationFrame(() => {
                                cell.outerHTML = `<th scope='col' class="WMIN${this.Dataset.widths[field]}PX">${cell.innerHTML}</th>`;
                        }); //Note that outerHTML is replacing the whole cell definition. We need to attach the div before.
                })
                // headerRow.insertCell().outerHTML = `<th scope='col' class="W50PX"><div hlx-element='header' hlx-type='rows' hlx-value=''></div></th>`; // Row end header
        }
        renderTableBody(){
                const tableBody = this.table.createTBody();
                for (let i = 0; i < this.visibleRows; i++) {
                        const row = tableBody.insertRow()
                        for (let j = 0; j <= this.Dataset.fields.length; j++) {row.insertCell()}
                }
        }
        getTableContainer(){
                return document.getElementById(`${this.tableContainer}`)
        }
        hideTableHeaders(){
                const tableHeader = document.getElementsByTagName('THEAD')
                tableHeader[0].querySelectorAll('[hlx-element="header"]').forEach(header => header.classList.add('OPACITY-5'))
                this.tableHeadersVisible = false
        }
        showTableHeaders(){
                const tableHeader = document.getElementsByTagName('THEAD')
                tableHeader[0].querySelectorAll('[hlx-element="header"]').forEach(header => header.classList.remove('OPACITY-5'))
                this.tableHeadersVisible = true
        }
        showTable(){
                this.getTableContainer().appendChild(this.table);
        }
        renderCell(type,cellValue,attr){
                const groupFlag = (attr && attr.includes('group table'))
                const value = cellValue ?? '' // converts undefined to empty string
                const [cType, args] =
                        value !== ''
                        ? typeof type === "object"
                                ? [(groupFlag ? 'text': Object.keys(type)[0]), type[Object.keys(type)[0]]]
                                : [(groupFlag ? 'text' : type), false]
                        : value === false
                                ?[(groupFlag? 'text': type),false]
                                :['tex',false]
                const attrStr = attr ? attr : `hlx-element='cell' hlx-type='${cType}'`
                const dropDownHTML = `<select class="form-select py-0 mx-2" hlx-element='cell' hlx-type='${cType}'>
                                        <option selected>${value}</option>
                                        ${args && args.map(arg => {return arg != value ? `<option value='${arg}'>${arg}</option>` : ''}).join('')}
                                </select>`
                const checkboxHTML = `<div class='form-check form-switch align-items-center'>
                                        <input class="form-check-input" type="checkbox" value="${value}" id="flexCheckChecked" ${value===true ? 'checked' : ''}>
                                </div>`
                switch (cType) {
                        case "text": return `<div ${attrStr}'>${value}</div>`
                        case "number": return `<div ${attrStr}}'>${value}</div>`
                        case "select": return dropDownHTML
                        case "boolean": return checkboxHTML
                        default: return `<div ${attrStr}'>${value}</div>`
                }
        }
        populateViewport(recordOffset = 0) {
                const totalRecords = this.Dataset.getTotalRecords();                                            // Get total records
                for (let rowIndex = 0; rowIndex < this.visibleRows; rowIndex++) {
                        const dataIndex = rowIndex + recordOffset;                                              // Calculate actual data index
                        if (dataIndex < totalRecords) {                                                         // Check if dataIndex is within bounds
                                const cells = this.Dataset.table.rows[rowIndex + 1].cells                       // +1 to account for the header row
                                        cells[0].outerHTML = `<th scope='row'><div hlx-element='rowHead' hlx-type='rowCounter'>${dataIndex + 1}</div></th>`; // row counter
                                        this.Dataset.fields.forEach((field, index) => {
                                                let cellValue = this.Dataset.getValueByIndex(dataIndex,field)
                                                let groupHeaderTag = ``
                                                let attr= false
                                                if (field === this.Dataset.key && String(cellValue).includes(this.Dataset.groupHeaderTag)){
                                                        const spacer = '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'
                                                        let valueStr = cellValue.split(',') //group header: tag,status,group,# of records
                                                        attr = `hlx-element='group header' hlx-group='${valueStr[2]}' group-status='${valueStr[1]}'`
                                                        groupHeaderTag = `colspan="${this.Dataset.getNumberOfFields()}"`
                                                        cellValue = `${
                                                                [valueStr[1]==='expanded'
                                                                ?this.Dataset.groupCollapseIcon
                                                                :this.Dataset.groupExpandIcon]
                                                        }
                                                        ${spacer}
                                                        ${valueStr[2]}
                                                        ${spacer}
                                                        ${valueStr[3]}
                                                        &nbsp;record${valueStr[3]>1?'s':''}`
                                                } else if (String(cellValue).includes(this.Dataset.groupTableHeaderTag)){
                                                        let valueStr = cellValue.split(',')
                                                        cellValue = `${valueStr[1]}` //group header: tag,value,group,category
                                                        attr = `hlx-element='group table header' hlx-group='${valueStr[2]}' hlx-field='${field}'`
                                                } else if (String(cellValue).includes(this.Dataset.groupTableFooterTag)){
                                                        let valueStr = cellValue.split(',')
                                                        cellValue = `${valueStr[1]}` //group footer: tag,value,group,category
                                                        attr = `hlx-element='group table footer' hlx-group='${valueStr[2]}'`
                                                }
                                                cells[index + 1].outerHTML = `<td class='relative' ${groupHeaderTag}>${this.renderCell(this.Dataset.getDataType(field), cellValue, attr)}</td>`
                                        });
                        } else if (rowIndex < this.visibleRows){
                                const cells = this.Dataset.table.rows[rowIndex + 1].cells
                                this.Dataset.fields.forEach((field, index) => {
                                        cells[index].outerHTML=`<td></td>`})
                                cells[this.Dataset.fields.length].outerHTML=`<td></td>`;
                        }
                }
        }
        repopulateViewport(scrollAmount) {
                const totalRecords = this.Dataset.getTotalRecords();
                const maxStartIndex = Math.max(0, totalRecords - this.visibleRows); // Calculate the maximum allowed startIndex
                this.dataRenderStartIndex = Math.min(maxStartIndex, Math.max(0, this.dataRenderStartIndex + scrollAmount));
                requestAnimationFrame(() => {
                        this.populateViewport(this.dataRenderStartIndex);
                });
        }
        
}