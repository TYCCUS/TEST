import Header from "./Header"
import CTA from "./CTA"
import Content from "./Content"
import Footer from "./Footer"

export default function Card(data){
        return(
                <article {...data.articleProps}>
                        < Header {...data}/>
                        < CTA {...data}/>
                        < Content {...data}/>
                        < Footer {...data}/>
                </article>
        )
}