import React from "react";

function AdditionalNewsList({ noticias }) {
  return (
    <div className="additional-news-list">
      {noticias.map((noticia) => (
        <div key={noticia.IDPublicacion} className="news-item">
          <img src={noticia.Imagen} alt={noticia.Titulo} />
          <div className="news-info">
            <h3>{noticia.Titulo}</h3>
            <p>{noticia.FechaPublicacion}</p>
            <p>{noticia.Contenido}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdditionalNewsList;
