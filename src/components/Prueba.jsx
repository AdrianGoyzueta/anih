import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getRecintos } from "../api/principal.api.js";

export function Prueba() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const getRec = async () => {
      const res = await getRecintos();
      console.log(res);
    };
    getRec();
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    const men = {IDEmisor: 2, IDReceptor: 3, Contenido: data.id}
    // const res = await enviarMensaje(men);
    // console.log(res);
  });

  return (
    <div
      style={{
        backgroundColor: "#101010",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <h1 style={{ margin: 0 }}>Prueba</h1>
      </div>
      <form
        onSubmit={onSubmit}
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor="">Mensaje: </label>
        <input type="text" {...register("id", { required: true })} />
        <button style={{}}>Enviar</button>
      </form>
    </div>
  );
}
