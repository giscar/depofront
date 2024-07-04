import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clienteForRuc, deleteFile, inactiveFile, montacargasActivo, operadorActivo, servicioEdit, servicioForId, servicioSave, uploadFile } from '../../service/FacturaService';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FaTimes } from 'react-icons/fa';

const ServicioEditComponent = () => {

  const navigator = useNavigate();

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const [servicio, setServicio] = useState([])
  const {id} = useParams();
    
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const [file, setFile] = useState('')
  const [cargarImagen, setCargarImagen] = useState(false)

  const editServicio = (data) => {
    data.id = id;
    data.codServicio = data.codServicio.toUpperCase();
    data.ruc = data.ruc;
    data.razonSocial = data.razonSocial.toUpperCase();
    data.direccion = data.direccion.toUpperCase();
    data.horaSalidaLocal = horaSalidaLocal;
    data.horaInicioServicio = data.horaInicioServicio;
    data.horaFinServicio = data.horaFinServicio;
    data.horaRetornoLocal = horaRetornoLocal;
    data.operadorId = data.operadorId;
    data.montacargaId = data.montacargaId;
    data.estado = "1";
    servicioEdit(data).catch(error => {
      console.error(error)
    })
    setCargarImagen(true)
    if(id){
      servicioForId(id).then((response) => {
          setServicio(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    notify()
  }

  const cargarServicio = (data) => {
      setCodServicio(data.codServicio)
      setRuc(data.ruc)
      setRazonSocial(data.cliente? data.cliente[0]?.razonSocial : "")
      setDireccion(data.cliente? data.cliente[0]?.direccion : "")
      setHoraSalidaLocal(data.horaSalidaLocal)
      setHoraInicioServicio(data.horaInicioServicio)
      setHoraFinServicio(data.horaFinServicio)
      setHoraRetornoLocal(data.horaRetornoLocal)
      setOperadorId(data.operadorId)
      setMontacargaId(data.montacargaId)
      setTotalHoras(data.totalHoras)
      setMontoServicio(data.montoServicio)
  }

  useEffect(() => {
    if(id){
      servicioForId(id).then((response) => {
          debugger
          setServicio(response.data);
          setTimeout(() => {
            cargarServicio(response.data)
          }, 2000);
          
        }).catch(error => {
            console.log(error);
        })
    }
  }, [id])

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
    values.ruc = cliente.ruc
    values.razonSocial = cliente.razonSocial
    values.direccion = cliente.direccion
  }, [cliente])

  useEffect(() => {
    if(horaSalidaLocal, horaRetornoLocal){
      const horaSalidaLocal1 = new Date(horaSalidaLocal);
      const horaRetornoLocal1 = new Date(horaRetornoLocal);
      const diff =  horaRetornoLocal1.getTime() - horaSalidaLocal1.getTime();
      const horas = diff / (1000 * 60 * 60);
      console.log(horas.toFixed(2))
      console.log(values.codServicio)
      setTotalHoras(horas.toFixed(2))
      servicio.totalHoras = horas.toFixed(2)
    }
  }, [horaSalidaLocal, horaRetornoLocal, cliente])

  const { handleSubmit, handleChange, handleReset, values, errors } = useFormik({
    validationSchema: yup.object({
      codServicio: yup.string().required("Debe ingresar el código del servicio"),
      ruc: yup.string().required("Debe seleccionar el cliente"),
      operadorId: yup.string().required("Debe seleccionar el operador"),
      montacargaId: yup.string().required("Debe ingresar la montacarga"),
      
    }),
    initialValues: {
      codServicio: servicio.codServicio,
      ruc: servicio.ruc,
      razonSocial: servicio.cliente? servicio.cliente[0]?.razonSocial : "",
      direccion: servicio.cliente? servicio.cliente[0]?.direccion : "",
      horaSalidaLocal: servicio.horaSalidaLocal,
      horaInicioServicio: servicio.horaInicioServicio,
      horaFinServicio: servicio.horaFinServicio,
      horaRetornoLocal: servicio.horaRetornoLocal,
      operadorId: servicio.operadorId,
      montacargaId: servicio.montacargaId,
      totalHoras: servicio.totalHoras,
      montoServicio: servicio.montoServicio,
    },
    onSubmit: editServicio,
    enableReinitialize: true
  });

  const handleUpload = (e) => {
    const formdata = new FormData()
    formdata.append('file', file)
    formdata.append('id', id)
    formdata.append('type', file.type)
    formdata.append('size', file.size)
    uploadFile(formdata).then(() => {
      if(id){
        servicioForId(id).then((response) => {
            setServicio(response.data);
          }).catch(error => {
              console.log(error);
          })
      }
    }).catch(error => {
      console.log(error);
    });
    values.image = "";
    notify();
    //window.location.reload(); 
  }

  const handleInactiveFile = (idImagen) => {
    console.log(idImagen);
    inactiveFile(idImagen).then(() => {
      if(id){
        servicioForId(id).then((response) => {
            setServicio(response.data);
            notify();
          }).catch(error => {
              console.log(error);
          })
      }
    }).catch(error => {
      console.log(error);
    })
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
                      className="bg-secondary bg-opacity-10 form-control-depo"
                      readOnly
                      onChange={(e) => { setCodServicio(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end">Numero de RUC:</label>
                  <div className="col-sm-8">
                    <input type="number"
                      id="inputRuc"
                      placeholder="Ingrese el numero de RUC"
                      value={ruc}
                      className="bg-secondary bg-opacity-10 form-control-depo"
                      onClick={handleShow}
                      readOnly
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
                      className="bg-secondary bg-opacity-10 form-select-depo"
                      disabled
                      onChange={(e) => { setOperadorId(e.target.value) }}>
                      <option value="">Seleccione</option>
                      {
                        operadores.map(operador =>
                          <option key={operador.id} value={operador.id}>{operador.nombre}</option>
                        )
                      }
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-4 col-form-label-zise text-end" >Montacarga:</label>
                  <div className="col-sm-8">
                    <select value={montacargaId}
                      className="bg-secondary bg-opacity-10 form-select-depo"
                      disabled
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




    <div className='container-fluid'>
      <h3>Modificar servicio</h3>
      <br/><br/>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Codigo del Servicio</Form.Label>
            <Form.Control
              type="text"
              name="codServicio"
              value={values.codServicio}
              onChange={handleChange}
              isInvalid={!!errors.codServicio}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
              disabled
            />
            <Form.Control.Feedback type="invalid">
              {errors.codServicio}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationFormik02">
            <Form.Label>RUC</Form.Label>
            <Form.Control
              type="text"
              name="ruc"
              readOnly
              value={values.ruc}
              onChange={handleChange}
              isInvalid={!!errors.ruc}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.ruc}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik03">
            <Form.Label>Razon Social</Form.Label>
            <Form.Control
              as="textarea"
              name="razonSocial"
              disabled
              value={values.razonSocial}
              onChange={handleChange}
              autoComplete='off'
            />
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik04">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              as="textarea"
              name="direccion"
              disabled
              value={values.direccion}
              onChange={handleChange}
              autoComplete='off'
            />
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik04">
            <Form.Label>Operador</Form.Label>
            <Form.Select 
              name="operadorId"
              value={values.operadorId}
              onChange={handleChange}
              isInvalid={!!errors.operadorId}
              disabled
              >
              <option>Seleccione</option>
              {
                operadores.map(operador =>
                  <option key={operador.id} value={operador.id}>{operador.nombre}</option>
                )
              }
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.operadorId}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik04">
            <Form.Label>Vehículo</Form.Label>
            <Form.Select  
            name="montacargaId"
              value={values.montacargaId}
              onChange={handleChange}
              disabled
              isInvalid={!!errors.montacargaId}>
              <option>Seleccione</option>
              {
                montacargas.map(montacarga =>
                  <option key={montacarga.id} value={montacarga.id}>{montacarga.nombre}</option>
                )
              }
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.montacargaId}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik05">
            <Form.Label>Hora de salida de la Empresa</Form.Label>
            <Form.Control
              type="datetime-local"
              name="horaSalidaLocal"
              onChange={e => setHoraSalidaLocal(e.target.value)}
              isInvalid={!!errors.horaSalidaLocal}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.horaSalidaLocal}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik06">
            <Form.Label>Hora de inicio del Servicio</Form.Label>
            <Form.Control
              type="datetime-local"
              name="horaInicioServicio"
              value={values.horaInicioServicio}
              onChange={handleChange}
              isInvalid={!!errors.horaInicioServicio}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.horaInicioServicio}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik07">
            <Form.Label>Hora de fin del Servicio</Form.Label>
            <Form.Control
              type="datetime-local"
              name="horaFinServicio"
              value={values.horaFinServicio}
              onChange={handleChange}
              isInvalid={!!errors.horaFinServicio}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.horaFinServicio}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik08">
            <Form.Label>Hora de retorno a la empresa</Form.Label>
            <Form.Control
              type="datetime-local"
              name="horaRetornoLocal"
              onChange={e => setHoraRetornoLocal(e.target.value)}
              isInvalid={!!errors.horaRetornoLocal}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.horaRetornoLocal}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik08">
            <Form.Label>Total horas de servicio</Form.Label>
            <Form.Control
              type="number"
              name="totalHoras"
              value={values.totalHoras}
              onChange={handleChange}
              isInvalid={!!errors.totalHoras}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.horaRetornoLocal}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik08">
            <Form.Label>Monto del servicio</Form.Label>
            <Form.Control
              type="text"
              name="montoServicio"
              value={values.montoServicio}
              onChange={handleChange}
              isInvalid={!!errors.montoServicio}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.montoServicio}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" className='pt-4'>
              <Button type="submit" variant="info">Guardar</Button>
              <Button type="reset" className='ms-2' onClick={() => handleReset()}
                variant="warning">Limpiar
              </Button>
            </Form.Group>
          </Row>
          <Row className='pt-4'>
          <Form.Group as={Col} md="4" controlId="validationFormik09">
            <Form.Control
              type="file"
              name="image"
              value={values.image}
              onChange={e => setFile(e.target.files[0])}
              isInvalid={!!errors.montoServicio}
              accept="image/*"
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
              <br/>
              <Button type="button" className='ms-2' onClick={() => handleUpload()}
                variant="warning">Cargar imagen
              </Button>
            </Form.Group>
          </Row>
          <Row className='pt-4'>
          {
            servicio.imagenes?.map(function (value, index, array) {
              if(value.estado == 1)
              return <Card className='pb-4' key={index}  style={{ width: '18rem' }}>
                        <Card.Body className='text-end'>
                          <Button variant="danger" size="sm" onClick={() => handleInactiveFile(value.id)}>
                            <FaTimes />
                          </Button>
                        </Card.Body>
                        <Card.Img variant="top" src={'/images/'+value?.filename}  className='pb-1'/>
                      </Card >
            })
          }
          </Row>
        <br />
      </Form>
      </div>
    </>
  )
}
export default ServicioEditComponent