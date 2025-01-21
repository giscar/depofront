import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import { toast } from 'react-toastify';
import HeaderComponent from '../HeaderComponent';
import { catalogoByTipo, ingresoById, mercaderiaByIngreso, mercaderiaSave, servicioSave } from '../../service/FacturaService';
import { useNavigate, useParams } from 'react-router-dom';

const MercaderiaEditComponent = () => {

  const { id } = useParams();

  const [cliente, setCliente] = useState('')
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [codServicio, setCodServicio] = useState('')
  const [numeroServicio, setNumeroServicio] = useState('')
  const [codigoDua, setCodigoDua] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const [mercaderias, setMercaderias] = useState([])
  const [catalogoUnidadMedida, setCatalogoUnidadMedida] = useState([])
  const [productoCodigo, setProductoCodigo] = useState('')
  const [descripcionProducto, setDescripcionProducto] = useState('')
  const [unidadMedida, setUnidadMedida] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [moneda, setMoneda] = useState('')
  const [observaciones, setObservaciones] = useState('')

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

  useEffect(() => {
    if (id) {
      ingresoById(id).then((response) => {
        cargarIngreso(response.data);
        debugger
        cargarMercaderia(id)
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const cargarMercaderia = (idIngreso) =>{
    debugger
    mercaderiaByIngreso(idIngreso).then(response => {
      setMercaderias(response.data)
    });
  }

  const cargarIngreso = (data) => {
    setNumeroServicio(data.numeroServicio)
    setCodServicio(data.codServicio)
    setCodigoDua(data.codigoDua)
    setRuc(data.ruc)
    setRazonSocial(data.razonSocial)
    setDireccion(data.direccion)
    setDescripcion(data.descripcion)
  }

  const [errors, setErrors] = useState({
    msgCodServicio: '',
    msgRuc: '',
    msgDua: '',
    msgCodigoProducto: '',
    msgDescripcion: '',
    msgUnidadMedida: '',
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

    if (dua) {
      errorCopy.msgDua = '';
    } else {
      errorCopy.msgDua = 'Tiene que ingresar el numero de DUA';
      valid = false;
    }

    if (productoCodigo) {
      errorCopy.msgCodigoProducto = '';
    } else {
      errorCopy.msgCodigoProducto = 'Tiene que ingresar el codigo del producto';
      valid = false;
    }

    if (descripcion) {
      errorCopy.msgDescripcion = '';
    } else {
      errorCopy.msgDescripcion = 'Tiene que ingresar la descripcion del producto';
      valid = false;
    }

    if (unidadMedida) {
      errorCopy.msgUnidadMedida = '';
    } else {
      errorCopy.msgUnidadMedida = 'Tiene que ingresar la unidad de medida';
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }

  const agregarMercaderia = (e) => {
    e.preventDefault();
    const data = {}
    data.idIngreso = id;
    data.productoCodigo = productoCodigo;
    data.descripcionProducto = descripcionProducto;
    data.unidadMedida = unidadMedida;
    data.cantidad = cantidad;
    mercaderiaSave(data).then(response =>{
      debugger
      cargarMercaderia(id)
    }).catch(error => {
      console.log(error);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {}
      data.codServicio = codServicio;
      data.numeroServicio = numeroServicio;
      data.ruc = ruc;
      data.razonSocial = razonSocial?.toUpperCase();
      data.direccion = direccion?.toUpperCase();
      data.codigoDua = codigoDua;
      data.productoCodigo = productoCodigo;
      data.descripcion = descripcion;
      data.unidadMedida = unidadMedida;
      data.cantidad = cantidad;
      data.estado = "1";
      data.estadoRegistro = "Proceso";
      data.moneda = moneda;
      data.observaciones = observaciones;

      servicioSave(data).then((response) => {
        if (response.data.id) {
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
    handleUnidadMedida();
  }, [])

  const handleUnidadMedida = () => {
    catalogoByTipo("1").then((response) => {
      setCatalogoUnidadMedida(response.data)
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
    setCodServicio('')
    setNumeroServicio('')
    setDua('')
    setProductoCodigo('')
    setDescripcion('')
    setUnidadMedida('')
    setCantidad('')
    setMoneda('')
    setObservaciones('');

  };

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
                    <label className="col-sm-4 col-form-label-zise">Codigo del servicio:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del servicio"
                        value={numeroServicio}
                        className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgCodServicio ? 'is-invalid' : ''}`}
                        readOnly
                        onChange={(e) => { setNumeroServicio(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero de DUA:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Numero de DUA'
                        value={codigoDua}
                        onChange={(e) => { setCodigoDua(e.target.value) }}
                        className={`form-control-depo ${errors.msgCodigoDua ? 'is-invalid' : ''}`}
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
                        className="form-control-depo"
                        autoComplete='off'>
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
                  <h4 className="card-title">Datos de la ejecución del servicio</h4>
                  <p className="text-muted mb-0">Esta información debe ser ingresada por el operador que realiza el servicio.
                  </p>
                </div>
                <div className="card-body">
                  <div className="general-label">

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Codigo del producto:</label>
                      <div className="col-sm-8">
                        <input type="text"
                          placeholder='Costo del servicio'
                          value={productoCodigo}
                          onChange={(e) => { setProductoCodigo(e.target.value) }}
                          className={`form-control-depo ${errors.msgCodigoProducto ? 'is-invalid' : ''}`}
                          autoComplete='off'>
                        </input>
                        {errors.msgCodigoProducto && <div className='invalid-feedback'>{errors.msgCodigoProducto}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise">Descripcion del producto:</label>
                      <div className="col-sm-8">
                        <input type="text"
                          placeholder='Descripcion del producto'
                          value={descripcionProducto}
                          onChange={(e) => { setDescripcionProducto(e.target.value) }}
                          className={`form-control-depo ${errors.msgDescripcion ? 'is-invalid' : ''}`}
                          autoComplete='off'>
                        </input>
                        {errors.msgDescripcion && <div className='invalid-feedback'>{errors.msgDescripcion}</div>}
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label-zise" >Unidad de medida:</label>
                      <div className="col-sm-8">
                        <select value={unidadMedida}
                          className={`form-select-depo${errors.msgUnidadMedida ? ' is-invalid' : ''}`}
                          onChange={(e) => { setUnidadMedida(e.target.value) }}>
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
                        <input type="text"
                          placeholder='Cantidad de productos'
                          value={cantidad}
                          onChange={(e) => { setCantidad(e.target.value) }}
                          className='form-control-depo'
                          autoComplete='off'>
                        </input>
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

                    <button type="button" className="btn-depo btn-primary-depo" onClick={agregarMercaderia}>Agregar mercaderia</button>

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
                            mercaderias.map(mercaderia =>
                              <tr key={mercaderia.id}>
                                <td className='td-th-size-depo'>{mercaderia.id}</td>
                                <td className='td-th-size-depo'>{servicio.ruc}</td>
                                <td className='td-th-size-depo'>{servicio.productoCodigo}</td>
                                <td className='td-th-size-depo'>{servicio.unidadMedida}</td>
                                <td className='td-th-size-depo'>{servicio.cantidad}</td>
                                <td className='td-th-size-depo'>{servicio.cantidad}</td>
                                <td className='td-th-size-depo'>{servicio.cantidad}</td>
                                <td className='td-th-size-depo'>{servicio.cantidad}</td>
                                <td className='td-th-size-depo'>{servicio.cantidad}</td>
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
    </>
  )
}
export default MercaderiaEditComponent