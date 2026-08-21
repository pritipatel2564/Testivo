const favoriteCards = document.querySelector(".favoriteCards");

const loadFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("testivoFavorites")) || [];
    let htmlContent = "";
    
    if (favorites.length === 0) {
        htmlContent = "<p style='grid-column: 1 / -1; font-weight: normal; color: gray;'>No favorite recipes yet! Go back to home and add some.</p>";
    } else {
        favorites.forEach(value => {
            htmlContent += `<div class="favCards" data-id="${value.id}">
             <h3>${value.name}</h3>
              <img src="${value.image}">
              <p>Country: ${value.cuisine}</p>
              <p>Categories: ${value.tags && value.tags.length > 0 ? value.tags[0] : 'N/A'}</p>
              <button class="remove" data-id="${value.id}">Remove</button>
              </div>
             `;
        });
    }
    favoriteCards.innerHTML = htmlContent;
};

loadFavorites();

favoriteCards.addEventListener("click", function(event){
      if(event.target.classList.contains("remove")){
        const idToRemove = parseInt(event.target.dataset.id);
        
        // Remove from DOM
        event.target.closest(".favCards").remove();
        
        // Remove from localStorage
        let favorites = JSON.parse(localStorage.getItem("testivoFavorites")) || [];
        favorites = favorites.filter(fav => fav.id !== idToRemove);
        localStorage.setItem("testivoFavorites", JSON.stringify(favorites));
        
        // Update empty state if needed
        if (favorites.length === 0) {
            favoriteCards.innerHTML = "<p style='grid-column: 1 / -1; font-weight: normal; color: gray;'>No favorite recipes yet! Go back to home and add some.</p>";
        }
      }
});