import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clienteForRuc, deleteFile, inactiveFile, montacargasActivo, operadorActivo, servicioEdit, servicioForId, servicioSave, uploadFile } from '../../service/FacturaService';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent';
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

  const [ruc, setRuc] = useState([])
  const [cliente, setCliente] = useState([])
  const [razonSocial, setRazonSocial] = useState([])
  const [direccion, setDireccion] = useState([])
  const [operadores, setOperadores] = useState([])
  const [montacargas, setMontacargas] = useState([])
  const [file, setFile] = useState()
  const [cargarImagen, setCargarImagen] = useState(false)
  const [horaSalidaLocal, setHoraSalidaLocal] = useState("")
  const [horaRetornoLocal, setHoraRetornoLocal] = useState("")
  const [totalHoras, setTotalHoras] = useState("")

  const editServicio = (data) => {
    data.id = id;
    data.codServicio = data.codServicio.toUpperCase();
    data.ruc = data.ruc.toUpperCase();
    data.razonSocial = data.razonSocial.toUpperCase();
    data.direccion = data.direccion.toUpperCase();
    data.horaSalidaLocal = data.horaSalidaLocal.toUpperCase();
    data.horaInicioServicio = data.horaInicioServicio.toUpperCase();
    data.horaFinServicio = data.horaFinServicio.toUpperCase();
    data.horaRetornoLocal = data.horaRetornoLocal.toUpperCase();
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

  useEffect(() => {
    if(id){
      servicioForId(id).then((response) => {
          setServicio(response.data);
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
      values.totalHoras = horas.toFixed(2)
      servicio.totalHoras = horas.toFixed(2)
    }
  }, [horaSalidaLocal, horaRetornoLocal, cliente])

  const { handleSubmit, handleChange, handleReset, values, errors } = useFormik({
    validationSchema: yup.object({
      codServicio: yup.string().required(),
      ruc: yup.string().required(),
      razonSocial: yup.string().required(),
      direccion: yup.string().required(),
      //horaSalidaLocal: yup.string().required(),
      //horaInicioServicio: yup.string().required(),
      //horaFinServicio: yup.string().required(),
      //horaRetornoLocal: yup.string().required(),
      operadorId: yup.string().required(),
      montacargaId: yup.string().required(),
      
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
    debugger
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