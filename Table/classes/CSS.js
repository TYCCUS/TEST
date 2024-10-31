export class CSS {
    constructor(){
        this.rowHeight = 30
        this.variables = {}
        this.rules={}
        this.rootCSS=''
        this.CSS=''
    }
    removeRule(name){
        delete this.rules[name]
    }
    setRule(name,ruleset){
        this.rules[name]=ruleset
    }
    remove(name){
        (String(name).startsWith('--') && this.removeVariable(variable)) || this.removeRule(name)
    }
    add(name,definition){
        (String(name).startsWith('--') && this.setVariable(name,definition)) || this.setRule(name,definition)
        console.dir(this.variables)
        console.dir(this.rules)
    }
    setVariable(variable,value){
        this.variables[variable]=value
    }
    removeVariable(name){
        delete this.variables[name]
    }
    render(){
        this.variables && this.compileVariables()
        this.rules && this.compileRules()
        this.CSS && this.inject() 
    }
    compileVariables(){
        this.rootCSS = ':root{'
        for(const variable in this.variables){
            this.rootCSS += `${variable}:${this.variables[variable]};`
        }
        this.rootCSS += '}'
    }
    compileRules(){
        for(const ruleset in this.rules){
            this.CSS += `${ruleset}{${this.rules[ruleset]}}`
        }
    }
    inject(){
        const css = this.rootCSS + this.CSS
        const cssEl = document.getElementById('HLX-CSS')
        if (cssEl){
            cssEl.textContent = css
        } else {
            const element = document.createElement('STYLE')
            element.setAttribute('id','HLX-CSS')
            element.type = 'text/css'
            element.textContent = css
            document.head.appendChild(element)
        }
    }
}