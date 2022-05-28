import React  from 'react';
import {Tooltip,OverlayTrigger,Toast,ToastContainer,Button} from 'react-bootstrap';
import "../css/mensajes.css"
import { useState } from 'react';
  function Mensajes(props){
    const [show, setShow] = useState(false);
    return(
        <>
          <div className="flex-grow-1 flex-column mensajeria">
            <ToastContainer  className="w-100 destinatario">
              <Toast className='w-75 h-auto'>
                <Toast.Header closeButton={false}>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Nora</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
              </Toast>
            </ToastContainer >
            <ToastContainer  className="w-100 remitente">
              <Toast className='w-75 h-auto'>
                <Toast.Header closeButton={false}>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Nora</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
              </Toast>
            </ToastContainer >
            <ToastContainer  className="w-100 destinatario">
              <Toast className='w-75 h-auto'>
                <Toast.Header closeButton={false}>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Nora</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
              </Toast>
            </ToastContainer >
            <ToastContainer  className="w-100 remitente">
              <Toast className='w-75 h-auto'>
                <Toast.Header closeButton={false}>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Nora</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
              </Toast>
            </ToastContainer >
          </div>
        </>
    );
    }
  

export default Mensajes;