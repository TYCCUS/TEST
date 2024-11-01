import Navbar from './components/Header';
import MainContent from './components/Main';
import Footer from './components/Footer';

export default function App(pageProps){
    console.log(pageProps)
    return(
    <main>
        <Navbar {...pageProps}/>
        <MainContent {...pageProps}/>
        <Footer {...pageProps}/>
    </main>
)}

// < Page{...pageProps}/>