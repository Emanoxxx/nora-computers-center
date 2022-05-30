import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../global/header';
import Footer from '../global/footer';
import Chat from '../chat/chat';
import UserList from '../usuarios/lista-usuarios';
import "../css/root.css"
const Usuarios= () => {
        if (localStorage.getItem("rol")!==("administrador")) {
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
        <UserList/>
        <Footer/>
        </React.StrictMode>
        );
        }
      };
      
      export default Usuarios
  