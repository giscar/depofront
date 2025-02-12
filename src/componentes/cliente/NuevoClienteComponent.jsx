import { nuevoCliente } from '../../service/FacturaService';
import { toast } from 'react-toastify';
import HeaderComponent from '../HeaderComponent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function NuevoClienteComponent() {

  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [email, setEmail] = useState('')

  const navigator = useNavigate();

  const showLoading = () => {
    Swal.fire({
      title: 'Cargando',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
      }
    })
  }

  const closeLoading = () => {
    Swal.close()
  }

  const [errors, setErrors] = useState({
    msgRuc: '',
    msgRazonSocial: '',
    msgDireccion: '',
  })

  const access = "R006"
  let ingress = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingress = true;
    });
  })

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const limpiar = () => {
    setRuc('');
    setRazonSocial('');
    setDireccion('');
    setEmail('')
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

  const saveCliente = (data) => {
    if (validateForm()) {
      showLoading()
      const data = {}
      data.ruc = ruc;
      data.razonSocial = razonSocial.toUpperCase();
      data.direccion = direccion.toUpperCase();
      data.email = email.toUpperCase();
      data.estado = "1";
      data.usuarioRegistro = initialLogin.documento;
      nuevoCliente(data).then(response => {
        limpiar()
        notify()
        navigator("/clientes")
        closeLoading()
      }).catch(error => {
        console.error(error)
        closeLoading()
      })
    }
  }

  return (
    <>
      {initialLogin.documento && <HeaderComponent />}
      {ingress &&
        <div className='container-fluid'>
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Cliente</a></li>
                    <li className="breadcrumb-item active">Nuevo cliente</li>
                  </ol>
                </div>
                <h4 className="page-title">Registrar cliente</h4>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-12 ">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Datos del cliente</h4>
                  <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de servicios.</p>
                  <p className="text-muted mb-0"><span style={{ color: 'red' }}>(*)</span> :Datos obligatorias que se debe ingresar</p>
                </div>

                <div className="card-body">

                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>RUC:</label>
                    <div className="col-sm-9">
                      <input type="number"
                        placeholder="Ruc del cliente"
                        value={ruc}
                        maxlength="11"
                        className={`w-50 form-control-depo ${errors.msgRuc ? ' is-invalid' : ''}`}
                        onChange={(e) => { setRuc(e.target.value) }}
                      />
                      {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRuc}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>Razon Social:</label>
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
                    <label className="col-sm-3 col-form-label-zise "><span style={{ color: 'red' }}>(*)</span>Direccion:</label>
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
                    <label className="col-sm-3 col-form-label-zise ">Correo Electronico:</label>
                    <div className="col-sm-9">
                      <input type="email"
                        pattern=".+@example\.com"
                        placeholder="Correo electronico"
                        value={email}
                        className="w-50 form-control-depo"
                        onChange={(e) => { setEmail(e.target.value) }}>
                      </input>
                    </div>
                  </div>
                  <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={saveCliente}>Guardar</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {!ingress &&
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Cliente</a></li>
                    <li className="breadcrumb-item active">Nuevo cliente</li>
                  </ol>
                </div>
                <h4 className="page-title">Nuevo cliente</h4>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='float-end pb-3 pt-4'>
              <div className="alert alert-danger border-0" role="alert">
                <strong>Alerta!</strong> No tiene acceso para este modulo.
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default NuevoClienteComponent;