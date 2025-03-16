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
import { facturaForId, ingresoById } from "../../service/FacturaService";
import { ToWords } from 'to-words';

const toWords = new ToWords({
  localeCode: 'es-ES',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {

      symbol: 'S/.',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    },
  },
});


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
  parragraphrigth: {
    fontSize: 11,
    textAlign: "right",
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
  cell60: {
    width: '60%',
    textAlign: 'left',
    color: '#222'
  },
  cell20: {
    width: '20%',
    textAlign: 'left',
    color: '#222'
  },
  cellTable1: {
    width: '12%',
    textAlign: 'left',
    color: '#222'
  },
  cellTableItem: {
    width: '5%',
    textAlign: 'center',
    color: '#222'
  },
  cellTableCodigo: {
    width: '15%',
    textAlign: 'left',
    color: '#222'
  },
  cellTableDescripcion: {
    width: '20%',
    textAlign: 'left',
    color: '#222'
  },
  cellTable: {
    fontSize: 10,
    textAlign: "justify",
    height: '30px',
    lineHeight: 1.1,
    margin: 0,
    border: '1px solid #ccc',
    padding: '2px'
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

const NotaRecepcionComponent = ({ id }) => {

  const [factura, setFactura] = useState({})
  const [enteroString, setEnteroString] = useState('')
  const [decimalString, setDecimalString] = useState('')
  const [monedaString, setMonedaString] = useState('')
  const [simboloMoneda, setSimboloMoneda] = useState('')
  const [monto, setMonto] = useState('')

  useEffect(() => {
    if (id) {
      ingresoById(id).then((response) => {
        setTimeout(() => {
          setFactura(response.data)
          console.log(response.data)
          let arr = parseFloat(response.data.monto * 1.18).toFixed(2).toString().split(".");
          setMonto(response.data.monto)
          setEnteroString(toWords.convert(arr[0]))
          setDecimalString(arr[1] + "/100")
          setMonedaString(response.data.moneda == "PEN" ? "Soles" : "Dolares")
          setSimboloMoneda(response.data.moneda == "PEN" ? "S/." : "$")
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
              <Text style={styles.parragraph}>Moneda: {monedaString}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.parragraph}>Forma de pago: {factura.tipoPago}</Text>
            </View>
          </View>

          <View style={styles.rowTable}>
            <View style={styles.cellTableItem}>
              <Text style={styles.cellTable}>Item</Text>
            </View>
            <View style={styles.cellTableCodigo}>
              <Text style={styles.cellTable}>Codigo</Text>
            </View>
            <View style={styles.cellTableDescripcion}>
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

              <View style={styles.rowTable} key={item}>
                <View style={styles.cellTableItem}>
                  <Text style={styles.cellTable}>{item + 1}</Text>
                </View>
                <View style={styles.cellTableCodigo}>
                  <Text style={styles.cellTable}>{servicio.numeroServicio}</Text>
                </View>
                <View style={styles.cellTableDescripcion}>
                  <Text style={styles.cellTable}>Servicio de alquiler de montacarga {servicio.montacarga[0].codigo}</Text>
                </View>
                <View style={styles.cellTable1}>
                  <Text style={styles.cellTable}>ZZ</Text>
                </View>
                <View style={styles.cellTable1}>
                  <Text style={styles.cellTable}>1.00</Text>
                </View>
                <View style={styles.cellTable1}>
                  <Text style={styles.cellTable}>{parseFloat(servicio.montoServicio).toFixed(2)}</Text>
                </View>
                <View style={styles.cellTable1}>
                  <Text style={styles.cellTable}>0.00</Text>
                </View>
                <View style={styles.cellTable1}>
                  <Text style={styles.cellTable}>{parseFloat(servicio.montoServicio*1.18).toFixed(2)}</Text>
                </View>
              </View>


            )
          }

          <View style={styles.row}>
            <View style={styles.cell60}>
              <Text style={styles.parragraph}>SON: {enteroString + " " + decimalString + " " + monedaString}</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraph}>Op. Gravada:</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraphrigth}>{simboloMoneda+" "+parseFloat(monto).toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell60}>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraph}>I.G.V:</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraphrigth}>{simboloMoneda+" "+parseFloat(monto*0.18).toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell60}>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraph}>Op. Inafecta:</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraphrigth}>{simboloMoneda+" "+0.00}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell60}>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraph}>Op. Exonerada:</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraphrigth}>{simboloMoneda+" "+0.00}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell60}>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraph}>Op. Exportacion:</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraphrigth}>{simboloMoneda+" "+0.00}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell60}>
              <Text style={styles.parragraph}></Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraph}>Importe total:</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.parragraphrigth}>{simboloMoneda+" "+parseFloat(monto*1.18).toFixed(2)}</Text>
            </View>
          </View>




          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.parragraph}></Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.parragraph}>Observaciones de SUNAT: El comprobante numero {factura.nroDocumento}, ha sido aceptada</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default NotaRecepcionComponent;