import axios from "axios";

const REST_API_BASE_URL_FACTURA = "http://localhost:8080/factura"

const REST_API_BASE_URL_CLIENTE = "http://localhost:8080/cliente"

export const listaFacturas = () => axios.get(REST_API_BASE_URL_FACTURA+"/all");

export const nuevaFactura = (factura) => axios.post(REST_API_BASE_URL_FACTURA, factura);

export const editaFactura = (factura) => axios.put(REST_API_BASE_URL_FACTURA, factura);

export const facturaForId = (facturaId) => axios.get(REST_API_BASE_URL_FACTURA+"/"+facturaId);

export const clienteForRuc = (clienteRuc) => axios.get(REST_API_BASE_URL_CLIENTE+"/"+clienteRuc);