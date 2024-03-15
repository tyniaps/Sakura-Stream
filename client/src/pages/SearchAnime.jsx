import { useState, useEffect } from 'react';
import axios from 'axios';

import { saveAnimeIds, getSavedAnimeIds } from '../utils/localStorage'; // Adjust import if needed
import Auth from '../utils/auth'; // Adjust import if needed

const SearchAnime = () => {
 const [searchedAnime, setSearchedAnime] = useState([]);
 const [searchInput, setSearchInput] = useState('');
 const [savedAnimeIds, setSavedAnimeIds] = useState(getSavedAnimeIds());
 useEffect(() => {
  const fetchAnime = async () => {
    const options = {setSavedAnimeIds,
      method: 'GET',
      url: 'https://anime-streaming.p.rapidapi.com/latest-anime',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'anime-streaming.p.rapidapi.com'
      }
    };
   try {
    const response = await axios.request(options);
    setSearchedAnime(response.data); // Set anime data to state
   } catch (error) {
    console.error(error);
   }
  };
  fetchAnime();
 }, []); // Empty dependency array ensures useEffect runs once on component mount
 const handleFormSubmit = async (event) => {
  event.preventDefault();
  // You can add search functionality here if needed
 };
 const handleSaveAnime = async (animeId) => {
  // Implement save anime functionality if needed
 };
 return (
  <>
   <div className="text-light bg-dark p-5">
    <div className="container mx-auto">
     <h1 className="text-3xl font-bold">Search for Anime Shows!</h1>
     <form onSubmit={handleFormSubmit}>
      <div className="flex mt-4">
       <input
        className="w-3/4 bg-white rounded-lg py-3 px-4 focus:outline-none"
        name="searchInput"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder="Search for an anime show"
       />
       <button
        type="submit"
        className="ml-4 bg-green-500 text-white rounded-lg px-6 py-3 focus:outline-none"
       >
        Submit Search
       </button>
      </div>
     </form>
    </div>
   </div>
   <div className="container mx-auto mt-8">
    <h2 className="text-2xl font-bold">
     {searchedAnime.length
      ? `Viewing ${searchedAnime.length} results:`
      : 'Search for an anime show to begin'}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
     {searchedAnime.map((anime) => {
      return (
       <div key={anime.id}>
        <div className="bg-white shadow-md rounded-lg p-6">
         <h3 className="text-lg font-semibold mb-2">{anime.title}</h3>
         {/* Add additional anime details as needed */}
         {Auth.loggedIn() && (
          <button
           disabled={savedAnimeIds?.some(
            (savedAnimeId) => savedAnimeId === anime.id
           )}
           className="bg-blue-500 text-white rounded-lg px-4 py-2 focus:outline-none"
           onClick={() => handleSaveAnime(anime.id)}
          >
           {savedAnimeIds?.some(
            (savedAnimeId) => savedAnimeId === anime.id
           )
            ? 'This anime show has already been saved!'
            : 'Save this Anime Show!'}
          </button>
         )}
        </div>
       </div>
      );
     })}
    </div>
   </div>
  </>
 );
};
export default SearchAnime;