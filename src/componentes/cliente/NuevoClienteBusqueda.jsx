import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { clienteForRuc, consultaRuc, nuevoCliente } from '../../service/FacturaService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const NuevoClienteBusqueda = ({ show, handleClose, setCliente }) => {

  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')

  const showLoading = () => {
    Swal.fire({
      title: 'Cargando',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
      }
    })
  }

  const closeLoading = () => {
    Swal.close()
  }

  const alerta = (msg) => {
    Swal.fire({
      title: "Alerta!",
      text: msg,
      icon: "warning"
    })
  }

  const buscaRucDestinatario = (e) => {
    e.preventDefault();
    if (ruc.length !== 11) {
      alerta("El RUC debe tener 11 digitos")
      setRuc("")
      return
    }
    clienteForRuc(ruc).then(p => {
      showLoading()
      if (p.data.length == 0) {
        consultaRuc(ruc).then(response => {
          showLoading()
          setRuc(response.data.ruc)
          setRazonSocial(response.data.razonSocial)
          setDireccion(response.data.direccion)
          const data = {}
          data.ruc = response.data.ruc
          data.razonSocial = response.data.razonSocial
          data.direccion = response.data.direccion
          nuevoCliente(data)
          closeLoading()
        }).catch(error => {
          console.log(error)
          closeLoading()
        })
      }
      if(p.data.length > 0){
        alerta("El RUC que se desea ingresar ya existe en el sistema")
        closeLoading()
      }
      closeLoading()
    })
  }

  const seleccionarCliente = () => {
    let cliente = {}
    cliente.ruc = ruc
    cliente.razonSocial = razonSocial
    cliente.direccion = direccion
    setCliente(cliente)
    setDireccion('')
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
              <div className='row'>
              <div className='col-sm-8'>
              <Form.Label>RUC</Form.Label>
              <Form.Control
                type="number"
                name='ruc'
                placeholder="Ingrese el ruc"
                value={ruc}
                maxLength={11}
                onChange={(e) => { setRuc(e.target.value) }}
                autoComplete='off' />
                </div>
                <div className='col-sm-4 mt-2'>
                  <br/>
                  <button className='btn-depo btn-primary' onClick={buscaRucDestinatario}>Buscar</button>
                </div>
                </div>
            </Form.Group>
            

            <Form.Group className="mb-3">
              <Form.Label>Razon social</Form.Label>
              <Form.Control
                type="text"
                name='razonSocial'
                className='bg-secondary bg-opacity-10'
                placeholder="Razon Social"
                value={razonSocial}
                onChange={(e) => { setRazonSocial(e.target.value) }}
                autoComplete='off' readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                name='direccion'
                className='bg-secondary bg-opacity-10'
                placeholder="Direccion"
                value={direccion}
                onChange={(e) => { setDireccion(e.target.value) }}
                autoComplete='off' readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className='pt-3 text-end'>
            <button className='btn-depo btn-primary' onClick={seleccionarCliente}>Seleccionar</button>
            &nbsp;&nbsp;&nbsp;
            <button className='btn-depo btn-danger' onClick={handleClose}>Cerrar</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default NuevoClienteBusqueda;