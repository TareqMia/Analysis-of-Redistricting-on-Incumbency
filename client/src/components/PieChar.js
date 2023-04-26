import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data, width = 300, height = 300 }) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    if (data && d3Ref.current) {
      // Remove any existing chart
      d3.select(d3Ref.current).selectAll("*").remove();

      // Set up the color scale
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // Set up the pie layout
      const pie = d3
        .pie()
        .value((d) => d.value)
        .sort(null);

      // Set up the arc generator
      const radius = Math.min(width, height) / 2;
      const arc = d3.arc().innerRadius(100).outerRadius(radius);

      // Create the SVG element
      const svg = d3
        .select(d3Ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Create a group to center the pie chart
      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .attr('filter', 'url(#drop-shadow)');
      // Create the chart
      g.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.label));

        svg.append('g')
        .attr('class', 'legend')
          .selectAll('text')
          .data(pie(data))
            .enter()
              .append('text')
              .attr("transform", function(d,i){
                return "translate(" + 65 + "," + (i * 2 + 70) + ")"; // place each legend on the right and bump each one down 15 pixels
              })
                .text(function(d) { return '• ' + d.data.label; })
                .attr('fill', function(d) { return color(d.data.label); })
                .attr('y', function(d, i) { return 20 * (i + 1); })
      
    }
  }, [data]);

  return <div ref={d3Ref} />;
};

export default PieChart;
