import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buscarServicioByDatosEstadoConcluido, buscarServiciosConcluidos } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';

const FacturaComponent = () => {
  
  const navigator = useNavigate();

  const [servicios, setServicios] = useState([])
  const [ruc, setRuc] = useState('')
  const [codServicio, setCodServicio] = useState('')
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([])

  const registrarFactura = () => {
    navigator(`/facturaRegistro/${serviciosSeleccionados}`)
  }

  const findService = () => {
    if (!codServicio && !ruc) {
      return
    }
    buscarServicioByDatosEstadoConcluido(ruc, codServicio).then((response) => {
      setServicios(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    buscarServiciosConcluidos().then((response) => {
    setServicios(response.data);
  }).catch(error => {
    console.log(error);
  })
  }, [])

  const limpiar = () => {
    setRuc('');
    setCodServicio('');
    setServicios([]);
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    const {value, checked} = event.target;
    if(checked){
      setServiciosSeleccionados([...serviciosSeleccionados, value])
    }else{
      setServiciosSeleccionados(serviciosSeleccionados.filter(p => p !== value))
    }
  }

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  return (
    <>
    {initialLogin.usuario && <HeaderComponent />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="float-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                  <li className="breadcrumb-item"><a href="#">Servicios</a></li>
                  <li className="breadcrumb-item active">Busqueda</li>
                </ol>
              </div>
              <h4 className="page-title">Busqueda de servicio a facturar</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Busqueda de servicios concluidos</h4>
                <p className="text-muted mb-0">Debe ser ingresado por el/la administrador(a) del modulo de servicios.</p>
              </div>
              <div className="card-body">
                <div className='row'>
                  <div className="col-lg-4">
                    <label className='col-form-label-zise'>Codigo del servicio:</label>
                    <input type="number"
                      id="inputCodServicio"
                      placeholder="Codigo del servicio"
                      value={codServicio}
                      className="form-control-depo"
                      onChange={(e) => { setCodServicio(e.target.value) }}>
                    </input>
                  </div>
                  <div className="col-lg-4">
                    <label className='col-form-label-zise'>Numero de RUC:</label>
                    <input type="number"
                      id="inputRuc"
                      placeholder="Ingrese el numero de RUC"
                      value={ruc}
                      className="form-control-depo"
                      onChange={(e) => { setRuc(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <div className='mt-4 float-rigth'>
                  <button type="button" className="btn-depo btn-primary-depo" onClick={findService}>Buscar</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
            <button type='button' className='btn btn-primary' onClick={registrarFactura}>Registrar Factura</button>
        </div>
        <br />
        {servicios.length > 0 &&
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="thead-light">
                <tr>
                  <th className='td-th-size-depo'>Codigo</th>
                  <th className='td-th-size-depo'>RUC</th>
                  <th className='td-th-size-depo'>Razon Social</th>
                  <th className='td-th-size-depo'>Tipo</th>
                  <th className='td-th-size-depo'>Salida local</th>
                  <th className='td-th-size-depo'>Inicio servicio</th>
                  <th className='td-th-size-depo'>Fin servicio</th>
                  <th className='td-th-size-depo'>Retorno local</th>
                  <th className='td-th-size-depo'>Operador</th>
                  <th className='td-th-size-depo'>Montacarga</th>
                  <th className='td-th-size-depo'>Estado</th>
                  <th className='td-th-size-depo'>Accion</th>
                </tr>
              </thead>
              <tbody>
                {
                  servicios.map(servicio =>
                    <tr key={servicio.id}>
                      <td className='td-th-size-depo'>{servicio.codServicio}</td>
                      <td className='td-th-size-depo'>{servicio.ruc}</td>
                      <td className='td-th-size-depo'>{servicio.cliente[0]?.razonSocial}</td>
                      <td className='td-th-size-depo'>{servicio.tipoServicio}</td>
                      <td className='td-th-size-depo'>{(new Date(servicio.horaSalidaLocal)).toLocaleString()}</td>
                      <td className='td-th-size-depo'>{(new Date(servicio.horaInicioServicio)).toLocaleString()}</td>
                      <td className='td-th-size-depo'>{(new Date(servicio.horaFinServicio)).toLocaleString()}</td>
                      <td className='td-th-size-depo'>{(new Date(servicio.horaRetornoLocal)).toLocaleString()}</td>
                      <td className='td-th-size-depo'>{servicio.operador[0]?.nombre+' '+servicio.operador[0]?.apellidoPat+' '+servicio.operador[0]?.apellidoMat}</td>
                      <td className='td-th-size-depo'>{servicio.montacarga[0]?.codigo+' '+servicio.montacarga[0]?.marca}</td>
                      <td className='td-th-size-depo'>
                        {servicio.estadoRegistro === "Concluido" &&
                          <span className="badge badge-boxed  badge-outline-success">{servicio.estadoRegistro}</span>
                        }
                        {servicio.estadoRegistro !== "Concluido" &&
                          <span className="badge badge-boxed  badge-outline-danger">{servicio.estadoRegistro}</span>
                        }
                      </td>
                      <td className='text-center'>
                        <input className="form-check-input" type="checkbox" value={servicio.codServicio} onChange={handleChange} style={{backgroundColor : 'orange'}}/>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </>
  )
}

export default FacturaComponent