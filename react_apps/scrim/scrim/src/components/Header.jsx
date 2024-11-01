
export default function Navbar(props){ return (
    <nav>
      <NavMenu {...props} />
  </nav>
)}

function NavMenu(props) {
  return (<ul {...props.navContainer}>
      <img {...props.navLogo}/>
      <div {...props.navMenuItems}>
          <MenuItems {...props}/>
      </div>
  </ul>)
}

function MenuItems(props){
  return props.menuLabels.map(item => <li key={item} {...props.menuItems}>{item}</li> )
}