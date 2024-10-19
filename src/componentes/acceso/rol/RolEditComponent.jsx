import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderComponent from '../../HeaderComponent';
import { rolEdit, rolForId, usuarioEdit, usuarioForId } from '../../../service/FacturaService';

const RolEditComponent = () => {

  const [codigo, setCodigo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [rol, setRol] = useState([])

  const [errors, setErrors] = useState({
    msgCodigo: '',
    msgDescripcion: '',
  })

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors }

    if (codigo) {
      errorCopy.msgCodigo = '';
    } else {
      errorCopy.msgCodigo = 'Tiene que ingresar el codigo del Rol';
      valid = false;
    }

    if (descripcion) {
      errorCopy.msgDescripcion = '';
    } else {
      errorCopy.msgDescripcion = 'Tiene que ingresar la descripcion del rol';
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
      rolForId(id).then((response) => {
        setRol(response.data);
        setTimeout(() => {
          cargarRol(response.data)
        }, 1000);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const cargarRol = (data) => {
    setCodigo(data.codigo);
    setDescripcion(data.descripcion);
  }

  const editRol = (operador) => {
    if (validateForm()) {
      const data = {}
      data.id = id;
      data.estado = "1"
      data.codigo = codigo.toUpperCase();
      data.descripcion = descripcion.toUpperCase();
      data.indInactivo = "0";
      data.usuarioRegistro = initialLogin.usuario;
      rolEdit(data).catch(error => {
        console.error(error)
      })
      notify()
      setTimeout(() => {
        navigator("/roles");
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
                  <li className="breadcrumb-item"><a href="#">Roles</a></li>
                  <li className="breadcrumb-item active">Editar Rol</li>
                </ol>
              </div>
              <h4 className="page-title">Editar rol</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12 ">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos del Rol</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de accesos.</p>
                <p className="text-muted mb-0"><span style={{color : 'red'}}>(*)</span> :Datos obligatorias que se debe ingresar</p>
              </div>
              <div className="card-body">

              <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise"><span style={{color : 'red'}}>(*)</span>Documento:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Codigo del rol"
                      value={codigo}
                      className="bg-secondary bg-opacity-10 form-control-depo"
                      readOnly
                      autoComplete='false'
                      onChange={(e) => { setCodigo(e.target.value) }} />
                    {errors.msgCodigo && <div className='invalid-feedback'>{errors.msgCodigo}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise"><span style={{color : 'red'}}>(*)</span>Nombres:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Descripcion del rol"
                      value={descripcion}
                      autoComplete='off'
                      className={`form-control-depo ${errors.msgDescripcion ? 'is-invalid' : ''}`}
                      onChange={(e) => { setDescripcion(e.target.value) }} />
                    {errors.msgDescripcion && <div className='invalid-feedback'>{errors.msgDescripcion}</div>}
                  </div>
                </div>
                <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={editRol}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default RolEditComponent