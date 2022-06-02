import moment from "moment";
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "../css/mensajes.css";

export default function Mensaje({variante, remitente, contenido, hora}) {
    return (
        <ToastContainer className={variante + " w-100"}>
            <Toast className="w-75 h-auto">
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">{remitente}</strong>
                    <small>{moment(hora).format("HH:MM")}</small>
                </Toast.Header>
                <Toast.Body>{contenido}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}


