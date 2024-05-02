import { montacargaSave } from '../../service/FacturaService';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';

const MontacargaNuevoComponent = () => {
  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    });

  const saveMontacarga = (data) => {
    debugger
    data.serie = data.serie.toUpperCase();
    data.nombre = data.nombre.toUpperCase();
    data.tonelaje = data.tonelaje.toUpperCase();
    data.tipoServicio = data.tipoServicio.toUpperCase();
    montacargaSave(data).catch(error => {
      console.error(error)
    })
    handleReset()
    notify()
  }

  const { handleSubmit, handleChange, handleReset, values, errors } = useFormik({
    validationSchema: yup.object({
      serie: yup.string(),
      nombre: yup.string(),
      tonelaje: yup.string(),
      tipoServicio: yup.string(),
    }),
    initialValues: {
      nombre: '',
      serie: '',
      tonelaje: '',
      tipoServicio: ''
    },
    onSubmit: saveMontacarga,
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

export default MontacargaNuevoComponent