import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ingresoPorFiltros } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent';

const MercaderiaComponent = () => {

  const access = "R010"
  let ingress = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  const [codigoDua, setCodigoDua] = useState('')
  const [pedidoDeposito, setPedidoDeposito] = useState('')
  const [tipoMercaderia, setTipoMercaderia] = useState('')
  const [ruc, setRuc] = useState('')
  const [estadoRegistro, setEstadoRegistro] = useState('')

  const [cliente, setCliente] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingress = true;
    })
  })

  const showLoading = () => {
    Swal.fire({
        title: 'Cargando',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: ()=>{
            Swal.showLoading();
        }
    })
  }

  const closeLoading = () => {
    Swal.close()
  }

  const navigator = useNavigate();

  const irMercaderiaNuevo = () => {
    navigator(`/mercaderiaNuevo`)
  }

  const editarIngreso = (id) => {
    navigator(`/mercaderiaEdit/${id}`)
  }

  const notify = (msg) => toast.info(msg, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const [ingresos, setIngresos] = useState([])

  const buscarIngresos = () => {
    showLoading()
    ingresoPorFiltros(pedidoDeposito, codigoDua, ruc, tipoMercaderia, estadoRegistro).then((response) => {
      setIngresos(response.data);
      closeLoading()
      debugger
      if(response.data.length == 0){
        notify("La consulta no ha tenido resultados")
      }else{
        notify("Se ha realizado la consulta correctamente")
      }
    }).catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    setRuc(cliente?.ruc)
  }, [cliente])

  const limpiar = () => {
    setPedidoDeposito('')
    setCodigoDua('')
    setRuc('')
    setTipoMercaderia('')
    setEstadoRegistro('')
    setIngresos([])
  }

  return (
    <>
      {initialLogin.documento && <HeaderComponent />}
      {ingress &&
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <div className="float-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                    <li className="breadcrumb-item"><a href="#">Almacen</a></li>
                    <li className="breadcrumb-item active">Ingresos de mercaderia</li>
                  </ol>
                </div>
                <h4 className="page-title">Listado de ingresos de mercaderia</h4>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='float-end pb-3 pt-4'>
              <button className='ms-2 btn-depo btn-primary-depo' onClick={() => irMercaderiaNuevo()}>Nuevo Ingreso</button>
            </div>
          </div>
          <br />
          <div className='row'>
            <div className="col-lg-3">
              <label className='col-form-label-zise'>Numero de RUC:</label>
              <input type="number"
                id="inputRuc"
                placeholder="Ingrese el numero de RUC"
                value={ruc}
                className={`form-control-depo`}
                onClick={handleShow}
                onChange={(e) => { setRuc(e.target.value) }}
                readOnly >
              </input>
            </div>

            <div className="col-lg-3">
              <label className='col-form-label-zise'>Pedido de deposito:</label>
              <input type="number"
                placeholder="Codigo del servicio"
                value={pedidoDeposito}
                className="form-control-depo"
                onChange={(e) => { setPedidoDeposito(e.target.value) }}>
              </input>
            </div>

            <div className="col-lg-3">
              <label className='col-form-label-zise'>DUA / DAM:</label>
              <input type="number"
                placeholder="Codigo del servicio"
                value={codigoDua}
                className="form-control-depo"
                onChange={(e) => { setCodigoDua(e.target.value) }}>
              </input>
            </div>

            <div className="col-lg-3">
              <label className="col-form-label-zise" >Tipo mercaderia:</label>
              <select value={tipoMercaderia}
                className={`form-select-depo`}
                onChange={(e) => { setTipoMercaderia(e.target.value) }}>
                <option value="">Seleccione</option>
                <option value="Simple">Simple</option>
                <option value="Nacionalizada">Nacionalizada</option>
              </select>
            </div>

            <div className="col-lg-3">
              <label className="col-form-label-zise" >Estado:</label>
              <select value={estadoRegistro}
                className={`form-select-depo`}
                onChange={(e) => { setEstadoRegistro(e.target.value) }}>
                <option value="">Seleccione</option>
                <option value="Sin mercaderia">Sin mercaderia</option>
                <option value="Proceso">Proceso</option>
                <option value="Saldo cero">Saldo cero</option>
              </select>
            </div>
          </div>
          <div>
            <br />
            <button type="button" className="btn-depo btn-primary-depo" onClick={buscarIngresos}>Buscar</button>
            &nbsp;
            <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
            <br /><br />
          </div>
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="thead-light">
                <tr>
                  <th className='td-th-size-depo'>Nro de ingreso</th>
                  <th className='td-th-size-depo'>Tipo Mercaderia</th>
                  <th className='td-th-size-depo'>P.D.</th>
                  <th className='td-th-size-depo'>DUA/DAM</th>
                  <th className='td-th-size-depo'>Cliente</th>
                  <th className='td-th-size-depo'>Razon Social</th>
                  <th className='td-th-size-depo'>Fecha de registro</th>
                  <th className='td-th-size-depo'>Estado</th>
                  <th className='td-th-size-depo'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  ingresos.map(item =>
                    <tr key={item.id}>
                      <td className='td-th-size-depo'>{item.numeroIngreso}</td>
                      <td className='td-th-size-depo'>{item.tipoMercaderia}</td>
                      <td className='td-th-size-depo'>{item.pedidoDeposito}</td>
                      <td className='td-th-size-depo'>{item.codigoDua}</td>
                      <td className='td-th-size-depo'>{item.ruc}</td>
                      <td className='td-th-size-depo'>{item.razonSocial}</td>
                      <td className='td-th-size-depo'>{item.fechaRegistro ? (new Date(item.fechaRegistro)).toLocaleString() : ""}</td>
                      <td className='td-th-size-depo'>
                      {item.estadoRegistro === "Sin mercaderia" &&
                        <span className="badge badge-boxed  badge-outline-primary">{item.estadoRegistro}</span>
                      }
                      {item.estadoRegistro === "Proceso" &&
                        <span className="badge badge-boxed  badge-outline-warning">{item.estadoRegistro}</span>
                      }
                      {item.estadoRegistro === "Saldo cero" &&
                        <span className="badge badge-boxed  badge-outline-success">{item.estadoRegistro}</span>
                      }   
                      
                      </td>
                      <td className='td-th-size-depo'>
                        <a className='icon-link-depo' onClick={() => editarIngreso(item.id)}>
                          <i className="bi bi-pencil-fill"></i>
                        </a>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
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
                    <li className="breadcrumb-item"><a href="#">Montacarga</a></li>
                    <li className="breadcrumb-item active">listado</li>
                  </ol>
                </div>
                <h4 className="page-title">Listado de Montacargas</h4>
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

export default MercaderiaComponent