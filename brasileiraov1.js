teamData = []

var canvasValues = d3.select("#Values")
var canvasDesc = d3.select("#Desc")

var margin = {top:50, bottom:50, left:60, right:60}
var widthValues = Values.width.baseVal.value - margin.left - margin.right
var heightValues = Values.height.baseVal.value - margin.bottom - margin.top


d3.csv("brasileirao.csv", function(csv) {
  teamData = csv

  teamPositions = []
  teamValue = []
  teamRelValue = []
  for (var i = 0; i < teamData.length; i++) {
    teamPositions.push(teamData[i].Pos)
    teamValue.push(teamData[i].Valor)
    teamRelValue.push(teamData[i].ValorRelativo)
  }
  maxValue = Math.max.apply(Math, teamValue)
  minValue = Math.min.apply(Math, teamValue)

  maxPositions = Math.max.apply(Math, teamPositions)
  minPositions = Math.min.apply(Math, teamPositions)

  maxRelValue= Math.max.apply(Math, teamRelValue)
  minRelValue = Math.min.apply(Math, teamRelValue)

  var xScaleValues = d3.scaleLinear()
                       .domain([minValue - 1000000, maxValue + 1000000])
  	                   .range([margin.left , widthValues]);

  var yScaleValues= d3.scaleLinear()
                      .domain([maxPositions, minPositions])
  	                  .range([heightValues, margin.top]);

  var xAxisValues  = d3.axisBottom(xScaleValues);

  canvasValues.append("g")
              .attr("class","xAxisValues")
              .attr("transform","translate(0," + heightValues  + ")")
              .call(xAxisValues);

  var yAxisValues  = d3.axisLeft(yScaleValues);

  canvasValues.append("g")
              .attr("class","yAxisValues")
              .attr("transform","translate("+ margin.left+",0)")
              .call(yAxisValues);

  var teamsGroup = canvasValues.append("g").attr("id", "teamsGroup")

  valuesPositions = []
  for (var i = 0; i < teamPositions.length; i++) {
    valuesPositions.push([teamValue[i], teamPositions[i]])
  }

  var teamsCircles = canvasValues.select("#teamsGroup").selectAll("circle").data(valuesPositions).enter()
                                 .append("circle")
                                 .attr("cx", function (d) { return xScaleValues(d[0]); })
                                 .attr("cy", function (d) { return yScaleValues(d[1]); })
                                 .attr("r", 6)
                                 .attr("stroke", "black")
                                 .attr("stroke-width", 0.5)
                                 .attr("opacity", 0.8)
                                 .attr("fill", "blue")
                                 .on("mouseover",function(d, index){
                                   canvasValues.append("text")
                                                .attr("x", xScaleValues(d[0]))
                                                .attr("y",yScaleValues(d[1]) - 8)
                                                .text(teamData[index].Equipe)
                                                .style("fill", "black")
                                                .attr("font-size", "16px")
                                                .style("text-anchor", "middle")
                                                .attr("id", "thisName")
                                                .attr("font-weight", "bold")
                                 })
                                 .on("mouseout",function(){
                                   d3.select("#thisName").remove();
                                 })

});
