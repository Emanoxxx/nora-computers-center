import React from "react";
import { useState } from "react";
import { Alert, Button, Modal, Form } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { data } from "jquery";
import EquipoObservaciones from "./equipo-observaciones";
function Equipo(props) {
    var now = moment();
    const [nombre, setnombre] = useState(props.nombre);
    const [descripcion, setdescripcion] = useState(props.descripcion);
    const [disponible, setdisponible] = useState(props.disponibleHasta);
    const [show, setShow] = useState(false);
    const [showObservacion, setShowObservacion] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [existe, setExiste] = useState(true);
    const toggleModal = () => setShow(!show);
    const toggleModalObservacion = () => setShowObservacion(!showObservacion);
    function onsubmitObservacion(event) {
        event.preventDefault();
        setShowAlert(false);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setShowAlert(true);
            setAlertMessage("Caracteres invalidos.");
            setValidated(true);
            return;
        }

        setValidated(true);
        axios
            .post(
                `http://alethetwin.online:8080/api/v1/equipos/${props.numeroInventario}/observaciones/`,
                {
                    contenido: event.target[3].value,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                setShowAlert(true);
                setAlertMessage("Agregado con exito");
                alert("Agregado con exito");
                toggleModalObservacion();
            })
            .catch(function (error) {
                console.log(error);
                setShowAlert(true);
                setAlertMessage("Algo salio mal");
            });
    }

    function updateEquipo(id) {
        if (nombre === "" && descripcion === "") {
            return;
        }

        axios
            .put(
                `http://alethetwin.online:8080/api/v1/Equipos/${props.numeroInventario}`,
                {
                    nombre,
                    descripcion,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                alert("Lo logre!!!");
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    alert(error.response.data.error);
                } else {
                    alert("Error desconocido");
                }
            });
    }
    function deleteEquipo() {
        axios
            .delete(
                `http://alethetwin.online:8080/api/v1/Equipos/${props.numeroInventario}`,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                toggleModal();
                alert("Borrado con exito");
                setExiste(false);
            })
            .catch(function (error) {
                console.log(error);
                alert("No logre borrarlo");
            });
    }
    if (existe) {
        return (
            <tr>
                <th>{props.numeroInventario}</th>
                <th>
                    {props.update ? (
                        <input
                            onChange={(event) => setnombre(event.target.value)}
                            type="text"
                            name={"nombre-" + props.numeroInventario}
                            defaultValue={props.nombre}
                        />
                    ) : (
                        "" + props.nombre
                    )}
                </th>
                <th>
                    {props.update ? (
                        <input
                            onChange={(event) =>
                                setdescripcion(event.target.value)
                            }
                            type="text"
                            name={"descripcion-" + props.numeroInventario}
                            defaultValue={props.descripcion}
                        />
                    ) : (
                        "" + props.descripcion
                    )}
                </th>
                <th className="d-flex justify-content-between">
                    {localStorage.getItem("rol") === "administrador" ? (
                        <>
                            {props.update ? (
                                <th>
                                    <Button
                                        variant="outline-warning"
                                        onClick={() => {
                                            updateEquipo(
                                                props.numeroInventario
                                            );
                                        }}
                                    >
                                        Actualizar
                                    </Button>{" "}
                                    <Button
                                        variant="outline-danger"
                                        onClick={toggleModal}
                                    >
                                        Borrar
                                    </Button>
                                </th>
                            ) : (
                                ""
                            )}
                        </>
                    ) : (
                        ""
                    )}
                    {localStorage.getItem("rol") === "administrador" ||
                    localStorage.getItem("rol") === "alumno" ? (
                        <th>
                            {
                                <>
                                    <EquipoObservaciones
                                        id={props.numeroInventario}
                                        nombre={nombre}
                                    ></EquipoObservaciones>{" "}
                                    <Button
                                        variant="outline-secondary"
                                        onClick={toggleModalObservacion}
                                    >
                                        Escribir observacion
                                    </Button>
                                    <Modal
                                        show={showObservacion}
                                        onHide={toggleModalObservacion}
                                    >
                                        <Form
                                            onSubmit={onsubmitObservacion}
                                            noValidate
                                            validated={validated}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>
                                                    Observacion
                                                </Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                {showAlert !== false ? (
                                                    <Alert
                                                        key="warning"
                                                        variant="warning"
                                                    >
                                                        {alertMessage}
                                                    </Alert>
                                                ) : (
                                                    ""
                                                )}
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Nombre de equipo
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={nombre}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Numero de inventario
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={
                                                            props.numeroInventario
                                                        }
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3 d-flex flex-column">
                                                    <Form.Label>
                                                        Observacion
                                                    </Form.Label>
                                                    <textarea
                                                        className="text-area"
                                                        placeholder="Descripcion..."
                                                        rows={5}
                                                        pattern="[A-Za-z0-9 ]{1,256}"
                                                        title="No uses caracteres especiales, ni lo dejes en blanco."
                                                    ></textarea>
                                                </Form.Group>
                                                <script
                                                    type="application/javascript"
                                                    src="https://api.ipify.org?format=jsonp&callback=getIP"
                                                ></script>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button
                                                    variant="secondary"
                                                    onClick={
                                                        toggleModalObservacion
                                                    }
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    variant="success"
                                                    type="submit"
                                                >
                                                    Agregar
                                                </Button>
                                            </Modal.Footer>
                                        </Form>
                                    </Modal>
                                </>
                            }
                        </th>
                    ) : (
                        ""
                    )}
                </th>
                <Modal show={show} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Borrar equipo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Seguro que desea borrar el equipo <b>{nombre}</b> con
                        numero de inventario <b>{props.numeroInventario}</b>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>
                            No estoy seguro
                        </Button>
                        <Button variant="danger" onClick={deleteEquipo}>
                        {/* <Button variant="danger" onClick={props.eliminarEquipo}> */}
                            Si, deseo continuar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        );
    }
}
export default Equipo;
