
import './App.css'
import FacturaComponent from './componentes/factura/FacturaComponent'
import {BrowserRouter, Route, Routes, UNSAFE_RouteContext} from 'react-router-dom'
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
import ServicioNuevoComponent from './componentes/servicio/ServicioNuevoComponent'
import ServicioComponent from './componentes/servicio/ServicioComponent'
import ServicioEditComponent from './componentes/servicio/ServicioEditComponent'
import ServicioComponentOperador from './componentes/servicio/ServicioComponentOperador'
import ServicioViewComponent from './componentes/servicio/ServicioViewComponent'
import ServicioReportComponent from './componentes/estadisticas/ServicioReportComponent'
import FacturaRegistroComponent from './componentes/factura/FacturaRegistroComponent'
import UsuarioComponent from './componentes/acceso/usuario/UsuarioComponent'
import UsuarioNuevoComponent from './componentes/acceso/usuario/UsuarioNuevoComponent'
import UsuarioEditComponent from './componentes/acceso/usuario/UsuarioEditComponent'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginComponent/>}></Route>
            <Route path='/facturas' element={<FacturaComponent />}></Route>
            <Route path='/addNuevaFactura' element={<FacturaComponent />}></Route>
            <Route path='/facturaRegistro/:ids' element={<FacturaRegistroComponent />}></Route>
            <Route path='/editFactura/:id' element={<FacturaComponent />}></Route>
            <Route path='/clientes' element={<ClienteComponent />}></Route>
            <Route path='/nuevoCliente' element={<NuevoClienteComponent />}></Route>
            <Route path='/editCliente/:id' element={<EditaClienteComponent />}></Route>
            <Route path='/montacargas' element={<MontacargaComponent />}></Route>
            <Route path='/montacargaNuevo' element={<MontacargaNuevoComponent />}></Route>
            <Route path='/montacargaEdit/:id' element={<MontacargaEditComponennt />}></Route>
            <Route path='/operadores' element={<OperadorComponent />}></Route>
            <Route path='/operadorNuevo' element={<OperadorNuevoComponent />}></Route>
            <Route path='/operadorEdit/:id' element={<OperadorEditComponent />}></Route>
            <Route path='/servicioNuevo' element={<ServicioNuevoComponent />}></Route>
            <Route path='/servicioEdit/:id' element={<ServicioEditComponent />}></Route>
            <Route path='/ServicioView/:id' element={<ServicioViewComponent />}></Route>
            <Route path='/servicios' element={<ServicioComponent />}></Route>
            <Route path='/servicioOperador' element={<ServicioComponentOperador />}></Route>
            <Route path='/servicioReportOperaciones' element={<ServicioReportComponent />}></Route>
            <Route path='/usuarios' element={<UsuarioComponent />}></Route>
            <Route path='/usuarioNuevo' element={<UsuarioNuevoComponent />}></Route>
            <Route path='/usuarioEdit/:id' element={<UsuarioEditComponent />}></Route>

          </Routes>
          <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
