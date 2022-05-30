import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Col} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
function Materia(props){
    const [id, setid] = useState(props.id);
    const [equipo, setEquipo] = useState(props.equipo);
    const [contenido, setContenido] = useState(props.contenido);
    const [rol, setrol] = useState(props.rol);
    const [autor, setautor] = useState(props.autor);
    const [autorip, setautorip] = useState(props.autorIp);
    const [show, setShow] = useState(false);
    const [existe, setExiste] = useState(true);
    console.log(id+equipo+contenido+"si")
    const toggleModal = () => setShow(!show);
      function deleteEquipo(){
        axios.delete(`http://alethetwin.online:8080/api/v1/Observaciones/${id}`,{
                headers: {
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            }
          )
            .then(res => {
                toggleModal()
                alert("Borrado con exito")
                setExiste(false)
            }).catch(function (error) {
                console.log(error)
                alert("No logre borrarlo")
          });
        
      }
        if(existe){
            return (
                <tr>
                    
                <th>{id}</th>
                <th>{equipo}</th>
                <th>{contenido}</th>
                <th>{autor}</th>
                {
                rol===("administrador")?
                (
                <>
                    <th>{autorip}</th>
                    <th>{props.update?(<><Button variant='outline-danger' onClick={toggleModal}>Borrar</Button></>):""}</th>
                </>
                ):""
                }
                <Modal show={show} onHide={toggleModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Borrar Observacion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Seguro que desea borrar observacion con id: <b>{id}</b> del usuario: <b>{autor}</b>?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        No estoy seguro
                    </Button>
                    <Button variant="danger" onClick={deleteEquipo}>
                        Si, deseo continuar
                    </Button>
                    </Modal.Footer>
                </Modal>
                </tr>
            );
        }
      };
export default Materia;
  