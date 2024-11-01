
export default function CTA(data){
        return(
                <div {...data.CTAProps}>
                        <div {...data.CTAContainerProps}>
                                <CTAButtons {...data}/>
                        </div>
                </div>
        )
}

function CTAButtons(data){
        const BTNs = data.CTAButtons
        return Object.keys(BTNs).map(item => {
                return(
                <a key={item} {...data.CTAButtonProps} href={BTNs[item].link} >
                        <span {...data.CTAButtonsIconProps}>{BTNs[item].icon}</span>
                        <span {...data.CTAButtonsLabelProps}>{BTNs[item].label}</span>
                </a>
                )
        })
}