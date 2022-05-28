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
    return (
    <React.StrictMode>
    <Header/>
    <Intro/>
    <Acercade/>
    <Chat/>
    <Footer/>
    </React.StrictMode>
    );
  };
  
  export default Home;