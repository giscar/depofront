import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import { toast } from 'react-toastify';
import { buscarCodigoServicio, montacargasActivo, operadorActivo, servicioSave } from '../../service/FacturaService';

const ServicioNuevoComponent = () => {

  const [cliente, setCliente] = useState('')
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

  const [errors, setErrors] = useState({
    msgCodServicio : '',
    msgRuc : '',
    msgOperadorId : '',
    msgMontacargaId : '',
})

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const handleSubmit1 = (event) => {
    debugger
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const validateForm = () => {
    debugger
    let valid = true;
    const errorCopy = {... errors}
    const regex = /^[0-9]*$/;
    if (codServicio){
      errorCopy.msgCodServicio = '';
      if(!regex.test(codServicio)){
        errorCopy.msgCodServicio = 'El codigo del servicio debe ser un numero';
        valid = false;
      }
    }else{
      errorCopy.msgCodServicio = 'Tiene que ingresar el numero de servicio';
      valid = false;
    }
    
    if (ruc){
        errorCopy.msgRuc = '';
    }else{
        errorCopy.msgRuc = 'Tiene que ingresar el numero de RUC';
        valid = false;
    }

    if (operadorId){
        errorCopy.msgOperadorId = '';
    }else{
        errorCopy.msgOperadorId = 'Tiene que ingresar el operador';
        valid = false;
    }

    if (montacargaId){
        errorCopy.msgMontacargaId = '';
    }else{
        errorCopy.msgMontacargaId = 'Tiene que ingresar la montacarga';
        valid = false;
    }

    setErrors(errorCopy);

    return valid;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (validateForm()){
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
      });
      limpiar()
      notify()
      setTimeout(() => {
        handleCodServicio()
      }, 2000);
      
    }
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
    handleCodServicio();
  }, [])

  const handleCodServicio = () => {
    buscarCodigoServicio().then((response) => {
      setCodServicio(response.data+1)
    }).catch(error => {
      console.log(error);
    })
  }

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
        <form>
          <div className='form-group mb-2'>
              <label className='form-label'>Codigo del Servicio:</label>
              <input type='number' 
                     placeholder='Ingrese el codigo del servicio' 
                     value={codServicio} 
                     className={`form-control ${errors.msgCodServicio? 'is-invalid' : ''}`} 
                     onChange={(e) =>{setCodServicio(e.target.value)}}>
              </input>
              {errors.msgCodServicio && <div className='invalid-feedback'>{errors.msgCodServicio}</div>}
          </div>
          <div className='form-group mb-2'>
              <label className='form-label'>Numero de RUC:</label>
              <input type='number' 
                     placeholder='Ingrese el numero de RUC' 
                     value={ruc} 
                     onClick={handleShow} 
                     className={`form-control ${errors.msgRuc? 'is-invalid' : ''}`} 
                     onChange={(e) =>{setRuc(e.target.value)}}>
              </input>
              {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRuc}</div>}
          </div>
          <div className='form-group mb-2'>
              <label className='form-label'>Razon Social:</label>
              <input type='text' 
                     placeholder='Razon Social' 
                     value={razonSocial} 
                     style={{ textTransform: 'uppercase' }}
                     className='form-control'
                     disabled
                     onChange={(e) =>{setRazonSocial(e.target.value)}}>
              </input>
          </div>
          <div className='form-group mb-2'>
              <label className='form-label'>Dirección:</label>
              <input type='text' 
                     placeholder='Dirección' 
                     value={direccion} 
                     style={{ textTransform: 'uppercase' }}
                     className='form-control'
                     disabled
                     onChange={(e) =>{setDireccion(e.target.value)}}>
              </input>
          </div>
          <div className='form-group mb-2'>
              <label className='form-label'>Operador:</label>
              <select value={operadorId}
                    className={`form-select${errors.msgOperadorId? ' is-invalid' : ''}`} 
                    onChange={(e) =>{setOperadorId(e.target.value)}}>
                <option value="">Seleccione</option>
                {
                  operadores.map(operador =>
                    <option key={operador.id} value={operador.id}>{operador.nombre}</option>
                  )
                }
              </select>
              {errors.msgOperadorId && <div className='invalid-feedback'>{errors.msgOperadorId}</div>}
          </div>
          <div className='form-group mb-2'>
              <label className='form-label'>Montacarga:</label>
              <select value={montacargaId}
                    className={`form-select${errors.msgMontacargaId? ' is-invalid' : ''}`} 
                    onChange={(e) =>{setMontacargaId(e.target.value)}}>
                <option value="">Seleccione</option>
                {
                  montacargas.map(montacarga =>
                    <option key={montacarga.id} value={montacarga.id}>{montacarga.nombre}</option>
                  )
                }
              </select>
              {errors.msgMontacargaId && <div className='invalid-feedback'>{errors.msgMontacargaId}</div>}
          </div>
          <div className='form-group mb-2'>
              <label className='form-label'>Hora de salida de la Empresa:</label>
              <input type="datetime-local"
                     value={horaSalidaLocal} 
                     className='form-control'
                     onChange={(e) =>{setHoraSalidaLocal(e.target.value)}}>
              </input>
          </div>
          <div className='form-group mb-2'>
              <label className='form-label'>Hora de inicio del Servicio:</label>
              <input type="datetime-local"
                     placeholder='Ingrese el codigo del servicio' 
                     value={codServicio} 
                     className='form-control' 
                     onChange={(e) =>{setHoraInicioServicio(e.target.value)}}>
              </input>
          </div>
          <div className='form-group mb-2'>
              <label className='form-label'>Hora de fin del Servicio:</label>
              <input type="datetime-local"
                     placeholder='Ingrese el codigo del servicio' 
                     value={codServicio} 
                     className='form-control'
                     onChange={(e) =>{setHoraFinServicio(e.target.value)}}>
              </input>
          </div>
          <div className='form-group mb-2'>
              <label className='form-label'>Hora de retorno a la empresa:</label>
              <input type="datetime-local"
                     placeholder='Ingrese el codigo del servicio' 
                     value={codServicio} 
                     className='form-control'
                     onChange={(e) =>{setHoraRetornoLocal(e.target.value)}}>
              </input>
          </div>
        </form>
        <button className='btn btn-success' onClick={handleSubmit}>Enviar</button>
      </div>
      <BusquedaClienteComponent show={show} handleClose={handleClose} setCliente={setCliente} />
    </>
  )
}
export default ServicioNuevoComponent