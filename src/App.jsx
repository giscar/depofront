
import './App.css'
import FacturaComponent from './componentes/FacturaComponent'
import FindFacturaComponent from './componentes/FindFacturaComponent'
import FooterComponent from './componentes/FooterComponent'
import HeaderComponent from './componentes/HeaderComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            <Route path='/' element={<FindFacturaComponent />}></Route>
            <Route path='/facturas' element={<FindFacturaComponent />}></Route>
            <Route path='/addNuevaFactura' element={<FacturaComponent />}></Route>
            <Route path='/editFactura/:id' element={<FacturaComponent />}></Route>
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
