import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { salidaByNumeroMercaderia } from '../../service/FacturaService';

const MercaderiaSalidaComponent = ({ show, handleClose, numeroMercaderia }) => {

  const [salidas, setSalidas] = useState([])

  console.log(numeroMercaderia)

  const buscarClienteByDescripcion = () => {
    salidaByNumeroMercaderia(numeroMercaderia).then(response => {
      setSalidas(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    if(show){
      buscarClienteByDescripcion()
    }
  }, [show])

  

  return (
    <>
      <Modal show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
        className='anyClass'>
        <Modal.Header closeButton>
          <Modal.Title>Listado de salidas por mercaderia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>RUC</Form.Label>
              <Form.Control
                type="text"
                name='ruc'
                placeholder="Ingrese el ruc"
                autoComplete='off'
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                name='razonSocial'
                placeholder="Ingrese el nombre del cliente"
                autoComplete='off'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>


          {salidas.length > 0 &&
            <div className="table-responsive container">
              <table className="table mb-0">
                <thead className="thead-light">
                  <tr>
                    <th className='td-th-size-depo'>Cantidad</th>
                    <th className='td-th-size-depo'>Saldo restante</th>
                    <th className='td-th-size-depo'>Descripcion</th>
                    <th className='td-th-size-depo'>fecha de salida</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    salidas.map(salida =>
                      <tr key={salida.id}>
                        <td className='td-th-size-depo'>{salida.cantidadSalida}</td>
                        <td className='td-th-size-depo'>{salida.saldoRestante}</td>
                        <td className='td-th-size-depo'>{salida.descripcionSalida}</td>
                        <td className='td-th-size-depo'>{(new Date(salida.fechaSalida)).toLocaleString().substring(0, 10).split(",")[0]}</td>
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
export default MercaderiaSalidaComponent;