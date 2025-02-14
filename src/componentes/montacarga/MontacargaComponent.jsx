import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { montacargaForId, montacargaInactiva, montacargasActivo } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component';

const MontacargaComponent = () => {

  const access = "R004"
  let ingress = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingress = true;
    });
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

  const navigator = useNavigate();

  const notify = () => toast.info('Se ha eliminado la montacarga correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });


  const [data, setData] = useState([]);
  const [montacarga, setMontacarga] = useState([]);
  const [montacargas, setMontacargas] = useState([])

  const handleMontacarga = (id) => {
    Swal.fire({
      title: "Desea eliminar la montacarga?",
      text: "Esta accion no tiene reversion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar la montacarga!"
    }).then((result) => {
      if (result.isConfirmed) {
        inactivaMontacarga(id)
        Swal.fire({
          title: "Montacarga Eliminado!",
          text: "La accion se ejecuto correctamente.",
          icon: "success"
        });
      }
    });
  }

  const inactivaMontacarga = (id) => {
    showLoading()
    montacargaForId(id).then((response) => {
      response.data.estadoRegistro = 0;
      montacargaInactiva(response.data).then(p => {
        buscarMontacarga()
        closeLoading()
        notify()
      }).catch(error => {
        console.error(error)
      })
    }).catch(error => {
      closeLoading()
      console.error(error)
    })
  }

  const irMontacargaNuevo = () => {
    navigator("/montacargaNuevo")
  }

  const irMontacargaEdit = (id) => {
    navigator(`/montacargaEdit/${id}`)
  }

  const buscarMontacarga = () => {
    showLoading()
    datatableMontacarga()
    montacargasActivo().then((response) => {
      cargarDatatable(response.data)
      setMontacargas(response.data)
      closeLoading()
    }).catch(error => {
      console.error(error)
      closeLoading()
    })
  }

  const cargarDatatable = (data) => {
    data.map(p => {
      let revisionOperatividadString = ""
      if (p.revisionOperatividad) {
        revisionOperatividadString = (new Date(p.revisionOperatividad)).toLocaleString().substring(0, 10).split(",")[0];
        p.revisionOperatividadString = revisionOperatividadString
      }
    })
    setData(data)
  }

  const columns = [
    {
      name: 'Codigo',
      selector: row => row.codigo,
    },
    {
      name: 'Marca',
      selector: row => row.marca,
    },
    {
      name: 'Tonelaje',
      selector: row => row.tonelaje,
    },
    {
      name: 'Serie',
      selector: row => row.serie,
    },
    {
      name: 'Modelo',
      selector: row => row.modelo,
    },
    {
      name: 'Año de fabricacion',
      selector: row => row.anhoFabricacion,
    },
    {
      name: 'Ubicacion',
      selector: row => row.ubicacion,
    },
    {
      name: 'Estado',
      selector: row => row.estado,
    },
    {
      name: 'Revision',
      selector: row => row.revisionOperatividadString,
    },
    {
      name: 'Acciones',
      selector: row => <div>
        <a className='p-4 icon-link-depo' onClick={() => irMontacargaEdit(row.id)}>
          <i className="bi bi-pencil-fill"></i>
        </a>
        &nbsp;
        <a className='icon-link-depo' onClick={() => handleMontacarga(row.id)}>
          <i className="bi bi-x-circle-fill"></i>
        </a>
      </div>,
    },

  ];

  const datatableMontacarga = () => {

  }

  useEffect(() => {
    buscarMontacarga();
  }, [montacarga])

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
                    <li className="breadcrumb-item"><a href="#">Montacarga</a></li>
                    <li className="breadcrumb-item active">listado</li>
                  </ol>
                </div>
                <h4 className="page-title">Listado de Montacargas</h4>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='float-end pb-3 pt-4'>
              <button className='ms-2 btn-depo btn-primary-depo' onClick={() => irMontacargaNuevo()}>Nueva Montacarga</button>
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
                    <li className="breadcrumb-item"><a href="#">Montacarga</a></li>
                    <li className="breadcrumb-item active">listado</li>
                  </ol>
                </div>
                <h4 className="page-title">Listado de Montacargas</h4>
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

export default MontacargaComponent