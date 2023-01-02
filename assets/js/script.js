// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currentDate = dayjs().format('dddd, MMM/D/YYYY');
  $("#currentDay").html(currentDate);
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.saveBtn').on('click', function() {
    var input = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    localStorage.setItem(time, input);

  });


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function timeApply() {
    var currentTime = dayjs().hour()
    $(".time-block").each(function() {
      var blockTime = $(this).attr("id").replace("hour-", "")

      if (blockTime < currentTime) {
        $(this).removeClass("future present").addClass("past");
      } else if (blockTime == currentTime) {
        $(this).removeClass("future past").addClass("present");
      } else {
        $(this).removeClass("present past").addClass("future");
      }
    });

    for (i = 9; i < 18; i++) {
      $("#hour-" + i).children(".description").val(localStorage.getItem("hour-" + i));
    };
    
  };


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  timeApply();
});
