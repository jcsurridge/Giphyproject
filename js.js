$(document).ready(function () {

    var animalArr = ["dog", "cat", "bird", "chipmunk", "whale"];

    function initialButton() {

        for (let i = 0; i < animalArr.length; i++) {

            var buttons = $("<button>");
            buttons.text(animalArr[i]);
            $("#buttonRow").append(buttons);
            buttons.attr("type-of-animal", animalArr[i]);
            giphySearch();

        }
    };

    function newButton() {

        $("#animal-button").on("click", function () {
            event.preventDefault();

            let newGiphy = $("#animal-input").val().trim();
            let buttons = $("<button>");
            buttons.text(newGiphy);
            animalArr.push(newGiphy);
            $("#buttonRow").append(buttons);
            buttons.attr("type-of-animal", newGiphy);
            $("#gifsappearhere").empty();

            giphySearch();

            console.log(animalArr);
            console.log(newGiphy);

        });
  
    };

    newButton();
    initialButton();

    function giphySearch() {

        $("button").on("click", function () {

            $("#gifsappearhere").empty();

            let animal = $(this).attr("type-of-animal");

            //make a variable to generate giphy URL
            let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=JnK4SZF4TnntA9vUApasMRISp4pvLwmu&q=${animal}&limit=10&offset=0&rating=G&lang=en`

            //perform ajax function
            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .then(function (response) {
                    // console.log(queryURL);
                    // console.log(response);

                    let results = response.data;

                    for (let i = 0; i < 9; i++) {

                        let animalDiv = $("<div>");
                        let ratingDiv = $("<p>").text("Rating: " + results[i].rating);
                        let animalGiphy = $("<img>");

                        animalGiphy.attr("src", results[i].images.fixed_height_still.url);
                        animalGiphy.attr("data-still", results[i].images.fixed_height_still.url);
                        animalGiphy.attr("data-animate", results[i].images.fixed_height.url);
                        animalGiphy.attr("data-state", "still");
                        animalGiphy.addClass("animalGiphy");
                        animalDiv.append(ratingDiv);
                        animalDiv.append(animalGiphy);

                        $("#gifsappearhere").prepend(animalDiv);

                    }
                });
        });

    };


    $(document).on("click", ".animalGiphy", function () {

        let state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});


