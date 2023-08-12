import { Photo } from "../interfaces/mainInterfaces";

const isInFavorites = (photo: Photo): boolean => {
  if (typeof window === "undefined") return false;

  return JSON.parse(localStorage.getItem("nasa_favorites_fotos") || "[]").find(
    (photoInFav: Photo) => {
      return photoInFav.id === photo?.id;
    }
  );
};

const toggleFavoriteFromLocalStorage = (photo: Photo): boolean => {
  let favorites: Photo[] = JSON.parse(
    localStorage.getItem("nasa_favorites_fotos") || "[]"
  );

  const savedPhoto = isInFavorites(photo);

  if (!!savedPhoto) {
    favorites = favorites.filter((photoInFav: Photo) => {
      return photoInFav.id !== photo.id;
    });
  } else {
    favorites.push(photo);
  }

  localStorage.setItem("nasa_favorites_fotos", JSON.stringify(favorites));
  return isInFavorites(photo);
};

export const handleFavorite = { toggleFavoriteFromLocalStorage, isInFavorites };
