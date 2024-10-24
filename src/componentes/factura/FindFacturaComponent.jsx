import React, {useEffect, useState} from 'react'
import {listaFacturas} from '../../service/FacturaService'
import { useNavigate } from 'react-router-dom'

const FindFacturaComponent = () => {

    const [facturas, setFacturas] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        listaFacturas().then((response) =>{
            setFacturas(response.data);
        }).catch(error => {
            console.error(error)
        })
    }, [])

    function addFactura(){
        navigator("/addNuevaFactura")
    }

    function editFactura(id){
        navigator(`/editFactura/${id}`)
    }

  return (
    <div>
        <h2>Lista de facturas</h2>
        <button className='btn btn-primary mb-2' onClick={addFactura}>Nueva Factura</button>
        <table className='table table-striped table-bordered table-hover'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>RUC</th>
                    <th>Monto</th>
                    <th>Moneda</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    facturas.map(factura =>
                        <tr key={factura.id}>
                            <td>{factura.id}</td>
                            <td>{factura.ruc}</td>
                            <td>{factura.monto}</td>
                            <td>{factura.moneda}</td>
                            <td><button className='btn btn-success' onClick={() => editFactura(factura.id)}>Actualizar</button></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default FindFacturaComponent