import React from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { operadorSave } from '../../service/FacturaService';

const OperadorNuevoComponent = () => {

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    });

  const saveOperador = (data) => {
    data.nombre = data.nombre.toUpperCase();
    data.documento = data.documento.toUpperCase();
    data.movil = data.movil.toUpperCase();
    data.direccion = data.direccion.toUpperCase();
    data.email = data.email.toUpperCase();
    data.estado = "1";
    operadorSave(data).catch(error => {
      console.error(error)
    })
    handleReset()
    notify()
  }

  const { handleSubmit, handleChange, handleReset, values, errors } = useFormik({
    validationSchema: yup.object({
      nombre: yup.string().required(),
      documento: yup.string().required(),
      movil: yup.string().required(),
      direccion: yup.string().required(),
      email: yup.string().required()
    }),
    initialValues: {
      nombre: '',
      documento: '',
      movil: '',
      direccion: '',
      email: ''
    },
    onSubmit: saveOperador,
  })

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              isInvalid={!!errors.nombre}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationFormik02">
            <Form.Label>Documento</Form.Label>
            <Form.Control
              type="text"
              name="documento"
              value={values.documento}
              onChange={handleChange}
              isInvalid={!!errors.documento}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.documento}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationFormik03">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="movil"
              value={values.movil}
              onChange={handleChange}
              isInvalid={!!errors.movil}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.movil}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationFormik04">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
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
          <Form.Group as={Col} md="4" controlId="validationFormik05">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Button type="submit" variant="info">Guardar</Button>
            <Button type="reset" className='ms-2' onClick={() => handleReset()}
          variant="warning">Limpiar
        </Button>
          </Form.Group>
        </Row>
        <br/>
      </Form>
    </>
  )
}

export default OperadorNuevoComponent