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
import { notaRecepciondByIdIngreso } from "../../service/FacturaService";

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
  cell80: {
    width: '80%',
    textAlign: 'left',
    color: '#222'
  },
  cell20: {
    width: '20%',
    textAlign: 'left',
    color: '#222'
  },
  cell20th: {
    width: '20%',
    textAlign: 'left',
    color: '#222',
    backgroundColor: '#b4b0b0'
  },
  cell60th: {
    width: '60%',
    textAlign: 'left',
    color: '#222',
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

});

const NotaRecepcionReportComponent = ({ id }) => {

  const [nota, setNota] = useState({})


  useEffect(() => {
    if (id) {
      notaRecepciondByIdIngreso(id).then(p =>{
        debugger
        let cantidadMercaderia = 0;
        let unidadDescripcion = "";
        p.data.mercaderias.map(mer =>{
          cantidadMercaderia = cantidadMercaderia + mer.cantidad
          unidadDescripcion = mer.unidadMedida.descripcion
        })
        p.data.cantidadMercaderia = cantidadMercaderia
        p.data.unidadDescripcion = unidadDescripcion 
        console.log(p)
        setNota(p.data)
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
              <Text style={styles.subtitle}>{formatearFecha(nota.fechaRecepcion)}</Text>
            </View>
            <View style={styles.cell35}>
              <Text style={styles.subtitle}>NOTA DE RECEPCION</Text>
            </View>
            <View style={styles.cell30}>
              <Text style={styles.subtitle}>{nota.numeroRecepcion?.toString().padStart(6, '0')}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell20}>
              <Text style={styles.texto}>Recibido de: </Text>
            </View>
            <View style={styles.cell80}>
              <Text style={styles.textoUpper}>{nota.agencia?.razonSocial}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell20}>
              <Text style={styles.texto}>Chofer: </Text>
            </View>
            <View style={styles.cell30}>
              <Text style={styles.texto}>{nota?.chofer}</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.texto}>Placa: </Text>
            </View>
            <View style={styles.cell30}>
              <Text style={styles.texto}>{nota?.placaVehiculo}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell40}>
              <Text style={styles.texto}>Guia de remision o factura: </Text>
            </View>
            <View style={styles.cell60}>
              <Text style={styles.texto}>{nota?.guiaRemision}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell20}>
              <Text style={styles.texto}>Posterior facturado: </Text>
            </View>
            <View style={styles.cell80}>
              <Text style={styles.textoUpper}>{nota.empresa?.razonSocial}</Text>
            </View>
          </View>
          <View style={styles.row}>
            
          </View>
          <View style={styles.row}>
            <View style={styles.cell20th}>
              <Text style={styles.subtitle}>Cantidad</Text>
            </View>
            <View style={styles.cell20th}>
              <Text style={styles.subtitle}>Unidad</Text>
            </View>
            <View style={styles.cell60th}>
              <Text style={styles.subtitle}>Descripcion</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell20}>
              <Text style={styles.subtitle}>{nota?.cantidadMercaderia}</Text>
            </View>
            <View style={styles.cell20}>
              <Text style={styles.subtitle}>{nota?.unidadDescripcion}</Text>
            </View>
            <View style={styles.cell60}>
              <Text style={styles.subtitle}>{nota?.descripcion}</Text>
            </View>
          </View>
          <View style={styles.row}>

          </View>
          <View style={styles.row}>
            <View style={styles.cell40}>
              <Text style={styles.texto}>Observaciones: </Text>
            </View>
            <View style={styles.cell60}>
              <Text style={styles.texto}>{nota?.observaciones}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default NotaRecepcionReportComponent;