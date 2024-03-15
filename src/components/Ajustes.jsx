import { useEffect, useState } from "react";
import { getUsuario, getContactos } from "../api/registro.api";
import { validarPass } from "../functions/validarPassword.js";
import { validarEdad } from "../functions/validarEdad.js";
import {
  actualizarUsuario,
  actualizarContacto,
  eliminarUsuario,
  revisarContacto,
  agregarContacto,
} from "../api/registro.api";
import "../styles/ajustes.css";

function AjustesUsuario({ user }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [alias, setAlias] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsuario(user.Id);
      setNombre(data.data.Nombre);
      setApellido(data.data.Apellido);
      setAlias(data.data.Alias);
      setFechaNacimiento(data.data.FechaNacimiento);
      setGenero(
        { M: "Masculino", F: "Femenino", N: "No Binario" }[data.data.Genero]
      );
    };
    fetchData();
  }, []);

  const Actualizar = async () => {
    if (validarPass(password) || password === "") {
      if (validarEdad(fechaNacimiento)) {
        try {
          const data = {
            Id: user.Id,
            Nombre: nombre,
            Apellido: apellido,
            Password: password,
            Alias: alias,
            FechaNacimiento: fechaNacimiento,
            Genero: genero[0],
          };
          const res = await actualizarUsuario(data);
          console.log(res);
          if (res.data.mensaje === "AE") {
            alert("El alias elegido ya existe");
          }
        } catch (e) {
          console.log(e);
        }
      }
      else {
        alert("Debe ser mayor a 18 años.");
      }
    } else {
      alert("Contraseña no valida.");
    }
  };

  return (
    <div className="ajustesUsuario">
      <h2 className="tituloAjustes">Usuario</h2>
      <div className="campos">
        <div className="campo">
          <label className="labelAjustes">Nombre:</label>
          <input
            className="inputAjustes"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="labelAjustes">Apellido:</label>
          <input
            className="inputAjustes"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="labelAjustes">Contraseña:</label>
          <input
            className="inputAjustes"
            type="text"
            placeholder="Nueva Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="labelAjustes">Alias:</label>
          <input
            className="inputAjustes"
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="labelAjustes">Fecha Nacimiento:</label>
          <input
            className="inputAjustes"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
        <div className="campo">
          <label className="labelAjustes">Genero:</label>
          <select
            className="inputAjustes"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="No binario">No binario</option>
          </select>
        </div>
      </div>
      <button
        className="botonAjustes"
        style={{ marginBottom: 20 }}
        onClick={Actualizar}
      >
        Actualizar
      </button>
    </div>
  );
}

function Contacto({
  user,
  data = { Numero: 0, Nombre: "A", Relacion: "Rel" },
  func,
}) {
  const [numero] = useState(data.Numero);
  const [nombre] = useState(data.Nombre);
  const [relacion, setRelacion] = useState(data.Relacion);

  const Actualizar = async () => {
    const data = {
      Id: user.Id,
      Telefono: numero,
      Nombre: nombre,
      Relacion: relacion,
    };
    const res = await actualizarContacto(data);
    console.log(res);
    func.s(!func.v);
  };

  const Eliminar = async () => {
    const data = {
      Id: user.Id,
      Telefono: numero,
    };
    const res = await eliminarUsuario(data);
    console.log(res);
  };

  return (
    <div className="campoContacto">
      <div>
        <label className="labelAjustes">Numero: </label>
        <input
          className="inputAjustes"
          type="number"
          value={numero}
        />
      </div>
      <div>
        <label className="labelAjustes">Nombre:</label>
        <input
          className="inputAjustes"
          type="text"
          value={nombre}
        />
      </div>
      <div>
        <label className="labelAjustes">Relacion</label>
        <select
          className="inputAjustes"
          value={relacion}
          onChange={(e) => setRelacion(e.target.value)}
        >
          <option value="Amigo/a">Amigo/a</option>
          <option value="Esposo/a">Esposo/a</option>
          <option value="Pareja">Pareja</option>
          <option value="Cónyuge">Cónyuge</option>
          <option value="Novio/a">Novio/a</option>
          <option value="Hermano/a">Hermano/a</option>
          <option value="Padre">Padre</option>
          <option value="Madre">Madre</option>
          <option value="Abuelo/a">Abuelo/a</option>
          <option value="Tío/a">Tío/a</option>
          <option value="Primo/a">Primo/a</option>
          <option value="Sobrino/a">Sobrino/a</option>
          <option value="Compañero/a-de-trabajo">Compañero/a de trabajo</option>
          <option value="Vecino/a">Vecino/a</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div>
        <button className="botonAjustes" onClick={Eliminar}>
          Eliminar
        </button>
        <button className="botonAjustes" onClick={Actualizar}>
          Actualizar
        </button>
      </div>
    </div>
  );
}

function AjustesContacto({ user }) {
  const [numero, setNumero] = useState("");
  const [nombre, setNombre] = useState("");
  const [relacion, setRelacion] = useState("");
  const [contactos, setContactos] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const revisarNumero = async (e) => {
    setNumero(e.target.value);
    if (e.target.value.length === 8) {
      const res = await revisarContacto({"Numero": parseInt(e.target.value)});
      if (res.data.Nombre) {
        setNombre(res.data.Nombre);
      }
    }
  };

  const fetchData = async () => {
    const data = await getContactos({ id: user.Id });
    setContactos(data.data);
  };

  useEffect(() => {
    fetchData();
  }, [actualizar]);

  const Agregar = async () => {
    const data = {
      Id: user.Id,
      Telefono: numero,
      Nombre: nombre,
      Relacion: relacion,
    };
    const res = await agregarContacto(data);
    console.log(res);
    if (res.data.mensaje === "AE") {
      alert("El numero elegido ya existe");
    }
    fetchData();
    setNumero("");
    setNombre("");
  };

  return (
    <div className="ajustesUsuario">
      <h2 className="tituloAjustes">Contactos</h2>
      <div className="campos">
        {contactos.map((contacto, index) => (
          <Contacto key={index} user={user} data={contacto} func={{v: actualizar, s: setActualizar}}/>
        ))}
        <div className="campoContacto">
          <div>
            <label className="labelAjustes">Numero: </label>
            <input
              className="inputAjustes"
              type="text"
              value={numero}
              onChange={revisarNumero}
            />
          </div>
          <div>
            <label className="labelAjustes">Nombre:</label>
            <input
              className="inputAjustes"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label className="labelAjustes">Relacion</label>
            <select
              className="inputAjustes"
              value={relacion}
              onChange={(e) => setRelacion(e.target.value)}
            >
              <option value="Amigo/a">Amigo/a</option>
              <option value="Esposo/a">Esposo/a</option>
              <option value="Pareja">Pareja</option>
              <option value="Cónyuge">Cónyuge</option>
              <option value="Novio/a">Novio/a</option>
              <option value="Hermano/a">Hermano/a</option>
              <option value="Padre">Padre</option>
              <option value="Madre">Madre</option>
              <option value="Abuelo/a">Abuelo/a</option>
              <option value="Tío/a">Tío/a</option>
              <option value="Primo/a">Primo/a</option>
              <option value="Sobrino/a">Sobrino/a</option>
              <option value="Compañero/a-de-trabajo">
                Compañero/a de trabajo
              </option>
              <option value="Vecino/a">Vecino/a</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <button className="botonAjustes" onClick={Agregar}>
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Ajustes({ user }) {
  return (
    <div className="mainAjustes">
      <AjustesUsuario user={user} />
      <AjustesContacto user={user} />
    </div>
  );
}
