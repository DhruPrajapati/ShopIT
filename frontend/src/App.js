import './App.css';
import Home from './components/home';
import Header from './components/layout/Header';
import Footer from './components/layout/footer';


function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
