
import './App.css'
import FacturaComponent from './componentes/factura/FacturaComponent'
import FindFacturaComponent from './componentes/factura/FindFacturaComponent'
import HeaderComponent from './componentes/HeaderComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ServicioComponent from './componentes/servicio/ServicioComponent'
import LoginComponent from './componentes/login/LoginComponent'
import ClienteComponent from './componentes/cliente/ClienteComponent'
import NuevoClienteComponent from './componentes/cliente/NuevoClienteComponent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditaClienteComponent from './componentes/cliente/EditaClienteComponent'
import MontacargaComponent from './componentes/montacarga/MontacargaComponent'
import MontacargaNuevoComponent from './componentes/montacarga/MontacargaNuevoComponent'
import MontacargaEditComponennt from './componentes/montacarga/MontacargaEditComponennt'
import OperadorComponent from './componentes/operador/OperadorComponent'
import OperadorNuevoComponent from './componentes/operador/OperadorNuevoComponent'
import OperadorEditComponent from './componentes/operador/OperadorEditComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <br/>
          <Routes>
            <Route path='/' element={<MontacargaComponent />}></Route>
            <Route path='/facturas' element={<FindFacturaComponent />}></Route>
            <Route path='/addNuevaFactura' element={<FacturaComponent />}></Route>
            <Route path='/editFactura/:id' element={<FacturaComponent />}></Route>
            <Route path='/clientes' element={<ClienteComponent />}></Route>
            <Route path='/nuevoCliente' element={<NuevoClienteComponent />}></Route>
            <Route path='/editCliente/:id' element={<EditaClienteComponent />}></Route>
            <Route path='/addServicio' element={<ServicioComponent />}></Route>
            <Route path='/montacargas' element={<MontacargaComponent />}></Route>
            <Route path='/montacargaNuevo' element={<MontacargaNuevoComponent />}></Route>
            <Route path='/montacargaEdit/:id' element={<MontacargaEditComponennt />}></Route>
            <Route path='/operadores' element={<OperadorComponent />}></Route>
            <Route path='/operadorNuevo' element={<OperadorNuevoComponent />}></Route>
            <Route path='/operadorEdit/:id' element={<OperadorEditComponent />}></Route>
          </Routes>
          <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
