import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (pet) => {
    const isExist = favorites.find((p) => p.id === pet.id);
    if (isExist) {
      setFavorites(favorites.filter((p) => p.id !== pet.id));
    } else {
      setFavorites([...favorites, pet]);
    }
  };

  const checkIsFavorite = (petId) => {
    return favorites.some((p) => p.id === petId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, checkIsFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};