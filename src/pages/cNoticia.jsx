import React, {useEffect, useState} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AdditionalNewsList from '../components/newNews';
import NewsCarousel from '../components/carNews';
import { getPublicaciones } from '../api/principal.api';
import '../styles/styles.css';

function DNoticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const res = await getPublicaciones();
        setNoticias(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return (
    <div className="Noticias">
      <NewsCarousel noticias={noticias.slice(0, 3)}/>
      <AdditionalNewsList noticias={noticias}/>
    </div>
  );
}

export default DNoticias;
