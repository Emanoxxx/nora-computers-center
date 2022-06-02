import React from "react";
import { useState } from "react";
import { Row, Toast, Form, ToastContainer, Button } from "react-bootstrap";
import "../css/root.css";
import "../css/chat.css";
import Mensajes from "./ListaDeMensajes";
import Contact from "./contact";

import moment from "moment";
import ListaDeMensajes from "./ListaDeMensajes";

var matricula = localStorage.getItem("matricula") || `${Date.now()}`;
var nombre = localStorage.getItem("nombre") || "sin registro" ;
var rol = localStorage.getItem("rol") || "sin registro" ;
var websocket;
// Invoca esta función para conectar con el servidor de WebSocket
function wsConnect() {
    // Connect to WebSocket server
    websocket = new WebSocket(
        "ws://alethetwin.online:8080",
        "echo-protocol"
    );
}

wsConnect();

function Chat() {
    // Asignación de callbacks
    websocket.onopen = function (evt) {
        onOpen(evt);
    };
    websocket.onclose = function (evt) {
        onClose(evt);
    };
    websocket.onmessage = function (evt) {
        onMessage(evt);
    };
    websocket.onerror = function (evt) {
        onError(evt);
    };
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [listaDeMensajes, setListaDeMensajes] = useState([]);
    const [isOnAChat, setIsOnAChat] = useState(false);
    return (
        <section className="section-chat">
            <ToastContainer className="position-fixed Mensajes">
                <Toast
                    className="d-flex flex-column"
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                >
                    <Toast.Header closeButton={false} id="chat-header">
                        {/* <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          /> */}
                        <strong className="me-auto">Soporte técnico</strong>
                        <Button variant="danger" onClick={disconnect}>
                            Terminar sesión
                        </Button>
                    </Toast.Header>
                    <Toast.Body className="d-flex flex-grow-1 flex-column">
                        <ListaDeMensajes
                            setListaDeMensajes={setListaDeMensajes}
                            listaDeMensajes={listaDeMensajes}
                        ></ListaDeMensajes>
                        <Form
                            onSubmit={enviarMensaje}
                            className={
                                (isOnAChat ? "" : "visually-hidden") +
                                " d-flex align-self-end w-100"
                            }
                        >
                            <Form.Control
                                type="text"
                                placeholder="Mensaje..."
                                className="flex-grow-1"
                                onChange={handleChange}
                                value={mensaje}
                            />
                            <Button
                                variant="primary"
                                className="send-btn"
                                type="submit"
                            ></Button>
                        </Form>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <Button className="btn-chat" onClick={() => toggleChat()}>
                <img src="./resources/img/nora-chat.png" alt="Chat boton"></img>
            </Button>
        </section>
    );
    function disconnect() {
        let disconnectMessage = {
            tipo: "disconnect",
        };
        doSend(JSON.stringify(disconnectMessage));
        setListaDeMensajes([]);
        setIsOnAChat(false);
    }
    function toggleChat() {
        setShow(!show);
    }
    function handleChange(evt) {
        var mensaje = evt.target.value;
        setMensaje(mensaje);
    }
    function enviarMensaje(evt) {
        evt.preventDefault();
        let nuevoMensaje = {
            remitente: matricula,
            hora: Date.now(),
            contenido: mensaje,
        };
        console.log({
            tipo: rol == "administrador" ? "mensajeAdmin" : "mensaje",
            contenido: mensaje,
        });
        doSend(
            JSON.stringify({
                tipo: rol == "administrador" ? "mensajeAdmin" : "mensaje",
                contenido: mensaje,
            })
        );
        setListaDeMensajes([...listaDeMensajes, nuevoMensaje]);
        setMensaje("");
    }
    // Se ejecuta cuando se establece la conexión Websocket con el servidor
    function onOpen(evt) {
        let handshake = {
            tipo: "handshake",
            contenido: matricula,
        };
        doSend(JSON.stringify(handshake));
    }

    // Se ejecuta cuando la conexión con el servidor se cierra
    function onClose(evt) {
        // setTimeout(function () {
        //     wsConnect()
        // }, 2000);
        console.log("Desconectado");
    }

    // Se invoca cuando se recibe un mensaje del servidor
    function onMessage(evt) {
        // Agregamos al textarea el mensaje recibido
        // var area = document.getElementById("mensajes")
        // area.innerHTML += evt.data + "\n";
        console.log(evt.data);
        let mensajeRecibido = JSON.parse(evt.data);
        if (mensajeRecibido.tipo == "init") {
            setIsOnAChat(true);
            setListaDeMensajes([])
            return;
        }
        if (mensajeRecibido.tipo == "disconnect") {
            setIsOnAChat(false);
            setListaDeMensajes([])
        }
        setListaDeMensajes([...listaDeMensajes, {...JSON.parse(evt.data), hora: Date.now() }]);
    }

    // Se invoca cuando se presenta un error en el WebSocket
    function onError(evt) {
        console.log("ERROR: " + evt.data);
    }

    // Envía un mensaje al servidor (y se imprime en la consola)
    function doSend(message) {
        console.log("Enviando: " + message);
        websocket.send(message);
    }
}

export default Chat;
