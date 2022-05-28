import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Col} from 'react-bootstrap';
import "../css/usuarios-lista.css"
function EquipoList(){
  return (
    <section className='section-first-item'>
    <h1 className='text-center'>Lista de Equipos</h1>
    <Table responsive="sm" >
    <thead>
    <tr>
      <th>Numero de inventario</th>
      <th>Nombre</th>
      <th>Descripcion</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Computadora escritorio</td>
      <td>Teclado, mouse y monitor. Procesador 2700x eficiente.</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Computadora escritorio</td>
      <td>Teclado, mouse y monitor. Procesador 2700x eficiente.</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Computadora escritorio</td>
      <td>Teclado, mouse y monitor. Procesador 2700x eficiente.</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Computadora escritorio</td>
      <td>Teclado, mouse y monitor. Procesador 2700x eficiente.</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Computadora escritorio</td>
      <td>Teclado, mouse y monitor. Procesador 2700x eficiente.</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Computadora escritorio</td>
      <td>Teclado, mouse y monitor. Procesador 2700x eficiente.</td>
      <td></td>
    </tr>
  </tbody>
  </Table>
      
    </section>
  );
}

export default EquipoList;