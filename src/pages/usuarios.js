import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../global/header';
import Footer from '../global/footer';
import Chat from '../chat/chat';
import UserList from '../usuarios/lista-usuarios';
import "../css/root.css"
const Usuarios= () => {
        return (
        <React.StrictMode>
        <Header/>
        <Chat/>
        <UserList/>
        <Footer/>
        </React.StrictMode>
        );
      };
      
      export default Usuarios
  