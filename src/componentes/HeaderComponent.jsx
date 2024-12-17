import React from 'react'
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const navigator = useNavigate();

  const accederFacturas = () => {
    navigator("/facturas")
  }

  const accederServicioNuevo = () => {
    navigator("/servicioNuevo")
  }

  const accederServicioAdm = () => {
    navigator("/servicios")
  }

  const accederServicioOpe = () => {
    navigator("/servicioOperador")
  }

  const accederClientes = () => {
    navigator("/clientes")
  }

  const accederMontacargas = () => {
    navigator("/montacargas")
  }

  const accederOperadores = () => {
    navigator("/operadores")
  }

  const accederReporteOperaciones = () => {
    navigator("/servicioReportOperaciones")
  }

  const accederUsuarios = () => {
    navigator("/usuarios")
  }

  const accederPerfiles = () => {
    navigator("/perfiles")
  }

  const accederRoles = () => {
    navigator("/roles")
  }

  const cerrarSession = () => {
    sessionStorage.removeItem('user');
    navigator("/")
  }

  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary-depo">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src="/Logo.png" height="60" alt="logo" className="auth-logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Accesos
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={() => accederUsuarios()}>Usuarios</a></li>
                  <li><a className="dropdown-item" onClick={() => accederPerfiles()}>Perfiles</a></li>
                  <li><a className="dropdown-item" onClick={() => accederRoles()}>Roles</a></li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link">Balanza</a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Operaciones
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederServicioAdm()}>Busqueda Servicio</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederFacturas()}>Busqueda Factura</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederMontacargas()}>Montacargas</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederOperadores()}>Operadores</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederClientes()}>Clientes</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederReporteOperaciones()}>Estadisticas</a></li>
                </ul>
              </li>
            </ul>
          </div>

        </div>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className='nav-link text-danger' onClick={() => cerrarSession()}><b>Cerrar</b></a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default HeaderComponent