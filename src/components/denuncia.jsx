import React, { useEffect, useState } from "react";
import { categorias } from "../api/denuncia.api";

function SeccionHecho( { denuncia, set } ) {
  const [tiposViolencia, setTiposViolencia] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await categorias();
      setTiposViolencia(response.data);
    };
    fetchCategorias();
  }, []);


  return (
    <div>
      <h2>Detalles de la Denuncia</h2>
      <div className="label-input-group">
        <div className="input-group">
          <label>Fecha del Hecho:</label>
          <input
            type="date"
            name="fechaHecho"
            value={denuncia.FechaHecho}
            onChange={(e) => set({...denuncia, FechaHecho: e.target.value})}
          />
        </div>
        <div className="input-group">
          <label>Hora del Hecho:</label>
          <input
            type="time"
            name="horaHecho"
            value={denuncia.HoraHecho}
            onChange={(e) => set({...denuncia, HoraHecho: e.target.value})}
          />
        </div>
      </div>

      <div className="input-group">
        <label>Lugar del Hecho:</label>
        <input
          type="text"
          name="lugarHecho"
          value={denuncia.Lugar}
          onChange={(e) => set({...denuncia, Lugar: e.target.value})}
        />
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>Tipo de Violencia:</label>
          <select
            name="tipoViolencia"
            value={denuncia.Tipo}
            onChange={(e) => set({...denuncia, Tipo: e.target.value})}
          >
            {tiposViolencia.map((tipo, index) => <option key={index} value={tipo.Nombre}>{tipo.Nombre}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label>Frecuencia de los Actos de violencia:</label>
          <select value={denuncia.Frecuencia} onChange={(e) => set({...denuncia, Frecuencia: e.target.value})}>
            <option value="Primera vez">Primera vez</option>
            <option value="Todos los dias">Todos los días</option>
            <option value="Todas las semanas">Todas las semanas</option>
            <option value="Una vez por mes">Una vez por mes</option>
            <option value="Una vez por año">Una vez por año</option>
          </select>
        </div>
      </div>
      <div className="input-group">
        <label>Descripción del Hecho:</label>
        <textarea
          name="descripcionHecho"
          value={denuncia.Descripcion}
          onChange={(e) => set({...denuncia, Descripcion: e.target.value})}
        />
      </div>
      <div className="input-group">
        <label>Subir Archivos:</label>
        <div className="file-upload">
          <input type="file" name="archivos" multiple />
        </div>
      </div>
    </div>
  );
}

export default SeccionHecho;