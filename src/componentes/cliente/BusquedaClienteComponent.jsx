import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { clienteForDescripcion, clienteForRuc } from '../../service/FacturaService';

const BusquedaClienteComponent = ({ show, handleClose, setCliente }) => {

  const [ruc, setRuc] = useState();
  const [razonSocial, setRazonSocial] = useState('');
  const [clientes, setClientes] = useState([])

  const buscarClienteByDescripcion = (e) => {
    debugger
    e.preventDefault();
    const data = { ruc, razonSocial }
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
                value={ruc}
                onChange={(e) => { setRuc(e.target.value) }}
                autoComplete='off'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                name='razonSocial'
                placeholder="Ingrese el nombre del cliente"
                value={razonSocial}
                onChange={(e) => { setRazonSocial(e.target.value) }}
                autoComplete='off'
              />
              <div className='pt-3 float-rigth'>
                <button className='btn-depo btn-danger-depo' onClick={handleClose}>Salir</button>
                &nbsp;&nbsp;&nbsp;
                <button className='btn-depo btn-primary-depo' onClick={buscarClienteByDescripcion}>Buscar</button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <br />
          {clientes.length > 0 &&
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="thead-light">
                  <tr>
                    <th className='td-th-size-depo'>RUC</th>
                    <th className='td-th-size-depo'>Razon</th>
                    <th className='td-th-size-depo'>Dirección</th>
                    <th className='td-th-size-depo'>Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    clientes.map(cliente =>
                      <tr key={cliente.id}>
                        <td className='td-th-size-depo'>{cliente.ruc}</td>
                        <td className='td-th-size-depo'>{cliente.razonSocial}</td>
                        <td className='td-th-size-depo'>{cliente.direccion}</td>
                        <td className='td-th-size-depo text-center'>
                          <a className='icon-link-depo' onClick={() => seleccionarCliente(cliente)}>
                          <i className="bi bi-patch-plus-fill"></i>
                          </a>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default BusquedaClienteComponent;