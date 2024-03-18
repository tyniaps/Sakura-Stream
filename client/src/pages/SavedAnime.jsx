import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_ANIME } from '../utils/mutations';
import { removeAnimeId } from '../utils/localStorage';

const SavedAnime = () => {
  const { loading, data, error } = useQuery(QUERY_ME);
  const [deleteAnime] = useMutation(DELETE_ANIME, {
    onCompleted: (data) => {
      removeAnimeId(data.deleteAnime.animeId);
    },
  });

  if (loading) return <div className="text-center mt-5"><h2>Loading...</h2></div>;
  if (error) return <div className="text-center text-red-600 mt-5"><h2>Error: {error.message}</h2></div>;

  const handleDeleteAnime = async (animeId) => {
    try {
      await deleteAnime({
        variables: { animeId },
        refetchQueries: [{ query: QUERY_ME }],
      });
    } catch (err) {
      console.error("Error deleting anime:", err);
    }
  };

  return (
    <>
      <div className="bg-gray-800 text-white py-5">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center">Your Saved Animes</h1>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        {data.me.savedAnime.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.me.savedAnime.map((anime) => (
              <div key={anime.animeId} className="bg-white rounded shadow p-5">
                <h3 className="text-xl font-bold">{anime.title}</h3>
                {anime.image && <img src={anime.image} alt={`Cover for ${anime.title}`} className="mt-3 rounded"/>}
                <p className="mt-3">{anime.description}</p>
                <button
                  onClick={() => handleDeleteAnime(anime.animeId)}
                  className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-5">
            <h2>You have no saved animes!</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default SavedAnime;
