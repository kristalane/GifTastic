
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
    // when any item in the activity class is clicked, call buttonClicked function (defined a bit further below).
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

    // The topic from the textbox is then added to our array.
    topics.push(activity);

    // Calling makeButtons which uses the array we just updated to make a new button for the added item.
    makeButtons();
  });

  // here's where we start to make our api call, AKA "everything we want to happen when we click an activity button".
  function buttonClicked() {

    // this part empties the container of any other gifs we might have been displaying from clicking another button.
    $("#activities").empty();

    // then we're setting variables that grab the attribute of the clicked button (type) and how to make the query string (queryURL).
    var type = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&limit=10" + "&api_key=dc6zaTOxFJmzC";

    // and now, placing the Giphy API call using the Get method:
    $.ajax({
      url: queryURL,
      method: "GET"
      // this done / response bit is our callback once the ajax function is done.
    }).done(function(response) {
      // and here's where we tell the data from our button clicked where to go (via the displayDataNode function defined a little further below). We're using forEach because the JSON response is an array for which we want all 10 results (we set a limit of 10 in the query string).
      response.data.forEach(displayDataNode);
    });
  };
    // I thought it would be easier to see what was going on if we put the next part into a separate function (displayDataNode). This conveniently separates the actual call for data (ajax), the response (the data returned) and what part of the data we're displaying (function displayDataNode). Keeping these functions separate lets us reuse the displayDataNode function later (perhaps in another version of this assignment) without making additional, potentially unnecessary API calls... I hope.

    function displayDataNode(dataNode) {
      // here we assign variables for the file types we want from the API response: a still image, gif, and the rating for that image.
      var imgURL = dataNode.images.fixed_height_still.url;
      var gifURL = dataNode.images.fixed_height.url;
      var rating = dataNode.rating;
      // here are all the different things I want to happen to this dynamic image tag: add an attribute for each type of image file, add class, set a click event, and append the results to the correct container.
      var imgTag = $("<img />")
        .attr('src', imgURL)
        .attr('data-src', gifURL)
        .addClass('resultImage')
        .on('click', imageClicked)
        .appendTo($("#activities"));
      // can't forget about the ratings! here we make a new <p> tag and append it to the same div as our image, so they match (I hope).
      $("<p>").text("Rated: " + rating)
        .appendTo($("#activities"));

    };
    // here we detail what happens when we click on an image-- switching file sources.
    function imageClicked() {
      var currentSource = $(this).attr('src');
      var altSource = $(this).attr('data-src');
      $(this).attr('src', altSource);
      $(this).attr('data-src', currentSource);
    };

  makeButtons();

});
