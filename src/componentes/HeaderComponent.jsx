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

  const accederReporteOperaciones = () =>{
    navigator("/servicioReportOperaciones")
  }

  const cerrarSession = () => {
    sessionStorage.getItem('user');
    navigator("/")
  }
  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  

  return (
    <>
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary-depo">
  <div className="container-fluid">
    <a className="navbar-brand" onClick={() => accederServicio() }>Depovent</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page">Almacenes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link">Balanza</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Operaciones
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => accederServicio() }>Busqueda Servicio</a></li>
            <li><a className="dropdown-item" onClick={() => accederServicioNuevo() }>Nuevo Servicio</a></li>
            <li><a className="dropdown-item" onClick={() => accederFacturas() }>Facturar Servicio</a></li>
    
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" onClick={() => accederMontacargas() }>Montacargas</a></li>
            <li><a className="dropdown-item" onClick={() => accederOperadores() }>Operadores</a></li>
            <li><a className="dropdown-item" onClick={() => accederClientes() }>Clientes</a></li>
            <li><a className="dropdown-item" onClick={() => accederReporteOperaciones() }>Estadisticas</a></li>

          </ul>
        </li>
      </ul>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" aria-current="page">
          <b>{initialLogin.rol == "adm"? 'Administrativo' : 'Operario'}</b>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link"><span className='text-white'><b>{initialLogin.nombre}</b></span></a>
        </li>
        <li className="nav-item">
          <a className='text-danger' onClick={() => cerrarSession() }><b>Cerrar</b></a>
        </li>
      </ul>
              
    </div>
  </div>
</nav>
    
    
    
    
    </>
  )
}

export default HeaderComponent