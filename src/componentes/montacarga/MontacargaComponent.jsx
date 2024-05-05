import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { montacargaEdit, montacargaForAll, montacargaForId, montacargasActivo } from '../../service/FacturaService';
import { Button, Modal } from 'react-bootstrap';
import { FaPencilAlt, FaWindowClose } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MontacargaComponent = () => {

  const notify = () => toast.info('Se ha eliminado la montacarga correctamente', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const [show, setShow] = useState(false);
  const [montacarga, setMontacarga] = useState([]);
  const [montacargas, setMontacargas] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMontacarga = (id) => {
    montacargaForId(id).then((response) => {
      setMontacarga(response.data);
      console.log(montacarga)
      setShow(true);
    }).catch(error => {
      console.error(error)
    })
  }

  const inactivaMontacarga = () => {
    montacarga.estado = 0;
    montacargaEdit(montacarga).catch(error => {
      console.error(error)
    })
    setShow(false);
    notify();
    setTimeout(() => {
      buscarMontacarga();
    })
  }

  const navigator = useNavigate();
  

  const irMontacargaNuevo = () =>{
    navigator("/montacargasNuevo")
  }

  const irMontacargaEdit = (id) =>{
    navigator(`/montacargasEdit/${id}`)
  }

  const buscarMontacarga= () => {
    debugger
    console.log("entro buscarMontacarga")
      montacargasActivo().then((response) => {
        setMontacargas(response.data);
      }).catch(error => {
        console.error(error)
      })
      //window.location.reload();
  }

  useEffect(()=>{
    console.log("useEffect")
    buscarMontacarga();
  } , [montacarga])


  return (
    <>
          
        <br/>
        <Button type="bottom" className='ms-2' variant="primary" onClick={() => irMontacargaNuevo()}>Nuevo</Button>
      


      <br />
      <div className='container tableFixHead'>
      <table className='table table-striped table-bordered table-hover' responsive="md">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Serie</th>
            <th>Tonelaje</th>
            <th>Tipo de Servicio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            montacargas.map(montacarga =>
              <tr key={montacarga.id}>
                <td>{montacarga.nombre}</td>
                <td>{montacarga.serie}</td>
                <td>{montacarga.tonelaje}</td>
                <td>{montacarga.tipoServicio}</td>
                <td>
                  <Button className='m-2' onClick={() => irMontacargaEdit(montacarga.id)}>
                    <FaPencilAlt />
                  </Button>
                  <Button className='error' variant="danger" onClick={() => handleMontacarga(montacarga.id)}>
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
          <Button variant="primary" onClick={() => inactivaMontacarga()}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  )
}

export default MontacargaComponent