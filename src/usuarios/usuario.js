import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Col} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
function Usuario(props){
    const [matricula, setmatricula] = useState(props.matricula);
    const [nombre, setnombre] = useState(props.nombre);
    const [carrera, setcarrera] = useState(props.carrera);
    const [rol, setrol] = useState(props.rol);
    const [prestamos, setprestamos] = useState(props.prestamos);
    const [show, setShow] = useState(false);
    const [existe, setExiste] = useState(true);
    const toggleModal = () => setShow(!show);
    function updateUsuario(id){
        if(nombre===""&&matricula===""&&carrera===""&&rol===""&&prestamos===""){
          return
        }
        
        axios.put(`http://alethetwin.online:8080/api/v1/Usuarios/${matricula}`,{
            nombre,
            carrera,
            rol
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
        axios.delete(`http://alethetwin.online:8080/api/v1/Usuarios/${matricula}`,{
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
                    
                <th>{matricula}</th>
                <th>{props.update?(<input onChange={event => setnombre(event.target.value)} type="text" name={"nombre-"+matricula} defaultValue={nombre}/>):(""+nombre)}</th>
                <th>{props.update?(
                    <select defaultValue={carrera} onChange={event => setcarrera(event.target.value)} class="form-select" aria-label="Default select ">
                        <option selected value="LTC">LTC</option>
                        <option selected value="LIS">LIS</option>
                        <option selected value="LE">LE</option>
                        <option selected value="LRySC">LRySC</option>
                        <option selected value="NA">No aplica</option>
                    </select>):(""+carrera)}</th>
                <th>{props.update?(<select onChange={event => setrol(event.target.value)} class="form-select" aria-label="Default select " defaultValue={rol}>
                        <option selected value="alumno">Alumno</option>
                        <option value="administrador">Administrador</option>
                        <option value="profesor">Profesor</option>
                      </select>):(""+rol)}</th>
                {
                localStorage.getItem("rol")===("administrador")?
                (
                  <th>{props.update?(<><Button variant='outline-warning' onClick={()=>{updateUsuario(matricula)}}>Actualizar</Button> <Button variant='outline-danger' onClick={toggleModal}>Borrar</Button></>):""}</th>
                ):""
                }
                <Modal show={show} onHide={toggleModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Borrar usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Seguro que desea borrar el usuario <b>{nombre}</b> con numero de inventario <b>{matricula}</b>?</Modal.Body>
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
export default Usuario;
  