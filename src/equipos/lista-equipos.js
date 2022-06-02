import React from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import Equipo from "./equipo";
import "../css/usuarios-lista.css";
import axios from "axios";

export default class EquipoList extends React.Component {
    constructor(props) {
        super(props);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.toggleModalAdd = this.toggleModalAdd.bind(this);
        this.setShowAlert = this.setShowAlert.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);
        this.setValidated = this.setValidated.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.state = {
            update: false,
            equipos: [],
            show: false,
            showAlert: false,
            alertMessage: "",
            validated: false,
        };
    }
    setShowAlert(valor) {
        this.setState({ showAlert: valor });
    }
    setValidated(valor) {
        this.setState({ validated: valor });
    }
    setAlertMessage(valor) {
        this.setState({ alertMessage: valor });
    }
    componentDidMount() {
        axios
            .get(`http://alethetwin.online:8080/api/v1/Equipos/`)
            .then((res) => {
                const equipos = res.data;
                this.setLista(equipos);
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) {
                    alert(error.response.data.error);
                    return;
                } else {
                    alert("Algo salio mal");
                }
            });
    }
    toggleUpdate() {
        this.setState({ update: !this.state.update });
    }
    toggleModalAdd() {
        this.setState({ showAlert: false });
        this.setState({ show: !this.state.show });
    }
    setLista(equipos) {
        this.setState({ equipos });
    }
    eliminarEquipo(numeroInventario) {
        this.setLista(
            this.state.equipos.filter(
                (equipo) => equipo.numeroInventario != numeroInventario
            )
        );
    }
    handleSubmit = (event) => {
        event.preventDefault();
    };
    onsubmit(event) {
        event.preventDefault();
        this.setShowAlert(false);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setShowAlert(true);
            this.setAlertMessage("Caracteres invalidos.");
            this.setValidated(true);
            return;
        }
        this.setValidated(true);
        axios
            .post(
                `http://alethetwin.online:8080/api/v1/Equipos/`,
                {
                    nombre: event.target[1].value,
                    descripcion: event.target[2].value,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                this.state.equipos.push(res.data);
                this.toggleModalAdd();
                alert("Agregado con exito");
            })
            .catch(function (error) {
                console.log(error);
                this.setsetShowAlert(true);
                this.setAlertMessage("Algo salio mal");
            });
    }
    render() {
        return (
            <section className="section-first-item px-3">
                <h1 className="text-center">Lista de Equipos</h1>
                {localStorage.getItem("rol") === "administrador" ? (
                    <div className="px-2 d-flex justify-content-end">
                        <Button onClick={this.toggleUpdate}>Administrar</Button>
                    </div>
                ) : (
                    ""
                )}
                {localStorage.getItem("rol") === "administrador" &&
                this.state.update === true ? (
                    <div className="px-2 d-flex justify-content-center">
                        <Button onClick={this.toggleModalAdd}>
                            Agregar nuevo Equipo
                        </Button>
                        <Modal
                            show={this.state.show}
                            onHide={this.toggleModalAdd}
                        >
                            <Form
                                onSubmit={this.onsubmit}
                                noValidate
                                validated={this.validated}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Agregando equipo</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    {this.state.showAlert !== false ? (
                                        <Alert key="warning" variant="warning">
                                            {this.state.alertMessage}
                                        </Alert>
                                    ) : (
                                        ""
                                    )}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nombre"
                                            pattern="[A-Za-z0-9 ]{1,256}"
                                            title="No uses caracteres especiales, ni lo dejes en blanco."
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3 d-flex flex-column">
                                        <Form.Label>Descripcion</Form.Label>
                                        <textarea
                                            className="text-area"
                                            placeholder="Descripcion..."
                                            rows={5}
                                            pattern="[A-Za-z0-9 ]{1,256}"
                                            title="No uses caracteres especiales, ni lo dejes en blanco."
                                        ></textarea>
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={this.toggleModalAdd}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button variant="success" type="submit">
                                        Agregar
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal>
                    </div>
                ) : (
                    ""
                )}
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Numero de inventario</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            {localStorage.getItem("rol") === "administrador" ||
                            localStorage.getItem("rol") === "alumno" ? (
                                <th className="text-center">Acciones</th>
                            ) : (
                                ""
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.equipos.map((equipo) => (
                            <Equipo
                                nombre={equipo.nombre}
                                numeroInventario={equipo.numeroInventario}
                                key={equipo.numeroInventario}
                                descripcion={equipo.descripcion}
                                update={this.state.update}
                                eliminarEquipo={() =>
                                    this.eliminarEquipo(equipo.numeroInventario)
                                }
                            ></Equipo>
                        ))}
                    </tbody>
                </Table>
            </section>
        );
    }
}
