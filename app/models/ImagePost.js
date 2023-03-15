const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagePostSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ImagePost = mongoose.model("ImagePost", imagePostSchema);

module.exports = ImagePost;
