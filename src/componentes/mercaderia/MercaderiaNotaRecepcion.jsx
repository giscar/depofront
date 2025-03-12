import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import { buscarCodigoNotaRecepcion, clienteForRuc, consultaRuc, ingresoById, notaRecepcionSave, nuevoCliente } from '../../service/FacturaService';

const MercaderiaNotaRecepcion = ({ show, handleClose, idIngreso, mercaderias }) => {

  const [codNotaIngreso, setCodNotaIngreso] = useState('')
  const [codIngreso, setCodIngreso] = useState('')
  const [numNotaRecepcion, setNumNotaRecepcion] = useState('')
  const [codNotaRecepcion, seCodNotaRecepcion] = useState('')
  const [rucAgencia, setRucAgencia] = useState('')
  const [razonSocialAgencia, setRazonSocialAgencia] = useState('')
  const [direccionAgencia, setDireccionAgencia] = useState('')
  const [rucCliente, setRucCliente] = useState('')
  const [razonSocialCliente, setRazonSocialCliente] = useState('')
  const [direccionCliente, setDireccionCliente] = useState('')
  const [chofer, setChofer] = useState('')
  const [placaVehiculo, setPlacaVehiculo] = useState('')
  const [fechaRecepcion, setFechaRecepcion] = useState('')
  const [almacenado, setAlmacenado] = useState('')

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
    msgRucCliente: '',
    msgRazonSocialCliente: '',
    msgDireccionCliente: '',
  })

  const handleCodMercaderia = () => {
    showLoading()
    buscarCodigoNotaRecepcion().then((response) => {
      setNumNotaRecepcion(response.data + 1)
      seCodNotaRecepcion("NOTARECEP" + (response.data + 1).toString().padStart(6, '0'));
      closeLoading()
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    handleCodMercaderia();
  }, [])


  const buscaRucAgencia = (e) => {
    e.preventDefault();
    if (rucAgencia.length !== 11) {
      alerta("El RUC debe tener 11 digitos")
      setRucAgencia("")
      return
    }
    clienteForRuc(rucAgencia).then(p => {
      consultaRuc(rucAgencia).then(response => {
        showLoading()
        setRucAgencia(response.data.ruc)
        setRazonSocialAgencia(response.data.razonSocial)
        setDireccionAgencia(response.data.direccion)
        const data = {}
        data.ruc = response.data.ruc
        data.razonSocial = response.data.razonSocial
        data.direccion = response.data.direccion
        nuevoCliente(data)
        closeLoading()
      }).catch(error => {
        showLoading()
        console.log(error)
      })
    })
  }
  
  const buscaRucCliente = (e) => {
    e.preventDefault();
    if (rucCliente.length !== 11) {
      alerta("El RUC debe tener 11 digitos")
      setRucCliente("")
      return
    }
    clienteForRuc(rucCliente).then(p => {
      consultaRuc(rucCliente).then(response => {
        showLoading()
        setRucCliente(response.data.ruc)
        setRazonSocialCliente(response.data.razonSocial)
        setDireccionCliente(response.data.direccion)
        const data = {}
        data.ruc = response.data.ruc
        data.razonSocial = response.data.razonSocial
        data.direccion = response.data.direccion
        nuevoCliente(data)
        closeLoading()
      }).catch(error => {
        showLoading()
        console.log(error)
      })
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
    debugger
    e.preventDefault()
    const data = {}
    data.numNotaRecepcion =numNotaRecepcion
    data.codIngreso = codIngreso
    data.codIngreso = codIngreso
    data.razonSocialAgencia = razonSocialAgencia
    data.direccionAgencia = direccionAgencia
    data.rucCliente = rucCliente
    data.razonSocialCliente = razonSocialCliente
    data.direccionCliente = direccionCliente
    data.chofer = chofer
    data.placaVehiculo = placaVehiculo
    data.placaVehiculo = placaVehiculo
    data.almacenado = almacenado
    data.mercaderias = mercaderias
    notaRecepcionSave(data).then(p => console.log(p))
    .catch(e => console.log(e))
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
                    value={numNotaRecepcion}
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
                <label className="col-sm-4 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>RUC:</label>
                <div className="col-sm-6">
                  <input type="number"
                    placeholder="Ruc de la agencia"
                    value={rucAgencia}
                    maxlength="11"
                    className={`form-control-depo ${errors.msgRucAgencia ? ' is-invalid' : ''}`}
                    onChange={(e) => { setRucAgencia(e.target.value) }}
                  />
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
                    onChange={(e) => { setDireccionAgencia(e.target.value) }}
                    >
                  </input>
                </div>
              </div>
              <div className="mb-3 row pb-2">
                <label className="col-sm-4 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>RUC Cliente:</label>
                <div className="col-sm-6">
                  <input type="number"
                    placeholder="Ruc del cliente"
                    value={rucCliente}
                    maxlength="11"
                    className={`form-control-depo ${errors.msgRucCliente ? ' is-invalid' : ''}`}
                    onChange={(e) => { setRucCliente(e.target.value) }}
                  />
                  {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRucCliente}</div>}
                </div>
                <div className='col-sm-2 text-start' >
                  <button className='btn btn-primary' onClick={buscaRucCliente}>Buscar</button>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Razon Social cliente:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Razon social del cliente"
                    value={razonSocialCliente}
                    onChange={(e) => { setRazonSocialCliente(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control"
                    readOnly>
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Direccion cliente:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Direccion del cliente"
                    value={direccionCliente}
                    onChange={(e) => { setDireccionCliente(e.target.value) }}
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
                    className="bg-secondary bg-opacity-10 form-control"
                    >
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
                    className="bg-secondary bg-opacity-10 form-control"
                    >
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Fecha recepcion:</label>
                <div className="col-sm-8">
                  <input type="date"
                    placeholder="Codigo del Ingreso"
                    value={fechaRecepcion}
                    onChange={(e) => { setFechaRecepcion(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control"
                    >
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Almacenado:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Codigo del Ingreso"
                    value={almacenado}
                    onChange={(e) => { setAlmacenado(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control"
                    >
                  </input>
                </div>
              </div>
            </Form.Group>
          </Form>
          <br/>
          <button className='btn btn-primary' onClick={saveNotaRecepcion}>Guardar Nota de recepcion</button>
        </Modal.Body>
        <Modal.Footer>
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
                                <td className='td-th-size-depo'>{mercaderia.um[0].descripcion}</td>
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
          <button className='btn btn-warning'>Descargar Nota de ingreso</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MercaderiaNotaRecepcion;