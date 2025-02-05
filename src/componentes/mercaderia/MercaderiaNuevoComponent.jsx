import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import { toast } from 'react-toastify';
import HeaderComponent from '../HeaderComponent';
import { buscarCodigoIngreso, ingresoSave } from '../../service/FacturaService';
import { useNavigate } from 'react-router-dom';

const MercaderiaNuevoComponent = () => {

  const [cliente, setCliente] = useState('')
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [codIngreso, setCodIngreso] = useState('')
  const [numeroIngreso, setNumeroIngreso] = useState('')
  const [codigoDua, setCodigoDua] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tipoMercaderia, setTipoMercaderia] = useState('')
  const [pedidoDeposito, setPedidoDeposito] = useState('')

  const navigator = useNavigate();

  const access = "R010"
  let ingressADM = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingressADM = true;
    });
  })

  const irMercaderia = (id) => {
    navigator(`/mercaderiaEdit/${id}`)
  }

  const [errors, setErrors] = useState({
    msgCodIngreso: '',
    msgRuc: '',
    msgCodigoDua: '',
    msgCodigoProducto: '',
    msgDescripcion: '',
    msgTipoServicio: '',
    msgPedidoDeposito: '',
    msgSerie: '',
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

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors }
    const regex = /^[0-9]*$/;

    errorCopy.msgPedidoDeposito = '';
    errorCopy.msgCodigoDua = '';

    if (numeroIngreso) {
      errorCopy.msgNumeroIngreso = '';
    } else {
      errorCopy.msgNumeroIngreso = 'El numero de ingreso aun no ha sido generado por el sistema';
      valid = false;
    }

    if (tipoMercaderia) {
      errorCopy.msgTipoMercaderia = '';
    } else {
      errorCopy.msgTipoMercaderia = 'Tiene que ingresar el tipo de mercaderia simple o nacionalizada';
      valid = false;
    }

    if (tipoMercaderia == "Nacionalizada") {
      if (pedidoDeposito) {
        errorCopy.msgPedidoDeposito = '';
      } else {
        errorCopy.msgPedidoDeposito = 'Tiene que numero de Pedido de Deposito';
        valid = false;
      }

      if (codigoDua) {
        errorCopy.msgCodigoDua = '';
      } else {
        errorCopy.msgCodigoDua = 'Tiene que ingresar el numero de DUA';
        valid = false;
      }
    }

    if (ruc) {
      errorCopy.msgRuc = '';
    } else {
      errorCopy.msgRuc = 'Tiene que ingresar el numero de RUC';
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {}
      data.codIngreso = codIngreso;
      data.numeroIngreso = numeroIngreso;
      data.ruc = ruc;
      data.razonSocial = razonSocial?.toUpperCase();
      data.direccion = direccion?.toUpperCase();
      data.codigoDua = codigoDua;
      data.descripcion = descripcion?.toUpperCase();
      data.estado = "1";
      data.estadoRegistro = "Sin mercaderia";
      data.usuarioRegistro = initialLogin.documento;
      data.tipoMercaderia = tipoMercaderia;
      data.pedidoDeposito = pedidoDeposito;
      ingresoSave(data).then((response) => {
        irMercaderia(response.data.id)
      }).catch(error => {
        console.error(error)
      });
      notify()
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleCodIngreso();
  }, [])

  useEffect(() => {
    setCodigoDua("")
    setPedidoDeposito("")
    //validateForm()
  }, [tipoMercaderia])

  const handleCodIngreso = () => {
    buscarCodigoIngreso().then((response) => {
      setCodIngreso(response.data + 1)
      setNumeroIngreso("ING" + (response.data + 1).toString().padStart(6, '0'));
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
    setCodIngreso('')
    setNumeroIngreso('')
    setCodigoDua('')
    setDescripcion('')
  };

  return (
    <>
      {initialLogin.documento && <HeaderComponent />}
      {ingressADM &&
        <div className='container-fluid'>
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Almacen</a></li>
                    <li className="breadcrumb-item active">Nuevo Ingreso</li>
                  </ol>
                </div>
                <h4 className="page-title">Registrar Ingreso</h4>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Datos Iniciales del Ingreso</h4>
                  <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de almacenes.</p>
                </div>
                <div className="card-body">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero de ingreso:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Codigo del servicio"
                        value={numeroIngreso}
                        className={`bg-secondary bg-opacity-10 form-control-depo ${errors.msgNumeroIngreso ? 'is-invalid' : ''}`}
                        readOnly
                        onChange={(e) => { setNumeroIngreso(e.target.value) }}>
                      </input>
                      {errors.msgNumeroIngreso && <div className='invalid-feedback'>{errors.msgNumeroIngreso}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise" >Tipo de mercaderia:</label>
                    <div className="col-sm-8">
                      <select value={tipoMercaderia}
                        className={`form-select-depo${errors.msgTipoMercaderia ? ' is-invalid' : ''}`}
                        onChange={(e) => { setTipoMercaderia(e.target.value) }}>
                        <option value="">Seleccione</option>
                        <option value="Simple">Simple</option>
                        <option value="Nacionalizada">Nacionalizada</option>
                      </select>
                      {errors.msgTipoMercaderia && <div className='invalid-feedback'>{errors.msgTipoMercaderia}</div>}
                    </div>
                  </div>


                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Pedido de deposito:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder='Numero de Pedido de Deposito'
                        value={pedidoDeposito}
                        onChange={(e) => { setPedidoDeposito(e.target.value) }}
                        className={` form-control-depo ${tipoMercaderia == "Simple" ? "bg-secondary bg-opacity-10" : ""} ${errors.msgPedidoDeposito ? ' is-invalid' : ''}`}
                        disabled={tipoMercaderia == "Simple" ? true : false}
                        autoComplete='off'>
                      </input>
                      {errors.msgPedidoDeposito && <div className='invalid-feedback'>{errors.msgPedidoDeposito}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero de DUA:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder='Numero de DUA'
                        value={codigoDua}
                        onChange={(e) => { setCodigoDua(e.target.value) }}
                        className={`form-control-depo ${tipoMercaderia == "Simple" ? "bg-secondary bg-opacity-10" : ""} ${errors.msgCodigoDua ? ' is-invalid' : ''}`}
                        disabled={tipoMercaderia == "Simple" ? true : false}
                        autoComplete='off'>
                      </input>
                      {errors.msgCodigoDua && <div className='invalid-feedback'>{errors.msgCodigoDua}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero de RUC:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder="Ingrese el numero de RUC"
                        value={ruc}
                        className={`form-control-depo ${errors.msgRuc ? 'is-invalid' : ''}`}
                        onClick={handleShow}
                        onChange={(e) => { setRuc(e.target.value) }}
                        readOnly>
                      </input>
                      {errors.msgRuc && <div className='invalid-feedback'>{errors.msgRuc}</div>}
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Razon Social:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Razon Social'
                        value={razonSocial}
                        className='bg-secondary bg-opacity-10 form-control-depo'
                        disabled
                        onChange={(e) => { setRazonSocial(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Dirección:</label>
                    <div className="col-sm-8">
                      <input type='text'
                        placeholder='Dirección'
                        value={direccion}
                        className='bg-secondary bg-opacity-10 form-control-depo'
                        disabled
                        onChange={(e) => { setDireccion(e.target.value) }}>
                      </input>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Descripcion:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Descripcion'
                        value={descripcion}
                        onChange={(e) => { setDescripcion(e.target.value) }}
                        className="form-control-depo"
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>
                  <button type="button" className="btn-depo btn-primary-depo" onClick={handleSubmit}>Guardar</button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">

            </div>
          </div>
        </div>
      }
      {!ingressADM &&
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Servicios</a></li>
                    <li className="breadcrumb-item active">Nuevo Servicio</li>
                  </ol>
                </div>
                <h4 className="page-title"></h4>
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
      <BusquedaClienteComponent show={show} handleClose={handleClose} setCliente={setCliente} />
    </>
  )
}
export default MercaderiaNuevoComponent