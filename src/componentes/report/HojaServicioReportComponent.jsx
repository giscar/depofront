import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";
import Logo from "../../assets/Logo.png"
import { useState } from "react";
import { servicioForId } from "../../service/FacturaService";


const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  logo: {
    width: '140px',
    height: '60px',
    objectFit: 'cover',
  },
  firma: {
    width: '120px',
    height: '40px',
    objectFit: 'cover',
    paddingBottom: '20px'
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    padding: 10,
  },
  parragraph: {
    fontSize: 11,
    textAlign: "justify",
    lineHeight: 1.1,
    margin: 0,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  table: {
    width: '100%',
    padding: '5px',
    fontSize: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
    marginTop: '5px',
    padding: '8px',
  },
  row2: {
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
    marginTop: '15px',
    padding: '8px',
  },
  row1: {
    width: '50%',
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
    marginTop: '5px',
    padding: '10px',
  },
  header: {
    width: '50%',
    textAlign: 'center',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'royalblue'
  },
  cell: {
    width: '50%',
    textAlign: 'left',
    color: '#222'
  },

  cell1: {
    width: '100%',
    textAlign: 'left',
    color: '#222'
  },

  cell2: {
    width: '25%',
    textAlign: 'left',
    color: '#222'
  },

  textFirma: {
    paddingTop: 25,
  },

});

const HojaServicioReportComponent = ({ id }) => {

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
  const [moneda, setMoneda] = useState('')
  const [estadoRegistro, setEstadoRegistro] = useState('')
  const [montacargaModelo, setMontacargaModelo] = useState('')
  const [operadorNombreCompleto, setOperadorNombreCompleto] = useState('')
  const [tipoServicio, setTipoServicio] = useState('')
  const [solicitante, setSolicitante] = useState('')
  const [url, setUrl] = useState('')
  const [fechaRegistro, setFechaRegistro] = useState('')
  const [fechaConclusion, setFechaConclusion] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [tipoPago, setTipoPago] = useState('')

  if (id) {
    servicioForId(id).then((response) => {
      setTimeout(() => {
        cargarServicio(response.data)
      }, 1000);
    }).catch(error => {
      console.log(error);
    })
  }

  const cargarServicio = (data) => {
    let horaSalidaLocal1 = new Date(data.horaSalidaLocal);
    let horaInicioServicio1 = new Date(data.horaInicioServicio);
    let horaFinServicio1 = new Date(data.horaFinServicio);
    let horaRetornoLocal1 = new Date(data.horaRetornoLocal);
    let fechaConclusion1 = new Date(data.fechaConclusion);
    console.log(horaSalidaLocal1.toLocaleString())
    setCodServicio(data.codServicio)
    setRuc(data.ruc)
    setRazonSocial(data.cliente ? data.cliente[0]?.razonSocial : "")
    setDireccion(data.cliente ? data.cliente[0]?.direccion : "")
    setMontacargaModelo(data.montacarga[0]?.modelo+' - '+data.montacarga[0]?.codigo)
    setOperadorNombreCompleto(data.operador[0].nombre + " " + data.operador[0].apellidoPat + " " + data.operador[0].apellidoMat)
    setHoraSalidaLocal(horaSalidaLocal1.toLocaleString())
    setHoraInicioServicio(horaInicioServicio1.toLocaleString())
    setHoraFinServicio(horaFinServicio1.toLocaleString())
    setHoraRetornoLocal(horaRetornoLocal1.toLocaleString())
    setOperadorId(data.operadorId)
    setMontacargaId(data.montacargaId)
    setTotalHoras(data.totalHoras)
    setMontoServicio(data.montoServicio)
    setMoneda(data.moneda)
    setEstadoRegistro(data.estadoRegistro ? data.estadoRegistro : "En proceso")
    setTipoServicio(data.tipoServicio)
    setSolicitante(data.solicitante)
    setUrl(data.url)
    setFechaRegistro(data.fechaRegistro)
    setFechaConclusion(fechaConclusion1.toLocaleDateString())
    setObservaciones(data.observaciones)
    setTipoPago(data.tipoPago)
  }

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Image src={Logo} style={styles.logo} />
            </View>
            <View style={styles.cell}>
              <Text style={styles.title}>EQUIPOS DE TRANSPORTE Y SERVICIOS MECANICOS</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.subtitle}>Jr. Victor A. Belaúnde 901 - CALLAO (Cdra. 57 Av. Argentina) Telf.: 451-7949</Text>
              <Text style={styles.subtitle}>Entel: 987319510 / 981441566 / 981454935</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Hoja de Servicio de Montacarga</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Nº {codServicio}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Fecha de registro:</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>{fechaConclusion}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.parragraph}>Cliente: {razonSocial}</Text>
            </View>

          </View>

          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.parragraph}>Direccion: {direccion}</Text>
            </View>

          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Ruc: {ruc}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Solicitante: {solicitante}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Montacarga: {montacargaModelo}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Operador: {operadorNombreCompleto}</Text>
            </View>
          </View>

          <View style={styles.row}>

            <View style={styles.cell2}>
              <Text style={styles.parragraph}>{horaSalidaLocal.replace("T", " ")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Hora Salida Local</Text>
            </View>

            <View style={styles.cell2}>
              <Text></Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>{horaInicioServicio.replace("T", " ")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Hora Inicio Servicio</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>COSTO DEL SERVICIO:</Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>{horaFinServicio.replace("T", " ")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Hora Termino Servicio</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Costo ({moneda}):</Text>
            </View>
            <View style={styles.cell2}>
              <Text>{montoServicio}</Text>
            </View>
          </View>


          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>{horaRetornoLocal.replace("T", " ")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Hora Regreso Local</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>{totalHoras}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Total Horas trabajadas</Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>DUA Nro:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>-----</Text>
            </View>

            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Carta comercial Nro:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>------</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Pedido de deposito Nro:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>-----</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>G/R Depovent Nro:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>------</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>GR Cliente Nro:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>-----</Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>
          </View>


          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Tipo de servicio:</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>{tipoServicio}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Tipo de pago:</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>{tipoPago}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.textFirma}></Text>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.textFirma}></Text>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.textFirma}></Text>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell2}>
              {url &&
                <Image src={url} style={styles.firma} />
              }
              <Text style={styles.parragraph}>Firma Solicitante-Cliente</Text>
            </View>
          </View>
        </View>
        <Text style={styles.parragraph}>
          Observaciones: {observaciones}
        </Text>
        <Text style={styles.parragraph}>
          Nota: Las horas de servicio se computaran desde que sale el montacarga de nuestro local hasta que reingrese al mismo, y asi se comunica que los fraccionarios de minutos de conputraran como 1 hora, ni la empresa ni el operador se hace responsable por daños causados por la maquina durante el servicio, si ellos se originan en casos fortuitos o en maniobras exigidas por el comitente.
        </Text>
      </Page>
    </Document>
  );
}

export default HojaServicioReportComponent;