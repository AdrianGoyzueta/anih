import React from 'react';
import Slider from 'react-slick';


function NewsCarousel({ noticias }) {  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, 
    centerMode: true, // Centrar el elemento activo (noticia actual)
    centerPadding: '2', // Espacio entre elementos
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Mostrar una noticia a la vez en dispositivos móviles
        },
      },
    ],
  };
  return (
    <div className="Noticias">
      <Slider {...settings} className="news-carousel">
        {noticias.map((noticia) => (
            <div key={noticia.IDPublicacion} className="carousel-item">
              <img src={noticia.Imagen} alt={noticia.Titulo} />
              <div className="news-info">
                <h3>{noticia.Titulo}</h3>
              </div>
            </div>
            ))}
      </Slider>
    </div>
  );
}

export default NewsCarousel;
