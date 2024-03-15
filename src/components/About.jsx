import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getRecintos, nuevoRecintos } from "../api/principal.api";

function Recinto({ info }) {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-12 ps-lg-5 mt-md-5">
            <div className="about-text">
              <h2 style={{wordWrap: "break-word", wordBreak: "normal"}}><p>{info.Nombre}</p></h2>
              <ul>
                <li style={{wordWrap: "break-word", wordBreak: "normal"}}>{"Direccion: "+info.Direccion}</li>
                <li>Horario: {info.Horario}</li>
                <li>Telefono: {info.Telefono}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const About = ({ user }) => {
  const [recintos, setRecintos] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  const fetchData = async () => {
    const result = await getRecintos();
    setRecintos(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addRecinto = handleSubmit(async (data) => {
    data.Imagen = "Sin Imagen";
    data.Telefono = parseInt(data.Telefono);
    await nuevoRecintos(data);
    setValue("Nombre", "");
    setValue("Direccion ", "");
    setValue("Horario", "");
    setValue("Telefono", "");
    fetchData();
  });

  return (
    <div style={{ paddingTop: 150 }}>
      {recintos.map((recinto, index) => (
        <Recinto key={index} info={recinto} />
      ))}
      {user.Tipo !== "Usuario" && (
        <div className="manageRecintos">
          <h3>Añadir Recinto</h3>
          <div className="campoRecinto">
            <div className="atributoRecinto">
              <label className="labelAtributo">Nombre:</label>
              <input
                className="inputAtributo"
                type="text"
                {...register("Nombre", { required: true })}
              />
            </div>
            <div className="atributoRecinto">
              <label className="labelAtributo">Dirección:</label>
              <input
                className="inputAtributo"
                type="text"
                {...register("Direccion", { required: true })}
              />
            </div>
            <div className="atributoRecinto">
              <label className="labelAtributo">Horario:</label>
              <input
                className="inputAtributo"
                type="text"
                {...register("Horario", { required: true })}
              />
            </div>
            <div className="atributoRecinto">
              <label className="labelAtributo">Telefono:</label>
              <input
                className="inputAtributo"
                type="number"
                {...register("Telefono", { required: true })}
              />
            </div>
          </div>
          <button onClick={addRecinto} type="button">
            Añadir
          </button>
        </div>
      )}
    </div>
  );
};

export default About;
