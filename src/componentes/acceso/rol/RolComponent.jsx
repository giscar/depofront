import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import HeaderComponent from '../../HeaderComponent';
import { rolActivo, rolForId, rolInactiva} from '../../../service/FacturaService';

const RolComponent = () => {

  const [rol, setRol] = useState([]);
  const [roles, setRoles] = useState([])

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const navigator = useNavigate();

  const notify = () => toast.info('Se ha eliminado el rol correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  })

  const irRolNuevo = () => {
    navigator("/rolNuevo")
  }

  const irRolEdit = (id) => {
    navigator(`/rolEdit/${id}`)
  }

  const buscarRol = () => {
    rolActivo().then((response) => {
      setRoles(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    buscarRol();
  }, [])

  const handleRol = (id) => {
    Swal.fire({
      title: "Desea eliminar el rol?",
      text: "Esta accion no tiene reversion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar el rol!"
    }).then((result) => {
      if (result.isConfirmed) {
        inactivaRol(id)
        Swal.fire({
          title: "rol Eliminado!",
          text: "La accion se ejecuto correctamente.",
          icon: "success"
        });
      }
    });
  }

  const inactivaRol = (id) => {
    rolForId(id).then((response) => {
      response.data.estado = 0;
      rolInactiva(response.data).catch(error => {
        console.error(error)
      })
      notify();
      setTimeout(() => {
        buscarRol()
      }, 1000);
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
                  <li className="breadcrumb-item"><a href="#">Rol</a></li>
                  <li className="breadcrumb-item active">listado</li>
                </ol>
              </div>
              <h4 className="page-title">Listado de Roles del Sistema</h4>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='float-end pb-3 pt-4'>
            <button className='ms-2 btn-depo btn-primary-depo' onClick={() => irRolNuevo()}>Nuevo Rol</button>
          </div>
        </div>
        <br />
        <div className="table-responsive">
            <table className="table mb-0">
              <thead className="thead-light">
            <tr>
              <th className='td-th-size-depo'>Codigo</th>
              <th className='td-th-size-depo'>Descripcion</th>
              <th className='td-th-size-depo'>Fecha de fechaRegistro</th>
              <th className='td-th-size-depo text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              roles.map(rol => 
                <tr key={rol.id}>
                  <td className='td-th-size-depo'>{rol.codigo}</td>
                  <td className='td-th-size-depo'>{rol.descripcion}</td>
                  <td className='td-th-size-depo'>{rol.fechaRegistro}</td>
                  <td className='text-center'>
                        <a className='p-4 icon-link-depo' onClick={() => irRolEdit(rol.id)}>
                          <i className="bi bi-pencil-fill"></i>
                        </a>
                        <a className='icon-link-depo' onClick={() => handleRol(rol.id)}>
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

export default RolComponent