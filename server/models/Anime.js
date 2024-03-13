// Anime name, number of episodes/movies , description , reviews
const { Schema , model} = require('mongoose')

const animeSchema = new Schema(
    {
        animeName: {
            type: String,
            required: true,
        },
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
        }


        
    },
        
        
        
        
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

const Anime = model(animeSchema)

module.exports = Anime;
