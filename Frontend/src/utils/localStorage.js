


// Add a product to a local storage
export const addFavoriteToLocalStorage = (product) => {
      const favorites = getFavoriteFromLocalStorage();
      if (!favorites.some((p) => p._id == product._id)) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
      }
}



// remove product from a local storage
export const removeFavoriteFromLocalStorage = (productId) => {
      const favorites = getFavoriteFromLocalStorage();
      const updateFavorites = favorites.filter((product) => product._id !== productId);

      localStorage.setItem('favorites', JSON.stringify(updateFavorites));
}


// Retrieve favorites from a local storage
export const getFavoriteFromLocalStorage = () => {
      const favoritesJSON = localStorage.getItem("favorites");
      return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}