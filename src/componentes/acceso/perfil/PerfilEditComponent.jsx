import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderComponent from '../../HeaderComponent';
import { usuarioEdit, usuarioForId } from '../../../service/FacturaService';

const PerfilEditComponent = () => {

  const [nombre, setNombre] = useState('')
  const [apellidoPat, setApellidPat] = useState('')
  const [apellidoMat, setApellidMat] = useState('')
  const [documento, setDocumento] = useState('')
  const [usuario, setUsuario] = useState([])
  const [errors, setErrors] = useState({
    msgNombre: '',
    msgApellidoPat: '',
    msgApellidoMat: '',
    msgDocumento: '',
  })

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors }

    if (nombre) {
      errorCopy.msgNombre = '';
    } else {
      errorCopy.msgNombre = 'Tiene que ingresar el nombre del usuario';
      valid = false;
    }

    if (apellidoPat) {
      errorCopy.msgApellidoPat = '';
    } else {
      errorCopy.msgApellidoPat = 'Tiene que ingresar el apellido paterno del usuario';
      valid = false;
    }

    if (apellidoMat) {
      errorCopy.msgApellidoMat = '';
    } else {
      errorCopy.msgApellidoMat = 'Tiene que ingresar el apellido materno del usuario';
      valid = false;
    }

    if (documento) {
      errorCopy.msgDocumento = '';
    } else {
      errorCopy.msgDocumento = 'Tiene que ingresar el apellido numero de documento del usuario';
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
      usuarioForId(id).then((response) => {
        setUsuario(response.data);
        setTimeout(() => {
          cargarUsuario(response.data)
        }, 1000);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const cargarUsuario = (data) => {
    setNombre(data.nombre);
    setApellidPat(data.apellidoPat);
    setApellidMat(data.apellidoMat);
    setDocumento(data.documento);
  }

  const editUsuario = (operador) => {
    if (validateForm()) {
      const data = {}
      data.id = id;
      data.estado = "1"
      data.nombre = nombre.toUpperCase();
      data.documento = documento;
      data.apellidoPat = apellidoPat.toUpperCase();
      data.apellidoMat = apellidoMat.toUpperCase();
      data.indInactivo = "0";
      data.usuarioRegistro = initialLogin.usuario;
      usuarioEdit(data).catch(error => {
        console.error(error)
      })
      notify()
      setTimeout(() => {
        navigator("/usuarios");
      }, 1000);
    }
  }

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
                  <li className="breadcrumb-item"><a href="#">Usuarios</a></li>
                  <li className="breadcrumb-item active">Editar Usuario</li>
                </ol>
              </div>
              <h4 className="page-title">Editar usuario</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12 ">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos del Usuario</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de accesos.</p>
                <p className="text-muted mb-0"><span style={{color : 'red'}}>(*)</span> :Datos obligatorias que se debe ingresar</p>
              </div>
              <div className="card-body">

              <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise"><span style={{color : 'red'}}>(*)</span>Documento:</label>
                  <div className="col-sm-9">
                    <input type="number"
                      placeholder="Documento"
                      value={documento}
                      className="bg-secondary bg-opacity-10 form-control-depo"
                      readOnly
                      autoComplete='false'
                      onChange={(e) => { setDocumento(e.target.value) }} />
                    {errors.msgDocumento && <div className='invalid-feedback'>{errors.msgDocumento}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise"><span style={{color : 'red'}}>(*)</span>Nombres:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Nombre del operador"
                      value={nombre}
                      autoComplete='off'
                      className={`form-control-depo ${errors.msgNombre ? 'is-invalid' : ''}`}
                      onChange={(e) => { setNombre(e.target.value) }} />
                    {errors.msgNombre && <div className='invalid-feedback'>{errors.msgNombre}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise"><span style={{color : 'red'}}>(*)</span>Apellido Paterno:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Apellido paterno"
                      value={apellidoPat}
                      autoComplete='off'
                      className={`form-control-depo ${errors.msgApellidoPat ? ' is-invalid' : ''}`}
                      onChange={(e) => { setApellidPat(e.target.value) }} />
                    {errors.msgApellidoPat && <div className='invalid-feedback'>{errors.msgApellidoPat}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise"><span style={{color : 'red'}}>(*)</span>Apellido Materno:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Apellido materno"
                      value={apellidoMat}
                      autoComplete='off'
                      className={`form-control-depo ${errors.msgApellidoMat ? ' is-invalid' : ''}`}
                      onChange={(e) => { setApellidMat(e.target.value) }} />
                    {errors.msgApellidoMat && <div className='invalid-feedback'>{errors.msgApellidoMat}</div>}
                  </div>
                </div>
                <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={editUsuario}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PerfilEditComponent