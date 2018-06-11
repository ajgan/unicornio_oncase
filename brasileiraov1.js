teamData = []

var canvasValues = d3.select("#Values")
var canvasDesc = d3.select("#Desc")

var margin = {top:50, bottom:50, left:60, right:100}
var widthValues = Values.width.baseVal.value - margin.left - margin.right
var heightValues = Values.height.baseVal.value - margin.bottom - margin.top

var years = [0,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017]
var isChecked = [1,1,1,1,1,1,1,1,1,1,1]

var checkBoxCountour = canvasValues.append("rect")
                                    .attr("x", Values.width.baseVal.value - margin.right - margin.left + 25)
                                    .attr("y", margin.top + 5)
                                    .attr("width", 120)
                                    .attr("height", 205)
                                    .attr("stroke", "black")
                                    .attr("stroke-width", 1)
                                    .attr("fill", "transparent")

function updateIsChecked(index){

  if(index==0) {
    if (isChecked[0]==0) {
      canvasValues.select("#checkBoxGroup").selectAll('input').property('checked', true);
      for (var i = 0; i < isChecked.length; i++) {
        isChecked[i] = 1
      }
    }
    else {
      canvasValues.select("#checkBoxGroup").selectAll('input').property('checked', false);
      for (var i = 0; i < isChecked.length; i++) {
        isChecked[i] = 0
      }
    }
  }
  else{

    if (isChecked[index] == 0) isChecked[index] = 1

    else {
      isChecked[index] = 0
      isChecked[0] = 0
      canvasValues.select("#checkBoxGroup").select('input').property('checked', false);
    }

    cond = 1
    for (var i = 1; i < isChecked.length; i++) {
      if(isChecked[i] == 0) {
        isChecked[0] = 0
        cond = 0
        break
      }
    }

    if(cond==1){
      isChecked[0] = 1
      canvasValues.select("#checkBoxGroup").select('input').property('checked', true);
    }
  }

}
function updatePlot(){
  canvasValues.select("#teamsGroup").selectAll("circle").data(valuesPositions)
              .attr("opacity", function(d,index){
                if (isChecked[Math.floor(index/20) + 1] == 1){
                  return 1
                }
                else return 0.1
              })
              .attr("stroke-width", function(d,index){
                if (isChecked[Math.floor(index/20) + 1] == 1){
                  return 1.5
                }
                else return 0.5
              })
}

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


  var zoneGroup = canvasValues.append("g").attr("id", "zoneGroup")

  var zones = [4,12,17,20]

  var zoneBars = canvasValues.select("#zoneGroup").selectAll("rect").data(zones).enter()
                              .append("rect")
                              .attr("x", margin.left)
                              .attr("y", function(d, index) {
                                if (index==0) return margin.top
                                else return yScaleValues(zones[index-1])
                              })
                              .attr("width", widthValues - margin.left)
                              .attr("height", function(d,index) {
                                if (index==0) return yScaleValues(d) - yScaleValues(1)
                                else return yScaleValues(d) - yScaleValues(zones[index-1])
                              })
                              .attr("fill", function(d,index){
                                if (index==0) return d3.rgb(0,0,102)
                                else if (index==1) return d3.rgb(51,204,51)
                                else if (index==2) return d3.rgb(255,255,255)
                                else return d3.rgb(179,36,0)
                              })
                              .attr("opacity", 0.15)

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
                                 .attr("stroke-width", 1.5)
                                 .attr("opacity", 0.9)
                                 .attr("fill", d3.rgb(100, 200, 240))
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

  var checkBoxGroup = canvasValues.append("g").attr("id", "checkBoxGroup")

  var checkBoxValues = canvasValues.select("#checkBoxGroup").selectAll("foreignObject").data(years).enter()
        .append("foreignObject")
        .attr("width", 100)
        .attr("height", 100)
        .attr("x", Values.width.baseVal.value - margin.right - margin.left + 20)
        .attr("y", function(d,index){return (index*18)+margin.top;})
        .append("xhtml:body")
        .html("<form><input type=checkbox checked=true id=check /></form>")
        .on("click", function(d, index){
          updateIsChecked(index)
          updatePlot()
        });

  var checkTextGroup = canvasValues.append("g").attr("id", "checkTextGroup")

  var checkTexts = canvasValues.select("#checkTextGroup").selectAll("text").data(years).enter()
                                .append("text")
                                .attr("x", Values.width.baseVal.value - margin.right - margin.left + 50)
                                .attr("y", function(d,index){return ((index+1)*18)+margin.top + 5;})
                                .text(function(d, index){
                                  if(index == 0){
                                    return "Select All"
                                  }
                                  else return years[index]
                                })
                                .style("fill", "black")
                                .attr("font-size", "14px")
                                .attr("font-weight", "bold")

});
