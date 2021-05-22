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
    })
})

var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.poverty)])
    .range([0, width]);

var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);

var bottomAxis = d3.axisBottom(xLinearScale)

var leftAxis = d3.axisLeft(yLinearScale)

chartGroup.append("g")
call(leftAxis);

chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)

var criclesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("r", "17")
    .attr("fill", "green")
    .attr("opacity", ".4")

var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([-8, 0])
    .html(function (d) {
        return (`{d.state} Healthcare: ${d.healthcare} Poverty: ${d.poverty}`);
    });

chartGroup.call(toolTip);

circlesGroup.on("click", function (data) {
    toolTip.show(data, this);
})

    .on("mouseut", function (data, index) {
        toolTip.hide(data);
    });

chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - (height / 2))
    .attr("y", 0 - margin.left + 50)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .style("font", "20px sans-serif")
    .text("Population w/out Healthcare");

chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
    .attr("class", "axisText")
    .style("font", "20px sans-serif")
    .text("Population Poverty");