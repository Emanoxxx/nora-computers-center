import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Form,Alert} from 'react-bootstrap';
import moment from 'moment';
import "../css/usuarios-lista.css"
import axios from 'axios';
export default class SolicitudRegistro extends React.Component {
  constructor(props){
    super(props)
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.toggleModalAdd = this.toggleModalAdd.bind(this);
    this.setShowAlert = this.setShowAlert.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.setValidated = this.setValidated.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
    this.setVariant = this.setVariant.bind(this);
    this.setSolicitudCreada = this.setSolicitudCreada.bind(this);
    this.imprimir = this.imprimir.bind(this);
    this.state={
      update: false,
      materias:[],
      show:false,
      showAlert:false,
      variant:"warning",
      alertMessage:"",
      validated:false,
      solicitudCreada:null
    }
  }
  imprimir(){
    window.print()
  }
  setSolicitudCreada(valor){
    this.setState({solicitudCreada:valor})
  }
  setVariant(valor){
    this.setState({variant:valor})
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
    
    axios.get(`http://alethetwin.online:8080/api/v1/materias/full`,{
      headers: {
          "Authorization": "Bearer "+localStorage.getItem("token")
      }
    })
      .then(res => {
        const materias = res.data;
        this.setLista( materias );
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
  setLista(materias){
    this.setState({ materias });
  }
  handleSubmit = (event) => {
    event.preventDefault();
  }
  onsubmit(event){
    event.preventDefault()
    this.setShowAlert(false)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setShowAlert(false)
      event.stopPropagation();
      this.setVariant("warning")
      this.setShowAlert(true)
      this.setAlertMessage("Caracteres invalidos.")
      this.setValidated(true);
      return
    }
    this.setValidated(true);
    axios.post(`http://alethetwin.online:8080/api/v1/solicitudes/`,{
            materiaNRC:event.target[0].value,
            horaSalida:moment(event.target[2].value),
            horaEntrada:moment(event.target[1].value),
            objetivo:event.target[3].value

          },{
                headers: {
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            }
          )
            .then(res => {
                this.setVariant("success")
                this.setShowAlert(true)
                this.setAlertMessage("Agregado con exito")
                this.setSolicitudCreada(res.data)
                alert("Agregado con exito")
                this.toggleModalAdd()
            }).catch(function (error) {
              this.setVariant("danger")
              console.log(error)
                if(error.response){
                  this.setsetShowAlert(true)
                  this.setAlertMessage(error.response.data.error)
                  return
                }else{
                  this.setsetShowAlert(true)
                  this.setAlertMessage("Algo salio mal")
                }
              
          });
  }
  render(){
    return (
      <section className='section-first-item  px-3'>
    <h1 className='text-center'>Registro de solicitud</h1>
    {
    this.state.showAlert !==false?
    (
      <Alert key="warning" variant={this.state.variant}>
        {this.state.alertMessage}
      </Alert>
    ):""
      
    
    }
      <Form onSubmit={this.onsubmit} noValidate validated={this.validated}>
      <Form.Group className="mb-3" >
          <Form.Label>Materia</Form.Label>
          <select class="form-select" aria-label="Default select ">
                {
                this.state.materias.map(
                materia=>
                <option value={materia.nrc}>{materia.nombre} - {materia.profesor.nombre}</option>
                )}
          </select>
      </Form.Group>
      <Form.Group className="mb-3" >
          <Form.Label>Hora de entrada</Form.Label>
          <Form.Control type="datetime-local" required/>
      </Form.Group>
      <Form.Group className="mb-3" >
          <Form.Label>Hora de salida</Form.Label>
          <Form.Control type="datetime-local" required/>
      </Form.Group>
      <Form.Group className="mb-3" >
          <Form.Label>Objetivo</Form.Label>
          <Form.Control type="text" placeholder="Objetivo..." pattern="[A-Za-z0-9 ]{1,15}" title='No uses caracteres especiales, ni lo dejes en blanco.' required/>
      </Form.Group>
      <div className='d-flex'>
        <Button className='w-100' variant="primary" type="submit">
            Submit
        </Button>
      </div>
      </Form>
      {this.state.solicitudCreada &&(
        <Modal show={this.state.show} onHide={this.toggleModalAdd}>
        <Modal.Header closeButton>
        <Modal.Title>Solicitud <b>{this.state.solicitudCreada.id}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table responsive="sm" >
          <tbody>
            <tr>
              <th>Matricula del solicitante</th>
              <td>{this.state.solicitudCreada.solicitanteId}</td>
            </tr>
            <tr>
              <th>Objetivo</th>
              <td>{this.state.solicitudCreada.objetivo}</td>
            </tr>
            <tr>
              <th>Materia</th>
              <td>{this.state.solicitudCreada.materiaNRC}</td>
            </tr>
            <tr>
              <th>horaEntrada</th>
              <td>{this.state.solicitudCreada.horaEntrada}</td>
            </tr>
            <tr>
              <th>horaSalida</th>
              <td>{this.state.solicitudCreada.horaSalida}</td>
            </tr>
            <tr>
              <th>creadoEn</th>
              <td>{this.state.solicitudCreada.creadoEn}</td>
            </tr>
          </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.toggleModalAdd}>
            Cerrar
        </Button>
        <Button variant="success" onClick={this.imprimir}>
            Imprimir
        </Button>
        </Modal.Footer>
        </Modal>
      )
      }
    </section>
    )
  }
}