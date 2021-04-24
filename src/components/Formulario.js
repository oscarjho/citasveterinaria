import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ guardarcita }) => {
  // Crear state de citas
  const [cita, setcita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, seterror] = useState(false);

  const setstate = (e) => {
    setcita({ ...cita, [e.target.name]: e.target.value });
  };

  // Get values from state
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona agregar cita
  const submitCita = (e) => {
    e.preventDefault();

    // Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      seterror(true);
      return;
    }

    //Eliminar el mensaje previo una vez pasa la validación
    seterror(false);

    // Asignar ID
    cita.id = uuid();

    // Crear la cita
    guardarcita(cita);

    // Reiniciar el form
    setcita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <div className="Formulario">
      <h2>Crear Cita</h2>

      {error ? <p className="alerta-error"> Hay un error </p> : null}

      <form onSubmit={submitCita}>
        <label>Nombre de la mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          onChange={setstate}
          value={mascota}
        />
        <label>Nombre del dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la mascota"
          onChange={setstate}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={setstate}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={setstate}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={setstate}
          value={sintomas}
        >
          {" "}
        </textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </div>
  );
};

Formulario.propTypes = {
  guardarcita: PropTypes.func.isRequired,
};

export default Formulario;
