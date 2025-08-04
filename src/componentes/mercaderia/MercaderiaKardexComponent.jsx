import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { buscarOrdenSalidaByIdIngreso } from '../../service/FacturaService';
import { PDFDownloadLink } from '@react-pdf/renderer';
import NotaSalidaReportComponent from '../report/NotaSalidaReportComponent';

const MercaderiaKardexComponent = ({ show, handleClose, idIngreso }) => {

  const [ordenSalidas, setOrdenSalidas] = useState([])

  const buscarOrdenSalidasByIdIngreso = () => {
    buscarOrdenSalidaByIdIngreso(idIngreso).then(p => {
      setOrdenSalidas(p.data)
    }).catch(e => console.log(e))
  }

  const formatearFecha = (fec) => {
    //2024-11-02
    let dia = fec.substring(8, 10)
    let mes = fec.substring(5, 7)
    let anho = fec.substring(0, 4)
    return `${dia}/${mes}/${anho}`
  }

  const descargarOrdenSalida = () => {

  } 

  useEffect(() => {
    if(show){
      buscarOrdenSalidasByIdIngreso()
    }
  }, [show])

  return (
    <>
      <Modal show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
        keyboard={false}
        className=''>
        <Modal.Header closeButton>
          <Modal.Title>Listado de ordenes de salida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
            
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>


          {ordenSalidas.length > 0 &&
            <div className="table-responsive container">
              <table className="table mb-0">
                <thead className="thead-light">
                  <tr>
                    <th className='td-th-size-depo'>RUC</th>
                    <th className='td-th-size-depo'>Chofer</th>
                    <th className='td-th-size-depo'>Placa vehicular</th>
                    <th className='td-th-size-depo'>fecha de salida</th>
                    <th className='td-th-size-depo'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ordenSalidas.map(os =>
                      <tr key={os.id}>
                        <td className='td-th-size-depo'>{os.rucDestinatario}</td>
                        <td className='td-th-size-depo'>{os.chofer}</td>
                        <td className='td-th-size-depo'>{os.placaVehiculo}</td>
                        <td className='td-th-size-depo'>{formatearFecha(os.fechaEmision)}</td>
                        <td className='td-th-size-depo'>
                          <a className='icon-link-depo' onClick={() => descargarOrdenSalida()}>
                            <i className="bi bi-pencil-fill"></i>
                          </a>
                          &nbsp;&nbsp;
                            <PDFDownloadLink document={<NotaSalidaReportComponent id={os.id} />} fileName={os.rucDestinatario + '_orden_salida.pdf'}>
                                                      {({ loading, url, error, blob }) =>
                                                        loading ? (
                                                          <i class="bi bi-arrow-clockwise"></i>
                                                        ) : (
                                                          <i class="bi bi-cloud-download-fill"></i>
                                                        )
                                                      }
                                                    </PDFDownloadLink>
                    
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default MercaderiaKardexComponent;