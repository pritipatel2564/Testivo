const params = new URLSearchParams(window.location.search);
let id = params.get("id");

console.log(id - 1);

// get Details

const apiUrlId = "https://dummyjson.com/recipes?id=${id}";
let recipe = [];
async function getDetails() {
    try {
        const response = await fetch(apiUrlId, {
            headers: {
                Accept: "Application/json",
            }
        })
        const data = await response.json();
        recipe = data.recipes;
        document.querySelector('.detailsContent').innerHTML = `
        <h1>${recipe[id - 1].name}</h1>
        <img src="${recipe[id - 1].image}">
        <p>Country: ${recipe[id - 1].cuisine}</p>
        <p class="category">Categories: ${recipe[id - 1].tags[0]}</p>
        `;
         let ingredientHTML = "";
        for(let i = 0; i < recipe[id - 1].ingredients.length; i++){
            ingredientHTML += `<li>${recipe[id - 1].ingredients[i]}</li>`;
            console.log(ingredientHTML);
                     document.querySelector(".ingredientsContent").innerHTML = `
                     <h1>ingredients:</h1>
                     <ul>${ingredientHTML}</ul>`;
    }
    let instructionHTML = "";
    for(let i = 0; i < recipe[id - 1].instructions.length; i++){
        instructionHTML += `<li>${recipe[id - 1].instructions[i]}</li>`
              document.querySelector(".instruction").innerHTML = `
              <h1>Steps:</h1>
              <ol>${instructionHTML}</ol>`;
        }
    } catch (error) {
        console.log(error);
        
    }
}
getDetails();

// categorys click event

const showCategories = (category) => {
    // cardsContainer = "";
     id = recipe.length;
     
    for(let i = 0; i < id; i++){
   if(  recipe[i].tags[0].toLowerCase().includes(category) ){
    console.log(category); 
   document.querySelector(".cardsContainer").innerHTML += `
        <div class="cardsContent">
         <h3>${recipe[i].name}</h3>
         <img src="${recipe[i].image}">
         <p>Country: ${recipe[i].cuisine}</p>
         <p class="category">Categories: ${recipe[i].tags[0]}</p>
         </div>`;
         }
   }

 }

const salad = document.querySelector(".salad");
salad.addEventListener("click", function(event){
    showCategories("salad");
});

const beef = document.querySelector(".beef");   
beef.addEventListener("click", function(){ 
    showCategories("beef");
})
const chicken = document.querySelector(".chicken");
chicken.addEventListener("click", function(){
    showCategories("chicken");
})
const pasta = document.querySelector(".pasta");
pasta.addEventListener("click", function(){
    showCategories("pasta");
})
const vegetarian = document.querySelector(".vegetarian");
vegetarian.addEventListener("click", function(){
    showCategories("vegetarian");
})
const drinks = document.querySelector(".drinks");
drinks.addEventListener("click", function(){
    showCategories("caipirinha");
})

// search

const submitSearch = document.querySelector("#searching");
const search = document.getElementById("search");

submitSearch.addEventListener("submit", function(e){
    e.preventDefault();
    id = recipe.length;
    console.log(id);
    const category = search.value.trim().toLowerCase();
     for(let i = 0; i < id; i++){
   if(  recipe[i].tags[0] && recipe[i].tags[0].toLowerCase() === category ){
    document.querySelector(".cardsContainer").innerHTML += `
        <div class="cardsContent">
         <h3>${recipe[i].name}</h3>
         <img src="${recipe[i].image}">
         <p>Country: ${recipe[i].cuisine}</p>
         <p class="category">Categories: ${recipe[i].tags[0]}</p>
         </div>`;
         }
   }
    search.value = "";
})

document.querySelector(".searchCountry")