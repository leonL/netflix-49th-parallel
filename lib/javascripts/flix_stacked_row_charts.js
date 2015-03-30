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
    var
    chart = FbY.charts.totals,
    containerWidth = parseInt($container.width(), 10),
    container = $container.get(0),
    dims = {
      fullWidth: containerWidth < 800 ? containerWidth : 800,
      leftMargin: 90,
      xAxisPadding: 2,
      fullHeight: 245,
      bottomMargin: 20,
      topMargin: 50,
      yAxisPadding: 2
    },
    yLabels = {
      'Recent Titles': "Released<break>2000 – 2015",
      'Back Catalogue': 'Released<break>before 2000',
      'All Titles': 'All Titles'
    },
    yLabelFormatter = function(l) {
      return yLabels[l];
    };

    chart.frameAndLayout(container, dims);
    chart.renderHeader();
    chart.renderYAxis(yLabelFormatter);
    chart.renderBars();
  };

  FbY.renderBackCatChart = function($container) {
    var
    chart = FbY.charts.backCat,
    containerWidth = parseInt($container.width(), 10),
    container = $container.get(0),
    dims = {
      fullWidth: containerWidth < 800 ? containerWidth : 800,
      leftMargin: 28,
      xAxisPadding: 2,
      fullHeight: 570,
      bottomMargin: 20,
      topMargin: 50,
      yAxisPadding: 2
    },
    yLabelFormatter = function(l) {
      return l + "s";
    };

    chart.frameAndLayout(container, dims);
    chart.renderHeader();
    chart.renderYAxis(yLabelFormatter);
    chart.renderBars();
  };

  FbY.renderRecentChart = function($container) {
    var chart = FbY.charts.recent,
        containerWidth = parseInt($container.width(), 10),
        container = $container.get(0),
        dims = {
          fullWidth: containerWidth < 800 ? containerWidth : 800,
          leftMargin: 38,
          xAxisPadding: 2,
          fullHeight: 950,
          bottomMargin: 20,
          topMargin: 50,
          yAxisPadding: 2
        };

    chart.frameAndLayout(container, dims);
    chart.renderHeader();
    chart.renderYAxis();
    chart.renderBars();
  };


})();