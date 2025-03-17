import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import { buscarCodigoOrdenSalida, clienteForRuc, consultaRuc, ingresoById, notaRecepcionSave, nuevoCliente } from '../../service/FacturaService';

const MercaderiaOrdenSalidaComponent = ({ show, handleClose, idIngreso, mercaderias }) => {

  const [codIngreso, setCodIngreso] = useState('')
  const [numNotaRecepcion, setNumNotaRecepcion] = useState('')
  const [numOrdenSalida, setNumOrdenSalida] = useState('')
  const [rucDestinatario, setRucDestinatario] = useState('')
  const [razonSocialDestinatario, setRazonSocialDestinatario] = useState('')
  const [direccionDestinatario, setDireccionDestinatario] = useState('')
  const [rucDepovent, setRucDepovent] = useState('')
  const [razonSocialDepovent, setRazonSocialDepovent] = useState('')
  const [direccionDepovent, setDireccionDepovent] = useState('')
  const [chofer, setChofer] = useState('')
  const [placaVehiculo, setPlacaVehiculo] = useState('')
  const [fechaRecepcion, setFechaRecepcion] = useState('')

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
    msgRucDestinatario: '',
    msgRazonSocialDestinatario: '',
    msgDireccionDestinatario: '',
    msgRucDepovent: '',
    msgRazonSocialDepovent: '',
    msgDireccionDepovent: '',
  })

  const handleCodOrdenSalida = () => {
    showLoading()
    buscarCodigoOrdenSalida().then((response) => {
      setNumOrdenSalida(response.data + 1)
      closeLoading()
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    handleCodOrdenSalida();
  }, [])

  const buscaRucDestinatario = (e) => {
      e.preventDefault();
      if (rucDestinatario.length !== 11) {
        alerta("El RUC debe tener 11 digitos")
        setRucDestinatario("")
        return
      }
      clienteForRuc(rucDestinatario).then(p => {
        if(p.data.length > 0){
          setRucDestinatario(p.data[0].ruc)
          setRazonSocialDestinatario(p.data[0].razonSocial)
          setDireccionDestinatario(p.data[0].direccion)
        }else{
          consultaRuc(rucDestinatario).then(response => {
            showLoading()
            setRucDestinatario(response.data.ruc)
            setRazonSocialDestinatario(response.data.razonSocial)
            setDireccionDestinatario(response.data.direccion)
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
      showLoading()
      setIngreso(response.data)
      cargarNotaIngreso(response.data)
      cargarDepovent()
      closeLoading()
    }).catch(e => {
      console.log(e)
    })
  }

  const cargarDepovent = () => {
    setRazonSocialDepovent("Depositos y Ventas S.A.");
    setRucDepovent("20100014476");
    setDireccionDepovent("jr. victor a. belaunde 901 carmen de la legua");
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
    data.numNotaRecepcion = numNotaRecepcion
    data.codIngreso = codIngreso
    data.rucDestinatario = rucDestinatario
    data.razonSocialDestinatario = razonSocialDestinatario
    data.direccionDestinatario = direccionDestinatario
    data.rucDepovent = rucDepovent
    data.razonSocialDepovent = razonSocialDepovent
    data.direccionDepovent = direccionDepovent
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
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Orden de salida:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Nota recepcion"
                    value={numOrdenSalida}
                    className="bg-secondary bg-opacity-10 form-control"
                    readOnly>
                  </input>
                </div>
              </div>
              <div className="mb-3 row pb-2">
                <label className="col-sm-4 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>RUC destinatario:</label>
                <div className="col-sm-6">
                  <input type="number"
                    placeholder="Ruc de Destinatario"
                    value={rucDestinatario}
                    maxlength="11"
                    className={`form-control-depo ${errors.msgRucDestinatario ? ' is-invalid' : ''}`}
                    onChange={(e) => { setRucDestinatario(e.target.value) }}/>
                  {errors.msgRucDestinatario && <div className='invalid-feedback'>{errors.msgRucDestinatario}</div>}
                </div>
                <div className='col-sm-2 text-start' >
                  <button className='btn btn-primary' onClick={buscaRucDestinatario}>Buscar</button>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Razon social Destinatario:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Razon social Destinatario"
                    value={razonSocialDestinatario}
                    className="bg-secondary bg-opacity-10 form-control"
                    onChange={(e) => { setRazonSocialDestinatario(e.target.value) }}
                    readOnly>
                  </input>
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Direccion Destinatario:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Direccion agencia"
                    value={direccionDestinatario}
                    className="bg-secondary bg-opacity-10 form-control"
                    onChange={(e) => { setDireccionDestinatario(e.target.value) }}>
                  </input>
                </div>
              </div>
              <div className="mb-3 row pb-2">
                <label className="col-sm-4 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>RUC Depovent:</label>
                <div className="col-sm-8">
                  <input type="number"
                    placeholder="Ruc de Depovent"
                    value={rucDepovent}
                    maxlength="11"
                    className={`form-control-depo ${errors.msgRucDepovent ? ' is-invalid' : ''}`}
                    onChange={(e) => { setRucDepovent(e.target.value) }}
                    readOnly
                  />
                  {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRucDepovent}</div>}
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Razon Social Depovent:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Razon social Depovent"
                    value={razonSocialDepovent}
                    onChange={(e) => { setRazonSocialDepovent(e.target.value) }}
                    className="bg-secondary bg-opacity-10 form-control"
                    readOnly>
                  </input>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Direccion Depovent:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Direccion Depovent"
                    value={direccionDepovent}
                    onChange={(e) => { setDireccionDepovent(e.target.value) }}
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
            </Form.Group>
          </Form>
          <br />
          <button className='btn btn-primary' onClick={saveNotaRecepcion}>Guardar Nota de recepcion</button>
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
          
          <button className='btn btn-warning'>Descargar Nota de ingreso</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MercaderiaOrdenSalidaComponent;