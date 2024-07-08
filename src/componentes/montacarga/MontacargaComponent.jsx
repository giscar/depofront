import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { montacargaEdit, montacargaForId, montacargasActivo } from '../../service/FacturaService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const MontacargaComponent = () => {

  const navigator = useNavigate();

  const notify = () => toast.info('Se ha eliminado la montacarga correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const [montacarga, setMontacarga] = useState([]);
  const [montacargas, setMontacargas] = useState([])

  const handleMontacarga = (id) => {
    Swal.fire({
      title: "Desea eliminar la montacarga?",
      text: "Esta accion no tiene reversion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar la montacarga!"
    }).then((result) => {
      if (result.isConfirmed) {
        inactivaMontacarga(id)
        Swal.fire({
          title: "Montacarga Eliminado!",
          text: "La accion se ejecuto correctamente.",
          icon: "success"
        });
      }
    });
  }

  const inactivaMontacarga = (id) => {
    montacargaForId(id).then((response) => {
      response.data.estadoRegistro = 0;
      montacargaEdit(response.data).catch(error => {
        console.error(error)
      })
      notify();
      setTimeout(() => {
        buscarMontacarga()
      }, 1000);
    }).catch(error => {
      console.error(error)
    })
  }

  const irMontacargaNuevo = () => {
    navigator("/montacargaNuevo")
  }

  const irMontacargaEdit = (id) => {
    navigator(`/montacargaEdit/${id}`)
  }

  const buscarMontacarga = () => {
    console.log("entro buscarMontacarga")
    montacargasActivo().then((response) => {
      if (response.data.tipoServicio == '01') {
        response.data.nombreTipoServicio = 'Servicio'
      }
      if (response.data.tipoServicio == '02') {
        response.data.nombreTipoServicio = 'Maniobra'
      }
      setMontacargas(response.data);
      console.log(montacarga)
    }).catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    buscarMontacarga();
  }, [montacarga])


  return (
    <>
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
              <h4 className="page-title">Listado de Operadores</h4>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='float-end pb-3 pt-4'>
            <button className='ms-2 btn-depo btn-primary-depo' onClick={() => irMontacargaNuevo()}>Nueva Montacarga</button>
          </div>
        </div>
        <br />
        <div className="table-responsive">
            <table className="table mb-0">
              <thead className="thead-light">
            <tr>
              <th className='td-th-size-depo'>Codigo</th>
              <th className='td-th-size-depo'>Marca</th>
              <th className='td-th-size-depo'>Tonelaje</th>
              <th className='td-th-size-depo'>Serie</th>
              <th className='td-th-size-depo'>Modelo</th>
              <th className='td-th-size-depo'>Año</th>
              <th className='td-th-size-depo'>Ubicacion</th>
              <th className='td-th-size-depo'>Estado</th>
              <th className='td-th-size-depo'>Revision</th>
              <th className='td-th-size-depo'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              montacargas.map(montacarga =>
                <tr key={montacarga.id}>
                  <td className='td-th-size-depo'>{montacarga.codigo}</td>
                  <td className='td-th-size-depo'>{montacarga.marca}</td>
                  <td className='td-th-size-depo'>{montacarga.tonelaje}</td>
                  <td className='td-th-size-depo'>{montacarga.serie}</td>
                  <td className='td-th-size-depo'>{montacarga.modelo}</td>
                  <td className='td-th-size-depo'>{montacarga.anhoFabricacion}</td>
                  <td className='td-th-size-depo'>{montacarga.ubicacion}</td>
                  <td className='td-th-size-depo'>{montacarga.estado}</td>
                  <td className='td-th-size-depo'>{montacarga.revisionOperatividad}</td>
                  <td>
                    <a className='p-4 icon-link-depo' onClick={() => irMontacargaEdit(montacarga.id)}>
                      <i className="bi bi-pencil-fill"></i>
                    </a>
                    <a className='icon-link-depo' onClick={() => handleMontacarga(montacarga.id)}>
                      <i className="bi bi-x-circle-fill"></i>
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

export default MontacargaComponent