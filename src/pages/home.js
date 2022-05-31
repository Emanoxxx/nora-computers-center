import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../global/header';
import Intro from '../home/intro';
import Footer from '../global/footer';
import Chat from '../chat/chat';
import Acercade from '../home/acercaDe';
import "../css/root.css"
const Home = () => {
  console.log(localStorage.getItem("rol"))
    return (
    <React.StrictMode>
    <Header/>
    <Intro/>
    <Acercade/>
    
    <Footer/>
    </React.StrictMode>
    );
  };
  
  export default Home;