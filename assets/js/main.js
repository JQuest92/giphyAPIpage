// Initial array of japanese entertaninment
var topics = ["Pokemon", "Yu-Gi-Oh!", "Blue-Eyes White Dragon", "Final Fantasy"];
var apikey = "HLNwuzvvaYkYWyLRj7l2z8WQoa3dg5j5"; // apikey - seems like i might need it in multiple functions perhaps

var $view = $("#gif-view");  //go ahead and JQeryize this 'thang

// Function for displaying the gifs
function displayTopicGIFs() {


  $view.empty(); //clear out any previous gifs

  var topic = $(this).attr("data-name"); //get topic
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apikey + "&limit=10"; //build the query URL

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    
    var data = response.data; //get response data
    
    for(var k = 0; k < data.length; k++)
    {
                  //console.log("Data: " + data[k].images.fixed_height_still.url);
                  
              var $img = $("<img>");
              var $p = $("<p>");  //build html elements under the hood

              var rating = data[k].rating;  
              $p.text(rating); 

              //add a whole bunch of data-attributes to the gifs 
              $img.attr("src", data[k].images.fixed_height_still.url)
              $img.attr("class", "gify")
              $img.attr("data-state", "still");
              $img.attr("data-name", topic + k);
              $img.attr("data-animate", data[k].images.fixed_height.url);
              $img.attr("data-still", data[k].images.fixed_height_still.url);
              
              $view.append($p);
              $view.append($img); //put it on DOM
    }
  });
}

//function animate
function animate(){
    //gert the current state (still or animate)
  var state = $(this).attr("data-state");
// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
} else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}







}

// Function for displaying topics as buttons
function renderButtons() {

  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamically generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of topic to our button
    a.addClass("topic");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim();

  // Adding the movie from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Function for displaying the topic's gifs
// Using $(document).on instead of $(".topic").on to add event listeners to dynamically generated elements
$(document).on("click", ".topic", displayTopicGIFs);

// Function for animating or pausing the gifs
// Using $(document).on instead of $(".gify").on to add event listeners to dynamically generated elements
$(document).on("click", ".gify", animate);

// Calling the renderButtons function to display the initial buttons
renderButtons();