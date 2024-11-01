import logo from '../logo.svg';

export const pageProps = {
    main: {className:'H100 W100 d-flex flex-column justify-content-between align-items-stretch'},
    title: 'Hello World!',
    menuLabels:['Pricing','About','Contact'],
    navLogo: {src:logo, alt:'logo', className:"SQUARE40PX" },
    navContainer: {className:'H50PX BG-SECONDARY TXT-SECONDARY-CONTRAST d-flex flex-row justify-content-between align-items-center flex-grow-0'},
    navMenuItems: {className: 'd-flex flex-row justify-content-end me-5', style: { listStyleType: 'none' }},
    menuItems: {className:'mx-2 cursor-pointer'},
    mainSection: {className:'d-flex flex-column justify-content-start align-items-stretch flex-grow-1'},
    mainTitle:{className:'TXT-HLX-MED txt-display TXT-PRIMARY text-center mt-5'},
    footer:{className:'H50PX BG-SECONDARY ps-5 flex-grow-0 relative'},
    footerText:{className: 'LEFT-CENTER TXT-HLX-LIGHT txt-xs TXT-DARK'},
}