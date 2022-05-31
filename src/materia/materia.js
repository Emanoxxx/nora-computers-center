import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Col} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
function Materia(props){
    const [nrc, setnrc] = useState(props.nrc);
    const [nombre, setnombre] = useState(props.nombre);
    const [profesorId, setprofesorId] = useState(props.profesorId);
    const [profesores, setprofesores] = useState(props.profesores);
    const [show, setShow] = useState(false);
    const [existe, setExiste] = useState(true);
    const toggleModal = () => setShow(!show);
    function updateUsuario(id){
        console.log(profesorId)
        if(nombre===""&&profesorId===""&&nrc===""){
          return
        }
        
        axios.put(`http://alethetwin.online:8080/api/v1/Materias/${nrc}`,{
            nombre,
            profesorId,
            nrc
          },{
                headers: {
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            }
          )
            .then(res => {
                alert("Lo logre!!!")
            }).catch(function (error) {
                console.log(error)
                if(error.response){
                    alert(error.response.data.error)
                }else{
                    alert("Error desconocido")
                }
                
          });
      }
      function deleteEquipo(){
        axios.delete(`http://alethetwin.online:8080/api/v1/Materias/${nrc}`,{
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
                    
                <th>{nrc}</th>
                <th>{props.update?(<input onChange={event => setnombre(event.target.value)} type="text" name={"nombre-"+nrc} defaultValue={nombre}/>):(""+nombre)}</th>
                <th>{props.update?(
                    
                    <select defaultValue={profesorId} onChange={event => setprofesorId(event.target.value)} class="form-select" aria-label="Default select ">
                        
                        {props.profesores.map(
                        profesor=>
                        <option selected value={profesor.matricula}>{profesor.nombre}</option>
                        )}
                    </select>
                    ):(""+profesorId)}
                </th>
                {
                localStorage.getItem("rol")===("administrador")?
                (
                  <th>{props.update?(<><Button variant='outline-warning' onClick={()=>{updateUsuario(nrc)}}>Actualizar</Button> <Button variant='outline-danger' onClick={toggleModal}>Borrar</Button></>):""}</th>
                ):""
                }
                <Modal show={show} onHide={toggleModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Borrar materia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Seguro que desea borrar la materia <b>{nombre}</b> con nrc <b>{nrc}</b>?</Modal.Body>
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
  