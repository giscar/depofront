import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import { buscarCodigoOrdenSalida, ingresoById, ordenSalidaSave, salidaByIdIngreso, salidaSave } from '../../service/FacturaService';

const MercaderiaOrdenSalidaComponent = ({ show, handleClose, idIngreso }) => {

  const [codIngreso, setCodIngreso] = useState('')
  const [numOrdenSalida, setNumOrdenSalida] = useState('')
  const [rucDestinatario, setRucDestinatario] = useState('')
  const [razonSocialDestinatario, setRazonSocialDestinatario] = useState('')
  const [direccionDestinatario, setDireccionDestinatario] = useState('')
  const [rucDepovent, setRucDepovent] = useState('')
  const [razonSocialDepovent, setRazonSocialDepovent] = useState('')
  const [direccionDepovent, setDireccionDepovent] = useState('')
  const [chofer, setChofer] = useState('')
  const [placaVehiculo, setPlacaVehiculo] = useState('')
  const [fechaEmision, setFechaEmision] = useState('')
  const [salidas, setSalidas] = useState([])
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

  const buscarSalidasByIdIngreso = () => {
    salidaByIdIngreso(idIngreso).then(p => {
      debugger
      console.log(p.data)
      setSalidas(p.data)
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
      buscarSalidasByIdIngreso()
    }
  }, [show])

  const cargarNotaIngreso = (data) => {
    debugger
    setCodIngreso(data.codIngreso)
    setRucDestinatario(data.ruc)
    setDireccionDestinatario(data.direccion)
    setRazonSocialDestinatario(data.razonSocial)
  }

  const formatearFecha = (fec) => {
    //2024-11-02
    let dia = fec.substring(8, 10)
    let mes = fec.substring(5, 7)
    let anho = fec.substring(0, 4)
    return `${dia}/${mes}/${anho}`
  }

  const [errors, setErrors] = useState({
    msgChofer: '',
    msgPlacaVehiculo: '',
    msgFechaEmision: ''
  })

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors }
    const regex = /^[0-9]*$/;

    if (chofer) {
      errorCopy.msgChofer = '';
    } else {
      errorCopy.msgChofer = 'Debe ingresar el nombre del chofer';
      valid = false;
    }

    if (placaVehiculo) {
      errorCopy.msgPlacaVehiculo = '';
    } else {
      errorCopy.msgPlacaVehiculo = 'Debe ingresar la placa del vehiculo';
      valid = false;
    }

    if (fechaEmision) {
      errorCopy.msgFechaEmision = '';
    } else {
      errorCopy.msgFechaEmision = 'Debe ingresar la fecha de salida de la mercaderia';
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }


  const saveNotaOrdenSalida = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      alerta("Debe ingresar todos los valores")
      return
    }
    if(salidas.length == 0) {
      alerta("No se han registrado salidas no se puede registrar ")
      handleClose()
      return
    }
    const data = {}
    data.codIngreso = codIngreso
    data.idIngreso = idIngreso
    data.rucDestinatario = rucDestinatario
    data.razonSocialDestinatario = razonSocialDestinatario
    data.direccionDestinatario = direccionDestinatario
    data.rucDepovent = rucDepovent
    data.razonSocialDepovent = razonSocialDepovent
    data.direccionDepovent = direccionDepovent
    data.chofer = chofer
    data.placaVehiculo = placaVehiculo
    data.fechaEmision = fechaEmision
    data.salidas = salidas
    showLoading()
    ordenSalidaSave(data).then(p => {
      data.salidas.map(sal => {
        sal.idOrdenSalida = p.data.id
        salidaSave(sal).then(q => {
          console.log(q)
        }).catch(e => console.log(e))
      })
      handleClose()
      closeLoading()
    }).catch(e => console.log(e))
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
          <Modal.Title>Nota de Salida</Modal.Title>
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
                <div className="col-sm-8">
                  <input type="number"
                    placeholder="Ruc de Destinatario"
                    value={rucDestinatario}
                    maxlength="11"
                    className={`form-control-depo`}
                    onChange={(e) => { setRucDestinatario(e.target.value) }}
                    readOnly/>
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
                    placeholder="Nombre del chofer"
                    value={chofer}
                    onChange={(e) => { setChofer(e.target.value) }}
                    className={`form-control-depo ${errors.msgChofer ? ' is-invalid' : ''}`}
                    >
                  </input>
                  {errors.msgChofer && <div className='invalid-feedback'>{errors.msgChofer}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Placa del vehiculo:</label>
                <div className="col-sm-8">
                  <input type="text"
                    placeholder="Placa del vehiculo"
                    value={placaVehiculo}
                    onChange={(e) => { setPlacaVehiculo(e.target.value) }}
                    className={`form-control-depo ${errors.msgPlacaVehiculo ? ' is-invalid' : ''}`}
                    >
                  </input>
                  {errors.msgPlacaVehiculo && <div className='invalid-feedback'>{errors.msgPlacaVehiculo}</div>}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-4 col-form-label-zise">Fecha emision:</label>
                <div className="col-sm-8">
                  <input type="date"
                    placeholder="Fecha de salida"
                    value={fechaEmision}
                    onChange={(e) => { setFechaEmision(e.target.value) }}
                    className={`form-control-depo ${errors.msgFechaEmision ? ' is-invalid' : ''}`}
                  >
                  </input>
                  {errors.msgFechaEmision && <div className='invalid-feedback'>{errors.msgFechaEmision}</div>}
                </div>
              </div>
            </Form.Group>
          </Form>
          <br />
          <div className='text-end'>
            <button className='btn btn-primary' onClick={saveNotaOrdenSalida}>Guardar Nota de Despacho</button>
          </div>
          <div className="table-responsive">
          <br />
            <table className="table mb-0">
              <thead className="thead-light">
                <tr>
                  <th className='td-th-size-depo'>Mercaderia</th>
                  <th className='td-th-size-depo'>Fecha de Salida</th>
                  <th className='td-th-size-depo'>Descripcion</th>
                  <th className='td-th-size-depo'>Cantidad salida</th>
                  <th className='td-th-size-depo'>Saldo restante</th>
                </tr>
              </thead>
              <tbody>
                {
                  salidas.map(salida =>
                    <tr key={salida.id}>
                      <td className='td-th-size-depo'>{salida.numeroMercaderia}</td>
                      <td className='td-th-size-depo'>{formatearFecha(salida.fechaSalida)}</td>
                      <td className='td-th-size-depo'>{salida.descripcionSalida}</td>
                      <td className='td-th-size-depo'>{salida.cantidadSalida}</td>
                      <td className='td-th-size-depo'>{salida.saldoRestante}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MercaderiaOrdenSalidaComponent;