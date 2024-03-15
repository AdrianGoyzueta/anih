import { useEffect, useState } from "react"
import { buscar } from "../api/denuncia.api";


function Denuncia({denuncia}) {
  return (
    <div className="denuncia">
      <p> <b> Fecha del Hecho: </b> {denuncia.FechaHecho.toString().slice(0, 10)} </p>
      <p> <b> Frecuencia: </b> {denuncia.Frecuencia} </p>
      <p> <b> Descripcion: </b> {denuncia.Descripcion} </p>
      <p> <b> Lugar: </b> {denuncia.Lugar} </p>
    </div>
  );
}


export function MostrarDenuncias() {

  function obtenerFechaActual() {
    const fecha = new Date();
  
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript comienzan en 0
    const day = String(fecha.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }

  const [denuncias, setDenuncias] = useState([]);
  const [desde, setDesde] = useState("1900-01-01");
  const [hasta, setHasta] = useState(obtenerFechaActual());
  const [lugar, setLugar] = useState("");

  const getDenuncias = async () => {
    const denuncias = await buscar({FechaDesde: desde, FechaHasta: hasta, Lugar: lugar});
    setDenuncias(denuncias.data);
  };

  useEffect(() => {
    getDenuncias();
  }, []);

  return (
    <div className="filtro-container">
      <h3>Denuncias Realizadas</h3>
      <div className="filtroDenuncia">
        <div>
          <label >Desde:</label>
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)}/>
        </div>
        <div>
          <label >Hasta:</label>
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)}/>
        </div>
        <div>
          <label >Lugar:</label>
          <input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)}/>
        </div>
      </div>
      <button className="botonFiltrar" onClick={getDenuncias}>Filtrar</button>
      {denuncias.map((denuncia) => <Denuncia key={denuncia.IDDenuncia} denuncia={denuncia}/>)}
    </div>
  );
}