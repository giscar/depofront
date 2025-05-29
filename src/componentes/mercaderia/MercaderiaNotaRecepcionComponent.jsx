import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import { buscarCodigoNotaRecepcion, clienteForRuc, consultaRuc, ingresoById, mercaderiaSave, notaRecepcionSave, nuevoCliente } from '../../service/FacturaService';

const MercaderiaNotaRecepcionComponent = ({ show, handleClose, idIngreso, mercaderias }) => {

  const [codigoRecepcion, setCodigoRecepcion] = useState('')
  const [numeroRecepcion, setNumeroRecepcion] = useState('')
  const [codIngreso, setCodIngreso] = useState('')
  const [rucAgencia, setRucAgencia] = useState('')
  const [razonSocialAgencia, setRazonSocialAgencia] = useState('')
  const [direccionAgencia, setDireccionAgencia] = useState('')
  const [rucEmpresa, setRucEmpresa] = useState('')
  const [razonSocialEmpresa, setRazonSocialEmpresa] = useState('')
  const [direccionEmpresa, setDireccionEmpresa] = useState('')
  const [chofer, setChofer] = useState('')
  const [guiaRemision, setGuiaRemision] = useState('')
  const [placaVehiculo, setPlacaVehiculo] = useState('')
  const [fechaRecepcion, setFechaRecepcion] = useState('')
  const [almacenado, setAlmacenado] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [ingreso, setIngreso] = useState([])

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

  const notify = () => toast.info('Se ha registrado la nota de recepcion', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    })

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

  const handleCodRecepcion = () => {
    showLoading()
    buscarCodigoNotaRecepcion().then((response) => {
      setNumeroRecepcion(response.data + 1)
      setCodigoRecepcion("NOTARECEP" + (response.data + 1).toString().padStart(6, '0'));
      closeLoading()
    }).catch(error => {
      console.log(error)
      closeLoading()
    })
    closeLoading()
  }

  useEffect(() => {
    handleCodRecepcion();
  }, [])

  const buscaRucAgencia = (e) => {
    e.preventDefault();
    if (rucAgencia.length !== 11) {
      alerta("El RUC debe tener 11 digitos")
      setRucAgencia("")
      return
    }
    showLoading()
    clienteForRuc(rucAgencia).then(p => {
      if(p.data.length > 0){
        setRucAgencia(p.data[0].ruc)
        setRazonSocialAgencia(p.data[0].razonSocial)
        setDireccionAgencia(p.data[0].direccion)
      }else{
        consultaRuc(rucAgencia).then(response => {
          setRucAgencia(response.data.ruc)
          setRazonSocialAgencia(response.data.razonSocial)
          setDireccionAgencia(response.data.direccion)
          const data = {}
          data.ruc = response.data.ruc
          data.razonSocial = response.data.razonSocial
          data.direccion = response.data.direccion
          nuevoCliente(data)
        }).catch(error => {
          console.log(error)
          closeLoading()
        })
      }
      closeLoading()
    })
  }

  const buscarIngresoById = () => {
    ingresoById(idIngreso).then(response => {
      setIngreso(response.data)
      cargarNotaIngreso(response.data)
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    if (show) {
      buscarIngresoById()
    }
  }, [show])

  const cargarNotaIngreso = (data) => {
    setCodIngreso(data.codIngreso)
    setDireccionEmpresa(data.direccion)
    setRazonSocialEmpresa(data.razonSocial)
    setRucEmpresa(data.ruc)
  }

  const saveNotaRecepcion = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      alerta("Debe ingresar todos los valores")
      return
    }
    let i = 0
    mercaderias.map(p => {
      if(p.idNotaRecepcion){
        i++
      }
    })
    if(i > 0){
      alerta("Ya se ingreso la nota de recepcion para esta mercaderia no puede ingresarla por segunda vez")
      handleClose()
      return
    }else{
      let data = {}
      let agencia = {}
      let empresa = {}
      agencia.ruc = rucAgencia
      agencia.razonSocial = razonSocialAgencia
      agencia.direccion  = direccionAgencia

      empresa.ruc = rucEmpresa
      empresa.razonSocial = razonSocialEmpresa
      empresa.direccion = direccionEmpresa
      data.idIngreso = idIngreso
      data.codigoRecepcion = codigoRecepcion
      data.numeroRecepcion = numeroRecepcion
      data.agencia = agencia
      data.empresa = empresa
      data.codIngreso = codIngreso
      data.chofer = chofer?.toUpperCase()
      data.guiaRemision = guiaRemision
      data.placaVehiculo = placaVehiculo?.toUpperCase()
      mercaderias.map(p => {
      //p.idNotaRecepcion = idNotaRecepcion
        p.numeroNotaRecepcion = numeroRecepcion
      })
      data.mercaderias = mercaderias
      data.almacenado = almacenado
      data.descripcion = descripcion
      data.observaciones = observaciones
      data.fechaRecepcion = fechaRecepcion
      showLoading()
      notaRecepcionSave(data).then( response => {
        console.log(response.data)
        mercaderias.map(p => {
          p.idNotaRecepcion = response.data.id
          mercaderiaSave(p).then(q => {
            closeLoading()
          })
          closeLoading()
          handleClose()
        })
        notify()
      }).catch(e => {
        console.log(e)
        closeLoading()
        handleClose()
      })
    }
  }

  const [errors, setErrors] = useState({
    msgCodigoRecepcion: '',
    msgCodIngreso: '',
    msgRucAgencia: '',
    msgRazonSocialAgencia: '',
    msgDireccionAgencia: '',
    msgRucEmpresa: '',
    msgRazonSocialEmpresa: '',
    msgDireccionEmpresa: '',
    msgChofer: '',
    msgPlacaVehiculo: '',
    msgGuiaRemision: '',
    msgDescripcion: '',
    msgObservaciones: '',
  })

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors }
    const regex = /^[0-9]*$/;

    if (codigoRecepcion) {
      errorCopy.msgCodigoRecepcion = '';
    } else {
      errorCopy.msgCodigoRecepcion = 'El codigo de la nota de recepcion no se ha generado';
      valid = false;
    }

    if (codIngreso) {
      errorCopy.msgCodIngreso = '';
    } else {
      errorCopy.msgCodIngreso = 'El codigo de ingreso no se generado';
      valid = false;
    }

    if (rucAgencia) {
      errorCopy.msgRucAgencia = '';
    } else {
      errorCopy.msgRucAgencia = 'No se ha ingresado el RUC de la agencia';
      valid = false;
    }
    
    if (razonSocialAgencia) {
      errorCopy.msgRazonSocialAgencia = '';
    } else {
      errorCopy.msgRazonSocialAgencia = 'No se ha ingresado la razon social de la agencia';
      valid = false;
    }

    if (direccionAgencia) {
      errorCopy.msgDireccionAgencia = '';
    } else {
      errorCopy.msgDireccionAgencia = 'No se ha ingresado la direccion de la agencia';
      valid = false;
    }

    if (rucEmpresa) {
      errorCopy.msgRucEmpresa = '';
    } else {
      errorCopy.msgRucEmpresa = 'No se ha generado el RUC de la empresa';
      valid = false;
    }
    
    if (razonSocialEmpresa) {
      errorCopy.msgRazonSocialEmpresa = '';
    } else {
      errorCopy.msgRazonSocialEmpresa = 'No se ha generado la razon social de la empresa';
      valid = false;
    }

    if (direccionEmpresa) {
      errorCopy.msgDireccionEmpresa = '';
    } else {
      errorCopy.msgDireccionEmpresa = 'No se ha generado la direccion de la empresa';
      valid = false;
    }

    if (chofer) {
      errorCopy.msgChofer = '';
    } else {
      errorCopy.msgChofer = 'No se ha ingresado el nombre del chofer';
      valid = false;
    }

    if (placaVehiculo) {
      errorCopy.msgPlacaVehiculo = '';
    } else {
      errorCopy.msgPlacaVehiculo = 'No se ha ingresado la placa del vehiculo';
      valid = false;
    }

    if (guiaRemision) {
      errorCopy.msgGuiaRemision = '';
    } else {
      errorCopy.msgGuiaRemision = 'No se ha ingresado la guia de remision o factura';
      valid = false;
    }

    if (fechaRecepcion) {
      errorCopy.msgFechaRecepcion = '';
    } else {
      errorCopy.msgFechaRecepcion = 'No se ha generado la direccion de la empresa';
      valid = false;
    }

    if (descripcion) {
      errorCopy.msgDescripcion = '';
    } else {
      errorCopy.msgDescripcion = 'Debe ingresar la descripcion de la mercaderia de ingreso';
      valid = false;
    }

    if (observaciones) {
      errorCopy.msgObservaciones = '';
    } else {
      errorCopy.msgObservaciones = 'Debe ingresar la observacion de la mercaderia de ingreso';
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }

  return (
    <>
      <Modal show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
        className='anyClass'>
        <Modal.Header closeButton>
          <Modal.Title>Nota de ingreso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Nota de recepcion:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Nota recepcion"
                    value={codigoRecepcion}
                    className={`form-control-depo ${errors.msgCodigoRecepcion ? ' is-invalid' : ''}`}
                    readOnly>
                  </input>
                  {errors.msgCodigoRecepcion && <div className='invalid-feedback'>{errors.msgCodigoRecepcion}</div>}
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Codigo de ingreso:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Codigo del Ingreso"
                    value={codIngreso}
                    className={`form-control-depo ${errors.msgCodIngreso ? ' is-invalid' : ''}`}
                    readOnly>
                  </input>
                  {errors.msgCodIngreso && <div className='invalid-feedback'>{errors.msgCodIngreso}</div>}
                </div>
              </div>
              <div className="mb-3 row pb-2">
                <label className="col-sm-4 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>RUC Agencia:</label>
                <div className="col-sm-6">
                  <input type="number"
                    placeholder="Ruc de la agencia"
                    value={rucAgencia}
                    maxlength="11"
                    className={`form-control-depo ${errors.msgRucAgencia ? ' is-invalid' : ''}`}
                    onChange={(e) => { setRucAgencia(e.target.value) }}/>
                  {errors.msgRucAgencia && <div className='invalid-feedback'>{errors.msgRucAgencia}</div>}
                </div>
                <div className='col-sm-2 text-start' >
                  <button className='btn btn-primary' onClick={buscaRucAgencia}>Buscar</button>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Razon social agencia:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Razon social agencia"
                    value={razonSocialAgencia}
                    className={`form-control-depo ${errors.msgRazonSocialAgencia ? ' is-invalid' : ''}`}
                    onChange={(e) => { setRazonSocialAgencia(e.target.value) }}
                    readOnly>
                  </input>
                  {errors.msgRazonSocialAgencia && <div className='invalid-feedback'>{errors.msgRazonSocialAgencia}</div>}
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Direccion agencia:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Direccion agencia"
                    value={direccionAgencia}
                    className={`form-control-depo ${errors.msgDireccionAgencia ? ' is-invalid' : ''}`}
                    onChange={(e) => { setDireccionAgencia(e.target.value) }}>
                  </input>
                  {errors.msgDireccionAgencia && <div className='invalid-feedback'>{errors.msgDireccionAgencia}</div>}
                </div>
              </div>
              <div className="mb-3 row pb-2">
                <label className="col-sm-4 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>RUC Empresa:</label>
                <div className="col-sm-6">
                  <input type="number"
                    placeholder="Ruc de la Empresa"
                    value={rucEmpresa}
                    maxlength="11"
                    className={`form-control-depo ${errors.msgRucEmpresa ? ' is-invalid' : ''}`}
                    onChange={(e) => { setRucEmpresa(e.target.value) }}
                    readOnly/>
                  {errors.msgRucEmpresa && <div className='invalid-feedback'>{errors.msgRucEmpresa}</div>}
                </div>
                
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Razon Social Empresa:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Razon social del cliente"
                    value={razonSocialEmpresa}
                    onChange={(e) => { setRazonSocialEmpresa(e.target.value) }}
                    className={`form-control-depo ${errors.msgRazonSocialEmpresa ? ' is-invalid' : ''}`}
                    readOnly>
                  </input>
                  {errors.msgRazonSocialEmpresa && <div className='invalid-feedback'>{errors.msgRazonSocialEmpresa}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Direccion Empresa:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Direccion de la Empresa"
                    value={direccionEmpresa}
                    onChange={(e) => { setDireccionEmpresa(e.target.value) }}
                    className={`form-control-depo ${errors.msgDireccionEmpresa ? ' is-invalid' : ''}`}
                    readOnly>
                  </input>
                  {errors.msgDireccionEmpresa && <div className='invalid-feedback'>{errors.msgDireccionEmpresa}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Chofer:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Codigo del Ingreso"
                    value={chofer}
                    onChange={(e) => { setChofer(e.target.value) }}
                    className={`form-control-depo ${errors.msgChofer ? ' is-invalid' : ''}`}>
                  </input>
                  {errors.msgChofer && <div className='invalid-feedback'>{errors.msgChofer}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Placa del vehiculo:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Codigo del Ingreso"
                    value={placaVehiculo}
                    onChange={(e) => { setPlacaVehiculo(e.target.value) }}
                    className={`form-control-depo ${errors.msgPlacaVehiculo ? ' is-invalid' : ''}`}>
                  </input>
                  {errors.msgPlacaVehiculo && <div className='invalid-feedback'>{errors.msgPlacaVehiculo}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Guia de remision o factura:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Codigo del Ingreso"
                    value={guiaRemision}
                    onChange={(e) => { setGuiaRemision(e.target.value) }}
                    className={`form-control-depo ${errors.msgGuiaRemision ? ' is-invalid' : ''}`}>
                  </input>
                  {errors.msgGuiaRemision && <div className='invalid-feedback'>{errors.msgGuiaRemision}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Fecha recepcion:</label>
                <div className="col-sm-8">
                  <input type="date"
                    placeholder="Ingrese la fecha de recepcion"
                    value={fechaRecepcion}
                    onChange={(e) => { setFechaRecepcion(e.target.value) }}
                    className={`form-control-depo ${errors.msgFechaRecepcion ? ' is-invalid' : ''}`}>
                  </input>
                  {errors.msgFechaRecepcion && <div className='invalid-feedback'>{errors.msgFechaRecepcion}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Almacenado:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="ingrese el detalle almacenado"
                    value={almacenado}
                    onChange={(e) => { setAlmacenado(e.target.value) }}
                    className="form-control">
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Descripcion:</label>
                <div className="col-sm-8">
                  <textarea rows={3} cols={3}
                    placeholder="Ingrese Descripcion"
                    value={descripcion}
                    onChange={(e) => { setDescripcion(e.target.value) }}
                    className={`form-control-depo ${errors.msgDescripcion ? ' is-invalid' : ''}`}>
                  </textarea>
                  {errors.msgDescripcion && <div className='invalid-feedback'>{errors.msgDescripcion}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Observaciones:</label>
                <div className="col-sm-8">
                  <textarea rows={3} cols={3}
                    placeholder="Ingrese observaciones"
                    value={observaciones}
                    onChange={(e) => { setObservaciones(e.target.value) }}
                    className={`form-control-depo ${errors.msgObservaciones ? ' is-invalid' : ''}`}>
                  </textarea>
                  {errors.msgObservaciones && <div className='invalid-feedback'>{errors.msgObservaciones}</div>}
                </div>
              </div>
            </Form.Group>
          </Form>
          <br />
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
                  <th className='td-th-size-depo'>Fecha de ingreso</th>
                  <th className='td-th-size-depo'>Almacen</th>
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
                      <td className='td-th-size-depo'>{(new Date(mercaderia.fechaIngreso)).toLocaleString().substring(0, 10).split(",")[0]}</td>
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
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary' onClick={saveNotaRecepcion}>Guardar Nota de recepcion</button>
          <button className='btn btn-danger' onClick={handleClose}>Cancelar</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default MercaderiaNotaRecepcionComponent;