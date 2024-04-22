import React, {useEffect, useState} from 'react'
import { facturaForId, nuevaFactura } from '../service/FacturaService'
import { useNavigate, useParams } from 'react-router-dom'

const FacturaComponent = () => {

    const [id, setId] = useState('')
    const [ruc, setRuc] = useState('')
    const [monto, setMonto] = useState('')
    const [moneda, setMoneda] = useState('')
    const [errors, setErrors] = useState({
        id : '',
        ruc : '',
        monto : '',
        moneda : ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            facturaForId().then((response) => {
                setId(response.data.id);
                setRuc(respnde.data.ruc);
                setMonto(response.data.monto);
                setMoneda(response.data.moneda);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id])

    function saveFactura(e){
        debugger
        e.preventDefault();
        if(validateForm()){
            const factura = {id, ruc, monto, moneda}

            nuevaFactura(factura).then((response) => {
                console.log(response.data);
                navigator('/facturas')
            })
        }
        
    }

    function validateForm(){
        let valid = true;
        const errorCopy = {... errors}

        if (id.trim()){
            errorCopy.id = '';
        }else{
            errorCopy.id = 'Tiene que ingresar el id';
            valid = false;
        }

        if (ruc.trim()){
            errorCopy.ruc = '';
        }else{
            errorCopy.ruc = 'Tiene que ingresar el ruc';
            valid = false;
        }

        if (monto.trim()){
            errorCopy.monto = '';
        }else{
            errorCopy.monto = 'Tiene que ingresar el monto';
            valid = false;
        }

        if (moneda.trim()){
            errorCopy.moneda = '';
        }else{
            errorCopy.moneda = 'Tiene que ingresar la moneda';
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    function pageTitle(id){
        debugger
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
                            <label className='form-label'>ID:</label>
                            <input type='text' placeholder='Ingrese el ID' name='txtIdFactura' value={id} className={`form-control ${errors.id? 'is-invalid' : ''}`} onChange={(e) =>{setId(e.target.value)}}></input>
                            {errors.id && <div className='invalid-feedback'>{errors.id}</div>}
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
                        
                        <button className='btn btn-success' onClick={saveFactura}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FacturaComponent