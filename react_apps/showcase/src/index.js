import React from 'react'
import ReactDOM from 'react-dom/client'

// import reportWebVitals from './reportWebVitals'
import { data } from './data/data'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <App {...data}/>
  </React.StrictMode>
)

// reportWebVitals(console.log);

// const cards = document.querySelectorAll('[element="experience card"]')
// console.log(cards);
// for (const card of cards){
//   card.addEventListener('click',(event)=>{
//     const self=event.target
//     const itemNo =parseInt(self.getAttribute('id'))
//     console.log(`card ${itemNo} clicked`)
//     const itemData = data.filter(item=>parseInt(item.id)===itemNo)
//     alert(JSON.stringify(itemData))
//   })
// }