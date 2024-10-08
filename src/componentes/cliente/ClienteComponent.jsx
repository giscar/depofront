import { clienteForRucOrName } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClienteComponent() {

  const navigator = useNavigate();

  const [clientes, setClientes] = useState([])
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')

  const accederNuevoCliente = () => {
    navigator("/nuevoCliente")
  }

  const editCliente = (id) => {
    navigator(`/editCliente/${id}`)
  }

  const buscarClienteByDescripcion = (data) => {
    if (!ruc && !razonSocial) {
      return
    }
    clienteForRucOrName(ruc, razonSocial.toUpperCase()).then((response) => {
      setClientes(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  const limpiar = () => {
    setRuc('');
    setRazonSocial('');
    setClientes([]);
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
                  <li className="breadcrumb-item"><a href="#">Clientes</a></li>
                  <li className="breadcrumb-item active">listado</li>
                </ol>
              </div>
              <h4 className="page-title">Buscar clientes</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Busqueda de clientes</h4>
                <p className="text-muted mb-0">Debe ser ingresado por el/la administrador(a) del modulo de servicios.</p>
              </div>
              <div className="card-body">
                <div className='row'>
                  <div className="col-lg-6">
                    <label className='col-form-label-zise'>Razon social:</label>
                    <input type="text"
                      placeholder="Razon social"
                      value={razonSocial}
                      className="form-control-depo"
                      onChange={(e) => { setRazonSocial(e.target.value) }}>
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
                  <button type="button" className="btn-depo btn-primary-depo" onClick={buscarClienteByDescripcion}>Buscar</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='float-end pb-3 pt-4'>
          <button className='ms-2 btn-depo btn-primary-depo' onClick={() => accederNuevoCliente()}>Nuevo</button>
          </div>
        </div>
        <br />
        <div className="table-responsive">
            <table className="table mb-0">
              <thead className="thead-light">
            <tr>
              <th className='td-th-size-depo'>RUC</th>
              <th className='td-th-size-depo'>Razón Social</th>
              <th className='td-th-size-depo'>Dirección</th>
              <th className='td-th-size-depo'>Accion</th>
            </tr>
          </thead>
          <tbody>
            {
              clientes.map(cliente =>
                <tr key={cliente.id}>
                  <td  className='td-th-size-depo'>{cliente.ruc}</td>
                  <td  className='td-th-size-depo'>{cliente.razonSocial}</td>
                  <td  className='td-th-size-depo'>{cliente.direccion}</td>
                  <td>
                  <a className='icon-link-depo' onClick={() => editCliente(cliente.id)}>
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
    </>
  );
}
export default ClienteComponent;