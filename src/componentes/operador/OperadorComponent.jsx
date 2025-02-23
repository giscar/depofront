import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { operadorActivo, operadorForId, operadorInactiva } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

const OperadorComponent = () => {

  const navigator = useNavigate();

  const access = "R005"
  let ingress = false

  const initialLogin = JSON.parse(sessionStorage.getItem('user'))

  const [data, setData] = useState([]);

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingress = true;
    })
  })

  const showLoading = () => {
    Swal.fire({
      title: 'Cargando',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
      }
    })
  }

  const closeLoading = () => {
    Swal.close()
  }

  const notify = () => toast.info('Se ha eliminado el operador correctamente', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  })

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
        })
      }
    })
  }

  const inactivaOperador = (id) => {
    showLoading()
    operadorForId(id).then((response) => {
      response.data.estado = 0;
      operadorInactiva(response.data).then(response => {
        notify();
        buscarOperador()
        closeLoading()
      }).catch(error => {
        console.error(error)
        closeLoading()
      })
    }).catch(error => {
      console.error(error)
    })
  }

  const buscarOperador = () => {
    showLoading()
    operadorActivo().then((response) => {
      setOperadores(response.data)
      cargarDatatable(response.data)
      closeLoading()
    }).catch(error => {
      console.error(error)
      closeLoading()
    })
  }

  const cargarDatatable = (data) => {
    /*data.map(p => {
      let revisionOperatividadString = ""
      if (p.revisionOperatividad) {
        revisionOperatividadString = (new Date(p.revisionOperatividad)).toLocaleString().substring(0, 10).split(",")[0];
        p.revisionOperatividadString = revisionOperatividadString
      }
    })*/
    setData(data)
  }

  useEffect(() => {
    buscarOperador();
  }, [operador])


  const columns = [
    {
      name: 'Nombres',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Apellido paterno',
      selector: row => row.apellidoPat,
      sortable: true,
    },
    {
      name: 'Apelllido Materno',
      selector: row => row.apellidoMat,
      sortable: true,
    },
    {
      name: 'Documento',
      selector: row => row.documento,
      sortable: true,
    },
    {
      name: 'Direccion',
      selector: row => row.direccion,
      sortable: true,
    },
    {
      name: 'Telefono',
      selector: row => row.telefono,
      sortable: true,
    },
    {
      name: 'Acciones',
      selector: row => <div>
        <a className='p-4 icon-link-depo' onClick={() => irOperadorEdit(row.id)}>
          <i className="bi bi-pencil-fill"></i>
        </a>
        <a className='icon-link-depo' onClick={() => handleOperador(row.id)}>
          <i className="bi bi-x-circle-fill"></i>
        </a>
      </div>,
    },
  ];

  return (
    <>
      {initialLogin.documento && <HeaderComponent />}
      {ingress &&
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
          <div className="table-responsive">
            <DataTable
              columns={columns}
              data={data}
              pagination
            />
          </div>
        </div>
      }
      {!ingress &&
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
              <div className="alert alert-danger border-0" role="alert">
                <strong>Alerta!</strong> No tiene acceso para este modulo.
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default OperadorComponent