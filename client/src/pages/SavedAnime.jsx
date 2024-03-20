import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_ANIME } from '../utils/mutations';
import { removeAnimeId } from '../utils/localStorage';
import Auth from '../utils/auth';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const SavedAnimes = () => {
  const { loading, data, error } = useQuery(QUERY_ME);
  const [removeAnime] = useMutation(DELETE_ANIME, {
    onCompleted: (data) => {
      removeAnimeId(data.removeAnime.animeId);
    },
  });

  const handleremoveAnime = async (animeId) => {
    if (!Auth.loggedIn()) {
      console.log('Please log in to manage saved anime.');
      return;
    }
    try {
      await removeAnime({
        variables: { animeId },
      });
    } catch (err) {
      console.error("Error deleting anime:", err);
    }
  };

  if (loading) return <div className="text-center mt-5"><h2>Loading...</h2></div>;
  if (error) return <div className="text-center text-red-600 mt-5"><h2>Error: {error.message}</h2></div>;

  return (
    <>
      <div className="bg-gray-800 text-white py-5">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center">Your Saved Animes</h1>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        {data && data.me && data.me.savedAnimess.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.me.savedAnimes.map((anime) => (
              <Card key={anime.animeId} className="mt-6 w-96 flex flex-col justify-between bg-pink-500 bg-opacity-40">
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
                </CardBody>
                <CardFooter className="flex justify-between items-center">
                  <Button
                    onClick={() => handleremoveAnime(anime.animeId)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
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

export default SavedAnimes;
