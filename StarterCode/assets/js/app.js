// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.right - margin.left;

var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function (stateData) {
    console.log(stateData);
    stateData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.poverty)])
    .range([0, width]);

var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);

var bottomAxis = d3.axisBottom(xLinearScale)

var leftAxis = d3.axisLeft(yLinearScale)

chartGroup.append("g")
    .call(leftAxis);

chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)

var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("r", "17")
    .attr("fill", "green")
    .attr("opacity", ".4")

var circlesText = chartGroup.selectAll(".stateText")
    .data(stateData)
    .enter()
    .append("text")
    .classed ("stateText", true)
    .text(d => d.abbr)
    .attr("dx", d => xLinearScale(d.poverty))
    .attr("dy", d => yLinearScale(d.healthcare))
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .attr("fill", "white");

var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
        return (`<h4> ${d.state}: </h4> <br> Healthcare: ${d.healthcare} <br> Poverty: ${d.poverty}`);
    });

chartGroup.call(toolTip);

circlesGroup.on("mouseover", function (data) {
    toolTip.show(data, this);
})

    .on("mouseout", function (data, index) {
        toolTip.hide(data);
    });

chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (height / 2))
    .attr("y", 0 - margin.left + 40)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .style("font", "20px sans-serif")
    .text("Lacks Healthcare (%)");

chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
    .attr("class", "axisText")
    .style("font", "20px sans-serif")
    .text("In Poverty (%)");
});