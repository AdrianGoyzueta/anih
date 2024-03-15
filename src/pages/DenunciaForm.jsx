import React, { useEffect, useState } from "react";
import SeccionHecho from "../components/denuncia";
import { Agresor, Denunciante, Testigo, Victima } from "../components/Actores";
import { MostrarDenuncias } from "../components/Denuncias";
import { Preview } from "../components/Preview";
import { getUsuario } from "../api/registro.api.js";
import { denunciar } from "../api/denuncia.api";
import "../styles/formulario.css";
import "../styles/styles.css";
import "../styles/preview.css";

function DenunciaForm({ user }) {
  const [preview, setPreview] = useState(false);
  const [denunciante, setDenunciante] = useState({
    CI: "",
    Telefono: "",
    EC: "Soltero",
    Departamento: "La Paz",
    Zona: "Achachicala",
    Direccion: "",
    Nacionalidad: "Boliviano",
    Ocupacion: "Ama de Casa",
  });
  const [denuncia, setDenuncia] = useState({
    FechaHecho: "",
    HoraHecho: "",
    Lugar: "",
    Tipo: "Física",
    Descripcion: "",
    Frecuencia: "Primera vez",
  });
  const [victima, setVictima] = useState({
    Nombre: "",
    Apellido: "",
    Genero: "F",
    FechaNacimiento: "",
    CI: "",
    Telefono: "",
    EC: "Soltero",
    Departamento: "La Paz",
    Zona: "Achachicala",
    Direccion: "",
    Nacionalidad: "Boliviano",
    Ocupacion: "Ama de Casa",
    Ingresos: "Si",
    AsistenciaMedica: "No",
    NivelEducativo: "Si",
  });
  const [agresor, setAgresor] = useState({
    Nombre: "",
    Apellido: "",
    Genero: "F",
    FechaNacimiento: "",
    CI: "",
    Telefono: "",
    EC: "Soltero",
    Departamento: "La Paz",
    Zona: "Achachicala",
    Direccion: "",
    Nacionalidad: "Boliviano",
    Ocupacion: "Ama de Casa",
    Descripcion: "",
    RelacionVictima: "",
  });
  const [testigos, setTestigos] = useState([]);
  const generos = { M: "Masculino", F: "Femenino", N: "No Binario" };

  const fetchData = async () => {
    const { data } = await getUsuario(user.Id);
    setDenunciante({
      ...denunciante,
      Nombre: data.Nombre,
      Apellido: data.Apellido,
      FechaNacimiento: data.FechaNacimiento,
      Genero: generos[data.Genero],
    });
  };

  useEffect(() => {
    if (user.Id !== 0) {
      fetchData();
    }
  }, []);

  const [esVictima, setEsVictima] = useState(true);
  const [conoceAgresor, setConoceAgresor] = useState(false);
  const [viveAgresor, setViveAgresor] = useState("");

  useEffect(() => {
    setVictima(esVictima ? { ...victima, ...denunciante } : victima);
  }, [esVictima])

  const [nivelEducativo, setNivelEducativo] = useState("Analfabeto");
  const [educacionP, setEducacionP] = useState("");
  const [educacionS, setEducacionS] = useState("");
  const [educacionT, setEducacionT] = useState("");

  const [reservaIdentidad, setReservaIdentidad] = useState("No");
  const handleEsVictimaChange = (e) => {
    setEsVictima(e.target.value === "Si");
  };
  const handleReservaIdentidadChange = (e) => {
    setReservaIdentidad(e.target.value);
  };
  const handleConoceAgresorChange = (e) => {
    setConoceAgresor(e.target.checked);
  };

  const handleViveAgresorChange = (e) => {
    setViveAgresor(e.target.checked);
  };

  const agregarTestigo = () => {
    const testigo = {
      Nombre: "",
      Apellido: "",
      Genero: "F",
      FechaNacimiento: "",
      CI: "",
      Telefono: "",
      EC: "Soltero",
      Departamento: "La Paz",
      Zona: "Achachicala",
      Direccion: "",
      Nacionalidad: "Boliviano",
      Ocupacion: "Ama de Casa",
      Testimonio: "",
    };
    setTestigos([...testigos, testigo]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.Id != 0) {
        const data = {
          ...denuncia,
          id: user.Id,
          victima: [esVictima ? { ...victima, ...denunciante } : victima],
          testigo: testigos,
          agresor: [agresor],
        };
        const res = await denunciar(data);
        console.log(res);
        setDenuncia({
          FechaHecho: "",
          HoraHecho: "",
          Lugar: "",
          Tipo: "Física",
          Descripcion: "",
          Frecuencia: "Primera vez",
        });
        setVictima({
          Nombre: "",
          Apellido: "",
          Genero: "F",
          FechaNacimiento: "",
          CI: "",
          Telefono: "",
          EC: "Soltero",
          Departamento: "La Paz",
          Zona: "Achachicala",
          Direccion: "",
          Nacionalidad: "Boliviano",
          Ocupacion: "Ama de Casa",
          Ingresos: "Si",
          AsistenciaMedica: "No",
          NivelEducativo: "Si",
        });
        setAgresor({
          Nombre: "",
          Apellido: "",
          Genero: "F",
          FechaNacimiento: "",
          CI: "",
          Telefono: "",
          EC: "Soltero",
          Departamento: "La Paz",
          Zona: "Achachicala",
          Direccion: "",
          Nacionalidad: "Boliviano",
          Ocupacion: "Ama de Casa",
          Descripcion: "",
          RelacionVictima: "",
        });
        setTestigos([]);
      }
    } catch (e) {
      alert("Llene todos los campos");
    }
  };

  return (
    <div className="body">
      {!preview && (
        <>
        <div className="formulario-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setVictima(esVictima ? { ...victima, ...denunciante } : victima);
              setPreview(!preview);
            }}
          >
            <Denunciante user={user} actor={denunciante} set={setDenunciante} />
            <div className="label-input-group3">
              <div className="input-group">
                <label>Pide reservar su identidad:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="reservaIdentidad"
                      value="Si"
                      checked={reservaIdentidad === "Si"}
                      onChange={handleReservaIdentidadChange}
                    />
                    Sí
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="reservaIdentidad"
                      value="No"
                      checked={reservaIdentidad === "No"}
                      onChange={handleReservaIdentidadChange}
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label>¿Usted es la víctima?</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="esVictima"
                      value="Si"
                      checked={esVictima}
                      onChange={handleEsVictimaChange}
                    />
                    Sí
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="esVictima"
                      value="No"
                      checked={!esVictima}
                      onChange={handleEsVictimaChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            <div>
              <div className="input-group">
                <SeccionHecho denuncia={denuncia} set={setDenuncia} />
                <div className="radio-group">
                  <label>¿Conoce al agresor?</label>
                  <input
                    type="checkbox"
                    name="conoceAgresor"
                    checked={conoceAgresor}
                    onChange={handleConoceAgresorChange}
                  />
                  <label id="spf">(Marcar en caso de "Si")</label>
                </div>
              </div>
              {!esVictima && (
                <div className="input-group">
                  <Victima actor={victima} set={setVictima} />
                  <div className="label-input-group3">
                    {conoceAgresor && esVictima === false && (
                      <div className="input-group">
                        <label>¿Convive con el AGRESOR?</label>
                        <div className="radio-group">
                          <label>
                            <input
                              type="radio"
                              name="viveAgresor"
                              value="Si"
                              checked={viveAgresor}
                              onChange={handleViveAgresorChange}
                            />
                            Sí
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="viveAgresor"
                              value="No"
                              checked={!viveAgresor}
                              onChange={handleViveAgresorChange}
                            />
                            No
                          </label>
                        </div>
                      </div>
                    )}
                    <div className="input-group">
                      <label>Nivel Educativo</label>
                      <div className="radio-group">
                        <label>Analfabeto/a:</label>
                        <label>
                          <input
                            type="radio"
                            name="nivelEducativo"
                            value="Analfabeto"
                            checked={nivelEducativo === "Analfabeto"}
                            onChange={(e) => setNivelEducativo(e.target.value)}
                          />
                          SI
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="nivelEducativo"
                            value="No"
                            checked={nivelEducativo === "No"}
                            onChange={(e) => setNivelEducativo(e.target.value)}
                          />
                          NO
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="label-input-group3">
                    {nivelEducativo === "No" && (
                      <div className="input-group">
                        <label>Primaria:</label>
                        <select
                          name="nivelEducacion"
                          value={educacionP}
                          onChange={(e) => setEducacionP(e.target.value)}
                        >
                          <option value="Primaria incompleta">
                            Incompleta
                          </option>
                          <option value="Primaria completa">Completa</option>
                        </select>
                      </div>
                    )}
                    {nivelEducativo === "No" && (
                      <div className="input-group">
                        <label>Secundaria:</label>
                        <select
                          name="nivelEducacion"
                          value={educacionS}
                          onChange={(e) => setEducacionS(e.target.value)}
                        >
                          <option value="Secundaria incompleta">
                            Incompleta
                          </option>
                          <option value="Secundaria completa">Completa</option>
                        </select>
                      </div>
                    )}
                    {nivelEducativo === "No" && (
                      <div className="input-group">
                        <label>Terciaria/universitaria:</label>
                        <select
                          name="nivelEducacion"
                          value={educacionT}
                          onChange={(e) => setEducacionT(e.target.value)}
                        >
                          <option value="Terciaria incompleta">
                            Incompleta
                          </option>
                          <option value="Terciaria completa">Completa</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="input-group">
              <Agresor actor={agresor} set={setAgresor} />
              <div className="radio-group">
                <label>
                  Tiene antecedentes penales o causas penales en trámite?
                </label>
                <label>
                  <input
                    type="radio"
                    name="antecedentesP"
                    value="antecedentesP"
                    checked={nivelEducativo === "Analfabeto"}
                    onChange={(e) => setNivelEducativo(e.target.value)}
                  />
                  SI
                </label>
                <label>
                  <input
                    type="radio"
                    name="nivelEducativo"
                    value="No"
                    checked={nivelEducativo === "No"}
                    onChange={(e) => setNivelEducativo(e.target.value)}
                  />
                  NO
                </label>
              </div>
            </div>
            <div className="input-group">
              <div className="datosExtra">
                <label>Descripcion del agresor:</label>
                <textarea
                  name="varName"
                  value={agresor.Descripcion}
                  onChange={(e) =>
                    setAgresor({ ...agresor, Descripcion: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="buttn" type="button" onClick={agregarTestigo}>
              Agregar Testigo
            </button>
            {testigos.map((testigo, index) => (
              <Testigo
                key={index}
                testigo={testigo}
                testigos={testigos}
                set={setTestigos}
                n={index}
              />
            ))}
            <button className="buttn" type="submit">
              Enviar Denuncia
            </button>
          </form>
        </div>
        {user.Tipo !== "Usuario" && <MostrarDenuncias />}
        </>
      )}
      {preview && (
        <div className="previewWindow">
          <div className="previewDenuncia">
            <p>
              <b>Fecha del Hecho:</b> {denuncia.FechaHecho} -{" "}
              {denuncia.HoraHecho}{" "}
            </p>
            <p>
              <b>Lugar:</b> {denuncia.Lugar}{" "}
            </p>
            <p>
              <b>Frecuencia:</b> {denuncia.Frecuencia}{" "}
            </p>
            <p>
              <b>Tipo:</b> {denuncia.Tipo}{" "}
            </p>
            <p>
              <b>Descripcion del Hecho:</b> {denuncia.Descripcion}{" "}
            </p>
          </div>
          <div className="previewActores">
            <Preview titulo={"Denunciante"} actor={denunciante} />
            <Preview titulo={"Victima"} actor={victima} />
            <Preview titulo={"Agresor"} actor={agresor} />
            {testigos.map((testigo, index) => (
              <Preview
                key={index}
                titulo={`Testigo #${index + 1}`}
                actor={testigo}
              />
            ))}
          </div>
          <div className="previewBotons">
            <button
              className="previewBoton"
              onClick={() => setPreview(!preview)}
            >
              Volver
            </button>
            <button className="previewBoton" onClick={onSubmit}>Confirmar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DenunciaForm;
