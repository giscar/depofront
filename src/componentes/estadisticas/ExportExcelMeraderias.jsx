import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExportExcelMercaderias = ({ mercaderias }) => {
  const [loading, setLoading] = useState(false);

  const titulo = [{ A: "Reporte de mercaderias del ingreso" }, {}];

  const longitudes = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10,];

  const formatearFecha = (fec) => {
    //2024-11-02
    let dia = fec.substring(8, 10)
    let mes = fec.substring(5, 7)
    let anho = fec.substring(0, 4)
    return `${dia}/${mes}/${anho}`
  }

  const handleDownload = () => {
    setLoading(true);


    					 				

    let tabla = [
      {
        A: "Serie",
        B: "Numero",
        C: "Codigo",
        D: "Descripcion",
        E: "Unidad medida",
        F: "cantidad inicial",
        G: "cantidad actual",
        H: "Fecha de ingreso",
        I: "Almacen",
        J: "Estado",
      },
    ];

 

    mercaderias.forEach((mercaderia) => {
      tabla.push({
        A: mercaderia.serie,
        B: mercaderia.numeroMercaderia,
        C: mercaderia.productoCodigo,
        D: mercaderia.descripcionProducto,
        E: mercaderia.unidadMedida?.descripcion,
        F: mercaderia.cantidadOrignal,
        G: mercaderia.cantidad,
        H: formatearFecha(mercaderia.fechaIngreso.split("T")[0]),
        I: mercaderia.almacen?.descripcion,
        J: mercaderia.estadoMercaderia,

      });
    });

    const dataFinal = [..."", ...tabla];

    setTimeout(() => {
      creandoArchivo(dataFinal);
      setLoading(false);
    }, 1000);
  };

  const creandoArchivo = (dataFinal) => {
    debugger
    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

    hoja["!merges"] = [
      //XLSX.utils.decode_range("A1:G1"),
      //XLSX.utils.decode_range("A2:G2"),
      XLSX.utils.decode_range("A34:L34"),
    ];

    let propiedades = [];

    longitudes.forEach((col) => {
      propiedades.push({
        width: col,
      })
    })

    hoja["!cols"] = propiedades;

    XLSX.utils.book_append_sheet(libro, hoja, "Mercaderias");

    XLSX.writeFile(libro, "reporteMercaderias.xlsx");
  };

  return (
    <>
      {!loading ? (
        <button color="success" className="btn btn-warning" onClick={handleDownload}>
          Exportar Excel
        </button>
      ) : (
        <button color="success" disabled>
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Generando...</span>
          </div>
        </button>
      )}
    </>
  )
}

export default ExportExcelMercaderias;