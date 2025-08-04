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
import { ToWords } from 'to-words';
import { ordenSalidaById } from "../../service/FacturaService";

const toWords = new ToWords({
  localeCode: 'es-ES',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    donotaSalidaddOnly: false,
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
    fontWeight: "bold",
  },
  texto: {
    fontSize: 12,
    textAlign: "justify",
    fontWeight: "bold",
  },
  textoUpper: {
    fontSize: 9,
    textAlign: "right",
    fontWeight: "bold",
  },
  textoUpperLeft: {
    fontSize: 10,
    textAlign: "left",
    fontWeight: "bold",
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
  cell50: {
    width: '50%',
    textAlign: 'left',
    color: '#222'
  },
  cell80: {
    width: '80%',
    textAlign: 'left',
    color: '#222'
  },
  cell10: {
    width: '10%',
    textAlign: 'left',
    color: '#222'
  },
  cell20: {
    width: '20%',
    textAlign: 'left',
    color: '#222'
  },
  cell100: {
    width: '100%',
    textAlign: 'left',
    color: '#222'
  },
  cell10th: {
    width: '10%',
    textAlign: 'left',
    color: '#222',
    height: '40px',
    paddingTop: 10,
    backgroundColor: '#b4b0b0'
  },
  cell20th: {
    width: '20%',
    textAlign: 'left',
    color: '#222',
    height: '40px',
    paddingTop: 10,
    backgroundColor: '#b4b0b0'
  },
  cell50th: {
    width: '50%',
    textAlign: 'left',
    color: '#222',
    height: '40px',
    paddingTop: 10,
    backgroundColor: '#b4b0b0'
  },
  cell30: {
    width: '30%',
    textAlign: 'left',
    color: '#222'
  },
  cell35: {
    width: '35%',
    textAlign: 'left',
    color: '#222'
  },
  cell40: {
    width: '40%',
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

})

const notaSalidaSalidaReportComponent = ({ id }) => {

  const [notaSalida, setnotaSalida] = useState({})
  const [ingreso, setIngreso] = useState({})

  useEffect(() => {
    if (id) {
      console.log(id)
      ordenSalidaById(id).then(p => {
        console.log(p)
        setnotaSalida(p.data)
        setIngreso(p.data.ingreso)
      })
    }
  }, [])

  const formatearFecha = (fec) => {
    if(fec){
      let dia = fec.substring(8, 10)
    let mes = fec.substring(5, 7)
    let anho = fec.substring(0, 4)
    return `${dia}/${mes}/${anho}`
    }
    
  }

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell30}>
              <Image src={Logo} style={styles.logo} />
            </View>
            <View style={styles.cell35}>
              <Text style={styles.subtitle}>DIVISION DE DEPOSITOS</Text>
              <Text style={styles.subtitle}>Departamento de almacenes</Text>
              <Text style={styles.subtitle}>almacenes@depovent.com.pe</Text>
            </View>
            <View style={styles.cell30}>
              <Text style={styles.subtitle}>ALMACENAJE SIMPLE</Text>
              <Text style={styles.subtitle}>SERIE - B</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text style={styles.subtitle}>Jr. Victor A. Belaúnde 901 - CALLAO (Cdra. 57 Av. Argentina) Telf.: 451-7949</Text>
              <Text style={styles.subtitle}>Entel: 987319510 / 981441566 / 981454935</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell30}>
              <Text style={styles.subtitle}>Fecha de emmisión: {formatearFecha(notaSalida.fechaEmision)}</Text>
            </View>
            <View style={styles.cell35}>
              <Text style={styles.subtitle}>ORDEN DE SALIDA - ALMACEN</Text>
              <Text style={styles.subtitle}>Nro. {notaSalida.numeroRecepcion?.toString().padStart(6, '0')}</Text>
            </View>
            <View style={styles.cell30}>
              <Text style={styles.subtitle}>Fecha de translado: {formatearFecha(notaSalida.fechaInicioTranslado)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell100}>
              <Text style={styles.textoUpperLeft}>REMITENTE: DEPOSITOS Y VENTAS S.A - 20100014476</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell100}>
              <Text style={styles.textoUpperLeft}>DESTINATARIO: {notaSalida.razonSocialDestinatario} - {notaSalida.rucDestinatario}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell100}>
              <Text style={styles.textoUpperLeft}>DIRECCION DE PUNTO DE PARTIDA: Jr. Victor A. Belaúnde 901 - CALLAO (Cdra. 57 Av. Argentina)</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell100}>
              <Text style={styles.textoUpperLeft}>DOMICILIO DE PUNTO DE PARTIDA: {notaSalida.domicilioPuntoPartida}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell50}>
              <Text style={styles.textoUpperLeft}>CHOFER: {notaSalida?.chofer}</Text>
            </View>
            <View style={styles.cell50}>
              <Text style={styles.textoUpperLeft}>PLACA: {notaSalida?.placaVehiculo}</Text>
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.cell10th}>
              <Text style={styles.textoUpperLeft}>CODIGO</Text>
            </View>
            <View style={styles.cell20th}>
              <Text style={styles.textoUpperLeft}>CANTIDAD</Text>
            </View>
            <View style={styles.cell20th}>
              <Text style={styles.textoUpperLeft}>UNIDAD</Text>
            </View>
            <View style={styles.cell50th}>
              <Text style={styles.textoUpperLeft}>DESCRIPCION</Text>
            </View>
          </View>
          {
                    notaSalida.salidas?.map(p =>
          <View style={styles.row}>
            <View style={styles.cell10}>
              <Text style={styles.textoUpperLeft}>{p?.cantidadSalida}</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.textoUpperLeft}>{p?.cantidadSalida}</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.textoUpperLeft}>{p?.unidadMedidaMercaderia}</Text>
            </View>
            <View style={styles.cell50}>
              <Text style={styles.textoUpperLeft}>{p?.descripcionSalida}</Text>
            </View>
          </View>
                    )
                  }
        </View>
      </Page>
    </Document>
  )
}

export default notaSalidaSalidaReportComponent;