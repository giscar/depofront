import axios from "axios";

const REST_API_BASE_URL_FACTURA = "http://localhost:8080/factura"
//const REST_API_BASE_URL_FACTURA = "http://143.198.244.41:8080/factura"

const REST_API_BASE_URL_CLIENTE = "http://localhost:8080/cliente"
//const REST_API_BASE_URL_CLIENTE = "http://143.198.244.41:8080/cliente"

const REST_API_BASE_URL_MONTACARGA = "http://localhost:8080/montacarga"
//const REST_API_BASE_URL_MONTACARGA = "http://143.198.244.41:8080/montacarga"

const REST_API_BASE_URL_OPERADOR = "http://localhost:8080/operador"
//const REST_API_BASE_URL_OPERADOR = "http://143.198.244.41:8080/operador"

const REST_API_BASE_URL_SERVICIO = "http://localhost:8080/servicio"
//const REST_API_BASE_URL_SERVICIO = "http://143.198.244.41:8080/servicio"

export const listaFacturas = () => axios.get(REST_API_BASE_URL_FACTURA+"/all");

export const nuevaFactura = (factura) => axios.post(REST_API_BASE_URL_FACTURA, factura);

export const editaFactura = (factura) => axios.put(REST_API_BASE_URL_FACTURA, factura);

export const facturaForId = (facturaId) => axios.get(REST_API_BASE_URL_FACTURA+"/"+facturaId);

export const clienteForRuc = (clienteRuc) => axios.get(REST_API_BASE_URL_CLIENTE+"/"+clienteRuc);

export const clienteForDescripcion = (clienteDescripcion) => axios.get(REST_API_BASE_URL_CLIENTE+"/descrip?descripcion="+clienteDescripcion);

export const clienteForRucOrName = (ruc, razonSocial) => axios.get(REST_API_BASE_URL_CLIENTE+"/busqueda?ruc="+ruc+"&razonSocial="+razonSocial);

export const nuevoCliente = (cliente) => axios.post(REST_API_BASE_URL_CLIENTE, cliente);

export const editaCliente = (cliente) => axios.put(REST_API_BASE_URL_CLIENTE, cliente);

export const clienteForId = (clienteId) => axios.get(REST_API_BASE_URL_CLIENTE+"?id="+clienteId);

export const montacargaSave = (montacarga) => axios.post(REST_API_BASE_URL_MONTACARGA, montacarga);

export const montacargaEdit = (montacarga) => axios.put(REST_API_BASE_URL_MONTACARGA, montacarga);

export const montacargaForId = (montacargaId) => axios.get(REST_API_BASE_URL_MONTACARGA+"?id="+montacargaId);

export const montacargaForAll = () => axios.get(REST_API_BASE_URL_MONTACARGA+"/all");

export const montacargasActivo = (estado) => axios.get(REST_API_BASE_URL_MONTACARGA+"/estado?estado="+estado);

export const operadorSave = (operador) => axios.post(REST_API_BASE_URL_OPERADOR, operador);

export const operadorEdit = (operador) => axios.put(REST_API_BASE_URL_OPERADOR, operador);

export const operadorForId = (id) => axios.get(REST_API_BASE_URL_OPERADOR+"?id="+id);

export const operadorForAll = () => axios.get(REST_API_BASE_URL_OPERADOR+"/all");

export const operadorActivo = (estado) => axios.get(REST_API_BASE_URL_OPERADOR+"/estado?estado="+estado);

export const servicioSave = (servicio) => axios.post(REST_API_BASE_URL_SERVICIO, servicio);

export const servicioEdit = (servicio) => axios.put(REST_API_BASE_URL_SERVICIO, servicio);

export const servicioForId = (id) => axios.get(REST_API_BASE_URL_SERVICIO+"?id="+id);

export const servicioForAll = () => axios.get(REST_API_BASE_URL_SERVICIO+"/all");

export const servicioActivo = (estado) => axios.get(REST_API_BASE_URL_SERVICIO+"/estado?estado="+estado);

export const buscarServicioByDatos = (ruc, codServicio) => axios.get(REST_API_BASE_URL_SERVICIO+"/busqueda?codServicio="+codServicio+"&ruc="+ruc);

export const buscarServicioByDatosAggregate = (ruc, codServicio) => axios.get(REST_API_BASE_URL_SERVICIO+"/busquedaAggregate?codServicio="+codServicio+"&ruc="+ruc);

export const uploadFile = (file) => axios.post(REST_API_BASE_URL_SERVICIO+"/upload-files2", file);
