import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import * as yup from 'yup';
import { useFormik, useFormikContext } from 'formik';
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { montacargasActivo, operadorActivo, operadorForId, servicioSave } from '../../service/FacturaService';

const ServicioNuevoComponent = () => {

  const [cliente, setCliente] = useState([])
  const [operadores, setOperadores] = useState([])
  const [montacargas, setMontacargas] = useState([])
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const saveServicio = (data) => {
    debugger
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
    servicioSave(data).catch(error => {
      console.error(error)
    })
    handleReset()
    setRazonSocial('')
    setRuc('')
    setDireccion('')
    notify()
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      codServicio: '',
      ruc: '',
      razonSocial: '',
      direccion: '',
      horaSalidaLocal: '',
      horaInicioServicio: '',
      horaFinServicio: '',
      horaRetornoLocal: '',
      operadorId: '',
      montacargaId: '',
    },
    onSubmit: saveServicio,
  });

  useEffect(() => {
    operadorActivo().then((response) => {
      setOperadores(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    montacargasActivo(1).then((response) => {
      setMontacargas(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    setRuc(cliente.ruc)
    setRazonSocial(cliente.razonSocial)
    setDireccion(cliente.direccion)
    values.ruc = cliente.ruc
    values.razonSocial = cliente.razonSocial
    values.direccion = cliente.direccion
  }, [cliente])

  return (
    <>
    <div className='container-fluid'>
      <h3>Registrar servicio</h3>
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
              onClick={handleShow} readOnly
              value={values.ruc}
              onChange={handleChange}
              isInvalid={!!errors.ruc}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.ruc}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="6" controlId="validationFormik03">
            <Form.Label>Razon Social</Form.Label>
            <Form.Control
              type="text"
              name="razonSocial"
              disabled
              value={values.razonSocial}
              onChange={handleChange}
              isInvalid={!!errors.razonSocial}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.razonSocial}
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="6" controlId="validationFormik04">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              disabled
              value={values.direccion}
              onChange={handleChange}
              isInvalid={!!errors.direccion}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.direccion}
            </Form.Control.Feedback>
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
              value={values.horaSalidaLocal}
              onChange={handleChange}
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
              value={values.horaRetornoLocal}
              onChange={handleChange}
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
          <Form.Group as={Col} md="4" className='pt-4'>
            <Button type="submit" variant="info">Guardar</Button>
            <Button type="reset" className='ms-2' onClick={() => handleReset()}
              variant="warning">Limpiar
            </Button>
          </Form.Group>
        <br />
      </Form>
      </div>
      <BusquedaClienteComponent show={show} handleClose={handleClose} setCliente={setCliente} />
    </>
  )
}

export default ServicioNuevoComponent