import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';
import { toast } from 'react-toastify';
import { operadorEdit, operadorForId } from '../../service/FacturaService';

const OperadorEditComponent = () => {

  const [nombre, setNombre] = useState('')
  const [apellidoPat, setApellidPat] = useState('')
  const [apellidoMat, setApellidMat] = useState('')
  const [documento, setDocumento] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [operador, setOperador] = useState([])
  const [errors, setErrors] = useState({
    msgNombre: '',
    msgApellidoPat: '',
    msgApellidoMat: '',
    msgDocumento: '',
  })

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
      errorCopy.msgDocumento = 'Tiene que ingresar el apellido numero de documento del operador';
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

  const navigator = useNavigate();

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      operadorForId(id).then((response) => {
        setOperador(response.data);
        setTimeout(() => {
          cargarOperador(response.data)
        }, 1000);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const cargarOperador = (data) => {
    setNombre(data.nombre);
    setApellidPat(data.apellidoPat);
    setApellidMat(data.apellidoMat);
    setTelefono(data.telefono);
    setDireccion(data.direccion);
    setDocumento(data.documento);
  }

  const editOperador = (operador) => {
    if (validateForm()) {
      debugger
      operador.estado = "1"
      operador.nombre = nombre.toUpperCase();
      operador.documento = documento;
      operador.telefono = telefono;
      operador.apellidoPat = apellidoPat.toUpperCase();
      operador.apellidoMat = apellidoMat.toUpperCase();
      operadorEdit(operador).catch(error => {
        console.error(error)
      })
      notify()
      setTimeout(() => {
        navigator("/operadores");
      }, 1000);
    }
  }

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  return (
    <>
    {initialLogin.usuario && <HeaderComponent />}
      <div className='container-fluid'>
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="float-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                  <li className="breadcrumb-item"><a href="#">Operadores</a></li>
                  <li className="breadcrumb-item active">Editar Operador</li>
                </ol>
              </div>
              <h4 className="page-title">Editar operador</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12 card-deck">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos del Operador</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de servicios.</p>
              </div>
              <div className="card-body">

              <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Documento:</label>
                  <div className="col-sm-9">
                    <input type="number"
                      placeholder="Documento"
                      value={documento}
                      className="w-50 bg-secondary bg-opacity-10 form-control-depo"
                      readOnly
                      onChange={(e) => { setDocumento(e.target.value) }} />
                    {errors.msgDocumento && <div className='invalid-feedback'>{errors.msgDocumento}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Nombres:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Nombre del operador"
                      value={nombre}
                      className={`w-50 form-control-depo ${errors.msgNombre ? 'is-invalid' : ''}`}
                      onChange={(e) => { setNombre(e.target.value) }} />
                    {errors.msgNombre && <div className='invalid-feedback'>{errors.msgNombre}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Apellido Paterno:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Apellido paterno"
                      value={apellidoPat}
                      className={`w-50 form-control-depo ${errors.msgApellidoPat ? ' is-invalid' : ''}`}
                      onChange={(e) => { setApellidPat(e.target.value) }} />
                    {errors.msgApellidoPat && <div className='invalid-feedback'>{errors.msgApellidoPat}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Apellido Materno:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Apellido materno"
                      value={apellidoMat}
                      className={`w-50 form-control-depo ${errors.msgApellidoMat ? ' is-invalid' : ''}`}
                      onChange={(e) => { setApellidMat(e.target.value) }} />
                    {errors.msgApellidoMat && <div className='invalid-feedback'>{errors.msgApellidoMat}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Telefono:</label>
                  <div className="col-sm-9">
                    <input type="number"
                      placeholder="Telefono"
                      value={telefono}
                      className="w-50 form-control-depo"
                      onChange={(e) => { setTelefono(e.target.value) }}>
                    </input>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Direccion:</label>
                  <div className="col-sm-9">
                    <input type="Text"
                      placeholder="Direccion"
                      value={direccion}
                      className="w-50 form-control-depo"
                      onChange={(e) => { setDireccion(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={editOperador}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default OperadorEditComponent