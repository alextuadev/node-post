const ImagePost = require("../models/ImagePost");
const fs = require("fs");

// Crear una imagen para un post
exports.createImagePost = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se proporcionó ninguna imagen" });
    }

    const { postId } = req.body;
    const imagePath = req.file.path;

    const newImagePost = new ImagePost({
      postId,
      imagePath,
    });

    const savedImagePost = await newImagePost.save();

    res.status(201).json(savedImagePost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la imagen del post", error });
  }
};

// Obtener todas las imágenes de un post
exports.getImagesByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const images = await ImagePost.find({ postId });

    res.status(200).json(images);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las imágenes del post", error });
  }
};

// Eliminar una imagen de un post por ID
exports.deleteImagePost = async (req, res) => {
  try {
    const imageId = req.params.id;

    const imagePost = await ImagePost.findById(imageId);

    if (!imagePost) {
      return res.status(404).json({ message: "Imagen del post no encontrada" });
    }

    fs.unlinkSync(imagePost.imagePath);

    await ImagePost.findByIdAndDelete(imageId);

    res.status(200).json({ message: "Imagen del post eliminada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la imagen del post", error });
  }
};
