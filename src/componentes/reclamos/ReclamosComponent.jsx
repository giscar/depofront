import React, { useState } from "react";

const ReclamosComponent = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");


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
                                                <h4 className="mt-3 mb-1 fw-semibold font-18">Intranet de Depovent</h4>
                                                <p className="text-muted  mb-0">Solo usuarios permitidos pueden ingresar a la intranetß.</p>
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
                                                        onChange={(e) => { setInputUsername(e.target.value) }} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label-zise" for="userpassword">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control-depo"
                                                        name="password"
                                                        id="userpassword"
                                                        placeholder="Ingresar contraseña"
                                                        onChange={(e) => { setInputPassword(e.target.value) }} />
                                                </div>

                                                <div className="form-group row mt-3">
                                                    <div className="col-sm-6">
                                                        <div className="form-check form-switch form-switch-success">
                                                            <input className="form-check-input" type="checkbox" id="customSwitchSuccess" />
                                                            <label className="col-form-label-zise " for="customSwitchSuccess">Recordar</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 text-end">
                                                        
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

export default ReclamosComponent;
