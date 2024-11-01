export default function Footer(data){
    return (
        <footer {...data.footerProps}>
            <FooterElements {...data}/>
        </footer>
    )
}
function FooterElements(data){
    const BTNs = data.FooterButtons
    return Object.keys(BTNs).map(item => {
            return(
            <a key={item} {...data.FooterButtonProps} href={BTNs[item].link} >
                <img {...data.FooterButtonsIconProps} src={BTNs[item].icon} />
            </a>
            )
    })
}