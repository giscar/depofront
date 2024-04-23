import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/factura"

export const listaFacturas = () => axios.get(REST_API_BASE_URL+"/all");

export const nuevaFactura = (factura) => axios.post(REST_API_BASE_URL, factura);

export const editaFactura = (factura) => axios.put(REST_API_BASE_URL, factura);

export const facturaForId = (facturaId) => axios.get(REST_API_BASE_URL+"/"+facturaId);