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
import { servicioForId } from "../../service/FacturaService";


const styles = StyleSheet.create({
  page: {

    padding: 30,
  },
  logo: {
    width: '200px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '3px',
    margin: 'auto'
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    padding: 10,
  },
  parragraph: {
    fontSize: 12,
    textAlign: "justify",
    lineHeight: 1.5,
    margin: 10,
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
    padding: '10px',
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

});

const HojaServicioReportComponent = ({id}) => {

  const [servicio, setServicio] = useState([])

  const [cliente, setCliente] = useState('')
  const [operadores, setOperadores] = useState([])
  const [montacargas, setMontacargas] = useState([])
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
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')
  const [estadoRegistro, setEstadoRegistro] = useState('')
  const [montacargaModelo, setMontacargaModelo] = useState('')
  const [operadorNombreCompleto, setOperadorNombreCompleto] = useState('')

  useEffect(() => {
    if (id) {
      servicioForId(id).then((response) => {
        setServicio(response.data);
        setTimeout(() => {
          cargarServicio(response.data)
        }, 1000);

      }).catch(error => {
        console.log(error);
      })
    }
  }, [id])

  const cargarServicio = (data) => {
    setCodServicio(data.codServicio)
    setRuc(data.ruc)
    setRazonSocial(data.cliente ? data.cliente[0]?.razonSocial : "")
    setDireccion(data.cliente ? data.cliente[0]?.direccion : "")
    setMontacargaModelo(data.montacarga[0].modelo)
    setOperadorNombreCompleto(data.operador[0].nombre+" "+data.operador[0].apellidoPat+" "+data.operador[0].apellidoMat)
    setHoraSalidaLocal(data.horaSalidaLocal)
    setHoraInicioServicio(data.horaInicioServicio)
    setHoraFinServicio(data.horaFinServicio)
    setHoraRetornoLocal(data.horaRetornoLocal)
    setOperadorId(data.operadorId)
    setMontacargaId(data.montacargaId)
    setTotalHoras(data.totalHoras)
    setMontoServicio(data.montoServicio)
    setEstadoRegistro(data.estadoRegistro? data.estadoRegistro : "En proceso")
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
              <Text>EQUIPOS DE TRANSPORTE</Text>
              <Text>SERVICIOS MECANICOS</Text>
            </View>


          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Hoja de Servicio de Montacarga</Text>
            </View>
            <View style={styles.cell}>
              <Text>Nº {codServicio}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text></Text>
            </View>
            <View style={styles.cell}>
              <Text>Callao, 18 deel 03 del 2024 </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text>Cliente: {razonSocial}</Text>
            </View>

          </View>

          <View style={styles.row}>
            <View style={styles.cell1}>
              <Text>Direccion: {direccion}</Text>
            </View>

          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Ruc: {ruc}</Text>
            </View>
            <View style={styles.cell}>
              <Text>Solicitante: Miguel rosales</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Montacarga: {montacargaModelo}</Text>
            </View>
            <View style={styles.cell}>
              <Text>Operador: {operadorNombreCompleto}</Text>
            </View>
          </View>

          <View style={styles.row}>
            
          <View style={styles.cell2}>
              <Text>{horaSalidaLocal.replace("T", " ")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text>Hora Salida Local</Text>
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
              <Text>{horaInicioServicio.replace("T", " ")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text>Hora Inicio Servicio</Text>
            </View>
              
            <View style={styles.cell2}>
              <Text>COSTO DEL SERVICIO:</Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>  
              
                
            </View>


            <View style={styles.row}>
            
          <View style={styles.cell2}>
              <Text>{horaFinServicio.replace("T", " ")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text>Hora Termino Servicio</Text>
            </View>
              
            <View style={styles.cell2}>
              <Text>Costo por hora (Soles):</Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>  
              
                
            </View>


            <View style={styles.row}>
            
          <View style={styles.cell2}>
              <Text>{horaRetornoLocal.replace("T", " ")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text>Hora Regreso Local</Text>
            </View>
              
            <View style={styles.cell2}>
              <Text>Costo por hora (Dolares):</Text>
            </View>
            <View style={styles.cell2}>
              <Text></Text>
            </View>  
              
                
            </View>

            <View style={styles.row}>
            
          <View style={styles.cell2}>
              <Text>{totalHoras}</Text>
            </View>
            <View style={styles.cell2}>
              <Text>Total Horas trabajadas</Text>
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
              <Text>DUA Nro:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>-----</Text>
            </View>
              
            <View style={styles.cell2}>
              <Text>Carta comercial Nro:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>------</Text>
            </View>  
              
                
            </View>

            <View style={styles.row}>
            
          <View style={styles.cell2}>
              <Text>Pedido de deposito Nro:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>-----</Text>
            </View>
              
            <View style={styles.cell2}>
              <Text>G/R Depovent Nro:</Text>
            </View>
            <View style={styles.cell2}>
              <Text>------</Text>
            </View>  
              
                
            </View>

            <View style={styles.row}>
            
          <View style={styles.cell2}>
              <Text>GR Cliente Nro:</Text>
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
                <Text>Tipo de servicio:</Text>
              </View>
              <View style={styles.cell2}>
                <Text>Externo</Text>
              </View>
                
              <View style={styles.cell2}>
                <Text>Tipo de pago:</Text>
              </View>
              <View style={styles.cell2}>
                <Text>Facturado</Text>
              </View>  
                
                  
              </View>



        </View>

        <Text style={styles.parragraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, totam explicabo quam officiis illo optio eum distinctio nihil in quidem delectus ex expedita voluptatibus. Est nobis ex beatae doloribus illum, autem maiores pariatur ea sed soluta nesciunt debitis corporis. Soluta, quis dolor deleniti quibusdam iste eveniet aliquid minus dolorem, molestias natus quam quo labore repellendus! Saepe magni doloribus suscipit quas consectetur velit facere dolorem culpa? Eveniet nihil quo accusamus. Numquam vero quos nobis veniam sequi, nihil earum voluptatibus aliquam id tempora non suscipit beatae, quo distinctio totam repellendus recusandae optio ex? Qui maxime veritatis quaerat esse nam repellendus sed, tempora, illum aliquam dolorum praesentium soluta excepturi fuga, minus consequatur suscipit. Cumque odio sapiente molestiae non, fugit culpa dolore aspernatur ea placeat suscipit reprehenderit rerum quia, fugiat ex, sequi sunt autem totam eius delectus! Eos beatae incidunt, recusandae rem possimus repellat architecto ipsa obcaecati reprehenderit quia magni dignissimos quae? Excepturi, sed culpa quo autem ipsum nobis hic recusandae modi facere optio provident odit corporis tempora voluptatum facilis earum qui laboriosam? Quisquam blanditiis consequuntur nam! Reprehenderit explicabo illo, mollitia non cumque sunt sapiente aut esse laborum quis excepturi saepe architecto ipsum repudiandae quasi beatae necessitatibus neque facere laboriosam fugit? Officia, illo officiis!
        </Text>
        <Text style={styles.parragraph}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi veritatis ea corrupti voluptatibus ratione? Eaque provident blanditiis nemo dolores tenetur facere maxime vitae. Aliquam sunt doloremque, ducimus amet, non deleniti perferendis voluptate fugit maiores maxime sit magnam ab soluta cum esse quod, neque aspernatur? Ut in dolores quia minima, voluptates esse tempora itaque doloremque expedita cumque maiores! Magnam amet non porro a voluptatem laborum soluta atque aspernatur veniam unde, iusto debitis et maxime possimus sequi ex quod perferendis voluptate repudiandae itaque mollitia quasi sit. Quibusdam mollitia enim nemo velit dolore quas molestias ratione sapiente reprehenderit, eos voluptates hic rem impedit, aspernatur atque incidunt. Sed, esse odit voluptates enim impedit ad culpa reprehenderit veniam aliquid voluptate repellat tempora. Ipsum mollitia doloremque ducimus accusantium debitis a maxime, quaerat laudantium aliquid earum consequuntur animi hic nisi similique deleniti praesentium harum sequi commodi facere reiciendis illo temporibus officiis amet! Hic libero animi facilis reprehenderit veritatis? Ab minus consectetur enim corporis deserunt consequatur adipisci sit eligendi fuga voluptatum reiciendis, natus pariatur sapiente praesentium omnis beatae cupiditate dolores nesciunt est distinctio facilis quaerat temporibus similique nisi. Veniam cum totam iusto, dignissimos voluptatem, aut recusandae tempore unde, praesentium officiis ipsa ad commodi nulla quasi repellat eveniet voluptate.
        </Text>

        <Text style={styles.parragraph}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi veritatis ea corrupti voluptatibus ratione? Eaque provident blanditiis nemo dolores tenetur facere maxime vitae. Aliquam sunt doloremque, ducimus amet, non deleniti perferendis voluptate fugit maiores maxime sit magnam ab soluta cum esse quod, neque aspernatur? Ut in dolores quia minima, voluptates esse tempora itaque doloremque expedita cumque maiores! Magnam amet non porro a voluptatem laborum soluta atque aspernatur veniam unde, iusto debitis et maxime possimus sequi ex quod perferendis voluptate repudiandae itaque mollitia quasi sit. Quibusdam mollitia enim nemo velit dolore quas molestias ratione sapiente reprehenderit, eos voluptates hic rem impedit, aspernatur atque incidunt. Sed, esse odit voluptates enim impedit ad culpa reprehenderit veniam aliquid voluptate repellat tempora. Ipsum mollitia doloremque ducimus accusantium debitis a maxime, quaerat laudantium aliquid earum consequuntur animi hic nisi similique deleniti praesentium harum sequi commodi facere reiciendis illo temporibus officiis amet! Hic libero animi facilis reprehenderit veritatis? Ab minus consectetur enim corporis deserunt consequatur adipisci sit eligendi fuga voluptatum reiciendis, natus pariatur sapiente praesentium omnis beatae cupiditate dolores nesciunt est distinctio facilis quaerat temporibus similique nisi. Veniam cum totam iusto, dignissimos voluptatem, aut recusandae tempore unde, praesentium officiis ipsa ad commodi nulla quasi repellat eveniet voluptate.
        </Text>

        <View style={styles.pageNumber}>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}

export default HojaServicioReportComponent;