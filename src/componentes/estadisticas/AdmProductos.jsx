import React, { useEffect, useState } from "react";
import BotonExcelDefault from "./BotonExcelDefault";
import ExportExcelServicios from "./ExportExcelServicios";

const AdmProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        let listaProductos = json.products.map((data) => {
          return {
            id: data.id,
            nombre: data.title,
            marca: data.brand,
            categoria: data.category,
            cantidad: data.stock,
            precio: data.price,
            valoracion: data.rating,
          };
        });
        setProductos(listaProductos);
      });
  }, []);

  return (
<>
          <div className="d-flex justify-content-between">

            <div>
              <BotonExcelDefault productos={productos} />
              <ExportExcelServicios productos={productos} />
            </div>
          </div>

          <table bordered hover>
            <thead className="bg-primary text-white">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Categoria</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Valoracion</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => {
                return (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.marca}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.valoracion}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </>
  );
};

export default AdmProductos;