import React, {useEffect, useState} from 'react'
import BusquedaClienteComponent from '../util/BusquedaClienteComponent';

const ServicioComponent = () => {

    const [codServicio, setCodServicio] = useState('')
    const [ruc, setRuc] = useState('')
    const [razonSocial, setRazonSocial] = useState('')
    const [direccion, setDireccion] = useState('')
    const [horaSalidaLocal, setHoraSalidaLocal] = useState('')
    const [horaInicioServicio, setHoraInicioServicio] = useState('')
    const [horaFinServicio, setHoraFinServicio] = useState('')
    const [horaRetornoLocal, setHoraRetornoLocal] = useState('')
    const [cliente, setCliente] = useState([])

    useEffect(() => {
        console.log(cliente);
        setRuc(cliente.ruc)
        setDireccion(cliente.direccion)
        setRazonSocial(cliente.razonSocial)

    }, [cliente])

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [errors, setErrors] = useState({
        codServicio : '',
        ruc : '',
        horaSalidaLocal : '',
        horaInicioServicio : '',
        horaFinServicio : '',
        horaRetornoLocal : ''
    })

    function saveOrUpdateServicio(){
        validateForm()
    }

    function validateForm(){
        let valid = true;
        const errorCopy = {... errors}

        if (codServicio.trim()){
            errorCopy.codServicio = '';
        }else{
            errorCopy.codServicio = 'Tiene que ingresar codigo de servicio';
            valid = false;
        }

        if (ruc.trim()){
            errorCopy.ruc = '';
        }else{
            errorCopy.ruc = 'Tiene que ingresar el ruc';
            valid = false;
        }

        if (horaSalidaLocal.trim()){
            errorCopy.horaSalidaLocal = '';
        }else{
            errorCopy.horaSalidaLocal = 'Tiene que ingresar la horaSalidaLocal';
            valid = false;
        }

        if (horaInicioServicio.trim()){
            errorCopy.horaInicioServicio = '';
        }else{
            errorCopy.horaInicioServicio = 'Tiene que ingresar la horaInicioServicio';
            valid = false;
        }

        if (horaFinServicio.trim()){
            errorCopy.horaFinServicio = '';
        }else{
            errorCopy.horaFinServicio = 'Tiene que ingresar la horaFinServicio';
            valid = false;
        }

        if (horaRetornoLocal.trim()){
            errorCopy.horaRetornoLocal = '';
        }else{
            errorCopy.horaRetornoLocal = 'Tiene que ingresar la horaRetornoLocal';
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }


  return (
    <>
    <div className='container'>
        <div className='row'>
            <div className='card'>
                <h2>Nuevo Servicio</h2>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>codServicio:</label>
                            <input type='text' placeholder='Ingrese el codServicio' name='txtCodServicio' value={codServicio} 
                                className={`form-control ${errors.codServicio? 'is-invalid' : ''}`} onChange={(e) =>{setCodServicio(e.target.value)}}></input>
                            {errors.codServicio && <div className='invalid-feedback'>{errors.codServicio}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>ruc:</label>
                            <input type='text' placeholder='Ingrese el ruc' name='txtRuc' value={ruc} onClick={handleShow} readOnly
                                className={`form-control ${errors.ruc? 'is-invalid' : ''}`} onChange={(e) =>{setRuc(e.target.value)}}></input>
                            {errors.ruc && <div className='invalid-feedback'>{errors.ruc}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Razon Social:</label>
                            <input type='text' placeholder='Ingrese el ruc' name='txRazonSocial' value={razonSocial} onClick={handleShow} disabled
                                className={`form-control ${errors.ruc? 'is-invalid' : ''}`} onChange={(e) =>{setRazonSocial(e.target.value)}}></input>
                            {errors.ruc && <div className='invalid-feedback'>{errors.RazonSocial}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Direccion:</label>
                            <input type='text' placeholder='Ingrese el ruc' name='txtDireccion' value={direccion} onClick={handleShow} disabled
                                className={`form-control ${errors.ruc? 'is-invalid' : ''}`} onChange={(e) =>{setDireccion(e.target.value)}}></input>
                            {errors.ruc && <div className='invalid-feedback'>{errors.ruc}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>horaSalidaLocal:</label>
                            <input type='text' placeholder='Ingrese el horaSalidaLocal' name='txtHoraSalidaLocal' value={horaSalidaLocal} 
                                className={`form-control ${errors.horaSalidaLocal? 'is-invalid' : ''}`} onChange={(e) => {setHoraSalidaLocal(e.target.value)}}></input>
                            {errors.horaSalidaLocal && <div className='invalid-feedback'>{errors.horaSalidaLocal}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>horaInicioServicio:</label>
                            <input type='text' placeholder='Ingrese el horaInicioServicio' name='txtHoraInicioServicio' value={horaInicioServicio} 
                                className={`form-control ${errors.horaInicioServicio? 'is-invalid' : ''}`} onChange={(e) => {setHoraInicioServicio(e.target.value)}}></input>
                            {errors.horaInicioServicio && <div className='invalid-feedback'>{errors.horaInicioServicio}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>horaFinServicio:</label>
                            <input type='text' placeholder='Ingrese el horaFinServicio' name='txtHoraFinServicio' value={horaFinServicio} 
                                className={`form-control ${errors.horaFinServicio? 'is-invalid' : ''}`} onChange={(e) => {setHoraFinServicio(e.target.value)}}></input>
                            {errors.horaFinServicio && <div className='invalid-feedback'>{errors.horaFinServicio}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>horaRetornoLocal:</label>
                            <input type='text' placeholder='Ingrese el horaRetornoLocal' name='txtHoraRetornoLocal' value={horaRetornoLocal} 
                                className={`form-control ${errors.horaRetornoLocal? 'is-invalid' : ''}`} onChange={(e) => {setHoraRetornoLocal(e.target.value)}}></input>
                            {errors.horaRetornoLocal && <div className='invalid-feedback'>{errors.horaRetornoLocal}</div>}
                        </div>
                        
                        <button className='btn btn-success' onClick={saveOrUpdateServicio}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <BusquedaClienteComponent show={show} handleClose={handleClose} setCliente={setCliente}/>
    </>
  )
}

export default ServicioComponent