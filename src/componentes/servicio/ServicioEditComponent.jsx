import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { inactiveFile, montacargasActivo, operadorActivo, servicioEdit, servicioForId, uploadFile } from '../../service/FacturaService';
import HojaServicioReportComponent from '../report/HojaServicioReportComponent';
import { PDFDownloadLink } from '@react-pdf/renderer';
import SignatureCanvas from 'react-signature-canvas'
import HeaderComponent from '../HeaderComponent';
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent';

const ServicioEditComponent = () => {

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

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
  const [tipoServicio, setTipoServicio] = useState('')
  const [solicitante, setSolicitante] = useState('')
  const [sign, setSign] = useState('')
  const [url, setUrl] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [tipoPago, setTipoPago] = useState('')
  const [moneda, setMoneda] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [errors, setErrors] = useState({
    msgFile: '',
    msgHoraSalidaLocal: '',
    msgHoraInicioServicio: '',
    msgHoraRetornoLocal: '',
    msgHoraFinServicio: '',
    msgTotalHoras: '',
    msgMontoServicio: '',
    msgSolicitante: '',
    msgTipoServicio: ''
  })

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors }
    if (horaSalidaLocal) {
      errorCopy.msgHoraSalidaLocal = '';
    } else {
      errorCopy.msgHoraSalidaLocal = 'Tiene que ingresar la hora de salida de Depovent';
      valid = false;
    }

    if (horaFinServicio) {
      errorCopy.msgHoraFinServicio = '';
    } else {
      errorCopy.msgHoraFinServicio = 'Tiene que ingresar la hora de inicio del servicio';
      valid = false;
    }

    if (horaInicioServicio) {
      errorCopy.msgHoraInicioServicio = '';
    } else {
      errorCopy.msgHoraInicioServicio = 'Tiene que ingresar la hora de fin del servicio';
      valid = false;
    }

    if (horaRetornoLocal) {
      errorCopy.msgHoraRetornoLocal = '';
    } else {
      errorCopy.msgHoraRetornoLocal = 'Tiene que ingresar la hora de retorno a Depovent';
      valid = false;
    }

    if (totalHoras) {
      errorCopy.msgTotalHoras = '';
    } else {
      errorCopy.msgTotalHoras = 'Tiene que ingresar el total de horas del servicio';
      valid = false;
    }

    if (montoServicio) {
      errorCopy.msgMontoServicio = '';
    } else {
      errorCopy.msgMontoServicio = 'Tiene que ingresar el monto total del servicio';
      valid = false;
    }

    if (solicitante) {
      errorCopy.msgSolicitante = '';
    } else {
      errorCopy.msgSolicitante = 'Tiene que ingresar el nombre del solicitante';
      valid = false;
    }

    if (tipoServicio) {
      errorCopy.msgTipoServicio = '';
    } else {
      errorCopy.msgTipoServicio = 'Tiene que ingresar el tipo de servicio';
      valid = false;
    }
    setErrors(errorCopy);
    return valid;
  }

  const validateUpload = () => {
    let valid = true;
    const errorCopy = { ...errors }
    if (file) {
      errorCopy.msgFile = '';
    } else {
      errorCopy.msgFile = 'Tiene que la imagen del servicio';
      valid = false;
    }
    setErrors(errorCopy);
    return valid;
  }

  const editServicio = (e) => {
    e.preventDefault();
    editaServicioOperaciones();
  }

  const editaServicioOperaciones = () => {
    debugger
    let data = {}
    data.id = id;
    data.codServicio = codServicio;
    data.ruc = ruc;
    data.razonSocial = razonSocial;
    data.direccion = direccion;
    data.horaSalidaLocal = horaSalidaLocal;
    data.horaInicioServicio = horaInicioServicio;
    data.horaFinServicio = horaFinServicio;
    data.horaRetornoLocal = horaRetornoLocal;
    data.operadorId = operadorId;
    data.montacargaId = montacargaId;
    data.estado = "1";
    data.totalHoras = totalHoras;
    data.montoServicio = montoServicio;
    data.estadoRegistro = "Proceso";
    data.tipoServicio = tipoServicio;
    data.solicitante = solicitante.toUpperCase();
    data.url = url;
    data.observaciones = observaciones?.toUpperCase();
    data.tipoPago = tipoPago;
    data.moneda = moneda;
    servicioEdit(data).catch(error => {
      console.error(error)
    })
    if (id) {
      servicioForId(id).then((response) => {
        setServicio(response.data);
      }).catch(error => {
        console.log(error);
      })
    }
    notify()
  }

  const publicServicio = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const today  = new Date();
      let data = {}
      data.id = id;
      data.codServicio = codServicio;
      data.ruc = ruc;
      data.razonSocial = razonSocial;
      data.direccion = direccion;
      data.horaSalidaLocal = horaSalidaLocal;
      data.horaInicioServicio = horaInicioServicio;
      data.horaFinServicio = horaFinServicio;
      data.horaRetornoLocal = horaRetornoLocal;
      data.operadorId = operadorId;
      data.montacargaId = montacargaId;
      data.estado = "1";
      data.totalHoras = totalHoras;
      data.montoServicio = montoServicio;
      data.estadoRegistro = "Concluido";
      data.tipoServicio = tipoServicio;
      data.solicitante = solicitante;
      data.url = url;
      data.observaciones = observaciones;
      data.tipoPago = tipoPago;
      data.moneda = moneda;
      data.fechaConclusion = today.toLocaleDateString("en-US");
      setEstadoRegistro("Concluido")
      servicioEdit(data).then(() => {
        setTimeout(() => {
          if (id) {
            servicioForId(id).then((response) => {
              setServicio(response.data);
            }).catch(error => {
              console.log(error);
            })
          }
        }, 1000);
      }).catch(error => {
        console.log(error);
      })
      notify()
    }
  }

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
    setEstadoRegistro(data.estadoRegistro ? data.estadoRegistro : "En proceso")
    setTipoServicio(data.tipoServicio)
    setSolicitante(data.solicitante)
    setUrl(data.url)
    setObservaciones(data.observaciones)
    setTipoPago(data.tipoPago)
    setMoneda(data.moneda)
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

  useEffect(() => {
    if (horaSalidaLocal, horaRetornoLocal) {
      const horaSalidaLocal1 = new Date(horaSalidaLocal);
      const horaRetornoLocal1 = new Date(horaRetornoLocal);
      const diff = horaRetornoLocal1.getTime() - horaSalidaLocal1.getTime();
      const horas = diff / (1000 * 60 * 60);
      console.log(horas.toFixed(2))
      setTotalHoras(horas.toFixed(2))
      servicio.totalHoras = horas.toFixed(2)
    }
  }, [horaSalidaLocal, horaRetornoLocal, cliente])

  const handleUpload = (e) => {
    e.preventDefault();
    if (validateUpload()) {
      const formdata = new FormData()
      formdata.append('file', file)
      formdata.append('id', id)
      formdata.append('type', file.type)
      formdata.append('size', file.size)
      uploadFile(formdata).then(() => {
        if (id) {
          servicioForId(id).then((response) => {
            setTimeout(() => {
              setServicio(response.data);
            }, 1000);

          }).catch(error => {
            console.log(error);
          })
        }
      }).catch(error => {
        console.log(error);
      });
      setFile("")
      notify();
    }
  }

  const handleInactiveFile = (idImagen) => {
    console.log(idImagen);
    inactiveFile(idImagen).then(() => {
      if (id) {
        servicioForId(id).then((response) => {
          setServicio(response.data);
          notify();
        }).catch(error => {
          console.log(error);
        })
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const handleClear = () => {
    sign.clear();
  }

  const handleGenerate = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
    const urlSign = sign.getTrimmedCanvas().toDataURL('image/png');
    servicioForId(id).then((response) => {
      setServicio(response.data);
      setTimeout(() => {
        debugger
          response.data.url = urlSign;
          servicioEdit(response.data).then(() => {
          notify();
        })
        //cargarServicio(response.data)
      }, 1000);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    
  }, [url])

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
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos registrados del Servicio</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de servicios.</p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Codigo del servicio:</label>
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
                  <label className="col-sm-4 col-form-label-zise">Numero de RUC:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      id="inputRuc"
                      placeholder="Ingrese el numero de RUC"
                      value={ruc}
                      className={`form-control-depo ${initialLogin.rol === "adm" ? '' : 'bg-secondary bg-opacity-10 '}`}
                      readOnly
                      onClick={handleShow}
                      onChange={(e) => { setRuc(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Razon Social:</label>
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
                  <label className="col-sm-4 col-form-label-zise">Dirección:</label>
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
                  <label className="col-sm-4 col-form-label-zise" >Operador:</label>
                  <div className="col-sm-8">
                    <select value={operadorId}
                      className={`form-select-depo ${initialLogin.rol === "adm" ? '' : 'bg-secondary bg-opacity-10 '}`}
                      disabled={initialLogin.rol !== "adm"? 'disabled' : ''}
                      onChange={(e) => { setOperadorId(e.target.value) }}>
                      <option value="">Seleccione</option>
                      {
                        operadores.map(operador =>
                          <option key={operador.id} value={operador.id}>{operador.nombre + " " + operador.apellidoPat + " " + operador.apellidoMat}</option>
                        )
                      }
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise" >Montacarga:</label>
                  <div className="col-sm-8">
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
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise" >Tipo de servicio:</label>
                  <div className="col-sm-8">
                    <select value={tipoServicio}
                      className={`form-select-depo${errors.msgTipoServicio ? ' is-invalid' : ''}`}
                      onChange={(e) => { setTipoServicio(e.target.value) }}>
                      <option value="">Seleccione</option>
                      <option value="Externo">Externo</option>
                      <option value="Interno">Interno</option>

                    </select>
                    {errors.msgTipoServicio && <div className='invalid-feedback'>{errors.msgTipoServicio}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Estado del registro:</label>
                  <div className="col-sm-8">
                    <label className="col-sm-4 col-form-label-zise text-danger"><b>{estadoRegistro}</b></label>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Hoja de servicio preliminar:</label>
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
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos de la ejecución del servicio</h4>
                <p className="text-muted mb-0">Esta información debe ser ingresada por el operador que realiza el servicio.
                </p>
              </div>
              <div className="card-body">
                <div className="general-label">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Salida de la Empresa:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaSalidaLocal}
                        className={`form-control-depo ${errors.msgHoraSalidaLocal ? 'is-invalid' : ''}`}
                        onChange={(e) => { setHoraSalidaLocal(e.target.value) }}>
                      </input>
                      {errors.msgHoraSalidaLocal && <div className='invalid-feedback'>{errors.msgHoraSalidaLocal}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Inicio del Servicio:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaInicioServicio}
                        className={`form-control-depo ${errors.msgHoraInicioServicio ? 'is-invalid' : ''}`}
                        onChange={(e) => { setHoraInicioServicio(e.target.value) }}>
                      </input>
                      {errors.msgHoraInicioServicio && <div className='invalid-feedback'>{errors.msgHoraInicioServicio}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Fin del Servicio:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaFinServicio}
                        className={`form-control-depo ${errors.msgHoraFinServicio ? 'is-invalid' : ''}`}
                        onChange={(e) => { setHoraFinServicio(e.target.value) }}>
                      </input>
                      {errors.msgHoraFinServicio && <div className='invalid-feedback'>{errors.msgHoraFinServicio}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Retorno a la empresa:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaRetornoLocal}
                        className={`form-control-depo ${errors.msgHoraRetornoLocal ? 'is-invalid' : ''}`}
                        onChange={(e) => { setHoraRetornoLocal(e.target.value) }}>
                      </input>
                      {errors.msgHoraRetornoLocal && <div className='invalid-feedback'>{errors.msgHoraRetornoLocal}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Horas de servicio (este monto es autocalculado):</label>
                    <div className="col-sm-8">
                      <input type="number"
                        name="totalHoras"
                        placeholder='Cantidad de horas'
                        className={`form-control-depo ${errors.msgTotalHoras ? 'is-invalid' : ''}`}
                        value={totalHoras}
                        onChange={(e) => { setTotalHoras(e.target.value) }}
                        autoComplete='off'>
                      </input>
                      {errors.msgTotalHoras && <div className='invalid-feedback'>{errors.msgTotalHoras}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Monto del servicio:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        name="montoServicio"
                        placeholder='Monto'
                        value={montoServicio}
                        onChange={(e) => { setMontoServicio(e.target.value) }}
                        className={`form-control-depo ${errors.msgMontoServicio ? 'is-invalid' : ''}`}
                        autoComplete='off'>
                      </input>
                      {errors.msgMontoServicio && <div className='invalid-feedback'>{errors.msgMontoServicio}</div>}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise" >Moneda:</label>
                    <div className="col-sm-8">
                      <select value={moneda}
                        className='form-select-depo'
                        onChange={(e) => { setMoneda(e.target.value) }}>
                        <option value="">Seleccione</option>
                        <option value="soles">Soles</option>
                        <option value="dolares">Dolares</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise" >Tipo de Pago:</label>
                    <div className="col-sm-8">
                      <select value={tipoPago}
                        className='form-select-depo'
                        onChange={(e) => { setTipoPago(e.target.value) }}>
                        <option className='form-control' value="">Seleccione</option>
                        <option className='form-control' value="Facturado">Facturado</option>
                        <option className='form-control' value="Contado">Contado</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Observaciones:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        name="observaciones"
                        placeholder='Observaciones'
                        value={observaciones}
                        onChange={(e) => { setObservaciones(e.target.value) }}
                        className='form-control-depo'
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Solicitante:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        name="solicitante"
                        placeholder='Nombre del solicitante'
                        value={solicitante}
                        onChange={(e) => { setSolicitante(e.target.value) }}
                        className={`form-control-depo ${errors.msgSolicitante ? 'is-invalid' : ''}`}
                        autoComplete='off'>
                      </input>
                      {errors.msgSolicitante && <div className='invalid-feedback'>{errors.msgSolicitante}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Firma del Solicitante:</label>
                    <div className="col-sm-8">
                      {!url && <div>
                        <div className='w-100' style={{ border: "2px solid #E8E3E1" }}>
                          <SignatureCanvas ref={data => setSign(data)}
                            canvasProps={{ width: 330, height: 150, className: 'sigCanvas' }} />
                        </div>
                        <button className="btn-depo btn-danger-depo mt-1" onClick={handleClear}>
                          <i class="bi bi-trash-fill"></i>
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn-depo btn-primary-depo  mt-1" onClick={handleGenerate}>
                          <i class="bi bi-floppy-fill"></i>
                        </button>
                      </div>}
                      <br />
                      <img src={url} />
                    </div>
                  </div>
                  {estadoRegistro !== "Concluido" &&
                    <div>
                      <button type="button" className="btn-depo btn-primary-depo" onClick={editServicio}>Guardar</button>
                      &nbsp;
                      <button type="button" className="btn-depo btn-dark-depo" onClick={publicServicio}>Concluir</button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Evidencias del servicio</h4>
                <p className="text-muted mb-0">Esta seccion es opcional y son imagenes del servicio que el operador registra</p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <div className='col-lg-6'>
                    <input
                      className={`form-control ${errors.msgFile ? 'is-invalid' : ''}`}
                      type="file"
                      name="image"
                      value={image}
                      onChange={e => setFile(e.target.files[0])}
                      accept="image/*" />
                    {errors.msgFile && <div className='invalid-feedback'>{errors.msgFile}</div>}
                  </div>
                  <div className='col-lg-6'>
                    {estadoRegistro !== "Concluido" &&
                      <button type="button" className="btn-depo btn-warning-depo mt-1" onClick={handleUpload} >Cargar imagen</button>
                    }
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
                                {estadoRegistro !== "Concluido" &&
                                  <button className="btn-depo btn-danger-depo btn-sm" onClick={() => handleInactiveFile(value.id)}>Eliminar</button>
                                }
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
      <BusquedaClienteComponent show={show} handleClose={handleClose} setCliente={setCliente} />
    </>
  )
}
export default ServicioEditComponent