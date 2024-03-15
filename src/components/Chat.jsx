import React, { useState, useRef } from "react";
import "../styles/chat.css";
import { chatBot } from "../api/chat.api";

export function Mensaje({
  alias = "Bot",
  contenido = "Aqui va el contenido del mensaje",
  tiempo = "",
  propio = false,
}) {
  const other = {
    backgroundColor: "rgb(167, 52, 168)",
  };

  const me = {
    backgroundColor: "rgb(111,63,177)",
  };

  return (
    <div className="mensajeChat">
      <div style={propio ? me : other} className="datosUsuario">
        <b>
          <p className="aliasMensaje">{alias}</p>
        </b>
        <small className="contenidoMensaje">{contenido}</small>
      </div>
    </div>
  );
}

export function ConversacionBot({ infoUser } ) {
  
  const divMensajes = useRef();
  const [contMensaje, setContMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  const enter = (e) => {
    if (e.key === "Enter") {
      mensajearBot();
    }
  };

  const mensajearBot = async () => {
    if (infoUser.Id !== 0){
      if (contMensaje.trim() !== "") {
        const nuevoMensaje = {
          IDEmisor: infoUser.Id,
          Contenido: contMensaje,
        };
        setMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]);
        setContMensaje("");
        try {
          const res = await chatBot(nuevoMensaje);
          console.log(res);
          const respuesta = {
            IDEmisor: -1,
            IDReceptor: infoUser.Id,
            Contenido: res.data.Respuesta,
          };
          setMensajes((prevMensajes) => [...prevMensajes, respuesta]);
          setContMensaje("");
        } catch (error) {
          console.log(error);
        }
      }
    }
    else {
      alert("Debes iniciar sesión para poder chatear con el bot")
    }
  };

  return (
    <div className="chat">
      <div className="topConversacion">
        <b>
          <p className="pAlias">ANIH BOT</p>
        </b>
      </div>
      <div className="campoMensajes" ref={divMensajes}>
        <div className="mensajes">
          {mensajes.map((elemento, index) => {
            const propio = infoUser.Id === elemento.IDEmisor;
            return (
              <Mensaje
                key={index}
                alias={propio ? infoUser.Alias : "ANIH BOT"}
                contenido={elemento.Contenido}
                propio={propio}
              />
            );
          })}
        </div>
      </div>
      <div className="entradaMensaje">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={contMensaje}
          onChange={(e) => setContMensaje(e.target.value)}
          onKeyPress={enter}
          className="texto"
        />
        <button
          className="enviarMensaje"
          type="button"
          onClick={mensajearBot}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
