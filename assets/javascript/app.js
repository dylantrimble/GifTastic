$(document).ready(function () {
	var animals = ["cats", "dogs", "opossum", "squirrel", "cow", "horse", "duck", "rabbit"];

	// Add buttons for original animal array
	function renderButtons() {
		$("#animal-buttons").empty();
		for (i = 0; i < animals.length; i++) {
			$("#animal-buttons").append("<button class='btn btn-success' data-animal='" + animals[i] + "'>" + animals[i] + "</button>");
		}
		$("button").on("click", function () {
			var animalGif = $(this).attr("data-animal");
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
				animalGif + "&api_key=P78035KzeSFlvtBnDC9EoyNWvLAu6uV1"
			changeState();
			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function (response) {
				var results = response.data;
				$("#animals").empty();
				for (var i = 0; i < results.length; i++) {
					var animalDiv = $("<div>");
					var p = $("<p>").text("Rating: " + results[i].rating);
					var animalImg = $("<img>");
		
					animalImg.attr("src", results[i].images.original_still.url);
					animalImg.attr("data-still", results[i].images.original_still.url);
					animalImg.attr("data-animate", results[i].images.original.url);
					animalImg.attr("data-state", "still");
					animalImg.attr("class", "gif");
					animalDiv.append(p);
					animalDiv.append(animalImg);
					$("#animals").append(animalDiv);
					console.log(animalGif)
				}
			});
		});
	}

	renderButtons();

	// Adding a button for animal entered
	$("#add-animal").on("click", function () {
		event.preventDefault();
		var animal = $("#animal-input").val().trim();
		animals.push(animal);
		renderButtons();
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}
	
	$(document).on("click", ".gif", changeState);
});
