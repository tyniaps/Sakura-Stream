// Anime name, number of episodes/movies , description , reviews
const { Schema , model} = require('mongoose')

const animeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        creator: [
          {
            type: String,
          },
        ],
        totalEpisodes: {
            type: Number,
            required: true,
            
        },
        description: {
            type: String,
            required: true,
        },
        reviews: {
            type: String,
            required: true,
        },
        animeId: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        link: {
          type: String,
        },
    },
        
        
        
        
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

const Anime = model('Anime', animeSchema);

module.exports = Anime;
