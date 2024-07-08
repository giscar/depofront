import React, { useState } from "react";
import "./LoginComponent.css";
import { useNavigate } from "react-router-dom";


const LoginComponent = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    if (inputUsername !== "admin" || inputPassword !== "admin") {
      setShow(true);
    }
    acceder();
    setLoading(false);
  };

  const navigator = useNavigate();

  const acceder = () =>{
    navigator("/servicios")
  }


  const handlePassword = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
   <>
   <div class="container-fluid">
        <div class="row vh-100">
            <div class="col-12">
                <div class="card-body p-0">
                    <div class="row d-flex align-items-center">
                        <div class="col-md-5 col-xl-3 col-lg-4">
                            <div class="card mb-0 border-0">
                                <div class="card-body p-0">
                                    <div class="text-center p-3">
                                        <a href="index.html" class="logo logo-admin">
                                            <img src="/Logo.png" height="50" alt="logo" class="auth-logo"/>
                                        </a>
                                        <h4 class="mt-3 mb-1 fw-semibold font-18">Sistema Integral de Almacenes y Servicios Depovent</h4>   
                                        <p class="text-muted  mb-0">Acceder al sistema.</p>  
                                    </div>
                                </div>
                                <div class="card-body pt-0">                                    
                                    <form class="my-4" action="index.html">            
                                        <div class="form-group mb-2">
                                            <label class="col-form-label-zise" for="username">Usuario</label>
                                            <input type="text" class="form-control-depo" id="username" name="username" placeholder="Ingresar usuario"/>                               
                                        </div>
            
                                        <div class="form-group">
                                            <label class="col-form-label-zise" for="userpassword">Password</label>                                            
                                            <input type="password" class="form-control-depo" name="password" id="userpassword" placeholder="Ingresar contraseña"/>                            
                                        </div>
            
                                        <div class="form-group row mt-3">
                                            <div class="col-sm-6">
                                                <div class="form-check form-switch form-switch-success">
                                                    <input class="form-check-input" type="checkbox" id="customSwitchSuccess"/>
                                                    <label class="col-form-label-zise " for="customSwitchSuccess">Recordar</label>
                                                </div>
                                            </div> 
                                            <div class="col-sm-6 text-end">
                                                <a href="auth-recover-pw.html" class="col-form-label-zise "><i class="dripicons-lock"></i> Olvido su contraseña?</a>                                    
                                            </div> 
                                        </div>
            
                                        <div class="form-group mb-0 row">
                                            <div class="col-12">
                                                <div class="d-grid mt-3">
                                                    <button class="btn btn-primary" type="button" onClick={handleSubmit}>Ingresar
                                                      <i class="fas fa-sign-in-alt ms-1"></i>
                                                    </button>
                                                </div>
                                            </div> 
                                        </div>                           
                                    </form>
                                    <div class="m-3 text-center text-muted">
                                        <p class="mb-0">No cuenta con un acceso ?  <a href="auth-register-alt.html" class="text-primary ms-2"></a></p>
                                    </div>
                                    <hr class="hr-dashed mt-4"/>
                                    <div class="text-center mt-n5">
                                        <h6 class="card-bg px-3 my-4 d-inline-block">Acceder por:</h6>
                                    </div>
                                    <div class="d-flex justify-content-center mb-1">
                                        <a href="" class="d-flex justify-content-center align-items-center thumb-sm bg-soft-primary rounded-circle me-2">
                                            <i class="fab fa-facebook align-self-center"></i>
                                        </a>
                                        <a href="" class="d-flex justify-content-center align-items-center thumb-sm bg-soft-info rounded-circle me-2">
                                            <i class="fab fa-twitter align-self-center"></i>
                                        </a>
                                        <a href="" class="d-flex justify-content-center align-items-center thumb-sm bg-soft-danger rounded-circle">
                                            <i class="fab fa-google align-self-center"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 col-xl-9 col-lg-8  p-0 vh-100 d-flex justify-content-center auth-bg">
                            <div class="accountbg d-flex align-items-center"> 
                                <div class="account-title text-center text-white">
                                    <img src="/Logo.png" height="150" alt="" class="thumb"/>
                                    <h4 class="mt-3 text-white">Bienvenido al <span class="text-warning">Sistema Integral de Almacenes y Servicios Depovent</span> </h4>
                                    <h1 class="text-white">Acceso al sistema</h1>
                                    <p class="font-18 mt-3">Solo personal autorizado por el administrador de usuarios podra acceder al sistema.</p>
                                    <div class="border w-25 mx-auto border-warning"></div>
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
