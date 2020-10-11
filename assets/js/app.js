// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 600;

var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

//svg height and width
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;



// append svg and svg2
var svg = d3.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

var svg2 = d3.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

// append chartGroup1 and chartGroup2
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup2 = svg2.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);  

//load data for scales usage
d3.csv('assets/data/data.csv').then(function(data){
    
    //formating data
    data.forEach(function(data){
        data.poverty=+data.poverty;
        data.obesity=+data.obesity;
        data.income=+data.income;
        data.healthcare=+data.healthcare;
    });
    
//poverty vs obesity --- start

    //xScale1
    var xScale1 =d3.scaleLinear()
        .domain([d3.extent(data,d=>d.poverty)[0]-1,d3.extent(data,d=>d.poverty)[1]])
        .range([0,width]);
    //yScale1
    var yScale1 =d3.scaleLinear()
        .domain([d3.extent(data,d=>d.obesity)[0]-1,d3.extent(data,d=>d.obesity)[1]])
        .range([height,0])
    
    //circle
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", "10")
        .attr("fill", "orange")
        .attr('stroke','black')
        .attr("cx", d => xScale1(d.poverty))
        .attr("cy", d => yScale1(d.obesity));

    //label
    var circlesLabelGroup = chartGroup.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x',d => xScale1(d.poverty))
        .attr('y',d=>yScale1(d.obesity)+4)
        .text(d => d.abbr)
        .attr('fill','black')
        .attr("font-size", "10px")
        .style("text-anchor", "middle");

    //axises
    var bottomAxis1=d3.axisBottom(xScale1);
    var leftAxis1=d3.axisLeft(yScale1);

    //add axises
    chartGroup.append("g")
        .attr('transform',`translate(0,${height})`)
        .call(bottomAxis1);
    chartGroup.append("g")
        .call(leftAxis1);
        
    
    //add chart label
    var xaxisLabelsGroup1 = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, 0)`);
  
    var xaxisLabel1 = xaxisLabelsGroup1.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left)
    .attr("y", height+30)
    .text("Poverty (%)");

    var yaxisLabelsGroup1 = chartGroup.append("g")
    .attr("transform", `translate(0, 0)`);
  
    var yaxisLabel1 = yaxisLabelsGroup1.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -(height/2)+margin.top)
    .text("Obesity (%)");

//poverty vs obesity --- end

//income vs healthcare --- start

    //xScale2
    var xScale2 =d3.scaleLinear()
    .domain([d3.extent(data,d=>d.poverty)[0]-1,d3.extent(data,d=>d.poverty)[1]])
    .range([0,width]);
    //yScale2
    var yScale2 =d3.scaleLinear()
    .domain([d3.extent(data,d=>d.healthcare)[0]-1,d3.extent(data,d=>d.healthcare)[1]])
    .range([height,0])

    //circle
    var circlesGroup = chartGroup2.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", "10")
    .attr("fill", "orange")
    .attr('stroke','black')
    .attr("cx", d => xScale2(d.poverty))
    .attr("cy", d => yScale2(d.healthcare));

    //label
    var circlesLabelGroup = chartGroup2.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x',d => xScale2(d.poverty))
    .attr('y',d=>yScale2(d.healthcare)+4)
    .text(d => d.abbr)
    .attr('fill','black')
    .attr("font-size", "10px")
    .style("text-anchor", "middle");

    //axises
    var bottomAxis2=d3.axisBottom(xScale2);
    var leftAxis2=d3.axisLeft(yScale2);

    //add axises
    chartGroup2.append("g")
    .attr('transform',`translate(0,${height})`)
    .call(bottomAxis2);
    chartGroup2.append("g")
    .call(leftAxis2);


    //add chart label
    var xaxisLabelsGroup2 = chartGroup2.append("g")
    .attr("transform", `translate(${width / 2}, 0)`);

    var xaxisLabel2 = xaxisLabelsGroup2.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left)
    .attr("y", height+30)
    .text("Poverty (%)");

    var yaxisLabelsGroup2 = chartGroup2.append("g")
    .attr("transform", `translate(0, 0)`);

    var yaxisLabel2 = yaxisLabelsGroup2.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -(height/2)+margin.top)
    .text("healthcare (%)");

//income vs healthcare --- end


}).catch(function(error) {
    console.log(error);
});
