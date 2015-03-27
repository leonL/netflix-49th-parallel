var FLIX = FLIX || {};

FLIX.StackedRowChart = function(dataSet) {
  this.dataSet = dataSet;
  return this;
}

FLIX.StackedRowChart.prototype = {
  dimensions: {
    setDim: function(val, dim) {
      this[dim] = val;
      return null;
    },
    chartWidth: function() {
      return this.fullWidth - this.leftMargin - this.rightMargin;
    },
    chartHeight: function() {
      return this.fullHeight - this.bottomMargin - this.topMargin;
    },
    fullWidth: 0,
    leftMargin: 0,
    rightMarin:0,
    fullHeight: 0,
    topMargin: 0,
    bottomMargin: 0
  },

  addSVG: function() {
    var svg = d3.select(this.container).append("svg")
      .attr("width", this.dimensions.fullWidth)
      .attr("height", this.dimensions.fullHeight);
    this.svgD3 = svg;
    return null;
  },

  renderXAxis: function() {
    generateXScale.call(this);
    generateXAxis.call(this);

    var dim = this.dimensions,
        transformVals =
        {x: dim.leftMargin - dim.xAxisPadding,
         y: dim.chartHeight + dim.topMargin};

    this.svgD3.append('g')
      .attr('class', 'axis x')
      .attr('transform', UTIL.transformTranslate(transformVals))
      .call(this.xAxis);
  },

  generateXScale: function() {
    var scale = d3.scale.linear()
      .domain([0, this.dataSet.maximums.usaSharedStack])
      .rangeRound([0, this.dimensions.chartWidth]);
    this.xScale = scale;
    return null;
  },

  generateXAxis: function() {
    var axis = d3.svg.axis()
      .scale(this.xScale)
      .orient('bottom');
    this.xAxis = axis;
    return null;
  },

  setDims: function(dims) {
    _.each(dims, this.dimensions.setDim, this.dimensions);
  }

};