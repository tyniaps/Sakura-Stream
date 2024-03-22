export const getSavedAnimesIds = () => {
  const savedAnimesIds = localStorage.getItem('saved_animes')
    ? JSON.parse(localStorage.getItem('saved_animes'))
    : [];
  return savedAnimesIds;
};
export const saveAnimeIds = (_idArr) => {
  if (_idArr.length) {
    localStorage.setItem('saved_animes', JSON.stringify(_idArr));
  } else {
    localStorage.removeItem('saved_animes');
  }
};
export const removeAnimeId = (_id) => {
  const savedAnimesIds = localStorage.getItem('saved_animes')
    ? JSON.parse(localStorage.getItem('saved_animes'))
    : null;
  if (!savedAnimesIds) {
    return false;
  }
  const updatedSavedAnimesIds = savedAnimesIds?.filter((savedAnimesId) => savedAnimesId !== _id);
  localStorage.setItem('saved_animes', JSON.stringify(updatedSavedAnimesIds));
  return true;
};
