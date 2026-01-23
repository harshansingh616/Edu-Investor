//import logo from './logo.svg';
import './App.css';
//import About from './Components/About';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import Alert from './Components/Alert';
import React, {useState} from 'react';
import  {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [mode,setMode] = useState('light');
  const [alert,setAlert]=useState(null);

  const showAlert =(message,type)=>{
    setAlert({
      msg:message,
      type: type
    })
  }
  

  const toggleMode = () =>{
    if(mode ==='light'){
      setMode('dark');
      document.body.style.backgroundColor = 'black';
      document.body.style.color='white';
      showAlert("Dark mode is enabled", "success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color='black';
      showAlert("Light mode is enabled", "success");

    }
  }

  return (
    <>
    <Navbar title = "Text Utiles" Mode ={mode} toggleMode={toggleMode}/>
    <Alert alert={alert}/>
    <div className='container'>
    <TextForm heading="Enter your text to analyze" Mode={mode} alert={showAlert} />
    </div>
    {/* <About/> */}
  </>
  );
}

export default App;
