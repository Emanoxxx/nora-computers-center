import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../global/header';
import EquipoList from "../equipos/lista-equipos"
import Footer from '../global/footer';
import Chat from '../chat/chat';
import "../css/root.css"
const Observaciones = () => {
        return (
        <React.StrictMode>
        <Header/>
        <Chat/>
        <EquipoList/>
        <Footer/>
        </React.StrictMode>
        );
      };
      
      export default Observaciones;
  