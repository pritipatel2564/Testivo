const RecipesContainer = document.querySelector(".RecipesContainer");
const apiUrl = "https://dummyjson.com/recipes";
// console.log(apiUrl);

const detailsCards = document.querySelector(".detailsCards");
const detailsContent = document.querySelector(".detailsContent");



const CreateElm = () => {
        let recipesContent = document.createElement("div");
        recipesContent.classList.add("recipeCards");
        RecipesContainer.append(recipesContent);
        // console.log(div);

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
        for (let i = 0; i < recipes.length; i++) {
            const card = document.createElement("div");
            card.classList.add("recipeCard");
            // console.log(recipes[i].tags[0]);
            card.innerHTML += `<div>
            <h3>${recipes[i].name}</h3>
           <img src="${recipes[i].image}">
            <p>Country: ${recipes[i].cuisine}</p>
          <p class="cate">Categories: ${recipes[i].tags[0]}</p>
           <p class="favorites" data-index="${i}">🖤</P>
           <div class="details" data-index="${i}">Details</div>
           
         <div class="ingredientsBox"></div>
          </div>`;
          recipeCards.append(card);
        }
       


    } catch (error) {
        console.log(error);

    }
}

recipeCards.addEventListener("click", function(event){
            if(event.target.classList.contains("details")){
                const index = event.target.dataset.index; 
                    const id = recipes[index].id;
                    window.location.href = `details.html?id=${id}`;
                    
        };          
        });
    
    
           getRecipesCards();
recipeCards.addEventListener("click" , function(event){
    if(event.target.classList.contains("favorites")){
        const index = event.target.dataset.index;
localStorage.setItem(recipes[index].tags[0], JSON.stringify(recipes[index]));

    }
});

