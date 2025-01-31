import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ingresoAll, montacargaForId, montacargaInactiva, montacargasActivo } from '../../service/FacturaService';
import HeaderComponent from '../HeaderComponent';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const MercaderiaComponent = () => {

  const access = "R010"
  let ingress = false;

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  initialLogin.perfiles.map(p => {
    p.roles.map(r => {
      if (r.codigo == access)
        ingress = true;
    });
  })

  const navigator = useNavigate();

  const irMercaderiaNuevo = () => {
    navigator(`/mercaderiaNuevo`)
  }

  const notify = () => toast.info('Se ha eliminado la montacarga correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const [ingresos, setIngresos] = useState([])

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

  const buscarIngresos = () => {
    ingresoAll().then((response) => {
      setIngresos(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    buscarIngresos()
  }, [])

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
                  <th className='td-th-size-depo'>Fecha de ingreso</th>
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
                      <td className='td-th-size-depo'>{item.fechaIngreso}</td>
                      <td className='td-th-size-depo'>{item.estadoRegistro}</td>
                      <td className='td-th-size-depo'></td>
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
    </>
  )
}

export default MercaderiaComponent