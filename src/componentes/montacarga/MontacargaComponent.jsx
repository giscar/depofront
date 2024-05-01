import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { montacargaForAll } from '../../service/FacturaService';
import { Button } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';

const MontacargaComponent = () => {

  const navigator = useNavigate();
  const [montacargas, setMontacargas] = useState([])

  const irMontacargaNuevo = () =>{
    navigator("/montacargasNuevo")
  }

  const irMontacargaEdit = (id) =>{
    debugger
    navigator(`/montacargasEdit/${id}`)
  }

  const buscarMontacarga= () => {
      montacargaForAll().then((response) => {
        setMontacargas(response.data);
      }).catch(error => {
        console.error(error)
      })
  }

  buscarMontacarga();

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
                  <Button onClick={() => irMontacargaEdit(cliente.id)}>
                    <FaPencilAlt />
                  </Button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      </div>
      
    </>
  )
}

export default MontacargaComponent