import React from "react";
import {
    Tooltip,
    OverlayTrigger,
    Toast,
    ToastContainer,
    Button,
} from "react-bootstrap";
import "../css/mensajes.css";
import { useState } from "react";
import Mensaje from "./mensaje";
function ListaDeMensajes({ listaDeMensajes, matricula }) {
    // var matricula = localStorage.getItem("matricula") || "sin registro";
    return (  
        <>
            <div className="flex-grow-1 flex-column mensajeria">
                {listaDeMensajes.length > 0 ? (
                    
                    listaDeMensajes.map((mensaje) => {
                        return (
                            <Mensaje
                                key={mensaje.hora}
                                variante={
                                    matricula == mensaje.remitente
                                        ? "remitente"
                                        : "destinatario"
                                }
                                contenido={mensaje.contenido}
                                hora={mensaje.hora}
                                remitente={mensaje.remitente}
                            />
                        );
                    })
                ) : (
                    <p>No hay mensajes</p>
                )}
            </div>
        </>
    );
}

export default ListaDeMensajes;
