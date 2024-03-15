import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Password } from "./Password";
import { ValidarCodigo } from "./Confirmacion";
import { iniciarSesion } from "../api/registro.api";

export const Login = ({ setLogin, setUser }) => {
  const { register, handleSubmit } = useForm();
  const [correo, setCorreo] = useState();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [codConf, setCodConf] = useState(false);
  const [correoValido, setCorreoValido] = useState(true);
  const [passValido, setPassValido] = useState(true);
  const [cambioPass, setCambioPass] = useState(false);

  const manejarCaptcha = (value) => {
    setCaptchaValue(value);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (captchaValue) {
      setPassValido(true);
      setCorreoValido(true);
      try {
        const res = await iniciarSesion(data);
        setCorreo({correo: data.Correo, user: { Alias: res.data.Alias, Id: res.data.IDUsuario, Tipo: res.data.Tipo}, set: setUser});
        const temp = true;
        setCodConf(temp);
      } catch (error) {
        console.log(error);
        if (error.response.data.mensaje === "CI") {
          setPassValido(false);
        }
        if (error.response.data.mensaje === "UNE") {
          setCorreoValido(false);
        }
        if (error.response.data.mensaje === "CR") {
          setCambioPass(false);
        }
      }
    }
  });

  return (
    <>
      <div
        style={codConf ? { filter: "blur(5px)" } : {}}
        className="form-container"
      >
        <h2>Inicio Sesion</h2>
        <form className="form" onSubmit={onSubmit}>
          <label htmlFor="email" className="labelUserForm">
            Correo Electronico
          </label>
          <div className="campoUser">
            <input
              type="email"
              placeholder="ejemplo@dominio"
              className="entradaDatos"
              {...register("Correo", { required: true, maxLength: 45 })}
            />
          </div>
          {!correoValido && (
            <p className="campoInvalido">
              El correo no pertenece a ninguna cuenta
            </p>
          )}
          <label htmlFor="password" className="labelUserForm">
            Contraseña
          </label>
          <div className="campoUser">
            <Password
              pass={register("Contraseña", { required: true, maxLength: 45 })}
            />
          </div>
          {!passValido && (
            <p className="campoInvalido">Contraseña Incorrecta</p>
          )}
          <div className="campoUser">
            <ReCAPTCHA
              className="captcha"
              sitekey="6LcSoSsoAAAAACy0FPiFieuiLq4zDcshJy-N3Az6"
              onChange={manejarCaptcha}
            />
          </div>
          <button className="sendUserForm" type="submit">
            Iniciar Sesion
          </button>
          {cambioPass && (
            <p className="passInvalido">
              Se envio la nueva contraseña a su correo
            </p>
          )}
        </form>
        <button className="changeUserForm" onClick={() => setLogin(false)}>
          ¿No tienes una cuenta? Registrate aquí.
        </button>
      </div>
      {codConf && <ValidarCodigo salir={setCodConf} user={correo} />}
    </>
  );
};
