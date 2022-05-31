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
    this.setMaterias = this.setMaterias.bind(this);
    this.setBitacorasFiltradas = this.setBitacorasFiltradas.bind(this);
    this.setFiltro = this.setFiltro.bind(this);
    this.state={
      update: false,
      bitacoras:[],
      bitacorasFiltradas:[],
      materias:[],
      show:false,
      showAlert:false,
      alertMessage:"",
      validated:false,
      filtro:""
    }
  }
  setFiltro(valor){
    if(valor===""){
      this.setBitacorasFiltradas(this.state.bitacoras)
      this.setState({filtro:valor})
      return
    }
    var array=this.state.bitacoras.filter(
      (bitacora)=>{
        return bitacora.materiaNRC===valor
      }
    )
    this.setBitacorasFiltradas(array)
    this.setState({filtro:valor})
  }
  setBitacorasFiltradas(valor){
    this.setState({ bitacorasFiltradas:valor });
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
        this.setBitacorasFiltradas( bitacoras );
        axios.get(`http://alethetwin.online:8080/api/v1/Materias/`,{
        headers: {
            "Authorization": "Bearer "+localStorage.getItem("token")
        }
        })
        .then(res => {
          const materias = res.data;
          this.setMaterias( materias );
        }).catch(function (error) {
          console.log(error)
            if(error.response){
              alert(error.response.data.error)
              return
            }else{
              alert("Algo salio mal")
            }
          });
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
  setMaterias(valor){
    this.setState({ materias:valor });
  }
  handleSubmit = (event) => {
    event.preventDefault();
  }
  
  render(){
    return (
      <section className='section-first-item px-3'>
    <h1 className='text-center'>Bitacora</h1>
    <div>
      <select class="form-select" aria-label="Default select " onChange={event => this.setFiltro(event.target.value)}>
          <option selected value={""}>Sin filtrar</option>
          {
          this.state.materias.map(
          materia=>
          <option value={materia.nrc}>{materia.nombre}</option>
          )
          }
      </select>
    </div>
    <Table responsive="sm" >
    <thead>
    <tr>
      <th>#</th>
      <th>Usuario</th>
      <th>Objetivo</th>
      <th>Equipo</th>
      <th>Hr. Creacion</th>
      <th>Hr. Entrada</th>
      <th>Hr. Salida</th>
      <th>Materia</th>
    </tr>
  </thead>
  <tbody>
    {this.state.bitacorasFiltradas.map(
      bitacora=>
      <Solicitud bitacora={bitacora}></Solicitud>
    )}
  </tbody>
  </Table>
    </section>
    )
  }
}
  