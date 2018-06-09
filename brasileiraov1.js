teamData = []

var canvasValues = d3.select("#Values")
var canvasDesc = d3.select("#Desc")

var margin = {top:50, bottom:50, left:50, right:50}
var widthValues = Values.width.baseVal.value - margin.left - margin.right
var heightValues = Values.height.baseVal.value - margin.bottom - margin.top

var xScaleValues = d3.scaleLinear()
                     .domain([0, charQuant])
	                   .range([margin.left , widthValues]);

var yScaleValues= d3.scaleLinear()
                    .domain([0, charQuant])
	                  .range([heightValues , margin.top]);

d3.csv("brasileirao.csv", function(csv) {
  teamData = csv
});
