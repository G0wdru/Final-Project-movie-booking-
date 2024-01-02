module.exports = mongoose => {
    const Genre = mongoose.model(
        "genres",
        mongoose.Schema(
          {
            genreid:Number,
            genre:String
          }

        )
      );

      return Genre;
    }; 