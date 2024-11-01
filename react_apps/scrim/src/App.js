import Navbar from './components/Header';
import MainContent from './components/Main';
import Footer from './components/Footer';



export default function App(pageProps){
    return(
    <main>
        <Navbar {...pageProps}/>
        <MainContent {...pageProps}/>
        <Footer {...pageProps}/>
    </main>
)}

// < Page{...pageProps}/>