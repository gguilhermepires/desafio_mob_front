import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import InputMask from 'react-input-mask';
import { Card, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';
function App() {
  const url = 'http://localhost:5000/api/v1/poi/tabela'
  let [lista, setLista] = useState<any>([]);
  let [placa, setPlaca] = useState<any>('');
  let [data, setData] = useState<any>('');

  useEffect(() => {
    buscaTabela();
  }, []);

  const buscaTabela = () => {
    axios.get(`${url}?data=${data}&placa=${placa}`).then(res => {
      let tmp = [];
      for (const property in res.data.dado) {
        tmp.push(res.data.dado[property]);
      }
      setLista(tmp);
    }).catch(err => {
      console.log(err);
    });
  } 
  
  const montaTabela = () => {
    var temp = lista.map((elem: any) => {
      return (<div>
        <br></br>
        <Row >
          <Col sm="3"></Col>
          <Col sm="6">
            <Card >
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
          </Col>
        </Row>
      </div>
      );
    });
    return (temp);
  };

  const onChangePlaca = (event: any) => {
    setPlaca(event.target.value);
  }

  const onChangeData = (event: any) => {
    setData(event.target.value);
  }

  const onClickBusca = () => {
    buscaTabela();
  }

  return (
    <div className="App">
      <Row>
        <Col sm="4"></Col>
        <Col sm="3"><h1>Desafio técnico</h1></Col>
      </Row>
      <br></br>
      <Row>
        <Col sm="3"></Col>
        <Col sm="6">Data: <InputMask mask="9999-99-99" value={data} onChange={onChangeData} />
          {'  '} Placa: <input value={placa} onChange={onChangePlaca} />
          {'  '} <Button variant="primary" onClick={onClickBusca}>Buscar</Button>
        </Col>
      </Row>
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
    lista.push((
      <div>
        <ListGroupItem active >
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

