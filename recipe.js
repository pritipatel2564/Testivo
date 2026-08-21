const RecipesContainer = document.querySelector(".RecipesContainer");
const apiUrl = "https://dummyjson.com/recipes";
// console.log(apiUrl);

const detailsCards = document.querySelector(".detailsCards");
const detailsContent = document.querySelector(".detailsContent");



const CreateElm = () => {
    if (RecipesContainer) {
        let recipesContent = document.createElement("div");
        recipesContent.classList.add("recipeCards");
        RecipesContainer.append(recipesContent);
    }
}
CreateElm();

const recipeCards = document.querySelector(".recipeCards");

let recipes = [];
async function getRecipesCards() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: "Application/json",
            }
        });
        const data = await response.json();
        recipes = data.recipes;
        let cardsHTML = "";
        for (let i = 0; i < recipes.length; i++) {
            cardsHTML += `<div class="recipeCard">
            <div>
            <h3>${recipes[i].name}</h3>
           <img src="${recipes[i].image}">
            <p>Country: ${recipes[i].cuisine}</p>
          <p class="cate">Categories: ${recipes[i].tags ? recipes[i].tags[0] : 'N/A'}</p>
           <p class="favorites" data-index="${i}">🖤</p>
           <div class="details" data-index="${i}">Details</div>
           
         <div class="ingredientsBox"></div>
          </div>
          </div>`;
        }
        if (recipeCards) recipeCards.innerHTML = cardsHTML;
       


    } catch (error) {
        console.log(error);
        if (recipeCards) {
            recipeCards.innerHTML = `<h2 style="text-align:center; grid-column: 1/-1; padding: 2rem; color: gray;">Failed to load recipes. Please try again later.</h2>`;
        }
    }
}

if (recipeCards) {
    recipeCards.addEventListener("click", function(event){
        if(event.target.classList.contains("details")){
            const index = event.target.dataset.index; 
            const id = recipes[index].id;
            window.location.href = `details.html?id=${id}`;
        };          
    });
}
    
    
getRecipesCards();
if (recipeCards) {
    recipeCards.addEventListener("click" , function(event){
        if(event.target.classList.contains("favorites")){
            const index = event.target.dataset.index;
            
            let favorites = JSON.parse(localStorage.getItem("testivoFavorites")) || [];
            const recipe = recipes[index];
            
            const isAlreadyFavorite = favorites.some(fav => fav.id === recipe.id);
            if (!isAlreadyFavorite) {
                favorites.push(recipe);
                localStorage.setItem("testivoFavorites", JSON.stringify(favorites));
                event.target.style.color = "red"; // Visual feedback
            }
        }
    });
}

