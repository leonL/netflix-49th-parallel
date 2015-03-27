var FLIX = FLIX || {},
    FbY = FLIX.byYear = FLIX.byYear || {};

(function() {
  var d = FbY.data = FbY.data || {},
      dRecentFx = FbY.data.recentFlix = FbY.data.recentFlix = {},
      dBackCatFx = FbY.data.backCatFlix = FbY.data.backCatFlix = {},
      dTotals = FbY.data.totals = FbY.data.totals = {};

  // Recent Flix Data

  dRecentFx.cdn = [{"x":"2015","y":0},{"x":"2014","y":31},{"x":"2013","y":120},{"x":"2012","y":196},{"x":"2011","y":226},{"x":"2010","y":169},{"x":"2009","y":106},{"x":"2008","y":106},{"x":"2007","y":96},{"x":"2006","y":66},{"x":"2005","y":56},{"x":"2004","y":43},{"x":"2003","y":27},{"x":"2002","y":27},{"x":"2001","y":23},{"x":"2000","y":27}];
  dRecentFx.usa = [{"x":"2015","y":3},{"x":"2014","y":188},{"x":"2013","y":488},{"x":"2012","y":487},{"x":"2011","y":398},{"x":"2010","y":311},{"x":"2009","y":230},{"x":"2008","y":166},{"x":"2007","y":173},{"x":"2006","y":155},{"x":"2005","y":128},{"x":"2004","y":127},{"x":"2003","y":120},{"x":"2002","y":127},{"x":"2001","y":121},{"x":"2000","y":131}];
  dRecentFx.shared = [{"x":"2015","y":0},{"x":"2014","y":144},{"x":"2013","y":409},{"x":"2012","y":390},{"x":"2011","y":204},{"x":"2010","y":138},{"x":"2009","y":81},{"x":"2008","y":56},{"x":"2007","y":36},{"x":"2006","y":48},{"x":"2005","y":34},{"x":"2004","y":38},{"x":"2003","y":32},{"x":"2002","y":22},{"x":"2001","y":16},{"x":"2000","y":16}];
  dRecentFx.yDomain = _.range(2015, 1999, -1);

  dRecentFx.cdnSharedStack = [stackWrap('cdn', dRecentFx.cdn), stackWrap('shared', dRecentFx.shared)];
  dRecentFx.usaSharedStack = [stackWrap('usa', dRecentFx.usa), stackWrap('shared', dRecentFx.shared)];

  // WARNNG: maximum y values are hardcoded in order not to have to calculate in the browser
  dRecentFx.maximums = {
    cdnSharedStack: 660, // this value has been rounded up from 658
    usaSharedStack: 900 // this value has been rounded up from 897
  };

  // Back Catalogue Data

  dBackCatFx.cdn = [{"x":"90s","y":132},{"x":"80s","y":42},{"x":"70s","y":15},{"x":"60s","y":12},{"x":"50s","y":8},{"x":"40s","y":4},{"x":"30s","y":0},{"x":"20s","y":0},{"x":"10s","y":0}];
  dBackCatFx.usa = [{"x":"90s","y":644},{"x":"80s","y":291},{"x":"70s","y":180},{"x":"60s","y":151},{"x":"50s","y":141},{"x":"40s","y":62},{"x":"30s","y":29},{"x":"20s","y":34},{"x":"10s","y":12}];
  dBackCatFx.shared = [{"x":"90s","y":107},{"x":"80s","y":35},{"x":"70s","y":7},{"x":"60s","y":4},{"x":"50s","y":8},{"x":"40s","y":3},{"x":"30s","y":0},{"x":"20s","y":1},{"x":"10s","y":0}];
  dBackCatFx.yDomain = _.range(90, 0, -10);

  dBackCatFx.cdnSharedStack = [stackWrap('cdn', dBackCatFx.cdn), stackWrap('shared', dBackCatFx.shared)];
  dBackCatFx.usaSharedStack = [stackWrap('usa', dBackCatFx.usa), stackWrap('shared', dBackCatFx.shared)];

  // WARNNG: maximum y values are hardcoded in order to save the browser having to calculate them
  dBackCatFx.maximums = {
    cdnSharedStack: 240, // this value has been rounded up from 239
    usaSharedStack: 760 // this value has been rounded up from 751
  };

  // Totals Data

  dTotals.cdn = [{"x":"recent_flix","y":1319},{"x":"back_catalogue_flix","y":213},{"x":"all","y":1532}];
  dTotals.usa = [{"x":"recent_flix","y":3353},{"x":"back_catalogue_flix","y":1544},{"x":"all","y":4897}];
  dTotals.shared = [{"x":"recent_flix","y":1664},{"x":"back_catalogue_flix","y":165},{"x":"all","y":1829}];
  dTotals.yDomain = ["recent", "older", "total"];

  dTotals.cdnSharedStack = [stackWrap('cdn', dTotals.cdn), stackWrap('shared', dTotals.shared)];
  dTotals.usaSharedStack = [stackWrap('usa', dTotals.usa), stackWrap('shared', dTotals.shared)];

  // WARNNG: maximum y values are hardcoded in order to save the browser having to calculate them
  dTotals.maximums = {
    cdnSharedStack: 3370, // this value has been rounded up from 3361
    usaSharedStack: 6730 // this value has been rounded up from 6726
  };

  function stackWrap(name, vals) {
    return {key: name, values: vals};
  };

}());