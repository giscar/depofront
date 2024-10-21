import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderComponent from '../../HeaderComponent';
import { perfilEdit, perfilForId, rolActivo} from '../../../service/FacturaService';

const PerfilEditComponent = () => {

  const [codigo, setCodigo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [perfil, setPerfil] = useState([])
  const [roles, setRoles] = useState([])
  const [rolesSeleccionados, setRolesSeleccionados] = useState([])

  const [errors, setErrors] = useState({
    msgCodigo: '',
    msgDescripcion: '',
    msgRoles: '',
  })

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

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

    if (rolesSeleccionados.length > 0) {
      errorCopy.msgRoles = '';
    } else {
      errorCopy.msgRoles = 'Tiene que ingresar por lo menos un rol';
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
      perfilForId(id).then((response) => {
        setPerfil(response.data);
        cargarPerfil(response.data)
        cargarRoles(response.data.roles)
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const cargarRoles = (rolesEdit) => {
    setRolesSeleccionados(rolesEdit) 
    rolActivo().then((response) => {
      response.data.map(data =>{
        rolesEdit.map(p => {
          if(data.id == p){
            data.check = true;
          }
        })
        setRoles(response.data);
      })
    }).catch(error => {
      console.log(error);
    })
  }

  const cargarPerfil = (data) => {
    setCodigo(data.codigo);
    setDescripcion(data.descripcion);
  }

  const editPerfil = () => {
    if (validateForm()) {
      const data = {}
      data.id = id;
      data.estado = "1"
      data.codigo = codigo.toUpperCase();
      data.descripcion = descripcion.toUpperCase();
      data.indInactivo = "0";
      data.roles = rolesSeleccionados;
      data.usuarioRegistro = initialLogin.usuario;
      perfilEdit(data).catch(error => {
        console.error(error)
      })
      notify()
      setTimeout(() => {
        navigator("/perfiles");
      }, 1000);
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    const {value, checked} = event.target;
    if(checked){
      setRolesSeleccionados([...rolesSeleccionados, value])
    }else{
      setRolesSeleccionados(rolesSeleccionados.filter(p => p !== value))
    }
    perfil.roles.map(p => {
      roles.map(q => {
        if(q.id == value){
          q.check = checked;
        }
      })
    })
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
                  <li className="breadcrumb-item"><a href="#">Perfiles</a></li>
                  <li className="breadcrumb-item active">Editar Perfil</li>
                </ol>
              </div>
              <h4 className="page-title">Editar perfil</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12 ">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos del Perfil</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de accesos.</p>
                <p className="text-muted mb-0"><span style={{color : 'red'}}>(*)</span> :Datos obligatorias que se debe ingresar</p>
              </div>
              <div className="card-body">

              <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise"><span style={{color : 'red'}}>(*)</span>Codigo:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Perfil"
                      value={codigo}
                      className="bg-secondary bg-opacity-10 form-control-depo"
                      readOnly
                      autoComplete='false'
                      onChange={(e) => { setCodigo(e.target.value) }} />
                    {errors.msgCodigo && <div className='invalid-feedback'>{errors.msgCodigo}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise"><span style={{color : 'red'}}>(*)</span>Descripcion:</label>
                  <div className="col-sm-9">
                    <textarea type="text"
                      placeholder="Descripcion del perfil"
                      value={descripcion}
                      autoComplete='off'
                      className={`form-control-depo ${errors.msgDescripcion ? 'is-invalid' : ''}`}
                      onChange={(e) => { setDescripcion(e.target.value) }} ></textarea>
                    {errors.msgDescripcion && <div className='invalid-feedback'>{errors.msgDescripcion}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise "><span style={{color : 'red'}}>(*)</span>Roles:</label>
                  <div className="col-sm-9">
                  {
                  roles.map(rol =>
                    <div key={rol.id} className="form-check">
                      <input className="form-check-input" type="checkbox" checked={rol.check} value={rol.id} onChange={handleChange} style={{backgroundColor : 'orange'}}/>
                      <label className="form-check-label" >
                        {rol.codigo}
                      </label>
                    </div>
                    )
                  }
                  {errors.msgRoles && <div style={{"color":"red"}} className='feedback'>{errors.msgRoles}</div>}
                  </div>
                </div>
                <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={editPerfil}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PerfilEditComponent