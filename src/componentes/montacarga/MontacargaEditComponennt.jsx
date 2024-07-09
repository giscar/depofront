import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { montacargaEdit, montacargaForId } from '../../service/FacturaService';

const MontacargaEditComponennt = () => {

  const [montacarga, setMontacarga] = useState([])
  const [codigo, setCodigo] = useState('')
  const [tonelaje, setTonelaje] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [serie, setSerie] = useState('')
  const [anhoFabricacion, setAnhoFabricacion] = useState('')
  const [color, setColor] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [estado, setEstado] = useState('')
  const [revisionOperatividad, setRevisionOperatividad] = useState('')

  const [errors, setErrors] = useState({
    msgCodigo: '',
    msgTonelaje: '',
    msgMarca: '',
    msgModelo: '',
    msgSerie: '',
    msgAnhoFabricacion: '',
    msgEstado: '',
  })

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

  const { id } = useParams();

  useEffect(() => {
    debugger
    if (id) {
      debugger
      montacargaForId(id).then((response) => {
        debugger
        setMontacarga(response.data);
        setTimeout(() => {
          cargarMontacarga(response.data)
        }, 1000);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const cargarMontacarga = (data) => {
    setCodigo(data.codigo);
    setTonelaje(data.tonelaje);
    setMarca(data.marca);
    setModelo(data.modelo);
    setSerie(data.serie);
    setAnhoFabricacion(data.anhoFabricacion);
    setColor(data.color);
    setUbicacion(data.ubicacion);
    setEstado(data.estado);
    setRevisionOperatividad(data.revisionOperatividad);
  }

  const validateForm = () => {
    debugger
    let valid = true;
    const errorCopy = { ...errors }

    if (codigo) {
      errorCopy.msgCodigo = '';
    } else {
      errorCopy.msgCodigo = 'Tiene que ingresar el codigo del montacarga';
      valid = false;
    }

    if (tonelaje) {
      errorCopy.msgTonelaje = '';
    } else {
      errorCopy.msgTonelaje = 'Tiene que ingresar el tonelaje del montacarga';
      valid = false;
    }

    if (marca) {
      errorCopy.msgMarca = '';
    } else {
      errorCopy.msgMarca = 'Tiene que ingresar la marca del montacarga';
      valid = false;
    }

    if (modelo) {
      errorCopy.msgModelo = '';
    } else {
      errorCopy.msgModelo = 'Tiene que ingresar el modelo del montacarga';
      valid = false;
    }

    if (serie) {
      errorCopy.msgSerie = '';
    } else {
      errorCopy.msgSerie = 'Tiene que ingresar el numero de serie del montacarga';
      valid = false;
    }

    if (anhoFabricacion) {
      errorCopy.msgAnhoFabricacion = '';
    } else {
      errorCopy.msgAnhoFabricacion = 'Tiene que ingresar el año de fabricacion del montacarga';
      valid = false;
    }

    if (estado) {
      errorCopy.msgEstado = '';
    } else {
      errorCopy.msgEstado = 'Tiene que ingresar el estado del montacarga';
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

  const editMontacarga = (montacarga) => {
    if (validateForm()) {
      montacarga.estadoRegistro = "1"
      montacarga.codigo = codigo.toUpperCase();
      montacarga.tonelaje = tonelaje.toUpperCase();
      montacarga.marca = marca.toUpperCase();
      montacarga.modelo = modelo.toUpperCase();
      montacarga.serie = serie.toUpperCase();
      montacarga.anhoFabricacion = anhoFabricacion;
      montacarga.color = color.toUpperCase();
      montacarga.ubicacion = ubicacion.toUpperCase();
      montacarga.estado = estado.toUpperCase();
      montacarga.revisionOperatividad = revisionOperatividad.toUpperCase();
      montacargaEdit(montacarga).catch(error => {
        console.error(error)
      })
      notify()
      setTimeout(() => {
        navigator("/montacargas");
      }, 1000);
    }
  }

  return (
    <>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="float-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                  <li className="breadcrumb-item"><a href="#">Montacargas</a></li>
                  <li className="breadcrumb-item active">Editar montacarga</li>
                </ol>
              </div>
              <h4 className="page-title">Editar Montacarga</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12 card-deck">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Datos de la Montacarga</h4>
                <p className="text-muted mb-0">Debe ser ingresada por el/la administrador(a) del modulo de servicios.</p>
              </div>

              <div className="card-body">
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Codigo:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Codigo de la montacarga"
                      value={codigo}
                      className="w-50 bg-secondary bg-opacity-10 form-control-depo"
                      readOnly
                      onChange={(e) => { setCodigo(e.target.value) }} />
                    {errors.msgCodigo && <div className='invalid-feedback'>{errors.msgCodigo}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Tonelaje:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Tonelaje de la montacarga"
                      value={tonelaje}
                      className={`w-50 form-control-depo ${errors.msgTonelaje ? 'is-invalid' : ''}`}
                      onChange={(e) => { setTonelaje(e.target.value) }} />
                    {errors.msgTonelaje && <div className='invalid-feedback'>{errors.msgTonelaje}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Marca:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Marca de la montacarga"
                      value={marca}
                      className={`w-50 form-control-depo ${errors.msgMarca ? ' is-invalid' : ''}`}
                      onChange={(e) => { setMarca(e.target.value) }} />
                    {errors.msgMarca && <div className='invalid-feedback'>{errors.msgMarca}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Serie:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Serie"
                      value={serie}
                      className={`w-50 form-control-depo ${errors.msgSerie ? ' is-invalid' : ''}`}
                      onChange={(e) => { setSerie(e.target.value) }} />
                    {errors.msgSerie && <div className='invalid-feedback'>{errors.msgSerie}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Modelo:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Modelo"
                      value={modelo}
                      className={`w-50 form-control-depo ${errors.msgModelo ? ' is-invalid' : ''}`}
                      onChange={(e) => { setModelo(e.target.value) }}>
                    </input>
                    {errors.msgModelo && <div className='invalid-feedback'>{errors.msgModelo}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Año de fabricacion:</label>
                  <div className="col-sm-9">
                    <input type="number"
                      placeholder="Año de fabricacion"
                      value={anhoFabricacion}
                      className={`w-50 form-control-depo ${errors.msgAnhoFabricacion ? ' is-invalid' : ''}`}
                      onChange={(e) => { setAnhoFabricacion(e.target.value) }}>
                    </input>
                    {errors.msgAnhoFabricacion && <div className='invalid-feedback'>{errors.msgAnhoFabricacion}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Estado:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Estado de la montacarga"
                      value={estado}
                      className={`w-50 form-control-depo ${errors.msgEstado ? ' is-invalid' : ''}`}
                      onChange={(e) => { setEstado(e.target.value) }}>
                    </input>
                    {errors.msgEstado && <div className='invalid-feedback'>{errors.msgEstado}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Color:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Color de la montacarga"
                      value={color}
                      className="w-50 form-control-depo"
                      onChange={(e) => { setColor(e.target.value) }}>
                    </input>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Ubicacion:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Ubicacion de la montacarga"
                      value={ubicacion}
                      className="w-50 form-control-depo"
                      onChange={(e) => { setUbicacion(e.target.value) }}>
                    </input>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label-zise text-end">Revision de operatividad:</label>
                  <div className="col-sm-9">
                    <input type="text"
                      placeholder="Revision de operatividad"
                      value={revisionOperatividad}
                      className="w-50 form-control-depo"
                      onChange={(e) => { setRevisionOperatividad(e.target.value) }}>
                    </input>
                  </div>
                </div>
                <button type="button" className="btn-depo btn-primary-depo pr-5" onClick={editMontacarga}>Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MontacargaEditComponennt