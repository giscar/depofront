import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import HeaderComponent from '../HeaderComponent';
import { buscarCodigoFactura, buscarCodigoServicio, buscarServiciosConcluidosForFacturar, montacargasActivo, nuevaFactura, operadorActivo, servicioSave } from '../../service/FacturaService';
import { useNavigate, useParams } from 'react-router-dom';

const FacturaRegistroComponent = () => {

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
  const [emisor, setEmisor] = useState({})
  const [receptor, setReceptor] = useState('')
  const [fechaEmision, setFechaEmision] = useState('')
  const [servicios, setServicios] = useState([])
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [rucCliente, setRucCliente] = useState('')
  const [razonSocialCliente, setRazonSocialCliente] = useState('')
  const [direccionCliente, setDireccionCliente] = useState('')
  const [nroDocumento, setNroDocumento] = useState('')
  const [codigoFactura, setCodigoFactura] = useState('')
  const [serie, setSerie] = useState('')
  const [tipoDocumento, setTipoDocumento] = useState('')

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const navigator = useNavigate();

  const { ids } = useParams();

  useEffect(() => {
    cargarEmisor();
    buscarServiciosConcluidosForFacturar(ids).then((response) => {
      setServicios(response.data);
      response.data.map((item) => {
        debugger
        setRucCliente(item.cliente[0].ruc);
        setRazonSocialCliente(item.cliente[0].razonSocial);
        setDireccionCliente(item.cliente[0].direccion);
      })
    })
  }, [])

  useEffect(() => {
    buscarCodigoFactura().then((response) => {
      if (tipoDocumento == "Factura") {
        let nroDoc = "";
        let codFactura = 0;
        let serieFactura = "";
        let secCompleta = "";
        codFactura = response.data + 1;
        setCodigoFactura(codFactura);
        secCompleta = codFactura.toString().padStart(7, '0');

        serieFactura = "B006";
        setSerie(serieFactura);
        nroDoc = serieFactura + "-" + secCompleta;
        setNroDocumento(nroDoc)
      }

    })
    console.log(tipoDocumento)
  }, [tipoDocumento])

  const cargarEmisor = () => {
    setRazonSocial("Depositos y Ventas S.A.");
    setRuc("20100014476");
    setDireccion("jr. victor a. belaunde 901 carmen de la legua");
    let curr = new Date();
    curr.setDate(curr.getDate());
    setFechaEmision(curr.toISOString().substring(0, 10));
  }

  const [errors, setErrors] = useState({
    msgNroDocumento: '',
    msgRuc: '',
    msgRazonSocial: '',
    msgDireccion: '',
    msgRucCliente: '',
    msgRazonSocialCliente: '',
    msgDireccionCliente: '',
    msgTipoDocumento: '',
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
    let valid = true;
    const errorCopy = { ...errors }
    const regex = /^[0-9]*$/;

    if (ruc) {
      errorCopy.msgRuc = '';
    } else {
      errorCopy.msgRuc = 'Tiene que ingresar el numero de RUC el emisor';
      valid = false;
    }

    if (razonSocial) {
      errorCopy.msgRazonSocial = '';
    } else {
      errorCopy.msgRazonSocial = 'Tiene que ingresar la razon social del emisor';
      valid = false;
    }

    if (direccion) {
      errorCopy.msgDireccion = '';
    } else {
      errorCopy.msgDireccion = 'Tiene que ingresar la direccion del emisor';
      valid = false;
    }

    if (rucCliente) {
      errorCopy.msgRucCliente = '';
    } else {
      errorCopy.msgRucCliente = 'Tiene que ingresar el numero de RUC del cliente';
      valid = false;
    }

    if (razonSocialCliente) {
      errorCopy.msgRazonSocialCliente = '';
    } else {
      errorCopy.msgRazonSocialCliente = 'Tiene que ingresar la razon social del cliente';
      valid = false;
    }

    if (direccionCliente) {
      errorCopy.msgDireccionCliente = '';
    } else {
      errorCopy.msgDireccionCliente = 'Tiene que ingresar la direccion del cliente';
      valid = false;
    }

    if (tipoDocumento) {
      errorCopy.msgTipoDocumento = '';
    } else {
      errorCopy.msgTipoDocumento = 'Tiene que ingresar el tipo de documento';
      valid = false;
    }

    if (nroDocumento) {
      errorCopy.msgNroDocumento = '';
    } else {
      errorCopy.msgNroDocumento = 'Tiene que ingresar el numero del documento';
      valid = false;
    }

    if (tipoServicio) {
      errorCopy.msgTipoServicio = '';
    } else {
      errorCopy.msgTipoServicio = 'Tiene que ingresar el tipo de servicio';
      valid = false;
    }

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

    setErrors(errorCopy);
    return valid;
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    if (validateForm()) {
      const data = {}
      data.nroDocumento = nroDocumento;
      data.ruc = ruc;
      data.razonSocial = razonSocial?.toUpperCase();
      data.direccion = direccion?.toUpperCase();
      data.rucCliente = rucCliente;
      data.razonSocialCliente = razonSocialCliente?.toUpperCase();
      data.direccionCliente = direccionCliente?.toUpperCase();
      data.fechaEmision = fechaEmision;
      data.tipoDocumento = tipoDocumento;
      data.tipoPago = tipoPago;
      data.moneda = moneda;
      data.codigoFactura = codigoFactura;
      data.serie = serie;
      nuevaFactura(data).then((response) => {
      console.log(response.data)
    }).catch(error => {
      console.error(error)
    });
    limpiar()
    notify()
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const limpiar = () => {
    setRuc('')
    setRazonSocial('')
    setDireccion('')
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
                <h4 className="card-title">Datos del emisor y cliente</h4>
                <p className="text-muted mb-0">Las hojas de servicio a facturar provienen del modulo de servicios de operaciones.</p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Numero de RUC:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      placeholder="Ingrese el numero de RUC"
                      value={ruc}
                      className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgRuc ? 'is-invalid' : ''}`}
                      onClick={handleShow}
                      onChange={(e) => { setRuc(e.target.value) }}
                      disabled>
                    </input>
                    {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRuc}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Razon Social:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      placeholder='Razon Social'
                      value={razonSocial}
                      className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgRazonSocial ? 'is-invalid' : ''}`}
                      disabled
                      onChange={(e) => { setRazonSocial(e.target.value) }}>
                    </input>
                    {errors.msgRazonSocial && <div className='invalid-feedback'>{errors.msgRazonSocial}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Dirección:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      placeholder='Razon Social'
                      value={direccion}
                      className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgDireccion ? 'is-invalid' : ''}`}
                      disabled
                      onChange={(e) => { setDireccion(e.target.value) }}>
                    </input>
                    {errors.msgDireccion && <div className='invalid-feedback'>{errors.msgDireccion}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">RUC del Cliente:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      placeholder="Ingrese el numero de RUC"
                      className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgRucCliente ? 'is-invalid' : ''}`}
                      value={rucCliente}
                      onChange={(e) => { setRucCliente(e.target.value) }}
                      disabled
                    >
                    </input>
                    {errors.msgRucCliente && <div className='invalid-feedback'>{errors.msgRucCliente}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Razon Social del cliente:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      value={razonSocialCliente}
                      placeholder='Razon Social'
                      className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgRazonSocialCliente ? 'is-invalid' : ''}`}
                      onChange={(e) => { setRazonSocialCliente(e.target.value) }}
                      disabled>
                    </input>
                    {errors.msgRazonSocialCliente && <div className='invalid-feedback'>{errors.msgRazonSocialCliente}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Dirección cliente:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      value={direccionCliente}
                      placeholder='Direccion'
                      className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgDireccionCliente ? 'is-invalid' : ''}`}
                      onChange={(e) => { setDireccionCliente(e.target.value) }}
                      disabled>
                    </input>
                    {errors.msgDireccionCliente && <div className='invalid-feedback'>{errors.msgDireccionCliente}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos del documento</h4>
                <p className="text-muted mb-0">Esta información debe ser ingresada por el operador que realiza el servicio.
                </p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Tipo de Documento:</label>
                  <div className="col-sm-8">
                    <select value={tipoDocumento}
                      className={`form-select${errors.msgTipoDocumento ? ' is-invalid' : ''}`}
                      onChange={(e) => { setTipoDocumento(e.target.value) }}>
                      <option value="">Seleccione</option>
                      <option value="Factura">Factura</option>
                      <option value="Boleta">Boleta</option>
                    </select>
                    {errors.msgTipoDocumento && <div className='invalid-feedback'>{errors.msgTipoDocumento}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Nro de documento:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      placeholder="Codigo del servicio"
                      value={nroDocumento}
                      className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgNroDocumento ? 'is-invalid' : ''}`}
                      readOnly
                      onChange={(e) => { setNroDocumento(e.target.value) }}>
                    </input>
                    {errors.msgNroDocumento && <div className='invalid-feedback'>{errors.msgNroDocumento}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise">Fecha de emisión:</label>
                  <div className="col-sm-8">
                    <input type="date"
                      value={fechaEmision}
                      className='form-control-depo'
                      defaultValue={fechaEmision}
                      onChange={(e) => { setFechaEmision(e.target.value) }}>
                    </input>
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
                <div>
                  <button className='btn btn-primary' onClick={handleSubmit}>Registrar factura</button>
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
                          <th className='td-th-size-depo'>Operador</th>
                          <th className='td-th-size-depo'>Montacarga</th>
                          <th className='td-th-size-depo'>Horas trabajadas</th>
                          <th className='td-th-size-depo'>Monto del servicio</th>
                          <th className='td-th-size-depo'>Moneda</th>
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
                              <td className='td-th-size-depo'>{servicio.operador[0]?.nombre+' '+servicio.operador[0]?.apellidoPat+' '+servicio.operador[0]?.apellidoMat}</td>
                              <td className='td-th-size-depo'>{servicio.montacarga[0]?.modelo+'-'+servicio.montacarga[0]?.codigo}</td>
                              <td className='td-th-size-depo'>{servicio.totalHoras}</td>
                              <td className='td-th-size-depo'>{servicio.montoServicio}</td>
                              <td className='td-th-size-depo'>{servicio.moneda}</td>
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