import { useState } from "react";
import { Password } from "./Password";
import { useForm } from "react-hook-form";
import { validarPass } from "../functions/validarPassword";
import { validarEdad } from "../functions/validarEdad"
import { registrarUsuario } from "../api/registro.api";
import { useNavigate } from "react-router-dom";

export function Register({ setLogin }) {
  const cambiar = useNavigate();
  const { register, handleSubmit } = useForm();

  const [valido, setValido] = useState(true);
  const [edadValida, setEdadValida] = useState(true);
  const [correoValido, setCorreoValido] = useState(true);
  const [aliasValido, setAliasValido] = useState(true);

  const onSubmit = handleSubmit(async (data) => {
    setAliasValido(true);
    setCorreoValido(true);
    const temp = validarPass(data.Contraseña);
    setValido(temp);
    const temp2 = validarEdad(data.FechaNacimiento);
    setEdadValida(temp2);
    if (temp && temp2) {
      data.Genero = data.Genero[0];
      try {
        await registrarUsuario(data);
        cambiar("/contactos");
      } catch (err) {
        console.log(err);
        if (err.response.data.Correo) {
          setCorreoValido(false);
        }
        if (err.response.data.Alias) {
          setAliasValido(false);
        }
      }
    }
  });

  return (
    <div className="form-container" onSubmit={onSubmit}>
      <h2>Registrarse</h2>
      <form className="form">
        <div className="campoUser">
          <input
            placeholder="Apellido"
            className="entradaDatos"
            {...register("Apellido", { required: true, maxLength: 45 })}
          />
        </div>
        <div className="campoUser">
          <input
            placeholder="Nombre"
            className="entradaDatos"
            {...register("Nombre", { required: true, maxLength: 45 })}
          />
        </div>
        <div className="campoUser">
          <input
            placeholder="Alias"
            className="entradaDatos"
            {...register("Alias", { required: true, maxLength: 45 })}
          />
        </div>
        {!aliasValido && (
          <p className="campoInvalido">El alias ya esta en uso</p>
        )}
        <div className="campoUser">
          <input
            type="email"
            placeholder="Correo Electronico"
            className="entradaDatos"
            {...register("Correo", { required: true, maxLength: 45 })}
          />
        </div>
        {!correoValido && (
          <p className="campoInvalido">El correo ya esta en uso</p>
        )}
        <Password
          pass={register("Contraseña", { required: true, maxLength: 45 })}
        />
        {!valido && <p className="campoInvalido">Contraseña Invalida.<br/>Debe tener minimo:<br/>1 numero<br/>1 miniscula<br/>1 mayuscula<br/>1 caracter especial<br/>8 caracteres.</p>}
        <div className="campoUser">
          <label className="labelRegistro">Fecha Nacimiento: </label>
          <input
            type="date"
            className="entradaDatos"
            {...register("FechaNacimiento", { required: true })}
          />
        </div>
        {!edadValida && <p className="campoInvalido">Debe ser mayor de edad</p>}
        <div className="campoUser">
          <label className="labelRegistro">Genero:</label>
          <select
            className="elegirGenero"
            {...register("Genero", { required: true, maxLength: 45 })}
          >
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="No binario">No binario</option>
          </select>
        </div>
        <button className="sendUserForm" type="submit">
          Registrarse
        </button>
      </form>
      <button className="changeUserForm" onClick={() => setLogin(true)}>
        ¿Ya tienes una cuenta? Inicia Sesión aquí.
      </button>
    </div>
  );
}
