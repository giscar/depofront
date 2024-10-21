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

  const accederServicio = () => {
    if(initialLogin.rol === "adm")
      navigator("/servicios")
    if(initialLogin.rol === "ope")
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
    sessionStorage.getItem('user');
    navigator("/")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary-depo">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => accederServicio()}>
            <img src="/Logo.png" height="60" alt="logo" className="auth-logo" />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Accesos
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederUsuarios()}>Usuarios</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederPerfiles()}>Perfiles</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederRoles()}>Roles</a></li>
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
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederServicio()}>Busqueda Servicio</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederServicioNuevo()}>Nuevo Servicio</a></li>
                  {initialLogin.rol === "adm" &&
                    <li><a className="dropdown-item icon-link-depo" onClick={() => accederFacturas()}>Facturar Servicio</a></li>
                  }
                  <li><hr className="dropdown-divider" /></li>
                  {initialLogin.rol === "adm" &&
                    <li><a className="dropdown-item icon-link-depo" onClick={() => accederMontacargas()}>Montacargas</a></li>
                  }
                  {initialLogin.rol === "adm" &&
                    <li><a className="dropdown-item icon-link-depo" onClick={() => accederOperadores()}>Operadores</a></li>
                  }
                  {initialLogin.rol === "adm" &&
                    <li><a className="dropdown-item icon-link-depo" onClick={() => accederClientes()}>Clientes</a></li>
                  }
                  {initialLogin.rol === "adm" &&
                    <li><a className="dropdown-item icon-link-depo" onClick={() => accederReporteOperaciones()}>Estadisticas</a></li>
                  }
                </ul>
              </li>
              
            </ul>
            <div className='text-end'>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page">
                    <b>{initialLogin.rol == "adm" ? 'Administrativo' : 'Operario'}</b>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"><span className='text-white'><b>{initialLogin.nombre}</b></span></a>
                </li>
                <li className="nav-item">
                  <a className='nav-link text-danger' onClick={() => cerrarSession()}><b>Cerrar</b></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>




    </>
  )
}

export default HeaderComponent