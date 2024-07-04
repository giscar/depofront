import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import { toast } from 'react-toastify';
import { buscarCodigoServicio, montacargasActivo, operadorActivo, servicioSave } from '../../service/FacturaService';

const ServicioNuevoComponent = () => {

  const [cliente, setCliente] = useState('')
  const [operadores, setOperadores] = useState([])
  const [montacargas, setMontacargas] = useState([])
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [codServicio, setCodServicio] = useState('')
  const [operadorId, setOperadorId] = useState('')
  const [montacargaId, setMontacargaId] = useState('')
  const [horaSalidaLocal, setHoraSalidaLocal] = useState('')
  const [horaInicioServicio, setHoraInicioServicio] = useState('')
  const [horaRetornoLocal, setHoraRetornoLocal] = useState('')
  const [horaFinServicio, setHoraFinServicio] = useState('')
  const [totalHoras, setTotalHoras] = useState('')
  const [montoServicio, setMontoServicio] = useState('')

  const [errors, setErrors] = useState({
    msgCodServicio: '',
    msgRuc: '',
    msgOperadorId: '',
    msgMontacargaId: '',
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
    debugger
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

    if (operadorId) {
      errorCopy.msgOperadorId = '';
    } else {
      errorCopy.msgOperadorId = 'Tiene que ingresar el operador';
      valid = false;
    }

    if (montacargaId) {
      errorCopy.msgMontacargaId = '';
    } else {
      errorCopy.msgMontacargaId = 'Tiene que ingresar la montacarga';
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (validateForm()) {
      const data = {}
      data.codServicio = codServicio;
      data.ruc = ruc;
      data.razonSocial = razonSocial?.toUpperCase();
      data.direccion = direccion?.toUpperCase();
      data.horaSalidaLocal = horaSalidaLocal;
      data.horaInicioServicio = horaInicioServicio;
      data.horaFinServicio = horaFinServicio;
      data.horaRetornoLocal = horaRetornoLocal;
      data.operadorId = operadorId;
      data.montacargaId = montacargaId;
      data.totalHoras = totalHoras;
      data.montoServicio = montoServicio;
      data.estado = "1";
      servicioSave(data).catch(error => {
        console.error(error)
      });
      limpiar()
      notify()
      setTimeout(() => {
        handleCodServicio()
      }, 2000);

    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    operadorActivo().then((response) => {
      setOperadores(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    montacargasActivo().then((response) => {
      setMontacargas(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    handleCodServicio();
  }, [])

  const handleCodServicio = () => {
    buscarCodigoServicio().then((response) => {
      setCodServicio(response.data + 1)
    }).catch(error => {
      console.log(error);
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
    setOperadorId('')
    setMontacargaId('')
    setCodServicio('')
    setHoraSalidaLocal('')
    setHoraInicioServicio('')
    setHoraFinServicio('')
    setHoraRetornoLocal('')
    setTotalHoras('')
    setMontoServicio('')
  };

  const resetFormularioIngreso = () => {
    limpiar();
    handleCodServicio();
  }

  return (
    <>
      <div className='container-fluid'>
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
              <h4 className="page-title">Registrar servicio</h4>
            </div>

          </div>
        </div>
        <br />

        <div className="row">

          <div className="col-lg-6 card-deck">

            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos Iniciales del Servicio</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de servicios.</p>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Codigo del servicio:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      id="inputCodServicio"
                      placeholder="Codigo del servicio"
                      value={codServicio}
                      className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgCodServicio ? 'is-invalid' : ''}`}
                      readOnly
                      onChange={(e) => { setCodServicio(e.target.value) }}>
                    </input>
                  </div>
                  {errors.msgCodServicio && <small className='form-text text-muted invalid-feedback'>{errors.msgCodServicio}</small>}
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Numero de RUC:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      id="inputRuc"
                      placeholder="Ingrese el numero de RUC"
                      value={ruc}
                      className={`form-control-depo ${errors.msgRuc ? 'is-invalid' : ''}`}
                      onClick={handleShow}
                      onChange={(e) => { setRuc(e.target.value) }}>
                    </input>
                    {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRuc}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Razon Social:</label>
                  <div className="col-sm-8">
                    <input type="text"
                      id="inputRazonSocial"
                      placeholder='Razon Social'
                      value={razonSocial}
                      className='bg-secondary bg-opacity-10 form-control-depo'
                      disabled
                      onChange={(e) => { setRazonSocial(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Dirección:</label>
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
                  <label className="col-sm-4 col-form-label-zise text-end" >Operador:</label>
                  <div className="col-sm-8">
                    <select value={operadorId}
                      className={`form-select-depo${errors.msgOperadorId ? ' is-invalid' : ''}`}
                      onChange={(e) => { setOperadorId(e.target.value) }}>
                      <option value="">Seleccione</option>
                      {
                        operadores.map(operador =>
                          <option key={operador.id} value={operador.id}>{operador.nombre}</option>
                        )
                      }
                    </select>
                    {errors.msgOperadorId && <div className='invalid-feedback'>{errors.msgOperadorId}</div>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end" >Montacarga:</label>
                  <div className="col-sm-8">
                    <select value={montacargaId}
                      className={`form-select-depo${errors.msgMontacargaId ? ' is-invalid' : ''}`}
                      onChange={(e) => { setMontacargaId(e.target.value) }}>
                      <option value="">Seleccione</option>
                      {
                        montacargas.map(montacarga =>
                          <option key={montacarga.id} value={montacarga.id}>{montacarga.nombre}</option>
                        )
                      }
                    </select>
                    {errors.msgMontacargaId && <div className='invalid-feedback'>{errors.msgMontacargaId}</div>}
                  </div>

                </div>
                <button type="button" className="btn-depo btn-primary-depo" onClick={handleSubmit}>Guardar</button>
                &nbsp;&nbsp;
                <button type="button" className="btn-depo btn-warning-depo" onClick={resetFormularioIngreso}>Limpiar</button>
              </div>
            </div>
          </div>

          <div className="col-lg-6 card-deck">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos de la ejecución del servicio</h4>
                <p className="text-muted mb-0">Esta información debe ser ingresada por el operador que realiza el servicio.
                </p>
              </div>
              <div className="card-body">
                <div className="general-label">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Salida de la Empresa:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaSalidaLocal}
                        className='form-control-depo'
                        onChange={(e) => { setHoraSalidaLocal(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Inicio del Servicio:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaInicioServicio}
                        className='form-control-depo'
                        onChange={(e) => { setHoraInicioServicio(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Fin del Servicio:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaFinServicio}
                        className='form-control-depo'
                        onChange={(e) => { setHoraFinServicio(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Retorno a la empresa:</label>
                    <div className="col-sm-8">
                      <input type="datetime-local"
                        value={horaRetornoLocal}
                        className='form-control-depo'
                        onChange={(e) => { setHoraRetornoLocal(e.target.value) }}>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Horas de servicio:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        name="totalHoras"
                        placeholder='Cantidad de horas'
                        className='form-control-depo'
                        value={totalHoras}
                        onChange={(e) => { setTotalHoras(e.target.value) }}
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise text-end">Monto del servicio:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        name="montoServicio"
                        placeholder='Monto'
                        value={montoServicio}
                        onChange={(e) => { setMontoServicio(e.target.value) }}
                        className='form-control-depo'
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BusquedaClienteComponent show={show} handleClose={handleClose} setCliente={setCliente} />
    </>
  )
}
export default ServicioNuevoComponent