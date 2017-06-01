
$(document).ready(function(){

  // this array provides all the starter data for our buttons, and is where we store user input for new buttons.
  var topics = ["hiking", "skiing", "snowshoeing", "backpacking", "barbecue", "camping", "fishing", "surfing", "diving", "boating", "trampolining"];



  function makeButtons() {
    // avoid repeat buttons by emptying this div prior to starting.
    $("#activityButtons").empty();
    //loop through the topics array
    for (var i = 0; i < topics.length; i++) {
      var button = makeButton(topics[i]);
      // adds button to HTML
      $("#activityButtons").append(button);
    };
    $(".activity").on('click', buttonClicked);

  };

  function makeButton(topic) {
    // generate buttons for each activity in the array.
    var a = $("<button>");
    // add a class
    a.addClass("activity");
    // add data attribute
    a.attr("data-name", topic);
    // initial button text
    a.text(topic);

    return a;
  }

  // This function handles events where one button is clicked
  $("#addActivity").on("click", function(event) {

    // this prevents page reload when clicking submit on the form.
    event.preventDefault();

    // This line grabs the input from the textbox
    var activity = $("#activity-input").val().trim();

    // The topic from the textbox is then added to our array
    topics.push(activity);

    // Calling makeButtons which uses the array we just updated to make a new button for the added item.
    makeButtons();
  });

  // here's the section where we start to make our api call.
  function buttonClicked() {

    $("#activities").empty();
    var type = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&limit=10" + "&api_key=dc6zaTOxFJmzC";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // here's where the data from our button clicked attaches the results to the DOM.
      console.log(response);
      response.data.forEach(displayDataNode);

    });
  }
    function displayDataNode(dataNode) {
      var imgURL = dataNode.images.downsized_still.url;
      var imgDiv = $("<img />").attr('src', imgURL).appendTo($("#activities"));
    }

    // still need to figure out how to add ratings and click events for switching between the preview_webp and

  makeButtons();

});
