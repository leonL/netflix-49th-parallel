var FLIX = FLIX || {},
    FbY = FLIX.byYear = FLIX.byYear || {},
    Chart = FLIX.StackedRowChart,
    charts = FbY.charts = {
      totals: new Chart(FbY.data.totals),
      recent: new Chart(FbY.data.recentFlix),
      backCat: new Chart(FbY.data.backCatFlix)
    };

(function() {

  FbY.renderTotalsChart = function($container) {
    var chart = FbY.charts.totals,
        containerWidth = parseInt($container.width(), 10);

    chart.container = $container.get(0);

    var dims = {
      fullWidth: containerWidth < 600 ? containerWidth : 600,
      leftMargin: 20,
      xAxisPadding: 2,
      fullHeight: 300,
      bottomMargin: 20,
      topMargin: 0,
      yAxisPadding: 2
    };

    chart.setDims(dims);

    // addSVG.call(chart);
    // renderXAxis.call(chart);
    // this.renderYAxis(chart);

    // this.renderStackedBars(cdn.elD3, data.sharedCdnStack, 'cdn');
    // this.renderStackedBars(usa.elD3, data.sharedUSAStack, 'usa');
  };

})();