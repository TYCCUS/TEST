import Card from './components/Card';


function App(data) {
  return (
    <main {...data.mainProps}>
      < Card {...data}/>
    </main>
    
  );
}

export default App;