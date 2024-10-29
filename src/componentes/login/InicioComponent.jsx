import HeaderComponent from '../HeaderComponent';


const InicioComponent = () => {

  const initialLogin = JSON.parse(sessionStorage.getItem('user'));

  return (
    <>
    {initialLogin.documento && <HeaderComponent />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="float-end">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Depovent</a></li>
                  <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                </ol>
              </div>
              <h4 className="page-title">Bienvenido al sistema de Depovent</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default InicioComponent