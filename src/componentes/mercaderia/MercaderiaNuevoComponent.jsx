import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import { toast } from 'react-toastify';
import Select from 'react-select'
import HeaderComponent from '../HeaderComponent';
import { buscarCodigoIngreso, catalogoByTipo, ingresoSave } from '../../service/FacturaService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const MercaderiaNuevoComponent = () => {

  const [cliente, setCliente] = useState('')
  const [clienteAgencia, setClienteAgencia] = useState('')
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [rucAgencia, setRucAgencia] = useState('')
  const [razonSocialAgencia, setRazonSocialAgencia] = useState('')
  const [direccionAgencia, setDireccionAgencia] = useState('')
  const [codIngreso, setCodIngreso] = useState('')
  const [numeroIngreso, setNumeroIngreso] = useState('')
  const [codigoDua, setCodigoDua] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tipoMercaderia, setTipoMercaderia] = useState('')
  const [pedidoDeposito, setPedidoDeposito] = useState('')
  const [almacen, setAlmacen] = useState('')
  const [catalogoAlmacen, setCatalogoAlmacen] = useState([])
  const [guia, setGuia] = useState('')
  const [horaTermino, setHoraTermino] = useState('')
  const [indFacturarFijo, setIndFacturarFijo] = useState('')
  const [nroContenedor, setNroContenedor] = useState('')
  const [dimensionContenedor, setDimensionContenedor] = useState('')
  const [observaciones, setObservaciones] = useState('')

  const navigator = useNavigate();

  const access = "R010"
  let ingressADM = false;

  const showLoading = () => {
    Swal.fire({
        title: 'Cargando',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: ()=>{
            Swal.showLoading();
        }
    })
  }

  const closeLoading = () => {
    Swal.close()
  }

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingressADM = true;
    });
  })

  const irMercaderia = (id) => {
    navigator(`/mercaderiaEdit/${id}`)
  }

  const [errors, setErrors] = useState({
    msgCodIngreso: '',
    msgRuc: '',
    msgRucAgencia: '',
    msgCodigoDua: '',
    msgCodigoProducto: '',
    msgDescripcion: '',
    msgTipoServicio: '',
    msgPedidoDeposito: '',
    msgSerie: '',
    msgAlmacen: '',
    msgIndFacturaFijo: '',
    
  })

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  })

  const handleAlmacen = () => {
      showLoading()
      catalogoByTipo("2").then((response) => {
        response.data.map(p => {
          p.label = p.descripcion;
          p.value = p.codigo;
        })
        setCatalogoAlmacen(response.data)
      })
      closeLoading()
    }

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors }
    const regex = /^[0-9]*$/;

    errorCopy.msgPedidoDeposito = '';
    errorCopy.msgCodigoDua = '';

    if (numeroIngreso) {
      errorCopy.msgNumeroIngreso = '';
    } else {
      errorCopy.msgNumeroIngreso = 'El numero de ingreso aun no ha sido generado por el sistema';
      valid = false;
    }

    if (tipoMercaderia) {
      errorCopy.msgTipoMercaderia = '';
    } else {
      errorCopy.msgTipoMercaderia = 'Tiene que ingresar el tipo de mercaderia simple o nacionalizada';
      valid = false;
    }

    if (tipoMercaderia == "Nacionalizada") {
      /*if (pedidoDeposito) {
        errorCopy.msgPedidoDeposito = '';
      } else {
        errorCopy.msgPedidoDeposito = 'Tiene que numero de Pedido de Deposito';
        valid = false;
      }*/

      if (codigoDua) {
        errorCopy.msgCodigoDua = '';
      } else {
        errorCopy.msgCodigoDua = 'Tiene que ingresar el numero de DAM o DUA';
        valid = false;
      }
    }

    if (ruc) {
      errorCopy.msgRuc = '';
    } else {
      errorCopy.msgRuc = 'Tiene que ingresar el numero de RUC del dueño de la mercaderia';
      valid = false;
    }

    if (tipoMercaderia == "Nacionalizada") {
      if (rucAgencia) {
        errorCopy.msgRucAgencia = '';
      } else {
        errorCopy.msgRucAgencia = 'Tiene que ingresar el numero de RUC de la agencia de aduana';
        valid = false;
      }
    }

    if (descripcion) {
      errorCopy.msgDescripcion = '';
    } else {
      errorCopy.msgDescripcion = 'Tiene que ingresar la descripcion del ingreso';
      valid = false;
    }

    if (almacen) {
      errorCopy.msgAlmacen = '';
    } else {
      errorCopy.msgAlmacen = 'Tiene que ingresar el almacen';
      valid = false;
    }

    if (indFacturarFijo) {
      errorCopy.msgIndFacturaFijo = '';
    } else {
      errorCopy.msgIndFacturaFijo = 'Tiene que ingresar si se va a facturar o es fijo';
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      showLoading()
      const data = {}
      data.codIngreso = codIngreso;
      data.numeroIngreso = numeroIngreso;
      data.ruc = ruc;
      data.razonSocial = razonSocial?.toUpperCase();
      data.direccion = direccion?.toUpperCase();
      data.rucAgencia = rucAgencia;
      data.razonSocialAgencia = razonSocialAgencia?.toUpperCase();
      data.direccionAgencia = direccionAgencia?.toUpperCase();
      data.codigoDua = codigoDua;
      data.descripcion = descripcion?.toUpperCase();
      data.estado = "1";
      data.estadoRegistro = "Sin mercaderia";
      data.usuarioRegistro = initialLogin.documento;
      data.tipoMercaderia = tipoMercaderia;
      data.pedidoDeposito = pedidoDeposito;
      data.almacen = almacen;
      data.guia = guia;
      data.horaTermino = horaTermino;
      data.indFacturarFijo = indFacturarFijo;
      data.nroContenedor = nroContenedor;
      data.dimensionContenedor = dimensionContenedor;
      data.observaciones = observaciones;
      ingresoSave(data).then((response) => {
        closeLoading()
        irMercaderia(response.data.id)
      }).catch(error => {
        console.error(error)
      })
      notify()
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAgencia, setShowAgencia] = useState(false);
  const handleCloseAgencia = () => setShowAgencia(false);
  const handleShowAgencia = () => setShowAgencia(true);

  useEffect(() => {
    handleCodIngreso()
    handleAlmacen()
  }, [])

  useEffect(() => {
    setCodigoDua("")
    setPedidoDeposito("")
  }, [tipoMercaderia])

  const handleCodIngreso = () => {
    buscarCodigoIngreso().then((response) => {
      setCodIngreso(response.data + 1)
      setNumeroIngreso("ING" + (response.data + 1).toString().padStart(6, '0'));
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    setRuc(cliente?.ruc)
    setRazonSocial(cliente?.razonSocial)
    setDireccion(cliente?.direccion)
  }, [cliente])

  useEffect(() => {
    setRucAgencia(clienteAgencia?.ruc)
    setRazonSocialAgencia(clienteAgencia?.razonSocial)
    setDireccionAgencia(clienteAgencia?.direccion)
  }, [clienteAgencia])


  return (
    <>
      {initialLogin.documento && <HeaderComponent />}
      {ingressADM &&
        <div className='container-fluid'>
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Almacen</a></li>
                    <li className="breadcrumb-item active">Nuevo Ingreso</li>
                    <p className="text-muted mb-0"><span style={{ color: 'red' }}>(*)</span> :Datos obligatorias que se debe ingresar</p>
                  </ol>
                </div>
                <h4 className="page-title">Registrar Ingreso</h4>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Datos Iniciales del Ingreso</h4>
                  <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de almacenes.</p>
                </div>
                <div className="card-body">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise"><span style={{ color: 'red' }}>(*)</span>Numero de ingreso:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Numero de ingreso"
                        value={numeroIngreso}
                        className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgNumeroIngreso ? 'is-invalid' : ''}`}
                        readOnly
                        onChange={(e) => { setNumeroIngreso(e.target.value) }}>
                      </input>
                      {errors.msgNumeroIngreso && <div className='invalid-feedback'>{errors.msgNumeroIngreso}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise" ><span style={{ color: 'red' }}>(*)</span>Tipo de mercaderia:</label>
                    <div className="col-sm-8">
                      <select value={tipoMercaderia}
                        className={`form-select-depo${errors.msgTipoMercaderia ? ' is-invalid' : ''}`}
                        onChange={(e) => { setTipoMercaderia(e.target.value) }}>
                        <option value="">Seleccione</option>
                        <option value="Simple">Simple</option>
                        <option value="Nacionalizada">Nacionalizada</option>
                      </select>
                      {errors.msgTipoMercaderia && <div className='invalid-feedback'>{errors.msgTipoMercaderia}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Pedido de deposito:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder='Numero de Pedido de Deposito'
                        value={pedidoDeposito}
                        onChange={(e) => { setPedidoDeposito(e.target.value) }}
                        className={` form-control-depo ${tipoMercaderia == "Simple" ? "bg-secondary bg-opacity-10" : ""} ${errors.msgPedidoDeposito ? ' is-invalid' : ''}`}
                        disabled={tipoMercaderia == "Simple" ? true : false}
                        autoComplete='off'>
                      </input>
                      {errors.msgPedidoDeposito && <div className='invalid-feedback'>{errors.msgPedidoDeposito}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero de DAM / DUA:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder='Numero de DAM / DUA'
                        value={codigoDua}
                        onChange={(e) => { setCodigoDua(e.target.value) }}
                        className={`form-control-depo ${tipoMercaderia == "Simple" ? "bg-secondary bg-opacity-10" : ""} ${errors.msgCodigoDua ? ' is-invalid' : ''}`}
                        disabled={tipoMercaderia == "Simple" ? true : false}
                        autoComplete='off'>
                      </input>
                      {errors.msgCodigoDua && <div className='invalid-feedback'>{errors.msgCodigoDua}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise"><span style={{ color: 'red' }}>(*)</span>RUC del dueño:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder="Ingrese el numero de RUC"
                        value={ruc}
                        className={`form-control-depo ${errors.msgRuc ? 'is-invalid' : ''}`}
                        onClick={handleShow}
                        onChange={(e) => { setRuc(e.target.value) }}
                        readOnly>
                      </input>
                      {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRuc}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Razon Social del dueño:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Razon Social'
                        value={razonSocial}
                        className='bg-secondary bg-opacity-10 form-control-depo'
                        disabled
                        onChange={(e) => { setRazonSocial(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Dirección del dueño:</label>
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
                    <label className="col-sm-4 col-form-label-zise"><span style={{ color: 'red' }}>(*)</span>RUC de la Agencia:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder="Ingrese el numero de RUC de la agencia"
                        value={rucAgencia}
                        className={`form-control-depo ${errors.msgRucAgencia ? 'is-invalid' : ''}`}
                        onClick={handleShowAgencia}
                        onChange={(e) => { setRucAgencia(e.target.value) }}
                        readOnly>
                      </input>
                      {errors.msgRucAgencia && <div className='invalid-feedback'>{errors.msgRucAgencia}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Razon Social de la Agencia:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Razon Social de la Agencia'
                        value={razonSocialAgencia}
                        className='bg-secondary bg-opacity-10 form-control-depo'
                        disabled
                        onChange={(e) => { setRazonSocialAgencia(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Dirección de la Agencia:</label>
                    <div className="col-sm-8">
                      <input type='text'
                        placeholder='Dirección de la Agencia'
                        value={direccionAgencia}
                        className='bg-secondary bg-opacity-10 form-control-depo'
                        disabled
                        onChange={(e) => { setDireccionAgencia(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise"><span style={{ color: 'red' }}>(*)</span>Descripcion:</label>
                    <div className="col-sm-8">
                      <textarea rows={3} cols={3}
                        placeholder='Descripcion'
                        value={descripcion}
                        onChange={(e) => { setDescripcion(e.target.value) }}
                        className={`form-control-depo ${errors.msgDescripcion ? 'is-invalid' : ''}`}
                        autoComplete='off'>
                      </textarea>
                      {errors.msgDescripcion && <div className='invalid-feedback'>{errors.msgDescripcion}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise" ><span style={{ color: 'red' }}>(*)</span>Almacen:</label>
                      <div className="col-sm-8">
                        <Select value={almacen}
                          onChange={setAlmacen}
                          options={catalogoAlmacen}
                          className={`form-select-depo${errors.msgAlmacen ? ' is-invalid' : ''}`}
                        />
                        {errors.msgAlmacen && <div className='invalid-feedback'>{errors.msgAlmacen}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Guia:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Ingrese Guia'
                        value={guia}
                        onChange={(e) => { setGuia(e.target.value) }}
                        className={`form-control-depo`}
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Hora de termino:</label>
                      <div className="col-sm-8">
                        <input type="datetime-local"
                          value={horaTermino}
                          className={`form-control-depo`}
                          onChange={(e) => { setHoraTermino(e.target.value) }}>
                        </input>
                      </div>
                    </div>

                    <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise" ><span style={{ color: 'red' }}>(*)</span>Indicador Factura / Fijo:</label>
                    <div className="col-sm-8">
                      <select value={indFacturarFijo}
                        className={`form-select-depo${errors.msgIndFacturaFijo ? ' is-invalid' : ''}`}
                        onChange={(e) => { setIndFacturarFijo(e.target.value) }}>
                        <option value="">Seleccione</option>
                        <option value="Factura">Factura</option>
                        <option value="Fijo">Fijo</option>
                      </select>
                      {errors.msgIndFacturaFijo && <div className='invalid-feedback'>{errors.msgIndFacturaFijo}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Nro Contenedor:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Ingrese el numero del contenedor'
                        value={nroContenedor}
                        onChange={(e) => { setNroContenedor(e.target.value) }}
                        className={`form-control-depo`}
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Dimensiones del contenedor:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Ingrese las dimensiones del contenedor'
                        value={dimensionContenedor}
                        onChange={(e) => { setDimensionContenedor(e.target.value) }}
                        className={`form-control-depo`}
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Observaciones:</label>
                    <div className="col-sm-8">
                      <textarea rows={3} cols={3}
                        placeholder='Ingrese observaciones'
                        value={observaciones}
                        onChange={(e) => { setObservaciones(e.target.value) }}
                        className={`form-control-depo`}
                        autoComplete='off'>
                      </textarea>
                    </div>
                  </div>

                  <button type="button" className="btn-depo btn-primary-depo" onClick={handleSubmit}>Guardar</button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">

            </div>
          </div>
        </div>
      }
      {!ingressADM &&
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Almacen</a></li>
                    <li className="breadcrumb-item active">Nuevo Ingreso</li>
                  </ol>
                </div>
                <h4 className="page-title"></h4>
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
      <BusquedaClienteComponent show={showAgencia} handleClose={handleCloseAgencia} setCliente={setClienteAgencia} />
    </>
  )
}
export default MercaderiaNuevoComponent