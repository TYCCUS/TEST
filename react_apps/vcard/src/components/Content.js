export default function Content(data){
    return(
            <section {...data.contentProps}>
                    < ContentSections {...data} />
            </section>
    )
}

function ContentSections(data){
    const sections = data.contentSectionsData
    return Object.keys(sections).map(item => {
        console.log(item)
        return(
            <div key={item} {...data.contentSectionProps}>
                <h2 {...data.SectionTitleProps}>{sections[item].title}</h2>
                <p {...data.SectionParagraphProps}>{sections[item].content}</p>
            </div>
        )
    })
}