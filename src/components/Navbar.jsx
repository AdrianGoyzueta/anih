import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {getContactos, getUsuario} from "../api/registro.api.js"

const Navbar = ({ user }) => {
  const cambiar = useNavigate();
  const [contactos, setContactos] = useState([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (user.Id !== 0) {
      const fetchContactos = async () => {
        const res = await getContactos({ id: user.Id });
        setContactos(res.data);
        const resU = await getUsuario(user.Id);
        setNombre(`${resU.data.Nombre} ${resU.data.Apellido}`);
      };
      fetchContactos();
    }
  }, []);

  const botonSOS = () => {
    const mensaje =
      "NECESITO AYUDA, ESTOY EN PELIGRO! \n Ubicación actual: https://www.google.com/maps?q=" +
      user.lat +
      "," +
      user.lng;

    contactos.forEach((contacto) => {
      window.open(
        `https://wa.me/${contacto.Numero}?text=Hola%20mi%20nombre%20es%20${nombre}, Asunto:%20${mensaje}`,
        "_blank"
      );
    });
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              className="logo"
              src={require("../images/Logo.png")}
              alt="ANIH"
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => {
                    if (user.Id === 0) {
                      cambiar("/usuario");
                    }
                    else {
                      cambiar("/ajustes")
                    }
                  }}
                >
                  {user.Alias}
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => cambiar("/chat")}>
                  ChatBot
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => cambiar("/denuncia")}>
                  Denunciar
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => cambiar("/noticias")}>
                  Noticias
                </button>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  Fundaciónes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  ESTADISTICAS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#mapa">
                  Mapa
                </a>
              </li>
              <li>
                <button onClick={botonSOS} type="button" style={{backgroundColor: "red", color: "white",}}>
                  SOS
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
