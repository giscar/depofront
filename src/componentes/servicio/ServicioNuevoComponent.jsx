import React, { useEffect, useState } from 'react'
import BusquedaClienteComponent from '../cliente/BusquedaClienteComponent'
import { toast } from 'react-toastify';
import { buscarCodigoServicio, montacargasActivo, operadorActivo, servicioSave } from '../../service/FacturaService';

const ServicioNuevoComponent = () => {

  const [cliente, setCliente] = useState('')
  const [operadores, setOperadores] = useState([])
  const [montacargas, setMontacargas] = useState([])
  const [ruc, setRuc] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [direccion, setDireccion] = useState('')
  const [codServicio, setCodServicio] = useState('')
  const [operadorId, setOperadorId] = useState('')
  const [montacargaId, setMontacargaId] = useState('')
  const [horaSalidaLocal, setHoraSalidaLocal] = useState('')
  const [horaInicioServicio, setHoraInicioServicio] = useState('')
  const [horaRetornoLocal, setHoraRetornoLocal] = useState('')
  const [horaFinServicio, setHoraFinServicio] = useState('')
  const [totalHoras, setTotalHoras] = useState('')
  const [montoServicio, setMontoServicio] = useState('')

  const [errors, setErrors] = useState({
    msgCodServicio : '',
    msgRuc : '',
    msgOperadorId : '',
    msgMontacargaId : '',
})

  const notify = () => toast.info('Se han registrado los cambios correctamente', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

  const handleSubmit1 = (event) => {
    debugger
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const validateForm = () => {
    debugger
    let valid = true;
    const errorCopy = {... errors}
    const regex = /^[0-9]*$/;
    if (codServicio){
      errorCopy.msgCodServicio = '';
      if(!regex.test(codServicio)){
        errorCopy.msgCodServicio = 'El codigo del servicio debe ser un numero';
        valid = false;
      }
    }else{
      errorCopy.msgCodServicio = 'Tiene que ingresar el numero de servicio';
      valid = false;
    }
    
    if (ruc){
        errorCopy.msgRuc = '';
    }else{
        errorCopy.msgRuc = 'Tiene que ingresar el numero de RUC';
        valid = false;
    }

    if (operadorId){
        errorCopy.msgOperadorId = '';
    }else{
        errorCopy.msgOperadorId = 'Tiene que ingresar el operador';
        valid = false;
    }

    if (montacargaId){
        errorCopy.msgMontacargaId = '';
    }else{
        errorCopy.msgMontacargaId = 'Tiene que ingresar la montacarga';
        valid = false;
    }

    setErrors(errorCopy);

    return valid;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (validateForm()){
      const data = {}   
      data.codServicio = codServicio;
      data.ruc = ruc;
      data.razonSocial = razonSocial?.toUpperCase();
      data.direccion = direccion?.toUpperCase();
      data.horaSalidaLocal = horaSalidaLocal;
      data.horaInicioServicio = horaInicioServicio;
      data.horaFinServicio = horaFinServicio;
      data.horaRetornoLocal = horaRetornoLocal;
      data.operadorId = operadorId;
      data.montacargaId = montacargaId;
      data.totalHoras = totalHoras;
      data.montoServicio = montoServicio;
      data.estado = "1";
      servicioSave(data).catch(error => {
        console.error(error)
      });
      limpiar()
      notify()
      setTimeout(() => {
        handleCodServicio()
      }, 2000);
      
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    operadorActivo().then((response) => {
      setOperadores(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    montacargasActivo().then((response) => {
      setMontacargas(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    handleCodServicio();
  }, [])

  const handleCodServicio = () => {
    buscarCodigoServicio().then((response) => {
      setCodServicio(response.data+1)
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    setRuc(cliente?.ruc)
    setRazonSocial(cliente?.razonSocial)
    setDireccion(cliente?.direccion)
  }, [cliente])

  const limpiar = () => {
    setRuc('')
    setRazonSocial('')
    setDireccion('')
    setCliente([])
    setOperadorId('')
    setMontacargaId('')
    setCodServicio('')
    setHoraSalidaLocal('')
    setHoraInicioServicio('')
    setHoraFinServicio('')
    setHoraRetornoLocal('')
    setTotalHoras('')
    setMontoServicio('')
  };

  const resetFormularioIngreso = () => {
    limpiar();
    handleCodServicio();
  }

  return (
    <>
      <div className="leftbar-tab-menu">
        <div className="main-icon-menu">
            <a href="index.html" className="logo logo-metrica d-block text-center">
                <span>
                    <img src="/images/logo-sm.png" alt="logo-small" className="logo-sm"/>
                </span>
            </a>
            <div className="main-icon-menu-body">
                <div className="position-reletive h-100" data-simplebar >
                    <ul className="nav nav-tabs" role="tablist" id="tab-menu">
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Dashboard" data-bs-trigger="hover">
                            <a href="#MetricaDashboard" id="dashboard-tab" className="nav-link">
                                <i className="ti ti-smart-home menu-icon">Servicios</i>
                            </a>
                        </li>
                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Apps" data-bs-trigger="hover">
                            <a href="#MetricaApps" id="apps-tab" className="nav-link">
                                <i className="ti ti-apps menu-icon"></i>
                            </a>
                        </li>

                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Uikit" data-bs-trigger="hover">
                            <a href="#MetricaUikit" id="uikit-tab" className="nav-link">
                                <i className="ti ti-planet menu-icon"></i>
                            </a>
                        </li>

                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Pages" data-bs-trigger="hover">
                            <a href="#MetricaPages" id="pages-tab" className="nav-link">
                                <i className="ti ti-files menu-icon"></i>
                            </a>
                        </li>

                        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Authentication" data-bs-trigger="hover">
                            <a href="#MetricaAuthentication" id="authentication-tab" className="nav-link">
                                <i className="ti ti-shield-lock menu-icon"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="pro-metrica-end">
                <a href="" className="profile">
                    <img src="/images/users/user-4.jpg" alt="profile-user" className="rounded-circle thumb-sm"/>
                </a>
            </div>
        </div>
        

        <div className="main-menu-inner">
            
            <div className="topbar-left">
                <a href="index.html" className="logo">
                    <span>
                        <img src="/images/logo-dark.png" alt="logo-large" className="logo-lg logo-dark"/>
                        <img src="/images/logo.png" alt="logo-large" className="logo-lg logo-light"/>
                    </span>
                </a>
            </div>
            
            <div className="menu-body navbar-vertical tab-content" data-simplebar>
                <div id="MetricaDashboard" className="main-icon-menu-pan tab-pane" role="tabpanel"
                    aria-labelledby="dasboard-tab">
                    <div className="title-box">
                        <h6 className="menu-title">Dashboard</h6>
                    </div>

                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link" href="index.html">Analytics</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="crypto-index.html">Crypto</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="crm-index.html">CRM</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="projects-index.html">Project</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="ecommerce-index.html">Ecommerce</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="helpdesk-index.html">Helpdesk</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="hospital-index.html">Hospital</a>
                        </li>
                    </ul>
                </div>

                <div id="MetricaApps" className=" tab-pane" role="tabpanel"
                    aria-labelledby="apps-tab">
                    <div className="title-box">
                        <h6 className="menu-title">Apps</h6>
                    </div>

                    <div className="collapse navbar-collapse" id="sidebarCollapse">
                        
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarAnalytics" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarAnalytics">
                                    Analytics
                                </a>
                                <div className="collapse " id="sidebarAnalytics">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a href="analytics-customers.html" className="nav-link ">Customers</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="analytics-reports.html" className="nav-link ">Reports</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarCrypto" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarCrypto">
                                    Crypto
                                </a>
                                <div className="collapse " id="sidebarCrypto">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="crypto-exchange.html">Exchange</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="crypto-wallet.html">Wallet</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="crypto-news.html">Crypto News</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="crypto-ico.html">ICO List</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="crypto-settings.html">Settings</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarCRM" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarCRM">
                                    CRM
                                </a>
                                <div className="collapse " id="sidebarCRM">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="crm-contacts.html">Contacts</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="crm-opportunities.html">Opportunities</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="crm-leads.html">Leads</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="crm-customers.html">Customers</a>
                                        </li> 
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarProjects" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarProjects">
                                    Projects
                                </a>
                                <div className="collapse " id="sidebarProjects">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="projects-clients.html">Clients</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="projects-team.html">Team</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="projects-project.html">Project</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="projects-task.html">Task</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="projects-kanban-board.html">Kanban Board</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="projects-chat.html">Chat</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="projects-users.html">Users</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="projects-create.html">Project Create</a>
                                        </li> 
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarEcommerce" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarEcommerce">
                                    Ecommerce
                                </a>
                                <div className="collapse " id="sidebarEcommerce">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="ecommerce-products.html">Products</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ecommerce-product-list.html">Product List</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ecommerce-product-detail.html">Product Detail</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ecommerce-cart.html">Cart</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ecommerce-checkout.html">Checkout</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarHelpdesk" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarHelpdesk">
                                    Helpdesk
                                </a>
                                <div className="collapse " id="sidebarHelpdesk">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="helpdesk-teckets.html">Tickets</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="helpdesk-reports.html">Reports</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="helpdesk-agents.html">Agents</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarHospital" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarHospital">
                                    Hospital
                                </a>
                                <div className="collapse " id="sidebarHospital">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a href="#sidebarAppointments " className="nav-link" data-bs-toggle="collapse"
                                                role="button" aria-expanded="false" aria-controls="sidebarAppointments">
                                                Appointments 
                                            </a>
                                            <div className="collapse " id="sidebarAppointments">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-doctor-shedule.html">Dr. Shedule</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-all-appointments.html">All Appointments</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#sidebarDoctors" className="nav-link" data-bs-toggle="collapse"
                                                role="button" aria-expanded="false" aria-controls="sidebarDoctors">
                                                Doctors
                                            </a>
                                            <div className="collapse" id="sidebarDoctors">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-all-doctors.html">All Doctors</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-add-doctor.html">Add Doctor</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-doctor-edit.html">Doctor Edit</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-doctor-profile.html">Doctor Profile</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="nav-item">
                                            <a href="#sidebarPatients" className="nav-link" data-bs-toggle="collapse"
                                                role="button" aria-expanded="false" aria-controls="sidebarPatients">
                                                Patients
                                            </a>
                                            <div className="collapse" id="sidebarPatients">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-all-patients.html">All Patients</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-add-patient.html">Add Patient</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-patient-edit.html">Patient Edit</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-patient-profile.html">Patient Profile</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="nav-item">
                                            <a href="#sidebarPayments" className="nav-link" data-bs-toggle="collapse"
                                                role="button" aria-expanded="false" aria-controls="sidebarPayments">
                                                Payments
                                            </a>
                                            <div className="collapse" id="sidebarPayments">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-all-payments.html">All Payments</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-payment-invoice.html">Payment Invoice</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-cashless-payments.html">Cashless Payments</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="nav-item">
                                            <a href="#sidebarStaff" className="nav-link" data-bs-toggle="collapse"
                                                role="button" aria-expanded="false" aria-controls="sidebarStaff">
                                                Staff
                                            </a>
                                            <div className="collapse" id="sidebarStaff">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-all-staff.html">All Staff</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-add-member.html">Add Member</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-edit-member.html">Edit Member</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-member-profile.html">Member Profile</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-salary.html">Staff Salary</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="nav-item">
                                            <a href="#sidebarGeneral" className="nav-link" data-bs-toggle="collapse"
                                                role="button" aria-expanded="false" aria-controls="sidebarGeneral">
                                                General
                                            </a>
                                            <div className="collapse" id="sidebarGeneral">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-all-rooms.html">Room Allotments</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-expenses.html">Expenses Report</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-departments.html">Departments</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-insurance-company.html">Insurance Co.</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-events.html">Events</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-leaves.html">Leaves</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-holidays.html">Holidays</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-attendance.html">Attendance</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="hospital-chat.html">Chat</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarEmail" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarEmail">
                                    Email
                                </a>
                                <div className="collapse " id="sidebarEmail">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="apps-email-inbox.html">Inbox</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="apps-email-read.html">Read Email</a>
                                        </li> 
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="apps-chat.html">Chat</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="apps-contact-list.html">Contact List</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="apps-calendar.html">Calendar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="apps-invoice.html">Invoice</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="MetricaUikit" className="tab-pane" role="tabpanel"
                    aria-labelledby="uikit-tab">
                    <div className="title-box">
                        <h6 className="menu-title">UI Kit</h6>
                    </div>
                    <div className="collapse navbar-collapse" id="sidebarCollapse_2">
                        
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarElements" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarElements">
                                UI Elements
                                </a>
                                <div className="collapse " id="sidebarElements">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-alerts.html">Alerts</a>
                                        </li> 
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-avatar.html">Avatar</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-buttons.html">Buttons</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-badges.html">Badges</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-cards.html">Cards</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-carousels.html">Carousels</a>
                                        </li>                                
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-dropdowns.html">Dropdowns</a>
                                        </li>                                   
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-grids.html">Grids</a>
                                        </li>                                
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-images.html">Images</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-list.html">List</a>
                                        </li>                                   
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-modals.html">Modals</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-navs.html">Navs</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-navbar.html">Navbar</a>
                                        </li> 
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-paginations.html">Paginations</a>
                                        </li>   
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-popover-tooltips.html">Popover & Tooltips</a>
                                        </li>                                
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-progress.html">Progress</a>
                                        </li>                                
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-spinners.html">Spinners</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-tabs-accordions.html">Tabs & Accordions</a>
                                        </li>                               
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-typography.html">Typography</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="ui-videos.html">Videos</a>
                                        </li> 
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarAdvancedUI" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarAdvancedUI">
                                    Advanced UI
                                </a>
                                <div className="collapse " id="sidebarAdvancedUI">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-animation.html">Animation</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-clipboard.html">Clip Board</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-dragula.html">Dragula</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-files.html">File Manager</a>
                                        </li> 
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-highlight.html">Highlight</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-rangeslider.html">Range Slider</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-ratings.html">Ratings</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-ribbons.html">Ribbons</a>
                                        </li>                                  
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-sweetalerts.html">Sweet Alerts</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="advanced-toasts.html">Toasts</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarForms" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarForms">
                                    Forms
                                </a>
                                <div className="collapse " id="sidebarForms">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="forms-elements.html">Basic Elements</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="forms-advanced.html">Advance Elements</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="forms-validation.html">Validation</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="forms-wizard.html">Wizard</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="forms-editors.html">Editors</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="forms-uploads.html">File Upload</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="forms-img-crop.html">Image Crop</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarCharts" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarCharts">
                                Charts
                                </a>
                                <div className="collapse " id="sidebarCharts">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="charts-apex.html">Apex</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="charts-justgage.html">JustGage</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="charts-chartjs.html">Chartjs</a>
                                        </li> 
                                        <li className="nav-item">
                                            <a className="nav-link" href="charts-toast-ui.html">Toast</a>
                                        </li> 
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarTables" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarTables">
                                    Tables
                                </a>
                                <div className="collapse " id="sidebarTables">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="tables-basic.html">Basic</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="tables-datatable.html">Datatables</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="tables-editable.html">Editable</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarIcons" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarIcons">
                                Icons
                                </a>
                                <div className="collapse " id="sidebarIcons">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="icons-materialdesign.html">Material Design</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="icons-fontawesome.html">Font awesome</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="icons-tabler.html">Tabler</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="icons-feather.html">Feather</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarMaps" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarMaps">
                                    Maps
                                </a>
                                <div className="collapse " id="sidebarMaps">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="maps-google.html">Google Maps</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="maps-leaflet.html">Leaflet Maps</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="maps-vector.html">Vector Maps</a>
                                        </li> 
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#sidebarEmailTemplates" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarEmailTemplates">
                                    Email Templates
                                </a>
                                <div className="collapse " id="sidebarEmailTemplates">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="email-templates-basic.html">Basic Action Email</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="email-templates-alert.html">Alert Email</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="email-templates-billing.html">Billing Email</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="MetricaPages" className=" tab-pane" role="tabpanel" aria-labelledby="pages-tab">
                    <div className="title-box">
                        <h6 className="menu-title">Pages</h6>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link" href="pages-profile.html">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages-tour.html">Tour</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages-timeline.html">Timeline</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages-treeview.html">Treeview</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages-starter.html">Starter Page</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages-pricing.html">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages-blogs.html">Blogs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages-faq.html">FAQs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages-gallery.html">Gallery</a>
                        </li>
                    </ul>
                </div>

                <div id="MetricaAuthentication" className=" tab-pane" role="tabpanel"
                    aria-labelledby="authentication-tab">
                    <div className="title-box">
                        <h6 className="menu-title">Authentication</h6>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link" href="auth-login.html">Log in</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-login-alt.html">Log in alt</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-register.html">Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-register-alt.html">Register-alt</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-recover-pw.html">Re-Password</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-recover-pw-alt.html">Re-Password-alt</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-lock-screen.html">Lock Screen</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-lock-screen-alt.html">Lock Screen-alt</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-404.html">Error 404</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-404-alt.html">Error 404-alt</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-500.html">Error 500</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="auth-500-alt.html">Error 500-alt</a>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
    

    
    
    <div className="topbar">            
        
        <nav className="navbar-custom" id="navbar-custom">    
            <ul className="list-unstyled topbar-nav float-end mb-0">
                <li className="dropdown">
                    <a className="nav-link dropdown-toggle arrow-none nav-icon" data-bs-toggle="dropdown" href="#" role="button"
                    aria-haspopup="false" aria-expanded="false">
                    <img src="/images/flags/us_flag.jpg" alt="" className="thumb-xxs rounded-circle"/>
                </a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#"><img src="/images/flags/us_flag.jpg" alt="" height="15" className="me-2"/>English</a>
                        <a className="dropdown-item" href="#"><img src="/images/flags/spain_flag.jpg" alt="" height="15" className="me-2"/>Spanish</a>
                        <a className="dropdown-item" href="#"><img src="/images/flags/germany_flag.jpg" alt="" height="15" className="me-2"/>German</a>
                        <a className="dropdown-item" href="#"><img src="/images/flags/french_flag.jpg" alt="" height="15" className="me-2"/>French</a>
                    </div>
                </li>
            
                <li className="dropdown notification-list">
                    <a className="nav-link dropdown-toggle arrow-none nav-icon" data-bs-toggle="dropdown" href="#" role="button"
                        aria-haspopup="false" aria-expanded="false">
                        <i className="ti ti-mail"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-lg pt-0">
                
                        <h6 className="dropdown-item-text font-15 m-0 py-3 border-bottom d-flex justify-content-between align-items-center">
                            Emails <span className="badge bg-soft-primary badge-pill">3</span>
                        </h6> 
                        <div className="notification-menu" data-simplebar>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">2 min ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">
                                        <img src="/images/users/user-1.jpg" alt="" className="thumb-sm rounded-circle"/>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">Your order is placed</h6>
                                        <small className="text-muted mb-0">Dummy text of the printing and industry.</small>
                                    </div>
                                </div>
                            </a>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">10 min ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">
                                        <img src="/images/users/user-4.jpg" alt="" className="thumb-sm rounded-circle"/>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">Meeting with designers</h6>
                                        <small className="text-muted mb-0">It is a long established fact that a reader.</small>
                                    </div>
                                </div>
                            </a>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">40 min ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">
                                        <img src="/images/users/user-2.jpg" alt="" className="thumb-sm rounded-circle"/>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">UX 3 Task complete.</h6>
                                        <small className="text-muted mb-0">Dummy text of the printing.</small>
                                    </div>
                                </div>
                            </a>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">1 hr ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">
                                        <img src="/images/users/user-5.jpg" alt="" className="thumb-sm rounded-circle"/>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">Your order is placed</h6>
                                        <small className="text-muted mb-0">It is a long established fact that a reader.</small>
                                    </div>
                                </div>
                            </a>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">2 hrs ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">
                                        <img src="/images/users/user-3.jpg" alt="" className="thumb-sm rounded-circle"/>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">Payment Successfull</h6>
                                        <small className="text-muted mb-0">Dummy text of the printing.</small>
                                    </div>
                                </div>
                            </a>
                        </div>
                        
                        <a href="#" className="dropdown-item text-center text-primary">
                            View all <i className="fi-arrow-right"></i>
                        </a>
                    </div>
                </li>

                <li className="dropdown notification-list">
                    <a className="nav-link dropdown-toggle arrow-none nav-icon" data-bs-toggle="dropdown" href="#" role="button"
                        aria-haspopup="false" aria-expanded="false">
                        <i className="ti ti-bell"></i>
                        <span className="alert-badge"></span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-lg pt-0">
                
                        <h6 className="dropdown-item-text font-15 m-0 py-3 border-bottom d-flex justify-content-between align-items-center">
                            Notifications <span className="badge bg-soft-primary badge-pill">2</span>
                        </h6> 
                        <div className="notification-menu" data-simplebar>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">2 min ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">
                                        <i className="ti ti-chart-arcs"></i>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">Your order is placed</h6>
                                        <small className="text-muted mb-0">Dummy text of the printing and industry.</small>
                                    </div>
                                </div>
                            </a>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">10 min ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">
                                        <i className="ti ti-device-computer-camera"></i>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">Meeting with designers</h6>
                                        <small className="text-muted mb-0">It is a long established fact that a reader.</small>
                                    </div>
                                </div>
                            </a>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">40 min ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">                                                    
                                        <i className="ti ti-diamond"></i>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">UX 3 Task complete.</h6>
                                        <small className="text-muted mb-0">Dummy text of the printing.</small>
                                    </div>
                                </div>
                            </a>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">1 hr ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">
                                        <i className="ti ti-drone"></i>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">Your order is placed</h6>
                                        <small className="text-muted mb-0">It is a long established fact that a reader.</small>
                                    </div>
                                </div>
                            </a>
                            
                            <a href="#" className="dropdown-item py-3">
                                <small className="float-end text-muted ps-2">2 hrs ago</small>
                                <div className="media">
                                    <div className="avatar-md bg-soft-primary">
                                        <i className="ti ti-users"></i>
                                    </div>
                                    <div className="media-body align-self-center ms-2 text-truncate">
                                        <h6 className="my-0 fw-normal text-dark">Payment Successfull</h6>
                                        <small className="text-muted mb-0">Dummy text of the printing.</small>
                                    </div>
                                </div>
                            </a>
                        </div>
                        
                        <a href="#" className="dropdown-item text-center text-primary">
                            View all <i className="fi-arrow-right"></i>
                        </a>
                    </div>
                </li>

                <li className="dropdown">
                    <a className="nav-link dropdown-toggle nav-user" data-bs-toggle="dropdown" href="#" role="button"
                        aria-haspopup="false" aria-expanded="false">
                        <div className="d-flex align-items-center">
                            <img src="/images/users/user-4.jpg" alt="profile-user" className="rounded-circle me-2 thumb-sm" />
                            <div>
                                <small className="d-none d-md-block font-11">Admin</small>
                                <span className="d-none d-md-block fw-semibold font-12">Maria Gibson <i
                                        className="mdi mdi-chevron-down"></i></span>
                            </div>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#"><i className="ti ti-user font-16 me-1 align-text-bottom"></i> Profile</a>
                        <a className="dropdown-item" href="#"><i className="ti ti-settings font-16 me-1 align-text-bottom"></i> Settings</a>
                        <div className="dropdown-divider mb-0"></div>
                        <a className="dropdown-item" href="#"><i className="ti ti-power font-16 me-1 align-text-bottom"></i> Logout</a>
                    </div>
                </li>
                <li className="notification-list">
                    <a className="nav-link arrow-none nav-icon offcanvas-btn" href="#" data-bs-toggle="offcanvas" data-bs-target="#Appearance" role="button" aria-controls="Rightbar">
                        <i className="ti ti-settings ti-spin"></i>
                    </a>
                </li>   
            </ul>

            <ul className="list-unstyled topbar-nav mb-0">                        
                <li>
                    <button className="nav-link button-menu-mobile nav-icon" id="togglemenu">
                        <i className="ti ti-menu-2"></i>
                    </button>
                </li> 
                <li className="hide-phone app-search">
                    <form role="search" action="#" method="get">
                        <input type="search" name="search" className="form-control top-search mb-0" placeholder="Type text..."/>
                        <button type="submit"><i className="ti ti-search"></i></button>
                    </form>
                </li>                       
            </ul>
        </nav>
        
    </div>
    
    

    <div className="page-wrapper">

        
        <div className="page-content-tab">

            <div className="container-fluid">
                
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="float-end">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Metrica</a></li>
                                    <li className="breadcrumb-item"><a href="#">Forms</a></li>
                                    <li className="breadcrumb-item active">Form Elements</li>
                                </ol>
                            </div>
                            <h4 className="page-title">Form Elements</h4>
                        </div>
                        
                    </div>
                    
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Textual inputs</h4>
                                <p className="text-muted mb-0">Here are examples of <code className="highlighter-rouge">.form-control</code> xxxxxxxxxapplied to each
                                    textual HTML5 <code className="highlighter-rouge">&lt;input&gt;</code> <code className="highlighter-rouge">type</code>.
                                </p>
                            </div>
                            <div className="card-body">  
                                <div className="row">
                                    <div className="col-lg-6">
                                        
                                                                      
                                    </div>


                                    <div className="col-lg-6">                                       
                                        
                                                                                  
                                    </div>
                                </div>                                                                      
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Basic Form</h4>
                                <p className="text-muted mb-0">Basic example to demonstrate Bootstrap’s form styles.</p> 
                            </div>
                            <div className="card-body">
                                                                         
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Horizontal form</h4>
                                <p className="text-muted mb-0">Be sure to use <code className="highlighter-rouge">.col-form-label-sm</code> 
                                    or <code className="highlighter-rouge">.col-form-label-lg</code> to your <code className="highlighter-rouge">&lt;label&gt;</code>s 
                                    or <code className="highlighter-rouge">&lt;legend&gt;</code>s 
                                    to correctly follow the size of <code className="highlighter-rouge">.form-control-lg</code> and 
                                    <code className="highlighter-rouge">.form-control-sm</code>.
                                </p>
                            </div>
                            <div className="card-body">                                    
                                <div className="general-label">
                                             
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Custom styles</h4>
                                <p className="text-muted mb-0">Custom stylr example.</p>
                            </div>
                            <div className="card-body">
                                <form className="">
                                    <div className="row">
                                        
                                    </div>
                                    <div className="row">
                                        
                                    </div>
                                    <div className="row">
                                        
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Inline Form</h4>
                                <p className="text-muted mb-0">Use the <code>.col-auto</code> class to create horizontal layouts.</p>
                            </div>
                            <div className="card-body">
                                <div className="general-label">
                                    
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Input Size</h4>
                                <p className="text-muted mb-0">Set heights using classes like 
                                    <code className="highlighter-rouge">.form-control-lg</code> and 
                                    <code className="highlighter-rouge">.form-control-sm</code>.
                                </p>
                            </div>
                            <div className="card-body">
                                
                            </div>
                        </div>
                        
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">File browser</h4>
                                <p className="text-muted mb-0">The file input is the most gnarly of the bunch and requires additional 
                                    JavaScript if you’d like to hook them up with functional Choose file… and selected file name text. 
                                </p>
                            </div>
                            <div className="card-body">
                                
                            </div>
                        </div>
                    </div> 

                    


                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Form controls</h4>
                                <p className="text-muted mb-0">Basic example to demonstrate Bootstrap’s form styles.</p> 
                            </div>
                            <div className="card-body">
                                                                          
                            </div>
                        </div> 

                        

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Range</h4>
                                <p className="text-muted mb-0">CUse our custom range inputs for consistent cross-browser styling and built-in customization.
                                </p>
                            </div>
                            <div className="card-body">
                                
                            </div>
                        </div> 

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Switches</h4>
                                <p className="text-muted mb-0">
                                    A switch has the markup of a custom checkbox but uses the <code className="highlighter-rouge">.custom-switch</code> class to render 
                                    a toggle switch. Switches also support the <code className="highlighter-rouge">disabled</code> attribute.
                                </p> 
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-4">
                                        
                                    </div>
                                    <div className="col-lg-4">

                                        

                                    </div>

                                    <div className="col-lg-4">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>                                
                    </div> 
                </div> 

               

                <div className="row">
                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Checkboxs</h4>
                                <p className="text-muted mb-0">For even more customization and cross browser consistency, use our completely custom form elements to replace the browser defaults.
                                    They’re built on top of semantic and accessible markup, so they’re solid replacements for any default form control.
                                </p>
                            </div>
                            <div className="card-body">
                                <div className="general-label">
                                    
                                </div>
                            </div>
                        </div>                                 
                    </div> 

                    <div className="col-xl-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Radios</h4>
                                <p className="text-muted mb-0">For even more customization and cross browser consistency, use our completely custom form elements to replace the browser defaults. 
                                    They’re built on top of semantic and accessible markup, so they’re solid replacements for any default form control.
                                </p>
                            </div>
                            <div className="card-body">
                                <div className="general-label">
                                    
                                </div>
                            </div>
                        </div>                                 
                    </div> 
                </div> 

                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Input groups Static</h4>
                                <p className="text-muted mb-0">Easily extend form controls by adding text, buttons, 
                                    or button groups on either side of textual inputs, custom selects, and custom file inputs.
                                </p>
                            </div>
                            <div className="card-body">
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Input groups Buttons</h4>
                                <p className="text-muted mb-0">Easily extend form controls by adding text, buttons, 
                                    or button groups on either side of textual inputs, custom selects, and custom file inputs.
                                </p>
                            </div>
                            <div className="card-body">
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            
            
           
           
           <footer className="footer text-center text-sm-start">
               &copy; <script>
                   document.write(new Date().getFullYear())
               </script> Metrica <span className="text-muted d-none d-sm-inline-block float-end">Crafted with <i
                       className="mdi mdi-heart text-danger"></i> by Mannatthemes</span>
           </footer>
                           
           
        </div>
        
    </div>
      <BusquedaClienteComponent show={show} handleClose={handleClose} setCliente={setCliente} />
    </>
  )
}
export default ServicioNuevoComponent