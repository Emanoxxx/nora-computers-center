import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../global/header';
import Footer from '../global/footer';
import Chat from '../chat/chat';
import MateriaList from "../materia/lista-materia"
import "../css/root.css"
const Materia = () => {
        return (
        <React.StrictMode>
        <Header/>
        <Chat/>
        <MateriaList/>
        <Footer/>
        </React.StrictMode>
        );
      };
      
      export default Materia;
  