const favoriteCards = document.querySelector(".favoriteCards");
let key = [] ;
for(let i = 0; i < localStorage.length; i++){
     key = localStorage.key(i);
     value = JSON.parse(localStorage.getItem(key));
       favoriteCards.innerHTML += `<div class="favCards">
         <h3>${value.name}</h3>
          <img src="${value.image}">
          <p>Country: ${value.cuisine}</p>
          <p >Categories: ${value.tags[0]}</p>
          <button class="remove" data-index="${i}">Remove</button>
          </div>
         `;
    console.log(value);
}

favoriteCards.addEventListener("click", function(event){
      if(event.target.classList.contains("remove")){
        const index = event.target.dataset.index;
        console.log(index);
        event.target.closest(".favCards").remove();
      }
      localStorage.removeItem(key);
})