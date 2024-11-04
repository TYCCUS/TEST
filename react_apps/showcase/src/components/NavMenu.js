export function NavMenu(menuItems){
    const mainNavItems = Object.values(menuItems).filter(item=>item.position==='HEADER')
    console.dir(Object.values(menuItems))
    return(
        mainNavItems.map(item=>{
            return(<span key={`mainMenu_${item.label}`} className='mx-4'>{item.label}</span>)
        })
    )
}