import React  from 'react';
import { useState } from 'react';
import {Row,Toast,Form,ToastContainer,Button} from 'react-bootstrap';
import "../css/root.css"
import "../css/chat.css"
import Mensajes from "./mensajes"
import Contact from "./contact"

  function Chat(){
      const [show, setShow] = useState(false);
      return (
        <section className='section-chat'>
          
      <ToastContainer className="position-fixed Mensajes" >
        <Toast className='d-flex flex-column'  onClose={() => setShow(false)} show={show} delay={3000} >
        <Toast.Header closeButton={false} id="chat-header">
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Nora Chat</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body className='d-flex flex-grow-1 flex-column'>
          <Mensajes></Mensajes>
          <Form className='d-flex align-self-end w-100'>
              <Form.Control type="text" placeholder="Mensaje..." className='flex-grow-1'/>
              <Button variant="primary" className='send-btn' type="submit">
              </Button>
          </Form>
        </Toast.Body>
        </Toast>
      </ToastContainer>
          <Button className='btn-chat' onClick={() =>  toggleChat()}><img src='./resources/img/nora-chat.png' alt='Chat boton'></img></Button>
        </section>
      );
      function toggleChat(){
        setShow(!show)
      }
    }
  

export default Chat;