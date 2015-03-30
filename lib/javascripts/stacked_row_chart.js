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
    rightMargin: 32,
    fullHeight: 0,
    topMargin: 0,
    topPadding: 5,
    bottomMargin: 0,
    xAxisPadding: 0,
    yAxisPadding: 0,
    labelPadding: 3,
    swatchRaidus: 4
  },

  renderHeader: function() {
    var dims = this.dimensions,
        headerHeight = dims.topMargin - dims.topPadding,
        headGD3 = this.svgD3.append('g').attr('class', 'header');
        legend = headGD3.append('g').attr('class', 'legend')
          .attr('transform',
              UTIL.transformTranslate({x: 0, y: headerHeight/2}));

    var onlyKeys = legend.append('g')
      .attr('class', 'onlys');

    legend.append('circle').attr('class', 'cdn swatch')
      .attr('cx', dims.swatchRaidus * 2).attr('cy', -dims.swatchRaidus * 1.7)
      .attr('r', dims.swatchRaidus);

    var cdnText = legend.append('text').attr('class', 'cdn swatch label')
          .attr('x', dims.swatchRaidus * 5).attr('y', -dims.swatchRaidus)
          .attr("text-anchor", "start")
          .text('available in Canada only'),
        cdnWidth = parseInt(cdnText.style('width'));

    var usaLegend = legend.append('g').attr('class', 'usa')
                      .attr('transform', UTIL.transformTranslate(
                          {x: 0, y: dims.swatchRaidus * 1.7 }));

    usaLegend.append('circle').attr('class', 'usa swatch')
      .attr('cx', dims.swatchRaidus * 2).attr('cy', 0)
      .attr('r', dims.swatchRaidus);

    var usaText = usaLegend.append('text').attr('class', 'usa swatch label')
          .attr('x', dims.swatchRaidus * 5).attr('y', dims.swatchRaidus)
          .attr("text-anchor", "start")
          .text('available in the U.S. only'),
        usaWidth = parseInt(usaText.style('width'));

    var sharedLegend = legend.append('g').attr('class', 'shared')
            .attr('transform', UTIL.transformTranslate(
              {x: usaWidth + (dims.swatchRaidus * 8), y: 0}));

    sharedLegend.append('circle').attr('class', 'cdn shared swatch')
      .attr('cx', dims.swatchRaidus * 2).attr('cy', -dims.swatchRaidus * 1.7)
      .attr('r', dims.swatchRaidus);

    sharedLegend.append('circle').attr('class', 'usa shared swatch')
      .attr('cx', dims.swatchRaidus * 2).attr('cy', dims.swatchRaidus * 1.7)
      .attr('r', dims.swatchRaidus);

    sharedLegend.append('text').attr('class', 'shared swatch label')
      .attr('x', dims.swatchRaidus * 5).attr('y', dims.swatchRaidus)
      .attr("text-anchor", "start")
      .text('available in both');

    headGD3.append('line')
      .attr('class', 'border-line')
      .attr('x1', 0).attr('y1', headerHeight)
      .attr('x2', dims.fullWidth).attr('y2', headerHeight);
  },

  renderBars: function() {
    var that = this;
    this.generateBarLayers();
    this.generateStackLayers();
    this.generateBars();
    this.renderXGridLines();

    this.barsD3.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", this.dimensions.barHeight )
      .attr("width", function(d) {
        return that.xScale(d.y);
      });

    this.renderXVals();
  },

  renderXVals: function() {
    var
    sharedBarsD3 = this.svgD3.selectAll('.shared g.row-bar'),
    that = this;

    sharedBarsD3.append('text')
      .attr('class', 'xVal')
      .attr('x', function(d) { return that.xScale(d.y) + 5; })
      .attr('y', that.dimensions.barHeight - 5)
      .attr("text-anchor", 'start')
      .text(function(d) {
        var val = d.y0 + d.y;
        return val === 0 ? "" : val;
      });
  },

  renderXGridLines: function() {
    var
    yAxisD3 = this.svgD3.select('g.y.axis'),
    yTicksD3 = yAxisD3.selectAll('g.tick'),
    tickYCoOrds = [];

    yTicksD3.each(function() {
      var coOrd = d3.transform(d3.select(this).attr("transform")).translate[1];
      tickYCoOrds.push(coOrd);
    });

    var yBandOffset = (tickYCoOrds[1] - tickYCoOrds[0]) / 2;
    tickYCoOrds = tickYCoOrds.slice(0, -1);

    for(var i = 0; i < tickYCoOrds.length; i++) {
      yAxisD3.append('g').attr('class', 'partition')
        .attr('transform', UTIL.transformTranslate(
            {x: 0, y: (tickYCoOrds[i]) + yBandOffset}
          ));
    }

    yAxisD3.selectAll('g.partition')
      .append('line')
      .classed('grid-line', true)
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', this.dimensions.chartWidth())
      .attr('y2', 0);
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
          {x: dims.leftMargin,
            y: dims.topMargin + ((dims.barHeight + dims.barGroupPadding) * i)}
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

    var bGPP = this.dimensions.barGroupPaddingPerecent = 0.1,
        bGP = this.dimensions.barGroupPadding =
          Math.round(this.yScale.rangeBand() * bGPP),
        barsPerGroup = this.dataSet.stacks.length,
        rBMinusPadding = this.yScale.rangeBand() - barsPerGroup - 1;

    this.dimensions.barHeight =
      Math.floor(rBMinusPadding / this.dataSet.stacks.length);

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

  renderYAxis: function(labelFormatter) {
    labelFormatter = labelFormatter ? labelFormatter : function(l) {return l;};
    this.generateYAxis(labelFormatter);

    var labels = this.svgD3.append('g')
      .attr('class', 'axis y')
      .attr('transform',
        UTIL.transformTranslate(
          {x: this.dimensions.leftMargin - this.dimensions.yAxisPadding,
            y: this.dimensions.topMargin}
        )
      ).call(this.yAxis);

    this.formatLabels(labels.selectAll('g text'));
  },

  formatLabels: function(labelsD3) {
    labelsD3.attr('transform', UTIL.transformTranslate({x: -5, y: 0}));

    labelsD3.each(function(label) {
      var
      textElD3 = d3.select(this);
      text = textElD3.text(),
      lines = text.split('<break>');

      textElD3.text('');

      _.each(lines, function(line, i) {
        textElD3.append('tspan').text(line)
          .attr('x', 0).attr('dy', 15 * i);
      });

    });

  },

  generateYScale: function() {
    var scale = d3.scale.ordinal()
      .domain(this.dataSet.yDomain)
      .rangeRoundBands([0, this.dimensions.chartHeight()], 0.2);
    this.yScale = scale;
    return scale;
  },

  generateYAxis: function(formatter) {
    var axis = d3.svg.axis()
      .scale(this.yScale)
      .tickSize(0)
      .orient('left')
      .tickFormat(formatter);
    this.yAxis = axis;
    return axis;
  },

  setDims: function(dims) {
    _.each(dims, this.dimensions.setDim, this.dimensions);
  }

};