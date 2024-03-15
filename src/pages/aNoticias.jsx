import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCarousel from "../components/carNews";
import {
  getPublicaciones,
  nuevaPublicacion,
  actualizarPublicacion,
  borrarPublicacion,
} from "../api/principal.api";

function AdminPage() {
  const [noticias, setNoticias] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getPublicaciones();
      setNoticias(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedNoticia, setSelectedNoticia] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState("");

  const clearForm = () => {
    setSelectedNoticia(0);
    setTitulo("");
    setResumen("");
    setFecha("");
    setImagen("");
  };

  const agregar = async () => {
    try {
      await nuevaPublicacion({
        Titulo: titulo,
        Contenido: resumen,
        FechaNoticia: fecha,
        Imagen: imagen,
      });
      clearForm();
      fetchData();
    } catch (error) {
      alert('Llene todos los campos')
      console.log(error);
    }
  };

  const actualizar = async () => {
    try {
      await actualizarPublicacion(selectedNoticia, {
        Titulo: titulo,
        Contenido: resumen,
        FechaNoticia: fecha,
        Imagen: imagen,
      });
      clearForm();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-page" style={{}}>
      <NewsCarousel noticias={noticias.slice(0, 3)} />
      <button onClick={() => setSelectedNoticia(0)}>Agregar Noticia</button>
      <div className="news-editor">
        <h2>{selectedNoticia !== 0 ? "Editar Noticia" : "Agregar Noticia"}</h2>
        <label>Título: </label>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <br />
        <label>Resumen: </label>
        <textarea
          placeholder="Resumen"
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
        />
        <br />
        <label>Fecha de publicación: </label>
        <input
          type="date"
          placeholder="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <br />
        <label>Imagen: </label>
        <input
          type="text"
          placeholder="URL de la imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
        <button onClick={selectedNoticia !== 0 ? actualizar : agregar}>
          {" "}
          Guardar{" "}
        </button>
      </div>
      <div className="news-list">
        {noticias.map((noticia) => (
          <div key={noticia.IDPublicacion} className="news-item">
            <img src={noticia.Imagen} alt={noticia.Titulo} />
            <div className="news-info">
              <h3>{noticia.Titulo}</h3>
              <p>{noticia.FechaNoticia}</p>
              <p>{noticia.Contenido}</p>
              <button
                onClick={() => {
                  setSelectedNoticia(noticia.IDPublicacion);
                  setTitulo(noticia.Titulo);
                  setResumen(noticia.Contenido);
                  setFecha(noticia.FechaNoticia);
                  setImagen(noticia.Imagen);
                }}
              >
                Editar
              </button>
              <button
                onClick={async () => {
                  try {
                    await borrarPublicacion(noticia.IDPublicacion);
                    fetchData();
                  }
                  catch {
                    console.log("Error al borrar la noticia");
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AdminPage;
