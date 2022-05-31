import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../global/header';
import Footer from '../global/footer';
import Chat from '../chat/chat';
import SolicitudRegistro from "../solicitud/solicitud"
import "../css/root.css"
const Solicitud = () => {
        if ((localStorage.getItem("rol")!==("alumno")) && (localStorage.getItem("rol")!==("administrador"))) {
          if (localStorage.getItem("nombre")===null) {
            alert("Lo siento no tienes permitido entrar aqui")
          }else{
            alert("Lo siento "+localStorage.getItem("nombre")+" no tienes permitido entrar aqui")
          }
          window.location.replace('/');
        }else{
        return (
        <React.StrictMode>
        <Header/>
        <Chat/>
        <SolicitudRegistro></SolicitudRegistro>
        <Footer/>
        </React.StrictMode>
        );
        }
      };
      
      export default Solicitud;
  