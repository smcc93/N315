function initNav() {
  $("a").click(function(e) {
    var btnID = e.currentTarget.id;
    loadContent(btnID);
  });
}

function loadContent(pageName) {
  var pageContent = PROVIDER.getPageContent(pageName);

  $(".content").html(pageContent);

  initNav();
}

function populateNav() {
  $.each(PROVIDER.getMainNav(), function(idx, link) {
    $("nav").append(`<a id="${link.path}" href="#"  > ${link.linkName}</a>`);
  });

  loadContent("home");
}

function dataIsLoaded() {
  populateNav();
}

$(document).ready(function() {
  PROVIDER.getData(dataIsLoaded);
});
