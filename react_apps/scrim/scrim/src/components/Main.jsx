
export default function MainContent(props){
    return(
        <section {...props.mainSection}>
            <h1 {...props.mainTitle}>{props.title}</h1>
        </section>
    )
}