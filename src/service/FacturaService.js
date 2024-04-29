import axios from "axios";

const REST_API_BASE_URL_FACTURA = "http://localhost:8080/factura"
//const REST_API_BASE_URL_FACTURA = "http://143.198.244.41:8080/factura"

const REST_API_BASE_URL_CLIENTE = "http://localhost:8080/cliente"
//const REST_API_BASE_URL_CLIENTE = "http://143.198.244.41:8080/cliente"

const REST_API_BASE_URL_CLIENTE2 = "http://localhost:8080/clientes"
//const REST_API_BASE_URL_CLIENTE = "http://143.198.244.41:8080/clientes"

export const listaFacturas = () => axios.get(REST_API_BASE_URL_FACTURA+"/all");

export const nuevaFactura = (factura) => axios.post(REST_API_BASE_URL_FACTURA, factura);

export const editaFactura = (factura) => axios.put(REST_API_BASE_URL_FACTURA, factura);

export const facturaForId = (facturaId) => axios.get(REST_API_BASE_URL_FACTURA+"/"+facturaId);

export const clienteForRuc = (clienteRuc) => axios.get(REST_API_BASE_URL_CLIENTE+"/"+clienteRuc);

export const clienteForDescripcion = (clienteDescripcion) => axios.get(REST_API_BASE_URL_CLIENTE2+"/"+clienteDescripcion);

export const nuevoCliente = (cliente) => axios.post(REST_API_BASE_URL_CLIENTE, cliente);

export const editaCliete = (cliente) => axios.put(REST_API_BASE_URL_CLIENTE, cliente);