
export function Hero({item,data,size}){
    return(
        <section className='W100 d-flex flex-column justify-content-start align-items-center mb-3'>
            <HeroIMG css={{...data.CSS}} itemBG={item.backgroundImage} BGP={item.backgroundFocus ?? 'center'}/>
            <HeroCopy {...item}/>
        </section>
    )
}

function HeroIMG({css,itemBG,BGP}){
    return (
        <div className="mb-3 flex-grow-1" style={{...css.heroStyle,backgroundImage:itemBG,backgroundPosition:BGP}}></div>
    )
}
function HeroCopy(item){
    return(
        <div className='WR-100 px-4 BG-SECONDARY py-4'>
            <h2 className='WR-100 TXT-HLX-MED TXT-INFO txt-xl text-left lh-1 mb-1'>{item.title}</h2>
            <p className='WR-100 TXT-HLX-LIGHT TXT-DARK txt-m text-left lh-1 NOPAD'>{item.description}</p>
        </div>
    )
}