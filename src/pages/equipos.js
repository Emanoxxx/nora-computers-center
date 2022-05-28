import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../global/header';
import Footer from '../global/footer';
import Chat from '../chat/chat';
import EquipoList from "../equipos/lista-equipos"
import "../css/root.css"
const Equipos = () => {
        return (
        <React.StrictMode>
        <Header/>
        <Chat/>
        <EquipoList/>
        <Footer/>
        </React.StrictMode>
        );
      };
      
      export default Equipos;
  