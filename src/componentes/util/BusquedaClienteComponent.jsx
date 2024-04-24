import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const BusquedaClienteComponent = ({show, handleClose}) => {

  const [ruc, setRuc] = useState('')
  const [cliente, setCliente] = useState('')
  const handleSubmit = (event) => {
  
  const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

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
                defaultValue={ruc}
                placeholder="Ingrese el ruc"
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
                defaultValue={cliente}
                placeholder="Ingrese el nombre del cliente"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BusquedaClienteComponent;