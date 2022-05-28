import React from 'react';
import { useState } from 'react';
import {Table,Button,Modal,Col} from 'react-bootstrap';
import "../css/usuarios-lista.css"
function UserList(){
  return (
    <section className='section-first-item'>
    <h1 className='text-center'>Lista de Usuarios</h1>
    <Table responsive="sm" >
    <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
  </Table>
      
    </section>
  );
}

export default UserList;