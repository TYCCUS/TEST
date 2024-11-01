export default function Header(data){
        return(
                <header {...data.headerProps}>
                        <div {...data.headerImageProps}> 
                                <img {...data.portraitProps} />
                        </div>
                        <div {...data.headerDataProps}>
                                <h1 {...data.userNameProps}>{data.user.name}</h1>
                                <h2 {...data.userOccupationProps}>{data.user.occupation}</h2>
                                <p {...data.userContactProps}>{data.user.contact}</p>
                        </div>
                </header>
        )
}