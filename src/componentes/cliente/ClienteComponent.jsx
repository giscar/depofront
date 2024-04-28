import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { clienteForDescripcion, clienteForRuc } from '../../service/FacturaService';
import { useState } from 'react';
import { FaCircleNotch } from 'react-icons/fa';

function ClienteComponent() {

  const [clientes, setClientes] = useState([])
  const [ruc, setRuc] = useState([])

  const buscarClienteByDescripcion = (data) => {
    if (!data.ruc && !data.razonSocial) {
      return
    }
    if (data.razonSocial) {
      clienteForDescripcion(data.razonSocial).then((response) => {
        setClientes(response.data);
      }).catch(error => {
        console.error(error)
      })
    } else {
      clienteForRuc(data.ruc).then((response) => {
        setClientes(response.data);
      }).catch(error => {
        console.error(error)
      })
    }
  }

  const limpiar = (data) => {
    debugger;
    console.log(Form.value)
    setClientes([])
    setRazonSocial("")
    setRuc("")
  }
  //
  const { handleSubmit, handleChange, handleReset, values, errors } = useFormik({
    validationSchema: yup.object({
      ruc: yup.number(),
      razonSocial: yup.string(),
    }),
    initialValues: {
      ruc: '',
      razonSocial: '',
    },
    onSubmit: buscarClienteByDescripcion,
  })

  return (
    <>

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
              autoComplete='off'
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
              style={{ textTransform: 'uppercase' }}
              autoComplete='off'
            />
            <Form.Control.Feedback type="invalid">
              {errors.razonSocial}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" variant="outline-primary">Buscar</Button>
        <Button type="reset" onClick={() => handleReset(
            setClientes([])
          )}
          variant="outline-warning">Limpiar</Button>
      </Form>


      <br />
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