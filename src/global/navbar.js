import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { Navbar,Container,Nav,Modal,Button,NavDropdown,FormControl } from 'react-bootstrap';
import "../css/nav.css"
import Login from "./login/login"
import { useState } from 'react';
  function NavBar(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
        <Navbar  expand="lg" variant="dark" className='nav-background fixed-top'>
            <Container fluid>
            <Navbar.Brand href="/">
                <Link className='link' to="/">
                    <img
                    alt=""
                    src="/logo-192.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    <p className='my-auto d-inline'>Nora CC</p>
                </Link>
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link><Link className='link' to="/">Acerca de nosotros</Link></Nav.Link>
                    <NavDropdown title="Equipos" id="basic-nav-dropdown">
                    <NavDropdown.Item ><Link className='link-drop-item' to="/Equipos">Lista de Equipos</Link></NavDropdown.Item>
                        <NavDropdown.Divider />
                        {
                            localStorage.getItem("rol")===("profesor")||localStorage.getItem("rol")===("administrador")?
                            (
                                <NavDropdown.Item><Link className='link-drop-item' to="/Bitacora">Bitacora</Link></NavDropdown.Item>
                            ):""
                        }
                        {
                            localStorage.getItem("rol")===("administrador")||localStorage.getItem("rol")===("alumno")?
                            (
                                <>
                                <NavDropdown.Item ><Link className='link-drop-item' to="/Solicitud">Registrar Solicitud</Link></NavDropdown.Item>
                                </>
                            ):""
                            
                        }
                        {

                            localStorage.getItem("rol")===("administrador")?
                            (
                                <>
                                <NavDropdown.Item ><Link className='link-drop-item' to="/Observaciones">Observaciones</Link></NavDropdown.Item>
                                </>
                            ):""
                        }
                    </NavDropdown>
                    {
                        localStorage.getItem("rol")===("administrador")?
                        (
                            <>
                            <Nav.Link><Link className='link' to="/Usuarios">Lista Usuarios</Link></Nav.Link>
                            <Nav.Link><Link className='link' to="/Materias">Lista Materias</Link></Nav.Link>
                            </>
                        ):""
                    }
                    
                </Nav>
                <Navbar.Collapse className=" d-flex px-5  nav-login" >
                    <Login/>
                </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
            
        </Navbar>
            
        
        </>
    );
  }



export default NavBar;