import React, {useEffect, useState} from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { editaFactura, facturaForId, nuevaFactura } from '../../service/FacturaService'

const FacturaComponent = () => {

    const [ruc, setRuc] = useState('')
    const [monto, setMonto] = useState('')
    const [moneda, setMoneda] = useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
        ruc : '',
        monto : '',
        moneda : ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            facturaForId(id).then((response) => {
                setRuc(response.data.ruc);
                setMonto(response.data.monto);
                setMoneda(response.data.moneda);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id])

    function saveOrUpdateFactura(e){
        e.preventDefault();
        if(validateForm()){
            if(id){
                const factura = {ruc, monto, moneda, id}
                editaFactura(factura).then((response) => {
                    console.log(response.data);
                    navigator('/facturas')
                }).catch(error => {
                    console.log(error)
                })
            }else{
                const factura = {ruc, monto, moneda}
                nuevaFactura(factura).then((response) => {
                    console.log(response.data);
                    navigator('/facturas')
                }).catch(error => {
                    console.log(error)
                })
            }
        }
        
    }

    function validateForm(){
        let valid = true;
        const errorCopy = {... errors}

        if (ruc.trim()){
            errorCopy.ruc = '';
        }else{
            errorCopy.ruc = 'Tiene que ingresar el ruc';
            valid = false;
        }

        if (monto){
            errorCopy.monto = '';
        }else{
            errorCopy.monto = 'Tiene que ingresar el monto';
            valid = false;
        }

        if (moneda){
            errorCopy.moneda = '';
        }else{
            errorCopy.moneda = 'Tiene que ingresar la moneda';
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2>Actualizar Facturas</h2>
        }else{
            return <h2>Agregar de Facturas</h2>
        }
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='card'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>RUC:</label>
                            <input type='text' placeholder='Ingrese el RUC' name='txtRuc' value={ruc} className={`form-control ${errors.ruc? 'is-invalid' : ''}`} onChange={(e) =>{setRuc(e.target.value)}}></input>
                            {errors.ruc && <div className='invalid-feedback'>{errors.ruc}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Monto:</label>
                            <input type='text' placeholder='Ingrese el Monto' name='txtMonto' value={monto} className={`form-control ${errors.monto? 'is-invalid' : ''}`} onChange={(e) =>{setMonto(e.target.value)}}></input>
                            {errors.monto && <div className='invalid-feedback'>{errors.monto}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Moneda:</label>
                            <input type='text' placeholder='Ingrese el Moneda' name='txtMoneda' value={moneda} className={`form-control ${errors.moneda? 'is-invalid' : ''}`} onChange={(e) => {setMoneda(e.target.value)}}></input>
                            {errors.moneda && <div className='invalid-feedback'>{errors.moneda}</div>}
                        </div>
                        
                        <button className='btn btn-success' onClick={saveOrUpdateFactura}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FacturaComponent