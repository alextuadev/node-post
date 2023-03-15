const Tag = require("../models/Tag");

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newTag = new Tag({
      name,
      description,
    });

    const savedTag = await newTag.save();

    res.status(201).json(savedTag);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la etiqueta", error });
  }
};
