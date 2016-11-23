import React, { PropTypes, Component } from 'react';
import * as d3 from 'd3'
import { sankey } from 'd3-sankey'
import '../styles/graph-style.css'

const margin = {top: 30, right: 50, bottom: 10, left: 30};
    const width = 900 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

export default class Graph extends Component {
  componentDidMount() {
    // append the svg sankey
    const svg = d3.select(this.svg)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3
      .scaleLinear()
      .domain([0, 29])
      .range([0, width]);

    // const xAxis = d3.axisBottom(xScale);
    // svg
    //  .append("g")
    //  .attr("transform", "translate(0,30)")
    //  .call(xAxis);

      const nodePosMap = this.props.nodes.reduce((result, node, i) => ({
        ...result,
        [node.nodeId]: i
      }), {})

      const links = this.props.links.map(link => ({
        ...link,
        source: nodePosMap[link.source],
        target: nodePosMap[link.target]
      }))
      .filter(link => link.source && link.target)
      .sort((a, b) => a.source - b.source)

      const nodes = [...this.props.nodes]

    const sankeyLayout = sankey()
        .nodes(nodes)
        .links(links)
        .nodeWidth(2)
        .nodePadding(45)
        .size([width, height])
        .layout(32);

  const path = sankeyLayout.link();

  // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        // .style("stroke-width", 5)
        .sort(function(a, b) { return b.dy - a.dy; });
  //
  // // add the link titles
    // link.append("title")
    //       .text(function(d) {
    //   		return d.source.name + " → " +
    //               d.target.name + "\n" + format(d.value); });
  //
  // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(nodes)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
  		  return "translate(" + d.x + "," + d.y + ")"; })
      // .call(d3.behavior.drag()
      //   .origin(function(d) { return d; })
      //   .on("dragstart", function() {
  		//   this.parentNode.appendChild(this); })
        // .on("drag", dragmove));
  //
  // // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d) { return d.dy; })
        .attr("width", 2)
        .style("fill", "#ddd")
        .style("opacity", 1)
      .append("title")
        .text(d => {
          return d.word
        })
  //
  // // add circles on top of the rectangles
    node.append("circle")
        .attr("cx", function(d) { return d.dx-1; })
        .attr("cy", 0)
        .attr("r", 3)
        .style("fill", function(d){
  	      	if (d.majority === "true") {
  	      		return "red";
  	      	} else {
  	      		return "#aaa";
  	      	}
        	})
        .style("opacity", 1);
  //
  // // add in the title for the nodes
    node.append("text")
        .attr("x", 0)
        .attr("y", function(d) { return -11; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("transform", null)
        .text(function(d) { return d.word; });
  //
  // // the function for moving the nodes
  //   function dragmove(d) {
  //     d3.select(this).attr("transform",
  //         "translate(" + d.x + "," + (
  //                 d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
  //             ) + ")");
  //     sankey.relayout();
  //     link.attr("d", path);
  //   }

  }

  render() {
    return (
      <div>
        <svg ref={(svg) => { this.svg = svg }}></svg>
      </div>
    );
  }
}

Graph.propTypes = {
};
