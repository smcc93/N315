function init() {
  let navOpen = false;
  $(".bars").click(function (e) {
    if (navOpen) {
      $(".nav-holder").css("display", "none");
      navOpen = false;
    } else {
      $(".nav-holder").css("display", "flex");
      navOpen = true;
    }
  });
}

$(document).ready(function () {
  init();
});
