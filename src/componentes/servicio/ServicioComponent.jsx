import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { buscarServicioByDatos, buscarServicioByDatosAggregate } from '../../service/FacturaService';
import { FaPencilAlt } from 'react-icons/fa';

const ServicioComponent = () => {
    const notify = () => toast.warning('No se han ingresado los parametros de búsqueda', {
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

    const accederNuevoServicio = () => {
        navigator("/servicioNuevo")
    }

    const editServicio = (id) => {
        navigator(`/servicioEdit/${id}`)
    }

    const buscarServicio = (data) => {
        debugger
        if (!data.codServicio && !data.ruc) {
            return
        }
        if (!data.codServicio && !data.ruc) {
          return
      }
        buscarServicioByDatosAggregate(data.ruc, data.codServicio).then((response) => {
          debugger
            setServicios(response.data);
        }).catch(error => {
            console.error(error)
        })
        notify
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
    <Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationFormik01">
          <Form.Label>Ruc</Form.Label>
          <Form.Control
            type="text"
            name="ruc"
            value={values.ruc}
            onChange={handleChange}
            isInvalid={!!errors.ruc}
            autoComplete='off'
          />
          <Form.Control.Feedback type="invalid">
            {errors.ruc}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormik02">
          <Form.Label>Código del servicio</Form.Label>
          <Form.Control
            type="text"
            name="codServicio"
            value={values.codServicio}
            onChange={handleChange}
            isInvalid={!!errors.codServicio}
            style={{ textTransform: 'uppercase' }}
            autoComplete='off'
          />
          <Form.Control.Feedback type="invalid">
            {errors.codServicio}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Button type="submit" variant="info">Buscar</Button>
          <Button type="reset" className='ms-2' onClick={() => handleReset(setServicios([]))}
        variant="warning">Limpiar
      </Button>
        </Form.Group>
      </Row>
      <br/>
      <Button type="bottom" className='ms-2' variant="primary" onClick={() => accederNuevoServicio()}>Nuevo</Button>
    </Form>


    <br />
    <div className='container tableFixHead'>
    <table className='table table-striped table-bordered table-hover' responsive="md">
      <thead>
        <tr>
          <th>Codigo Servicio</th>
          <th>RUC</th>
          <th>Razon Social</th>
          <th>Salida local</th>
          <th>Inicio servicio</th>
          <th>Fin servicio</th>
          <th>Retorno local</th>
          <th>Operador</th>
          <th>Montacarga</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          servicios.map(servicio =>
            <tr key={servicio.id}>
              <td>{servicio.codServicio}</td>
              <td>{servicio.ruc}</td>
              <td>{servicio.cliente[0].razonSocial}</td>
              <td>{servicio.horaSalidaLocal}</td>
              <td>{servicio.horaInicioServicio}</td>
              <td>{servicio.horaFinServicio}</td>
              <td>{servicio.horaRetornoLocal}</td>
              <td>{servicio.operador[0].nombre}</td>
              <td>{servicio.montacarga[0].nombre}</td>
              <td>
                <Button onClick={() => editServicio(cliente.id)}>
                  <FaPencilAlt />
                </Button>
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
    </div>
  </>
  )
}

export default ServicioComponent