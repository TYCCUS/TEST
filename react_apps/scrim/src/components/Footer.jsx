export default function Footer(props){
    return(
        <footer {...props.footer}>
            <span {...props.footerText}>© 2021 Copyright holder. All rights reserved.</span>
        </footer>
    )
}