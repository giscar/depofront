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
  subtitle1: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "5px"
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
  rowTable: {
    flexDirection: 'row',
  },
  rowBold: {
    flexDirection: 'row',
    border: '5px solid black',
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
  cellTable1: {
    width: '12%',
    textAlign: 'left',
    color: '#222'
  },
  cellTable: {
    fontSize: 11,
    textAlign: "justify",
    lineHeight: 1.1,
    margin: 0,
    border: '1px solid #ccc',
  },
  cellBold: {
    width: '50%',
    textAlign: 'left',
    color: '#222',
    border: '1px solid #ccc',
    fontSize: 11,
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

  let index = 0;

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

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Image src={Logo} style={styles.logo} />
            </View>
            <View style={styles.cellBold}>
              <Text style={styles.subtitle1}>R.U.C. {factura.ruc}</Text>
              <Text style={styles.subtitle1}>FACTURA ELECTRONICA</Text>
              <Text style={styles.subtitle1}>{factura.nroDocumento}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.subtitle}>Jr. Victor A. Belaúnde 901 - CALLAO (Cdra. 57 Av. Argentina) Telf.: 451-7949</Text>
              <Text style={styles.subtitle}>Entel: 987319510 / 981441566 / 981454935</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.parragraph}>Nombre/Razón Social: {factura.razonSocialCliente}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.parragraph}>Direccion: {factura.direccionCliente}</Text>
            </View>
          </View>

          <View style={styles.row}>
          <View style={styles.cell}>
              <Text style={styles.parragraph}>RUC: {factura.rucCliente}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Feha de emision: {factura.fechaEmision}</Text>
            </View>
          </View>

          <View style={styles.row}>
          <View style={styles.cell}>
              <Text style={styles.parragraph}>Moneda: {factura.moneda}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Forma de pago: {factura.tipoPago}</Text>
            </View>
          </View>

          <View style={styles.rowTable}>
          <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>Item</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>Codigo</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>Descripcion</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>Und</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>Cantidad</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>Valor unitario</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>Descuento (Afecto a IGV)</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>Valor venta</Text>
            </View>
          </View>

          {
           
                            factura.servicios?.map((servicio, item) =>
                              
                              <View style={styles.rowTable}>
          <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>{item + 1}</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>{servicio.numeroServicio}</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>Montacarga 20tn</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>ZZ</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>500</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>8.00</Text>
            </View>
            <View style={styles.cellTable1}>
              <Text style={styles.cellTable}>9.44</Text>
            </View>
          </View>
                            
                              
                            )
                          }

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