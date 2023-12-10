document.addEventListener("DOMContentLoaded", () => {
  fetch("items.json") // fetching the items from the JSON file...
   .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load items data: ${response.status}`);
    }

    return response.json();
   })
   .then(collection => {
    //intializing the collection into separate arrays...
    let movies = [];
    let books = [];
    let games = [];
    // Filtering out the items that match the conditions specified into the adequate array...
    collection.forEach(category => {
      if (category["type"] === "movie") {
        movies.push(category);
      } else if (category["type"] === "book") {
        books.push(category);
      } else if (category["type"] === "game") {
        games.push(category);
      }
    });

    // console.log(movies)  veryfing to see if my code above is working...

    displayCategories(movies); // initial display when the window is loaded.

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const displayContainer = document.querySelector(".display_container");
        // every time we click a button the previous content is removed.
        displayContainer.innerHTML = "";

        if (button.classList.contains("movies")) {
          displayCategories(movies);
        } else if (button.classList.contains("books")) {
          displayCategories(books);
        } else if (button.classList.contains("games")) {
          displayCategories(games);
        }
        })
    })

   })
   .catch(error => console.error(`Fetch problem: ${error.message}`));


   // create the item UI component 
   function createItem(item) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "item_displayed";

    const image = document.createElement("img");
    image.src = item.cover;
    image.className = "item_cover";

    const itemDescription = document.createElement("div");
    itemDescription.className = "item_description";

    const heading = document.createElement("h1");
    heading.textContent = item.title;
    heading.className = "item_title";

    const para = document.createElement("p");
    para.textContent = item.genre;
    para.className = "item_genre";

    const searchLink = document.createElement("a");
    searchLink.href = item.link;
    searchLink.className = "explore";
    searchLink.target = "_blank";
    searchLink.textContent = "Explore";

    cardContainer.appendChild(image);
    itemDescription.appendChild(heading);
    itemDescription.appendChild(para);
    cardContainer.appendChild(itemDescription);
    cardContainer.appendChild(searchLink);

    return cardContainer;

   }

   // container for displaying the content of each category (movies, games and books).
   function displayCategories(categories) {
    const displayContainer = document.querySelector(".display_container");

    categories.forEach(category => {
      const card = createItem(category);
      displayContainer.appendChild(card);
    })
   }
});