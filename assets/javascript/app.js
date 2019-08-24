$(document).ready(function () {
	var animals = ["cats", "dogs", "opossum", "squirrel", "cow", "horse", "duck", "rabbit"];

	// Add buttons for original animal array
	function renderButtons() {
		$("#animal-buttons").empty();
		for (i = 0; i < animals.length; i++) {
			$("#animal-buttons").append("<button class='btn btn-success' data-animal='" + animals[i] + "'>" + animals[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for animal entered
	$("#add-animal").on("click", function () {
		event.preventDefault();
		var animal = $("#animal-input").val().trim();
		animals.push(animal);
		renderButtons();
	});

});
