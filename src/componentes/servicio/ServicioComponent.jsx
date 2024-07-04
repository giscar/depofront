import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buscarServicioByDatosAggregate } from '../../service/FacturaService';
import { FaPencilAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ServicioComponent = () => {
  const notify = () => toast.warning('No se ha encontrado registros en la busqueda', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
  const navigator = useNavigate();

  const [servicio, setServicio] = useState([])
  const [servicios, setServicios] = useState([])
  const [ruc, setRuc] = useState('')
  const [codServicio, setCodServicio] = useState('')

  const editServicio = (id) => {
    navigator(`/servicioEdit/${id}`)
  }

  const findService = () => {
    debugger
    if (!codServicio && !ruc) {
      return
    }
    buscarServicioByDatosAggregate(ruc, codServicio).then((response) => {
      debugger
      setServicios(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  return (
    <>
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
              <h4 className="page-title">Busqueda de servicio</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12 card-deck">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Busqueda de servicios</h4>
                <p className="text-muted mb-0">Debe ser ingresaado por el/la administrador(a) del modulo de servicios.</p>
              </div>
              <div className="card-body">
                <div className='row'>
                  <div className="col-lg-6">
                    <label className='col-form-label-zise'>Codigo del servicio:</label>
                    <input type="number"
                      id="inputCodServicio"
                      placeholder="Codigo del servicio"
                      value={codServicio}
                      className="form-control-depo"
                      onChange={(e) => { setCodServicio(e.target.value) }}>
                    </input>
                  </div>
                  <div className="col-lg-6">
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
                  <button type="button" className="btn btn-primary" onClick={findService}>Buscar</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn btn-warning" >Limpiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="thead-light">
              <tr>
                <th className='td-th-size-depo'>Codigo</th>
                <th className='td-th-size-depo'>RUC</th>
                <th className='td-th-size-depo'>Razon Social</th>
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
                    <td className='td-th-size-depo'>{servicio.cliente[0].razonSocial}</td>
                    <td className='td-th-size-depo'>{servicio.horaSalidaLocal.replace("T", " ")}</td>
                    <td className='td-th-size-depo'>{servicio.horaInicioServicio.replace("T", " ")}</td>
                    <td className='td-th-size-depo'>{servicio.horaFinServicio.replace("T", " ")}</td>
                    <td className='td-th-size-depo'>{servicio.horaRetornoLocal.replace("T", " ")}</td>
                    <td className='td-th-size-depo'>{servicio.operador[0].nombre}</td>
                    <td className='td-th-size-depo'>{servicio.montacarga[0].nombre}</td>
                    <td className='td-th-size-depo'><span class="badge badge-boxed  badge-outline-success">Business</span></td>
                    <td>
                      <a className='icon-link-depo' onClick={() => editServicio(servicio.id)}>
                        <FaPencilAlt />
                      </a>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ServicioComponent