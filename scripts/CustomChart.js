// Set the dimensions of the canvas / graph
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 1200 - margin.left - margin.right,
	height = 220 - margin.top - margin.bottom;



/*
var aspect = width / height,
    chart = d3.select('#snctnGrph');
d3.select(window)
  .on("resize", function() {
    var targetWidth = chart.node().getBoundingClientRect().width;
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
  });	*/




// Parse the date / time
var	parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges

//var	x = d3.timeFormat().scale().range([0, width]);
var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);

// Define the axes
var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(5);
	/*.style("text-anchor", "middle"),
    .text("Year")*/

var	yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(5);

// Define the line
var	valueline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });
    
// Adds the svg canvas
var	chart2 = d3.select("#snctnGrph")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
// Get the data
var data=[];
d3.csv("./scripts/data-2.csv", function(error, dataOrg) {
	dataOrg.forEach(function(d) {
		if(d.date){
			d.date = parseDate(d.date);
			d.close = +d.close;
			data.push(d);
		}	
	});

	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.close; })]);

	// Add the valueline path.
	chart2.append("path")
		//.attr("class", "line")
		.attr("class", "x-hover-line hover-line")
		.attr("d", valueline(data))
	// Add the X Axis

	chart2.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// Add the Y Axis
	chart2.append("g")
		.attr("class", "y axis")
		.call(yAxis);

});
