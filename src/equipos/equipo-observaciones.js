import React from 'react';
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {Form,Button,Modal,Alert,NavDropdown} from 'react-bootstrap';
import axios from 'axios';

export default class EquipoObservaciones extends React.Component {
    constructor(props){
        super(props)
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.montarObservaciones = this.montarObservaciones.bind(this);
        this.state={
          update: false,
          observaciones:[],
          show:false,
          showAlert:false,
          variant:"info",
          alertMessage:""
        }
      }
      montarObservaciones() {
    
        axios.get(`http://alethetwin.online:8080/api/v1/Equipos/${this.props.id}/Observaciones`,{
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
    handleClose() {this.setState({show:false})}
    handleShow() {this.montarObservaciones();this.setState({show:true})}
  //useState("Iniciar Sesion");
  render() {
    return (
        <>
        <Button variant="outline-secondary" onClick={this.handleShow}>Ver observaciones</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Observaciones de {this.props.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
    
            </Modal.Body>
          </Modal>
        </>
      );}
}