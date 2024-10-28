export const stringSort = data => property => data.toSorted((a, b) => {
        const [nameA, nameB] = [a[property].toLowerCase(),b[property].toLowerCase()]
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
  })
  
export const stringSortReverse = data => property => data.toSorted((a, b) => {
        const [nameA, nameB] = [a[property].toLowerCase(),b[property].toLowerCase()]
        return nameA < nameB ? 1 : nameA > nameB ? -1 : 0
})

export const numberSort = data => property => data.toSorted((a, b) => a[property] - b[property])
export const numberSortReverse = data => property => data.toSorted((a, b) => b[property] - a[property])
export const sortToggler = (event)=>{
        let newData
        const el = event.relatedTarget;
        const attr = el.attributes;
        const [field,type,sort] = [attr['hlx-value'],attr['hlx-type'],attr['hlx-sort']]
        switch (true){
                case sort==='none' && type==='number': newData =numberSort(data)(field);el.setAttribute('hlx-sort','asc');break;
                case sort==='none' && type==='text' : newData =stringSort(data)(field);el.setAttribute('hlx-sort','asc');break;
                case sort==='asc' && type==='number': newData =numberSortReverse(data)(field);el.setAttribute('hlx-sort','desc');break;
                case sort==='asc' && type==='text' : newData =stringSortReverse(data)(field);el.setAttribute('hlx-sort','desc');break;
                default : newData =stringSort(data)(id);el.setAttribute('hlx-sort','none')
        }        
}