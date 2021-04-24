import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [citas, setcitas] = useState(citasIniciales);

  const guardarcita = (cita) => {
    setcitas([...citas, cita]);
  };

  const eliminarcita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setcitas(nuevasCitas);
  };

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  return (
    <div className="App">
      <h1>Citas Veterinaria</h1>
      <div className="container">
        <div className="row">
          <center>
            <div className="one-half column">
              {" "}
              <Formulario guardarcita={guardarcita} />
            </div>
            <div className="one-half column">
              {citas.length === 0 ? (
                <h2>No hay citas</h2>
              ) : (
                <h2>Administra tus citas</h2>
              )}
              {citas.map((cita) => (
                <Cita key={cita.id} cita={cita} eliminarcita={eliminarcita} />
              ))}
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}

export default App;
