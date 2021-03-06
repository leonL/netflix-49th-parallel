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
  dRecentFx.shared2 = [{"x":"2015","y":0},{"x":"2014","y":144},{"x":"2013","y":409},{"x":"2012","y":390},{"x":"2011","y":204},{"x":"2010","y":138},{"x":"2009","y":81},{"x":"2008","y":56},{"x":"2007","y":36},{"x":"2006","y":48},{"x":"2005","y":34},{"x":"2004","y":38},{"x":"2003","y":32},{"x":"2002","y":22},{"x":"2001","y":16},{"x":"2000","y":16}];
  dRecentFx.yDomain = _.range(2015, 1999, -1);

  dRecentFx.stacks = [
    stackWrap('cdn', dRecentFx.cdn, dRecentFx.shared),
    stackWrap('usa', dRecentFx.usa, dRecentFx.shared2)
  ];
  // WARNNG: maximum y values are hardcoded in order not to have to calculate in the browser
  dRecentFx.maximums = {
    cdnSharedStack: 660, // this value has been rounded up from 658
    usaSharedStack: 900 // this value has been rounded up from 897
  };

  // Back Catalogue Data

  dBackCatFx.cdn = [{"x":"90","y":132},{"x":"80","y":42},{"x":"70","y":15},{"x":"60","y":12},{"x":"50","y":8},{"x":"40","y":4},{"x":"30","y":0},{"x":"20","y":0},{"x":"10","y":0}];
  dBackCatFx.usa = [{"x":"90","y":644},{"x":"80","y":291},{"x":"70","y":180},{"x":"60","y":151},{"x":"50","y":141},{"x":"40","y":62},{"x":"30","y":29},{"x":"20","y":34},{"x":"10","y":12}];
  dBackCatFx.shared = [{"x":"90","y":107},{"x":"80","y":35},{"x":"70","y":7},{"x":"60","y":4},{"x":"50","y":8},{"x":"40","y":3},{"x":"30","y":0},{"x":"20","y":1},{"x":"10","y":0}];
  dBackCatFx.shared2 = [{"x":"90","y":107},{"x":"80","y":35},{"x":"70","y":7},{"x":"60","y":4},{"x":"50","y":8},{"x":"40","y":3},{"x":"30","y":0},{"x":"20","y":1},{"x":"10","y":0}];
  dBackCatFx.yDomain = _.range(90, 0, -10);

  dBackCatFx.stacks = [
    stackWrap('cdn', dBackCatFx.cdn, dBackCatFx.shared),
    stackWrap('usa', dBackCatFx.usa, dBackCatFx.shared2)
  ];

  // WARNNG: maximum y values are hardcoded in order to save the browser having to calculate them
  dBackCatFx.maximums = {
    cdnSharedStack: 240, // this value has been rounded up from 239
    usaSharedStack: 760 // this value has been rounded up from 751
  };

  // Totals Data

  dTotals.cdn = [{"x":"Recent Titles","y":1319},{"x":"Back Catalogue","y":213},{"x":"All Titles","y":1532}];
  dTotals.usa = [{"x":"Recent Titles","y":3353},{"x":"Back Catalogue","y":1544},{"x":"All Titles","y":4897}];
  dTotals.shared = [{"x":"Recent Titles","y":1664},{"x":"Back Catalogue","y":165},{"x":"All Titles","y":1829}];
  dTotals.shared2 = [{"x":"Recent Titles","y":1664},{"x":"Back Catalogue","y":165},{"x":"All Titles","y":1829}];
  dTotals.yDomain = ["Recent Titles", "Back Catalogue", "All Titles"];

  dTotals.stacks = [
    stackWrap('cdn', dTotals.cdn, dTotals.shared),
    stackWrap('usa', dTotals.usa, dTotals.shared2)
  ];

  // WARNNG: maximum y values are hardcoded in order to save the browser having to calculate them
  dTotals.maximums = {
    cdnSharedStack: 3370, // this value has been rounded up from 3361
    usaSharedStack: 6730 // this value has been rounded up from 6726
  };

  function stackWrap(id, exclusiveVals, sharedVals) {
    var stack = [{id: 'exclusive', values: exclusiveVals}, {id: 'shared', values: sharedVals}]
    return {id: id, values: stack};
  };

}());