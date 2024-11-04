const aboutTXT ="The central tendency values and statistical comparisons accompanying some graphs are questionable: for a study with n=3 is rather dificult to unambiguously demonstrate normality or have reliable measure of variance, both of which are, among others, prerequisites for a student's t-test. At n=3, in order to fulfill the statistical pre-requisites to run a number of tests, one would have to make unprovable assumptions about the data to compensate for the lack of data points, creating a condition that deviates from the central limit theorem. Although ANOVA tests can be performed with samples this small, the test would have little predictive power. This translates into do the observations actually reflect what is happening in the rest of the astrocytic population"

const interestsTXT="Astrocytic glycolysis is tightly bound to neuronal energetic supply and reduction of aerobic glycolysis correlates with neuronal apoptosis and cognitive decline in Alzheimer's disease and this study links subjacent molecular disruptions to the ability of astrocytes to generate energy. The findings are summarized as: SENP1 stimulates the expression of PUM2 in a deSUMOylation-mediated manner in astrocytes exposed to amyloid beta(1-42). The over-expressed PUM2 destabilizes NRF2 mRNA, resulting in down-regulation of HK1 and GLUT1 which reduced aerobic glycolysis."

export const data = {
    mainProps:{
        className:'W100 H100 FLEX-CENTER',
        style:{
            backgroundColor:'#242f3c'}
    },
    articleProps:{
        className:'WR-50 WMIN3OOPX WMAX300PX H800PX d-flex flex-column justify-content-between align-content-stretch br-10px overflow-hidden hlx-shadow-n',
        style:{
            backgroundColor:'#121820'
        }
    },
    headerProps:{
        className:'flex-grow-0'
    },
    headerImageProps:{
        className:'H300PX FLEX-CENTER mb-3',
    },
    portraitProps:{
        randomattr : 'this is a random attribute value',
        className:'SQUARE300PX',
        // src:'https://cdn.midjourney.com/faacd378-dc94-4ddd-853d-d550430ae173/0_1.png'
        src:'h239.png'
    },
    headerDataProps:{
        className:'WR-100 BG-TRANSPARENT d-flex flex-column justify-content-start align-items-stretch mb-2',
    },
    user:{
        name:'James Doe',
        occupation: 'CEO Business enterprise Inc.',
        contact: 'tyccus.com'
    },
    userNameProps:{
        className:'TXT-HLX-MED txt-m text-center lh-1 mb-1',
        style:{
            color:'#ffffffB7'
        }
    },
    userOccupationProps:{
        className:'TXT-HLX-THIN txt-s text-center lh-1 mb-2',
        style:{
            color:'#fcf1e4'
        }
    },
    userContactProps:{
        className:'TXT-HLX-THIN txt-s text-center lh-1',
        style:{
            color:'#ffffffB7'
        }
    },
    CTAProps:{
        className:'H50PX d-flex flex-column align-items-stretch mb-3',
        style:{
            backgroundColor:'#020810'
        }
    },
    CTAContainerProps:{
        className:'H50PX d-flex flex-row flex-wrap justify-content-center align-items-stretch px-4'
    },
    CTAButtonProps:{
        className:'W125PX d-flex flex-row justify-content-evenly align-items-stretch px-1 FLEX-CENTER txt-n',
        type: 'button',
        style:{
            color:'#ffffffb7',
            textDecoration:'none',
        }
    },
    CTAButtonsIconProps:{
        className:'me-2',
    },
    CTAButtonsLabelProps:{
        className:'',
    },
    CTAButtons:{
        TyccusBTN:{
            link:'https://tyccus.com',
            icon:'▲',
            label:'Email',
        },
        HLXBTN:{
            link:'https://tyccus.com',
            icon:'Tyccus',
            label:'►',
        }
    },
    contentProps:{
        className:'BG-TRANSPARENT d-flex flex-column align-items-stretch flex-grow-1 overflow-y-scroll NOSCROLLBAR mb-3'
    },
    contentSectionProps:{
        className:'BG-TRANSPARENT d-flex flex-column justify-content-start align-items-stretch px-4'
    },
    SectionTitleProps:{
        className:'TXT-HLX-MED txt-n text-start',
        style:{color:'#ffffffB7'}
    },
    SectionParagraphProps:{
        className:'TXT-HLX-THIN txt-xs text-start lh-1',
        style:{color:'#ffffffB7',textAlign:'justify'}
    },
    contentSectionsData:{
        About:{
            title:'About',
            content:aboutTXT
        },
        Interests:{
            title:'Interests',
            content:interestsTXT
        },
    },
    footerProps:{
        className:'H50PX d-flex flex-row justify-content-center align-items-center flex-grow-0 flex-shrink-0',
        onClick: ()=> console.log("footer clicked"),
        style:{
            backgroundColor:'#020810'
        }
    },
    FooterButtonProps:{
        className:'SQUARE40PX FLEX-CENTER my-0 mx-2 p-0 br-5px OPACITY-9',
        type:'button',
        style:{
            backgroundColor:'#121820'
        }
    },
    FooterButtonsIconProps:{
        className:'SQUARE40PX NOPAD',
    },
    FooterButtons:{
        TyccusBTN:{
            link:'https://tyccus.com',
            icon:'https://cdn.midjourney.com/8731bd38-217b-42d4-862e-eb9f58563e1b/0_0.png',
        },
        HLXBTN:{
            link:'https://helixara.com',
            icon:'https://cdn.midjourney.com/43b30db7-a237-4a54-ad31-321e31d3bc6a/0_1.png',
        }
    },
}