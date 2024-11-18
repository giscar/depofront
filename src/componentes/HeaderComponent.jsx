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
      <nav class="navbar navbar-expand-lg navbar bg-light">

  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
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
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederServicioAdm()}>Busqueda Servicio Admin</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederServicioOpe()}>Busqueda Servicio Operador</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederFacturas()}>Facturar Servicio</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederMontacargas()}>Montacargas</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederOperadores()}>Operadores</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederClientes()}>Clientes</a></li>
                  <li><a className="dropdown-item icon-link-depo" onClick={() => accederReporteOperaciones()}>Estadisticas</a></li>
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
      
      </nav>




    </>
  )
}

export default HeaderComponent