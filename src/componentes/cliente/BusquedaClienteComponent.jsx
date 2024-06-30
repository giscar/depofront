import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { clienteForDescripcion, clienteForRuc } from '../../service/FacturaService';
import { FaCircleNotch } from 'react-icons/fa';

const BusquedaClienteComponent = ({show, handleClose, setCliente}) => {

  const [ruc, setRuc] = useState();
  const [razonSocial, setRazonSocial] = useState('');
  const [clientes, setClientes] = useState([])
  
  const buscarClienteByDescripcion = () => {
    const data = {ruc, razonSocial}
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

  const seleccionarCliente = (cliente) => {
    setCliente(cliente)
    setClientes([])
    setRuc('')
    setRazonSocial('')
    handleClose()
  }

  return (
    <>
      <Modal show={show} 
              onHide={handleClose} 
              size="lg"
              backdrop="static"
              keyboard={false}
              className='anyClass'>
        <Modal.Header closeButton>
          <Modal.Title>Busqueda de clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>RUC</Form.Label>
              <Form.Control
                type="text"
                name='ruc'
                placeholder="Ingrese el ruc"
                value={ ruc }
                onChange={(e) =>{setRuc(e.target.value)}}
                autoComplete='off'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                name='razonSocial'
                placeholder="Ingrese el nombre del cliente"
                value={ razonSocial }
                onChange={(e) =>{setRazonSocial(e.target.value)}}
                autoComplete='off'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Salir
          </Button>
          <Button variant="primary" onClick={() => buscarClienteByDescripcion()}>
            Buscar
          </Button>
          <br/>
          {clientes.length > 0 && 
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
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BusquedaClienteComponent;