import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Formik, useFormik } from 'formik';
import { clienteForRuc } from '../../service/FacturaService';

const BusquedaClienteComponent = ({show, handleClose}) => {

  const [ruc, setRuc] = useState();
  const [razonSocial, setRazonSocial] = useState();
  const [clientes, setClientes] = useState([])

  const buscarCliente = () => {
    const clienteData = [ruc, razonSocial]
    console.log(clienteData);
    clienteForRuc(ruc).then((response) =>{
      setClientes(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  const formik = useFormik({
    initialValues : {
      ruc : "",
      razonSocial : ""
    }
  })
  

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>RUC</Form.Label>
              <Form.Control
                type="text"
                name='ruc'
                placeholder="Ingrese el ruc"
                onChange={(e) =>{setRuc(e.target.value)}}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                name='razonSocial'
                placeholder="Ingrese el nombre del cliente"
                onChange={(e) =>{setRazonSocial(e.target.value)}}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={buscarCliente}>
            Save Changes
          </Button>
          <br/>
          <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr>
                <th>ID</th>
                    <th>RUC</th>
                    <th>Razon</th>
                    <th>Direccionn</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    clientes.map(cliente =>
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.ruc}</td>
                            <td>{cliente.razonSocial}</td>
                            <td>{cliente.direccion}</td>
                           
                        </tr>
                    )
                }
            </tbody>
        </table>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BusquedaClienteComponent;