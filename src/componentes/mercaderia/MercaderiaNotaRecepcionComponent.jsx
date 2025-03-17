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
  const [placaVehiculo, setPlacaVehiculo] = useState('')
  const [fechaRecepcion, setFechaRecepcion] = useState('')
  const [almacenado, setAlmacenado] = useState('')
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

  const [errors, setErrors] = useState({
    msgCodIngreso: '',
    msgRucAgencia: '',
    msgRazonSocialAgencia: '',
    msgDireccionAgencia: '',
    msgRucEmpresa: '',
    msgRazonSocialEmpresa: '',
    msgDireccionEmpresa: '',
  })

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
    debugger
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

  const buscaRucEmpresa = (e) => {
    e.preventDefault();
    if (rucEmpresa.length !== 11) {
      alerta("El RUC debe tener 11 digitos")
      setRucEmpresa("")
      return
    }
    clienteForRuc(rucEmpresa).then(p => {
      if(p.data.length > 0){
        setRucEmpresa(p.data[0].ruc)
        setRazonSocialEmpresa(p.data[0].razonSocial)
        setDireccionEmpresa(p.data[0].direccion)
      }else{
        consultaRuc(rucEmpresa).then(response => {
          showLoading()
          setRucEmpresa(response.data.ruc)
          setRazonSocialEmpresa(response.data.razonSocial)
          setDireccionEmpresa(response.data.direccion)
          const data = {}
          data.ruc = response.data.ruc
          data.razonSocial = response.data.razonSocial
          data.direccion = response.data.direccion
          nuevoCliente(data)
          closeLoading()
        }).catch(error => {
          closeLoading()
          console.log(error)
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
  }

  const saveNotaRecepcion = (e) => {
    e.preventDefault()
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
    data.agencia = agencia
    data.empresa = empresa
    data.codIngreso = codIngreso
    data.chofer = chofer
    data.placaVehiculo = placaVehiculo
    mercaderias.map(p => {
      //p.idNotaRecepcion = idNotaRecepcion
      p.numeroNotaRecepcion = numeroRecepcion
    })
    data.mercaderias = mercaderias
    data.almacenado = almacenado
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
    }).catch(e => {
      console.log(e)
      closeLoading()
      handleClose()
    })
    }
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
                    className="bg-secondary bg-opacity-10 form-control"
                    readOnly>
                  </input>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Codigo de ingreso:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Codigo del Ingreso"
                    value={codIngreso}
                    className="bg-secondary bg-opacity-10 form-control"
                    readOnly>
                  </input>
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
                    className="bg-secondary bg-opacity-10 form-control"
                    onChange={(e) => { setRazonSocialAgencia(e.target.value) }}
                    readOnly>
                  </input>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Direccion agencia:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Direccion agencia"
                    value={direccionAgencia}
                    className="bg-secondary bg-opacity-10 form-control"
                    onChange={(e) => { setDireccionAgencia(e.target.value) }}>
                  </input>
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
                  />
                  {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRucEmpresa}</div>}
                </div>
                <div className='col-sm-2 text-start' >
                  <button className='btn btn-primary' onClick={buscaRucEmpresa}>Buscar</button>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Razon Social Empresa:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Razon social del cliente"
                    value={razonSocialEmpresa}
                    onChange={(e) => { setRazonSocialEmpresa(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control"
                    readOnly>
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Direccion Empresa:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Direccion de la Empresa"
                    value={direccionEmpresa}
                    onChange={(e) => { setDireccionEmpresa(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control"
                    readOnly>
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Chofer:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Codigo del Ingreso"
                    value={chofer}
                    onChange={(e) => { setChofer(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control">
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Placa del vehiculo:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Codigo del Ingreso"
                    value={placaVehiculo}
                    onChange={(e) => { setPlacaVehiculo(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control">
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Fecha recepcion:</label>
                <div className="col-sm-8">
                  <input type="date"
                    placeholder="Ingrese la fecha de recepcion"
                    value={fechaRecepcion}
                    onChange={(e) => { setFechaRecepcion(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control">
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Almacenado:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="ingrese el detalle almacenado"
                    value={almacenado}
                    onChange={(e) => { setAlmacenado(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control">
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Observaciones:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Ingrese observaciones"
                    value={observaciones}
                    onChange={(e) => { setObservaciones(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control">
                  </input>
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