// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var vvgHeight = 620;

var margin = {
    top:20,
    right: 40,
    bottom: 200,
    left: 100
};

var width = svgWidth - margin.right - margin.left;

var height = svgHeight - margin.top - margin.bottom;

var svg = svg = d3.select("scatter")
    .append("svg")
    .attr("width", "svgWidth")
    .attr("height", "svgHeight");

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function (stateData) {
    console.log(stateData);
    stateData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    })})