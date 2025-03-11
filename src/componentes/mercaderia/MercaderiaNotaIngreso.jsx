import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ingresoById} from '../../service/FacturaService';

const MercaderiaSalidaNotaIngreso = ({ show, handleClose, idIngreso }) => {

  const [codNotaIngreso, setCodNotaIngreso] = useState('')
  const [codIngreso, setCodIngreso] = useState('')
  const [rucAgencia, setRucAgencia] = useState('')
  const [razonSocialAgencia, setRazonSocialAgencia] = useState('')
  const [rucCliente, setrucCliente] = useState('')
  const [razonSocialCliente, setRazonSocialCliente] = useState('')
  const [chofer, setChofer] = useState('')
  const [placaVehiculo, setPlacaVechiculo] = useState('')
  const [fechaRecepcion, setFechaRecepcion] = useState('')
  const [almacenado, setAlmacenado] = useState('')

  const [ingreso, setIngreso] = useState([])


  const buscarIngresoById = () => {
    ingresoById(idIngreso).then(response => {
      debugger
      setIngreso(response.data)
      cargarNotaIngreso(response.data)
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    if(show){
      buscarIngresoById()
    }
  }, [show])

  const cargarNotaIngreso = (data) =>{
    setCodIngreso(data.codIngreso)
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
          <Modal.Title>Nota de ingreso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
            <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Nota de ingreso:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={codNotaIngreso}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Codigo de ingreso:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={codIngreso}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Ruc agencia:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={rucAgencia}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Razon social agencia:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={razonSocialAgencia}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Ruc cliente:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={rucCliente}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Razon Social cliente:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={razonSocialCliente}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Chofer:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={chofer}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Placa del vehiculo:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={placaVehiculo}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Fecha recepcion:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={fechaRecepcion}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Almacenado:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del Ingreso"
                        value={almacenado}
                        className="bg-secondary bg-opacity-10 form-control"
                        readOnly>
                      </input>
                    </div>
                  </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-warning'>Descargar Nota de ingreso</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MercaderiaSalidaNotaIngreso;