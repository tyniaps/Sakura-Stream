const { Schema } = require('mongoose')

const animeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String,

    },
  });

module.exports = animeSchema;
