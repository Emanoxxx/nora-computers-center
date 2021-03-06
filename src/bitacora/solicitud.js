import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Col} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
function Solicitud(props){
    const [matricula, setmatricula] = useState(props.matricula);
    const [nombre, setnombre] = useState(props.nombre);
    const [carrera, setcarrera] = useState(props.carrera);
    const [rol, setrol] = useState(props.rol);
    const [prestamos, setprestamos] = useState(props.prestamos);
    const [show, setShow] = useState(false);
    const [existe, setExiste] = useState(true);
    const toggleModal = () => setShow(!show);
            return (
                <tr>
                  <td>{props.bitacora.id}</td>
                  <td>{props.bitacora.solicitanteId}</td>
                  <td>{props.bitacora.objetivo}</td>
                  <td>{props.bitacora.equipoId}</td>
                  <td>{moment(props.bitacora.creadoEn).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>{moment(props.bitacora.horaEntrada).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>{moment(props.bitacora.horaSalida).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>{props.bitacora.materiaNRC}</td>
                </tr>
            );
      };
export default Solicitud;
  
