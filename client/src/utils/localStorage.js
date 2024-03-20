export const getSavedAnimesIds = () => {
  const savedAnimesIds = localStorage.getItem('saved_animes')
    ? JSON.parse(localStorage.getItem('saved_animes'))
    : [];
  return savedAnimesIds;
};
export const saveAnimeIds = (animeIdArr) => {
  if (animeIdArr.length) {
    localStorage.setItem('saved_animes', JSON.stringify(animeIdArr));
  } else {
    localStorage.removeItem('saved_animes');
  }
};
export const removeAnimeId = (animeId) => {
  const savedAnimesIds = localStorage.getItem('saved_animes')
    ? JSON.parse(localStorage.getItem('saved_animes'))
    : null;
  if (!savedAnimesIds) {
    return false;
  }
  const updatedSavedAnimesIds = savedAnimesIds?.filter((savedAnimesId) => savedAnimesId !== animeId);
  localStorage.setItem('saved_animes', JSON.stringify(updatedSavedAnimesIds));
  return true;
};
