import React, { useEffect } from "react";
import * as d3 from "d3";

const BoxAndWhiskersPlot = ({ data }) => {
  const svgRef = React.useRef();

  useEffect(() => {
    if (data) {
      renderPlot();
    }
  }, [data]);

  const renderPlot = () => {
    const svg = d3.select(svgRef.current);

    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Create the scale functions for x and y axes
    const x = d3
      .scaleBand()
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    // Set the domains for the scales
    x.domain(data.map((d) => d.group));
    y.domain([0, d3.max(data, (d) => d.max)]);

    // Create the x-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(d3.axisBottom(x));

    // Create the y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y));

    // Create the box and whiskers plot
    const plot = svg
      .selectAll(".box")
      .data(data)
      .enter()
      .append("g")
      .attr(
        "transform",
        (d) => `translate(${x(d.group) + margin.left},${margin.top})`
      );

    // Draw the min-max line (whiskers)
    plot
      .append("line")
      .attr("x1", x.bandwidth() / 2)
      .attr("x2", x.bandwidth() / 2)
      .attr("y1", (d) => y(d.min))
      .attr("y2", (d) => y(d.max))
      .attr("stroke", "black");

    // Draw the box
    plot
      .append("rect")
      .attr("x", 0)
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.q3))
      .attr("height", (d) => y(d.q1) - y(d.q3))
      .attr("stroke", "black")
      .attr("fill", "#69b3a2");

    // Draw the median line
    plot
      .append("line")
      .attr("x1", 0)
      .attr("x2", x.bandwidth())
      .attr("y1", (d) => y(d.median))
      .attr("y2", (d) => y(d.median))
      .attr("stroke", "black");
  };

  return (
    <svg
      ref={svgRef}
      width={400}
      height={200}
      style={{ border: "1px solid lightgray", marginBottom: "1rem" }}
    ></svg>
  );
};

export default BoxAndWhiskersPlot;
