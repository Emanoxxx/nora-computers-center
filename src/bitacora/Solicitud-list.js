import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Col} from 'react-bootstrap';
import "../css/usuarios-lista.css"
function SolicitudList(){
  return (
    <section className='section-first-item'>
    <h1 className='text-center'>Bitacora</h1>
    <Table responsive="sm" >
    <thead>
    <tr>
      <th>#</th>
      <th>Usuario</th>
      <th>Hr. Entrada</th>
      <th>Hr. Salida</th>
      <th>Fecha</th>
      <th>Materia</th>
      <th>Maestro</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Emanoxxx</td>
      <td>12:20</td>
      <td>13:16</td>
      <td>22/05/2022</td>
      <td>Tecnologias W</td>
      <td>Maestro nombre</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Emanoxxx</td>
      <td>12:20</td>
      <td>13:16</td>
      <td>22/05/2022</td>
      <td>Tecnologias W</td>
      <td>Maestro nombre</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Emanoxxx</td>
      <td>12:20</td>
      <td>13:16</td>
      <td>22/05/2022</td>
      <td>Tecnologias W</td>
      <td>Maestro nombre</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Emanoxxx</td>
      <td>12:20</td>
      <td>13:16</td>
      <td>22/05/2022</td>
      <td>Tecnologias W</td>
      <td>Maestro nombre</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Emanoxxx</td>
      <td>12:20</td>
      <td>13:16</td>
      <td>22/05/2022</td>
      <td>Tecnologias W</td>
      <td>Maestro nombre</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Emanoxxx</td>
      <td>12:20</td>
      <td>13:16</td>
      <td>22/05/2022</td>
      <td>Tecnologias W</td>
      <td>Maestro nombre</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Emanoxxx</td>
      <td>12:20</td>
      <td>13:16</td>
      <td>22/05/2022</td>
      <td>Tecnologias W</td>
      <td>Maestro nombre</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Emanoxxx</td>
      <td>12:20</td>
      <td>13:16</td>
      <td>22/05/2022</td>
      <td>Tecnologias W</td>
      <td>Maestro nombre</td>
      <td></td>
    </tr>
  </tbody>
  </Table>
      
    </section>
  );
}

export default SolicitudList;