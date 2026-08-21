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
        let favorites = JSON.parse(localStorage.getItem("testivoFavorites")) || [];
        let isAlreadyFavorite = favorites.some(fav => fav.id === recipeData.id);

        document.querySelector('.detailsContent').innerHTML = `
        <div class="recipe-hero">
            <div class="recipe-hero__image-container">
                <img src="${recipeData.image}" alt="${recipeData.name}" class="recipe-hero__image">
            </div>
            <div class="recipe-hero__content">
                <h1 class="recipe-hero__title">${recipeData.name}</h1>
                <div class="recipe-hero__meta">
                    <span class="recipe-hero__tag">${recipeData.cuisine}</span>
                    <span class="recipe-hero__tag">${recipeData.tags && recipeData.tags.length > 0 ? recipeData.tags[0] : 'N/A'}</span>
                </div>
                <button id="detailsFavoriteBtn" class="recipe-hero__favorite-btn ${isAlreadyFavorite ? 'active' : ''}">
                    <i class="fa-solid fa-heart"></i> <span class="btn-text">${isAlreadyFavorite ? 'Added to Favorites' : 'Add to Favorites'}</span>
                </button>
            </div>
        </div>`;

        // Attach listener for the Add to Favorites button
        const favoriteBtn = document.getElementById("detailsFavoriteBtn");
        if (favoriteBtn) {
            favoriteBtn.addEventListener("click", () => {
                let currentFavorites = JSON.parse(localStorage.getItem("testivoFavorites")) || [];
                const isFav = currentFavorites.some(fav => fav.id === recipeData.id);
                if (!isFav) {
                    currentFavorites.push(recipeData);
                    localStorage.setItem("testivoFavorites", JSON.stringify(currentFavorites));
                    favoriteBtn.classList.add("active");
                    favoriteBtn.querySelector('.btn-text').innerText = "Added to Favorites";
                    if (window.showToast) window.showToast("Added to Favorites! 🖤");
                } else {
                    // Optional: Remove from favorites if already added
                    currentFavorites = currentFavorites.filter(fav => fav.id !== recipeData.id);
                    localStorage.setItem("testivoFavorites", JSON.stringify(currentFavorites));
                    favoriteBtn.classList.remove("active");
                    favoriteBtn.querySelector('.btn-text').innerText = "Add to Favorites";
                    if (window.showToast) window.showToast("Removed from Favorites.");
                }
            });
        }
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
        <div class="premium-card">
            <div class="premium-card__image-wrapper">
                <img src="${recipes[i].image}" alt="${recipes[i].name}">
                <div class="premium-card__favorite favorites" data-index="${i}">🖤</div>
            </div>
            <div class="premium-card__body">
                <h3 class="premium-card__title">${recipes[i].name}</h3>
                <div class="premium-card__meta">
                    <span class="premium-card__tag">${recipes[i].cuisine}</span>
                    <span class="premium-card__tag">${recipes[i].tags && recipes[i].tags.length > 0 ? recipes[i].tags[0] : 'N/A'}</span>
                </div>
                <div class="premium-card__details-btn details" data-index="${i}">View Details</div>
            </div>
        </div>`;
        }
    }
    
        document.querySelector(".cardsContainer").innerHTML = htmlContent || "<p>No recipes found.</p>";
        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
            resultsSection.style.display = "block";
            resultsSection.scrollIntoView({ behavior: "smooth" });
        }
}

const showCountries = (country) => {
    if (typeof recipes === 'undefined' || recipes.length === 0) return;

    let htmlContent = "";
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].cuisine && recipes[i].cuisine.toLowerCase() === country.toLowerCase()) {
            htmlContent += `
        <div class="premium-card">
            <div class="premium-card__image-wrapper">
                <img src="${recipes[i].image}" alt="${recipes[i].name}">
                <div class="premium-card__favorite favorites" data-index="${i}">🖤</div>
            </div>
            <div class="premium-card__body">
                <h3 class="premium-card__title">${recipes[i].name}</h3>
                <div class="premium-card__meta">
                    <span class="premium-card__tag">${recipes[i].cuisine}</span>
                    <span class="premium-card__tag">${recipes[i].tags && recipes[i].tags.length > 0 ? recipes[i].tags[0] : 'N/A'}</span>
                </div>
                <div class="premium-card__details-btn details" data-index="${i}">View Details</div>
            </div>
        </div>`;
        }
    }
    
        document.querySelector(".cardsContainer").innerHTML = htmlContent || `<p>No recipes found for ${country} cuisine.</p>`;
        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
            resultsSection.style.display = "block";
            resultsSection.scrollIntoView({ behavior: "smooth" });
        }
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
        const searchInput = search.value.trim().toLowerCase();
        
        let htmlContent = "";
        for (let i = 0; i < recipes.length; i++) {
            
            // Check if tags or name exists and matches the search
            const hasTag = recipes[i].tags && recipes[i].tags.some(tag => tag.toLowerCase().includes(searchInput));
            const hasName = recipes[i].name && recipes[i].name.toLowerCase().includes(searchInput);
            
            if (hasTag || hasName) {
                htmlContent += `
        <div class="premium-card">
            <div class="premium-card__image-wrapper">
                <img src="${recipes[i].image}" alt="${recipes[i].name}">
                <div class="premium-card__favorite favorites" data-index="${i}">🖤</div>
            </div>
            <div class="premium-card__body">
                <h3 class="premium-card__title">${recipes[i].name}</h3>
                <div class="premium-card__meta">
                    <span class="premium-card__tag">${recipes[i].cuisine}</span>
                    <span class="premium-card__tag">${recipes[i].tags && recipes[i].tags.length > 0 ? recipes[i].tags[0] : 'N/A'}</span>
                </div>
                <div class="premium-card__details-btn details" data-index="${i}">View Details</div>
            </div>
        </div>`;
            }
        }
        
        document.querySelector(".cardsContainer").innerHTML = htmlContent || "<p>No recipes found.</p>";
        search.value = "";
        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
            resultsSection.style.display = "block";
            resultsSection.scrollIntoView({ behavior: "smooth" });
        }
    })
}

// Add event listeners for dynamic cards rendered in cardsContainer (Homepage search/filters)
const mainCardsContainer = document.querySelector(".cardsContainer");
if (mainCardsContainer) {
    mainCardsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("details")) {
            const index = event.target.dataset.index;
            const id = recipes[index].id;
            window.location.href = `details.html?id=${id}`;
        }
        
        if (event.target.classList.contains("favorites")) {
            const index = event.target.dataset.index;
            let favorites = JSON.parse(localStorage.getItem("testivoFavorites")) || [];
            const recipe = recipes[index];
            const isAlreadyFavorite = favorites.some(fav => fav.id === recipe.id);
            if (!isAlreadyFavorite) {
                favorites.push(recipe);
                localStorage.setItem("testivoFavorites", JSON.stringify(favorites));
                event.target.style.color = "red"; // Visual feedback
                if (window.showToast) window.showToast("Added to Favorites! 🖤");
            } else {
                if (window.showToast) window.showToast("Already in Favorites!");
            }
        }
    });
}