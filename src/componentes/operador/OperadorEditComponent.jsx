import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { operadorEdit, operadorForId } from '../../service/FacturaService';

const OperadorEditComponent = () => {

  const [operador, setOperador] = useState([])

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

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      operadorForId(id).then((response) => {
        setOperador(response.data);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const editOperador = (operador) => {
    console.log("entro ")
    operador.estado = "1"
    operador.nombre = operador.nombre.toUpperCase();
    operador.direccion = operador.direccion.toUpperCase();
    operador.documento = operador.documento.toUpperCase();
    operador.email = operador.email.toUpperCase();
    operador.movil = operador.movil.toUpperCase();
    operadorEdit(operador).catch(error => {
      console.error(error)
    })
    notify()
    setTimeout(() => {
      navigator("/operadores");
    }, 1000);
  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    validationSchema: yup.object({
      nombre: yup.string().required("El nombre es requerido"),
      direccion: yup.string().required("La serie es requerido"),
      documento: yup.string().required("El tonelaje es requerido"),
      email: yup.string().required("El tipo de servicio es requerido"),
      movil: yup.string().required("El telefono es requerido"),
    }),
    initialValues: {
      nombre: operador.nombre,
      direccion: operador.direccion,
      documento: operador.documento,
      email: operador.email,
      movil: operador.movil,
      id: operador.id
    },
    onSubmit: editOperador,
    enableReinitialize: true
  })

  return (
    <div className='container-fluid'>
      <h3>Editar operador</h3>
      <br/>
    
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
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
            readOnly
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Row>
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
            readOnly
          />
          <Form.Control.Feedback type="invalid">
            {errors.documento}
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col} md="4" controlId="validationFormik03">
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
        </Row>
        <Row>
        <Form.Group as={Col} md="4" controlId="validationFormik04">
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
        </Row>
        <Row>
        <Form.Group as={Col} md="4" controlId="validationFormik05">
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
        </Row>
        <Row className='pt-4'>
        <Form.Group as={Col} md="4">
          <Button type="submit" variant="info">Editar operador</Button>
        </Form.Group>
      </Row>
      <br />
    </Form>
    </div>
  )
}

export default OperadorEditComponent