import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { operadorActivo, operadorEdit, operadorForId } from '../../service/FacturaService';
import { Button, Modal } from 'react-bootstrap';
import { FaPencilAlt, FaWindowClose } from 'react-icons/fa';
import { useEffect } from 'react';

const OperadorComponent = () => {

  const navigator = useNavigate();

  const notify = () => toast.info('Se ha eliminado el operador correctamente', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const irOperadorNuevo = () => {
    navigator("/operadorNuevo")
  }

  const irOperadorEdit = (id) => {
    navigator(`/operadorEdit/${id}`)
  }

  const [show, setShow] = useState(false);
  const [operador, setOperador] = useState([]);
  const [operadores, setOperadores] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOperador = (id) => {
    operadorForId(id).then((response) => {
      setOperador(response.data);
      setShow(true);
    }).catch(error => {
      console.error(error)
    })
  }

  const inactivaOperador = () => {
    operador.estado = 0;
    operadorEdit(operador).catch(error => {
      console.error(error)
    })
    setShow(false);
    notify();
    setTimeout(() => {
      buscarOperador()
    }, 1000);
  }

  const buscarOperador = () => {
    console.log("entro buscarOperador")
    operadorActivo().then((response) => {
      setOperadores(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    console.log("useEffect")
    buscarOperador();
  }, [operador])

  return (
    <>
<div className='container-fluid'>
    <h3>Listado de operadores</h3>
    <br/>

<div className='float-end pb-3'>
<Button type="bottom" className='ms-2' variant="primary" onClick={() => irOperadorNuevo()}>Nuevo operador</Button>
        </div>
      <br />
        <table className='table table-striped table-bordered table-hover' responsive="md">
          <thead>
            <tr>
              <th>nombre</th>
              <th>documento</th>
              <th>movil</th>
              <th>direccion</th>
              <th>email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              operadores.map(operador =>
                <tr key={operador.id}>
                  <td>{operador.nombre}</td>
                  <td>{operador.documento}</td>
                  <td>{operador.movil}</td>
                  <td>{operador.direccion}</td>
                  <td>{operador.email}</td>
                  <td>
                    <Button className='m-2' onClick={() => irOperadorEdit(operador.id)}>
                      <FaPencilAlt />
                    </Button>
                    <Button className='error' variant="danger" onClick={() => handleOperador(operador.id)}>
                      <FaWindowClose />
                    </Button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro de eliminar el registro!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => inactivaOperador()}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default OperadorComponent