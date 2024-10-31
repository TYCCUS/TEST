export class MODALS {
    constructor({name='unamed',title='title placeholder',footer='footnote placeholder'}){
        this.name = name
        this.title = title
        this.footer = footer
        this.modalWidth = '50'
        this.modalHeight = '50'
        this.headerHeight = '50'
        this.footerHeight = '50'
        this.accent = 'BG-INFO'
        this.screen = 'BG-SECONDARY-OP75'
        this.modalClass = `W100 H100 ${this.screen} Z500 d-none cursor-pointer`
        this.contentClass =`W${this.modalWidth} H${this.modalHeight} d-flex flex-column justify-content-between align-items-stretch FROST BG-LIGHT-OP75 br-5px hlx-shadow-s-st cursor-auto overflow-hidden`
        this.headerClass=`H${this.headerHeight}PX ${this. accent} flex-grow-0 FLEX-CENTER relative`
        this.titleClass=`TXT-INFO-CONTRAST TXT-HLX-MED text-center WR-100`
        this.closeClass=`SQUARE${parseInt(this.headerHeight)-10}PX BG-S-SECONDARY RIGHT-CENTER-EDGE me-1 cursor-pointer br-5px FLEX-CENTER relative`
        this.closeClassIcon = `GROW txt-xxl text-center NOPAD`
        this.bodyClass=`relative flex-grow-1`
        this.footerClass=`H${this.footerHeight}PX ${this. accent} flex-grow-0 FLEX-CENTER relative`
        this.footnoteClass=`TXT-INFO-CONTRAST ps-2 TXT-HLX-LIGHT text-center WR-100`
        this.modalStructure = ` <div id="modalContainer-${this.name}" class="${this.modalClass}">
                                    <div id="modalContent-${this.name}" class="${this.contentClass}">
                                        <header id="modalHeader-${this.name}" class="${this.headerClass}">
                                            <span id="modalClose-${this.name}" class="${this.closeClass}">
                                                <span id="closeIcon-${this.name}" class="${this.closeClassIcon}">✖️</span>
                                            </span>
                                            <span id="modalTitle-${this.name}" class="${this.titleClass}"></span>
                                        </header>
                                        <div id="modalBody-${this.name}" class="${this.bodyClass}"></div>
                                        <footer id="modalFooter-${this.name}" class="${this.footerClass}">
                                            <span id="modalFootnote-${this.name}" class="${this.footnoteClass}"></span>
                                        </footer>
                                    </div>
                                </div>`
        this.closeButton = ''
        this.modalBuilt = false
    }
    getModal(){
        if (this.modalBuilt) return document.getElementById(`modalContainer-${this.name}`)
    }
    getModalHeader(){
        if (this.modalBuilt) return document.getElementById(`modalHeader-${this.name}`)
    }
    getModalTitle(){
        if (this.modalBuilt) return document.getElementById(`modalTitle-${this.name}`)
    }
    getModalBody(){
        if (this.modalBuilt) return document.getElementById(`modalBody-${this.name}`)
    }
    getModalFooter(){
        if (this.modalBuilt) return document.getElementById(`modalFooter-${this.name}`)
    }
    getModalFootnote(){
        if (this.modalBuilt) return document.getElementById(`modalFootnote-${this.name}`)
    }
    renderModal(){
        document.getElementById('documentBody').insertAdjacentHTML("afterbegin",this.modalStructure)
        this.modalBuilt = true
        this.modal = this.getModal()
    }
    hide(del=false){
        if(this.modalBuilt){
            this.modal.classList.add('d-none')
            this.modal.classList.remove('FLEX-CENTER')
            if(del){
                this.getModal().remove()
                this.modalBuilt = false
                this.modal = null
            }    
        }
    }
    remove(){
        this.hide(true)
    }
    show(){
        !this.modalBuilt && this.renderModal()
        this.modal.classList.remove('d-none')
        this.modal.classList.add('FLEX-CENTER')
        this.addTitle(this.title)
        this.addFootnote(this.footer)
        this.attachListener()
    }
    addTitle(title = ''){
        this.getModalTitle().textContent = `${title ?? 'Title placeholder'}`
    }
    addFootnote(footnote = ''){
        this.getModalFootnote().textContent = `${footnote ?? 'Footnote placeholder'}`
    }
    attachListener(){
        this.getModal().addEventListener('click',event=>this.eventHandler(event))
    }
    eventHandler(event){
        event.stopPropagation()
        const self = event.target.getAttribute('id')
        console.log(`event triggered by ${self}`)
        switch(self){
            case `modalContainer-${this.name}`:this.remove();break
            case `modalClose-${this.name}`:this.remove();break
            case `closeIcon-${this.name}`:this.remove();break

        }
    }
}