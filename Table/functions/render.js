export const render = function (type, value) {
    const [cType, args] = typeof type === "object" ? [Object.keys(type)[0], type[Object.keys(type)[0]]] : [type, false]
    const dropDownHTML = `<select class="form-select py-0 mx-2" hlx-element='cell' hlx-type='${cType}'>
                            <option selected>${value}</option>
                            ${args && args.map(arg => {return arg != value ? `<option value='${arg}'>${arg}</option>` : ''}).join('')}
                        </select>`
    const checkboxHTML = `<div class='form-check form-switch FLEX-CENTER'>
                            <input class="form-check-input" type="checkbox" value="${value}" id="flexCheckChecked" ${value===true ? 'checked' : ''}>
                        </div>`

    switch (cType) {
        case "text": return `<div hlx-element='cell' hlx-type='${cType}' contenteditable="false" >${value}</div>`
        case "number": return `<div hlx-element='cell' hlx-type='${cType}' contenteditable="true" >${value}</div>`
        case "select": return dropDownHTML
        case "boolean": return checkboxHTML
        default: return `<div hlx-element='cell' hlx-type='${cType}' contenteditable="true" >${value}</div>`
    }
};
