import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import { toast } from 'react-toastify';
import HeaderComponent from '../HeaderComponent';
import { buscarCodigoMercaderia, catalogoByTipo, ingresoById, ingresoEdit, ingresoSave, mercaderiaById, mercaderiaByIngreso, mercaderiaEdit, mercaderiaSave, salidaSave } from '../../service/FacturaService';
import { useNavigate, useParams } from 'react-router-dom';
import MercaderiaSalidaComponent from './MercaderiaSalidaComponent';
import Swal from 'sweetalert2'
import Select from 'react-select'
import MercaderiaNotaRecepcionComponent from './MercaderiaNotaRecepcionComponent';
import MercaderiaOrdenSalidaComponent from './MercaderiaOrdenSalidaComponent';


const MercaderiaEditComponent = () => {

  const { id } = useParams()
  const [cliente, setCliente] = useState('')
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [codIngreso, setCodIngreso] = useState('')
  const [numeroIngreso, setNumeroIngreso] = useState('')
  const [codigoDua, setCodigoDua] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [ingreso, setIngreso] = useState('')
  const [estadoRegistro, setEstadoRegistro] = useState('')

  const [idMercaderia, setIdMercaderia] = useState('')
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
  const [almacen, setAlmacen] = useState('')
  const [tipoMercaderia, setTipoMercaderia] = useState('')
  const [pedidoDeposito, setPedidoDeposito] = useState('')
  const [serie, setSerie] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [numeroMercaderiaSeleccionada, setNumeroMercaderiaSeleccionada] = useState('')

  const [indSalida, setIndSalida] = useState(false)
  const [indEdita, setIndEdita] = useState(false)
  const [cantidadSalida, setCantidadSalida] = useState('')
  const [descripcionSalida, setDescripcionSalida] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')

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

  const navigator = useNavigate();

  const access = "R010"
  let ingressADM = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'))

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingressADM = true;
    })
  })

  const handleCodMercaderia = () => {
    showLoading()
    buscarCodigoMercaderia().then((response) => {
      setCodMercaderia(response.data + 1)
      setNumeroMercaderia("MER" + (response.data + 1).toString().padStart(6, '0'));
      closeLoading()
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    handleCodMercaderia();
  }, [])

  useEffect(() => {
    if (id) {
      showLoading()
      ingresoById(id).then((response) => {
        cargarIngreso(response.data)
        cargarMercaderias(id)
        closeLoading()
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const cargarMercaderias = (idIngreso) => {
    showLoading()
    mercaderiaByIngreso(idIngreso).then(response => {
      debugger
      setMercaderias(response.data)
      closeLoading()
    })
    closeLoading()
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
    setTipoMercaderia(data.tipoMercaderia)
    setEstadoRegistro(data.estadoRegistro)
    setIngreso(data)
  }

  const limpiarPorMercaderia = () => {
    setCodigoDua("")
    setPedidoDeposito("")
    validateForm()
  }

  const [errors, setErrors] = useState({
    msgCodIngreso: '',
    msgRuc: '',
    msgDua: '',
    msgCodigoProducto: '',
    msgDescripcion: '',
    msgUnidadMedida: '',
    msgFechaIngreso: '',
    msgAlmacen: '',
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
      errorCopy.msgRuc = 'Tiene que ingresar el numero de RUC';
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }

  const limpiarMercaderia = () => {
    setUnidadMedida('')
    setCantidad('')
    setFechaIngreso('')
    setAlmacen('')
    setProductoCodigo('')
    setDescripcionProducto('')
    setObservaciones('')
    setSerie('')

    const errorCopy = { ...errors }
    errorCopy.msgCodigoProducto = '';
    errorCopy.msgNumeroMercaderia = '';
    errorCopy.msgSerie = '';
    errorCopy.msgDescripcionProducto = '';
    errorCopy.msgUnidadMedida = '';
    errorCopy.msgCantidad = '';
    errorCopy.msgFechaIngreso = '';
    errorCopy.msgAlmacen = '';
    setErrors(errorCopy);
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

    if(!indEdita){
      if (unidadMedida?.codigo) {
        errorCopy.msgUnidadMedida = '';
      } else {
        errorCopy.msgUnidadMedida = 'Tiene que ingresar la unidad de medida';
        valid = false;
      }

      if (almacen?.codigo) {
        errorCopy.msgAlmacen = '';
      } else {
        errorCopy.msgAlmacen = 'Tiene que ingresar el almacen de destino';
        valid = false;
      }
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

    setErrors(errorCopy);
    return valid;
  }

  const agregarMercaderia = (e) => {
    e.preventDefault();
    if (validateMercaderia()) {
      showLoading()
      const data = {}
      data.idIngreso = id
      data.codIngreso = codIngreso
      data.productoCodigo = productoCodigo
      data.descripcionProducto = descripcionProducto?.toUpperCase()
      data.unidadMedida = unidadMedida
      data.almacen = almacen
      data.cantidad = cantidad
      data.cantidadOrignal = cantidad
      data.fechaIngreso = fechaIngreso
      data.observaciones = observaciones
      data.serie = serie
      data.numeroMercaderia = numeroMercaderia
      data.codMercaderia = codMercaderia
      data.estadoMercaderia = "Proceso"
      mercaderiaSave(data).then(response => {
        cargarMercaderias(id)
        ingresoById(id).then(response => {
          response.data.estadoRegistro = "Proceso"
          ingresoSave(response.data).then(respon => {
            cargarIngreso(respon.data)
            notify()
            handleCodMercaderia()
            closeLoading()
          }).catch(error => {
            console.log(error)
            closeLoading()
          })
        }).catch(error => {
          console.log(error)
          closeLoading()
        })
      }).catch(error => {
        console.log(error)
        closeLoading()
      })
      limpiarMercaderia()
      closeLoading()
    }
  }

  const editarMercaderia = (e) => {
    e.preventDefault()
    if (validateMercaderia()) {
      showLoading()
      const data = {}
      data.id = idMercaderia
      data.idIngreso = id
      data.codIngreso = codIngreso
      data.productoCodigo = productoCodigo
      data.descripcionProducto = descripcionProducto?.toUpperCase()
      data.unidadMedida = unidadMedida[0]
      data.almacen = almacen[0]
      data.cantidad = cantidad
      data.cantidadOrignal = cantidad
      data.fechaIngreso = fechaIngreso
      data.observaciones = observaciones
      data.serie = serie
      data.numeroMercaderia = numeroMercaderia
      data.codMercaderia = codMercaderia
      data.estadoMercaderia = "Proceso"
      mercaderiaEdit(data).then(response => {
        setIndEdita(false)
        cargarMercaderias(id)
        ingresoById(id).then(response => {
          response.data.estadoRegistro = "Proceso"
          ingresoSave(response.data).then(respon => {
            cargarIngreso(respon.data)
            notify()
            handleCodMercaderia()
            closeLoading()
          }).catch(error => {
            console.log(error)
            closeLoading()
          })
        }).catch(error => {
          console.log(error)
          closeLoading()
        })
      }).catch(error => {
        console.log(error)
        closeLoading()
      })
      limpiarMercaderia()
      closeLoading()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      showLoading()
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
      if (validaNumeroMercaderia() == 0) {
        data.estadoRegistro = "Sin mercaderia";
      } else {
        if (validaCantidadMercaderia()) {
          data.estadoRegistro = "Proceso";
        } else {
          data.estadoRegistro = "Saldo cero";
        }
      }
      data.usuarioRegistro = initialLogin.documento;
      data.id = id;
      ingresoEdit(data).then((response) => {
        closeLoading()
        notify()
      }).catch(error => {
        console.error(error)
      });
    }   
  }

  const validaNumeroMercaderia = () => {
    return mercaderias.length;
  }

  const validaCantidadMercaderia = () => {
    let cantidadMercaderias = 0;
    mercaderias.map(item => {
      cantidadMercaderias = cantidadMercaderias + item.cantidad;
    })
    return cantidadMercaderias;
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

  const [showNotaIngreso, setShowNotaIngreso] = useState(false);
  const handleCloseNotaIngreso = () => setShowNotaIngreso(false);
  const handleShowNotaIngreso = () => setShowNotaIngreso(true);

  const [showOrdenSalida, setShowOrdenSalida] = useState(false);
  const handleCloseOrdenSalida = () => setShowOrdenSalida(false);
  const handleShowOrdenSalida = () => setShowOrdenSalida(true);

  useEffect(() => {
    handleUnidadMedida();
    handleAlmacen();
  }, [])

  const handleUnidadMedida = () => {
    showLoading()
    catalogoByTipo("1").then((response) => {
      response.data.map(p =>{
        p.label = p.descripcion;
        p.value = p.codigo;
      })
      setCatalogoUnidadMedida(response.data)
      closeLoading()
    })
  }

  const handleAlmacen = () => {
    showLoading()
    catalogoByTipo("2").then((response) => {
      response.data.map(p =>{
        p.label = p.descripcion;
        p.value = p.codigo;
      })
      setCatalogoAlmacen(response.data)
    })
    closeLoading()
  }

  useEffect(() => {
    setRuc(cliente?.ruc)
    setRazonSocial(cliente?.razonSocial)
    setDireccion(cliente?.direccion)
  }, [cliente])

  const seleccionarSalida = (idMercaderia) => {
    showLoading()
    setIndSalida(true)
    setIndEdita(false)
    mercaderiaById(idMercaderia).then(response => {
      cargarMercaderia(response.data)
      setMercaderia(response.data)
      closeLoading()
    }).catch(error => {
      console.error(error)
    })
  }

  const seleccionarEdit = (idMercaderia) => {
    showLoading()
    setIndSalida(false)
    setIndEdita(true)
    mercaderiaById(idMercaderia).then(response => {
      cargarMercaderia(response.data)
      setMercaderia(response.data)
      closeLoading()
    }).catch(error => {
      console.error(error)
    })
  }

  const registrarSalida = (e) => {
    e.preventDefault()
    showLoading()
    if (validateSalida()) {
      const data = {}
      data.idMercaderia = mercaderia.id
      data.numeroMercaderia = mercaderia.numeroMercaderia
      data.cantidadSalida = cantidadSalida
      data.saldoRestante = (parseInt(mercaderia.cantidad) - parseInt(cantidadSalida))
      data.descripcionSalida = descripcionSalida
      data.fechaSalida = fechaSalida
      data.usuarioRegistro = initialLogin.documento
      data.idCodIngreso = codIngreso
      salidaSave(data).then(response => {
        mercaderiaById(mercaderia.id).then(response => {
          if ((parseInt(mercaderia.cantidad) - parseInt(cantidadSalida)) > 0) {
            response.data.estadoMercaderia = "Proceso"
          }
          if ((parseInt(mercaderia.cantidad) - parseInt(cantidadSalida)) == 0) {
            response.data.estadoMercaderia = "Saldo cero"
          }
          response.data.cantidad = (parseInt(mercaderia.cantidad) - parseInt(cantidadSalida));
          mercaderiaSave(response.data).then(resp => {
            mercaderiaByIngreso(id).then(response => {
              setMercaderias(response.data)
              let cantidadMercaderias = 0;
              response.data.map(item => {
                cantidadMercaderias = cantidadMercaderias + item.cantidad
              })
              ingresoById(id).then(res => {
                if (cantidadMercaderias > 0) {
                  res.data.estadoRegistro = "Proceso";
                }
                if (cantidadMercaderias == 0) {
                  res.data.estadoRegistro = "Saldo cero";
                }
                ingresoEdit(res.data).then(response => {
                  cargarIngreso(response.data)
                  limpiarSalida()
                  irMercaderia(id)
                  handleCodMercaderia()
                  closeLoading()
                  notify()
                }).catch(e => console.log(e))
              }).catch(e => console.log(e))
            }).catch(e => console.log(e))
          }).catch(e => console.log(e))
        }).catch(e => console.log(e))
      }).catch(error => {
        console.error(error)
      })
    }
    closeLoading()
  }

  const limpiarSalida = () => {
    setIndSalida(false);
    setNumeroMercaderia('')
    setCodMercaderia('')
    setMercaderia('')
    setAlmacen('')
    setSerie('')
    setDescripcionProducto('')
    setUnidadMedida('')
    setCantidad('')
    setFechaIngreso('')
    setObservaciones('')
    setCantidadSalida('')
    setFechaSalida('')
    setDescripcionSalida('')
    setProductoCodigo('')
  }

  const cancelarSalida = () => {
    limpiarSalida();
    handleCodMercaderia();
  }

  const validateSalida = () => {
    let valid = true;
    const errorCopy = { ...errors }
    const regex = /^[0-9]*$/;

    if (cantidadSalida) {
      errorCopy.msgCantidadSalida = '';
      if (parseInt(cantidadSalida) > parseInt(cantidad)) {
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
    setNumeroMercaderia(data.numeroMercaderia)
    setCantidad(data.cantidad)
    setProductoCodigo(data.productoCodigo)
    setSerie(data.serie)
    setDescripcionProducto(data.descripcionProducto)
    setUnidadMedida(catalogoUnidadMedida.filter(p => p.codigo == data.unidadMedida.codigo))
    setAlmacen(catalogoAlmacen.filter(p => p.codigo == data.almacen.codigo))
    setFechaIngreso(data.fechaIngreso.substring(0, 10))
    setObservaciones(data.observaciones)
    setIdMercaderia(data.id)
    setMercaderia(data)
  }

  const formatearFecha = (fec) => {
    //2024-11-02
    let dia = fec.substring(8, 10)
    let mes = fec.substring(5, 7)
    let anho = fec.substring(0, 4)
    return `${dia}/${mes}/${anho}`
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
                        className={`form-select-depo ${errors.msgTipoMercaderia ? ' is-invalid' : ''} ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        onChange={(e) => { 
                          setTipoMercaderia(e.target.value) 
                          limpiarPorMercaderia()
                        }}
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
                    <label className="col-sm-4 col-form-label-zise">Numero de DAM / DUA:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder='Numero de DAM / DUA'
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
                    <label className="col-sm-4 col-form-label-zise">RUC del dueño:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder="Ingrese el numero de RUC"
                        value={ruc}
                        className={`form-control-depo ${errors.msgRuc ? 'is-invalid' : ''} ${errors.msgCodigoDua ? ' is-invalid' : ''} ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        onClick={handleShow}
                        onChange={(e) => { setRuc(e.target.value) }}
                        readOnly
                        disabled={indSalida} >
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
                    <label className="col-sm-4 col-form-label-zise">Descripcion:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Descripcion'
                        value={descripcion}
                        onChange={(e) => { setDescripcion(e.target.value) }}
                        className={`form-control-depo ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        autoComplete='off'
                        disabled={indSalida}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Estado registro:</label>
                    <div className="col-sm-8">
                      <label className='text-primary'>{estadoRegistro}</label>
                    </div>
                  </div>

                  {!indSalida &&
                    <div>
                      <button type="button" className="btn-depo btn-primary-depo" onClick={handleSubmit}>Guardar</button>&nbsp;&nbsp;
                      <button className='btn btn-info' onClick={() => handleShowNotaIngreso()}>Generar Nota recepcion</button>
                    </div>
                  }
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
                          className={`form-control-depo ${errors.msgCodigoProducto ? 'is-invalid' : ''} ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
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
                          className={`form-control-depo ${errors.msgSerie ? 'is-invalid' : ''} ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          autoComplete='off'
                          disabled={indSalida}>
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
                          className={`form-control-depo ${errors.msgDescripcionProducto ? 'is-invalid' : ''} ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          autoComplete='off'
                          disabled={indSalida}>
                        </input>
                        {errors.msgDescripcionProducto && <div className='invalid-feedback'>{errors.msgDescripcionProducto}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise" >Unidad de medida:</label>
                      <div className="col-sm-8">
                      <Select value={unidadMedida}
                        onChange={setUnidadMedida}
                        options={catalogoUnidadMedida}
                        className={`form-select-depo${errors.msgUnidadMedida ? ' is-invalid' : ''} ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        />
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
                          className={`form-control-depo ${errors.msgCantidad ? 'is-invalid' : ''}`}
                          autoComplete='off'>
                        </input>
                        {errors.msgCantidad && <div className='invalid-feedback'>{errors.msgCantidad}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Fecha de Ingreso:</label>
                      <div className="col-sm-8">
                        <input type="date"
                          value={fechaIngreso}
                          className={`form-control-depo ${errors.msgFechaIngreso ? 'is-invalid' : ''} `}
                          onChange={(e) => { setFechaIngreso(e.target.value) }}>
                        </input>
                        {errors.msgFechaIngreso && <div className='invalid-feedback'>{errors.msgFechaIngreso}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise" >Almacen:</label>
                      <div className="col-sm-8">
                      <Select value={almacen}
                        onChange={setAlmacen}
                        options={catalogoAlmacen}
                        className={`form-select-depo${errors.msgAlmacen ? ' is-invalid' : ''} ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                        />
                        {errors.msgAlmacen && <div className='invalid-feedback'>{errors.msgAlmacen}</div>}
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
                          className={`form-control-depo ${indSalida ? ' bg-secondary bg-opacity-10' : ''}`}
                          autoComplete='off'
                          disabled={indSalida}>
                        </input>
                      </div>
                    </div>
                    {!indSalida &&
                      <div>
                        {indEdita &&
                          <button type="button" className="btn-depo btn-primary-depo" onClick={editarMercaderia}>Editar mercaderia</button>
                        }
                        {!indEdita &&
                          <button type="button" className="btn-depo btn-primary-depo" onClick={agregarMercaderia}>Agregar mercaderia</button>
                        }
                        &nbsp;&nbsp;
                        <button type="button" className="btn-depo btn-warning-depo" onClick={limpiarMercaderia}>Limpiar</button>
                        &nbsp;&nbsp;
                        <button className='btn btn-danger' onClick={() => handleShowOrdenSalida()}>Generar orden de salida</button>
                      </div>
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
                        
                        <button type="button" className="btn-depo btn-warning-depo" onClick={registrarSalida}>Guardar salida</button>
                        &nbsp;&nbsp;
                        <button type="button" className="btn-depo btn-danger-depo" onClick={cancelarSalida}>Cancelar Salida</button>
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
                            <th className='td-th-size-depo'>Numero</th>
                            <th className='td-th-size-depo'>Codigo</th>
                            <th className='td-th-size-depo'>Descripcion</th>
                            <th className='td-th-size-depo'>Unidad medida</th>
                            <th className='td-th-size-depo'>cantidad inicial</th>
                            <th className='td-th-size-depo'>cantidad actual</th>
                            <th className='td-th-size-depo'>Fecha de ingreso</th>
                            <th className='td-th-size-depo'>Almacen</th>
                            <th className='td-th-size-depo'>Estado</th>
                            <th className='td-th-size-depo'>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            mercaderias.map(mercaderia =>
                              <tr key={mercaderia.id}>
                                <td className='td-th-size-depo'>{mercaderia.serie}</td>
                                <td className='td-th-size-depo'>{mercaderia.numeroMercaderia}</td>
                                <td className='td-th-size-depo'>{mercaderia.productoCodigo}</td>
                                <td className='td-th-size-depo'>{mercaderia.descripcionProducto}</td>
                                <td className='td-th-size-depo'>{mercaderia.unidadMedida.descripcion}</td>
                                <td className='td-th-size-depo'>{mercaderia.cantidadOrignal}</td>
                                <td className='td-th-size-depo'>{mercaderia.cantidad}</td>
                                <td className='td-th-size-depo'>{formatearFecha(mercaderia.fechaIngreso.split("T")[0])}</td>
                                <td className='td-th-size-depo'>{mercaderia.almacen.descripcion}</td>
                                <td className='td-th-size-depo'>
                                  {mercaderia.estadoMercaderia === "Sin mercaderia" &&
                                    <span className="badge badge-boxed  badge-outline-primary">{mercaderia.estadoMercaderia}</span>
                                  }
                                  {mercaderia.estadoMercaderia === "Proceso" &&
                                    <span className="badge badge-boxed  badge-outline-warning">{mercaderia.estadoMercaderia}</span>
                                  }
                                  {mercaderia.estadoMercaderia === "Saldo cero" &&
                                    <span className="badge badge-boxed  badge-outline-success">{mercaderia.estadoMercaderia}</span>
                                  }

                                </td>
                                <td className='td-th-size-depo'>
                                  <a className='icon-link-depo' onClick={() => seleccionarEdit(mercaderia.id)}>
                                    <i className="bi bi-pencil-fill"></i>
                                  </a>
                                  &nbsp;&nbsp;
                                  <a className='icon-link-depo' onClick={() => seleccionarSalida(mercaderia.id)}>
                                    <i className="bi bi-arrow-right-circle-fill"></i>
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
      <MercaderiaSalidaComponent show={showSalida} handleClose={handleCloseSalida} numeroMercaderia={numeroMercaderiaSeleccionada} idIngreso={id} />
      <MercaderiaNotaRecepcionComponent show={showNotaIngreso} handleClose={handleCloseNotaIngreso} idIngreso={id} mercaderias={mercaderias}/>
      <MercaderiaOrdenSalidaComponent show={showOrdenSalida } handleClose={handleCloseOrdenSalida} idIngreso={id} mercaderias={mercaderias}/>

    </>
  )
}
export default MercaderiaEditComponent