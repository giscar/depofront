import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { clienteForDescripcion, clienteForRuc } from '../../service/FacturaService';
import { useState } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import './ClienteComponent.css';
import { useNavigate } from 'react-router-dom';

function ClienteComponent() {

  const navigator = useNavigate();

  const [clientes, setClientes] = useState([])
  const [ruc, setRuc] = useState([])

  const accederNuevoCliente = () =>{
    navigator("/nuevoCliente")
  }

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
          <Form.Group as={Col} md="4">
            <Button type="submit" variant="info">Buscar</Button>
            <Button type="reset" className='ms-2' onClick={() => handleReset(setClientes([]))}
          variant="warning">Limpiar
        </Button>
          </Form.Group>
        </Row>
        <br/>
        <Button type="bottom" className='ms-2' variant="primary" onClick={() => accederNuevoCliente()}>Nuevo</Button>
      </Form>


      <br />
      <div className='container tableFixHead'>
      <table className='table table-striped table-bordered table-hover' responsive="md">
        <thead>
          <tr>
            <th>RUC</th>
            <th>Razón Social</th>
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
      </div>
      
    </>
  );
}

export default ClienteComponent;