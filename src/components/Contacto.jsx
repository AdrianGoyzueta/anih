import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { guardarContactos } from "../api/registro.api";
import { revisarContacto } from "../api/registro.api";
import "../styles/contacto.css";

function Contacto({ datos, nro, set }) {

  const revisarNumero = async (e) => {
    if (e.target.value.length === 8) {
      const res = await revisarContacto({"Numero": parseInt(e.target.value)});
      if (res.data.Nombre) {
        set(`nombre${nro}`, res.data.Nombre);
      }
    }
  };

  return (
    <div className="formContacto">
      <h1 className="tituloContacto">Contacto</h1>
      <div className="campoContacto">
        <label className="labelContacto">Numero:</label>
        <input
          className="inputContacto"
          type="number"
          {...datos(`numero${nro}`, { required: true })}
          onChange={revisarNumero}
        />
      </div>
      <div className="campoContacto">
        <label className="labelContacto">Nombre:</label>
        <input
          className="inputContacto"
          type="text"
          {...datos(`nombre${nro}`, { required: true })}
        />
      </div>
      <div className="campoContacto">
        <label className="labelContacto">Relacion:</label>
        <select
          className="inputContacto"
          {...datos(`relacion${nro}`, { required: true })}
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
    </div>
  );
}

export function RegContactos( { user } ) {
  const cambiar = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [contactos, setContactos] = useState([{"Numero": null, "Nombre": null, "Relacion": null}]);

  const agregarContacto = () => {
    let nuevoCantacto = {"Numero": null, "Nombre": null, "Relacion": null}
    setContactos([...contactos, nuevoCantacto]);
  };

  const eliminarContacto = () => {
    if (contactos.length > 1) {
      const temp = [...contactos];
      temp.pop();
      setContactos(temp);
    }
  };

  const onSubmit = handleSubmit(async (data) => {

    contactos.forEach((contacto, index) => {
      contacto.Numero = parseInt(data[`numero${index}`]);
      contacto.Nombre = data[`nombre${index}`];
      contacto.Relacion = data[`relacion${index}`];
    })
    try {
      const res = await guardarContactos({"id": user.Id, "contactos": contactos});
      console.log(res);
    }
    catch (error) {
      console.log(error);
    }
    cambiar("/usuario")
  });

  return (
    <div className="regContactos">
      <form className="formContactos" onSubmit={onSubmit}>
        {contactos.map((contacto, index) => (
          <Contacto key={index} datos={register} nro={index} set={setValue} />
        ))}
        <div className="botonesContacto">
          <button
            className="botonContacto"
            type="button"
            onClick={agregarContacto}
          >
            Agregar Contacto
          </button>
          <button className="botonContacto">Guardar</button>
          <button
            className="botonContacto"
            type="button"
            onClick={eliminarContacto}
          >
            Eliminar Contacto
          </button>
        </div>
      </form>
    </div>
  );
}