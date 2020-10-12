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
        data.poverty= +data.poverty;
        data.obesity= +data.obesity;
        data.income= +data.income;
        data.healthcare= +data.healthcare;
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
    .text("Lacks Healthcare (%");

//income vs healthcare --- end


}).catch(function(error) {
    console.log(error);
});
































//challenge section --- start

var svgWidth_c = 800;
var svgHeight_c = 600;


var margin_c = {
    top: 50,
    right: 50,
    bottom: 100,
    left: 100
};

var height_c = svgHeight_c - margin_c.top - margin_c.bottom;
var width_c = svgWidth_c - margin_c.left - margin_c.right;

// append svg3
var svg3 = d3.select('#scatter')
    .append('svg')
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//append chartgroup3
var chartGroup3 = svg3.append('g')
    .attr("transform", `translate(${margin_c.left}, ${margin_c.top})`);  

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "smokes";

// function used for updating x-scale var upon click on axis label
function xLinearScale(data, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]),
        d3.max(dataa, d => d[chosenXAxis])
      ])
      .range([0, width_c]);
  
    return xLinearScale;
  
  }

function yLinearScale(data, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenYAxis]),
        d3.max(data, d => d[chosenYAxis])
      ])
      .range([height_c, 0]);
  
    return yLinearScale;
  
  }

// function used for updating xAxis or yAxis var upon click on axis label
function renderAxes_x(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

function renderAxes_y(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]))
  
    return circlesGroup;
  }

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, chosenYAxis,circlesGroup) {

//     var xLabel;
//     var yLabel;
  
//     if (chosenXAxis === "poverty") {
//       xLabel = "Poverty (%):";
//     }

//     else if (chosenXAxis === "income") {
//         xLabel = "Income (Medium):";
//       }
  
//     else {
//       xLabel = "Age (Medium):";
//     }

//     if (chosenYAxis === "smokes") {
//         yLabel = "Smoke (%):";
//       }
  
//       else if (chosenYAxis === "obesity") {
//           yLabel = "Obesity (%):";
//         }
    
//       else {
//         yLabel = "Lacks Healthcare (%):";
//       }

//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.abbr}
//                 <br>${xLabel} ${d[chosenXAxis]}
//                 <br>${yLabel} ${d[chosenYAxis]}`);
//       });
      

    
//     circlesGroup.call(toolTip);
  
//     circlesGroup.on("mouseover", function(data) {
//       toolTip.show(data);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });
  
//     return circlesGroup;
//   }

// Retrieve data from the CSV file and execute everything below
d3.csv('assets/data/data.csv').then(function(data,err){
    if (err) throw err;

    //formating data
    data.forEach(function(data){
        data.income = +data.income;
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
    });


    //xScale
    var xScale =d3.scaleLinear()
        .domain([d3.extent(data,d=>d.poverty)[0]-1,d3.extent(data,d=>d.poverty)[1]])
        .range([0,width_c]);
    //yScale
    var yScale =d3.scaleLinear()
        .domain([d3.extent(data,d=>d.smokes)[0]-1,d3.extent(data,d=>d.smokes)[1]])
        .range([height_c,0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);


    // append x axis
    var xAxis = chartGroup3.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height_c})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup3.append("g")
        .call(leftAxis);    

    // append initial circles
    var circlesGroup = chartGroup3.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", "10")
        .attr("fill", "orange")
        .attr('stroke','black')
        .attr("cx", d => xScale(d[chosenXAxis]))
        .attr("cy", d => yScale(d[chosenYAxis]))
        .attr('text',d => d.state);

    // // append initial labels
    // var circlesLabelGroup = chartGroup3.selectAll('text')
    //     .data(data)
    //     .enter()
    //     .append('text')
    //     .attr('fill','black')
    //     .attr("font-size", "10px")
    //     .style("text-anchor", "middle")
    //     .attr("x", d => xScale(d[chosenXAxis]))
    //     .attr("y", d => yScale(d[chosenYAxis]-0.1))
    //     .attr('text',d=>d.state)
    //     .text(d => d.abbr);
    // console.log(data);


      // Create group for two x-axis labels
    var xlabelsGroup = chartGroup3.append("g")
        .attr("transform", `translate(${width_c / 2}, ${height_c + 20})`);

    var povertyLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty") // value to grab for event listener
        .classed("active", true)
        .text("Poverty (%)");

    var incomeLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "income") // value to grab for event listener
        .classed("inactive", true)
        .text("Income (Medium)");

    var ageLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "age") // value to grab for event listener
        .classed("inactive", true)
        .text("Age (Medium)");

    var ylabelsGroup = chartGroup3.append("g")
        .attr("transform", `translate(0,0)`);

    var smokeLabel = ylabelsGroup.append("text") 
        .attr("x", (-height_c/2))    
        .attr("y", -(margin_c.top/2.2))
        .attr("value", "smoke") // value to grab for event listener
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .classed("active", true)
        .text("Smoke (%)");

    var obesityLabel = ylabelsGroup.append("text") 
        .attr("x", (-height_c/2))    
        .attr("y", -(margin_c.top/2.2+20))
        .attr("value", "obesitye") // value to grab for event listener
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .classed("inactive", true)
        .text("Obesity (%)");

    var healthcareLabel = ylabelsGroup.append("text") 
        .attr("x", (-height_c/2))    
        .attr("y", -(margin_c.top/2.2+40))
        .attr("value", "healthcare") // value to grab for event listener
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .classed("inactive", true)
        .text("Lacks Healthcare (%)");


//// updateToolTip function above csv import
////////*************** */


//  // x axis labels event listener
//     xlabelsGroup.selectAll("text")
//     .on("click", function() {
//     // get value of selection
//     var value = d3.select(this).attr("value");
//     if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;
//         //chosenYAxis = d3.select(ylabelsGroup.value)
//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xLinearScale(data, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes_x(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

//         // updates tooltips with new info
//         //circlesGroup = updateToolTip(chosenXAxis, chosenYAxis,circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "poverty") {
//             povertyLabel
//                 .classed("active", true)
//                 .classed("inactive", false);
//             incomeLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             ageLabel
//                 .classed("active", false)
//                 .classed("inactive", true);

//             }
//         else if (chosenXAxis === "income") {
//             povertyLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             incomeLabel
//                 .classed("active", true)
//                 .classed("inactive", false);
//             ageLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             }
//         else {
//             povertyLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             incomeLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             ageLabel
//                 .classed("active", true)
//                 .classed("inactive", false);
//             }
//     }});

//  // y axis labels event listener
//     ylabelsGroup.selectAll("text")
//     .on("click", function() {
//     // get value of selection
//     var value = d3.select(this).attr("value");
//     if (value !== chosenYAxis) {

//         // replaces chosenXAxis with value
//         chosenYAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         yLinearScale = yScale(data, chosenYAxis);

//         // updates x axis with transition
//         yAxis = renderAxes_y(yScale, yAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xScale, chosenXAxis ,yScale, chosenYAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, chosenYAxis,circlesGroup);

//         // changes classes to change bold text
//         if (chosenYAxis === "smoke") {
//             smokeLabel
//                 .classed("active", true)
//                 .classed("inactive", false);
//             healthcareLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             obesityLabel
//                 .classed("active", false)
//                 .classed("inactive", true);

//             }
//         else if (chosenYAxis === "healthcare") {
//             smokeLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             healthcareLabel
//                 .classed("active", true)
//                 .classed("inactive", false);
//             obesityLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             }
//         else {
//             smokeLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             healthcareLabel
//                 .classed("active", false)
//                 .classed("inactive", true);
//             obesityLabel
//                 .classed("active", true)
//                 .classed("inactive", false);
//             }
//     }});










}).catch(function(error) {
    console.log(error);
});
  