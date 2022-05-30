import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Col} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import "../css/usuarios-lista.css"
import Solicitud from "./solicitud"
export default class SolicitudList extends React.Component {
  constructor(props){
    super(props)
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.toggleModalAdd = this.toggleModalAdd.bind(this);
    this.setShowAlert = this.setShowAlert.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.setValidated = this.setValidated.bind(this);
    this.state={
      update: false,
      bitacoras:[],
      show:false,
      showAlert:false,
      alertMessage:"",
      validated:false
    }
  }
  setShowAlert(valor){
    this.setState({showAlert:valor})
  }
  setValidated(valor){
    this.setState({validated:valor})
  }
  setAlertMessage(valor){
    this.setState({alertMessage:valor})
  }
  componentDidMount() {
    
    axios.get(`http://alethetwin.online:8080/api/v1/solicitudes/`,{
      headers: {
          "Authorization": "Bearer "+localStorage.getItem("token")
      }
      })
      .then(res => {
        const bitacoras = res.data;
        this.setLista( bitacoras );
      }).catch(function (error) {
        console.log(error)
          if(error.response){
            alert(error.response.data.error)
            return
          }else{
            alert("Algo salio mal")
          }
        });
  }
  toggleUpdate() {
    this.setState({update:!this.state.update})
  }
  toggleModalAdd() {
    this.setState({showAlert:false})
    this.setState({show:!this.state.show})
  }
  setLista(bitacoras){
    this.setState({ bitacoras });
  }
  handleSubmit = (event) => {
    event.preventDefault();
  }
  
  render(){
    return (
      <section className='section-first-item'>
    <h1 className='text-center'>Bitacora</h1>
    
    <Table responsive="sm" >
    <thead>
    <tr>
      <th>#</th>
      <th>Usuario</th>
      <th>Hr. Entrada</th>
      <th>Hr. Salida</th>
      <th>Materia</th>
    </tr>
  </thead>
  <tbody>
    {this.state.bitacoras.map(
      bitacora=>
      <Solicitud bitacora={bitacora}></Solicitud>
    )}
  </tbody>
  </Table>
    </section>
    )
  }
}
  