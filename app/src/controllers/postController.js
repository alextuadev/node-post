const Post = require("../models/Post");
const User = require("../models/User");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags, user } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const existingTags = await Tag.find({ _id: { $in: tags } });
    if (existingTags.length !== tags.length) {
      return res
        .status(404)
        .json({ message: "Una o más etiquetas no se encontraron" });
    }

    const newPost = new Post({
      title,
      content,
      category,
      tags,
      user,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author categories tags");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts", error });
  }
};

// Obtener un post por ID
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("author categories tags");

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el post", error });
  }
};

// Actualizar un post por ID
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, author, categories, tags } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content, author, categories, tags },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el post", error });
  }
};

// Eliminar un post por ID
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.status(200).json({ message: "Post eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el post", error });
  }
};
