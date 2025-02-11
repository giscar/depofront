import React, { useState } from 'react'
import HeaderComponent from '../HeaderComponent';
import { toast } from 'react-toastify';
import { operadorSave } from '../../service/FacturaService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const OperadorNuevoComponent = () => {

  const [nombre, setNombre] = useState('')
  const [apellidoPat, setApellidPat] = useState('')
  const [apellidoMat, setApellidMat] = useState('')
  const [documento, setDocumento] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')

  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    msgNombre: '',
    msgApellidoPat: '',
    msgApellidoMat: '',
    msgDocumento: '',
  })

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  })

  const showLoading = () => {
    Swal.fire({
      title: 'Cargando',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
      }
    })
  }

  const closeLoading = () => {
    Swal.close()
  }

  const saveOperador = (e) => {
    e.preventDefault();
    if (validateForm()) {
      showLoading()
      const data = {}
      data.nombre = nombre.toUpperCase();
      data.apellidoPat = apellidoPat.toUpperCase();
      data.apellidoMat = apellidoMat.toUpperCase();
      data.documento = documento;
      data.telefono = telefono;
      data.direccion = direccion.toUpperCase();
      data.estado = "1";
      data.indInactivo = "0";
      data.usuarioRegistro = initialLogin.documento;
      operadorSave(data).then(response =>{
        limpiar()
        closeLoading()
        notify()
        navigator("/operadores");
      }).catch(error => {
        console.error(error)
        closeLoading()
      })
    }
  }

  const limpiar = () => {
    setNombre('');
    setApellidPat('');
    setApellidMat('');
    setTelefono('');
    setDireccion('');
    setDocumento('');
  }

  const validateForm = () => {
    debugger
    let valid = true;
    const errorCopy = { ...errors }

    if (nombre) {
      errorCopy.msgNombre = '';
    } else {
      errorCopy.msgNombre = 'Tiene que ingresar el nombre del operador';
      valid = false;
    }

    if (apellidoPat) {
      errorCopy.msgApellidoPat = '';
    } else {
      errorCopy.msgApellidoPat = 'Tiene que ingresar el apellido paterno del operador';
      valid = false;
    }

    if (apellidoMat) {
      errorCopy.msgApellidoMat = '';
    } else {
      errorCopy.msgApellidoMat = 'Tiene que ingresar el apellido materno del operador';
      valid = false;
    }

    if (documento) {
      errorCopy.msgDocumento = '';
    } else {
      errorCopy.msgDocumento = 'Tiene que ingresar el numero de documento del operador';
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

  const access = "R005"
  let ingress = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingress = true;
    });
  })

  return (
    <>
      {initialLogin.documento && <HeaderComponent />}
      {ingress &&
        <div className='container-fluid'>
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Operadores</a></li>
                    <li className="breadcrumb-item active">Nuevo Operador</li>
                  </ol>
                </div>
                <h4 className="page-title">Registrar operador</h4>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Datos del Operador</h4>
                  <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de servicios.</p>
                  <p className="text-muted mb-0"><span style={{ color: 'red' }}>(*)</span> :Datos obligatorias que se debe ingresar</p>
                </div>
                <div className="card-body">
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>Documento:</label>
                    <div className="col-sm-9">
                      <input type="number"
                        placeholder="Documento"
                        value={documento}
                        maxLength={8}
                        className={`form-control-depo ${errors.msgDocumento ? ' is-invalid' : ''}`}
                        onChange={(e) => { setDocumento(e.target.value) }} />
                      {errors.msgDocumento && <div className='invalid-feedback'>{errors.msgDocumento}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>Nombres:</label>
                    <div className="col-sm-9">
                      <input type="text"
                        placeholder="Nombre del operador"
                        value={nombre}
                        className={`form-control-depo ${errors.msgNombre ? 'is-invalid' : ''}`}
                        onChange={(e) => { setNombre(e.target.value) }} />
                      {errors.msgNombre && <div className='invalid-feedback'>{errors.msgNombre}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>Apellido Paterno:</label>
                    <div className="col-sm-9">
                      <input type="text"
                        placeholder="Apellido paterno"
                        value={apellidoPat}
                        className={`form-control-depo ${errors.msgApellidoPat ? ' is-invalid' : ''}`}
                        onChange={(e) => { setApellidPat(e.target.value) }} />
                      {errors.msgApellidoPat && <div className='invalid-feedback'>{errors.msgApellidoPat}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>Apellido Materno:</label>
                    <div className="col-sm-9">
                      <input type="text"
                        placeholder="Apellido materno"
                        value={apellidoMat}
                        className={`form-control-depo ${errors.msgApellidoMat ? ' is-invalid' : ''}`}
                        onChange={(e) => { setApellidMat(e.target.value) }} />
                      {errors.msgApellidoMat && <div className='invalid-feedback'>{errors.msgApellidoMat}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label-zise ">Telefono:</label>
                    <div className="col-sm-9">
                      <input type="number"
                        placeholder="Telefono"
                        value={telefono}
                        className="form-control-depo"
                        onChange={(e) => { setTelefono(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label-zise ">Direccion:</label>
                    <div className="col-sm-9">
                      <input type="Text"
                        placeholder="Direccion"
                        value={direccion}
                        className="form-control-depo"
                        onChange={(e) => { setDireccion(e.target.value) }}>
                      </input>
                    </div>
                  </div>
                  <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={saveOperador}>Guardar</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {!ingress &&
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Operadores</a></li>
                    <li className="breadcrumb-item active">Nuevo Operador</li>
                  </ol>
                </div>
                <h4 className="page-title">Nuevo Operadores</h4>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='float-end pb-3 pt-4'>
              <div className="alert alert-danger border-0" role="alert">
                <strong>Alerta!</strong> No tiene acceso para este modulo.
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default OperadorNuevoComponent