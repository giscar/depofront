import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExportExcelServicios = ({ servicios }) => {
  const [loading, setLoading] = useState(false);

  const titulo = [{ A: "Reporte de servicios de operaciones" }, {}];

  const longitudes = [5, 12, 80, 10, 16, 16, 16, 16, 20, 12, 10,];

  const handleDownload = () => {
    setLoading(true);

    let tabla = [
      {
        A: "Codigo",
        B: "RUC",
        C: "Razon Social",
        D: "Tipo",
        E: "Salida local",
        F: "Inicio servicio",
        G: "Fin servicio",
        H: "Retorno local",
        I: "Operador",
        J: "Montacarga",
        K: "Estado",
      },
    ];

    servicios.forEach((servicio) => {
      tabla.push({
        A: servicio.codServicio,
        B: servicio.ruc,
        C: servicio.cliente[0]?.razonSocial,
        D: servicio.tipoServicio,
        E: servicio.horaSalidaLocal.replace("T", " "),
        F: servicio.horaInicioServicio.replace("T", " "),
        G: servicio.horaFinServicio.replace("T", " "),
        H: servicio.horaRetornoLocal.replace("T", " "),
        I: servicio.operador[0]?.nombre,
        J: servicio.montacarga[0]?.codigo,
        K: servicio.estadoRegistro,
      });
    });

    const dataFinal = [..."", ...tabla];

    setTimeout(() => {
      creandoArchivo(dataFinal);
      setLoading(false);
    }, 1000);
  };

  const creandoArchivo = (dataFinal) => {
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
      });
    });

    hoja["!cols"] = propiedades;

    XLSX.utils.book_append_sheet(libro, hoja, "SERVICIOS OPERACIONES");

    XLSX.writeFile(libro, "ReporteHojaServicio.xlsx");
  };

  return (
    <>
      {!loading ? (
        <button color="success" className="btn-depo btn-dark-depo" onClick={handleDownload}>
          Exportar Excel
        </button>
      ) : (
        <button color="success" disabled>
          <div class="spinner-border text-dark" role="status">
  <span class="visually-hidden">Generando...</span>
</div>
        </button>
      )}
    </>
  );
};

export default ExportExcelServicios;