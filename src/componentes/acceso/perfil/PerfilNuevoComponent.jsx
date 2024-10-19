import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../../HeaderComponent';
import { perfilSave } from '../../../service/FacturaService';

const PerfilNuevoComponent = () => {

  const [codigo, setCodigo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    msgCodigo: '',
    msgDescripcion: '',
  })

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const savePerfil = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {}
      data.codigo = codigo.toUpperCase();
      data.descripcion = descripcion.toUpperCase();
      data.estado = "1";
      data.indInactivo = "0";
      data.usuarioRegistro = initialLogin.usuario;
      perfilSave(data).catch(error => {
        console.error(error)
      })
      limpiar()
      notify()
      setTimeout(() => {
        navigator("/perfiles");
      }, 1000);
    }
  }

  const limpiar = () => {
    setCodigo('');
    setDescripcion('');
  }

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors }

    if (codigo) {
      errorCopy.msgCodigo = '';
    } else {
      errorCopy.msgCodigo = 'Tiene que ingresar el codigo del perfil';
      valid = false;
    }

    if (descripcion) {
      errorCopy.msgDescripcion = '';
    } else {
      errorCopy.msgDescripcion = 'Tiene que ingresar la descripcion del perfil';
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
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
                  <li className="breadcrumb-item"><a href="#">Perfil</a></li>
                  <li className="breadcrumb-item active">Nuevo Perfil</li>
                </ol>
              </div>
              <h4 className="page-title">Registrar perfil</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos del Perfil</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de accesos.</p>
                <p className="text-muted mb-0"><span style={{color : 'red'}}>(*)</span> :Datos obligatorias que se debe ingresar</p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise "><span style={{color : 'red'}}>(*)</span>Codigo:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Codigo del perfil"
                      value={codigo}
                      maxLength={8}
                      className={`form-control-depo ${errors.msgCodigo ? ' is-invalid' : ''}`}
                      onChange={(e) => { setCodigo(e.target.value) }} />
                    {errors.msgCodigo && <div className='invalid-feedback'>{errors.msgCodigo}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise "><span style={{color : 'red'}}>(*)</span>Descripcion:</label>
                  <div className="col-sm-9">
                    <textarea type="text"
                      placeholder="Descripcion del perfil"
                      value={descripcion}
                      className={`form-control-depo ${errors.msgDescripcion ? 'is-invalid' : ''}`}
                      onChange={(e) => { setDescripcion(e.target.value) }} />
                    {errors.msgDescripcion && <div className='invalid-feedback'>{errors.msgDescripcion}</div>}
                  </div>
                </div>
                
                <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={savePerfil}>Guardar</button>
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

export default PerfilNuevoComponent