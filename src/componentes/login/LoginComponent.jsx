import React, { useState } from "react";
import "./LoginComponent.css";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({setUser}) => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    sessionStorage.setItem('user', {}) 

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        delay(500);
        console.log(`Username :${inputUsername}, Password :${inputPassword}`);
        if (inputUsername !== "admin" || inputPassword !== "admin") {
            setShow(true);
        }
        if (inputUsername === "46931245" || inputPassword === "46931245") {
            const acceso = {}
            acceso.usuario = inputUsername;
            acceso.pass = inputPassword;
            acceso.nombre = "Perez Arellano Geraldine"
            acceso.rol = "adm"
            sessionStorage.setItem('user', JSON.stringify(acceso))  
            acceder(acceso.rol);
        }

        if (inputUsername === "75880169" || inputPassword === "75880169") {
            const acceso = {}
            acceso.usuario = inputUsername;
            acceso.pass = inputPassword;
            acceso.nombre = "Salazar Guerrero Christopher"
            acceso.rol = "adm"
            sessionStorage.setItem('user', JSON.stringify(acceso))  
            acceder(acceso.rol);
        }

        if (inputUsername === "47276371" || inputPassword === "47276371") {
            const acceso = {}
            acceso.usuario = inputUsername;
            acceso.pass = inputPassword;
            acceso.nombre = "Salvador Pastor Andre"
            acceso.rol = "adm"
            sessionStorage.setItem('user', JSON.stringify(acceso))  
            acceder(acceso.rol);
        }

        if (inputUsername === "46923787" || inputPassword === "46923787") {
            const acceso = {}
            acceso.usuario = inputUsername;
            acceso.pass = inputPassword;
            acceso.nombre = "Allauca Ayala Cesar"
            acceso.rol = "ope"
            sessionStorage.setItem('user', JSON.stringify(acceso))  
            acceder(acceso.rol);
        }

        setLoading(false);
    };

    const navigator = useNavigate();

    const acceder = (rol) => {
        debugger
        if(rol == "adm")
            navigator("/servicios")
        if(rol == "ope")
            navigator("/servicioOperador")
    }


    const handlePassword = () => { };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row vh-100">
                    <div className="col-12">
                        <div className="card-body p-0">
                            <div className="row d-flex align-items-center">
                                <div className="col-md-5 col-xl-3 col-lg-4">
                                    <div className="card mb-0 border-0">
                                        <div className="card-body p-0">
                                            <div className="text-center p-3">
                                                <a href="index.html" className="logo logo-admin">
                                                    <img src="/Logo.png" height="50" alt="logo" className="auth-logo" />
                                                </a>
                                                <h4 className="mt-3 mb-1 fw-semibold font-18">Sistema Integral de Almacenes y Servicios Depovent</h4>
                                                <p className="text-muted  mb-0">Acceder al sistema.</p>
                                            </div>
                                        </div>
                                        <div className="card-body pt-0">
                                            <form className="my-4" action="index.html">
                                                <div className="form-group mb-2">
                                                    <label className="col-form-label-zise" for="username">Usuario</label>
                                                    <input type="text" 
                                                        className="form-control-depo" 
                                                        id="username" 
                                                        name="username" 
                                                        placeholder="Ingresar usuario" 
                                                        onChange={(e) => { setInputUsername(e.target.value) }}/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label-zise" for="userpassword">Password</label>
                                                    <input 
                                                        type="password" 
                                                        className="form-control-depo" 
                                                        name="password" 
                                                        id="userpassword" 
                                                        placeholder="Ingresar contraseña" 
                                                        onChange={(e) => { setInputPassword(e.target.value) }}/>
                                                </div>

                                                <div className="form-group row mt-3">
                                                    <div className="col-sm-6">
                                                        <div className="form-check form-switch form-switch-success">
                                                            <input className="form-check-input" type="checkbox" id="customSwitchSuccess" />
                                                            <label className="col-form-label-zise " for="customSwitchSuccess">Recordar</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 text-end">
                                                        <a href="auth-recover-pw.html" className="col-form-label-zise "><i className="dripicons-lock"></i> Olvido su contraseña?</a>
                                                    </div>
                                                </div>

                                                <div className="form-group mb-0 row">
                                                    <div className="col-12">
                                                        <div className="d-grid mt-3">
                                                            <button className="btn btn-primary" type="button" onClick={handleSubmit}>Ingresar
                                                                <i className="fas fa-sign-in-alt ms-1"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="m-3 text-center text-muted">
                                                <p className="mb-0">No cuenta con un acceso ?  <a href="auth-register-alt.html" className="text-primary ms-2"></a></p>
                                            </div>
                                            <hr className="hr-dashed mt-4" />
                                            <div className="text-center mt-n5">
                                                <h6 className="card-bg px-3 my-4 d-inline-block">Acceder por:</h6>
                                            </div>
                                            <div className="d-flex justify-content-center mb-1">
                                                <a href="" className="d-flex justify-content-center align-items-center thumb-sm bg-soft-primary rounded-circle me-2">
                                                    <i className="fab fa-facebook align-self-center"></i>
                                                </a>
                                                <a href="" className="d-flex justify-content-center align-items-center thumb-sm bg-soft-info rounded-circle me-2">
                                                    <i className="fab fa-twitter align-self-center"></i>
                                                </a>
                                                <a href="" className="d-flex justify-content-center align-items-center thumb-sm bg-soft-danger rounded-circle">
                                                    <i className="fab fa-google align-self-center"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7 col-xl-9 col-lg-8  p-0 vh-100 d-flex justify-content-center auth-bg">
                                    <div className="accountbg d-flex align-items-center">
                                        <div className="account-title text-center text-white">
                                            <img src="/Logo.png" height="150" alt="" className="thumb" />
                                            <h4 className="mt-3 text-white">Bienvenido al <span className="text-warning">Sistema Integral de Almacenes y Servicios Depovent</span> </h4>
                                            <h1 className="text-white">Acceso al sistema</h1>
                                            <p className="font-18 mt-3">Solo personal autorizado por el administrador de usuarios podra acceder al sistema.</p>
                                            <div className="border w-25 mx-auto border-warning"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;
