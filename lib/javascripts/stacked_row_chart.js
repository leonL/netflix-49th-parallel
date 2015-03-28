var FLIX = FLIX || {};

FLIX.StackedRowChart = function(dataSet) {
  this.dataSet = dataSet;
  return this;
};

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
    rightMargin:0,
    fullHeight: 0,
    topMargin: 0,
    bottomMargin: 0,
    xAxisPadding: 0,
    yAxisPadding: 0
  },

  renderBars: function() {
    var that = this;
    this.generateBarLayers();
    this.generateStackLayers();
    this.generateBars();

    this.barsD3.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", this.dimensions.barHeight )
      .attr("width", function(d) {
        return that.xScale(d.y);
      });
  },

  generateBarLayers: function() {
    var dims = this.dimensions;

    this.barLayersD3 = this.svgD3.selectAll('g.bar-layer')
      .data(this.dataSet.stacks)
      .enter(function(d) { return d.values; })
      .append('g')
      .attr('class', function(d) {
        return d.id + ' bar-layer';
      })
      .attr('transform', function(_, i) {
        return UTIL.transformTranslate(
          {x: dims.leftMargin, y: dims.topMargin + (dims.barHeight * i)}
        );
      });
      return this.barLayersD3;
    },

  generateStackLayers: function() {
    var that = this;
    this.stackLayersD3 = this.barLayersD3.selectAll('g.stack-layer')
      .data(function(d) { return that.generateStackLayout(d.values); })
      .enter().append('g')
      .attr('class', function(d) {
        return d.id + ' stack-layer';
      });
    return this.stackLayersD3;
  },

  generateBars: function() {
    var that = this;
    this.barsD3 = this.stackLayersD3.selectAll('g.horizontal-bar')
      .data(function(d) { return d.values; })
      .enter()
      .append('g')
      .attr('class', 'row-bar')
      .attr('transform', function(d) {
        return UTIL.transformTranslate(
          {x: that.xScale(d.y0), y: that.yScale(d.x) }
        );
      });
    return this.barsD3;
  },

  generateStackLayout: function(data) {
    var layout = d3.layout.stack().values(function(d) {
      return d.values;
    })(data);
    return layout;
  },

  frameAndLayout: function(container, dims) {
    this.container = container;

    this.setDims(dims);

    this.generateYScale();
    this.generateXScale();

    this.dimensions.barHeight =
      Math.floor(this.yScale.rangeBand() / this.dataSet.stacks.length);

    var svg = d3.select(this.container).append("svg")
      .attr("width", this.dimensions.fullWidth)
      .attr("height", this.dimensions.fullHeight);
    this.svgD3 = svg;
    return null;
  },

  renderXAxis: function() {
    this.generateXAxis();

    var dim = this.dimensions,
        transformVals =
        {x: dim.leftMargin,
         y: dim.chartHeight() + dim.topMargin + dim.xAxisPadding};

    this.svgD3.append('g')
      .attr('class', 'axis x')
      .attr('transform', UTIL.transformTranslate(transformVals))
      .call(this.xAxis);
  },

  generateXScale: function() {
    var scale = d3.scale.linear()
      .domain([0, this.dataSet.maximums.usaSharedStack])
      .rangeRound([0, this.dimensions.chartWidth()]);
    this.xScale = scale;
    return scale;
  },

  generateXAxis: function() {
    var axis = d3.svg.axis()
      .scale(this.xScale)
      .orient('bottom');
    this.xAxis = axis;
    return axis;
  },

  renderYAxis: function() {
    this.generateYAxis();

    this.svgD3.append('g')
      .attr('class', 'axis y')
      .attr('transform',
        UTIL.transformTranslate(
          {x: this.dimensions.leftMargin - this.dimensions.yAxisPadding,
            y: this.dimensions.topMargin}
        )
      ).call(this.yAxis);
  },

  generateYScale: function() {
    var scale = d3.scale.ordinal()
      .domain(this.dataSet.yDomain)
      .rangeRoundBands([0, this.dimensions.chartHeight()], 0.1);
    this.yScale = scale;
    return scale;
  },

  generateYAxis: function() {
    var axis = d3.svg.axis()
      .scale(this.yScale)
      .orient('left');
    this.yAxis = axis;
    return axis;
  },

  setDims: function(dims) {
    _.each(dims, this.dimensions.setDim, this.dimensions);
  }

};