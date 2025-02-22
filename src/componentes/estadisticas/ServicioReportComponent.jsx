import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { busquedaEstadisticaAgregate, montacargasActivo, operadorActivo } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';
import ExportExcelServicios from './ExportExcelServicios';
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component';

const ServicioReportComponent = () => {

  const access = "R007"
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
  
    const alerta = (msg) => {
      Swal.fire({
        title: "Alerta!",
        text: msg,
        icon: "warning"
      })
    }

  const notify = () => toast.warning('No se ha encontrado registros en la busqueda', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
  const navigator = useNavigate();

  const [servicios, setServicios] = useState([])
  const [operadores, setOperadores] = useState([])
  const [montacargas, setMontacargas] = useState([])
  const [ruc, setRuc] = useState('')
  const [operadorId, setOperadorId] = useState('')
  const [montacargaId, setMontacargaId] = useState('')
  const [codServicio, setCodServicio] = useState('')
  const [estadoRegistro, setEstadoRegistro] = useState('')
  const [tipoServicio, setTipoServicio] = useState('')


  const editServicio = (id) => {
    navigator(`/servicioEdit/${id}`)
  }

  const verServicio = (id) => {
    navigator(`/ServicioView/${id}`)
  }

  const findService = () => {
    if (!codServicio && !ruc && !operadorId && !montacargaId && !estadoRegistro && !tipoServicio) {
      alerta("No se ha ingresado ningun filtro de busqueda")
      return
    }
    showLoading()
    busquedaEstadisticaAgregate(ruc, codServicio, operadorId, montacargaId, estadoRegistro, tipoServicio).then((response) => {
      setServicios(response.data)
      closeLoading()
    }).catch(error => {
      console.error(error)
    })
  }

  const limpiar = () => {
    setRuc('');
    setCodServicio('');
    setMontacargaId('');
    setOperadorId('');
    setEstadoRegistro('');
    setTipoServicio('');
    setServicios([]);
  }

  useEffect(() => {
    showLoading()
    operadorActivo().then((response) => {
      setOperadores(response.data)
      closeLoading()
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    showLoading()
    montacargasActivo().then((response) => {
      setMontacargas(response.data)
      closeLoading()
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const columns = [
    {
      name: 'Codigo',
      selector: row => row.codServicio,
      sortable: true,
      width: '6%',
    },
    {
      name: 'RUC',
      selector: row => row.ruc,
      sortable: true,
      width: '8%',
    },
    {
      name: 'Razon Social',
      selector: row => row.cliente[0]?.razonSocial,
      sortable: true,
      width: '14%',
    },
    {
      name: 'Salida local',
      selector: row => row.horaSalidaLocal ? (new Date(row.horaSalidaLocal)).toLocaleString() : "",
      sortable: true,
      width: '11%',
    },
    {
      name: 'Inicio servicio',
      selector: row => row.horaInicioServicio ? (new Date(row.horaInicioServicio)).toLocaleString() : "",
      sortable: true,
      width: '11%',
    },
    {
      name: 'Fin servicio',
      selector: row => row.horaFinServicio ? (new Date(row.horaFinServicio)).toLocaleString() : "",
      sortable: true,
      width: '11%',
    },
    {
      name: 'Retorno local',
      selector: row => row.horaRetornoLocal ? (new Date(row.horaRetornoLocal)).toLocaleString() : "",
      sortable: true,
      width: '11%',
    },
    {
      name: 'Operador',
      selector: row => row.operador[0]?.nombre + ' ' + row.operador[0]?.apellidoPat,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Montacarga',
      selector: row => row.montacarga[0]?.codigo,
      sortable: true,
      width: '6%',
    },
    {
      name: 'Estado',
      selector: row => 
        <>
      {row.estadoRegistro === "Concluido" &&
        <span className="badge badge-boxed  badge-outline-success">{row.estadoRegistro}</span>
      }
      {row.estadoRegistro == "Proceso" &&
        <span className="badge badge-boxed  badge-outline-danger">{row.estadoRegistro}</span>
      }
      {row.estadoRegistro == "Facturado" &&
        <span className="badge badge-boxed  badge-outline-primary">{row.estadoRegistro}</span>
      }
      </>,
      sortable: true,
      width: '7%',
    },
    {
      name: '',
      selector: row =>  
        <>
        {row.estadoRegistro === "Concluido" &&
        <a className='icon-link-depo' onClick={() => verServicio(row.id)}>
          <i className="bi bi-search"></i>
        </a>
      }
      {row.estadoRegistro !== "Concluido" &&
        <a className='icon-link-depo' onClick={() => editServicio(row.id)}>
          <i className="bi bi-pencil-fill"></i>
        </a>
      }
      </>,
      width: '5%',
    }
  ]

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
                  <li className="breadcrumb-item"><a href="#">Servicios</a></li>
                  <li className="breadcrumb-item active">Estadisticas</li>
                </ol>
              </div>
              <h4 className="page-title">Busqueda de servicio</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Busqueda de servicios</h4>
                <p className="text-muted mb-0">Debe ser ingresado por el/la administrador(a) del modulo de servicios.</p>
              </div>
              <div className="card-body">
                <div className='row'>
                  <div className="col-lg-3">
                    <label className='col-form-label-zise'>Codigo del servicio:</label>
                    <input type="number"
                      id="inputCodServicio"
                      placeholder="Codigo del servicio"
                      value={codServicio}
                      className="form-control-depo"
                      onChange={(e) => { setCodServicio(e.target.value) }}>
                    </input>
                  </div>
                  <div className="col-lg-3">
                    <label className='col-form-label-zise'>Numero de RUC:</label>
                    <input type="number"
                      id="inputRuc"
                      placeholder="Ingrese el numero de RUC"
                      value={ruc}
                      className="form-control-depo"
                      onChange={(e) => { setRuc(e.target.value) }}>
                    </input>
                  </div>
                  <div className="col-lg-3">
                    <label className="col-form-label-zise" >Operador:</label>
                    <select value={operadorId}
                      className='form-select-depo'
                      onChange={(e) => { setOperadorId(e.target.value) }}>
                      <option value="">Seleccione</option>
                      {
                        operadores.map(operador =>
                          <option key={operador.id} value={operador.id}>{operador.nombre + " " + operador.apellidoPat + " " + operador.apellidoMat}</option>
                        )
                      }
                    </select>
                  </div>

                  <div className="col-lg-3">
                    <label className="col-form-label-zise" >Montacarga:</label>
                    <select value={montacargaId}
                      className='form-select-depo'
                      onChange={(e) => { setMontacargaId(e.target.value) }}>
                      <option value="">Seleccione</option>
                      {
                        montacargas.map(montacarga =>
                          <option key={montacarga.id} value={montacarga.id}>{montacarga.codigo + " " + montacarga.marca}</option>
                        )
                      }
                    </select>
                  </div>

                  <div className="col-lg-3">
                    <label className="col-form-label-zise" >Tipo servicio:</label>
                    <select value={estadoRegistro}
                      className='form-select-depo'
                      onChange={(e) => { setEstadoRegistro(e.target.value) }}>
                      <option value="">Seleccione</option>
                      <option value="Proceso">Proceso</option>
                      <option value="Concluido">Concluido</option>
                      <option value="Facturado">Facturado</option>
                    </select>
                  </div>

                  <div className="col-lg-3">
                    <label className='col-form-label-zise'>Estado del servicio:</label>
                    <select value={tipoServicio}
                      className='form-select-depo'
                      onChange={(e) => { setTipoServicio(e.target.value) }}>
                      <option value="">Seleccione</option>
                      <option value="Externo">Externo</option>
                      <option value="Interno">Interno</option>
                    </select>
                  </div>
                </div>

                <div className='mt-4 float-rigth'>
                  <button type="button" className="btn-depo btn-primary-depo" onClick={findService}>Buscar</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
                  &nbsp;&nbsp;
                  <ExportExcelServicios servicios={servicios} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
          <div className="table-responsive">
            <DataTable
              columns={columns}
              data={servicios}
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
                  <li className="breadcrumb-item"><a href="#">Servicios</a></li>
                  <li className="breadcrumb-item active">Estadisticas</li>
                  </ol>
                </div>
                <h4 className="page-title">Listado de Servicios</h4>
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

export default ServicioReportComponent