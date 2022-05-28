import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../global/header';
import Footer from '../global/footer';
import Chat from '../chat/chat';
import SolicitudList from "../bitacora/Solicitud-list"
import "../css/root.css"
const Bitacora = () => {
        return (
        <React.StrictMode>
        <Header/>
        <Chat/>
        <SolicitudList/>
        <Footer/>
        </React.StrictMode>
        );
      };
      
      export default Bitacora;
  