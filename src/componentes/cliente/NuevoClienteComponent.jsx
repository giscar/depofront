import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {  nuevoCliente } from '../../service/FacturaService';
import { toast } from 'react-toastify';

function NuevoClienteComponent() {
  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    });

  const saveCliente = (data) => {
    debugger
    nuevoCliente(data).catch(error => {
      console.error(error)
    })
    handleReset()
    notify()
  }

  const { handleSubmit, handleChange, handleReset, values, errors } = useFormik({
    validationSchema: yup.object({
      ruc: yup.number("El RUC debe ser númerico").required("El numero de RUC es requerido").test('eq', 'Debe ingresar 11 números', val => val.toString().length === 11),
      razonSocial: yup.string().required("La razon social es requerido"),
      direccion: yup.string().required("La dirección es requerido"),
    }),
    initialValues: {
      ruc: '',
      razonSocial: '',
      direccion: '',
    },
    onSubmit: saveCliente,
  })

  return (
    <>
      <div className='container'>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="8" controlId="validationFormik01">
              <Form.Label>Ruc</Form.Label>
              <Form.Control
                type="text"
                name="ruc"
                value={values.ruc}
                onChange={handleChange}
                isInvalid={!!errors.ruc}
                autoComplete='off'
                maxLength={11}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ruc}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="8" controlId="validationFormik02">
              <Form.Label>Razon Social</Form.Label>
              <Form.Control
                type="text"
                name="razonSocial"
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
            <Form.Group as={Col} md="8" controlId="validationFormik03">
              <Form.Label>Razon Social</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
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
          <Form.Group as={Col} md="4">
            <Button type="submit" className='ms-2' variant="primary">Guardar</Button>
            <Button type="reset" className='ms-2' onClick={() => handleReset()} variant="warning">Limpiar
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default NuevoClienteComponent;