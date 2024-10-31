export class EVENTS{
    constructor(Dataset){
        this.Dataset = Dataset
        this.Renderer ={}
        this.searchBar = document.getElementById('searchInput')
        // this.Modals={}
    }
    setRenderer(Renderer){
        this.Renderer = Renderer
    }
    setModal({type,Modal}){
        this.Modals[type] = Modal
    }
    // setSearchModal(Modal){
    //     this.Modals['search'] = Modal
    // }
    setSlowScroll(func, desc){
        this.slowScroll = func
        this.scrollDesceleration = desc
    }
    handler(event){
        const self = event.target
        if (self instanceof HTMLElement) {
            const element = self.getAttribute('hlx-element')
            const field = self.getAttribute('hlx-field')
            const group = self.getAttribute('hlx-group')
            console.log(`event triggered by ${element} | group ${group}`)
            switch(true){
                case(event.metaKey):
                    switch(true){
                        case element==='header':
                            if(this.searchBar.getAttribute('field') !== field){
                                this.searchBar.setAttribute('field',field)
                                this.searchBar.setAttribute('placeholder',`search by ${field}`)
                                this.Dataset.searchByField = field
                            } else {
                                this.searchBar.removeAttribute('field')
                                this.searchBar.setAttribute('placeholder',`search`)
                                this.Dataset.searchByField = false
                                this.Dataset.dataIsQueried = false
                            }
                            break
                    }
                    break
                case element==='header':
                    if(event.altKey){
                        console.log(`group by ${field}`)
                        this.Dataset.groupRecords(field)   //GROUP RECORDS
                        this.Renderer.repopulateViewport(0)
                        this.Renderer.hideTableHeaders()
                    }else{  
                        this.Dataset.sortRecords(field)    //SORT RECORDS
                        this.Renderer.repopulateViewport(0)
                        this.Renderer.showTableHeaders()
                    }
                    break
                case element==='group header':
                    const group =self.getAttribute('hlx-group')
                    if (self.getAttribute('group-status') === 'collapsed') { 
                        if(event.altKey){
                            this.Dataset.expandAllGroups(group)                     // EXPAND ALL GROUPS
                        } else {
                            this.Dataset.expandGroup(group)                         // EXPAND GROUP OF RECORDS
                        }
                    } else {
                        if(event.altKey){
                            this.Dataset.collapseAllGroups(group)                   // COLLAPSE ALL GROUPS
                        } else {
                            this.Dataset.collapseGroup(group)                       // COLLAPSE GROUP OF RECORDS
                        }
                    }
                    this.Renderer.repopulateViewport(0)
                    break
                case element==='group table header':
                    this.Dataset.sortGroup(field)          //SORT GROUPED RECORDS
                    this.Renderer.repopulateViewport(0)
                    break
            }
        }
    }
    scrollHandler = (event) => {
            const scrollMultiplier = (event.ctrlKey || event.metaKey) && event.altKey ? 100 : event.ctrlKey || event.metaKey ? 10 : event.altKey ? 5 : 2;
            let scrollAmount = (Math.sign(event.deltaY) * scrollMultiplier); // -1 for up, 1 for down * multiplier
            // event.shiftKey && (scrollAmount = this.slowScroll(scrollAmount)(this.scrollDesceleration)) // slow scroll if shift pressed
            this.Renderer.repopulateViewport(scrollAmount)
    }
}