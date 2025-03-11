import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ingresoById, mercaderiaByNumeroMercaderia, salidaByNumeroMercaderia } from '../../service/FacturaService';

const MercaderiaSalidaComponent = ({ show, handleClose, numeroMercaderia, idIngreso }) => {

  const [salidas, setSalidas] = useState([])
  const [mercaderia, setMercaderia] = useState([])
  const [ingreso, setIngreso] = useState([])

  const buscarClienteByDescripcion = () => {
    salidaByNumeroMercaderia(numeroMercaderia).then(response => {
      setSalidas(response.data)
      mercaderiaByNumeroMercaderia(numeroMercaderia).then(response => {
        setMercaderia(response.data)
      })
    }).catch(error => {
      console.log(error)
    })
  }

  const buscarIngresoById = () => {
    ingresoById(idIngreso).then(response => {
      setIngreso(response.data)
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    if(show){
      buscarClienteByDescripcion()
      buscarIngresoById()
    }
  }, [show])

  

  return (
    <>
      <Modal show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
        className=''>
        <Modal.Header closeButton>
          <Modal.Title>Listado de salidas por mercaderia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
            <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={mercaderia.numeroMercaderia}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Codigo Producto:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={mercaderia.productoCodigo}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Descripcion:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={mercaderia.descripcionProducto}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">RUC:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={ingreso.ruc}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">RazonSocial:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={ingreso.razonSocial}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
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