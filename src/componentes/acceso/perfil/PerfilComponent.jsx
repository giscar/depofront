import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import HeaderComponent from '../../HeaderComponent';
import { usuarioActivo, usuarioEdit, usuarioForId } from '../../../service/FacturaService';

const PerfilComponent = () => {

  const [usuario, setUsuario] = useState([]);
  const [usuarios, setUsuarios] = useState([])

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const navigator = useNavigate();

  const notify = () => toast.info('Se ha eliminado la montacarga correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  })

  const irUsuarioNuevo = () => {
    navigator("/usuarioNuevo")
  }

  const irUsuarioEdit = (id) => {
    navigator(`/usuarioEdit/${id}`)
  }

  const buscarUsuario = () => {
    usuarioActivo().then((response) => {
      setUsuarios(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    buscarUsuario();
  }, [usuario])

  const handleUsuario = (id) => {
    Swal.fire({
      title: "Desea eliminar el usuario?",
      text: "Esta accion no tiene reversion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar el usuario!"
    }).then((result) => {
      if (result.isConfirmed) {
        inactivaUsuario(id)
        Swal.fire({
          title: "Usuario Eliminado!",
          text: "La accion se ejecuto correctamente.",
          icon: "success"
        });
      }
    });
  }

  const inactivaUsuario = (id) => {
    usuarioForId(id).then((response) => {
      response.data.estado = 0;
      usuarioEdit(response.data).catch(error => {
        console.error(error)
      })
      notify();
      setTimeout(() => {
        buscarOperador()
      }, 1000);
    }).catch(error => {
      console.error(error)
    })
  }

  const buscarOperador = () => {
    usuarioActivo().then((response) => {
      setUsuarios(response.data);
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
                  <li className="breadcrumb-item"><a href="#">Usuarios</a></li>
                  <li className="breadcrumb-item active">listado</li>
                </ol>
              </div>
              <h4 className="page-title">Listado de Usurios del Sistema</h4>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='float-end pb-3 pt-4'>
            <button className='ms-2 btn-depo btn-primary-depo' onClick={() => irUsuarioNuevo()}>Nuevo Usuario</button>
          </div>
        </div>
        <br />
        <div className="table-responsive">
            <table className="table mb-0">
              <thead className="thead-light">
            <tr>
              <th className='td-th-size-depo'>Codigo/Documento</th>
              <th className='td-th-size-depo'>Nombre completo</th>
              <th className='td-th-size-depo'>Fecha Registro</th>
              <th className='td-th-size-depo text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarios.map(usuario => 
                <tr key={usuario.id}>
                  <td className='td-th-size-depo'>{usuario.documento}</td>
                  <td className='td-th-size-depo'>{usuario.nombre+" "+usuario.apellidoPat+" "+usuario.apellidoMat}</td>
                  <td className='td-th-size-depo'>{usuario.fechaRegistro}</td>
                  <td className='text-center'>
                        <a className='p-4 icon-link-depo' onClick={() => irUsuarioEdit(usuario.id)}>
                          <i className="bi bi-pencil-fill"></i>
                        </a>
                        <a className='icon-link-depo' onClick={() => handleUsuario(usuario.id)}>
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