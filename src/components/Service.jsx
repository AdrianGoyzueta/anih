import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { cantidadLogs, estadisticaDenuncias } from "../api/principal.api";

const Dash = ({ api }) => {

  const chartRef = useRef(null); // Ref para el elemento de la gráfica

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const logs = async () => {
      const data = await api();

      if (chartRef.current) {
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }

        data.data.datasets[0].backgroundColor = "rgba(75, 192, 192, 0.2)";
        data.data.datasets[0].borderColor = "rgba(75, 192, 192, 1)";
        data.data.datasets[0].borderWidth = 1;

        const ctx = chartRef.current.getContext("2d");
        chartRef.current.chart = new Chart(ctx, {
          type: "bar",
          data: data.data,
          options,
        });
      }
    };

    logs();
  });

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card bg-light p-3">
          <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

const Service = () => {

  return (
    <div>
      <section id="services" className="services section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header text-center pb-5">
                <h2>Estadísticas de Violencia</h2>
                <p>Estadísticas de casos de violencia en los últimos años.</p>
              </div>
            </div>
          </div>
          <Dash api={cantidadLogs} />
          <Dash api={estadisticaDenuncias} />
        </div>
      </section>
    </div>
  );
};

export default Service;
