import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {

  const navigator = useNavigate();

  const accederFacturas = () =>{
    navigator("/facturas")
  }

  const accederServicioNuevo = () =>{
    navigator("/servicioNuevo")
  }

  const accederServicio = () =>{
    navigator("/servicios")
  }

  const accederClientes = () =>{
    navigator("/clientes")
  }

  const accederMontacargas = () =>{
    navigator("/montacargas")
  }

  const accederOperadores = () =>{
    navigator("/operadores")
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
      
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          <Nav className="me-auto">
            <NavDropdown title="Operaciones" id="collapsible-nav-dropdown1">
              <NavDropdown.Item onClick={() => accederServicio() }>Servicios</NavDropdown.Item>
              <NavDropdown.Item onClick={() => accederServicioNuevo() }>Nuevo servicio</NavDropdown.Item>
              <NavDropdown.Item onClick={() => accederFacturas() }>Facturar</NavDropdown.Item>
            <NavDropdown.Divider />
              <Nav.Link onClick={() => accederMontacargas() }>Montacargas</Nav.Link>
            <Nav.Link onClick={() => accederOperadores() }>Operadores</Nav.Link>
            <Nav.Link onClick={() => accederClientes() }>Clientes</Nav.Link>
            </NavDropdown>
            <NavDropdown title="Facturas" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" onClick={() => accederFacturas() }>Nueva</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Revisar
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Cancelar</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Modificar
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Administrador</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              cleov
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderComponent