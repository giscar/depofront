import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { montacargaEdit, montacargaForId } from '../../service/FacturaService';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Col, Form, Row } from 'react-bootstrap';

const MontacargaEditComponennt = () => {

  const [montacarga, setMontacarga] = useState([])

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
      montacargaForId(id).then((response) => {
        setMontacarga(response.data);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const editMontacarga = (montacarga) => {
    console.log("entro editMontacarga")
    montacarga.estado = "1"
    montacarga.nombre = montacarga.nombre.toUpperCase();
    montacarga.serie = montacarga.serie.toUpperCase();
    montacarga.tonelaje = montacarga.tonelaje.toUpperCase();
    montacarga.tipoServicio = montacarga.tipoServicio.toUpperCase();
    montacargaEdit(montacarga).catch(error => {
      console.error(error)
    })
    notify()
    setTimeout(() => {
      navigator("/montacargas");
    }, 1000);
  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    validationSchema: yup.object({
      nombre: yup.string().required("El nombre es requerido"),
      serie: yup.string().required("La serie es requerido"),
      tonelaje: yup.string().required("El tonelaje es requerido"),
      tipoServicio: yup.string().required("El tipo de servicio es requerido"),
    }),
    initialValues: {
      nombre: montacarga.nombre,
      serie: montacarga.serie,
      tonelaje: montacarga.tonelaje,
      tipoServicio: montacarga.tipoServicio,
      id: montacarga.id
    },
    onSubmit: editMontacarga,
    enableReinitialize: true
  })

  return (
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
          <Form.Label>Serie</Form.Label>
          <Form.Control
            type="text"
            name="serie"
            value={values.serie}
            onChange={handleChange}
            isInvalid={!!errors.serie}
            style={{ textTransform: 'uppercase' }}
            autoComplete='off'
          />
          <Form.Control.Feedback type="invalid">
            {errors.serie}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormik03">
          <Form.Label>Tonelaje</Form.Label>
          <Form.Control
            type="text"
            name="tonelaje"
            value={values.tonelaje}
            onChange={handleChange}
            isInvalid={!!errors.tonelaje}
            style={{ textTransform: 'uppercase' }}
            autoComplete='off'
          />
          <Form.Control.Feedback type="invalid">
            {errors.tonelaje}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormik04">
          <Form.Label>Tipo de Servicio</Form.Label>
          <Form.Control
            type="text"
            name="tipoServicio"
            value={values.tipoServicio}
            onChange={handleChange}
            isInvalid={!!errors.tipoServicio}
            style={{ textTransform: 'uppercase' }}
            autoComplete='off'
          />
          <Form.Control.Feedback type="invalid">
            {errors.tipoServicio}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Button type="submit" variant="info">Editar</Button>
        </Form.Group>
      </Row>
      <br />
    </Form>
  )
}

export default MontacargaEditComponennt