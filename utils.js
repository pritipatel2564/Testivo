const params = new URLSearchParams(window.location.search);
let id = params.get("id");

// get Details
async function getDetails() {
    if (!id) return; // Only run on details.html
    const apiUrlId = `https://dummyjson.com/recipes/${id}`;
    try {
        const response = await fetch(apiUrlId, {
            headers: {
                Accept: "Application/json",
            }
        });
        const recipeData = await response.json();
        document.querySelector('.detailsContent').innerHTML = `
        <h1>${recipeData.name}</h1>
        <img src="${recipeData.image}">
        <p>Country: ${recipeData.cuisine}</p>
        <p class="category">Categories: ${recipeData.tags && recipeData.tags.length > 0 ? recipeData.tags[0] : 'N/A'}</p>
        `;
        let ingredientHTML = "";
        for (let i = 0; i < recipeData.ingredients.length; i++) {
            ingredientHTML += `<li>${recipeData.ingredients[i]}</li>`;
        }
        document.querySelector(".ingredientsContent").innerHTML = `
                     <h1>ingredients:</h1>
                     <ul>${ingredientHTML}</ul>`;

        let instructionHTML = "";
        for (let i = 0; i < recipeData.instructions.length; i++) {
            instructionHTML += `<li>${recipeData.instructions[i]}</li>`
        }
        document.querySelector(".instruction").innerHTML = `
              <h1>Steps:</h1>
              <ol>${instructionHTML}</ol>`;
    } catch (error) {
        console.log(error);
        const detailsCard = document.querySelector('.detailsCard');
        if (detailsCard) {
            detailsCard.innerHTML = `<h2 style="text-align:center; padding: 2rem; color: gray;">Failed to load recipe details. Please try again later.</h2>`;
        }
    }
}
getDetails();

// categorys click event
const showCategories = (category) => {
    // using 'recipes' from recipe.js instead of 'recipe'
    if (typeof recipes === 'undefined' || recipes.length === 0) return;

    let htmlContent = "";
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].tags[0] && recipes[i].tags[0].toLowerCase().includes(category)) {
            htmlContent += `
        <div class="cardsContent">
         <h3>${recipes[i].name}</h3>
         <img src="${recipes[i].image}">
         <p>Country: ${recipes[i].cuisine}</p>
         <p class="category">Categories: ${recipes[i].tags[0]}</p>
         </div>`;
        }
    }
    
    document.querySelector(".cardsContainer").innerHTML = htmlContent || "<p>No recipes found.</p>";
}

const showCountries = (country) => {
    if (typeof recipes === 'undefined' || recipes.length === 0) return;

    let htmlContent = "";
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].cuisine && recipes[i].cuisine.toLowerCase() === country.toLowerCase()) {
            htmlContent += `
        <div class="cardsContent">
         <h3>${recipes[i].name}</h3>
         <img src="${recipes[i].image}">
         <p>Country: ${recipes[i].cuisine}</p>
         <p class="category">Categories: ${recipes[i].tags && recipes[i].tags.length > 0 ? recipes[i].tags[0] : 'N/A'}</p>
         </div>`;
        }
    }
    
    document.querySelector(".cardsContainer").innerHTML = htmlContent || `<p>No recipes found for ${country} cuisine.</p>`;
}

const salad = document.querySelector(".salad");
if (salad) {
    salad.addEventListener("click", function (event) {
        showCategories("salad");
    });

    const beef = document.querySelector(".beef");
    beef.addEventListener("click", function () {
        showCategories("beef");
    })
    const chicken = document.querySelector(".chicken");
    chicken.addEventListener("click", function () {
        showCategories("chicken");
    })
    const pasta = document.querySelector(".pasta");
    pasta.addEventListener("click", function () {
        showCategories("pasta");
    })
    const vegetarian = document.querySelector(".vegetarian");
    vegetarian.addEventListener("click", function () {
        showCategories("vegetarian");
    })
    const drinks = document.querySelector(".drinks");
    drinks.addEventListener("click", function () {
        showCategories("caipirinha");
    })

    // Country Filters
    const american = document.querySelector(".american");
    if (american) american.addEventListener("click", () => showCountries("American"));
    
    const canadian = document.querySelector(".canadian");
    if (canadian) canadian.addEventListener("click", () => showCountries("Canadian"));
    
    const italian = document.querySelector(".italian");
    if (italian) italian.addEventListener("click", () => showCountries("Italian"));
    
    const indian = document.querySelector(".indian");
    if (indian) indian.addEventListener("click", () => showCountries("Indian"));
    
    const chinese = document.querySelector(".chinese");
    if (chinese) chinese.addEventListener("click", () => showCountries("Chinese"));
    
    const british = document.querySelector(".british");
    if (british) british.addEventListener("click", () => showCountries("British"));
    
    const seeMore = document.querySelector(".seeMore");
    if (seeMore) seeMore.addEventListener("click", () => {
        window.location.href = "recipe.html";
    });

    // search
    const submitSearch = document.querySelector("#searching");
    const search = document.getElementById("search");

    submitSearch.addEventListener("submit", function (e) {
        e.preventDefault();
        if (typeof recipes === 'undefined' || recipes.length === 0) return;
        
        let htmlContent = "";
        const searchCategory = search.value.trim().toLowerCase();
        
        for (let i = 0; i < recipes.length; i++) {
            // Check both tags and name for better UX
            const hasTag = recipes[i].tags[0] && recipes[i].tags[0].toLowerCase().includes(searchCategory);
            const hasName = recipes[i].name && recipes[i].name.toLowerCase().includes(searchCategory);
            
            if (hasTag || hasName) {
                htmlContent += `
        <div class="cardsContent">
         <h3>${recipes[i].name}</h3>
         <img src="${recipes[i].image}">
         <p>Country: ${recipes[i].cuisine}</p>
         <p class="category">Categories: ${recipes[i].tags[0]}</p>
         </div>`;
            }
        }
        
        document.querySelector(".cardsContainer").innerHTML = htmlContent || "<p>No recipes found.</p>";
        search.value = "";
    })
}