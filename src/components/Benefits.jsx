import React, { useEffect, useState } from "react";
import { getContactos, getUsuario } from "../api/registro.api.js";
import styles from "../styles/Benefits.module.css";
import styles2 from "../styles/Contact.module.css";


var s = "";
const Benefits = ({ infoUser }) => {
  const [coord, setCoord] = useState({});
  const [sw, setSw] = useState(true);
  const [contactos, setContactos] = useState([]);
  const [nombre, setNombre] = useState("");

  function iniciarMap() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoord({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          infoUser.set({
            ...infoUser.value,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          var map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: coord,
          });
          var marker = new window.google.maps.Marker({
            position: coord,
            map: map,
          });

          var textarea = document.getElementById("ubicacion");
          s = s + coord.lat + " " + coord.lng + "\n";
        },
        () => {
          alert("Navegador compatible, de permisos de ubicación");
        },
        {
          enableHighAccuracy: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const Actualizar = () => {
    try {
      if (window.google) {
        iniciarMap();
      } else {
        window.initMap = iniciarMap;
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyCTuazTT4ftRrTOscHQYPabgJPLiBS9YXc&sensor=false&region=ES&callback=iniciarMap";
        script.async = true;
        document.body.appendChild(script);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {    
    Actualizar();

    if (infoUser.value.Id !== 0) {
      const fetchContactos = async () => {
        const res = await getContactos({ id: infoUser.value.Id });
        setContactos(res.data);
        const resU = await getUsuario(infoUser.value.Id);
        setNombre(`${resU.data.Nombre} ${resU.data.Apellido}`);
      };
      fetchContactos();
    }
  }, []);


  const botonSOS = () => {
    const mensaje =
      "NECESITO AYUDA, ESTOY EN PELIGRO! \n Ubicación actual: https://www.google.com/maps?q=" +
      coord.lat +
      "," +
      coord.lng;

    contactos.forEach((contacto) => {
      window.open(
        `https://wa.me/${contacto.Numero}?text=Hola%20mi%20nombre%20es%20${nombre}, Asunto:%20${mensaje}`,
        "_blank"
      );
    });

    setSw(!sw);
  };

  const botonNoSOS = () => {
    window.location.reload(true);
    console.log("SOS detenido");
  };

  const divStyle = {
    height: "500px",
    width: "80%",
  };

  const enviar = {
    backgroundColor: "#84FF3B",
  };

  const sos = {
    backgroundColor: "red",
    color: "white",
  };

  const cancelar = {
    backgroundColor: "blue",
    color: "white",
    width: "90px",
    height: "40px",
    borderRadius: "4px",
    background: "none",
    border: "1px solid #7060c0",
    marginTop: "10px",
  };

  function enviarWhatsaap() {
    const nombre2 = document.getElementById("Name").value;
    const celular2 = document.getElementById("Celular").value;
    const mensaje2 = document.getElementById("Message").value;
    const whatsappURL = `https://wa.me/${celular2}?text=Hola%20mi%20nombre%20es%20${nombre2},%20Asunto:%20${mensaje2}`;
    window.open(whatsappURL, "_blank");
  }

  return (
    <div name="Mapa" className={styles.benefits}>
      <h2 className={styles.benefitTitle} id="mapa">
        Mapa
      </h2>
      <div style={divStyle} id="map">
        {}
      </div>
      <br></br>
      <button type="button" onClick={Actualizar}>Actualizar</button>
      <div name="Contact" className={styles2.contact}>
        <h2>Contactanos</h2>
        <form
          className={styles2.form}
          method="POST"
          action="https://formsubmit.co/jesushuizabrayancoya@gmail.com"
        >
          <label>Nombre</label>
          <input id="Name" name="name" className={styles2.input}></input>
          <label>Email</label>
          <input
            id="Email"
            name="email"
            type="email"
            className={styles2.input}
          ></input>
          <label>Mensaje</label>
          <textarea
            id="Message"
            name="comments"
            className={styles2.textArea}
          ></textarea>
          <label>Celular</label>
          <input id="Celular" name="celular" className={styles2.input}></input>
          <br></br>
          <button type="submit" onClick={enviarWhatsaap} style={enviar}>
            Enviar
          </button>
          <br></br>{" "}
          <button onClick={botonSOS} type="submit" style={sos}>
            SOS
          </button>
        </form>
      </div>
      <button onClick={botonNoSOS} style={cancelar}>
        Cancelar emergencia
      </button>
    </div>
  );
};

export default Benefits;
