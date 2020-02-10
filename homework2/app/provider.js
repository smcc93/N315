var PROVIDER = (function() {
  var _allData = {};
  var _getData = function(callBack) {
    $.getJSON("../data/data.json", function(data) {})
      .fail(function(error) {})
      .done(function(data) {
        console.log("done", data.MainNav);
        _allData = data;
        callBack();
      });
  };

  var _getMainNav = function() {
    return _allData.MainNav;
  };

  var _getPageContent = function(nameOfPage) {
    var content = "";
    $.each(_allData.Pages, function(idx, page) {
      if (nameOfPage === page.pageName) {
        content = page.content;
      }
    });
    return content;
  };

  return {
    getData: _getData,
    getMainNav: _getMainNav,
    getPageContent: _getPageContent
  };
})();
