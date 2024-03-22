import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { SAVE_ANIME } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { getSavedAnimesIds, saveAnimeIds } from '../utils/localStorage';
import Auth from '../utils/auth';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { motion, AnimatePresence } from 'framer-motion';

const SearchAnime = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedAnimes, setSearchedAnimes] = useState([]);
  const [savedAnimesIds, setSavedAnimesIds] = useState(getSavedAnimesIds());
  const [selectedId, setSelectedId] = useState(null);

  const [saveAnime, { error }] = useMutation(SAVE_ANIME, {
    onCompleted: (data) => {
      console.log('Mutation completed with data:', data);
      saveAnimeIds([...savedAnimesIds, data.saveAnime._id]);
      setSavedAnimesIds(getSavedAnimesIds());
    },
  });

  useEffect(() => {
    setSavedAnimesIds(getSavedAnimesIds());
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
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
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

  const handleSaveAnime = async (anime) => {
    console.log("Saving anime:", anime);
    if (!Auth.loggedIn()) {
      alert('Please log in to save an anime.');
      return;
    }

    const animeData = {
      _id: anime._id,
      title: anime.title,
      synopsis: anime.synopsis,
      image: anime.image,
    };

    try {
      const token = Auth.getToken();
      await saveAnime({
        variables: { input: animeData },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        refetchQueries: [{ query: QUERY_ME }],
      });
      setSavedAnimesIds([...savedAnimesIds, anime._id]);
    } catch (error) {
      console.error("Error saving anime:", error);
    }
  };



  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const selectedAnime = searchedAnimes.find(anime => anime._id === selectedId);


  return (
    <>
      <div className="p-5 bg-opacity-40">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-5 text-center search-title">Search for Anime Shows!</h1>
          <p className="text-center mb-5 search-title">Click on any result to see more details and uncover its world!</p>
          <p className="text-center mb-5 search-title">Login to save it 😊</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {searchedAnimes.map((anime) => (
            <motion.div key={anime._id} layoutId={anime._id} onClick={() => setSelectedId(anime._id)} className="mt-3 w-96 flex flex-col justify-between pink-transparent-bg rounded-xl">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src={anime.image || "https://via.placeholder.com/800"}
                  alt={anime.title}
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-5">
                  {anime.title}
                </Typography>
                <Typography>
                  {anime.synopsis || "No description available."}
                </Typography>
              </CardBody>
            </motion.div>
          ))}
        </div>
      </div >
      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {selectedAnime && (
              <motion.div className="bg-white p-10 rounded-lg">
                <motion.h5 className="text-xl mb-2">
                  {selectedAnime.title}
                </motion.h5>
                <motion.p>
                  {selectedAnime.synopsis || "No description available."}
                </motion.p>
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="mt-3 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-xl"
                >
                  Close
                </motion.button>
                <a
                  href={selectedAnime.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-xl"
                >
                  Visit Website
                </a>
                {Auth.loggedIn() && (
                  <motion.button
                    onClick={() => handleSaveAnime(selectedAnime)}
                    disabled={savedAnimesIds.includes(selectedAnime._id)}
                    className="mt-3 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-xl">
                    {savedAnimesIds.includes(selectedAnime._id) ? 'Saved' : 'Save Me'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchAnime;
