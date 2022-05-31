import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../global/header';
import Footer from '../global/footer';
import Chat from '../chat/chat';
import MateriaList from "../materia/lista-materia"
import "../css/root.css"
const Materia = () => {
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
        <MateriaList/>
        <Footer/>
        </React.StrictMode>
        );
      };}
      
      export default Materia;
  