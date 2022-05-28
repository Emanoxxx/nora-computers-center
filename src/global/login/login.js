import React from 'react';
import { useState } from 'react';
import {Form,Button,Modal,Alert} from 'react-bootstrap';
import "../../css/login.css"
import {Logueo} from "../../services/login"
function Login(props){
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [variant,setVariant] =useState("info");
  var [alertMessage,setAlertMessage] =useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      alert("Caracteres invalidos.")
      setValidated(true);
      return
    }
    var matricula=event.target[0].value
    var password=event.target[1].value
    setValidated(true);
    Logueo({matricula,password})
  };
  return (
    <>
    <Button variant="outline-light" className="rounded-pill p-2 px-5 bg-transparent btn-login" onClick={handleShow}>Iniciar sesion</Button>{' '}
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
}
export default Login;