import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { buscarServicioByDatosAggregate, buscarServicioByIdOperador, buscarServiciosPendientes, operadorForDocumento } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';
import Swal from 'sweetalert2'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent';
import DataTable from 'react-data-table-component';

const ServicioComponent = () => {

  const access = "R007"
  const accessOpe = "R009"
  let ingress = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingress = true;
    });

    p.roles.map(r => {
      if (r.codigo == accessOpe)
        ingress = true;
    });
  })

  const navigator = useNavigate();

  const [servicios, setServicios] = useState([])
  const [ruc, setRuc] = useState('')
  const [codServicio, setCodServicio] = useState('')
  const [esOperador, setEsOperdor] = useState(false)
  const [data, setData] = useState([]);


  const [cliente, setCliente] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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

  const editServicio = (id) => {
    navigator(`/servicioEdit/${id}`)
  }

  const accederServicioNuevo = () => {
    navigator("/servicioNuevo")
  }

  const verServicio = (id) => {
    navigator(`/ServicioView/${id}`)
  }

  const findService = () => {
    if (!codServicio && !ruc) {
      alerta("Debe de ingresar el RUC o el codigo del servicio")
      return
    }
    showLoading()
    buscarServicioByDatosAggregate(ruc, codServicio).then((response) => {
      setServicios(response.data)
      setData(response.data)
      closeLoading()
    }).catch(error => {
      console.error(error)
      closeLoading()
    })
  }

  useEffect(() => {
      setRuc(cliente?.ruc)
    }, [cliente])

  useEffect(() => {
    showLoading()
    operadorForDocumento(initialLogin.documento).then(p => {
      if (p?.data) {
        buscarServicioByIdOperador(p.data.documento).then((response) => {
          setEsOperdor(true);
          setServicios(response.data)
          setData(response.data)
          closeLoading()
        }).catch(error => {
          console.log(error)
          closeLoading()
        })
      } else {
        buscarServiciosPendientes().then((response) => {
          setEsOperdor(false)
          setServicios(response.data)
          setData(response.data)
          closeLoading()
        }).catch(error => {
          console.log(error)
          closeLoading()
        })
      }
      closeLoading()
    })
  }, [])

  const limpiar = () => {
    setRuc('');
    setCodServicio('');
    setServicios([]);
  }

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
      width: '16%',
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
      width: '3%',
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
                    <li className="breadcrumb-item active">Busqueda</li>
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
                    <div className="col-lg-6">
                      <label className='col-form-label-zise'>Codigo del servicio:</label>
                      <input type="number"
                        id="inputCodServicio"
                        placeholder="Codigo del servicio"
                        value={codServicio}
                        className="form-control-depo"
                        onChange={(e) => { setCodServicio(e.target.value) }}>
                      </input>
                    </div>
                    <div className="col-lg-6">
                      <label className='col-form-label-zise'>Numero de RUC:</label>
                      <input type="number"
                        id="inputRuc"
                        placeholder="Ingrese el numero de RUC"
                        value={ruc}
                        onClick={handleShow}
                        className="form-control-depo"
                        onChange={(e) => { setRuc(e.target.value) }}
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className='mt-4 float-rigth'>
                    <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
                    &nbsp;&nbsp;
                    <button type="button" className={`btn-depo btn-primary-depo${esOperador ? ' invisible' : ''}`} onClick={findService}>Buscar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="button" className="btn-depo btn-primary-depo" onClick={accederServicioNuevo}>Nuevo Servicio</button>
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
                    <li className="breadcrumb-item"><a href="#">Servicios</a></li>
                    <li className="breadcrumb-item active">Busqueda</li>
                  </ol>
                </div>
                <h4 className="page-title">Busqueda de servicio</h4>
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
      <BusquedaClienteComponent show={show} handleClose={handleClose} setCliente={setCliente} />
    </>
  )
}

export default ServicioComponent