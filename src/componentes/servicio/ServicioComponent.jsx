import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { buscarServicioByDatosAggregate } from '../../service/FacturaService';
import { FaPencilAlt } from 'react-icons/fa';

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

  const buscarServicio = (data) => {
    if (!data.codServicio && !data.ruc) {
      return
    }
    buscarServicioByDatosAggregate(data.ruc, data.codServicio).then((response) => {
      debugger
      setServicios(response.data);
    }).catch(error => {
      console.error(error)
    })

  }

  const { handleSubmit, handleChange, handleReset, values, errors } = useFormik({
    validationSchema: yup.object({
      codServicio: yup.string(),
      ruc: yup.string()
    }),
    initialValues: {
      codServicio: '',
      ruc: ''
    },
    onSubmit: buscarServicio,
  })

  return (
    <>
      <div className="container-fluid">
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
                    <label for="inputCodServicio" className='col-form-label-zise'>Codigo del servicio:</label>
                    <input type="number"
                      id="inputCodServicio"
                      placeholder="Codigo del servicio"
                      value={codServicio}
                      className="form-control-depo"
                      onChange={(e) => { setCodServicio(e.target.value) }}>
                    </input>
                  </div>
                  <div className="col-lg-6">
                    <label for="inputRuc" className='col-form-label-zise'>Numero de RUC:</label>
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
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Buscar</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn btn-warning" >Limpiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div class="table-responsive">
          <table class="table mb-0">
            <thead class="thead-light">
              <tr>
                <th>Codigo</th>
                <th>RUC</th>
                <th>Razon Social</th>
                <th>Salida local</th>
                <th>Inicio servicio</th>
                <th>Fin servicio</th>
                <th>Retorno local</th>
                <th>Operador</th>
                <th>Montacarga</th>
                <th>Estado</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {
                servicios.map(servicio =>
                  <tr key={servicio.id}>
                    <td className='td-size-depo'>{servicio.codServicio}</td>
                    <td className='td-size-depo'>{servicio.ruc}</td>
                    <td className='td-size-depo'>{servicio.cliente[0].razonSocial}</td>
                    <td className='td-size-depo'>{servicio.horaSalidaLocal.replace("T", " ")}</td>
                    <td className='td-size-depo'>{servicio.horaInicioServicio.replace("T", " ")}</td>
                    <td className='td-size-depo'>{servicio.horaFinServicio.replace("T", " ")}</td>
                    <td className='td-size-depo'>{servicio.horaRetornoLocal.replace("T", " ")}</td>
                    <td className='td-size-depo'>{servicio.operador[0].nombre}</td>
                    <td className='td-size-depo'>{servicio.montacarga[0].nombre}</td>
                    <td className='td-size-depo'><span class="badge badge-boxed  badge-outline-success">Business</span></td>
                    <td>
                      <a className="icon-link icon-link-depo" onClick={() => editServicio(servicio.id)}>
                      <i class="fa-solid fa-pencil"></i>
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