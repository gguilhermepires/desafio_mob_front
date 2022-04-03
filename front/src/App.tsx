import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { json } from 'stream/consumers';
import { textSpanEnd } from 'typescript';
function App() {
  const url = 'http://localhost:5000/api/v1/poi/tabela'
  let [lista, setLista] = useState<any>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!');
      axios.get(url).then(res => {
        console.log('data');
        console.log(res.data);
        console.log('dado');
        console.log(res.data.dado);
        console.log('dado length');
        console.log(res.data.dado.length);

        let tmp = [];
        for (let i = 0; i < res.data.dado.length; i++) {
          tmp.push(res.data.dado[i]);
        }
        setLista(tmp);
      }).catch(err => {
        console.log(err);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const montaTabela = () => {
    var temp = lista.map((elem: any) => {
      return (
        <Card>
          <Card.Header as="h5">Ponto: {elem.ponto.nome}</Card.Header>
          <Card.Body>
            <Card.Title>Raio: {elem.ponto.raio}</Card.Title>
            <Card.Text>
              <ListGroup>
                {
                  montalista(elem.tempoVeiculos)
                }
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
    console.log(temp);

    return (temp);
  };
  return (
    <div className="App">
      {
        montaTabela()
      }

    </div>
  );
}

export default App;

function montalista(tempoVeiculos: any) {
  let lista = [];
  for (let key in tempoVeiculos) {
    console.log(tempoVeiculos[key]);
    lista.push((
      <div>
        <ListGroupItem
        active
        >
          {tempoVeiculos[key].placa}
        </ListGroupItem>
        <ListGroupItem>
          Tempo em Dias: {tempoVeiculos[key].tempo.dia}
        </ListGroupItem>
        <ListGroupItem>
        Tempo em horas: {tempoVeiculos[key].tempo.hora}
        </ListGroupItem>
        <ListGroupItem>
        Tempo em minutos: {tempoVeiculos[key].tempo.minuto}
        </ListGroupItem>
        <ListGroupItem>
        Tempo em segundos: {tempoVeiculos[key].tempo.segundo}
        </ListGroupItem>
      </div>


    ));

  }
  return (lista);
}

