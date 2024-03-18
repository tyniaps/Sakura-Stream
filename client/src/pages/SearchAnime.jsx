import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { SAVE_ANIME } from '../utils/mutations';
import { getSavedAnimeIds, saveAnimeIds } from '../utils/localStorage';
import Auth from '../utils/auth';

const SearchAnime = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedAnimes, setSearchedAnimes] = useState([]);
  const [savedAnimeIds, setSavedAnimeIds] = useState(getSavedAnimeIds());

  const [saveAnime, { error }] = useMutation(SAVE_ANIME, {
    onCompleted: (data) => {
      saveAnimeIds([...savedAnimeIds, data.saveAnime.animeId]);
      setSavedAnimeIds(getSavedAnimeIds());
    },
  });

  const fetchAnime = async () => {
console.log(searchInput);
    const options = {
      method: 'GET',
      url: `https://anime-db.p.rapidapi.com/anime`,
      params: {
        page: '1',
        size: '10',
        search: { searchInput },
      },
      headers: {
        'X-RapidAPI-Key': '8506ce4994msh552efb5b81afcdcp12ee4fjsn5470c8e6a866',
        'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
      }
    };
    options.params.search=searchInput;
    console.log(options.params.search);
    try {

      const response = await axios.request(options);
      setSearchedAnimes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };


  useEffect(() => {
    setSavedAnimeIds(getSavedAnimeIds());
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(searchInput);
  };

  const handleSaveAnime = async (animeId) => {
    try {
      const token = Auth.getToken();
      await saveAnime({
        variables: { animeId: animeId },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setSavedAnimeIds(getSavedAnimeIds());
    } catch (error) {
      console.error("Error saving anime:", error);
    }
  };
  const handleChange = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <>
      <div className="p-5 bg-opacity-40 text-black">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-5">Search for Anime Shows!</h1>
          <form className="flex gap-4" onSubmit={handleFormSubmit}>
            <input
              className="flex-1 p-2 rounded focus:outline-none"
              type="text"
              placeholder="Enter anime name"
              value={searchInput}
              onChange={handleChange}
            />
            <button
              onClick={fetchAnime}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* {searchedAnimes.map((anime) => (
            <div key={anime.animeId} className="bg-white p-5 rounded shadow-lg">
              <h3 className="text-xl font-bold">{anime.title}</h3>
              <button
                onClick={() => handleSaveAnime(anime.animeId)}
                disabled={savedAnimeIds.includes(anime.animeId)}
                className="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Anime
              </button>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default SearchAnime;