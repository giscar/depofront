import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { inactiveFile, montacargasActivo, operadorActivo, servicioEdit, servicioForId, uploadFile } from '../../service/FacturaService';
import HojaServicioReportComponent from '../report/HojaServicioReportComponent';
import { PDFDownloadLink } from '@react-pdf/renderer';
import HeaderComponent from '../HeaderComponent';

const ServicioViewComponent = () => {

  const [servicio, setServicio] = useState([])
  const { id } = useParams();

  const [cliente, setCliente] = useState('')
  const [operadores, setOperadores] = useState([])
  const [montacargas, setMontacargas] = useState([])
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [codServicio, setCodServicio] = useState('')
  const [operadorId, setOperadorId] = useState('')
  const [montacargaId, setMontacargaId] = useState('')
  const [horaSalidaLocal, setHoraSalidaLocal] = useState('')
  const [horaInicioServicio, setHoraInicioServicio] = useState('')
  const [horaRetornoLocal, setHoraRetornoLocal] = useState('')
  const [horaFinServicio, setHoraFinServicio] = useState('')
  const [totalHoras, setTotalHoras] = useState('')
  const [montoServicio, setMontoServicio] = useState('')
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')
  const [estadoRegistro, setEstadoRegistro] = useState('')
  const [documento, setDocumento] = useState('')
  const [tipoServicio, setTipoServicio] = useState('')
  const [solicitante, setSolicitante] = useState('')
  const [sign, setSign] = useState('')
  const [url, setUrl] = useState('')
  const [fechaConclusion, setFechaConclusion] = useState('')

  const cargarServicio = (data) => {
    setCodServicio(data.codServicio)
    setRuc(data.ruc)
    setRazonSocial(data.cliente ? data.cliente[0]?.razonSocial : "")
    setDireccion(data.cliente ? data.cliente[0]?.direccion : "")
    setHoraSalidaLocal(data.horaSalidaLocal)
    setHoraInicioServicio(data.horaInicioServicio)
    setHoraFinServicio(data.horaFinServicio)
    setHoraRetornoLocal(data.horaRetornoLocal)
    setOperadorId(data.operadorId)
    setMontacargaId(data.montacargaId)
    setTotalHoras(data.totalHoras)
    setMontoServicio(data.montoServicio)
    setEstadoRegistro(data.estadoRegistro? data.estadoRegistro : "En proceso")
    setTipoServicio(data.tipoServicio)
    setSolicitante(data.solicitante)
    setUrl(data.url)
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

  useEffect(() => {
    if (id) {
      servicioForId(id).then((response) => {
        setServicio(response.data);
        setTimeout(() => {
          cargarServicio(response.data)
        }, 1000);

      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  useEffect(() => {
    setRuc(cliente.ruc)
    setRazonSocial(cliente.razonSocial)
    setDireccion(cliente.direccion)
  }, [cliente])

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));
  console.log(initialLogin)
  console.log(initialLogin.usuario)

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
                  <li className="breadcrumb-item"><a href="#">Servicios</a></li>
                  <li className="breadcrumb-item active">Editar Servicio</li>
                </ol>
              </div>
              <h4 className="page-title">Editar servicio</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-6 card-deck">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos registrados del Servicio</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de servicios.</p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Codigo del servicio:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      id="inputCodServicio"
                      placeholder="Codigo del servicio"
                      value={codServicio}
                      className="bg-secondary bg-opacity-10 form-control-depo"
                      readOnly
                      onChange={(e) => { setCodServicio(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Numero de RUC:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      id="inputRuc"
                      placeholder="Ingrese el numero de RUC"
                      value={ruc}
                      className={`form-control-depo ${initialLogin.rol === "adm" ? '' : 'bg-secondary bg-opacity-10 '}`}
                      readOnly={!initialLogin.rol === "adm"}
                      onChange={(e) => { setRuc(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Razon Social:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      id="inputRazonSocial"
                      placeholder='Razon Social'
                      value={razonSocial}
                      className='bg-secondary bg-opacity-10 form-control-depo'
                      disabled
                      onChange={(e) => { setRazonSocial(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Dirección:</label>
                  <div className="col-sm-8">
                    <input type='text'
                      placeholder='Dirección'
                      value={direccion}
                      className='bg-secondary bg-opacity-10 form-control-depo'
                      disabled
                      onChange={(e) => { setDireccion(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end" >Operador:</label>
                  <div className="col-sm-8">
                    <select value={operadorId}
                      className={`form-select-depo ${initialLogin.rol === "adm" ? '' : 'bg-secondary bg-opacity-10 '}`}
                      disabled={!initialLogin.rol === "adm"}
                      onChange={(e) => { setOperadorId(e.target.value) }}>
                      <option value="">Seleccione</option>
                      {
                        operadores.map(operador =>
                          <option key={operador.id} value={operador.id}>{operador.nombre+" "+operador.apellidoPat+" "+operador.apellidoMat}</option>
                        )
                      }
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end" >Montacarga:</label>
                  <div className="col-sm-8">
                    <select value={montacargaId}
                      className={`form-select-depo ${initialLogin.rol === "adm" ? '' : 'bg-secondary bg-opacity-10'}`}
                      disabled={!initialLogin.rol === "adm"}
                      onChange={(e) => { setMontacargaId(e.target.value) }}>
                      <option value="">Seleccione</option>
                      {
                        montacargas.map(montacarga =>
                          <option key={montacarga.id} value={montacarga.id}>{montacarga.codigo}</option>
                        )
                      }
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end" >Tipo de servicio:</label>
                  <div className="col-sm-8">
                    <select value={tipoServicio}
                      className='form-select-depo'
                      onChange={(e) => { setTipoServicio(e.target.value) }}>
                      <option value="">Seleccione</option>
                      <option value="Externo">Externo</option>
                      <option value="Interno">Interno</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Estado del registro:</label>
                  <div className="col-sm-8">
                    <label className="col-sm-4 col-form-label-zise text-end text-danger"><b>{estadoRegistro}</b></label>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Hoja de servicio preliminar:</label>
                  <div className="col-sm-8">
                  <PDFDownloadLink document={<HojaServicioReportComponent id={id} />} fileName="preliminar_hoja_servicio.pdf">
        {({ loading, url, error, blob }) =>
          loading ? (
            <button className="btn-depo btn-primary-depo">Loading Document ...</button>
          ) : (
            <button className="btn-depo btn-primary-depo">Descargar</button>
          )
        }
      </PDFDownloadLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 card-deck">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos de la ejecución del servicio</h4>
                <p className="text-muted mb-0">Esta información debe ser ingresada por el operador que realiza el servicio.
                </p>
              </div>
              <div className="card-body">
                <div className="general-label">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Salida de la Empresa:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaSalidaLocal}
                        className='form-control-depo'
                        onChange={(e) => { setHoraSalidaLocal(e.target.value) }}>
                      </input>                    
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Inicio del Servicio:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaInicioServicio}
                        className='form-control-depo'                        
                        onChange={(e) => { setHoraInicioServicio(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Fin del Servicio:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaFinServicio}
                        className='form-control-depo'                        
                        onChange={(e) => { setHoraFinServicio(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Retorno a la empresa:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaRetornoLocal}
                        className='form-control-depo'                        
                        onChange={(e) => { setHoraRetornoLocal(e.target.value) }}>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Horas de servicio (este monto es autocalculado):</label>
                    <div className="col-sm-8">
                      <input type="number"
                        name="totalHoras"
                        placeholder='Cantidad de horas'
                        className='form-control-depo'                        
                        value={totalHoras}
                        onChange={(e) => { setTotalHoras(e.target.value) }}
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Monto del servicio:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        name="montoServicio"
                        placeholder='Monto'
                        value={montoServicio}
                        onChange={(e) => { setMontoServicio(e.target.value) }}
                        className='form-control-depo'                        
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Solicitante:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        name="solicitante"
                        placeholder='Nombre del solicitante'
                        value={solicitante}
                        onChange={(e) => { setSolicitante(e.target.value) }}
                        className='form-control-depo'                         
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Firma del Solicitante:</label>
                    <div className="col-sm-8">
                      <img src={url} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 card-deck">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Evidencias del servicio</h4>
                <p className="text-muted mb-0">Esta seccion es opcional y son imagenes del servicio que el operador registra</p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <div className='col-lg-6'>
                    <input
                      className='form-control'
                      type="file"
                      name="image"
                      value={image}
                      onChange={e => setFile(e.target.files[0])}
                      accept="image/*" />
                  </div>
                </div>
                <div className='container mt-6'>
                  <div className="mb-3 row">
                    {
                      servicio.imagenes?.map(function (value, index, array) {
                        if (value.estado == 1)
                          return <div className='col-lg-3' key={index}>
                            <div className="card">
                              <img className="card-img-top img-fluid bg-light-alt" src={'/images/' + value?.filename} alt="Card image cap" />
                              <div className="card-header">
                                <div className="row align-items-center">
                                  <div className="col">
                                    <h4 className="card-title">Imagen del Servicio</h4>
                                  </div>
                                </div>
                              </div>
                              <div className="card-body">
                                <p className="card-text text-muted ">Cargado al sistema con fecha: <b>{value.fechaRegistro.substring(0, 16).replace("T", " ")}</b>.</p>
                              </div>
                            </div>
                          </div>
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ServicioViewComponent