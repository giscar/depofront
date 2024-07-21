import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buscarServicioByDatosAggregate, buscarServiciosPendientes, busquedaEstadisticaAgregate, montacargasActivo, operadorActivo } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';
import ExportExcelServicios from './ExportExcelServicios';

const ServicioReportComponent = () => {
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

  const editServicio = (id) => {
    navigator(`/servicioEdit/${id}`)
  }

  const verServicio = (id) => {
    navigator(`/ServicioView/${id}`)
  }

  const findService = () => {
    if (!codServicio && !ruc && !operadorId && !montacargaId && !estadoRegistro)  {
      return
    }
    busquedaEstadisticaAgregate(ruc, codServicio, operadorId, montacargaId, estadoRegistro).then((response) => {
      setServicios(response.data);
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
    setServicios([]);
  }

  useEffect(() => {
    operadorActivo().then((response) => {
      setOperadores(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    montacargasActivo().then((response) => {
      setMontacargas(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

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
          <div className="col-lg-12 card-deck">
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
                          <option key={operador.id} value={operador.id}>{operador.nombre+" "+operador.apellidoPat+" "+operador.apellidoMat}</option>
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
                          <option key={montacarga.id} value={montacarga.id}>{montacarga.codigo+" "+montacarga.marca}</option>
                        )
                      }
                    </select>
                </div>
                </div>

                <div className='row pt-3'>
                  <div className="col-lg-3">
                    <label className='col-form-label-zise'>Estado del servicio:</label>
                    <select value={estadoRegistro}
                      className='form-select-depo'
                      onChange={(e) => { setEstadoRegistro(e.target.value) }}>
                      <option value="">Seleccione</option>
                      <option value="Proceso">Proceso</option>
                      <option value="Concluido">Concluido</option>
                    </select>
                  </div>
                  </div>


                <div className='mt-4 float-rigth'>
                  <button type="button" className="btn-depo btn-primary-depo" onClick={findService}>Buscar</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {servicios.length > 0 &&
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="thead-light">
                <tr>
                  <th className='td-th-size-depo'>Codigo</th>
                  <th className='td-th-size-depo'>RUC</th>
                  <th className='td-th-size-depo'>Razon Social</th>
                  <th className='td-th-size-depo'>Tipo</th>
                  <th className='td-th-size-depo'>Salida local</th>
                  <th className='td-th-size-depo'>Inicio servicio</th>
                  <th className='td-th-size-depo'>Fin servicio</th>
                  <th className='td-th-size-depo'>Retorno local</th>
                  <th className='td-th-size-depo'>Operador</th>
                  <th className='td-th-size-depo'>Montacarga</th>
                  <th className='td-th-size-depo'>Estado</th>
                  <th className='td-th-size-depo'>Accion</th>
                </tr>
              </thead>
              <tbody>
                {
                  servicios.map(servicio =>
                    <tr key={servicio.id}>
                      <td className='td-th-size-depo'>{servicio.codServicio}</td>
                      <td className='td-th-size-depo'>{servicio.ruc}</td>
                      <td className='td-th-size-depo'>{servicio.cliente[0]?.razonSocial}</td>
                      <td className='td-th-size-depo'>{servicio.tipoServicio}</td>
                      <td className='td-th-size-depo'>{servicio.horaSalidaLocal.replace("T", " ")}</td>
                      <td className='td-th-size-depo'>{servicio.horaInicioServicio.replace("T", " ")}</td>
                      <td className='td-th-size-depo'>{servicio.horaFinServicio.replace("T", " ")}</td>
                      <td className='td-th-size-depo'>{servicio.horaRetornoLocal.replace("T", " ")}</td>
                      <td className='td-th-size-depo'>{servicio.operador[0]?.nombre}</td>
                      <td className='td-th-size-depo'>{servicio.montacarga[0]?.codigo}</td>
                      <td className='td-th-size-depo'>
                        {servicio.estadoRegistro === "Concluido" &&
                          <span className="badge badge-boxed  badge-outline-success">{servicio.estadoRegistro}</span>
                        }
                        {servicio.estadoRegistro !== "Concluido" &&
                          <span className="badge badge-boxed  badge-outline-danger">{servicio.estadoRegistro}</span>
                        }
                      </td>
                      <td className='text-center'>
                      {servicio.estadoRegistro === "Concluido" &&
                          <a className='icon-link-depo' onClick={() => verServicio(servicio.id)}>
                          <i className="bi bi-search"></i>
                        </a>
                        }
                      {servicio.estadoRegistro !== "Concluido" &&
                          <a className='icon-link-depo' onClick={() => editServicio(servicio.id)}>
                          <i className="bi bi-pencil-fill"></i>
                        </a>
                        }
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            <ExportExcelServicios servicios={servicios} />
          </div>
        }
      </div>
    </>
  )
}

export default ServicioReportComponent