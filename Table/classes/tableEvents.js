export class EVENTS{
    constructor(Dataset,Renderer){
        this.Dataset = Dataset
        this.Renderer = Renderer
    }
    setRenderer(renderer){
        this.Renderer = renderer
    }
    handler(event){
        const self = event.target
        if (self instanceof HTMLElement) {
            console.log(`event triggered by ${self.getAttribute('hlx-element')} ${self.getAttribute('hlx-group')}`)
            switch(true){
                case self.getAttribute('hlx-element')==='header':
                    if(event.altKey){
                        console.log(`group by ${self.getAttribute('hlx-field')}`)
                        this.Dataset.groupRecords(self.getAttribute('hlx-field'))   //GROUP RECORDS
                        this.Renderer.repopulateViewport(0)
                        this.Renderer.hideTableHeaders()
                    }else{  
                        this.Dataset.sortRecords(self.getAttribute('hlx-field'))    //SORT RECORDS
                        this.Renderer.repopulateViewport(0)
                        this.Renderer.showTableHeaders()
                    }
                    break
                case self.getAttribute('hlx-element')==='group header':
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
                case self.getAttribute('hlx-element')==='group table header':
                    this.Dataset.sortGroup(self.getAttribute('hlx-field'))          //SORT GROUPED RECORDS
                    this.Renderer.repopulateViewport(0)
                    break
            }
        }
    }
}