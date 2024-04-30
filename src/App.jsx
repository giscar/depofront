
import './App.css'
import FacturaComponent from './componentes/factura/FacturaComponent'
import FindFacturaComponent from './componentes/factura/FindFacturaComponent'
import FooterComponent from './componentes/FooterComponent'
import HeaderComponent from './componentes/HeaderComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ServicioComponent from './componentes/servicio/ServicioComponent'
import LoginComponent from './componentes/login/LoginComponent'
import ClienteComponent from './componentes/cliente/ClienteComponent'
import NuevoClienteComponent from './componentes/cliente/NuevoClienteComponent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <br/>
          <Routes>
            <Route path='/' element={<LoginComponent />}></Route>
            <Route path='/facturas' element={<FindFacturaComponent />}></Route>
            <Route path='/addNuevaFactura' element={<FacturaComponent />}></Route>
            <Route path='/editFactura/:id' element={<FacturaComponent />}></Route>
            <Route path='/clientes' element={<ClienteComponent />}></Route>
            <Route path='/nuevoCliente' element={<NuevoClienteComponent />}></Route>
            <Route path='/addServicio' element={<ServicioComponent />}></Route>
          </Routes>
          <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
