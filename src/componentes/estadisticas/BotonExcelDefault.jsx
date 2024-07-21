import React, { useState } from "react";
import * as XLSX from "xlsx";

const BotonExcelDefault = ({ productos }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(productos);

    XLSX.utils.book_append_sheet(libro, hoja, "Productos");

    setTimeout(() => {
      XLSX.writeFile(libro, "ProductosDefault.xlsx");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {!loading ? (
        <button color="success" onClick={handleDownload}>
          Excel Default
        </button>
      ) : (
        <button color="success" disabled>
          <span> Generando...</span>
        </button>
      )}
    </>
  );
};

export default BotonExcelDefault;