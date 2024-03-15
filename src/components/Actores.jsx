import { useState } from "react";

const departamentos = [
  "La Paz",
  "El Alto",
  "Cochabamba",
  "Santa Cruz",
  "Oruro",
  "Tarija",
  "Chuquisaca",
  "Potosí",
  "Beni",
  "Pando",
];

const zonasPorDepartamento = {
  "La Paz": [
    "Achachicala",
    "Achumani",
    "Alto Obrajes",
    "Alto San Pedro",
    "Alto Tacagua",
    "Aranjuez",
    "Bolognia",
    "Calacoto",
    "Chasquipampa",
    "Cota Cota",
    "El Tejar",
    "Garita de Lima",
    "Irpavi",
    "Kantutani",
    "La Florida",
    "Los Pinos",
    "Mallasa",
    "Miraflores",
    "Obrajes",
    "Ovejuyo",
    "Pampahasi",
    "Pasankeri",
    "Periférica",
    "Pura Pura",
    "San Antonio",
    "San Jorge",
    "San Miguel",
    "San Pedro",
    "Sopocachi",
    "Següencoma",
    "Tembladerani",
    "Villa Copacabana",
    "Villa El Carmen",
    "Villa Fátima",
    "Villa Pabón",
    "Villa Salomé",
  ],
  "El Alto": [
    "Alto Lima",
    "Atalaya",
    "Ballivián",
    "Cala Cala",
    "Caluyo",
    "Ciudad Satélite",
    "Cupilupaca",
    "Faro Murillo",
    "Germán Busch",
    "Gran Poder",
    "Huayna Potosí",
    "Ingavi",
    "Illimani",
    "Kenko",
    "Kollpani",
    "La Ceja",
    "Luis Espinal Camps",
    "Mercedario",
    "Mururata",
    "Nuevos Horizontes",
    "Parcopata",
    "Pata Patani",
    "Puente Vela",
    "Río Seco",
    "Rosas Pampa",
    "Santa Isabel",
    "Santa Rosa",
    "Santiago I",
    "Santiago II",
    "Senkata",
    "Sol Naciente",
    "Tejada Rectangular",
    "Tejada Triangular",
    "Tejada Alpacoma",
    "Villa Adela",
    "Villa Alemania",
    'Villa Bolívar "A"',
    'Villa Bolívar "B"',
    'Villa Bolívar "C"',
    'Villa Bolívar "D"',
    'Villa Bolívar "E"',
    "Villa Cooperativa",
    "Villa Dolores",
    "Villa Exaltación",
    "Villa Ingenio",
    "Villa Ingavi",
    "Villa Pacajes",
    "Villa Santa Rosa",
    "1º de mayo",
    "12 de Octubre",
  ],
  Cochabamba: [
    "Alalay",
    "Aranjuez",
    "Cala Cala",
    "Colcapirhua",
    "Condebamba",
    "Coña Coña",
    "El Prado",
    "Hipódromo",
    "Jaihuayco",
    "Lamaica",
    "Lacma",
    "Las Cuadras",
    "La Chimba",
    "Mayorazgo",
    "Mesadilla",
    "Muyurina",
    "Noreste",
    "Noroeste",
    "Pairumani",
    "Queru Queru",
    "Quillacollo",
    "Sacaba",
    "Sarco",
    "Sarcobamba",
    "Sudeste",
    "Sudoeste",
    "Temporal Pampa",
    "Tiquipaya",
    "Tupuraya",
    "Valle Hermoso",
    "Villa Bush",
    "Vinto",
    "1ro de Mayo",
  ],
  "Santa Cruz": [
    "25 de Junio",
    "27 de Mayo",
    "5 de Noviembre",
    "6 de Junio",
    "Aeronautico",
    "California",
    "Casa Bella",
    "Casa Nova II",
    "Chino",
    "Covipal",
    "El Condado",
    "El Manchon",
    "El Periodista",
    "El Trigal",
    "Equipetrol",
    "Fé y Alegría",
    "Flamingo",
    "Florida",
    "Guadalupe",
    "Guaracachi",
    "Guaracal",
    "Hilanderia",
    "Irma Suarez",
    "La Purisima",
    "Lab",
    "Las Americas",
    "Las Pampita",
    "Lindo",
    "Los Batos",
    "Los Chiflados",
    "Los Cumpas",
    "Los Olivos",
    "Los Penocos",
    "Los Totaises Sur",
    "Los Vallecitos",
    "Madre India",
    "Nuevo Amanecer",
    "Ñuflo de Chavez",
    "Palma Real",
    "Panamericano",
    "Polanco",
    "Primavera",
    "Roca y Coronado",
    "Saguapac sur",
    "San Antonio",
    "San Carlos",
    "San Francisco",
    "San Javier",
    "San Jorge",
    "Santa Isabel",
    "Santa Rosa",
    "Santistevan",
    "Soberania",
    "Transportista",
    "Pahuchi",
    "Urbari",
    "Vistoria",
    "Plan 5000",
  ],
  Potosí: [
    "Cantumarca",
    "Ciudad Satélite",
    "Villa Venezuela",
    "Las Delicias",
    "Plan 40",
    "Casco Viejo Central",
    "San Benito",
    "San Gerardo",
    "Las Lecherías",
    "San Clemente",
    "San Bernardo",
    "San Pedro",
    "Villa Copacabana",
  ],
  Oruro: [
    "Jardín",
    "San Pedro",
    "San Isidro",
    "Caracollo",
    "Noreste",
    "Noroeste",
    "Urbanización Huajara",
    "Urbanización Plumas Andinos",
    "Zofro",
  ],
  Tarija: [
    "Zona Central",
    "Bermejo",
    "Yacuiba",
    "Villamontes",
    "Padcaya",
    "Entre Ríos",
    "Caraparí",
    "Villa Montes",
    "Padcaya",
    "San Lorenzo",
    "Uriondo",
    "Cercado",
    "Yunchará",
    "El Puente",
    "Chaguaya",
    "Catanza",
  ],
  Chuquisaca: [
    "Zona Central",
    "Yotala",
    "Yamparáez",
    "Camargo",
    "Villa Serrano",
    "Sucre",
    "Presto",
    "Tarabuco",
    "Padilla",
    "Mojos",
    "Tomina",
    "Icla",
    "San Lucas",
    "Alcalá",
    "Villa Abecia",
    "Villa Alcalá",
  ],
  Beni: [
    "Zona Central",
    "Trinidad",
    "Riberalta",
    "Guayaramerín",
    "Rurrenabaque",
    "San Borja",
    "Santa Ana del Yacuma",
    "San Ignacio",
    "San Andrés",
    "Magdalena",
    "Reyes",
    "Buenavista",
    "Loreto",
    "Santa Rosa",
    "Baures",
    "Huacaraje",
  ],
  Pando: [
    "Zona Central",
    "Cobija",
    "Porvenir",
    "Filadelfia",
    "Santa Rosa",
    "Bolpebra",
    "El Triángulo",
    "Villa Nueva",
    "San Lorenzo",
    "San Pedro",
    "Sena",
    "Nueva Esperanza",
    "Puerto Gonzalo Moreno",
    "Santos Mercado",
    "Bolivia",
    "Puerto El Triángulo",
  ],
};
const nacionalidades = [
  "Boliviano",
  "Argentino",
  "Peruano",
  "Brasileño",
  "Chileno",
  "Colombiano",
  "Ecuatoriano",
  "Paraguayo",
  "Uruguayo",
  "Venezolano",
  "Español",
  "Mexicano",
];
const ocupaciones = [
  "Ama de casa",
  "Estudiante",
  "Docente",
  "Abogado",
  "Médico",
  "Enfermero",
  "Ingeniero",
  "Cocinero",
  "Arquitecto",
  "Policía",
  "Bombero",
  "Empresario",
  "Carpintero",
  "Electricista",
  "Periodista",
  "Artista",
  "Agricultor",
  "Taxista",
  "Albañil",
  "Ninguno",
];

export function Denunciante({ actor, set }) {
  return (
    <div>
      <h2>Denunciante</h2>
      <hr />
      <div className="label-input-group">
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="nombre" defaultValue={actor.Nombre} />
        </div>
        <div className="input-group">
          <label>Apellidos:</label>
          <input type="text" name="apellidos" defaultValue={actor.Apellido} />
        </div>
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>CI:</label>
          <input
            type="number"
            value={actor.CI}
            onChange={(e) => set({ ...actor, CI: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Teléfono:</label>
          <input
            type="text"
            value={actor.Telefono}
            onChange={(e) => set({ ...actor, Telefono: e.target.value })}
          />
        </div>
      </div>
      <div className="label-input-group3">
        <div className="input-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNac"
            defaultValue={actor.FechaNacimiento}
          />
        </div>
        <div className="input-group">
          <label>Estado Civil:</label>
          <select
            name="estadoCivil"
            value={actor.EC}
            onChange={(e) => set({ ...actor, EC: e.target.value })}
          >
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Viudo">Viudo</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Separado">Separado</option>
          </select>
        </div>

        <div className="input-group">
          <label>Sexo:</label>
          <select name="sexo">
            <option value={actor.Genero}>{actor.Genero}</option>
          </select>
        </div>
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>Departamento:</label>
          <select
            name="departamento"
            value={actor.Departamento}
            onChange={(e) => set({ ...actor, Departamento: e.target.value })}
          >
            {departamentos.map((depto) => (
              <option key={depto} value={depto}>
                {depto}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Zona:</label>
          <select
            name="zona"
            value={actor.Zona}
            onChange={(e) => set({ ...actor, Zona: e.target.value })}
          >
            {zonasPorDepartamento[actor.Departamento] &&
              zonasPorDepartamento[actor.Departamento].map((zona) => (
                <option key={zona} value={zona}>
                  {zona}
                </option>
              ))}
            <option value="Otros">Otros</option>
          </select>
        </div>
        <div  width={"100%"}>
          <div className="input-group" width={"100%"}>
            <label>Dirección:</label>
            <input
              type="text"
              width={"100%"}
              value={actor.Direccion}
              onChange={(e) => set({ ...actor, Direccion: e.target.value })}
            />
          </div>
          {actor.Zona === "Otros" && (
            <div className="input-group">
              <label>Otra Zona:</label>
              <input type="text" name="zonaOtra" maxLength="80" size="60" />
            </div>
          )}
        </div>
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>Nacionalidad:</label>
          <select
            value={actor.Nacionalidad}
            onChange={(e) => set({ ...actor, Nacionalidad: e.target.value })}
          >
            {nacionalidades.map((nacionalidad, index) => (
              <option key={index} value={nacionalidad}>
                {nacionalidad}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Ocupación:</label>
          <select
            name="ocupacion"
            value={actor.Ocupacion}
            onChange={(e) => set({ ...actor, Ocupacion: e.target.value })}
          >
            {ocupaciones.map((ocupacion, index) => (
              <option key={index} value={ocupacion}>
                {ocupacion}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function Victima({ actor, set }) {
  return (
    <div>
      <h2>Victima</h2>
      <hr />
      <div className="label-input-group">
        <div className="input-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={actor.Nombre}
            onChange={(e) => set({ ...actor, Nombre: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            value={actor.Apellido}
            onChange={(e) => set({ ...actor, Apellido: e.target.value })}
          />
        </div>
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>CI:</label>
          <input
            type="number"
            value={actor.CI}
            onChange={(e) => set({ ...actor, CI: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Teléfono:</label>
          <input
            type="text"
            value={actor.Telefono}
            onChange={(e) => set({ ...actor, Telefono: e.target.value })}
          />
        </div>
      </div>
      <div className="label-input-group3">
        <div className="input-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNac"
            value={actor.FechaNacimiento}
            onChange={(e) => set({ ...actor, FechaNacimiento: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Estado Civil:</label>
          <select
            name="estadoCivil"
            value={actor.EC}
            onChange={(e) => set({ ...actor, EC: e.target.value })}
          >
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Viudo">Viudo</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Separado">Separado</option>
          </select>
        </div>

        <div className="input-group">
          <label>Sexo:</label>
          <select
            name="sexo"
            onChange={(e) => set({ ...actor, Genero: e.target.value[0] })}
          >
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="No Binario">No Binario</option>
          </select>
        </div>
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>Departamento:</label>
          <select
            name="departamento"
            value={actor.Departamento}
            onChange={(e) => set({ ...actor, Departamento: e.target.value })}
          >
            {departamentos.map((depto) => (
              <option key={depto} value={depto}>
                {depto}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Zona:</label>
          <select
            name="zona"
            value={actor.Zona}
            onChange={(e) => set({ ...actor, Zona: e.target.value })}
          >
            {zonasPorDepartamento[actor.Departamento] &&
              zonasPorDepartamento[actor.Departamento].map((zona) => (
                <option key={zona} value={zona}>
                  {zona}
                </option>
              ))}
            <option value="Otros">Otros</option>
          </select>
        </div>
        <div width={"100%"}>
          <div className="input-group" width={"100%"}>
            <label>Dirección:</label>
            <input
              type="text"
              width={"100%"}
              value={actor.Direccion}
              onChange={(e) => set({ ...actor, Direccion: e.target.value })}
            />
          </div>
          {actor.Zona === "Otros" && (
            <div className="input-group">
              <label>Otra Zona:</label>
              <input type="text" name="zonaOtra" maxLength="80" size="60" />
            </div>
          )}
        </div>
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>Nacionalidad:</label>
          <select
            value={actor.Nacionalidad}
            onChange={(e) => set({ ...actor, Nacionalidad: e.target.value })}
          >
            {nacionalidades.map((nacionalidad, index) => (
              <option key={index} value={nacionalidad}>
                {nacionalidad}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Ocupación:</label>
          <select
            name="ocupacion"
            value={actor.Ocupacion}
            onChange={(e) => set({ ...actor, Ocupacion: e.target.value })}
          >
            {ocupaciones.map((ocupacion, index) => (
              <option key={index} value={ocupacion}>
                {ocupacion}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function Agresor({ actor, set }) {
  return (
    <div>
      <h2>Agresor</h2>
      <hr />
      <div className="label-input-group">
        <div className="input-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={actor.Nombre}
            onChange={(e) => set({ ...actor, Nombre: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            value={actor.Apellido}
            onChange={(e) => set({ ...actor, Apellido: e.target.value })}
          />
        </div>
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>CI:</label>
          <input
            type="number"
            value={actor.CI}
            onChange={(e) => set({ ...actor, CI: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Teléfono:</label>
          <input
            type="text"
            value={actor.Telefono}
            onChange={(e) => set({ ...actor, Telefono: e.target.value })}
          />
        </div>
      </div>
      <div className="label-input-group3">
        <div className="input-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNac"
            value={actor.FechaNacimiento}
            onChange={(e) => set({ ...actor, FechaNacimiento: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Estado Civil:</label>
          <select
            name="estadoCivil"
            value={actor.EC}
            onChange={(e) => set({ ...actor, EC: e.target.value })}
          >
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Viudo">Viudo</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Separado">Separado</option>
          </select>
        </div>

        <div className="input-group">
          <label>Sexo:</label>
          <select
            name="sexo"
            onChange={(e) => set({ ...actor, Genero: e.target.value[0] })}
          >
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="No Binario">No Binario</option>
          </select>
        </div>
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>Departamento:</label>
          <select
            name="departamento"
            value={actor.Departamento}
            onChange={(e) => set({ ...actor, Departamento: e.target.value })}
          >
            {departamentos.map((depto) => (
              <option key={depto} value={depto}>
                {depto}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Zona:</label>
          <select
            name="zona"
            value={actor.Zona}
            onChange={(e) => set({ ...actor, Zona: e.target.value })}
          >
            {zonasPorDepartamento[actor.Departamento] &&
              zonasPorDepartamento[actor.Departamento].map((zona) => (
                <option key={zona} value={zona}>
                  {zona}
                </option>
              ))}
            <option value="Otros">Otros</option>
          </select>
        </div>
        <div width={"100%"}>
          <div className="input-group" width={"100%"}>
            <label>Dirección:</label>
            <input
              type="text"
              width={"100%"}
              value={actor.Direccion}
              onChange={(e) => set({ ...actor, Direccion: e.target.value })}
            />
          </div>
          {actor.Zona === "Otros" && (
            <div className="input-group">
              <label>Otra Zona:</label>
              <input type="text" name="zonaOtra" maxLength="80" size="60" />
            </div>
          )}
        </div>
      </div>
      <div className="label-input-group">
        <div className="input-group">
          <label>Nacionalidad:</label>
          <select
            value={actor.Nacionalidad}
            onChange={(e) => set({ ...actor, Nacionalidad: e.target.value })}
          >
            {nacionalidades.map((nacionalidad, index) => (
              <option key={index} value={nacionalidad}>
                {nacionalidad}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Ocupación:</label>
          <select
            name="ocupacion"
            value={actor.Ocupacion}
            onChange={(e) => set({ ...actor, Ocupacion: e.target.value })}
          >
            {ocupaciones.map((ocupacion, index) => (
              <option key={index} value={ocupacion}>
                {ocupacion}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function Testigo({ testigo, testigos, set, n }) {
  const [actor, setActor] = useState(testigo);

  return (
    <>
      <div>
        <h2>Testigo #{n + 1}</h2>
        <hr />
        <div className="label-input-group">
          <div className="input-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={actor.Nombre}
              onChange={(e) => {
                setActor({ ...actor, Nombre: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], Nombre: e.target.value };
                set(temp);
              }}
            />
          </div>
          <div className="input-group">
            <label>Apellidos:</label>
            <input
              type="text"
              name="apellidos"
              value={actor.Apellido}
              onChange={(e) => {
                setActor({ ...actor, Apellido: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], Apellido: e.target.value };
                set(temp);
              }}
            />
          </div>
        </div>
        <div className="label-input-group">
          <div className="input-group">
            <label>CI:</label>
            <input
              type="number"
              value={actor.CI}
              onChange={(e) => {
                setActor({ ...actor, CI: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], CI: e.target.value };
                set(temp);
              }}
            />
          </div>

          <div className="input-group">
            <label>Teléfono:</label>
            <input
              type="text"
              value={actor.Telefono}
              onChange={(e) => {
                setActor({ ...actor, Telefono: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], Telefono: e.target.value };
                set(temp);
              }}
            />
          </div>
        </div>
        <div className="label-input-group3">
          <div className="input-group">
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaNac"
              value={actor.FechaNacimiento}
              onChange={(e) => {
                setActor({ ...actor, FechaNacimiento: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], FechaNacimiento: e.target.value };
                set(temp);
              }}
            />
          </div>
          <div className="input-group">
            <label>Estado Civil:</label>
            <select
              name="estadoCivil"
              value={actor.EC}
              onChange={(e) => {
                setActor({ ...actor, EC: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], EC: e.target.value };
                set(temp);
              }}
            >
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Viudo">Viudo</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Separado">Separado</option>
            </select>
          </div>

          <div className="input-group">
            <label>Sexo:</label>
            <select
              name="sexo"
              onChange={(e) => {
                setActor({ ...actor, Genero: e.target.value[0] });
                const temp = [...testigos];
                temp[n] = { ...temp[n], Genero: e.target.value[0] };
                set(temp);
              }}
            >
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="No Binario">No Binario</option>
            </select>
          </div>
        </div>
        <div className="label-input-group">
          <div className="input-group">
            <label>Departamento:</label>
            <select
              name="departamento"
              value={actor.Departamento}
              onChange={(e) => {
                setActor({ ...actor, Departamento: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], Departamento: e.target.value };
                set(temp);
              }}
            >
              {departamentos.map((depto) => (
                <option key={depto} value={depto}>
                  {depto}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Zona:</label>
            <select
              name="zona"
              value={actor.Zona}
              onChange={(e) => {
                setActor({ ...actor, Zona: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], Zona: e.target.value };
                set(temp);
              }}
            >
              {zonasPorDepartamento[actor.Departamento] &&
                zonasPorDepartamento[actor.Departamento].map((zona) => (
                  <option key={zona} value={zona}>
                    {zona}
                  </option>
                ))}
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div width={"100%"}>
            <div className="input-group" width={"100%"}>
              <label>Dirección:</label>
              <input
                type="text"
                width={"100%"}
                value={actor.Direccion}
                onChange={(e) => {
                  setActor({ ...actor, Direccion: e.target.value });
                  const temp = [...testigos];
                  temp[n] = { ...temp[n], Direccion: e.target.value };
                  set(temp);
                }}
              />
            </div>
            {actor.Zona === "Otros" && (
              <div className="input-group">
                <label>Otra Zona:</label>
                <input type="text" name="zonaOtra" maxLength="80" size="60" />
              </div>
            )}
          </div>
        </div>
        <div className="label-input-group">
          <div className="input-group">
            <label>Nacionalidad:</label>
            <select
              value={actor.Nacionalidad}
              onChange={(e) => {
                setActor({ ...actor, Nacionalidad: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], Nacionalidad: e.target.value };
                set(temp);
              }}
            >
              {nacionalidades.map((nacionalidad, index) => (
                <option key={index} value={nacionalidad}>
                  {nacionalidad}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Ocupación:</label>
            <select
              name="ocupacion"
              value={actor.Ocupacion}
              onChange={(e) => {
                setActor({ ...actor, Ocupacion: e.target.value });
                const temp = [...testigos];
                temp[n] = { ...temp[n], Ocupacion: e.target.value };
                set(temp);
              }}
            >
              {ocupaciones.map((ocupacion, index) => (
                <option key={index} value={ocupacion}>
                  {ocupacion}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="datosExtra">
        <label>Testimonio:</label>
        <textarea
          value={actor.Testimonio}
          onChange={(e) => {
            setActor({ ...actor, Testimonio: e.target.value });
            const temp = [...testigos];
            temp[n] = { ...temp[n], Testimonio: e.target.value };
            set(temp);
          }}
        />
      </div>
    </>
  );
}
