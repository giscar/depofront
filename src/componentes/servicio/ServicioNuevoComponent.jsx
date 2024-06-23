import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { montacargasActivo, operadorActivo, servicioSave } from '../../service/FacturaService';

const ServicioNuevoComponent = () => {

  const [cliente, setCliente] = useState([])
  const [operadores, setOperadores] = useState([])
  const [montacargas, setMontacargas] = useState([])
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [codServicio, setCodServicio] = useState('')
  const [operadorId, setOperadorId] = useState('')
  const [montacargaId, setMontacargaId] = useState('')
  const [horaSalidaLocal, setHoraSalidaLocal] = useState('')
  const [horaInicioServicio, setHoraInicioServicio] = useState('')
  const [horaRetornoLocal, setHoraRetornoLocal] = useState('')
  const [horaFinServicio, setHoraFinServicio] = useState('')
  const [totalHoras, setTotalHoras] = useState('')
  const [montoServicio, setMontoServicio] = useState('')

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const saveServicio = (e) => {
    debugger
    e.preventDefault();
    const data = {}   
    data.codServicio = codServicio;
    data.ruc = ruc;
    data.razonSocial = razonSocial?.toUpperCase();
    data.direccion = direccion?.toUpperCase();
    data.horaSalidaLocal = horaSalidaLocal;
    data.horaInicioServicio = horaInicioServicio;
    data.horaFinServicio = horaFinServicio;
    data.horaRetornoLocal = horaRetornoLocal;
    data.operadorId = operadorId;
    data.montacargaId = montacargaId;
    data.totalHoras = totalHoras;
    data.montoServicio = montoServicio;
    data.estado = "1";
    servicioSave(data).catch(error => {
      console.error(error)
    }).then(data => {
      limpiar()
      notify()
    })
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    operadorActivo().then((response) => {
      setOperadores(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    montacargasActivo().then((response) => {
      setMontacargas(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    setRuc(cliente?.ruc)
    setRazonSocial(cliente?.razonSocial)
    setDireccion(cliente?.direccion)
  }, [cliente])

  const limpiar = () => {
    setRuc('')
    setRazonSocial('')
    setDireccion('')
    setCliente([])
    setOperadorId('')
    setMontacargaId('')
    setCodServicio('')
    setHoraSalidaLocal('')
    setHoraInicioServicio('')
    setHoraFinServicio('')
    setHoraRetornoLocal('')
    setTotalHoras('')
    setMontoServicio('')

  };

  return (
    <>
      <div className='container-fluid'>
        <h3>Registrar servicio</h3>
        <br /><br />
        <Form onSubmit={saveServicio}>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Codigo del Servicio</Form.Label>
              <Form.Control
                type="text"
                name="codServicio"
                value={ codServicio }
                onChange={(e) =>{setCodServicio(e.target.value)}}
                autoComplete='off'
              />
              <Form.Control.Feedback type="invalid">
                
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>RUC</Form.Label>
              <Form.Control
                type="text"
                name="ruc"
                value={ ruc }
                onClick={handleShow} 
                readOnly
                onChange={(e) =>{setRuc(e.target.value)}}
                autoComplete='off'
              />
              <Form.Control.Feedback type="invalid">
                
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Razon Social</Form.Label>
              <Form.Control
                as="textarea"
                name="razonSocial"
                value={ razonSocial }
                disabled
                onChange={(e) =>{setRazonSocial(e.target.value)}}
                style={{ textTransform: 'uppercase' }}
                autoComplete='off'
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                as="textarea"
                name="direccion"
                value={ direccion }
                disabled
                onChange={(e) =>{setDireccion(e.target.value)}}
                style={{ textTransform: 'uppercase' }}
                autoComplete='off'
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Operador</Form.Label>
              <Form.Select
                name="operadorId"
                onChange={(e) =>{setOperadorId(e.target.value)}}
                value={ operadorId }
              >
                <option>Seleccione</option>
                {
                  operadores.map(operador =>
                    <option key={operador.id} value={operador.id}>{operador.nombre}</option>
                  )
                }
              </Form.Select>
              <Form.Control.Feedback type="invalid">

              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Vehículo</Form.Label>
              <Form.Select
                name="montacargaId"
                onChange={(e) =>{setMontacargaId(e.target.value)}}
                value={ montacargaId }
                >
                <option>Seleccione</option>
                {
                  montacargas.map(montacarga =>
                    <option key={montacarga.id} value={montacarga.id}>{montacarga.nombre}</option>
                  )
                }
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" >
              <Form.Label>Hora de salida de la Empresa</Form.Label>
              <Form.Control
                type="datetime-local"
                name="horaSalidaLocal"
                value={ horaSalidaLocal }
                onChange={(e) =>{setHoraSalidaLocal(e.target.value)}}
                style={{ textTransform: 'uppercase' }}
                autoComplete='off'
              />
              <Form.Control.Feedback type="invalid">
                
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Hora de inicio del Servicio</Form.Label>
              <Form.Control
                type="datetime-local"
                name="horaInicioServicio"
                value={ horaInicioServicio }
                onChange={(e) =>{setHoraInicioServicio(e.target.value)}}
                style={{ textTransform: 'uppercase' }}
                autoComplete='off'
              />
              <Form.Control.Feedback type="invalid">
                
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Hora de fin del Servicio</Form.Label>
              <Form.Control
                type="datetime-local"
                name="horaFinServicio"
                value={ horaFinServicio }
                onChange={(e) =>{setHoraFinServicio(e.target.value)}}
                style={{ textTransform: 'uppercase' }}
                autoComplete='off'
              />
              <Form.Control.Feedback type="invalid">
                
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Hora de retorno a la empresa</Form.Label>
              <Form.Control
                type="datetime-local"
                name="horaRetornoLocal"
                value={ horaRetornoLocal }
                onChange={(e) =>{setHoraRetornoLocal(e.target.value)}}
                style={{ textTransform: 'uppercase' }}
                autoComplete='off'
              />
              <Form.Control.Feedback type="invalid">
              
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Horas de servicio</Form.Label>
              <Form.Control
                type="number"
                name="totalHoras"
                value={ totalHoras }
                onChange={(e) =>{setTotalHoras(e.target.value)}}
                style={{ textTransform: 'uppercase' }}
                autoComplete='off'
              />
              <Form.Control.Feedback type="invalid">
                
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Monto del servicio</Form.Label>
              <Form.Control
                type="text"
                name="montoServicio"
                value={ montoServicio }
                onChange={(e) =>{setMontoServicio(e.target.value)}}
                style={{ textTransform: 'uppercase' }}
                autoComplete='off'
              />
              <Form.Control.Feedback type="invalid">
                
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" className='pt-4'>
              <Button type="submit" variant="info" >Guardar</Button>
              <Button type="button" className='ms-2' onClick={() => limpiar()}
                variant="warning">Limpiar
              </Button>
            </Form.Group>
          </Row>

          <br />
        </Form>
      </div>
      <BusquedaClienteComponent show={show} handleClose={handleClose} setCliente={setCliente} />
    </>
  )
}
export default ServicioNuevoComponent