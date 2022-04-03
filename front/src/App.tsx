import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const url = 'http://localhost:5000/api/v1/poi/tabela'
  const [lista, setLista] = useState([]);

  useEffect(() => {
    axios.get(url).then(res => {
      console.log(res);
    }).catch(err=>{
      console.log(err);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        
      </body>
    </div>
  );
}

export default App;
