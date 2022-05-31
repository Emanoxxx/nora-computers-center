import React from 'react';
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {Form,Button,Modal,Alert,Card, Table} from 'react-bootstrap';
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
          variant:"warning",
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
            this.setState( {observaciones: observaciones});
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
                {
                this.state.observaciones.map(
                observacion=>
                <Card className='my-1'>
                    <Card.Header>{observacion.id}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            {observacion.contenido}
                            {' '}
                        </p>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">{observacion.autorId}</cite>
                        </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
                )}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button className="w-100" variant="secondary" onClick={this.handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
          </Modal>
        
        </>
      );}
}