import { useState, useEffect } from 'react';
import axios from 'axios'

import { getMe, deleteAnime } from '../utils/API';
import { removeAnimeId } from '../utils/localStorage';

const SavedAnime = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  const handleDeleteAnime = async (animeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteAnime(animeId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove Anime's id from localStorage
      removeAnimeId(animeId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved Animes!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedAnime.length
            ? `Viewing ${userData.savedAnime.length} saved ${userData.savedAnime.length === 1 ? 'anime' : 'anime'}:`
            : 'You have no saved animes!'}
        </h2>
        <Row>
          {userData.savedAnime.map((anime) => {
            return (
              <Col md="4">
                <Card key={anime.animeId} border='dark'>
                  {anime.image ? <Card.Img src={anime.image} alt={`The cover for ${anime.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{anime.title}</Card.Title>
                    <p className='small'>Creator: {anime.creator}</p>
                    <Card.Text>{anime.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteAnime(anime.animeId)}>
                      Delete this Anime!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedAnime;
