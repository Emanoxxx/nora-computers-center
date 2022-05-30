import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Form,Alert} from 'react-bootstrap';
import Usuario from "./usuario"
import "../css/usuarios-lista.css"
import axios from 'axios';
export default class EquipoList extends React.Component {
  constructor(props){
    super(props)
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.toggleModalAdd = this.toggleModalAdd.bind(this);
    this.setShowAlert = this.setShowAlert.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.setValidated = this.setValidated.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
    this.state={
      update: false,
      usuarios:[],
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
    
    axios.get(`http://alethetwin.online:8080/api/v1/Usuarios/`,{
      headers: {
          "Authorization": "Bearer "+localStorage.getItem("token")
      }
  })
      .then(res => {
        const usuarios = res.data;
        this.setLista( usuarios );
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
  setLista(usuarios){
    this.setState({ usuarios });
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
      this.setAlertMessage("Caracteres invalidos.")
      this.setValidated(true);
      return
    }
    if(event.target[2].value!==event.target[3].value){
      this.setShowAlert(true)
      this.setAlertMessage("Contraseñas no coinciden")
      return
    }
    this.setValidated(true);
    axios.post(`http://alethetwin.online:8080/api/v1/Usuarios/`,{
            nombre:event.target[1].value,
            password:event.target[2].value,
            matricula:event.target[4].value,
            carrera:event.target[5].value,
            rol:event.target[6].value
          },{
                headers: {
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            }
          )
            .then(res => {
                this.setShowAlert(true)
                this.setAlertMessage("Agregado con exito")
                alert("Agregado con exito")
                this.toggleModalAdd()
            }).catch(function (error) {
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
      <section className='section-first-item'>
    <h1 className='text-center'>Lista de Usuarios</h1>
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
          <Button onClick={this.toggleModalAdd}>Agregar nuevo Usuario</Button>
          <Modal show={this.state.show} onHide={this.toggleModalAdd}>
          
            <Form onSubmit={this.onsubmit} noValidate validated={this.validated}>
                <Modal.Header closeButton>
                <Modal.Title>Agregando Usuario</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                {
                this.state.showAlert !==false?
                (
                  <Alert key="info" variant="info">
                    {this.state.alertMessage}
                  </Alert>
                ):""
                  
                
                }
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" placeholder="Nombre" pattern="[A-Za-z0-9 ]{1,15}" title='No uses caracteres especiales, ni lo dejes en blanco.'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" pattern="[A-Za-z0-9 ]{1,15}" title='No uses caracteres especiales, ni lo dejes en blanco.'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Repite tu Password</Form.Label>
                      <Form.Control type="password" placeholder="Repite tu Password" pattern="[A-Za-z0-9 ]{1,15}" title='No uses caracteres especiales, ni lo dejes en blanco.'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Matricula</Form.Label>
                      <Form.Control type="text" placeholder="Matricula" pattern="[A-Za-z0-9 ]{1,15}" title='No uses caracteres especiales, ni lo dejes en blanco.'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Carrera</Form.Label>
                      <select class="form-select" aria-label="Default select ">
                        <option selected value="LTC">LTC</option>
                        <option selected value="LIS">LIS</option>
                        <option selected value="LE">LE</option>
                        <option selected value="LRySC">LRySC</option>
                        <option selected value="NA">No aplica</option>
                      </select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Rol</Form.Label>
                      <select class="form-select" aria-label="Default select ">
                        <option selected value="alumno">Alumno</option>
                        <option value="administrador">Administrador</option>
                        <option value="profesor">Profesor</option>
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
      <th>Matricula</th>
      <th>Nombre</th>
      <th>Carrera</th>
      <th>Rol</th>
      {
        localStorage.getItem("rol")===("administrador")&&this.state.update?
        (
          <th>Acciones</th>
        ):""
      }
    </tr>
  </thead>
  <tbody>
    {this.state.usuarios.map(
      usuario=>
      <Usuario nombre={usuario.nombre} matricula={usuario.matricula} carrera={usuario.carrera} rol={usuario.rol} prestamos={[]} update={this.state.update}></Usuario>
    )}
  </tbody>
  </Table>
    </section>
    )
  }
}