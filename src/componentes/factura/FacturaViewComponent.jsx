import React, { useEffect, useState } from 'react'
import HeaderComponent from '../HeaderComponent';
import { facturaForId } from '../../service/FacturaService';
import { useParams } from 'react-router-dom';
import HojaFacturaReportComponent from '../report/HojaFacturaReportComponent';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ToWords } from 'to-words';

const FacturaViewComponent = () => {

  const [factura, setFactura] = useState({})
  const [monto, setMonto] = useState('')
  const [moneda, setMoneda] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [tipoPago, setTipoPago] = useState('')
  const [fechaEmision, setFechaEmision] = useState('')
  const [servicios, setServicios] = useState([])
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [rucCliente, setRucCliente] = useState('')
  const [razonSocialCliente, setRazonSocialCliente] = useState('')
  const [direccionCliente, setDireccionCliente] = useState('')
  const [nroDocumento, setNroDocumento] = useState('')
  const [tipoDocumento, setTipoDocumento] = useState('')

  const access = "R008"
  let ingressADM = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingressADM = true;
    });
  })

  const { id } = useParams();

  const toWords = new ToWords({
    localeCode: 'es-ES',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {

        symbol: 'S/.',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: '',
        },
      },
    },
  });

  console.log(toWords.convert(123.10))

  useEffect(() => {
    facturaForId(id).then((response) => {
      setFactura(response.data)
      cargarFactura(response)
    })
  }, [])

  const cargarFactura = (response) => {
    setNroDocumento(response.data.nroDocumento);
    setTipoDocumento(response.data.tipoDocumento);
    setFechaEmision(response.data.fechaEmision);
    setMonto(response.data.monto);
    setMoneda(response.data.moneda);
    setTipoPago(response.data.tipoPago);
    setObservaciones(response.data.observaciones);
    setRazonSocial(response.data.razonSocial);
    setRuc(response.data.ruc);
    setDireccion(response.data.direccion);
    setRucCliente(response.data.rucCliente);
    setRazonSocialCliente(response.data.razonSocialCliente);
    setDireccionCliente(response.data.direccionCliente)
    setServicios(response.data.servicios)
  }

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
                    <li className="breadcrumb-item"><a href="#">Factura</a></li>
                    <li className="breadcrumb-item active">Ver Factura</li>
                  </ol>
                </div>
                <h4 className="page-title">Ver Factura</h4>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Datos del emisor y cliente</h4>
                  <p className="text-muted mb-0">Las hojas de servicio a facturar provienen del modulo de servicios de operaciones.</p>
                </div>
                <div className="card-body">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Numero de RUC:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder="Ingrese el numero de RUC"
                        value={ruc}
                        className={`bg-secondary bg-opacity-10 form-control-depo`}
                        onChange={(e) => { setRuc(e.target.value) }}
                        disabled>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Razon Social:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Razon Social'
                        value={razonSocial}
                        className={`bg-secondary bg-opacity-10 form-control-depo`}
                        disabled
                        onChange={(e) => { setRazonSocial(e.target.value) }}>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Dirección:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder='Razon Social'
                        value={direccion}
                        className={`bg-secondary bg-opacity-10 form-control-depo`}
                        disabled
                        onChange={(e) => { setDireccion(e.target.value) }}>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">RUC del Cliente:</label>
                    <div className="col-sm-8">
                      <input type="number"
                        placeholder="Ingrese el numero de RUC"
                        className={`bg-secondary bg-opacity-10 form-control-depo`}
                        value={rucCliente}
                        onChange={(e) => { setRucCliente(e.target.value) }}
                        disabled
                      >
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Razon Social del cliente:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        value={razonSocialCliente}
                        placeholder='Razon Social'
                        className={`bg-secondary bg-opacity-10 form-control-depo`}
                        onChange={(e) => { setRazonSocialCliente(e.target.value) }}
                        disabled>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Dirección cliente:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        value={direccionCliente}
                        placeholder='Direccion'
                        className={`bg-secondary bg-opacity-10 form-control-depo`}
                        onChange={(e) => { setDireccionCliente(e.target.value) }}
                        disabled>
                      </input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Datos del documento</h4>
                  <p className="text-muted mb-0">Esta información debe ser ingresada por el operador que realiza el servicio.
                  </p>
                </div>
                <div className="card-body">
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Tipo de Documento:</label>
                    <div className="col-sm-8">
                      <select value={tipoDocumento}
                        className={`form-select-depo`}
                        onChange={(e) => { setTipoDocumento(e.target.value) }}>
                        <option value="">Seleccione</option>
                        <option value="Factura">Factura</option>
                        <option value="Boleta">Boleta</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Nro de documento:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        placeholder="Numero de factura"
                        value={nroDocumento}
                        className={`bg-secondary bg-opacity-10 form-control-depo`}
                        readOnly
                        onChange={(e) => { setNroDocumento(e.target.value) }}>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Fecha de emisión:</label>
                    <div className="col-sm-8">
                      <input type="date"
                        value={fechaEmision}
                        className={`form-control-depo`}
                        defaultValue={fechaEmision}
                        onChange={(e) => { setFechaEmision(e.target.value) }}>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Costo del servicio:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        name="monto"
                        placeholder='Costo del servicio'
                        value={monto}
                        onChange={(e) => { setMonto(e.target.value) }}
                        className={`form-control-depo`}
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Moneda:</label>
                    <div className="col-sm-8">
                      <select value={moneda}
                        className={`form-select-depo`}
                        onChange={(e) => { setMoneda(e.target.value) }}>
                        <option value="">Seleccione</option>
                        <option value="PEN">Soles</option>
                        <option value="USD">Dolares</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise" >Tipo de Pago:</label>
                    <div className="col-sm-8">
                      <select value={tipoPago}
                        className={`form-select-depo`}
                        onChange={(e) => { setTipoPago(e.target.value) }}>
                        <option value="">Seleccione</option>
                        <option value="Credito">Credito</option>
                        <option value="Contado">Contado</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Observaciones:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        name="observaciones"
                        placeholder='Observaciones del servicio'
                        value={observaciones}
                        onChange={(e) => { setObservaciones(e.target.value) }}
                        className='form-control-depo'
                        autoComplete='off'>
                      </input>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Operaciones gratuitas:</label>
                    <div className="col-sm-8">
                      <input className="form-check-input" type="checkbox" value="" />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Exportación de servicios:</label>
                    <div className="col-sm-8">
                      <input className="form-check-input" type="checkbox" value="" />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-4 col-form-label-zise">Ley 31556 para mypes:</label>
                    <div className="col-sm-8">
                      <input className="form-check-input" type="checkbox" value="" />
                    </div>
                  </div>
                  <div>
                  <PDFDownloadLink document={<HojaFacturaReportComponent id={id} />} fileName="factura.pdf">
                        {({ loading, url, error, blob }) =>
                          loading ? (
                            <button className="btn-depo btn-primary-depo">Loading Document ...</button>
                          ) : (
                            <button className="btn-depo btn-primary-depo">Descargar</button>
                          )
                        }
                      </PDFDownloadLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Datos de la factura</h4>
                  <p className="text-muted mb-0">Esta información debe ser ingresada por el operador que realiza el servicio.
                  </p>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead className="thead-light">
                          <tr>
                            <th className='td-th-size-depo'>Codigo</th>
                            <th className='td-th-size-depo'>RUC</th>
                            <th className='td-th-size-depo'>Razon Social</th>
                            <th className='td-th-size-depo'>Tipo</th>
                            <th className='td-th-size-depo'>Operador</th>
                            <th className='td-th-size-depo'>Montacarga</th>
                            <th className='td-th-size-depo'>Horas trabajadas</th>
                            <th className='td-th-size-depo'>Monto del servicio</th>
                            <th className='td-th-size-depo'>Moneda</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            factura.servicios?.map(servicio =>
                              <tr key={servicio.id}>
                                <td className='td-th-size-depo'>{servicio.numeroServicio}</td>
                                <td className='td-th-size-depo'>{servicio.ruc}</td>
                                <td className='td-th-size-depo'>{servicio.cliente[0]?.razonSocial}</td>
                                <td className='td-th-size-depo'>{servicio.tipoServicio}</td>
                                <td className='td-th-size-depo'>{servicio.operador[0]?.nombre + ' ' + servicio.operador[0]?.apellidoPat + ' ' + servicio.operador[0]?.apellidoMat}</td>
                                <td className='td-th-size-depo'>{servicio.montacarga[0]?.modelo + '-' + servicio.montacarga[0]?.codigo}</td>
                                <td className='td-th-size-depo'>{servicio.totalHoras}</td>
                                <td className='td-th-size-depo'>{servicio.montoServicio}</td>
                                <td className='td-th-size-depo'>{servicio.moneda == "PEN"? "Soles" : "Dolares"}</td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
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
                    <li className="breadcrumb-item"><a href="#">Factura</a></li>
                    <li className="breadcrumb-item active">Nuevo Factura</li>
                  </ol>
                </div>
                <h4 className="page-title">Listado de Facturas</h4>
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
export default FacturaViewComponent