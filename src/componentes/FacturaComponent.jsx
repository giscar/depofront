import React, {useState} from 'react'
import { nuevaFactura } from '../service/FacturaService'
import { useNavigate } from 'react-router-dom'

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

  return (
    <div className='container'>
        <div className='row'>
            <div className='card'>
                <h2>Lista de Facturas</h2>
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