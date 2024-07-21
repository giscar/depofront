import {  clienteForId, editaCliente } from '../../service/FacturaService';
import { toast } from 'react-toastify';
import HeaderComponent from '../HeaderComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditaClienteComponent() {
  const navigator = useNavigate();

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    });

  const [cliente, setCliente] = useState([])
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [email, setEmail] = useState('')

  const [errors, setErrors] = useState({
    msgRuc: '',
    msgRazonSocial: '',
    msgDireccion: '',
  })

  const {id} = useParams();

  useEffect(() => {
      if(id){
          clienteForId(id).then((response) => {
              setCliente(response.data);
              setTimeout(() => {
                cargarCliente(response.data)
              }, 1000);
          }).catch(error => {
              console.log(error);
          })
      }
  }, [id])

  const cargarCliente = (data) => {
    setRuc(data.ruc);
    setRazonSocial(data.razonSocial);
    setDireccion(data.direccion);
    setEmail(data.email)
  }

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors }

    if (ruc) {
      errorCopy.msgRuc = '';
    } else {
      errorCopy.msgRuc = 'Tiene que ingresar el RUC del cliente';
      valid = false;
    }

    if (razonSocial) {
      errorCopy.msgRazonSocial = '';
    } else {
      errorCopy.msgRazonSocial = 'Tiene que ingresar la razon social del cliente';
      valid = false;
    }

    if (direccion) {
      errorCopy.msgDireccion = '';
    } else {
      errorCopy.msgDireccion = 'Tiene que ingresar la direccion del cliente';
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

  const editCliente = () => {
    debugger
    if(validateForm()){
      const data = {}
      data.id = id;
      data.ruc = ruc;
      data.razonSocial = razonSocial.toUpperCase();
      data.direccion = direccion.toUpperCase();
      data.email = email.toUpperCase();
      editaCliente(data).catch(error => {
        console.error(error)
      })
      notify()
      navigator("/clientes")
    }
    
  }
  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  return (
    <>
    {initialLogin.usuario && <HeaderComponent />}
      <div className='container-fluid'>
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="float-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                  <li className="breadcrumb-item"><a href="#">Cliente</a></li>
                  <li className="breadcrumb-item active">Edita cliente</li>
                </ol>
              </div>
              <h4 className="page-title">Edita cliente</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12 card-deck">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos del cliente</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de servicios.</p>
              </div>

              <div className="card-body">

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">ruc:</label>
                  <div className="col-sm-9">
                    <input type="number"
                      placeholder="Ruc del cliente"
                      value={ruc}
                      className="w-50 bg-secondary bg-opacity-10 form-control-depo"
                      onChange={(e) => { setRuc(e.target.value) }} />
                    {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRuc}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Razon Social:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Razon Social"
                      value={razonSocial}
                      className={`w-50 form-control-depo ${errors.msgRazonSocial ? 'is-invalid' : ''}`}
                      onChange={(e) => { setRazonSocial(e.target.value) }} />
                    {errors.msgRazonSocial && <div className='invalid-feedback'>{errors.msgRazonSocial}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Direccion:</label>
                  <div className="col-sm-9">
                    <textarea type="text"
                      placeholder="Direccion del cliente"
                      value={direccion}
                      className={`w-50 form-control-depo ${errors.msgDireccion ? ' is-invalid' : ''}`}
                      onChange={(e) => { setDireccion(e.target.value) }} ></textarea>
                    {errors.msgDireccion && <div className='invalid-feedback'>{errors.msgDireccion}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Correo Electronico:</label>
                  <div className="col-sm-9">
                    <input type="Text"
                      placeholder="Correo electronico"
                      value={email}
                      className="w-50 form-control-depo"
                      onChange={(e) => { setEmail(e.target.value) }}>
                    </input>
                  </div>
                </div>

                <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={editCliente}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditaClienteComponent;