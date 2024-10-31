export class DATASET {
//⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ STATIC

//      ⋮⋮⋮⋮⋮⋮⋮ ❕SORTING
        static stringSort = data => property => data.toSorted((a, b) => {
                const [nameA, nameB] = [a[property].toLowerCase(),b[property].toLowerCase()]
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
        })
        static stringSortReverse = data => property => data.toSorted((a, b) => {
                const [nameA, nameB] = [a[property].toLowerCase(),b[property].toLowerCase()]
                return nameA < nameB ? 1 : nameA > nameB ? -1 : 0
        })
        static numberSort = data => property => data.toSorted((a, b) => a[property] - b[property])
        static numberSortReverse = data => property => data.toSorted((a, b) => b[property] - a[property])
        static timeSort = data => property => data.toSorted((a, b) => new Date(a[property]) - new Date(b[property]))
        static timeSortReverse = data => property => data.toSorted((a, b) => new Date(b[property]) - new Date(a[property]))

        static cycleSort = current => {
                if(['none','asc','desc'].includes(current)){
                        switch (current){
                                case 'none': return 'asc'
                                case 'asc' : return 'desc'
                                case 'desc': return 'none'
                        }
                } else {
                        return current
                }
        }

//      ⋮⋮⋮⋮⋮⋮⋮ ❕GROUPING
        static groupData = data =>field => {
                const [uniques,groups] = [new Set(),{}]
                data.forEach(record =>uniques.add(record[field]))
                uniques.forEach(group => {groups[group]=data.filter(record =>record[field]===group)})
                uniques.clear() // free up memory
                return groups //object with arrays of objects
        }

//      ⋮⋮⋮⋮⋮⋮⋮ ❕COUNTING
        static tableCount = 0;

//      ⋮⋮⋮⋮⋮⋮⋮ ❕SEARCH
        static searchByValue = data => value => key =>{
                // console.log(`DATASET search ${value} ${key ? `in field ${key}` : ''}`)
                let result=[]
                for(const record of data){
                        if (!key){
                                for (const field in record){
                                        if( record[field] && String(record[field]).toUpperCase().includes(String(value).toUpperCase())){
                                                 result.push(record)
                                                 break
                                        }
                                 }
                        } else {
                                if(record[key] && String(record[key]).toUpperCase().includes(String(value).toUpperCase())){
                                        result.push(record)
                                        continue
                                }
                        }
                }
                // console.dir(result)
                return result
        }
//⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ CONSTRUCTOR
        constructor(data,fields,key,dataTypes,dataCategories,widths,table,dataMultiply=0){
                this.key=key
                this.data=data
                this.fields=fields //array
                this.dataTypes=dataTypes
                this.dataCategories = dataCategories
                this.widths=widths
                this.table=table
                this.dataMultiply = dataMultiply
                this.sorts = {} // keeps track of all fields sorting order
                this.mutatedData = []
                this.groupedData = {}
                this.sortingField = key // keeps track of current sorting field
                this.groups = new Set() // keeps track of all groups created
                this.collapsedGroups = new Set() // keeps track of groups that are shown collapsed
                this.expandedGroups = new Set() // keeps track of groups that are shown expanded displayed = all - collapsed
                this.dataHasMutated = false
                this.dataIsGrouped = false
                this.searchByField = false
                this.dataIsQueried = false
                this.powerSearch = false
                this.groupHeaderTag = '👾 ╌┄┈ApplicationDatasetGroupHeader┈┄╌ 👾'
                this.groupTableHeaderTag = '👾 ╌┄┈ApplicationDatasetGroupTableHeader┈┄╌ 👾'
                this.groupTableFooterTag = '👾 ╌┄┈ApplicationDatasetGroupTableFooter┈┄╌ 👾'
                this.groupExpandIcon ='︾'
                this.groupCollapseIcon ='︽'
                this.multiply(dataMultiply)
                this.increaseTableCount()
                this.fields.forEach(field =>{this.sorts[field] = field === this.key ? 'asc' : 'none'})
                window[`table${DATASET.tableCount}`]=table;
        }

//⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️ METHODS

        addMutantData(...items){
                this.mutatedData.push(...items)
                !this.dataHasMutated && (this.dataHasMutated = true)
        }
        clearGroupedData(){
                this.groupedData = []
                this.dataIsGrouped = false
                this.collapsedGroups.clear()
                this.expandedGroups.clear()
        }
        clearMutatedData(){
                this.mutatedData = []
                this.dataHasMutated = false
        }
        collapseAllGroups(){
                this.dataIsGrouped && this.expandedGroups.forEach(group=>this.collapseGroup(group))
        }
        collapseGroup(group){
                console.log(`collapsing group ${group}`)
                this.clearMutatedData()
                this.expandedGroups.delete(group)
                this.collapsedGroups.add(group)
                this.organizeGroups()
        }
        expandAllGroups(){
                this.dataIsGrouped && this.collapsedGroups.forEach(group=>this.expandGroup(group))
        }
        expandGroup(group){
                console.log(`expanding group ${group}`)
                this.clearMutatedData()
                this.expandedGroups.add(group)
                this.collapsedGroups.delete(group)
                this.organizeGroups()
        }
        getData(){
                return this.dataHasMutated ? this.mutatedData : this.data
        }
        getDataCategories(){
                return Object.keys(this.dataCategories)
        }
        getDataCategory(field){
                return this.dataCategories[field]
        }
        getDataGroups(){
                return Object.keys(this.groupedData).toSorted()
        }
        getDataType(field){
                return this.dataTypes[field]
        }
        getDataTypes(){
                return Object.keys(this.dataTypes)
        }
        getFields(){
                return this.fields
        }
        getGroupingStatus(){
                return this.dataIsGrouped
        }
        getGroupStatus(group){
                return this.collapsedGroups.has(group) ? 'collapsed' : 'expanded'
        }
        getNumberOfFields(){
                return this.fields.length
        }
        getRecordByIndex(index){
                return this.dataHasMutated ? this.mutatedData[index] : this.data[index]
        }
        getRecordsByField(value){
                this.clearMutatedData()
                if(this.searchByField){
                        const field = this.searchByField
                        return DATASET.searchByValue(this.data)(value)(field)
                }
        }
        getRecordsByValue(value){
                this.clearMutatedData()
                        return DATASET.searchByValue(this.data)(value)()
        }
        getSortOrder(field){
                return this.sorts[field]
        }
        getTotalRecords(){
                return this.dataHasMutated ? this.mutatedData.length : this.data.length
        }
        getTableCount(){
                return DATASET.tableCount
        }
        getValueByIndexField(index,field){
                return this.dataHasMutated ? this.mutatedData[index]?.[field] : this.data[index][field]
        }
        groupRecords(field){
                this.dataIsGrouped && this.ungroupRecords()
                this.ungroupRecords()
                this.clearMutatedData()
                this.groupedData = this.groupedData =(()=>DATASET.groupData(this.getData())(field))()
                this.organizeGroups()
                this.dataIsGrouped = true
                this.groups = this.getDataGroups()
                this.groups.forEach(group=>this.collapsedGroups.add(group))
        }
        increaseTableCount(){
                DATASET.tableCount++
        }
        multiply(times){
                for (let i = 0; i < times + 1; i++) {
                        this.data.forEach(record=> {this.addMutantData(record)})
                }
                this.data=this.mutatedData
                this.clearMutatedData
                console.log(`new total records: ${this.getTotalRecords()}`)
        }
        organizeGroups(sortBy = null){
                const dataGroups = this.getDataGroups();
                const emptyObject = {}
                dataGroups.forEach(group => {
                        const groupHeader = { ...emptyObject };
                        if (this.expandedGroups.has(group)) { //expanded groups
                                const [groupTableHeader, groupTableFooter] = [{...emptyObject},{...emptyObject}]
                                groupHeader[this.key] = `${this.groupHeaderTag},expanded,${group},${this.groupedData[group]?.length}`;
                                this.getFields().forEach(field=>{
                                        groupTableHeader[field]=`${this.groupTableHeaderTag},${field},${group}`
                                        groupTableFooter[field]=`${this.groupTableFooterTag},---,${group}`
                                })
                                this.addMutantData(groupHeader)
                                this.addMutantData(groupTableHeader)
                                if(sortBy){
                                        this.addMutantData(...this.sortData({field:this.sortingField,datagroup:group,sortBy:sortBy}))
                                } else {
                                        this.addMutantData(...this.sortData({field:this.sortingField,datagroup:group}))
                                }
                                this.addMutantData(groupTableFooter)
                        } else { //collapsed groups
                                groupHeader[this.key] = `${this.groupHeaderTag},collapsed,${group},${this.groupedData[group]?.length}`;
                                this.addMutantData(groupHeader)
                        }
                })
        }
        queryRecords(query){
                // TODO IMPLEMENT
                this.Parser.parse(query)
        }
        resetSortOrder(field = null){
                if(field){
                        Object.keys(this.sorts).forEach(cField => this.sorts[cField]= (cField === field) ? DATASET.cycleSort(this.getSortOrder(field)) : 'none')
                } else {
                        Object.keys(this.sorts).forEach(cField => this.sorts[cField]='none')
                }
        }
        searchRecords(value=false){ // TODO IMPLEMENT REGEX SEARCH IN NORMAL MODE
                if(value){
                        if(this.powerSearch){
                                this.queryRecords(value)
                        } else {
                                console.log(`searching data for ${value} ${this.searchByField ?? ''}`)
                                this.dataIsGrouped && this.ungroupRecords()
                                this.mutatedData = this.searchByField ? this.getRecordsByField(value) : this.getRecordsByValue(value)
                                this.dataHasMutated=true
                                this.dataIsQueried=true
                        }
                } else {
                        console.log(`empty search`)
                        this.dataIsGrouped && this.ungroupRecords()
                        this.clearMutatedData()
                        this.data.forEach(record=> {this.addMutantData(record)})
                        this.dataIsQueried=false
                }
        }
        setParser(Parser){
                this.Parser=Parser
        }
        setRenderer(Renderer){
                this.Renderer = Renderer
        }
        sortData({field,datagroup=null,sortBy=null}={}){
                const type = this.getDataCategory(field)
                let [data,cField] = [datagroup?this.groupedData[datagroup]:this.getData(),sortBy ?? field]
                !datagroup && this.dataIsGrouped && this.ungroupRecords()
                const cSort = this.sorts[cField]
                const sortedData = (()=>{switch (true){
                        case cSort==='asc' && type==='number': return DATASET.numberSort(data)(cField)
                        case cSort==='asc' && type==='text' : return DATASET.stringSort(data)(cField)
                        case cSort==='asc' && type==='time' : return DATASET.timeSort(data)(cField)
                        case cSort==='asc' && type==='boolean' : return DATASET.numberSort(data)(cField)
                        case cSort==='desc' && type==='number': return DATASET.numberSortReverse(data)(cField)
                        case cSort==='desc' && type==='text' : return DATASET.stringSortReverse(data)(cField)
                        case cSort==='desc' && type==='time' : return DATASET.timeSortReverse(data)(cField)
                        case cSort==='desc' && type==='boolean' : return DATASET.numberSortReverse(data)(cField)
                        default : return DATASET.numberSort(data)(this.key) // sorting 'none' defaults to key asc
                }
                })()
                //  console.log(`sorted ${sortedData.length} fields. Current sorting field is ${this.sortingField} | ${this.sorts[cField]}`)
                // console.dir(sortedData)
                if (datagroup){
                        return sortedData
                } else {
                        this.mutatedData = sortedData
                }
        }
        sortGroup(field){
                this.clearMutatedData()
                this.sortingField = field
                this.resetSortOrder(field)
                this.organizeGroups(field)
        }
        sortRecords(field){
                this.sortingField=field
                this.resetSortOrder(field)
                this.dataIsGrouped && this.ungroupRecords()
                this.sortData({field})
        }
        ungroupRecords(){
                if(this.dataIsGrouped){
                        this.clearMutatedData()
                        Object.keys(this.groupedData).forEach(group =>this.addMutantData(...this.groupedData[group]))
                        this.clearGroupedData()
                        this.dataHasMutated = true
                        this.dataIsGrouped = false
                }
        }
}

//      🔅❗️❕🔆 Ⓜ️ ꩟꩜🌀⭕️❌💢🤍💚🔰
// 🟩⬜️🟥🟧🟨🟦🟪⚪️🔘🟢🔴🟡🔺🔻🔒🔍📍🏷️🛡️🔧🛠️💡⏱️🌅
// 🎗️🏆🥇🥈🥉🔥💥🌟✨🌪️💧🌎🌑🌕🌻🍃🍀🌿🌱🥷🏾🧟‍♂️🧌🧙‍♂️🦹‍♂️👻💀☠️👽👾🤖🎃😈👿👣🧝‍♀️🧛‍♀️🧑‍🚀🫥🥶🤯