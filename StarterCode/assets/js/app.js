// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 620;

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

var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.poverty)])
    .range([height, 0]);

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(stateData, d=> d.healthcare)])
.range([height, 0]);

var bottomAxis = d3.axisBottom(xLinearScale)

var leftAxis = d3 axisLeft(yLinearScale)

chartGroup.append("g")
    call(leftAxis);

chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)

    