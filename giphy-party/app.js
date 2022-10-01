// My API Key = CJvFXVeRQI3DJ9LG2BEn5HQXufOJf8SG

const $gifGallery = $("#gifGallery");
const $searchInput = $("#searchInput");

/* use ajax result to add a gif */

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

/* handle form submission: clear search box & make ajax call */

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

/* remove gif */

$("#removeButton").on("click", function() {
  $gifGallery.empty();
});