import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, DELETE_ANIME } from '../graphql/queries';
import { removeAnimeId } from '../utils/localStorage';

const SavedAnime = () => {
  const { loading, error, data } = useQuery(GET_ME);

  const [deleteAnime] = useMutation(DELETE_ANIME, {
    update(cache, { data: { deleteAnime } }) {
      cache.modify({
        fields: {
          me(existingMeRef = {}) {
            cache.writeQuery({
              query: GET_ME,
              data: {
                me: {
                  ...existingMeRef,
                  savedAnime: existingMeRef.savedAnime.filter(
                    (anime) => anime.id !== deleteAnime.id
                  ),
                },
              },
            });
          },
        },
      });
    },
  });

  const handleDeleteAnime = async (animeId) => {
    try {
      await deleteAnime({
        variables: { animeId },
      });
      // upon success, remove Anime's id from localStorage
      removeAnimeId(animeId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>LOADING...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  const { me: userData } = data;

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
                <Card key={anime.id} border='dark'>
                  {anime.image ? <Card.Img src={anime.image} alt={`The cover for ${anime.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{anime.title}</Card.Title>
                    <p className='small'>Creator: {anime.creator}</p>
                    <Card.Text>{anime.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteAnime(anime.id)}>
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
