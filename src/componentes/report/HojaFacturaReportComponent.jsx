import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";
import Logo from "../../assets/Logo.png"
import { useEffect, useState } from "react";
import { facturaForId } from "../../service/FacturaService";


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

const HojaFacturaReportComponent = ({ id }) => {

  const [factura, setFactura] = useState({})

  useEffect(() => {
    if (id) {
      facturaForId(id).then((response) => {
        setTimeout(() => {
          setFactura(response.data)
          console.log(response.data)
        }, 1000);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [])

  

  const cargarFactura = (data) => {
    setCodServicio(data.codServicio)


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
              <Text style={styles.parragraph}>Nombre/Razón Social: {factura.razonSocialCliente}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>RUC: {factura.rucCliente}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}></Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.parragraph}>Cliente: wwwwww</Text>
            </View>

          </View>

          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.parragraph}>Direccion: wwwww</Text>
            </View>

          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Ruc: wwwwww</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Solicitante: wwwwwww</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Montacarga: wwwwwww</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Operador: wwwwwwww</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>wwww</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>Hora Inicio Servicio</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.parragraph}>COSTO DEL SERVICIO:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>wwwwwww</Text>
            </View>
          </View>

        </View>
        <Text style={styles.parragraph}>
          Observaciones: eeeee
        </Text>
        <Text style={styles.parragraph}>
          Nota: Las horas de servicio se computaran desde que sale el montacarga de nuestro local hasta que reingrese al mismo, y asi se comunica que los fraccionarios de minutos de conputraran como 1 hora, ni la empresa ni el operador se hace responsable por daños causados por la maquina durante el servicio, si ellos se originan en casos fortuitos o en maniobras exigidas por el comitente.
        </Text>
      </Page>
    </Document>
  );
}

export default HojaFacturaReportComponent;