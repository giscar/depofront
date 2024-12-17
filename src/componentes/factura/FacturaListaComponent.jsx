import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { buscarFactura, buscarServicioByDatosAggregate, buscarServicioByIdOperador, buscarServiciosPendientes, operadorForDocumento } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';

const FacturaListaComponent = () => {

  const access = "R008"
  let ingress = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingress = true;
    });
  })

  const navigator = useNavigate();

  const [facturas, setFacturas] = useState([])
  const [rucCliente, setRucCliente] = useState('')
  const [nroDocumento, setNroDocumento] = useState('')
  const [factura, setFactura] = useState('')

  const accederFacturaNuevo = () => {
    navigator("/NuevaFactura")
  }

  const verFactura = (id) => {
    navigator(`/ServicioView/${id}`)
  }

  const findFactura = () => {
    debugger
    buscarFactura().then((response) => {
      setFacturas(response.data);
      console.log(response.data)
    }).catch(error => {
      console.error(error)
    })
  }
  

  const limpiar = () => {
    setRuc('');
    setFacturas([]);
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
                    <li className="breadcrumb-item"><a href="#">Factura</a></li>
                    <li className="breadcrumb-item active">Busqueda</li>
                  </ol>
                </div>
                <h4 className="page-title">Busqueda de Facturas</h4>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Busqueda de Facturas</h4>
                  <p className="text-muted mb-0">Debe ser ingresado por el/la administrador(a) del modulo de servicios.</p>
                </div>
                <div className="card-body">
                  <div className='row'>
                    <div className="col-lg-6">
                      <label className='col-form-label-zise'>Numero de factura:</label>
                      <input type="text"
                        placeholder="Codigo de la Factura"
                        value={nroDocumento}
                        className="form-control-depo"
                        onChange={(e) => { setNroDocumento(e.target.value) }}>
                      </input>
                    </div>
                    <div className="col-lg-6">
                      <label className='col-form-label-zise'>Numero de RUC:</label>
                      <input type="number"
                        placeholder="Ingrese el numero de RUC"
                        value={rucCliente}
                        className="form-control-depo"
                        onChange={(e) => { setRucCliente(e.target.value) }}>
                      </input>
                    </div>
                  </div>
                  <div className='mt-4 float-rigth'>
                    <button type="button" className="btn-depo btn-warning-depo" onClick={limpiar}>Limpiar</button>
                    &nbsp;&nbsp;
                    <button type="button" className={`btn-depo btn-primary-depo`}  onClick={findFactura}>Buscar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="button" className="btn-depo btn-primary-depo" onClick={accederFacturaNuevo}>Nueva Factura</button>
          </div>
          <br />
          {facturas.length > 0 &&
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="thead-light">
                  <tr>
                    <th className='td-th-size-depo'>Numero</th>
                    <th className='td-th-size-depo'>RUC</th>
                    <th className='td-th-size-depo'>Razon Social</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    facturas.map(fact =>
                      <tr key={fact.id}>
                        <td className='td-th-size-depo'>{fact.nroDocumento}</td>
                        <td className='td-th-size-depo'>{fact.rucCliente}</td>
                        <td className='td-th-size-depo'>{fact.razonSocialCliente}</td>
                        
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          }
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
                    <li className="breadcrumb-item"><a href="#">Servicios</a></li>
                    <li className="breadcrumb-item active">Busqueda</li>
                  </ol>
                </div>
                <h4 className="page-title">Busqueda de servicio</h4>
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
  )
}

export default FacturaListaComponent