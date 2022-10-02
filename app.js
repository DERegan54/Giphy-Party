// My API Key = CJvFXVeRQI3DJ9LG2BEn5HQXufOJf8SG
// Line 4: We are selecting the gifGallery div element from the xdom and saving it to the variable "gifGallery"
// Line 5: We are selecting the searchInput element from the DOM and saving it to the variable, "searchInput"
const $gifGallery = $("#gifGallery");
const $searchInput = $("#searchInput");

/* handle form submission: clear search box & make ajax call */
// This function is making a request using the user's search term from the input
// And upon the API's response, it is running the appendGif function declared above 
// Line 18: Listening for clicks on the button in the form and carring out the asyrchonous function defined below
// Line 19: Preventing default behavior on the page so the function will be carried out as declared
// Line 20: Capturing the value in the searchInput, and saving it to the variable "searchTerm"
// Line 21: The value of searchInput is re-declared as an empty string to clear the form
// Lines 22-25: JavaScript is making a search request to the API using the searchTerm and the API key. JavaScript is instructed to
//          wait for the API to finish responding to the search request being made before moving on to the next step 
//          in the function
// Line 28: the appendGif function is called with the response data from the above API request as an argument
$("form").on("click", async function(evt) {
    evt.preventDefault();
    let searchTerm = $searchInput.val();
    $searchInput.val("");
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key:"CJvFXVeRQI3DJ9LG2BEn5HQXufOJf8SG"
      }
    });
    appendGif(response.data);
  });
  

/* use ajax result to add a gif */
// This function is counting images returned as a result of the above API request.  Then
// JavaScript is generating a random integer between 0 and the number of results returned from the API. 
// Then a container is dynamically created to house the new gif, and then the gif itself is created 
// from the image in the results located at the index matching the random number just generated 
// Finally the image is appended to the container, and then the container is appended to the gallery  
// Line 47: The appendGif function is defined
// Line 48: The variable "countResults" is defined as the number of results returned from the above request
// Line 49: This if-statement is defining what will happen once the response results are counted
// Line 50: The variable "randomIndex" is defined as a random integer between 0 and countResults
// Line 51:  The variable "gifContainer" is defined as a div element dynamically created to house the image about to be created in the next line
// Lines 52:  the variable "newGif" is defined as a new image element is created using image at the randomIndex among the API search results
// Line 53:  the new image element is appended to the gifContainer
// Line 54:  the gifContainer is appened to the gifGallery

function appendGif(results) {
  let countResults = results.data.length;
  if (countResults) {
    let randomIndex = Math.floor(Math.random() * countResults);
    let $gifContainer = $("<div>");
    let $newGif = $("<img>", {
      src: results.data[randomIndex].images.original.url,
    });
    $gifContainer.append($newGif);
    $gifGallery.append($gifContainer);
  }
}

/* remove gif */
// Line 63: - Here JavaScript is listening for clicks on the Remove Gifs button
// Line 64: - Upon a click the Gallery is being emptied (all gif are removed from the DOM)
$("#removeButton").on("click", function() {
  $gifGallery.empty();
});