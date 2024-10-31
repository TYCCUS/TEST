export class RENDER{

        constructor(Dataset,Events,container){
                this.dataRenderStartIndex = 0
                this.scrollDesceleration = 4
                this.rowHeight = 30
                this.Dataset = Dataset
                this.Events=Events
                this.table = this.Dataset.table
                this.tableContainer = container
                this.tableHeadersVisible = true
                this.tableIsRendered = false
                this.searchTimeout = null
                this.inputBar = document.getElementById('searchInput')
                this.powerSearchToggle = document.getElementById('powerSearchToggle')
                this.normalSearchIcon=document.getElementById('normalSearchIcon')
                this.powerSearchIcon=document.getElementById('powerSearchIcon')
                this.render()
        }
        render(){
                this.setDimensions()
                this.setUI()
                if(!this.tableIsRendered){
                        this.setTable()
                        this.renderTableHeader()
                        this.renderTableBody()
                        this.renderTableFooter()
                        this.tableIsRendered = true
                        this.showTable()
                } else {
                        this.tableBody.remove()
                        this.renderTableBody()
                        this.populateViewport()
                }
        }
        showWaitScreen(){
                this.getWaitScreen().classList.add('FLEX-CENTER')
                this.getWaitScreen().classList.remove('d-none')
        }
        hideWaitScreen(){
                this.getWaitScreen().classList.remove('FLEX-CENTER')
                this.getWaitScreen().classList.add('d-none')
        }
        getWaitScreen(){
                return document.getElementById('waitScreen')
        }
        setRowHeight(height){
                this.rowHeight = parseInt(height)
                this.render()
        }
        setDimensions(){
                this.windowHeight = window.innerHeight
                this.windowWidth= window.innerWidth
                this.toolbarsHeight = 50
                this.UIspacing = 5
                this.tableHeight = this.windowHeight-(2*this.toolbarsHeight)-(2*this.UIspacing) //fraction of window height
                this.visibleRows = -1 + Math.floor(this.tableHeight / this.rowHeight) // Number of rows on viewport
                // console.dir({
                //         height: this.windowHeight,
                //         width: this.windowWidth,
                //         tableHeight: this.tableHeight,
                //         rows: this.visibleRows
                // })
        }
        setUI(){
                console.log(`setting up UI`)
                document.getElementById('topBar').classList.add(`H${this.toolbarsHeight}PX`)
                document.getElementById('topBar').style.padding=(`${this.UIspacing}PX`)
                document.getElementById('bottomBar').classList.add(`H${this.toolbarsHeight}PX`)
                document.getElementById('leftBar').classList.add(`W${this.toolbarsHeight}PX`)
                document.getElementById('rightBar').classList.add(`W${this.toolbarsHeight}PX`)
                document.getElementById('tableCanvas').style.width=(`${this.windowWidth}px`)
                document.getElementById('menuToggle').classList.add(`SQUARE${this.toolbarsHeight-(2*this.UIspacing)}PX`)
                document.getElementById('menuToggle').style.marginRight=(`${this.UIspacing}PX`)
                this.powerSearchToggle.classList.add(`SQUARE${this.toolbarsHeight-(2*this.UIspacing)}PX`)
                this.powerSearchToggle.style.marginLeft=(`${this.UIspacing}PX`)
                this.inputBar.style.height=(`${this.toolbarsHeight-(2*this.UIspacing)}px`)
                this.inputBar.style.width=(`${this.windowWidth-(this.toolbarsHeight)-(2*this.UIspacing)}px`)
                this.inputBar.style.padding=(`${this.UIspacing}px`)
                this.getTableContainer().style.height=(`${this.tableHeight}px`)
                this.getTableContainer().style.margin=(`${this.UIspacing}px`)
        }
        setTable(){
                this.table.classList.add("table")
                this.table.addEventListener( "click", (event)=>{
                        event.stopPropagation()
                        this.Events.handler(event)
                })
                this.getTableContainer().addEventListener( "wheel", (event)=>{
                        if (event.deltaX !== 0){
                        }else{
                                event.preventDefault()
                                event.stopPropagation()
                                this.Events.scrollHandler(event)
                        }
                });
                ['keyup', 'blur'].forEach(event=>this.inputBar.addEventListener(event,
                        (event)=>{const val = event.target.value
                        if (!val || val === " "){
                                this.Dataset.searchRecords(false)
                                this.repopulateViewport(0)
                        } else {
                                clearTimeout(this.searchTimeout);
                                this.searchTimeout = setTimeout(() => {
                                        this.Dataset.searchRecords(val)
                                        this.repopulateViewport(0)
                                },500)
                        }
                }))
                this.inputBar.addEventListener('keyup blur', (event)=>{
                        console.log(`input detected`)
                        const val = event.target.value
                        if (!val || val === " "){
                                this.Dataset.searchRecords(false)
                                this.repopulateViewport(0)
                        } else {
                                clearTimeout(this.searchTimeout);
                                this.searchTimeout = setTimeout(() => {
                                        this.Dataset.searchRecords(val)
                                        this.repopulateViewport(0)
                                },500)
                        }
                })
                this.powerSearchToggle.addEventListener('click',(event)=>{
                        this.Dataset.powerSearch = !this.Dataset.powerSearch
                        this.normalSearchIcon.classList.toggle('d-none')
                        this.powerSearchIcon.classList.toggle('d-none')
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
                this.tableBody = this.table.createTBody();
                for (let i = 0; i < this.visibleRows; i++) {
                        const row = this.tableBody.insertRow()
                        for (let j = 0; j <= this.Dataset.fields.length; j++) {row.insertCell()}
                }
        }
        renderTableFooter(){
                const tableFooter = this.table.createTFoot()
                const row = tableFooter.insertRow()
                row.insertCell() // row header
                this.Dataset.fields.forEach(field => {const cell = row.insertCell()})
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
                                                let cellValue = this.Dataset.getValueByIndexField(dataIndex,field)
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