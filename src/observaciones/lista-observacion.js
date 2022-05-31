import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Form,Alert} from 'react-bootstrap';
import Observacion from "./observacion"
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
export default class ObservacionList extends React.Component {
  constructor(props){
    super(props)
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.toggleModalAdd = this.toggleModalAdd.bind(this);
    this.setShowAlert = this.setShowAlert.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.setValidated = this.setValidated.bind(this);
    this.state={
      update: false,
      observaciones:[],
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
    
    axios.get(`http://alethetwin.online:8080/api/v1/observaciones/`,{
      headers: {
          "Authorization": "Bearer "+localStorage.getItem("token")
      }
    })
      .then(res => {
        const observaciones = res.data;
        this.setLista( observaciones );
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
  setLista(observaciones){
    this.setState({ observaciones });
  }
  handleSubmit = (event) => {
    event.preventDefault();
  }
  
  render(){
    return (
      <section className='section-first-item px-3'>
    <h1 className='text-center'>Lista de observaciones</h1>
    {
      localStorage.getItem("rol")==="administrador"?(
        <div className='px-2 d-flex justify-content-end'>
          <Button onClick={this.toggleUpdate}>Administrar</Button>
        </div>
      ):""
    }
    {
      
        <div className='px-2 d-flex justify-content-center'>
          <Link className='btn-primary p-2 m-2 btn-add-Observacion' to="/Equipos">Agregar nueva observacion</Link>
        </div>
    }
    <Table responsive="sm" >
    <thead>
      
    <tr>
      <th>ID</th>
      <th>Equipo</th>
      <th>Contenido</th>
      <th>Autor</th>
      {
        localStorage.getItem("rol")===("administrador")?
        (
          <th>Autor ip</th>
        ):""
      }
      {
        localStorage.getItem("rol")===("administrador")&&this.state.update?
        (
          <th>Acciones</th>
        ):""
      }
    </tr>
  </thead>
  <tbody>
    {this.state.observaciones.map(
      observacion=>
      <Observacion id={observacion.id} equipo={observacion.equipoId} autorIp={localStorage.getItem("rol")==="administrador"?(observacion.autorIp):""} contenido={observacion.contenido} autor={observacion.autorId} rol={localStorage.getItem("rol")} update={this.state.update}></Observacion>
    )}
  </tbody>
  </Table>
    </section>
    )
  }
}