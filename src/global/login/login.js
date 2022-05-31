import React from 'react';
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import {Form,Button,Modal,Alert,NavDropdown} from 'react-bootstrap';
import "../../css/login.css"
import axios from 'axios';
function Login(props){
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [variant,setVariant] =useState("warning");
  var [alertMessage,setAlertMessage] =useState("");
  const [validated, setValidated] = useState(false);
  var [nombreButon,setNombreButon] =useState(()=>{if(localStorage.getItem("nombre")===null){return "Iniciar sesion"}else{return "Hola "+localStorage.getItem("nombre")}}) 
  //useState("Iniciar Sesion");
  var [rol,setRol] =useState("");
  const handleSubmit = (event) => {
    setVariant("warning")
    setShowAlert(false)
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setShowAlert(true)
      setAlertMessage("Caracteres invalidos.")
      setValidated(true);
      return
    }
    var matricula=event.target[0].value
    var password=event.target[1].value
    setValidated(true);
    try {
      axios.post('http://alethetwin.online:8080/api/v1/Login/',
          {
          matricula,
          password
          })
          .then(function (response) {
              setVariant("success")
              setShowAlert(true)
              localStorage.setItem("carrera",response.data.carrera) 
              localStorage.setItem("matricula",response.data.matricula) 
              localStorage.setItem("nombre",response.data.nombre) 
              localStorage.setItem("rol",response.data.rol) 
              localStorage.setItem("token",response.data.token) 
              setAlertMessage("Hola "+localStorage.getItem("nombre"))
              setNombreButon("Hola "+localStorage.getItem("nombre"))
              handleClose()
              window.location.replace('');
          })
          .catch(function (error) {
              //console.log(error);
              setVariant("danger")
              setShowAlert(true)
              setAlertMessage("Algo salio mal")
          });
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <>
    
    {
    localStorage.getItem("matricula") !==null?
      (
        <NavDropdown title={nombreButon} id="basic-nav-dropdown" className="rounded-pill p-2 px-5 bg-transparent btn-login btn btn-outline-light btn-logueado">
          
          <NavDropdown.Divider />
          <NavDropdown.Item><Button variant="outline-danger" className="rounded-pill p-2 px-5 bg-transparent btn-login" onClick={cerrarSesion}>Cerrar Sesion</Button></NavDropdown.Item>
        </NavDropdown>
      ):(
      <Button variant="outline-light" className="rounded-pill p-2 px-5 bg-transparent btn-login" onClick={handleShow}>{nombreButon}</Button>
      )
    }
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form className='d-flex flex-column' noValidate validated={validated} onSubmit={handleSubmit} method="post">
            <Form.Group className="mb-3" controlId="formBasicEmail">
            {
            showAlert !==false?
             (
              <Alert key={variant} variant={variant}>
                {alertMessage}
              </Alert>
              ):""
              
            
            }

            
              <Form.Label>Matricula</Form.Label>
              <Form.Control type="texto" placeholder="Enter Matricula" name='matricula' required maxLength={"256"} pattern="[A-Za-z0-9]{1,15}" title='No uses caracteres especiales, ni lo dejes en blanco.'/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' required maxLength={"256"} pattern="[A-Za-z0-9]{1,15}" title='No uses caracteres especiales, ni lo dejes en blanco.'/>
            </Form.Group>
            <Button variant="primary" type="submit" className=' bg-login-btn'>
              Iniciar sesion
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
  function cerrarSesion(){
    localStorage.removeItem("carrera") 
    localStorage.removeItem("matricula") 
    localStorage.removeItem("nombre") 
    localStorage.removeItem("rol") 
    localStorage.removeItem("token") 
    setNombreButon("Iniciar sesion")
    window.location.replace('');
  }
}

export default Login;