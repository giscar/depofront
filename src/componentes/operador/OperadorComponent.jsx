import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { operadorActivo, operadorEdit, operadorForId } from '../../service/FacturaService';
import { useEffect } from 'react';
import Swal from 'sweetalert2'

const OperadorComponent = () => {

  const navigator = useNavigate();

  const notify = () => toast.info('Se ha eliminado el operador correctamente', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const irOperadorNuevo = () => {
    navigator("/operadorNuevo")
  }

  const irOperadorEdit = (id) => {
    navigator(`/operadorEdit/${id}`)
  }

  const [operador, setOperador] = useState([]);
  const [operadores, setOperadores] = useState([])

  const handleOperador = (id) => {
    Swal.fire({
      title: "Desea eliminar el operador?",
      text: "Esta accion no tiene reversion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar el operador!"
    }).then((result) => {
      if (result.isConfirmed) {
        inactivaOperador(id)
        
        Swal.fire({
          title: "Operador Eliminado!",
          text: "La accion se ejecuto correctamente.",
          icon: "success"
        });
      }
    });
  }

  const inactivaOperador = (id) => {
    operadorForId(id).then((response) => {
      response.data.estado = 0;
      operadorEdit(response.data).catch(error => {
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
    console.log("entro buscarOperador")
    operadorActivo().then((response) => {
      setOperadores(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    console.log("useEffect")
    buscarOperador();
  }, [operador])

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="float-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                  <li className="breadcrumb-item"><a href="#">Operadores</a></li>
                  <li className="breadcrumb-item active">listado</li>
                </ol>
              </div>
              <h4 className="page-title">Listado de Operadores</h4>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='float-end pb-3 pt-4'>
            <button className='ms-2 btn-depo btn-primary-depo' onClick={() => irOperadorNuevo()}>Nuevo operador</button>
          </div>
        </div>
        <br />
        {operadores.length > 0 &&
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="thead-light">
                <tr>
                  <th className='td-th-size-depo'>Nombres</th>
                  <th className='td-th-size-depo'>Apellido Paterno</th>
                  <th className='td-th-size-depo'>Apelllido Materno</th>
                  <th className='td-th-size-depo'>Documento</th>
                  <th className='td-th-size-depo'>Direccion</th>
                  <th className='td-th-size-depo'>Telefono</th>
                  <th className='td-th-size-depo'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  operadores.map(operador =>
                    <tr key={operador.id}>
                      <td className='td-th-size-depo'>{operador.nombre}</td>
                      <td className='td-th-size-depo'>{operador.apellidoPat}</td>
                      <td className='td-th-size-depo'>{operador.apellidoMat}</td>
                      <td className='td-th-size-depo'>{operador.documento}</td>
                      <td className='td-th-size-depo'>{operador.direccion}</td>
                      <td className='td-th-size-depo'>{operador.telefono}</td>
                      <td className='text-center'>
                        <a className='p-4 icon-link-depo' onClick={() => irOperadorEdit(operador.id)}>
                          <i className="bi bi-pencil-fill"></i>
                        </a>
                        <a className='icon-link-depo' onClick={() => handleOperador(operador.id)}>
                          <i className="bi bi-x-circle-fill"></i>
                        </a>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </>
  )
}
export default OperadorComponent