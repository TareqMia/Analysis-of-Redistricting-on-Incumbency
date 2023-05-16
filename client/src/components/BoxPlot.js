import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BoxPlot = ({ data, scale }) => {
  const series = [
    {
      name: "box",
      type: "boxPlot",
      data: data.map((d) => ({
        x: `${d.district}`,
        y: d.quartiles,
      })),
    },
    {
      name: "2022",
      type: "scatter",
      data: data.map((d) => ({
        x: `${d.district}`,
        y: [parseFloat(d["2022"])],
      })),
    },
  ];

  const options = {
    chart: {
      type: "boxPlot",
      height: 350,
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
    },
    colors: ["#008FFB", "#FEB019"],
    xaxis: {
      type: "category",
    },
    grid: {
      borderColor: "#999",
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "#3C90EB",
          lower: "#3C90EB",
        },
      },
    },
    yaxis: {
      min: 0,
      max: scale,
      title: {
        text: "Value",
      },
    },
    title: {
      text: "District BoxPlot",
      align: "left",
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="boxPlot"
        height={450}
      />
    </div>
  );
};

export default BoxPlot;
