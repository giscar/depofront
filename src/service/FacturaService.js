import axios from "axios";

//const url = "http://165.227.252.245:8080/";
const url = "http://localhost:8080/";

const REST_API_BASE_URL_FACTURA = `${url}factura`

const REST_API_BASE_URL_CLIENTE = `${url}cliente`

const REST_API_BASE_URL_MONTACARGA = `${url}montacarga`

const REST_API_BASE_URL_OPERADOR = `${url}operador`

const REST_API_BASE_URL_SERVICIO = `${url}servicio`

const REST_API_BASE_URL_USUARIO = `${url}usuario`

const REST_API_BASE_URL_PERFIL = `${url}perfil`

const REST_API_BASE_URL_ROL = `${url}rol`

export const listaFacturas = () => axios.get(REST_API_BASE_URL_FACTURA+"/all");

export const nuevaFactura = (factura) => axios.post(REST_API_BASE_URL_FACTURA, factura);

export const editaFactura = (factura) => axios.put(REST_API_BASE_URL_FACTURA, factura);

export const facturaForId = (facturaId) => axios.get(REST_API_BASE_URL_FACTURA+"/"+facturaId);

export const buscarCodigoFactura = () => axios.get(REST_API_BASE_URL_FACTURA+"/maxCodFactura"); 

export const clienteForRuc = (clienteRuc) => axios.get(REST_API_BASE_URL_CLIENTE+"/"+clienteRuc);

export const clienteForDescripcion = (clienteDescripcion) => axios.get(REST_API_BASE_URL_CLIENTE+"/descrip?descripcion="+clienteDescripcion);

export const clienteForRucOrName = (ruc, razonSocial) => axios.get(REST_API_BASE_URL_CLIENTE+"/busqueda?ruc="+ruc+"&razonSocial="+razonSocial);

export const nuevoCliente = (cliente) => axios.post(REST_API_BASE_URL_CLIENTE, cliente);

export const editaCliente = (cliente) => axios.put(REST_API_BASE_URL_CLIENTE, cliente);

export const clienteForId = (clienteId) => axios.get(REST_API_BASE_URL_CLIENTE+"?id="+clienteId);

export const montacargaSave = (montacarga) => axios.post(REST_API_BASE_URL_MONTACARGA, montacarga);

export const montacargaEdit = (montacarga) => axios.put(REST_API_BASE_URL_MONTACARGA, montacarga);

export const montacargaInactiva = (montacarga) => axios.put(REST_API_BASE_URL_MONTACARGA+"/inactiva", montacarga);

export const montacargaForId = (montacargaId) => axios.get(REST_API_BASE_URL_MONTACARGA+"?id="+montacargaId);

export const montacargaForAll = () => axios.get(REST_API_BASE_URL_MONTACARGA+"/all");

export const montacargasActivo = () => axios.get(REST_API_BASE_URL_MONTACARGA+"/estado");

export const operadorSave = (operador) => axios.post(REST_API_BASE_URL_OPERADOR, operador);

export const operadorEdit = (operador) => axios.put(REST_API_BASE_URL_OPERADOR, operador);

export const operadorForId = (id) => axios.get(REST_API_BASE_URL_OPERADOR+"?id="+id);

export const operadorForDocumento = (documento) => axios.get(REST_API_BASE_URL_OPERADOR+"/documento?documento="+documento);

export const operadorForAll = () => axios.get(REST_API_BASE_URL_OPERADOR+"/all");

export const operadorActivo = () => axios.get(REST_API_BASE_URL_OPERADOR+"/estado");

export const operadorInactiva = (operador) => axios.put(REST_API_BASE_URL_OPERADOR+"/inactiva", operador);

export const servicioSave = (servicio) => axios.post(REST_API_BASE_URL_SERVICIO, servicio);

export const servicioEdit = (servicio) => axios.put(REST_API_BASE_URL_SERVICIO, servicio);

export const servicioForId = (id) => axios.get(REST_API_BASE_URL_SERVICIO+"?id="+id);

export const servicioForAll = () => axios.get(REST_API_BASE_URL_SERVICIO+"/all");

export const servicioActivo = (estado) => axios.get(REST_API_BASE_URL_SERVICIO+"/estado?estado="+estado);

export const buscarServicioByDatos = (ruc, codServicio) => axios.get(REST_API_BASE_URL_SERVICIO+"/busqueda?codServicio="+codServicio+"&ruc="+ruc);

export const buscarServicioByDatosAggregate = (ruc, codServicio) => axios.get(REST_API_BASE_URL_SERVICIO+"/busquedaAggregate?codServicio="+codServicio+"&ruc="+ruc);

export const buscarServicioByDatosEstadoConcluido = (ruc, codServicio) => axios.get(REST_API_BASE_URL_SERVICIO+"/busquedaAggregateEstadoConcluido?codServicio="+codServicio+"&ruc="+ruc);

export const busquedaEstadisticaAgregate = (ruc, codServicio, idOperador, idMontacarga, estadoRegistro, tipoServicio) => axios.get(REST_API_BASE_URL_SERVICIO+"/busquedaEstadistica?codServicio="+codServicio+"&ruc="+ruc+"&idOperador="+idOperador+"&idMontacarga="+idMontacarga+"&estadoRegistro="+estadoRegistro+"&tipoServicio="+tipoServicio);

export const buscarServicioByIdOperador = (idOperador) => axios.get(REST_API_BASE_URL_SERVICIO+"/busquedaIdOperadorAggregate?idOperador="+idOperador);

export const buscarServiciosPendientes = () => axios.get(REST_API_BASE_URL_SERVICIO+"/busquedaServiciosPendientes");

export const buscarServiciosConcluidos = () => axios.get(REST_API_BASE_URL_SERVICIO+"/busquedaServiciosConcluidos");

export const buscarServiciosConcluidosForFacturar = (idServicios) => axios.get(REST_API_BASE_URL_SERVICIO+"/busquedaServiciosParaFacturar?idServicios="+idServicios);

export const buscarCodigoServicio = () => axios.get(REST_API_BASE_URL_SERVICIO+"/maxCodServicio"); 

export const uploadFile = (file, id, type, size) => axios.post(REST_API_BASE_URL_SERVICIO+"/upload", file, id, type, size);

export const inactiveFile = (id) => axios.get(REST_API_BASE_URL_SERVICIO+"/uploadInactive?id="+id);

export const deleteFile = (id) => axios.delete(REST_API_BASE_URL_SERVICIO+"/imagen/eliminar?id="+id);

export const usuarioSave = (usuario) => axios.post(REST_API_BASE_URL_USUARIO, usuario);

export const usuarioEdit = (usuario) => axios.put(REST_API_BASE_URL_USUARIO, usuario);

export const usuarioForId = (id) => axios.get(REST_API_BASE_URL_USUARIO+"?id="+id);

export const usuarioForDocumento = (documento) => axios.get(REST_API_BASE_URL_USUARIO+"/documento?documento="+documento);

export const usuarioForAll = () => axios.get(REST_API_BASE_URL_USUARIO+"/all");

export const usuarioActivo = () => axios.get(REST_API_BASE_URL_USUARIO+"/estado");

export const usuarioInactiva = (usuario) => axios.put(REST_API_BASE_URL_USUARIO+"/inactiva", usuario);

export const perfilSave = (perfil) => axios.post(REST_API_BASE_URL_PERFIL, perfil);

export const perfilEdit = (perfil) => axios.put(REST_API_BASE_URL_PERFIL, perfil);

export const perfilForId = (id) => axios.get(REST_API_BASE_URL_PERFIL+"?id="+id);

export const perfilForDocumento = (codigo) => axios.get(REST_API_BASE_URL_PERFIL+"/codigo?codigo="+codigo);

export const perfilForAll = () => axios.get(REST_API_BASE_URL_PERFIL+"/all");

export const perfilActivo = () => axios.get(REST_API_BASE_URL_PERFIL+"/estado");

export const perfilInactiva = (perfil) => axios.put(REST_API_BASE_URL_PERFIL+"/inactiva", perfil);

export const rolSave = (rol) => axios.post(REST_API_BASE_URL_ROL, rol);

export const rolEdit = (rol) => axios.put(REST_API_BASE_URL_ROL, rol);

export const rolForId = (id) => axios.get(REST_API_BASE_URL_ROL+"?id="+id);

export const rolForDocumento = (codigo) => axios.get(REST_API_BASE_URL_ROL+"/codigo?codigo="+codigo);

export const rolForAll = () => axios.get(REST_API_BASE_URL_ROL+"/all");

export const rolActivo = () => axios.get(REST_API_BASE_URL_ROL+"/estado");

export const rolInactiva = (rol) => axios.put(REST_API_BASE_URL_ROL+"/inactiva", rol);
