import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Form,Alert} from 'react-bootstrap';
import Materia from "./materia"
import axios from 'axios';
export default class MateriaList extends React.Component {
  constructor(props){
    super(props)
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.toggleModalAdd = this.toggleModalAdd.bind(this);
    this.setShowAlert = this.setShowAlert.bind(this);
    this.setVariant = this.setVariant.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.setValidated = this.setValidated.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
    this.state={
      update: false,
      materias:[],
      profesores:[],
      show:false,
      showAlert:false,
      alertMessage:"",
      variant:"warning",
      validated:false
    }
  }
  setShowAlert(valor){
    this.setState({showAlert:valor})
  }
  setVariant(valor){
    this.setState({variant:valor})
  }
  setValidated(valor){
    this.setState({validated:valor})
  }
  setAlertMessage(valor){
    this.setState({alertMessage:valor})
  }
  componentDidMount() {
    
    axios.get(`http://alethetwin.online:8080/api/v1/materias/`,{
      headers: {
          "Authorization": "Bearer "+localStorage.getItem("token")
      }
    })
      .then(res => {
        const materias = res.data;
        this.setLista( materias );
          axios.get(`http://alethetwin.online:8080/api/v1/usuarios/profesores/`,{
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("token")
            }
          })
            .then(res => {
              const profesores = res.data;
              this.setListaProfesores( profesores );
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
  setLista(materias){
    this.setState({ materias });
  }
  setListaProfesores(listanueva){
    this.state.profesores=listanueva
  }
  handleSubmit = (event) => {
    event.preventDefault();
  }
  onsubmit(event){
    event.preventDefault()
    this.setShowAlert(false)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setShowAlert(true)
      this.setVariant("warning")
      this.setAlertMessage("Caracteres invalidos.")
      this.setValidated(true);
      return
    }
    this.setValidated(true);
    axios.post(`http://alethetwin.online:8080/api/v1/materias/`,{
            nombre:event.target[1].value,
            profesorId:event.target[2].value
          },{
                headers: {
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            }
          )
            .then(res => {
                this.setVariant("success")
                this.state.materias.push(res.data)
                this.setShowAlert(true)
                this.setAlertMessage("Agregado con exito")
                alert("Agregado con exito")
                this.toggleModalAdd()
            }).catch(function (error) {
              console.log(error)
              this.setVariant("danger")
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
      <section className='section-first-item px-3'>
    <h1 className='text-center'>Lista de materias</h1>
    {
      localStorage.getItem("rol")==="administrador"?(
        <div className='px-2 d-flex justify-content-end'>
          <Button onClick={this.toggleUpdate}>Administrar</Button>
        </div>
      ):""
    }
    {
      localStorage.getItem("rol")==="administrador" && this.state.update===true?(
        <div className='px-2 d-flex justify-content-center'>
          <Button onClick={this.toggleModalAdd}>Agregar nueva materia</Button>
          <Modal show={this.state.show} onHide={this.toggleModalAdd}>
          
            <Form onSubmit={this.onsubmit} noValidate validated={this.validated}>
                <Modal.Header closeButton>
                <Modal.Title>Agregar materia</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                {
                this.state.showAlert !==false?
                (
                  <Alert key="warning" variant={this.state.variant}>
                    {this.state.alertMessage}
                  </Alert>
                ):""
                  
                
                }
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" placeholder="Nombre" pattern="[A-Za-z0-9 ]{1,15}" title='No uses caracteres especiales, ni lo dejes en blanco.'/>
                    </Form.Group>
                      <Form.Group className="mb-3">
                      <Form.Label>Profesor</Form.Label>
                      <select class="form-select" aria-label="Default select ">
                            {
                            this.state.profesores.map(
                            profesor=>
                            <option selected value={profesor.matricula}>{profesor.nombre}</option>
                            )}
                      </select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.toggleModalAdd}>
                    Cancelar
                </Button>
                <Button variant="success" type='submit'>
                    Agregar
                </Button>
                </Modal.Footer>
            </Form>
          </Modal>
        </div>
      ):""
    }
    <Table responsive="sm" >
    <thead>
      
    <tr>
      <th>NRC</th>
      <th>Nombre</th>
      <th>Profesor</th>
      {
        localStorage.getItem("rol")===("administrador")&&this.state.update?
        (
          <th>Acciones</th>
        ):""
      }
    </tr>
  </thead>
  <tbody>
    {this.state.materias.map(
      materia=>
      <Materia nombre={materia.nombre} nrc={materia.nrc} profesorId={materia.profesorId} update={this.state.update} profesores={this.state.profesores}></Materia>
    )}
  </tbody>
  </Table>
    </section>
    )
  }
}