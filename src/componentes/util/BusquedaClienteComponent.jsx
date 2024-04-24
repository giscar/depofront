import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Formik, useFormik } from 'formik';
import { clienteForRuc } from '../../service/FacturaService';

const BusquedaClienteComponent = ({show, handleClose}) => {

  const [ruc, setRuc] = useState();
  const [razonSocial, setRazonSocial] = useState();
  const [cliente, setCliente] = useState([])

  const buscarCliente = () => {
    const clienteData = [ruc, razonSocial]
    console.log(clienteData);
    clienteForRuc(ruc).then((response) =>{
      debugger
      setCliente(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  const formik = useFormik({
    initialValues : {
      ruc : "",
      cliente : ""
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BusquedaClienteComponent;