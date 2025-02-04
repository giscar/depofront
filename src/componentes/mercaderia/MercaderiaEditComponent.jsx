import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import { toast } from 'react-toastify';
import HeaderComponent from '../HeaderComponent';
import { buscarCodigoMercaderia, catalogoByTipo, ingresoById, ingresoEdit, mercaderiaById, mercaderiaByIngreso, mercaderiaSave, salidaSave } from '../../service/FacturaService';
import { useNavigate, useParams } from 'react-router-dom';
import MercaderiaSalidaComponent from './MercaderiaSalidaComponent';

const MercaderiaEditComponent = () => {

  const { id } = useParams();

  const [cliente, setCliente] = useState('')
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [codIngreso, setCodIngreso] = useState('')
  const [numeroIngreso, setNumeroIngreso] = useState('')
  const [codigoDua, setCodigoDua] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [ingreso, setIngreso] = useState('')

  const [numeroMercaderia, setNumeroMercaderia] = useState('')
  const [codMercaderia, setCodMercaderia] = useState('')  
  const [mercaderia, setMercaderia] = useState('')
  const [mercaderias, setMercaderias] = useState([])
  const [catalogoUnidadMedida, setCatalogoUnidadMedida] = useState([])
  const [catalogoAlmacen, setCatalogoAlmacen] = useState([])
  const [productoCodigo, setProductoCodigo] = useState('')
  const [descripcionProducto, setDescripcionProducto] = useState('')
  const [unidadMedida, setUnidadMedida] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [fechaIngreso, setFechaIngreso] = useState('')
  const [codigoAlmacen, setCodigoAlmacen] = useState('')
  const [tipoMercaderia, setTipoMercaderia] = useState('')
  const [pedidoDeposito, setPedidoDeposito] = useState('')
  const [serie, setSerie] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [numeroMercaderiaSeleccionada, setNumeroMercaderiaSeleccionada] = useState('')

  const [indSalida, setIndSalida] = useState(false)
  const [cantidadSalida, setCantidadSalida] = useState('')
  const [descripcionSalida, setDescripcionSalida] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  
  
  const navigator = useNavigate();

  const access = "R010"
  let ingressADM = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingressADM = true;
    });
  })

  const handleCodMercaderia = () => {
    buscarCodigoMercaderia().then((response) => {
      setCodMercaderia(response.data + 1)
      setNumeroMercaderia("MER" + (response.data + 1).toString().padStart(6, '0'));
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    handleCodMercaderia();
  }, [])

  useEffect(() => {
    if (id) {
      ingresoById(id).then((response) => {
        cargarIngreso(response.data);
        cargarMercaderias(id)
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const cargarMercaderias = (idIngreso) => {
    mercaderiaByIngreso(idIngreso).then(response => {
      setMercaderias(response.data)
    });
  }

  const cargarIngreso = (data) => {
    setNumeroIngreso(data.numeroIngreso)
    setCodIngreso(data.codIngreso)
    setCodigoDua(data.codigoDua)
    setRuc(data.ruc)
    setPedidoDeposito(data.pedidoDeposito)
    setRazonSocial(data.razonSocial)
    setDireccion(data.direccion)
    setDescripcion(data.descripcion)
    setPedidoDeposito(data.pedidoDeposito)
    setTipoMercaderia(data.tipoMercaderia)
    setTimeout(() => {
      setIngreso(data)
    }, 1000);
  }

  useEffect(() => {
      if (ingreso) {
        setCodigoDua("")
        setPedidoDeposito("")
        validateForm()
      }
    
  }, [tipoMercaderia])

  const [errors, setErrors] = useState({
    msgCodIngreso: '',
    msgRuc: '',
    msgDua: '',
    msgCodigoProducto: '',
    msgDescripcion: '',
    msgUnidadMedida: '',
    msgFechaIngreso: '',
    msgCodigoAlmacen: '',
    msgTipoMercaderia: '',
    msgPedidoDeposito: '',
    msgCantidad: '',
    msgSerie: '',
    msgDescripcionProducto: '',
    msgNumeroMercaderia: '',
    msgCantidadSalida: '',
    msgFechaSalida: '',
    msgDescripcionSalida: '',
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

    errorCopy.msgPedidoDeposito = '';
    errorCopy.msgCodigoDua = '';

    if (codIngreso) {
      errorCopy.msgCodIngreso = '';
      if (!regex.test(codIngreso)) {
        errorCopy.msgCodIngreso = 'El codigo de ingreso debe ser un numero';
        valid = false;
      }
    } else {
      errorCopy.msgCodIngreso = 'Tiene que ingresar el numero de ingreso';
      valid = false;
    }

    if (tipoMercaderia) {
      errorCopy.msgTipoMercaderia = '';
    } else {
      errorCopy.msgTipoMercaderia = 'Tiene que ingresar el tipo de mercaderia simple o nacionalizada';
      valid = false;
    }

    if (tipoMercaderia == "Nacionalizada") {
      if (pedidoDeposito) {
        errorCopy.msgPedidoDeposito = '';
      } else {
        errorCopy.msgPedidoDeposito = 'Tiene que numero de Pedido de Deposito';
        valid = false;
      }

      if (codigoDua) {
        errorCopy.msgCodigoDua = '';
      } else {
        errorCopy.msgCodigoDua = 'Tiene que ingresar el numero de DUA';
        valid = false;
      }
    }

    if (ruc) {
      errorCopy.msgRuc = '';
    } else {
      errorCopy.msgRuc = 'Tiene que ingresar el numero de RUC';
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }


  const validateMercaderia = () => {
    let valid = true;
    const errorCopy = { ...errors }
    const regex = /^[0-9]*$/;

    if (productoCodigo) {
      errorCopy.msgCodigoProducto = '';
    } else {
      errorCopy.msgCodigoProducto = 'Tiene que ingresar el codigo del producto';
      valid = false;
    }

    if (numeroMercaderia) {
      errorCopy.msgNumeroMercaderia = '';
    } else {
      errorCopy.msgNumeroMercaderia = 'No se ha generado el numero del producto';
      valid = false;
    }

    if (serie) {
      errorCopy.msgSerie = '';
    } else {
      errorCopy.msgSerie = 'Tiene que ingresar el numero de serie o correlativo de la mercaderia';
      valid = false;
    }

    if (descripcionProducto) {
      errorCopy.msgDescripcionProducto = '';
    } else {
      errorCopy.msgDescripcionProducto = 'Tiene que ingresar la descripcion del producto';
      valid = false;
    }

    if (unidadMedida) {
      errorCopy.msgUnidadMedida = '';
    } else {
      errorCopy.msgUnidadMedida = 'Tiene que ingresar la unidad de medida';
      valid = false;
    }

    if (cantidad) {
      errorCopy.msgCantidad = '';
    } else {
      errorCopy.msgCantidad = 'Tiene que ingresar la cantidad de la mercancia';
      valid = false;
    }

    if (fechaIngreso) {
      errorCopy.msgFechaIngreso = '';
    } else {
      errorCopy.msgFechaIngreso = 'Tiene que ingresar la fecha de ingreso de la mercaderia';
      valid = false;
    }

    if (codigoAlmacen) {
      errorCopy.msgCodigoAlmacen = '';
    } else {
      errorCopy.msgCodigoAlmacen = 'Tiene que ingresar el almacen de destino';
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }

  const agregarMercaderia = (e) => {
    e.preventDefault();
    if (validateMercaderia()) {
      const data = {}
      data.idIngreso = id;
      data.productoCodigo = productoCodigo;
      data.descripcionProducto = descripcionProducto?.toUpperCase();
      data.unidadMedida = unidadMedida;
      data.cantidad = cantidad;
      data.fechaIngreso = fechaIngreso;
      data.codigoAlmacen = codigoAlmacen;
      data.observaciones = observaciones;
      data.serie = serie;
      data.numeroMercaderia = numeroMercaderia;
      data.codMercaderia = codMercaderia;
      mercaderiaSave(data).then(response => {
        console.log(response)
        cargarMercaderias(id)
      }).catch(error => {
        console.log(error);
      })
      limpiarMercaderia()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {}
      data.codIngreso = codIngreso;
      data.numeroIngreso = numeroIngreso;
      data.ruc = ruc;
      data.razonSocial = razonSocial?.toUpperCase();
      data.direccion = direccion?.toUpperCase();
      data.codigoDua = codigoDua;
      data.pedidoDeposito = pedidoDeposito;
      data.descripcion = descripcion?.toUpperCase();
      data.tipoMercaderia = tipoMercaderia;
      data.estado = "1";
      data.estadoRegistro = "Proceso";
      data.usuarioRegistro = initialLogin.documento;
      data.id = id;
      ingresoEdit(data).then((response) => {
      }).catch(error => {
        console.error(error)
      });
      notify()
    }
  }

  const irMercaderia = (id) => {
    navigator(`/mercaderiaEdit/${id}`)
  }


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSalida, setShowSalida] = useState(false);
  const handleCloseSalida = () => setShowSalida(false);
  const handleShowSalida = (numSalida) => {
    setNumeroMercaderiaSeleccionada(numSalida)
    setShowSalida(true);
  }

  useEffect(() => {
    handleUnidadMedida();
    handleAlmacen();
  }, [])

  const handleUnidadMedida = () => {
    catalogoByTipo("1").then((response) => {
      setCatalogoUnidadMedida(response.data)
    })
  }

  const handleAlmacen = () => {
    catalogoByTipo("2").then((response) => {
      setCatalogoAlmacen(response.data)
    })
  }

  useEffect(() => {
    setRuc(cliente?.ruc)
    setRazonSocial(cliente?.razonSocial)
    setDireccion(cliente?.direccion)
  }, [cliente])

  const limpiar = () => {
    setCodIngreso('')
    setNumeroIngreso('')
    setCodigoDua('')
    setProductoCodigo('')
    setDescripcion('')
    setObservaciones('');
  };

  const limpiarMercaderia = () => {
    setUnidadMedida('')
    setCantidad('')
    setRuc('')
    setRazonSocial('')
    setDireccion('')
    setCliente([])
    setFechaIngreso('')
    setCodigoAlmacen('')
    setProductoCodigo('')
    setDescripcionProducto('')
    setObservaciones('')
    setSerie('')
  }

  const seleccionarSalida = (idMercaderia) => {
    console.log(idMercaderia)
    setIndSalida(true)
    mercaderiaById(idMercaderia).then(response =>{
      cargarMercaderia(response.data)
      setMercaderia(response.data)
    }).catch(error => {
      console.error(error)
    });
  }

  const registrarSalida = (e) => {
    e.preventDefault();
    if (validateSalida()) {
      const data = {}
      data.idMercaderia = mercaderia.id;
      data.numeroMercaderia = mercaderia.numeroMercaderia;
      data.cantidadSalida = cantidadSalida;
      data.saldoRestante = (parseInt(mercaderia.cantidad - parseInt(cantidadSalida)))
      data.descripcionSalida = descripcionSalida;
      data.fechaSalida = fechaSalida;
      data.usuarioRegistro = initialLogin.documento;
      salidaSave(data).then(response => {
        limpiarSalida()
        irMercaderia(id) 
        notify()
      }).catch(error => {
        console.error(error)
      });
    }
  }

  const limpiarSalida = () => {
    setIndSalida(false);
    setNumeroMercaderia('')
    setCodMercaderia('')
    setMercaderia('')
    setPedidoDeposito('')
    setCodigoAlmacen('')
    setCodigoDua('')
    setSerie('')
    setDescripcionProducto('')
    setUnidadMedida('')
    setCantidad('')
    setFechaIngreso('')
    setCodigoAlmacen('')
    setObservaciones('')
    setCantidadSalida('')
    setFechaSalida('')
    setDescripcionSalida('')
    setProductoCodigo('')

  }

  const validateSalida = () => {
    let valid = true;
    const errorCopy = { ...errors }
    const regex = /^[0-9]*$/;

    if (cantidadSalida) {
      errorCopy.msgCantidadSalida = '';
      if (parseInt(cantidadSalida) > parseInt(cantidad) ) {
        errorCopy.msgCantidadSalida = 'La cantidad de mercaderia que sale no puede ser mayor a la que se encuentra en el almacen';
        valid = false;
      } else {
        errorCopy.msgCantidadSalida = '';
      }
    } else {
      errorCopy.msgCantidadSalida = 'Tiene que ingresar la cantidad de salida de mercaderia';
      valid = false;
    }

    if (fechaSalida) {
      errorCopy.msgFechaSalida = '';
    } else {
      errorCopy.msgFechaSalida = 'Tiene que ingresar la fecha de salida de la mercaderia';
      valid = false;
    }

    if (descripcionSalida) {
      errorCopy.msgDescripcionSalida = '';
    } else {
      errorCopy.msgDescripcionSalida = 'Tiene que ingresar la descripcion de la mercaderia que esta saliendo';
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }

  const cargarMercaderia = (data) => {
    setCantidad(data.cantidad)
    setProductoCodigo(data.productoCodigo)
    setSerie(data.serie)
    setDescripcionProducto(data.descripcionProducto)
    setUnidadMedida(data.unidadMedida)
    setCodigoAlmacen(data.codigoAlmacen)
    setFechaIngreso(data.fechaIngreso.substring(0, 10))
    setObservaciones(data.observaciones)
    setMercaderia(data)
  }

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
                    <label className="col-sm-4 col-form-label-zise">Codigo del ingreso:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={numeroIngreso}
                        className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgNumeroIngreso ? 'is-invalid' : ''}`}
                        readOnly
                        onChange={(e) => { setNumeroIngreso(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise" >Tipo de mercaderia:</label>
                    <div className="col-sm-8">
                      <select value={tipoMercaderia}
                        className={`form-select-depo ${ errors.msgTipoMercaderia ? ' is-invalid' : ''} ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        onChange={(e) => { setTipoMercaderia(e.target.value) }}
                        disabled={indSalida}>
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
                        className={`form-control-depo ${tipoMercaderia == "Simple" ? "bg-secondary bg-opacity-10" : ""} ${errors.msgPedidoDeposito ? ' is-invalid' : ''} ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        disabled={tipoMercaderia == "Simple" ? true : false}
                        readOnly={indSalida}
                        autoComplete='off'>
                      </input>
                      {errors.msgPedidoDeposito && <div className='invalid-feedback'>{errors.msgPedidoDeposito}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero de DUA:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder='Numero de DUA'
                        value={codigoDua}
                        onChange={(e) => { setCodigoDua(e.target.value) }}
                        className={`form-control-depo ${tipoMercaderia == "Simple" ? "bg-secondary bg-opacity-10" : ""} ${errors.msgCodigoDua ? ' is-invalid' : ''} ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        disabled={tipoMercaderia == "Simple" ? true : false}
                        readOnly={indSalida}
                        autoComplete='off'>
                      </input>
                      {errors.msgCodigoDua && <div className='invalid-feedback'>{errors.msgCodigoDua}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero de RUC:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder="Ingrese el numero de RUC"
                        value={ruc}
                        className={`form-control-depo ${errors.msgRuc ? 'is-invalid' : ''} ${errors.msgCodigoDua ? ' is-invalid' : ''} ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        onClick={handleShow}
                        onChange={(e) => { setRuc(e.target.value) }}
                        readOnly
                        disabled={indSalida } >
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
                    <label className="col-sm-4 col-form-label-zise">Descripcion:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Descripcion'
                        value={descripcion}
                        onChange={(e) => { setDescripcion(e.target.value) }}
                        className={`form-control-depo ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        autoComplete='off'
                        disabled = {indSalida}>
                      </input>
                    </div>
                  </div>
                  <button type="button" className="btn-depo btn-primary-depo" onClick={handleSubmit}>Guardar</button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Datos de la mercaderia a ejecutar</h4>
                  <p className="text-muted mb-0">Esta información debe ser ingresada por que hace los registros de despachos de mercaderia.
                  </p>
                </div>
                <div className="card-body">
                  <div className="general-label">

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero de mercaderia:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Numero de mercaderia"
                        value={numeroMercaderia}
                        className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgNumeroMercaderia ? 'is-invalid' : ''}`}
                        readOnly
                        onChange={(e) => { setNumeroIngreso(e.target.value) }}>
                      </input>
                      {errors.msgNumeroMercaderia && <div className='invalid-feedback'>{errors.msgNumeroMercaderia}</div>}
                    </div>
                  </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Codigo del producto:</label>
                      <div className="col-sm-8">
                        <input type="text"
                          placeholder='Codigo del producto'
                          value={productoCodigo}
                          onChange={(e) => { setProductoCodigo(e.target.value) }}
                          className={`form-control-depo ${errors.msgCodigoProducto ? 'is-invalid' : ''} ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          autoComplete='off'
                          disabled={indSalida}>
                        </input>
                        {errors.msgCodigoProducto && <div className='invalid-feedback'>{errors.msgCodigoProducto}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Serie:</label>
                      <div className="col-sm-8">
                        <input type="text"
                          placeholder='Numero de serie o correlativo'
                          value={serie}
                          onChange={(e) => { setSerie(e.target.value) }}
                          className={`form-control-depo ${errors.msgSerie ? 'is-invalid' : ''} ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          autoComplete='off'
                          disabled = {indSalida}>
                        </input>
                        {errors.msgSerie && <div className='invalid-feedback'>{errors.msgSerie}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Descripcion del producto:</label>
                      <div className="col-sm-8">
                        <input type="text"
                          placeholder='Descripcion del producto'
                          value={descripcionProducto}
                          onChange={(e) => { setDescripcionProducto(e.target.value) }}
                          className={`form-control-depo ${errors.msgDescripcionProducto ? 'is-invalid' : ''} ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          autoComplete='off'
                          disabled = {indSalida}>
                        </input>
                        {errors.msgDescripcionProducto && <div className='invalid-feedback'>{errors.msgDescripcionProducto}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise" >Unidad de medida:</label>
                      <div className="col-sm-8">
                        <select value={unidadMedida}
                          className={`form-select-depo${errors.msgUnidadMedida ? ' is-invalid' : ''} ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          onChange={(e) => { setUnidadMedida(e.target.value) }}
                          disabled={indSalida}>
                          <option value="">Seleccione</option>
                          {
                            catalogoUnidadMedida.map(um =>
                              <option key={um.id} value={um.codigo}>{um.descripcion}</option>
                            )
                          }
                        </select>
                        {errors.msgUnidadMedida && <div className='invalid-feedback'>{errors.msgUnidadMedida}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Cantidad:</label>
                      <div className="col-sm-8">
                        <input type="number"
                          placeholder='Cantidad de productos'
                          value={cantidad}
                          onChange={(e) => { setCantidad(e.target.value) }}
                          className={`form-control-depo ${errors.msgCantidad ? 'is-invalid' : ''} ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          autoComplete='off'
                          disabled={indSalida}>
                        </input>
                        {errors.msgCantidad && <div className='invalid-feedback'>{errors.msgCantidad}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Fecha de Ingreso:</label>
                      <div className="col-sm-8">
                        <input type="date"
                          value={fechaIngreso}
                          className={`form-control-depo ${errors.msgFechaIngreso ? 'is-invalid' : ''} ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          onChange={(e) => { setFechaIngreso(e.target.value) }}
                          disabled={indSalida}>
                        </input>
                        {errors.msgFechaIngreso && <div className='invalid-feedback'>{errors.msgFechaIngreso}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise" >Almacen:</label>
                      <div className="col-sm-8">
                        <select value={codigoAlmacen}
                          className={`form-select-depo${errors.msgCodigoAlmacen ? ' is-invalid' : ''} ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          onChange={(e) => { setCodigoAlmacen(e.target.value) }}
                          disabled={indSalida}>
                          <option value="">Seleccione</option>
                          {
                            catalogoAlmacen.map(al =>
                              <option key={al.id} value={al.codigo}>{al.descripcion}</option>
                            )
                          }
                        </select>
                        {errors.msgCodigoAlmacen && <div className='invalid-feedback'>{errors.msgCodigoAlmacen}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Observaciones:</label>
                      <div className="col-sm-8">
                        <input type="text"
                          name="observaciones"
                          placeholder='Observaciones de la mercaderia'
                          value={observaciones}
                          onChange={(e) => { setObservaciones(e.target.value) }}
                          className={`form-control-depo ${ indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          autoComplete='off'
                          disabled={indSalida}>
                        </input>
                      </div>
                    </div>
                    {!indSalida &&
                      <button type="button" className="btn-depo btn-primary-depo" onClick={agregarMercaderia}>Agregar mercaderia</button>
                    }
                    {indSalida &&
                    <div>
                      <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Cantidad de Salida:</label>
                      <div className="col-sm-8">
                        <input type="number"
                          placeholder='Cantidad de productos'
                          value={cantidadSalida}
                          onChange={(e) => { setCantidadSalida(e.target.value) }}
                          className={`form-control ${errors.msgCantidadSalida ? 'is-invalid' : 'is-valid'}`}
                          autoComplete='off'>
                        </input>
                        {errors.msgCantidadSalida && <div className='invalid-feedback'>{errors.msgCantidadSalida}</div>}
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Fecha de Salida:</label>
                      <div className="col-sm-8">
                        <input type="date"
                          value={fechaSalida}
                          className={`form-control ${errors.msgFechaSalida ? 'is-invalid' : 'is-valid'}`}
                          onChange={(e) => { setFechaSalida(e.target.value) }}>
                        </input>
                        {errors.msgFechaSalida && <div className='invalid-feedback'>{errors.msgFechaSalida}</div>}
                      </div>
                    </div>
                    <div>
                      <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Descripcion de la salida:</label>
                      <div className="col-sm-8">
                        <input type="text"
                          placeholder='Descripcion de la salida'
                          value={descripcionSalida}
                          onChange={(e) => { setDescripcionSalida(e.target.value) }}
                          className={`form-control ${errors.msgDescripcionSalida ? 'is-invalid' : 'is-valid'}`}
                          autoComplete='off'>
                        </input>
                        {errors.msgDescripcionSalida && <div className='invalid-feedback'>{errors.msgDescripcionSalida}</div>}
                      </div>
                      </div>
                    </div>
                      <button type="button" className="btn-depo btn-warning-depo" onClick={registrarSalida}>Salida de mercaderia</button>
                    </div>
                      
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Datos de las mercaderias ingresadas</h4>
                  <p className="text-muted mb-0">Esta información corresponde a las mercaderias que se encuentran en los almacenes.
                  </p>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead className="thead-light">
                          <tr>
                            <th className='td-th-size-depo'>Serie</th>
                            <th className='td-th-size-depo'>Codigo</th>
                            <th className='td-th-size-depo'>Descripcion</th>
                            <th className='td-th-size-depo'>Unidad medida</th>
                            <th className='td-th-size-depo'>cantidad</th>
                            <th className='td-th-size-depo'>Fecha de ingreso</th>
                            <th className='td-th-size-depo'>Almacen</th>
                            <th className='td-th-size-depo'>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            mercaderias.map(mercaderia =>
                              <tr key={mercaderia.id}>
                                <td className='td-th-size-depo'>{mercaderia.serie}</td>
                                <td className='td-th-size-depo'>{mercaderia.productoCodigo}</td>
                                <td className='td-th-size-depo'>{mercaderia.descripcionProducto}</td>
                                <td className='td-th-size-depo'>{mercaderia.um[0].descripcion}</td>
                                <td className='td-th-size-depo'>{mercaderia.cantidad}</td>
                                <td className='td-th-size-depo'>{(new Date(mercaderia.fechaIngreso)).toLocaleString().substring(0, 10).split(",")[0]}</td>
                                <td className='td-th-size-depo'>{mercaderia.almacen[0].descripcion}</td>
                                <td className='td-th-size-depo'>
                                  <a className='icon-link-depo' onClick={() => seleccionarSalida(mercaderia.id)}>
                                    <i className="bi bi-pencil-fill"></i>
                                  </a>
                                  &nbsp;&nbsp;
                                  <a className='icon-link-depo' onClick={() => handleShowSalida(mercaderia.numeroMercaderia)}>
                                    <i className="bi bi-eye-fill"></i>
                                  </a>
                                </td>
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
      }
      {!ingressADM &&
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Servicios</a></li>
                    <li className="breadcrumb-item active">Nuevo Servicio</li>
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
      <MercaderiaSalidaComponent show={showSalida} handleClose={handleCloseSalida} numeroMercaderia={numeroMercaderiaSeleccionada} />
    </>
  )
}
export default MercaderiaEditComponent