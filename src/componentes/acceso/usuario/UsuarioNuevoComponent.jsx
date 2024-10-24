import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../../HeaderComponent';
import { perfilActivo, usuarioSave } from '../../../service/FacturaService';

const UsuarioNuevoComponent = () => {

  const [nombre, setNombre] = useState('')
  const [apellidoPat, setApellidPat] = useState('')
  const [apellidoMat, setApellidMat] = useState('')
  const [documento, setDocumento] = useState('')
  const [perfiles, setPerfiles] = useState([])
  const [perfilesSeleccionados, setPerfilesSeleccionados] = useState([])

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

  useEffect(() => {
    perfilActivo().then((response) => {
      setPerfiles(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const saveUsuario = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {}
      data.nombre = nombre.toUpperCase();
      data.apellidoPat = apellidoPat.toUpperCase();
      data.apellidoMat = apellidoMat.toUpperCase();
      data.documento = documento;
      data.perfiles = perfilesSeleccionados;
      data.estado = "1";
      data.indInactivo = "0";
      data.usuarioRegistro = initialLogin.usuario;
      usuarioSave(data).catch(error => {
        console.error(error)
      })
      limpiar()
      notify()
      setTimeout(() => {
        navigator("/usuarios");
      }, 1000);
    }
  }

  const limpiar = () => {
    setNombre('');
    setApellidPat('');
    setApellidMat('');
    setDocumento('');
  }

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
      errorCopy.msgDocumento = 'Tiene que ingresar el numero de documento del usuario';
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const handleChange = (event) => {
    const {value, checked} = event.target;
    if(checked){
      setPerfilesSeleccionados([...perfilesSeleccionados, value])
    }else{
      setPerfilesSeleccionados(perfilesSeleccionados.filter(p => p !== value))
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
                  <li className="breadcrumb-item active">Nuevo Operador</li>
                </ol>
              </div>
              <h4 className="page-title">Registrar usuario</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos del Usuario</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de accesos.</p>
                <p className="text-muted mb-0"><span style={{color : 'red'}}>(*)</span> :Datos obligatorias que se debe ingresar</p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise "><span style={{color : 'red'}}>(*)</span>Documento:</label>
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
                  <label className="col-sm-3 col-form-label-zise "><span style={{color : 'red'}}>(*)</span>Nombres:</label>
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
                  <label className="col-sm-3 col-form-label-zise "><span style={{color : 'red'}}>(*)</span>Apellido Paterno:</label>
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
                  <label className="col-sm-3 col-form-label-zise "><span style={{color : 'red'}}>(*)</span>Apellido Materno:</label>
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
                  <label className="col-sm-3 col-form-label-zise "><span style={{color : 'red'}}>(*)</span>Roles:</label>
                  <div className="col-sm-9">
                  {
                  perfiles.map(perfil =>
                    <div key={perfil.id} className="form-check">
                      <input className="form-check-input" type="checkbox" value={perfil.id} onChange={handleChange} style={{backgroundColor : 'orange'}}/>
                      <label className="form-check-label" >
                        {perfil.codigo}
                      </label>
                    </div>
                    )
                  }
                  </div>
                </div>
               
                <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={saveUsuario}>Guardar</button>
                &nbsp;&nbsp;
                <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UsuarioNuevoComponent