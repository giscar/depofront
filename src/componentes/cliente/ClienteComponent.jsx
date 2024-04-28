import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { clienteForDescripcion } from '../../service/FacturaService';
import { useState } from 'react';
import { FaCircleNotch } from 'react-icons/fa';

function ClienteComponent() {
  const { Formik } = formik;

  const [clientes, setClientes] = useState([])

  const schema = yup.object().shape({
    ruc: yup.string().required(),
    razonSocial: yup.string().required(),
  });

  const buscarClienteByDescripcion = (data) => {
    console.log(data)
    clienteForDescripcion(data.razonSocial).then((response) =>{
      setClientes(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={
          buscarClienteByDescripcion
        }
        initialValues={{
          ruc: '',
          razonSocial: '',
        }}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>Ruc</Form.Label>
                <Form.Control
                  type="text"
                  name="ruc"
                  value={values.ruc}
                  onChange={handleChange}
                  isInvalid={!!errors.ruc}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ruc}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Razon Social</Form.Label>
                <Form.Control
                  type="text"
                  name="razonSocial"
                  value={values.razonSocial}
                  onChange={handleChange}
                  isInvalid={!!errors.razonSocial}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.razonSocial}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Buscar</Button>
          </Form>
        )}
      </Formik>
      <br/>
      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>RUC</th>
            <th>Razon</th>
            <th>Dirección</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map(cliente =>
              <tr key={cliente.id}>
                <td>{cliente.ruc}</td>
                <td>{cliente.razonSocial}</td>
                <td>{cliente.direccion}</td>
                <td>
                  <Button onClick={() => seleccionarCliente(cliente)}>
                    <FaCircleNotch />
                  </Button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  );
}

export default ClienteComponent;