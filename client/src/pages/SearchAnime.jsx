import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { SAVE_ANIME } from '../utils/mutations';
import { getSavedAnimeIds, saveAnimeIds } from '../utils/localStorage';
import Auth from '../utils/auth';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

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

  useEffect(() => {
    setSavedAnimeIds(getSavedAnimeIds());
  }, []);

  const fetchAnime = async () => {
    const options = {
      method: 'GET',
      url: `https://anime-db.p.rapidapi.com/anime`,
      params: {
        page: '1',
        size: '10',
        search: searchInput,
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setSearchedAnimes(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await fetchAnime();
  };

  const handleSaveAnime = async (animeId) => {
    if (!Auth.loggedIn()) {
      console.log('Please log in to save an anime.');
      return;
    }

    try {
      const token = Auth.getToken();
      await saveAnime({
        variables: { animeId },
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
    setSearchInput(event.target.value);
  };

  return (
    <>
      <div className="p-5 bg-opacity-40">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-5 search-title">Search for Anime Shows!</h1>
          <form className="flex gap-4" onSubmit={handleFormSubmit}>
            <input
              className="flex-1 p-2 rounded focus:outline-none"
              type="text"
              placeholder="Enter anime name"
              value={searchInput}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-pink-600 px-3 py-2 rounded hover:bg-pink-700 text-white search-title"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {searchedAnimes.map((anime) => (
            <Card key={anime._id} className="mt-6 w-96 flex flex-col justify-between pink-transparent-bg">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={anime.image || "https://via.placeholder.com/800"}
                alt={anime.title}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {anime.title}
              </Typography>
                  <Typography>
                  {anime.synopsis || "No description available."}
                 </Typography>
            </CardBody>
            <div className="mt-auto">
              {Auth.loggedIn() && (
                <Button
                  onClick={() => handleSaveAnime(anime._id)}
                  disabled={savedAnimeIds.includes(anime._id)}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Anime
                </Button>
              )}
            </div>
          </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchAnime;
