const favoriteCards = document.querySelector(".favoriteCards");

const loadFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("testivoFavorites")) || [];
    let htmlContent = "";
    
    if (favorites.length === 0) {
        htmlContent = "<p style='grid-column: 1 / -1; font-weight: normal; color: gray;'>No favorite recipes yet! Go back to home and add some.</p>";
    } else {
        favorites.forEach((value, index) => {
            htmlContent += `<div class="premium-card">
                <div class="premium-card__image-wrapper">
                    <img src="${value.image}" alt="${value.name}">
                </div>
                <div class="premium-card__body">
                    <h3 class="premium-card__title">${value.name}</h3>
                    <div class="premium-card__meta">
                        <span class="premium-card__tag">${value.cuisine}</span>
                        <span class="premium-card__tag">${value.tags && value.tags.length > 0 ? value.tags[0] : 'N/A'}</span>
                    </div>
                    <button class="remove" data-id="${value.id}">Remove</button>
                    <div class="premium-card__details-btn details" data-id="${value.id}" style="margin-top: 1rem;">View Details</div>
                </div>
            </div>`;
        });
    }
    favoriteCards.innerHTML = htmlContent;
};

loadFavorites();

favoriteCards.addEventListener("click", function(event){
      if(event.target.classList.contains("remove")){
        const idToRemove = parseInt(event.target.dataset.id);
        
        // Remove from DOM
        event.target.closest(".premium-card").remove();
        
        // Remove from localStorage
        let favorites = JSON.parse(localStorage.getItem("testivoFavorites")) || [];
        favorites = favorites.filter(fav => fav.id !== idToRemove);
        localStorage.setItem("testivoFavorites", JSON.stringify(favorites));
        
        if (window.showToast) window.showToast("Removed from Favorites.");
        if (window.updateFavCount) window.updateFavCount();
        
        // Update empty state if needed
        if (favorites.length === 0) {
            favoriteCards.innerHTML = "<p style='grid-column: 1 / -1; font-weight: normal; color: gray;'>No favorite recipes yet! Go back to home and add some.</p>";
        }
      } else if (event.target.classList.contains("details")) {
          const id = event.target.dataset.id;
          window.location.href = `details.html?id=${id}`;
      }
});