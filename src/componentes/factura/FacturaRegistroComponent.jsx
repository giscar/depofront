import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HeaderComponent from '../HeaderComponent';
import { buscarCodigoServicio, buscarServiciosConcluidosForFacturar, montacargasActivo, operadorActivo, servicioSave } from '../../service/FacturaService';
import { useNavigate, useParams } from 'react-router-dom';

const FacturaRegistroComponent = () => {

  const [cliente, setCliente] = useState([])
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
  const [tipoServicio, setTipoServicio] = useState('')
  const [solicitante, setSolicitante] = useState('')
  const [moneda, setMoneda] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [tipoPago, setTipoPago] = useState('')

  const [servicios, setServicios] = useState([])

  const navigator = useNavigate();

  const {ids} = useParams();
  
  useEffect(() => {
    console.log(ids)
    buscarServiciosConcluidosForFacturar(ids).then((response) => {
      setServicios(response.data);
    })
  }, [])

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const editServicio = (id) => {
    navigator(`/servicioEdit/${id}`)
  }

  const [errors, setErrors] = useState({
    msgCodServicio: '',
    msgRuc: '',
    msgOperadorId: '',
    msgMontacargaId: '',
    msgTipoServicio: '',
  })

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const validateForm = () => {
    debugger
    let valid = true;
    const errorCopy = { ...errors }
    const regex = /^[0-9]*$/;
    if (codServicio) {
      errorCopy.msgCodServicio = '';
      if (!regex.test(codServicio)) {
        errorCopy.msgCodServicio = 'El codigo del servicio debe ser un numero';
        valid = false;
      }
    } else {
      errorCopy.msgCodServicio = 'Tiene que ingresar el numero de servicio';
      valid = false;
    }

    if (ruc) {
      errorCopy.msgRuc = '';
    } else {
      errorCopy.msgRuc = 'Tiene que ingresar el numero de RUC';
      valid = false;
    }

    if (operadorId) {
      errorCopy.msgOperadorId = '';
    } else {
      errorCopy.msgOperadorId = 'Tiene que ingresar el operador';
      valid = false;
    }

    if (montacargaId) {
      errorCopy.msgMontacargaId = '';
    } else {
      errorCopy.msgMontacargaId = 'Tiene que ingresar la montacarga';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {}
      data.codServicio = codServicio;
      data.ruc = ruc;
      data.razonSocial = razonSocial?.toUpperCase();
      data.direccion = direccion?.toUpperCase();
      data.horaSalidaLocal = horaSalidaLocal;
      data.horaInicioServicio = horaInicioServicio;
      data.horaFinServicio = horaFinServicio;
      data.horaRetornoLocal = horaRetornoLocal;
      data.operadorId = operadorId;
      data.montacargaId = montacargaId;
      data.totalHoras = totalHoras;
      data.montoServicio = montoServicio;
      data.estado = "1";
      data.estadoRegistro = "Proceso";
      data.tipoServicio = tipoServicio;
      data.solicitante = solicitante;
      data.moneda = moneda;
      data.observaciones = observaciones;
      data.tipoPago = tipoPago;
      servicioSave(data).then((response) => {
        if(response.data.id){
          editServicio(response.data.id);
        }
      }).catch(error => {
        console.error(error)
      });
      limpiar()
      notify()
      setTimeout(() => {
        handleCodServicio()
      }, 1000);

    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    operadorActivo().then((response) => {
      setOperadores(response.data);
      if(initialLogin.id){
        setOperadorId(initialLogin.id);
      }
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
    handleCodServicio();
  }, [])

  const handleCodServicio = () => {
    buscarCodigoServicio().then((response) => {
      setCodServicio(response.data + 1)
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    setRuc(cliente?.ruc)
    setRazonSocial(cliente?.razonSocial)
    setDireccion(cliente?.direccion)
  }, [cliente])

  const limpiar = () => {
    setRuc('')
    setRazonSocial('')
    setDireccion('')
    setCliente([])
    setOperadorId('')
    setMontacargaId('')
    setCodServicio('')
    setHoraSalidaLocal('')
    setHoraInicioServicio('')
    setHoraFinServicio('')
    setHoraRetornoLocal('')
    setTotalHoras('')
    setMontoServicio('')
    setTipoServicio('')
    setSolicitante('')
    setMoneda('')
    setObservaciones('');
    setTipoPago('')
  };

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
                  <li className="breadcrumb-item"><a href="#">Factura</a></li>
                  <li className="breadcrumb-item active">Nuevo Factura</li>
                </ol>
              </div>
              <h4 className="page-title">Registrar Factura</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos del emisor</h4>
                <p className="text-muted mb-0">Las hojas de servicio a facturar provienen del modulo de servicios de operaciones.</p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Nro de documento:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      placeholder="Codigo del servicio"
                      value="BF006-00004733"
                      className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgCodServicio ? 'is-invalid' : ''}`}
                      readOnly
                      onChange={(e) => { setCodServicio(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Numero de RUC:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      placeholder="Ingrese el numero de RUC"
                      value="20100014476"
                      className={`form-control-depo ${errors.msgRuc ? 'is-invalid' : ''}`}
                      onClick={handleShow}
                      onChange={(e) => { setRuc(e.target.value) }}
                      readOnly>
                    </input>
                    {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRuc}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Razon Social:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      placeholder='Razon Social'
                      value="DEPOSITOS Y VENTAS S.A."
                      className='bg-secondary bg-opacity-10 form-control-depo'
                      disabled
                      onChange={(e) => { setRazonSocial(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Fecha de emisión:</label>
                  <div className="col-sm-8">
                    <input type="datetime-local"
                      value={horaFinServicio}
                      className='form-control-depo'
                      onChange={(e) => { setHoraFinServicio(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">RUC del setCliente:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      placeholder="Ingrese el numero de RUC"
                      className={`form-control-depo ${errors.msgRuc ? 'is-invalid' : ''}`}
                      onClick={handleShow}
                      onChange={(e) => { setRuc(e.target.value) }}
                      >
                    </input>
                    {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRuc}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Razon Social del cliente:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      placeholder='Razon Social'
                      className='bg-secondary bg-opacity-10 form-control-depo'
                      onChange={(e) => { setRazonSocial(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise" >Tipo de Documento:</label>
                  <div className="col-sm-8">
                    <select 
                      className={`form-select-depo${errors.msgTipoServicio ? ' is-invalid' : ''}`}
                      onChange={(e) => { setTipoServicio(e.target.value) }}>
                      <option value="">Factura</option>
                      <option value="Externo">Externo</option>
                      <option value="Interno">Interno</option>
                    </select>
                    {errors.msgTipoServicio && <div className='invalid-feedback'>{errors.msgTipoServicio}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos de la factura</h4>
                <p className="text-muted mb-0">Esta información debe ser ingresada por el operador que realiza el servicio.
                </p>
              </div>
              <div className="card-body">
                <div className="general-label">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Operaciones gratuitas:</label>
                    <div className="col-sm-8">
                    <input className="form-check-input" type="checkbox" value="" />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Exportación de servicios:</label>
                    <div className="col-sm-8">
                    <input className="form-check-input" type="checkbox" value="" />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Ley 31556 para mypes:</label>
                    <div className="col-sm-8">
                    <input className="form-check-input" type="checkbox" value="" />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Costo del servicio:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        name="montoServicio"
                        placeholder='Costo del servicio'
                        value={montoServicio}
                        onChange={(e) => { setMontoServicio(e.target.value) }}
                        className='form-control-depo'
                        autoComplete='off'>
                      </input>
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
                        <option value="">Seleccione</option>
                        <option value="Credito">Credito</option>
                        <option value="Contado">Contado</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Observaciones:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        name="observaciones"
                        placeholder='Observaciones del servicio'
                        value={observaciones}
                        onChange={(e) => { setObservaciones(e.target.value) }}
                        className='form-control-depo'
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
        <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos de la factura</h4>
                <p className="text-muted mb-0">Esta información debe ser ingresada por el operador que realiza el servicio.
                </p>
              </div>
              <div className="card-body">
              <div className="table-responsive">
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
                      
                    </tr>
                  )
                }
              </tbody>
            </table>
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
export default FacturaRegistroComponent