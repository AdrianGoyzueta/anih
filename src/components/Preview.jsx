export function Preview({ titulo, actor }) {
  const generos = { M: "Masculino", F: "Femenino", N: "No Binario" };

  return (
    <div className="previewActor">
      <h3>{titulo}</h3>
      <p>
        <b>Nombre:</b> {actor.Nombre}
      </p>
      <p>
        <b>Apellido:</b> {actor.Apellido}
      </p>
      <p>
        <b>CI:</b> {actor.CI}
      </p>
      <p>
        <b>Genero:</b> {generos[actor.Genero]}
      </p>
      <p>
        <b>Departamento:</b> {actor.Departamento}
      </p>
      <p>
        <b>Zona:</b> {actor.Zona}
      </p>
      <p>
        <b>Telefono:</b> {actor.Telefono}
      </p>
      <p>
        <b>Estado Civil:</b> {actor.EC}
      </p>
      <p>
        <b>Fecha de Nacimiento:</b> {actor.FechaNacimiento}
      </p>
      <p>
        <b>Ocupacion:</b> {actor.Ocupacion}
      </p>
      <p>
        <b>Nacionalidad:</b> {actor.Nacionalidad}
      </p>
    </div>
  );
}
