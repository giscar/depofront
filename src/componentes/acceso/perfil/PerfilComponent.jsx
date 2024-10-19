import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import HeaderComponent from '../../HeaderComponent';
import { perfilActivo, perfilForId, perfilInactiva, usuarioActivo, usuarioEdit, usuarioForId } from '../../../service/FacturaService';

const PerfilComponent = () => {

  const [perfil, setPerfil] = useState([]);
  const [perfiles, setPerfiles] = useState([])

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const navigator = useNavigate();

  const notify = () => toast.info('Se ha eliminado el perfil correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  })

  const irPerefilNuevo = () => {
    navigator("/perfilNuevo")
  }

  const irPerfilEdit = (id) => {
    navigator(`/perfilEdit/${id}`)
  }

  useEffect(() => {
    buscarPerfil();
  }, [])

  const handlePerfil = (id) => {
    Swal.fire({
      title: "Desea eliminar el perfil?",
      text: "Esta accion no tiene reversion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar el perfil!"
    }).then((result) => {
      if (result.isConfirmed) {
        inactivaPerfil(id)
        Swal.fire({
          title: "Perfil Eliminado!",
          text: "La accion se ejecuto correctamente.",
          icon: "success"
        });
      }
    });
  }

  const inactivaPerfil = (id) => {
    perfilForId(id).then((response) => {
      response.data.estado = 0;
      perfilInactiva(response.data).catch(error => {
        console.error(error)
      })
      notify();
      setTimeout(() => {
        buscarPerfil()
      }, 1000);
    }).catch(error => {
      console.error(error)
    })
  }

  const buscarPerfil = () => {
    perfilActivo().then((response) => {
      setPerfiles(response.data);
    }).catch(error => {
      console.error(error)
    })
  }
  
  
  return (
    <>
    {initialLogin.usuario && <HeaderComponent />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="float-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                  <li className="breadcrumb-item"><a href="#">Perfil</a></li>
                  <li className="breadcrumb-item active">listado</li>
                </ol>
              </div>
              <h4 className="page-title">Listado de Perfiles del Sistema</h4>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='float-end pb-3 pt-4'>
            <button className='ms-2 btn-depo btn-primary-depo' onClick={() => irPerefilNuevo()}>Nuevo Perfil</button>
          </div>
        </div>
        <br />
        <div className="table-responsive">
            <table className="table mb-0">
              <thead className="thead-light">
            <tr>
              <th className='td-th-size-depo'>Codigo</th>
              <th className='td-th-size-depo'>Descripcion</th>
              <th className='td-th-size-depo'>Fecha Registro</th>
              <th className='td-th-size-depo text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              perfiles.map(perfil => 
                <tr key={perfil.id}>
                  <td className='td-th-size-depo'>{perfil.codigo}</td>
                  <td className='td-th-size-depo'>{perfil.descripcion}</td>
                  <td className='td-th-size-depo'>{perfil.fechaRegistro}</td>
                  <td className='text-center'>
                        <a className='p-4 icon-link-depo' onClick={() => irPerfilEdit(perfil.id)}>
                          <i className="bi bi-pencil-fill"></i>
                        </a>
                        <a className='icon-link-depo' onClick={() => handlePerfil(perfil.id)}>
                          <i className="bi bi-x-circle-fill"></i>
                        </a>
                      </td>
                </tr>
              )
            }
          </tbody>
        </table>
        </div>
      </div>
    </>
  )
}

export default PerfilComponent