const Book = require("../model");

module.exports.createBook = async (req, res) => {
  const { title, author, numberPages, publisher } = req.body;

  try {
    const newBook = await Book.create({
      title,
      author,
      numberPages,
      publisher
    });

    res.json({ book: newBook });
  } catch (error) {
    res.json({ message: `Create book error: ${error}` });
  }
};

module.exports.getBooks = async (req, res) => {
  const { fields } = req.query;
  const selectFields = selectFieldsShow(fields);

  try {
    const books = await Book.find().select(selectFields);

    res.json({
      books
    });
  } catch (error) {
    res.status(404).json({
      message: `Get list books error: ${error}`
    });
  }
};

const selectFieldsShow = fields => {
  if (fields) {
    return fields.split(",").join(" ");
  }

  return "";
};

module.exports.getBook = async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;
  const selectFields = selectFieldsShow(fields);

  try {
    const book = await Book.findById(id).select(selectFields);

    res.json({
      book
    });
  } catch (error) {
    res.status(404).json({
      message: `Get book error: ${error}`
    });
  }
};

module.exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, numberPages, publisher } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(author && { author }),
        ...(numberPages && { numberPages }),
        ...(publisher && { publisher })
      },
      { new: true }
    );

    res.json({ book: updatedBook });
  } catch (error) {
    res.json({ message: `Update book error: ${error}` });
  }
};

module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findOneAndRemove({ _id: id });

    res.json({
      message: "Delete book successfully!",
      book
    });
  } catch (error) {
    res.json({
      message: `Delete book error: ${error}`
    });
  }
};
